<template>
    <div>
        Hello Board Hero!
    </div>
</template>

<script>
export default {
    name: 'Games',
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
            .subscribe(games => {
                console.log(games);
                this.games = games;
            });

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

<style scoped>

</style>