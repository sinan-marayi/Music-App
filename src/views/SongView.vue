<template>
    <main>
        <!-- Music Header -->
        <section class="w-full mb-8 py-14 text-center text-white relative">
            <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
                style="background-image: url(/assets/img/song-header.png)"></div>
            <div class="container px-4 mx-auto flex items-center">
                <!-- Play/Pause Button -->
                <button @click.prevent="setSong(song)" type="button" class="z-50 h-12 w-12 md:h-24 md:w-24 text-sm sm:text-base  md:text-3xl bg-white text-black rounded-full focus:outline-none">
                    <i class="fas fa-play"></i>
                </button>
                <div class="z-50 text-left ml-8">
                    <!-- Song Info -->
                    <div class="text-sm sm:text-base  md:text-3xl font-bold">{{ song.modified_name }}</div>
                    <div>{{ song.genre }}</div>
                </div>
            </div>
        </section>
        <!-- Form -->
        <section id="comments" class="container mx-auto mt-6">
            <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                    <!-- Comment Count -->
                    <span class="card-title">Comments ({{ song.comment_count }})</span>
                    <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
                </div>
                <div v-if="isLoggedIn" class="p-6">
                    <app-alert v-if="showAlert" :bgColor="alertVariant" :message="alertMsg"></app-alert>
                    <vee-form :validation-schema="schema" @submit="addComment">
                        <vee-field as="textarea" name="comment"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                            placeholder="Your comment here..."></vee-field>
                        <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block">
                            Submit
                        </button>
                    </vee-form>
                    <!-- Sort Comments -->
                    <select v-model="sort"
                        class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                        <option value="1">Latest</option>
                        <option value="2">Oldest</option>
                    </select>
                </div>
            </div>
        </section>
        <!-- Comments -->
        <ul class="container mx-auto">
            <app-comment-item v-for="comment in sortedComments" :key="comment.id" :comment="comment"></app-comment-item>
        </ul>
    </main>
</template>

<script>
import { songsCollection, commentsCollection, auth } from '@/includes/firebase'
import AppAlert from '../components/AppAlert.vue'
import AppCommentItem from '@/components/AppComments.vue'
import { mapState, mapActions } from 'pinia'
import useUserStore from '@/stores/user'
import usePlayerStore from '@/stores/player'

export default {
    name: 'SongView',
    components: {
        AppAlert,
        AppCommentItem
    },
    async created() {
        const songSnapsot = await songsCollection.doc(this.$route.params.id).get()
        if (!songSnapsot.exists) {
            this.$router.push({ name: 'home' })
            return
        }
        const {sort} = this.$route.query
        this.sort = sort === '1' || sort === '2' ? sort : '1'

        this.song = songSnapsot.data()
        this.getComments()
    },
    data() {
        return {
            song: {},
            schema: {
                comment: 'required|min:3'
            },
            inCommentSubmission: false,
            showAlert: false,
            alertMsg: '',
            alertVariant: '',
            comments: [],
            sort: '1'
        }
    }, computed: {
        ...mapState(useUserStore, ['isLoggedIn']),
        sortedComments() {
            return this.comments.slice().sort((a, b) => {
                if (this.sort === '1') {
                    return new Date(b.created_at) - new Date(a.created_at)
                }
                return new Date(a.created_at) - new Date(b.created_at)
            })
        }
    },
    watch: {
        sort(newValue) {
            if (this.sort === newValue){
                return
            }
            this.$router.push({ query: { sort: newValue } })
        }
    },
    methods: {
        ...mapActions(usePlayerStore, ['setSong']),
        async addComment(values, context) {
            console.log(values)
            this.inCommentSubmission = true
            this.showAlert = true
            this.alertVariant = 'bg-blue-400'
            this.alertMsg = 'Adding comment...'

            try {
                const data = {
                    song_id: this.$route.params.id,
                    comment: values.comment,
                    created_at: new Date().toString(),
                    uid: auth.currentUser.uid,
                    displayName: auth.currentUser.displayName
                }
                await commentsCollection.add(data)
            } catch (error) {
                console.log(error)
                this.alertVariant = 'bg-red-400'
                this.alertMsg = 'Error adding comment...'
                this.inCommentSubmission = false
                return
            }

            this.getComments()

            this.song.comment_count += 1
            await this.updateCommentCount(this.song.comment_count)

            this.alertVariant = 'bg-green-400'
            this.alertMsg = 'Comment added successfully...'
            this.inCommentSubmission = false
            context.resetForm()
        },
        async getComments() {
            const commentsSnapshot = await commentsCollection
                .where('song_id', '==', this.$route.params.id)
                .get()

            this.comments = []

            commentsSnapshot.forEach(doc => {
                this.comments.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        },
        async updateCommentCount(count){
            await songsCollection.doc(this.$route.params.id).update({
                comment_count: count
            })
        }
    },
}
</script>