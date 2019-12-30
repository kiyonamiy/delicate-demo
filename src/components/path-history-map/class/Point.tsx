import { PointData } from '../interface/point';
import { THEME_BLUE, PointOptions } from '../constant/config';

export default class Point {
	private map: AMap.Map;
	private lngLatPos: AMap.LngLat;
	private containerPos: AMap.Pixel;
	private size: number;
	private color: string;

	constructor(map: AMap.Map, data: PointData) {
		this.map = map;
		this.lngLatPos = new AMap.LngLat(data.lng, data.lat);
		this.containerPos = this.map.lngLatToContainer(this.lngLatPos);
		this.size = data.size * this.map.getZoom();
		this.color = PointOptions.mapLevelToColor(data.riskLevel);
	}

	draw(context: CanvasRenderingContext2D): void {
		context.save();
		context.globalAlpha = 0.8;

		// 画圆心（小点）
		context.beginPath();
		context.arc(
			this.containerPos.getX(),
			this.containerPos.getY(),
			3,
			0,
			Math.PI * 2,
		);
		context.fillStyle = THEME_BLUE;
		context.fill();

		// context.globalCompositeOperation = 'source-over';
		context.beginPath();
		context.arc(
			this.containerPos.getX(),
			this.containerPos.getY(),
			this.size,
			0,
			Math.PI * 2,
		);
		context.fillStyle = this.color;
		context.strokeStyle = '#fff';
		context.lineWidth = 2;
		context.fill();
		context.stroke();

		context.restore();
	}

	getLngLatPos(): AMap.LngLat {
		return this.lngLatPos;
	}

	getContainerPos(): AMap.Pixel {
		return this.containerPos;
	}

	getColor(): string {
		return this.color;
	}

	getSize(): number {
		return this.size;
	}

	isInPath(context: CanvasRenderingContext2D, x: number, y: number): boolean {
		context.beginPath();
		context.arc(
			this.containerPos.getX(),
			this.containerPos.getY(),
			this.size * this.map.getZoom(),
			0,
			Math.PI * 2,
		);
		return context.isPointInPath(x, y);
	}
}
