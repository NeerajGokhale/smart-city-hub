import { useState } from "react";
import { Field, inputCls, Btn } from "../ui/Primitives.jsx";
import { WASTE_TYPES, DAYS_OF_WEEK } from "../../data/constants";

export default function WasteForm({ entry, onSave, onDone }) {
  const [zone, setZone] = useState(entry ? entry.zone : "");
  const [day, setDay] = useState(entry ? entry.day : DAYS_OF_WEEK[0]);
  const [type, setType] = useState(entry ? entry.type : WASTE_TYPES[0]);

  function submit(e) {
    e.preventDefault();
    if (!zone.trim()) return;
    onSave({ zone: zone.trim(), day, type });
    onDone();
  }

  return (
    <form onSubmit={submit}>
      <Field label="Zone / Area">
        <input className={inputCls} value={zone} onChange={(e) => setZone(e.target.value)} placeholder="e.g. Sector 8 - Lakeview" autoFocus />
      </Field>
      <Field label="Collection day">
        <select className={inputCls} value={day} onChange={(e) => setDay(e.target.value)}>
          {DAYS_OF_WEEK.map((d) => <option key={d}>{d}</option>)}
        </select>
      </Field>
      <Field label="Waste type">
        <select className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
          {WASTE_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Btn type="submit" className="w-full">{entry ? "Save changes" : "Add entry"}</Btn>
    </form>
  );
}
