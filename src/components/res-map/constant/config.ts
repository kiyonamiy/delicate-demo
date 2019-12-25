export const MapOptions = {
	//设置地图的显示样式
	style: 'amap://styles/whitesmoke',
	// 初识倍数
	zoom: 12,
	// 中心
	center: new AMap.LngLat(120.15, 30.28),
};

export const MoveLineOptions = {
	// 线条类型 solid、dashed、dotted
	lineType: 'solid',
	// 线条宽度
	lineWidth: 1,
	// 线条颜色
	dispatchLineColor: '#0C47BF',
	saleLineColor: '#FF7C6A',
	// 移动点最大半径
	moveRadius: 3,
	// 移动点颜色
	fillColor: 'black',
	// fillColor: 'black',
	// 移动点阴影颜色
	shadowColor: 'red',
	// shadowColor: 'red',
	// 移动点阴影大小
	shadowBlur: 5,

	// 判断是否点击”线“的误差范围
	inPathRadius: 5,

	// 线上数字偏移
	lineCountYOffset: 10,

	// 限定显示路径 Zoom
	minZoom: 10,
};

export const SiteMarkerOptions = {
	// site 颜色
	commonWarehouseColor: '#f8d859',
	centralWarehouseColor: '#fb746d',
	supermarketColor: '#19caad',

	// 底圆
	radius: 15,
	// 底圆阴影
	shadowColor: '#aaa',
	shadowOffsetX: 2,
	shadowOffsetY: 2,
	shadowBlur: 5,

	// 圆上数字
	countColor: '#fff',

	// 泛波纹动画
	ringLineWidth: 2,
	ringRadiusIncrement: 0.2,
	ringInitArray: [15, 25, 35],
	ringMinRadius: 15,
	ringMaxRadius: 35,
	magnifiedRadius: 20,
};
