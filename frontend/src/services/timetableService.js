import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";

// In-memory cache for API responses
const timetableCache = {};
const CACHE_TTL_MS = 60 * 1000; // 60s

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Get timetable for a specific day by calling backend API
 * Falls back to Firebase if API fails
 */
export const getTimetableForDay = async (day, classId = "all") => {
  try {
    // Validate inputs
    if (!day || !classId) {
      console.warn('getTimetableForDay: missing day or classId', { day, classId });
      return [];
    }

    // Check cache first
    const cacheKey = `${classId}::${day}`;
    const cached = timetableCache[cacheKey];
    if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) {
      console.log('Returning cached timetable:', cacheKey);
      return cached.data;
    }

    // Try backend API first
    try {
      console.log(`Fetching timetable from API: class=${classId}, day=${day}`);
      const encodedClass = encodeURIComponent(classId);
      const encodedDay = encodeURIComponent(day);
      const response = await fetch(
        `${API_BASE}/api/timetable?class=${encodedClass}&day=${encodedDay}`
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && result.data.entries) {
          const entries = result.data.entries.map(entry => ({
            startTime: entry.startTime || 'Not available',
            endTime: entry.endTime || 'Not available',
            subject: entry.subject || 'Not available',
            room: entry.room || 'N/A',
            facultyName: entry.facultyName || 'Not available',
            type: entry.type || 'Class',
            raw: entry
          }));

          // Cache the result
          timetableCache[cacheKey] = { ts: Date.now(), data: entries };
          console.log(`Cached ${entries.length} timetable entries for ${cacheKey}`);
          return entries;
        }
      }
    } catch (apiError) {
      console.warn('API call failed, falling back to Firebase:', apiError.message);
    }

    // Fallback to Firebase if API fails
    console.log('Falling back to Firebase for timetable');
    const firebaseData = await getTimetableFromFirebase(day, classId);
    timetableCache[cacheKey] = { ts: Date.now(), data: firebaseData };
    return firebaseData;

  } catch (error) {
    console.error('Error in getTimetableForDay:', error);
    return [];
  }
};

/**
 * Get full week timetable by calling backend API
 */
export const getFullTimetable = async (classId = "all") => {
  try {
    if (!classId) {
      console.warn('getFullTimetable: missing classId');
      return {};
    }

    try {
      console.log(`Fetching full timetable from API: class=${classId}`);
      const encodedClass = encodeURIComponent(classId);
      const response = await fetch(`${API_BASE}/api/timetable/full?class=${encodedClass}`);

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && result.data.timetable) {
          return result.data.timetable;
        }
      }
    } catch (apiError) {
      console.warn('API call failed for full timetable:', apiError.message);
    }

    return {};
  } catch (error) {
    console.error('Error in getFullTimetable:', error);
    return {};
  }
};

/**
 * Get next class for today
 */
export const getNextClass = async (classId = "all") => {
  try {
    if (!classId) {
      return { success: false, error: 'Missing classId' };
    }

    try {
      console.log(`Fetching next class from API: class=${classId}`);
      const encodedClass = encodeURIComponent(classId);
      const response = await fetch(`${API_BASE}/api/timetable/next?class=${encodedClass}`);

      if (response.ok) {
        return await response.json();
      }
    } catch (apiError) {
      console.warn('API call failed for next class:', apiError.message);
    }

    return { success: false, error: 'Unable to fetch next class' };
  } catch (error) {
    console.error('Error in getNextClass:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Search timetable by subject
 */
export const searchBySubject = async (subject) => {
  try {
    if (!subject) {
      return { success: false, error: 'Missing subject' };
    }

    try {
      console.log(`Searching timetable for subject: ${subject}`);
      const encodedSubject = encodeURIComponent(subject);
      const response = await fetch(`${API_BASE}/api/timetable/search?subject=${encodedSubject}`);

      if (response.ok) {
        return await response.json();
      }
    } catch (apiError) {
      console.warn('API call failed for subject search:', apiError.message);
    }

    return { success: false, error: 'Unable to search timetable' };
  } catch (error) {
    console.error('Error in searchBySubject:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fallback: Get timetable from Firebase
 * Tries two common schemas:
 * 1) Collection-based: timetables/{classId}/{day} -> documents per period
 * 2) Document-based: timetables/{docId} with a `days` map
 */
const getTimetableFromFirebase = async (day, classId) => {
  try {
    // Try collection-based schema first
    const timetableRef = collection(db, "timetables", classId, day);
    const snapshot = await getDocs(timetableRef);

    let rawEntries = [];

    if (snapshot && snapshot.docs && snapshot.docs.length > 0) {
      rawEntries = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } else {
      // Fallback: try document-based schema
      try {
        const docRef = doc(db, 'timetables', classId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const dayKey = ('' + day).toLowerCase();
          const capitalized = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
          rawEntries = data.days?.[dayKey] || data.days?.[capitalized] || [];
        }
      } catch (err) {
        console.warn('Firebase fallback failed:', err);
      }
    }

    if (!rawEntries || rawEntries.length === 0) return [];

    // Normalize entries to consistent format
    return rawEntries.map(entry => ({
      startTime: entry.startTime || entry.start || 'Not available',
      endTime: entry.endTime || entry.end || 'Not available',
      subject: entry.subject || entry.subjectName || 'Not available',
      room: entry.room || 'N/A',
      facultyName: entry.facultyName || entry.faculty || 'Not available',
      raw: entry
    }));

  } catch (error) {
    console.error('Error fetching from Firebase:', error);
    return [];
  }
};

export default {
  getTimetableForDay,
  getFullTimetable,
  getNextClass,
  searchBySubject
};
