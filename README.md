# 模板技术栈

Vite Vue3 vue-router4 pinia2 typescript template

ui:element-plus@2.3.3
图标：@element-plus/icons-vue@2.1.0

# 项目描述

仿网易云音乐 HD 版网页音乐播放器

## 项目难点

音乐播放组件

组件通信：

- 亲子组件异步传值
- 非亲子组件传值

## 项目功能

- 歌单详情
  - [x] 展示歌曲列表
  - [ ] 收藏/下载歌曲
- 音乐播放组件
  - [x] 点击歌曲后播放音乐
  - [x] 进度条
  - [x] 播放/暂停
  - [x] 点击进度条控制音乐播放
  - [x] 查看当前播放列表
  - [x] 上一首/下一首
  - [x] 调节音量
- [ ] 搜索

# 问题

现在是将当前歌单列表放在 eventbus 里的，可以实现功能，但有一点问题，感觉放在 store 里更好

## 已解决

### 触发音乐播放组件

非父子组件通信：参考：https://stackoverflow.com/questions/63471824/vue-js-3-event-bus

音乐音乐播放组件固定在 app.vue 中，而触发音乐播放组件的音乐列表可能在任何地方，存在非父子组件的通信。我们定义一个全局事件库。简单来说就是用一个 Map 存放触发的事件名和要传递的参数：

```typescript
import { ref } from "vue";
const bus = ref(new Map());

export function useEventsBus() {
  function emit(event: string, ...args: any[]) {
    bus.value.set(event, args);
  }

  return {
    emit,
    bus,
  };
}
```

在组件 A 中注册及触发事件：

```typescript
emit("playSong", currentRow.value);
```

在组件 B 中接收事件：

```typescript
const { bus } = useEventsBus();
watch(
  () => bus.value.get("playSong"),
  (val) => {
    song.value = val[0];
    getSongUrl(song.value.id);
  }
);
```

### 歌曲列表显示的数据获取

目前通过 props 实现，但感觉用 store 会更好

### 嵌套子路由

**在 tracks.vue 组件内根据`route.params.id`获取歌单歌曲.** 这是之前的解决方法

也可以通过子组件处理亲组件异步传值的

### 音乐对象方法

使用`new Audio()`创建音频实例对象

- play(): 播放音频。
- pause(): 暂停音频播放。
- load(): 重新加载音频。
- canPlayType(type): 检查浏览器是否支持指定的音频类型，type 参数是音频类型的 MIME 类型，例如 "audio/mp3"。
- addEventListener(event, listener): 添加事件监听器来处理音频播放过程中的不同事件，常见的事件有 "play"、"pause"、"ended" 等。
- removeEventListener(event, listener): 移除先前添加的事件监听器。
- currentTime: 获取或设置当前音频播放的时间位置（以秒为单位）。
- duration: 获取音频的总时长（以秒为单位）。
- volume: 获取或设置音频的音量，范围是 0.0（静音）到 1.0（最大音量）。

## 未解决 bug
