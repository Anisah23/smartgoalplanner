import React from "react";
import "./GoalCard.css";

function GoalCard({ goal, onUpdateGoal, onDeleteGoal, onEditGoal }) {
  const { name, targetAmount, savedAmount, deadline, category, id } = goal;

  const progress = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(1);
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const timeLeft = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
  const isOverdue = savedAmount < targetAmount && timeLeft < 0;
  const isWarning = timeLeft <= 30 && timeLeft > 0;
  const isComplete = savedAmount >= targetAmount;

  return (
    <div className="goal-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Target: ${targetAmount}</p>
      <p>Saved: ${savedAmount}</p>
      <p>Remaining: ${targetAmount - savedAmount}</p>
      <p>Time Left: {timeLeft > 0 ? `${timeLeft} days` : "Deadline passed"}</p>
      <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
      </div>
      <p>Status: 
        {isComplete ? " ✅ Complete" :
         isOverdue ? " ❌ Overdue" :
         isWarning ? " ⚠️ Near Deadline" : " ⏳ In Progress"}
      </p>
      <button className="edit-btn" onClick={() => onEditGoal(goal)}>Edit</button>
      <button className="delete-btn" onClick={() => onDeleteGoal(id)}>Delete</button>
    </div>
  );
}

export default GoalCard;
