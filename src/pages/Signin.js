import React, {Component} from 'react'
import FloatLogin from '../components/FloatLogin';

class Signin extends Component{
    showLogin(){
        
    }

    componentDidMount(){
        var type = localStorage.type ? localStorage.type : sessionStorage.type

        if (type) {
            this.props.history.push('/')
            return
        }
    }

    render(){
        return (
            <><FloatLogin showLogin={this.showLogin} tis={this} apptis={this.props.apptis}/></>
        )
    }

}

export default Signin