import React, { useContext, useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";

async function signUp(signupData, isLoggedIn, Actions) {
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJcNKKSIcUVsLmg9FdEsajZCwyPCR5cZw'
  if (isLoggedIn) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJcNKKSIcUVsLmg9FdEsajZCwyPCR5cZw'
  }
  try {
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message)
      // console.log(data.error.message)
    }
    else {
      if (data.registered) {
        Actions.navto(`/home/${data.idToken}`)
        Actions.context.setIsLoggedIn(true)
        Actions.context.setEmail(data.email)
        Actions.context.setDisplayName(data.displayName)
        Actions.context.setDisplayImage(data.profilePicture)
        Actions.context.setidToken(data.idToken)
        Actions.context.setUserID(data.localId)
        localStorage.setItem('idToken', data.idToken)
        localStorage.setItem('userID' , data.localId);
        console.log(data)
      }
      else {
        Actions.setIsLogin(true)
      }
    }

    console.log(data); // contains the Firebase ID token, refresh token, and other user data
    console.log('User has successfully signed up.')
  } catch (error) {
    console.error(error); // handle signup error
    throw error;
  }
}

function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogIn, setIsLogin] = useState(false);
  const navto = useNavigate();
  const ctx = useContext(AppContext)


  const handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    const actions = { navto: navto, context: ctx, setIsLogin: setIsLogin }
    if (isLogIn) {
      signUp(userDetails, isLogIn, actions);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {

      if (password === confirmPassword) {

        signUp(userDetails, isLogIn, actions)

      } else {

        alert('password mismatch')
      }
    };
  }

  const handleLoginClick = () => {
    // switch to login form
    setIsLogin((preState) => !preState);
  };



  return (
    <div className="signup-card">
      <h2>{`${isLogIn ? "Login" : "Sign Up"}`}</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Email:
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </label>
        {!isLogIn && (
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        )}
        <button type="submit">{`${isLogIn ? "Login" : "Sign Up"}`}</button>
      </form>
      {isLogIn ? (
        <p className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </p>
      ) : (
        ""
      )}
      <button className="login-card" onClick={handleLoginClick}>
        <p className="login-text">{`${isLogIn ? "Create New Account" : "Already Have An Account ? Login"
          }`}</p>
      </button>
    </div>
  );
}

export default SignupForm;