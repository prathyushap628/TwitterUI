<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">TWITTER</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Create Post</b-button
            >
          </b-nav-form>

          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
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

    <h2>Create Post</h2>

    <div class="form-group">
      <label for="exampleFormControlTextarea1">Title</label>
      <textarea
        v-model="title"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary" v-on:click="createNewPost">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    moveToLogin() {
      this.$router.push('/')
    },

    async createNewPost() {
      let newTweet = { title: this.title }

      await this.$store.dispatch('createTweet', newTweet)
    },
  },
}
</script>

<style lang="scss" scoped></style>
