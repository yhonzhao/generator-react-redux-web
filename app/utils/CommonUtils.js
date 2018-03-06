import moment from 'moment'

export function timestampToString(timestamp){
    return new moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
}