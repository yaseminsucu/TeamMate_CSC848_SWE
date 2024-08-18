import { useNavigate } from "react-router-dom";
import "./styles/register.css";
import React from "react";
import Back from "./images/backArrow.svg";
import Logo from "./images/teamMateLogoBlue.png";

function Register() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [passwordTouched, setPasswordTouched] = React.useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    React.useState(false);
  const [agreeTerms, setAgreeTerms] = React.useState(false);
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
    if (confirmPasswordTouched && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
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

  function handleConfirmPasswordChange(event) {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
    if (confirmPasswordTouched && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }

  function handleConfirmPasswordBlur() {
    setConfirmPasswordTouched(true);
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }

  function createAccount(event) {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setFormError("All fields are required");
      return;
    }

    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      password !== confirmPassword
    ) {
      setFormError("Please correct the errors before submitting");
      return;
    }

    if (!agreeTerms) {
      setFormError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    };

    fetch("/auth/register", options).then((res) => {
      if (res.status === 200) {
        setMessage("Your account has been created");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFormError("");
        navigate("/dashboard");
      } else {
        setFormError(res.message);
      }
    });
  }

  return (
    <>
      <a onClick={() => navigate("/home")}>
        <img className="backArrowRegister" src={Back} alt="Back Arrow" />
      </a>
      <div className="containerRegister">
        <div className="registerContainer">
          <img className="teamMateLogoLogin" src={Logo} alt="TeamMate Logo" />
          <p>Create an account</p>
          <form onSubmit={createAccount}>
            <div className="nameContainer">
              <div className="inputContainerRegister">
                <label>First Name</label>
                <input
                placeholder="John"
                  type="text"
                  value={firstName}
                  maxLength="64"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="inputContainerRegister">
                <label>Last Name</label>
                <input
                placeholder="Doe"
                  type="text"
                  value={lastName}
                  maxLength="64"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className="inputContainerRegister">
              <label>Email</label>
              <input
              placeholder="JohnDoe@email.com"
                type="email"
                value={email}
                maxLength="255"
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {emailError && <div className="errorRegister">{emailError}</div>}
            </div>
            <div className="inputContainerRegister">
              <label>Password</label>
              <input
              placeholder="8+ characters, 1 upper, 1 lower, 1 number, 1 special"
                type="password"
                value={password}
                maxLength="64"
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />
              {passwordError && (
                <div className="errorRegister">{passwordError}</div>
              )}
            </div>
            <div className="inputContainerRegister">
              <label>Confirm Password</label>
              <input
              placeholder="Re-type password"
                type="password"
                value={confirmPassword}
                maxLength="64"
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
              />
              {confirmPasswordError && (
                <div className="errorRegister">{confirmPasswordError}</div>
              )}
            </div>
            <div className="termsContainer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(event) => setAgreeTerms(event.target.checked)}
              />
              <label>
                I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </label>
            </div>
            {formError && <div className="errorRegister">{formError}</div>}
            {message && <div className="messageRegister">{message}</div>}
            <div className="messageRegister">{message}</div>
            <button className="registerButton" type="submit">
              Create Account
            </button>
            <div className="alreadyAccount">
              <span>Already have an account?</span>
              <a href="#" onClick={() => navigate("/login")}>
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
