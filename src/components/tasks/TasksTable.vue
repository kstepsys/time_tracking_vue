<template>
  <div id="tasks-table">
    <v-data-table
      :headers="headers"
      :items="tasks"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-menu
            v-model="dateFromMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFrom"
                label="Date From"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateFrom"
              @input="dateFromMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-menu
            v-model="dateToMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateTo"
                label="Date To"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateTo"
              @input="dateToMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-on="on" v-bind="attrs" dark class="mb-2">
                Export
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="exportCsv">
                <v-list-item-title>CSV</v-list-item-title>
              </v-list-item>
              <v-list-item @click="exportPdf">
                <v-list-item-title>PDF</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn color="primary" dark class="mb-2" @click="createNewTask">
            New Task
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>

<script>
import Task from "@/models/Task.js";
import PdfGenerator from "@/models/exports/PdfGenerator.js";
import CsvGenerator from "@/models/exports/CsvGenerator.js";
export default {
  name: "tasks-table",
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      dateFromMenu: false,
      dateToMenu: false,
      loaded: false,
      page: 1,
      pageCount: 3,
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Comment", value: "comment", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Time Spent", value: "time_spent", sortable: false },
      ],
      tasks: [],
    };
  },
  watch: {
    dateFrom() {
      this.page = 1;
      this.initialize();
    },
    dateTo() {
      this.page = 1;
      this.initialize();
    },
    page() {
      this.initialize();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.loaded = false;
      const { tasks, pages } = await Task.loadPaginatedTasks(
        this.dateFrom,
        this.dateTo,
        this.page
      );
      this.tasks = tasks;
      this.pageCount = pages;
      this.loaded = true;
    },
    updatePage() {
      this.page = 1;
      this.dateFrom = null;
      this.dateTo = null;
      this.initialize();
    },
    createNewTask() {
      this.$emit("createTask");
    },
    async exportCsv(){
        const tasks = await Task.loadTasksExport(this.dateFrom, this.dateTo);
        if(tasks.length === 0) return;
        const csvGenerator = new CsvGenerator(tasks, this.dateFrom, this.dateTo);
        csvGenerator.generateCsv();
    },
    async exportPdf() {
      const tasks = await Task.loadTasksExport(this.dateFrom, this.dateTo);
      if(tasks.length === 0) return;
      const pdfGenerator = new PdfGenerator(tasks, this.dateFrom, this.dateTo);
      pdfGenerator.generatePdf();
    },
  },
};
</script>

<style scoped>
#tasks-table {
  margin-top: 20px;
}
</style>