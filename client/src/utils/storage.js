export default {
    fetchLoginState() {
        const loginState = sessionStorage.getItem('loginState');
        if(loginState === 'true') return true;
        else return false;
    },
    fetchLoginUser() {
        return JSON.parse(sessionStorage.getItem('loginUser'));
    },
    login(loginUser) {
        sessionStorage.setItem('loginUser', JSON.stringify(loginUser));
		sessionStorage.setItem('loginState', true);
    },
    logout() {
        sessionStorage.setItem('loginUser', null);
		sessionStorage.setItem('loginState', false);
    },
    clear() {
        if(sessionStorage.length > 0) {
            for(let i = 0 ; i < sessionStorage.length ; ++i){
                const name = sessionStorage.key(i);
                if(name === 'loginUser' || name === 'loginState') continue;
                sessionStorage.removeItem(name);
            }
        }
    }
};