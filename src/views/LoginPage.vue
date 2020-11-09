<template>
  <div id="login-page">
    <Header />
    <v-container class="fill-height" fluid>
      <LoginForm
        v-if="loggingIn"
        class="center"
        @openRegister="loggingIn = !loggingIn"
      />
      <RegisterForm class="center" v-else @openLogin="loggingIn = !loggingIn" />
    </v-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import LoginForm from "@/components/authentication/LoginForm.vue";
import RegisterForm from "@/components/authentication/RegisterForm.vue";
export default {
  name: "login-page",
  components: {
    Header,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      loggingIn: true,
    };
  },
};
</script>

<style scoped>
.center {
  margin: auto;
}
</style>
