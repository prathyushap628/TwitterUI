<template>

<div>
<div>
     <b-navbar toggleable="sm" type="light" variant="light">
       <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

       <b-navbar-brand>TWITTER</b-navbar-brand>
  
    <b-navbar-nav class="ml-auto">
        <b-nav-form>

          <b-button size="sm" class="my-2 my-sm-0" v-on:click="moveToRegister">Register</b-button>
        </b-nav-form>
        </b-navbar-nav>
         </b-navbar>
</div>

  <h2> Login </h2>
 <div class="login-form">
    <b-form @submit.prevent="login">
      <b-form-group id="input-group-1" label="Email" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="email"
          type="text"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
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
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      //   form: {
      //     username: '',
      //     password: '',
      //   },
    }
  },

  methods: {
    async login() {
      console.log()
      await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })
      // calling here. see?
      await this.$store.dispatch('GetAllTweets')
      
    },

     moveToRegister()
    {
      console.log(" in here to move to register");
      this.$store.dispatch('setIsRegister', true);
    },
  },
   
}
</script>

<style lang="scss" scoped>

</style>