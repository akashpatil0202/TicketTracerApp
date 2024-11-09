import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./mystyle.css";

const DeveloperTicketsPage = ({ developerId }) => {
  const [developer, setDeveloper] = useState({ name: "", tickets: [] });
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setFilterDate(today);
  }, []);

  useEffect(() => {
    const fetchDeveloperTickets = async () => {
      try {
        let url = `http://localhost:8080/tickets/by-developer/${developerId}`;

        if (filterDate) {
          url += `?date=${filterDate}`;
        }

        const response = await axios.get(url);

        if (response.data) {
          setDeveloper({
            name: response.data[0]?.developer?.name,
            tickets: response.data,
          });
        } else {
          console.error("Developer or tickets data is missing");
        }
      } catch (error) {
        console.error("Error fetching developer tickets:", error);
      }
    };

    fetchDeveloperTickets();
  }, [developerId, filterDate]);

  const handleFilterChange = (event) => {
    setFilterDate(event.target.value);
  };

  const handleBackClick = () => {
    navigate("/home");
  };

  if (!developer.name) return <div>Loading...</div>;

  const filteredTickets = developer.tickets.filter((ticket) =>
    filterDate ? ticket.date.slice(0, 10) === filterDate : true
  );

  const getTicketStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "pending";
      case "solved":
        return "solved";
      default:
        return "assigned";
    }
  };

  return (
    <div className="container">
      <h1>{developer.name}'s Tickets</h1>
      <input
        type="date"
        value={filterDate}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <ul className="ticket-list">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <li key={ticket.id} className="ticket-item">
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p
                className={`ticket-status ${getTicketStatusClass(
                  ticket.status
                )}`}
              >
                <strong>Status:</strong> {ticket.status}
                <span>({ticket.date})</span>
              </p>
            </li>
          ))
        ) : (
          <p>No tickets found.</p>
        )}
      </ul>

      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
};

export default DeveloperTicketsPage;
