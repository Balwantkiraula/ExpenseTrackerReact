import React from 'react'
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const history = useNavigate();
  const completeHandle =() =>{
    history("/update")
  }
  return (
    <div>
      <div>
        <p>Welcome to Expense Tracker</p>
        </div>
        <p>your Profile is incomplete.<button onClick={completeHandle}>Complete Now</button></p>
      
    </div>
  )
}

export default Welcome
