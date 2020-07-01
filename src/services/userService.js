import axios from 'axios';
import { apiErrorHandler } from '../helpers/apiError';
import { User } from '../model/user';
import { FavoriteGameRecord } from '../model/favoriteGameRecord';
import { Rating } from '../model/rating';

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

    async addToFavorite(gameId) {
        const { data: { payload } } = await this.$axios.post(`/user/favorite-game/${gameId}`).catch(apiErrorHandler);
        this.$user.favoriteGames.push(new FavoriteGameRecord(payload));
    }

    async deleteFromFavorite(gameId) {
        await this.$axios.delete(`/user/favorite-game/${gameId}`).catch(apiErrorHandler);
        this.$user.favoriteGames = this.$user.favoriteGames.filter(record => record.id !== gameId);
    }

    isFavoriteGame(gameId) {
        return this.$user && this.$user.favoriteGames.findIndex(record => record.id === gameId) !== -1;
    }

    hasReview(gameReviews) {
        if (!this.$user) {
            return false;
        }

        for (const { id } of gameReviews) {
            if (this.$user.reviews.includes(id)) {
                return true;
            }
        }

        return false;
    }

    addReview(reviewId) {
        this.$user.reviews.push(reviewId);
    }

    getRatingByReviewId(reviewId) {
        return this.$user.ratings.find(rating => rating.reviewId === reviewId);
    }

    async updateReviewRating(reviewId, isPositive) {
        const { data: { payload } } = await this.$axios
            .post(`/review/rating/${reviewId}`, { isPositive })
            .catch(apiErrorHandler);

        if (payload.is_positive === null) {
            this.$user.ratings = this.$user.ratings.filter(rating => rating.reviewId !== reviewId);
        } else {
            this.$user.ratings.push(new Rating({ review_id: reviewId, is_positive: payload.is_positive }));
        }

        return payload.new_score;
    }
}