<template>
    <div class="auth">
        <div class="auth__header-wrapper header-container">
            <div class="header-title">
                <p class="auth__header-text header-title-text">Auth</p>

                <div class="auth__tabs">
                    <button
                        class="auth__tab"
                        :class="{ active: activeTab === 'login' }"
                        @click="activeTab = 'login'"
                    >
                        Login
                    </button>

                    <button
                        class="auth__tab"
                        :class="{ active: activeTab === 'register' }"
                        @click="activeTab = 'register'"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>

        <div v-if="activeTab === 'login'">
            <h2>Login</h2>

            <form class="auth__form" @submit.prevent="submitLogin">
                <input
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    class="input auth__input"
                >
                <span class="input-animation"></span>

                <input
                    v-model="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    class="input auth__input"
                >
                <span class="input-animation"></span>

                <p v-if="error" class="auth__error">{{error}}</p>

                <button type="submit" class="auth__btn-submit btn-submit">Submit</button>
            </form>
        </div>

        <div v-if="activeTab === 'register'">
            <h2>Register</h2>

            <form class="auth__form" @submit.prevent="submitRegister">
                <input
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    class="input auth__input"
                >
                <span class="input-animation"></span>

                <input
                    v-model="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    class="input auth__input"
                >
                <span class="input-animation"></span>

                <input
                    v-model="passwordConfirm"
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm password"
                    class="input auth__input"
                >
                <span class="input-animation"></span>

                <p v-if="error" class="auth__error">{{error}}</p>

                <button type="submit" class="auth__btn-submit btn-submit">Submit</button>
            </form>
        </div>

        <div class="auth__bg">
            <span class="auth__bg-left">⊕</span>
            <span class="auth__bg-right">⊕</span>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {axios, setToken, clearToken} from '@/api/axios'

export default {
    name : 'auth',

    data() {
        return {
            email           : '',
            password        : '',
            passwordConfirm : '',
            activeTab       : 'login',
            error           : '',
        }
    },

    computed: {
        ...mapGetters([
            'isAuth',
        ]),
    },

    watch : {
        activeTab() {
            this.error = ''
        },
    },

    created () {
        this.checkAuth();
    },

    methods : {
        ...mapMutations([
            'setUser',
        ]),

        async checkAuth() {
            let res

            try {
                res = await axios.post('/check');
            } catch (error) {
                return console.log(error)
            }

            let {success, user, errorMessage} = res?.data || {};

            if ( success ) {
                return this.setUser(user)
            }
        },

        async submitLogin() {
            this.error = ''

            try {
                const res = await axios.post('/login', {
                    email    : this.email,
                    password : this.password
                })

                let {success, user, errorMessage} = res?.data || {};

                if ( success && user.token ) {
                    setToken(user.token)
                    this.setUser(user)
                }
                else {
                    if ( errorMessage ) {
                        this.error = errorMessage
                    }
                }
            } catch (error) {
                return console.log(error)
            }
        },

        async submitRegister() {
            this.error = ''

            try {
                const res = await axios.post('/register', {
                    email    : this.email,
                    password : this.password
                })

                let {success, user, errorMessage} = res?.data || {};

                if ( success && user.token ) {
                    setToken(user.token)
                    this.setUser(user)
                }
                else {
                    if ( errorMessage ) {
                        this.error = errorMessage
                    }
                }
            } catch (error) {
                return console.log(error)
            }
        },
    },
}
</script>

<style lang="scss">
.auth {
    position: relative;
    width: 300px;
    border-radius: 4px;
    box-shadow: 0 5px 8px #8b8b8b;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid #9d9d9d;
    padding-bottom: 20px;

    &__header-wrapper {
        background: #086CA2;
    }

    &__header-text {
        color: #fff;
        font-weight: 500;
    }

    &__tabs {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #ccc;
    }

    &__tab {
        cursor: pointer;
        flex-grow: 1;
        background: #fff;
        border: none;
        border-bottom: 4px solid #fff;
        height: 40px;
        font-size: 14px;
        line-height: 20px;
        color: #003c77;
        outline: none;
        transition: 0.3s;
        width: 40%;
        border-right: 1px solid #cccccc;

        &:hover {
            border-bottom-color: #b4cad6;
        }

        &.active {
            border-bottom-color: #086CA2;
        }
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__input {
        width: 50%;
    }

    &__btn-submit {
        width: calc(50% + 26px);
    }

    .header-title-text {
        margin: 0;
        line-height: 45px;
    }

    &__error {
        color: #d30303;
        font-size: 14px;
        margin: 0 0 12px;
    }

    &__bg {
        color: #5e5e5e;
        cursor: default;
    }

    &__bg-left {
        position: absolute;
        bottom: 6px;
        left: 6px;
        transform: rotate(35deg);
        display: inline-block;
        width: 10px;
        height: 10px;
        line-height: 10px;
        text-align: center;
        border-radius: 50%;
    }

    &__bg-right {
        position: absolute;
        bottom: 6px;
        right: 6px;
        transform: rotate(-40deg);
        display: inline-block;
        width: 10px;
        height: 10px;
        line-height: 10px;
        text-align: center;
        border-radius: 50%;
    }
}
</style>
