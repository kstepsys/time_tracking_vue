<template>
  <v-app-bar id="Header" app color="purple" dark>
    <div class="d-flex align-center">
      <h1>Time Tracking App</h1>
    </div>

    <v-spacer></v-spacer>

    <v-btn text v-if="loggedIn" @click="logout">
      <span class="mr-2">Logout</span>
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
    name: "Header",
    computed: {
        loggedIn(){
            const token = sessionStorage.getItem('jwt');
            return token != null;
        }
    },
    methods: {
        logout(){
            sessionStorage.removeItem('jwt');
            if(this.$route.name != "Home"){
                this.$router.push({ name: "Home" });
                this.$router.go();
            }
        }
    }
};
</script>

<style>
</style>