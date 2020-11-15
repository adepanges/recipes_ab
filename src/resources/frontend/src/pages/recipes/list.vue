<template>
    <div>
        <hr>
            <div class="row">
                <div class="col-md-2">
                    <span class="align-middle">Total {{ count }} Recipe's</span>
                </div>
                <div class="col-md-2">
                    <a :href="`/recipe/add`" class="btn btn-success form-control">Add</a>
                </div>
            </div>
        <hr>
            <div class="row">
                <div class="col-md-3">
                    <input type="text" class="input form-control" placeholder="Search.." v-model="filterKeyword">
                </div>
                <div class="col-md-3">
                    <select class="input form-control" v-model="filterType">
                        <option value="">All</option>
                        <option value="main course">Main Course</option>
                        <option value="dessert">Dessert</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="drink">Drink</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-warning form-control" @click="load">Filter</button>
                </div>
            </div>
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
    data: () => ({
        retryRefreshImage: {},
        filterKeyword: "",
        filterType: "",
    }),
    computed: {
        list(){
            return this.$store.getters["recipes/list"]
        },
        count(){
            return this.$store.getters["recipes/count"]
        }
    },
    methods: {
        load(){
            let filter = {}

            if(this.filterKeyword) filter.keyword = this.filterKeyword
            if(this.filterType) filter.type = this.filterType

            this.$store.commit("recipes/filter", filter)
            this.$store.dispatch("recipes/getList")
            this.$store.dispatch("recipes/getCount")
        }
    },
    mounted() {
        this.load()
    }
}
</script>