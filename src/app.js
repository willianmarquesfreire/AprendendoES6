
import World from './world/World'
import WImage from './elements/WImage'
import WCanvas from './elements/WCanvas'
import WType from './enums/WType'
import WBallon from './reusable_objects/WBallon'
import WHeart from './reusable_objects/WHeart'

window.addEventListener("load", function() {
    var world = new World()
    world.addToBody()
    world.drawLine(0,0,100,100)
    world.drawSquare(10,10,20,20)
    world.drawTriangle(100,100,50,150,150,150)
    world.drawTriangleByDimension(200,100,40)
    world.createBallon()
    world.createHeart()

    var img = new WImage();
    img.src = "./src/img/1.jpg"
    
    world.drawImage(img.getElement(),5,5)
    console.log(img)

})