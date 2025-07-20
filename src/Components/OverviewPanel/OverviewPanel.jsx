import React from "react";
import "./OverviewPanel.css";

function OverviewPanel({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((acc, g) => acc + Number(g.savedAmount), 0);
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <div className="overview-panel">
      <div className="card metric">Total Goals: {totalGoals}</div>
      <div className="card metric">Total Saved: ${totalSaved}</div>
      <div className="card metric">Goals Completed: {completed}</div>
    </div>
  );
}

export default OverviewPanel;
