/**
 * Generic class to elements
 * @class
 */
class WElement {

    constructor(element, width, height, border) {
        this.element = element
        this.width = width
        this.height = height
        this.border = border
        console.log(this.getClassName().concat(' Created!'))
    }
    get hashcode() {
        let hash = this.constructor.name
            .split("")
            .reduce(function (a, b) {
                a = ((a << 5) - a)
                    + b.charCodeAt(0); return a & a
            }, 0);
        let hashcode = ""
        for (var i = 0; i < 10; i++) {
            hashcode = hashcode.concat(String.fromCodePoint(Math.round(Math.random() * 100) + 4))
        }
        return (hash + ".*wmf*." + hashcode).trim()
    }
    get type() {
        return this.constructor.name
    }
    get id() {
        return this.element.id
    }
    set id(id) {
        this.element.id = id
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
    /**
     * Create a element
     * @param {string} element Type of element
     * @example WElement element = new WElement('p')
     */
    createElement(element) {
        return document.createElement(element)
    }
    /**
     * Set the id of element
     * @param {string} id Id of element
     */
    setId(id) {
        this.element.id = id
        return this
    }
    /**
     * Set Attribute to element
     * @param {string} attr Attribute of element
     * @param {string} value Value of attribute
     * @example element.setAttribute('width','10')
     */
    setAttribute(attr, value) {
        this.element.setAttribute(attr, value)
        return this
    }
    /**
     * Set Style of element
     * @param {string} attr Attribute of style
     * @param {string} value Value of attributey
     * @example element.setStyle('color','red')
     */
    setStyle(attr, value) {
        this.setAttibute('style', attr + ': ' + value)
        return this
    }
    /**
     * Set size of element
     * @param {number} width Width of element
     * @param {number} height Height of element
     */
    setSize(width, height) {
        this.width = width
        this.height = height
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
    /**
     * Add Child to Element
     * @param {Object} child Child to append on element
     */
    addChild(child) {
        this.element.appendChild(child)
        return this
    }
    /**
     * Add current element to body
     */
    addToBody() {
        document.body.appendChild(this.element)
        return this
    }
    /**
     * Add current element to element with specified id
     * @param {string} id Id of element
     */
    addToElementById(id) {
        document.getElementById(id).appendChild(this.element)
        return this
    }
    /**
     * Add current element to element with specified className
     * @param {string} className Class of element
     */
    addToElementByClassName(className) {
        document.getElementsByClassName(className).appendChild(this.element)
        return this
    }
    /**
     * Get name of current Class
     */
    getClassName() {
        return this.constructor.name
    }
}

export default WElement