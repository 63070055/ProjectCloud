<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");
.background-login {
  background-image: linear-gradient(
      rgba(220, 130, 26, 0.5),
      rgba(60, 55, 157, 0.5)
    ),
    url("./imageforpage/bgtest.png");
  background-size: cover;
  min-height: 100%;
  width: 100%;
  position: fixed;
  font-family: "Bebas Neue", cursive;
}
#text-button{
  font-size: 1vw;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 2px;
  padding-top: .3vw;
}
.control input{
 font-family: "Kanit", sans-serif;
 font-size: 1vw;
}
</style>
<template>
<div class="background-login">
  <div class="columns">
    <div class="column is-6 is-offset-3" style="position: relative;">
      <div
        class="box"
        style="margin-top: 15%; background-color: rgba(0,0,0,.5);"
      >
        <div class="columns">
          <div class="column is-6" style="padding: 0;">
            <img src="./imageforpage/icon3.png" alt="" style="border-radius:5px; opacity: 0.9;" width="500"/>
          </div>
          <div class="column is-6 mt-2">
            <div class="rows has-text-centered mb-3">
              <div class="title">
                <p style="font-size: 4vw; color: white; letter-spacing: 5px;">
                  LOGIN
                </p>
              </div>
            </div>

            <div class="rows">
              <div class="field ml-5 mr-5">
                <br />
                <label
                  class="label"
                  style="font-size: 1vw; color: white; letter-spacing: 2px;"
                  >Username</label
                >
                <div class="control has-icons-left">
                  <input v-model="username" class="input" style="background-color: transparent!important; color: white;" type="text" />
                  <span class="icon is-small is-left" style="color: white;">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field ml-5 mr-5">
                <br />
                <label
                  class="label"
                  style="font-size: 1vw; color: white; letter-spacing: 2px;"
                  >Password</label
                >
                <div class="control has-icons-left has-icons-right mt-3">
                  <input v-model="password" class="input" type="password" style="background-color: transparent!important; color: white;"/>
                  <span class="icon is-small is-left" style="color: white;">
                    <i class="fas fa-lock"></i>
                  </span>
                  <!-- <span class="icon is-small is-right" style="color: white;">
                    <i class="fas fa-check"></i>
                  </span> -->
                </div>
              </div>
              <p
                v-if="error"
                class="px-3 py-2 has-text-centered has-text-danger-dark"
              >
                {{ error }}
              </p>
              <div class="rows has-text-centered mb-5">
                <br/>
                <button
                  class="button mt-5"
                  @click="submit"
                >
                  <span id="text-button">Login</span>
                  <span class="icon"><i class="fa fa-sign-in"></i></span>
                </button>
              </div>
              <p class="my-3 has-text-centered" style="color: #9E9E9E;">
                Don't have an account yet?
                <router-link :to="`/user/Signup`">Sign up</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: { 
    submit() {
      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://3.210.122.105:3000/user/login/", data)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          this.$emit("auth-change");
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
  },
};
</script>