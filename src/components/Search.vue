<template>
    <v-text-field
            v-model="pattern"
            outlined
            rounded
            dense
            clearable
            type="text"
            color="accent"
            placeholder="Search..."
            @click:clear="clearMessage"
            @keydown.enter="search"
            hide-details
            prepend-inner-icon="mdi-magnify"
    ></v-text-field>
</template>

<script>
export default {
    name: 'Search',
    inject: ['gameService'],
    data() {
        return {
            pattern: ''
        };
    },
    methods: {
        clearMessage() {
            this.pattern = '';
            this.search();
        },
        search() {
            this.gameService.searchGames(this.pattern);
        }
    },
};
</script>