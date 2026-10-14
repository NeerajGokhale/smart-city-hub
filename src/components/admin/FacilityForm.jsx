import { useState } from "react";
import { Field, inputCls, Btn } from "../ui/Primitives.jsx";
import { FACILITY_CATS } from "../../data/constants";

export default function FacilityForm({ entry, onSave, onDone }) {
  const [name, setName] = useState(entry ? entry.name : "");
  const [category, setCategory] = useState(entry ? entry.category : FACILITY_CATS[0]);
  const [address, setAddress] = useState(entry ? entry.address : "");

  function submit(e) {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;
    onSave({ name: name.trim(), category, address: address.trim() });
    onDone();
  }

  return (
    <form onSubmit={submit}>
      <Field label="Facility name">
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Northside Community Clinic" autoFocus />
      </Field>
      <Field label="Category">
        <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
          {FACILITY_CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Address">
        <input className={inputCls} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, sector / area" />
      </Field>
      <Btn type="submit" className="w-full">{entry ? "Save changes" : "Add facility"}</Btn>
    </form>
  );
}
