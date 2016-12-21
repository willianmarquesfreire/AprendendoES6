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

        var img = new Image(100,200)
        img.src = "./src/img/1.jpg"
        
        world.getLayer(2)
            .draw(WObjectType.IMAGE, {
                    image: img,
                    sx: 10,
                    sy: 20,
                    sWidth: 300,
                    sHeight: 400,
                    dx: 50,
                    dy: 60,
                    dWidth: 45,
                    dHeight: 46
            })
    }
}

window.onload = new Start()