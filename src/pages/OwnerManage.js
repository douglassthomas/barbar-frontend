import React, { Component } from 'react'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import People from '../components/People';
import jodie from '../assets/jodie.jpg';
import wifi from '../assets/wifi.png';
import wc from '../assets/wc.png';
import ac from '../assets/ac.png';
import kitchen from '../assets/kitchen.png'
import swim from '../assets/swim.png'
import motor from '../assets/motor.png'
import car from '../assets/car.png'
import girl from '../assets/girl.png'
import boy from '../assets/boy.png'
import {Link} from 'react-router-dom'

import Axios from 'axios';
import L from 'leaflet'
import BubblePop from '../components/BubblePop';
import Recommend from '../containers/Recommend';
import header from '../assets/header.jpg'
import BubPop from '../components/BubPop';
import Loading from '../containers/Loading';
import BC from '../components/BC';



class OwnerManage extends Component {
    
    constructor() {
        super()

        this.state = {
            page: 1,
            city: [],
            imgPicture: [],
            mapLoaded: false,
            roomf: [],
            publicf: [],
            lat: 0,
            long: 0,
            error: '',
            switch: 'house',
            loginPencari:false,
            mine:[],
            updating:false,
            loading:false,
            pop:<></>
        }

    }

    changeClassLabel() {
        console.log('a')
    }

    showLogin(){
        this.setState({
            loginPencari: !this.state.loginPencari
        })
        document.body.style.overflow='auto'
    }

    delKost(id){
        this.setState({
            loading:true,
            pop:''
        })
        Axios.post('http://localhost:8000/api/delProperty',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            id:id
        }).then(res=>{
            this.setState({
                error:<BubPop message={res.data}></BubPop>,
                loading:false
            })
        })
    }

    cancelPop(){
        this.setState({
            pop:<></>
        })

        // alert('ye')
    }

    popConfirmDelete(id, message, next){
        let data = <>
            <div style={{
                width:'100vw',
                height:'100vh',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                position:'fixed',
                left:'0',
                top:'0',
                backgroundColor:'#3f3f3f2d'
            }}>

                <div style={{
                    borderRadius:'10px',
                    width:'250px',
                    // height:'200px',
                    padding:'20px',
                    display:'flex',
                    flexWrap:'wrap',
                    justifyContent:'center',
                    backgroundColor:'#FFFFFF',
                }}>
                    <span style={{width:'250px', textAlign:'center', padding:'20px'}}>{message}</span>
                    <button onClick={()=>{next(id)}} className='btnOrange'>DELETE</button>
                    <button onClick={()=>{this.cancelPop()}} className='btnIjo'>CANCEL</button>
                </div>
            </div>
        </>

        this.setState({
            pop:data
        })
    }

    next() {

        if (this.state.page == 1) {
            if (document.getElementById('name').value == '') {
                this.setState({
                    error: 'Name must be filled'
                })
            } else {
                let num = this.state.page + 1
                if (num > 3) num = 3

                this.setState({
                    error: '',
                    page: num
                })
            }

        } else if (this.state.page == 2) {
            if (document.getElementById('description').value.length < 8) {
                this.setState({
                    error: 'Description must be filled at least by 8 characters'
                })
            } else {
                let num = this.state.page + 1
                if (num > 3) num = 3

                this.setState({
                    error: '',
                    page: num
                })
            }
        }
    }


    prev() {
        let num = this.state.page - 1
        if (num < 1) num = 1

        this.setState({
            page: num
        })
    }

    prevV() {
        let num = this.state.page - 1
        if (num < 1) num = 1

        this.setState({
            page: num
        })

        // this.setState({
        //     mapLoaded: true
        // })
    }


    submitProperty(e) {
        e.preventDefault()
        // this.getChoosenRoomf()
        // alert('asd')
        let link = 
        // !this.state.updating?
        this.state.switch=='house'?'http://localhost:8000/api/addHouse':'http://localhost:8000/api/addApartement'
        // :
        // this.state.switch=='house'?'http://localhost:8000/api/updateHouse':'http://localhost:8000/api/updateApartement'
        
        let formData = new FormData(document.getElementById('ini-form'));
        formData.append('property_id', this.state.updateid)

        let headers = {
            'content-type': 'multipart/form-data'
        }
        Axios.post(link,
            formData
            , headers).then(
                res => {
                    if(res.data.success == true){
                        this.setState({
                            msg:'Success post a Property'
                        })
                        this.showLogin()
                    }else{
                        this.setState({
                            msg:'Error'
                        })
                        this.showLogin()
                    }
                }
            )
    }

    getCity() {
        this.setState({
            city: []
        })

        Axios.get('http://localhost:8000/api/getCity', {
        }).then(
            res => {
                const arrRes = res.data

                for (const result of arrRes) {
                    let tagged = result.name.includes('JAKARTA BARAT') ? <option values={result.id} selected>{result.name}</option> :
                        <option>{result.name}</option>

                    // console.log(result[1].name)
                    this.setState({
                        city: [...this.state.city, tagged]
                    })
                }

            }
        )
    }

    

    updKost(m){
        document.getElementById('name').value = m.name
        if(m.propertiable.gender_type=='BoyGirl'){
            document.getElementById('gender_boy').checked = true
            document.getElementById('gender_girl').checked = true
        }
        else if(m.propertiable.gender_type=='Boy'){
            document.getElementById('gender_boy').checked = true
        }
        else if(m.propertiable.gender_type=='Girl'){
            document.getElementById('gender_girl').checked = true
        }
        document.getElementById('description').value = m.description
        document.getElementById('price-year').value = m.price[0].yearly_price?m.price[0].yearly_price:''
        document.getElementById('price-month').value = m.price[0].monthly_price?m.price[0].monthly_price:''
        document.getElementById('price-week').value = m.price[0].weekly_price?m.price[0].weekly_price:''
        document.getElementById('price-day').value = m.price[0].daily_price?m.price[0].daily_price:''

        document.getElementById('address').value = m.address
        

        this.setState({
            updating:true,
            updateid:m.id
        })
    }

    getMyKost(){
        Axios.post('http://localhost:8000/api/getKostByOwnerId',{
            owner_id:localStorage.id?localStorage.id:sessionStorage.id
        }).then(res=>{
            this.setState({
                mine:[]
            })

            for(const m of res.data.data){
                let rec = <>
                
                    <div style={{width:'200px', margin:'5px'}} className='hoverable'>
                        <div style={{
                            backgroundImage:'url(http://localhost:8000/images/banner/'+m.banner_id+')',
                            width: '200px',
                            height: '200px',
                            backgroundSize: 'cover'
                        }}></div>
                        
                        <div style={{overflow: 'hidden',
                        whiteSpace:'nowrap',
                        textOverflow: 'ellipsis',
                        fontSize:'14px'
                        }} className='green'>
                            {m.name}
                        </div>

                        <div
                        onClick={()=>this.popConfirmDelete(m.id, "Are you sure want to delete this property?", this.delKost.bind(this))}
                        style={{width:'100%', textAlign:'center', marginTop:'5px'}} className='no_decoration btnOrange'>DELETE</div>
                        <div 
                        onClick={()=>this.updKost(m)}
                        style={{width:'100%', textAlign:'center', marginTop:'5px'}} className='no_decoration btnIjo-selected'>UPDATE</div>
                        <Link to={'detail/'+m.id}><div style={{width:'100%', textAlign:'center', marginTop:'5px'}} className='no_decoration btnIjo'>VIEW</div></Link>
                    </div>
                </>
                
                this.setState({
                    mine:[...this.state.mine, rec]
                })
            }

        })
    }

    getMyApartement(){
        Axios.post('http://localhost:8000/api/getApartementByOwnerId',{
            owner_id:localStorage.id?localStorage.id:sessionStorage.id
        }).then(res=>{
            this.setState({
                mine:[]
            })

            for(const m of res.data.data){
                let rec = <>
                
                    <div style={{width:'200px', margin:'5px'}} className='hoverable'>
                        <div style={{
                            backgroundImage:'url(http://localhost:8000/images/banner/'+m.banner_id+')',
                            width: '200px',
                            height: '200px',
                            backgroundSize: 'cover'
                        }}></div>
                        
                        <div style={{overflow: 'hidden',
                        whiteSpace:'nowrap',
                        textOverflow: 'ellipsis',
                        fontSize:'14px'
                        }} className='green'>
                            {m.name}
                        </div>

                        <div
                        onClick={()=>this.delProperty(m.id)}
                        style={{width:'100%', textAlign:'center', marginTop:'5px'}} className='no_decoration btnOrange'>DELETE</div>
                        <div 
                        onClick={()=>this.submitProperty()}
                        style={{width:'100%', textAlign:'center', marginTop:'5px'}} className='no_decoration btnIjo-selected'>UPDATE</div>
                        <Link to={'detail/'+m.id}><div style={{width:'100%', textAlign:'center', marginTop:'5px'}} className='no_decoration btnIjo'>VIEW</div></Link>
                    </div>
                </>
                
                this.setState({
                    mine:[...this.state.mine, rec]
                })
            }

        })
    }

    getRoomf() {
        this.setState({
            roomf: []
        })
        let count = 0;

        Axios.get('http://localhost:8000/api/getRoomFacilities', {
        }).then(
            res => {
                const arrRes = res.data
                count = 1;

                for (const result of arrRes) {
                    let tagged =
                        <>
                            <input style={{ marginLeft: '5px', marginRight: '5px', display: '' }} type='checkbox' className='btnIjo room_facilities' id={'roomf' + (count)} name='roomf[]' value={result.id} />
                            <span className='small-text green'>
                                <label for={'roomf' + (count++)}><img className='img-facilities' src={'http://localhost:8000/roomf/' + result.icon}></img></label>
                            </span>
                        </>

                    // console.log('roomf'+count)
                    this.setState({
                        roomf: [...this.state.roomf, tagged]
                    })
                }

            }
        )
    }

    getPublicf() {
        this.setState({
            publicf: []
        })

        Axios.get('http://localhost:8000/api/getPublicFacilities', {
        }).then(
            res => {
                const arrRes = res.data
                let count = 1;
                for (const result of arrRes) {
                    let tagged =
                        <>
                            <input style={{ marginLeft: '5px', marginRight: '5px', display: '' }} type='checkbox' className='btnIjo public_facilities' id={'publicf' + count} name='publicf[]' value={result.id} />
                            <span className='small-text green'>
                                <label for={'publicf' + count++}><img className='img-facilities' src={'http://localhost:8000/publicf/' + result.icon}></img></label>
                            </span>
                        </>

                    // console.log(result)
                    this.setState({
                        publicf: [...this.state.publicf, tagged]
                    })
                }

            }
        )
    }

    loadMap() {
        // var L = window.L
        var lat = 0;
        var long = 0;


        if (this.state.mapLoaded == false) {
            this.setState({
                mapLoaded: true
            })
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;

                    this.setState({
                        lat: lat,
                        long: long
                    })

                    var mymap = L.map('map-manage').setView([lat, long], 15);
                    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 18,
                        id: 'mapbox.streets',
                        accessToken: 'pk.eyJ1IjoiZG91Z2xhc3N0aG9tYXMiLCJhIjoiY2p2OHNkYmR5MGU3bTRkbzRsdnFxZnV0NiJ9.H6mZ7MiojSngltoufzk7tw'
                    }).addTo(mymap);

                    var mark = new L.marker(
                        L.latLng(
                            parseFloat(lat),
                            parseFloat(long)
                        ), { draggable: true }
                    )

                    mymap.addLayer(mark)
                    mark.on('dragend', function (event) {
                        var latlng = event.target.getLatLng();
                        this.setState({
                            lat: latlng.lat,
                            long: latlng.lng
                        })
                    }.bind(this));
                    mark.dragging.enable()

                    // document.addEventListener('DOMContentLoaded', mymap.invalidateSize(true))

                }.bind(this));
            }
        }
    }

    handleChange() {
        var file = this.refs.banner.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        console.log(reader.result)

        reader.onloadend = function (e) {

            let img = <div className='img_container_manage'>
                <img className="profilepic" src={reader.result} />
            </div>

            this.setState({
                imgSrc: [img]
            })
        }.bind(this);
    }

    handlePictures() {
        var file = this.refs.pictures.files;
        // console.log(file)
        this.setState({
            imgPicture: []
        })

        for (var i = 0; i < file.length; i++) {
            var reader = new FileReader();
            var url = reader.readAsDataURL(file[i]);
            // console.log(reader.result)

            reader.onloadend = function (e) {
                let img = <div className='img_container_manage'>
                    <img className="profilepic" src={reader.result} />
                </div>

                this.setState({
                    imgPicture: [...this.state.imgPicture, img]
                })
            }.bind(this);
        }
    }

    switchTypeState(){
        this.setState({switch:'apartement', page:1})
        this.getMyApartement()
    }

    switchTypeStatee(){
        this.setState({switch:'house', page:1})
        this.getMyKost()
    }

    handle360() {
        var file = this.refs.picture360.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        console.log(reader.result)

        reader.onloadend = function (e) {

            let img = <div className='img_container_manage'>
                <img className="profilepic" src={reader.result} />
            </div>

            this.setState({
                img360: [img]
            })
        }.bind(this);
    }

    handleVideo() {
        var file = this.refs.video.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        // console.log(reader.result)

        reader.onloadend = function (e) {
            let img =
                <video width="400px" height='250px' src={reader.result} controls></video>

            this.setState({
                video: [img]
            })
        }.bind(this);
    }



    componentDidMount() {
        this.getCity()
        this.getRoomf()
        this.getPublicf()

        this.getMyKost()
        // document.addEventListener('DOMContentLoaded', this.loadMap.bind(this));
        // document.getElementById('banner').onc
    }

    componentDidUpdate() {
        if (this.state.page == 3) {
            // document.addEventListener('DOMContentLoaded', this.loadMap);
            if (this.state.mapLoaded == false) {
                this.loadMap()
            }

        }
    }

    render() {
        let img_container = this.props.mode == 'desktop' ? 'img_container' : 'img_container_mobile'
        let nav_man = this.state.page == 2 ?
            <>
                <button onClick={this.prev.bind(this)} className='green btnOrange'>prev</button>
                <button onClick={this.next.bind(this)} className='green btnIjo'>next</button></> : this.state.page == 1 ? <>
                    <span onClick={this.prev.bind(this)} className='green'></span>
                    <button onClick={this.next.bind(this)} className='green btnIjo'>next</button></> :
                <>
                    <button onClick={this.prevV.bind(this)} className='green btnOrange'>prev</button>
                    <span onClick={this.next.bind(this)} className='green'></span></>


        let satu = this.state.page == 1 ? { display: '' } : { display: 'none' }
        let dua = this.state.page == 2 ? { display: '' } : { display: 'none' }
        let tiga = this.state.page == 3 ? { display: 'flex', alignItems:'center', flexDirection:'column' } : { display: 'none' }

        let city = this.state.city;

        var mapni = <><link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossOrigin="" />
            <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
                integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
                crossOrigin=""></script>
            <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>

            <div style={{ zIndex: 999 }} id="map-manage" className={this.props.mode == 'mobile' ? 'map-manage-mobile' : 'map-manage'}></div></>


        let pictures_file = this.state.imgPicture
        let banner_file = this.state.imgSrc
        let picture360_file = this.state.img360
        let video_file = this.state.video

        let roomf = this.state.roomf
        let publicf = this.state.publicf
        let errorMsg = this.state.error

        let mine = this.state.mine

        let switchType = this.state.switch == 'house' ?
            <><form id='ini-form' className={this.props.mode == 'desktop' ? 'container-edit-profile' : 'container-edit-profile-mobile'} onSubmit={(e) => this.submitProperty(e)}
            // action='http://localhost:8000/api/addHouse' enctype="multipart/form-data" method='post'
            >
                <input type='hidden' name='property_id' value={this.state.updateid?this.state.updateid:''}/>
                <input type='hidden' name='owner_id' value={window.localStorage.id ? window.localStorage.id : window.sessionStorage.id} />
                <input type='hidden' name='token' value={window.localStorage.token ? window.localStorage.token : window.sessionStorage.token} />
                <p id='error' style={{ color: 'red', fontSize: '14px' }}>{errorMsg}</p>
                <div id='1' style={satu}>
                    <table className='table-text'>
                        <tr>
                            <td><label for='name' className='small-text gray'>Name</label></td>
                            <td>
                                <input autoFocus id='name' name='name' type='text' className='input-text btnIjo' placeholder="name"></input>
                            </td>
                        </tr>

                        <tr>
                            <td><label for='name' className='small-text gray'>Pictures</label></td>
                            <td style={{ height: '50px' }}>
                                <input ref='pictures' name='pictures[]' id='pictures' onChange={() => this.handlePictures()}
                                    className='hide' type='file' multiple></input>
                                <label for="pictures" className='btnIjo' >Upload</label>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {pictures_file}
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td><label for='banner' className='small-text gray'>Banner</label></td>
                            <td style={{ height: '50px' }}>
                                <input ref='banner' name='banner' id='banner' onChange={() => this.handleChange()}
                                    className='hide' type='file'></input>
                                <label for="banner" className='btnIjo' >Upload</label>

                            </td>
                        </tr>
                        {banner_file}

                        <tr>
                            <td><label for='picture360' className='small-text gray'>Picture 360</label></td>
                            <td style={{ height: '50px' }}>
                                <input ref='picture360' name='picture360' id='picture360' className='hide' onChange={() => this.handle360()}
                                    type='file'></input>
                                <label for="picture360" className='btnIjo' >Upload</label>
                            </td>
                        </tr>
                        {picture360_file}

                        <tr>
                            <td><label for='video' className='small-text gray'>Video</label></td>
                            <td style={{ height: '50px' }}>
                                <input ref='video' name='video' id='video' className='hide' onChange={() => this.handleVideo()}
                                    type='file'></input>
                                <label for="video" className='btnIjo'>Upload</label>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {video_file}
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div id='2' style={dua}>
                    <table className='table-text'>
                        <tr>
                            <td><label for='name' className='small-text gray'>Gender Type</label></td>
                            <td style={{ display: 'flex', flexDirection: 'row' }}>
                                <input style={{ marginLeft: '5px', marginRight: '5px', display: '' }} type='checkbox' className='btnIjo' id='gender_boy' name='gender_type[]' value="Boy" />
                                <span className='small-text green'>
                                    <label for='gender_boy'><img id='roomf1-lbl' className='img-facilities' src={boy}></img></label>
                                </span>

                                <input style={{ marginLeft: '5px', marginRight: '5px' }} type='checkbox' className='btnIjo' name='gender_type[]' id='gender_girl' value="Girl" />
                                <span className='small-text green'>
                                    <label for='gender_girl'><img id='roomf1-lbl' className='img-facilities' src={girl}></img></label>
                                </span>

                            </td>
                        </tr>
                        <tr>
                            <td><label for='description' className='small-text gray'>Description</label></td>
                            <td>
                                <textarea id='description' name='description' type='text' className='input-textarea btnIjo' placeholder="kosnya mantul, ibu kostnya selebgram ..."></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td><label for='' className='small-text gray'>Room facilities</label></td>

                            <td style={{ display: 'flex', flexDirection: 'row' }}>
                                {/* ROOMF DI SINI */}
                                <div style={{
                                    display:'flex',
                                    flexWrap:'wrap'
                                }}>
                                    {roomf}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><label for='area' className='small-text gray'>Area (m2)</label></td>
                            <td>
                                <input name='area' type='text' className='input-text btnIjo' placeholder="29"></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label for='name' className='small-text gray'>Public facilities</label></td>
                            <td style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{
                                    display:'flex',
                                    flexWrap:'wrap'
                                }}>
                                    {publicf}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><label for='name' className='small-text gray'>Parking facilities</label></td>
                            <td style={{ display: 'flex', flexDirection: 'row' }}>
                                <input style={{ marginLeft: '5px', marginRight: '5px', display: '' }} autoFocus type='checkbox' className='btnIjo' id='parkingf1' name='parking[]' value="Motor" />
                                <span className='small-text green'>
                                    <label for='parkingf1'><img id='roomf1-lbl' className='img-facilities' src={motor}></img></label>
                                </span>

                                <input style={{ marginLeft: '5px', marginRight: '5px' }} autoFocus type='checkbox' className='btnIjo' name='parking[]' id='parkingf2' value="Car" />
                                <span className='small-text green'>
                                    <label for='parkingf2'><img id='roomf1-lbl' className='img-facilities' src={car}></img></label>
                                </span>

                            </td>
                        </tr>
                        <tr>
                            <td><label for='information' className='small-text gray'>Additional Information</label></td>
                            <td>
                                <textarea id='information' name='information' type='text' className='input-textarea btnIjo' placeholder="Listrik dan air FREE"></textarea>
                            </td>
                        </tr>
                    </table>

                </div>

                <div id='3' style={tiga}>
                    <table className='table-text'>
                        <tr>
                            <td><label for='fee' className='small-text gray'>Additional Fees (Rp)</label></td>
                            <td>
                                <input id='fee' name='fee' type='numeric' className='input-text btnIjo' placeholder="100000"></input>
                            </td>
                        </tr>

                        <tr>
                            <td><label for='price' className='small-text gray'>Price (Rp)</label></td>
                            <td>
                                <input type='hidden' name='price' value={document.getElementById('price-year') ? 1 : document.getElementById('price-month') ? 1 : document.getElementById('price-week') ? 1 : document.getElementById('price-day') ? 1 : 0} />
                                <input id='price-year' name='price_year' type='numeric' className='input-text btnIjo' placeholder="Yearly"></input>
                                <input id='price-month' name='price_month' type='numeric' className='input-text btnIjo' placeholder="Monthly"></input>
                                <input id='price-week' name='price_week' type='numeric' className='input-text btnIjo' placeholder="Weekly"></input>
                                <input id='price-day' name='price_day' type='numeric' className='input-text btnIjo' placeholder="Daily"></input>
                            </td>
                        </tr>

                        <tr>
                            <td><label for='city' className='small-text gray'>City</label></td>
                            <td>
                                <select id='city' name='city_id' type='numeric' className='input-text btnIjo' placeholder="name">

                                    {city}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label for='address' className='small-text gray'>Address</label></td>
                            <td>
                                <textarea id='address' name='address' type='text' className='input-textarea btnIjo' placeholder="Jalan Kebon Jeruk Raya no 27"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td><label for='room_left' className='small-text gray'>Room Left</label></td>
                            <td>
                                <input name='room_left' id='room_left' type='numeric' className='input-text btnIjo' placeholder="5"></input>
                            </td>
                        </tr>
                    </table>

                    {mapni}
                    <input type='hidden' name='latitude' value={this.state.lat} />
                    <input type='hidden' name='longitude' value={this.state.long} />

                    <input style={{ margin: '5px', width: '100%' }} type='submit' className='btnIjo-selected' value='POST' />
                </div>
            </form></>
            :
            <form id='ini-form' className={this.props.mode=='desktop'?'container-edit-profile':'container-edit-profile-mobile'} onSubmit={(e)=>this.submitProperty(e)}
                // action='http://localhost:8000/api/addHouse' enctype="multipart/form-data" method='post'
                >
                    <input type='hidden' name='owner_id' value={window.localStorage.id?window.localStorage.id:window.sessionStorage.id}/>
                    <input type='hidden' name='token' value={window.localStorage.token?window.localStorage.token:window.sessionStorage.token}/>
                    <p id='error' style={{color:'red', fontSize:'14px'}}>{errorMsg}</p>
                    <div id='1' style={satu}>
                        <table className='table-text'>
                            <tr>
                                <td><label for='name' className='small-text gray'>Name</label></td>
                                <td>
                                    <input autoFocus id='name' name='name' type='text' className='input-text btnIjo' placeholder="name"></input>
                                </td>
                            </tr>

                            <tr>
                                <td><label for='name' className='small-text gray'>Pictures</label></td>
                                <td style={{ height: '50px' }}>
                                    <input ref='pictures' name='pictures[]' id='pictures' onChange={ () => this.handlePictures() }
                                     className='hide' type='file' multiple></input>
                                    <label for="pictures" className='btnIjo' >Upload</label>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {pictures_file}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td><label for='banner' className='small-text gray'>Banner</label></td>
                                <td style={{ height: '50px' }}>
                                    <input ref='banner' name='banner' id='banner' onChange={ () => this.handleChange() }
                                     className='hide' type='file'></input>
                                    <label for="banner" className='btnIjo' >Upload</label>

                                </td>
                            </tr>
                            {banner_file}

                            <tr>
                                <td><label for='picture360' className='small-text gray'>Picture 360</label></td>
                                <td style={{ height: '50px' }}>
                                    <input ref='picture360' name='picture360' id='picture360' className='hide' onChange={ () => this.handle360() }
                                     type='file'></input>
                                    <label for="picture360" className='btnIjo' >Upload</label>
                                </td>
                            </tr>
                            {picture360_file}

                            <tr>
                                <td><label for='video' className='small-text gray'>Video</label></td>
                                <td style={{ height: '50px' }}>
                                    <input ref='video' name='video' id='video' className='hide' onChange={ () => this.handleVideo() }
                                     type='file'></input>
                                    <label for="video" className='btnIjo'>Upload</label>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {video_file}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div id='2' style={dua}>
                        <table className='table-text'>
                            <tr>
                                <td><label className='small-text gray'>Unit Type</label></td>
                                <td style={{ display: 'flex', flexDirection: 'row' }}>
                                    <input style={{ marginLeft: '5px', marginRight: '5px', display: '' }} type='radio' className='btnIjo' id='studio' name='unit_type' value="studio" />
                                    <span className='small-text green'>
                                        STUDIO
                                    </span>

                                    <input style={{ marginLeft: '5px', marginRight: '5px' }} type='radio' className='btnIjo' name='unit_type' id='bedrooms' value="bedrooms" />
                                    <span className='small-text green'>
                                        BEDROOMS
                                    </span>

                                </td>
                            </tr>
                            <tr>
                                <td><label for='description' className='small-text gray'>Description</label></td>
                                <td>
                                    <textarea id='description' name='description' type='text' className='input-textarea btnIjo' placeholder="kosnya mantul, ibu kostnya selebgram ..."></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td><label for='' className='small-text gray'>Unit facilities</label></td>
                                
                                <td style={{ display: 'flex', flexDirection: 'row' }}>
                                    {/* ROOMF DI SINI */}
                                    {roomf}
                                </td>
                            </tr>
                            <tr>
                                <td><label for='area' className='small-text gray'>Area (m2)</label></td>
                                <td>
                                    <input name='area' type='text' className='input-text btnIjo' placeholder="29"></input>
                                </td>
                            </tr>
                            <tr>
                                <td><label for='name' className='small-text gray'>Public facilities</label></td>
                                <td style={{ display: 'flex', flexDirection: 'row' }}>
                                    {publicf}

                                </td>
                            </tr>
                            <tr>
                                <td><label for='name' className='small-text gray'>Unit Condition</label></td>
                                <td style={{ display: 'flex', flexDirection: 'row' }}>
                                    <input style={{ marginLeft: '5px', marginRight: '5px', display: '' }} autoFocus type='radio' className='btnIjo'name='unit_condition' value="Furnished" />
                                    <span className='small-text green'>
                                        FURNISHED
                                    </span>

                                    <input style={{ marginLeft: '5px', marginRight: '5px' }} autoFocus type='radio' className='btnIjo' name='unit_condition' value="Non-Fusrnished" />
                                    <span className='small-text green'>
                                        NON-FURNISHED
                                    </span>

                                </td>
                            </tr>
                            <tr>
                                <td><label for='name' className='small-text gray'>Parking facilities</label></td>
                                <td style={{ display: 'flex', flexDirection: 'row' }}>
                                    <input style={{ marginLeft: '5px', marginRight: '5px', display: '' }} autoFocus type='checkbox' className='btnIjo' id='parkingf1' name='parking[]' value="Motor" />
                                    <span className='small-text green'>
                                        <label for='parkingf1'><img id='roomf1-lbl' className='img-facilities' src={motor}></img></label>
                                    </span>

                                    <input style={{ marginLeft: '5px', marginRight: '5px' }} autoFocus type='checkbox' className='btnIjo' name='parking[]' id='parkingf2' value="Car" />
                                    <span className='small-text green'>
                                        <label for='parkingf2'><img id='roomf1-lbl' className='img-facilities' src={car}></img></label>
                                    </span>

                                </td>
                            </tr>
                            <tr>
                                <td><label for='information' className='small-text gray'>Additional Information</label></td>
                                <td>
                                    <textarea id='information' name='information' type='text' className='input-textarea btnIjo' placeholder="Listrik dan air FREE"></textarea>
                                </td>
                            </tr>
                        </table>

                    </div>

                    <div id='3' style={tiga}>
                        <table className='table-text'>
                            <tr>
                                <td><label for='fee' className='small-text gray'>Additional Fees (Rp)</label></td>
                                <td>
                                    <input id='fee' name='fee' type='numeric' className='input-text btnIjo' placeholder="100000"></input>
                                </td>
                            </tr>

                            <tr>
                                <td><label for='price' className='small-text gray'>Price (Rp)</label></td>
                                <td>
                                    <input type='hidden' name='price' value={document.getElementById('price-year')?1:document.getElementById('price-month')?1:document.getElementById('price-week')?1:document.getElementById('price-day')?1:0}/>
                                    <input id='price-year' name='price_year' type='numeric' className='input-text btnIjo' placeholder="Yearly"></input>
                                    <input id='price-month' name='price_month' type='numeric' className='input-text btnIjo' placeholder="Monthly"></input>
                                    <input id='price-week' name='price_week' type='numeric' className='input-text btnIjo' placeholder="Weekly"></input>
                                    <input id='price-day' name='price_day' type='numeric' className='input-text btnIjo' placeholder="Daily"></input>
                                </td>
                            </tr>

                            <tr>
                                <td><label for='city' className='small-text gray'>City</label></td>
                                <td>
                                    <select id='city' name='city_id' type='numeric' className='input-text btnIjo' placeholder="name">
                                        
                                        {city}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label for='address' className='small-text gray'>Address</label></td>
                                <td>
                                    <textarea id='address' name='address' type='text' className='input-textarea btnIjo' placeholder="Jalan Kebon Jeruk Raya no 27"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td><label for='floor' className='small-text gray'>Unit Floor</label></td>
                                <td>
                                    <input name='floor' type='text' className='input-text btnIjo' placeholder="5"></input>
                                </td>
                            </tr>
                        </table>

                        {mapni}
                        <input type='hidden' name='latitude' value={this.state.lat}/>
                        <input type='hidden' name='longitude' value={this.state.long}/>

                        <input style={{margin:'5px', width:'100%'}} type='submit' className='btnIjo-selected' value='POST'/>  
                    </div>
                </form>

        let type = this.state.switch=='apartement'?
            <><input onClick={this.switchTypeState.bind(this)} type='radio' name='switchType' value='Apartement' checked/>
            <span style={{marginLeft:'7px', marginRight:'10px'}} className='green'>Apartement</span>
            <input onClick={this.switchTypeStatee.bind(this)} type='radio' name='switchType' value='house'/>
            <span style={{marginLeft:'7px', marginRight:'10px'}} className='green'>Kosan</span></>:
            <><input onClick={this.switchTypeState.bind(this)} type='radio' name='switchType' value='Apartement' />
            <span style={{marginLeft:'7px', marginRight:'10px'}} className='green'>Apartement</span>
            <input onClick={this.switchTypeStatee.bind(this)} type='radio' name='switchType' value='house' checked/>
            <span style={{marginLeft:'7px', marginRight:'10px'}} className='green'>Kosan</span></>

        let bubbleMessage = this.state.loginPencari?<BubblePop display='' message={this.state.msg} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this}/>:''
        return (
            <>
                {this.state.loading?<Loading></Loading>:''}
                {this.state.pop}
                <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={this.props.nav} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
                </div>
                <BC></BC>

                <div style={{padding:'10px', display:'flex', alignItems:'center'}} className={this.props.mode == 'desktop' ? 'container-following' : 'container-following-mobile'}>
                    {type}
                    {this.state.updating?<button className='btnIjo'
                    onClick={()=>this.setState({updating:false})}
                    >INSERT</button>:''}
                </div>

                
                
                {bubbleMessage}

                {switchType}
                <a href='#error' className='nav_manage no_decoration'>
                    {nav_man}
                </a>

                <div style={{
                    display: 'flex',
                    overflowX: 'auto',
                    padding: '15px',
                }} className={this.props.mode == 'desktop' ? 'container-r' : 'container-r-mobile'}>
                    {mine}
                </div>

                

                {/* {mapni} */}
            </>
        )
    }

}
export default OwnerManage