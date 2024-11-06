import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "./mystyle.css";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [teamLeads, setTeamLeads] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);

  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teamLeads");
        // const response = await axios.get(
        //   "https://67288abe270bd0b975561009.mockapi.io/api/teamleads"
        // );
        setTeamLeads(response.data);
      } catch (error) {
        console.error("Error fetching team leads:", error);
      }
    };

    fetchTeamLeads();
  }, []);

  const handleTeamLeadClick = async (teamLeadId) => {
    setSelectedTeamLead(teamLeadId);
    try {
      const response = await axios.get(`http://localhost:3001/teamLeads${id}`);
      setDevelopers(response.data);
    } catch (error) {
      console.error("Error fetching developers:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <h1>Developer Ticket Tracker</h1>

      {selectedTeamLead === null ? (
        <div className="team-lead-list">
          {teamLeads.length > 0 ? (
            teamLeads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => handleTeamLeadClick(lead.id)}
                className="team-lead-card"
              >
                <h3>{lead.name}</h3>
              </button>
            ))
          ) : (
            <p>No team leads found.</p>
          )}
        </div>
      ) : (
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
            <p>No developers found for this team lead.</p>
          )}
          <button
            onClick={() => setSelectedTeamLead(null)}
            className="back-button"
          >
            Back to Team Leads
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
