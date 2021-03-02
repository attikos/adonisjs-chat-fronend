<template>
    <div class="app">
        <div class="app__status">
            <p v-if="isConnected">Online <span class="app__status-mark app__status-mark--online">●</span></p>
            <p v-else>Offline <span class="app__status-mark app__status-mark--offline">●</span></p>
        </div>

        <div class="content">
            <div v-if="!isAuth" class="chat-container">
                <auth/>
            </div>

            <div v-if="isAuth" class="chat-container">
                <!-- :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null" -->
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
                    :submit-image-icon-size="submitImageIconSize"
                    :async-mode="asyncMode"
                    :scroll-bottom="scrollBottom"
                    :display-header="true"
                    :send-images="false"
                    :profile-picture-config="profilePictureConfig"
                    :timestamp-config="timestampConfig"
                    :link-options="linkOptions"
                    :accept-image-types="'.png, .jpeg'"
                    :hide-close-button="false"
                    @onImageClicked="onImageClicked"
                    @onImageSelected="onImageSelected"
                    @onMessageSubmit="onMessageSubmit"
                    @onType="onType"
                    @onClose="onClose()"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { Chat } from 'vue-quick-chat'
import 'vue-quick-chat/dist/vue-quick-chat.css';
import Auth from './components/Auth'
import store from '@/store'
import {axios} from '@/utils/axios'
import {socket} from '@/utils/socket'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';

export default {
    name: 'app',

    components: {
        Chat,
        Auth,
    },

    data() {
        return {
            isConnected : false,
            visible     : true,
            // participants : [
            //     {
            //         name: 'Arnaldo',
            //         id: 1,
            //         profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
            //     },
            // ]

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
                        // bg: '#FFeFe3'
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
            submitImageIconSize: 24,
            closeButtonIconSize: "20px",
            asyncMode: true,
            toLoad: [
                {
                    content: 'Hey, John Doe! How are you today?',
                    participantId: 2,
                    timestamp: { year: 2016, month: 3, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123 },
                    uploaded: true,
                    viewed: true
                },
                {
                    content: "Hey, Adam! I'm feeling really fine this evening.",
                    participantId: 3,
                    timestamp: { year: 2016, month: 1, day: 5, hour: 19, minute: 10, second: 3, millisecond:123 },
                    uploaded: true,
                    viewed: true
                },
            ],
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
                await socket.connect()
                console.log('socket', socket);

                await this.addSubscribeListener()

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
        socket.close();
    },

    methods: {
        ...mapActions([
            'fetchMessages',
        ]),

        ...mapMutations([
            'setUser',
            'addMessage',
            'setAsViewed',
            'setParticipant',
            'setParticipantList',
        ]),

        sendMarkMessageAsViewed(messageIdList = []) {
            socket.subscription.emit('viewed', messageIdList)
        },

        async addSubscribeListener () {
            socket.subscription.on('message', (message) => {
                this.addMessage(message)

                if (!message.viewed && message.participantId !== this.user.id) {
                    this.sendMarkMessageAsViewed([message.id])
                }
            })

            socket.subscription.on('viewed', (messageIdList) => {
                this.setAsViewed(messageIdList)
            })
        },

        // eslint-disable-next-line
        onType: function (e) {
            // eslint-disable-next-line
            // console.log('typing');
        },
        loadMoreMessages(resolve) {
            setTimeout(() => {
                resolve(this.toLoad)
                //Make sure the loaded messages are also added to our local messages copy or they will be lost
                this.messages.unshift(...this.toLoad)
                this.toLoad = []
            }, 1000)
        },
        onMessageSubmit(message) {
            this.sendMessage(message)
        },

        async sendMessage(message) {
            socket.subscription.emit('message', message)

            // try {
            //     const res = await axios.post('/post', { message })

            //     // if ( res.data && res.data.success ) {
            //     // }
            // } catch (error) {
            //     return console.log(error)
            // }
        },

        onClose() {
            this.logout()
            socket.close();
        },

        async logout() {
            let res

            try {
                res = await axios.post('/logout')
            } catch (error) {
                return console.log(error)
            }

            if ( res.data && res.data.success ) {
                return this.setUser({})
            }
        },

        onImageSelected({file, message}){
            let src = 'https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg'
            // this.addMessage(message)
            /**
             * This timeout simulates a requisition that uploads the image file to the server.
             * It's up to you implement the request and deal with the response in order to
             * update the message status and the message URL
             */
            setTimeout((res) => {
                message.uploaded = true
                message.src = res.src
            }, 3000, {src})
        },
        onImageClicked(message){
            /**
             * This is the callback function that is going to be executed when some image is clicked.
             * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
             */
            console.log('Image clicked', message.src)
        }
    },
}
</script>

<style lang="scss">
.app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    &__status {

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
    height: 500px;
    width: 350px;
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
