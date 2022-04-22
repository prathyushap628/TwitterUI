<template>
  <div>
    <div>
      <b-navbar toggleable="sm" type="primary" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>TWITTER</b-navbar-brand>
      </b-navbar>
      <input v-model="newTweetText" v-if="isUpdating" type="text" />
      <p v-else>{{ current_tweet.title }}</p>
      <div class="parent">
        <div class="tweet-item">
          <div
            class="btns"
            v-if="current_tweet.user_id == $store.state.user_id"
          >
            <b-button
              v-if="!isUpdating"
              pill
              size="sm"
              v-on:click="updateTweet"
              variant="warning"
              >Update</b-button
            >
            <b-button
              @click="deleteTweet"
              v-if="!isUpdating"
              class="btn"
              pill
              size="sm"
              variant="danger"
              >Delete</b-button
            >
            <b-button
              v-else
              pill
              size="sm"
              @click="submitTweet"
              variant="success"
              >Submit</b-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="exampleFormControlTextarea1">Comment here</label>
      <textarea
        class="form-control"
        v-model="newComment"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary" v-on:click="createComment">
      Add Comment
    </button>
    <div>
      <b-collapse visible id="collapse-3">
        <b-card
          class="delete-button"
          v-for="comment in current_comments"
          :key="comment.id"
          ><p>{{ comment.text }}</p>
          <b-button
            v-if="comment.user_id == $store.state.user_id"
            @click="deleteComment(comment.comment_id)"
            class="btn3"
            pill
            size="sm"
            variant="danger"
            >Delete</b-button
          >
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['current_comments', 'current_tweet']),
  },
  data() {
    return {
      isUpdating: false,
      newTweetText: '',
    }
  },
  methods: {
    async deleteTweet() {
      await this.$store.dispatch('deleteTweet', this.$route.params.id)
    },
    async deleteComment(comment_id) {
      await this.$store.dispatch('deleteComment', comment_id)
    },

    async createComment() {
      console.log(' in here to create a comment')
      await this.$store.dispatch('createComment', {
        text: this.newComment,
        tweetId: this.$route.params.id,
      })
      // calling here. see?
      await this.$store.dispatch('GetAllTweets')
    },
    updateTweet() {
      this.isUpdating = true
      this.newTweetText = this.current_tweet.title
    },

    async submitTweet() {
      this.isUpdating = false
      let res = await this.$store.dispatch('updateTweet', {
        tweet_id: this.current_tweet.tweet_id,
        title: this.newTweetText,
      })

      if (res == true) {
        // this.current_tweet.title = this.newTweetText
      }
    },
  },
  mounted() {
    this.$store.dispatch('loadTweet', this.$route.params.id)
  },
}
</script>

<style lang="scss" scoped>
.parent {
  width: 100%;
  display: inline-block;
}

.tweet-item {
  text-align: center;
  float: left;
  position: relative;
  width: 150%;
  margin-left: 5%;
  margin-bottom: 5%;
  display: inline-block;
}
.delete-button {
  width: 100%;
  display: inline-block;
}
.btn3 {
  text-align: center;
  float: left;
  position: relative;
  width: 10%;
  left: 80%;
  // bottom: 20%;
  //margin-left: 5%;
  //margin-bottom: 5%;
  //display: inline-block;
}
</style>
