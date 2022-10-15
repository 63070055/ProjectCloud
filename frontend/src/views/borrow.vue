<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.background-borrow {
  background-image: linear-gradient(
      rgba(220, 130, 26, 0.5),
      rgba(60, 55, 157, 0.5)
    ),
    url("./imageforpage/bg7.jpg");
  background-size: cover;
  min-height: 100%;
  width: 100%;
  font-family: "Bebas Neue", cursive;
}
#test1{
  border-radius: .4vw;
  font-family: 'Kanit', sans-serif;
  background-color: transparent!important;
  font-size: .85vw;
  color: white;
}
/* #div2{
  position: absolute;
} */
#text-button{
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
        <div class="box" v-for="cart in cart" :key="cart.book_id" style="background-color: rgba(0, 0, 0, 0.5); border-style: solid; border-width: .5vw; border-color: rgba(61, 76, 83, 0.3); border-radius: 1vw; margin-top: 5vw;">
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
                <input
                  id="test1"
                  disabled
                  class="input"
                  type="text"
                  placeholder="borrowed"
                />
              </div>
            </div>
            <div class="field mt-4">
              <label class="label" style="color:white; letter-spacing: 1px;">BORROW DATE</label>
              <div class="control">
                <input

                    v-if="cart.book_id == borrowCheck.book_id"
                 class="input"
                  v-model="borrowdate"
                  type="date"
                  placeholder="BORROW DATE"
                  id="test1"
                  />
                  <input
                  id="test1"
                  v-else-if="cart.book_id != borrowCheck.book_id"
                  disabled="disabled"
                  class="input"
                  type="date"
                  placeholder="2022-01-15"
                />

              </div>
            </div>
            <br />
            <div class="field mt-5">
              <label class="label" style="color:white; letter-spacing: 1px;">LIBRARIAN</label>

              <div class="control">
                 <input
                 id="test1"
                    v-if="cart.book_id == borrowCheck.book_id"
                 class="input" type="text" :value="user.librarian_id"
                  />
                  <input
                  id="test1"
                  v-else-if="cart.book_id != borrowCheck.book_id"
                  disabled="disabled"
                  class="input" type="text" :value="user.librarian_id"
                />

              </div>
            </div>
          </div>
          <div class="column is-4 ml-2">
            <div class="field mt-4">
              <label class="label" style="color:white; letter-spacing: 1px;">BORROW BY</label>
              <div class="control">
                 <input
                 id="test1"
                    v-if="cart.book_id == borrowCheck.book_id"
                 class="input"
                  v-model="borrowby"
                  type="text"
                  placeholder="BORROW BY"
                  />
                  <input
                  id="test1"
                  v-else-if="cart.book_id != borrowCheck.book_id"
                  disabled="disabled"
                  class="input"
                  v-model="borrowby"
                  type="text"
                  placeholder="BORROW BY"
                />

              </div>
            </div>
            <div class="field mt-4">
              <label class="label" style="color:white; letter-spacing: 1px;">DATELINE DATE</label>
              <div class="control">
                                 <input
                                 id="test1"
                    v-if="cart.book_id == borrowCheck.book_id"
                  class="input"
                  v-model="datelinedate"
                  type="date"
                  placeholder="DATELINE DATE"
                  />
                  <input
                  id="test1"
                  v-else-if="cart.book_id != borrowCheck.book_id"
                  disabled="disabled"
                 class="input"
                  v-model="datelinedate"
                  type="date"
                  placeholder="DATELINE DATE"
                />
              </div>
            </div>
            <br />
            <br />
            <div class="row mt-4">
              <div class="column is-6">
                <button v-if="cart.book_id == borrowCheck.book_id" @click="confirm(cart, index)" class="button is-primary is-light is-fullwidth">
                  <span id="text-button">CONFIRM</span>
              <span class="icon is-small">
                <i class="fa fa-caret-right"></i>
              </span>
                </button>
                <button  v-else-if="cart.book_id != borrowCheck.book_id" @click="borrow(cart)" class="button is-fullwidth">
                  <span id="text-button">BORROW</span>
              <span class="icon is-small">
                <i class="fa fa-book"></i>
              </span>
                </button>
              </div>
              <div class="column">
                <button @click="cancel()" class="button is-danger is-light is-fullwidth">
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
// @ is an alias to /src
let text = localStorage.getItem("testJSON");
let obj = JSON.parse(text);
// console.log(obj);
export default {
  name: "Home",
  props: ["user"],

  data() {
    return {
      search: "",
      blogs: [],
      status: "",
      borrowdate: "",
      librarian: "",
      borrowby: "",
      datelinedate: "",
      bookid:"",
      cart:[],
      borrowCheck:""
      // text: obj
    };
  },
  created() {
    let text = localStorage.getItem("testJSON");
    let obj = JSON.parse(text);
    this.cart = obj;
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    getBlogs() {
      axios
        .get("http://localhost:3000", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.blogs = response.data;
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
      const data = {
        status: this.status,
        borrowdate: this.borrowdate,
        librarian: this.user.librarian_id,
        borrowby: this.borrowby,
        datelinedate: this.datelinedate,
        bookid: data1.book_id
      };
       axios
          .post("http://localhost:3000/borrow", data)
          .then((res) => {
            if(this.cart.length > 1){
            this.cart = Array.from(this.cart);
            this.cart.splice(index, 1);
            this.status= "borrowed";
            this.borrowdate= "";
            this.librarian= "";
            this.borrowby= "";
            this.datelinedate= "";
            this.bookid=""
          } else{
            this.status= "";
            this.borrowdate= "";
            this.librarian= "";
            this.borrowby= "";
            this.datelinedate= "";
            this.bookid=""
            this.$router.push("/home");
          }
          })
          .catch((err) => {
            console.log(err)
          });
      console.log(data);
      console.log(this.cart);
    },
     cancel() {
      this.$router.push("/home");
    },
    borrow(data1){
       this.borrowCheck = this.cart.filter((val) => val.book_id === data1.book_id)[0];
    }
  },
};
</script>
