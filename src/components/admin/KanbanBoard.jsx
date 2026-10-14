import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import { inputCls } from "../ui/Primitives.jsx";
import KanbanCard from "./KanbanCard.jsx";
import { useData } from "../../context/DataContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { CATEGORIES, STATUS_LIST, STATUS_COLOR } from "../../data/constants";

export default function KanbanBoard() {
  const { issues, moveIssue } = useData();
  const push = useToast();
  const [q, setQ] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [sort, setSort] = useState("date_desc");
  const [dragId, setDragId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  let list = issues.filter(
    (i) =>
      (catFilter === "All" || i.category === catFilter) &&
      (i.title.toLowerCase().includes(q.toLowerCase()) || i.id.toLowerCase().includes(q.toLowerCase()))
  );
  list = [...list].sort((a, b) => {
    if (sort === "date_desc") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "date_asc") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  function handleDrop(e, status) {
    e.preventDefault();
    setDragOverCol(null);
    if (dragId) {
      moveIssue(dragId, status);
      push("Issue " + dragId + " moved to " + status + (status === "Resolved" ? " — feedback unlocked for citizen." : "."), "success");
      setDragId(null);
    }
  }
  function nextStatus(s) { const i = STATUS_LIST.indexOf(s); return i < STATUS_LIST.length - 1 ? STATUS_LIST[i + 1] : null; }
  function prevStatus(s) { const i = STATUS_LIST.indexOf(s); return i > 0 ? STATUS_LIST[i - 1] : null; }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-lo" />
          <input className={inputCls + " pl-9"} placeholder="Search by title or ID..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className={inputCls + " sm:max-w-[160px]"} value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className={inputCls + " sm:max-w-[170px]"} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date_desc">Newest first</option>
          <option value="date_asc">Oldest first</option>
          <option value="category">By category</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {STATUS_LIST.map((status) => {
          const col = list.filter((i) => i.status === status);
          return (
            <div
              key={status}
              onDragOver={(e) => { e.preventDefault(); setDragOverCol(status); }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, status)}
              className={"kanban-col glass rounded-2xl p-4 min-h-[300px] border transition " + (dragOverCol === status ? "drag-over" : "border-white/[0.06]")}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[status], boxShadow: "0 0 8px " + STATUS_COLOR[status] }}></span>
                  <h4 className="font-display text-sm text-ink-hi">{status}</h4>
                </div>
                <span className="text-xs text-ink-lo bg-white/5 px-2 py-0.5 rounded-full">{col.length}</span>
              </div>
              {col.length === 0 ? (
                <p className="text-xs text-ink-lo text-center py-8">No issues here.</p>
              ) : (
                col.map((issue) => (
                  <div key={issue.id}>
                    <KanbanCard issue={issue} onDragStart={(e, id) => setDragId(id)} />
                    <div className="flex gap-1.5 -mt-2 mb-3">
                      {prevStatus(status) && (
                        <button onClick={() => moveIssue(issue.id, prevStatus(status))} className="flex-1 text-[10px] py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-ink-mid">
                          ← {prevStatus(status)}
                        </button>
                      )}
                      {nextStatus(status) && (
                        <button
                          onClick={() => { moveIssue(issue.id, nextStatus(status)); push("Moved " + issue.id + " to " + nextStatus(status) + ".", "success"); }}
                          className="flex-1 text-[10px] py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 text-cyan"
                        >
                          {nextStatus(status)} →
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
