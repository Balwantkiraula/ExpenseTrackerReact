import { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwRef = useRef();
    const cpasswRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // Validation rules
        if (!emailRef.current.value) {
            newErrors.emailRef = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
            newErrors.emailRef = 'Email is invalid';
        }

        if (!passwRef.current.value) {
            newErrors.passwRef = 'Password is required';
        }

        if (!cpasswRef.current.value) {
            newErrors.cpasswRef = 'Confirm password is required';
        } else if (passwRef.current.value !== cpasswRef.current.value) {
            newErrors.cpasswRef = 'Passwords do not match';
        }

        // Set validation errors
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const enteredEmail = emailRef.current.value;
            const enteredPassword = passwRef.current.value;
            const enteredConfirmPassword = cpasswRef.current.value;
            const user = {
                email: enteredEmail,
                password: enteredPassword,
                confirmpassword: enteredConfirmPassword,
                returnSecureToken: true
            };

            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJcNKKSIcUVsLmg9FdEsajZCwyPCR5cZw", {
                method: 'POST',
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const data = await response.json();
                const idToken = data.idToken;
                localStorage.setItem('userCurr', idToken);
                
            } else {
                console.log("error");
            }
            navigate('/login');
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter email" required ref={emailRef} />
                    {errors.emailRef && <span>{errors.emailRef}</span>}
                </div>
                <div>
                    <label htmlFor="p">Password</label>
                    <input type="password" id="p" placeholder="Enter password" required ref={passwRef} />
                    {errors.passwRef && <span>{errors.passwRef}</span>}
                </div>
                <div>
                    <label htmlFor="cp">Confirm Password</label>
                    <input type="password" id="cp" placeholder="Confirm password" required ref={cpasswRef} />
                    {errors.cpasswRef && <span>{errors.cpasswRef}</span>}
                </div>
                <button type="submit">Sign Up</button>
                <div>
                    <Link to='/login'>Already Have an Account? Login</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
