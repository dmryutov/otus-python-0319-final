<template>
    <p>Log out...</p>
</template>

<script>
import * as userTypes from '@/store/user/types';

/**
 * User logout component
 */
export default {
    name: 'Logout',
    /**
     * Logout when the component has been loaded
     */
    mounted() {
        this.$store.commit(userTypes.LOGOUT);
    },
};
</script>
