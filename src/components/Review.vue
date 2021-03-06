<template>
    <v-hover>
        <template v-slot="{ hover }">
            <v-card
                    max-width="800"
                    width="800"
                    class="mx-2 my-4 transition-swing"
                    :class="`elevation-${hover ? 24 : 6}`"
            >
                <v-list class="d-flex justify-space-between align-center">
                    <v-list-item>
                        <h1 :class="ratingClasses">{{review.rating}}</h1>
                    </v-list-item>
                    <v-list-item>
                        <div class="grey--text">{{review.createdAt}}</div>
                    </v-list-item>
                    <v-list-item class="d-flex justify-end">
                        <v-btn @click="updateReviewRating(true)" icon color="accent" :disabled="disableArrows">
                            <v-icon :class="arrowUpClasses">mdi-arrow-up</v-icon>
                        </v-btn>
                        <div :class="scoreClasses">{{review.score | viewScore}}</div>
                        <v-btn @click="updateReviewRating(false)" icon color="error" :disabled="disableArrows">
                            <v-icon :class="arrowDownClasses">mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-list-item>
                </v-list>

                <v-card-actions class="d-flex flex-column align-start">
                    <v-list-item>
                        <h1>{{review.title}}</h1>
                    </v-list-item>
                    <v-list-item>
                        {{review.description}}
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </template>
    </v-hover>
</template>

<script>
import { Review } from '../model/review';

export default {
    name: 'Review',
    inject: ['userService', 'errorService'],
    props: {
        review: Review
    },
    data() {
        return {
            disableArrows: false
        };
    },
    filters: {
        viewScore(value) {
            return value > 0 ? `+${value}` : value;
        }
    },
    computed: {
        ratingClasses() {
            return {
                'accent--text': this.review.rating >= 7,
                'grey--text': this.review.rating < 7 && this.review.rating >= 5,
                'error--text': this.review.rating < 5
            };
        },
        scoreClasses() {
            return {
                'accent--text': this.review.score > 0,
                'error--text': this.review.score < 0
            };
        },
        arrowUpClasses() {
            const rating = this.userService.getRatingByReviewId(this.review.id);

            return {
                'accent--text': rating && rating.isPositive,
                'grey--text': !rating || !rating.isPositive
            };
        },
        arrowDownClasses() {
            const rating = this.userService.getRatingByReviewId(this.review.id);

            return {
                'error--text': rating && !rating.isPositive,
                'grey--text': !rating || rating.isPositive
            };
        }
    },
    methods: {
        async updateReviewRating(isPositive) {
            this.disableArrows = true;

            try {
                this.review.score = await this.userService.updateReviewRating(this.review.id, isPositive);
            } catch (e) {
                this.errorService.setErrorMessage(e.message);
            } finally {
                this.disableArrows = false;
            }
        }
    }
};
</script>