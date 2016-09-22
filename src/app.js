
import World from './world/World.js'

window.addEventListener("load", function() {
    var world = new World()
    document.body.appendChild(world.getCanvas())
})