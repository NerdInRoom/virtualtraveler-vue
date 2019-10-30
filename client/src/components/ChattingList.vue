<template>
<div>
    <v-list flat>
        <v-subheader>CHATTING ROOM LIST</v-subheader>
        <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(chat, i) in chattingList" :key="i">
                <v-list-item-content>
                    <v-list-item-title>방번호 : {{chat.roomId}}</v-list-item-title>
                    <v-list-item-title>방타이틀 : {{chat.roomId}}</v-list-item-title>
                    <v-list-item-title>방장 : {{chat.roomOwnerId}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</div>
</template>

<script>
export default {
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
        chattingDetail(roomId) {
            vue.$store.commit('setRoomLocation', {
                roomId: Number(roomId),
                latitude: position.Ha,
                longitude: position.Ga
            });
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
