import Events from "events";
import TodoService from "../services/todoService";
import TodoConstants from "../constants/TodoConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";

let _todoList = [];
const CHANNEL_EVENT = "change";
const Channel = new Events.EventEmitter();

async function createItem(description) {
  return TodoService.create({
    description,
    isChecked: false,
  }).then((newItem) => {
    const list = [..._todoList];
    list.push(newItem);
    _todoList = list;
  });
}

function updateItem(newItem) {
  const list = [..._todoList];
  const itemIndex = list.findIndex((item) => item.id === newItem.id);
  list[itemIndex] = newItem;
  _todoList = list;
  return TodoService.update(newItem);
}

function removeItem(id) {
  const list = [..._todoList];
  const itemIndex = list.findIndex((item) => item.id === id);
  list.splice(itemIndex, 1);
  _todoList = list;
  return TodoService.remove(id);
}

function clearAll() {
  let list = [..._todoList];
  _todoList = list.filter((item) => {
    if (!item.isChecked) {
      return true;
    } else {
      TodoService.remove(item.id);
      return false;
    }
  });
}

const TodoStore = {
  async getAll() {
    if (_todoList.length === 0) {
      _todoList = await TodoService.list();
    }
    return _todoList;
  },
  emitChange() {
    Channel.emit(CHANNEL_EVENT);
  },
  addChangeListener(callback) {
    Channel.on(CHANNEL_EVENT, callback);
  },
  removeChangeListener(callback) {
    Channel.removeListener(CHANNEL_EVENT, callback);
  },
};

async function handleAction(action) {
  console.log(action);
  switch (action.actionType) {
    case TodoConstants.TODO_CREATE:
      await createItem(action.description);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_REMOVE:
      await removeItem(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE:
      await updateItem(action.item);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_CLEAR:
      await clearAll();
      TodoStore.emitChange();
      break;

    default:
      break;
  }
}

TodoStore.dispatchToken = AppDispatcher.register(handleAction);
export default TodoStore;
