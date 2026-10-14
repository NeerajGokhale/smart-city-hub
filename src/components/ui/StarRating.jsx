import { useState } from "react";
import Icon from "../icons/Icon.jsx";

export default function StarRating({ value = 0, onRate, readOnly = false }) {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHover(s)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onRate && onRate(s)}
          className={"transition " + (readOnly ? "cursor-default" : "cursor-pointer hover:scale-110")}
        >
          <Icon name="star" size={20} className={(hover || value) >= s ? "fill text-amber" : "text-ink-lo"} strokeWidth={1.6} />
        </button>
      ))}
    </div>
  );
}
