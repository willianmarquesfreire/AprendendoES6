import WElement from '../elements/WElement.js'

class WImage extends WElement{
    constructor(src) {
        super('img')
        if (src) this.setSrc(src)
    }
    getImage() {
        return this._image
    }
    setSrc(src) {
        this._src = super.setAttribute('src', src)
    }
    getSrc(src) {
        return this._src
    }
}

export default WImage