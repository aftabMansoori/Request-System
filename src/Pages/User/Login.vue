<template>
    <main>
        <section>
            <div class="text-center mb-4">
                <h1>Login</h1>
                <p class="text-secondary">
                    Please enter your credentials to continue
                </p>
            </div>
            <form @submit.prevent="login">
                <div class="demo-input-size">
                    <div class="my-1">
                        <label class="text-secondary" for="email"
                            >Your email</label
                        >
                        <el-input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@email.com"
                            class="my"
                            v-model="credentials.email"
                            prefix-icon="el-icon-message"
                            @blur="$v.credentials.email.$touch()"
                        />
                        <div
                            v-if="$v.credentials.email.$error"
                            class="text-danger"
                        >
                            <div
                                v-if="!$v.credentials.email.required"
                                class="error-message"
                            >
                                <small>The email field is required</small>
                            </div>
                            <div
                                v-else-if="!$v.credentials.email.email"
                                class="error-message"
                            >
                                <small>Invalid email address</small>
                            </div>
                        </div>
                    </div>
                    <div class="my-1">
                        <label class="text-secondary" for="password"
                            >Your Password</label
                        >
                        <el-input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="atleast 8 characters"
                            v-model="credentials.password"
                            class="my"
                            prefix-icon="el-icon-lock"
                            show-password
                            @blur="$v.credentials.password.$touch()"
                        />
                        <div
                            v-if="$v.credentials.password.$error"
                            class="text-danger"
                        >
                            <div
                                v-if="!$v.credentials.password.required"
                                class="error-message"
                            >
                                <small>The password field is required</small>
                            </div>
                            <div
                                v-else-if="!$v.credentials.password.minLength"
                                class="error-message"
                            >
                                <small
                                    >The password must have at least 8
                                    characters</small
                                >
                            </div>
                            <div
                                v-else-if="
                                    !$v.credentials.password.containsUppercase
                                "
                                class="error-message"
                            >
                                <small
                                    >The password must have at least 1 uppercase
                                    character</small
                                >
                            </div>
                            <div
                                v-else-if="
                                    !$v.credentials.password.containsLowercase
                                "
                                class="error-message"
                            >
                                <small
                                    >The password must have at least 1 lowercase
                                    character</small
                                >
                            </div>
                            <div
                                v-else-if="
                                    !$v.credentials.password.containsNumber
                                "
                                class="error-message"
                            >
                                <small
                                    >The password must have at least 1
                                    digit</small
                                >
                            </div>
                            <div
                                v-else-if="
                                    !$v.credentials.password.containsSpecial
                                "
                                class="error-message"
                            >
                                <small
                                    >The password must have at least 1 special
                                    character</small
                                >
                            </div>
                        </div>
                    </div>

                    <el-button
                        type="primary"
                        native-type="submit"
                        class="w-100 my-1"
                        round
                        :disabled="loading"
                    >
                        Login
                        <template v-if="loading">
                            <AppSpinner />
                        </template>
                    </el-button>

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
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
    name: "AppLogin",
    data() {
        return {
            credentials: {
                email: "",
                password: "",
                role: "general",
            },
            loading: false,
        };
    },
    validations() {
        return {
            credentials: {
                email: {
                    email,
                    required,
                },
                password: {
                    required,
                    minLength: minLength(8),
                    containsUppercase: function (value) {
                        return /[A-Z]/.test(value);
                    },
                    containsLowercase: function (value) {
                        return /[a-z]/.test(value);
                    },
                    containsNumber: function (value) {
                        return /[0-9]/.test(value);
                    },
                    containsSpecial: function (value) {
                        return /[#?!@$%^&*-]/.test(value);
                    },
                },
            },
        };
    },
    methods: {
        async login() {
            try {
                this.$v.credentials.$touch();

                if (!this.$v.credentials.$invalid) {
                    this.loading = true;
                    const user = await this.$store.dispatch(
                        "userLogin",
                        this.credentials
                    );
                    this.$toast.success(
                        `Hello ${user}, Login Successfull!`,
                        this.$config.toastConfig
                    );
                    this.loading = false;
                    window.location.href = "/activity";
                } else {
                    this.$toast.error(
                        "Please fill all the inputs",
                        this.$config.toastConfig
                    );
                }
            } catch (err) {
                this.loading = false;

                this.$toast.error(
                    err.response.data.message ||
                        "There was an error while getting the requests",
                    this.$config.toastConfig
                );
            }
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

@media (max-width: 768px) {
    section {
        width: auto;
    }
}
</style>
