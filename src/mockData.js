// 🌿 MindCare Mock Data for Local Testing

// --- Client Data ---
export const mockClientProfile = {
  name: "Eber Riphath",
  email: "riphatheber@gmail.com",
  phone: "0703843265",
  gender: "Male",
};

export const mockClientSessions = [
  { id: 1, therapist: "Dr. Mary Kamau", date: "2025-11-03", time: "10:00 AM", status: "completed" },
  { id: 2, therapist: "Dr. John Mwangi", date: "2025-11-05", time: "2:00 PM", status: "pending" },
  { id: 3, therapist: "Dr. Anne Njeri", date: "2025-11-10", time: "11:30 AM", status: "cancelled" },
];

// --- Therapist Data ---
export const mockTherapistProfile = {
  name: "Dr. Jane Smith",
  email: "jane@mindcare.com",
  specialization: "Cognitive Behavioral Therapy",
  phone: "+254700123456",
  bio: "Experienced therapist focusing on helping clients with anxiety, stress, and burnout.",
};

export const mockTherapistAvailability = [
  { id: 1, date: "2025-11-04", time: "9:00 AM", available: true },
  { id: 2, date: "2025-11-04", time: "2:00 PM", available: false },
  { id: 3, date: "2025-11-05", time: "10:30 AM", available: true },
];

export const mockTherapistBookings = [
  { id: 1, client: "Alice Njeri", date: "2025-11-03", time: "10:00 AM", status: "completed" },
  { id: 2, client: "David Kamau", date: "2025-11-05", time: "2:00 PM", status: "pending" },
];

// --- Admin Data ---
export const mockAdminProfile = {
  name: "Admin User",
  email: "admin@mindcare.com",
  role: "admin",
};

export const mockTherapistList = [
  { id: 1, name: "Dr. Jane Smith", specialization: "Anxiety", email: "jane@mindcare.com", active: true },
  { id: 2, name: "Dr. Brian Otieno", specialization: "Depression", email: "brian@mindcare.com", active: false },
  { id: 3, name: "Dr. Anne Njeri", specialization: "Trauma", email: "anne@mindcare.com", active: true },
];

export const mockClientList = [
  { id: 1, name: "Alice Njeri", gender: "Female", email: "alice@mail.com", sessions: 3 },
  { id: 2, name: "David Kamau", gender: "Male", email: "david@mail.com", sessions: 5 },
  { id: 3, name: "Lilian Mwangi", gender: "Female", email: "lilian@mail.com", sessions: 2 },
];

export const mockReports = [
  { id: 1, reporter: "Client Alice", issue: "Therapist unresponsive", date: "2025-10-30" },
  { id: 2, reporter: "Therapist Brian", issue: "Client missed sessions", date: "2025-10-31" },
  { id: 3, reporter: "System", issue: "Payment delay reported", date: "2025-11-01" },
];
