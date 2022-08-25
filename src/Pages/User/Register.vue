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
                        @blur="$v.user.email.$touch()"
                    />
                    <div v-if="$v.user.email.$error" class="text-danger">
                        <div
                            v-if="!$v.user.email.required"
                            class="error-message"
                        >
                            <small>The email field is required</small>
                        </div>
                        <div
                            v-else-if="!$v.user.email.email"
                            class="error-message"
                        >
                            <small>Invalid email address</small>
                        </div>
                    </div>
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
                        @blur="$v.user.name.$touch()"
                    />
                    <div v-if="$v.user.name.$error" class="text-danger">
                        <div
                            v-if="!$v.user.name.required"
                            class="error-message"
                        >
                            <small>The name field is required</small>
                        </div>
                    </div>
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
                        @blur="$v.user.phone.$touch()"
                    />
                    <div v-if="$v.user.phone.$error" class="text-danger">
                        <div
                            v-if="!$v.user.phone.required"
                            class="error-message"
                        >
                            <small>The phone field is required</small>
                        </div>
                        <div
                            v-if="!$v.user.phone.numeric"
                            class="error-message"
                        >
                            <small>The phone field should be numbers</small>
                        </div>
                        <div
                            v-if="
                                !$v.user.phone.minLength ||
                                !$v.user.phone.maxLength
                            "
                            class="error-message"
                        >
                            <small
                                >The phone number should be of 10 digits</small
                            >
                        </div>
                    </div>
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
                        @blur="$v.user.batch.$touch()"
                    >
                        <el-option
                            v-for="batch in batches"
                            :key="batch.id"
                            :label="batch.name"
                            :value="batch.value"
                        >
                        </el-option>
                    </el-select>
                    <div v-if="$v.user.batch.$error" class="text-danger">
                        <div
                            v-if="!$v.user.batch.required"
                            class="error-message"
                        >
                            <small>The batch field is required</small>
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
                        class="my"
                        prefix-icon="el-icon-lock"
                        show-password
                        v-model="user.password"
                        @blur="$v.user.password.$touch()"
                    />
                    <div v-if="$v.user.password.$error" class="text-danger">
                        <div
                            v-if="!$v.user.password.required"
                            class="error-message"
                        >
                            <small>The password field is required</small>
                        </div>
                        <div
                            v-else-if="!$v.user.password.minLength"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 8
                                characters</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.password.containsUppercase"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 1 uppercase
                                character</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.password.containsLowercase"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 1 lowercase
                                character</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.password.containsNumber"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 1 digit</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.password.containsSpecial"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 1 special
                                character</small
                            >
                        </div>
                    </div>
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
                        v-model="user.confPassword"
                        @blur="$v.user.confPassword.$touch()"
                    />

                    <div v-if="$v.user.confPassword.$error" class="text-danger">
                        <div
                            v-if="!$v.user.confPassword.required"
                            class="error-message"
                        >
                            <small>The password field is required</small>
                        </div>
                        <div
                            v-else-if="!$v.user.confPassword.minLength"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 8
                                characters</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.confPassword.containsUppercase"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 1 uppercase
                                character</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.confPassword.containsLowercase"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 1 lowercase
                                character</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.confPassword.containsNumber"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 1 digit</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.confPassword.containsSpecial"
                            class="error-message"
                        >
                            <small
                                >The password must have at least 1 special
                                character</small
                            >
                        </div>
                        <div
                            v-else-if="!$v.user.confPassword.checkPass"
                            class="error-message"
                        >
                            <small>The passwords does not match</small>
                        </div>
                    </div>
                </div>

                <el-button
                    type="primary"
                    native-type="submit"
                    class="w-100 my-1"
                    :disabled="loading"
                    round
                    >Register
                    <template v-if="loading">
                        <AppSpinner />
                    </template>
                </el-button>

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
import { register } from "@/services/auth";
import { errorHandler } from "@/services/helper";

import {
    email,
    required,
    minLength,
    maxLength,
    numeric,
} from "vuelidate/lib/validators";

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
                confPassword: "",
            },
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
    validations: {
        user: {
            email: {
                email,
                required,
            },
            name: {
                required,
            },
            phone: {
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(10),
            },
            batch: {
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
            confPassword: {
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
                checkPass: function (value) {
                    return value === this.user.password;
                },
            },
        },
    },
    methods: {
        async registerUser() {
            try {
                this.$v.user.$touch();

                if (!this.$v.user.$invalid) {
                    this.loading = true;

                    delete this.user.confPassword;
                    delete this.user.confPassword;
                    console.log(this.user);

                    const userCreated = await register(this.user, "general");

                    if (userCreated) {
                        this.$toast.success(
                            "Registration successfull",
                            this.$config.toastConfig
                        );

                        this.loading = false;

                        this.$router.push("/login");
                    } else {
                        this.loading = false;

                        this.$toast.error(
                            "There was some issues while registering",
                            this.$config.toastConfig
                        );
                    }
                } else {
                    this.$toast.error(
                        "Please fill all the inputs",
                        this.$config.toastConfig
                    );
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
