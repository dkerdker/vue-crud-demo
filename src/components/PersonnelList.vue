<template>
  <div class="personnel-list">
    <div class="data">
      <table class="ui celled table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">ID</th>
            <th style="width: 180px;">Name</th>
            <th style="width: 180px;">E-mail</th>
            <th>Details</th>
            <th style="width: 148px;">Action</th>
          </tr>
        </thead>

        <tbody>
          <Personnel
            v-for="personnel in personnels.data"
            :key="personnel.id"
            :personnel="personnel"
            @onDelete="onDelete"
            @onEdit="onEdit"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Personnel from "./Personnel";
export default {
  name: "PersonnelList",
  components: {
    Personnel
  },
  props: {
    personnels: {
      type: Object
    }
  },
  methods: {
    onDelete(id) {
      // window.console.log("personnel list delete " + id);
      this.$emit("onDelete", id);
    },
    onEdit(data) {
      // window.console.log("personnel list edit " + data);
      this.$emit("onEdit", data);
    }
  }
};
</script>

<style scoped></style>
