<template>
    <div class="login-form-container">
        <h1 class="accent--text">Welcome to Board Hero :)</h1>
        <div class="form-wrapper">
            <v-form v-model="valid" ref="form">
                <v-text-field
                        v-model="username"
                        :rules="usernameRules"
                        label="Username"
                        color="accent"
                        autocomplete="off"
                        required
                ></v-text-field>

                <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        type="password"
                        color="accent"
                        class="mt-4"
                        required
                ></v-text-field>

                <div v-if="!loading" class="d-flex justify-space-between mt-8">
                    <v-btn @click="auth('sign-in')" color="accent">Sign in</v-btn>
                    <v-btn @click="auth('sign-up')" color="info">Sign up</v-btn>
                </div>
                <Progress v-else></Progress>
            </v-form>
        </div>
    </div>
</template>

<script>
import Progress from './Progress';

export default {
    name: 'LoginForm',
    components: { Progress },
    inject: ['userService', 'errorService'],
    data() {
        return {
            valid: false,
            loading: false,
            username: '',
            password: '',
            usernameRules: [
                v => !!v || 'Username is required'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be at least 8 characters'
            ]
        };
    },
    methods: {
        async auth(method) {
            if (!this.valid) {
                this.$refs.form.validate();
                return;
            }

            this.loading = true;

            try {
                await this.userService.auth(method, this.username, this.password);
                await this.$router.push({ name: 'profile' });
            } catch (e) {
                this.errorService.setErrorMessage(e.message);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
    .login-form-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .form-wrapper {
        max-width: 800px;
        width: 800px;
    }
</style>