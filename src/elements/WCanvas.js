import WElement from './WElement'
import WType from '../enums/WType'

class WCanvas extends WElement {
    constructor() {
        super('canvas')
        this._context = this.context2D
    }
    get context() {
        return this._context
    }
    set context(ctx) {
        return this._context = this.getContext(ctx)
    }
    get context2D() {
        return this.element.getContext('2d')
    }
    get context3D() {
        return this.element.getContext('3d')
    }
    save() {
        this.context.save()
        return this
    }
    restore() {
        this.context.restore()
        return this
    }
    translate(x, y) {
        this.context.translate(x, y)
        return this
    }
    scale(x, y) {
        this.context.scale(x, y)
        return this
    }
    rotate(angle) {
        this.context.rotate(angle)
        return this
    }
    transform(a, b, c, d, e, f) {
        this.context.transform(a, b, c, d, e, f)
        return this
    }
    setTransform(a, b, c, d, e, f) {
        this.context.setTransform(a, b, c, d, e, f)
        return this
    }
    resetTransform() {
        this.context.resetTransform()
        return this
    }
    clip() {
        this.context.clip()
        return this
    }
    fillStyle(color) {
        this.context.fillStyle = color
        return this
    }
    drawRect(x, y, width, height) {
        this.context.rect(x, y, width, height)
    }
    drawLine(beginX, beginY, endX, endY) {
        this.moveTo(beginX, beginY)
        this.lineTo(endX, endY)
        this.stroke()
        return this
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
        return this
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
        return this
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
        return this
    }
    drawImage(image, x, y) {
        this.context.drawImage(image, x, y)
        return this
    }
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        return this
    }
    createImage(url, x, y, callback) {
        var $this = this
        var img = new Image()
        img.src = url
        img.onload = function () {
            $this.context.drawImage(img, x, y)
            img.style.display = 'none'
            if (callback) {
                callback(img)
            }
            return this
        }
    }
    stringRGBA(r, g, b, a) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
    }
    getImageData(x, y, width, height) {
        return this.context.getImageData(x, y, width, height)
    }
    getImageDataRGBA(imageData) {
        return 'rgba('
            + imageData.data[0]
            + ',' + imageData.data[1]
            + ',' + imageData.data[2]
            + ',' + imageData.data[3] / 255 + ')'
    }
    fillRect(x, y, width, height, type) {
        this.context.fillRect(x, y, width, height, type)
        return this
    }
    clearRect(x, y, width, height, type) {
        this.context.clearRect(x, y, width, height, type)
        return this
    }
    strokeRect(x, y, width, height, type) {
        this.context.strokeRect(x, y, width, height, type)
        return this
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
        return this
    }
    quadraticCurveTo(cp1x, cp1y, x, y) {
        this.context.quadraticCurveTo(cp1x, cp1y, x, y)
        return this
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        return this
    }
    lineTo(x, y) {
        this.context.lineTo(x, y)
        return this
    }
    moveTo(x, y) {
        this.context.moveTo(x, y)
        return this
    }
    beginPath() {
        this.context.beginPath()
        return this
    }
    closePath() {
        this.context.closePath()
        return this
    }
    stroke() {
        this.context.stroke()
        return this
    }
    fill() {
        this.context.fill()
        return this
    }
    clear() {
        this.context.clear()
        return this
    }
    /**
     * @TODO
     * Esta função será implementada
     * Ela está aqui somente para me lembrar de como fazer animações
     */
    requestAnimationFrame(fn) {
        return window.requestAnimationFrame(draw)
    }

}

export default WCanvas