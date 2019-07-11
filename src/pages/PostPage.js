import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import BC from '../components/BC';
import searchIcon from '../assets/search-icon.png'
import Axios from 'axios';
import { stringify } from 'querystring';

class PostPage extends Component{
    constructor(){
        super()

        this.state = {
            myPost:[]
        }
    }


    getAllPost(){
        this.setState({
            myPost:[],
            goloading:true
        })

        Axios.post('http://localhost:8000/api/getAllPost', {
            
        }).then(async res=>{
           
            for (const p of res.data.data){
                let tags = p.tag.split('-')
                let boxtags = []
                for(const tag of tags){
                    let b = <button className='btnIjo-selected' onClick={()=>{document.getElementById('keyword').value=tag; this.search()}}>{tag}</button>
                    boxtags = [...boxtags, b]
                }

                let tagged = 
                <div style={this.props.mode=='mobile'?{display:'flex',width:'auto', margin:'10px', padding:'0px'
                }:{display:'flex',width:'auto', marginBottom:'10px', padding:'0px'
                }} className='hoverable btnIjo avoidbreak'>

                    
                    <div className='img_container_manage'>
                        <img className="profilepic" src={'http://localhost:8000/images/thumbnail/'+p.thumbnail} />
                    </div>
                    <div style={{overflowX:'hidden', textOverflow:'ellipsis', width:'100%', whiteSpace:"nowrap"}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'inline-block', padding:'5px', fontSize:'15px', color:'black', overflowX:'hidden', textOverflow:'ellipsis', width:'100%', whiteSpace:"nowrap"}}>
                                {p.title}
                            </div>
                            <div style={{display:'inline-block', padding:'5px', color:'darkgray', overflow:'hidden', textOverflow:'ellipsis', width:'100%', whiteSpace:"nowrap"}}>
                                {p.created_at.split(' ')[0]}
                            </div>
                        </div>
                        <div style={{display:'flex', padding:'5px', color:'black', overflow:'hidden', width:'100%', flexWrap:'wrap'}}>
                            {boxtags}
                        </div>
                    </div>
                    
                </div>

                let a = this.setState({
                    myPost: [...this.state.myPost, tagged]
                })
                await a
            }

            if(res.data.next_page_url!=null){
                let tagged = 
                <div style={{display:'flex',width:'300px', height:'120px', border:'1px solid gray', margin:'10px' }} className='hoverable'>
                    <button style={{width:'100%'}} className='btnIjo' onClick={()=>this.loadMorePost(res.data.next_page_url)}>Load More</button>
                </div>

                this.setState({
                    myPost: [...this.state.myPost, tagged]
                })
            }

            this.setState({
                goloading:false
            })
        })
    }


    search(){
        this.setState({
            myPost:[],
        })

        Axios.post('http://localhost:8000/api/searchPost', {
            keyword : document.getElementById('keyword').value
        }).then(async res=>{
           
            for (const p of res.data.data){
                let tags = p.tag.split('-')
                let boxtags = []
                for(const tag of tags){
                    let b = <button className='btnIjo-selected' onClick={()=>{document.getElementById('keyword').value=tag; this.search()}}>{tag}</button>
                    boxtags = [...boxtags, b]
                }

                let tagged = 
                <div style={this.props.mode=='mobile'?
                {display:'flex',width:'auto', margin:'10px', padding:'0px', boxShadow:'8px 10px 22px -10px rgba(0,0,0,0.75)'}:
                {display:'flex',width:'auto', marginBottom:'10px', padding:'0px',boxShadow: '8px 10px 22px -10px rgba(0,0,0,0.75)'}} 
                className='hoverable avoidbreak'>

                    
                    <div className='img_container_manage'>
                        <img className="profilepic" src={'http://localhost:8000/images/thumbnail/'+p.thumbnail} />
                    </div>
                    <div style={{width:'100%'}}>
                        <Link to={'/post/'+p.id} style={{display:'flex', flexDirection:'column'}} className='no_decoration'>
                            <div style={{display:'inline-block', padding:'5px', fontSize:'15px', color:'black', overflowX:'hidden', textOverflow:'ellipsis', width:'100%', whiteSpace:"nowrap"}}>
                                {p.title}
                            </div>
                            <div style={{display:'inline-block', padding:'5px', color:'darkgray', overflow:'hidden', textOverflow:'ellipsis', width:'100%', whiteSpace:"nowrap"}}>
                                {p.created_at.split(' ')[0]}
                            </div>
                        </Link>
                        
                        <div style={{display:'flex', padding:'5px', color:'black', overflow:'hidden', width:'100%', flexWrap:'wrap'}}>
                            {boxtags}
                        </div>
                    </div>
                    
                </div>

                let a = this.setState({
                    myPost: [...this.state.myPost, tagged]
                })
                await a
            }

            if(res.data.next_page_url!=null){
                let tagged = 
                <div style={{display:'flex',width:'300px', height:'120px', border:'1px solid gray', margin:'10px' }} className='hoverable'>
                    <button style={{width:'100%'}} className='btnIjo' onClick={()=>this.loadMorePost(res.data.next_page_url)}>Load More</button>
                </div>

                this.setState({
                    myPost: [...this.state.myPost, tagged]
                })
            }

        })
    }



    componentDidMount(){
        var key = this.props.match.params.key

        console.log(stringify(this.props.match.params))
        if(stringify(this.props.match.params)==""){
            this.search()
        }
        else{
            document.getElementById('keyword').value=key
            this.search()
        }
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
                <div style={{margin:'0'}} className='btnIjo-selected'>
                    <input id='keyword' onChange={()=>this.search()}
                    style={{marginBottom:'20px', width:'100%'}} type='text' className='btnIjo'></input>
                </div>
                
                <div style={this.props.mode=='desktop'?{height:'100%', columns:'3', marginTop:'10px'}:this.props.mode!='mobile'?
                {height:'100%', columns:'2', marginTop:'10px'}:{}}>
                    {this.state.myPost}    
                </div>
                
            </div>



        </>)
    }
}

export default withRouter(PostPage)