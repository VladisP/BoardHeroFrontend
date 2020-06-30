<template>
    <div class="game-info-container">
        <Progress v-if="loading"></Progress>
        <v-img
                v-if="game"
                :src="game.imageUrl"
                width="300"
                height="300"
                max-width="300"
                max-height="300"
                contain>
        </v-img>
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