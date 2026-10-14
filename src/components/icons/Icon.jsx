export default function Icon({ name, size = 18, className = "", strokeWidth = 1.8 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };
  switch (name) {
    case "home":
      return <svg {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" /></svg>;
    case "user":
      return <svg {...p}><circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c1.4-3.6 4.4-5.4 7.5-5.4s6.1 1.8 7.5 5.4" /></svg>;
    case "shield":
      return <svg {...p}><path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" /></svg>;
    case "logout":
      return <svg {...p}><path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" /><path d="M15 16l4-4-4-4" /><path d="M19 12H9" /></svg>;
    case "login":
      return <svg {...p}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M9 8l-4 4 4 4" /><path d="M5 12h10" /></svg>;
    case "alert":
      return <svg {...p}><path d="M12 3L2 20h20L12 3z" /><path d="M12 10v4" /><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" /></svg>;
    case "list":
      return <svg {...p}><path d="M9 6h11" /><path d="M9 12h11" /><path d="M9 18h11" /><circle cx="4.5" cy="6" r="1.2" fill="currentColor" stroke="none" /><circle cx="4.5" cy="12" r="1.2" fill="currentColor" stroke="none" /><circle cx="4.5" cy="18" r="1.2" fill="currentColor" stroke="none" /></svg>;
    case "grid":
      return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.2" /><rect x="14" y="3" width="7" height="7" rx="1.2" /><rect x="3" y="14" width="7" height="7" rx="1.2" /><rect x="14" y="14" width="7" height="7" rx="1.2" /></svg>;
    case "trash":
      return <svg {...p}><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>;
    case "map":
      return <svg {...p}><path d="M9 3v15l-6 3V6l6-3z" /><path d="M9 3l6 3v15l-6-3" /><path d="M15 6l6-3v15l-6 3" /></svg>;
    case "chart":
      return <svg {...p}><path d="M4 20V10" /><path d="M11 20V4" /><path d="M18 20v-7" /><path d="M2 20h20" /></svg>;
    case "star":
      return <svg {...p} fill={className && className.includes("fill") ? "currentColor" : "none"}><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9-4.3-4.1 5.9-.8L12 3.5z" /></svg>;
    case "plus":
      return <svg {...p}><path d="M12 5v14" /><path d="M5 12h14" /></svg>;
    case "x":
      return <svg {...p}><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>;
    case "search":
      return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>;
    case "edit":
      return <svg {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
    case "check":
      return <svg {...p}><path d="M20 6L9 17l-5-5" /></svg>;
    case "chevron":
      return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case "chevron-down":
      return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case "zap":
      return <svg {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>;
    case "droplet":
      return <svg {...p}><path d="M12 3s6 6.8 6 11a6 6 0 0 1-12 0c0-4.2 6-11 6-11z" /></svg>;
    case "recycle":
      return <svg {...p}><path d="M7 19H4a2 2 0 0 1-1.7-3l1.3-2.2" /><path d="M10.6 5.2L12 3l3 5.2" /><path d="M17 19h3a2 2 0 0 0 1.7-3l-1.3-2.2" /><path d="M9 19h6" /><path d="M14 4l3 5-3 1" /><path d="M4 15l3-5" /><path d="M20 15l-3-5" /></svg>;
    case "wind":
      return <svg {...p}><path d="M3 8h11a3 3 0 1 0-3-3" /><path d="M3 16h14a3 3 0 1 1-3 3" /></svg>;
    case "cpu":
      return <svg {...p}><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5L7 7M17 17l2.5 2.5M4.5 19.5L7 17M17 7l2.5-2.5" /></svg>;
    case "cross":
      return <svg {...p}><path d="M12 3v18" /><path d="M4 8h16v3H4z" /></svg>;
    case "tree":
      return <svg {...p}><path d="M12 2l5 7h-3l4 6h-4v7h-4v-7H6l4-6H7l5-7z" /></svg>;
    case "book":
      return <svg {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" /></svg>;
    case "siren":
      return <svg {...p}><path d="M5 12a7 7 0 0 1 14 0v7H5v-7z" /><path d="M12 2v3" /><path d="M3 21h18" /></svg>;
    case "life":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="M5.3 5.3l4 4M18.7 5.3l-4 4M5.3 18.7l4-4M18.7 18.7l-4-4" /></svg>;
    case "info":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" /></svg>;
    case "clock":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></svg>;
    case "menu":
      return <svg {...p}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>;
    case "sparkle":
      return <svg {...p}><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" /></svg>;
    case "arrow-right":
      return <svg {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>;
    case "arrow-left":
      return <svg {...p}><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></svg>;
    case "mail":
      return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
    case "lock":
      return <svg {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
    case "building":
      return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" /></svg>;
    default:
      return null;
  }
}
