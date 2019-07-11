import React from 'react'

class SearchPage extends React.Component{

    constructor(){
        super()

        this.state={
            clicked:false
        }
    }

    turn = ()=>{
        this.setState({
            state:!this.state.clicked
        })
    }

    render(){
        return(
            <div style={{
                top:0,
                position:'fixed',
                width:'100vw',
                height: '100vh',
                backgroundColor:'white',
                zIndex: 99999
            }} className={this.state.state?'':'hide'}>

                <div style={{
                    margin: '0 auto',
                    padding: '25px'
                }} className='bijisearch'>
                    <div style={{
                        display: 'flex',
                    }} >
                       <div class="lds-ripple"><div></div><div></div></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SearchPage
