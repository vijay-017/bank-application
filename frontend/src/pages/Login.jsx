import '../styles/pages/Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function Login() {
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
        e.preventDefault();

        await axios.get(`http://localhost:9090/customers/${id}`)
            .then(response => {
                const user = response.data;
                navigate("/dashboard", { state : user});
            })
            .catch(error => {
                console.log(error);
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

                    <button type="submit">Sign In</button>
                </form>

                <div className="footer">
                    <p>Don't have an account? <Link to="/signup">Create One</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;