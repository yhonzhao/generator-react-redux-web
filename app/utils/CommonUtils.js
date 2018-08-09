import moment from 'moment'

export function timestampToString(timestamp){
    return new moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
}

export function getCookies() {
    var cookies = {};
    document.cookie.split("; ").map(e => {
      var values = e.split("=");
      var key = values[0];
      var value = '';
      values.map((v, i) => {
        if(i==0)
          return;
        if (i == values.length - 1)
          value = value + v;
        else
          value = value + v + "=";
      })
      cookies = Object.assign({}, {[key]: value}, cookies);
    })
    return cookies;
  }