import React from 'react'
import Slider from 'react-slick'
import satu from '../assets/1.jpg'
import dua from '../assets/2.jpg'
import tiga from '../assets/3.jpg'
import empat from '../assets/4.jpg'

class SlideView extends React.Component{
    render(){
        return(
            <div style={{
                maxWidth:'720px',
                maxHeight: '290',
                margin: '50px auto',
            }}>
                <p style={{
                    fontSize:'19px',
                    fontWeight:'600',
                    color: 'rgb(49, 60, 71)'
                }}>Promo</p>

                <Slider speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                infinite={true}
                dots={true}
                autoplay={true}
                swipeToSlide={true}
                slidesPerRow={1}
                pauseOnDotsHover={true}
                arrows={true}
                adaptiveHeight={true}
                draggable={true}
                >
                    <div><img styles={{
                        height: 'inherit'
                    }} src={satu}/></div>
                    <div styles={{
                        height: 'inherit'
                    }}><img src={dua}/></div>
                    <div styles={{
                        height: 'inherit'
                    }}><img src={tiga}/></div>
                    <div styles={{
                        height: 'inherit'
                    }}><img src={empat}/></div>
                </Slider>

            </div>
        )
    }
}
 export default SlideView