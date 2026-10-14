import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import KanbanBoard from "./KanbanBoard.jsx";
import AlertComposer from "./AlertComposer.jsx";
import AnalyticsPanel from "./AnalyticsPanel.jsx";
import WasteScheduleView from "../citizen/WasteScheduleView.jsx";
import FacilityDirectory from "../citizen/FacilityDirectory.jsx";

const TABS = [
  { id: "kanban", label: "Issue Tracker", icon: "grid" },
  { id: "alerts", label: "Alert Broadcasts", icon: "alert" },
  { id: "waste", label: "Waste Schedules", icon: "recycle" },
  { id: "facilities", label: "Facility Directory", icon: "map" },
  { id: "analytics", label: "Analytics", icon: "chart" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState("kanban");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-7">
        <h1 className="font-display text-2xl text-ink-hi mb-1">Admin Command Center</h1>
        <p className="text-sm text-ink-mid">Manage issues, alerts, schedules, facilities, and city-wide analytics.</p>
      </div>
      <div className="flex gap-1 glass rounded-xl p-1 mb-7 overflow-x-auto no-scrollbar w-fit max-w-full">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition " +
              (tab === t.id ? "bg-white/[0.09] text-violet" : "text-ink-mid hover:text-white")
            }
          >
            <Icon name={t.icon} size={14} />{t.label}
          </button>
        ))}
      </div>
      {tab === "kanban" && <KanbanBoard />}
      {tab === "alerts" && <AlertComposer />}
      {tab === "waste" && <WasteScheduleView editable={true} />}
      {tab === "facilities" && <FacilityDirectory editable={true} />}
      {tab === "analytics" && <AnalyticsPanel />}
    </div>
  );
}
