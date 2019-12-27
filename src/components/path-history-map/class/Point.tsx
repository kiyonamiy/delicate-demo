import { PointData } from '../interface/point';
import { THEME_BLUE } from '../constant/config';

const mapLevelToColor = (level: number): string => {
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
};

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
		this.size = data.size;
		this.color = mapLevelToColor(data.riskLevel);
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
			this.size * this.map.getZoom(),
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
}
