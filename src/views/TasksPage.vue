<template>
  <div id="tasks-page">
    <Header />
    <TasksTable ref="tasksTable" @createTask="openCreateTaskDialog"/>
    <CreateTaskDialog ref="createTaskDialog" @taskCreated="reloadTable"/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import TasksTable from "@/components/tasks/TasksTable.vue";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog.vue";
export default {
  name: "tasks-page",
  components: {
    Header,
    TasksTable,
    CreateTaskDialog
  },
  created() {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    openCreateTaskDialog(){
      if(this.$refs.createTaskDialog){
        this.$refs.createTaskDialog.openDialog();
      }
    },
    reloadTable(){
      if(this.$refs.tasksTable){
        this.$refs.tasksTable.updatePage();
      }
    }
  }
};
</script>
