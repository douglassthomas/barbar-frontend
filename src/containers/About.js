import React, {Component} from 'react'

class About extends Component{

    constructor(){
        super()

        this.state={
            noSatu:false,
            noDua:false,
            noTiga:false,
            mobile: false,
        }
    }

    componentDidMount(){
        if(window.innerWidth<1100){
            this.setState({
                mobile:true
            })
        }

        window.addEventListener('resize', ()=>{
            if(window.innerWidth<1100){
                this.setState({
                    mobile:true
                })
            }else{
                this.setState({
                    mobile:false
                })
            }
        })
    }

    changeSatu(){
        this.setState({
            noSatu: !this.state.noSatu
        })
    }
    changeDua(){
        this.setState({
            noDua: !this.state.noDua
        })
    }
    changeTiga(){
        this.setState({
            noTiga:!this.state.noTiga
        })
    }

    render(){
        let satu = this.state.noSatu?
        {
            fontSize:'13px',
            padding:'5px',
            transition: '0.5s',
            borderBottom: '2px solid lightgray'
        }:{
            fontSize:'13px',
            padding:'5px',
            display:'none'
        }
        let dua = this.state.noDua?
        {
            fontSize:'13px',
            padding:'5px',
            transition: '0.5s',
            borderBottom: '2px solid lightgray'
        }:{
            fontSize:'13px',
            padding:'5px',
            display:'none'
        }
        let tiga = this.state.noTiga?
        {
            fontSize:'13px',
            padding:'5px',
            transition: '0.5s',
            borderBottom: '2px solid lightgray'
        }:{
            fontSize:'13px',
            padding:'5px',
            display:'none'
        }




        let about = !this.state.mobile?<div style={{
            height:'600px',
            backgroundColor: 'lightgray',
            display: 'flex',
            padding:'28px'
        }}>
            <div style={{
                width: '50vw',
                fontSize:'13px',
                padding:'5px'
            }}>
                <p style={{paddingBottom:'20px'}}><b>Mamikos - Aplikasi Pencari Info Kost No 1 Di Indonesia</b></p>
                <p style={{lineHeight:'25px'}}>MAMIKOS menyajikan informasi Kamar kosan, lengkap dengan fasilitas kost, harga kost, dan dekorasi kamar beserta foto desain kamar yang disesuaikan dengan kondisi sebenarnya. Setiap Rumah Kost yang ada di MAMIKOS benar-benar kami datangi, kami verifikasi, kami seleksi dan kami ambil data langsung, termasuk kost yang didaftarkan oleh pemilik atau umum. Informasi ketersediaan kamar kost dan harga kost kami update max setiap 2 minggu sekali untuk memastikan info kost kami akurat dan bermanfaat untuk anak kost. Saat ini kami memiliki lebih dari 10.000+ info kost dan masih terus bertambah di Indonesia. Data Kamar kosan yang kami miliki telah mencakup kost di depok, kost jakarta, kost Jogja, hingga Kost Bandung dan Kost di Surabaya. Pengembangan data kosan masih terus kami usahakan. Namun demikian, kamu dapat request penambahan info kosan di seputar area yang kamu inginkan dengan mengisi data di Form Komplain. Kamu juga dapat menambahkan masukan, saran dan kritikan untuk mamikos di form tersebut. Dukungan kamu, akan mempercepat pengembangan data kosan yang kami miliki.
                    <br/><br/>
                    Jika kamu ingin mendapatkan inspirasi desain kamar minimalis atau kamar kost minimalis kamu bisa cek kost eksklusif yang ada di Mamikos. Dengan luas ruangan yang hampir sama, kebanyakan Kamar kost eksklusif hanya diberikan desain kamar atau dekorasi kamar yang lebih menarik, ditambah tempat tidur beserta atributnya dan kamar mandi dalam plus AC, dengan tambahan internet. kosan ini tentunya dapat menjadi alternatif untuk kamu anak kost yang ingin mendesain kamar kost minimalis namun tetap eksklusif. Di Mamikos kini juga telah ditambahkan berbagai info kosan dengan harga murah ataupun beberapa tipe kosan lain sesuai masukan dari pengguna Mamikos.</p>
                                    </div>

            <div style={{
                width: '50vw',
                fontSize:'13px',
                padding:'5px'
            }}>
                <span style={{lineHeight:'25px'}}>
                Berbagai Informasi akurat yang dapat kamu lihat di Mamikos :<br/>

                    <ul>
                    <li>Alamat Rumah Kost yang Akurat dilengkapi peta lokasi kost yang relevan</li>
                    <li>Foto-foto lengkap fasilitas kosan dan desain kamar kost</li>
                    <li>Harga Kost yang selalu diupdate</li>
                    <li>Informasi ketersediaan kamar kost yang selalu diupdate 2 minggu sekali</li>
                    <li>Layanan Customer Service yang lebih terintegrasi melalui chat (Maksimal pelayanan 1 x 24 jam)</li>
                    <li>Google Map untuk membantu navigasi kamu ke kosan</li>
                    <li>Filter pencarian kost untuk membantumu menemukan kosan idamanmu</li>
                    <li>Penambahan fitur clustering atau pengelompokan kost untuk mempermudah pencarian dan mempercepat loading</li>
                    </ul>
                    Fitur Pencarian kosan di Mamikos:<br/>

                    <ul>
                    <li>Cari kost dekat Kampus/Universitas di masing-masing kota</li>
                    <li>Cari kost di Jogja, Depok, Jakarta, Surabaya, Bandung, dan Kota besar lainnya</li>
                    <li>Cari kost di sekitar lokasi saya saat ini</li>
                    <li>Fitur Berlangganan (dapatkan update info kosan yang kamu inginkan lewat email)</li>
                    <li>Fitur Favorit kost (sukai dan simpan kamar kost yang kamu suka)</li>
                    <li>Fitur History (tampilkan kembali kosan yang pernah kamu kunjungi atau pernah kamu hubungi)</li>
                    <li>Filter Pencarian Kost berdasarkan Tipe Kost (Kost Putra, Kost Putri, Kost Campur), Spesifikasi Kost (Kost Bebas, Kost Pasutri, Kost AC, Kost Kamar mandi dalam, Kost Wifi dll), Tipe Pembayaran Kost (Kost Harian, Kost Bulanan, Kost Tahunan)</li>
                    </ul>               
                </span>
            </div>
        </div>:            <div>
                <div style={{
                    height:'60px',
                    backgroundColor:'#f2efec',
                    borderTop: '2px solid lightgray',
                    borderBottom: '2px solid lightgray',
                    
                }} onClick={this.changeSatu.bind(this)}>
                    <p style={{
                        fontSize:'15px',
                        margin: '20px',
                        textAlign: 'center'
                    }} className="lightgray">
                        Tentang Barbarkos
                    </p>
                </div>
                <div style={satu}>
                    <div style={{paddingBottom:'20px'}}><b>Mamikos - Aplikasi Pencari Info Kost No 1 Di Indonesia</b></div>
                    <p style={{lineHeight:'25px'}}>MAMIKOS menyajikan informasi Kamar kosan, lengkap dengan fasilitas kost, harga kost, dan dekorasi kamar beserta foto desain kamar yang disesuaikan dengan kondisi sebenarnya. Setiap Rumah Kost yang ada di MAMIKOS benar-benar kami datangi, kami verifikasi, kami seleksi dan kami ambil data langsung, termasuk kost yang didaftarkan oleh pemilik atau umum. Informasi ketersediaan kamar kost dan harga kost kami update max setiap 2 minggu sekali untuk memastikan info kost kami akurat dan bermanfaat untuk anak kost. Saat ini kami memiliki lebih dari 10.000+ info kost dan masih terus bertambah di Indonesia. Data Kamar kosan yang kami miliki telah mencakup kost di depok, kost jakarta, kost Jogja, hingga Kost Bandung dan Kost di Surabaya. Pengembangan data kosan masih terus kami usahakan. Namun demikian, kamu dapat request penambahan info kosan di seputar area yang kamu inginkan dengan mengisi data di Form Komplain. Kamu juga dapat menambahkan masukan, saran dan kritikan untuk mamikos di form tersebut. Dukungan kamu, akan mempercepat pengembangan data kosan yang kami miliki.
                        <br/><br/>
                        Jika kamu ingin mendapatkan inspirasi desain kamar minimalis atau kamar kost minimalis kamu bisa cek kost eksklusif yang ada di Mamikos. Dengan luas ruangan yang hampir sama, kebanyakan Kamar kost eksklusif hanya diberikan desain kamar atau dekorasi kamar yang lebih menarik, ditambah tempat tidur beserta atributnya dan kamar mandi dalam plus AC, dengan tambahan internet. kosan ini tentunya dapat menjadi alternatif untuk kamu anak kost yang ingin mendesain kamar kost minimalis namun tetap eksklusif. Di Mamikos kini juga telah ditambahkan berbagai info kosan dengan harga murah ataupun beberapa tipe kosan lain sesuai masukan dari pengguna Mamikos.</p>
                </div>
                    



                <div style={{
                    height:'60px',
                    backgroundColor:'#f2efec',
                    borderTop: '2px solid transparent',
                    borderBottom: '2px solid lightgray',
                    
                }} onClick={this.changeDua.bind(this)}>
                    <p style={{
                        fontSize:'15px',
                        margin: '20px',
                        textAlign: 'center'
                    }} className="lightgray">
                        Informasi Akurat Barbarkos
                    </p>
                </div>
                <div style={dua}>
                    <p style={{lineHeight:'25px'}}>
                    Berbagai Informasi akurat yang dapat kamu lihat di Mamikos :<br/>

                        <ul>
                        <li>Alamat Rumah Kost yang Akurat dilengkapi peta lokasi kost yang relevan</li>
                        <li>Foto-foto lengkap fasilitas kosan dan desain kamar kost</li>
                        <li>Harga Kost yang selalu diupdate</li>
                        <li>Informasi ketersediaan kamar kost yang selalu diupdate 2 minggu sekali</li>
                        <li>Layanan Customer Service yang lebih terintegrasi melalui chat (Maksimal pelayanan 1 x 24 jam)</li>
                        <li>Google Map untuk membantu navigasi kamu ke kosan</li>
                        <li>Filter pencarian kost untuk membantumu menemukan kosan idamanmu</li>
                        <li>Penambahan fitur clustering atau pengelompokan kost untuk mempermudah pencarian dan mempercepat loading</li>
                        </ul>
                    </p>
                </div>



                <div style={{
                    height:'60px',
                    backgroundColor:'#f2efec',
                    borderTop: '2px solid transparent',
                    borderBottom: '2px solid lightgray',
                    
                }} onClick={this.changeTiga.bind(this)}>
                    <p style={{
                        fontSize:'15px',
                        margin: '20px',
                        textAlign: 'center'
                    }} className="lightgray">
                        Fitur Pencarian Barbarkos
                    </p>
                </div>
                
                <div style={tiga}>
                <p style={{lineHeight:'25px'}}>
                    Fitur Pencarian kosan di Mamikos:<br/>

                    <ul>
                    <li>Cari kost dekat Kampus/Universitas di masing-masing kota</li>
                    <li>Cari kost di Jogja, Depok, Jakarta, Surabaya, Bandung, dan Kota besar lainnya</li>
                    <li>Cari kost di sekitar lokasi saya saat ini</li>
                    <li>Fitur Berlangganan (dapatkan update info kosan yang kamu inginkan lewat email)</li>
                    <li>Fitur Favorit kost (sukai dan simpan kamar kost yang kamu suka)</li>
                    <li>Fitur History (tampilkan kembali kosan yang pernah kamu kunjungi atau pernah kamu hubungi)</li>
                    <li>Filter Pencarian Kost berdasarkan Tipe Kost (Kost Putra, Kost Putri, Kost Campur), Spesifikasi Kost (Kost Bebas, Kost Pasutri, Kost AC, Kost Kamar mandi dalam, Kost Wifi dll), Tipe Pembayaran Kost (Kost Harian, Kost Bulanan, Kost Tahunan)</li>
                    </ul>               
                </p>
                </div>


            </div>

        return(
            <div>
                {about}
            </div>

        )
    }

}

export default About