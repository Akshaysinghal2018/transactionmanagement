import React from 'react'
import {Carousel} from 'react-bootstrap'
function Crouselcmp() {
    return (
        <div >
            <Carousel >
  <Carousel.Item style={{height:"420px"}}>
    <img
      className="d-block w-100"
      src="/images/image1.jpg"
      alt="First slide"
    />
    </Carousel.Item>
  <Carousel.Item style={{height:"420px"}}>
    <img
      className="d-block w-100"
      src="/images/image2.jpg"
      alt="Second slide"
    />

    </Carousel.Item>
  <Carousel.Item style={{height:"420px"}}>
    <img
      className="d-block w-100"
      src="/images/image3.jpg"
      alt="Third slide"
    />

    </Carousel.Item>
</Carousel>
        </div>
    )
}

export default Crouselcmp
