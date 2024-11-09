import { useParams } from "react-router-dom";
import DeveloperTicketsPage from "./Developerticketpage";

const DeveloperTicketsPageWrapper = () => {
  const { developerId } = useParams();
  if (!developerId) {
    return <div>Developer not found. Please check the URL.</div>;
  }

  return <DeveloperTicketsPage developerId={developerId} />;
};

export default DeveloperTicketsPageWrapper;
