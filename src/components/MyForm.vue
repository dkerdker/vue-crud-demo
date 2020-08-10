<template>
  <div class="my-form">
    <div class="ui equal width grid margin-form">
      <div class="row">
        <div class="column">
          <form @submit.prevent="onSearchSubmit" class="ui form">
            <div class="fields">
              <div class="twelve wide field">
                <label>Search</label>
                <div class="ui search">
                  <div class="ui icon input">
                    <input
                      class="prompt"
                      type="text"
                      @keyup.enter="onSearchSubmit"
                      v-model="search.searchTerm"
                      placeholder="Search"
                    />
                    <i class="search icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <section>
            <div class="fields">
              <div class="twelve wide field"></div>
              <div class="column">
                <input type="radio" v-model="search.searchIn" v-bind:value="a" />&nbsp;
                <label>Name</label>&nbsp;
                <input type="radio" v-model="search.searchIn" v-bind:value="b" />&nbsp;
                <label>Email</label>&nbsp;
                <input type="radio" v-model="search.searchIn" v-bind:value="c" />&nbsp;
                <label>Details</label>&nbsp;
              </div>
            </div>
          </section>
        </div>

        <div class="column">
          <form @submit.prevent="onFileSubmit" class="ui form" enctype="multipart/form-data">
            <div class="fields">
              <div class="twelve wide field">
                <label>Import xlsx, xls, csv</label>
                <input type="file" name="file" ref="file" @change="selectFile" />
              </div>
              <div class="two wide field">
                <button class="mini ui primary button import-button">Import</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <form class="ui form">
      <div class="fields">
        <div class="six wide field">
          <label>First Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            @change="handleChange"
            :value="form.name"
          />
        </div>

        <div class="six wide field">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="joe@gmail.com"
            @change="handleChange"
            :value="form.email"
          />
        </div>

        <div class="six wide field">
          <label>Details</label>
          <input
            type="text"
            name="details"
            placeholder="details"
            @change="handleChange"
            :value="form.details"
          />
        </div>

        <div class="two wide field">
          <button :class="btnClass" @click="onFormSubmit">{{ btnName }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  name: "MyForm",
  data() {
    return {
      btnName: "Save",
      btnClass: "ui primary button submit-button",
      file: "",
      search: { searchIn: "", searchTerm: "" },
      a: "name",
      b: "email",
      c: "details"
    };
  },
  props: ["value", "form"],
  methods: {
    onSearchSubmit() {
      if (this.search.searchTerm) {
        console.log("do search");
        User.search(this.search)
          .then(results => {
            console.log(results.data);
            this.$emit("input", results.data);
          })
          .catch(error => {
            alert("Failed to search " + error);
          });
      } else {
        this.$emit("onSearchClear");
        this.search.searchIn = "";
      }
    },

    handleChange(event) {
      const { name, value } = event.target;
      let form = this.form;
      form[name] = value;
      this.form = form;
    },
    onFormSubmit(event) {
      // prevent form submit
      event.preventDefault();

      // form validation
      if (this.formValidation()) {
        // window.console.log("ready to submit");
        this.$emit("onFormSubmit", this.form);

        // change the button to save
        this.btnName = "Save";
        this.btnClass = "ui primary button submit-button";

        // clear form fields
        this.clearFormFields();
      }
    },

    selectFile() {
      this.file = this.$refs.file.files[0];
      this.fileValidation();
    },

    onFileSubmit() {
      if (this.fileValidation()) {
        const formData = new FormData();
        formData.append("file", this.file);

        console.log("submit");
        console.log(formData);

        //call User.import()
        User.import(formData)
          .then(() => {
            this.$emit("onFileSubmit");
          })
          .catch(error => {
            alert("Failed to import " + error);
          });

        // clear form fields
        this.clearFormFields();
      }
    },

    formValidation() {
      // name
      if (document.getElementsByName("name")[0].value === "") {
        alert("Enter name");
        return false;
      }

      // email
      if (document.getElementsByName("email")[0].value === "") {
        alert("Enter email");
        return false;
      }

      // email
      if (document.getElementsByName("details")[0].value === "") {
        alert("Enter details");
        return false;
      }

      return true;
    },

    fileValidation() {
      var filePath = this.file.name;
      console.log("validating");
      console.log(filePath);
      // Allowing file type
      var allowedExtensions = /(\.xlsx|\.xls|\.csv|\.txt)$/i;

      if (!this.file) {
        alert("Add file to import.");
        return false;
      } else if (!allowedExtensions.exec(filePath)) {
        alert("Invalid file type.");

        this.clearFormFields();
        return false;
      } else {
        return true;
      }
    },

    clearFormFields() {
      // clear form data
      this.form.name = "";
      this.form.email = "";
      this.form.details = "";
      this.form.isEdit = false;

      // clear form fields
      document.querySelector(".form").reset();
    }
  },
  updated() {
    if (this.form.isEdit) {
      this.btnName = "Update";
      this.btnClass = "ui orange button submit-button";
    }
  }
};
</script>
<style scoped></style>