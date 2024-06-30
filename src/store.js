import { createStore } from 'vuex';

export default createStore({
    state: {
        uemail: '',
        isLoggedIn: false
    },
    mutations: {
        setUserEmail(state, email) {
            state.uemail = email;
        },
        setLoggedIn(state, status) {
            state.isLoggedIn = status;
        }
    }
});