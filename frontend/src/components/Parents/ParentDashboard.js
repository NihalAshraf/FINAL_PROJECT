import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import './ParentDashboard.css';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const childProfile = {
    name: "Aarav Sharma",
    age: "6 years",
    condition: "Developmental Delay",
    therapist: "Dr. Sarah Johnson",
    nextSession: "Tomorrow, 2:00 PM"
  };

  const progressData = [
    { week: "Week 1", score: 70, exercises: 8, sessions: 3 },
    { week: "Week 2", score: 73, exercises: 10, sessions: 4 },
    { week: "Week 3", score: 74, exercises: 12, sessions: 4 },
    { week: "Week 4", score: 78, exercises: 15, sessions: 5 },
    { week: "Week 5", score: 82, exercises: 18, sessions: 5 },
    { week: "Week 6", score: 84, exercises: 20, sessions: 6 },
  ];

  const exerciseData = [
    { name: 'Balance', value: 85, color: '#f59e0b' },
    { name: 'Coordination', value: 72, color: '#667eea' },
    { name: 'Strength', value: 78, color: '#10b981' },
    { name: 'Flexibility', value: 65, color: '#ef4444' },
  ];

  const recentActivities = [
    { date: "Today", activity: "Balance exercises completed", time: "2:30 PM", status: "completed" },
    { date: "Yesterday", activity: "Therapy session with Dr. Johnson", time: "3:00 PM", status: "completed" },
    { date: "2 days ago", activity: "Coordination training", time: "4:15 PM", status: "completed" },
    { date: "3 days ago", activity: "Strength building exercises", time: "2:45 PM", status: "completed" },
  ];

  const upcomingSessions = [
    { date: "Tomorrow", time: "2:00 PM", therapist: "Dr. Sarah Johnson", type: "Physical Therapy" },
    { date: "Friday", time: "3:30 PM", therapist: "Dr. Sarah Johnson", type: "Assessment" },
    { date: "Next Monday", time: "2:00 PM", therapist: "Dr. Sarah Johnson", type: "Physical Therapy" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">Progress: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="parent-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Parent Dashboard</h1>
            <p className="dashboard-subtitle">Track your child's progress and manage appointments</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">P</div>
              <div className="user-details">
                <span className="user-name">Parent User</span>
                <span className="user-role">Parent</span>
              </div>
            </div>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          Progress
        </button>
        <button 
          className={`nav-tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={`nav-tab ${activeTab === 'exercises' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
          Exercises
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            {/* Child Profile Card */}
            <div className="dashboard-card profile-card">
              <div className="card-header">
                <h2 className="card-title">Child Profile</h2>
                <button className="edit-btn">Edit</button>
              </div>
              <div className="profile-content">
                <div className="child-avatar">{childProfile.name.charAt(0)}</div>
                <h3 className="child-name">{childProfile.name}</h3>
                <div className="profile-details">
                  <div className="detail-item">
                    <span className="detail-label">Age:</span>
                    <span className="detail-value">{childProfile.age}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Condition:</span>
                    <span className="detail-value">{childProfile.condition}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Therapist:</span>
                    <span className="detail-value">{childProfile.therapist}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Next Session:</span>
                    <span className="detail-value highlight">{childProfile.nextSession}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="dashboard-card progress-card">
              <div className="card-header">
                <h2 className="card-title">Progress Overview</h2>
                <span className="progress-score">84%</span>
              </div>
              <p className="card-description">
                Your child's overall progress score over the last 6 weeks
              </p>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={progressData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#f59e0b" 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                    name="Progress Score" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Exercise Performance */}
            <div className="dashboard-card performance-card">
              <div className="card-header">
                <h2 className="card-title">Exercise Performance</h2>
              </div>
              <div className="performance-grid">
                {exerciseData.map((exercise, index) => (
                  <div key={index} className="performance-item">
                    <div className="performance-header">
                      <span className="performance-name">{exercise.name}</span>
                      <span className="performance-score">{exercise.value}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${exercise.value}%`, 
                          backgroundColor: exercise.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="dashboard-card activities-card">
              <div className="card-header">
                <h2 className="card-title">Recent Activities</h2>
              </div>
              <div className="activities-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon completed">✓</div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.activity}</p>
                      <span className="activity-time">{activity.date} at {activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="progress-detail">
            <div className="dashboard-card">
              <h2 className="card-title">Detailed Progress Analysis</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#f59e0b" name="Progress Score" />
                  <Bar dataKey="exercises" fill="#667eea" name="Exercises Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="card-title">Upcoming Sessions</h2>
                <button className="schedule-btn">Schedule New</button>
              </div>
              <div className="appointments-list">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="appointment-item">
                    <div className="appointment-date">
                      <span className="date-day">{session.date}</span>
                      <span className="date-time">{session.time}</span>
                    </div>
                    <div className="appointment-details">
                      <h4 className="session-type">{session.type}</h4>
                      <p className="therapist-name">{session.therapist}</p>
                    </div>
                    <button className="reschedule-btn">Reschedule</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="exercises-section">
            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="card-title">Assigned Exercises</h2>
                <button className="add-exercise-btn">Add Exercise</button>
              </div>
              <div className="exercises-grid">
                <div className="exercise-item">
                  <div className="exercise-icon">🏃‍♂️</div>
                  <h4>Balance Training</h4>
                  <p>Improve balance and coordination</p>
                  <span className="exercise-duration">15 minutes</span>
                </div>
                <div className="exercise-item">
                  <div className="exercise-icon">🤸‍♂️</div>
                  <h4>Stretching Routine</h4>
                  <p>Increase flexibility and range of motion</p>
                  <span className="exercise-duration">10 minutes</span>
                </div>
                <div className="exercise-item">
                  <div className="exercise-icon">💪</div>
                  <h4>Strength Building</h4>
                  <p>Build muscle strength and endurance</p>
                  <span className="exercise-duration">20 minutes</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ParentDashboard;
