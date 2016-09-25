class Element {

    constructor(element, width, height, border) {
        this.setElement(element)
        this.setWidth(width)
        this.setHeight(height)
        this.setBorder(border)
        console.log(this.getClassName().concat(' Created!'))
    }
    
    createElement(element) {
        return document.createElement(element)
    }
    getElement() {
        return this._element
    }
    setElement(element) {
        this._element = this.createElement(element)
    }
    getAttributes() {
        return this.getElement().attributes
    }
    setAttribute(attr, value) {
        this.getElement().setAttribute(attr, value)
    }
    setStyle(attr, value) {
        this.setAttibute('style', attr + ': ' + value)
    }
    setSize(width, height) {
        this.setWidth(width)
        this.setHeight(height)
    }
    setWidth(width = 200) {
        this.getElement().setAttribute('style', 'width: '.concat(width))
        return this.getElement()
    }
    setHeight(height = 200) {
        this.getElement().setAttribute('style', 'height: '.concat(height))
        return this.getElement()
    }
    setBorder(border = '1px solid black') {
        this.getElement().setAttribute('style', 'border: '.concat(border))
        return this.getElement()
    }
    addChild(child) {
        this.getElement().appendChild(child)
        return this.getElement()
    }
    addToBody() {
        document.body.appendChild(this.getElement())
        return this.getElement()
    }
    addToElementById(id) {
        document.getElementById(id).appendChild(this.getElement())
        return this.getElement()
    }
    addToElementByClassName(className) {
        document.getElementsByClassName(className).appendChild(this.getElement())
        return this.getElement()
    }
    getClassName() {
        return this.constructor.name
    }
}

export default Element