class Canvas {
    constructor() {
        console.log(document.body)
        this._canvas = document.createElement('canvas')
        this._canvas.style.height = 200
        this._canvas.style.width = 200
        this._canvas.style.border = '1px solid black'
    }
    setHeight(height) {
        this._canvas.style.height = height
    }
    setWidth(width) {
        this._canvas.style.width = width
    }
    setBorder(border) {
        this._canvas.style.border = border
    }
    appendCanvas(parent) {
        parent.appendChild(this.canvas)
    }
    getCanvas() {
        return this._canvas
    }
};

export default Canvas