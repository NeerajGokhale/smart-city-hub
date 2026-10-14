import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import { Pill, Empty, Btn, inputCls } from "../ui/Primitives.jsx";
import Modal from "../ui/Modal.jsx";
import FacilityForm from "../admin/FacilityForm.jsx";
import { useData } from "../../context/DataContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { FACILITY_CATS, FACILITY_ICON } from "../../data/constants";

export default function FacilityDirectory({ editable = false }) {
  const { facilities, addFacility, updateFacility, deleteFacility } = useData();
  const push = useToast();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = facilities.filter(
    (f) =>
      (cat === "All" || f.category === cat) &&
      (f.name.toLowerCase().includes(q.toLowerCase()) || f.address.toLowerCase().includes(q.toLowerCase()))
  );

  function openNew() { setEditing(null); setModalOpen(true); }
  function openEdit(f) { setEditing(f); setModalOpen(true); }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-lo" />
          <input className={inputCls + " pl-9"} placeholder="Search by name or address..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {editable && (
          <Btn onClick={openNew} className="sm:ml-auto">
            <Icon name="plus" size={15} />Add facility
          </Btn>
        )}
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
        {["All", ...FACILITY_CATS].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition " +
              (cat === c ? "bg-cyan/15 border-cyan/40 text-cyan" : "border-white/10 text-ink-mid hover:bg-white/5")
            }
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Empty icon="map" title="No facilities found" message="Adjust your search or category filter." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((f) => (
            <div key={f.id} className="glass rounded-2xl p-5 hover-lift">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 bg-cyan/10 text-cyan">
                <Icon name={FACILITY_ICON[f.category]} size={18} />
              </div>
              <Pill color="#8b5cf6" className="mb-2">{f.category}</Pill>
              <h4 className="font-display text-[15px] text-ink-hi mb-1">{f.name}</h4>
              <p className="text-xs text-ink-mid leading-relaxed">{f.address}</p>
              {editable && (
                <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                  <button onClick={() => openEdit(f)} className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-white/5 hover:bg-white/10 text-ink-mid">
                    <Icon name="edit" size={12} />Edit
                  </button>
                  <button onClick={() => { deleteFacility(f.id); push("Facility removed.", "info"); }} className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-rose/10 hover:bg-rose/20 text-[#f9748a]">
                    <Icon name="trash" size={12} />Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editable && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit facility" : "Add facility"} maxW="max-w-md">
          <FacilityForm
            entry={editing}
            onDone={() => setModalOpen(false)}
            onSave={(data) => {
              if (editing) { updateFacility(editing.id, data); push("Facility updated.", "success"); }
              else { addFacility(data); push("Facility added.", "success"); }
            }}
          />
        </Modal>
      )}
    </div>
  );
}
