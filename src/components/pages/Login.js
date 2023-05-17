import { useRef } from "react";
import { useNavigate , Link} from "react-router-dom";


const Login = () =>{
  const navigate=useNavigate('')
    const emailRef=useRef();
    const passwRef=useRef();
     

    const submitHandler = async (e) =>{
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwRef.current.value;
         
        const user={
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
        }
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJcNKKSIcUVsLmg9FdEsajZCwyPCR5cZw",{

            method:'POST',
            body:JSON.stringify(user)
        });
        const data = res.json();
        const idToken=data.idToken;
        //localStorage.setItem(idToken,data)
        navigate('/home')

    }
    return(<div>
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter email" required ref={emailRef}/>
            </div>
            <div>
                <label htmlFor="p">Password</label>
                <input type="password" id="p" placeholder="Enter password" required ref={passwRef} />
            </div>
            
            <button type="submit">Login</button>
            <div>
              <Link to='/'>Don't have an account : Sign Up</Link>
            </div>
        </form>

    </div>)
}

export default Login;