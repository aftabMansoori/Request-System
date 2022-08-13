<template>
  <main>
    <section>
      <div class="text-center mb-4">
        <h1>Login</h1>
        <p class="text-secondary">Please enter your credentials to continue</p>
      </div>
      <form @submit.prevent="login">
        <div class="demo-input-size">
          <div class="my-1">
            <label class="text-secondary" for="email">Your email</label>
            <el-input
              type="email"
              id="email"
              name="email"
              placeholder="name@email.com"
              class="my"
              v-model="credentials.email"
              prefix-icon="el-icon-message"
            />
          </div>
          <div class="my-1">
            <label class="text-secondary" for="password">Your Password</label>
            <el-input
              type="password"
              name="password"
              id="password"
              placeholder="atleast 8 characters"
              v-model="credentials.password"
              class="my"
              prefix-icon="el-icon-lock"
              show-password
            />
          </div>

          <el-button
            type="primary"
            native-type="submit"
            class="w-100 my-1"
            round
            >Login</el-button
          >

          <p class="text-center">
            Don't have account?
            <router-link to="/register"
              ><i class="text-primary">Sign Up</i></router-link
            >
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "AppLogin",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("userLogin", this.credentials);
    },
  },
};
</script>

<style scoped>
main {
  min-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

section {
  width: 400px;
}
</style>
