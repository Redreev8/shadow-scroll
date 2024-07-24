import Direction from './direction.js'

class scroll extends Direction {
    #tag
    _wrapp

    get point () {
        return {
            top: () => `#000,#000,transparent 0,#000 ${this.size[0]}px`,
            left: () => `#000, #000, transparent 0, #000 ${this.size[1]}px`,
            bottom: () => `#000 calc(100% - ${this.size[0]}px), transparent`,
            right: () => `#000 calc(100% - ${this.size[1]}px), transparent`
        }
    }

    size = [40, 10]

    constructor({ tag = '.scroll-shadow', size = [40, 10] }) {
        super({})
        this.size = typeof size === 'number' ? [size, size] : size
        this.tag = tag
    }
    get tag() {
        return this.#tag 
    }
    set tag(tag) {
        this.#tag = typeof tag === 'string' ?document.querySelector(tag) : tag
        
        const horizontTag = document.createElement('div')
        horizontTag.classList.add('scroll-shadow--horizont')
        const wrapp = document.createElement('div')
        wrapp.classList.add('scroll-shadow__wrapp')
        wrapp.innerHTML = this.tag.innerHTML
        horizontTag.append(wrapp)
        this.tag.innerHTML = ''
        this.tag.append(horizontTag)

        this.tagHorizont = horizontTag
        this.wrapp = wrapp
    }

    get wrapp() {
        return this._wrapp
    }
    set wrapp(tag) {
        if (this._wrapp) {
            this._wrapp.removeEventListener('scroll', this.scroll)
        }
        super.tag = tag
        this._wrapp = tag
        tag.addEventListener('scroll', this.scroll)
        this.scroll()
    }

    get direction () {
        return this._direction
    }

    set direction(direction) {
        if (!direction) return
        if (this._direction[direction[0]] && this._direction[direction[0]] === direction[1]) return delete this._direction[direction]
        this._direction[direction[0]] = direction[1]

        const toMaskImageVerticl = (tag, key, key2, direction = '') => {
            if (!this._direction[key] && !this._direction[key2]) return
            const maskImageVerticl = []
            if (this._direction[key]) maskImageVerticl.push(this._direction[key]())
            if (this._direction[key2]) maskImageVerticl.push(this._direction[key2]())
            tag.style.maskImage = `linear-gradient(${direction}${maskImageVerticl.join(', ')})`
        }
        toMaskImageVerticl(this.tag, 'top', 'bottom')
        toMaskImageVerticl(this.tagHorizont, 'left', 'right', 'to right, ')
    }
}

new scroll({ tag: document.querySelector('.scroll-shadow') })

