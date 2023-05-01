<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.background-home {
  background-image: linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);
  background-size: cover;
  width: 100%;
  min-height: 100%;
  position: absolute;
  font-family: "Bebas Neue", cursive;
}

#text-button {
  font-size: 0.9vw;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 0.1vw;
  padding-top: 0.3vw;
}

#test {
  border-radius: 0.4vw;
  /* font-family: 'Kanit', sans-serif; */
  font-family: "Bebas Neue", cursive;
  background-color: transparent;
  /* font-size: 1vw; */
  color: white;
  border-width: 0.2vw;
  border-color: rgba(220, 220, 220, 0.8);
}
</style>
<template>
  <div class="background-home">
    <div class="modal" :class="{ 'is-active': isModalActive }">
      <div class="modal-background" @click="isModalActive = false"></div>
      <div class="modal-content">
        <div class="box" style="text-align: center;">
          <div class="columns">
            <div class="column is-4" style="text-align: center;">
              <figure class="image is-128x128">
                <img src="https://bulma.io/images/placeholders/128x128.png">
                <p>Name Book</p>
              </figure>
            </div>
            <div class="column" v-for="value in borrowdatereturn" :key="value.item_no">
              <!-- <span :style="{'text-decoration': task.isComplete ? 'line-through': 'none', color: task.color}">{{task.name}}</span> -->
              <p>status</p>
              <span v-if="checklate == false">Late</span>
              <span v-if="checklate == true">Not Late</span>
              <div class="field">
                <label class="label">Borrow Date</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g Alex Smith" :value="value.borrow_date.slice(0, 10)">
                </div>
              </div>
              <div class="field">
                <label class="label">Return Date</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g Alex Smith"
                    :value="value.borrow_dateline_date.slice(0, 10)">
                </div>
              </div>
              <div class="field">
                <label class="label">Member ID : {{ value.br_member_id }}</label>
              </div>
            </div>
          </div>
          <button class="button is-primary mr-5" @click="returnSubmit()">return</button>
          <button class="button is-danger" @click="isModalActive = false">close</button>
        </div>
      </div>
    </div>
    <!-- <div class="columns"> -->
    <div v-if="user.member_id || user.information_service_dept == 0" class="columns">
      <!-- Column แสดงสินค้า--------------------------------------------------------->
      <div class="column is-7 is-offset-1">
        <div class="columns mt-5">
          <div class="column is-8">
            <input class="input" type="text" v-model="search" placeholder="Search book" id="test" />
          </div>
          <div class="column is-2">
            <button @click="getBlogs()" class="button" style="width: auto">
              <span id="text-button">search</span>
              <span class="icon is-small">
                <i class="fa fa-search"></i>
              </span>
            </button>
          </div>

          <div class="column is-2 is-left">
            <button v-if="user.librarian_id && user.cataloging_dept == 1" @click="addBook()" class="button">
              <span id="text-button">Add Book</span>
              <span class="icon is-small">
                <i class="fa fa-book"></i>
              </span>
            </button>
          </div>
        </div>
        <h1 class="is-size-4 mb-4 has-text-white mt-5">Top 4</h1>
        <h1 class="is-size-4 mb-4 has-text-white mt-5">
          All Products ({{ book.length }})
        </h1>
        <!-- เริ่ม box book -->

        <div class="columns is-multiline">
          <div class="column is-one-quarter" v-for="book1 in book" :key="book1.book_id">
            <div class="box" style="
                background-color: rgba(255, 255, 255, 0.8);
                border-style: solid;
                border-width: 0.5vw;
                border-color: rgba(61, 76, 83, 0.1);
                border-radius: 1vw;
              ">
              <figure class="image">
                <img style="height: 15vw" :src="imagePath(book1.book_image)" alt="Placeholder image" />
              </figure>
              <div class="content" style="padding-top: 1vw; margin-bottom: 0">
                <label class="labeld">
                  <p class="title is-4">{{ book1.book_title }}</p>
                </label>
                <br />
                <label class="labeld">
                  <p class="sub-title is-6">Type : {{ book1.book_type }}</p>
                </label>
                <label class="labeld" v-if="user.member_id &&
                  book1.book_status != 'unborrow'">
                  <p class="sub-title is-6" style="color: darkgoldenrod;" v-if="book1.book_status == 'waiting'">Status :
                    {{ book1.book_status }}</p>
                  <p class="sub-title is-6" style="color: #A93226;" v-else-if="book1.book_status == 'borrowed'">Status :
                    {{ book1.book_status }}</p>
                </label>
                <div class="columns is-centered mt-2">
                  <div class="control is-centered">
                    <button type="button" class="button" v-if="user.member_id &&
                      book1.book_status == 'unborrow'
                      " style="font-size: 12px" @click="addToCart(book1)">
                      <span id="text-button">BORROW</span>
                      <span class="icon is-small">
                        <i class="fa fa-hand-holding"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="columns is-centered mt-2">
                <div class="control is-centered">
                  <button type="button" class="btn has-text-weight-semibold" v-if="user.librarian_id"
                    style="font-size: 14px" @click="edit(book1)">
                    <span id="text-button">EDIT</span>
                    <span class="icon is-small">
                      <i class="fa fa-pen"></i>
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <!-- Column แสดงตะกร้า--------------------------------------------------->
        <div v-if="user.member_id &&
          checkshow == 0
          " class="column">
          <div style="display: flex; justify-content: space-between">
            <span class="is-size-4 mb-4 has-text-white">LIST</span>
            <a @click="clear()" class="is-danger mb-4 button has-text-white">Clear</a>
          </div>

          <!-- Card element start here ------------------------------------------>
          <div v-for="product in cart" :key="product.book_id" class="card mb-4">
            <div class="card-content p-0">
              <div class="media">
                <div class="media-left">
                  <figure class="image">
                    <img style="height: 100px" :src="imagePath(product.book_image)" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content pt-2">
                  <p class="is-5">{{ product.book_title }}</p>
                  <p class="has-text-grey-light is-6">
                    {{ product.book_type }}
                  </p>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      <!-- ราคาสินค้า------------------------------------------------ -->
                      <span class="is-6 has-text-danger">{{
                        product.book_price
                      }}</span>
                      <!-- จำนวนสินค้า----------------------------------------------- -->
                      <span>x 1 </span>
                    </div>
                    <div>
                      <!-- icon รูปถังขยะ------------------------------------------- -->
                      <span class="icon mr-2" key="false" @click="removeFromCart(product)">
                        <i class="far fa-trash-alt"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="
              display: flex;
              justify-content: space-between;
              font-size: 1.25rem;
            ">
            <span class="has-text-weight-bold has-text-white">Total</span>
            <span class="has-text-white" id="totalPrice">{{
              cart.length
            }}</span>
          </div>

          <!-- ปุ่ม Checkout ------------------------------------------------------------ -->
          <a class="button is-warning mt-3" style="width: 100%" @click="borrow(cart)">Borrow</a>
        </div>
      </div>
    </div>

    <div v-else-if="user.librarian_id && user.information_service_dept == 1" class="columns">
      <!-- Column แสดงสินค้า--------------------------------------------------------->
      <div class="column is-8 is-offset-2">
        <div class="columns mt-5">
          <div class="column is-8">
            <input class="input" type="text" v-model="search" placeholder="Search book" id="test" />
          </div>
          <div class="column is-2">
            <button @click="getBlogs()" class="button" style="width: auto">
              <span id="text-button">search</span>
              <span class="icon is-small">
                <i class="fa fa-search"></i>
              </span>
            </button>
          </div>

          <div class="column is-2">
            <button v-if="user.librarian_id &&
                check == false &&
                user.information_service_dept == 1
                " @click="retrunBook()" class="button">
              <span id="text-button">Return Book</span>
              <span class="icon is-small">
                <i class="fa fa-arrow-down"></i>
              </span>
            </button>
            <button v-else-if="user.librarian_id && check == true" @click="homeBook()" class="button">
              <span id="text-button">Home</span>
              <span class="icon is-small">
                <i class="fa fa-home"></i>
              </span>
            </button>
          </div>
        </div>

        <h1 class="is-size-4 mb-4 has-text-white mt-5">Top 4</h1>
        <h1 class="is-size-4 mb-4 has-text-white mt-5">
          All Products ({{ book.length }})
        </h1>
        <!-- เริ่ม box book -->
        <div class="columns is-multiline">
          <div class="column is-one-quarter" v-for="book1 in book" :key="book1.book_id">
            <div class="box" style="
                background-color: rgba(255, 255, 255, 0.8);
                border-style: solid;
                border-width: 0.5vw;
                border-color: rgba(61, 76, 83, 0.1);
                border-radius: 1vw;
              ">
              <figure class="image">
                <img style="height: 15vw" :src="imagePath(book1.book_image)" alt="Placeholder image" />
              </figure>
              <div class="content" style="padding-top: 1vw">
                <label class="labeld">
                  <p class="title is-4">{{ book1.book_title }}</p>
                </label>
                <br />
                <label class="labeld">
                  <p class="sub-title is-6">Type : {{ book1.book_type }}</p>
                </label>
                <div class="columns is-centered mt-2">
                  <div class="control is-centered">
                    <button type="button" class="button mr-1" v-if="user.librarian_id" @click="edit(book1)"
                      style="font-size: 12px">
                      <span id="text-button">EDIT</span>
                      <span class="icon is-small">
                        <i class="fa fa-pen"></i>
                      </span>
                    </button>
                    <button type="button" class="button mr-1" v-if="user.librarian_id && book1.book_status == 'borrowed'"
                      @click="returnbook(book1)" style="font-size: 12px">
                      <span id="text-button">RETURN</span>
                      <span class="icon is-small">
                        <i class="fa fa-caret-left"></i>
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

  </div>
</template>

<script>
import axios from "@/plugins/axios";
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      search: "",
      book: [],
      user: "",
      borrowed: [],
      retrun: [],
      check: false,
      cart: [],
      checklist: [],
      checkshow: 0,
      topbook: [],
      isModalActive: false,
      borrowdatereturn: [],
      borrowdatelinedatereturn: "",
      memberIDretuen: "",
      checklate: false,
    };
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    getBlogs() {
      if (this.check == false) {
        axios
          .get("http://localhost:3000", {
            params: {
              search: this.search,
            },
          })
          .then((response) => {
            function comparealpa(a, b) {
              if (a.book_title < b.book_title) {
                return -1;
              } else if (a.book_title > b.book_title) {
                return 1;
              } else {
                return 0;
              }
            }
            if (this.topbook.length == 0) {
              for (let i = 0; i < 4; i++) {
                this.topbook.push(response.data.rows1[i]);
              }
            }
            this.user = response.data.user;
            if (this.user.member_id == undefined) {
              this.book = response.data.rows;
              this.book = this.book.filter(
                (val) => val.book_status == "unborrow"
              );
              this.book.sort(comparealpa);
            } else {
              this.book = response.data.rows;
              this.book.sort(comparealpa);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.check == true) {
        axios
          .get("http://localhost:3000/returnList", {
            params: {
              search: this.search,
            },
          })
          .then((response) => {
            this.user = response.data.user;
            this.book = response.data.rows;
            this.book = this.book.filter(
              (val) => val.book_status == "borrowed"
            );
          })
        console.log("2")
          .catch((err) => {
            console.log(err);
          });
      }
    },
    imagePath(book_image) {
      if (book_image) {
        return "http://localhost:3000/" + book_image;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    addBook() {
      this.$router.push("/user/manage_book");
    },
    borrow(data) {
      // this.stock= data
      if (this.cart.length > 0) {
        const myJSON = JSON.stringify(data);
        localStorage.setItem("testJSON", myJSON);
        this.$router.push("/user/borrow");
      } else {
        this.$router.push("/home");
      }
    },
    edit(data) {
      console.log(data);
      const myJSON = JSON.stringify(data);
      localStorage.setItem("testJSON", myJSON);
      this.$router.push("/user/edit");
    },
    returnbook(book1) {
      this.isModalActive = true;
      const myJSON = JSON.stringify(book1);
      localStorage.setItem("testJSON", myJSON);
      let obj = JSON.parse(myJSON);
      const data = {
        bookid: obj.book_id,
        borrowdate: obj.con_borrow_date,
      }
      console.log(obj.book_id)
      axios
        .get("http://localhost:3000/returnbook")
        .then((res) => {
          this.borrowdatereturn = res.data.returndata.filter((val) => val.bi_book_id == data.bookid && val.borrow_status == 'borrowed')
          console.log(this.borrowdatereturn)
          let checktime = new Date().toISOString().slice(0, 10)
          if(this.borrowdatereturn[0].borrow_dateline_date.slice(0,10) >= checktime){
            this.checklate = true;
          }else{
            this.checklate = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    retrunBook() {
      this.check = !this.check;
      this.checkshow = 1;
      axios
        .get("http://localhost:3000", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.book = response.data.rows;
          this.user = response.data.user;
          this.book = this.book.filter((val) => val.book_status == "borrowed");
          function comparealpa1(a, b) {
            if (a.book_title < b.book_title) {
              return -1;
            } else if (a.book_title > b.book_title) {
              return 1;
            } else {
              return 0;
            }
          }
          this.book.sort(comparealpa1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    returnSubmit() {
      const data = {
        bookid: this.borrowdatereturn[0].bi_book_id,
        borrowid: this.borrowdatereturn[0].borrow_id,
        Itemon: this.borrowdatereturn[0].item_no,
      }
      console.log(data)
      axios
        .post("http://localhost:3000/return", data)
        .then((res) => {
          console.log("success")
          this.isModalActive = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    homeBook() {
      this.check = !this.check;
      this.checkshow = 0;
      this.getBlogs();
    },
    addToCart(product) {
      this.cart.push(product);
      product.book_quantity = 1;
      for (let i = 0; i < this.book.length; i++) {
        if (this.book[i].book_id === product.book_id) {
          this.book.splice(i, 1);
          this.checklist.push(product);
        }
      }
    },
    removeFromCart(product2) {
      let num = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].book_title === product2.book_title) {
          if (this.cart[i].book_quantity > 1) {
            this.cart[i].book_quantity -= 1;
          } else {
            this.cart.splice(i, 1);
            this.checklist.splice(i, 1);
          }
        }
      }
      this.book.push(product2);
    },

    clear() {
      this.cart = [];
      console.log(this.checklist);
      for (let i = 0; i < this.checklist.length; i++) {
        this.book.push(this.checklist[i]);
      }
      this.checklist = [];
    },
  },
};
</script>