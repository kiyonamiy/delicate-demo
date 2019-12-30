import { pathData } from './constant/mock-data';
import Point from './class/Point';
import ArrowLine from './class/ArrowLine';

let map: AMap.Map;
let customLayer: AMap.CustomLayer;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

const pointArray: Array<Point> = [];

let infoWindowEl: React.MutableRefObject<HTMLDivElement>;
let setInfoWindowVisible: React.Dispatch<React.SetStateAction<boolean>>;

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

/**
 * canvas图层渲染函数
 */
function onRender(): void {
	context.clearRect(0, 0, map.getSize().getWidth(), map.getSize().getHeight());
	pointArray.length = 0; // 重绘前先清空原数组
	// 添加轨迹点
	for (const pointData of pathData) {
		const point = new Point(map, pointData);
		pointArray.push(point);
	}

	// 画轨迹线
	for (let i = 0; i < pointArray.length - 1; i++) {
		const line = new ArrowLine(map, pointArray[i], pointArray[i + 1]);
		line.draw(context);
	}
	// 画轨迹点
	for (const point of pointArray) {
		point.draw(context);
	}
}

function isInPointPath(
	ctx: CanvasRenderingContext2D,
	point: Point,
	x: number,
	y: number,
): boolean {
	const containerPos = point.getContainerPos();
	ctx.beginPath();
	ctx.arc(
		containerPos.getX(),
		containerPos.getY(),
		point.getSize(),
		0,
		Math.PI * 2,
		false,
	);
	return ctx.isPointInPath(x, y);
}

/**
 * 打开 Marker 信息窗口
 * @param map
 * @param marker
 */
function openPointInfoWindow(map: AMap.Map, point: Point): void {
	const infoWindow = new AMap.InfoWindow({});
	infoWindow.setContent(infoWindowEl.current);
	setInfoWindowVisible(true);
	infoWindow.open(
		map,
		map.containerToLngLat(
			new AMap.Pixel(
				point.getContainerPos().getX(),
				point.getContainerPos().getY(),
			),
		),
	);
	// const content = 'heheh';
	// new AMap.InfoWindow({
	// 	content,
	// }).open(
	// 	map,
	// 	map.containerToLngLat(
	// 		new AMap.Pixel(
	// 			point.getContainerPos().getX(),
	// 			point.getContainerPos().getY(),
	// 		),
	// 	),
	// );
}

function canvasOnMouseDown(e: MouseEvent): void {
	for (const point of pointArray) {
		if (isInPointPath(context, point, e.offsetX, e.offsetY)) {
			openPointInfoWindow(map, point);
			break;
		}
	}
}

/**
 * 添加自定义canvas图层
 * @param mapParam 地图
 */
export function initPathCustomLayer(
	mapParam: AMap.Map,
	infoWindowElParam: React.MutableRefObject<HTMLDivElement>,
	setInfoWindowVisibleParam: React.Dispatch<React.SetStateAction<boolean>>,
): void {
	infoWindowEl = infoWindowElParam;
	setInfoWindowVisible = setInfoWindowVisibleParam;

	map = mapParam;
	[canvas, context] = getNewCanvas(map);
	customLayer = new AMap.CustomLayer(canvas, {
		zIndex: 150,
		zooms: [1, 20],
	});

	canvas.addEventListener('mousedown', canvasOnMouseDown);

	customLayer.render = onRender;
	map.add([customLayer]);
	// return customLayer;
}
