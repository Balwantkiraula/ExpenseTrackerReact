import React, { useState } from 'react'
import '../App.css';
import {  useNavigate } from 'react-router-dom';
function Login() {
   
    const history = useNavigate();
 
    const [login, setLogin] = useState([]);
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
                body: JSON.stringify({email, password, confirmPassword}),
            });
            const data = await response.json();
            console.log(data);
            const newLogin = { email, password, confirmPassword };
            setLogin([...login, newLogin]);

            // Clear input fields
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }
    const handleLogin = () => {
        // Your login logic here
        history("/login")
      };
    
    return (
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
                    <label>Confirm Password:</label>
                    <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div>
                    <button type='submit'>Sign Up</button>
                </div>
              <button onClick={handleLogin}> Already have account ? Login</button>
           
            </div>
        </form>
    )
}

export default Login;


