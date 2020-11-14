<template>
    <div>
        <hr>
            Total {{ count }} Recipe's
        <hr>

        <div class="row">
            <recipeBox v-for="(recipe, key) of list" :key="key" :recipe=recipe />
        </div>
    </div>
</template>

<script>
import recipeBox from "@/components/recipeBox"

export default {
    name: 'app',
    components: { recipeBox },
    data() {
        return {
            retryRefreshImage: {}
        }
    },
    computed: {
        list(){
            return this.$store.getters["recipes/list"]
        },
        count(){
            return this.$store.getters["recipes/count"]
        }
    },
    mounted() {
        this.$store.dispatch("recipes/getList")
        this.$store.dispatch("recipes/getCount")
    }
}
</script>