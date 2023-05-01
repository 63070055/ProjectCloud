<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");
.background-profile {
  background-image: linear-gradient(
      rgba(220, 130, 26, 0.5),
      rgba(60, 55, 157, 0.5)
    ),
    url("./imageforpage/bg7.jpg");
  background-size: cover;
  min-height: 100%;
  width: 100%;
  position: absolute;
  font-family: "Bebas Neue", cursive;
}

#text-edit {
  border-radius: 0.4vw;
  font-family: "Bebas Neue", cursive;
  font-size: 1.1vw;
  color: rgb(71, 71, 71);
}
#lable-edit {
  border-radius: 0.4vw;
  font-family: "Kanit", sans-serif;
  /* background-color: transparent!important; */
  font-size: 0.85vw;
  color: rgb(69, 69, 69);
}

#box {
  background-color: rgba(255, 255, 255, 0.8);
  width: 40vw;
  height: 30vw;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  position: absolute;
  border-radius: 10px;
}
#box::-webkit-scrollbar {
  display: none;
}
#nav-box {
  background-color: #949494;
  position: absolute;
  width: 100%;
  border-radius: 8px 8px 0 0;
  padding-left: 10px;
  padding-top: 10px;
  z-index: 1;
}
  #text-button{
  font-size: 1vw;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 1px;
  padding-top: .3vw;
}
</style>
<template>
  <div class="background-profile">
    <div class="columns">
      <div class="column is-5 is-offset-1">
        <div
          class="box"
          style="
            background-color: rgba(255, 255, 255, 0.8);
            border-left: 1vw solid;
            border-color: rgba(61, 76, 83, 0.3);
            margin-top: 5vw;
          "
        >
          <label class="labeld">
            <p
              class="title is-2"
              style="color: rgb(69, 69, 69); letter-spacing: 0.1vw"
            >
              MY PROFILE
            </p>
          </label>
          <div class="columns" v-if="check == 0">
            <div class="column is-6">
              <div class="rows" id="text-edit">
                Name: {{ user.p_firstname }} {{ user.p_lastname }}
              </div>
              <div class="rows" id="text-edit">
                Mobile : {{ user.p_mobile }}
              </div>
              <div class="rows" id="text-edit">
                Address: {{ user.p_address }}
              </div>
            </div>

            <div class="column is-6">
              <div class="rows" id="text-edit">Email: {{ user.p_email }}</div>
              <div class="rows" id="text-edit">
                Password: {{ user.p_password }}
              </div>
            </div>
          </div>

          <div class="columns" v-if="check == 1">
            <div class="column is-4">
              <div class="rows">
                <label class="">
                  FIRSTNAME
                  <input
                    v-model="firstname"
                    class="input"
                    type="text"
                    id="lable-edit"
                /></label>
              </div>
              <div class="rows">
                <label class="">
                  PASSWORD<input
                    v-model="password"
                    class="input"
                    type="text"
                    id="lable-edit"
                /></label>
              </div>
            </div>
            <div class="column is-4">
              <div class="rows">
                <label class="">
                  LASTNAME
                  <input
                    v-model="lastname"
                    class="input"
                    type="text"
                    id="lable-edit"
                /></label>
              </div>
              <div class="rows">
                <label class="">
                  MOBILE<input
                    v-model="mobile"
                    class="input"
                    type="text"
                    id="lable-edit"
                /></label>
              </div>
            </div>
            <div class="column is-4">
              <div class="rows">
                <label class="">
                  EMAIL<input
                    v-model="email"
                    class="input"
                    type="text"
                    id="lable-edit"
                /></label>
              </div>
              <div class="rows">
                <label class="">
                  ADDRESS
                  <textarea
                    v-model="address"
                    class="textarea"
                    placeholder="Address"
                    id="lable-edit"
                  ></textarea>
                </label>
              </div>
            </div>
          </div>

          <div class="columns is-centered mb-2">
            <div class="control is-centered">
              <button v-if="check == 0" @click="edit()" class="button">
                <span id="text-button">EDIT</span>
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </button>
              <button v-else-if="check == 1" @click="submit()" class="button">
                <span id="text-button">SUBMIT</span>
                <span class="icon is-small">
                  <i class="fa fa-caret-right"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-5" v-if="checkbook !== []" style="margin-top: 5vw">

        <div class="page" id="box" >
          <div class="in is-centered" id="nav-box">
            <label class="labeld">
              <p class="title is-3">Book Borrow</p>
            </label>
          </div>

          <div class="columns" v-for="image in checkbook" :key="image.borrow_id">
            <div class="column is-1"></div>
            <div class="column" style="margin-top: 5vw">
              <div class="box mb-5" style="background-color: #D8D8D8">
                <div class="columns is-centered">
                  <div class="column is-4">
                   <img
                          style="height: 200px;"
                          :src="imagePath(image.book_image)"
                          alt="Placeholder image"
                        />
                  </div>
                  <div class="column is-8" style="font-size: 20px; line-height: 3vw;">
                    <strong>TITLE : </strong> {{ image.book_title }} <br>

                    <strong>BORROW DATE : </strong>
                    {{ image.borrow_date.slice(0, 10) }} <br>

                    <strong>DATELINE DATE : </strong>
                    {{ image.borrow_dateline_date.slice(0, 10) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  name: "Home",
  // props: ["user"],
  data() {
    return {
      search: "",
      book: [],
      user: "",
      checkbook: [],
      check: 0,
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      address: "",
      mobile: "",
      id: "",
      checklibrarian: 0,
    };
  },
  mounted() {
    this.getprofile();
    this.getBlogs();
  },
  methods: {
    getprofile() {
      axios
        .get("http://3.210.122.105:3000/blogs")
        .then((response) => {
          this.checkbook = response.data.images;
          console.log('this', this.checkbook);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBlogs() {
      axios
        .get("http://3.210.122.105:3000/", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.book = response.data.rows;
          this.user = response.data.user;

          console.log("nnn", this.book);
          console.log("User", this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://3.210.122.105:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    edit() {
      this.check = 1;
      this.firstname = this.user.p_firstname;
      this.lastname = this.user.p_lastname;
      this.email = this.user.p_email;
      this.password = this.user.p_password;
      this.address = this.user.p_address;
      this.mobile = this.user.p_mobile;
    },
    submit() {
      this.check = 0;
      if (this.user.member_id == null) {
        this.id = this.user.librarian_id;
        this.checklibrarian = 1;
      } else {
        this.id = this.user.member_id;
        this.checklibrarian = 0;
      }
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        address: this.address,
        mobile: this.mobile,
        id: this.id,
        check: this.checklibrarian,
      };
      console.log(data);
      axios
        .post("http://3.210.122.105:3000/user/update", data)
        .then((res) => {
          this.user = res.data.rows[0];
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },
  },
};
</script>
