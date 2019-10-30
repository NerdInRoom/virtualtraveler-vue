<template>
<div>
    <v-dialog :value="getDialog" width="500" @click:outside="setDialog">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                {{getRoomInfoForChatDetail.roomId}} 번 방
            </v-card-title>

            <v-card-text>
                {{getRoomInfoForChatDetail}}
            </v-card-text>

            <v-btn color="red lighten-2" @click="startChatting(getRoomInfoForChatDetail.roomId)">
                채팅 카즈아
            </v-btn>
            <v-divider></v-divider>

        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {}
    },
    computed: mapGetters([
        'getRoomInfoForChatDetail',
        'getDialog',
    ]),
    methods: {
        setDialog() {
            this.$store.commit('setDialog');
        },
        startChatting(roomId) {
            this.$router.push({
                name: 'travel',
                params: {
                    roomId
                }
            });
        }
    }
}
</script>

<style>

</style>
