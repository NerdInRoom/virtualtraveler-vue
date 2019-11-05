export default {
	fetchOnlineChatRoom() {
		const onlineChatRoom = sessionStorage.getItem('onlineChatRoom');
		if(onlineChatRoom){
			return JSON.parse(onlineChatRoom);
		} else {
			return null;
		}
	},
	join(chatRoom) {
		sessionStorage.setItem('onlineChatRoom', JSON.stringify(chatRoom));
	},
	disJoin() {
		sessionStorage.setItem('onlineChatRoom', null);
	},
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
                if(name === 'loginUser' || name === 'loginState' || name === 'selectedId') continue;
                sessionStorage.removeItem(name);
            }
        }
    }
};