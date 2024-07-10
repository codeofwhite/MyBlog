import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // 持久化

export default createStore({
    state: {
        user_email: '',
        isLoggedIn: false,
        user_type: 0
    },
    mutations: {
        setUserEmail(state, email) {
            state.uemail = email;
        },
        setLoggedIn(state, status) {
            state.isLoggedIn = status;
        },
        setUserType(state, utype){
            state.user_type = utype;
            console.log(state.user_type)
        }
    },
    plugins: [createPersistedState()]
});