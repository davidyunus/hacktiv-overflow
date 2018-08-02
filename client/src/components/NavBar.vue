<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary col-12 px-3">

    <a class="navbar-brand" href="#">
      Hacktiv Overflow
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" v-if="isLoggedIn === true" @click="logout" href="#">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isLoggedIn: false,
      token: localStorage.getItem('token')
    }
  },
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created () {
    let token = localStorage.getItem('token')

    if (token) {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
  }
}
</script>

<style>

</style>
