import React, { useState, useEffect } from "react";
import "./GoalForm.css";

function GoalForm({ onAddGoal, onUpdateGoal, goalBeingEdited, clearEdit }) {
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  useEffect(() => {
    if (goalBeingEdited) {
      setForm({
        name: goalBeingEdited.name || "",
        targetAmount: goalBeingEdited.targetAmount || "",
        category: goalBeingEdited.category || "",
        deadline: goalBeingEdited.deadline || "",
      });
    }
  }, [goalBeingEdited]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (goalBeingEdited) {
      const updatedGoal = {
        ...goalBeingEdited,
        ...form,
      };
      onUpdateGoal(updatedGoal);
      clearEdit();
    } else {
      const newGoal = {
        ...form,
        id: crypto.randomUUID(),
        savedAmount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      onAddGoal(newGoal);
    }

    setForm({ name: "", targetAmount: "", category: "", deadline: "" });
  }

  return (
    <form id="goal-form" className="goal-form" onSubmit={handleSubmit}>
      <h2>{goalBeingEdited ? "Edit Goal" : "Add New Goal"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Goal Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="targetAmount"
        placeholder="Target Amount"
        value={form.targetAmount}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        required
      />

      <div className="goal-form-buttons">
        <button type="submit">
          {goalBeingEdited ? "Update Goal" : "Add Goal"}
        </button>

        {goalBeingEdited && (
          <button type="button" onClick={clearEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default GoalForm;
