<template>
    <div>
        <div class="row" v-if="isPreview">
            <div class="col-md-2">
                <a :href="`/recipe/${recipeId}/update`" class="btn btn-primary form-control">Update</a>
            </div>
            <div class="col-md-2">
                <button class="btn btn-danger form-control" @click="deleteById">Delete</button>
            </div>
        </div>
        <br>

        <div class="container">

            <div class="form-group row">
                <label for="inputName" class="col-md-2 col-form-label">Name</label>
                <div class="col-md-10">
                    <input type="text" class="input form-control" id="inputName" placeholder="Name" v-model="data.name" :readonly="isPreview">
                </div>
            </div>

            <div class="form-group row">
                <label for="inputName" class="col-md-2 col-form-label">Type</label>
                <div class="col-md-10">
                    <select class="input form-control" v-model="data.type" :readonly="isPreview">
                        <option value="main course">Main Course</option>
                        <option value="dessert">Dessert</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="drink">Drink</option>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-2 col-form-label">Photos</label>
                <div class="col-md-10">
                    <div class="form-row" v-if="!isPreview">
                        <div class="form-group col-md-1">
                            <button class="btn btn-success form-control" v-b-modal.modal-1>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="form-group col-md-11"><hr></div>
                    </div>
                    <div class="row">
                        <div v-for="(img, key) of data.photos" :key="key" class="col-xs-12 col-md-6 col-md-4 col-lg-3">
                            <div class="card">
                                <img class="card-img" alt="100%x260" :src="img" data-holder-rendered="true" style="height: 260px; width: 100%; display: block;">
                                <div v-if="!isPreview" class="card-body">
                                    <button class="btn btn-danger" @click="(data.photos.splice(key, 1))">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-2 col-form-label">Description</label>
                <div class="col-md-10">
                    <textarea class="form-control" id="inputDescription" rows="3" v-model="data.description" :readonly="isPreview"></textarea>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-2 col-form-label">Ingredients</label>
                <div class="col-md-10">
                    <div class="form-row">
                        <div class="form-group col-md-8">
                            <label for="inputCity">Name</label>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputState">Qty</label>
                        </div>
                    </div>
                    <div class="form-row" v-for="(ing, key) of data.ingredients" :key="key">
                        <div class="form-group col-md-8">
                            <input type="text" class="form-control input" :readonly="isPreview" v-model="ing.name">
                        </div>
                        <div class="form-group col-md-3">
                            <input type="text" class="form-control input" :readonly="isPreview" v-model="ing.qty">
                        </div>
                        <div class="form-group col-md-1" v-if="!isPreview">
                            <button class="btn btn-danger form-control" @click="(data.ingredients.splice(key, 1))">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-11"><hr></div>
                        <div class="form-group col-md-1" v-if="!isPreview">
                            <button class="btn btn-success form-control" @click="(data.ingredients.push({name: ``, qty:``}))">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-md-2 col-form-label">Steps</label>
                <div class="col-md-10">
                    <div class="form-row" v-for="(step, key) of data.steps" :key="key">
                        <div class="form-group col-md-11">
                            <input type="text" class="form-control input" :readonly="isPreview" v-model="data.steps[key]">
                        </div>
                        <div class="form-group col-md-1" v-if="!isPreview">
                            <button class="btn btn-danger form-control" @click="(data.steps.splice(key, 1))">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-11"><hr></div>
                        <div class="form-group col-md-1" v-if="!isPreview">
                            <button class="btn btn-success form-control" @click="(data.steps.push(``))">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group row" v-if="!isPreview">
                <label class="col-md-2 col-form-label"></label>
                <div class="col-md-10">
                    <div class="form-group col-md-5">
                        <button class="btn btn-success form-control" @click="save">Save</button>
                    </div>
                </div>
            </div>

        </div>

        <b-modal ref="fileUpload" hide-footer id="modal-1" title="Upload File">
            <div class="field">
                <label class="label">Photo</label>
                <div class="control">
                    <FileUploader :multiple="false" @onFilesUploaded="fileUploaded"></FileUploader>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import recipeBox from "@/components/recipeBox"
import FileUploader from "@/components/FileUploader"
import B from 'bluebird'

export default {
    name: 'recipeForm',
    components: { recipeBox, FileUploader },
    data() {
        return {
            data: {
                _id: null,
                name: "",
                description: "",
                type: "",
                photos: [],
                steps: [],
                ingredients: []
            },
            retryRefreshImage: {}
        }
    },
    computed: {
        recipeId(){
            return this.$route.params.id
        },
        isPreview(){
            return !["recipeEdit","recipeAdd"].includes(this.$route.name)
        }
    },
    methods: {
        resetForm(){
            this.temp = {
                name: "",
                type: "",
                photos: [],
                steps: [],
                Ingredients: []
            }
        },
        deleteById(){
            B.try(() => this.$store.dispatch("recipes/deleteById", this.recipeId))
            .then(result => {
                if(result) this.$router.push({ path: '/' })
            })
        },
        save(){
            B.try(() => this.$store.dispatch("recipes/save", this.data))
            .then(result => {
                if(result) {
                    let path = "/";
                    if (typeof result == "string") path = `/recipe/${result}`
                    else if(this.data._id) path = `/recipe/${this.data._id}`
                    this.$router.push({
                        path
                    })
                }
            })
        },
        loadData(){
            if(this.recipeId){
                B.try(() => this.$store.dispatch("recipes/getById", this.recipeId))
                .then(result => {
                    if(result) {
                        this.resetForm();
                        this.data = result
                    }
                })
            }
        },
        fileUploaded(files){
            const file = files && files[0]
            if(file && file.url)
                this.data.photos.push(file.url)

            this.$refs['fileUpload'].hide()
        }
    },
    mounted() {
        this.loadData();
    }
}
</script>

<style lang="scss" scoped>
input[readonly], select[readonly], textarea[readonly]  {
    background-color:transparent;
    border: 0;
}
</style>