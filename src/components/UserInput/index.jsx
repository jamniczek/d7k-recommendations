import React from 'react'
import { Frame, Row, Button, Col } from 'arwes';

const UserInput = (props) => {
    const styling = {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#60dafd',
        fontFamily: 'Titillium Web", "sans-serif',
        fontSize: '14px',
        outline: 'none',
        margin: '5px',        
        width: '35vw'
    }
    return (
        <Row>
            <Col xl={12} style={{margin: '5px', display: 'flex'}}>
                <form action=""
                    onSubmit={props.handler}
                    style={{
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
                            value={props.value}
                            onChange={props.changeHandler}
                            style={styling} type="text" />
                    </Frame>
                    <Button>Send</Button>
                </form>
            </Col>
        </Row>
    )
}

export default UserInput;