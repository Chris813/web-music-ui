# 模板技术栈

Vite Vue3 vue-router4 pinia2 typescript template

ui:element-plus@2.3.3
图标：@element-plus/icons-vue@2.1.0

# 项目描述

仿网易云音乐 HD 版网页音乐播放器

## 项目难点

音乐播放组件

# 问题

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

### 嵌套子路由

在 tracks.vue 组件内根据`route.params.id`获取歌单歌曲.

## 未解决 bug
