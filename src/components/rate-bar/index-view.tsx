import React from 'react';
import { Tooltip } from 'antd';
import { BarWrapper, Level, Progress, Filler, LvScore, Divsion } from './style';

import { ViewProps } from './interface/props';

const getNowLevel = (lvScoreList: Array<number>, nowScore: number): number => {
	for (let i = lvScoreList.length - 1; i >= 0; i--) {
		if (nowScore >= lvScoreList[i]) {
			return i;
		}
	}
	return -1;
};

export default function View(props: ViewProps): JSX.Element {
	const { lvScoreList, nowScore } = props;

	const nowLevel = getNowLevel(lvScoreList, nowScore);

	return (
		<BarWrapper>
			<Level>
				{lvScoreList.map((item, index) => {
					let className = '';
					let style = { marginLeft: `${item}%` };
					if (index < nowLevel) {
						className = 'before';
					} else if (index === nowLevel) {
						className = 'now';
						style = { marginLeft: `calc(${item}% - 0.3em)` };
					}
					return (
						<li key={item} className={className} style={style}>
							{index}
						</li>
					);
				})}
			</Level>

			<Progress>
				<Filler nowScore={nowScore} />
				<Tooltip placement="right" title={nowScore}>
					<Divsion>
						{lvScoreList.map(item => (
							<li key={item} style={{ marginLeft: `${item}%` }}></li>
						))}
					</Divsion>
				</Tooltip>
			</Progress>

			<LvScore>
				{lvScoreList.map(item => (
					<li key={item} style={{ marginLeft: `${item}%` }}>
						{item}
					</li>
				))}
			</LvScore>
		</BarWrapper>
	);
}
