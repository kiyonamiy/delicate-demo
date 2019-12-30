import React from 'react';
import { Card } from 'antd';
import ResMap from './components/res-map';
import PathHistoryMap from './components/path-history-map';
import RateBar from './components/rate-bar';

import CoorDinateTransformation from './components/coordinate-transformation';

const App: React.FC = () => {
	return (
		<div>
			<PathHistoryMap />
			<CoorDinateTransformation />
			<ResMap />
			<Card title="评价等级条" hoverable style={{ padding: 30 }}>
				<RateBar nowScore={80} lvScoreList={[0, 40, 60, 75, 85, 100]} />
			</Card>
		</div>
	);
};

export default App;
