import '../styles/pages/Signup.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
function Signup() {

    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState(""); // "" | "success" | "error"
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phoneNo = e.target.phone.value;
        const password = e.target.password.value;

        axios.post("http://localhost:9090/customers", {
            name,
            email,
            phoneNo,
            password
        }).then(response => {
            setMsgType("success");
            setMsg(response.data.message || "Signup successful! Welcome.");

            // Construct a robust user object for the dashboard
            const createdUser = response.data.customer || response.data;
            if (typeof createdUser === 'object' && createdUser !== null) {
                setUserData({
                    name: name,
                    email: email,
                    phoneNo: phoneNo,
                    ...createdUser
                });
            } else {
                setUserData({ name, email, phoneNo });
            }
        }).catch(error => {
            console.log(error);
            setMsg("Signup failed. Please try again.");
            setMsgType("error");
        })
    }
    return (
        <div className="fullscreen-wrapper">
            <div className="signup-container">
                <div className="logo-area">
                    <h2>Create Account</h2>
                </div>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="John Doe" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="name@example.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" id="phone" placeholder="1234567890" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Create a password" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" id="confirm" placeholder="Confirm password" required />
                    </div>

                    {msg && (
                        <div className={`signup-message ${msgType}`}>
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
                        <button type="submit">Sign Up</button>
                    )}


                </form>

                <div className="footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;