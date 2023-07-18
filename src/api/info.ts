import request from "@/utils/request";

export function getBannerApi() {
  return request({
    url: "/banner",
    method: "get",
  });
}

export function getPlaylistApi(limitNumber: number) {
  return request({
    url: "/personalized",
    method: "get",
    params: {
      limit: limitNumber,
    },
  });
}

export function getPlaylistDetailApi(pid: number) {
  return request({
    url: "/playlist/detail",
    params: {
      id: pid,
    },
  });
}

export function getSongUrlApi(sid: number, level: string = "standard") {
  return request({
    url: "/song/url/v1",
    params: {
      id: sid,
      level: level,
    },
  });
}

export function getAllSongApi(pid: number, limit: number = 20) {
  return request({
    url: "/playlist/track/all",
    params: {
      id: pid,
      limit: limit,
      offset: 1,
    },
  });
}

export function getSearchDataApi(
  keyword: string,
  type: number = 1,
  limit: number = 30,
  offset: number = 0
) {
  return request({
    url: "/cloudsearch",
    params: {
      keywords: keyword,
      type: type,
      limit: limit,
      offset: offset,
    },
  });
}

export function getZuixinMvApi(limit=10){
  return request({
    url:'/mv/first',
    params:{
      limit:limit,
    }
  })
}

export function getPaihangMvApi(limit=10){
  return request({
    url:'/top/mv',
    params:{
      limit:limit,
    }
  })
}

export function getDujiaMvApi(limit=16){
  return request({
    url:'/mv/exclusive/rcmd',
    params:{
      limit:limit,
    }
  })
}

export function getAllMvApi(area="全部",order="上升最快",limit=16){
  return request({
    url:'/mv/all',
    params:{
      area:area,
      order:order,
      limit:limit,
    }
})
}