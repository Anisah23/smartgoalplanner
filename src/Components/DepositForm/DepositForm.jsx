import React, { useState } from "react";
import "./DepositForm.css";

function DepositForm({ goals, onUpdateGoal }) {
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const goal = goals.find(g => g.id === selectedId);
    if (!goal) return;

    const updatedGoal = {
      ...goal,
      savedAmount: parseFloat(goal.savedAmount) + parseFloat(amount)
    };

    onUpdateGoal(updatedGoal);
    setSelectedId("");
    setAmount("");
  }

  return (
    <form className="deposit-form" onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
        <option value="">Select Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>{goal.name}</option>
        ))}
      </select>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
