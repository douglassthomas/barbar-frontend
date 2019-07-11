import React, {Component} from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import FloatLogin from './FloatLogin';

class Navigation extends Component{

    constructor(){
        super()

    }

    masuk(){
        
    }


    render(){
        let classNav = this.props.godown ? 'menu_item_down' : 'hide'
        let classMenu = this.props.godown ? 'menu_list_down' : 'menu_list'
        let menuLink = this.props.godown ? 'menu_link_down' : 'menu_link'

        let gratis = <p style={{
            width: 'inherit',
            textAlign: 'center',
            marginTop:'3px',
            fontSize: '11px',
            color: 'white'
        }}>
            GRATIS
        </p>

        let navigations = this.props.nav.map((link, index)=>{
            if(!this.props.dropdown) classNav='menu_item'
                if(link.label === 'Cari Kos'){
                    return(
                        <li className={classNav} key={index}>
                        <li onClick={this.props.showForm.bind(this.props.tis)} className={menuLink} >{link.label}
                        <p style={{fontSize:'8px', marginLeft:'5px'}}>▼</p>
                        </li>
                        </li>
                        
                    );
                }
                else if(link.label === 'Promosi'){
                    return(
                        <li className={classNav} key={index}>
                        <div style={{
                            width:'50px',
                            height: '18px',
                            position: 'absolute',
                            backgroundColor: 'orangered',
                            borderRadius: '5px',
                            marginLeft: '80px',
                            marginTop: '4px'
                        }}>
                            {gratis}
                        </div>
                        <Link to={link.link} className={menuLink} onClick={this.props.hideForm.bind(this.props.tis)} key={index}>{link.label}</Link>
                        
                        </li>
                        
                    );
                }
                else if(link.label === 'Masuk'){
                    return(
                        <li className={classNav} key={index}>
                            <Link className={menuLink} onClick={this.props.showMasuk.bind(this.props.tis)} key={index}>{link.label}</Link>
                        </li>
                        
                    );
                }
                else{
                    // let kelas = {menuLink}+" no-decoration"
                    return(
                        <li className={classNav} key={index}>
                            <Link onClick={this.props.accKit.bind(this.props.tis)} className={menuLink} key={index}>{link.label}</Link>
                        </li>
                        
                    );
                }
        })



        


        

        
        return(
            // <div style={{
            //     height: 'inherit'
            // }}>
                <ul className={classMenu}>
                    {navigations}
                </ul>
                
            // </div>
            
        );
    }
}

export default Navigation