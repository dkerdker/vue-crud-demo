<template>
  <tr>
    <td>{{ personnel.id }}</td>
    <td>{{ personnel.name }}</td>
    <td>{{ personnel.email }}</td>
    <td>{{ personnel.details }}</td>
    <td>
      <button class="mini ui blue button" @click="onEdit">Edit</button>
      <button class="mini ui red button" @click="onDelete">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "personnel",
  props: {
    personnel: {
      type: Object
    }
  },
  methods: {
    onDelete() {
      // window.console.log("personnel delete " + this.personnel.id);
      this.$emit("onDelete", this.personnel.id);
    },
    onEdit() {
      // window.console.log("personnel edit " + this.personnel.id);
      this.$emit("onEdit", this.personnel);
    }
  }
};
</script>

<style scoped></style>
