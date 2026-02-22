import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { formatTransactionDate } from '../utils/dateFormatter';
import '../styles/pages/TransactionHistory.css';

const TransactionHistory = () => {
    const location = useLocation();
    const user = location.state || null;
    const [allTransactions, setAllTransactions] = useState([]);

    useEffect(() => {
        if (user?.id) {
            axios.get(`http://localhost:9090/transaction/${user.id}`)
                .then(response => {
                    setAllTransactions(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [user?.id]);

    const [filterType, setFilterType] = useState('all');
    const [filterDate, setFilterDate] = useState('');

    // Filter Logic
    const filteredTransactions = allTransactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(t => {
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
                                                {t.type === 'DEPOSIT' ? '↓' : '↑'}
                                            </div>
                                            <span style={{ fontWeight: '500' }}>{t.title}</span>
                                        </div>
                                    </td>
                                    <td>{t.category}</td>
                                    <td>{formatTransactionDate(t.date)}</td>
                                    <td>
                                        <span className={`status-pill status-${t.status}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className={`amount ${t.type}`}>
                                            {t.type === 'DEPOSIT' ? '+' : '-'}${t.amount.toFixed(2)}
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
