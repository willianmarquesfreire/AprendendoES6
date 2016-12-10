export default Object.prototype.eventFallMove = function () {
    if (this.context) {
        var $this = this
        var ctx = $this.context

        $this.running = false

        var raf;

        $this.start = function() {
            $this.running = true
            $this.draw()
                .toX($this.x)
                .toY($this.y)

            $this.x += $this.vx
            $this.y += $this.vy
            $this.vy *= .99
            $this.vy += .25

            if ($this.y + $this.vy > $this.element.height
                || $this.y + $this.vy < 0) {
                $this.vy = -$this.vy
            }

            if ($this.x + $this.vx > $this.element.width
                || $this.x + $this.vx < 0) {
                $this.vx = -$this.vx
            }
            raf = window.requestAnimationFrame($this.start)
        }

        $this.stop = function() {
            $this.running = false
            window.cancelAnimationFrame(raf)
        }

        return $this
    }
}