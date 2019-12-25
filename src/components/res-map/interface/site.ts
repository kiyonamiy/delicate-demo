import SiteTypeEnum from '../constant/site-type-enum';

export interface ToSiteLine {
	id: number;
	count: number;
}

export default interface Site {
	id: number;
	name: string;
	type: SiteTypeEnum;
	stock: number;
	lat: number;
	lng: number;
	toSites: ToSiteLine[];
}
