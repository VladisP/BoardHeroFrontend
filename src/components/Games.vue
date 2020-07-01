<template>
    <div class="games-container">
        <Progress v-if="loading"></Progress>
        <v-list v-if="games" class="d-flex justify-space-around align-center flex-wrap">
            <Game v-for="game of games" :game="game" :key="game.id"></Game>
        </v-list>
    </div>
</template>

<script>
import Game from './Game';
import Progress from './Progress';

export default {
    name: 'Games',
    components: { Progress, Game },
    inject: ['gameService', 'errorService', 'userService'],
    data() {
        return {
            loading: false,
            games: null,
            gamesSubscription: null,
            user: null
        };
    },
    async mounted() {
        this.loading = true;
        this.gamesSubscription = this.gameService
            .game$
            .subscribe(games => this.games = games);

        try {
            this.user = await this.userService.getUser().catch(console.error);
            await this.gameService.getGames();
        } catch (e) {
            this.errorService.setErrorMessage(e.message);
        } finally {
            this.loading = false;
        }
    },
    beforeDestroy() {
        if (this.gamesSubscription) {
            this.gamesSubscription.unsubscribe();
        }
    }
};
</script>