import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext.jsx";

const DataCtx = createContext(null);

const mapIssue = (row) => ({ ...row, citizenId: row.citizen_id, citizenName: row.citizen_name, createdAt: row.created_at, ratingAt: row.rating_at });
const mapAlert = (row) => ({ ...row, createdAt: row.created_at });

export function DataProvider({ children }) {
  const { session } = useAuth();
  const [issues, setIssues] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [waste, setWaste] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [publicStats, setPublicStats] = useState({ resolved: 0, total: 0 });

  // Re-fetch everything whenever who's logged in changes (login/logout/role switch),
  // since RLS decides what each fetch is even allowed to return.
  useEffect(() => {
    async function loadAll() {
      const [issuesRes, alertsRes, wasteRes, facilitiesRes, statsRes] = await Promise.all([
        supabase.from("issues").select("*").order("created_at", { ascending: false }),
        supabase.from("alerts").select("*").order("created_at", { ascending: false }),
        supabase.from("waste_schedule").select("*"),
        supabase.from("facilities").select("*"),
        supabase.rpc("get_public_stats"),
      ]);
      for (const [name, r] of Object.entries({ issues: issuesRes, alerts: alertsRes, waste_schedule: wasteRes, facilities: facilitiesRes, get_public_stats: statsRes })) {
        if (r.error) console.error("[data] " + name + " failed:", r.error.message);
      }
      setIssues((issuesRes.data ?? []).map(mapIssue));
      setAlerts((alertsRes.data ?? []).map(mapAlert));
      setWaste(wasteRes.data ?? []);
      setFacilities(facilitiesRes.data ?? []);
      const stats = Array.isArray(statsRes.data) ? statsRes.data[0] : statsRes.data;
      if (stats) setPublicStats({ resolved: Number(stats.resolved_count), total: Number(stats.total_count) });
    }
    loadAll();
  }, [session?.userId, session?.role]);

  // ---------- ISSUES ----------
  async function addIssue(data) {
    const { data: row, error } = await supabase
      .from("issues")
      .insert({
        title: data.title,
        description: data.description,
        category: data.category,
        citizen_id: data.citizenId,
        citizen_name: data.citizenName,
      })
      .select()
      .single();
    if (error) throw error;
    const mapped = mapIssue(row);
    setIssues((prev) => [mapped, ...prev]);
    return mapped;
  }

  async function moveIssue(id, newStatus) {
    const { data: row, error } = await supabase.rpc("move_issue", { p_issue_id: id, p_new_status: newStatus });
    if (error) throw error;
    setIssues((prev) => prev.map((i) => (i.id === id ? mapIssue(row) : i)));
  }

  async function rateIssue(id, stars) {
    const { data: row, error } = await supabase.rpc("rate_issue", { p_issue_id: id, p_rating: stars });
    if (error) throw error;
    setIssues((prev) => prev.map((i) => (i.id === id ? mapIssue(row) : i)));
  }

  // ---------- ALERTS ----------
  async function addAlert(data) {
    const { data: row, error } = await supabase.from("alerts").insert(data).select().single();
    if (error) throw error;
    setAlerts((prev) => [mapAlert(row), ...prev]);
  }
  async function toggleAlert(id) {
    const current = alerts.find((a) => a.id === id);
    const { data: row, error } = await supabase
      .from("alerts")
      .update({ active: !current.active })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    setAlerts((prev) => prev.map((a) => (a.id === id ? mapAlert(row) : a)));
  }
  async function deleteAlert(id) {
    const { error } = await supabase.from("alerts").delete().eq("id", id);
    if (error) throw error;
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  // ---------- WASTE SCHEDULE ----------
  async function addWaste(data) {
    const { data: row, error } = await supabase.from("waste_schedule").insert(data).select().single();
    if (error) throw error;
    setWaste((prev) => [row, ...prev]);
  }
  async function updateWaste(id, data) {
    const { data: row, error } = await supabase.from("waste_schedule").update(data).eq("id", id).select().single();
    if (error) throw error;
    setWaste((prev) => prev.map((w) => (w.id === id ? row : w)));
  }
  async function deleteWaste(id) {
    const { error } = await supabase.from("waste_schedule").delete().eq("id", id);
    if (error) throw error;
    setWaste((prev) => prev.filter((w) => w.id !== id));
  }

  // ---------- FACILITIES ----------
  async function addFacility(data) {
    const { data: row, error } = await supabase.from("facilities").insert(data).select().single();
    if (error) throw error;
    setFacilities((prev) => [row, ...prev]);
  }
  async function updateFacility(id, data) {
    const { data: row, error } = await supabase.from("facilities").update(data).eq("id", id).select().single();
    if (error) throw error;
    setFacilities((prev) => prev.map((f) => (f.id === id ? row : f)));
  }
  async function deleteFacility(id) {
    const { error } = await supabase.from("facilities").delete().eq("id", id);
    if (error) throw error;
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <DataCtx.Provider
      value={{
        issues, alerts, waste, facilities, publicStats,
        addIssue, moveIssue, rateIssue,
        addAlert, toggleAlert, deleteAlert,
        addWaste, updateWaste, deleteWaste,
        addFacility, updateFacility, deleteFacility,
      }}
    >
      {children}
    </DataCtx.Provider>
  );
}

export function useData() {
  return useContext(DataCtx);
}