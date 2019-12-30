import Triangle3D from './class/Triangle3D';
import Matrix4x4 from './class/Matrix4x4';
import Vector4 from './class/Vector4';

export default function init(canvas: HTMLCanvasElement): void {
	/* 1. 初始化 Canvas */
	const WIDTH: number = document.documentElement.clientWidth;
	const HEIGHT: number = document.documentElement.clientHeight;
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	// 拿到 canvas 上下文
	const canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D;
	// 将坐标系原点移动到画布正中心
	canvasCtx.translate(WIDTH / 2, HEIGHT / 2);

	// 轴旋转矩阵
	const mRotationX: Matrix4x4 = new Matrix4x4();
	const mRotationY: Matrix4x4 = new Matrix4x4();
	const mRotationZ: Matrix4x4 = new Matrix4x4();

	// 缩放矩阵
	const mScale: Matrix4x4 = new Matrix4x4();
	mScale.pts[0][0] = 250;
	mScale.pts[1][1] = 250;
	mScale.pts[2][2] = 250;
	mScale.pts[3][3] = 1;

	// 观察矩阵
	const mView: Matrix4x4 = new Matrix4x4();
	mView.pts[0][0] = 1;
	mView.pts[1][1] = 1;
	mView.pts[2][2] = 1;
	mView.pts[3][2] = 250;
	mView.pts[3][3] = 1;

	// 投影矩阵
	const mProjection: Matrix4x4 = new Matrix4x4();
	mProjection.pts[0][0] = 1;
	mProjection.pts[1][1] = 1;
	mProjection.pts[2][2] = 1;
	mProjection.pts[2][3] = 1.0 / 400;

	const triangle: Triangle3D = new Triangle3D(
		new Vector4(0, 0.5, 0, 1), // y 向下，屏幕坐标的正方向
		new Vector4(0.5, -0.5, 0, 1),
		new Vector4(-0.5, -0.5, 0, 1),
	);

	let angle = 0;

	function animate(): void {
		canvasCtx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);

		angle += 2;
		const radian = (angle / 360) * Math.PI;

		// 绕 X 轴旋转矩阵
		mRotationX.pts[0][0] = 1;
		mRotationX.pts[1][1] = Math.cos(radian);
		mRotationX.pts[1][2] = Math.sin(radian);
		mRotationX.pts[2][1] = -Math.sin(radian);
		mRotationX.pts[2][2] = Math.cos(radian);
		mRotationX.pts[3][3] = 1;
		// 绕 Y 轴旋转矩阵
		mRotationY.pts[0][0] = Math.cos(radian);
		mRotationY.pts[0][2] = Math.sin(radian);
		mRotationY.pts[1][1] = 1;
		mRotationY.pts[2][0] = -Math.sin(radian);
		mRotationY.pts[2][2] = Math.cos(radian);
		mRotationY.pts[3][3] = 1;
		// 绕 Z 轴旋转矩阵
		mRotationZ.pts[0][0] = Math.cos(radian);
		mRotationZ.pts[0][1] = Math.sin(radian);
		mRotationZ.pts[1][0] = -Math.sin(radian);
		mRotationZ.pts[1][1] = Math.cos(radian);
		mRotationZ.pts[3][3] = 1;

		// 缩放 250 倍，并不停绕 Y 轴旋转
		const m: Matrix4x4 = mScale
			.mul(mRotationX)
			.mul(mRotationY)
			.mul(mRotationZ)
			.mul(mView)
			.mul(mProjection);
		triangle.transform(m);

		triangle.draw(canvasCtx);
		// 递归调用
		window.requestAnimationFrame(animate);
	}

	animate();
}
