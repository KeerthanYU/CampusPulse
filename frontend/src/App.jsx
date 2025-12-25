import ProtectedRoute from "./routes/ProtectedRoute";

<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["admin"]} userRole={role}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
