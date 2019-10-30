import name from './nicknamedata.js'

export default {
    randomizeName() {
        const name1 = name.adjective[Math.floor(Math.random() * name.adjective.length)]
        const name2 = name.noun[Math.floor(Math.random() * name.noun.length)]
        const randomNickname = name1 + " " + name2
        console.log(randomNickname)
        return randomNickname
    }
}