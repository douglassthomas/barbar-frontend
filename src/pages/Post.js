import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import BC from '../components/BC';
import searchIcon from '../assets/search-icon.png'
import Axios from 'axios';
import Loading from '../containers/Loading';

class Post extends Component{
    constructor(){
        super()

        this.state = {
            data:'',
            loading:false,
            boxtags:[],
            myPost:[]
        }
    }

    getPostById(){
        this.setState({
            loading:true
        })

        Axios.post('http://localhost:8000/api/getPostById',{
            id:this.props.match.params.id
        }).then(res=>{
            let tags = res.data[0].tag.split('-')
            let boxtags = []
            for(const tag of tags){
                let b = <Link to={'/post-page/'+tag} style={{display:'flex', flexDirection:'column'}} className='no_decoration'>
                <button className='btnIjo-selected'>{tag}</button>
                </Link>
                boxtags = [...boxtags, b]
            }


            this.setState({
                data:res.data[0],
                loading:false,
                boxtags:boxtags
            })

            document.getElementById('textarea').innerHTML=res.data[0].content

            this.search(res.data[0].tag.split('-')[0])
        })
    }

    search(word){
        this.setState({
            myPost:[],
        })

        Axios.post('http://localhost:8000/api/searchPost', {
            keyword : word,
            paginate: 4
        }).then(async res=>{
            console.log(res)
           
            for (const p of res.data.data){
                let tags = p.tag.split('-')
                let boxtags = []
                for(const tag of tags){
                    let b = <Link to={'/post-page/'+tag} style={{display:'flex', flexDirection:'column'}} className='no_decoration'>
                    <button className='btnIjo-selected'>{tag}</button>
                    </Link>
                    boxtags = [...boxtags, b]
                }

                let tagged = 
                <div style={this.props.mode=='mobile'?{display:'flex',width:'auto', margin:'10px', padding:'0px',boxShadow: '8px 10px 22px -10px rgba(0,0,0,0.75)'
                }:{display:'flex',width:'350px', marginBottom:'10px', marginRight:'10px', padding:'0px',boxShadow: '8px 10px 22px -10px rgba(0,0,0,0.75)'
                }} className='hoverable avoidbreak'>

                    
                    <div className='img_container_manage'>
                        <img className="profilepic" src={'http://localhost:8000/images/thumbnail/'+p.thumbnail} />
                    </div>
                    <div style={{width:'100%'}}>
                        <Link to={'/post/'+p.id} className='no_decoration'>
                            <div onClick={()=>{window.location.replace('/post/'+p.id)}} style={{display:'flex', flexDirection:'column', overflowX:'hidden', textOverflow:'ellipsis'}} className='no_decoration'>
                                <div style={{display:'inline-block', padding:'5px', fontSize:'15px', color:'black', overflowX:'hidden', textOverflow:'ellipsis', width:'100%', whiteSpace:"nowrap"}}>
                                    {p.title}
                                </div>
                                <div style={{display:'inline-block', padding:'5px', color:'darkgray', overflow:'hidden', textOverflow:'ellipsis', width:'100%', whiteSpace:"nowrap"}}>
                                    {p.created_at.split(' ')[0]}
                                </div>
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
        this.getPostById();
        
    }

    render(){
        let navigations = this.props.nav
        let fav_container = this.props.mode == 'desktop' ? 'favorite-container' : 'fav-container'
        let loading = this.state.loading?<Loading></Loading>:''


        return(<>
             <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                <NavBar apptis={this.props.apptis} cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
            </div>
            {loading}

            <div style={{
                backgroundImage:' url('+'http://localhost:8000/images/thumbnail/'+this.state.data.thumbnail+')',
                backgroundSize: 'cover',
                width: '100vw',
                float: 'inherit',
                height: '65vh',
                position: 'relative',
                paddingTop: '20vh',
                paddingBottom: '5vh'
            }}></div>

            <div className={fav_container}>
                
                    <p style={{fontSize:'25px'}}>{this.state.data.title}</p>
                
                <div id='textarea'>

                </div>

                <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
                    <div style={{color:'gray'}}>
                        Tag
                    </div>
                    <div style={{display:'flex', float:'right'}}>
                        {this.state.boxtags}
                    </div>
                </div>
                <div style={{display:'flex', overflowX:'auto', marginTop:'10px'}}>
                    {this.state.myPost}
                </div>
                
            </div>



        </>)
    }
}

export default withRouter(Post)