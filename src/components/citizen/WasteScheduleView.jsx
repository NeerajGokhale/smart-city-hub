import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import { Pill, Empty, Btn, inputCls } from "../ui/Primitives.jsx";
import Modal from "../ui/Modal.jsx";
import WasteForm from "../admin/WasteForm.jsx";
import { useData } from "../../context/DataContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { WASTE_COLOR, WASTE_ICON } from "../../data/constants";

export default function WasteScheduleView({ editable = false }) {
  const { waste, addWaste, updateWaste, deleteWaste } = useData();
  const push = useToast();
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const filtered = waste.filter((w) => w.zone.toLowerCase().includes(q.toLowerCase()));

  function openNew() { setEditing(null); setModalOpen(true); }
  function openEdit(w) { setEditing(w); setModalOpen(true); }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-lo" />
          <input className={inputCls + " pl-9"} placeholder="Search by zone or area..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {editable && (
          <Btn onClick={openNew} className="sm:ml-auto">
            <Icon name="plus" size={15} />Add schedule
          </Btn>
        )}
      </div>

      {filtered.length === 0 ? (
        <Empty icon="recycle" title="No matching zones" message="Try a different search term." />
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="text-left text-xs text-ink-lo border-b border-white/5">
                  <th className="px-5 py-3 font-medium">Zone / Area</th>
                  <th className="px-5 py-3 font-medium">Collection Day</th>
                  <th className="px-5 py-3 font-medium">Waste Type</th>
                  {editable && <th className="px-5 py-3 font-medium text-right">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((w) => (
                  <tr key={w.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition">
                    <td className="px-5 py-3.5 text-ink-hi">{w.zone}</td>
                    <td className="px-5 py-3.5 text-ink-mid">{w.day}</td>
                    <td className="px-5 py-3.5">
                      <Pill color={WASTE_COLOR[w.type]}>
                        <Icon name={WASTE_ICON[w.type]} size={11} />{w.type}
                      </Pill>
                    </td>
                    {editable && (
                      <td className="px-5 py-3.5 text-right">
                        <button onClick={() => openEdit(w)} className="p-1.5 rounded-lg hover:bg-white/10 text-ink-mid hover:text-cyan mr-1">
                          <Icon name="edit" size={14} />
                        </button>
                        <button onClick={() => { deleteWaste(w.id); push("Schedule entry removed.", "info"); }} className="p-1.5 rounded-lg hover:bg-white/10 text-ink-mid hover:text-[#f9748a]">
                          <Icon name="trash" size={14} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editable && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit schedule entry" : "Add schedule entry"} maxW="max-w-md">
          <WasteForm
            entry={editing}
            onDone={() => setModalOpen(false)}
            onSave={(data) => {
              if (editing) { updateWaste(editing.id, data); push("Schedule updated.", "success"); }
              else { addWaste(data); push("Schedule entry added.", "success"); }
            }}
          />
        </Modal>
      )}
    </div>
  );
}
