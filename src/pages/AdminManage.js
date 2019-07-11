import React, { Component } from 'react'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import searchIcon from '../assets/search-icon.png'
import Axios from 'axios';
import BubblePop from '../components/BubblePop';
import BubPop from '../components/BubPop';
import BC from '../components/BC';
import jodie from '../assets/jodie.jpg'
import Loading from '../containers/Loading';

class AdminManage extends Component {
    constructor() {
        super()

        this.state = {
            menu: 'dashboard',
            dashboardData: [],
            facility_choose: 'roomf',
            msg: '',
            loginPencari: false,
            allRoomf:[],
            what:'Room',
            sort:1,
            field:'name',
            updating:false,
            openMyPic:false,
            openMine:false,
            errormsg:'',
            myPost:[],
            premium:[],
            transactions:[],
            guestTotal:0,
            ownerTotal:0,
            premiumData:[],
            x:0,
            y:0,
            guest_list:[],
            owner_list:[],
            guest_list_next:'',
            guest_list_prev:'',
            reports:[],
            report_prev:'',
            report_next:''
            }
    }

    showLogin() {
        this.setState({
            loginPencari: !this.state.loginPencari
        })
        document.body.style.overflow = 'auto'
    }

    goInsert(e) {
        e.preventDefault();
        var link = this.state.facility_choose == 'roomf' ?
            'http://localhost:8000/api/insertRoomFacilities' :
            'http://localhost:8000/api/insertPublicFacilities'

        let headers = {
            'content-type': 'multipart/form-data'
        }

        let f = document.getElementById('facility-form')
        let formData = new FormData(f);
        // console.log(form)
        // return

        Axios.post(link,
            formData
            , headers).then(res => {
                if (res.data == 'success') {
                    this.setState({
                        msg: 'Success insert a Facility'
                    })
                    this.showLogin()
                } else {
                    this.setState({
                        msg: 'Invalid Data'
                    })
                    this.showLogin()
                }
            })
    }

    goUpdate(e) {
        e.preventDefault()
        // alert('ini update')
        var link = this.state.facility_choose == 'roomf' ?
            'http://localhost:8000/api/updateRoomFacilities' :
            'http://localhost:8000/api/updatePublicFacilities'

        let headers = {
            'content-type': 'multipart/form-data'
        }

        let f = document.getElementById('facility-form')
        let formData = new FormData(f);
        // formData.append('id', id)
        // console.log(form)
        // return

        Axios.post(link,
            formData
            , headers).then(res => {
                if (res.data == 'success') {
                    this.setState({
                        msg: 'Success update a Facility'
                    })
                    this.showLogin()
                } else {
                    this.setState({
                        msg: 'Invalid Data'
                    })
                    this.showLogin()
                }
            })
    }

    getDashboardInfo() {
        this.setState({
            dashboardData:[]
        })
        Axios.get('http://localhost:8000/api/getAdminDashboardInfo').then(
            async res => {


                for (const r of res.data) {
                    // console.log(r)
                    if(r.name=='guest'){
                        this.setState({
                            guestTotal:r.contents
                        })
                    }
                    if(r.name=='owner'){
                        this.setState({
                            guestTotal:r.contents
                        })
                    }


                    let data = <>
                        <span style={this.props.mode=='mobile'?{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: 'lightgray',
                            margin: '5px',
                            padding: '5px',
                            borderRadius: '10px'
                        }:{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '200px',
                            backgroundColor: 'lightgray',
                            margin: '5px',
                            padding: '5px',
                            borderRadius: '10px'
                        }}>
                            <span style={{
                                fontSize: '100px',
                                fontFamily: 'impact'
                            }}>{r.contents}</span>
                            <u style={{
                                fontSize: '12px',
                            }}>
                                newest this month: {r.this_month}
                            </u>
                            <span>
                                {r.name}
                            </span>
                        </span>
                    </>

                    let a = this.setState({
                        dashboardData: [...this.state.dashboardData, data],
                        goloading: false
                    })
                    await a
                }

            }
        )
    }

    goDelete(id){
        Axios.post('http://localhost:8000/api/delete'+document.getElementById('what').value+'Facility',{
            id:id
        }).then(res=>{
            alert(res.data)
        })
    }

    cancelPop(){
        this.setState({
            pop:<></>
        })

        // alert('ye')
    }

    popDelete(id){
        let data = <>
            <div style={{
                width:'100vw',
                height:'100vh',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                position:'absolute',
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
                    <span style={{width:'250px', textAlign:'center', padding:'20px'}}>Are you sure?</span>
                    <button onClick={()=>{this.goDelete(id)}} className='btnOrange'>DELETE</button>
                    <button onClick={()=>{this.cancelPop()}} className='btnIjo'>CANCEL</button>
                </div>
            </div>
        </>

        this.setState({
            pop:data
        })
    }

    popUpdate(id, name){
        document.getElementById('id').value = id
        document.getElementById('facility_name').value = name

        this.setState({
            updating:true
        })
    }

    

    getAllRoomFacilities(){

        Axios.get('http://localhost:8000/api/get'+
        document.getElementById('what').value+
        'FacilitiesPaginate?sort='+this.state.sort+'&field='+this.state.field+'').then(res=>{
            this.setState({
                allRoomf:[]
            })

            for(const r of res.data.data){

                let data = <>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '10px',
                        backgroundColor: '#fefff8'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <img className='img-facilities' src={document.getElementById('what').value=='Room'?'http://localhost:8000/roomf/'+ r.icon:'http://localhost:8000/publicf/'+ r.icon}></img>
                            <div>{r.name}</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <button onClick={()=>this.popDelete(r.id)} className='btnOrange'>DELETE</button>
                            <button onClick={()=>this.popUpdate(r.id, r.name)} className='btnIjo-select'>UPDATE</button>
                        </div>
                    </div> 
                </>

                this.setState({
                    allRoomf:[...this.state.allRoomf, data]
                })

            }
        })
    }

    handleChange() {
        var file = this.refs.banner.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        // console.log(reader.result)

        reader.onloadend = function (e) {

            let img = <span className='img_container_manage'>
                <img className="profilepic" src={reader.result} />
            </span>

            this.setState({
                imgSrc: [img]
            })
        }.bind(this);
    }

    handleImageCollect() {
        var file = this.refs.inputImg.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        console.log(reader.result)

        reader.onloadend = function (e) {

            let img = <span style={{position:'absolute', zIndex:'-999'}} className='img_container_manage'>
                <img className="profilepic" src={reader.result} />
            </span>

            this.setState({
                imgCollect: [img]
            })
        }.bind(this);
    }

    handleImageThumbnail() {
        var file = this.refs.imgThumbnail.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        console.log(reader.result)

        reader.onloadend = function (e) {

            let img = <span className='img_container_manage'>
                <img className="profilepic" src={reader.result} />
            </span>

            this.setState({
                imgThumbnail: [img]
            })
        }.bind(this);
    }

    componentDidMount() {
        var type = localStorage.type ? localStorage.type : sessionStorage.type
        if (type != 0) {
            window.location.href = '/'
        }

        this.getAllRoomFacilities()
        this.getDashboardInfo()
     
        window.addEventListener('mousemove', (e)=>this.onMouseMove(e))
    }


    textEdit(name, extension){
        let exec = document.execCommand(name, false, null)
        if(!exec){
            alert("error")
        }else{

        }
    }

    insertSomething(name, extension){
        let img = "<img class='image-edit' src='"+extension+"' />"

        let exec = document.execCommand('insertHTML', false, img)
        if(!exec){
            alert("error")
        }else{

        }
    }

    async coba(){
        // console.log('sdsdsd')
        let a = document.getElementById('textarea').focus()

        var file = this.refs.image.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        this.setState({
            asd:reader.result
        })

        let tag = '<img src='+url+' />'
        let tagg = '<b>HAHAHHA</b>'

        await a

        this.insertSomething('insertHTML', tag)

        // document.getElementById('inputImage').onChange(function (){
        //     console.log('sss')
        // })
    }

    goUploadImagePost(e){
    e.preventDefault()
        let token=localStorage.token?localStorage.token:sessionStorage.token?sessionStorage.token:''

        let formData = new FormData(document.getElementById('ini-form'));
        formData.append('token', token)

        let headers = {
            'content-type': 'multipart/form-data'
        }

        Axios.post('http://localhost:8000/api/addImageToUser', 
        formData, headers).then(()=>{
            
            this.setState({
                imgCollect:<BubPop message="success upload image"></BubPop>
            })
            this.getMyImages()

        })
    }

    getMyImages(){
        this.setState({
            myImages:[],
            goloading:true
        })

        Axios.post('http://localhost:8000/api/getMyImages', {
            id:localStorage.id?localStorage.id:sessionStorage.id?sessionStorage.id:'',
            token:localStorage.token?localStorage.token:sessionStorage.token?sessionStorage.token:''
        }).then(async res=>{
           
            for (const img of res.data){
                let tagged = 
                <div className='img_container_manage' 
                onClick={()=>this.insertSomething('insertImage', 'http://localhost:8000/images/userpost/'+img.name)}>
                    <img className="profilepic" src={'http://localhost:8000/images/userpost/'+img.name} />
                </div>

                let a = this.setState({
                    myImages: [...this.state.myImages, tagged]
                })
                await a
            }

            this.setState({
                goloading:false
            })

            this.getMyPost()
        })
    }

    getMyPost(){
        this.setState({
            myPost:[],
            goloading:true
        })

        Axios.post('http://localhost:8000/api/getMyPost', {
            id:localStorage.id?localStorage.id:sessionStorage.id?sessionStorage.id:'',
            token:localStorage.token?localStorage.token:sessionStorage.token?sessionStorage.token:''
        }).then(async res=>{
           
            for (const p of res.data.data){
                let tagged = 
                <div style={{display:'flex',width:'300px', border:'1px solid gray', margin:'10px' }} className='hoverable'>
                    <div className='img_container_manage'>
                        <img className="profilepic" src={'http://localhost:8000/images/thumbnail/'+p.thumbnail} />
                    </div>
                    <div>
                        <div style={{display:'inline-block', padding:'10px', color:'black', overflow:'hidden', textOverflow:'ellipsis', width:'180px', whiteSpace:"nowrap"}}>
                            {p.title}
                        </div>
                        <div style={{display:'inline-block', padding:'10px', color:'darkgray', overflow:'hidden', textOverflow:'ellipsis', width:'180px', whiteSpace:"nowrap"}}>
                            {p.created_at.split(' ')[0]}
                        </div>
                        <button className='btnIjo-select' onClick={()=>this.updatingPost(p)}>UPDATE</button>
                        <button onClick={()=>this.popConfirmDelete(p.id, "Are you sure want to delete this post?", this.deletePost.bind(this))} className='btnOrange'>DELETE</button>
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

    popConfirmBan(perintah,id, message, next, type){
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
                    <button onClick={()=>{next(id, type)}} className='btnIjo-selected'>{perintah}</button>
                    <button onClick={()=>{this.cancelPop()}} className='btnIjo'>CANCEL</button>
                </div>
            </div>
        </>

        this.setState({
            pop:data
        })
    }

    deletePost(post_id){
        this.setState({
            errormsg:''
        })

        Axios.post('http://localhost:8000/api/deletePost',{
            post_id:post_id,
            token:localStorage.token?localStorage.token:sessionStorage.token?sessionStorage.token:''
        }).then(res=>{
            this.setState({
                errormsg:<BubPop message={res.data}></BubPop>
            })

            this.getMyPost()
            this.cancelPop()
        })
    }

    loadMorePost(url){
        // console.log(url)
        // return;
        this.state.myPost.pop()

        this.setState({
            errormsg:'',
            goloading:true
        })

        Axios.post(url,{
            token:localStorage.token?localStorage.token:sessionStorage.token?sessionStorage.token:'',
            id:localStorage.id?localStorage.id:sessionStorage.id?sessionStorage.id:'',
        }).then(async res=>{
            for (const p of res.data.data){
                let tagged = 
                <div style={{display:'flex',width:'300px', border:'1px solid gray', margin:'10px' }} className='hoverable'>
                    <div className='img_container_manage'>
                        <img className="profilepic" src={'http://localhost:8000/images/thumbnail/'+p.thumbnail} />
                    </div>
                    <div>
                        <div style={{display:'inline-block', padding:'10px', color:'black', overflow:'hidden', textOverflow:'ellipsis', width:'180px', whiteSpace:"nowrap"}}>
                            {p.title}
                        </div>
                        <div style={{display:'inline-block', padding:'10px', color:'darkgray', overflow:'hidden', textOverflow:'ellipsis', width:'180px', whiteSpace:"nowrap"}}>
                            {p.created_at.split(' ')[0]}
                        </div>
                        <button className='btnIjo-select' onClick={()=>this.updatingPost(p)}>UPDATE</button>
                        <button onClick={()=>this.deletePost(p.id)} className='btnOrange'>DELETE</button>
                    </div>
                </div>

                this.state.myPost.push(tagged)
                // let a = this.setState({
                //     myPost: [...this.state.myPost, tagged]
                // })
                // await a
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

    updatingPost(p){
        document.getElementById('title').value = p.title
        this.setState({
            imgThumbnail:<span className='img_container_manage'>
            <img className="profilepic" src={'http://localhost:8000/images/thumbnail/'+p.thumbnail} />
            </span>,
            postupdate:true
        })
        document.getElementById('textarea').innerHTML = p.content
        document.getElementById('post_id').value = p.id
        
    }

    template(post_id){
        this.setState({
            errormsg:''
        })

        Axios.post('http://localhost:8000/api/deletePost',{
            post_id:post_id,
            token:localStorage.token?localStorage.token:sessionStorage.token?sessionStorage.token:''
        }).then(res=>{
            // this.setState({
            //     errormsg:<BubPop message={res.data}></BubPop>
            // })
        })
    }

    async goPost(){
        this.setState({
            errormsg:''
        })


        let formData = new FormData(document.getElementById('form-tag'))
        let token = localStorage.token?localStorage.token:sessionStorage.token?
        sessionStorage.token:''
        let id = localStorage.id?localStorage.id:sessionStorage.id?sessionStorage.id:''

        formData.append('id', id)
        formData.append('title', document.getElementById('title').value)
        formData.append('contents', document.getElementById('textarea').innerHTML)
        formData.append('token', token)
        formData.append('thumbnail', this.refs.imgThumbnail.files[0])
        formData.append('post_id', document.getElementById('post_id').value)

        let headers = {
            'content-type': 'multipart/form-data'
        }

        let m = "";
        let a = Axios.post('http://localhost:8000/api/goPost', formData, headers).then(
            res=>{
                
                this.setState({
                    errormsg:<BubPop message={res.data}></BubPop>
                })

                document.getElementById('title').value=''
                document.getElementById('textarea').innerHTML = ''
                this.setState({
                    imgThumbnail:''
                })
            }
        ).catch(err=>{
            let res = err.response
            console.log(res)
            m = res.data.errors?
                res.data.errors.title?res.data.errors.title[0]:
                res.data.errors.contents?res.data.errors.contents[0]:
                res.data.errors.thumbnail?res.data.errors.thumbnail[0]:
                res.data.errors.tag?res.data.errors.tag[0]:res.data:''
            this.setState({
                errormsg:<BubPop message={m}></BubPop>
            })
            
        })

        await a
        
        this.getMyPost()
        this.resetPost()
    }

    resetPost(){
        document.getElementById('post_id').value=''
        document.getElementById('title').value=''
        document.getElementById('textarea').innerHTML=''

        this.setState({
            imgThumbnail:'',
            postupdate:false
        })
    }

    async insertPremium(){
        this.setState({
            errormsg:'',
            goloading:false
        })

        let m=""
        let a = Axios.post('http://localhost:8000/api/insertPremium',{
            id:document.getElementById('premium_id').value,
            day:document.getElementById('premium-duration').value,
            price:document.getElementById('premium-price').value,
            token:localStorage.token?localStorage.token:sessionStorage.token
        }).then(res=>{
            this.setState({
                errormsg:<BubPop message={res.data}></BubPop>
            })
        }).catch(err=>{
            let res = err.response
            console.log(res)
            m = res.data.errors?
                res.data.errors.day?res.data.errors.day[0]:res.data.errors.price[0]:''
            this.setState({
                errormsg:<BubPop message={m}></BubPop>
            })
        })

        await a
        this.resetPremium()
        this.getPremium()
    }

    resetPremium(){
        document.getElementById('premium_id').value = ""
        document.getElementById('premium-duration').value = ""
        document.getElementById('premium-price').value = ""
    }

    addPromo(id, promo){
        this.setState({
            errormsg:''
        })

        Axios.post('http://localhost:8000/api/addPromo',{
            id:id,
            promo:promo,
            token:localStorage.token?localStorage.token:sessionStorage.token
        }).then(res=>{
            this.setState({
                errormsg:<BubPop message={res.data}></BubPop>
            })

            this.getPremium()
            
        })
    }

    getPremium(){
        this.setState({
            premium:[]
        })

        Axios.post('http://localhost:8000/api/getPremium',{
            
        }).then(async res=>{
            this.setState({
                premiumData:res.data.data
            })

            for(const c of res.data.data){
                let tagged = 
                <div style={this.props.mode!='mobile'?{display:'flex', color:'black', margin:'10px', width:'40%',maxWidth:'370px'}:
                {display:'flex', color:'black', margin:'10px', width:'100%'}} className='btnIjo'>
                    <div style={{marginRight:'10px'}}>
                        <span style={{fontSize:'75px'}}>{c.day}</span>
                        <span>days</span>
                    </div>
                    <div>
                        <b style={{}}>Premium {c.day} days</b>
                        <p style={c.promo!=null?{textDecoration:'line-through', color:'red'}:{}}>Rp {c.price}</p>
                        <div>
                        {c.promo==null?
                        <span>
                            <input type='text' id={c.id} placeholder='...%' className='btnIjo'/>
                            <button
                            onClick={()=>{this.addPromo(c.id ,document.getElementById(c.id).value)}}
                            className='btnIjo-select'>add promo</button>
                        </span>
                        :
                        'Rp '+(c.price-(c.price*c.promo/100))+' -'+c.promo+'% '}
                        {c.promo!=null?<i onClick={()=>{this.addPromo(c.id, null)}} className='fas fa-trash'></i>:''}
                        </div>
                        <span>
                            <button onClick={()=>this.updatePremium(c)} className='btnIjo-select'>Update</button>
                            <button onClick={()=>this.popConfirmDelete(c.id, "Are you sure want to delete this premium?", this.deletePremium.bind(this))} 
                            className='btnOrange'>Delete</button>
                        </span>
                    </div>
                </div>

                let a = this.setState({
                    premium:[...this.state.premium, tagged]
                })
                await a
            }
            if(res.data.prev_page_url!=null){
                let tagged = 
                <button style={this.props.mode!='mobile'?{display:'flex', color:'black', margin:'10px', width:'40%',maxWidth:'370px'}:
                {display:'flex', color:'black', margin:'10px', width:'100%'}} className='btnIjo'
                onClick={()=>this.loadMorePremium(res.data.prev_page_url)}>
                    previous
                </button>

                let a = this.setState({
                    premium:[tagged,...this.state.premium]
                })
            }
            if(res.data.next_page_url!=null){
                let tagged = 
                <button style={this.props.mode!='mobile'?{display:'flex', color:'black', margin:'10px', width:'40%',maxWidth:'370px'}:
                {display:'flex', color:'black', margin:'10px', width:'100%'}} className='btnIjo'
                onClick={()=>this.loadMorePremium(res.data.next_page_url)}>
                    next
                </button>

                let a = this.setState({
                    premium:[...this.state.premium, tagged]
                })
            }
            this.setState({
                goloading:false
            })
        })
    }

    loadMorePremium(url){
        this.state.premium.pop()
        this.setState({
            premium:[]
        })

        Axios.post(url,{
            
        }).then(async res=>{
            for(const c of res.data.data){
                let tagged = 
                <div style={this.props.mode!='mobile'?{display:'flex', color:'black', margin:'10px', width:'40%',maxWidth:'370px'}:
                {display:'flex', color:'black', margin:'10px', width:'100%'}} className='btnIjo'>
                    <div style={{marginRight:'10px'}}>
                        <span style={{fontSize:'75px'}}>{c.day}</span>
                        <span>days</span>
                    </div>
                    <div>
                        <b style={{}}>Premium {c.day} days</b>
                        <p style={c.promo!=null?{textDecoration:'line-through', color:'red'}:{}}>Rp {c.price}</p>
                        <div>
                        {c.promo==null?
                        <span>
                            <input type='text' id={c.id} placeholder='...%' className='btnIjo'/>
                            <button
                            onClick={()=>{this.addPromo(c.id ,document.getElementById(c.id).value)}}
                            className='btnIjo-select'>add promo</button>
                        </span>
                        :
                        'Rp '+(c.price-(c.price*c.promo/100))+' -'+c.promo+'% '}
                        {c.promo!=null?<i onClick={()=>{this.addPromo(c.id, null)}} className='fas fa-trash'></i>:''}
                        </div>
                        <span>
                            <button onClick={()=>this.updatePremium(c)} className='btnIjo-select'>Update</button>
                            <button onClick={()=>this.popConfirmDelete(c.id, "Are you sure want to delete this premium?", this.deletePremium.bind(this))} 
                            className='btnOrange'>Delete</button>
                        </span>
                    </div>
                </div>

                let a = this.setState({
                    premium:[...this.state.premium, tagged]
                })
                await a
            }
            if(res.data.prev_page_url!=null){
                let tagged = 
                <button style={this.props.mode!='mobile'?{display:'flex', color:'black', margin:'10px', width:'40%',maxWidth:'370px'}:
                {display:'flex', color:'black', margin:'10px', width:'100%'}} className='btnIjo'
                onClick={()=>this.loadMorePremium(res.data.prev_page_url)}>
                    previous
                </button>

                let a = this.setState({
                    premium:[tagged,...this.state.premium]
                })
            }
            if(res.data.next_page_url!=null){
                let tagged = 
                <button style={this.props.mode!='mobile'?{display:'flex', color:'black', margin:'10px', width:'40%',maxWidth:'370px'}:
                {display:'flex', color:'black', margin:'10px', width:'100%'}} className='btnIjo'
                onClick={()=>this.loadMorePremium(res.data.next_page_url)}>
                    next
                </button>

                let a = this.setState({
                    premium:[...this.state.premium, tagged]
                })
            }
            this.setState({
                goloading:false
            })
        })
    }

    updatePremium(c){
        document.getElementById('premium_id').value = c.id
        document.getElementById('premium-duration').value = c.day
        document.getElementById('premium-price').value = c.price
    }

    deletePremium(id){
        this.setState({
            errormsg:''
        })

        Axios.post('http://localhost:8000/api/deletePremium',{
            id:id,
            token:localStorage.token?localStorage.token:sessionStorage.token?sessionStorage.token:''
        }).then(res=>{
            this.setState({
                errormsg:<BubPop message={res.data}></BubPop>
            })

            this.getPremium()
            this.cancelPop()
        })
    }

    getPremiumTransaction(){
        var formData = new FormData(document.getElementById('transaction-form'))
        formData.append('token', localStorage.token?localStorage.token:sessionStorage.token)

        Axios.post('http://localhost:8000/api/getPremiumTransaction',formData).then(res=>{
            

            this.setState({
                transactions: res.data.data,
                goloading: false
            })
        })
    }

    componentDidUpdate(){
        // if(this.state.errormsg!=''){
        //     this.setState({
        //         errormsg:''
        //     })
        // }
        
    }

    
    onMouseMove(e) {
        this.setState({ x: e.screenX, y: e.screenY });
    }

    popUpUser(user){
        console.log(user)
        let tagged = 
        <div style={{
            position:'absolute',
            width:'400px',
            backgroundColor:'white',
            zIndex:'9999',
            left: this.state.x+20,
            top: this.state.y-140,
            display:'flex',
            boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.75)'
        }}>
            <div className='img_container'>
                <img className="profilepic" src={'http://localhost:8000/images/profile_picture/'+user.profile_pic} />
            </div>
            <div style={{padding:'20px'}}>
                <p>{user.name}</p>
                <p>premium end: {user.end_premium}</p>
            </div>
        </div>

        this.setState({
            popUpUser:tagged
        })
    }

    loadMoreUser(url, type){
        this.setState({
            guest_list:[],
            guest_list_next:<div></div>,
            guest_list_prev:<div></div>
        })

        Axios.post(url,{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            type: type
        }).then(res=>{  
            this.setState({
                guest_list: res.data.data
            })
            if(res.data.next_page_url!=null){
                let tagged=
                <button className='btnIjo' onClick={()=>this.loadMoreUser(res.data.next_page_url, type)}>next</button>
                this.setState({
                    guest_list_next: tagged
                })
            }
            if(res.data.prev_page_url!=null){
                let tagged=
                <button className='btnIjo' onClick={()=>this.loadMoreUser(res.data.prev_page_url, type)}>prev</button>
                this.setState({
                    guest_list_prev: tagged
                })
            }
        })
    }

    getAllUser(type){
        this.setState({
            guest_list:[],
            guest_list_next:<div></div>,
            guest_list_prev:<div></div>
        })

        var formData = new FormData(document.getElementById('form-search-guest'))
        formData.append('token', localStorage.token?localStorage.token:sessionStorage.token)
        formData.append('type', type)
        

        Axios.post('http://localhost:8000/api/getAllUser',
        formData).then(res=>{  
            this.setState({
                guest_list: res.data.data
            })
            if(res.data.next_page_url!=null){
                let tagged=
                <button className='btnIjo' onClick={()=>this.loadMoreUser(res.data.next_page_url, type)}>next</button>
                this.setState({
                    guest_list_next: tagged
                })
            }
            if(res.data.prev_page_url!=null){
                let tagged=
                <button className='btnIjo' onClick={()=>this.loadMoreUser(res.data.prev_page_url, type)}>prev</button>
                this.setState({
                    guest_list_prev: tagged
                })
            }
        })

    }

    banUser(id, type){
        this.setState({
            errormsg:'',
            goloading:true
        })

        Axios.post('http://localhost:8000/api/banUser',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            id:id
        }).then(res=>{
            let tagged = <BubPop message={res.data}></BubPop>
            this.setState({
                goloading:false,
                errormsg:tagged,
                pop:''
            })
            this.getAllUser(type)
        })
    }

    deleteUser(id){
        this.setState({
            errormsg:'',
            goloading:true
        })

        Axios.post('http://localhost:8000/api/deleteUser',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            id:id
        }).then(res=>{
            let tagged = <BubPop message={res.data}></BubPop>
            this.setState({
                goloading:false,
                errormsg:tagged,
                pop:''
            })
        })
    }

    resetPasswordUser(id, type){
        this.setState({
            errormsg:'',
            goloading:true
        })

        Axios.post('http://localhost:8000/api/resetPasswordUser',{
            token:localStorage.token?localStorage.token:sessionStorage.token,
            id:id
        }).then(res=>{
            let tagged = <BubPop message={res.data}></BubPop>
            this.setState({
                goloading:false,
                errormsg:tagged,
                pop:''
            })
        })
    }
    
    getAllReport(){
        this.setState({
            goloading:true,
            reports:[],
            report_next:<div></div>,
            report_prev:<div></div>
        })

        var formData = new FormData(document.getElementById('report-form'))
        formData.append('token', localStorage.token?localStorage.token:sessionStorage.token)

        Axios.post('http://localhost:8000/api/getAllReport',formData)
        .then(res=>{

            if(res.data.next_page_url!=null){
                let tagged=
                <button className='btnIjo' onClick={()=>this.loadMoreReport(res.data.next_page_url)}>next</button>
                this.setState({
                    report_next: tagged
                })
            }
            if(res.data.prev_page_url!=null){
                let tagged=
                <button className='btnIjo' onClick={()=>this.loadMoreReport(res.data.prev_page_url)}>next</button>
                this.setState({
                    report_prev: tagged
                })
            }

            this.setState({
                goloading:false,
                reports:res.data.data
            })
        })
    }

    loadMoreReport(url){
        this.setState({
            guest_list:[],
            report_next:<div></div>,
            report_prev:<div></div>
        })

        Axios.post(url,{
            token:localStorage.token?localStorage.token:sessionStorage.token
        }).then(res=>{  
            this.setState({
                reports: res.data.data
            })
            if(res.data.next_page_url!=null){
                let tagged=
                <button className='btnIjo' onClick={()=>this.loadMoreReport(res.data.next_page_url)}>next</button>
                this.setState({
                    report_next: tagged
                })
            }
            if(res.data.prev_page_url!=null){
                let tagged=
                <button className='btnIjo' onClick={()=>this.loadMoreReport(res.data.prev_page_url)}>prev</button>
                this.setState({
                    report_prev: tagged
                })
            }
        })
    }

    // popUpReport(user_id, contents){
    //     console.log(user)
    //     let tagged = 
    //     <div style={{
    //         position:'absolute',
    //         width:'400px',
    //         backgroundColor:'white',
    //         zIndex:'9999',
    //         left: this.state.x+20,
    //         top: this.state.y-140,
    //         display:'flex'
    //     }}>
    //         <div className='img_container'>
    //             <img className="profilepic" src={'http://localhost:8000/images/profile_picture/'+user.profile_pic} />
    //         </div>
    //         <div style={{padding:'20px'}}>
    //             <p>{user.name}</p>
    //             <p>premium end: {user.end_premium}</p>
    //         </div>
    //     </div>

    //     this.setState({
    //         popUpUser:tagged
    //     })
    // }

    render() {
        
        let navigations = this.props.nav
        let fav_container = this.props.mode == 'desktop' ? 'favorite-container' : 'fav-container'
        let dashboard = this.state.dashboardData
        let banner_file = this.state.imgSrc
        let bubbleMessage = this.state.loginPencari ? <BubblePop display='' message={this.state.msg} apptis={this.props.apptis} login={this.props.login} showLogin={this.showLogin} tis={this} /> : ''
        let allRoomf = this.state.allRoomf
        let insertNew = <button onClick={()=>this.setState({updating:false})} className='btnIjo-select'>INSERT NEW</button>
        let img_container = this.props.mode == 'desktop' ? 'img_container' : 'img_container_mobile'

        let loading = this.state.goloading?<Loading></Loading>:''
        let facility_choose = this.state.facility_choose == 'roomf' ? <><input onClick={() => this.setState({ facility_choose: 'roomf' })} type='radio' name='facility_type' id='roomf' value='room' checked></input>
            <label style={{ marginLeft: '10px', marginRight: '10px' }} for='roomf'>Room Facility</label>
            <input onClick={() => this.setState({ facility_choose: 'publicf' })} type='radio' name='facility_type' id='publicf' value='public'></input>
            <label style={{ marginLeft: '10px', marginRight: '10px' }} for='publicf'>Public Facility</label></> : <>
                <input onClick={() => this.setState({ facility_choose: 'roomf' })} type='radio' name='facility_type' id='roomf' value='room' ></input>
                <label style={{ marginLeft: '10px', marginRight: '10px' }} for='roomf'>Room Facility</label>
                <input onClick={() => this.setState({ facility_choose: 'publicf' })} type='radio' name='facility_type' id='publicf' value='public' checked></input>
                <label style={{ marginLeft: '10px', marginRight: '10px' }} for='publicf'>Public Facility</label></>


        let menu_manage_post = this.state.menu=='menu_manage_post'?<>
        
        </>:''


        return (
            <>
            {this.state.errormsg}
            {this.state.pop}
                <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                    <NavBar apptis={this.props.apptis} cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
                </div>
                <BC/>
                {loading}
                <div style={{
                }} className={fav_container}>
                    <div style={{
                        overflowX:'auto',
                        whiteSpace:'nowrap'
                    }}>
                    <button onClick={() => {this.setState({ menu: 'dashboard' }); 
                                            this.setState({goloading:'true'}); 
                                            this.getDashboardInfo()}} id='menu_dashboard' className={this.state.menu == 'dashboard' ? 'btnIjo-select' : 'btnIjo'}>Dashboard</button>
                    <button onClick={() => {this.setState({ menu: 'menu_manage_post' });
                                            this.setState({goloading:'true'});
                                            this.getMyImages()}} id='menu_manage_post' className={this.state.menu == 'menu_manage_post' ? 'btnIjo-select' : 'btnIjo'}>Manage Post</button>
                    <button onClick={() => this.setState({ menu: 'menu_manage_facility' })} id='menu_manage_facility' className={this.state.menu == 'menu_manage_facility' ? 'btnIjo-select' : 'btnIjo'}>Manage Facility</button>
                    <button onClick={() => {this.setState({ menu: 'menu_manage_guest' });
                                            this.getAllUser(1);}} id='menu_manage_guest' className={this.state.menu == 'menu_manage_guest' ? 'btnIjo-select' : 'btnIjo'}>Manage Guest</button>
                    <button onClick={() => {this.setState({ menu: 'menu_manage_owner' });
                                            this.getAllUser(2);}} id='menu_manage_owner' className={this.state.menu == 'menu_manage_owner' ? 'btnIjo-select' : 'btnIjo'}>Manage Owner</button>
                    <button onClick={() => {this.setState({ menu: 'menu_manage_premium_product'});
                                            this.setState({goloading:'true'});
                                            this.getPremium()}} id='menu_manage_premium_product' className={this.state.menu == 'menu_manage_premium_product' ? 'btnIjo-select' : 'btnIjo'}>Manage Premium Product</button>
                    <button onClick={() => {this.setState({ menu: 'menu_manage_transaction' });
                                            this.setState({goloading:true});
                                            this.getPremiumTransaction(); 
                                            this.getPremium()}} id='menu_manage_transaction' className={this.state.menu == 'menu_manage_transaction' ? 'btnIjo-select' : 'btnIjo'}>Manage Transaction</button>
                    <button onClick={() => {this.setState({ menu: 'menu_manage_report' })
                                            this.getAllReport()
                                            }} id='menu_manage_report' className={this.state.menu == 'menu_manage_report' ? 'btnIjo-select' : 'btnIjo'}>Manage Report</button>
                    </div>
                </div>
                <div className={fav_container}>
                    {/* dashboard */}
                    <div style={this.state.menu == 'dashboard' ?{}:{display:'none'}}>
                        <div style={
                            { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }
                            }>
                            {dashboard}
                        </div>
                        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
                        
                        

                    </div>


                    {/* manage post */}
                    <div style={this.state.menu == 'menu_manage_post' ? {} : { display: 'none' }}>
                        <div>
                            <div style={{display:'flex', flexDirection:'column', height:'330px', overflowX:'auto', flexWrap:'wrap'}}>
                                {this.state.myPost}
                            </div>


                            <div style={{display:'flex', flexWrap:'wrap', flexDirection:'row', alignItems:'center', minHeight:'130px'}} className='btnIjo-selected'>
                                <input ref='imgThumbnail' id='imgThumbnail' name='inputImg' type='file' style={{display:'none'}}
                                onChange={() => this.handleImageThumbnail()}></input>
                                <label for='imgThumbnail' className='btnIjo center' style={{width:'180px'}}>Choose Thumbnail</label>
                                
                                {this.state.imgThumbnail}
                            </div>
                            

                            <input id='title' style={{width:'100%', margin:'10px 0px'}} type='text' className='btnIjo'
                            placeholder='Title'/>

                            <div style={{
                                backgroundColor:'rgb(4, 172, 54)'
                            }}>
                                <button style={{width:'30px', margin:'0px 5px'}} className='btnIjo-selected'
                                    onClick={()=>this.textEdit('bold')}
                                ><strong>B</strong></button>
                                <button style={{width:'30px', margin:'0px 5px'}} className='btnIjo-selected'
                                    onClick={()=>this.textEdit('italic')}
                                ><i>I</i></button>
                                <button style={{width:'30px', margin:'0px 5px'}} className='btnIjo-selected'
                                    onClick={()=>this.textEdit('underline')}
                                ><u>U</u></button>
                                <button style={{width:'30px', margin:'0px 5px'}} className='btnIjo-selected'
                                    onClick={()=>this.textEdit('justifyLeft')}
                                ><i className='fas fa-align-left'></i></button>
                                <button style={{width:'30px', margin:'0px 5px'}} className='btnIjo-selected'
                                    onClick={()=>this.textEdit('justifyCenter')}
                                ><i className='fas fa-align-center'></i></button>
                                <button style={{width:'30px', margin:'0px 5px'}} className='btnIjo-selected'
                                    onClick={()=>this.textEdit('justifyRight')}
                                ><i className='fas fa-align-right'></i></button>

                                {/* <input ref='image' style={{display:'none'}} onChange={()=>this.coba()} id='inputImage' type='file' multiple></input> */}
                                <button style={{width:'30px', margin:'0px 5px'}} className='btnIjo-selected'
                                    onClick={()=>this.setState({openMine:!this.state.openMine})}
                            ><i className='fas fa-camera'></i></button>
                            </div>
                            <div style={this.state.openMine?{
                                display:'flex',
                                overflowX:'auto'
                            }:{display:'none'}}>
                                <div style={{display:'flex', flexDirection:'column', width:'120px', justifyContent:'center'}}>
                                    <form id='ini-form' onSubmit={(e)=>this.goUploadImagePost(e)}>
                                        <input type="hidden" name='id' value={localStorage.id?localStorage.id:sessionStorage.id?sessionStorage.id:''}></input>
                                        <input ref='inputImg' id='inputImg' name='inputImg' type='file' style={{display:'none'}}
                                        onChange={() => this.handleImageCollect()}></input>
                                        <label for='inputImg' className='btnIjo-selected center' style={{width:'100%'}}>CHOOSE</label>
                                        <input type='submit' style={{width:'100%'}} className='btnIjo center' value='UPLOAD'></input>
                                    </form>
                                    {this.state.imgCollect}
                                    
                                </div>
                                    {this.state.myImages}
                            </div>
                            {/* <button onClick={()=>{console.log(document.getElementById('textarea').innerHTML)}}>ahayy</button> */}

                            <div id='textarea' 
                            style={{minWidth:'300px', 
                                width:'100%', 
                                height:'50vh', 
                                color:'black', 
                                marginBottom:'10px',
                                borderRadius:'0px',
                                resize:'none', 
                                overflowY:'auto'}} 
                            contentEditable='true' 
                            className='btnIjo'></div>

                            <form id='form-tag' style={{marginBottom:'20px'}}>
                                <div style={{marginBottom:'20px'}}>
                                    <label style={{color:'green'}}>Tag :</label>
                                    <input id='diskon' type='checkbox' name='tag[]' className='post-tag' style={{display:'none'}} value='diskon'></input>
                                    <label for='diskon' className='btnIjo label-tag'>Diskon</label>
                                    
                                    <input id='pengumuman' type='checkbox' name='tag[]' className='post-tag' style={{display:'none'}} value='pengumuman'></input>
                                    <label for='pengumuman' className='btnIjo label-tag'>Pengumuman</label>
                                </div>
                                <div style={{marginBottom:'20px'}}>
                                    <label style={{color:'green'}}>Visibility :</label>
                                    <input id='owner' type='checkbox' name='visibility[]' className='post-tag' style={{display:'none'}} value='owner'></input>
                                    <label for='owner' className='btnIjo label-tag'>owner</label>
                                    
                                    <input id='guest' type='checkbox' name='visibility[]' className='post-tag' style={{display:'none'}} value='guest'></input>
                                    <label for='guest' className='btnIjo label-tag'>guest</label>
                                </div>
                            </form>
                            
                            <input type='hidden' id='post_id'></input>
                            {this.state.postupdate?
                            <button className='btnOrange'
                            onClick={()=>this.resetPost()}>CANCEL UPDATE</button>:''}
                            <button className='btnIjo-selected'
                            onClick={()=>this.goPost()}>POST</button>
                        </div>

                        
                    </div>
                    

                    {/* manage facility */}
                    <div style={this.state.menu == 'menu_manage_facility' ? {} : { display: 'none' }}>
                        <div style={{
                            border: '0.5px solid black',
                            borderRadius: '10px',
                            padding: '10px',
                            paddingBottom: '60px'
                        }}>

                            <div>
                                {this.state.updating==false?facility_choose:insertNew}
                            </div>
                            {bubbleMessage}

                            <div style={{ marginTop: '20px' }}>
                                <form id='facility-form'
                                    // method='POST'
                                    // action='http://localhost:8000/api/insertRoomFacilities'
                                    enctype="multipart/form-data"
                                    onSubmit={(e) =>{this.state.updating==false?this.goInsert(e):this.goUpdate(e)}}
                                >
                                    <input type='hidden' name='id' id='id'></input>

                                    <div style={{ height: '50px' }}>
                                        <label style={this.props.mode == 'mobile' ? { display: 'none' } : {}} for='facility_name' className={'green'}>Facility Name </label>
                                        <input style={{ maxWidth: '500px', width: '100%' }} name='name' type='text' id='facility_name' placeholder='Facility Name' className='btnIjo'></input>
                                    </div>

                                    <div style={{ height: '50px' }}>
                                        <label style={this.props.mode == 'mobile' ? { display: 'none' } : {}} for='banner' className={'green'}>Facility Logo </label>
                                        <input ref='banner' name='icon' id='banner' onChange={() => this.handleChange()}
                                            className='hide' type='file'></input>
                                        <label for="banner" className='btnIjo' >Upload</label>
                                    </div>
                                    {banner_file}
                                    <div>
                                        <input type='submit' style={{ float: 'right' }} className='btnIjo' value={this.state.updating?'UPDATE':'INSERT'}></input>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div style={{padding:'10px'}}>
                            <select id='what' onChange={
                                    ()=>{
                                        this.getAllRoomFacilities()
                                    }
                                } className='btnIjo-selected'>
                                <option value='Room'>Room Facilty</option>
                                <option value='Public'>Public Facility</option>
                            </select>


                            <button onClick={
                                async ()=>{
                                    
                                    let a = this.setState({
                                        field:'name'
                                    })
                                    await a
                                    this.getAllRoomFacilities()
                                }
                            } className={this.state.field=='name'?'btnIjo-selected':'btnIjo'}>NAME</button>

                            <button onClick={
                                async () => {
                                    
                                    let a = this.setState({
                                        field: 'updated_at'
                                    })
                                    
                                    await a
                                    this.getAllRoomFacilities()
                                }
                            } className={this.state.field=='updated_at'?'btnIjo-selected':'btnIjo'}>UPDATE</button>

                            <button onClick={
                                async () => {
                                    
                                    let a = this.setState({
                                        sort: this.state.sort==0?1:0
                                    })
                                
                                    await a
                                    this.getAllRoomFacilities()
                                }
                            } className='btnOrange'>{this.state.sort != 0 ? '^' : 'v'}</button>
                        </div>
                        <div style={{
                            display:'flex',
                            flexWrap:'wrap',
                            padding:'20px'
                        }}>
                            {allRoomf}
                            
                                                   
                        </div>

                        {this.state.pop}

                    </div>


                    <div style={this.state.menu == 'menu_manage_owner' || this.state.menu == 'menu_manage_guest' ? {} : { display: 'none' }}>
                        <form id='form-search-guest' style={{marginBottom:'10px', display:'flex', flexWrap:'wrap'}}>
                            <select name='email' className='btnIjo'>
                                <option value='all'>All</option>
                                <option value='verified'>Email verified</option>
                                <option value='unverified'>Email unverified</option>
                            </select>
                            <select name='phone' className='btnIjo'>
                                <option value='all'>All</option>
                                <option value='verified'>Phone verified</option>
                                <option value='unverified'>Phone unverified</option>
                            </select>
                            
                            <div className='btnIjo-select' onClick={()=>this.getAllUser(this.state.menu=='menu_manage_owner'?2:1)}>go</div>
                        </form>
                    </div>

                    {/* manage guest */}
                    <div style={this.state.menu == 'menu_manage_guest' ? {} : { display: 'none' }}>
                        <div>
                            

                            {this.state.guest_list.map((user, idx)=>{
                                return(
                                    <div key={idx} style={{
                                        display:'flex',
                                        marginBottom:'5px'}} className='hoverable'>
                                        <div style={{
                                            overflow:'hidden',
                                            borderRadius:'50%',
                                            minWidth:'70px',
                                            width:'70px',
                                            height:'70px',
                                            display:'flex',
                                            justifyContent:'center'
                                        }}>
                                            <img className="profilepic" 
                                            src={user.profile_pic?'http://localhost:8000/images/profile_picture/'+user.profile_pic
                                            :'http://localhost:8000/images/profile_picture/'+'default.png'} />
                                        </div>
                                        <div style={{
                                            padding:'10px',
                                            display:'flex',
                                            justifyContent:'space-between',
                                            alignItems:'center',
                                            flexWrap:'wrap',
                                            width:'100%'
                                        }}>
                                            <div>
                                                <p>{user.name}</p>
                                                <p style={{color:'gray', fontSize:'13px'}}>{user.id}</p>
                                            </div>
                                            
                                            <div>
                                                <button className='btnIjo-selected' onClick={()=>this.popConfirmBan(user.status=='ok'?'ban':'bless',user.id, "Are you sure want to ban this user?", this.banUser.bind(this),1)}>{user.status=='ok'?'ban':'bless'}</button>
                                                <button onClick={()=>this.popConfirmDelete(user.id, "Are you sure want to delete this user?", this.deleteUser.bind(this))} className='btnOrange-selected'>delete</button>
                                                <button className='btnIjo' onClick={()=>this.popConfirmBan('reset',user.id, "Are you sure want to reset this user password?", this.resetPasswordUser.bind(this),1)}>reset password</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div style={{
                                display:'flex',
                                justifyContent:'space-between'
                            }}>
                                {this.state.guest_list_prev}
                                {this.state.guest_list_next}
                            </div>
                            
                        </div>

                    </div>


                    {/* manage owner */}
                    <div style={this.state.menu == 'menu_manage_owner' ? {} : { display: 'none' }}>
                    <div>
                            {this.state.guest_list.map((user, idx)=>{
                                return(
                                    <div key={idx} style={{
                                        display:'flex',
                                        marginBottom:'5px'}} className='hoverable'>
                                        <div style={{
                                            overflow:'hidden',
                                            borderRadius:'50%',
                                            minWidth:'70px',
                                            width:'70px',
                                            height:'70px',
                                            display:'flex',
                                            justifyContent:'center'
                                        }}>
                                            <img className="profilepic" 
                                            src={user.profile_pic?'http://localhost:8000/images/profile_picture/'+user.profile_pic
                                            :'http://localhost:8000/images/profile_picture/'+'default.png'} />
                                        </div>
                                        <div style={{
                                            padding:'10px',
                                            display:'flex',
                                            justifyContent:'space-between',
                                            alignItems:'center',
                                            flexWrap:'wrap',
                                            width:'100%'
                                        }}>
                                            <div>
                                                <p>{user.name}</p>
                                                <p style={{color:'gray', fontSize:'13px'}}>{user.id}</p>
                                            </div>
                                            
                                            <div>
                                                <button className='btnIjo-selected' onClick={()=>this.popConfirmBan(user.status=='ok'?'ban':'bless',user.id, "Are you sure want to ban this user?", this.banUser.bind(this),2)}>{user.status=='ok'?'ban':'bless'}</button>
                                                <button onClick={()=>this.popConfirmDelete(user.id, "Are you sure want to delete this user?", this.deleteUser.bind(this))} className='btnOrange-selected'>delete</button>
                                                <button className='btnIjo' onClick={()=>this.popConfirmBan('reset',user.id, "Are you sure want to reset this user password?", this.resetPasswordUser.bind(this),2)}>reset password</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div style={{
                                display:'flex',
                                justifyContent:'space-between'
                            }}>
                                {this.state.guest_list_prev}
                                {this.state.guest_list_next}
                            </div>
                            
                        </div>
                    </div>


                    {/* manage premium product */}
                    <div style={this.state.menu == 'menu_manage_premium_product' ? {} : { display: 'none' }}>
                        
                        <div style={this.props.mode=='mobile'?{
                            border:'0.5px solid gray', 
                            borderRadius:'5px', 
                            display:'flex', 
                            justifyContent:'center',
                            padding:'10px',
                            flexDirection:'column'
                            }:{
                                border:'0.5px solid gray', 
                                borderRadius:'5px', 
                                display:'flex', 
                                justifyContent:'center',
                                paddingTop:'30px',
                                paddingBottom:'50px',
                                paddingLeft:'100px',
                                paddingRight:'100px',
                                flexDirection:'column'
                                }}>
                            <input type='hidden' id='premium_id'></input>
                            <input style={{margin:'10px'}} id='premium-duration' type='text' placeholder='... days' className='btnIjo'></input>
                            <input style={{margin:'10px'}} id='premium-price' type='text' placeholder='price' className='btnIjo'></input>
                            <button style={{margin:'10px'}} className='btnIjo-select' onClick={()=>this.insertPremium()}>INSERT</button>
                        </div>
                        <div style={{
                            display:'flex',
                            flexWrap:'wrap',
                            justifyContent:'center'
                        }}>
                            {this.state.premium}
                            
                        </div>
                    </div>


                    {/* manage Transaction */}
                    <div style={this.state.menu == 'menu_manage_transaction' ? {} : { display: 'none' }}>
                        <div>
                            <form id='transaction-form' style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', backgroundColor:'lightgray'}}>
                                <div style={{display:'flex'}}>
                                    <input name='name' type='text' placeholder='name' className='btnIjo'></input>
                                    <select name='status'>
                                        <option>All</option>
                                        <option>Inactive</option>
                                        <option>Active</option>
                                    </select>
                                </div>

                                <div style={{display:'flex', flexWrap:'wrap'}}>
                                    <input name='date' id='filter-date' className='btnIjo' type='date'/>
                                    <select name='duration'>
                                            <option value=' '>All</option>
                                            {this.state.premiumData.map((p, idx)=>{
                                                // console.log(p)
                                                return(<option key={idx} value={p.day}>{p.day}</option>)
                                            })}
                                    </select>
                                    <input type='reset' className='btnOrange'></input>
                                    <div onClick={() => {this.setState({ menu: 'menu_manage_transaction' });
                                            this.setState({goloading:true});
                                            this.getPremiumTransaction(); 
                                            this.getPremium()}} className='btnIjo-select'>Search</div>
                                </div>
                                
                            </form>
                            
                            <ul style={{listStyleType:'none', padding:'0px'}}>
                                <li style={{backgroundColor:'lightgray', fontSize:'13px', height:'40px', borderBottom:'0.5px solid gray', display:'flex', alignItems:'center'}}>
                                    <div style={{width:'30%'}}><b>OWNER NAME</b></div>
                                    <div style={{width:'30%'}}><b>DATE</b></div>
                                    <div style={{width:'10%'}}><b>DAYS</b></div>
                                    <div style={{width:'20%'}}><b>PRICE</b></div>
                                </li>
                                {this.state.popUpUser}
                                {this.state.transactions.map((trx, i)=>{
                                    // console.log(i + " " +trx)
                                    return(
                                        <li key={i} onMouseLeave={()=>this.setState({popUpUser:''})}
                                        onMouseEnter={()=>this.popUpUser(trx.user_id)}
                                        style={{fontSize:'13px', height:'40px', borderBottom:'0.5px solid gray', display:'flex', alignItems:'center'}}>
                                            <div style={{width:'30%'}}>{trx.user_id.name}</div>
                                            
                                            <div style={{width:'30%'}}>{trx.created_at}</div>
                                            <div style={{width:'10%'}}>{trx.day}</div>
                                            <div style={{width:'20%'}}>{trx.price}</div>       
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>


                    {/* manage report */}
                    <div style={this.state.menu == 'menu_manage_report' ? {} : { display: 'none' }}>
                        <div>
                            <form id='report-form' style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', backgroundColor:'lightgray'}}>
                                <div style={{display:'flex'}}>
                                    <select name='type'>
                                        <option value=''>All</option>
                                        <option value='apartment'>Apartement</option>
                                        <option value='houses'>Houses</option>
                                    </select>
                                    <input name='date' id='filter-date' className='btnIjo' type='date'/>
                                    <div className='btnIjo-select' onClick={()=>this.getAllReport()}>go</div>
                                </div>
                                <input type='reset' value='reset' className='btnIjo'></input>
                            </form>
                            
                            <ul style={{listStyleType:'none', padding:'0px'}}>
                                <li style={{backgroundColor:'lightgray', fontSize:'13px', height:'40px', borderBottom:'0.5px solid gray', display:'flex', alignItems:'center'}}>
                                    <div style={{width:'20%'}}><b>PROPERTY NAME</b></div>
                                    <div style={{width:'20%'}}><b>DATE</b></div>
                                    <div style={{width:'40%'}}><b>CONTENTS</b></div>
                                    <div style={{width:'20%'}}><b>TYPE</b></div>
                                </li>
                                {this.state.popUpUser}
                                {this.state.reports.map((trx, i)=>{
                                    // console.log(i + " " +trx)
                                    return(
                                        <li key={i} onMouseLeave={()=>this.setState({popUpUser:''})}
                                        // onMouseEnter={()=>this.popUpUser(trx.user_id)}
                                        style={{fontSize:'13px', height:'40px', borderBottom:'0.5px solid gray', display:'flex', alignItems:'center'}}>
                                            <div style={{width:'20%', whiteSpace:'nowrap', overflowX:'auto'}}>{trx.property_id.name}</div>
                                            <div style={{width:'20%'}}>{trx.created_at}</div>
                                            <div style={{width:'40%', whiteSpace:'nowrap', overflowX:"auto"}}>{trx.contents}</div>       
                                            <div style={{width:'20%'}}>{trx.type}</div>       
                                        </li>
                                    )
                                })}
                                <div style={{
                                    display:'flex',
                                    justifyContent:'space-between'
                                }}>
                                    {this.state.report_prev}
                                    {this.state.report_next}
                                </div>
                            </ul>
                        </div>

                    </div>
                </div>
                <script
                dangerouslySetInnerHTML={{ __html:
                    `function myFunction() {
                        var popup = document.getElementById("myPopup");
                        popup.classList.toggle("show");
                    }`
                }}
                />
            </>
        )
    }


}

export default AdminManage