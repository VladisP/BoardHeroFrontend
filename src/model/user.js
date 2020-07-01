import moment from 'moment';
import { FavoriteGameRecord } from './favoriteGameRecord';
import { Rating } from './rating';

export class User {
    constructor({
        user_id,
        user_name,
        karma,
        created_at,
        favorite_games,
        reviews,
        ratings
    }) {
        this.id = user_id;
        this.name = user_name;
        this.karma = karma;
        this.createdAt = moment(created_at).format('D MMM YYYY HH:mm');
        this.favoriteGames = (favorite_games && favorite_games.map(record => new FavoriteGameRecord(record))) || [];
        this.reviews = (reviews && reviews.map(idReview => idReview.id)) || [];
        this.ratings = (ratings && ratings.map(raw => new Rating(raw))) || [];
    }
}