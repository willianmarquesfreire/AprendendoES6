import WException from '../enums/WException'
export default class GetLayerException extends Error {
    constructor(message) {
        let exception = WException.NO_GET_LAYER
        super(exception.message + '\n'
            + exception.solutions.join('\n'))
        this.name = exception.name
    }
}