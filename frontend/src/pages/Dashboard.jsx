import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Dashboard() {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }
  return <div>Dashboard</div>;
}

export default Dashboard;
