import WElement from './elements/WElement'
import World from './world/World'
import WImage from './elements/WImage'
import WCanvas from './elements/WCanvas'
import WType from './enums/WType'
import WPosition from './enums/WPosition'
import WBallon from './reusable_objects/WBallon'
import WHeart from './reusable_objects/WHeart'
import WClockOne from './reusable_objects/WClockOne'
import WBall from './reusable_objects/WBall'
import WBallShadow from './reusable_objects/WBallShadow'
import WMoveRandomOne from './events/WMoveRandomOne'
import WFallMove from './events/WFallMove'
import WMouseFollow from './events/WMouseFollow'
import WMimeType from './enums/WMimeType'
import WCanvasQuality from './enums/WCanvasQuality'
import Example from './examples/Example'
import WException from './enums/WException'
import WObjectType from './enums/WObjectType'


@Inject('World')
export default class Start {
    constructor() {
        let world = this.World
            .config({
                id: 'World',
                border: '1px solid red'
            })
            .addToBody()
            .newLayer({
                width: '500px',
                height: '400px',
                border: '2px solid black',
                position: WPosition.RELATIVE
            })

        world.getLayer(1)
            .draw(WObjectType.TRIANGLE, {
                x: 10, y: 10, dimension: 20, type: WType.FILL
            })
            .element
            .addEventListener('mousemove', function (e) {
                let x = e.clientX
                let y = e.clientY
                world.getLayer(1)
                    .clear()
                    .draw(WObjectType.TRIANGLE, {
                        x: x-50, y: y-50, dimension: 10, type: WType.FILL
                    })
            })
    }
}

window.onload = new Start()