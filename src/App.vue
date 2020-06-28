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
                <v-list-item link>
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
            <div class="logo-wrapper">
                <v-img src="./assets/logo.png"></v-img>
            </div>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            drawer: null,
        };
    }
};
</script>

<style>
    .logo-wrapper {
        width: 44px;
        height: 44px;
    }
</style>