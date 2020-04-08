import "./App.css";
import TodoList from "./components/TodoList";
import TodoStore from './data/stores/TodoStores';
import NewTodoItem from "./components/NewTodoItem";
import React, { useEffect, useState } from "react";
import TodoAction from './data/actions/TodoActions';

async function getTodoState() {
  return await TodoStore.getAll();
}

function App() {
  const [items, setItems] = useState([]);

  const _onChange = async () => {
    const resp = await getTodoState();
    setItems(resp)
  };

  useEffect(() => {
    TodoStore.addChangeListener(_onChange);
    _onChange();
  }, []);

  return (
    <div className="App">
      <NewTodoItem onAdd={TodoAction.create} />
      <hr />
      <button onClick={TodoAction.clear} className="tw-btn">
        Limpar
      </button>
      <hr />
      <TodoList onDelete={TodoAction.remove} onUpdate={TodoAction.update} items={items} />
    </div>
  );
}

export default App;
