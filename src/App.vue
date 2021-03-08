<template>
    <div class="app">
        <template>
            <p v-if="isConnected" class="app__status">
                Online <span class="app__status-mark app__status-mark--online">●</span>
            </p>

            <p v-else class="app__status">
                Offline <span class="app__status-mark app__status-mark--offline">●</span>
            </p>
        </template>

        <div class="content">
            <div v-if="!isAuth" class="chat-container">
                <auth/>
            </div>

            <div v-if="isAuth" class="chat-container">
                <Chat
                    :participants="participants"
                    :myself="user"
                    :messages="messages"
                    :chat-title="chatTitle"
                    :placeholder="placeholder"
                    :colors="colors"
                    :border-style="borderStyle"
                    :close-button-icon-size="closeButtonIconSize"
                    :submit-icon-size="submitIconSize"
                    :async-mode="asyncMode"
                    :scroll-bottom="scrollBottom"
                    :display-header="true"
                    :send-images="false"
                    :profile-picture-config="profilePictureConfig"
                    :timestamp-config="timestampConfig"
                    :link-options="linkOptions"
                    :hide-close-button="false"
                    @onMessageSubmit="onMessageSubmit"
                    @onType="onType"
                    @onClose="onClose()"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {Chat} from 'vue-quick-chat'
import 'vue-quick-chat/dist/vue-quick-chat.css';
import Auth from './components/Auth'
import store from '@/store'
import {websocket} from '@/api/socket'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    name: 'app',

    components: {
        Chat,
        Auth,
    },

    data() {
        return {
            isConnected : false,
            placeholder: 'send your message',
            colors: {
                header: {
                    bg: '#086CA2',
                    text: '#fff'
                },
                message: {
                    myself: {
                        bg: '#fff',
                        text: '#555'
                    },
                    others: {
                        bg: '#dfefff',
                        text: '#555'
                    },
                    messagesDisplay: {
                        bg: '#f7f3f3'
                    }
                },
                submitIcon: '#086CA2',
                submitImageIcon: '#086CA2',
            },
            borderStyle: {
                topLeft: "10px",
                topRight: "10px",
                bottomLeft: "10px",
                bottomRight: "10px",
            },
            submitIconSize: 24,
            closeButtonIconSize: "20px",
            asyncMode: true,
            scrollBottom: {
                messageSent: true,
                messageReceived: false
            },
            profilePictureConfig: {
                others: false,
                myself: false,
                styles: {
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%'
                }
            },
            timestampConfig: {
                format: 'HH:mm',
                relative: false
            },
            // there are other options, you can check them here
            // https://soapbox.github.io/linkifyjs/docs/options.html
            linkOptions: {
                myself: {
                    className: 'myLinkClass',
                    events: {
                        click: function (e) {
                            console.log('Link clicked!');
                        },
                        mouseover: function (e) {
                            console.log('Link hovered!');
                        }
                    },
                    format: function (value, type) {
                        if (type === 'url' && value.length > 50) {
                            value = value.slice(0, 50) + '…';
                        }
                        return value;
                    }
                },
                others: {
                    className: 'othersLinkClass',
                    events: {
                        click: function (e) {
                            e.preventDefault();
                            console.log('Link clicked!');
                        },
                        mouseover: function (e) {
                            console.log('Link hovered!');
                        }
                    },
                    format: function (value, type) {
                        if (type === 'url' && value.length > 50) {
                            value = value.slice(0, 50) + '…';
                        }
                        return value;
                    }
                }
            }
        }
    },

    computed: {
        ...mapState([
            'user',
        ]),

        ...mapGetters([
            'isAuth',
            'messages',
            'participants',
        ]),

        chatTitle() {
            return 'Chat of the doom';
        },
    },

    watch: {
        async isAuth(val) {
            if ( val ) {
                await this.fetchMessages()
                await websocket.connect()
                this.addSocketListeners()

                if ( this.messages.length ) {
                    const theirMessageIds = this.messages
                    .filter(x => x.participantId !== this.user.id && !x.viewed)
                    .map(x => x.id)

                    this.sendMarkMessageAsViewed(theirMessageIds)
                }
            }
        },
    },

    beforeCreate() {
        this.$store = store()
    },

    beforeDestroy () {
        websocket.close();
    },

    methods: {
        ...mapActions([
            'fetchMessages',
            'logout',
        ]),

        ...mapMutations([
            'setUser',
            'addMessage',
            'setAsViewed',
            'setParticipant',
            'setParticipantList',
        ]),

        sendMarkMessageAsViewed(messageIdList = []) {
            websocket.subscription.emit('viewed', messageIdList)
        },

        addSocketListeners () {
            websocket.on('close', () => {
                this.isConnected = false
                console.log('close');

            })

            websocket.on('open', () => {
                this.isConnected = true
                console.log('open');
            })

            websocket.subscription.on('message', (message) => {
                this.addMessage(message)

                if (!message.viewed && message.participantId !== this.user.id) {
                    this.sendMarkMessageAsViewed([message.id])
                }
            })

            websocket.subscription.on('viewed', (messageIdList) => {
                this.setAsViewed(messageIdList)
            })
        },

        // eslint-disable-next-line
        onType: function (e) {
            // eslint-disable-next-line
            // console.log('typing');
        },

        onMessageSubmit(message) {
            this.sendMessage(message)
        },

        async sendMessage(message) {
            websocket.subscription.emit('message', message)
        },

        onClose() {
            this.logout()
        },
    },
}
</script>

<style lang="scss">
@import '@/scss/_breakepoints.scss';

body {
    margin: 0;
    padding: 0;
}

.app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    @include sm() {
        margin-top: 0;
    }

    &__status {
        margin: 0;
    }

    &__status-mark {
        &--online {
            color: rgb(38, 184, 50);
        }

        &--offline {
            color: rgb(82, 82, 82);
        }
    }
}

.content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.chat-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f3f3;
    padding: 10px 0 10px 0;
    height: calc(100vh - 130px);
    width: 350px;
    max-width: 100%;

    @include sm() {
        height: calc(100vh - 44px);
    };
}

.external-controller {
    background: #2c3e50;
    height: 300px;
    width: 600px;
    display: flex;
    color: #eee;
}

.controller-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    flex-wrap: wrap;
}

.btn-message {
    cursor: pointer;
    background: #eee;
    border: none;
    height: 40px;
    color: #2c3e50;
    border-radius: 5px;
    outline: none;
    transition: 0.3s;
}

.btn-participant {
    cursor: pointer;
    background: #eee;
    border: none;
    height: 40px;
    color: #003c77;
    border-radius: 5px;
    outline: none;
    transition: 0.3s;
}

.btn-message:hover {
    background: rgb(255, 255, 255);
}

.input {
    padding: 8px 12px;
    color: #003c77;
    font-size: 14px;
    border: 1px solid #617a92;
    border-radius: 4px;
    margin-bottom: 12px;
    outline: none;
    transition: 0.5s all;
    text-align: center;
    z-index: 1;
    box-shadow: inset 1px 1px 3px 0px rgb(0, 0, 0, 0.2);

    & + .input-animation {
        position: relative;
        top: -46px;
        width: calc(50% + 24px);
        display: inline-block;
        transition: 0.5s all;
        color: #FF8B00;

        &::before {
            content: "≡";
            font-size: 24px;
            transition: 0.2s all;
            left: 0;
            position: absolute;
        }

        &::after {
            content: "≡";
            font-size: 24px;
            transition: 0.2s all;
            right: 0;
            position: absolute;
        }
    }

    &::placeholder {
        font-weight: 200;
        color: #617a92;
    }

    &:focus {
        padding: 6px 24px;
        margin-top: 2px;
        margin-bottom: 14px;
        border-color: #a18585;
        border-bottom-color: #FF8B00;
        box-shadow: 0px 0px 5px #d3800340;

        & + .input-animation {
            width: calc(50% + 70px);
            color: #FF8B00;

            &::before {
                transform: skew(10deg,10deg);
            }

            &::after {
                transform: skew(-10deg,-10deg);
            }
        }
    }
}

.btn-submit {
    padding: 8px 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid #617a92;
    border-radius: 4px;
    margin-bottom: 12px;
    outline: none;
    transition: 0.5s all;
    text-align: center;
    cursor: pointer;
    background: #086CA2;
    box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.2);

    &:hover {
        background: #0b7ebd;
    }

    &:active {
        background: #08537c;
    }
}

.btn-submit-orange {
    padding: 8px 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid #617a92;
    border-radius: 4px;
    margin-bottom: 12px;
    outline: none;
    transition: 0.5s all;
    text-align: center;
    cursor: pointer;
    background: #FF8B00;

    &:hover {
        background: #fca63e;
    }

    &:active {
        background: #da7802;
    }
}
</style>
