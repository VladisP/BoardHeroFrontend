import moment from 'moment';

export class FavoriteGameRecord {
    constructor({ id, created_at }) {
        this.id = id;
        this.createdAt = moment(created_at).format('D MMM YYYY HH:mm');
    }
}