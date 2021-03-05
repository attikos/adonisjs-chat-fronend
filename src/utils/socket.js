import Ws from '@adonisjs/websocket-client'
import {getToken} from '@/utils/axios'

const env = require(`../../env/${ process.env.NODE_ENV }.env`)

export const websocket = {
    callbackList : {},

    /**
     * Connect and sunscribe to chat
     * Events: close, open, error
     */
    connect() {
        return new Promise( async (resolve, reject) => {
            try {
                const token = getToken()
                this.socket = this.socket || await Ws(env.API_URL_WEBSOCKET)
                    .withApiToken( token )
                    .connect()

                this.socket.on('close', () => {
                    console.log('close')
                    this.runCallback('close');
                })

                this.socket.on('open', async () => {
                    console.log('connected')
                    this.runCallback('open');

                    await this.subscribe()
                    resolve()
                })

                this.socket.on('error', () => {
                    this.runCallback('error');
                    reject()
                    console.log('disconnected')
                })

                window.socket = this
            }
            catch (err) {
                console.log(err)
            }
        })
    },

    close() {
        this.socket && this.socket.close()
        this.subscription && this.subscription.close()

        this.socket       = undefined;
        this.subscription = undefined;
    },

    /**
     * Subscribe to the chat.
     * Events: ready, error, close, message, viewed
     *
     * @return {Promise}
     */
    async subscribe() {
        return new Promise( async (resolve, reject) => {
            if (!this.socket) {
                throw new Error('Websocket not connected. Subscription not available.');
            }

            try {
                this.subscription = this.subscription || await this.socket.subscribe('chat')
            }
            catch(err) {
                console.log(err)
            }

            this.subscription.on('ready', () => {
                console.log('ready')
                resolve()
            })

            this.subscription.on('error', (e) => {
                console.log('error', e)
                reject()
            })

            // this.subscription.on('close', (e) => {
            //     console.log('close', e)
            // })

            // this.subscription.on('message', (message) => {
            //     console.log('message', message);
            // })

            // this.subscription.on('viewed', (messageIdList) => {
            //     console.log('viewed', messageIdList);
            // })
        })
    },

    on(eventName, handler) {
        if (!this.socket) {
            return;
        }

        this.setCallback(eventName, handler)
    },

    off(eventName) {
        if (!this.socket) {
            return;
        }

        this.setCallback(eventName)
    },

    runCallback(eventName) {
        console.log('run', eventName);

        this.callbackList[ eventName ] && this.callbackList[ eventName ].call();
    },

    setCallback(eventName, handler) {
        if (handler) {
            this.callbackList[ eventName ] = handler;

            if (eventName === 'open' && this.socket) {

                /**
                 * Event open already fired, let's fire the callback
                 */
                this.runCallback('open')
            }
        }
        else {
            delete this.callbackList[ eventName ];
        }
    }
}
