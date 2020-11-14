<template>
    <div
        id="recipeLayout"
        class="container">
        <h1>AccelByte Recipe's</h1>
        <div v-if="!isRoot">
            <hr>
                <a href="/" class="btn btn-primary">Back</a>
            <hr>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>


export default {
    name: 'recipeLayout',
    data() {
        return {}
    },
    computed: {
        isRoot(){
            return this.$route.path == "/"
        }
    }
}
</script>

<style lang="scss" scoped>
#recipeLayout {
    h1 {
        margin-top: 10px;
    }
}
</style>