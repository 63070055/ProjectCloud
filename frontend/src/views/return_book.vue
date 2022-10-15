<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");
.background-return-book {
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
#box {
  background-color: #f9fbed;
  height: 700px;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  border-radius: 10px;
}
#box::-webkit-scrollbar {
  display: none;
}
#nav-box {
  background-color: #e6772e;
  position: absolute;
  width: 97.8%;
  height: 60px;
  border-radius: 8px 8px 0 0;
  padding-left: 10px;
  padding-top: 10px;
  z-index: 1;
}

#test11 {
  border-radius: 0.4vw;
  font-family: "Kanit", sans-serif;
  background-color: transparent !important;
  font-size: 0.85vw;
  color: white;
}

#text-button {
  font-size: 1vw;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 1px;
  padding-top: 0.3vw;
}
</style>
<template>
  <div class="background-return-book">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div v-for="(data, index) in returndata1" :key="data.book_id" class="box" style="
              background-color: rgba(0, 0, 0, 0.5);
              border-style: solid;
              border-width: 0.5vw;
              border-color: rgba(61, 76, 83, 0.3);
              border-radius: 1vw;
              margin-top: 5vw;
            ">
          <div class="columns">
            <div class="column is-2 is-offset-1">
              <img :src="imagePath(data.book_image)" alt="Placeholder image" style="height: 15vw" />
              <label class="label" style="color: white; font-size:1vw; margin-top: .5vw">{{ data.book_title }}</label>
            </div>

            <div class="column is-4 is-offset-1">
            <div class="rows"><label class="label" style="color: #8b8b8b; font-size:2vw">BORROW DATE</label>
                <div class="control">
                <label class="labeld">
                <p
                  class="title is-4"
                  style="color: white; letter-spacing: 0.1vw"
                >
                  {{ data.borrow_date.slice(0, 10) }}
                </p>
              </label>
                  <p></p>
                </div> </div>
                 <div class="rows"><label class="label" style="color: #8b8b8b; font-size:2vw"
                  >Member Name </label
                >
                <div class="control">
                  <label class="labeld">
                <p
                  class="title is-4"
                  style="color: white; letter-spacing: 0.1vw"
                >
                  {{ data.p_firstname }} {{ data.p_lastname }}
                </p>
              </label>
                </div> </div>
            
            </div>
            <div class="column is-4">
              <div class="rows">
                <label class="label" style="color: #8b8b8b; font-size:2vw">DATELINE DATE</label>
                <div class="control">
                  <input
                    id="test11"
                    v-if="data.book_id == returnCheck.book_id"
                    v-model="return_date"
                    class="input"
                    type="date"
                    placeholder="2022-01-15"
                  />
                  <input
                    id="test11"
                    v-else-if="data.book_id != returnCheck.book_id"
                    disabled="disabled"
                    class="input"
                    type="date"
                    placeholder="2022-01-15"
                />
                  <p
                  
                  class="help is-danger"
                  v-if="return_date > data.borrow_dateline_date && data.book_id == returnCheck.book_id"
                >
                  return to late
                </p>
                </div>
              </div>
              <div class="rows">
                <label class="label" style="color: #8b8b8b; font-size:2vw"
                  >RIBRARIAN</label
                >
                <div class="control">
                  <!-- <input class="input" type="text" placeholder="TEE" /> -->
                  <label class="labeld">
                    <p
                      class="title is-4"
                      style="color: white; letter-spacing: 0.1vw"
                    >
                      {{ data.br_librarian_id }}
                    </p>
                  </label>
                </div>
              </div>
              <div class="rows mt-5">
                <button v-if="data.book_id == returnCheck.book_id" @click="confirm(data, index)" class="button is-success is-light">
                  <span id="text-button">CONFIRM</span>
                  <span class="icon is-small">
                    <i class="fa fa-save"></i>
                  </span>
                </button>
                <button v-else-if="data.book_id != returnCheck.book_id" @click="summit(data)" class="button is-light">
                  <span id="text-button">RETURN</span>
                  <span class="icon is-small">
                    <i class="fa fa-caret-left"></i>
                  </span>
                </button>
                <button @click="cancal()" class="button is-danger is-light mx-5">
                  <span id="text-button">CANCLE</span>
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
</template>
<script>
import axios from "@/plugins/axios";

export default {
  name: "Home",
  props: ["user"],
  data() {
    return {
      cart: [],
      returndata: [],
      returndata1: [],
      return_date: "",
      returnCheck:"",
    };
  },
  created() {
    let text = localStorage.getItem("testJSON");
    let obj = JSON.parse(text);
    this.cart = obj;
    this.getreturn();
  },
  methods: {
    getreturn() {
      axios
        .get("http://localhost:3000/borrow_return")
        .then((response) => {
          this.returndata = response.data.returndata.filter(
            (val) => val.book_id == this.cart.book_id && val.return_date == null
          );
          this.returndata1 = response.data.returndata.filter(
            (val) =>
              val.br_member_id == this.returndata[0].member_id &&
              val.return_date == null
          );
          console.log(this.returndata1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(book_image) {
      if (book_image) {
        return "http://localhost:3000/" + book_image;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    confirm(data1,index) {
      const data = {
        bookid: data1.book_id,
        return_date: this.return_date,
      };
      axios
        .post("http://localhost:3000/return", data)
        .then((res) => {
          if(this.returndata1.length > 1){
            this.returndata1 = Array.from(this.returndata1);
            this.returndata1.splice(index, 1);
            this.return_date = ""
          } else{
            this.return_date = ""
            this.$router.push("/home");
          }
          // this.$router.push("/home");
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },
    summit(data1){
      this.returnCheck = this.returndata1.filter((val) => val.book_id === data1.book_id)[0];
    },
    cancal() {
      this.$router.push("/home");
    },
  },
};
</script>

