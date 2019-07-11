import React, {Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom'

class SearchCover extends Component{

    constructor(){
        super()

        this.state={
            resultSearch:[]
        }
    }

    search(){
        
            Axios.post('http://localhost:8000/api/search', {
                keyword: document.getElementById('searchbar').value
            }).then(res => {
                this.setState({
                    resultSearch: []
                })

                for (const r of res.data.data) {
                    let data = <Link className='no_decoration' to={'/detail/'+r.id}>
                        <div style={{
                            width: '100%',
                            height: '60px',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            // alignItems:'center',
                            // justifyContent:'space-between',
                        }} className='hoverable'>
                            <div style={{ margin: '5px' }} className='green no_decoration'>{r.name}</div>
                            <div style={{ margin: '5px', fontSize: '13px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                                className='no_decoration'>
                                {r.address}</div>
                        </div>
                    </Link>

                    this.setState({
                        resultSearch: [...this.state.resultSearch, data]
                    })
                }
            })
        
    }

    componentDidMount(){
        this.search()

        window.addEventListener('click', function () {
            this.setState({
                resultSearch:[]
            })
        }.bind(this))
    }


    render(){
        // document.body.style.overflow = 'hidden';

        return(
         <>
            <span style={{
                top:0,
                position:'fixed',
                width:'100vw',
                height: '100vh',
                backgroundColor:'white',
                zIndex: 9999
            }}>

                <div style={{
                    margin: '0 auto',
                    padding: '25px'
                }} className='bijisearch'>
                    <div style={{
                        display: 'flex',
                    }} >
                        <button style={{
                            paddingRight: '15px',
                            backgroundColor: '#ffffff00',
                            border: '0',
                            outline: 'none',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color:'rgb(4, 172, 54)'
                        }} onClick={this.props.turn}><i className="fas fa-arrow-left"></i></button>

                        <div style={{marginLeft:'50px', marginTop:'5px'}} className="search_logo"></div>
                        
                        <input style={{
                            width:'100%',
                            height: '50px',
                            padding: '5px',
                            paddingLeft: '50px',
                            fontSize: '14px',
                            outline: 'none',
                            borderRadius: '5px',
                            border: '1px solid rgb(4, 172, 54)',
                            color: 'rgb(133, 133, 133)'
                        }} type='text' 
                        id='searchbar'
                        autoComplete='off'
                        onChange={()=>this.search()} autoFocus placeholder='Coba Kemanggisan wkkwkw'/>
                    </div>

                    <div className='search-container'> 
                        {this.state.resultSearch}
                        
                    </div>
                </div>
                
    
            </span>
         </>   
        )
    }



}

export default SearchCover;
