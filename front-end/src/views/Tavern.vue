<template>
  <div>
    <div v-if="user && user.role === 'admin'">
      <h1>Welcome to the RPG Character Creator!</h1>
      <h2>Create a character for your next campaign!</h2>
      <form @submit.prevent="addCharacter">
        <input type="text" v-model="characterName" placeholder="Name" />
        <br />
        <input type="text" v-model="characterClass" placeholder="Class" />
        <br />
        <input type="text" v-model="characterRace" placeholder="Race" />
        <div>
          <input v-model="findUsername" placeholder="Search" />
          <div class="suggestions" v-if="suggestions.length > 0">
            <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectUser(s)">
              {{ s.username }}
            </div>
          </div>
        </div>

        <br />
        <br />
        <button type="submit">Create Character</button>
      </form>
      <br />
    </div>
    <div v-else>
      <h3>You have been logged out.</h3>
      <router-link to="/">Return to login screen</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Tavern",
  data() {
    return {
      characterName: "",
      characterClass: "",
      characterRace: "",
      users: [],
      findUsername: "",
      findUser: null,
    };
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    this.getUsers();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    suggestions() {
      let users = this.users.filter((user) =>
        user.username.toLowerCase().startsWith(this.findUsername.toLowerCase())
      );
      return users.sort((a, b) => a.username > b.username);
    },
  },
  methods: {
    async addCharacter() {
      try {
        await axios.post("/api/characters", {
          name: this.characterName,
          class: this.characterClass,
          race: this.characterRace,
          user: this.findUser,
        });
        this.characterName = "";
        this.characterClass = "";
        this.characterRace = "";
        this.findUser = null;
        this.$alert(
          "The character has been created!"
        );
      } catch (error) {
        // console.log(error);
      }
    },
    async getUsers() {
      try {
        let users = await axios.get("api/users/users");
        this.users = users.data;
      } catch (error) {
        // console.log(error);
      }
    },
    selectUser(user) {
      this.findUsername = "";
      this.findUser = user;
    },
  },
};
</script>

<style scoped>
button {
  font-size: 1em;
  border: none;
  background-color: white;
  color: #1c03ac;
  padding: 5px 10px;
}
</style>