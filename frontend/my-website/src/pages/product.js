import React, { useState, useEffect } from "react";
import { useNavigate, Link  } from "react-router-dom";

const Products = ({ setAuthenticated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5258/api/stock/${id}`, {
        method: "DELETE",  // HTTP method to delete the resource
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
          'Content-Type': 'application/json' // Optional: Specify the content type
        },
      });
      
      if (response.ok) {
        alert('Delete data success.');   
        window.location.reload();
      } else {
        console.error("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/edit_data/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h2>Product</h2>
      <Link to="/add_new">Add New Product</Link>&nbsp;&nbsp;
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
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
};

export default Products;