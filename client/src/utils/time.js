export default {
    getDate(timestamp) {
        const date = new Date(timestamp);
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const current = {
            date: `${date.getMonth()}월 ${date.getDate()}일 ${week[date.getDay()]}요일`,
            time: `${date.getHours()} : ${date.getMinutes()}`,
            detailTime: `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
        };
        return current;
    },
};