import { useEffect, useRef } from "react"
import gsap from "gsap"

import "./ImageTrail.css"

function lerp(a, b, n) {
  return (1 - n) * a + n * b
}

function getLocalPointerPos(event, rect) {
  let clientX = 0
  let clientY = 0

  if (event.touches && event.touches.length > 0) {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  } else {
    clientX = event.clientX
    clientY = event.clientY
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x
  const dy = p1.y - p2.y
  return Math.hypot(dx, dy)
}

class ImageItem {
  constructor(DOM_el) {
    this.DOM = { el: DOM_el, inner: DOM_el.querySelector(".content__img-inner") }
    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 }
    this.rect = null
    this.getRect()
    this.initEvents()
  }

  initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle)
      this.getRect()
    }
    window.addEventListener("resize", this.resize)
  }

  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect()
  }
}

class ImageTrailController {
  constructor(container) {
    this.container = container
    this.DOM = { el: container }
    this.images = [...this.DOM.el.querySelectorAll(".content__img")].map((img) => new ImageItem(img))
    this.imagesTotal = this.images.length
    this.imgPosition = 0
    this.zIndexVal = 1
    this.activeImagesCount = 0
    this.isIdle = true
    this.threshold = 80

    this.mousePos = { x: 0, y: 0 }
    this.lastMousePos = { x: 0, y: 0 }
    this.cacheMousePos = { x: 0, y: 0 }

    this.handlePointerMove = (event) => {
      const rect = this.container.getBoundingClientRect()
      this.mousePos = getLocalPointerPos(event, rect)
    }

    this.initRender = (event) => {
      const rect = this.container.getBoundingClientRect()
      this.mousePos = getLocalPointerPos(event, rect)
      this.cacheMousePos = { ...this.mousePos }
      requestAnimationFrame(() => this.render())
      this.container.removeEventListener("mousemove", this.initRender)
      this.container.removeEventListener("touchmove", this.initRender)
    }

    this.container.addEventListener("mousemove", this.handlePointerMove)
    this.container.addEventListener("touchmove", this.handlePointerMove)
    this.container.addEventListener("mousemove", this.initRender)
    this.container.addEventListener("touchmove", this.initRender)
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos)
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1)
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1)

    if (distance > this.threshold) {
      this.showNextImage()
      this.lastMousePos = { ...this.mousePos }
    }

    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1
    }

    requestAnimationFrame(() => this.render())
  }

  showNextImage() {
    this.zIndexVal += 1
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0
    const img = this.images[this.imgPosition]

    gsap.killTweensOf(img.DOM.el)

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: "power1",
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0,
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: "power3",
          opacity: 0,
          scale: 0.2,
        },
        0.4,
      )
  }

  onImageActivated() {
    this.activeImagesCount += 1
    this.isIdle = false
  }

  onImageDeactivated() {
    this.activeImagesCount -= 1
    if (this.activeImagesCount === 0) {
      this.isIdle = true
    }
  }

  destroy() {
    this.container.removeEventListener("mousemove", this.handlePointerMove)
    this.container.removeEventListener("touchmove", this.handlePointerMove)
    this.container.removeEventListener("mousemove", this.initRender)
    this.container.removeEventListener("touchmove", this.initRender)
    this.images.forEach((img) => {
      window.removeEventListener("resize", img.resize)
    })
  }
}

export default function ImageTrail({ items = [], variant = 1 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const controller = new ImageTrailController(containerRef.current)
    return () => controller.destroy()
  }, [variant, items])

  return (
    <div className="content" ref={containerRef}>
      {items.map((url, index) => (
        <div className="content__img" key={`${url}-${index}`}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  )
}
