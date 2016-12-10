/**
 * Evento de objeto se movendo na tela.
 * Têm-se o x, y, vx, vy.
 * Objeto se move de acordo com x e y.
 * Utiliza-se vx e vy para somar as váriaveis de posição.
 * Quando se objeto chega ao limite do canvas, nega-se o vx e vy para
 * inverter a soma, fazendo com que o x e y decremente, e ao retornar
 * inverte-se novamente para o x e y incrementar, movendo assim o objeto
 * em sentidos opostos. 
 */
export default Object.prototype.eventRandomOne = function () {
    if (this.context) {
        var $this = this
        var ctx = $this.context

        var raf;

        function draw() {
            $this.draw()
                .toX($this.x)
                .toY($this.y)

            $this.x += $this.vx
            $this.y += $this.vy

            if ($this.y + $this.vy > $this.element.height
                || $this.y + $this.vy < 0) {
                $this.vy = -$this.vy
            }

            if ($this.x + $this.vx > $this.element.width
                || $this.x + $this.vx < 0) {
                $this.vx = -$this.vx
            }
            raf = window.requestAnimationFrame(draw)
        }

        draw()
        return $this
    }
}