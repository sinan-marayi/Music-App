<template lang="">
    <div>
        <!-- Introduction -->
        <section class="mb-8 py-20 text-white text-center relative">
            <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
            style="background-image: url(assets/img/header.png)"></div>
            <div class="container mx-auto">
            <div class="text-white main-header-content">
                <h1 class="font-bold text-5xl mb-5">{{$t("home.listen")}}</h1>
                <p class="w-full md:w-8/12 mx-auto">{{$t("home.listen_description")}}
                </p>
            </div>
            </div>

            <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="/assets/img/introduction-music.png" />
        </section>

        <!-- Main Content -->
        <section class="container mx-auto">
            <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                <span class="card-title">Songs</span>
                <!-- Icon -->
                <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
            </div>
            <!-- Playlist -->
            <ol id="playlist">
                <app-song-item v-for="song in songs" :key="song.id" :song="song"></app-song-item>
            </ol>
            <!-- .. end Playlist -->
            </div>
        </section>
    </div>
</template>
<script>
import { songsCollection } from '@/includes/firebase'
import AppSongItem from '@/components/AppSongItem.vue'
export default {
    name: 'HomeView',
    components: {
        AppSongItem
    },
    created() {
        this.getSongs()
        document.addEventListener('scroll', this.handleScroll)
    },
    data() {
        return {
            songs: [],
            maxPerRequest: 10,
            isReqPending: false
        }
    },
    methods: {
        async getSongs() {
            if (this.isReqPending) return
            this.isReqPending = true
            let songsSnapshot

            if (this.songs.length) {
                const getLastSong = await songsCollection.doc(this.songs[this.songs.length - 1].id).get()

                songsSnapshot = await songsCollection
                    .orderBy('modified_name')
                    .startAfter(getLastSong)
                    .limit(this.maxPerRequest)
                    .get()
            } else {
                songsSnapshot = await songsCollection.orderBy('modified_name')
                    .limit(this.maxPerRequest)
                    .get()
            }
            songsSnapshot.forEach(doc => {
                this.songs.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            this.isReqPending = false
        },
        handleScroll() {
            const { scrollTop, offsetHeight } = document.documentElement
            const { innerHeight } = window

            if (Math.round(scrollTop + innerHeight) >= offsetHeight) {
                this.getSongs()
            }
        }
    },
    beforeUnmount() {
        document.removeEventListener('scroll', this.handleScroll)
    }
}
</script>
