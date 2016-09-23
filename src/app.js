
import World from './world/World'
import Image from './elements/Image'

window.addEventListener("load", function() {
    var world = new World()
    // document.body.appendChild(world.getCanvas())
    var img = new Image()
    img.setSize(500,500)
    document.body.appendChild(img.getImage())

})