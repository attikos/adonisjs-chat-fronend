import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import { isWebpackDev } from '@/utils/is-webpack-dev'

Vue.use(Vuex)

export default () => {
    return new Vuex.Store({
        strict : isWebpackDev,

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
                state.messagesRaw.push( message )
            },

            setAsViewed(state, messageIdList = []) {
                if ( !Array.isArray(messageIdList) ) {
                    console.error('messageIdList is not ARRAY!!!', messageIdList)
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
                const {messages, participants} = await api.getList()

                if (messages && participants) {
                    commit('setMessageList', messages)
                    commit('setParticipantList', participants)
                }
            },

            async logout({commit}) {
                await api.logout()

                commit('setUser', {})
            },

            async checkAuth({commit}) {
                const {success, user} = await api.checkAuth()

                if ( success ) {
                    commit('setUser', user)
                }
            },

            async login({commit}, {email, password}) {
                commit('setError', '')

                const {success, user, errorMessage} = await api.login({email, password})

                if ( success && user.token ) {
                    commit('setUser', user)
                }
                else {
                    errorMessage && commit('setError', errorMessage)
                }
            },

            async register({commit}, {email, password, passwordConfirm}) {
                commit('setError', '')

                const {success, user, errorMessage} = await api.register({email, password, passwordConfirm})

                if ( success && user.token ) {
                    commit('setUser', user)
                }
                else {
                    errorMessage && commit('setError', errorMessage)
                }
            }
        }
    })
}
