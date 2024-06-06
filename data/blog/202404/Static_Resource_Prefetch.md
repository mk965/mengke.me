---
title: '网站性能优化：如何高效预加载大型静态资源'
date: '2024-04-07'
tags: ['FE', 'Optimization', 'WebWorker']
draft: false
summary: '对于网页中体积较大的静态资源如何进行预加载？在 Chrome 中可以使用 prefetch， 而在 Safari 中可以使用 Worker 新起一个线程进行加载 …'
authors: ['default']
---

import UnsplashPhotoInfo from './UnsplashPhotoInfo.tsx'

![thumbnail-image](/static/images/blog/202404/Static_Resource_Prefetch/michael-lee-nwxwMWXLRpo-unsplash.jpg)

<UnsplashPhotoInfo photoURL="https://unsplash.com/photos/white-cross-and-two-brown-horses-ahead-nwxwMWXLRpo" author="Michael Lee" />

最近正在开发一款类似于养宠物的养成类网页游戏。虽然这个游戏并不是传统意义上的游戏，主要是为了增加用户粘性，让用户在APP中能找到一些新的乐趣。

我曾经也做过类似的游戏，这类网页的一个特点就是有很多非常炫酷的动效，这类动效体积很大。

当遇到大文件时，我们必须进行一些优化。对于这些资源，我希望在需要展示的时候可以不需要等待直接展示。最理想的方法是进行预加载，让浏览器在闲暇时提前去下载这些资源。

因此，今天我们来谈谈前端几种“推测性加载”机制。

## 浏览器推测加载机制

推测加载有多种机制：

- **预取**
    
    涉及在需要渲染文档（或文档的一部分）之前获取渲染文档（或文档的一部分）所需的部分或全部资源，以便在渲染时可以更快地实现渲染。
    
- **预渲染**
    
    更进一步，实际上渲染了准备在需要时显示的内容。根据具体操作方式，这可能会导致从旧页面即时导航到新页面。
    
- **预连接**
    
    涉及通过抢先执行部分或全部连接握手（即 DNS + TCP + TLS）来加速来自给定源的未来加载。
    

### **1. `<link rel=”preconnect”>`：预先建立连接以减少延迟**

允许浏览器在正式发出 HTTP 请求之前预先执行一些操作，如 DNS 解析、TLS 协商和 TCP 握手，从而减少往返延迟并节省用户时间。通过在 HTML 中的 **`<link>`** 标签中添加 rel="preconnect" 属性，可以告知浏览器预先建立与特定域名的连接，提高页面加载速度。Preconnect 技术的运用可以消除很多请求中的往返路径，极大地改善了页面加载性能。

如果一个页面需要与许多第三方域建立连接，将它们全部预连接可能会适得其反。`<link rel="preconnect">` 提示最好只用于最关键的连接。对于其他连接，只需使用 `<link rel="dns-prefetch">`，以节省第一步 DNS 查询的时间。

### **2. `<link rel="dns-prefetch">` ：预先处理 DNS**

当浏览器请求某个**跨域**资源时，需要先将域名解析成 IP地址，然后才可以发出请求，这个过程就是 DNS解析。

浏览器提供一个提示：用户可能需要来自指定资源来源的资源，因此浏览器可以通过抢先执行该来源的 DNS 解析来提高性能。它与 相同，`<link rel="preconnect">`只是它只处理 DNS 部分。

### 3. `<link rel="preload" />`：预加载马上需要用的资源

preload 通常用于指示浏览器在渲染页面之前提前加载某些重要资源，一般用于加载当前页面必要的关键资源。不太常用，因为有可能导致首屏渲染变慢。

大多数现代浏览器会在解析 HTML 文档时开始预加载指定的资源。这意味着浏览器会在主 HTML 文档解析过程中检测到 preload 标签，并尽早开始下载相应的资源，以便在当前页面渲染过程中使用。

 预加载的资源通常与主文档的下载并行进行。这意味着浏览器会尽可能地利用可用的网络连接来同时下载主文档和预加载的资源，以加快整体页面加载速度。

我们也可以对 preload 的优先级进行控制，preload 标签支持使用 **`as`** 属性来指定资源的类型（例如，**`as="style"`**、**`as="script"`** 等）。浏览器可能会根据资源的类型和网页的渲染情况来调整加载的优先级，确保关键资源能够尽快加载。 预加载的触发条件可能因浏览器而异。有些浏览器可能会考虑页面的加载状态和用户行为来触发预加载，以避免在用户可能不需要的情况下浪费带宽和资源。例如，当用户即将点击链接时，浏览器可能会预加载链接指向的页面。

### **4. `<link rel="modulepreload">` 预加载 JavaScript 模块**

向浏览器提供有关*当前页面*上哪些 JavaScript 模块具有高优先级的提示，以便浏览器可以尽早开始下载它们。它是专门用于预加载 js 模块的 “preload”。与 rel=preload 的工作方式基本相同，区别是浏览器不仅会预加载缓存，还会将它直接编译倒内存中的模块映射中。

### **5. `<link rel="prefetch" />`：预取未来可能用到的资源**

prefetch 是预获取的意思，主要用于提前加载未来可能用到的资源，但不一定会在当前页面加载完成后立即使用。

和 preload 预加载的主要区别是加载的时机不同，preload 是在浏览器解析到该标签时即触发加载，而 prefetch 则是在浏览器空闲时再触发加载。

如果你使用 vue 的异步组件，你会发现它也是用 prefetch 实现的。

### **6. `<link rel="prerender" />`：提前渲染整个页面**

⚠️这是一个已经弃用的、非标准的功能，请不要使用。

`<link rel="prerender" href="/next-page"**>**` 在页面中加入这个标签后，就告知浏览器下次导航可能会跳转的页面，浏览器可以提前加载该页面的资源并离屏渲染该页面，以便在跳转到该路由的时候可以直接显示。

这种通过链接 `rel=prerender` 提示进行的旧版预渲染已被弃用，取而代之的是 [NoState Prefetch](https://developer.chrome.com/blog/nostate-prefetch?hl=zh-cn)，后者会提取未来页面所需的资源，但不会完全预渲染页面，也不会执行 JavaScript。NoState 预提取可以通过提高资源加载速度来帮助提高网页性能，但无法像完全预渲染那样提供即时网页加载。

## 怎么做

首先对几种推测性加载方法进行了简要介绍。

如果要处理的是体积较大的动画资源，而且首屏加载不能受到影响，那么"rel=prefetch"无疑是最为合适的解决方案。只需要从接口获取到全部资源列表后，在 `<head>` 中插入 `<link>` 标签即可，具体的加载时机则交给浏览器来判断。

```jsx
const link = document.createElement("link");
link.rel = "prefetch";
link.href = url;
link.onload = () => { /* ... */ };
link.onerror = () => { /* ... */ };
document.head.appendChild(link);
```

不过很遗憾的是，这个连 IE11 都兼容的特性 Safari 并不兼容，这就使得在 Safari 浏览器上这个标签不会起任何作用，资源不会被预加载。

对于 Safari 我们只能另外想其他的办法了，最简单的就是通过请求去加载了。

因为在页面 onload 之后渲染主线程可能并不会空闲，没了浏览器的支持我们怎么才能判断当前的渲染主线程是否空闲？

有一个 `requestIdleCallback` 函数，当主线程空闲时会调用回调方法，从而可以在空闲时做一些操作。不过更加遗憾的是 Safari 目前只在预览版本中支持这一函数，正式版本还不支持。

既然没有办法得知主线程的空闲状态，又不想占用主线程，那么只有一个办法了，通过 Worker 去新起一个函数来专门做加载就可以了：

**worker.js**

```jsx
const loadStatic = async (urls) => {
    const promiseList = [];
    for (const url of urls) {
        const reqPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    resolve(blobUrl);
                } else {
                    console.error("[loadStatic] 请求失败，状态:", response.status);
                    reject({ url, error: response.statusText });
                }
            } catch (error) {
                console.error("[loadStatic] 网络错误:", error);
                reject({ url, error });
            }
        });
        promiseList.push(reqPromise);
    }
    return Promise.allSettled(promiseList);
};

self.onmessage = (e) => {
    const urls = e.data;
    loadStatic(urls)
        .then((data) => {
            postMessage({ status: 'completed', data });
        })
        .catch((error) => {
            console.error(error);
            postMessage({ status: 'error', data: error });
        });
};

```

**main.js**

```jsx
const worker = new Worker('./worker.js');
worker.onmessage = function (event) {
    console.log("收到 worker 返回的内容", event.data);
    event.data.forEach(info => {
	    console.log(info);
	    // 加载成功: { status: 'fulfilled', value: 'blob:xxxxx' }
	    // 加载失败: { status: 'rejected', reason: { url: 'xxxxx', error: 'Not Found' } }
    })
};
worker.onerror = function (e) {
    worker.terminate.();
    console.log("[usePrefetch] error: " + e.message);
};

const urls = [xxx, xxx, xxx];
worker.postMessage(urls);
```

然后加一个判断，当支持 prefetch 时使用 prefetch，不支持时使用 Worker：

```jsx
const supportsPrefetch = document.createElement("link").relList.supports("prefetch");
```

这样就通过不同方式实现了 Chrome 和 Safari 的大文件预加载，结合CDN的缓存策略，能让用户享受到更流畅的使用体验。

（完）