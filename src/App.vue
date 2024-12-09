<template>
  <div id="app">
    <!-- External Styles -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css"
    />
    <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    />

    <!-- Header with Navbar -->
    <header>
      <b-navbar>
        <!-- Logo -->
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
                src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                alt="NFL Stats Viewer"
            />
          </b-navbar-item>
        </template>

        <!-- Navigation Links -->
        <template #start>
          <b-navbar-item tag="router-link" :to="{ path: '/' }"><strong>Home</strong></b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/simplesearch' }">Simple Search</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/teamhistory' }">Team History</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/playerinfo' }">Player Info</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/players' }">Players</b-navbar-item>
          <!--<b-navbar-item tag="router-link" :to="{ path: '/procedures' }">Procedures</b-navbar-item>-->
        </template>
      </b-navbar>
    </header>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
</script>

<style>
body {
  font-family: Arial, sans-serif;
}

header {
  margin-bottom: 20px;
}

main {
  padding: 20px;
}
</style>