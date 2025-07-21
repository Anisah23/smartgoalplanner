import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import OverviewPanel from "../OverviewPanel/OverviewPanel";
import GoalForm from "../GoalForm/GoalForm";
import DepositForm from "../DepositForm/DepositForm";
import GoalList from "../GoalList/GoalList";

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [goalBeingEdited, setGoalBeingEdited] = useState(null);

  const BASE_URL = "https://smartgoalplanner.onrender.com";

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(error => console.error("Fetch goals error:", error));
  }, []);

  const handleAddGoal = (newGoal) => {
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then(res => res.json())
      .then(data => setGoals([...goals, data]));
  };

  const handleUpdateGoal = (updatedGoal) => {
    fetch(`${BASE_URL}/${updatedGoal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    })
      .then(res => res.json())
      .then(data => {
        const updatedGoals = goals.map(goal =>
          goal.id === data.id ? data : goal
        );
        setGoals(updatedGoals);
        setGoalBeingEdited(null);
      });
  };

  const handleDeleteGoal = (goalId) => {
    fetch(`${BASE_URL}/${goalId}`, {
      method: "DELETE",
    }).then(() => {
      const filteredGoals = goals.filter(goal => goal.id !== goalId);
      setGoals(filteredGoals);
    });
  };

  return (
    <div className="dashboard-container">
      <OverviewPanel goals={goals} />

      <div  className="collapsible-section">
        <div className="form-toggle-container">
          <button onClick={() => setShowGoalForm(prev => !prev)}>
            {showGoalForm ? "Hide Goal Form" : "Add  Goal"}
          </button>
          <button onClick={() => setShowDepositForm(prev => !prev)}>
            {showDepositForm ? "Hide Deposit Form" : "Make a Deposit"}
          </button>
        </div>

        <div  className="forms-row">
          {showGoalForm && (
            <div className="form-panel">
              <GoalForm
                onAddGoal={handleAddGoal}
                onUpdateGoal={handleUpdateGoal}
                goalBeingEdited={goalBeingEdited}
                clearEdit={() => setGoalBeingEdited(null)}
              />
            </div>
          )}
          {showDepositForm && (
            <div className="form-panel">
              <DepositForm
                goals={goals}
                onUpdateGoal={handleUpdateGoal}
              />
            </div>
          )}
        </div>
      </div>

      <h2 id="goalsection" className="goal-section-heading">My Goals</h2>

      <GoalList
  goals={goals}
  onUpdateGoal={handleUpdateGoal}
  onDeleteGoal={handleDeleteGoal}
  onEditGoal={(goal) => {
    setGoalBeingEdited(goal);
    setTimeout(() => {
      const formElement = document.getElementById("goal-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }}
/>

    </div>
  );
}

export default Dashboard;
