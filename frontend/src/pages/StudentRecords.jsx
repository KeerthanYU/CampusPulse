import React, { useState } from 'react';
import { getStudentRecords } from '../services/api';
import { useAuth } from '../context/AuthContext';
import UnauthorizedModal from '../components/UnauthorizedModal';

const StudentRecords = () => {
  const { role } = useAuth();
  const [records, setRecords] = useState(null);
  const [err, setErr] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchRecords = async () => {
    setErr(null);
    setRecords(null);
    try {
      const data = await getStudentRecords(role);
      setRecords(data);
    } catch (e) {
      if (e.status === 403) {
        setShowModal(true);
      } else {
        setErr(e.message || 'Failed to load');
      }
    }
  };

  return (
    <div className="panel">
      <h3>Student Records</h3>
      <p className="muted">Role: {role || 'Not set'}</p>

      <div style={{marginTop:12}}>
        <button className="btn-primary" onClick={fetchRecords}>Load Student Records</button>
      </div>

      {err && <div className="error" style={{marginTop:12}}>{err}</div>}

      {records && (
        <table className="records-table" style={{marginTop:12}}>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Year</th></tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.year}</td></tr>
            ))}
          </tbody>
        </table>
      )}

      <UnauthorizedModal open={showModal} onClose={() => setShowModal(false)} message={`Your role (${role}) is not authorized to access student records.`} />
    </div>
  );
};

export default StudentRecords;
