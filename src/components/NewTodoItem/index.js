import React, { useState } from "react";

const NewTodoItem = ({ onAdd }) => {
  const [description, setDescription] = useState("");

  const add = (event) => {
    event.preventDefault();
    if (description) {
      onAdd(description);
      setDescription("");
    }
  };

  return (
    <form onSubmit={add}>
      <input
        type="text"
        className="tw-input"
        placeholder="Novo Item"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="tw-btn">
        Adicionar
      </button>
    </form>
  );
};

export default NewTodoItem;
