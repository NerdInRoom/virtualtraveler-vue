export default {
	fetchSelectedChatRoom() {
		const selectedChatRoom = sessionStorage.getItem('selectedChatRoom');
		return JSON.parse(selectedChatRoom);
	},
    fetchLoginState() {
        const loginState = sessionStorage.getItem('loginState');
        if(loginState === 'true') return true;
        else return false;
    },
    fetchLoginUser() {
        return JSON.parse(sessionStorage.getItem('loginUser'));
	},
	joinChatRoom(selectedChatRoom) {
		sessionStorage.setItem('selectedChatRoom', JSON.stringify(selectedChatRoom));
	},
	outChatRoom(){
		const selectedChatRoom = {
			title: '',
			host:{
				nickname: ''
			}
		};
		sessionStorage.setItem('selectedChatRoom', JSON.stringify(selectedChatRoom));
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
                if(name === 'loginUser' || name === 'loginState' || name === 'selectedChatRoom') continue;
                sessionStorage.removeItem(name);
            }
        }
    }
};