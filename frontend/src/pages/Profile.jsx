import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state || {}; // Get user from state

    const [activeTab, setActiveTab] = useState('personal');

    const [personalInfo, setPersonalInfo] = useState({
        firstName: user.name?.split(' ')[0] || 'Guest',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || 'guest@example.com',
        phone: user.phoneNo || '',
        address: user.address || 'Address not set'
    });

    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const devices = [
        { id: 1, name: 'MacBook Pro', type: 'laptop', location: 'New York, USA', lastActive: 'Currently Active', current: true },
        { id: 2, name: 'iPhone 14 Pro', type: 'mobile', location: 'New York, USA', lastActive: '2 hours ago', current: false },
        { id: 3, name: 'iPad Air', type: 'tablet', location: 'Boston, USA', lastActive: 'Feb 5, 2026', current: false },
    ];

    const notificationSettings = [
        { id: 'trans_email', label: 'Transaction Emails', desc: 'Receive emails for every transaction.', checked: true },
        { id: 'trans_push', label: 'Transaction Push', desc: 'Receive push notifications for transactions.', checked: true },
        { id: 'sec_alert', label: 'Security Alerts', desc: 'Get notified about new logins and security changes.', checked: true },
        { id: 'offers', label: 'Marketing Offers', desc: 'Receive updates about new features and promos.', checked: false },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prev => ({ ...prev, [name]: value }));
    };

    const renderPersonal = () => (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div className="section-header">
                <h2>Personal Information</h2>
            </div>
            <div className="form-grid">
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" className="form-input" value={personalInfo.firstName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" className="form-input" value={personalInfo.lastName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" className="form-input" value={personalInfo.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" className="form-input" value={personalInfo.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Address</label>
                    <input type="text" name="address" className="form-input" value={personalInfo.address} onChange={handleInputChange} />
                </div>
            </div>
            <button className="btn-save">Save Changes</button>
        </div>
    );

    const renderSecurity = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Password Change */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                <div className="section-header">
                    <h2>Change Password</h2>
                </div>
                <div className="form-grid" style={{ maxWidth: '600px' }}>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Current Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                </div>
                <button className="btn-save">Update Password</button>
            </div>

            {/* Manage Devices */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
                <div className="section-header">
                    <h2>Manage Devices</h2>
                </div>
                <div className="devices-list">
                    {devices.map(device => (
                        <div key={device.id} className="device-item">
                            <div className="device-info">
                                <div className="device-icon">
                                    {device.type === 'mobile' ? '📱' : device.type === 'laptop' ? '💻' : '📟'}
                                </div>
                                <div className="device-details">
                                    <h4>{device.name} {device.current && <span className="device-status">(This Device)</span>}</h4>
                                    <div className="device-meta">
                                        <span>{device.location}</span> • <span>{device.lastActive}</span>
                                    </div>
                                </div>
                            </div>
                            {!device.current && (
                                <button className="btn-logout" onClick={() => alert(`Logged out ${device.name}`)}>Logout</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div className="section-header">
                <h2>Notification Settings</h2>
            </div>
            <div className="settings-list">
                {notificationSettings.map(setting => (
                    <div key={setting.id} className="toggle-row">
                        <div className="toggle-label">
                            <h4>{setting.label}</h4>
                            <p>{setting.desc}</p>
                        </div>
                        <label className="switch">
                            <input type="checkbox" defaultChecked={setting.checked} />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="profile-container">
            {/* Sidebar */}
            <aside className="profile-sidebar">
                <div className="profile-card glass-panel">
                    <div className="profile-avatar">{personalInfo.firstName.charAt(0).toUpperCase()}</div>
                    <h3 className="profile-name">{personalInfo.firstName} {personalInfo.lastName}</h3>
                    <span className="profile-role">Premium User</span>
                </div>

                <div className="profile-nav glass-panel">
                    <div
                        className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        👤 Personal Details
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        🛡️ Security & Devices
                    </div>
                    <div
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        ⚙️ Preferences
                    </div>
                </div>

                <div className="glass-panel" style={{ marginTop: '1rem', padding: '1rem' }}>
                    <button
                        className="btn-logout"
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}
                        onClick={() => {
                            // Clear session/local storage here
                            localStorage.removeItem('userToken'); // Example
                            navigate('/login');
                        }}
                    >
                        <span>🚪</span> Sign Out
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <main className="profile-content">
                {activeTab === 'personal' && renderPersonal()}
                {activeTab === 'security' && renderSecurity()}
                {activeTab === 'settings' && renderSettings()}
            </main>
        </div>
    );
};

export default Profile;
