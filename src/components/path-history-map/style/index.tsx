import styled from 'styled-components';

export const InfoWindowWrapper = styled.div`
	display: ${(props: { visible: boolean }): string =>
		props.visible ? 'block' : 'none'};
	width: 400px;

	.ant-carousel .slick-slide {
		text-align: center;
		// padding: 20px 40px;
		height: 160px;
		line-height: 160px;
		// background: #364d79;
		overflow: hidden;
	}

	.ant-carousel .slick-dots li button {
		background: black;
	}
`;
