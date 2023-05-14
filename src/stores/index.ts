import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => {
    return {
      // baseURL: "https://netease-cloud-music-api-eta-lovat.vercel.app/",
      songId: 0,
    };
  },
});
