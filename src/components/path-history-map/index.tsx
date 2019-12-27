import React, { useRef, useEffect } from 'react';
import axios from 'axios';

import { MapOptions } from './constant/config';
import initFenceCustomLayer, {
	changeLayerDisplayData,
} from './fence-custom-layer';
import { LongTermActiveFence } from './constant/mock-data';

function initMap(mapEl: React.MutableRefObject<HTMLDivElement>): AMap.Map {
	const map = new AMap.Map(mapEl.current, {
		zoom: MapOptions.zoom,
		center: MapOptions.center,
		mapStyle: MapOptions.style,
		resizeEnable: true,
		touchZoom: true,
		scrollWheel: true,
		doubleClickZoom: true,
		zoomEnable: true,
		dragEnable: true,
	});
	// //缩放工具
	// AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.RangingTool'], () => {
	// 	map.addControl(new AMap.ToolBar({ direction: true }));
	// 	map.addControl(new AMap.Scale({ position: 'LB' }));
	// });
	return map;
}

export default function Container(): JSX.Element {
	const mapEl: React.MutableRefObject<HTMLDivElement> = useRef(
		document.createElement('div'),
	);

	useEffect(() => {
		const map = initMap(mapEl);
		initFenceCustomLayer(map);
	}, []);
	useEffect(() => {
		// const selectedCityMock = '浙江省';
		const longTermActiveFence = LongTermActiveFence;
		axios
			.get('https://a.amap.com/amap-ui/static/data/prov-borders.json')
			.then(res => {
				changeLayerDisplayData(res.data, longTermActiveFence);
			});
	}, []);

	return <div ref={mapEl} style={{ height: 700, width: '100%' }} />;
}
