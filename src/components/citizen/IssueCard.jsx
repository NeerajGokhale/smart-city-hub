import Icon from "../icons/Icon.jsx";
import { Pill } from "../ui/Primitives.jsx";
import { fmtDate } from "../../utils/helpers";
import { CATEGORY_COLOR, STATUS_COLOR } from "../../data/constants";

export default function IssueCard({ issue, showCitizen = false, footer }) {
  const cat = CATEGORY_COLOR[issue.category];
  const st = STATUS_COLOR[issue.status];
  return (
    <div className="glass rounded-2xl p-5 hover-lift">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-xs text-ink-lo">{issue.id}</span>
            <Pill color={cat}>{issue.category}</Pill>
          </div>
          <h4 className="font-display text-[15px] text-ink-hi leading-snug">{issue.title}</h4>
        </div>
        <Pill color={st} className="shrink-0">{issue.status}</Pill>
      </div>
      <p className="text-sm text-ink-mid leading-relaxed mb-3">{issue.description}</p>
      <div className="flex items-center justify-between text-xs text-ink-lo flex-wrap gap-2">
        <span className="flex items-center gap-1.5"><Icon name="clock" size={12} />{fmtDate(issue.createdAt)}</span>
        {showCitizen && <span>{issue.citizenName}</span>}
      </div>
      {footer}
    </div>
  );
}
