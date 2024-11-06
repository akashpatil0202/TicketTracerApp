import { useParams } from "react-router-dom";
import DeveloperTicketsPage from "./DeveloperTicketsPage";
import "./mystyle.css";

const DeveloperTicketsPageWrapper = () => {
  const { id } = useParams();
  const developerIndex = parseInt(id);

  if (isNaN(developerIndex) || developerIndex < 0) {
    return <div>Developer not found</div>;
  }

  return <DeveloperTicketsPage developerIndex={developerIndex} />;
};

export default DeveloperTicketsPageWrapper;
