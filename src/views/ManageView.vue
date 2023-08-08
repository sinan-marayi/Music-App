<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload :addSong="addSong"></app-upload>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <app-composition-item v-for="(song,index) in songs" :key="song.id" :song="song" :index="index" :updateSong="updateSong"
             :removeSong="removeSong" :unSavedChangeManage="unSavedChangeManage">
            </app-composition-item>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import useUserStore from '@/stores/user'
import AppCompositionItem from '../components/AppCompositionItem.vue';
import AppUpload from '../components/AppUpload.vue';
import { songsCollection, auth } from '@/includes/firebase'


export default {
  name: 'ManageView',
  components: {
    AppUpload,
    AppCompositionItem
  },
  async created() {
    const data = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    data.forEach(doc => {
      this.addSong(doc)
    })
  },
  data() {
    return {
       songs: [],
       isUnsavedChanges: false
    }
  },
  methods:{
    updateSong(index, song){
      this.songs[index].modified_name = song.modified_name
      this.songs[index].genre = song.genre
    }, 
    removeSong(index){
      this.songs.splice(index, 1)
    },
    addSong(doc){
      this.songs.push({
         id: doc.id,
        ...doc.data()
        })
    },
    unSavedChangeManage(value){
      this.isUnsavedChanges = value
    }
  },
  beforeRouteLeave (to, from, next) {
    if(this.isUnsavedChanges){
      const answer = window.confirm('You have unsaved changes. Are you sure you want to leave?')
      if(answer){
        next()
      }else{
        next(false)
      }
    }else{
      next()
    }
  }
}


  // local auth guard

  // beforeRouteEnter(to, from, next) {  
  //   const user = useUserStore()
  //   if(user.$state.isLoggedIn){
  //     next()
  //   }else{
  //     next({name: 'home'})
  //   }
  // }

</script>