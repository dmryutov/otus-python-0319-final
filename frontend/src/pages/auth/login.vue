<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-form @keyup.native.enter="submit">
                            <v-card class="elevation-8 pa-3">
                                <!-- FIELDS -->
                                <v-card-text>
                                    <div class="layout column align-center">
                                        <img
                                            alt="Logo"
                                            class="main-logo mb-4"
                                            src="@/assets/img/logo.png"
                                            height="100"
                                        >
                                        <h1 class="flex primary--text mb-4 text-xs-center">
                                            {{ SERVICE_TITLE }}
                                        </h1>
                                    </div>
                                    <div>
                                        <v-text-field
                                            id="username"
                                            v-model="user.username"
                                            append-icon="mdi-account"
                                            label="Username"
                                            type="text"
                                        />
                                        <v-text-field
                                            id="password"
                                            v-model="user.password"
                                            append-icon="mdi-lock"
                                            name="password"
                                            label="Password"
                                            type="password"
                                        />
                                    </div>
                                    <v-alert
                                        v-if="loginError"
                                        type="error"
                                        :value="true"
                                    >
                                        Please enter correct username and password
                                    </v-alert>
                                </v-card-text>
                                <!-- BUTTONS -->
                                <v-card-actions>
                                    <v-btn
                                        block
                                        color="primary"
                                        @click="submit"
                                    >
                                        Login
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

import {SERVICE_TITLE} from '@/consts/system';
import * as userTypes from '@/store/user/types';

/**
 * User login component
 */
export default {
    name: 'Login',
    data() {
        return {
            SERVICE_TITLE,
            /**
             * Information about user
             */
            user: {
                username: '',
                password: '',
            },
        };
    },
    computed: {
        ...mapGetters([
            'loginError',
        ]),
        /**
         * Get current year
         * @return {number} Current year
         */
        currentYear: () => (new Date()).getFullYear(),
    },
    methods: {
        /**
         * Submit form
         */
        submit() {
            this.$store.dispatch(userTypes.LOGIN, {
                username: this.user.username,
                password: this.user.password,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    h1 {
        font-weight: 300;
    }

    .main-logo {
        max-width: 100%;
    }

    .v-card__actions .v-btn {
        margin-left: 8px !important;
    }
</style>
