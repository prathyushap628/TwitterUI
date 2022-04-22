<template>
  <div>
    <div v-show="is_register == false">
      <LoginForm />
    </div>

    <div v-show="is_register == true">
      <RegisterForm />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'IndexPage',
  components: {
    LoginForm,
    RegisterForm,
  },

  computed: {
    ...mapState(['token', 'is_register']),
  },
}
</script>
