import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData = { email, password };
    try {
      const response = await fetch('http://localhost:5258/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        
        const data = await response.json();
        localStorage.setItem('authToken', data.accessToken);
        setAuthenticated(true);
        navigate("/dashboard");

      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;