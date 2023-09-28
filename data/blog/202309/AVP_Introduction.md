---
title: 'AVP - Web 端特效视频播放器'
date: '2023-09-28'
tags: ['Open Source', 'AVP', 'Effects Video', 'WebGL', 'Canvas']
draft: false
summary: '在 Web 端实现特效视频播放功能，使用 WebGL 和 Canvas 实现视频播放和特效渲染。'
authors: ['default']
---

import AvpDemo from './avpDemo'

## 演示

<AvpDemo />

## 为什么叫 AVP ？

AVP 的全称为：Alpha Video Player，取首字母为 AVP。

## 什么是 Alpha Video？

Alpha Video通常用于直播礼物特效。

一般情况下，Alpha Video是指在视频中使用了透明通道信息的特效。其中，一侧为黑色背景，另一侧为黑色背景白色内容的视频，而黑白视频代表了透明通道的信息。由于视频本身不支持透明度，所以采用了黑色背景来表示透明，黑白视频则表示了透明和不透明的部分。

像这样：

![demo](/static/images/blog/202309/AVP_Introduction/demo.jpeg)

## 原理

将同名通道信息提取出来后与原视频进行融合计算，将计算结果绘制到 Canvas 中。

## 效果

目前已在公司内部使用，效果还不错。活动数据有较大提升，详细数据还在统计中，后续会更新到本篇博文中。