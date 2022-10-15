<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.background-mp {
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

/* .title {
  margin-top: 10vw;
} */

#box-mp {
  transform: scale(1);
  transition: transform 1s;
  cursor: pointer;
}
#box-mp:hover {
  transform: scale(1.1);
}
</style>
<template>
<div class="background-mp">
  <div class="columns">
    <div class="column is-1"></div>
    <div class="column is-10" style="margin-top: 20vh;">
      <div class="rows has-text-centered">
        <div class="title">
          <p style="font-size: 2vw; color: white; letter-spacing: 1vw;">
            WELCOME TO
          </p>
          <p style="font-size: 7vw; color: white; letter-spacing: .2vw;">
            ONLINE LIBRARY
          </p>
          <p style="font-size: 1vw; color: white; letter-spacing: .2vw;">
            ALL BOOK YOU NEED IS HERE
          </p>
        </div>
      </div>
      <div class="rows has-text-centered mt-6">
        <div class="columns" style="font-size: 1vw;">
          <div class="column is-2 is-offset-4">
            <div class="box" id="box-mp" @click="gologin()">
              <img
                src="./imageforpage/icon2.png"
                alt=""
                width="100"
                height="100"
              /><br />
              IF(<a style="color: #E6772E">"YOU HAVE ACCOUNT"</a>) <br />
              CLICK HERE
            </div>
          </div>
          <div class="column is-2">
            <div class="box" id="box-mp" @click="gosignup()">
              <img
                src="./imageforpage/icon1.png"
                alt=""
                width="100"
                height="100"
              /><br />
              ELSE(<a style="color: #E6772E">"YOU CAN SING UP"</a>)<br />
              CLICK HERE
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-1"></div>
  </div></div>
</template>
<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
    };
  },
  methods: {
    gologin() {
      this.$router.push({ path: "/user/login" });
    },
    gosignup(){
      this.$router.push({ path: "/user/signup" });
    }
  },
};
</script>