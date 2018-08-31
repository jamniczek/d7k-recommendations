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

        if (this.state.userInput) {
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
                            isRecommending: false,
                            userInput: ''
                        });
                    })
            } else {
                const url = 'https://secret-fortress-42712.herokuapp.com/recognize';
                const userQuery = this.state.userInput;
                const data = {
                    query: userQuery
                }
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin': 'https://ancient-badlands-76161.herokuapp.com/' , 
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(data => {
                        const newMessage = data.message;
                        if (data.intent === 'recommend') {
                            this.setState({
                                messages: [...this.state.messages, newMessage],
                                isRecommending: true,
                                userInput: ''
                            })
                            
                        } else {
                            this.setState({
                                messages: [...this.state.messages, newMessage],
                                userInput: ''
                            });
                        }
                    });
            }
        }
    };

    inputChangeHandler = (event) => {
        this.setState({ userInput: event.target.value });
    };

    componentDidUpdate() {
        const hook = document.getElementById('hook')
        hook.scrollIntoView()
    }

    render() {
        const messages = this.state.messages.map((message, index) => {
            if (message.type === 'fromUser') {
                return <UserMessage key={index} text={message.text} />
            }
            if (message.type === 'fromBotGeneric') {
                return <BotMessageGeneric key={index} text={message.text} />
            }
            if (message.type === 'fromBotRich') {
                return <BotMessage key={index} payload={message.titles} />
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
                    <div id='hook'></div>
                </Project>
                <UserInput handler={this.userInputHandler}
                    changeHandler={this.inputChangeHandler}
                    value={this.state.userInput}
                />
            </div>
        )
    }
}

export default MainBox;