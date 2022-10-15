<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Teko&display=swap');
.background-regmember {
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
.control input, textarea{
 border-radius: .4vw;
 font-family: 'Teko', sans-serif;
 background-color: transparent!important;
 font-size: .85vw;
}
label{
  color: rgb(32, 26, 107);
}
::placeholder {
  color: rgb(0, 0, 0);
}

.input::placeholder {
  opacity: 1;
}
#text-button{
  font-size: 1vw;
  font-family: "Bebas Neue", cursive;
  letter-spacing: 2px;
  padding-top: .3vw;
}
</style>
<template>
<div class="background-regmember">
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <div class="box" style="background-color: rgba(0, 0, 0, 0.5); border-style: solid; border-width: .5vw; border-color: rgba(61, 76, 83, 0.3); border-radius: 1vw; margin-top: 5vw;">
        <div class="columns is-centered">
          <label class="labeld">
            <p class="title is-1" style="color: white; letter-spacing: .1vw;">REGISTER FOR MEMBER</p>
          </label>
        </div>
        <div class="field mb-1">
          <div class="columns is-variable is-1;">
            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">Username</label>
              <div class="control">
                <input
                  v-model="$v.username.$model"
                  :class="{ 'is-danger': $v.username.$error }"
                  class="input"
                  placeholder="Username"
                  style="background-color: transparent!important; color: white;"
                />

              </div>
              <template v-if="$v.username.$error">
                <p class="help is-danger" v-if="!$v.username.required">
                  This Username is required
                </p>
                <p class="help is-danger" v-else-if="!$v.username.minLength">
                  Must be at least 5 characters
                </p>
                <p class="help is-danger" v-else-if="!$v.username.maxLength">
                  no more than 20 characters
                </p>
              </template>
            </div>

            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">Password</label>
              <div class="control">
                <input
                  v-model="$v.password.$model"
                  :class="{ 'is-danger': $v.password.$error }"
                  class="input"
                  type="password"
                  placeholder="Password"
                  style="background-color: transparent!important; color: white;"
                />
              </div>
              <template v-if="$v.password.$error">
                <p class="help is-danger" v-if="!$v.password.required">
                  This Password is required
                </p>
                <p class="help is-danger" v-else-if="!$v.password.minLength">
                  Must be at least 8 character
                </p>
                <p class="help is-danger" v-else-if="!$v.password.complex">
                  Password too easy
                </p>
              </template>
            </div>
            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">Confirm Password</label>
              <div class="control">
                <input
                  v-model="$v.confirm_password.$model"
                  :class="{ 'is-danger': $v.confirm_password.$error }"
                  class="input"
                  type="password"
                  placeholder="Confirm Password"
                  style="background-color: transparent!important; color: white;"
                />
              </div>
              <template v-if="$v.confirm_password.$error">
                <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
                  Password not match
                </p>
                <p class="help is-danger" v-else-if="!$v.confirm_password.required">
                  This Confirm Password is required
                </p>
              </template>
            </div>
          </div>
        </div>

        <div class="field mb-1">
          <div class="columns is-1">
            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">First name</label>
              <div class="control">
                <input
                  v-model="$v.first_name.$model"
                  :class="{ 'is-danger': $v.first_name.$error }"
                  class="input"
                  type="text"
                  placeholder="First name"
                  style="background-color: transparent!important; color: white;"
                />
              </div>
              <template v-if="$v.first_name.$error">
                <p class="help is-danger" v-if="!$v.first_name.required">
                  This First name is required
                </p>
              </template>
            </div>
            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">Last name</label>
              <div class="control">
                <input
                  v-model="$v.last_name.$model"
                  :class="{ 'is-danger': $v.last_name.$error }"
                  class="input"
                  type="text"
                  placeholder="Last name"
                  style="background-color: transparent!important; color: white;"
                />
              </div>
              <template v-if="$v.last_name.$error">
                <p class="help is-danger" v-if="!$v.last_name.required">
                  This Last name is required
                </p>
              </template>
            </div>
            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">email</label>
              <div class="control">
                <input
                  v-model="$v.email.$model"
                  :class="{ 'is-danger': $v.email.$error }"
                  class="input"
                  type="text"
                  placeholder="email"
                  style="background-color: transparent!important; color: white;"
                />
              </div>
              <template v-if="$v.email.$error">
                <p class="help is-danger" v-if="!$v.email.required">
                  This email is required
                </p>
                <p class="help is-danger" v-if="!$v.email.email">
                  Invalid Email
                </p>
              </template>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label" style="color: white; letter-spacing: 1px;">Address</label>
                <div class="control">
                  <textarea
                    v-model="$v.address.$model"
                    class="textarea"
                    :class="{ 'is-danger': $v.address.$error }"
                    placeholder="Address"
                    style="background-color: transparent!important; color: white;"
                  ></textarea>
                </div>
              </div>
              <template v-if="$v.address.$error">
                <p class="help is-danger" v-if="!$v.address.required">
                  This Address is required
                </p>
                <p class="help is-danger" v-else-if="!$v.address.maxLength">
                  no more than 255 characters
                </p>
              </template>
            </div>
          </div>
        </div>

        <div class="field mb-5">
          <div class="columns is-1">
            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">Mobile</label>
              <div class="control">
                <input
                  v-model="$v.mobile.$model"
                  :class="{ 'is-danger': $v.mobile.$error }"
                  class="input"
                  type="text"
                  placeholder="Mobile"
                  style="background-color: transparent!important; color: white;"
                />
              </div>
              <template v-if="$v.mobile.$error">
                <p class="help is-danger" v-if="!$v.mobile.required">
                  This Mobile is required
                </p>
                <p class="help is-danger" v-if="!$v.mobile.mobile">
                  Invalid Mobile Number
                </p>
              </template>
            </div>

            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">Faculty</label>
              <div class="control">
                <input
                  v-model="$v.Faculty.$model"
                  :class="{ 'is-danger': $v.Faculty.$error }"
                  class="input"
                  type="text"
                  placeholder="Faculty"
                  style="background-color: transparent!important; color: white;"
                />
              </div>
              <template v-if="$v.Faculty.$error">
                <p class="help is-danger" v-if="!$v.Faculty.required">
                  This Faculty is required
                </p>
              </template>
            </div>

            <div class="column">
              <label class="label" style="color: white; letter-spacing: 1px;">Major</label>
              <div class="control">
                <input
                  v-model="$v.Major.$model"
                  :class="{ 'is-danger': $v.Major.$error }"
                  class="input"
                  type="text"
                  placeholder="Major"
                  style="background-color: transparent!important; color: white;"
                />
              </div>
              <template v-if="$v.Major.$error">
                <p class="help is-danger" v-if="!$v.Major.required">
                  This Major is required
                </p>
              </template>
            </div>
          </div>
        </div>

        <div class="columns is-centered mb-2">
          <div class="control is-centered">
            <button @click="signup()" class="button">
              <span id="text-button">SING UP</span>
              <span class="icon is-small">
                <i class="fa fa-user-plus"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div></div>
</template>
<script>
import axios from "@/plugins/axios";
import {
  required,
  email,
  helpers,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

function mobile(value) {
  return !helpers.req(value) || !!value.match(/0[0-9]{9}/);
}

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      mobile: "",
      first_name: "",
      last_name: "",
      Faculty: "",
      Major: "",
      address: "",
    };
  },
  methods: {
    signup() {
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          confirm_password: this.confirm_password,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          mobile: this.mobile,
          Faculty: this.Faculty.toUpperCase(),
          Major: this.Major,
          address: this.address,
        };

        axios
          .post("http://localhost:3000/user/signup", data)
          .then((res) => {
            this.$router.push("/user/login");
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },
  },
  validations: {
    email: {
      required: required,
      email: email,
    },
    mobile: {
      required: required,
      mobile: mobile,
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("password"),
      required: required,
    },
    username: {
      required: required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    first_name: {
      required: required,
    },
    last_name: {
      required: required,
    },
    address: {
      required,
      maxLength: maxLength(255),
    },
    Faculty: {
      required,
    },
    Major: {
      required,
    },
  },
};
</script>


