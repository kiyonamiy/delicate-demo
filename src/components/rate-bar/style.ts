import styled, { keyframes, Keyframes } from 'styled-components';

// 三部分百分比
const levelHeight = '45%';
const progressHeight = '0.7rem';
const lvScoreHeight = '45%';

// 上下等级数字、积分偏移
const levelLeftOffset = '-0.3rem';

// 各种颜色
const themeLightColor = '#E3F2FD';
const themeColor = '#1976D2';
const levelBgColor = '#c4c6cc';
const progressBgColor = '#dcdfe6';

// 进度条动画
const progressAnimationTime = '2s';
const progressIn = (nowScore: number): Keyframes => keyframes`
    0% {
        width: 0;
    }
    100% {
        width: ${nowScore}%;
    }
`;

// 已过等级动画
const beforeLevelAnimationTime = '3s';
const beforeLevelIn = keyframes`
    0% {
        color: ${levelBgColor};
    }
    100% {
        color: ${themeColor};
    }
`;
// 激活等级动画
const nowLevelAnimationTime = '3s';
const nowLevelIn = keyframes`
    0% {
        background: #fff;
    }
    100% {
        color: #fff;
        background: ${themeColor};
    }
`;

// 底
export const BarWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 9rem;

	ol,
	ul {
		list-style: none;
	}
`;

// 上层等级
export const Level = styled.ul`
	position: absolute;
	top: 0;
	left: ${levelLeftOffset};
	height: ${levelHeight};
	width: 100%;
	color: ${levelBgColor};
	font-size: 1.4rem;
	font-family: 'Microsoft YaHei';
	li {
		position: absolute;
		bottom: 15%;
	}
	li.before {
		animation: ${beforeLevelIn} ${beforeLevelAnimationTime} forwards;
	}
	li.now {
		bottom: 20%;
		width: 1.8rem;
		height: 1.8rem;
		line-height: 1.8rem;
		border-radius: 1.8rem;
		text-align: center;
		animation: ${nowLevelIn} ${nowLevelAnimationTime} forwards;
	}
`;

// 中层进度条外包
export const Progress = styled.div`
	position: absolute;
	top: ${levelHeight};
	left: 0;
	border-radius: ${progressHeight};
	height: ${progressHeight};
	width: 100%;
	background: ${progressBgColor};
`;

// 实际进度条
export const Filler = styled.div`
	position: absolute;
	border-radius: ${progressHeight};
	height: 100%;
	background: linear-gradient(to right, ${themeLightColor}, ${themeColor});
	animation: ${(props: { nowScore: number }): Keyframes =>
			progressIn(props.nowScore)}
		${progressAnimationTime} ease-out forwards;
`;

// 进度条分级
export const Divsion = styled.ul`
	position: absolute;
	height: 100%;
	width: 100%;
	li {
		position: absolute;
		width: 1px;
		height: 100%;
		background: #fff;
	}
	li:nth-child(1) {
		display: none;
	}
`;

// 底层等级积分
export const LvScore = styled.ul`
	position: absolute;
	bottom: 0;
	left: ${levelLeftOffset};
	height: ${lvScoreHeight};
	width: 100%;
	color: ${levelBgColor};
	font-size: 0.7rem;
	font-family: 'Microsoft YaHei';
	li {
		position: absolute;
		top: 15%;
	}
`;
