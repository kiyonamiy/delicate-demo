import React from 'react';
import { Carousel } from 'antd';

export default function InfoWindowCarousel(): JSX.Element {
	return (
		<Carousel dotPosition="left" autoplay>
			<div>信息1</div>
			<div>信息2</div>
			<div>信息3</div>
			<div>信息4</div>
		</Carousel>
	);
}
