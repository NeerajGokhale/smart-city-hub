import { useState } from "react";
import Icon from "../icons/Icon.jsx";
import { Field, inputCls, Btn } from "../ui/Primitives.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { CATEGORIES } from "../../data/constants";

export default function ReportIssueForm({ onDone }) {
  const { session } = useAuth();
  const { addIssue } = useData();
  const push = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [errors, setErrors] = useState({});

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const issue = await addIssue({ title: title.trim(), description: description.trim(), category, citizenId: session.userId, citizenName: session.name });
    push("Issue " + issue.id + " submitted successfully.", "success");
    setTitle(""); setDescription(""); setCategory(CATEGORIES[0]); setErrors({});
    if (onDone) onDone();
  }

  return (
    <form onSubmit={submit}>
      <Field label="Title">
        <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short, clear summary of the issue" />
        {errors.title && <p className="text-xs text-[#f9748a] mt-1">{errors.title}</p>}
      </Field>
      <Field label="Category">
        <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Description">
        <textarea className={inputCls + " min-h-[110px] resize-none"} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what's happening, where, and since when." />
        {errors.description && <p className="text-xs text-[#f9748a] mt-1">{errors.description}</p>}
      </Field>
      <Btn type="submit" className="w-full">
        Submit report <Icon name="arrow-right" size={15} />
      </Btn>
    </form>
  );
}
