import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalsSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

function GoalForm() {
  const [text, setText] = useState("");
  const isInitialMount = useRef(true);

  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.goals
  );

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Goal Addded");
    }
  }, [isSuccess, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={onChange}
            placeholder="Enter your goal here..."
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Add Goal</button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
