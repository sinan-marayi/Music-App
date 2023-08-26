<template >
    <!-- Header -->
    <header id="header" class="bg-gray-700">
        <nav class="container mx-auto flex flex-col sm:flex-row justify-start sm:items-center py-5 px-4">
            <!-- App Name -->
            <router-link class="text-white font-bold uppercase text-2xl mr-4" exact-active-class="no-active"
                :to="{ name: 'home' }">Music</router-link>

            <div class="flex flex-grow items-center text-sm sm:text-base">
                <!-- Primary Navigation -->
                <ul class="flex flex-row mt-1">
                    <!-- Navigation Links -->
                    <li v-if="!userStore.isLoggedIn">
                        <a @click.prevent="toggleModal" class="sm:px-2 text-white" href="#">Login / Register</a>
                    </li>
                    <template v-else>
                        <li>
                            <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
                        </li>
                        <li>
                            <a @click.prevent="logout" class="px-2 text-white" href="#">Logout</a>
                        </li>
                    </template>
                    <li>
                        <router-link class="px-2 text-white" :to="{ name: 'about' }">About</router-link>
                    </li>
                </ul>
                <select
                    class="ml-auto text-sm sm:text-base focus:ring-0 bg-gray-700 text-white focus:border-0 selection:ring-0 selection:border-0"
                    name="locale" id="locale" v-model="locale">
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="hi">Hindi</option>
                    <option value="ml">Malayalam</option>
                </select>
            </div>
        </nav>
    </header>
</template>


<script>
import { mapStores } from 'pinia';
import useModalStore from '@/stores/modal';
import useUserStore from '@/stores/user';


export default {
    name: 'AppHeader',
    computed: {
        ...mapStores(useModalStore, useUserStore)
    },
    mounted() {
        this.locale = this.$i18n.locale;
    },
    data() {
        return {
            locale: ''
        }
    },
    methods: {
        toggleModal() {
            this.modalStore.isOpen = !this.modalStore.isOpen;
        },
        logout() {
            this.userStore.logout();

            if (this.$route.meta.isAuthRequired) {
                this.$router.push({ name: 'home' });
            }
        }
    },
    watch: {
        locale(newVal) {
            this.$i18n.locale = newVal;
        }
    }
}
</script>
