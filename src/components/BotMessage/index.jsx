import React from 'react'
import { Frame, List, Row } from 'arwes';
import Item from '../Item/index'

const BotMessage = (props) => {
    const items = props.payload.map((item, index) => {
        const {Name, wTeaser, wUrl, yUrl} = item;
        return <Item key={index} title={Name} text={wTeaser} yt={yUrl} wiki={wUrl}/>
    })
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
                    [Impatient statement] Very well, choose one of the following and leave me be, Meatbg...<br/>
                    <List node='ol'>
                    {items}
                    </List>
                </div>
            </Frame>
        </Row>
    )
}

export default BotMessage;