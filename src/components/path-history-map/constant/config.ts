export const MapOptions = {
	//设置地图的显示样式
	style: 'amap://styles/macaron',
	// 初识倍数
	zoom: 5,
	// 中心
	center: new AMap.LngLat(105, 35),

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

export const PointOptions = {
	mapLevelToColor: (level: number): string => {
		let color = 'aaa';
		switch (level) {
			case 1:
				color = '#68981a';
				break;
			case 2:
				color = '#64ce94';
				break;
			case 3:
				color = '#fefc76';
				break;
			case 4:
				color = '#f99a45';
				break;
			case 5:
				color = '#f90e1c';
				break;
			default:
				break;
		}
		return color;
	},
};

export const THEME_BLUE = '#1658a3';
