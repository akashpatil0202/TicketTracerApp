import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "./mystyle.css";

const Subdevloper = () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        // const response = await axios.get("http://localhost:3001/developers");

        const response = await axios.get(
          "https://67288abe270bd0b975561009.mockapi.io/api/developers"
        );
        setDevelopers(response.data);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <div className="container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <h1>{developers.name}</h1>

      <div className="developer-list">
        {developers.length > 0 ? (
          developers.map((developer) => (
            <Link
              to={`/developer/${developer.id}`}
              key={developer.id}
              className="developer-card"
            >
              <h3>{developer.name}</h3>
            </Link>
          ))
        ) : (
          <p>No developers found.</p>
        )}
      </div>
    </div>
  );
};

export default Subdevloper;