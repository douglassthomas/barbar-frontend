import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class Reco extends Component{


    componentDidMount(){
        // console.log(this.props.info)
        // console.log(this.props.price)
    }


    render(){
        let a = window.location.pathname
        var aa = a.split('/')
        let linkto = aa[1]=='detail'?this.props.property_id:'detail/'+this.props.property_id
        return(
            
            <div className={this.props.size=='big'?"reco_container bebijian":this.props.size=='small'?"reco_container_small":"reco_container_cari"}>
                <Link style={{
                textDecoration:'none'
                }} to={{pathname:linkto, state:{info: this.props.info}}}>
                
                
                <div style={{
                    backgroundImage:'url('+this.props.header+')',
                    minWidth: '300px',
                    width:'100%',
                    height: '270px',
                    backgroundSize: 'cover'
                }}>
                </div>
                <div className={this.props.size=='big'?"ellipsis":"ellipsis_small"} style={{padding:'15px 20px',fontSize:'14px'}}>
                    <span className="purple bold ">Campur</span> 
                    <span> • </span>
                    <span className="gray bold">{this.props.info?this.props.info.address:''}</span>
                </div>
                <div className={this.props.size=='big'?"ellipsis":"ellipsis_small"} style={{padding:'0px 20px', fontSize:'14px'}}>
                    <span className="lightgray bold ">
                    {this.props.price?this.props.price[0].monthly_price?this.props.price[0].monthly_price:
                    this.props.price[0].yearly_price?this.props.price[0].yearly_price:
                    this.props.price[0].weekly_price?this.props.price[0].weekly_price:
                    this.props.price[0].daily_price:0} / 
                    {this.props.price?this.props.price[0].monthly_price?'Bulan':
                    this.props.price[0].yearly_price?'Tahun':
                    this.props.price[0].weekly_price?'Minggu':
                    'Hari':'bulan'}
                    </span> 
                    <span> • </span>
                    <span className="gray bold">Kamar Penuh</span>
                </div>
                <div style={{padding:'15px 20px', fontSize:'14px'}}>
                    <span className={this.props.size=='big'?"lightgray ellipsis":"lightgray ellipsis_small"}>{this.props.name}</span>
                </div>
        
                <div style={{padding:'0px 20px', fontSize:'13px'}}>
                    <img style={{width:'13px', marginRight:'10px'}} src={this.props.premium}/>
                    <img style={{width:'13px'}} src={this.props.promote}/>
                    <span> • </span>
                    <span className="lightgray">Update kemarin</span>
                </div>
                </Link>
            </div>
        )
    }
}


export default Reco