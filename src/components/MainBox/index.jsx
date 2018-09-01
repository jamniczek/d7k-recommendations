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

        if (this.state.userInput.trim()) {
            const newMessage = {
                type: 'fromUser',
                text: this.state.userInput
            }
            this.setState({ messages: [...this.state.messages, newMessage] });

            if (this.state.isRecommending) {
                const data = this.state.userInput.split(', ');
                console.log(data)
                const url = `https://evening-cove-27837.herokuapp.com/recommend`
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: {
                        titles: JSON.stringify(data)
                    }
                })
                    .then(res => {
                        console.log(res)
                        res.json()
                    })
                    .then(data => {
                        const newMessage = data.Similar.Results.length <= 0 ? noResultsMessage : formatNewRecommendation(data)
                        this.setState({
                            messages: [...this.state.messages, newMessage],
                            isRecommending: false,
                            userInput: ''
                        });
                    })
            } else {
                const url = 'https://evening-cove-27837.herokuapp.com/recognize';
                const userQuery = this.state.userInput;
                const data = {
                    query: userQuery
                }
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
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