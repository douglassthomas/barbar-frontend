import React, {Component} from 'react'
import mami from '../assets/logoibu.png'

class People extends Component{

    render(){
        let p = this.props.type == 'panel'?
        <div className="people-container">
            <div>
                <img className="thumbnail-people" src={this.props.profile_pic!=null?'http://localhost:8000/images/profile_picture/'+this.props.profile_pic:mami}></img>
            </div>
            <div>
                <p className="name-people">{this.props.peoplename}</p>
                <p className="chat-snippet">{this.props.message?this.props.message:'Pada hari minggu ku turut ayah ke kota naik grab'}</p>
            </div>
        </div>
        :
        <div className="people-container-head">
            <div>
                <img className="thumbnail-people" src={this.props.profile_pic!=null?'http://localhost:8000/images/profile_picture/'+this.props.profile_pic:mami}></img>
            </div>
            <div>
                <p className="name-people-head">{this.props.peoplename?this.props.peoplename:'Hubungi Pemilik Kos/Apartemen KUY!'}</p>
                <p className='chat-snippet'></p>
            </div>
        </div>

        return (
            <>
                {p}
            </>
        )
    }

}

export default People