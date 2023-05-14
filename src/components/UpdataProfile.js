import React, { useState } from 'react'

function UpdataProfile() {
    const [updateProfile, setUpdateProfile]=useState([]);
    const [name, setName]=useState('');
    const [photo, setPhoto]=useState('');

    const updateHandle= async(e)=>{
    e.preventDefault();
    const newLogin = { name, photo };
    setUpdateProfile([...updateProfile, newLogin]);
   const response = await fetch(`https://expensetracker-23569-default-rtdb.firebaseio.com/cart.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, photo}),
});
const data = await response.json();
console.log(data);
    // Clear input fields
    setName('');
    setPhoto('');
    }
  return (
    <form onSubmit={updateHandle}>
        <h1>Contact Detail</h1>
        <div>
            <label>Full Name</label>
            <input  type='text' value={name} onChange={e =>setName(e.target.value)}/>
        </div>
        <div>
            <label>Profile Photo Url</label>
            <input  type='text' value={photo} onChange={e =>setPhoto(e.target.value)}/>
        </div>
        <button>Update</button>
    </form>
  )
}

export default UpdataProfile
