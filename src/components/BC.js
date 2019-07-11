import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class BC extends Component{
    render(){
        var bc = []
        let path = window.location.pathname.split('/')
        bc.push(<p className="bread"><Link to={"/"}>home</Link> > </p>)
        path.forEach(p => {
            if(p=='') {

            }
            else if(p==path[path.length-1]){
                bc.push(<p className="bread">{p}</p>)
            }
            else bc.push(<p className="bread"><Link to={"/"+p}>{p}</Link> > </p>)
        });
        return(
            <div className="bc">
                    {bc}
                </div>
        )
    }
}
export default BC