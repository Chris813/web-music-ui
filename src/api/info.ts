import request from "@/utils/request";

export function getBannerApi() {
  return request({
    url: "/banner",
    method: "get",
  });
}
