export default Object.prototype.eventMouseFollow = function () {
    if (this.context) {
        var $this = this
        var ctx = $this.context

        function clear() {
            ctx.fillStyle = 'rgba(255,255,255,0.1)'
            ctx.fillRect(0, 0, $this.element.width, $this.element.height)
        }

        $this.element.addEventListener('mousemove', function (e) {
            if (!$this.running) {
                clear()
                $this.x = e.clientX
                $this.y = e.clientY
                $this.draw()
            }
        })

        $this.element.addEventListener('click', function (e) {
            if (!$this.running) {
                $this.start()
            } else {
                $this.stop()
            }
        })


        return $this
    }
}