<template>
    <div class="game-info-container">
        <Progress v-if="loading"></Progress>
        <div v-if="game" class="game-info pa-6">
            <div class="d-flex mb-4">
                <v-img
                        :src="game.imageUrl"
                        class="mr-4"
                        width="500"
                        height="500"
                        max-width="500"
                        max-height="500"
                        contain>
                </v-img>
                <div class="d-flex flex-column">
                    <h1>{{game.name}}<span v-if="game.yearPublished"> ({{game.yearPublished}})</span></h1>
                    <v-list class="d-flex justify-space-between align-center">
                        <v-list-item>
                            <v-btn icon>
                                <v-icon>mdi-star</v-icon>
                            </v-btn>
                            {{game.rating | beautyRating}}
                        </v-list-item>
                        <v-list-item class="d-flex justify-end">
                            <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            {{game.likesCount}}
                        </v-list-item>
                    </v-list>
                    <v-list class="d-flex justify-space-between align-center" dense>
                        <v-list-item class="d-flex flex-column" dense>
                            <v-icon>mdi-human-child</v-icon>
                            <v-list-item>{{game.minAge}}+</v-list-item>
                        </v-list-item>
                        <v-list-item class="d-flex flex-column" dense>
                            <v-icon>mdi-account-group</v-icon>
                            <v-list-item>{{game.minPlayers}}-{{game.maxPlayers}}</v-list-item>
                        </v-list-item>
                        <v-list-item class="d-flex flex-column" dense>
                            <v-icon>mdi-clock-time-three-outline</v-icon>
                            <v-list-item>{{game.minPlaytime}}-{{game.maxPlaytime}}</v-list-item>
                        </v-list-item>
                    </v-list>
                    <div v-if="game.mechanics" class="d-flex flex-wrap mb-4">
                        <v-chip
                                v-for="mechanic of game.mechanics"
                                :key="mechanic.id"
                                class="ma-1"
                                color="accent"
                                outlined
                        >
                            {{mechanic.name}}
                        </v-chip>
                    </div>
                    <div v-if="game.categories" class="d-flex flex-wrap">
                        <v-chip
                                v-for="category of game.categories"
                                :key="category.id"
                                class="ma-1"
                                color="info"
                                outlined
                        >
                            {{category.name}}
                        </v-chip>
                    </div>
                </div>
            </div>
            <p>{{game.description}}</p>
        </div>
    </div>
</template>

<script>
import Progress from './Progress';

export default {
    name: 'GameInfo',
    components: { Progress },
    inject: ['gameService', 'errorService'],
    props: ['id'],
    data() {
        return {
            loading: false,
            game: null
        };
    },
    filters: {
        beautyRating(value) {
            return value && value.toFixed(1);
        }
    },
    async mounted() {
        this.loading = true;

        try {
            this.game = await this.gameService.getGameById(this.id);
        } catch (e) {
            this.errorService.setErrorMessage(e.message);
        } finally {
            this.loading = false;
        }
    }
};
</script>