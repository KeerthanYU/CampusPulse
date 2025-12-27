/**
 * CampusPulse College Data
 * Mock realistic data for a college campus
 * This replaces Firestore/MongoDB for demo purposes
 */

export const collegeData = {
  // Departments
  departments: [
    { id: 'CSE', name: 'Computer Science & Engineering', head: 'Dr. Rajesh Kumar' },
    { id: 'ECE', name: 'Electronics & Communication', head: 'Dr. Priya Sharma' },
    { id: 'ME', name: 'Mechanical Engineering', head: 'Dr. Vikram Singh' },
    { id: 'CIVIL', name: 'Civil Engineering', head: 'Dr. Anita Verma' },
  ],

  // Faculty
  faculty: [
    { id: 'F001', name: 'Dr. Rao', dept: 'CSE', specialization: 'AI/ML', office: 'CSE-205' },
    { id: 'F002', name: 'Dr. Meena', dept: 'CSE', specialization: 'Database Systems', office: 'CSE-206' },
    { id: 'F003', name: 'Dr. Josephine Prem Kumar', dept: 'CSE', specialization: 'Data Structures', office: 'CSE-207' },
    { id: 'F004', name: 'Prof. Amit Patel', dept: 'CSE', specialization: 'Web Technologies', office: 'CSE-208' },
    { id: 'F005', name: 'Dr. Neha Gupta', dept: 'CSE', specialization: 'Operating Systems', office: 'CSE-209' },
    { id: 'F006', name: 'Prof. Ramesh', dept: 'ECE', specialization: 'VLSI', office: 'ECE-301' },
  ],

  // Timetables - Key: "DEPT SEM SECTION"
  timetables: {
    'CSE 3 B': {
      Monday: [
        { time: '8:30-9:25', subject: 'Data Structure and Application', faculty: 'Dr. Josephine Prem Kumar', room: 'G002', type: 'Lecture' },
        { time: '9:25-10:20', subject: 'Operating System', faculty: 'Dr. Neha Gupta', room: 'G003', type: 'Lecture' },
        { time: '10:35-11:30', subject: 'Database Management System', faculty: 'Dr. Meena', room: 'LAB-1', type: 'Lab' },
        { time: '11:30-12:25', subject: 'Database Management System', faculty: 'Dr. Meena', room: 'LAB-1', type: 'Lab' },
        { time: '1:15-2:10', subject: 'Web Technologies', faculty: 'Prof. Amit Patel', room: 'G101', type: 'Lecture' },
        { time: '2:10-3:05', subject: 'Web Technologies Practical', faculty: 'Prof. Amit Patel', room: 'LAB-2', type: 'Lab' },
      ],
      Tuesday: [
        { time: '8:30-9:25', subject: 'Operating System', faculty: 'Dr. Neha Gupta', room: 'G003', type: 'Lecture' },
        { time: '9:25-10:20', subject: 'Artificial Intelligence', faculty: 'Dr. Rao', room: 'G004', type: 'Lecture' },
        { time: '10:35-11:30', subject: 'Data Structure and Application Lab', faculty: 'Dr. Josephine Prem Kumar', room: 'LAB-3', type: 'Lab' },
        { time: '11:30-12:25', subject: 'Data Structure and Application Lab', faculty: 'Dr. Josephine Prem Kumar', room: 'LAB-3', type: 'Lab' },
        { time: '1:15-2:10', subject: 'Artificial Intelligence', faculty: 'Dr. Rao', room: 'G004', type: 'Lecture' },
      ],
      Wednesday: [
        { time: '8:30-9:25', subject: 'Database Management System', faculty: 'Dr. Meena', room: 'G005', type: 'Lecture' },
        { time: '9:25-10:20', subject: 'Data Structure and Application', faculty: 'Dr. Josephine Prem Kumar', room: 'G002', type: 'Lecture' },
        { time: '10:35-12:25', subject: 'Web Technologies Practical', faculty: 'Prof. Amit Patel', room: 'LAB-2', type: 'Lab' },
        { time: '1:15-2:10', subject: 'Seminar', faculty: 'Dr. Rajesh Kumar', room: 'AUD-1', type: 'Seminar' },
      ],
      Thursday: [
        { time: '8:30-9:25', subject: 'Data Structure and Application', faculty: 'Dr. Josephine Prem Kumar', room: 'G002', type: 'Lecture' },
        { time: '9:25-10:20', subject: 'Operating System', faculty: 'Dr. Neha Gupta', room: 'G003', type: 'Lecture' },
        { time: '10:35-11:30', subject: 'Operating System Lab', faculty: 'Dr. Neha Gupta', room: 'LAB-4', type: 'Lab' },
        { time: '11:30-12:25', subject: 'Operating System Lab', faculty: 'Dr. Neha Gupta', room: 'LAB-4', type: 'Lab' },
        { time: '1:15-2:10', subject: 'Artificial Intelligence', faculty: 'Dr. Rao', room: 'G004', type: 'Lecture' },
      ],
      Friday: [
        { time: '8:30-9:25', subject: 'Artificial Intelligence', faculty: 'Dr. Rao', room: 'G004', type: 'Lecture' },
        { time: '9:25-10:20', subject: 'Database Management System', faculty: 'Dr. Meena', room: 'G005', type: 'Lecture' },
        { time: '10:35-11:30', subject: 'Data Structure and Application Lab', faculty: 'Dr. Josephine Prem Kumar', room: 'LAB-3', type: 'Lab' },
        { time: '11:30-12:25', subject: 'Data Structure and Application Lab', faculty: 'Dr. Josephine Prem Kumar', room: 'LAB-3', type: 'Lab' },
      ],
      Saturday: [],
      Sunday: [],
    },
    'CSE 3 A': {
      Monday: [
        { time: '8:30-9:25', subject: 'Data Structure and Application', faculty: 'Dr. Josephine Prem Kumar', room: 'G001', type: 'Lecture' },
        { time: '9:25-10:20', subject: 'Operating System', faculty: 'Dr. Neha Gupta', room: 'G006', type: 'Lecture' },
      ],
      Tuesday: [
        { time: '8:30-9:25', subject: 'Artificial Intelligence', faculty: 'Dr. Rao', room: 'G001', type: 'Lecture' },
        { time: '9:25-10:20', subject: 'Database Management System', faculty: 'Dr. Meena', room: 'G006', type: 'Lecture' },
      ],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  },

  // Events
  events: [
    { id: 'E001', title: 'Campus Placement Drive', date: '2025-01-15', time: '10:00-4:00', location: 'Main Auditorium', description: 'Tech companies visiting campus for recruitment' },
    { id: 'E002', title: 'Tech Fest 2025', date: '2025-02-10', time: '9:00-5:00', location: 'Sports Ground', description: 'Annual technical festival with competitions and exhibitions' },
    { id: 'E003', title: 'Hackathon', date: '2025-01-20', time: '9:00-9:00 (24hrs)', location: 'Computer Lab', description: '24-hour hackathon for coding enthusiasts' },
    { id: 'E004', title: 'Seminar on AI & Ethics', date: '2025-01-22', time: '2:00-4:00', location: 'Auditorium', description: 'Guest lecture by industry expert' },
  ],

  // Assignments
  assignments: [
    { id: 'A001', course: 'Data Structures', title: 'Implement Binary Search Tree', dueDate: '2025-01-20', submissionLink: 'https://classroom.google.com', status: 'active' },
    { id: 'A002', course: 'Database Management', title: 'Database Design Project', dueDate: '2025-01-25', submissionLink: 'https://classroom.google.com', status: 'active' },
    { id: 'A003', course: 'Artificial Intelligence', title: 'Machine Learning Model', dueDate: '2025-02-01', submissionLink: 'https://classroom.google.com', status: 'upcoming' },
    { id: 'A004', course: 'Web Technologies', title: 'Build a MERN App', dueDate: '2025-02-05', submissionLink: 'https://classroom.google.com', status: 'upcoming' },
  ],

  // Exam Schedule
  examSchedule: [
    { id: 'EX001', course: 'Data Structures', date: '2025-02-10', time: '10:00-1:00', room: 'Exam Hall A', marks: 100 },
    { id: 'EX002', course: 'Operating System', date: '2025-02-12', time: '2:00-5:00', room: 'Exam Hall B', marks: 100 },
    { id: 'EX003', course: 'Database Management', date: '2025-02-15', time: '10:00-1:00', room: 'Exam Hall C', marks: 100 },
    { id: 'EX004', course: 'Artificial Intelligence', date: '2025-02-17', time: '2:00-5:00', room: 'Exam Hall A', marks: 100 },
  ],

  // Campus Locations
  locations: [
    { id: 'LOC001', name: 'Main Building', address: 'Block A', coordinates: { lat: 18.5204, lng: 73.8567 }, facilities: ['Classrooms', 'Faculty Offices'] },
    { id: 'LOC002', name: 'Computer Lab', address: 'Block B', coordinates: { lat: 18.5205, lng: 73.8568 }, facilities: ['Computer Labs', 'AI Lab'] },
    { id: 'LOC003', name: 'Library', address: 'Block C', coordinates: { lat: 18.5206, lng: 73.8569 }, facilities: ['Books', 'Digital Resources'] },
    { id: 'LOC004', name: 'Cafeteria', address: 'Block D', coordinates: { lat: 18.5207, lng: 73.8570 }, facilities: ['Food', 'Seating'] },
  ],

  // Office Timings
  officeTimings: {
    admission: { mon_fri: '9:00-5:00', saturday: '9:00-1:00', sunday: 'Closed' },
    library: { mon_fri: '8:00-6:00', saturday: '10:00-4:00', sunday: 'Closed' },
    helpdesk: { mon_fri: '9:00-5:30', saturday: 'Closed', sunday: 'Closed' },
  },

  // Departments and Programs
  programs: [
    { id: 'CSE3', dept: 'CSE', semester: 3, section: 'B', strength: 60, classCoordinator: 'Dr. Josephine Prem Kumar' },
    { id: 'CSE3A', dept: 'CSE', semester: 3, section: 'A', strength: 65, classCoordinator: 'Dr. Rao' },
    { id: 'ECE3', dept: 'ECE', semester: 3, section: 'A', strength: 60, classCoordinator: 'Prof. Ramesh' },
  ],
};

export const getClassIdentifier = (input) => {
  // Parse "CSE 3 B" or "CSE3B" or "cse-3-b" etc.
  const match = input.toUpperCase().replace(/[-\s]/g, '');
  return match;
};

export const findTimetable = (classInput, day) => {
  // Try exact match first
  if (collegeData.timetables[classInput]) {
    return collegeData.timetables[classInput][day] || [];
  }
  // Try to find similar keys
  for (const key in collegeData.timetables) {
    if (key.replace(/\s/g, '') === classInput.replace(/\s/g, '')) {
      return collegeData.timetables[key][day] || [];
    }
  }
  return null; // Not found
};

export const resolveFacultyName = (facultyName) => {
  const faculty = collegeData.faculty.find(f => f.name.toLowerCase() === facultyName.toLowerCase() || f.id === facultyName);
  return faculty ? faculty.name : facultyName;
};
