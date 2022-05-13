<template>
  <div>
    <!-- <router-link :to="{ name: 'home' }">Pokémon List</router-link>
    <router-link :to="{ name: 'pokemon-id', params: { id: 85 } }">Pokémon by Id</router-link>
    <router-link :to="{ name: 'about' }">About</router-link> -->
    <CustomLink
      v-for="link in links"
      :key="link.to"
      :link="link" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    CustomLink: defineAsyncComponent(() => import("./CustomLink"))
  },

  data() {
    return {
      links: [
        { to: '/home', name: 'Pokemons' },
        { to: '/50', name: 'By Id' },
        { to: '/about', name: 'About' },
        { to: 'https://google.com', name: 'Google' }
      ]
    }
  }

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
/* a.router-link-exact-active {
  color: #42b983;
} */
</style>