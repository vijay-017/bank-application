import '../styles/pages/Signup.css';
import { Link } from "react-router-dom";

function Signup() {
    return (
        <div className="fullscreen-wrapper">
            <div className="signup-container">
                <div className="logo-area">
                    <h2>Create Account</h2>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="John Doe" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="name@example.com"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" id="phone" placeholder="1234567890" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Create a password" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" id="confirm" placeholder="Confirm password" required />
                    </div>

                    <button type="submit">Sign Up</button>
                </form>

                <div className="footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;