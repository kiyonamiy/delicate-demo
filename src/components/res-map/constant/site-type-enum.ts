enum SiteTypeEnum {
	COMMON_WAREHOUSE,
	CENTRAL_WAREHOUSE,
	SUPERMARKET,
}

export const getSiteTypeZh = (type: SiteTypeEnum): string => {
	switch (type) {
		case SiteTypeEnum.COMMON_WAREHOUSE:
			return '普通仓库';
		case SiteTypeEnum.CENTRAL_WAREHOUSE:
			return '中心仓库';
		case SiteTypeEnum.SUPERMARKET:
			return '超市';
	}
};

export default SiteTypeEnum;
