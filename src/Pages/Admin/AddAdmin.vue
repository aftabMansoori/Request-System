<template>
  <section>
    <header class="">
      <h1 class="text-primary mb-none">Add Admin</h1>
      <small class="text-secondary"
        >Create different accounts to manage the request system</small
      >
    </header>

    <div class="form-wrapper">
      <form @submit.prevent="addUser">
        <div class="my-1">
          <label class="text-secondary" for="email">Email</label>
          <el-input
            type="email"
            id="email"
            name="email"
            class="my"
            placeholder="name@email.com"
            v-model="user.email"
            prefix-icon="el-icon-message"
            clearable
          />
        </div>
        <div class="my-1">
          <label class="text-secondary" for="name">Name</label>
          <el-input
            type="text"
            id="name"
            name="name"
            class="my"
            placeholder="e.g. Jake Peralta"
            v-model="user.name"
            prefix-icon="el-icon-user"
            clearable
          />
        </div>
        <div class="my-1">
          <label class="text-secondary" for="name">Phone</label>
          <el-input
            type="tel"
            id="phone"
            name="phone"
            class="my"
            placeholder="e.g. 9874512360"
            v-model="user.phone"
            prefix-icon="el-icon-phone"
            clearable
          />
        </div>
        <div class="my-1">
          <label class="text-secondary" for="password">Password</label>
          <el-input
            type="password"
            id="password"
            name="password"
            class="my"
            placeholder="atleast 8 characters"
            v-model="user.password"
            prefix-icon="el-icon-lock"
            show-password
          />
        </div>
        <div>
          <label for="can-create" class="text-secondary"
            >Can create new admins</label
          >
          <el-switch class="mx-2" v-model="user.canCreate" />
        </div>

        <el-button type="primary" native-type="submit" class="w-100 my-2" round
          >Create</el-button
        >
      </form>
    </div>
  </section>
</template>

<script>
import { addAmin } from "@/services/auth";
import config from "@/config";

export default {
  name: "AddAdmin",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        phone: "",
        canCreate: false,
      },
      loading: false,
    };
  },
  methods: {
    async addUser() {
      this.loading = true;

      try {
        const adminCreated = await addAmin(this.user, "admin");

        if (adminCreated) {
          this.$toast.success("Admin created successfull", config.toastConfig);

          this.user = {
            name: "",
            email: "",
            password: "",
            phone: "",
            canCreate: false,
          };

          this.loading = false;
        } else {
          throw new Error("There was some issue while creating admin");
        }
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
  },
};
</script>

<style scoped>
section {
  padding: 1em 3em;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

form {
  width: 400px;
}

@media (max-width: 768px) {
  section {
    padding: 1em;
    overflow: auto;
  }

  .form-wrapper {
    height: 100%;
  }

  header {
    text-align: center;
    margin-bottom: 2em;
  }

  form {
    width: 320px;
    padding: 1em 0;
  }
}
</style>
