import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "./mystyle.css";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState(null);

  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teamLeads");
        setTeamLeads(response.data);
      } catch (error) {
        console.error("Error fetching team leads:", error);
      }
    };
    fetchTeamLeads();
  }, []);

  const handleTeamLeadClick = (teamLeadId) => {
    setSelectedTeamLead(teamLeadId);
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
      <h1>Team Leads</h1>

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
          {teamLeads
            .find((lead) => lead.id === selectedTeamLead)
            .developers.map((developer) => (
              <button
                key={developer.id}
                onClick={() => navigate(`/developer/${developer.id}`)}
                className="developer-card"
              >
                <h3>{developer.name}</h3>
              </button>
            ))}

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
