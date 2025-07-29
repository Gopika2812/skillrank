import { useState } from "react";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    if (!email) {
      setMessage("Please enter an email.");
      return;
    }

    try {
      const response = await fetch("https://skillrank-backend.onrender.com/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Signup successful!");
        setEmail("");
      } else {
        setMessage(`${result.error}`);
      }
    } catch (error) {
      setMessage("Server error. Try again.");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="top-row">
          <div className="header">
            <img src="/logo.png" alt="Logo" className="logo" />
            <div className="brand-text">
              <div className="name">Ibrahim</div>
              <div className="sub-name">M E M O N</div>
            </div>
          </div>
          <p className="subtext">HAVE AN ACCOUNT? SIGN IN</p>
        </div>
        <h2 className="headline">
          SIGN IN TO YOUR <br /><span>ADVENTURE!</span>
        </h2>
      </div>

      <div className="right">
        <h1>SIGN IN</h1>
        <p>Sign in with email address</p>

        <input
          type="email"
          placeholder="Yourname@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="signup-btn" onClick={handleSignUp}>
          Sign up
        </button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}

        <div className="divider"></div>
        <p>Or continue with</p>
        <div className="socials">
          <button className="social google">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
            Google
          </button>
          <button className="social facebook">
            <img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt="Facebook" />
            Facebook
          </button>
        </div>

        <p className="terms">
          By registering you agree to our <span>Terms and Conditions</span>
        </p>
      </div>

      <div className="foot">
        <p className="text">Copyright by ELite Memon</p>
      </div>
    </div>
  );
};

export default SignIn;
