import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'
import image1 from './images/img1.png'
export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered successfully!");
    } catch (err) {
      alert("Registration failed.");
    }
    navigate('/login')
  };

  return (
    <div>
        <div className='heading'>
          <img className='img1' src={image1} alt='img1'/>
          <h1>StudyMate</h1>
        </div>
        <div className="form-part">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
        </div>
    </div>
  );
}
