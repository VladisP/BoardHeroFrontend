<template>
    <div class="profile-container">
        <Progress v-if="loading"></Progress>
        <div v-if="user" class="d-flex flex-column align-center secondary pt-8">
            <v-img
                    :src="`https://avatars.dicebear.com/v2/identicon/${user.id}.svg`"
                    width="150"
                    height="150"
                    class="rounded-circle mb-4"
            ></v-img>
            <h1 class="accent--text mb-4">{{user.name}}</h1>
            <div class="d-flex justify-space-around profile-info-wrapper">
                <div class="d-flex flex-column align-center">
                    <p class="accent--text">Karma</p>
                    <h3 :class="karmaClasses">{{user.karma | viewKarma}}</h3>
                </div>
                <div class="d-flex flex-column align-center">
                    <p class="accent--text">Created At</p>
                    <h3 class="grey--text">{{user.createdAt}}</h3>
                </div>
            </div>
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
            user: null
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
    async mounted() {
        this.loading = true;

        try {
            await this.gameService.getGames();
            this.user = await this.userService.getUser();
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