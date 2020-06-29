<template>
    <v-hover>
        <template v-slot="{ hover }">
            <v-card
                    max-width="400"
                    width="400"
                    max-height="500"
                    height="500"
                    class="mx-2 my-4 transition-swing"
                    :class="`elevation-${hover ? 24 : 6}`"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline">{{game.name}}</v-list-item-title>
                        <v-list-item-subtitle class="d-flex justify-space-between align-center">
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
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <div class="game-image-wrapper">
                    <v-img
                            :src="game.imageUrl"
                            width="300"
                            height="300"
                            max-width="300"
                            max-height="300"
                            contain>
                    </v-img>
                </div>

                <v-card-actions class="d-flex justify-space-between align-center" dense>
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
                </v-card-actions>
            </v-card>
        </template>
    </v-hover>
</template>

<script>
import { Game } from '../model/game';

export default {
    name: 'Game',
    props: {
        game: Game
    },
    filters: {
        beautyRating(value) {
            return value && value.toFixed(1);
        }
    }
};
</script>

<style scoped>
    .game-image-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>