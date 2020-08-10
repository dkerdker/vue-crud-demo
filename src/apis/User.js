import Api from "./Api";

export default {
  register(form) {
    return Api().post("/register", form);
  },

  login(form) {
    return Api().post("/login", form);
  },

  logout() {
    return Api().post("/logout");
  },

  auth() {
    return Api().get("/user");
  },

  read() {
    return Api().get("/personnels");
  },

  delete(id) {
    return Api().delete(`/personnels/${id}`);
  },

  create(data) {
    return Api().post("/personnels", {
      name: data.name,
      email: data.email,
      details: data.details
    });
  },

  update(data) {
    return Api().put(`/personnels/${data.id}`, {
      name: data.name,
      email: data.email,
      details: data.details
    });
  },

  import(formData) {
    return Api().post("/import", formData);
  },

  pageSelect(page) {
    return Api().get("/personnels?page=" + page);
  },

  search(search) {
    console.log(search)
    return Api().post("/search", {
      searchTerm: search.searchTerm,
      searchIn: search.searchIn
    });
  }
};
