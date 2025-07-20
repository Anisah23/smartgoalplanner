import React from "react";
import GoalCard from "../GoalCard/GoalCard";
import "./GoalList.css";

function GoalList({ goals, onUpdateGoal, onDeleteGoal, onEditGoal }) {
  return (
    <div  className="goal-list">
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
          onEditGoal={onEditGoal} 
        />
      ))}
    </div>
  );
}

export default GoalList;
