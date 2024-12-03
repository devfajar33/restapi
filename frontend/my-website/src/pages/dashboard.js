import React, { useState, useEffect } from "react";
import { useNavigate, Link  } from "react-router-dom";

const Dashboard = ({ setAuthenticated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data with Authorization token in the headers
        const response = await fetch('http://localhost:5258/api/stock/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
            'Content-Type': 'application/json' // Optional: Specify the content type
          }
        });

        // Check for a successful response
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); 
        setData(data.data); 
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData(); 
  }, [token]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <Link to="/products">Product</Link>&nbsp;&nbsp;
      <Link to="/view_transactions">Transactions</Link>
      <br/>
      <br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;