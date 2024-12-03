import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    ItemsId: id,
    name: "",
    stock_x: "",
    price_x: "",
    stock: "",
    price: "",
    totalPrice: "",
    image: "-",
    created_By: "1",
    created_At: "2024-12-02T12:42:46.303"
  });
  const [dataProduct, setDataProduct] = useState({
    ItemsId: id,
    stock: "",
    price: "",
    totalPrice: "",
    created_By: "1",
    created_At: "2024-12-02T12:42:46.303"
  });

  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataProduct((prevData) => ({
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
        setData({
            idItems: result.data.id,  
            name: result.data.name,            
            stock_x: result.data.stock,
            price_x: result.data.price,
            stock: "",
            price: "",
            totalPrice: "",
            created_By: "1",
            created_At: "2024-12-02T12:42:46.303"
        });
        setDataProduct({
          idItems: result.data.id,  
          stock: "",
          price: "",
          totalPrice: "",
          created_By: "1",
          created_At: "2024-12-02T12:42:46.303"
        });

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
      const res = await fetch('http://localhost:5258/api/transaction/', {
        method: "POST", // Change to GET if you are fetching data
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // Pass the API token here
        },
        body: JSON.stringify(dataProduct)  // Send data as JSON
      });

      if (!res.ok) {
        throw new Error("Error with API request");
      }
      alert('Data updated successfully!');
      navigate(`/transactions`);

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
          <label>Stock Items : </label>
          <input
            type="number"
            name="stocks"
            value={data.stock_x}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price Items : </label>
          <input
            type="number"
            name="prices"
            value={data.price_x}
            onChange={handleInputChange}
          />
        </div>
        <hr/>
        <div>
          <label>Stock Request : </label>
          <input
            type="number"
            name="stock"
            value={dataProduct.stock}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price : </label>
          <input
            type="number"
            name="price"
            value={dataProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Total Price : </label>
          <input
            type="number"
            name="totalPrice"
            value={dataProduct.totalPrice}
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
        <button type="submit">Submit</button>&nbsp;
        <Link to="/transactions">Back</Link>
      </form>
    </div>
  );
};

export default Update;