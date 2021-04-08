<template>
  <div>
    <h1>Welcome to the RPG Character Creator!</h1>
    <h2>Create a character for your next campaign!</h2>
    <form @submit.prevent="addCharacter">
      <input type="text" v-model="characterName" placeholder="Name" />
      <br />
      <input type="text" v-model="characterClass" placeholder="Class" />
      <br />
      <input type="text" v-model="characterRace" placeholder="Race" />
      <br />
      <br />
      <button type="submit">Create Character</button>
    </form>
    <br />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Tavern",
  data() {
    return {
      characterName: '',
      characterClass: '',
      characterRace: '',
    };
  },
  computed: {},
  methods: {
      async addCharacter() {
      try {
        await axios.post("/api/characters", {
          name: this.characterName,
          class: this.characterClass,
          race: this.characterRace,
        });
        this.characterName = "";
        this.characterClass = "";
        this.characterRace = "";
        this.$alert("Your character has been created!\nNow create some quests for them!");
      } catch (error) {
        // console.log(error);
      }
    },
  }
};
</script>

<style scoped>
button {
  font-size: 1em;
  border: none;
  background-color: white;
  color:#1c03ac;
  padding: 5px 10px;
}
</style>