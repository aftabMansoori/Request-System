<template>
  <main>
    <section>
      <div class="text-center mb-4">
        <h1>Register</h1>
        <p class="text-secondary">
          Please enter your details to get regsitered
        </p>
      </div>
      <form @submit.prevent="registerUser">
        <div class="my-1">
          <label class="text-secondary" for="email">Your email</label>
          <el-input
            type="email"
            id="email"
            name="email"
            placeholder="name@email.com"
            class="my bg"
            prefix-icon="el-icon-message"
            v-model="user.email"
          />
        </div>
        <div class="my-1">
          <label class="text-secondary" for="email">Your Name</label>
          <el-input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Jake Parelta"
            class="my bg"
            prefix-icon="el-icon-user"
            v-model="user.name"
          />
        </div>
        <div class="my-1">
          <label class="text-secondary" for="phone-number"
            >Your Phone Number</label
          >
          <el-input
            type="tel"
            id="phone-number"
            name="phone-number"
            placeholder="987456123"
            class="my bg"
            prefix-icon="el-icon-phone"
            v-model="user.phone"
          />
        </div>
        <div class="my-1">
          <label class="text-secondary" for="batch">Your Batch</label>
          <el-select
            name="batch"
            id="batch"
            v-model="user.batch"
            class="w-100 my"
            filterable
            placeholder="Select"
          >
            <el-option
              v-for="batch in batches"
              :key="batch.id"
              :label="batch.name"
              :value="batch.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="my-1">
          <label class="text-secondary" for="password">Your Password</label>
          <el-input
            type="password"
            name="password"
            id="password"
            placeholder="atleast 8 characters"
            class="my"
            prefix-icon="el-icon-lock"
            show-password
            v-model="user.password"
          />
        </div>
        <div class="my-1">
          <label class="text-secondary" for="confPassword"
            >Confirm Your Password</label
          >
          <el-input
            type="password"
            name="confPassword"
            id="confPassword"
            placeholder="should be same as above password"
            class="my"
            prefix-icon="el-icon-lock"
            show-password
            v-model="confPassword"
          />
        </div>

        <el-button type="primary" native-type="submit" class="w-100 my-1" round
          >Register</el-button
        >

        <p class="text-center">
          Already have an account?
          <router-link to="/login"
            ><i class="text-primary">Login</i></router-link
          >
        </p>
      </form>
    </section>
  </main>
</template>

<script>
import config from "@/config";
import { register } from "@/services/auth";
import { errorHandler } from "@/services/helper";

export default {
  name: "AppRegister",
  data() {
    return {
      user: {
        email: "",
        name: "",
        phone: "",
        batch: "",
        password: "",
      },
      confPassword: "",
      batches: [
        {
          id: 0,
          name: "JavaScript FullStack Batch 1",
          value: "mevn-batch-1",
        },
        {
          id: 1,
          name: "JavaScript FullStack Batch 2",
          value: "mevn-batch-2",
        },
        {
          id: 2,
          name: "DJANGO FullStack",
          value: "django",
        },
        {
          id: 3,
          name: "UI/UX Developer",
          value: "ui-ux",
        },
      ],
      loading: false,
    };
  },
  methods: {
    async registerUser() {
      try {
        this.loading = true;

        if (this.user.password !== this.confPassword) {
          this.$toast.error("Passwords does not match", config.toastConfig);

          this.loading = false;

          return;
        } else {
          const userCreated = await register(this.user, "general");

          if (userCreated) {
            this.$toast.success("Registration successfull", config.toastConfig);

            this.loading = false;

            this.$router.push("/login");
          } else {
            throw new Error("There was some issue");
          }
        }
      } catch (err) {
        this.loading = false;
        errorHandler(err);
        throw err;
      }
    },
  },
};
</script>

<style scoped>
main {
  min-height: 110vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

section {
  width: 400px;
  padding: 0 1em;
}

@media (max-width: 768px) {
  section {
    width: auto;
  }
}
</style>
