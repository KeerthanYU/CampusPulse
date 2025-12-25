import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login.jsx';
import RoleChoice from './pages/RoleChoice.jsx';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import StudentRecords from './pages/StudentRecords';

// App sets up top-level routes. ProtectedRoute ensures auth required pages.
function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<RoleChoice />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/student-records"
				element={
					<ProtectedRoute>
						<StudentRecords />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

export default App;
