<template>
<div>
  <Admin v-if="user && user.role === 'admin'" />
  <HomePage v-else-if="user" />
  <Login v-else />
</div>
</template>

<script>
import HomePage from '@/components/HomePage.vue'
import Login from '@/components/Login.vue'
import Admin from '@/components/Admin.vue'
export default {
  name: 'Home',
  components: {
    HomePage,
    Login,
    Admin,
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>