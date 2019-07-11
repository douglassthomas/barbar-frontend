import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import NavBar from '../containers/NavBar';
import logobarbar from '../assets/logoibu.png'
import BC from '../components/BC';
import searchIcon from '../assets/search-icon.png'
import Axios from 'axios';
import Loading from '../containers/Loading';
import logo from '../assets/logoibu.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BubPop from '../components/BubPop';

class Checkout extends Component{
    constructor(){
        super()

        this.state = {
            loading: false,
            startDate: '',
            endDate: '',
            transactionDate:''
        }
    }

    getUserPremiumDate(){
        Axios.post('http://localhost:8000/api/getUserPremiumDate',{
            user_id: this.props.login.id,
            token: localStorage.token?localStorage.token:sessionStorage.token
        }).then(res=>{
            this.setState({
                startDate: res.data.start,
                endDate: res.data.end
            })
        })
    }

    componentDidMount(){
        this.getUserPremiumDate()
        console.log(this.props)
    }

    async goPDF(){
        this.setState({
            loading:true
        })
        document.getElementById('btnCheckout').style.display = 'none'

        let pdf = new jsPDF('p', 'mm', 'a5');
        const input = document.getElementById('checkout-invoice');
        input.style.width = pdf.internal.pageSize.getWidth()+'mm';
        await pdf
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), 55);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");

            // disini axios
            let formData = new FormData();
            formData.append('invoice', btoa(pdf.output()))
            formData.append('user_id', this.props.login.id)
            formData.append('day', this.props.location.state.premium.day)
            formData.append('token', localStorage.token?localStorage.token:sessionStorage.token)
            formData.append('price', (this.props.location.state.premium.price - (this.props.location.state.premium.price*this.props.location.state.premium.promo/100)))
            

            let headers = {
                'content-type': 'multipart/form-data'
            }

            Axios.post('http://localhost:8000/api/checkout', formData, headers).then(
                res=>{
                    this.setState({
                        loading:false
                    })
                    this.setState({
                        rmessage:
                        <BubPop message='Transaction Complete, We are sending you an email'></BubPop>
                    })
                    this.getUserPremiumDate();
                }
            )

            input.style.width = ''
            
        })
    }

    render(){
        let navigations = this.props.nav
        let fav_container = this.props.mode == 'desktop' ? 'favorite-container' : 'fav-container'
        let loading = this.state.loading?<Loading></Loading>:''


        return(<>
        {loading}
        {this.state.rmessage}
        <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
             <div className='navstick' style={{ zIndex: 1000, position: 'relative' }}>
                <NavBar apptis={this.props.apptis} cari={true} nav={navigations} logobarbar={logobarbar} searchIcon={searchIcon} mode={this.props.mode} />
            </div>
            <div className={fav_container}>
                <div style={{
                    border:'0.5px solid gray',
                    borderRadius:'10px',
                    padding:'10px',
                    fontFamily:'arial'
                }}>
                    <table>
                        <tr >
                            <td style={{color:'gray'}}>Name</td>
                            <td>{this.props.login.name}</td>
                        </tr>
                        <tr>
                            <td style={{color:'gray'}}>Premium Start Date</td>
                            <td>{this.state.startDate}</td>
                        </tr>
                        <tr>
                            <td style={{color:'gray'}}>Premium End Date</td>
                            <td>{this.state.endDate}</td>
                        </tr>
                    </table>
                </div>
                {<div id='checkout-invoice'>
                    <div style={{
                        borderBottom:'0.5px solid gray',
                        borderTop:'0.5px solid gray',
                        padding:'10px',
                        fontFamily:'arial',
                        marginTop:'50px',
                        display:'flex',
                        justifyContent:'space-between',
                        backgroundColor:'rgb(4, 172, 54)'
                    }}>
                        <span style={{color:'white'}}>INVOICE</span>
                        <>
                            <img style={{width:'20px'}} src={logo}></img>
                            <span style={{color:'white'}}>barbarkos</span>
                        </>
                    </div>
                    <div style={{
                        borderBottom:'0.5px solid gray',
                        padding:'10px',
                        fontFamily:'arial'
                    }}>
                        <table style={{height:'140px'}}>
                            <tr >
                                <td style={{color:'gray'}}>Name</td>
                                <td>{this.props.login.name}</td>
                            </tr>
                            <tr>
                                <td style={{color:'gray'}}>Duration</td>
                                <td>{this.props.location.state.premium.day+' days'}</td>
                            </tr>
                            <tr>
                                <td style={{color:'gray'}}>Price</td>
                                <td>{'Rp '+(this.props.location.state.premium.price - (this.props.location.state.premium.price*this.props.location.state.premium.promo/100))}</td>
                            </tr>
                            
                            <tr>
                                <td style={{color:'gray'}}>Transaction Date</td>
                                <td>{new Date().toGMTString()}</td>
                            </tr>
                        </table>
                    </div>
                    <button id='btnCheckout' onClick={()=>this.goPDF()}
                    style={{float:'right', marginTop:'10px'}} className='btnIjo'>Checkout</button>
                </div>}
                
            </div>

            </>
        )
    }
}

export default withRouter(Checkout)