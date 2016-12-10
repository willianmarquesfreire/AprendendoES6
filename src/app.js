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
window.addEventListener("load", function () {
    var world = new World()
    world.addToBody()
        .createImage('src/img/rhino.jpg', 0, 0, call)


    function call() {
        world.element.addEventListener('mousemove', function (event) {
            var x = event.layerX
            var y = event.layerY
            var image = world.context.getImageData(x,y,1,1)
            document.getElementById('color').style.backgroundColor = world.getImageDataRGBA(image)
        })
    }

    // world.element.addEventListener('mousemove', pick)


})