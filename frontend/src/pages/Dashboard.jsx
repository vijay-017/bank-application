import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/Dashboard.css';

const Dashboard = () => {

    const location = useLocation();
    const user = location.state || {}; // Fallback to empty object if state is undefined
    const navigate = useNavigate();
    // Mock Data
    const [recentTransactions,setRecentTransactions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9090/transaction/${user.id}`)
            .then(response => {
                setRecentTransactions(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        console.log(recentTransactions);
    }, [recentTransactions]);

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header glass-panel" style={{ padding: '1rem', borderRadius: '12px' }}>
                <div className="logo-section">
                    <h2>GMR Bank</h2>
                </div>
                <div className="user-profile" onClick={() => navigate('/profile', { state: user })}>
                    <span>Good Morning, <strong>{user?.name || 'Guest'}</strong></span>
                    <div className="avatar">{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
                </div>
            </header>

            <div className="dashboard-grid">
                {/* Main Content Left */}
                <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Balance Card */}
                    <div className="balance-card">
                        <div className="balance-label">Total Balance</div>
                        <div className="balance-amount">{user?.balance?.toFixed(2) || "0.00"}</div>
                        <div className="card-actions">
                            <button className="card-btn">Add Money</button>
                            <button className="card-btn">Send</button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions glass-panel">
                        <h3 className="section-title">Quick Actions</h3>
                        <div className="actions-grid">
                            <div className="action-item" onClick={() => navigate('/fund-transfer')}>
                                <div className="action-icon">💸</div>
                                <span className="action-label">Transfer</span>
                            </div>
                            <div className="action-item">
                                <div className="action-icon">🧾</div>
                                <span className="action-label">Pay Bills</span>
                            </div>
                            <div className="action-item">
                                <div className="action-icon">📱</div>
                                <span className="action-label">Recharge</span>
                            </div>
                            <div className="action-item" onClick={() => navigate('/account-summary', { state: user })}>
                                <div className="action-icon">💳</div>
                                <span className="action-label">Account Info</span>
                            </div>
                            <div className="action-item">
                                <div className="action-icon">📊</div>
                                <span className="action-label">Invest</span>
                            </div>
                            <div className="action-item">
                                <div className="action-icon">more</div>
                                <span className="action-label">More</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar / Right Content */}
                <aside className="sidebar-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Recent Transactions */}
                    <div className="transactions-section glass-panel">
                        <h3 className="section-title">Recent Activity</h3>
                        <div className="transaction-list">
                            {recentTransactions.map(t => (
                                <div key={t.id} className="transaction-item">
                                    <div className="t-info">
                                        <div className="t-icon">
                                            {t.type === 'DEPOSIT' ? '↓' : '↑'}
                                        </div>
                                        <div className="t-details">
                                            <h4>{t.description}</h4>
                                            <span className="t-date">{t.date}</span>
                                        </div>
                                    </div>
                                    <span className={`t-amount ${t.type === 'DEPOSIT' ? 'positive' : 'negative'}`}>
                                        {t.type === 'DEPOSIT' ? '+' : ''}{t.amount.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div
                            style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                            onClick={() => navigate('/transactions')}
                        >
                            View All Transactions
                        </div>
                    </div>

                    {/* Promo Card or Stats */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', backgroundImage: 'linear-gradient(120deg, var(--bg-card) 0%, var(--bg-input) 100%)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Premium Savings</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Earn up to 4.5% APY with our new savings account.
                        </p>
                        <button style={{
                            width: '100%',
                            padding: '10px',
                            background: 'var(--text-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>
                            Upgrade Now
                        </button>
                    </div>

                </aside>
            </div>
        </div>
    );
};

export default Dashboard;