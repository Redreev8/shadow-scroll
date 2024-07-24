export default class Direction {
    #tag = null
    pScrollTop = 0
    pScrollLeft = 0

    _direction = {}
    endBottom = 0
    endRight = 0
    scroll = () => {
        if (this.wrapp.scrollTop === 0) {
            this.direction = ['top', false]
            this.direction = ['bottom', this.point.bottom]
        }
        if (this.wrapp.scrollTop > 0 && this.pScrollTop !== this.wrapp.scrollTop) {
            
            this.direction = ['top', this.point.top]
            this.direction = ['bottom', this.point.bottom]
            this.pScrollTop = this.wrapp.scrollTop
        }
        if (this.wrapp.scrollTop === this.endBottom) {
            this.direction = ['top', this.point.top]
            this.direction = ['bottom', false]
        }

        if (this.wrapp.scrollLeft === 0 && this.endRight !== 0) {
            this.direction = ['left', false]
            this.direction = ['right', this.point.right]
        }
        if (this.wrapp.scrollLeft > 0 && this.pScrollLeft !== this.wrapp.scrollLeft) {
            this.direction = ['left', this.point.left]
            this.direction = ['right', this.point.right]
            this.pScrollLeft = this.wrapp.scrollLeft
        }
        if (this.wrapp.scrollLeft > 0 && this.wrapp.scrollLeft === this.endRight) {
            this.direction = ['left', this.point.left]
            this.direction = ['right', false]
        }
    }

    get tag() {
        return this.#tag 
    }
    set tag(tag) {
        if (!tag) return
        this.#tag = tag
        this.endBottom = tag.scrollHeight - tag.clientHeight
        this.endRight = tag.scrollWidth - tag.clientWidth
    }
}