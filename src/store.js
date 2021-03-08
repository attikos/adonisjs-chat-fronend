import Vue from 'vue'
import Vuex from 'vuex'
import {axios, setToken, clearToken} from '@/api/axios'
import {websocket} from '@/api/socket'

Vue.use(Vuex)

export default () => {
    return new Vuex.Store({
        state: {
            user            : false,
            messagesRaw     : [],
            participantsRaw : [],
            error           : '',
        },

        mutations: {
            setError(state, error = '') {
                state.error = error
            },

            setUser(state, user) {
                state.user = user
            },

            addMessage(state, message) {
                console.log('addMessage', message);

                state.messagesRaw.push( message )
            },

            setAsViewed(state, messageIdList = []) {
                console.log('messageIdList', messageIdList)

                if ( !Array.isArray(messageIdList) ) {
                    console.log('messageIdList is not ARRAY!!!', messageIdList)
                    return
                }

                messageIdList.forEach( messageId => {
                    const messageIndex = state.messagesRaw.findIndex( x => x.id === messageId )
                    const message = state.messagesRaw[ messageIndex ]

                    if ( messageIndex !== -1 ) {
                        message.viewed = true

                        state.messagesRaw.splice(messageIndex, 1, message)
                    }
                } )
            },

            setMessageList(state, list) {
                state.messagesRaw = [ ...list ]
            },

            setParticipant(state, user) {
                const newList = [ ...state.participantsRaw ]
                newList.push(user)
                state.participantsRaw = Array.from( new Set( newList ) )
            },

            setParticipantList(state, userList) {
                state.participantsRaw = [ ...userList ]
            },
        },

        getters: {
            isAuth(state) {
                return Boolean(state?.user.id)
            },

            participants(state) {
                const userName = state?.user.name

                return state.participantsRaw.filter(x => x.name !== userName)
            },

            messages(state) {
                return [ ...state.messagesRaw ].map( x => {
                    x.timestamp     = x.created_at
                    x.participantId = x.user_id || x.participantId
                    delete x.user_id

                    return x
                })
            },
        },

        actions : {
            async fetchMessages({commit}) {
                let res

                try {
                    res = await axios.post('/list')
                } catch (error) {
                    return console.log(error)
                }

                let {messages, participants} = res?.data || {}

                if (messages && participants) {
                    commit('setMessageList', messages)
                    commit('setParticipantList', participants)
                }
            },

            async logout({commit}) {
                try {
                    await axios.post('/logout')
                } catch (error) {
                    return console.log(error)
                }

                websocket.close()
                clearToken()
                commit('setUser', {})
            },

            async checkAuth({commit}) {
                let res

                try {
                    res = await axios.post('/check');
                } catch (error) {
                    return console.log(error)
                }

                let {success, user} = res?.data || {};

                if ( success ) {
                    commit('setUser', user)
                }
            },

            async submitLogin({commit}, {email, password}) {
                commit('setError', '')

                try {
                    const res = await axios.post('/login', {email, password})

                    let {success, user, errorMessage} = res?.data || {};

                    if ( success && user.token ) {
                        setToken(user.token)
                        commit('setUser', user)
                    }
                    else {
                        errorMessage && commit('setError', errorMessage)
                    }
                } catch (error) {
                    return console.log(error)
                }
            },

            async submitRegister({commit}, {email, password, passwordConfirm}) {
                commit('setError', '')

                try {
                    const res = await axios.post('/register', {email, password, passwordConfirm})

                    let {success, user, errorMessage} = res?.data || {};

                    if ( success && user.token ) {
                        setToken(user.token)
                        commit('setUser', user)
                    }
                    else {
                        errorMessage && commit('setError', errorMessage)
                    }
                } catch (error) {
                    return console.log(error)
                }
            }
        }
    })
}
