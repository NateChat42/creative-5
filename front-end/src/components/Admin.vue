<template>
  <div>
    <h1 class="header" v-show="characters.length === 0">
      You have no characters! Try making some.
    </h1>
    <div id="characters">
      <button
        :class="{ selected: active(character) }"
        v-for="character in characters"
        :key="character.id"
        @click="selectCharacter(character)"
      >
        {{ character.name }}
      </button>
    </div>
    <div class="form" v-if="character"> 
      <h4>Character belongs to User: {{this.characterUsername}}</h4>
      <h4>Name:</h4>
      <input v-model="characterName" />
      <p></p>
      <h4>Class:</h4>
      <input v-model="characterClass" />
      <p></p>
      <h4>Race:</h4>
      <input v-model="characterRace" />
      <p></p>
      <div class="buttons">
        <button v-if="character" @click="editCharacter(character)">
          Edit Character
        </button>
        <button v-if="character" @click="deleteCharacter(character)">
          Delete Character
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Admin",
  data() {
    return {
      characters: [],
      character: null,
      characterName: "",
      characterRace: "",
      characterClass: "",
      characterUsername: "",
      color: "#0F0",
      quests: [],
      title: "",
      description: "",
      reward: "",
      show: "all",
    };
  },
  created() {
    this.getCharacters();
  },
  computed: {},
  methods: {
    async getCharacters() {
      try {
        const response = await axios.get("/api/admin/characters");
        // console.log(response);
        this.characters = response.data.characters;
      } catch (error) {
        // console.log(error);
      }
    },
    selectCharacter(character) {
      this.character = character;
      this.characterName = character.name;
      this.characterRace = character.race;
      this.characterClass = character.class;
      this.getUsername(character.user);
    },
    async editCharacter(character) {
      try {
        await axios.put("/api/characters/" + character._id, {
          name: this.characterName,
          class: this.characterClass,
          race: this.characterRace,
        });
        this.character = null;
        this.characterName = "";
        this.characterRace = "";
        this.characterClass = "";
        this.getCharacters();
      } catch (error) {
        // console.log(error);
      }
    },
    async deleteCharacter(character) {
      try {
        await axios.delete(`/api/characters/${character._id}`);
        this.character = null;
        this.characterName = "";
        this.characterRace = "";
        this.characterClass = "";
        this.getCharacters();
      } catch (error) {
        // console.log(error);
      }
    },
    async getUsername(userID) {
        try {
            let response = await axios.get(`/api/users/users/${userID}`);
            this.characterUsername = response.data.username;
        }
        catch (error) {
            // console.log(error);
        }
    },
    active(character) {
      return this.character && character._id === this.character._id;
    },
  },
};
</script>


<style scoped>
/* List */
ul {
  list-style: none;
}

li {
  background: #fff;
  width: 500px;
  min-height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  display: flex;
  align-items: center;
}

.delete {
  display: none;
  margin-left: auto;
}

li:hover .delete {
  display: block;
}

label {
  width: 400px;
}

/* Form */
input[type="checkbox"] {
  transform: scale(1.5);
  margin-right: 10px;
}

input[type="text"] {
  font-size: 1em;
}

#characters {
  margin-bottom: 20px;
}

.buttons {
  margin-top: 20px;
  margin-bottom: 20px;
}

button {
  font-size: 1em;
  border: none;
  background-color: white;
  color: #1c03ac;
  padding: 5px 10px;
}

button:focus {
  outline: none;
}

button.selected {
  border-bottom: 2px solid #000;
}

.white {
  color: #fff;
}

/* Controls */
.controls {
  margin-top: 20px;
}
</style>