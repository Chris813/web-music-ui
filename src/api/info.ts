import request from "@/utils/request";

export function getBanner() {
  return request({
    url: "/banner",
    method: "get",
  });
}
