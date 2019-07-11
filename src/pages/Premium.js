import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import BC from '../components/BC';
import searchIcon from '../assets/search-icon.png'
import Axios from 'axios';
import { stringify } from 'querystring';

class Premium extends Component{
    constructor(){
        super()

        this.state = {
            premium:[]
        }
    }


    getPremium(){
        this.setState({
            premium:[]
        })

        Axios.post('http://localhost:8000/api/getPremium',{
            no_paginate:'nooooooo'
        }).then(async res=>{
            for(const c of res.data){
                let tagged = 
                <Link to={localStorage.type==2||sessionStorage.type==2?{
                    pathname:'/checkout',
                    state:{
                        premium:c
                    }
                }:{pathname:'/'}}
                style={{textDecoration:'none'}}>
                    <div style={this.props.mode!='mobile'?{display:'flex', color:'black', margin:'10px', width:'30%',maxWidth:'370px',minWidth:'300px' , justifyContent:'space-between'}:
                    {display:'flex', color:'black', margin:'10px', width:'100%', justifyContent:'space-between'}} className='btnIjo'>
                        <div style={{marginRight:'10px'}}>
                            <span style={{fontSize:'75px'}}>{c.day}</span>
                            <span>days</span>
                        </div>
                        <div style={{width:'50%'}}>
                            <b style={{}}>Premium {c.day} days</b>
                            <p style={c.promo!=null?{textDecoration:'line-through', color:'red'}:{}}>Rp {c.price}</p>
                            <div>
                            {c.promo==null?
                            ''
                            :
                            'Rp '+(c.price-(c.price*c.promo/100))+' -'+c.promo+'% '}
                            </div>
                        </div>
                    </div>
                </Link>

                let a = this.setState({
                    premium:[...this.state.premium, tagged]
                })
                await a
            }
            
            
            this.setState({
                goloading:false
            })
        })
    }




    componentDidMount(){
        this.getPremium()
    }

    render(){
        let navigations = this.props.nav
        let fav_container = this.props.mode == 'desktop' ? 'favorite-container' : 'fav-container'

        return(<>
             <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                <NavBar apptis={this.props.apptis} cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
            </div>
            <BC />

            <div style={{}} className={fav_container}>
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                    {this.state.premium}    
                </div>
                
            </div>



        </>)
    }
}

export default withRouter(Premium)