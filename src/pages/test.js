import React, {Component} from 'react'


class test extends Component{
    constructor(){
        this.state = {
            mode: 'as',
            menu: 'a'
        }
    }

    componentDidMount(){
    
    }

    render(){
        let menu = this.props.mode == 'browse'? 'hello' : ''
        return(
            <>
                {menu}
            </>
        )
    }


}

export default test