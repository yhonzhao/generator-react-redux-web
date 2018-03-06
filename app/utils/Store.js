/**
 * Created by yhon on 2017/9/10.
 */
export default class Store {
    static urlQuery(query){
        let q = query.substring(1,query.length);
        let result = q.split("&");
        let o = {};
        result.map(
            e=>{
                let item = e.split("=");
                o[item[0]]=item[1]
            }
        )
        return o;
    }
    static get(key) {
        const origin = localStorage.getItem(key);
        const now = new Date();
        if (origin) {
            const value = JSON.parse(origin);
            if (value.expireAt <= 0) {
                return value.data;
            }
            if (now.valueOf() >= value.expireAt) {
                localStorage.removeItem(key);
                return null;
            }
            return value.data;
        }
        return null;
    }

    static set(key, data, expire, expireAt) {
        const now = (new Date()).valueOf();
        let _expireAt = 0;
        let _expire = 0;
        if (expireAt) {
            _expireAt = expireAt.valueOf();
            _expire = _expireAt - now;
        } else {
            _expireAt = expire === 0 ? 0 : now + expire;
            _expire = expire;
        }
        const value = {
            expireAt: _expireAt,
            expire: _expire,
            data
        };
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static getset(key) {
        const origin = localStorage.getItem(key);
        if (origin) {
            const value = JSON.parse(origin);
            if (value.expireAt <= 0) {
                return value.data;
            }
            if ((new Date()).valueOf() >= value.expireAt) {
                localStorage.removeItem(key);
                return null;
            }
            Store.set(key, value.data, value.expire);
            return value.data;
        }
        return null;
    }
}

