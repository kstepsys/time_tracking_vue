<template>
  <v-card
    id="login-form"
    class="elevation-12 card-center"
    width="390px"
    min-width="350px"
    min-height="350px"
  >
    <v-toolbar color="purple" dark flat>
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          id="email"
          label="Email"
          name="email"
          prepend-icon="mdi-email"
          type="text"
          @keyup="loginFailed = false"
          @keyup.enter="enterPassword"
        />
        <v-text-field
          v-model="password"
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          @keyup="loginFailed = false"
          @keyup.enter="login"
        />
      </v-form>
      <v-alert type="warning" v-if="loginFailed">
        Email or Password are incorrect
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="purple darken-4"
        class="button register-button"
        @click="openRegisterForm()"
      >
        Register
      </v-btn>
      <v-btn class="button login-button" color="purple" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import User from "@/models/User.js";
export default {
  name: "login-form",
  data() {
    return {
      email: "",
      password: "",
      loginFailed: false,
    };
  },
  methods: {
    async login() {
      const loggedIn = await User.login(this.email, this.password);
      if(!loggedIn){
        this.resetInput();
        this.loginFailed = true;
        return;
      }
      this.$router.push({ name: "Tasks" });
    },
    resetInput(){
      this.email = "";
      this.password = "";
      document.getElementById("email").focus();
    },
    enterPassword() {
      document.getElementById("password").focus();
    },
    openRegisterForm() {
      this.$emit("openRegister");
    },
  },
};
</script>

<style scoped>
.button {
  position: absolute;
  bottom: 10px;
  color: white;
  width: 100px;
}
.login-button {
  right: 10px;
}
.register-button {
  right: 120px;
}
</style>
