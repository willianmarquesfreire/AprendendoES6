export default Object.prototype.createBall = function (x,y) {
    if (this.context) {
        var $this = this
        $this.x = x
        $this.y = y
        $this.vx = 5
        $this.vy = 2
        $this.radius = 25
        $this.color = 'blue'
        $this.draw = function () {
            $this.clearRect(0, 0, $this.element.width, $this.element.height);
            $this.context.beginPath();
            $this.context.arc($this.x, $this.y, $this.radius, 0, Math.PI * 2, true);
            $this.context.closePath();
            $this.context.fillStyle = $this.color;
            $this.context.fill();
            return $this
        }
        $this.toX = function (x) {
            $this.x = x
            return $this
        }
        $this.toY = function (y) {
            $this.y = y
            return $this
        }

        return $this
    }
}