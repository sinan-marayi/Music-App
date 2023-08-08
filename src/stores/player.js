import {defineStore} from 'pinia';

export default defineStore('player',{
    state:()=>({
        song:{}
    }),
    actions:{
        setSong(song){
            this.song = song;
        }
    }
})