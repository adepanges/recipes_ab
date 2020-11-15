<template>
    <div class="recipe-box col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card">
            <img class="card-img-top" :src="coverImg" alt="Card image cap" @error="imageLoadError">
            <div class="card-body">
                <h5 class="card-title">{{ recipe.name }}</h5>
                <p class="card-text">{{ recipe.type }}</p>
                <a :href="`/recipe/${recipe._id}`" class="btn btn-primary">Detail</a>
            </div>
        </div>
    </div>
</template>

<script>

import ImageErrorHandler from "@/mixins/ImageErrorHandler"

export default {
    name: 'recipeBox',
    props: ['recipe'],
    mixins: [ImageErrorHandler],
    data: () => ({
        retryRefreshImage: {}
    }),
    computed: {
        coverImg(){
            return this.recipe && this.recipe.photos && this.recipe.photos[0] || "not_found"
        }
    }
}

</script>

<style lang="scss" scoped>
.recipe-box {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>