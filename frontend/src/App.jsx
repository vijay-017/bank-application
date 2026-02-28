import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AccountSummary from './pages/AccountSummary.jsx'
import TransactionHistory from './pages/TransactionHistory.jsx'
import Profile from './pages/Profile.jsx'
import FundTransfer from './pages/FundTransfer.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import PayBill from './pages/PayBill.jsx'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/account-summary" element={<AccountSummary />} />
      <Route path="/transactions" element={<TransactionHistory />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/fund-transfer" element={<FundTransfer />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/pay-bill" element={<PayBill />} />
    </Routes>
  )
}

export default App;