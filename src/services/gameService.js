import axios from 'axios';
import { Subject } from 'rxjs';
import { apiErrorHandler } from '../helper/apiError';

export class GameService {
    constructor() {
        this.$axios = axios.create({
            baseURL: process.env.VUE_APP_API_SERVER_URL,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });
        this.$games = null;
        this.$gameSource = new Subject();

        this.game$ = this.$gameSource.asObservable();
    }

    async getGames() {
        if (this.$games) {
            return;
        }

        const { data: { payload } } = await this.$axios.get('/games').catch(apiErrorHandler);
        this.$games = payload;
        this.$gameSource.next(payload);
    }
}