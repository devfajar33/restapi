import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    stock: "",
    price: "",
    image: "-",
    created_By: "1",
    created_At: "2024-12-02T12:42:46.303"
  });

  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5258/api/stock/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
            'Content-Type': 'application/json' // Optional: Specify the content type
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.data);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Fetch data when the `id` changes

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5258/api/stock/${id}`, {
        method: 'PUT', 
        headers: {
            'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
            'Content-Type': 'application/json' // Optional: Specify the content type
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      alert('Data updated successfully!');
      navigate(`/dashboard`);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name Product : </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Stock : </label>
          <input
            type="number"
            name="stock"
            value={data.stock}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price : </label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleInputChange}
          />
        </div>
        <div>          
          <label>Category : </label>
          <select
            id="category"
            name="category"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="1">Makanan</option>
            <option value="2">Minuman</option>
            <option value="3">Lainnya</option>
          </select>
        </div>
        <br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;