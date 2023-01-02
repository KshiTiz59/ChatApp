import React from 'react'
import {Row ,Col , Button} from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import "./home.css"
const Home = () => {
  return (
   <Row style={{width:"100%"}}>
    <Col md={6}  className="d-flex flex-direction-column align-items-center justify-content-center">
        <div className='hell'>
            <h1 className='hom'>Let's Chat</h1>
            <p>Chat App lets you connect with your friend</p>
            <LinkContainer to="/chat">
            <Button variant='success'>
              Get Started  <i className='fas fa-comments  home-message-icon'></i>
            </Button>
           
            </LinkContainer>
        </div>
    </Col>
    <Col md={6} className="home_bg"></Col>
   </Row>
  )
}

export default Home