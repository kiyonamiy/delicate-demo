import React from 'react';
import { Carousel } from 'antd';

export default function InfoWindowCarousel(): JSX.Element {
	return (
		<Carousel dotPosition="left" autoplay>
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
		</Carousel>
	);
}
