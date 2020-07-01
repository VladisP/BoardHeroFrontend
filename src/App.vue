<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" color="secondary" app>
            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon color="accent">mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Account</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link :to="{name: 'games'}" exact>
                    <v-list-item-action>
                        <v-icon color="accent">mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Games</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar color="primary" app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Board Hero</v-toolbar-title>
            <v-spacer></v-spacer>
            <Search></Search>
            <div class="logo-wrapper ml-4">
                <v-img src="./assets/logo.png"></v-img>
            </div>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <Error></Error>
    </v-app>
</template>

<script>
import Error from './components/Error';
import Search from './components/Search';

export default {
    name: 'App',
    components: { Search, Error },
    props: ['services'],
    data() {
        return {
            drawer: null,
        };
    },
    provide() {
        return this.$props.services;
    }
};
</script>

<style>
    .logo-wrapper {
        width: 44px;
        height: 44px;
    }
</style>