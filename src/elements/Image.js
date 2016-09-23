import Element from '../elements/Element.js'

class Image extends Element{
    constructor() {
        super('img')
        this._image = super.getElement()
        this._image.style.height = 200
        this._image.style.width = 200
        this._image.src = "https://media.licdn.com/media/AAEAAQAAAAAAAANbAAAAJDE5NjBkNDk1LTY3ZGQtNDA0NS04YTJiLTdkNmU3NjZiNjI3Mg.png"
    }
    getImage() {
        return this._image
    }
    setSize(width,height) {
        this._image.style.height = height
        this._image.style.width = width
    }
}

export default Image