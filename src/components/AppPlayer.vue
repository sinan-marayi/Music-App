<template>
  <div v-if="song.modified_name" class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">{{ song.modified_name }}</span> by
      <span class="song-artist">{{ song.displayName }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button @click.prevent="togglePlay" type="button">
        <i class=" text-gray-500 text-xl" :class="{ 'fa fa-play': !isPlaying, 'fa fa-pause': isPlaying }"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div @click.prevent="setSeek" class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" v-bind:style={left:playerProgress}>
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span  class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400" :style ={width:playerProgress}></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import usePlayerStore from '@/stores/player'

export default {
  name: 'AppPlayer',
  computed: {
    ...mapState(usePlayerStore, ['song', 'isPlaying', 'seek', 'duration', 'playerProgress'])
  },
  methods: {
    ...mapActions(usePlayerStore, ['togglePlay','setSeek'])
  }
}
</script>