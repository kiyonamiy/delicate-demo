import Vector4 from './Vector4';

class Matrix4x4 {
	public pts: [
		[number, number, number, number],
		[number, number, number, number],
		[number, number, number, number],
		[number, number, number, number],
	];

	public static readonly DIMENSION = 4;

	public constructor() {
		this.pts = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	}

	public mul(matrix: Matrix4x4): Matrix4x4;
	public mul(vector: Vector4): Vector4;

	public mul(param: Matrix4x4 | Vector4): Matrix4x4 | Vector4 | null {
		// 右乘矩阵
		if (param instanceof Matrix4x4) {
			const newMatrix: Matrix4x4 = new Matrix4x4();
			for (let row = 0; row < Matrix4x4.DIMENSION; row++) {
				for (let col = 0; col < Matrix4x4.DIMENSION; col++) {
					for (let k = 0; k < Matrix4x4.DIMENSION; k++) {
						newMatrix.pts[row][col] += this.pts[row][k] * param.pts[k][col];
					}
				}
			}
			return newMatrix;
		}
		// 左乘向量
		if (param instanceof Vector4) {
			const newVector = new Vector4();

			newVector.x =
				this.pts[0][0] * param.x +
				this.pts[1][0] * param.y +
				this.pts[2][0] * param.z +
				this.pts[3][0] * param.w;

			newVector.y =
				this.pts[0][1] * param.x +
				this.pts[1][1] * param.y +
				this.pts[2][1] * param.z +
				this.pts[3][1] * param.w;

			newVector.z =
				this.pts[0][2] * param.x +
				this.pts[1][2] * param.y +
				this.pts[2][2] * param.z +
				this.pts[3][2] * param.w;

			newVector.w =
				this.pts[0][3] * param.x +
				this.pts[1][3] * param.y +
				this.pts[2][3] * param.z +
				this.pts[3][3] * param.w;
			return newVector;
		}

		return null;
	}
}

export default Matrix4x4;
