<template>
    <div>
        <h3>{{ recipe.name }}</h3>

        <div class="row">
            <div v-for="(img, key) of photos" :key="key" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card">
                    <img class="card-img" alt="100%x260" :src="img" data-holder-rendered="true" style="height: 260px; width: 100%; display: block;">
                </div>
            </div>
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
        recipe(){
            return this.$store.getters["recipes/data"]
        },
        photos(){
            return this.recipe && this.recipe.photos || []
        }
    },
    mounted() {
        this.$store.dispatch("recipes/getById", this.$route.params.id)
    }
}
</script>