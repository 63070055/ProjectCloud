<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.background-manage-book {
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
.control input, textarea{
  border-radius: .4vw;
  font-family: 'Kanit', sans-serif;
  background-color: transparent!important;
  font-size: .85vw;
  color: white;
}
#label-manage-book{
  color: white;
  letter-spacing: 1px;
}
#text-button{
  font-size: 1vw;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 1px;
  padding-top: .3vw;
}
</style>
<template>
  <div class="background-manage-book">
    <div class="columns">
    <div class="column is-8 is-offset-2">
      <div class="box" style="background-color: rgba(0, 0, 0, 0.5); border-style: solid; border-width: .5vw; border-color: rgba(61, 76, 83, 0.3); border-radius: 1vw; margin-top: 5vw;">
        <div class="columns is-centered">
          <label class="labeld">
            <p class="title is-1" style="color: white; letter-spacing: .1vw;">MANAGE BOOK</p>
          </label>
        </div>

        <div class="field mb-1">
          <div class="columns is-variable is-1">
            <div class="column">
              <label class="label" id="label-manage-book">Title</label>
              <div class="control">
                <input v-model="title" class="input" type="text" placeholder="Title" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Language</label>
              <div class="control">
                <input v-model="language" class="input" type="text" placeholder="Language" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Type</label>
              <div class="control">
                <input v-model="type" class="input" type="text" placeholder="Type" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">isbn</label>
              <div class="control">
                <input v-model="isbn" class="input" type="text" placeholder="isbn" />
              </div>
            </div>
          </div>
        </div>

        <div class="field mb-1">
          <div class="columns is-variable is-1">
            <div class="column">
              <label class="label" id="label-manage-book">Book_year</label>
              <div class="control">
                <input v-model="bookyear" class="input" type="text" placeholder="Book year" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Edition</label>
              <div class="control">
                <input v-model="edition" class="input" type="text" placeholder="Edition" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Accesnumber</label>
              <div class="control">
                <input v-model="accesnumber" class="input" type="text" placeholder="Accesnumber" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Publisher</label>
              <div class="control">
                <input v-model="publisher" class="input" type="text" placeholder="Publisher" />
              </div>
            </div>
          </div>
        </div>

        <div class="field mb-1">
          <div class="columns is-variable is-1">
            <div class="column">
              <label class="label" id="label-manage-book">Book_quantity</label>
              <div class="control">
                <input v-model="quantity" class="input" type="text" placeholder="Book quantity" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Price</label>
              <div class="control">
                <input v-model="price" class="input" type="text" placeholder="Price" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Status</label>
              <div class="control">
                <input v-model="status" class="input" type="text" placeholder="Status" />
              </div>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Barcode</label>
              <div class="control">
                <input v-model="barcode" class="input" type="text" placeholder="Barcode" />
              </div>
            </div>
          </div>
        </div>

        <div class="field mb-1 mb-5">
          <div class="columns is-variable is-1">
            <div class="column">
              <label class="label" id="label-manage-book">Image</label>
              <label class="file-label">
                <input
                  class="mb-5"
                  multiple
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  @change="selectImages"
                />
              </label>
            </div>

            <div class="column">
              <label class="label" id="label-manage-book">Create By</label>
              <div class="control">
                <input v-model="createby" class="input" type="text" placeholder="Lastname" />
              </div>
            </div>
          </div>
        </div>

        <div class="columns is-centered mb-2">
          <button @click="submitBlog()" class="button">
            <span id="text-button">ADD</span>
            <span class="icon is-small">
              <i class="fa fa-plus"></i>
            </span>

          </button>
        </div>
      </div>
    </div>
  </div></div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      images: [], // array of image
      title: "",
      language: "",
      type: "",
      isbn: "",
      bookyear: "",
      edition: "",
      accesnumber: "",
      publisher:"",
      quantity:"",
      price:"",
      status:"",
      barcode:"",
      createby:"",
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitBlog() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("language", this.language);
      formData.append("type", this.type);
      formData.append("isbn", this.isbn);
      formData.append("bookyear", this.bookyear);
      formData.append("edition", this.edition);
      formData.append("accesnumber", this.accesnumber);
      formData.append("publisher", this.publisher);
      formData.append("quantity", this.quantity);
      formData.append("price", this.price);
      formData.append("status", this.status);
      formData.append("barcode", this.barcode);
      formData.append("createby", this.createby);
      this.images.forEach((image) => {
        formData.append("myImage", image);
      });
      console.log(formData);

    //   // Note ***************
    //   // ตอนเรายิง Postmant จะใช้ fromData
    //   // ตอนยิงหลาย ๆ รูปพร้อมกันใน Postman จะเป็นแบบนี้

    //   // title   | "This is a title of blog"
    //   // comment | "comment in blog"
    //   // ...
    //   // myImage | [select file 1]
    //   // myImage | [select file 2]
    //   // myImage | [select file 3]

    //   // จะสังเกตุว่าใช้ myImage เป็น key เดียวกัน เลยต้องเอามา loop forEach
    //   // พอไปฝั่ง backend มันจะจัด file ให้เป็น Array เพื่อเอาไปใช้งานต่อได้

      axios
        .post("http://localhost:3000/addBook", formData)
        .then((res) => this.$router.push("/home"))
        .catch((e) => console.log(e.response.data));
    },
  },
};
</script>

<style>
</style>