import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import HeaderHome, { HeaderOrganizationDash, HeaderNavigation } from "./Header";
import React from "react";
import Cookies from "js-cookie";
import Back from "./images/backArrow.svg";
import Logo from "./images/teamMateLogoBlue.png"

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [passwordTouched, setPasswordTouched] = React.useState(false);
  const navigate = useNavigate();

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  function handleEmailChange(event) {
    const email = event.target.value;
    setEmail(email);
    if (emailTouched && !validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  }

  function handleEmailBlur() {
    setEmailTouched(true);
    if (email === "") {
      setEmailError("");
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  }

  function handlePasswordChange(event) {
    const password = event.target.value;
    setPassword(password);
    if (passwordTouched && !validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      setPasswordError("");
    }
  }

  function handlePasswordBlur() {
    setPasswordTouched(true);
    if (password === "") {
      setPasswordError("");
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      setPasswordError("");
    }
  }

  const login = async (event) => {
    event.preventDefault();

    if (emailError || passwordError || !email || !password) {
      setMessage("Please correct the errors before submitting");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        rememberMe: rememberMe,
      }),
      credentials: "include",
    };

    try {
      const res = await fetch("/auth/login", options);

      if (res.status === 200) {
        const data = await res.json();
        setMessage("You are logged in");
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } else {
        const errorData = await res.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <a onClick={() => navigate("/home")}>
        <img className="backArrowLogin" src={Back} alt="Back Arrow" />
      </a>
      <div className="containerLogin">
        <div className="loginContainer">
          <img className="teamMateLogoLogin" src={Logo} alt="TeamMate Logo" />
          <p>Welcome, Mate!</p>
          <form onSubmit={login}>
            <div className="inputContainerLogin">
              <label>Email address</label>
              <input
                placeholder="JohnDoe@email.com"
                type="text"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {emailError && <div className="error">{emailError}</div>}
            </div>
            <div className="inputContainerLogin">
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />
              {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <div className="optionsContainer">
              <div className="rememberMe">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label>Remember me?</label>
              </div>
              <div className="forgotPassword">
                <a href="#" onClick={() => navigate("/forgotPass")}>
                  Forgot password?
                </a>
              </div>
            </div>
            <button className="signInButton" type="submit">
              Sign In
            </button>
          </form>
          <div className="createAccount">
            <span>or</span>
            <a href="#" onClick={() => navigate("/register")}>
              Create an account
            </a>
          </div>
          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </>
  );
}

export default Login;
