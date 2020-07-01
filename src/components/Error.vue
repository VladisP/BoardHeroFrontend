<template>
    <v-snackbar v-model="show">
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
            <v-btn color="error" text v-bind="attrs" @click="close">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'Error',
    inject: ['errorService'],
    data() {
        return {
            show: false,
            errorMessage: null,
            errorSubscription: null
        };
    },
    methods: {
        close() {
            this.errorService.setErrorMessage(null);
        }
    },
    mounted() {
        this.errorSubscription = this.errorService
            .error$
            .subscribe(msg => {
                this.errorMessage = msg;
                this.show = this.errorMessage !== null;
            });
    },
    beforeDestroy() {
        if (this.errorSubscription) {
            this.errorSubscription.unsubscribe();
        }
    }
};
</script>