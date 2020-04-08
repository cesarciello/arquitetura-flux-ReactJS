import React from "react";
import TodoItem from "../TodoItem";

const TodoList = ({ items, onDelete, onUpdate }) => {

  const update = (item) => {
    onUpdate(item);
  }

  if (items.length === 0) {
    return <div>No Items</div>;
  }
  return (
    <>
      <ul className="todo-list">
        {items.map((item) => (
          <TodoItem onUpdate={update} onDelete={onDelete} key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
