<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

body {
  height: 100%;
}

.background-borrow {
  background-image: linear-gradient(rgba(220, 130, 26, 0.5),
      rgba(60, 55, 157, 0.5)),
    url("./imageforpage/bg7.jpg");
  /* background-size: cover; */
  min-height: 100vh;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /* position: absolute; */
  width: 100%;
  font-family: "Bebas Neue", cursive;
}

#test1 {
  border-radius: .4vw;
  font-family: 'Kanit', sans-serif;
  background-color: transparent !important;
  font-size: .85vw;
  color: white;
}

#text-button {
  font-size: 1vw;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 1px;
  padding-top: .3vw;
}
</style>
<template>
  <div class="background-borrow">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div class="box" v-for="(cart, index) in blogs" :key="cart.con_ID"
          style="background-color: rgba(0, 0, 0, 0.5); border-style: solid; border-width: .5vw; border-color: rgba(61, 76, 83, 0.3); border-radius: 1vw; margin-top: 5vw;">
          <div class="row">
            <div class="column is-3 ml-5">
              <figure class="image is-4by5 mt-3">
                <img :src="imagePath(cart.book_image)" />
              </figure>
              <div class="">
                <div class="column is-3"></div>
                <div class="column has-text-weight-semibold is-size-4 ml-1" style="color:white; letter-spacing: 1px;">
                  {{ cart.book_title }}
                </div>
              </div>
            </div>
            <div class="column is-4 ml-2">
              <div class="field mt-4">
                <label class="label" style="color:white; letter-spacing: 1px;">STATUS</label>
                <div class="control">
                  <input id="test1" disabled class="input" type="text" placeholder="waiting" />
                </div>
              </div>
              <div class="field mt-4">
                <label class="label" style="color:white; letter-spacing: 1px;">BORROW DATE</label>
                <div class="control">
                  <input id="test1" disabled="disabled" class="input" placeholder="2022-01-15"
                    :value="cart.con_borrow_date.slice(0, 10)" />
                </div>
              </div>
              <br />
              <div v-if="user.librarian_id" class="field mt-5">
                <label class="label" style="color:white; letter-spacing: 1px;">LIBRARIAN</label>

                <div class="control">
                  <input id="test1" v-if="cart.book_id == borrowCheck.book_id" class="input" type="text"
                    :value="user.librarian_id" />
                  <input id="test1" v-else-if="cart.book_id != borrowCheck.book_id" disabled="disabled" class="input"
                    type="text" :value="user.librarian_id" />

                </div>
              </div>
            </div>
            <div class="column is-4 ml-2">
              <div class="field mt-4">
                <label class="label" style="color:white; letter-spacing: 1px;">BORROW BY</label>
                <div class="control">
                  <input id="test1" class="input" type="number" placeholder="BORROW BY" :value="cart.con_member_id"
                    disabled />
                </div>
              </div>
              <div class="field mt-4">
                <label class="label" style="color:white; letter-spacing: 1px;">DATELINE DATE</label>
                <div class="control">
                  <input id="test1" disabled="disabled" class="input" placeholder="2022-01-15"
                    :value="cart.con_borrow_dateline_date.slice(0, 10)" />
                </div>
              </div>
              <br />
              <br />
              <div class="row mt-4">
                <div class="column is-6">
                  <button @click="confirm(cart, index)" class="button is-primary is-light is-fullwidth">
                    <span id="text-button">CONFIRM</span>
                    <span class="icon is-small">
                      <i class="fa fa-caret-right"></i>
                    </span>
                  </button>
                </div>
                <div class="column">
                  <button @click="cancel(cart, index)" class="button is-danger is-light is-fullwidth">
                    <span id="text-button">CANCEL</span>
                    <span class="icon is-small">
                      <i class="fa fa-close"></i>
                    </span>
                  </button>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Home",
  props: ["user"],

  data() {
    return {
      search: "",
      blogs: [],
      status: "",
      borrowdate: new Date().toISOString().slice(0, 10),
      datelinedate: "",
      bookid: "",
      borrowCheck: "",
      blogs1: [],
    };
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    getBlogs() {
      axios
        .get("http://localhost:3000/addrequest")
        .then((response) => {
          this.blogs = response.data.borrowdate;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    confirm(data1, index) {
      let test = data1.con_borrow_date.slice(0, 10)
      let test1 = data1.con_borrow_dateline_date.slice(0, 10)
      console.log(data1)
      const data = {
        borrowdate: test,
        librarian: this.user.librarian_id,
        borrowby: data1.con_member_id,
        datelinedate: test1,
        bookid: data1.con_book_id,
        conID: data1.con_ID
      };
      console.log(data)
      axios
        .post("http://localhost:3000/borrow", data)
        .then((res) => {
          if (this.blogs.length > 1) {
            this.blogs = Array.from(this.blogs);
            this.blogs.splice(index, 1);
            this.status = "waiting";
            this.borrowdate = "";
            this.librarian = "";
            this.borrowby = "";
            this.datelinedate = "";
            this.bookid = ""
          } else {
            this.status = "";
            this.borrowdate = "";
            this.librarian = "";
            this.borrowby = "";
            this.datelinedate = "";
            this.bookid = ""
            this.$router.push("/home");
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    cancel(cart, index) {
      const data1 = {
        bookID: cart.con_book_id,
        confirmID: cart.con_ID,
      };
      axios
        .delete("http://localhost:3000/deletecomfirm", { data: { bookID: cart.con_book_id, confirmID: cart.con_ID } })
        .then((res) => {
          if (this.blogs.length > 1) {
            this.blogs = Array.from(this.blogs);
            this.blogs.splice(index, 1);
          } else {
            this.$router.push("/home");
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    borrow(data1) {
      console.log(this.user.librarian_id)
      this.borrowCheck = this.cart.filter((val) => val.book_id === data1.book_id)[0];
    },
  },
};
</script>
