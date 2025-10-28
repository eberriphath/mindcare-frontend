
// Mock client profile
export const mockClientProfile = {
  id: 1,
  name: "chris p bacon",
  email: "chrispbacon@example.com",
  phone: "3910480284",
  gender: "Male"
};

// Mock client sessions
export const mockClientSessions = [
  { id: 1, therapist: "Dr. ME", date: "2024-01-15", time: "10:00", status: "completed" },
  { id: 2, therapist: "Dr. You", date: "2024-02-05", time: "09:00", status: "scheduled" }
];

// Mock therapist profile
export const mockTherapistProfile = {
  id: 101,
  name: "Dr. Smith",
  email: "dr.smith@example.com",
  phone: "+1 555 999",
  gender: "Female",
  specialty: "Cognitive Therapy"
};

// Mock therapist availability
export const mockTherapistAvailability = [
  { id: 1, date: "2024-01-20", time: "09:00", available: true },
  { id: 2, date: "2024-01-20", time: "10:00", available: false }
];

// Mock therapist bookings
export const mockTherapistBookings = [
  { id: 1, client: "John Doe", date: "2024-01-20", time: "10:00", status: "pending" }
];
