import React, {Component} from 'react'
import premium from '../assets/premium.svg'
import promote from '../assets/promote.svg'
import Reco from '../components/Reco';
import Axios from 'axios';


class Recommend extends Component{
    constructor(){
        super();

        this.state={
            comboFull:false,
            kost:[],
            apartements:[],
            lat: 6.201486,                    
            long: 106.781646
        }
    }

    getTopKost() {
        this.setState({
            kost: []
        })

        
        Axios.get('http://localhost:8000/api/getAllProperty?type=houses&latitude='+this.state.lat+"&longitude="+this.state.long+"&perPage=4", {
        }).then(
            res => {
                const arrRes = res.data.data
                // console.log(res.data.data)

                for (const result of arrRes) {
                    
                    let tagged = <Reco premium={premium} id={result.owner_id} property_id={result.id} promote={promote} info={result} header={'http://localhost:8000/images/banner/'+result.banner_id} name={result.name} price={result.price} size={'cari'}/>

                    // console.log(result.owner_id)
                    this.setState({
                        kost: [...this.state.kost, tagged]
                    })
                }

            }
        )
    }

    getTopApartements() {
        this.setState({
            apartements: []
        })

        
        Axios.get('http://localhost:8000/api/getAllProperty?type=apartements&latitude='+this.state.lat+"&longitude="+this.state.long+"&perPage=4", {
        }).then(
            res => {
                const arrRes = res.data.data
                // console.log(res.data.data)

                for (const result of arrRes) {
                    
                    let tagged = <Reco premium={premium} id={result.owner_id} property_id={result.id} promote={promote} info={result} header={'http://localhost:8000/images/banner/'+result.banner_id} name={result.name} price={result.price} address={result.address} size={'cari'}/>

                    // console.log(result.owner_id)
                    this.setState({
                        apartements: [...this.state.apartements, tagged]
                    })
                }

            }
        )
    }


    componentDidMount(){
        if(window.innerWidth<=500){
            this.setState({
                comboFull:true
            })
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                let a = this.setState({
                    lat: lat,
                    long: long
                })
                await a
                console.log(this.state.lat, this.state.long)
                this.getTopKost()
                this.getTopApartements()
            }.bind(this),function () {
                
            },{timeout:10000})            

        }
        
        // console.log("sadsdsad")

        window.addEventListener('resize', ()=>{
            if(window.innerWidth<=500){
                this.setState({
                    comboFull:true
                })
            }else{
                this.setState({
                    comboFull:false
                })
            }
        })
    }

    render(){
        // console.log('asd: '+this.props.header)
        let bebijianpunya = window.innerWidth>1100?{
            // justifyContent: 'center',
            display:'flex',
            marginBottom: '15px',
            margin: '0 auto',
            overflowX: 'auto',
            padding: '15px',
            maxWidth: '1100px'
        }:{
            width: '100%',
            // paddingLeft: '10px',
            // paddingRight: '10px',
            display:'flex',
            overflowX: 'auto',
            marginBottom: '15px',
            margin: '0 auto'
        }


        let comboboxFull = this.state.comboFull?{borderBottom:'1px solid green', width:'100%', marginLeft: '10px', marginRight:'10px'}:
        {borderBottom:'1px solid green'}

        let selectFull = this.state.comboFull?{
            color: 'green',
            border: 'none',
            outline: 'none',
            fontSize: '18px',
            width:'100%',
            paddingTop:'10px',
            // appearance: 'none',
            // WebkitAppearance:'none',
            background: 'white',
            textDecoration: 'none',
        }:{
            color: 'green',
            border: 'none',
            outline: 'none',
            fontSize: '18px',
            // appearance: 'none',
            // WebkitAppearance:'none',
            background: 'white',
            textDecoration: 'none',
        }

        let textFull = this.state.comboFull?{
            textAlign: 'left',
            fontSize: '19px',
            marginRight:'10px',
            width: '100%',
            paddingLeft: '10px',
            textAlign: 'center'
        }:{
            textAlign: 'left',
            fontSize: '19px',
            marginRight:'10px'
        }

        return(
            <>
                
                

                <div style={{margin:'0 100px'}}><p style={textFull} className='gray'>Top 4 kost near you</p></div>
                <div style={bebijianpunya} className='bebijian'>
                    {this.state.kost}
                </div>
                <div style={{margin:'0 100px'}}><p style={textFull} className='gray'>Top 4 apartements near you</p></div>
                <div style={bebijianpunya} className='bebijian'>
                    {this.state.apartements}
                </div>

                
            </>
        )
    }


}

export default Recommend