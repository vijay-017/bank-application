import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/Recharge.css';

const Recharge = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state || null;

    const rechargeCategories = [
        {
            title: "📞 Mobile Recharge (Most Important)",
            type: "mobile",
            items: [
                {
                    label: "Prepaid Mobile Recharge",
                    operators: ["Jio", "Airtel", "VI", "BSNL"],
                    plans: ["Talktime Recharge", "Data Pack", "SMS Pack", "Unlimited Plan"]
                }
            ]
        },
        {
            title: "📺 DTH Recharge",
            type: "dth",
            items: [
                {
                    label: "Dish TV Services",
                    operators: ["Tata Play", "Dish TV", "Airtel DTH", "Sun Direct"],
                    description: "Recharge your TV subscription in seconds"
                }
            ]
        },
        {
            title: "🛣️ FASTag Recharge",
            type: "fastag",
            items: [
                {
                    label: "Vehicle FASTag Wallet",
                    description: "Quick recharge for seamless toll payments"
                }
            ]
        },
        {
            title: "⚡ Electricity Prepaid",
            type: "electricity",
            items: [
                {
                    label: "Smart Meter Recharge",
                    description: "Instant recharge just like mobile balance"
                }
            ]
        }
    ];

    const handleAction = (label) => {
        alert(`Proceeding to recharge for: ${label}`);
    };

    return (
        <div className="recharge-container">
            <header className="recharge-header glass-panel">
                <button className="back-btn" onClick={() => navigate('/dashboard', { state: user })}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Dashboard
                </button>
                <div className="header-center">
                    <h1>Ready to Recharge?</h1>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Secure payments for all your utility needs</span>
                </div>
                <div className="header-right"></div>
            </header>

            <div className="categories-grid">
                {rechargeCategories.map((category, idx) => (
                    <div key={idx} className="recharge-card">
                        <h3 className="category-title">{category.title}</h3>
                        <div className="recharge-items">
                            {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="recharge-item" onClick={() => handleAction(item.label)}>
                                    <div className="item-main">
                                        <div className="item-info">
                                            <span className="item-label">{item.label}</span>
                                        </div>
                                        <div className="action-tag" style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>GO →</div>
                                    </div>

                                    {item.description && (
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{item.description}</p>
                                    )}

                                    {item.operators && (
                                        <div className="operators-list">
                                            {item.operators.map((op, opIdx) => (
                                                <span key={opIdx} className="operator-badge">{op}</span>
                                            ))}
                                        </div>
                                    )}

                                    {item.plans && (
                                        <div className="plans-grid">
                                            {item.plans.map((plan, pIdx) => (
                                                <div key={pIdx} className="plan-item">{plan}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="extra-features">
                <span className="featured-icon">🛡️</span>
                <span className="featured-text">Secure Encrypted Payments | Instant Confirmation | 24/7 Support</span>
            </div>
        </div>
    );
};

export default Recharge;
