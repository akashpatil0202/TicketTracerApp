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
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teamLeadTicketCounts, setTeamLeadTicketCounts] = useState({});

  useEffect(() => {
    const fetchTeamLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8080/teamleads");
        if (Array.isArray(response.data)) {
          setTeamLeads(response.data);

          const ticketCounts = {};
          for (const lead of response.data) {
            const ticketResponse = await axios.get(
              `http://localhost:8080/teamleads/${lead.id}/solved-tickets-count`
            );
            ticketCounts[lead.id] = ticketResponse.data;
          }

          setTeamLeadTicketCounts(ticketCounts);
        } else {
          console.error(
            "Expected an array of team leads, but got:",
            response.data
          );
          setTeamLeads([]);
        }
      } catch (error) {
        setError("Error fetching team leads.");
        console.error("Error fetching team leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamLeads();
  }, []);

  useEffect(() => {
    if (selectedTeamLead !== null) {
      const fetchDevelopers = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `http://localhost:8080/developers/by-teamlead/${selectedTeamLead}`
          );
          if (Array.isArray(response.data)) {
            setDevelopers(response.data);
          } else {
            console.error(
              "Expected an array of developers, but got:",
              response.data
            );
            setDevelopers([]);
          }
        } catch (error) {
          setError("Error fetching developers.");
          console.error("Error fetching developers:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDevelopers();
    }
  }, [selectedTeamLead]);

  const handleTeamLeadClick = (teamLeadId) => {
    setSelectedTeamLead(teamLeadId);
    setDevelopers([]);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleBackToTeamLeads = () => {
    setSelectedTeamLead(null);
    setDevelopers([]);
  };

  const handleDeveloperClick = (developerId) => {
    navigate(`/developer/${developerId}`);
  };

  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {selectedTeamLead === null ? (
        <>
          <h1>Team Leads</h1>
          <div className="team-lead-list">
            {teamLeads.length > 0 ? (
              teamLeads.map((lead) => {
                const solvedCount = teamLeadTicketCounts[lead.id] || 0;
                return (
                  <button
                    key={lead.id}
                    onClick={() => handleTeamLeadClick(lead.id)}
                    className="team-lead-card"
                  >
                    <h3>
                      {lead.name}
                      <span className="solved-count">
                        Solved Tickets: <h4>{solvedCount}</h4>
                      </span>
                    </h3>
                  </button>
                );
              })
            ) : (
              <p>No team leads found.</p>
            )}
          </div>
        </>
      ) : (
        <>
          <h1>Developers</h1>
          <div className="developer-list">
            {developers.length > 0 ? (
              developers.map((developer) => (
                <button
                  key={developer.id}
                  onClick={() => handleDeveloperClick(developer.id)}
                  className="developer-card"
                >
                  <h3>{developer.name}</h3>
                </button>
              ))
            ) : (
              <p>No developers found.</p>
            )}
          </div>
          <button onClick={handleBackToTeamLeads} className="back-button">
            Back to Team Leads
          </button>
        </>
      )}

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default HomePage;
