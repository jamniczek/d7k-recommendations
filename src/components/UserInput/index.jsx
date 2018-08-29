import React from 'react'
import { Frame, Row, Button, Col } from 'arwes';

const UserInput = (props) => {
    return (
        <Row>
            <Col xl={12}>
                <form action=""
                    onSubmit={props.handler}
                    
                    style={{
                        // padding: '15px',
                        fontSize: '14px',
                        display: 'flex'
                    }}>
                    <Frame
                        show={true}
                        animate={true}
                        level={3}
                        corners={4}
                        layer='primary'
                        style={{ margin: '5px' }}
                    >
                        <input
                            // value={this.state.userInput}
                            onChange={props.changeHandler}
                            style={{
                                // width: '100%',
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#60dafd',
                                fontFamily: 'Titillium Web", "sans-serif',
                                fontSize: '14px',
                                outline: 'none',
                                margin: '5px',
                                // display: 'block'
                            }} type="text" />
                    </Frame>
                    <Button>Send</Button>
                </form>
            </Col>
        </Row>
    )
}

export default UserInput;