import { uid } from "../utils/helpers";
import { safeGet, safeSet } from "../utils/storage";

function buildSeed() {
  const t0 = Date.now();
  const daysAgo = (n) => new Date(t0 - n * 86400000).toISOString();

  const users = [
    { id: "u1", name: "Aditi Rao", email: "aditi@citizen.com", password: "citizen123" },
    { id: "u2", name: "Rohan Mehta", email: "rohan@citizen.com", password: "citizen123" },
    { id: "u3", name: "Sana Sheikh", email: "sana@citizen.com", password: "citizen123" },
  ];

  const issues = [
    { id: "SC-1001", title: "Deep pothole near MG Road flyover", description: "Large pothole causing traffic slowdowns and risk to two-wheelers, especially at night.", category: "Roads", status: "Resolved", citizenId: "u1", citizenName: "Aditi Rao", createdAt: daysAgo(14), statusHistory: [{ status: "Reported", at: daysAgo(14) }, { status: "In Progress", at: daysAgo(10) }, { status: "Resolved", at: daysAgo(6) }], rating: 5, ratingAt: daysAgo(5) },
    { id: "SC-1002", title: "Overflowing garbage bin, Sector 7 market", description: "Community bin overflowing for 3 days, attracting stray animals.", category: "Sanitation", status: "Resolved", citizenId: "u2", citizenName: "Rohan Mehta", createdAt: daysAgo(12), statusHistory: [{ status: "Reported", at: daysAgo(12) }, { status: "In Progress", at: daysAgo(9) }, { status: "Resolved", at: daysAgo(7) }], rating: 4, ratingAt: daysAgo(6) },
    { id: "SC-1003", title: "Streetlight outage on Lake View Road", description: "Four consecutive streetlights not working, stretch is very dark after 8pm.", category: "Electricity", status: "In Progress", citizenId: "u1", citizenName: "Aditi Rao", createdAt: daysAgo(9), statusHistory: [{ status: "Reported", at: daysAgo(9) }, { status: "In Progress", at: daysAgo(4) }], rating: null, ratingAt: null },
    { id: "SC-1004", title: "Low water pressure, Green Park Colony", description: "Water pressure has been very low for the past week during morning hours.", category: "Water Supply", status: "Reported", citizenId: "u3", citizenName: "Sana Sheikh", createdAt: daysAgo(3), statusHistory: [{ status: "Reported", at: daysAgo(3) }], rating: null, ratingAt: null },
    { id: "SC-1005", title: "Broken footpath tiles near school gate", description: "Cracked tiles create a tripping hazard for children entering the school.", category: "Roads", status: "Reported", citizenId: "u2", citizenName: "Rohan Mehta", createdAt: daysAgo(2), statusHistory: [{ status: "Reported", at: daysAgo(2) }], rating: null, ratingAt: null },
    { id: "SC-1006", title: "Illegal dumping behind community hall", description: "Construction debris being dumped on the vacant plot behind the hall.", category: "Sanitation", status: "In Progress", citizenId: "u1", citizenName: "Aditi Rao", createdAt: daysAgo(6), statusHistory: [{ status: "Reported", at: daysAgo(6) }, { status: "In Progress", at: daysAgo(2) }], rating: null, ratingAt: null },
    { id: "SC-1007", title: "Transformer humming loudly, Rose Garden St.", description: "Loud buzzing noise from the corner transformer since last night, residents concerned.", category: "Electricity", status: "Reported", citizenId: "u3", citizenName: "Sana Sheikh", createdAt: daysAgo(1), statusHistory: [{ status: "Reported", at: daysAgo(1) }], rating: null, ratingAt: null },
    { id: "SC-1008", title: "Public bench damaged in Central Park", description: "One of the benches near the fountain has a broken backrest.", category: "Other", status: "Resolved", citizenId: "u2", citizenName: "Rohan Mehta", createdAt: daysAgo(16), statusHistory: [{ status: "Reported", at: daysAgo(16) }, { status: "In Progress", at: daysAgo(13) }, { status: "Resolved", at: daysAgo(11) }], rating: 3, ratingAt: daysAgo(10) },
    { id: "SC-1009", title: "Water main leak on Church Street", description: "Steady water leak forming a puddle on the main road, possible pipe burst.", category: "Water Supply", status: "In Progress", citizenId: "u1", citizenName: "Aditi Rao", createdAt: daysAgo(4), statusHistory: [{ status: "Reported", at: daysAgo(4) }, { status: "In Progress", at: daysAgo(1) }], rating: null, ratingAt: null },
  ];

  const alerts = [
    { id: uid("al"), title: "Heavy Rainfall Advisory", message: "Moderate to heavy rainfall expected over the next 24 hours. Avoid waterlogged underpasses.", severity: "Warning", active: true, createdAt: daysAgo(0.3) },
    { id: uid("al"), title: "Scheduled Water Supply Maintenance", message: "Water supply will be suspended in Zones 3-5 from 11 PM to 5 AM for pipeline maintenance.", severity: "Info", active: true, createdAt: daysAgo(1) },
    { id: uid("al"), title: "Gas Leak Reported — Sector 9", message: "Emergency crews on site. Residents within 500m advised to evacuate immediately.", severity: "Critical", active: true, createdAt: daysAgo(0.05) },
    { id: uid("al"), title: "Road Closure Cleared", message: "MG Road flyover repairs completed, road reopened to traffic.", severity: "Info", active: false, createdAt: daysAgo(8) },
  ];

  const waste = [
    { id: uid("ws"), zone: "Sector 1 - Green Park", day: "Monday", type: "Organic" },
    { id: uid("ws"), zone: "Sector 1 - Green Park", day: "Thursday", type: "Recyclables" },
    { id: uid("ws"), zone: "Sector 2 - Lake View", day: "Tuesday", type: "Organic" },
    { id: uid("ws"), zone: "Sector 2 - Lake View", day: "Friday", type: "Recyclables" },
    { id: uid("ws"), zone: "Sector 3 - Rose Garden", day: "Wednesday", type: "Organic" },
    { id: uid("ws"), zone: "Sector 3 - Rose Garden", day: "Saturday", type: "Hazardous" },
    { id: uid("ws"), zone: "Sector 4 - Riverside", day: "Monday", type: "Electronic" },
    { id: uid("ws"), zone: "Sector 5 - Hilltop", day: "Wednesday", type: "Recyclables" },
    { id: uid("ws"), zone: "Sector 6 - Old Town", day: "Thursday", type: "Hazardous" },
    { id: uid("ws"), zone: "Sector 7 - Market Area", day: "Tuesday", type: "Organic" },
  ];

  const facilities = [
    { id: uid("fc"), name: "City General Hospital", category: "Hospitals", address: "14 MG Road, Central District" },
    { id: uid("fc"), name: "Sunrise Children's Clinic", category: "Hospitals", address: "7 Lake View Road" },
    { id: uid("fc"), name: "Central Park", category: "Parks", address: "Park Avenue, Sector 2" },
    { id: uid("fc"), name: "Riverside Green Belt", category: "Parks", address: "Riverside Road, Sector 4" },
    { id: uid("fc"), name: "Greenfield Public School", category: "Schools", address: "22 School Street, Sector 3" },
    { id: uid("fc"), name: "St. Xavier's High School", category: "Schools", address: "Church Street, Sector 6" },
    { id: uid("fc"), name: "Sector 1 Police Station", category: "Police Stations", address: "Civic Complex, Sector 1" },
    { id: uid("fc"), name: "Central Police Headquarters", category: "Police Stations", address: "9 MG Road" },
    { id: uid("fc"), name: "Community Hall Evacuation Center", category: "Evacuation Centers", address: "Community Hall, Sector 7" },
    { id: uid("fc"), name: "Hilltop Sports Complex Shelter", category: "Evacuation Centers", address: "Hilltop Road, Sector 5" },
  ];

  return { users, issues, alerts, waste, facilities };
}

export function ensureSeeded() {
  if (safeGet("sch_seeded", false)) return;
  const seed = buildSeed();
  safeSet("sch_users", seed.users);
  safeSet("sch_issues", seed.issues);
  safeSet("sch_alerts", seed.alerts);
  safeSet("sch_waste", seed.waste);
  safeSet("sch_facilities", seed.facilities);
  safeSet("sch_seeded", true);
}
