<template>
<div>
  <Admin v-if="user && user.role === 'admin'" />
  <HomePage v-else-if="user"/>
  <!-- <HomePage v-if="user" /> -->
  <Login v-else />
</div>
</template>

<script>
import HomePage from '@/components/HomePage.vue'
import Login from '@/components/Login.vue'
import Admin from '@/components/Admin.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    HomePage,
    Login,
    Admin,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>