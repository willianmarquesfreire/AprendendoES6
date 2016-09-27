class WElement {

    constructor(element, width, height, border) {
        this.element = element
        this.width = width
        this.height = height
        this.border = border
        console.log(this.getClassName().concat(' Created!'))
    }

    createElement(element) {
        return document.createElement(element)
    }
    get element() {
        return this._element
    }
    set element(element) {
        this._element = this.createElement(element)
    }
    get attributes() {
        return this.element.attributes
    }
    setAttribute(attr, value) {
        this.element.setAttribute(attr, value)
        return this
    }
    setStyle(attr, value) {
        this.setAttibute('style', attr + ': ' + value)
        return this
    }
    setSize(width, height) {
        this.width === width
        this.height === height
        return this
    }
    set width(width) {
        this.element.setAttribute('style', 'width: '.concat(width))
        return this
    }
    set height(height) {
        this.element.setAttribute('style', 'height: '.concat(height))
        return this
    }
    set border(border = '1px solid black') {
        this.element.setAttribute('style', 'border: '.concat(border))
        return this
    }
    addChild(child) {
        this.element.appendChild(child)
        return this
    }
    addToBody() {
        document.body.appendChild(this.element)
        return this
    }
    addToElementById(id) {
        document.getElementById(id).appendChild(this.element)
        return this
    }
    addToElementByClassName(className) {
        document.getElementsByClassName(className).appendChild(this.element)
        return this
    }
    getClassName() {
        return this.constructor.name
    }
}

export default WElement