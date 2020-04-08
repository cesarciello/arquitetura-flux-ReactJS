import React from "react";
import { useRef } from "react";

const TodoItem = ({ item, onDelete, onUpdate }) => {
  const input = useRef();

  const check = () => {
    item.isChecked = !item.isChecked;
    onUpdate(item);
  };

  const update = () => {
    item.description = input.current.value;
    onUpdate(item);
  };

  const remove = () => {
    onDelete(item.id);
  };

  return (
    <div>
      <li className="todo-list-item">
        <input
          className="tw-check"
          type="checkbox"
          value={item.isChecked}
          checked={item.isChecked}
          onChange={check}
        />
        <input
          ref={input}
          onBlur={update}
          className="tw-input"
          type="text"
          disabled={item.isChecked}
          defaultValue={item.description}
        />
        <button onClick={() => remove(item.id)} className="tw-btn">
          X
        </button>
      </li>
    </div>
  );
};

export default TodoItem;
