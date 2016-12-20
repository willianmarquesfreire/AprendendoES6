import WElement from './WElement'
import WType from '../enums/WType'
/**
 * Emulate the Canvas element with features
 * @class
 */
class WCanvas extends WElement {
    constructor() {
        super('canvas')
        this._context = this.context2D
        this.element.id = "canvas"
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
    requestAnimationFrame(callback) {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || function (callback) {
                window.setTimeout(callback, 1000 / 60)
            }
    }
    get imageSmoothingEnabled() {
        return this.context.imageSmoothingEnabled
            || this.context.mozImageSmoothingEnabled
            || this.context.webkitImageSmoothingEnabled
            || this.context.msImageSmoothingEnabled
    }
    set imageSmoothingEnabled(imageSmoothingEnabled) {
        if (this.context.imageSmoothingEnabled) {
            this.context.imageSmoothingEnabled = imageSmoothingEnabled
        }
        if (this.context.mozImageSmoothingEnabled) {
            this.context.mozImageSmoothingEnabled = imageSmoothingEnabled
        }
        if (this.context.webkitImageSmoothingEnabled) {
            this.context.webkitImageSmoothingEnabled = imageSmoothingEnabled
        }
        if (this.context.msImageSmoothingEnabled) {
            this.context.msImageSmoothingEnabled = imageSmoothingEnabled
        }
    }
    get shadowBlur() {
        return this.context.shadowBlur
    }
    set shadowBlur(offset) {
        this.context.shadowBlur = offset
    }
    get shadowOffsetX() {
        return this.context.shadowOffsetX
    }
    set shadowOffsetX(offset) {
        this.context.shadowOffsetX = offset
    }
    get shadowOffsetY() {
        return this.context.shadowOffsetY
    }
    set shadowOffsetY(offset) {
        this.context.shadowOffsetY = offset
    }
    get shadowColor() {
        return this.context.shadowColor
    }
    set shadowColor(shadowColor) {
        this.context.shadowColor = shadowColor
    }
    get strokeStyle() {
        return this.context.strokeStyle
    }
    set strokeStyle(strokeStyle) {
        this.context.strokeStyle = strokeStyle
    }
    get lineCap() {
        return this.context.lineCap
    }
    set lineCap(lineCap) {
        this.context.lineCap = lineCap
    }
    get lineJoin() {
        return this.context.lineJoin
    }
    set lineJoin(lineJoin) {
        this.context.lineJoin = lineJoin
    }
    get lineWidth() {
        return this.context.lineWidth
    }
    set lineWidth(lineWidth) {
        this.context.lineWidth = lineWidth
    }
    get miterLimit() {
        return this.context.miterLimit
    }
    set miterLimit(miterLimit) {
        this.context.miterLimit = miterLimit
    }
    get font() {
        return this.context.font
    }
    set font(font) {
        this.context.font = font
    }
    get textAlign() {
        return this.context.textAlign
    }
    set textAlign(textAlign) {
        this.context.textAlign = textAlign
    }
    get textBaseline() {
        return this.context.textBaseline
    }
    set textBaseline(textBaseline) {
        this.context.textBaseline = textBaseline
    }
    get globalAlpha() {
        return this.context.globalAlpha
    }
    set globalAlpha(globalAlpha) {
        this.context.globalAlpha = globalAlpha
    }
    get globalCompositeOperation() {
        return this.context.globalCompositeOperation
    }
    set globalCompositeOperation(globalCompositeOperation) {
        this.context.globalCompositeOperation = globalCompositeOperation
    }
    //@TODO
    animateFadeTo(beginX, beginY, endX, endY, call) {
        // console.log("1")

        this.requestAnimationFrame(this.animateFadeTo(x,y))
        return this
    }
    /**
     * Sets or returns how a source (new) image are drawn onto a destination (existing) image.
     * @param {WGlobalCompositeOperation} globalCompositeOperation	globalCompositeOperation to set
     */
    setGlobalCompositeOperation(globalCompositeOperation) {
        this.globalCompositeOperation = globalCompositeOperation
        return this
    }
    /**
     * Sets or returns the current alpha or transparency value of the drawing.
     * @param {number} globalAlpha	globalAlpha to set
     */
    setGlobalAlpha(globalAlpha) {
        this.globalAlpha = globalAlpha
        return this
    }
    /**
     * Method returns an object that contains the width of the specified text, in pixels.
     * @param {string} text	The text to be measured
     * @returns {string}
     */
    fillText(text) {
        return this.context.measureText(text)
    }
    /**
     * Method draws filled text on the canvas. The default color of the text is black.
     * @param {string} text	Specifies the text that will be written on the canvas
     * @param {number} x	The x coordinate where to start painting the text (relative to the canvas)
     * @param {number} y	The y coordinate where to start painting the text (relative to the canvas)
     * @param {number} maxWidth	Optional. The maximum allowed width of the text, in pixels
     */
    fillText(text, x, y, maxWidth) {
        this.context.fillText(text, x, y, maxWidth)
        return this
    }
    /**
     * Method draws text (with no fill) on the canvas. The default color of the text is black.
     * @param {string} text	Specifies the text that will be written on the canvas
     * @param {number} x	The x coordinate where to start painting the text (relative to the canvas)
     * @param {number} y	The y coordinate where to start painting the text (relative to the canvas)
     * @param {number} maxWidth	Optional. The maximum allowed width of the text, in pixels
     */
    strokeText(text, x, y, maxWidth) {
        this.context.strokeText(text, x, y, maxWidth)
        return this
    }
    /**
     * The textBaseline property sets or returns the current text baseline used when drawing text.
     * @param {WTextBaseline} textBaseline	textBaseline to set
     */
    setTextBaseline(textBaseline) {
        this.textBaseline = textBaseline
        return this
    }
    /**
     * The textAlign property sets or returns the current alignment for text content, according to the anchor point.
     * @param {WTextAlign} textAlign	TextAlign to set
     */
    setTextAlign(textAlign) {
        this.textAlign = textAlign
        return this
    }
    /**
     * The font property sets or returns the current font properties for text content on the canvas.
     * @param {string} font	Font to select
     */
    setFont(font) {
        this.font = font
        return this
    }
    /**
     * Method returns true if the specified point is in the current path, otherwise false.
     * @param {x} x	The x-coordinate to test
     * @param {y} y	The y-coordinate to test
     */
    isPointInPath(x, y) {
        return this.context.isPointInPath(x, y)
    }
    /**
     * The miterLimit property sets or returns the style of the end caps for a line.
     * @param {number} miterLimit	A positive number that specifies the maximum miter length. If the current miter length exceeds the miterLimit, the corner will display as lineJoin "bevel"
     */
    setMiterLimit(miterLimit) {
        this.miterLimit = miterLimit
        return this
    }
    /**
     * The lineWidth property sets or returns the style of the end caps for a line.
     * @param {number} lineWidth	Specifies the lineWidth
     */
    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth
        return this
    }
    /**
     * The lineJoin property sets or returns the style of the end caps for a line.
     * @param {WLineJoin} lineJoin	Specifies the lineJoin
     */
    setLineJoin(lineJoin) {
        this.lineJoin = lineJoin
        return this
    }
    /**
     * The lineCap property sets or returns the style of the end caps for a line.
     * @param {WLineCap} lineCap	Specifies the lineCap
     */
    setLineCap(lineCap) {
        this.lineCap = lineCap
        return this
    }
    /**
     * Method repeats the specified element in the specified direction.
     * @param {Object} image	Specifies the image, canvas, or video element of the pattern to use	 
     * @param {WRepeat} repeat	Default. The pattern repeats
     */
    createPattern(image, repeat) {
        this.context.createPattern(image, repeat)
        return this
    }
    /**
     * Method specifies the colors and position in a gradient object.
     * @param {number} stop	A value between 0.0 and 1.0 that represents the position between start and end in a gradient
     * @param {string} color A CSS color value to display at the stop position
     */
    addColorStop(stop, color) {
        this.context.addColorStop(stop, color)
        return this
    }
    /**
     * Method creates a radial gradient object.
     * @param {number} x0 The x-coordinate of the start point of the gradient
     * @param {number} y0 The y-coordinate of the start point of the gradient
     * @param {number} r0 The radius of the gradient
     * @param {number} x1 The x-coordinate of the end point of the gradient
     * @param {number} y1 The y-coordinate of the end point of the gradient
     * @param {number} r1 The radius of the gradient
     */
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
        this.context.createRadialGradient(x0, y0, r0, x1, y1, r1)
        return this
    }
    /**
     * Method creates a linear gradient object.
     * @param {number} x0 The x-coordinate of the start point of the gradient
     * @param {number} y0 The y-coordinate of the start point of the gradient
     * @param {number} x1 The x-coordinate of the end point of the gradient
     * @param {number} y1 The y-coordinate of the end point of the gradient
     */
    createLinearGradient(x0, y0, x1, y1) {
        this.context.createLinearGradient(x0, y0, x1, y1)
        return this
    }
    /**
     * Set strokeStyle of context
     * @param {Color} strokeStyle Offset of shadow blur
     */
    setStrokeStyle(strokeStyle) {
        this.strokeStyle = strokeStyle
        return this
    }
    /**
     * Set shadowColor of context
     * @param {Color} shadowColor Offset of shadow blur
     */
    setShadowColor(shadowColor) {
        this.shadowColor = shadowColor
        return this
    }
    /**
     * Set Shadow of context
     * @param {number} offset Offset of shadow blur
     */
    setShadowBlur(offset) {
        this.shadowBlur = offset
        return this
    }
    /**
     * Set X-Shadow of context
     * @param {number} offset Offset of shadow blur
     */
    setShadowBlurX(offset) {
        this.shadowOffsetX = offset
        return this
    }
    /**
     * Set Y-Shadow of context
     * @param {number} offset Offset of shadow blur
     */
    setShadowBlurY(offset) {
        this.shadowOffsetY = offset
        return this
    }
    /**
     * Saves the state of the current context
     */
    save() {
        this.context.save()
        return this
    }
    /**
     * Previously saved path state and attributes
     */
    restore() {
        this.context.restore()
        return this
    }
    /**
     * Remaps the (x,y) position on the canvas
     * @param {number} x Eixo X
     * @param {number} y Eixo Y
     * @return {this}
     */
    translate(x, y) {
        this.context.translate(x, y)
        return this
    }
    /**
     * Scale the (x,y) position on the canvas
     * @param {number} x  Eixo X
     * @param {number} y  Eixo Y
     * @return {this}
     */
    scale(x, y) {
        this.context.scale(x, y)
        return this
    }
    /**
     * Rotate the (x,y) position on the canvas
     * @param {number} angle Ângulo
     * @return {this}
     */
    rotate(angle) {
        this.context.rotate(angle)
        return this
    }
    /**
     * Replaces the current transformation matrix for the drawing
     * @param {number} a Horizontal scaling
     * @param {number} b Horizontal skewing
     * @param {number} c Vertical skewing
     * @param {number} d Vertical scaling
     * @param {number} e Horizontal moving
     * @param {number} f Vertical moving
     */
    transform(a, b, c, d, e, f) {
        this.context.transform(a, b, c, d, e, f)
        return this
    }
    /**
     * Resets the current transform to the identity matrix. Then runs 
     * @param {number} a Horizontal scaling
     * @param {number} b Horizontal skewing
     * @param {number} c Vertical skewing
     * @param {number} d Vertical scaling
     * @param {number} e Horizontal moving
     * @param {number} f Vertical moving
     */
    setTransform(a, b, c, d, e, f) {
        this.context.setTransform(a, b, c, d, e, f)
        return this
    }
    /**
     * Resets the current transform to 0
     */
    resetTransform() {
        this.context.resetTransform()
        return this
    }
    /**
     * Clips a region of any shape and size from the original canvas
     */
    clip() {
        this.context.clip()
        return this
    }
    /**
     * 	Sets or returns the color, gradient, or pattern used to fill the drawing
     * @param {style} color CSS   Color value that indicates the fill color of the drawing. Default value is #000000 
     */
    fillStyle(color) {
        this.context.fillStyle = color
        return this
    }
    /**
     * The method creates a rectangle.
     * @param {number} x	     The x-coordinate of the upper-left corner of the rectangle
     * @param {number} y	     The y-coordinate of the upper-left corner of the rectangle
     * @param {number} width	 The width of the rectangle, in pixels
     * @param {number} height The height of the rectangle, in pixels
     */
    drawRect(x, y, width, height) {
        this.context.rect(x, y, width, height)
    }
    /**
     * The method creates a Line.
     * @param {number} beginX  The begin of x-coordninate
     * @param {number} beginY  The begin of y-coordinate
     * @param {number} endX    The end x of Line
     * @param {number} endY    The end y of the Line
     */
    drawLine(beginX, beginY, endX, endY) {
        this.moveTo(beginX, beginY)
        this.lineTo(endX, endY)
        this.stroke()
        return this
    }
    /**
     * Draw a Square
     * @param {number} x begin of square
     * @param {number} y end of square
     * @param {number} width width of square
     * @param {number} height height of square
     * @param {WType} type type of rect
     */
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
    /**
     * Draw a tringle
     * @param {number} x Indicates the initial x-position
     * @param {number} y Indicates the initial y-position
     * @param {number} x1 Indicates the x left side
     * @param {number} y1 Indicates the y left side
     * @param {number} x2 Indicates the x right side
     * @param {number} y2 Indicates the y right side
     * @param {WType} type Type of rect
     */
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
    /**
     * Draw a tringle by dimension
     * @param {number} x Indicates the initial x-position
     * @param {number} y Indicates the initial y-position
     * @param {number} dimension Indicates the dimension
     * @param {WType} type Type of rect
     */
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
    /**
     * Draw a image
     * @param {Image} image Image to rendering
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     */
    drawImage(image, x, y) {
        this.context.drawImage(image, x, y)
        return this
    }
    /**
     * Draw a image
     * @param {Image} image Image to rendering
     * @param {number} sx x-coordinate
     * @param {number} sy y-coordinate
     */
    drawFullImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        return this
    }
    /**
     * Create zoom of canvas in other canvas
     * @param {number} zoomX zomm x-coordinate
     * @param {number} zoomY zomm y-coordinate
     * @param {WCanvas} destiny Canvas destination
     * @param {number} destinyX Canvas destination x-coordinate
     * @param {number} destinyY Canvas destination y-coordinate
     * @param {number} originWidth Canvas Origin width
     * @param {number} originHeight Canvas Origin height
     * @param {number} destinyWidth Canvas destination width
     * @param {number} destinyHeight Canvas destination height
     * @param {boolean} smoothing anti-aliasing of zoom image
     */
    zoomImage(zoomX, zoomY, destiny, destinyX,
        destinyY, originWidth, originHeight, destinyWidth, destinyHeight, smoothing) {
        destiny.clearRect(0, 0, destiny.element.width, destiny.element.height)
        if (smoothing)
            destiny.setImageSmoothingEnabled(true)
        else
            destiny.setImageSmoothingEnabled(false)
        destiny.drawImage(
            this.element,
            Math.abs(destinyX - 10),
            Math.abs(destinyY - 5),
            zoomX,
            zoomY,
            originWidth,
            originHeight,
            destinyWidth,
            destinyHeight
        )
    }
    /**
     * Create a image
     * @param {string} url Location of image
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     * @param {function} callback Callback function to invokes of load the image 
     */
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
        // return tColor(image,x,y)this
    }
    /**
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     * @param {number} width Size on x-coordinate
     * @param {number} height Size on y-coordinate
     * @return {ImageData}
     */
    getImageData(x, y, width, height) {
        return this.context.getImageData(x, y, width, height)
    }
    /**
     * Put the image data on location
     * @param {ImageData} imageData ImageData to put
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     * @return {ImageData} 
     */
    putImageData(imageData, x, y) {
        return this.context.putImageData(imageData, x, y)
    }
    /**
     * Get string rgba from imageData
     * @param {ImageData} imageData ImageData to get rgba
     * @return {string} RGBA
     */
    //@TODO Fazer uma classe Rgba com métodos get de r g b a, e um que retorna tudo
    getImageDataRGBA(imageData) {
        return 'rgba('
            + imageData.data[0]
            + ',' + imageData.data[1]
            + ',' + imageData.data[2]
            + ',' + imageData.data[3] / 255 + ')'
    }
    /**
     * Get string rgba from params
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @param {number} a Opacity
     * @return {string} RGBA
     */
    stringRGBA(r, g, b, a) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
    }
    /**
     * Method returns a data URI containing a representation of the image in the format specified by the type parameter.
     * Defaults to PNG
     * The returned image is in a resolution of 96 dpi.
     * @param {WMimeType} type Type of DataUrl
     * @param {WCanvasQuality} quality Quality of DataUrl 
     */
    toDataURL(type, quality) {
        var dataUrl = this.element.toDataURL(type, quality)
        return dataUrl
    }
    /**
     * Method creates a Blob object representing the image contained in the canvas
     * @param {function} callback Function of callback to onload Blob
     * @param {WMimeType} type Type of Blob
     * @param {WCanvasQuality} quality Quality of Blob 
     */
    toBlob(callback, type, quality) {
        var toBlob = this.element.toDataURL(callback, type, quality)
        return toBlob
    }
    /**
     * Invert color of ImageData
     * @param {ImageData} imageData ImageData to invert color
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     */
    invertColor(imageData, x, y) {
        var data = imageData.data
        for (var i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i]
            data[i + 1] = 255 - data[i + 1]
            data[i + 2] = 255 - data[i + 2]
        }
        this.putImageData(imageData, x, y)
        return this
    }
    /**
     * Invert Canvas Color
     */
    invertCanvasColor() {
        var imageData = this.getImageData(0, 0, this.element.width, this.element.height)
        this.invertColor(imageData, 0, 0)
        return this
    }
    /**
     * Grayscale color of ImageData
     * @param {ImageData} imageData ImageData to grayscale color
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     */
    grayscaleColor(imageData, x, y) {
        var data = imageData.data
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i] = avg //red
            data[i + 1] = avg //green
            data[i + 2] = avg //blue
        }
        this.putImageData(imageData, x, y)
        return this
    }
    /**
     * Grayscale color
     */
    grayscaleCanvasColor() {
        var imageData = this.getImageData(0, 0, this.element.width, this.element.height)
        this.grayscaleColor(imageData, 0, 0)
        return this
    }
    /**
     * Draws a "filled" rectangle
     * @param {number} x	    The x-coordinate of the upper-left corner of the rectangle
     * @param {number} y	    The y-coordinate of the upper-left corner of the rectangle
     * @param {number} width	The width of the rectangle, in pixels
     * @param {number} height	The height of the rectangle, in pixels
     * @param {WType} type      Type of Rect
     */
    fillRect(x, y, width, height, type) {
        this.context.fillRect(x, y, width, height, type)
        return this
    }
    /**
     * Clear a rectangle
     * @param {number} x	    The x-coordinate of the upper-left corner of the rectangle
     * @param {number} y	    The y-coordinate of the upper-left corner of the rectangle
     * @param {number} width	The width of the rectangle, in pixels
     * @param {number} height	The height of the rectangle, in pixels
     * @param {WType} type      Type of Rect
     */
    clearRect(x, y, width, height, type) {
        this.context.clearRect(x, y, width, height, type)
        return this
    }
    /**
     * Stroke a rectangle
     * @param {number} x	    The x-coordinate of the upper-left corner of the rectangle
     * @param {number} y	    The y-coordinate of the upper-left corner of the rectangle
     * @param {number} width	The width of the rectangle, in pixels
     * @param {number} height	The height of the rectangle, in pixels
     * @param {WType} type      Type of Rect
     */
    strokeRect(x, y, width, height, type) {
        this.context.strokeRect(x, y, width, height, type)
        return this
    }
    /**
     * Creates an arc/curve (used to create circles, or parts of circles)
     * @param {number} x	            The x-coordinate of the center of the circle
     * @param {number} y        	    The y-coordinate of the center of the circle
     * @param {number} radius	            The radius of the circle
     * @param {number} startAngle  	The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
     * @param {number} endAngle	    The ending angle, in radians
     * @param {number} anticlockwise	Optional. Specifies whether the drawing should be counterclockwise or clockwise.
     */
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
        return this
    }
    /**
     * Creates a quadratic Bézier curve
     * @param {number} cp1x	The x-coordinate of the Bézier control point
     * @param {number} cp1y	The y-coordinate of the Bézier control point
     * @param {number} x	The x-coordinate of the ending point
     * @param {number} y	The y-coordinate of the ending point
     */
    quadraticCurveTo(cp1x, cp1y, x, y) {
        this.context.quadraticCurveTo(cp1x, cp1y, x, y)
        return this
    }
    /**
    * Creates a cubic Bézier curve
    * @param {number} cp1x	The x-coordinate of the first Bézier control point
    * @param {number} cp1y	The y-coordinate of the first Bézier control point
    * @param {number} cp2x	The x-coordinate of the second Bézier control point
    * @param {number} cp2y	The y-coordinate of the second Bézier control point
    * @param {number} x	The x-coordinate of the ending point
    * @param {number} y	The y-coordinate of the ending point
    */
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        return this
    }
    /**
     * Set Smoothing configuration enable
     * @param {boolean} imageSmoothingEnabled Enabled or disable the configuration
     */
    setImageSmoothingEnabled(imageSmoothingEnabled) {
        this.imageSmoothingEnabled = imageSmoothingEnabled
        return this
    }

    /**
     * Adds a new point and creates a line to that point from the last specified point in the canvas
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     */
    lineTo(x, y) {
        this.context.lineTo(x, y)
        return this
    }
    /**
     * Moves the path to the specified point in the canvas, without creating a line
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     */
    moveTo(x, y) {
        this.context.moveTo(x, y)
        return this
    }
    /**
     * Begins a path, or resets the current path
     */
    beginPath() {
        this.context.beginPath()
        return this
    }
    /**
     * Creates a path from the current point back to the starting point
     */
    closePath() {
        this.context.closePath()
        return this
    }
    /**
     * Actually draws the path you have defined
     */
    stroke() {
        this.context.stroke()
        return this
    }
    /**
     * Fills the current drawing (path)
     */
    fill() {
        this.context.fill()
        return this
    }
    /**
     * Clear the context
     */
    clear() {
        this.context.clear()
        return this
    }
    //@TODO
    createEvent() {

    }

}

export default WCanvas