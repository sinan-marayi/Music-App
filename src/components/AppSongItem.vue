<template>
    <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50">
        <div>
            <router-link :to="{ name: 'song', params: { id: song.id } }" class="font-bold block text-gray-600">{{ song.modified_name
            }}</router-link>
            <span class="text-gray-500 text-sm">{{ song.dispaly_name }}</span>
        </div>
        <router-link custom v-slot="{navigate}" :to="{ name: 'song', params: { id: song.id }, hash:'#comments' }">
            <div class="text-gray-600 text-lg">
                <span class="comments">
                    <i @click="navigate" class="fa fa-comments text-gray-600"></i>
                    {{ song.comment_count }}
                </span>
            </div>
        </router-link>
    </li>
</template>

<script>

export default {
    name: 'AppSongItem',
    props: {
        song: {
            type: Object,
            required: true
        }
    }
}
</script>