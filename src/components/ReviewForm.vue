<template>
    <div class="review-form-root">
        <Progress v-if="dataLoading"></Progress>
        <div v-if="dataLoaded" class="review-form-container">
            <v-rating v-model="rating" length="10" color="accent"></v-rating>
            <div class="form-wrapper">
                <v-form v-model="valid" ref="form">
                    <v-text-field
                            v-model="title"
                            :rules="titleRules"
                            label="Title"
                            color="accent"
                            autocomplete="off"
                            required
                    ></v-text-field>

                    <v-textarea
                            v-model="description"
                            :rules="descriptionRules"
                            label="Description"
                            color="accent"
                            class="mt-4"
                            autocomplete="off"
                            required
                            outlined
                    ></v-textarea>

                    <div v-if="!loading" class="submit-btn-wrapper mt-8">
                        <v-btn @click="sendReview" color="accent">Send Review</v-btn>
                    </div>
                    <Progress v-else></Progress>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
import Progress from './Progress';
import { ErrorMessage } from '../helpers/constants';

export default {
    name: 'ReviewForm',
    components: { Progress },
    inject: ['gameService', 'errorService', 'userService'],
    props: ['gameId'],
    data() {
        return {
            dataLoading: false,
            dataLoaded: false,
            rating: 5,
            valid: false,
            loading: false,
            title: '',
            description: '',
            titleRules: [
                v => !!v || 'Title is required'
            ],
            descriptionRules: [
                v => !!v || 'Description is required'
            ]
        };
    },
    methods: {
        async sendReview() {
            if (!this.valid) {
                this.$refs.form.validate();
                return;
            }

            this.loading = true;

            try {
                const reviewId = await this.gameService.sendReview(
                    this.gameId,
                    this.rating,
                    this.title,
                    this.description
                );
                this.userService.addReview(reviewId);
                await this.$router.push({ name: 'games' });
            } catch (e) {
                this.errorService.setErrorMessage(e.message);
            } finally {
                this.loading = false;
            }
        }
    },
    async mounted() {
        this.dataLoading = true;

        try {
            await Promise.all([
                this.userService.getUser(),
                this.gameService.getGames()
            ]);
            this.dataLoaded = true;
        } catch (e) {
            this.errorService.setErrorMessage(e.message);

            if (e.message === ErrorMessage.UNAUTHORIZED) {
                await this.$router.replace({ name: 'login' });
            }
        } finally {
            this.dataLoading = false;
        }
    }
};
</script>

<style scoped>
    .review-form-root {
        width: 100%;
        height: 100%;
    }

    .review-form-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .form-wrapper {
        max-width: 800px;
        width: 800px;
    }

    .submit-btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>