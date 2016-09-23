class Element {
    constructor(element) {
        this._element = document.createElement(element)
    }
    getElement() {
        return this._element
    }
    getAttributes() {
        return this._element.attributes
    }
}

export default Element