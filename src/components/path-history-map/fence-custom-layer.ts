import Prov from './interface/prov';
import { FenceCustomLayerOptions } from './constant/config';

let map: AMap.Map;
let canvas: HTMLCanvasElement;
let canvasCtx: CanvasRenderingContext2D;
let fenceCustomLayer: AMap.CustomLayer;

let provList: Array<Prov> = [];
let selectedCityFence: Array<[number, number]> = [];
let longTermActiveFence: Array<[number, number]> = [];
// let selectedProv: string;

/**
 * 初始化 Canvas
 * @param map
 */
function getNewCanvas(
	map: AMap.Map,
): [HTMLCanvasElement, CanvasRenderingContext2D] {
	// 初始化自定义层级
	const canvas: HTMLCanvasElement = document.createElement('canvas');
	const context = canvas.getContext('2d') as CanvasRenderingContext2D;
	canvas.width = map.getSize().getWidth();
	canvas.height = map.getSize().getHeight();
	return [canvas, context];
}

function fenceCustomLayerOnRender(): void {
	canvasCtx.clearRect(
		0,
		0,
		map.getSize().getWidth(),
		map.getSize().getHeight(),
	);
	// 画省级区域边框
	canvasCtx.save();
	for (const prov of provList) {
		let inScreen = false;
		canvasCtx.beginPath();
		// 画
		for (const point of prov.path) {
			const pixel = map.lngLatToContainer(new AMap.LngLat(point[0], point[1]));
			canvasCtx.lineTo(pixel.getX(), pixel.getY());
			// 有一个点在屏幕内，就画
			if (
				!inScreen &&
				pixel.getX() >= 0 &&
				pixel.getX() < map.getSize().getWidth() &&
				pixel.getY() >= 0 &&
				pixel.getY() <= map.getSize().getHeight()
			) {
				inScreen = true;
			}
		}
		canvasCtx.closePath();

		if (inScreen) {
			canvasCtx.lineWidth = FenceCustomLayerOptions.getLineWidth(map.getZoom());
			canvasCtx.strokeStyle = FenceCustomLayerOptions.provStrokeColor;
			canvasCtx.stroke();
		}

		// if (prov.name === selectedProv) {
		// 	console.log(prov.path);
		// 	canvasCtx.fillStyle = ProvCustomLayerOptions.selectedProvFillColor;
		// 	canvasCtx.fill();
		// }
	}
	canvasCtx.restore();

	// 画选中的城市
	canvasCtx.save();
	for (const point of selectedCityFence) {
		const pixel = map.lngLatToContainer(new AMap.LngLat(point[0], point[1]));
		canvasCtx.lineTo(pixel.getX(), pixel.getY());
	}
	canvasCtx.closePath();
	canvasCtx.fillStyle = FenceCustomLayerOptions.selectedCityFillColor;
	canvasCtx.fill();
	canvasCtx.restore();

	// 画长期活动范围
	canvasCtx.save();
	canvasCtx.beginPath();
	for (const point of longTermActiveFence) {
		const pixel = map.lngLatToContainer(new AMap.LngLat(point[0], point[1]));
		canvasCtx.lineTo(pixel.getX(), pixel.getY());
	}
	canvasCtx.closePath();
	canvasCtx.lineWidth = FenceCustomLayerOptions.getLineWidth(map.getZoom());
	canvasCtx.strokeStyle =
		FenceCustomLayerOptions.longTermActiveFenceStrokeColor;
	canvasCtx.stroke();
	canvasCtx.restore();
}

export function changeLayerDisplayData(
	provListParam: Array<Prov>,
	selectedCityFenceParam: Array<[number, number]>,
	longTermActiveFenceParam: Array<[number, number]>,
): void {
	provList = provListParam;
	selectedCityFence = selectedCityFenceParam;
	longTermActiveFence = longTermActiveFenceParam;
	fenceCustomLayer.render();
}

export default function initFenceCustomLayer(mapParam: AMap.Map): void {
	map = mapParam;
	[canvas, canvasCtx] = getNewCanvas(map);
	fenceCustomLayer = new AMap.CustomLayer(canvas, {
		zIndex: 100,
		zooms: [1, 20],
	});

	fenceCustomLayer.render = fenceCustomLayerOnRender;
	map.add([fenceCustomLayer]);
}
