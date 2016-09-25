
import World from './world/World'
import Image from './elements/Image'
import Canvas from './elements/Canvas'
import Type from './enums/Type'

window.addEventListener("load", function() {
    var world = new World()
    world.addToBody()
    console.log(world.getElement().getContext('2d'))
    world.drawLine(0,0,100,100)
    world.drawSquare(10,10,20,20)
    world.drawTriangle(100,100,50,150,150,150)
    world.drawTriangleByDimension(200,100,40)
    
    var img = new Image("https://media.licdn.com/media/AAEAAQAAAAAAAANbAAAAJDE5NjBkNDk1LTY3ZGQtNDA0NS04YTJiLTdkNmU3NjZiNjI3Mg.png")
    world.addChild(img.getElement())

    console.log(Type)

    // document.body.appendChild(new Canvas().getElement())

})