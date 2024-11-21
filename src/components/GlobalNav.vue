<template>
  <nav class="shadcn-nav">
    <NavigationMenu>
      <NavigationMenuItem>
        <router-link to="/" class="nav-item">Home</router-link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <router-link to="/about" class="nav-item">About</router-link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <router-link to="/players" class="nav-item">Players</router-link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <router-link to="/teams" class="nav-item">Teams</router-link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <router-link to="/search" class="nav-item">Search</router-link>
      </NavigationMenuItem>
    </NavigationMenu>
  </nav>
</template>

<script>
// Import ShadCN UI components
import { NavigationMenu, NavigationMenuItem } from '@shadcn/ui';

export default {
  name: 'GlobalNav',
  components: {
    NavigationMenu,
    NavigationMenuItem,
  },
};
</script>

<style scoped>
.nav-item {
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
}

.nav-item:hover {
  background-color: #ddd;
}
</style>
