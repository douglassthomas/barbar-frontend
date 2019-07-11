import React, {Component} from 'react'

class Loading extends Component{
    render(){
        return(
            <>
            <div style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: '0',
                left: '0',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '110000000'
            }}>
                <div class="lds-ripple"><div></div><div></div></div>
                
            </div>
            </>
        )
    }
}

export default Loading