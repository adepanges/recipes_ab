<template>
    <div class="row">
        <div class="col-md-12">
            <input class="form-control input" refs="fileupload" type="file" :multiple="multiple" accept="image/*" @change="detectFiles($event.target.files)">
        </div>
        <div class="col-md-12">
            <progress class="progress is-primary" :value="progress" max="100">{{ progress }}%</progress>
        </div>

        <!-- <div v-if="!isLoading && files.length" class="columns is-multiline">
            <figure class="image is-128x128 is-half" v-for="(file, key) in files" :key="key">
                <img :src="file.thumbnail || file.url" :thumbnail="file.thumbnail || file.url" :original="file.url" @error="imageLoadError">
            </figure>
        </div>

        <div v-else-if="isLoading" class="columns is-multiline">
            uploading...
        </div> -->

    </div>
</template>

<script>

import B from "bluebird"
import ImageErrorHandler from "@/mixins/ImageErrorHandler"
import firebase from "firebase"
import slugify from "slugify";

const firebaseStorage = firebase.storage().ref("/images/recipes/")

export default {
    name: 'FileUploader',
    props: ['multiple'],
    mixins: [ImageErrorHandler],
    data: () => ({
        retryRefreshImage: {},
        progressUpload: {},
        promisesUploadTask: [],
        progress: 0,
        files: [],
        isLoading: false,
    }),
    computed: {
        firebaseToken(){
            return this.$store.getters["firebase/token"]
        },
        baseUrl(){
            return this.$store.getters["firebase/storageBaseUrl"]
        }
    },
    methods: {
        onFilesUploaded(files){
            const tmp = []
            // convert plain object js
            Array.from(files).forEach(file => {
                tmp.push(Object.assign({}, file))
            })
            this.$emit('onFilesUploaded', tmp)
            return tmp
        },
        detectFiles (fileList) {
            this.reset()
            this.isLoading = true
            return B.try(() => this.initTokenFirebase())
            .then(() => {
                (Object.keys(fileList)).map(key => {
                    this.promisesUploadTask.push(this.upload(fileList[key]))
                })
                return B.all(this.promisesUploadTask)
            })
            .then(() => {
                this.promisesUploadTask = []
                this.isLoading = false
                this.onFilesUploaded(this.files)
            })
            .catch(error => {
                console.log(error)
            })
        },
        initTokenFirebase(){
            return B.try(() => {
                if (this.firebaseToken) return this.firebaseToken
                else return this.$store.dispatch("firebase/getToken")
            })
            .then(token => {
                return firebase.auth().signInWithCustomToken(token)
            })
        },
        upload (file) {
            const self = this
            const originalName = (file.name || "").replace(/[#_]/g,'-').split('.')
            const ext = originalName.pop() || ".jpg"
            const fileName = `accelbyte-${slugify(originalName.join(" "), {
                lower: true,
            })}-${this.makeId(5)}.${ext}`
            const uploadTask = firebaseStorage
            .child(fileName)
            .put(file)

            uploadTask.on('state_changed',
                (snapshot) => {
                    self.setProgress(snapshot)
                }
            )
            return uploadTask
        },
        makeId(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        generateUrl(fileName){
            const [name, extension] = (fileName || "").split(".")
            return {
                url: `${this.baseUrl}/images/recipes/${fileName}`,
                thumbnail: `${this.baseUrl}/images/recipes/thumb/${name}_200x200.${extension}`,
                medium: `${this.baseUrl}/images/recipes/thumb/${name}_600x600.${extension}`,
            }
        },
        setProgress(snapshot){
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            if(progress == 100){
                this.files.push(this.generateUrl(snapshot.ref.name))
            }

            this.progressUpload[snapshot.ref.name] = progress
            this.progress = Number(Object.values(this.progressUpload).reduce((a, b) => Number(a) + Number(b), 0)) / Object.keys(this.progressUpload).length
        },
        reset(){
            this.files = []
            this.progressUpload = {}
            this.promisesUploadTask = []
        },
    }
}

</script>

<style lang="scss" scoped>

input[type="file"], .progress {
    margin-bottom: 10px;
    width: 100%;
}

div.columns {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;

    figure {
        margin-left: 5px;
    }
}

</style>