import React, { PropTypes } from 'react';
import Radium from 'radium';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';


export const DinoFigure = React.createClass({
	propTypes: {
		data: PropTypes.array,
		offsets: PropTypes.array,
	},

	getInitialState() {
		return {
			colors: [
				'#c0392b',
				'#f39c12',
				'#16a085',
				'#2980b9',
				'#8e44ad',
				'#34495e',
			],
		};
	},

	shouldComponentUpdate(nextProps) {
		const oldOffsets = this.props.offsets.join(',');
		const newOffsets = nextProps.offsets.join(',');
		if (oldOffsets === newOffsets) { return false; }
		return true;
	},

	render() {
		return (
			<div id={'graph-wrapper'}>
				<h6 style={{ textAlign: 'center', position: 'relative', left: '-100px' }}>Age vs Femur Circumference</h6>
					<ScatterChart width={560} height={400} margin={{ top: 20, left: 0, right: 50, bottom: 20 }}>
						<YAxis dataKey={'circumference'} name='circumference' unit='mm' label={'mm'} domain={['dataMin - 4', 'dataMax + 10']} />
						<XAxis dataKey={'age'} name='Age' unit='years' label={'Years'} domain={['dataMin', 'dataMax + 1']} />
						<CartesianGrid />
						<Legend />
						{this.props.data.map((data, index)=> {
							const outputData = data.map((value)=> {
								const offsets = this.props.offsets;
								return {
									age: value.age + offsets[index],
									circumference: value.circumference
								};
							});
							return <Scatter key={`plot-${index}`} name={`Femur ${index + 1}`} data={outputData} fill={this.state.colors[index]} line={{ strokeWidth: 3 }} />;
						})}
					</ScatterChart>
			</div>
		);
	}

});

export default Radium(DinoFigure);

