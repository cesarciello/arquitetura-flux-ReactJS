import { apiService } from "./apiService";

const endpoint = "todo";

const TodoService = {
  async list() {
    return await apiService.get(endpoint);
  },
  async create(item) {
    return await apiService.post(endpoint, item);
  },
  async update(item) {
    return await apiService.put(endpoint, item);
  },
  async remove(id) {
    return await apiService.delete(endpoint, id);
  },
};

export default TodoService;
