<template>
    <div>
        hello detail
    </div>
    
</template>

<script>
export default {
    name: 'detail',
    mounted(){
        console.log(this.$route.params.id)
    }
}
</script>

<style>

</style>
