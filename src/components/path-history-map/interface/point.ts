export interface PointData {
	id: number;
	lng: number; // 经度
	lat: number; // 纬度
	riskLevel: number; // 风险等级，颜色
	timestamp: number; // 时间戳，按时间连轨迹标方向
	size: number; // 停留时长，圆点大小
}
