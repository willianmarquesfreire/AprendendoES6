//Parei em => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
import World from './world/World'
import WImage from './elements/WImage'
import WCanvas from './elements/WCanvas'
import WType from './enums/WType'
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

window.addEventListener("load", function () {
    var world = new World()
    world.element.id = "world1"
    world.addToBody()

})