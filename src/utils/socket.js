import Ws from '@adonisjs/websocket-client'

const env = require(`../../env/${ process.env.NODE_ENV }.env`)

export const socket = {

    /**
     * Connect and sunscribe to chat
     */
    connect() {
        return new Promise( async (resolve, reject) => {
            this.socket = this.socket || await Ws(env.API_URL_WEBSOCKET).connect()

            this.socket.on('close', () => {
                this.isConnected = false
                console.log('close')
            })

            this.socket.on('open', async () => {
                this.isConnected = true
                console.log('connected')

                await this.subscribe()
                resolve()
            })

            this.socket.on('error', () => {
                reject()
                console.log('disconnected')
            })
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
     * You can subscribe to event:
     * ready, error, close, message, viewed
     *
     * @return {Promise}
     */
    async subscribe() {
        return new Promise( async (resolve, reject) => {
            this.subscription = this.subscription || await this.socket.subscribe('chat')

            this.subscription.on('ready', () => {
                console.log('ready')
                resolve()
            })

            this.subscription.on('error', (e) => {
                console.log('error', e)
                reject()
            })

            this.subscription.on('close', (e) => {
                console.log('close', e)
            })

            this.subscription.on('message', (message) => {
                console.log('message', message);
            })

            this.subscription.on('viewed', (messageIdList) => {
                console.log('viewed', messageIdList);
            })
        })
    },
}
