<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.background-editbook {
  background-image: linear-gradient(
      rgba(220, 130, 26, 0.5),
      rgba(60, 55, 157, 0.5)
    ),
    url("./imageforpage/bg7.jpg");
  background-size: cover;
  min-height: 100%;
  width: 100%;
  position: fixed;
  font-family: "Bebas Neue", cursive;
}
.control input{
  border-radius: .4vw;
  font-family: 'Kanit', sans-serif;
  background-color: transparent;
  font-size: .85vw;
  color: white;
}
#text-button{
  font-size: 1vw;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 1px;
  padding-top: .3vw;
}
</style>
<template>
  <div class="background-editbook">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div
          class="box"
          style="
            background-color: rgba(255, 255, 255, 0.5);
            border-style: solid;
            border-width: 0.5vw;
            border-color: rgba(61, 76, 83, 0.3);
            border-radius: 1vw;
            margin-top: 8vw;
          "
        >
          <div class="columns">
            <div class="column is-3">
              <figure
                class="image"
                style="background-color: white; height: 20vw"
              >
                <img :src="imagePath(cart.book_image)" style="height: 20vw" />
              </figure>
            </div>
            <div class="column is-4 is-offset-1">
              <div class="row field">
                <label class="column is-4 mt-2" style="font-size: 1vw; font-weight: bold">BOOK TITLE</label>
                <div class="column is-8 control">
                  <input
                    class="input"
                    type="text"
                    v-model="booktitle"
                    placeholder="BOOK TITLE"
                  />
                </div>
              </div>
              <div class="row field">
                <label class="column is-4 mt-2" style="font-size: 1vw; font-weight: bold">BOOK TYPE</label>
                <div class="column is-8 control">
                  <input
                    class="input"
                    type="text"
                    v-model="booktype"
                    placeholder="BOOK TYPE"
                  />
                </div>
              </div>
              <div class="row field">
                <label class="column is-4 mt-2" style="font-size: 1vw; font-weight: bold">BOOK YEAR</label>
                <div class="column is-8 control">
                  <input
                    class="input"
                    type="text"
                    v-model="bookyear"
                    placeholder="BOOK YEAR"
                  />
                </div>
              </div>
              <br><br><br>
              <div class="row">
                <button
                  @click="deletebook()"
                  class="button is-danger"
                >
                  <span id="text-button">delete</span>
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
              </div>
            </div>
            <div class="column is-4">
              <div class="row field">
                <label class="column is-4 mt-2" style="font-size: 1vw; font-weight: bold">BOOK LANGUAGE</label>
                <div class="column is-8 control">
                  <input
                    class="input"
                    type="text"
                    v-model="booklanguage"
                    placeholder="BOOK LANGUAGE"
                  />
                </div>
              </div>
              <div class="row field">
                <label class="column is-4 mt-2" style="font-size: 1vw; font-weight: bold">BOOK PUBLISHER</label>
                <div class="column is-8 control">
                  <input
                    class="input"
                    type="text"
                    v-model="bookpublisher"
                    placeholder="BOOK PUBLISHER"
                  />
                </div>
              </div>
              <div class="row field">
                <label class="column is-4 mt-2" style="font-size: 1vw; font-weight: bold">BOOK PRICE</label>
                <div class="column is-8 control">
                  <input
                    class="input"
                    type="text"
                    v-model="bookprice"
                    placeholder="BOOK PRICE"
                  />
                </div>
              </div>
              <br><br><br>
              <div class="row" style="ma">
                <div class="column is-9 is-offset-3">
                  <button
                    @click="save()"
                    class="button is-success is-light ml-4"
                  >
                    <span id="text-button">SAVE</span>
                    <span class="icon is-small">
                      <i class="fa fa-save"></i>
                    </span>
                  </button>
                  <button
                    @click="cancel()"
                    class="button is-danger is-light ml-4"
                  >
                    <span id="text-button">CANCEL</span>
                    <span class="icon is-small">
                      <i class="fa fa-close"></i>
                    </span>
                  </button>
                </div>
                
              </div>
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
export default {
  name: "Home",
  props: ["user"],
  data() {
    return {
      search: "",
      blogs: [],
      cart: [],
      booktitle: "",
      booktype: "",
      bookyear: "",
      booklanguage: "",
      bookpublisher: "",
      bookprice: "",
      bookid: "",
    };
  },
  created() {
    let text = localStorage.getItem("testJSON");
    let obj = JSON.parse(text);
    this.cart = obj;
    this.booktitle = this.cart.book_title;
    this.booktype = this.cart.book_type;
    this.bookyear = this.cart.book_year;
    this.booklanguage = this.cart.book_language;
    this.bookpublisher = this.cart.book_publisher;
    this.bookprice = this.cart.book_price;
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    getBlogs() {
      axios
        .get("http://3.210.122.105:3000", {
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
        return "http://3.210.122.105:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + "...";
      }
      return content;
    },
    isBlogOwner(blog) {
      if (!this.user) return false;
      return blog.create_by_id === this.user.id || this.user.role === "admin";
    },
    cancel() {
      this.$router.push("/home");
    },
    save() {
      const data = {
        booktitle: this.booktitle,
        booktype: this.booktype,
        bookyear: this.bookyear,
        booklanguage: this.booklanguage,
        bookpublisher: this.bookpublisher,
        bookprice: this.bookprice,
        bookid: this.cart.book_id,
      };
      axios
        .post("http://3.210.122.105:3000/edit", data)
        .then((res) => {
          this.$router.push("/home");
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },
    deletebook() {
        
      const data = {
        bookid: this.cart.book_id,
      };
      console.log(data)
      axios
        .delete(`http://3.210.122.105:3000/delete/${this.cart.book_id}`)
        .then((res) => {
          this.$router.push("/home");
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },
  },
};
</script>
