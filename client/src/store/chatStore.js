export const chatStore = {
    state: {
        chat: "chat",
		roomList: [
			{
			  roomId: 1,
			  roomGPS: {
				latitude: 37.501307,
				longitude: 127.03966
			  },
			  roomOwnerId: 123
			},
			{
			  roomId: 2,
			  roomGPS: {
				latitude: 35.92807,
				longitude: 126.961661
			  },
			  roomOwnerId: 456
			}
		  ]
    },
    mutations: {
        setRoomLocation (state, changedInfo) {
			state.roomList.forEach((room, index) => {
				if (room.roomId === changedInfo.roomId) {
					state.roomList[index].roomGPS.latitude = changedInfo.latitude
					state.roomList[index].roomGPS.longitude = changedInfo.longitude
				}
			})
		  }
    },
    actions: {
        async getRoomInfo ({ state }, id) {
			let roomInfo = state.roomList.find((room) => room.roomId === id);
			return roomInfo;
		}
    },
    modules: {}
}