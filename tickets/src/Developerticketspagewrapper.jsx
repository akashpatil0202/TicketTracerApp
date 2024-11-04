import { useParams } from "react-router-dom";
// import { developersData } from "./data";
import DeveloperTicketsPage from "./Developerticketpage";
import "./mystyle.css";

const DeveloperTicketsPageWrapper = () => {
  const { id } = useParams();
  const developerIndex = parseInt(id);

  if (
    isNaN(developerIndex) ||
    developerIndex < 0
    // ||
    // developerIndex >= developersData.length
  ) {
    return <div>Developer not found</div>;
  }

  return <DeveloperTicketsPage developerIndex={developerIndex} />;
};

export default DeveloperTicketsPageWrapper;
