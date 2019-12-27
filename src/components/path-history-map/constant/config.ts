export const MapOptions = {
	//设置地图的显示样式
	style: 'amap://styles/macaron',
	// 初识倍数
	zoom: 12,
	// 中心
	center: new AMap.LngLat(120.15, 30.28),

	ZOOM_MAX: 20,
};

export const FenceCustomLayerOptions = {
	// 省份描边颜色
	provStrokeColor: 'black',

	// 选择城市填充颜色
	selectedCityFillColor: 'rgba(255, 69, 0, 0.2)',

	// 长期活动范围描边颜色
	longTermActiveFenceStrokeColor: '#E040FB',

	// 省份描边线条粗细
	getLineWidth: (mapZoom: number): number => {
		const maxLineWidth = 5;
		return (mapZoom / MapOptions.ZOOM_MAX) * maxLineWidth;
	},
};
