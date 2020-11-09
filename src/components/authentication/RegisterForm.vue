<template>
  <v-card
    id="register-form"
    class="elevation-12 card-center"
    width="390px"
    min-width="350px"
    min-height="460px"
    v-if="loggingIn"
  >
    <v-toolbar color="purple" dark flat>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-if="loggingIn">
        <v-text-field
          v-model="email"
          id="email"
          label="Email"
          name="email"
          prepend-icon="mdi-email"
          type="text"
          @keyup="registrationFailed = false"
        />

        <v-text-field
          v-model="password"
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          @keyup="registrationFailed = false"
        />

        <v-text-field
          v-model="passwordRepeat"
          id="password-repeat"
          label="Repeat password"
          name="repeat-password"
          prepend-icon="mdi-lock"
          type="password"
          @keyup="registrationFailed = false"
          @keyup.enter="register"
        />
      </v-form>
      <v-alert type="warning" v-if="registrationFailed">
        Registration failed, try using different email
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="button register-button"
        color="purple"
        :disabled="registerDisabled"
        @click="register"
        >Register</v-btn
      >
      <v-btn class="button back-button" color="blue darken-4" @click="openLoginForm">
        <v-icon>mdi-arrow-left-thick</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import User from "@/models/User.js";
export default {
  name: "register-form",
  data() {
    return {
      loggingIn: true,
      email: "",
      password: "",
      passwordRepeat: "",
      registrationFailed: false
    };
  },
  computed: {
    registerDisabled() {
      const emailValidation = /\S+@\S+\.\S+/;
      if (!emailValidation.test(String(this.email).toLowerCase())) {
        return true;
      }
      if (this.password == "" || this.passwordRepeat == "") {
        return true;
      }
      if (this.passwordRepeat.length != this.password.length) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async register() {
      if(this.disabled) return;
      const userCreated = await User.createUser(this.email, this.password);
      if(!userCreated){
        this.resetInput();
        this.registrationFailed = true;
        return;
      }
      await User.login(this.email, this.password);
      this.$router.push({ name: "Tasks" });
    },
    resetInput() {
      this.registrationFailed = true;
      this.email = "";
      this.password = "";
      this.passwordRepeat = "";
      document.getElementById("email").focus();
    },
    openLoginForm() {
      this.$emit("openLogin");
    },
  },
};
</script>

<style scoped>
.button {
  position: absolute;
  color: white;
  bottom: 10px;
}
.register-button {
  right: 10px;
}
.back-button {
  left: 10px;
}
</style>
