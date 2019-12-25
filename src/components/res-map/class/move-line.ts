import SiteMarker from './site-marker';
import { MoveLineOptions } from '../constant/config';
import SiteTypeEnum from '../constant/site-type-enum';
/**
 * 划线
 */
export default class MoveLine {
	private map: AMap.Map;
	private from: SiteMarker;
	private to: SiteMarker;
	private lineCount: number;
	private path: Array<[number, number]>;
	private step: number; // move-circle 所在 path 点位置

	constructor(
		map: AMap.Map,
		from: SiteMarker,
		to: SiteMarker,
		lineCount: number,
	) {
		this.map = map;
		this.from = from;
		this.to = to;
		this.lineCount = lineCount;

		this.path = this.calculatePathPointList();
		this.step = 0;
	}

	drawLinePath(context: CanvasRenderingContext2D): void {
		const pointList = this.path;
		const strokeColor =
			this.to.getSiteType() === SiteTypeEnum.SUPERMARKET
				? MoveLineOptions.saleLineColor
				: MoveLineOptions.dispatchLineColor;
		context.save();
		context.beginPath();
		context.moveTo(pointList[0][0], pointList[0][1]);
		for (const point of pointList) {
			context.lineTo(point[0], point[1]);
		}
		context.lineWidth = MoveLineOptions.lineWidth;
		context.strokeStyle = strokeColor;
		context.stroke();
		context.restore();

		context.save();
		const middlePos = Math.floor(pointList.length / 2);
		context.moveTo(pointList[middlePos][0], pointList[middlePos][1]);
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = `12px Microsoft YaHei`;
		context.fillStyle = strokeColor;
		context.shadowColor = '#aaa';
		context.shadowOffsetX = 1;
		context.shadowOffsetY = 1;
		context.shadowBlur = 3;
		context.fillText(
			this.lineCount.toString(),
			pointList[middlePos][0],
			pointList[middlePos][1] - MoveLineOptions.lineCountYOffset,
		);
		context.restore();
	}

	drawMoveCircle(context: CanvasRenderingContext2D): void {
		const pointList = this.path;
		const radius = MoveLineOptions.moveRadius;
		// TODO 定制化
		context.save();
		context.fillStyle = MoveLineOptions.fillColor;
		context.shadowColor = MoveLineOptions.shadowColor;
		context.shadowBlur = MoveLineOptions.shadowBlur;
		context.beginPath();
		context.arc(
			pointList[this.step][0],
			pointList[this.step][1],
			radius,
			0,
			Math.PI * 2,
			true,
		);
		context.fill();
		context.closePath();
		context.restore();

		this.step += 1;
		if (this.step >= pointList.length) {
			this.step = 0;
		}
	}

	/**
	 * getPointList
	 * getOffsetPoint
	 * getDistance
	 * smoothSpline
	 * interpolate
	 * 计算路径
	 */
	private calculatePathPointList(): Array<[number, number]> {
		const fromPixel = this.from.getContainerPos();
		const toPixel = this.to.getContainerPos();

		let points: Array<[number, number]> = [
			[fromPixel.getX(), fromPixel.getY()],
			[toPixel.getX(), toPixel.getY()],
		];
		const ex = points[1][0];
		const ey = points[1][1];
		points[3] = [ex, ey];
		points[1] = this.getOffsetPoint(points[0], points[3]);
		points[2] = this.getOffsetPoint(points[3], points[0]);
		points = this.smoothSpline(points, false);
		//修正最后一点在插值产生的偏移
		points[points.length - 1] = [ex, ey];
		return points;
	}

	private getOffsetPoint(
		start: [number, number],
		end: [number, number],
	): [number, number] {
		const distance = this.getDistance(start, end) / 3; //除以3？
		let angle;
		let dX;
		let dY;
		const mp: [number, number] = [start[0], start[1]];
		const deltaAngle = -0.2; //偏移0.2弧度
		if (start[0] !== end[0] && start[1] !== end[1]) {
			//斜率存在
			const k = (end[1] - start[1]) / (end[0] - start[0]);
			angle = Math.atan(k);
		} else if (start[0] === end[0]) {
			//垂直线
			angle = ((start[1] <= end[1] ? 1 : -1) * Math.PI) / 2;
		} else {
			//水平线
			angle = 0;
		}
		if (start[0] <= end[0]) {
			angle -= deltaAngle;
			dX = Math.round(Math.cos(angle) * distance);
			dY = Math.round(Math.sin(angle) * distance);
			mp[0] += dX;
			mp[1] += dY;
		} else {
			angle += deltaAngle;
			dX = Math.round(Math.cos(angle) * distance);
			dY = Math.round(Math.sin(angle) * distance);
			mp[0] -= dX;
			mp[1] -= dY;
		}
		return mp;
	}

	private getDistance(p1: [number, number], p2: [number, number]): number {
		return Math.sqrt(
			(p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]),
		);
	}

	private smoothSpline(
		points: Array<[number, number]>,
		isLoop: boolean,
	): Array<[number, number]> {
		const len = points.length;
		const ret: Array<[number, number]> = [];
		let distance = 0;
		for (let i = 1; i < len; i++) {
			distance += this.getDistance(points[i - 1], points[i]);
		}
		let segs = distance / 2;
		segs = segs < len ? len : segs;
		for (let i = 0; i < segs; i++) {
			const pos = (i / (segs - 1)) * (isLoop ? len : len - 1);
			const idx = Math.floor(pos);
			const w = pos - idx;
			let p0;
			const p1 = points[idx % len];
			let p2;
			let p3;
			if (!isLoop) {
				p0 = points[idx === 0 ? idx : idx - 1];
				p2 = points[idx > len - 2 ? len - 1 : idx + 1];
				p3 = points[idx > len - 3 ? len - 1 : idx + 2];
			} else {
				p0 = points[(idx - 1 + len) % len];
				p2 = points[(idx + 1) % len];
				p3 = points[(idx + 2) % len];
			}
			const w2 = w * w;
			const w3 = w * w2;

			ret.push([
				this.interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
				this.interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3),
			]);
		}
		return ret;
	}

	private interpolate(
		p0: number,
		p1: number,
		p2: number,
		p3: number,
		t: number,
		t2: number,
		t3: number,
	): number {
		const v0 = (p2 - p0) * 0.5;
		const v1 = (p3 - p1) * 0.5;
		return (
			(2 * (p1 - p2) + v0 + v1) * t3 +
			(-3 * (p1 - p2) - 2 * v0 - v1) * t2 +
			v0 * t +
			p1
		);
	}

	getPath(): Array<[number, number]> {
		return this.path;
	}

	getFromName(): string {
		return this.from.getSiteName();
	}

	getToName(): string {
		return this.to.getSiteName();
	}

	getLineCount(): number {
		return this.lineCount;
	}

	getFromContainerPos(): AMap.Pixel {
		return this.from.getContainerPos();
	}

	getToContainerPos(): AMap.Pixel {
		return this.to.getContainerPos();
	}
}
