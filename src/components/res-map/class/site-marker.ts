import Site, { ToSiteLine } from '../interface/site';
import SiteTypeEnum from '../constant/site-type-enum';
import { SiteMarkerOptions } from '../constant/config';

function getColor(type: SiteTypeEnum): string {
	switch (type) {
		case SiteTypeEnum.COMMON_WAREHOUSE:
			return SiteMarkerOptions.commonWarehouseColor;
		case SiteTypeEnum.CENTRAL_WAREHOUSE:
			return SiteMarkerOptions.centralWarehouseColor;
		case SiteTypeEnum.SUPERMARKET:
			return SiteMarkerOptions.supermarketColor;
	}
}

function hexToRgba(hexColor: string, radius: number): string {
	const r: number = parseInt(`0x${hexColor.slice(1, 3)}`, 16);
	const g: number = parseInt(`0x${hexColor.slice(3, 5)}`, 16);
	const b: number = parseInt(`0x${hexColor.slice(5, 7)}`, 16);

	const a: number =
		1 - parseFloat((radius / SiteMarkerOptions.ringMaxRadius).toFixed(2));

	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default class SiteMarker {
	private map: AMap.Map;
	private lngLatPos: AMap.LngLat;
	private containerPos: AMap.Pixel;

	private site: Site;

	private color: string;
	private radius: number;
	private rippleRaidusArr: number[];

	constructor(map: AMap.Map, site: Site) {
		this.map = map;
		this.lngLatPos = new AMap.LngLat(site.lng, site.lat);
		this.containerPos = this.map.lngLatToContainer(this.lngLatPos);

		this.site = site;

		this.color = getColor(site.type);
		this.radius = SiteMarkerOptions.radius;
		this.rippleRaidusArr = [...SiteMarkerOptions.ringInitArray];
	}

	draw(context: CanvasRenderingContext2D): void {
		// 画底圆
		context.save();
		context.beginPath();
		context.arc(
			this.containerPos.getX(),
			this.containerPos.getY(),
			this.radius,
			0,
			Math.PI * 2,
		);
		context.closePath();
		context.shadowColor = SiteMarkerOptions.shadowColor;
		context.shadowOffsetX = SiteMarkerOptions.shadowOffsetX;
		context.shadowOffsetY = SiteMarkerOptions.shadowOffsetY;
		context.shadowBlur = SiteMarkerOptions.shadowBlur;
		context.fillStyle = this.color;
		context.fill();
		context.restore();

		// 画圆上的数字
		context.save();
		context.fillStyle = SiteMarkerOptions.countColor;
		context.font = `${this.radius}px Microsoft YaHei`;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText(
			this.site.stock.toString(),
			this.containerPos.getX(),
			this.containerPos.getY(),
		);
		context.restore();
	}

	/**
	 * 画扩展波纹
	 * @param context
	 */
	ripple(context: CanvasRenderingContext2D): void {
		context.save();
		for (let i = 0; i < this.rippleRaidusArr.length; i++) {
			this.drawOuterRing(context, this.rippleRaidusArr[i]);
			this.rippleRaidusArr[i] += SiteMarkerOptions.ringRadiusIncrement;
			if (this.rippleRaidusArr[i] >= SiteMarkerOptions.ringMaxRadius) {
				this.rippleRaidusArr[i] = SiteMarkerOptions.ringMinRadius;
			}
		}
		context.restore();
	}

	private drawOuterRing(
		context: CanvasRenderingContext2D,
		ringRadius: number,
	): void {
		context.save();
		context.beginPath();
		context.arc(
			this.containerPos.getX(),
			this.containerPos.getY(),
			ringRadius,
			0,
			Math.PI * 2,
		);
		context.closePath();
		context.lineWidth = SiteMarkerOptions.ringLineWidth;
		context.strokeStyle = hexToRgba(this.color, ringRadius);
		context.stroke();
		context.restore();
	}

	getSiteType(): SiteTypeEnum {
		return this.site.type;
	}

	getSiteId(): number {
		return this.site.id;
	}

	getSiteName(): string {
		return this.site.name;
	}

	getLngLatPos(): AMap.LngLat {
		return this.lngLatPos;
	}

	getSiteToSites(): ToSiteLine[] {
		return this.site.toSites;
	}

	getContainerPos(): AMap.Pixel {
		return this.containerPos;
	}

	getRadius(): number {
		return this.radius;
	}

	magnifyRadius(): void {
		this.radius = SiteMarkerOptions.magnifiedRadius;
	}

	getSiteStock(): number {
		return this.site.stock;
	}

	getSiteTypeZh(): string {
		switch (this.getSiteType()) {
			case SiteTypeEnum.COMMON_WAREHOUSE:
				return '普通仓库';
			case SiteTypeEnum.CENTRAL_WAREHOUSE:
				return '中心仓库';
			case SiteTypeEnum.SUPERMARKET:
				return '超市';
		}
	}
}
