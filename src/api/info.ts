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
