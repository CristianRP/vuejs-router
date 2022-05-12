<template>
  <div>
    <router-link to="/">Pokémon List</router-link>
    <router-link to="/id">Pokémon by Id</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
div {
  padding: 0 30px;
}
div a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}
a.router-link-exact-active {
  color: #42b983;
}
</style>