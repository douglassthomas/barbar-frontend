import React, {Component} from 'react'
import Axios from 'axios';
import Review from '../components/Review';
import {Link, withRouter} from 'react-router-dom'
import NavBar from '../containers/NavBar';
import BC from '../components/BC';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'

class ReviewPage extends Component{
    constructor(){
        super()

        this.state={
            reviews:[],
            view:false
        }
    }
    
    getReviewByPropertyId(){
        if(this.state.view==false){
            var property_id = this.props.match.params.id
            Axios.post('http://localhost:8000/api/getReviewByPropertyIdnopage',{
                property_id:property_id,
            }).then(res=>{
                this.setState({
                    reviews:[]
                })

                
                for(const r of res.data){
                    // console.log(r)
                    
                    this.setState({
                        reviews:[...this.state.reviews, <Review tis={this} reload={this.getReviewByPropertyId} info={this.state.info} data={r} child={r.children}/>],
                        
                    })
                }

                
            })
        }
    }
    componentDidMount(){
        this.getReviewByPropertyId()
    }

    render(){
        let review = this.state.reviews
        let navigations = this.props.nav
        let fav_container = this.props.mode=='desktop'?'favorite-container':'fav-container'
        return(
            <>
            <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                <NavBar apptis={this.props.apptis} cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
            </div>
            {/* <BC/> */}

            <h1 className='green'>Review</h1>
            <div className={fav_container}>
                {review}
            </div>
            
            </>
        )
    }

}

export default withRouter(ReviewPage)