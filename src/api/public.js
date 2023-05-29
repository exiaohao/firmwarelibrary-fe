import request from '@/utils/request'


export function firmwareQueryByKeyword(q) {
    return request({
        url: "/query/search",
        method: 'post',
        data: q,
    })
}

export function firmwareQueryByModelID(id) {
    return request({
        url: `/query/model/` + id,
        method: 'get',
    })
}
