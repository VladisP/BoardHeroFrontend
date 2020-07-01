import moment from 'moment';

export class Review {
    constructor({
        review_id,
        board_game_id,
        user_id,
        title,
        description,
        rating,
        created_at,
        score
    }) {
        this.id = review_id;
        this.gameId = board_game_id;
        this.userId = user_id;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.createdAt = moment(created_at).format('D MMM YYYY HH:mm');
        this.score = score;
    }
}