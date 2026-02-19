import React, { useState } from 'react';
import '../styles/pages/TransactionHistory.css';

const TransactionHistory = () => {
    // Mock Data
    const allTransactions = [
        { id: 1, date: '2026-02-08', title: 'Netflix Subscription', type: 'debit', amount: 15.99, status: 'completed', category: 'Entertainment' },
        { id: 2, date: '2026-02-07', title: 'Salary Deposit', type: 'credit', amount: 3500.00, status: 'completed', category: 'Salary' },
        { id: 3, date: '2026-02-06', title: 'Grocery Store', type: 'debit', amount: 64.20, status: 'completed', category: 'Food' },
        { id: 4, date: '2026-02-05', title: 'Electric Bill', type: 'debit', amount: 120.50, status: 'completed', category: 'Utilities' },
        { id: 5, date: '2026-02-04', title: 'Freelance Payment', type: 'credit', amount: 450.00, status: 'pending', category: 'Freelance' },
        { id: 6, date: '2026-02-04', title: 'Coffee Shop', type: 'debit', amount: 5.50, status: 'completed', category: 'Food' },
        { id: 7, date: '2026-02-03', title: 'Amazon Purchase', type: 'debit', amount: 89.99, status: 'completed', category: 'Shopping' },
        { id: 8, date: '2026-02-01', title: 'Gym Membership', type: 'debit', amount: 45.00, status: 'failed', category: 'Health' },
    ];

    const [filterType, setFilterType] = useState('all');
    const [filterDate, setFilterDate] = useState('');

    // Filter Logic
    const filteredTransactions = allTransactions.filter(t => {
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesDate = filterDate === '' || t.date === filterDate;
        return matchesType && matchesDate;
    });

    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <div className="history-container">
            <div className="history-header">
                <div>
                    <h1>Transaction History</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>View and manage your past transactions.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-download" onClick={handleDownloadPDF}>
                        <span>⬇ PDF</span> Download
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section glass-panel">
                <div className="filter-group">
                    <label>Type:</label>
                    <select
                        className="filter-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Transactions</option>
                        <option value="credit">Credit (Incoming)</option>
                        <option value="debit">Debit (Outgoing)</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        className="filter-date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
                {(filterType !== 'all' || filterDate !== '') && (
                    <button
                        onClick={() => { setFilterType('all'); setFilterDate(''); }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '0.9rem'
                        }}
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Transactions List */}
            <div className="transactions-table-container glass-panel">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Transaction</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((t) => (
                                <tr key={t.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div className="t-icon-small">
                                                {t.type === 'credit' ? '↓' : '↑'}
                                            </div>
                                            <span style={{ fontWeight: '500' }}>{t.title}</span>
                                        </div>
                                    </td>
                                    <td>{t.category}</td>
                                    <td>{t.date}</td>
                                    <td>
                                        <span className={`status-pill status-${t.status}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className={`amount ${t.type}`}>
                                            {t.type === 'credit' ? '+' : '-'}${t.amount.toFixed(2)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-transactions">
                                    No transactions found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
