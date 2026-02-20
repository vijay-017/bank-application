import '../styles/pages/Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function Login() {
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState(""); // "" | "success" | "error"

    const [id, setId] = useState("");
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
        e.preventDefault();

        await axios.get(`http://localhost:9090/customers/${id}`)
            .then(response => {
                const user = response.data;
                setUserData(user);
                setMsg("Login successful! Welcome back.");
                setMsgType("success");
            })
            .catch(error => {
                console.log(error);
                setMsg("Login failed. Please check your credentials.");
                setMsgType("error");
            })
    }

    return (
        <div className="fullscreen-wrapper">
            <div className="login-container">
                <div className="logo-area">
                    <h2>Welcome Back</h2>
                </div>
                <form onSubmit={handleLoginClick}>
                    <div className="form-group">
                        <label htmlFor="email">Account Number</label>
                        <input type="number" id="email" placeholder="GMRAC******"
                            onChange={(e) => setId(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password/PIN</label>
                        <input type="password" id="password" placeholder="••••••••" required />
                    </div>

                    {msg && (
                        <div className={`login-message ${msgType}`}>
                            {msg}
                        </div>
                    )}

                    {msgType === "success" ? (
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard", { state: userData })}
                            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                        >
                            Continue to Dashboard
                        </button>
                    ) : (
                        <button type="submit">Sign In</button>
                    )}
                </form>

                <div className="footer">
                    <p>Don't have an account? <Link to="/signup">Create One</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;