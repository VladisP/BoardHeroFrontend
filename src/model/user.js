import moment from 'moment';

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
        this.favoriteGames = favorite_games || [];
        this.reviews = reviews || [];
        this.ratings = ratings || [];
    }
}