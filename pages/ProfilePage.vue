<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand v-on:click="moveToHomePage">TWITTER</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              v-on:click="moveToCreatePost"
              >Create Post</b-button
            >
          </b-nav-form>

          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                v-on:click="moveToProfile"
                >Profile</b-button
              >
              <b-button size="sm" class="my-2 my-sm-0" v-on:click="moveToLogin"
                >Logout</b-button
              >
            </b-nav-form>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <h5>Full Name : {{ name }}</h5>
    <h5>Email : {{ email }}</h5>

    <div class="form-group">
      <label for="exampleFormControlTextarea1">Update your name here</label>
      <textarea
        v-model="newName"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary" v-on:click="updateProfile">
      Update Profile
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['email', 'name']),
  },

  methods: {
    moveToLogin() {
      this.$router.push('/')
    },
    moveToHomePage() {
      this.$router.push('/HomePage')
    },

    moveToProfile() {
      this.$router.push('/ProfilePage')
    },

    moveToCreatePost() {
      this.$router.push('/CreatePost')
    },

    async updateProfile() {
      await this.$store.dispatch('updateProfile', {
        name: this.newName,
      })
      this.newName = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
