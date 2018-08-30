import React, { Component } from 'react'
import { Project } from 'arwes';
import BotMessageGeneric from '../BotMessageGeneric/index';
import UserMessage from '../UserMessage/index';
import BotMessage from '../BotMessage/index';
import UserInput from '../UserInput/index';
import { noResultsMessage, formatNewRecommendation, welcomeMessage } from '../../Messages/messages';

class MainBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [welcomeMessage],
            userInput: '',
            isRecommending: false
        }
    }

    userInputHandler = (event) => {
        event.preventDefault();
        const newMessage = {
            type: 'fromUser',
            text: this.state.userInput
        }
        this.setState({ messages: [...this.state.messages, newMessage] })
        if (this.state.isRecommending) {
            const [item1, item2, item3] = this.state.userInput.split(', ');
            const url = `https://tastedive.com/api/similar?info=1&limit=5&q=${encodeURI(item1)}%2C${encodeURI(item2)}&%2C${encodeURI(item3)}&k=315222-recommed-2J3YXI6D`

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const newMessage = data.Similar.Results.length <= 0 ? noResultsMessage : formatNewRecommendation(data)
                    this.setState({
                        messages: [...this.state.messages, newMessage],
                        isRecommending: false
                    });
                })
        } else {
            console.log(this.state.userInput)
            const url = 'http://localhost:3002/recognize';
            const userQuery = this.state.userInput;
            const data = {
                query: userQuery
            }
            console.log(data)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const newMessage = data.message;
                    if (data.intent === 'recommend') {
                        this.setState({
                            messages: [...this.state.messages, newMessage],
                            isRecommending: true
                        })
                    } else {
                        this.setState({ messages: [...this.state.messages, newMessage] });
                    }
                })
        }
    };

    inputChangeHandler = (event) => {
        this.setState({ userInput: event.target.value });
    };

    render() {
        const messages = this.state.messages.map(message => {
            if (message.type === 'fromUser') {
                return <UserMessage text={message.text} />
            }
            if (message.type === 'fromBotGeneric') {
                return <BotMessageGeneric text={message.text} />
            }
            if (message.type === 'fromBotRich') {
                return <BotMessage payload={message.titles} />
            }
            return;
        })
        return (
            <div style={{ maxHeight: '80vh' }}>
                <Project
                    style={{ padding: 20 }}
                    animate
                    header='Status: Online'
                >
                    {messages}
                </Project>
                <UserInput handler={this.userInputHandler}
                    changeHandler={this.inputChangeHandler}
                />
            </div>
        )
    }
}

export default MainBox;