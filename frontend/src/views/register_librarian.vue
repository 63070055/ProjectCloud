<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap");
.background-reglibrarian {
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
.control input,
textarea {
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
#label-reg-librarian {
  color: white;
  letter-spacing: 1px;
}
</style>
<template>
  <div class="background-reglibrarian">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div class="container is-widescreen">
          <div
            class="box"
            style="
              background-color: rgba(0, 0, 0, 0.5);
              border-style: solid;
              border-width: 0.5vw;
              border-color: rgba(61, 76, 83, 0.3);
              border-radius: 1vw;
              margin-top: 5vw;
            "
          >
            <div class="columns is-centered">
              <label class="labeld">
                <p
                  class="title is-1"
                  style="color: white; letter-spacing: 0.1vw"
                >
                  REGISTER FOR LIBRARIAN
                </p>
              </label>
            </div>

            <div class="field mb-1">
              <div class="columns is-variable is-1">
                <div class="column">
                  <label class="label" id="label-reg-librarian">Username</label>
                  <div class="control">
                    <input
                      v-model="$v.username.$model"
                      :class="{ 'is-danger': $v.username.$error }"
                      class="input"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <template v-if="$v.username.$error">
                    <p class="help is-danger" v-if="!$v.username.required">
                      This Username is required
                    </p>
                    <p
                      class="help is-danger"
                      v-else-if="!$v.username.minLength"
                    >
                      Must be at least 5 characters
                    </p>
                    <p
                      class="help is-danger"
                      v-else-if="!$v.username.maxLength"
                    >
                      no more than 20 characters
                    </p>
                  </template>
                </div>

                <div class="column">
                  <label class="label" id="label-reg-librarian">Password</label>
                  <div class="control">
                    <input
                      v-model="$v.password.$model"
                      :class="{ 'is-danger': $v.password.$error }"
                      class="input"
                      type="text"
                      placeholder="Password"
                    />
                  </div>
                  <template v-if="$v.password.$error">
                    <p class="help is-danger" v-if="!$v.password.required">
                      This Password is required
                    </p>
                    <p
                      class="help is-danger"
                      v-else-if="!$v.password.minLength"
                    >
                      Must be at least 8 character
                    </p>
                    <p class="help is-danger" v-else-if="!$v.password.complex">
                      Password too easy
                    </p>
                  </template>
                </div>
                <div class="column">
                  <label class="label" id="label-reg-librarian"
                    >Confirm Password</label
                  >
                  <div class="control">
                    <input
                      v-model="$v.confirm_password.$model"
                      :class="{ 'is-danger': $v.confirm_password.$error }"
                      class="input"
                      type="text"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <template v-if="$v.confirm_password.$error">
                    <p
                      class="help is-danger"
                      v-if="!$v.confirm_password.sameAs"
                    >
                      Password not match
                    </p>
                    <p
                      class="help is-danger"
                      v-else-if="!$v.confirm_password.required"
                    >
                      This Confirm Password is required
                    </p>
                  </template>
                </div>
              </div>
            </div>

            <div class="field mb-1">
              <div class="columns is-variable is-1">
                <div class="column">
                  <label class="label" id="label-reg-librarian"
                    >First name</label
                  >
                  <div class="control">
                    <input
                      v-model="$v.first_name.$model"
                      :class="{ 'is-danger': $v.first_name.$error }"
                      class="input"
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                  <template v-if="$v.first_name.$error">
                    <p class="help is-danger" v-if="!$v.first_name.required">
                      This First name is required
                    </p>
                  </template>
                </div>
                <div class="column">
                  <label class="label" id="label-reg-librarian"
                    >Last name</label
                  >
                  <div class="control">
                    <input
                      v-model="$v.last_name.$model"
                      :class="{ 'is-danger': $v.last_name.$error }"
                      class="input"
                      type="text"
                      placeholder="Last name"
                    />
                  </div>
                  <template v-if="$v.last_name.$error">
                    <p class="help is-danger" v-if="!$v.last_name.required">
                      This Last name is required
                    </p>
                  </template>
                </div>
                <div class="column">
                  <label class="label" id="label-reg-librarian">email</label>
                  <div class="control">
                    <input
                      v-model="$v.email.$model"
                      :class="{ 'is-danger': $v.email.$error }"
                      class="input"
                      type="text"
                      placeholder="email"
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
              <div class="columns is-variable is-1">
                <div class="column">
                  <label class="label" id="label-reg-librarian"
                    >Job Position</label
                  >
                  <div class="control is-expanded mb-3 mt-4">
                    <label class="radio is-size-6" style="color: white">
                      <input
                        v-model="$v.JobPosition.$model"
                        :class="{ 'is-danger': $v.JobPosition.$error }"
                        type="radio"
                        name="answer"
                        value="c1"
                        style="color: white"
                      />
                      cataloging
                    </label>
                    <label class="radio is-size-6 pl-2" style="color: white">
                      <input
                        v-model="$v.JobPosition.$model"
                        :class="{ 'is-danger': $v.JobPosition.$error }"
                        type="radio"
                        name="answer"
                        value="h1"
                        style="color: white"
                      />
                      information_service
                    </label>
                    <template v-if="$v.JobPosition.$error">
                      <p class="help is-danger" v-if="!$v.JobPosition.required">
                        This JobPosition is required
                      </p>
                    </template>

                    <!-- </label> -->
                  </div>

                  <label class="label" id="label-reg-librarian">Mobile</label>
                  <div class="control is-expanded">
                    <input
                      v-model="$v.mobile.$model"
                      :class="{ 'is-danger': $v.mobile.$error }"
                      class="input"
                      type="text"
                      placeholder="Mobile"
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
                  <div class="field">
                    <label class="label" id="label-reg-librarian"
                      >Address</label
                    >
                    <div class="control">
                      <textarea
                        v-model="$v.address.$model"
                        :class="{ 'is-danger': $v.address.$error }"
                        class="textarea"
                        placeholder="Address"
                        style="color: white"
                      ></textarea>
                    </div>
                    <template v-if="$v.address.$error">
                      <p class="help is-danger" v-if="!$v.address.required">
                        This Address is required
                      </p>
                      <p
                        class="help is-danger"
                        v-else-if="!$v.address.maxLength"
                      >
                        no more than 255 characters
                      </p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <div class="field mb-5">
              <div class="columns is-variable is-1">
                <div class="column">
                  <label class="label" id="label-reg-librarian">Faculty</label>
                  <div class="control">
                    <input
                      v-model="$v.Faculty.$model"
                      :class="{ 'is-danger': $v.Faculty.$error }"
                      class="input"
                      type="text"
                      placeholder="Faculty"
                    />
                  </div>
                  <template v-if="$v.Faculty.$error">
                    <p class="help is-danger" v-if="!$v.Faculty.required">
                      This Faculty is required
                    </p>
                  </template>
                </div>
                <div class="column">
                  <label class="label" id="label-reg-librarian"
                    >Department</label
                  >
                  <div class="control">
                    <input
                      v-model="$v.Deparment.$model"
                      :class="{ 'is-danger': $v.Deparment.$error }"
                      class="input"
                      type="text"
                      placeholder="Department"
                    />
                  </div>
                  <template v-if="$v.Deparment.$error">
                    <p class="help is-danger" v-if="!$v.Deparment.required">
                      This Deparment is required
                    </p>
                  </template>
                </div>

                <div class="column">
                  <label class="label" id="label-reg-librarian">Function</label>
                  <div class="control">
                    <input
                      v-model="$v.Function.$model"
                      :class="{ 'is-danger': $v.Function.$error }"
                      class="input"
                      type="text"
                      placeholder="Function"
                    />
                  </div>
                  <template v-if="$v.Function.$error">
                    <p class="help is-danger" v-if="!$v.Function.required">
                      This Function is required
                    </p>
                  </template>
                </div>
              </div>
            </div>

            <div class="columns is-centered mb-2">
              <div class="control is-centered">
                <button @click="submit()" class="button">
                  <span id="text-button">SING UP</span>
                  <span class="icon is-small">
                    <i class="fa fa-user-plus"></i>
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

// <script>
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
      first_name: "",
      last_name: "",
      email: "",
      JobPosition: "",
      address: "",
      mobile: "",
      Faculty: "",
      Deparment: "",
      Function: "",
    };
  },
  methods: {
    submit() {
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
          JobPosition: this.JobPosition,
          address: this.address,
          Faculty: this.Faculty.toUpperCase(),
          Deparment: this.Deparment.toUpperCase(),
          Function: this.Function,
        };
        console.log(data)
        axios
          .post("http://localhost:3000/user/signuplibrarian", data)
          .then((res) => {
            this.$router.push("/home");
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
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      required: required,
      sameAs: sameAs("password"),
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
    JobPosition: {
      required: required,
    },
    address: {
      required: required,
      maxLength: maxLength(255),
    },
    mobile: {
      required: required,
      mobile: mobile,
    },
    Faculty: {
      required: required,
    },
    Deparment: {
      required: required,
    },
    Function: {
      required: required,
    },
  },
};
</script>