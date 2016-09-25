import Element from './Element'
import Type from '../enums/Type'

class Canvas extends Element {
    constructor() {
        super('canvas')
        this._context = this.getContext2D()
    }
    getContext() {
        return this._context
    }
    setContext(ctx) {
        return this._context = this.getContext(ctx)
    }
    getContext2D() {
        return this.getElement().getContext('2d')
    }
    getContext3D() {
        return this.getElement().getContext('3d')
    }
    drawLine(beginX, beginY, endX, endY) {
        this.moveTo(beginX, beginY)
        this.lineTo(endX, endY)
        this.stroke()
    }
    drawSquare(x, y, width, height, type) {
        switch (type) {
            case Type.STROKE:
                this.strokeRect(x, y, width, height, type)
                break
            case Type.CLEAR:
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
            case Type.STROKE:
                this.stroke()
                break
            case Type.CLEAR:
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
            case Type.STROKE:
                this.stroke()
                break
            case Type.CLEAR:
                this.clear()
                break
            default:
                this.fill()
        }
    }
    fillRect(x, y, width, height, type) {
        this.getContext().fillRect(x, y, width, height, type)
    }
    clearRect(x, y, width, height, type) {
        this.getContext().clearRect(x, y, width, height, type)
    }
    strokeRect(x, y, width, height, type) {
        this.getContext().strokeRect(x, y, width, height, type)
    }
    lineTo(x, y) {
        this.getContext().lineTo(x, y)
    }
    moveTo(x, y) {
        this.getContext().moveTo(x, y)
    }
    beginPath() {
        return this.getContext().beginPath()
    }
    closePath() {
        return this.getContext().closePath()
    }
    stroke() {
        return this.getContext().stroke()
    }
    fill() {
        return this.getContext().fill()
    }
    clear() {
        return this.getContext().clear()
    }

}

export default Canvas