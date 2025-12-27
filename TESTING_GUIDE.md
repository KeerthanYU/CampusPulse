# CampusPulse Quick Start & Testing Guide

## Quick Start (Development)

### 1. Start Backend
```bash
cd backend
npm install  # if not already done
npm start
# Server should start on http://localhost:5000
```

### 2. Start Frontend
```bash
cd frontend
npm install  # if not already done
npm start
# App should open on http://localhost:3000
```

### 3. Test the Feature
Open the chat and try these commands in order:

#### Step 1: Set Your Class
Type: **"I'm in CSE 3 B"**

Expected response:
```
✅ Got it! I've saved your class as CSE 3 B. Now I can give you personalized timetables and assignments.
```

#### Step 2: Ask for Monday's Timetable
Type: **"What is Monday's timetable?"**

Expected response:
```
📅 **CSE 3 B** - Monday
---

**Period 1**
⏰ 8:30 - 9:25
📘 Data Structures and Application
👩‍🏫 Dr. Josephine Prem Kumar
🏫 G002

**Period 2**
⏰ 9:25 - 10:20
📘 Operating Systems
👩‍🏫 Dr. Rajesh Kumar
🏫 G003

**Period 3**
⏰ 10:40 - 11:35
📘 Database Management Systems
👩‍🏫 Dr. Divya Sharma
🏫 G002

... (more periods)
```

#### Step 3: Ask for Next Class
Type: **"What's my next class?"**

Expected response:
```
⏱️ Your next class on Monday:
9:25 - 10:20
📘 Subject: Operating Systems
👩‍🏫 Faculty: Dr. Rajesh Kumar
🏫 Room: G003
```

#### Step 4: Ask About Events
Type: **"What events are happening?"**

Expected response:
```
📢 Upcoming events: Placements (Jan 25), Tech Fest (Feb 10), Hackathon (Feb 28), Expert Seminar (Mar 5)
```

#### Step 5: Ask About Assignments
Type: **"What assignments do I have?"**

Expected response:
```
📝 Your assignments:
1. Data Structures Project (Due: Jan 30)
2. DBMS Queries (Due: Feb 5)
3. AI Assignment (Due: Feb 12)
4. Web Dev Project (Due: Feb 20)
```

#### Step 6: Switch to Different Class
Type: **"I'm in CSE 3 A"**

Expected response:
```
✅ Got it! I've saved your class as CSE 3 A. Now I can give you personalized timetables and assignments.
```

Then ask: **"Show me Tuesday's timetable"**

Expected: CSE 3 A's Tuesday schedule (if available in collegeData.js)

## API Testing (cURL/Postman)

### Test 1: Get Monday Timetable for CSE 3 B
```bash
curl "http://localhost:5000/api/timetable?class=CSE%203%20B&day=Monday"
```

Expected:
```json
{
  "success": true,
  "data": {
    "class": "CSE 3 B",
    "day": "Monday",
    "entries": [
      {
        "startTime": "8:30",
        "endTime": "9:25",
        "subject": "Data Structures and Application",
        "room": "G002",
        "facultyName": "Dr. Josephine Prem Kumar",
        "type": "Lecture"
      },
      ...
    ],
    "count": 6
  }
}
```

### Test 2: Get Full Week Timetable
```bash
curl "http://localhost:5000/api/timetable/full?class=CSE%203%20B"
```

Expected:
```json
{
  "success": true,
  "data": {
    "class": "CSE 3 B",
    "timetable": {
      "Monday": [...],
      "Tuesday": [...],
      "Wednesday": [...],
      "Thursday": [...],
      "Friday": [...]
    },
    "totalClasses": 30
  }
}
```

### Test 3: Get Next Class
```bash
curl "http://localhost:5000/api/timetable/next?class=CSE%203%20B"
```

Expected:
```json
{
  "success": true,
  "data": {
    "class": "CSE 3 B",
    "nextClass": {
      "day": "Monday",
      "startTime": "8:30",
      "endTime": "9:25",
      "subject": "Data Structures and Application",
      "facultyName": "Dr. Josephine Prem Kumar",
      "room": "G002"
    },
    "message": "Next class is at 8:30"
  }
}
```

### Test 4: Search by Subject
```bash
curl "http://localhost:5000/api/timetable/search?subject=AI"
```

Expected:
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "class": "CSE 3 B",
        "day": "Thursday",
        "startTime": "14:00",
        "endTime": "14:55",
        "subject": "AI & ML",
        "facultyName": "Dr. Rajesh Sharma",
        "room": "G001"
      }
    ],
    "count": 1
  }
}
```

## Testing Different Class Formats

All these should work and extract "CSE 3 B":

```
- "I am in CSE 3 B" ✓
- "I'm studying in CSE 3 B" ✓
- "My class is CSE3B" ✓
- "My section is CSE-3-B" ✓
- "Class is CSE 3 B" ✓
- "studying cse 3 b" ✓
```

## Browser DevTools

### Check Local Storage
1. Open DevTools (F12)
2. Go to "Application" → "Local Storage"
3. Look for key: `cp_auth`
4. Value should contain: `{"user":{...},"role":"student","studentClass":"CSE 3 B"}`

### Check Console
Look for logs like:
```
Fetching timetable from API: class=CSE 3 B, day=Monday
API call successful, caching response...
Cached 6 timetable entries for CSE 3 B::Monday
```

## Troubleshooting

### Issue 1: "⚠️ Unable to fetch timetable right now"
**Check**:
- Is backend running on http://localhost:5000?
- Are there CORS errors in console? (usually show in DevTools Network tab)
- Is `/api/timetable` route properly configured?

**Fix**:
```bash
# Stop and restart backend
cd backend
npm start
# Should see "Server running on port 5000"
```

### Issue 2: No classes returned for valid day
**Check**:
- Does `collegeData.js` have timetable data for that day?
- Is the class name correctly formatted?

**Fix**:
Edit `backend/data/collegeData.js` and verify:
```javascript
const timetables = {
  'CSE 3 B': {
    Monday: [
      { startTime: '8:30', endTime: '9:25', ... },
      ...
    ],
    ...
  }
}
```

### Issue 3: Class context not saving
**Check**:
- Is localStorage enabled in browser?
- Does the extracted class match available classes?

**Fix**:
Try: "I am in CSE 3 B" (exactly as written in collegeData)

### Issue 4: App crashes when asking for timetable
**Check**:
- Are there errors in browser console?
- Is the API responding with valid JSON?

**Fix**:
Test API directly:
```bash
curl "http://localhost:5000/api/timetable?class=CSE%203%20B&day=Monday" 2>&1 | python -m json.tool
```

Should return valid JSON.

## File Locations Quick Reference

- **Backend API**: `/backend/controllers/timetableController.js`
- **Backend Service**: `/backend/services/timetableService.js`
- **Backend Routes**: `/backend/routes/timetableRoutes.js`
- **College Data**: `/backend/data/collegeData.js`
- **Frontend Service**: `/frontend/src/services/timetableService.js`
- **Intent Detector**: `/frontend/src/utils/intentDetector.js`
- **Chat Component**: `/frontend/src/components/ChatWindow.jsx`
- **Auth Context**: `/frontend/src/context/AuthContext.jsx`

## Feature Checklist

Test each feature:

- [ ] Chat loads without errors
- [ ] Can type and send message
- [ ] "I'm in CSE 3 B" → saves class context
- [ ] "Show me Monday's timetable" → returns 6+ real classes
- [ ] Each class shows: time, subject, faculty, room
- [ ] Page refresh → class context persists
- [ ] "What's my next class?" → returns next class
- [ ] "What events are coming?" → shows events
- [ ] "What assignments?" → shows assignments
- [ ] Can switch to "CSE 3 A" and get that class's data
- [ ] Invalid queries show helpful suggestions
- [ ] Loading spinner appears during fetch
- [ ] API endpoints work with cURL/Postman
- [ ] No console errors
- [ ] No generic fallback messages (✓ = feature working!)

## Production Deployment Checklist

Before deploying to production:

- [ ] Set `REACT_APP_API_URL` to production backend URL in `.env.production`
- [ ] Update backend port if needed (currently 5000)
- [ ] Add CORS headers for production domain
- [ ] Implement proper authentication (currently using mock)
- [ ] Add rate limiting to API endpoints
- [ ] Enable HTTPS for API calls
- [ ] Add database backup strategy
- [ ] Set up monitoring and logging
- [ ] Create admin dashboard for data management
- [ ] Write API documentation
- [ ] Set up CI/CD pipeline
- [ ] Test thoroughly on staging environment
- [ ] Get security audit approval

## Next Steps

After verifying the feature works:

1. **Add more classes** to `collegeData.js` (ECE 3 B, ME 3 A, etc.)
2. **Connect to Firestore** for persistent data storage
3. **Create events/assignments endpoints** (`/api/events`, `/api/assignments`)
4. **Add user authentication** with role-based filtering
5. **Implement notifications** for upcoming classes
6. **Build mobile app** with React Native
7. **Add advanced search** with filters (faculty, room, time range)
8. **Create admin portal** for managing timetables
9. **Add analytics** for usage tracking
10. **Deploy to production** (Firebase Hosting, AWS, Heroku, etc.)

## Support

If you encounter issues:

1. Check browser console (F12 → Console tab)
2. Check backend terminal for errors
3. Test API endpoints with cURL
4. Verify collegeData.js has required data
5. Check localStorage for context persistence

---
**Happy Testing!** 🚀
