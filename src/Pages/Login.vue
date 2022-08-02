<template>
  <main>
    <form>
      <div class="text-center mb-2">
        <h1>Login</h1>
        <p class="text-secondary">Please enter your credentials to continue</p>
      </div>
      <div class="demo-input-size">
        <div class="my-1">
          <label class="text-secondary" for="email">Your email</label>
          <el-input
            type="email"
            id="email"
            name="email"
            placeholder="name@email.com"
            class="my bg"
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

        <el-button type="primary" class="w-100 my-1" round>Login</el-button>

        <p class="text-center">
          Don't have account? <i class="text-primary">Sign Up</i>
        </p>
      </div>
    </form>
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
};
</script>

<style scoped>
main {
  min-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: auto;
}

section {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 400px;
}
</style>
