<template>
  <div id="app">
    <div id="menu">
      <router-link to="/tavern">
        <h2>Create Characters</h2>
      </router-link>
      <router-link to="/">
        <h2>Manage Character Quests</h2>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

body {
  margin: 50px 100px;
  background: #017fb9;
}

#menu {
  margin-bottom: 30px;
}

#menu a {
  color: #1c03ac;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: flex-start;
}

#brand img {
  height: 300px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
}

.plus {
  margin-right: 50px;
}

.plus-img {
  margin-left: 30px;
}
</style>