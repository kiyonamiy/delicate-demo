class Vector4 {
	public x: number;
	public y: number;
	public z: number;
	public w: number;

	constructor();
	constructor(x: number, y: number, z: number, w: number);
	constructor(vector: Vector4);

	constructor(
		param1: Vector4 | number = 0,
		param2 = 0,
		param3 = 0,
		param4 = 0,
	) {
		if (param1 instanceof Vector4) {
			this.x = param1.x;
			this.y = param1.y;
			this.z = param1.z;
			this.w = param1.w;
		} else {
			this.x = param1;
			this.y = param2;
			this.z = param3;
			this.w = param4;
		}
	}
}

export default Vector4;
