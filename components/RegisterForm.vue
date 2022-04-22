<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>TWITTER</b-navbar-brand>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button size="sm" class="my-2 my-sm-0" v-on:click="moveToLogin"
              >Login</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <h2>RegisterForm</h2>
    <div class="register-form">
      <b-form @submit.prevent="register">
        <b-form-group id="input-group-1" label="Name" label-for="input-1">
          <b-form-input
            type="text"
            id="input-1"
            v-model="name"
            placeholder="Enter Name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Email" label-for="input-2">
          <b-form-input
            id="input-1"
            v-model="email"
            type="text"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password" label-for="input-3">
          <b-form-input
            type="password"
            id="input-3"
            v-model="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      //   form: {
      //     username: '',
      //     password: '',
      //   },
    }
  },

  methods: {
    async register() {
      await this.$store.dispatch('registerUser', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
    },

    moveToLogin() {
      this.$store.dispatch('setIsRegister', false)
    },
  },
}
</script>

<style lang="scss" scoped></style>
