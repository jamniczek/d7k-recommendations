import React, { Component } from 'react'
import { Button, Link, Row, Col } from 'arwes';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            title: this.props.title,
            text: this.props.text,
            yt: this.props.yt,
            wiki: this.props.wiki
        }
    }
    toggleIsFull = () => {
        this.setState({ isFull: !this.state.isFull })
    }
    
    render() {
        return (
            <li>
                {this.props.title}
                <Row>
                    <Col>
                        {this.state.isFull ? this.state.text : this.state.text.slice(0,100) + '...'}  
                        <Link onClick={this.toggleIsFull}>{this.state.isFull ? ' Show less' : ' Show more'}</Link>
                    </Col>
                </Row>

                {this.state.isFull && <Row>
                    {this.state.yt ? <Col ><Button onClick={()=> window.open(this.props.yt, "_blank")} animate >YouTube</Button></Col> : <Col ><Button animate layer='disabled' >Unavailable</Button></Col>}
                    
                    {this.state.wiki && <Col ><Button onClick={()=> window.open(this.props.wiki, "_blank")} animate >Wikipedia</Button></Col>}
                </Row>}
            </li>
        )
    }
}
export default Item;