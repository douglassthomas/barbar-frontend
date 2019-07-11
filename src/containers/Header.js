import React, {Component} from 'react'
import SearchPage from './SearchPage';
import SearchCover from '../components/SearchCover';

class Header extends Component{
    constructor(){
        super()
        
        this.state={
            clicked:false,
            top:false
        }
    }
    
    componentDidMount(){
        if(window.innerWidth<1100){
            this.setState({
                top:true
            })
        }        


        window.addEventListener('resize', () => {
            if(window.innerWidth<1100){
                this.setState({
                    top:true
                })
            }else{
                this.setState({
                    top:false
                })
            }
        })
    }

    turn = ()=>{
        this.setState({
            clicked: !this.state.clicked
        })
        document.body.style.overflow='auto'
    }

    render(){
        let search = this.state.clicked?
            <SearchCover turn={this.turn}/>
        :''

        let top = !this.state.top? {
            position: 'relative',
            zIndex:999,
            width: '100%',
            marginTop: '23vh'
          }:{
            position: 'relative',
            zIndex:999,
            width: '100%',
            marginTop: '20vh'
          }

          let fontMau = !this.state.top? {
            fontSize: '5vh',
            textAlign: 'center',
            fontWeight: 700,
            color: 'white',
            }:{
                fontSize: '30px',
                textAlign: 'center',
                fontWeight: 700,
                color: 'white',
            }

        let delapanlimapuluh = window.innerWidth<=850?{
            borderRadius: '5px',
            width: '90vw',
            height: '90px',
            margin: '0 auto',
            backgroundColor: 'white',
            marginTop: '45px',
            padding: '15px',
            alignSelf: 'center',
        }:{
            borderRadius: '5px',
            width: '65vw',
            height: '90px',
            margin: '0 auto',
            backgroundColor: 'white',
            marginTop: '45px',
            padding: '15px',
            alignSelf: 'center',
        }


        return(        
        <header style={{
            backgroundImage:' url('+this.props.header+')',
            backgroundSize: 'cover',
            float: 'inherit',
            height: '65vh',
            minHeight:'65vh',
            position: 'relative',
            paddingTop: '20vh',
            paddingBottom: '5vh'
          }}>
            {search}

            

            <span style={top}>
            
                <p style={fontMau}>Mau cari kos-kosan?</p>
                
                <p style={{
                fontSize: '18px',
                textAlign: 'center',
                color: 'white',
                marginTop: '30px'
                }}>Dapatkan info kost murah, harian, bebas, dan boleh rame-rame di Barbarkos!</p>
                
                <div style={{
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }}>
                    <div style={delapanlimapuluh}>
                        <p style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            marginBottom: '10px'
                        }}>
                            Pilih Lokasi
                        </p>

                        <div className="search_logo"></div>
                        <input style={{
                            height: '25px',
                            border: '0px solid',
                            padding: '20px 40px',
                            width: '100%',
                            fontSize: '14px',
                            fontWeight: '550',
                            maxHeight: '40px',
                            outline: 'none'
                        }} type="text" id='search_input' placeholder='Cari nama tempat atau alamat ...' onClick={this.turn}/>
                    
                    </div>
                </div>
            </span>
            
          </header>
          
          )
    }
}

export default Header