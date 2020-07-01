import axios from 'axios';
import { apiErrorHandler } from '../helpers/apiError';
import { User } from '../model/user';

export class UserService {
    constructor() {
        this.$axios = axios.create({
            baseURL: process.env.VUE_APP_API_SERVER_URL,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });
        this.$user = null;
    }

    async getUser() {
        if (!this.$user) {
            const { data: { payload } } = await this.$axios.get('/user').catch(apiErrorHandler);
            this.$user = new User(payload);
        }

        return this.$user;
    }

    async auth(authMethod, username, password) {
        const { data: { payload } } = await this.$axios
            .post(`/user/${authMethod}`, { username, password })
            .catch(apiErrorHandler);

        this.$user = new User(payload);
    }

    async signOut() {
        await this.$axios.post('/user/sign-out').catch(apiErrorHandler);
        this.$user = null;
    }
}