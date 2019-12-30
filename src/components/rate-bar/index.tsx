import React from 'react';
import View from './index-view';
import { ContainerProps } from './interface/props';

export default function Container(props: ContainerProps): JSX.Element {
	const { nowScore, lvScoreList } = props;
	return <View lvScoreList={lvScoreList} nowScore={nowScore} />;
}
