<template>
<div>
    <v-list >
        <v-subheader>CHATTING ROOM LIST</v-subheader>
        <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(chat, i) in chattingList" :key="i">
                <v-list-item-content @click="setRoomId(chat.roomId)"> 
                    <v-list-item-title>방번호 : {{chat.roomId}}</v-list-item-title>
                    <v-list-item-title>방타이틀 : {{chat.roomId}}</v-list-item-title>
                    <v-list-item-title>방장 : {{chat.roomOwnerId}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
    <chattingDetail></chattingDetail>
</div>
</template>

<script>
import chattingDetail from './ChattingDetail.vue'
export default {
    components : {
        chattingDetail:chattingDetail
    },
    data() {
        return {
            chattingList: [],
            item: 1,
        }
    },
    mounted() {
        this.chattingList = this.$store.getters.getRoomList;
    },
    methods: {
        setRoomId(roomId) {
            const roomInfo = this.$store.getters.getRoomInfo(Number(roomId));
            this.$store.commit('setRoomInfoForChatDetail', roomInfo);
            this.$store.commit('setDialog');
        }
    }
}
</script>

<style>
h3 {
    margin-top: 0;
}

.badge {
    background-color: #777;
}

.tabs-left {
    margin-top: 3rem;
}

.tab-content {
    margin-left: 45px;

}

.tab-content .tab-pane {
    display: none;
    background-color: #fff;
    padding: 1.6rem;
    overflow-y: auto;
}

.tab-content .active {
    display: block;
}

.list-group {
    width: 100%;

}

.list-group .list-group-item {
    height: 50px;

}

.list-group .list-group-item h4,
span {
    line-height: 11px;
}
</style>
