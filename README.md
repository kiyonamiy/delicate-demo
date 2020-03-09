# Delicate Demo

平时实际项目中或者学习中偶尔脑热做出的组件。

## 项目所涉及到的技术

1. `React` 全家桶
2. 全面拥抱 `TypeScript` 和 `React Hooks`
3. 高德地图
4. `Canvas` 画图
5. `styled-component` 等第三方库的使用

## 项目使用

```
git clone https://github.com/KiyonamiYu/delicate-demo.git
cd delicate-demo
yarn
yarn start
```

## 1. Unity 3D 坐标变化

阅读 Unity Shader 入门精要的第四章，生涩的数学理论实在没有感觉，所以使用`TypeScript + Canvas`来将理论实践。线性代数强行捡起。

基本的过程是: 模型空间->世界空间->观察空间->裁剪空间->屏幕空间。跳过了其中部分的过程，通过矩阵变换完成了 3D 坐标到 2D 坐标的转换，达到游戏的肉眼 3D 效果。

![u3d坐标变换](https://raw.githubusercontent.com/514723273/.md-Pictures/master/u3d坐标变换.gif)

## 2. 评价等级条

在实际项目中，该组件用于显示商家的等级和积分。

组件内部高度结偶，自适应，需传递两个参数---积分分级条（`lvScoreList`）和当前积分（`nowScore`），会根据参数动态分级显示：

```js
<RateBar nowScore={80} lvScoreList={[0, 40, 60, 75, 85, 100]} />
```

![rate-bar](https://raw.githubusercontent.com/514723273/.md-Pictures/master/rate-bar.gif)

## 3. 资源分布地图

[@Hedy Hu](https://github.com/Mihuuu) 合作

使用高德地图的自定义图层接口，结合 Canvas 画图，达到地图自定义的目的：

1. 仓库之间使用贝塞尔曲线连接，定制线上数据显示；
2. 使用单向拖尾发光轨迹表示工单移动方向；
3. 增加各个事物的鼠标悬浮泛波动画；

![资源分布地图事例](https://raw.githubusercontent.com/514723273/.md-Pictures/master/资源分布地图事例.gif)

## 4. 历史路径地图

[@Hedy Hu](https://github.com/Mihuuu) 合作

1. 主要展示车辆的历史路径轨迹，停留时间；点击后，轮播显示地点信息；
2. 常停留区域围栏描边；
3. 地图省份描边；
4. 选中区域高亮；

![历史路径地图.png](https://raw.githubusercontent.com/514723273/.md-Pictures/master/历史路径地图.png)

## [5. 事件日历组件](https://github.com/KiyonamiYu/daily-ledger-frontend)

> 该项目暂停施工！有了一些其他想法！费点心思的小组件还是想展示一下的 (๑•́ωก̀๑)

🕓 时间账本：记录点滴，沉迷数据 :)

为了易于扩展功能，定制化事件日历组件。

1. 展示每月所发生的事件
2. 点击左上角左右箭头，可切换月份显示

![daily-ledger-v000101](https://raw.githubusercontent.com/514723273/.md-Pictures/master/daily-ledger-v000101.png)

## 5. 相关性力导向图

> 该组件还未抽离迁移！占位！

![correlation-graph.png](https://raw.githubusercontent.com/514723273/.md-Pictures/master/correlation-graph.png)
