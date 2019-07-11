import React, {Component} from 'react'

class ChatBubble extends Component{
    render(){
        let read_indicator = this.props.chat_id<=this.props.read?
        <span style={{
            color:'green',
            marginRight:'15px'
        }}>r</span>:<span style={{
            color:'orangered',
            marginRight:'15px'
        }}>√</span>

        let bubble = this.props.type == 'send'?
        <div className='bubble'>
            <div className="bubble-send">
                <p className="bubble-send-text fontkecil">{read_indicator}{this.props.message}</p>
                {/* <p>{this.props.chat_id+' '+this.props.read}</p> */}
            </div>
        </div>
        :
        <div className='bubble'>
            <div className="bubble-receive">
                <p className="bubble-receive-text fontkecil">{this.props.message}</p>
            </div>
        </div>

        

        return(
            <>
                {bubble}
            </>
        )
    }

}

export default ChatBubble