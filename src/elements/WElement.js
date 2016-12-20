/**
 * Generic class to elements
 * @class
 */
class WElement {

    constructor(element, configuration) {
        this.element = element
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
     * Add Content to Element
     * @param {Object} content Content to append on element
     */
    addContent(content) {
        this.element.innerHTML = content
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
        this.element.style[attr] = value
        return this
    }
    /**
     * Set Configuration of element
     * @param {Object} configuration Configuration to apply
     */
    config(configuration) {
        for (let prop in configuration) {
            if (prop === 'id') {
                this.setId(configuration[prop])
                continue;
            }
            if (prop === 'className') {
                this.set
            }
            if (configuration.hasOwnProperty(prop)) {
                this.setStyle(prop,configuration[prop])
            }
        }
        return this
    }
    /**
     * Add Child to Element
     * @param {Object} child Child to append on element
     */
    addChild(child) {
        this.element.appendChild(child.element)
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