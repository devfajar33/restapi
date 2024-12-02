import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Input = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    stock: "",
    price: "",
    image: "-",
    created_By: "1",
    created_At: "2024-12-02T12:42:46.303"
  });

  const [selectedValue, setSelectedValue] = useState('');
  const [setResponse] = useState(null);

  const token = localStorage.getItem('authToken');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5258/api/stock/', {
        method: "POST", // Change to GET if you are fetching data
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // Pass the API token here
        },
        body: JSON.stringify(data)  // Send data as JSON
      });

      if (!res.ok) {
        throw new Error("Error with API request");
      }

      alert('Data has been saved');
      navigate(`/dashboard`);

    } catch (error) {
      console.error("Error:", error);
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

export default Input;