<template>
    <div class="profile-container">
        <Progress v-if="loading"></Progress>
        <div v-if="user && favoriteGames" class="d-flex flex-column align-center secondary pt-8">
            <v-img
                    :src="`https://avatars.dicebear.com/v2/identicon/${user.id}.svg`"
                    width="150"
                    height="150"
                    class="rounded-circle mb-4"
            ></v-img>
            <h1 class="accent--text mb-4">{{user.name}}</h1>
            <v-btn @click="signOut" color="error" outlined>Sign Out</v-btn>
            <div class="d-flex justify-space-around profile-info-wrapper mb-4">
                <div class="d-flex flex-column align-center">
                    <p class="accent--text">Karma</p>
                    <h3 :class="karmaClasses">{{user.karma | viewKarma}}</h3>
                </div>
                <div class="d-flex flex-column align-center">
                    <p class="accent--text">Created At</p>
                    <h3 class="grey--text">{{user.createdAt}}</h3>
                </div>
            </div>
            <v-tabs v-model="tabs" background-color="accent" centered grow>
                <v-tabs-slider color="primary"></v-tabs-slider>
                <v-tab>Favorite games</v-tab>
                <v-tab>Reviews</v-tab>
                <v-tabs-items v-model="tabs">
                    <v-tab-item>
                        <div v-for="game of favoriteGames" :key="game.id">
                            {{game.name}}
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        lol
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </div>
    </div>
</template>

<script>
import Progress from './Progress';
import { ErrorMessage } from '../helpers/constants';

export default {
    name: 'Profile',
    components: { Progress },
    inject: ['gameService', 'errorService', 'userService'],
    data() {
        return {
            loading: false,
            user: null,
            tabs: null,
            favoriteGames: null
        };
    },
    filters: {
        viewKarma(value) {
            return value > 0 ? `+${value}` : value;
        }
    },
    computed: {
        karmaClasses() {
            return {
                'accent--text': this.user.karma > 0,
                'grey--text': this.user.karma === 0,
                'error--text': this.user.karma < 0
            };
        }
    },
    methods: {
        async signOut() {
            try {
                await this.userService.signOut();
                await this.$router.replace({ name: 'login' });
            } catch (e) {
                this.errorService.setErrorMessage(e.message);
            }
        },
        async getFavoriteGames() {
            const games = [];

            for (const id of this.user.favoriteGames.map(game => game.id)) {
                games.push(await this.gameService.getGameById(id));
            }

            return games;
        }
    },
    async mounted() {
        this.loading = true;

        try {
            await this.gameService.getGames();
            this.user = await this.userService.getUser();
            this.favoriteGames = await this.getFavoriteGames();
        } catch (e) {
            this.errorService.setErrorMessage(e.message);

            if (e.message === ErrorMessage.UNAUTHORIZED) {
                await this.$router.replace({ name: 'login' });
            }
        } finally {
            this.loading = false;
        }
    }
};
</script>

<style scoped>
    .profile-info-wrapper {
        width: 60%
    }
</style>