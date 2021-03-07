import React from 'react'
import {useState} from 'react'
import {ArrowLeft, ArrowRight} from '@material-ui/icons'

export default function CustomSlider({slides}) {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prev = () => {
    setCurrent(current === slides.length - 1 ? 0 : current - 1)
  }

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null
  }

  return (
    <section className="custom-slider">
      <ArrowLeft className="left-arrow" onClick={prev} />
      <ArrowRight className="right-arrow" onClick={next} />
      {slides.map((slide, idx) => {
        return (
          <div className={idx === current ? 'slide active' : 'slide'} key={idx}>
            {idx === current && (
              <img
                src={`../images/${slide.imageUrl}`}
                className="custom-slide-pic"
              />
            )}
          </div>
        )
      })}
    </section>
  )
}
