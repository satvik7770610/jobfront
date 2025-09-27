import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:9090/jobback';
fetch(`${API_BASE_URL}/user/signup`, { ... })
fetch(`${API_BASE_URL}/user/signin`, { ... })
fetch(`${API_BASE_URL}/jobs`, { ... })
fetch(`${API_BASE_URL}/post-job`, { ... })

// A simple message box component for displaying feedback
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
    <div className={`fixed top-4 right-4 p-4 text-white rounded-lg shadow-lg z-50 transition-opacity duration-500 ${bgColor} transform-gpu`}>
      {message}
    </div>
  );
};

// Auth modal component for sign in and sign up
const AuthModal = ({ isSigningUp, onToggle, onFormSubmit, message, messageType, onClose }) => {
  const [role, setRole] = useState('user');

  const handleSubmit = (e) => {
    onFormSubmit(e, role);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm transform transition-transform duration-300 scale-95 hover:scale-100 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          {isSigningUp ? 'Join Now' : 'Welcome Back'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSigningUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200"
            required
          />
          {isSigningUp && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200"
            >
              <option value="user">User</option>
              <option value="recruiter">Recruiter</option>
            </select>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          {isSigningUp ? "Already have an account?" : "Don't have an account?"}
          <a href="#" onClick={onToggle} className="text-purple-600 hover:underline font-semibold ml-1">
            {isSigningUp ? 'Sign In' : 'Sign Up'}
          </a>
        </p>
        <MessageBox message={message} type={messageType} />
      </div>
    </div>
  );
};

// Home page component
const HomePage = ({ onShowAuthModal }) => (
  <div className="text-center py-20 bg-white rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight tracking-wide animate-fade-in">
      Find Your Dream Job
    </h1>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-delay-1">
      Explore thousands of opportunities from top companies and kickstart your career.
    </p>
    <div className="mt-8 flex justify-center space-x-4 animate-fade-in-delay-2">
      <a href="#jobs" className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
        Browse All Jobs
      </a>
      <button onClick={onShowAuthModal} className="inline-block border border-gray-300 text-gray-800 font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-gray-100">
        Sign In to Apply
      </button>
    </div>
    
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Trusted by leading companies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto items-center">
        {/* Placeholder SVG logos for companies like Google, Microsoft, etc. */}
        <img src="https://placehold.co/150x50/F8F9FA/7A7A7A?text=Google" alt="Google" className="h-12 w-auto mx-auto grayscale hover:grayscale-0 transition-all duration-300" />
        <img src="https://placehold.co/150x50/F8F9FA/7A7A7A?text=Microsoft" alt="Microsoft" className="h-12 w-auto mx-auto grayscale hover:grayscale-0 transition-all duration-300" />
        <img src="https://placehold.co/150x50/F8F9FA/7A7A7A?text=Amazon" alt="Amazon" className="h-12 w-auto mx-auto grayscale hover:grayscale-0 transition-all duration-300" />
        <img src="https://placehold.co/150x50/F8F9FA/7A7A7A?text=Apple" alt="Apple" className="h-12 w-auto mx-auto grayscale hover:grayscale-0 transition-all duration-300" />
      </div>
    </div>
  </div>
);

// Jobs page component
const JobsPage = ({ onMessage }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const jobsData = await response.json();
        setJobs(jobsData);
      } catch (error) {
        onMessage('Error loading jobs. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [onMessage]);

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading jobs...</p>;
  if (jobs.length === 0) return <p className="text-center text-gray-500 text-lg">No jobs available at the moment.</p>;

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
            <p className="text-purple-600 font-medium mb-1">{job.company}</p>
            <p className="text-gray-600 flex items-center mb-4">
              <span className="mr-2 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
              </span>
              {job.location}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">{job.description.substring(0, 100)}...</p>
            <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

// Post Job page component
const PostJobPage = ({ onMessage }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const jobData = {
      title: form.title.value,
      company: form.company.value,
      location: form.location.value,
      description: form.description.value,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/post-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      const result = await response.text();
      if (response.ok) {
        onMessage('Job posted successfully!', 'success');
        window.location.hash = '#jobs';
      } else {
        onMessage(`Error: ${result}`, 'error');
      }
    } catch (error) {
      onMessage('Network error. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" name="title" placeholder="Job Title" className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200" required />
        <input type="text" name="company" placeholder="Company Name" className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200" required />
        <input type="text" name="location" placeholder="Location" className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200" required />
        <textarea name="description" placeholder="Job Description" rows="8" className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200" required />
        <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
          Post Job
        </button>
      </form>
    </div>
  );
};

// Profile page component
const ProfilePage = ({ onMessage }) => {
  const [profile, setProfile] = useState({ name: 'Loading...', email: 'Loading...' });

  useEffect(() => {
    // Get the email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      fetch(`${API_BASE_URL}/user/getfullname`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csrid: email })
      })
      .then(res => res.text())
      .then(name => setProfile({ name, email }))
      .catch(() => onMessage('Failed to load profile details.', 'error'));
    }
  }, [onMessage]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Profile</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-6xl shadow-inner">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-700">{profile.name}</h3>
        <p className="text-gray-500 text-sm">{profile.email}</p>
      </div>
      <div className="mt-10 space-y-4">
        <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Your Applications</h4>
        <p className="text-gray-500 text-center">No applications found.</p>
      </div>
    </div>
  );
};

const Header = ({ isAuthenticated, onLogout, onShowAuthModal, userRole }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center space-x-2 transition-all duration-200 hover:scale-105">
          <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6 6a1 1 0 00-1 1v3a1 1 0 00.55-.26.995.995 0 00.45.74V7h2V6H6zm-1 8a1 1 0 00-1-1v-3a1 1 0 00.55.26.995.995 0 00.45.74V13h2v1H5zm6-7a1 1 0 00-1 1v3a1 1 0 00.55-.26.995.995 0 00.45.74V9h2V8h-2zm-1 5a1 1 0 00-1 1v3a1 1 0 00.55.26.995.995 0 00.45.74V15h2v-1h-2z" clipRule="evenodd"></path><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 0116 0A8 8 0 012 10z"></path>
          </svg>
          <span className="font-bold text-2xl text-gray-800">JobPortal</span>
        </a>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200">Home</a>
          <a href="#jobs" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200">Jobs</a>
          {userRole === 'recruiter' && (
            <a href="#post-job" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200">Post a Job</a>
          )}
          <a href="#profile" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200">Profile</a>
          {isAuthenticated ? (
            <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg">
              Logout
            </button>
          ) : (
            <button onClick={onShowAuthModal} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg">
              Sign In
            </button>
          )}
        </div>
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#home" className="block text-gray-600 hover:text-purple-600 transition-colors duration-200">Home</a>
            <a href="#jobs" className="block text-gray-600 hover:text-purple-600 transition-colors duration-200">Jobs</a>
            {userRole === 'recruiter' && (
              <a href="#post-job" className="block text-gray-600 hover:text-purple-600 transition-colors duration-200">Post a Job</a>
            )}
            <a href="#profile" className="block text-gray-600 hover:text-purple-600 transition-colors duration-200">Profile</a>
            {isAuthenticated ? (
              <button onClick={onLogout} className="w-full text-left bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200">Logout</button>
            ) : (
              <button onClick={onShowAuthModal} className="w-full text-left bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200">Sign In</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserRole(null);
    setMessage('Logged out successfully.');
    setMessageType('success');
    window.location.hash = '#';
  };

  const handleAuthSubmit = async (e, role = null) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value;
    const email = form.email.value;
    const password = form.password.value;
    let url = '';
    let data = { emailid: email, password: password, role: role, name: name };

    if (isSigningUp) {
      url = `${API_BASE_URL}/user/signup`;
    } else {
      url = `${API_BASE_URL}/user/signin`;
      delete data.role; // Don't send role for sign-in
      delete data.name;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', result.token);
        localStorage.setItem('userRole', result.role);
        localStorage.setItem('userEmail', email); // Store the user's email
        setIsAuthenticated(true);
        setUserRole(result.role);
        setShowAuthModal(false);
        handleMessage(isSigningUp ? 'Sign up successful!' : 'Sign in successful!', 'success');
        window.location.hash = '#home';
      } else {
        handleMessage(`Error: ${result.error || 'Authentication failed'}`, 'error');
      }
    } catch (error) {
      handleMessage('Network error. Please try again.', 'error');
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onShowAuthModal={() => setShowAuthModal(true)} />;
      case 'jobs':
        return <JobsPage onMessage={handleMessage} />;
      case 'post-job':
        // Only render the PostJobPage if the user is a recruiter
        return userRole === 'recruiter' ? <PostJobPage onMessage={handleMessage} /> : <p className="text-center text-red-500 font-bold">You do not have permission to view this page.</p>;
      case 'profile':
        return <ProfilePage onMessage={handleMessage} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} onShowAuthModal={() => setShowAuthModal(true)} userRole={userRole} />
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
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderContent()}
      </main>
      <MessageBox message={message} type={messageType} />
    </div>
  );
};

export default App;
