import { Pill } from "../ui/Primitives.jsx";
import StarRating from "../ui/StarRating.jsx";
import { timeAgo } from "../../utils/helpers";
import { CATEGORY_COLOR } from "../../data/constants";

export default function KanbanCard({ issue, onDragStart }) {
  const cat = CATEGORY_COLOR[issue.category];
  return (
    <div draggable onDragStart={(e) => onDragStart(e, issue.id)} className="glass rounded-xl p-4 mb-3 cursor-grab active:cursor-grabbing hover-lift">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] text-ink-lo">{issue.id}</span>
        <Pill color={cat}>{issue.category}</Pill>
      </div>
      <h5 className="text-sm font-medium text-ink-hi mb-1.5 leading-snug">{issue.title}</h5>
      <p className="text-xs text-ink-mid leading-relaxed line-clamp-2 mb-2.5">{issue.description}</p>
      <div className="flex items-center justify-between text-[11px] text-ink-lo">
        <span>{issue.citizenName}</span>
        <span>{timeAgo(issue.createdAt)}</span>
      </div>
      {issue.rating && (
        <div className="mt-2 pt-2 border-t border-white/5">
          <StarRating value={issue.rating} readOnly />
        </div>
      )}
    </div>
  );
}
