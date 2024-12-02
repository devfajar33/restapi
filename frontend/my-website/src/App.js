import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import AddNew from "./pages/input_data";
import Update from "./pages/update_data";
import Transactions from "./pages/transactions";
import AddTransactions from "./pages/input_transactions";
import Dashboard from "./pages/dashboard";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem('authToken');  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={ token ? (
              <Dashboard setAuthenticated={setAuthenticated} />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )}
          />
          <Route
            path="/dashboard"
            element={token ? (
              <Dashboard setAuthenticated={setAuthenticated} />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )}
          />
          <Route
            path="/add_new"
            element={token ? (
              <AddNew setAuthenticated={setAuthenticated} />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )}
          />
          <Route
            path="/edit_data/:id"
            element={token ? (
              <Update setAuthenticated={setAuthenticated} />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )}
          />
          <Route
            path="/transactions/"
            element={token ? (
              <Transactions setAuthenticated={setAuthenticated} />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )}
          />
          <Route
            path="/process_data/:id"
            element={token ? (
              <AddTransactions setAuthenticated={setAuthenticated} />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )}
          />
          <Route path="/" element={token ? (
              <Dashboard setAuthenticated={setAuthenticated} />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;