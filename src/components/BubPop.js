import React, {Component} from 'react'
import axios from 'axios'
import {Link, BrowserRouter} from 'react-router-dom'
import Register from '../pages/Register.js'

class BubblePop extends Component{
    constructor(){
        super();
    
        this.state={
            register: false,
            success: false
        }
    }

    componentDidMount(){
        if(this.state.success==true){
            window.location.href = '/success'
        }
    }
    
    

    render(){
        // document.body.style.overflow='hidden'

        return (
            <div style={this.state.display!='none'?{
                position: "fixed",
                display: 'flex',
                zIndex: 999,
                width: '100vw',
                height: '100vh',
                left: 0,
                top: 0,
                backgroundColor:'#00000060'
            }:{display:'none'}}>
                <div style={{
                position: "relative",
                display: 'block',
                zIndex: 501,
                width: '300px',
                height: '200px',
                alignSelf: 'center',
                margin: '0 auto',
                backgroundColor:'white',
                borderRadius: '5px'
                }}>
                    <p style={{
                        zIndex: '600',
                        display: 'flex',
                        float:'right',
                        padding: '20px',
                        cursor: 'pointer'
                    }} className="bold gray-hover"
                    onClick={()=>{this.setState({display:'none'});}}>
                        x
                    </p>

                    <p style={{
                        textAlign: 'center',
                        width:'inherit',
                        padding: '35px',
                        zIndex: -1
                    }} className='kakikecil green bold'>Message</p>
                    
                    <p style={{
                        textAlign: 'center',
                        width:'inherit',
                        padding: '35px',
                        zIndex: -1
                    }} className='bold'>{this.props.message}</p>
                    
                </div>
            </div>
        )
    }



}

export default BubblePop


