/* eslint-disable no-eq-null */
import MoveLine from './class/move-line';
import { MoveLineOptions } from './constant/config';
import SiteMarker from './class/site-marker';
import Site from './interface/site';
import { getSiteTypeZh } from './constant/site-type-enum';

// map
let map: AMap.Map;

// 自定义图层
let baseCustomLayer: AMap.CustomLayer;
let animationCustomLayer: AMap.CustomLayer;

// canvas
let baseCanvas: HTMLCanvasElement;
let baseContext: CanvasRenderingContext2D;
let animationCanvas: HTMLCanvasElement;
let animationContext: CanvasRenderingContext2D;

// 数据
let siteList: Site[];

// 画图需要
let rippleAniNum = 0;
let isDisplayRipple = false;
let moveCirleAniNum = 0;

const markerMap = new Map<number, SiteMarker>(); // 存储 marker，方便画底线
let moveLineArray: Array<MoveLine> = []; // 存储 line

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
 * 底层 Canvas 渲染
 */
function baseCustomLayerOnRender(): void {
	baseContext.clearRect(
		0,
		0,
		map.getSize().getWidth(),
		map.getSize().getHeight(),
	);

	markerMap.clear();
	moveLineArray = [];

	// 收集所有的 site marker （也为后边取到 to 信息）
	for (const site of siteList) {
		const marker = new SiteMarker(map, site);
		markerMap.set(site.id, marker);
	}

	// 画 line
	if (map.getZoom() >= MoveLineOptions.minZoom) {
		for (const site of siteList) {
			const fromMarker = markerMap.get(site.id);
			if (fromMarker == null) {
				continue;
			}
			const toSites = fromMarker.getSiteToSites();
			for (const toSite of toSites) {
				const toMarker = markerMap.get(toSite.id);
				if (toMarker == null) {
					continue;
				}
				const moveLine = new MoveLine(map, fromMarker, toMarker, toSite.count);
				moveLine.drawLinePath(baseContext);

				moveLineArray.push(moveLine);
			}
		}
	}

	// 最后统一画 marker(为了都在线层之上)
	const markerArray = Array.from(markerMap.values());
	for (const marker of markerArray) {
		marker.draw(baseContext);
	}
}

/**
 * 上层 Canvas 动画层
 */
function animationCustomLayerOnRender(): void {
	animationContext.clearRect(
		0,
		0,
		map.getSize().getWidth(),
		map.getSize().getHeight(),
	);
	cancelAnimationFrame(moveCirleAniNum); // 之前的动画还在播放...显得变快（好几个点）
	cancelAnimationFrame(rippleAniNum);
	isDisplayRipple = false;

	// 不断重绘移动的圆
	(function drawFrame(): void {
		const prev = animationContext.globalCompositeOperation;
		animationContext.globalCompositeOperation = 'destination-in';
		animationContext.globalAlpha = 0.96;
		animationContext.fillRect(
			0,
			0,
			map.getSize().getWidth(),
			map.getSize().getHeight(),
		);
		animationContext.globalCompositeOperation = prev;
		for (const moveLine of moveLineArray) {
			moveLine.drawMoveCircle(animationContext);
		}
		moveCirleAniNum = requestAnimationFrame(drawFrame);
	})();
}

/**
 * 判断是否点击 路线
 * @param ctx
 * @param moveLine
 * @param x
 * @param y
 */
function isInMoveLinePath(
	ctx: CanvasRenderingContext2D,
	moveLine: MoveLine,
	x: number,
	y: number,
): boolean {
	// const fromContainerPos = moveLine.getFromContainerPos();
	// const toContainerPos = moveLine.getToContainerPos();
	// const fromX = fromContainerPos.getX();
	// const fromY = fromContainerPos.getY();
	// const toX = toContainerPos.getX();
	// const toY = toContainerPos.getY();
	// // 超出两点组成的矩阵，没必要继续遍历 path，提前结束循环
	// if (
	// 	fromX !== toX &&
	// 	fromY !== toY &&
	// 	(x < Math.min(fromX, toX) ||
	// 		y < Math.min(fromY, toY) ||
	// 		x > Math.max(fromX, toX) ||
	// 		y > Math.max(fromY, toY))
	// ) {
	// 	return false;
	// }

	const path: Array<[number, number]> = moveLine.getPath();
	for (const point of path) {
		ctx.beginPath();
		ctx.arc(
			point[0],
			point[1],
			MoveLineOptions.inPathRadius,
			0,
			Math.PI * 2,
			false,
		);
		ctx.closePath();
		const oneResult: boolean = ctx.isPointInPath(x, y);

		if (oneResult) {
			return true;
		}
	}
	return false;
}

/**
 * 判断是否点击 Marker
 * @param ctx
 * @param marker
 * @param x
 * @param y
 */
function isInMarkerPath(
	ctx: CanvasRenderingContext2D,
	marker: SiteMarker,
	x: number,
	y: number,
): boolean {
	const containerPos = marker.getContainerPos();
	ctx.beginPath();
	ctx.arc(
		containerPos.getX(),
		containerPos.getY(),
		marker.getRadius(),
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
function openMarkerInfoWindow(map: AMap.Map, marker: SiteMarker): void {
	const content = `
  <h4>#${marker.getSiteId()} ${marker.getSiteName()}</h4>
  <strong>类型: </strong> ${getSiteTypeZh(marker.getSiteType())}
  <br />
  <strong>库存: </strong> ${marker.getSiteStock()}
  <br />
  `;
	new AMap.InfoWindow({
		content,
	}).open(
		map,
		map.containerToLngLat(
			new AMap.Pixel(
				marker.getContainerPos().getX(),
				marker.getContainerPos().getY(),
			),
		),
	);
}

/**
 * 打开 路线 信息窗口
 * @param map
 * @param moveLine
 * @param x
 * @param y
 */
function openMoveLineInfoWindow(
	map: AMap.Map,
	moveLine: MoveLine,
	x: number,
	y: number,
): void {
	const content = `
  <strong>起始仓库: </strong> ${moveLine.getFromName()}
  <br />
  <strong>目的仓库: </strong> ${moveLine.getToName()}
  <br />
  <strong>货运数量: </strong> ${moveLine.getLineCount()}
  <br />
  `;
	new AMap.InfoWindow({
		content,
	}).open(map, map.containerToLngLat(new AMap.Pixel(x, y)));
}

function animationCanvasOnMouseDown(e: MouseEvent): void {
	let isMarkerClicked = false;
	const markerArray = Array.from(markerMap.values());
	for (const marker of markerArray) {
		if (isInMarkerPath(baseContext, marker, e.offsetX, e.offsetY)) {
			openMarkerInfoWindow(map, marker);
			isMarkerClicked = true;
			break;
		}
	}

	if (!isMarkerClicked) {
		for (const moveLine of moveLineArray) {
			if (isInMoveLinePath(baseContext, moveLine, e.offsetX, e.offsetY)) {
				openMoveLineInfoWindow(map, moveLine, e.offsetX, e.offsetY);
				break;
			}
		}
	}
}

function animationCanvasOnMouseMove(e: MouseEvent): void {
	const RippleFrame = (marker: SiteMarker): void => {
		animationContext.save();
		const prev = animationContext.globalCompositeOperation;
		animationContext.globalCompositeOperation = 'destination-in';
		animationContext.globalAlpha = 0.8;
		animationContext.fillRect(
			0,
			0,
			map.getSize().getWidth(),
			map.getSize().getHeight(),
		);
		animationContext.globalCompositeOperation = prev;

		marker.ripple(animationContext);

		marker.magnifyRadius();
		marker.draw(animationContext);

		animationContext.restore();

		rippleAniNum = requestAnimationFrame(() => {
			RippleFrame(marker);
		});
	};

	if (isDisplayRipple) {
		isDisplayRipple = false;
		cancelAnimationFrame(rippleAniNum);
	}

	markerMap.forEach(marker => {
		if (!isInMarkerPath(baseContext, marker, e.offsetX, e.offsetY)) {
			return;
		}

		if (!isDisplayRipple) {
			isDisplayRipple = true;
			rippleAniNum = requestAnimationFrame(() => {
				RippleFrame(marker);
			});
		}
	});
}

export function initCustomLayer(
	mapParam: AMap.Map,
	siteListParam: Site[],
): void {
	map = mapParam;
	siteList = siteListParam;

	[baseCanvas, baseContext] = getNewCanvas(map);
	baseCustomLayer = new AMap.CustomLayer(baseCanvas, {
		zIndex: 100,
		zooms: [1, 20],
	});

	[animationCanvas, animationContext] = getNewCanvas(map);
	animationCustomLayer = new AMap.CustomLayer(animationCanvas, {
		zIndex: 100,
		zooms: [1, 20],
	});

	// 绑定重新渲染函数
	baseCustomLayer.render = baseCustomLayerOnRender;
	animationCustomLayer.render = animationCustomLayerOnRender;

	// ------------------------------上层 Canvas 点击事件响应 ----------------------------------
	animationCanvas.addEventListener('mousedown', animationCanvasOnMouseDown);
	animationCanvas.addEventListener('mousemove', animationCanvasOnMouseMove);

	map.add([baseCustomLayer, animationCustomLayer]);
}
