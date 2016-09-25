import WElement from './WElement'
import WType from '../enums/WType'

class WCanvas extends WElement {
    constructor() {
        super('canvas')
        this._context = this.context2D
    }
    get context () {
        return this._context
    }
    set context (ctx) {
        return this._context = this.getContext(ctx)
    }
    get context2D () {
        return this.getElement().getContext('2d')
    }
    get context3D () {
        return this.getElement().getContext('3d')
    }
    drawLine(beginX, beginY, endX, endY) {
        this.moveTo(beginX, beginY)
        this.lineTo(endX, endY)
        this.stroke()
    }
    drawSquare(x, y, width, height, type) {
        switch (type) {
            case WType.STROKE:
                this.strokeRect(x, y, width, height, type)
                break
            case WType.CLEAR:
                this.clearRect(x, y, width, height, type)
                break
            default:
                this.fillRect(x, y, width, height, type)
        }
    }
    drawTriangle(x, y, x1, y1, x2, y2, type) {
        this.beginPath()
        this.moveTo(x, y)
        this.lineTo(x1, y1)
        this.lineTo(x2, y2)

        switch (type) {
            case WType.STROKE:
                this.stroke()
                break
            case WType.CLEAR:
                this.clear()
                break
            default:
                this.fill()
        }
    }
    drawTriangleByDimension(x, y, dimension, type) {
        this.beginPath()
        this.moveTo(x, y)
        this.lineTo(x - dimension, y + dimension)
        this.lineTo(x + dimension, y + dimension)

        switch (type) {
            case WType.STROKE:
                this.stroke()
                break
            case WType.CLEAR:
                this.clear()
                break
            default:
                this.fill()
        }
    }
    drawImage(image, x, y) {
        this.context.drawImage(image, x, y)
    }
    fillRect(x, y, width, height, type) {
        this.context.fillRect(x, y, width, height, type)
    }
    clearRect(x, y, width, height, type) {
        this.context.clearRect(x, y, width, height, type)
    }
    strokeRect(x, y, width, height, type) {
        this.context.strokeRect(x, y, width, height, type)
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    }
    quadraticCurveTo(cp1x, cp1y, x, y) {
        return this.context.quadraticCurveTo(cp1x, cp1y, x, y)
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        return this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    }
    lineTo(x, y) {
        this.context.lineTo(x, y)
    }
    moveTo(x, y) {
        this.context.moveTo(x, y)
    }
    beginPath() {
        return this.context.beginPath()
    }
    closePath() {
        return this.context.closePath()
    }
    stroke() {
        return this.context.stroke()
    }
    fill() {
        return this.context.fill()
    }
    clear() {
        return this.context.clear()
    }

}

export default WCanvas