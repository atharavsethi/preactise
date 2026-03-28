export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  experience: number;
  rating: number;
  reviews: number;
  status: 'Online' | 'Offline';
  verified: boolean;
  isPending?: boolean;
  patients: number;
  cases: number;
  responseTime: number;
  popularity: string;
  bio: string;
  tags: string[];
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  speciality: string;
  beds: string;
  emergency: boolean;
  rating: number;
  tags: string[];
}

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Priya Ramesh",
    specialization: "Cardiologist",
    hospital: "Apollo Hospitals, Chennai",
    experience: 14,
    rating: 4.9,
    reviews: 312,
    status: 'Online',
    verified: true,
    patients: 850,
    cases: 420,
    responseTime: 8,
    popularity: "99+",
    bio: "Expert in interventional cardiology and heart failure management.",
    tags: ["Heart Disease", "ECG", "Angioplasty"]
  },
  {
    id: "d2",
    name: "Dr. Arjun Mehta",
    specialization: "Neurologist",
    hospital: "NIMHANS, Bangalore",
    experience: 10,
    rating: 4.7,
    reviews: 198,
    status: 'Online',
    verified: true,
    patients: 530,
    cases: 270,
    responseTime: 15,
    popularity: "87",
    bio: "Specializes in epilepsy, migraines, and neurodegenerative disorders.",
    tags: ["Epilepsy", "Stroke", "Parkinson's"]
  },
  {
    id: "d3",
    name: "Dr. Sneha Iyer",
    specialization: "Pediatrician",
    hospital: "Rainbow Children's Hospital, Hyderabad",
    experience: 8,
    rating: 4.8,
    reviews: 245,
    status: 'Offline',
    verified: true,
    patients: 610,
    cases: 310,
    responseTime: 20,
    popularity: "91",
    bio: "Passionate about child healthcare and developmental milestones.",
    tags: ["Vaccination", "Child Nutrition", "Growth Disorders"]
  },
  {
    id: "d4",
    name: "Dr. Karthik Subramaniam",
    specialization: "Orthopedic Surgeon",
    hospital: "Fortis Hospital, Mumbai",
    experience: 18,
    rating: 4.6,
    reviews: 167,
    status: 'Online',
    verified: true,
    patients: 720,
    cases: 540,
    responseTime: 25,
    popularity: "79",
    bio: "Joint replacement and sports injury specialist.",
    tags: ["Knee Replacement", "Fractures", "Arthroscopy"]
  },
  {
    id: "d5",
    name: "Dr. Meera Nair",
    specialization: "Dermatologist",
    hospital: "Amrita Institute, Kochi",
    experience: 6,
    rating: 4.5,
    reviews: 133,
    status: 'Online',
    verified: true,
    patients: 390,
    cases: 210,
    responseTime: 10,
    popularity: "68",
    bio: "Skin, hair, and cosmetic dermatology specialist.",
    tags: ["Acne", "Hair Loss", "Laser Treatment"]
  },
  {
    id: "d6",
    name: "Dr. Rohan Desai",
    specialization: "Psychiatrist",
    hospital: "Vandrevala Foundation, Pune",
    experience: 9,
    rating: 4.7,
    reviews: 89,
    status: 'Online',
    verified: true,
    patients: 280,
    cases: 190,
    responseTime: 18,
    popularity: "74",
    bio: "Mental health advocate specializing in anxiety and depression.",
    tags: ["Anxiety", "Depression", "CBT"]
  },
  {
    id: "d7",
    name: "Dr. Fatima Sheikh",
    specialization: "Gynecologist",
    hospital: "Manipal Hospital, Delhi",
    experience: 12,
    rating: 4.8,
    reviews: 276,
    status: 'Offline',
    verified: true,
    patients: 640,
    cases: 380,
    responseTime: 22,
    popularity: "93",
    bio: "Maternal healthcare and reproductive health specialist.",
    tags: ["Pregnancy", "PCOS", "Fertility"]
  },
  {
    id: "d8",
    name: "Dr. Aditya Sharma",
    specialization: "General Physician",
    hospital: "Max Healthcare, Delhi",
    experience: 5,
    rating: 4.3,
    reviews: 72,
    status: 'Online',
    verified: false,
    isPending: true,
    patients: 190,
    cases: 95,
    responseTime: 30,
    popularity: "45",
    bio: "General medicine with focus on preventive care.",
    tags: ["Fever", "Diabetes", "Hypertension"]
  },
  {
    id: "d9",
    name: "Dr. Lakshmi Venkat",
    specialization: "Oncologist",
    hospital: "Tata Memorial, Mumbai",
    experience: 20,
    rating: 4.9,
    reviews: 401,
    status: 'Offline',
    verified: true,
    patients: 1100,
    cases: 780,
    responseTime: 45,
    popularity: "99+",
    bio: "Leading cancer specialist with focus on breast and lung oncology.",
    tags: ["Chemotherapy", "Immunotherapy", "Cancer Screening"]
  },
  {
    id: "d10",
    name: "Dr. Vikram Pillai",
    specialization: "Endocrinologist",
    hospital: "JIPMER, Puducherry",
    experience: 11,
    rating: 4.6,
    reviews: 154,
    status: 'Online',
    verified: true,
    patients: 460,
    cases: 290,
    responseTime: 17,
    popularity: "81",
    bio: "Diabetes and thyroid disorder management specialist.",
    tags: ["Diabetes", "Thyroid", "Obesity"]
  }
];

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "Apollo Hospitals",
    location: "Greams Road, Chennai",
    speciality: "Multi-specialty",
    beds: "700",
    emergency: true,
    rating: 4.8,
    tags: ["Cardiology", "Oncology", "Neurology"]
  },
  {
    id: "h2",
    name: "AIIMS Delhi",
    location: "Ansari Nagar, New Delhi",
    speciality: "Government",
    beds: "2000+",
    emergency: true,
    rating: 4.9,
    tags: ["Research", "Trauma", "All Specialties"]
  },
  {
    id: "h3",
    name: "Tata Memorial Hospital",
    location: "Parel, Mumbai",
    speciality: "Cancer Care",
    beds: "629",
    emergency: true,
    rating: 4.9,
    tags: ["Oncology"]
  },
  {
    id: "h4",
    name: "Narayana Health",
    location: "Bommasandra, Bangalore",
    speciality: "Cardiac, Renal, Pediatric",
    beds: "1000",
    emergency: true,
    rating: 4.7,
    tags: ["Cardiac", "Renal", "Pediatric"]
  },
  {
    id: "h5",
    name: "Amrita Institute",
    location: "Kochi, Kerala",
    speciality: "Multi-specialty",
    beds: "1350",
    emergency: true,
    rating: 4.8,
    tags: ["Neurology", "Oncology", "Transplants"]
  },
  {
    id: "h6",
    name: "JIPMER",
    location: "Puducherry",
    speciality: "Government Teaching Hospital",
    beds: "2000+",
    emergency: true,
    rating: 4.7,
    tags: ["Teaching"]
  },
  {
    id: "h7",
    name: "Rainbow Children's Hospital",
    location: "Banjara Hills, Hyderabad",
    speciality: "Pediatrics & Neonatology",
    beds: "320",
    emergency: true,
    rating: 4.8,
    tags: ["Pediatrics"]
  },
  {
    id: "h8",
    name: "Manipal Hospital",
    location: "Dwarka, New Delhi",
    speciality: "Multi-specialty",
    beds: "380",
    emergency: true,
    rating: 4.6,
    tags: ["Orthopedics", "Cardiology", "Gynecology"]
  }
];

export const MOCK_QUERIES = [
  {
    id: "q1",
    title: "I've been having chest pain for 2 days, is it serious?",
    user: "Riya S.",
    role: "Patient",
    answeredBy: "Dr. Priya Ramesh",
    content: "The pain is sharp and happens when I breathe deeply. No history of heart issues.",
    tags: ["Chest Pain", "Heart"],
    time: "2h ago"
  },
  {
    id: "q2",
    title: "My child has a fever of 103°F for 3 days",
    user: "Arun K.",
    role: "Patient",
    answeredBy: "Dr. Sneha Iyer",
    content: "I've given paracetamol but it keeps coming back. Should I rush to EM?",
    tags: ["Fever", "Pediatrics"],
    time: "5h ago"
  },
  {
    id: "q3",
    title: "Dark spots appearing on my skin – could it be fungal?",
    user: "Pooja M.",
    role: "Patient",
    answeredBy: null,
    content: "Started on my arms, slightly itchy. Any cream recommendations?",
    tags: ["Dermatology", "Skin"],
    time: "8h ago"
  }
];
