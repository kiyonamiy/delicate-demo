import React, { useRef, useEffect } from 'react';
import { initCustomLayer } from './custom-layer';
import { MapOptions } from './constant/config';
import { MockData } from './constant/mock-data';
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
	//缩放工具
	map.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.RangingTool'], () => {
		map.addControl(new AMap.ToolBar({ direction: true }));
		map.addControl(new AMap.Scale({ position: 'LB' }));
	});
	return map;
}

export default function Container(): JSX.Element {
	const siteList = MockData;
	const mapEl: React.MutableRefObject<HTMLDivElement> = useRef(
		document.createElement('div'),
	);

	useEffect(() => {
		const map = initMap(mapEl);
		initCustomLayer(map, siteList);
	}, []);

	return <div ref={mapEl} style={{ height: 700, width: '100%' }} />;
}
