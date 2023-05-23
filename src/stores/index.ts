import { SongTableItem } from "@/utils/types";
import { defineStore } from "pinia";

export const useSongStore = defineStore("config", {
  state: () => {
    return {
      // baseURL: "https://netease-cloud-music-api-eta-lovat.vercel.app/",
      songId: 0,
      songList: [] as SongTableItem[],
      currentSongList: [] as SongTableItem[],
      searchSongList: [] as SongTableItem[],
    };
  },
});
