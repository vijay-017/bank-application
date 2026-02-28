import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/pages/PayBill.css';

const PayBill = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state || null;

    const billCategories = [
        {
            title: "Most common",
            items: [
                { icon: "🧾", label: "Electricity Bill" },
                { icon: "🚿", label: "Water Bill" },
                { icon: "🔥", label: "Gas Bill" },
                { icon: "🗑️", label: "Municipality / Property Tax" }
            ]
        },
        {
            title: "Communication Bills",
            items: [
                { icon: "📱", label: "Mobile Recharge / Postpaid Bill" },
                { icon: "🌐", label: "Internet / Broadband Bill" },
                { icon: "📺", label: "DTH / Cable TV Bill" }
            ]
        },
        {
            title: "Financial Bills",
            items: [
                { icon: "💳", label: "Credit Card Bill Payment" },
                { icon: "🏠", label: "Loan EMI" },
                { icon: "🏡", label: "Home Loan" },
                { icon: "🚗", label: "Car Loan" },
                { icon: "👔", label: "Personal Loan" }
            ]
        },
        {
            title: "Transport Related",
            items: [
                { icon: "🚘", label: "Vehicle Insurance" },
                { icon: "🛣️", label: "FASTag Recharge" },
                { icon: "🚦", label: "Traffic Challan" }
            ]
        },
        {
            title: "Insurance",
            items: [
                { icon: "❤️", label: "Health Insurance Premium" },
                { icon: "👨‍👩‍👧", label: "Life Insurance Premium" },
                { icon: "🚗", label: "Vehicle Insurance Renewal" }
            ]
        },
        {
            title: "Education",
            items: [
                { icon: "🏫", label: "School Fees" },
                { icon: "🎓", label: "College Fees" },
                { icon: "📚", label: "Online Course Payments" }
            ]
        }
    ];

    const handlePay = (billLabel) => {
        // Mock functionality for now
        alert(`Initiating payment for: ${billLabel}`);
    };

    return (
        <div className="pay-bill-container">
            <header className="pay-bill-header glass-panel">
                <button className="back-btn" onClick={() => navigate('/dashboard', { state: user })}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Dashboard
                </button>
                <div className="header-center">
                    <h1>Pay Utility Bills</h1>
                    <span className="header-subtitle">Fast, Secure & Convenient Payments</span>
                </div>
                <div className="header-right"></div>
            </header>

            <div className="categories-grid">
                {billCategories.map((category, idx) => (
                    <div key={idx} className="category-card">
                        <h3 className="category-title">{category.title}</h3>
                        <div className="bill-items">
                            {category.items.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    className="bill-item"
                                    onClick={() => handlePay(item.label)}
                                >
                                    <div className="bill-info">
                                        <span className="bill-icon">{item.icon}</span>
                                        <span className="bill-label">{item.label}</span>
                                    </div>
                                    <span className="pay-tag">PAY NOW</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PayBill;
