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
			width: 400,
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

	componentDidMount() {
		window.addEventListener('resize', this.setWidth);
		this.setWidth();

	},
	componentWillUnmount() {
		window.removeEventListener('resize', this.setWidth);
	},

	setWidth: function() {
		const element = document.getElementById('graph-wrapper');
		if (!element) { return false; }
		let width = Math.min(element.offsetWidth, 800);
		this.setState({ 
			width: width,
		});	
		
	},

	render() {

		return (
			<div id={'graph-wrapper'}>
				<h6 style={{ textAlign: 'center' }}>Age vs Femur Circumference</h6>
					<ScatterChart width={this.state.width} height={this.state.width / 1.5} margin={{ top: 20, left: 0, right: 35, bottom: 20 }}>
						<XAxis dataKey={'circumference'} name='circumference' unit='mm' label={'mm'} domain={['dataMin - 4', 'dataMax + 10']} />
						<YAxis dataKey={'age'} name='Age' unit='years' label={'Years'} domain={['dataMin', 'dataMax + 1']} />
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

