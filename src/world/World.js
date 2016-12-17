import WCanvas from '../elements/WCanvas'
import test from "./test"

@Injectable()
export default class World extends WCanvas {
    constructor(j = 1) {
        var canvas = new WCanvas()
        super()
    }
    method(ola) {
        console.log("ola")
        return "willian"
    }
}