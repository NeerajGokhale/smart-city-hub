export const CATEGORIES = ["Roads", "Sanitation", "Electricity", "Water Supply", "Other"];

export const CATEGORY_COLOR = {
  Roads: "#00f5ff",
  Sanitation: "#22e0a0",
  Electricity: "#f59e0b",
  "Water Supply": "#8b5cf6",
  Other: "#f43f5e",
};

export const STATUS_LIST = ["Reported", "In Progress", "Resolved"];

export const STATUS_COLOR = {
  Reported: "#f59e0b",
  "In Progress": "#00f5ff",
  Resolved: "#22e0a0",
};

export const SEVERITY_CFG = {
  Info: { color: "#00c8ff", bg: "rgba(0,200,255,0.10)", label: "INFO" },
  Warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", label: "WARNING" },
  Critical: { color: "#f43f5e", bg: "rgba(244,63,94,0.12)", label: "CRITICAL" },
};

export const WASTE_TYPES = ["Organic", "Recyclables", "Hazardous", "Electronic"];

export const WASTE_COLOR = {
  Organic: "#22e0a0",
  Recyclables: "#00f5ff",
  Hazardous: "#f43f5e",
  Electronic: "#8b5cf6",
};

export const WASTE_ICON = {
  Organic: "recycle",
  Recyclables: "recycle",
  Hazardous: "wind",
  Electronic: "cpu",
};

export const FACILITY_CATS = ["Parks", "Hospitals", "Schools", "Police Stations", "Evacuation Centers"];

export const FACILITY_ICON = {
  Parks: "tree",
  Hospitals: "cross",
  Schools: "book",
  "Police Stations": "siren",
  "Evacuation Centers": "life",
};

export const ADMIN_CREDENTIALS = { email: "admin@smartcity.gov", password: "admin123" };

export const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
