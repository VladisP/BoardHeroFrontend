import axios from 'axios';
import { Subject } from 'rxjs';
import { apiErrorHandler } from '../helpers/apiError';
import { Game } from '../model/game';

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
        this.$games = payload && payload
            .map(rawGame => new Game(rawGame))
            .sort((game1, game2) => game2.rating - game1.rating);
        this.$gameSource.next(this.$games);
    }
}