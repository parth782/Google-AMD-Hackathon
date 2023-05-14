import React from 'react'
// import background from './v915-wit-011-l.jpg'
// import Carousel from 'react-bootstrap/Carousel';
import styles from './App.css';


const VideoCarousel = () => {
  return (
    <div>
      <h1 className={styles.heading2} style={{color:"white",padding:"10px 10px",fontSize:"39px",marginTop:"20px"}}>Agro Videos</h1>
      <div className='grid-container' style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gridGap: '5px',
        width: '100%',
        height: '600px',
        // border: '2px red solid',
        // justifyContent: 'center'
      }}>
          <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/v9RHWiqXVXU" allowfullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/MWlj5IXP-3s" allowfullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/vnhg_zT7OiM" allowfullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/f8jiVotakgE" allowfullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/e8swkgk0D-w" allowfullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
          <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/UhZAgYPXmCk" allowfullscreen style={{
                  width: '100%', height: '100%'}}></iframe>
      </div>
        {/* <Carousel>
            <Carousel.Item>
              <div class="embed-responsive">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/v9RHWiqXVXU" allowfullscreen style={{
                  width: '560px', height: '315px'}}></iframe>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div class="embed-responsive">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/BU3CbOTRogc" allowfullscreen style={{
                  width: '560px', height: '315px'}}></iframe>
                </div>
            </Carousel.Item>
        </Carousel> */}
    </div>
  )
}

export default VideoCarousel