//Parei em => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations

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
                width: '100px',
                height: '40px',
                border: '2px solid black',
                position: WPosition.RELATIVE
            })
            .newLayer({
                width: '100px',
                height: '40px',
                border: '2px solid black',
                position: WPosition.ABSOLUTE,
                top: '10px',
                left: '20px'
            })

        world.getLayer(1)
            .fillStyle('red')
            .fillRect(10, 100, 90, 30)

        world.getLayer(2)
            .fillStyle('blue')
            .fillRect(10, 100, 90, 30)

    }
}

window.onload = new Start()