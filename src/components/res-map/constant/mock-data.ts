import Site, { ToSiteLine } from '../interface/site';
import SiteTypeEnum, { getSiteTypeZh } from './site-type-enum';

const SITE_COUNT = 15;

const STOCK_MAX = 200;
const TO_SITE_COUNT_MAX = 3;

// 120.15
const LNG_MIN = 119.5;
const LNG_OFFSET = 1.5;

// 30.28
const LAT_MIN = 30;
const LAT_OFFSET = 0.6;

const siteTypeEnumList: SiteTypeEnum[] = [
	SiteTypeEnum.CENTRAL_WAREHOUSE,
	SiteTypeEnum.COMMON_WAREHOUSE,
	SiteTypeEnum.SUPERMARKET,
];

const siteList: Site[] = [];
for (let i = 0; i < SITE_COUNT; i++) {
	const type =
		siteTypeEnumList[Math.floor(Math.random() * siteTypeEnumList.length)];

	const toSites: ToSiteLine[] = [];
	const toSitesCount = Math.floor(Math.random() * TO_SITE_COUNT_MAX);
	for (let j = 0; j < toSitesCount; j++) {
		toSites.push({
			id: Math.floor(Math.random() * SITE_COUNT),
			count: Math.floor((Math.random() * STOCK_MAX) / 2),
		});
	}

	const site: Site = {
		id: i,
		type,
		name: `${getSiteTypeZh(type)}${i}`,
		stock: Math.floor(Math.random() * STOCK_MAX),
		lng: LNG_MIN + Math.random() * LNG_OFFSET,
		lat: LAT_MIN + Math.random() * LAT_OFFSET,
		toSites,
	};
	siteList.push(site);
}

console.log(siteList);

export const MockData = siteList;
