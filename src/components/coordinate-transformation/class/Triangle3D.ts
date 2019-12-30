import Vector4 from './Vector4';
import Matrix4x4 from './Matrix4x4';

class Triangle3D {
	// 原始数据（分离好处：小数点相乘，防止误差增大
	public A: Vector4;
	public B: Vector4;
	public C: Vector4;
	// 变化数据
	private a: Vector4;
	private b: Vector4;
	private c: Vector4;

	constructor(a: Vector4, b: Vector4, c: Vector4) {
		this.A = this.a = new Vector4(a);
		this.B = this.b = new Vector4(b);
		this.C = this.c = new Vector4(c);
	}

	// 三角形利用矩阵的乘法进行变换
	public transform(matrix: Matrix4x4): void {
		this.a = matrix.mul(this.A);
		this.b = matrix.mul(this.B);
		this.c = matrix.mul(this.C);
	}

	// 绘制三角形到 2D 窗口上
	public draw(canvasCtx: CanvasRenderingContext2D): void {
		const pointArray: Array<[number, number]> = this.get2DPointArray();
		canvasCtx.beginPath();
		canvasCtx.moveTo(pointArray[0][0], pointArray[0][1]);
		for (const point of pointArray) {
			canvasCtx.lineTo(point[0], point[1]);
		}
		canvasCtx.strokeStyle = '#fff';
		canvasCtx.lineWidth = 10;
		canvasCtx.stroke();
	}

	// 获得 2D 坐标
	private get2DPoint(vector: Vector4): [number, number] {
		return [vector.x / vector.w, vector.y / vector.w];
	}

	private get2DPointArray(): Array<[number, number]> {
		const array = [];
		array.push(this.get2DPoint(this.a));
		array.push(this.get2DPoint(this.b));
		array.push(this.get2DPoint(this.c));
		array.push(this.get2DPoint(this.a));
		return array;
	}
}

export default Triangle3D;
