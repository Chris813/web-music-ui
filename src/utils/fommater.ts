export function formatDate(time: any): string {
  let date = new Date(time);

  let YY = date.getFullYear();
  let MM =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  // 这里修改返回时间的格式
  return YY + "-" + MM + "-" + DD;
}
export function formatCount(count: number): string {
  if (count > 9999) {
    return (count / 10000).toFixed(1) + "万";
  } else {
    return count.toString();
  }
}

export function formatDuration(duration: number): string {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor(duration / 1000 / 60);
  return `${minutes}分${seconds}秒`;
}
