<template >
    <div class="text-white text-center mb-4 rounded font-bold py-3" :class="bgColor">
        {{ message }}
    </div>
</template>
<script>
export default {
    name:'AppAlert',
    props:{
        bgColor:{
            type:String,
            default:'bg-red-500'
        },
        message:{
            type:String,
            default:''
        }
    }
}
</script>
