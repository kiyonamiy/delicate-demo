import React, { useRef, useEffect } from 'react';
import init from './init';

export default function Container(): JSX.Element {
	const canvasEl: React.MutableRefObject<HTMLCanvasElement> = useRef(
		document.createElement('canvas'),
	);

	useEffect(() => {
		init(canvasEl.current);
	}, []);

	return (
		<canvas
			ref={canvasEl}
			style={{ height: 700, width: '100%', background: 'black' }}
		/>
	);
}
