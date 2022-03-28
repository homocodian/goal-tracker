import { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset, resetErrorState } from "../features/goals/goalsSlice";

function Dashboard() {
  const didMount = useRef(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const {
    goals,
    isLoading: isGoalsLoading,
    isError,
    message,
  } = useSelector((state) => state.goals);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());
    return () => dispatch(reset());
  }, [user, navigate]);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }
    if (isError) {
      toast.error(message, {
        onClose: () => {
          dispatch(resetErrorState());
        },
      });
    }
  }, [isError, message]);

  if (isLoading || isGoalsLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>Your have not set any goals.</h3>
        )}
      </section>
    </Fragment>
  );
}

export default Dashboard;
