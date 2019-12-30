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

export enum ArrowColor {
	DarkGreen = '#09a024',
	LightGreen = '#64ce94',
	YELLOW = '#fde531',
	ORANGE = '#f99a45',
	RED = '#f90e1c',
}

export const PointOptions = {
	mapLevelToColor: (level: number): string => {
		let color = 'aaa';
		switch (level) {
			case 1:
				color = ArrowColor.DarkGreen;
				break;
			case 2:
				color = ArrowColor.LightGreen;
				break;
			case 3:
				color = ArrowColor.YELLOW;
				break;
			case 4:
				color = ArrowColor.ORANGE;
				break;
			case 5:
				color = ArrowColor.RED;
				break;
			default:
				break;
		}
		return color;
	},
};

export const THEME_BLUE = '#1658a3';
