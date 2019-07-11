import React, {Component} from 'react'

import header from '../assets/header.jpg'
import Header from '../containers/Header';
import Recommend from '../containers/Recommend';
import Footer from '../containers/Footer';
import About from '../containers/About';
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import Chat from '../containers/Chat';
import axios from 'axios'


class Home extends Component{
    constructor(){
        super();
    
        this.state={
          slider: true
        }
      }
    
      componentDidMount(){
        window.addEventListener('scroll', ()=> {
          const top = window.scrollY < 100;
    
          if(!top){
            this.setState({
              navstick:true
            })
          }
          else{
            this.setState({
              navstick:false
            })      
          }
        })
    
        window.addEventListener('resize', ()=>{
          if(window.innerWidth < 1100){
            this.setState({
              slider:false
            })
          }else{
            this.setState({
              slider:true
            })
          }
          
        })
      }

    

    
    render() {
      let navigations = this.props.nav
      // document.getElementById('sendBtn').addEventListener('click', function () {
      //   this.props.sendChat('1', 'halooo mamaaa')
      // })
        return (
          <>


            <div className={this.state.navstick ? 'navstick' : 'nav'} style={{zIndex: 1000}}>
              <NavBar apptis={this.props.apptis} login={this.props.login} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode}/>
            </div>
            
            <Header header={header}/>
            {/* <button id='sendBtn' className='btnIjo-selected' onClick={this.props.socket}>send</button> */}

            {/* {this.state.slider?(<SlideView/>):''} */}
    
            <Recommend header={header}/>
    
            <About />
    
            <Footer/>
            
          </>
        );


      }

}

export default Home