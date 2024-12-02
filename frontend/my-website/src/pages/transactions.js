import React, { useState, useEffect } from "react";
import { useNavigate, Link  } from "react-router-dom";

const Transactions = ({ setAuthenticated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.clear();
    navigate("/");
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

  const handleProcess = async (id) => {
    navigate(`/process_data/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h2>Transactions</h2>
      <Link to="/dashboard">Back</Link>
      <br/><br/>
      <table border="1">
        <thead>
          <tr>
            <td>Name</td>
            <td>Stock</td>
            <td>Price</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>            
          {Array.isArray(data) && data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleProcess(item.id)}>Process</button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    <br/>
    <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Transactions;