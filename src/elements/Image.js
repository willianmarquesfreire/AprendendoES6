import Element from '../elements/Element.js'

class Image extends Element{
    constructor(src) {
        super('img')
        this.setSrc(src)
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

export default Image