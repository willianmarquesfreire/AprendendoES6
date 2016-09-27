//Parei em => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
import World from './world/World'
import WImage from './elements/WImage'
import WCanvas from './elements/WCanvas'
import WType from './enums/WType'
import WBallon from './reusable_objects/WBallon'
import WHeart from './reusable_objects/WHeart'
import WClockOne from './reusable_objects/WClockOne'
window.addEventListener("load", function() {
    var world = new World()
    world.addToBody()
        .drawLine(0,0,100,100)
        .fillStyle("rgb(200,0,0)")
        .drawSquare(10,10,20,20)
        .fillStyle("rgba(0, 0, 200, 0.5)")
        .drawTriangle(100,100,50,150,150,150)
        .drawTriangleByDimension(200,100,40)
        .fillStyle("rgb(200,0,0)")
        .createBallon()
        .createHeart()
        .addChild(new WImage("./src/img/1.jpg").element)
        .createClockOne()

})