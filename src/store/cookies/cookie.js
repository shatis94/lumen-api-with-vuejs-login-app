
const setCookie = (name, value, day = 1) => {
    let date = new Date();
    const cExpires = date.setTime(date.getTime() + ((24 * 60 * 60 * 1000) * day) );
    document.cookie = `${name} = ${value}; expires = ${cExpires}; path=/`;
}

const getCookie =  (name) => {
    let cookieFound = null;
    if (document.cookie.length === 0) return null;
    const cookies = document.cookie.split(";");
    if (cookies.length) {
        for (let x=0; x< cookies.length; x++) {
            const cookie = cookies[x].split("=");
            if (cookie[0].toString() === name.toString()) cookieFound = cookie[1];
        }
    }
    return cookieFound;  
}

export default {
    setCookie,
    getCookie
}