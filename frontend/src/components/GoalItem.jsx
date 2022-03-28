import { BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalsSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteGoal(goal._id));
  };

  return (
    <div className="goal">
      <div>
        {new Date(goal.createdAt).toLocaleString("fr-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
      <h2>{goal.text}</h2>
      <button className="close delete-btn" onClick={onDelete}>
        <BiX />
      </button>
    </div>
  );
}

export default GoalItem;
