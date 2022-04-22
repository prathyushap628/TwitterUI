const state = () => ({
    token: null,
    user_id: null,
    email: null,
    name: null,

    // boolean to show login/register form.
    is_register: false,
    // list of all tweets
    tweets: [],
    //currently viewing tweet
    current_tweet: null,
    //currently viewing tweet's comments
    current_comments: [],
})

const getters = {}

const mutations = {
    setToken(state, data) {
        state.token = data.token
        state.user_id = data.user_id
        state.email = data.email
        state.name = data.user_name
    },

    setName(state, data) {
        state.name = data;
        alert(" Updated name successfully")
    },

    setIsRegister(state, value) {
        state.is_register = value;
    },

    setList(state, data) {
        state.tweets = data
    },

    createdNewTweet(state, data) {
        state.tweets.unshift(data)
        this.$router.push('/HomePage')
    },

    setComments(state, data) {
        console.log("comments" + data)
        state.current_comments = data
        console.log("aftr set" + state.current_comments)
    },

    setCurrentTweet(state, data) {
        state.current_tweet = data
    },

    createdNewComment(state, data) {
        state.current_comments.unshift(data)
    },

    deleteTweet(state, id) {
        state.tweets = state.tweets.filter(function (item) {
            console.log(" to check : " + item.tweet_id + "  with " + id);
            return item.tweet_id != id
        });
    },
    deleteComment(state, id) {
        state.current_comments = state.current_comments.filter(function (item) {
            console.log(" to check : " + item.comment_id + "  with " + id);
            return item.comment_id != id
        });
    },

    updateTweet(state, data) {
        const index = state.tweets.findIndex(tweet => tweet.tweet_id === data.tweet_id)
        console.log(" required index is : " + index);
        console.log(" tweet in index " + index + " is " + state.tweets[index]);
        state.tweets[index].title = data.title
        state.current_tweet.title = data.title
    }
}

const actions = {

    async setIsRegister(state, value) {
        this.commit('setIsRegister', value)
    },

    async registerUser(state, data) {
        try {
            console.log("data:" + data);
            // Hit the backend api.
            const res = await this.$axios.post('users/registration/', {
                name: data.name,
                email: data.email,
                password: data.password,
            })

            if (res.status == 200) {
                console.log(res)

                alert("Registration successful, please login to continue");

                this.commit('setIsRegister', false);

            } else {
                alert('Registration failed, please check details')
            }
        } catch (e) {
            console.log(' error while registering user : ' + e)
            alert(' cannot register right now, please try again later')
        }
    },

    async login(state, data) {
        try {
            //console.log("data:" + data.username);
            // Hit the backend api.
            const res = await this.$axios.post('users/login/', {
                email: data.email,
                password: data.password,
            })

            if (res.status == 200) {
                console.log(res)

                // Set the token after the call is success.
                this.commit('setToken', res.data)
                this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
                // move to the homepage from login page.
                this.$router.push('/HomePage')

            } else {
                alert('Invalid username or password')
            }
        } catch (e) {
            console.log(' error while logging in: ' + e)
            alert(' cannot login right now, please try again later')
        }
    },

    async GetAllTweets({ commit, state }) {
        const res = await this.$axios.get('tweet')
        console.log(res.data)
        commit('setList', res.data)
    },

    async createTweet({ commit, state }, data) {
        const res = await this.$axios.post('tweet', data)
        commit('createdNewTweet', res.data)
    },

    async updateProfile(state, data) {
        try {
            // Hit the backend api.
            const res = await this.$axios.put('users/update/', data)

            if (res.status == 204) {
                console.log(res)

                // Set the name after the call is success.
                this.commit('setName', data.name)


            } else {
                alert('Cannot update profile')
            }
        } catch (e) {
            console.log(' error while updating profile : ' + e)
            alert(' Cannot update profile right now, please try again later')
        }
    },

    async loadTweet({ commit, state }, id) {
        const res = await this.$axios.get('tweet/' + id)
        console.log(res.data)
        commit('setCurrentTweet', res.data)
    },

    async GetAllCommentsForTweet({ commit, state }, id) {
        // console.log("store called" + $id);

        const res = await this.$axios.get('comment/' + id)
        console.log(res.data)
        commit('setComments', res.data)

    },

    async createComment({ commit, state }, data) {
        const res = await this.$axios.post('comment', data)
        commit('createdNewComment', res.data)
    },

    async deleteTweet({ commit }, id) {
        try {
            var res = await this.$axios.delete('tweet/' + id)
            if (res.status == 204) {

                commit('deleteTweet', id)
                this.$router.push('/HomePage')
            } else {
                alert(" Cannot delete this tweet right now, sorry!")
            }
        } catch (e) {
            if (e.response.status == 403) {
                alert(" You cannot delete others' tweet")
            } else {

                alert(" Prathyusha did not code the backend correctly !!!!  " + e.response.status)
            }

        }

    },
    async deleteComment({ commit }, id) {
        try {
            var res = await this.$axios.delete('comment/' + id)
            if (res.status == 204) {

                commit('deleteComment', id)

            } else {
                alert(" Cannot delete this comment right now, sorry!")
            }
        } catch (e) {
            if (e.response.status == 403) {
                alert(" You cannot delete others' comment")
            } else {

                alert(" Prathyusha did not code the backend correctly !!!!  " + e.response.status)
            }

        }

    },
    async addTweet({ commit }, data) {
        await this.$axios.post('tweet', {
            title: data,
        })
    },
    async updateTweet({ commit }, data) {
        console.log("data is not found" + data.tweet_id)
        var res = await this.$axios
            .put(
                'tweet/' + data.tweet_id,
                { title: data.title },

            );


        if (res.status == 200 || res.status == 204) {
            console.log(res)
            console.log('called')
            commit("updateTweet", data)
            return true;
        } else {
            return false;
        }


    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
