<template>
    <div class="border  border-gray-200 p-3 mb-4 rounded">
        <div v-if="!isFormShow">
            <h4 class="inline-block text-sm md:text-2xl font-bold">{{ song.modified_name }}</h4>
            <button @click.prevent="deleteSong" class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                <i class="fa fa-times"></i>
            </button>
            <button @click.prevent="isFormShow = true"
                class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
                <i class="fa fa-pencil-alt"></i>
            </button>
        </div>
        <div v-if="isFormShow">
            <app-alert v-if="showAlert" :bgColor="alertVariant" :message="alertMessage"></app-alert>
            <vee-form @submit="editForm" :validation-schema="editSchema" :initial-values="{
                modified_name: song.modified_name,
                genre: song.genre
            }">
                <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <vee-field type="text" name="modified_name" @input="unSavedChangeManage(true)"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Song Title" />
                    <vee-error name="modified_name" class="text-red-400 text-sm"></vee-error>
                </div>
                <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <vee-field type="text" name="genre" @input="unSavedChangeManage(true)"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Genre" />
                    <vee-error name="genre" class="text-red-400 text-sm"></vee-error>

                </div>
                <button :disabled="inSubmission" type="submit"
                    class="py-1.5 px-3 rounded text-white bg-green-600 disabled:opacity-50">
                    Submit
                </button>
                <button :disabled="inSubmission" @click.prevent="isFormShow = false" type="button"
                    class="ml-4 py-1.5 px-3 rounded text-white bg-gray-600 disabled:opacity-50">
                    Go Back
                </button>
            </vee-form>
        </div>
    </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase'
import AppAlert from './AppAlert.vue'


export default {
    name: 'AppCompositionItem',
    components: {
        AppAlert
    },
    props: {
        song: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        updateSong: {
            type: Function,
            required: true
        },
        removeSong:{
            type: Function,
            required: true
        },
        unSavedChangeManage: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            isFormShow: false,
            editSchema: {
                modified_name: 'songTitleValidation',
                genre: ''
            },
            inSubmission: false,
            showAlert: false,
            alertMessage: '',
            alertVariant: 'bg-blue-400'
        }
    },
    methods: {
        async editForm(values) {
            this.inSubmission = true
            this.showAlert = true
            this.alertVariant = 'bg-blue-400'
            this.alertMessage = 'please wait... updating song info'

            try {
                await songsCollection.doc(this.song.id).update({
                    modified_name: values.modified_name,
                    genre: values.genre
                })
            } catch (error) {
                this.inSubmission = false
                this.showAlert = true
                this.alertVariant = 'bg-red-400'
                this.alertMessage = 'Oops! Something went wrong. Please try again later.'

                console.log(error)
            }
            this.isFormShow = false
            this.updateSong(this.index, values)
            this.unSavedChangeManage(false)

            this.inSubmission = false
            this.showAlert = true
            this.alertVariant = 'bg-green-400'
            this.alertMessage = 'Song info updated successfully.'
        },
        async deleteSong() {
            const ref = storage.ref()
            const songRef= ref.child(`songs/${this.song.original_name}`);
    
            await songRef.delete();
            await songsCollection.doc(this.song.id).delete();

            this.removeSong(this.index)
        }
    },
}
</script>   