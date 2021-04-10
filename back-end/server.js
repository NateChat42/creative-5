const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/creative5', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


const characterSchema = new mongoose.Schema({
  name: String,
  class: String,
  race: String,
});


const Character = mongoose.model('Character', characterSchema);

app.post('/api/characters', async (req, res) => {
  const character = new Character({
    name: req.body.name,
    class: req.body.class,
    race: req.body.race,
  });
  try {
    await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/characters', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/characters/:characterID', async (req, res) => {
  try {
    let character = await Character.findOne({_id: req.params.characterID});
    character.name = req.body.name;
    character.class = req.body.class;
    character.race = req.body.race;
    await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.delete('/api/characters/:characterID/', async (req, res) => {
  try {
      let character = await Character.findOne({_id:req.params.characterID});
      if (!character) {
          res.send(404);
          return;
      }
      await character.delete();
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

const questSchema = new mongoose.Schema({
  character: {
      type: mongoose.Schema.ObjectId,
      ref: 'Character'
  },
  title: String,
  description: String,
  reward: String,
  completed: Boolean,
})


const Quest = mongoose.model('Quest',questSchema);

app.post('/api/characters/:characterID/quests', async (req, res) => {
  try {
      let character = await Character.findOne({_id: req.params.characterID});
      if (!character) {
          res.send(404);
          return;
      }
      let quest = new Quest({
          character: character,
          title: req.body.title,
          description: req.body.description,
          reward: req.body.reward,
          completed: req.body.completed,
      });
      await quest.save();
      res.send(quest);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.get('/api/characters/:characterID/quests', async (req, res) => {
  try {
      let character = await Character.findOne({_id: req.params.characterID});
      if (!character) {
          res.send(404);
          return;
      }
      let quests = await Quest.find({character:character});
      res.send(quests);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.put('/api/characters/:characterID/quests/:questID', async (req, res) => {
  try {
      let quest = await Quest.findOne({_id:req.params.questID, character: req.params.characterID});
      if (!quest) {
          res.send(404);
          return;
      }
      quest.title = req.body.title;
      quest.description = req.body.description;
      quest.reward = req.body.reward;
      quest.completed = req.body.completed;
      await quest.save();
      res.send(quest);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.delete('/api/characters/:characterID/quests/:questID', async (req, res) => {
  try {
      let quest = await Quest.findOne({_id:req.params.questID, character: req.params.characterID});
      if (!quest) {
          res.send(404);
          return;
      }
      await quest.delete();
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

const users = require("./users.js");
app.use("/api/users", users.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));
