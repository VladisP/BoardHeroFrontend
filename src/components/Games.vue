<template>
    <v-list v-if="games" class="d-flex justify-space-around align-center flex-wrap">
        <Game v-for="game of games" :game="game" :key="game.id"></Game>
    </v-list>
</template>

<script>
import Game from './Game';

export default {
    name: 'Games',
    components: { Game },
    inject: ['gameService', 'errorService'],
    data() {
        return {
            games: null,
            gamesSubscription: null
        };
    },
    async mounted() {
        this.gamesSubscription = this.gameService
            .game$
            .subscribe(games => this.games = games);

        try {
            await this.gameService.getGames();
        } catch (e) {
            this.errorService.setErrorMessage(e.message);
        }
    },
    beforeDestroy() {
        if (this.gamesSubscription) {
            this.gamesSubscription.unsubscribe();
        }
    }
};
</script>