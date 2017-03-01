import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Slider, Button } from '@blueprintjs/core';
import Textarea from 'react-textarea-autosize';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export const DinoFigure = React.createClass({
	propTypes: {
		data: PropTypes.array,
		offsets: PropTypes.array,
	},

	getInitialState() {
		return {
			colors: [
				'#8884d8',
				'#82ca9d',
				'#a2ca9d',
				'#822a9d',
				'#82ca2d',
				'#222a9d',
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
						{/*<Tooltip cursor={{strokeDasharray: '3 3'}}/>*/}
						<Legend />
						{this.props.data.map((data, index)=> {
							const outputData = data.map((value)=> {
								let offsets = this.props.offsets;
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

