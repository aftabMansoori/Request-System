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
                    <label class="text-secondary" for="password"
                        >Password</label
                    >
                    <el-input
                        type="password"
                        id="password"
                        name="password"
                        class="my"
                        placeholder="atleast 8 characters"
                        v-model="user.password"
                        prefix-icon="el-icon-lock"
                        show-password
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
                <div>
                    <label for="can-create" class="text-secondary"
                        >Can create new admins</label
                    >
                    <el-switch class="mx-2" v-model="user.canCreate" />
                </div>

                <el-button
                    type="primary"
                    native-type="submit"
                    class="w-100 my-2"
                    :disabled="loading"
                    round
                    >Create
                    <template v-if="loading">
                        <AppSpinner />
                    </template>
                </el-button>
            </form>
        </div>
    </section>
</template>

<script>
import { addAmin } from "@/services/auth";

import {
    email,
    required,
    minLength,
    maxLength,
    numeric,
} from "vuelidate/lib/validators";

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
    },
    methods: {
        async addUser() {
            try {
                this.$v.user.$touch();

                if (!this.$v.user.$invalid) {
                    this.loading = true;
                    const adminCreated = await addAmin(this.user, "admin");

                    if (adminCreated) {
                        this.$toast.success(
                            "Admin created successfull",
                            this.$config.toastConfig
                        );

                        this.user = {
                            name: "",
                            email: "",
                            password: "",
                            phone: "",
                            canCreate: false,
                        };

                        this.loading = false;
                    } else {
                        throw new Error(
                            "There was some issue while creating admin"
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
