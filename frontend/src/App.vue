<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
nav{
   background: linear-gradient(0.5turn, #232131, #1c1a27);
   font-family: "Bebas Neue", cursive;
   z-index: -1;
}
.navbar-item::hover{
  background-color: #0775a4;
}
#nav-hack1{
  background: linear-gradient(0.25turn, #b08455, #f69d3c);
  border-radius: 20px;
}
#nav-hack2{
  background: linear-gradient(0.25turn, #b08455, #f69d3c);
  border-radius: 20px;
}
#nav-hack3{
  background-color: transparent;
  border-radius: 20px;
}
</style>
<template>
  <div class="app" id="app">
    <!-- nav bar -->
    <div v-if="!user"><router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" /></div>
    <div v-if="user">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/home" class="navbar-item is-size-4" style="color:white">
          Librarian Online
        </router-link>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div v-if="user" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" id="nav-hack1">
              <figure class="image is-24x24 my-auto">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/128x128.png"
                />
              </figure>
              <span class="pl-3"
                >{{ user.p_firstname }} {{ user.p_lastname }}</span
              >
            </a>
            <div class="navbar-dropdown" id="nav-hack2">
              <a v-if="user.librarian_id" class="navbar-item" @click="acceptpage()" id="nav-hack3">Accept</a>
              <a v-if="user_id  && user_id != undefined" class="navbar-item" @click="reglibra()" id="nav-hack3">Sign up Librarian</a>
              <a class="navbar-item" @click="profilepage()" id="nav-hack3">Profile</a>
              <a class="navbar-item" @click="DeletePassword()" id="nav-hack3">Log out</a>
            </div>
          </div>
          <div v-if="!user" class="navbar-item">
            <router-link to="/">
              <strong>Main</strong>
            </router-link>
          </div>
          <div v-if="!user" class="navbar-item">
            <router-link to="/user/login">
              <strong>Login</strong>
            </router-link>
          </div>
          <div v-if="!user" class="navbar-item">
            <router-link to="/user/signup">
              <strong>Signup</strong>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user" />
  </div></div>
</template>

<script>
import axios from '@/plugins/axios'

export default {  
  data () {    
    return {      
      user: null,
      user_id: "",
      }  
  },
  mounted () {
    this.onAuthChange()
  },
  methods: {
    onAuthChange () {
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser () {
      const token = localStorage.getItem('token')
      axios.get('/user/me').then(res => {
        this.user = res.data
        this.user_id = this.user.librarian_id
      })
    },
    DeletePassword() {
      axios
        .delete(`http://localhost:3000/user/logout`)
        .then((response) => {
          localStorage.removeItem("token")
          this.user = null
          this.user_id = ""
          this.$router.push("/user/login");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    profilepage(){
      this.$router.push("/user/profile");
    },
    reglibra(){
      this.$router.push("/user/signuplibrarian");
    },
    acceptpage(){
      this.$router.push("/user/accept");
    }
  }}
</script>