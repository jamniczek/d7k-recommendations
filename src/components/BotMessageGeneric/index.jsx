import React from 'react'
import { Frame, Words, Row } from 'arwes';

const BotMessageGeneric = (props) => {
    return (
        <Row col s={11} m={8} l={8} xl={8} >
            <Frame
                show={true}
                animate={true}
                level={3}
                corners={0}
                layer='primary'
            >
                <div style={{ padding: '5px 5px', fontSize: '14px' }}>
                    <p><Words animate >{props.text}</Words></p>
                </div>
            </Frame>
        </Row>
    )
}

export default BotMessageGeneric;