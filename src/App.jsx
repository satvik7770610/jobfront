import React, { useState, useEffect } from 'react';

// Use environment variable for backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090/jobback';

// Message box component
const MessageBox = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 p-4 text-white rounded-lg shadow-lg z-50 transition-opacity duration-500 ${bgColor}`}>
      {message}
    </div>
  );
};

// Auth modal
const AuthModal = ({ isSigningUp, onToggle, onFormSubmit, message, messageType, onClose }) => {
  const [role, setRole] = useState('user');

  const handleSubmit = (e) => onFormSubmit(e, role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          {isSigningUp ? 'Join Now' : 'Welcome Back'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSigningUp && (
            <input type="text" name="name" placeholder="Full Name" className="w-full px-5 py-3 rounded-xl border" required />
          )}
          <input type="email" name="email" placeholder="Email Address" className="w-full px-5 py-3 rounded-xl border" required />
          <input type="password" name="password" placeholder="Password" className="w-full px-5 py-3 rounded-xl border" required />
          {isSigningUp && (
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-5 py-3 rounded-xl border">
              <option value="user">User</option>
              <option value="recruiter">Recruiter</option>
            </select>
          )}
          <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl">
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          {isSigningUp ? "Already have an account?" : "Don't have an account?"}
          <a href="#" onClick={onToggle} className="text-purple-600 ml-1">
            {isSigningUp ? 'Sign In' : 'Sign Up'}
          </a>
        </p>
        <MessageBox message={message} type={messageType} />
      </div>
    </div>
  );
};

// Example: Jobs page
const JobsPage = ({ onMessage }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobs`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        onMessage('Error loading jobs.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [onMessage]);

  if (loading) return <p>Loading jobs...</p>;
  if (!jobs.length) return <p>No jobs available.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map(job => (
        <div key={job.id} className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold">{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.description.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

// Main App
const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleAuthSubmit = async (e, role = null) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value;
    const email = form.email.value;
    const password = form.password.value;

    let url = isSigningUp ? `${API_BASE_URL}/user/signup` : `${API_BASE_URL}/user/signin`;
    let data = { emailid: email, password, role, name };

    if (!isSigningUp) {
      delete data.role;
      delete data.name;
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        handleMessage(isSigningUp ? 'Sign up successful!' : 'Sign in successful!', 'success');
        setShowAuthModal(false);
      } else {
        handleMessage(result.error || 'Authentication failed', 'error');
      }
    } catch {
      handleMessage('Network error.', 'error');
    }
  };

  return (
    <div>
      <button onClick={() => setShowAuthModal(true)}>Sign In / Sign Up</button>
      {showAuthModal && (
        <AuthModal
          isSigningUp={isSigningUp}
          onToggle={() => setIsSigningUp(!isSigningUp)}
          onFormSubmit={handleAuthSubmit}
          onClose={() => setShowAuthModal(false)}
          message={message}
          messageType={messageType}
        />
      )}
      <JobsPage onMessage={handleMessage} />
      <MessageBox message={message} type={messageType} />
    </div>
  );
};

export default App;
