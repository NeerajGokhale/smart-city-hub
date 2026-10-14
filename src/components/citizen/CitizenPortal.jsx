import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import ReportIssueForm from "./ReportIssueForm.jsx";
import MyReports from "./MyReports.jsx";
import WasteScheduleView from "./WasteScheduleView.jsx";
import FacilityDirectory from "./FacilityDirectory.jsx";

const TABS = [
  { id: "report", label: "Report Issue", icon: "plus" },
  { id: "mine", label: "My Reports", icon: "list" },
  { id: "waste", label: "Waste Schedule", icon: "recycle" },
  { id: "facilities", label: "Facilities", icon: "map" },
];

export default function CitizenPortal() {
  const [tab, setTab] = useState("report");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-7">
        <h1 className="font-display text-2xl text-ink-hi mb-1">Citizen Portal</h1>
        <p className="text-sm text-ink-mid">Report issues, track resolutions, and explore city services.</p>
      </div>
      <div className="flex gap-1 glass rounded-xl p-1 mb-7 overflow-x-auto no-scrollbar w-fit max-w-full">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition " +
              (tab === t.id ? "bg-white/[0.09] text-cyan" : "text-ink-mid hover:text-white")
            }
          >
            <Icon name={t.icon} size={14} />{t.label}
          </button>
        ))}
      </div>
      {tab === "report" && (
        <div className="glass rounded-2xl p-6">
          <ReportIssueForm />
        </div>
      )}
      {tab === "mine" && <MyReports />}
      {tab === "waste" && <WasteScheduleView editable={false} />}
      {tab === "facilities" && <FacilityDirectory editable={false} />}
    </div>
  );
}
