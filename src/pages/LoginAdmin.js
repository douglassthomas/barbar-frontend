import React, {Component} from 'react'
import FloatLogin from '../components/FloatLogin';
import {withRouter} from 'react-router-dom'

class LoginAdmin extends Component{
    componentDidMount(){
        var type = localStorage.type?localStorage.type:sessionStorage.type
        if(type==0){
            this.props.history.replace('/admin-manage')
        }
    }

    showLogin(){
        
    }

    render(){
        return(
            <>
                <><FloatLogin showLogin={this.showLogin} tis={this} apptis={this.props.apptis}/></>
            </>
        )
    }

}

export default withRouter(LoginAdmin)