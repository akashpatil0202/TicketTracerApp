import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./mystyle.css";
const DeveloperTicketsPage = () => {
  const { id } = useParams();
  const [developer, setDeveloper] = useState(null);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:3001/developers/${id}`
        // );
        const response = await axios.get(
          `https://67288abe270bd0b975561009.mockapi.io/api/developers/${id}`
        );

        setDeveloper(response.data);
      } catch (error) {
        console.error("Error fetching developer tickets:", error);
      }
    };

    fetchDeveloper();
  }, [id]);

  const handleFilterChange = (event) => {
    setFilterDate(event.target.value);
  };

  if (!developer) return <div>Loading...</div>;

  const filteredTickets = developer.tickets.filter((ticket) =>
    filterDate ? ticket.date === filterDate : true
  );

  return (
    <div className="container1">
      <Link to="/home">
        <button className="back-button">Back</button>
      </Link>
      <h1>{developer.name}'s Tickets</h1>
      <div className="filter">
        <label htmlFor="dateFilter">Filter by Date:</label>
        <input
          type="date"
          id="dateFilter"
          value={filterDate}
          onChange={handleFilterChange}
        />
      </div>
      <div className="ticket-list">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`ticket ${
                ticket.status === "pending" ? "pending" : ""
              }`}
            >
              <div>{ticket.title}</div>
              <div>
                <strong>Status:</strong> {ticket.status}
                <span> (Date: {ticket.date})</span>
              </div>
            </div>
          ))
        ) : (
          <div>No tickets found for the selected date.</div>
        )}
        {filteredTickets.length > 0 && (
          <div>Total Tickets: {filteredTickets.length}</div>
        )}
      </div>
    </div>
  );
};

export default DeveloperTicketsPage;
