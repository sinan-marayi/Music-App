import { defineStore } from 'pinia'
import { Howl } from 'howler'
import formatTime from '../helpers/timerFormat'

export default defineStore('player', {
  state: () => ({
    song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: 0
  }),
  actions: {
    setSong(song) {
      if(this.song.modified_name) {
        this.sound.unload()
      }
      this.song = song
      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()

      this.sound.on('play', this.progress)
    },
    togglePlay() {
      if (!this.sound.playing) {
        return
      }

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    progress() {
      this.seek = formatTime(this.sound.seek())
      this.duration = formatTime(this.sound.duration())

      this.playerProgress = (this.sound.seek() / this.sound.duration()) * 100 + '%'

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
    },
    setSeek(e) {
      const { x ,width} = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - x

      const seek = (this.sound.duration() / width) * clickX

      this.sound.seek(seek)
      this.sound.once('seek', this.progress)
    }
  },
  getters: {
    isPlaying: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }
      return false
    }
  }
})
