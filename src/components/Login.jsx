import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image1 from './images/img1.png'

export default function Login() {
  const navigate = useNavigate() 
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      alert(`Welcome ${res.data.username}`);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert("Login failed.");
    }
    navigate('/dashboard')
  };

  return (
    <div>
      <div className='heading'>
        <img className='img1' src={image1} alt='img1'/>
        <h1>StudyMate</h1>
      </div>
      <div className="form-part">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
