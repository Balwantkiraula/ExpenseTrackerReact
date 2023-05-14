import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';

function Welcome() {
const [verificationSent, setVerificationSent] = useState(false);
const [verificationError, setVerificationError] = useState('');
  const history = useNavigate();
  const completeHandle =() =>{
    history("/update")
  }
  
  const handleVerifyEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.sendEmailVerification();
        setVerificationSent(true);
        setVerificationError('');
      } else {
        setVerificationSent(false);
        setVerificationError('No user is currently signed in');
      }
    } catch (error) {
      setVerificationSent(false);
      setVerificationError(error.message);
    }
  };
  
  
  return (
    <div>
      <div>
        <p>Welcome to Expense Tracker</p>
        </div>
        <p>your Profile is incomplete.<button onClick={completeHandle}>Complete Now</button></p>
        <div>
      {!verificationSent && (
        <button onClick={handleVerifyEmail}>Verify Email</button>
      )}
      {verificationSent && <p>Verification email sent. Check your inbox.</p>}
      {verificationError && <p>Error: {verificationError}</p>}
    </div>
      
    </div>
  )
}

export default Welcome;

