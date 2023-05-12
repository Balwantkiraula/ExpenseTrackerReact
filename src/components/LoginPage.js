import React, { useState } from 'react';
import Welcome from './Welcome';

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const signUpHandle = async (event) =>{
      event.preventDefault();
      const newErrors = {};

      // Validation rules
      if (!email) {
          newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Email is invalid';
      }

      if (!password) {
          newErrors.password = 'Password is required';
      }

      // Set validation errors
      setErrors(newErrors);

      // Submit form if no errors
      if (Object.keys(newErrors).length === 0) {
          const response = await fetch(`https://expensetracker-23569-default-rtdb.firebaseio.com/users.json`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email, password}),
          });
          const data = await response.json();
          console.log(data);
          setIsLoggedIn(true);

          // Clear input fields
          setEmail('');
          setPassword('');
      }
    }

  return (
    <div>
      {isLoggedIn ? (
        <Welcome />
      ) : (
        <form onSubmit={signUpHandle} >
            <div className='login-container'>
                <div>
                    <label>Email:</label>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <button type='submit'>Login In</button>
                </div>
            </div>
        </form>
      )}
    </div>
  );
}

export default LoginPage;
