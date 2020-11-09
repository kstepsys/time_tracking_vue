<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="task.title"
                  label="Title*"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="task.date"
                      label="Date*"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="task.date"
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="task.time_spent"
                  label="Time spent"
                  type="number"
                  min="0"
                  step="1"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="task.comment" label="Comment*"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="saveDisabled"
            @click="saveTask"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Task from "@/models/Task.js";
export default {
  data() {
    return {
      dialog: false,
      dateMenu: false,
      task: {},
      defaultTask: {
        title: "",
        time_spent: 0,
        comment: "",
        date: new Date().toISOString().substr(0, 10),
      },
    };
  },
  computed: {
      saveDisabled(){
          if(this.task.title == "" || this.task.comment == "" || this.task.date == null){
              return true;
          }
          return false;
      }
  },
  methods: {
    openDialog() {
      this.task = Object.assign({}, this.defaultTask);
      this.dialog = true;
    },
    async saveTask(){
        await Task.createTask(this.task);
        this.$emit('taskCreated');
        this.dialog = false;
    }
  },
};
</script>