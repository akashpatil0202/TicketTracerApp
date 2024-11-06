import { useParams } from "react-router-dom";
import DeveloperTicketsPage from "./Developerticketpage";

const DeveloperTicketsPageWrapper = () => {
  const { developerId } = useParams();
  if (!developerId) return <div>Developer not found</div>;

  return <DeveloperTicketsPage developerId={developerId} />;
};

export default DeveloperTicketsPageWrapper;
