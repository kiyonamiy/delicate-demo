import Point from './Point';
import { THEME_BLUE } from '../constant/config';

export default class ArrowLine {
	private map: AMap.Map;
	private fromPoint: Point;
	private toPoint: Point;
	private arrowLen: number; // 箭头长度
	private color: string; // 线与箭头的颜色
	private theta = 30; // 箭头与线的夹角

	constructor(map: AMap.Map, fromPoint: Point, toPoint: Point) {
		this.map = map;
		this.fromPoint = fromPoint;
		this.toPoint = toPoint;
		this.arrowLen = 2 * this.map.getZoom(); // 10
		this.color = fromPoint.getColor();
	}

	draw(context: CanvasRenderingContext2D): void {
		const fromX = this.fromPoint.getContainerPos().getX();
		const fromY = this.fromPoint.getContainerPos().getY();
		const toX = this.toPoint.getContainerPos().getX();
		const toY = this.toPoint.getContainerPos().getY();

		// 计算各角度和对应的箭头终点坐标
		const angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI;
		const angle1 = ((angle + this.theta) * Math.PI) / 180;
		const angle2 = ((angle - this.theta) * Math.PI) / 180;
		const topX = this.arrowLen * Math.cos(angle1);
		const topY = this.arrowLen * Math.sin(angle1);
		const botX = this.arrowLen * Math.cos(angle2);
		const botY = this.arrowLen * Math.sin(angle2);
		let arrowX, arrowY; //箭头线终点坐标

		context.beginPath();
		//画两点间直线
		context.moveTo(fromX, fromY);
		context.lineTo(toX, toY);

		//   const arrowPointX = toX + (radius+2) * Math.cos(angle * Math.PI / 180); //终点圆的顶部
		//   const arrowPointY = toY + (radius+2) * Math.sin(angle * Math.PI / 180);
		// 箭头顶点坐标（线段中点）
		const arrowPointX = (fromX + toX) / 2;
		const arrowPointY = (fromY + toY) / 2;

		// 画半边箭头线
		arrowX = arrowPointX + topX;
		arrowY = arrowPointY + topY;
		context.moveTo(arrowPointX, arrowPointY);
		context.lineTo(arrowX, arrowY);

		// 画另一边边箭头线
		arrowX = arrowPointX + botX;
		arrowY = arrowPointY + botY;
		context.moveTo(arrowPointX, arrowPointY);
		context.lineTo(arrowX, arrowY);

		context.lineWidth = 2;
		context.strokeStyle = THEME_BLUE;
		context.stroke();
		context.restore();
	}
}
