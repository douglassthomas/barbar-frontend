import React from 'react'
import logobarbar from '../assets/logoibu.png'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import ig from '../assets/ig.png'
import twit from '../assets/twit.png'

class Footer extends React.Component{
    render(){
        return(
            
                <div style={{
                    height:'45vh',
                    maxHeight: '350px',
                    backgroundColor: 'white',
                    padding: '20px'
                }}>
                    <div style={{
                        position: 'relative'
                    }}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>

                            <div style={{
                                backgroundImage: 'url('+logobarbar+')',
                                width: '50px',
                                height: '50px',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}>

                            </div>
                            <p style={{
                                height: '55px',
                                display: 'block',
                                marginTop: '12px',
                                verticalAlign: 'center',
                                color: 'rgb(4, 190, 10)',
                                fontSize: '30px',
                                fontWeight: '600',
                                marginLeft: '10px'                                
                            }}>barbarkos.com</p>
                        </div>
                        <p className="gray kakikecil">
                        Dapatkan info 'kost murah' hanya di barbarkos!
                        </p>
                        <br/>
                        <p className="gray kakikecil">
                        Mau bisa begituan?
                        </p>
                        <br/>
                        <p className="kakikecil bold">
                        Download barbarkos sekarang!
                        </p>
                        
                        <div style={{paddingTop:'20px'}} className="kakikecil">
                            <Link className="green kakikecil no_decoration underline">Tentang kami</Link>
                            <span style={{marginLeft:'10px', marginRight:'10px'}} className="green">|</span>
                            <Link className="green kakikecil no_decoration underline">Promosikan kos anda - GRATIS</Link>
                            <span style={{marginLeft:'10px', marginRight:'10px'}} className="green">|</span>
                            <Link className="green kakikecil no_decoration underline">Kebijakan Privasi</Link>
                        </div>

                        {/* <div style={{padding:'20px'}} className="green kakikecil no_decoration green">
                            <image className="menu_logo" src="../assets/facebook.png"/>
                        </div> */}

                        <div style={{
                            display:'flex',
                            justifyContent:'center'
                        }}>
                            <a href='https://www.instagram.com/kenny_dkvv'>
                                <img style={{
                                    width:'50px'
                                }} src={ig}></img>
                            </a>
                            <a href='https://twitter.com/raisa6690'>
                                <img style={{
                                    width:'50px'
                                }} src={twit}></img>
                            </a>

                        </div>
                        
                        <div style={{
                            display:'flex',
                            justifyContent:'center'
                        }}>
                            <p className='green'>021-500505</p>
                        </div>
                        
                    </div>
                </div>
            
            
        )
    }
}

export default Footer