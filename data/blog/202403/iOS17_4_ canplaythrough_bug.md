---
title: ' iOS 17.4 HTMLAudioElement 中 canplaythrough、loadeddata 等事件不触发的 bug'
date: '2024-03-19'
tags: ['FE', 'iOS']
draft: true
summary: '更新到 iOS 17.4 后，HTMLAudioElement 事件中 canplaythrough、loadeddata 等事件不会被触发 ...'
authors: ['default']
---

前一段时间 Apple 推送了 iOS 17.4，更新后，`HTMLAudioElement` 事件中 `canplaythrough`、`loadeddata` 等事件不会被触发，在项目中无法监听到相关事件，导致出现特效视频无法播放等错误。

对于此问题临时替换为监听 `loadedmetadata` 事件，`loadedmetadata` 事件在元数据（metadata）被加载完成后触发。

相关问题：

https://forums.developer.apple.com/forums/thread/748001

https://github.com/goldfire/howler.js/issues/1711