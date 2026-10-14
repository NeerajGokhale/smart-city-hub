import Icon from "../icons/Icon.jsx";
import DonutChart from "../charts/DonutChart.jsx";
import BarChart from "../charts/BarChart.jsx";
import StatCard from "../home/StatCard.jsx";
import { useData } from "../../context/DataContext.jsx";
import { CATEGORIES, CATEGORY_COLOR, STATUS_LIST, STATUS_COLOR } from "../../data/constants";

export default function AnalyticsPanel() {
  const { issues } = useData();
  const byCategory = CATEGORIES.map((c) => ({ label: c, value: issues.filter((i) => i.category === c).length, color: CATEGORY_COLOR[c] }));
  const byStatus = STATUS_LIST.map((s) => ({ label: s, value: issues.filter((i) => i.status === s).length, color: STATUS_COLOR[s] }));
  const avgRating = (() => {
    const rated = issues.filter((i) => i.rating);
    if (rated.length === 0) return null;
    return (rated.reduce((s, i) => s + i.rating, 0) / rated.length).toFixed(1);
  })();

  return (
    <div>
      <div
        className="glass rounded-xl px-4 py-2.5 mb-6 inline-flex items-center gap-2 text-xs text-amber"
        style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}
      >
        <Icon name="zap" size={13} /> Illustrative Data — For Administrative Planning Only
      </div>
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-[15px] text-ink-hi mb-5">Issues by Category</h3>
          <DonutChart data={byCategory} />
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display text-[15px] text-ink-hi mb-5">Resolution Status Breakdown</h3>
          <BarChart data={byStatus} />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon="list" label="Total reported issues" value={issues.length} color="#00f5ff" />
        <StatCard
          icon="check"
          label="Resolution rate"
          value={issues.length ? Math.round((issues.filter((i) => i.status === "Resolved").length / issues.length) * 100) + "%" : "0%"}
          color="#22e0a0"
        />
        <StatCard icon="star" label="Average citizen rating" value={avgRating ? avgRating + " / 5" : "—"} color="#8b5cf6" />
      </div>
    </div>
  );
}
