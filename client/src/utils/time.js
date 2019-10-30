export const time = {
    getNow() {
        const now = new Date();
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const current = {
            date: `${now.getMonth()}월 ${now.getDate()}일 ${week[now.getDay()]}요일`,
            time: `${now.getHours()} : ${now.getMinutes()}`,
            detailTime: `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`
        };
        return current;
    },
    // fetch() {
    //     const arr = [];
    //     if (sessionStorage.length > 0) {
    //         for (let i = 0; i < sessionStorage.length; ++i) {
    //             arr.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    //         }
    //     }
    //     return arr;
    // },
};