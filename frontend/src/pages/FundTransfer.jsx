import React, { useState } from 'react';
import '../styles/pages/FundTransfer.css';

const FundTransfer = () => {
    const [transferType, setTransferType] = useState('same-bank'); // self, same-bank, other-bank
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState(null); // 'success', 'processing', null

    const handleTransfer = (e) => {
        e.preventDefault();
        setStatus('processing');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    const renderFormFields = () => {
        switch (transferType) {
            case 'self':
                return (
                    <div className="form-section">
                        <div className="form-group">
                            <label className="label">To Account (My Accounts)</label>
                            <select className="select-field">
                                <option>Savings Account - **** 8899 ($12,450.00)</option>
                                <option>Secondary Savings - **** 4455 ($200.00)</option>
                                <option>Investment Account - **** 2211 ($1,000.00)</option>
                            </select>
                        </div>
                    </div>
                );
            case 'same-bank':
                return (
                    <div className="form-section">
                        <div className="form-group">
                            <label className="label">Beneficiary Account Number</label>
                            <input type="text" className="input-field" placeholder="Enter 12-digit account number" />
                        </div>
                        <div className="form-group">
                            <label className="label">Confirm Account Number</label>
                            <input type="text" className="input-field" placeholder="Re-enter account number" />
                        </div>
                    </div>
                );
            case 'other-bank':
                return (
                    <div className="form-section">
                        <div className="form-group">
                            <label className="label">Beneficiary Account Number</label>
                            <input type="text" className="input-field" placeholder="Enter account number" />
                        </div>
                        <div className="form-group">
                            <label className="label">IFSC Code</label>
                            <input type="text" className="input-field" placeholder="e.g. HDFC0001234" />
                        </div>
                        <div className="form-group">
                            <label className="label">Beneficiary Name</label>
                            <input type="text" className="input-field" placeholder="Enter full name" />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (status === 'success') {
        return (
            <div className="transfer-container" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', borderRadius: '20px', maxWidth: '500px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Transfer Successful!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Your transaction of <strong>${amount}</strong> has been processed successfully.
                    </p>
                    <button
                        className="btn-transfer"
                        onClick={() => { setStatus(null); setAmount(''); }}
                    >
                        Make Another Transfer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="transfer-container">
            <div className="transfer-header">
                <h1>Pay & Transfer</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Send money securely to anyone.</p>
            </div>

            {/* Transfer Type Tabs */}
            <div className="transfer-tabs">
                <div
                    className={`tab-item ${transferType === 'self' ? 'active' : ''}`}
                    onClick={() => setTransferType('self')}
                >
                    Self Transfer
                </div>
                <div
                    className={`tab-item ${transferType === 'same-bank' ? 'active' : ''}`}
                    onClick={() => setTransferType('same-bank')}
                >
                    Same Bank
                </div>
                <div
                    className={`tab-item ${transferType === 'other-bank' ? 'active' : ''}`}
                    onClick={() => setTransferType('other-bank')}
                >
                    Other Bank
                </div>
            </div>

            <div className="transfer-form-card glass-panel">
                <form onSubmit={handleTransfer}>
                    {/* From Account - Always present */}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="label">From Account</label>
                        <select className="select-field">
                            <option>Savings Prem - **** 8899 (Avl: $12,450.00)</option>
                            <option>Checking - **** 1234 (Avl: $450.20)</option>
                        </select>
                    </div>

                    {/* Dynamic Fields based on Type */}
                    {renderFormFields()}

                    {/* Amount & Remarks */}
                    <div className="form-section" style={{ marginTop: '1.5rem' }}>
                        <div className="form-group">
                            <label className="label">Amount</label>
                            <div className="amount-input-group">
                                <span className="currency-symbol">$</span>
                                <input
                                    type="number"
                                    className="input-amount"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label">Remarks / Note (Optional)</label>
                            <input type="text" className="input-field" placeholder="What is this for?" />
                        </div>
                    </div>

                    <button type="submit" className="btn-transfer">
                        {status === 'processing' ? 'Processing...' : 'Proceed to Pay'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FundTransfer;
