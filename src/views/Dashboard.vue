<template>
  <div class="home col-8 mx-auto py-5 mt-5">
    <h1>Dashboard</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
      </div>
    </div>

    <div class="ui main container">
      <MyForm :form="form" @onFormSubmit="onFormSubmit" />
      <PersonnelList :personnels="personnels" @onDelete="onDelete" @onEdit="onEdit" />
      <Loader v-if="loader" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import User from "../apis/User";
import MyForm from "@/components/MyForm";
import Loader from "@/components/Loader";
import PersonnelList from "@/components/PersonnelList";
import { mapState } from "vuex";

export default {
  components: {
    MyForm,
    PersonnelList,
    Loader
  },
  data() {
    return {
      url: "http://127.0.0.1:8000/api/personnels",
      personnels: [],
      form: { first_name: "", last_name: "", email: "", isEdit: false },
      loader: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    getPersonnel() {
      this.loader = true;

      axios.get(this.url).then(data => {
        console.log("hello" + data.data);
        this.personnels = data.data;
        this.loader = false;
      });
    },
    deletePersonnel(id) {
      this.loader = true;

      axios
        .delete(`${this.url}/${id}`)
        .then(() => {
          this.getPersonnel();
        })
        .catch(e => {
          alert(e);
        });
    },
    createPersonnel(data) {
      this.loader = true;

      axios
        .post(this.url, {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        })
        .then(() => {
          this.getPersonnel();
        })
        .catch(e => {
          alert(e);
        });
    },
    editPersonnel(data) {
      this.loader = true;

      axios
        .put(`${this.url}/${data.id}`, {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        })
        .then(() => {
          this.getPersonnel();
        })
        .catch(e => {
          alert(e);
        });
    },
    onDelete(id) {
      // window.console.log("app delete " + id);

      this.deletePersonnel(id);
    },
    onEdit(data) {
      // window.console.log("app edit ", data);

      this.form = data;
      this.form.isEdit = true;
    },
    onFormSubmit(data) {
      // window.console.log("app onFormSubmit", data);

      if (data.isEdit) {
        // call edit personnel
        this.editPersonnel(data);
      } else {
        // call create personnel
        this.createPersonnel(data);
      }
    }
  },

  mounted() {
    User.auth().then(response => {
      this.$store.commit("AUTH_USER", response.data);
    });
  },
  created() {
    this.getPersonnel();
  }
};
</script>
<style>
.vue-color {
  background: #41b883 !important;
}

.main.container {
  margin-top: 60px;
}

.submit-button {
  margin-top: 24px !important;
  float: right;
}

.data {
  margin-top: 15px;
}

thead tr th {
  background: #e0e0e0 !important;
}

.ui.inverted.dimmer {
  background-color: rgba(255, 255, 255, 0) !important;
}
</style>