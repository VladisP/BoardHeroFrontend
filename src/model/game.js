import { Tag } from './tag';

export class Game {
    constructor({
        id,
        name,
        year_published,
        min_players,
        max_players,
        min_playtime,
        max_playtime,
        min_age,
        description,
        image_url,
        small_image_url,
        rating,
        mechanics,
        categories,
        likes_count
    }) {
        this.id = id;
        this.name = name;
        this.yearPublished = year_published;
        this.minPlayers = min_players;
        this.maxPlayers = max_players;
        this.minPlaytime = min_playtime;
        this.maxPlaytime = max_playtime;
        this.minAge = min_age;
        this.description = description;
        this.imageUrl = image_url;
        this.smallImageUrl = small_image_url;
        this.rating = rating;
        this.mechanics = mechanics && mechanics.map(mechanic => new Tag(mechanic));
        this.categories = categories && categories.map(category => new Tag(category));
        this.likesCount = likes_count && Number.parseInt(likes_count);
        // "reviews": []
    }
}