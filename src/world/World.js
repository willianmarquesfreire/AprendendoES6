import WElement from '../elements/WElement'
import WCanvas from '../elements/WCanvas'
import GetLayerException from '../exceptions/GetLayerException'

@Injectable()
export default class World extends WElement {
    constructor() {
        super('div')
        this.layers = {}
    }
    get layers() {
        return this._layers
    }
    set layers(_layers) {
        this._layers = _layers
    }
    setOverflow(overflow) {
        this.element.style.overflow = overflow
        return this
    }
    newLayer(configuration) {
        let layer = new WCanvas()
        if (!configuration.id) {
            configuration.id = this.getObjectSize(this.layers) + 1
        }
        layer.config(configuration)
        this.addChild(layer)
        this.layers[configuration.id] = layer
        return this
    }
    getObjectSize(obj) {
        let size = 0, key
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++
        }
        return size
    }
    getLayer(id) {
        if (!this.layers[id]) {
            throw new GetLayerException()
        }
        return this.layers[id]
    }
}