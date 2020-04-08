const url = "http://localhost:3002/api/react-flux/";

export const apiService = {
  async get(endpoint) {
    const resp = await fetch(`${url}${endpoint}`);
    return await resp.json();
  },
  async post(endpoint, data) {
    const resp = await fetch(`${url}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await resp.json();
  },
  async put(endpoint, data) {
    const resp = await fetch(`${url}${endpoint}?id=${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return await resp.json();
  },
  async delete(endpoint, id) {
    const resp = await fetch(`${url}${endpoint}?id=${id}`, {
      method: "DELETE",
    });
    return await resp.json();
  },
};
