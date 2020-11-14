const loadingImg = "https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif"
const defaultImg = "https://dummyimage.com/600x400/141acc/ffffff&text=Recipe%20AccelByte"

const detectBadImg = ["bad", "not_found"]

export default {
    methods: {
        imageLoadError(event){

            if (detectBadImg.includes(event.target.src))
                return event.target.src = defaultImg

            const thumb = event.target.getAttribute("thumbnail")
            const original = event.target.getAttribute("original")

            if (thumb && (!this.retryRefreshImage[thumb] || this.retryRefreshImage[thumb] < 3))
            {
                this.retryRefreshImage[thumb] = (this.retryRefreshImage[thumb] || 0) + 1
                event.target.src = loadingImg
                setTimeout(function (){
                    event.target.src = thumb
                    console.log("loaded: ", thumb)
                }, 2000);
            }
            else if (original && (!this.retryRefreshImage[original] || this.retryRefreshImage[original] < 3))
            {
                this.retryRefreshImage[original] = (this.retryRefreshImage[original] || 0) + 1
                event.target.src = loadingImg
                setTimeout(function () {
                    event.target.src = original
                    console.log("loaded: ", original)
                }, 2000);
            }
            else
            {
                event.target.src = defaultImg
            }
        }
    }
}
