import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Slider, Button } from '@blueprintjs/core';
import Textarea from 'react-textarea-autosize';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DinoFigure from './DinoFigure';

let styles;

const defaultOffsets = [
	2,
	3,
	4,
	10,
	10,
	12,
];
export const DinoPaper = React.createClass({
	propTypes: {
		onComplete: PropTypes.func,
		onChange: PropTypes.func,
	},

	getInitialState() {
		return {
			reviewContent: '',
			reviewRating: undefined,
			error: undefined,
			offsets: defaultOffsets,
			data: [ 
				[
					{ age: 0, circumference: 104 },
					{ age: 1, circumference: 116 },
					{ age: 2, circumference: 132 },
					{ age: 3, circumference: 148 },
					{ age: 4, circumference: 165 },
					{ age: 5, circumference: 174 },
					{ age: 6, circumference: 178 },
					{ age: 7, circumference: 180 },
					{ age: 8, circumference: 181 },
					{ age: 9, circumference: 182 },
					{ age: 10, circumference: 184 },
				],	
				[
					{ age: 0, circumference: 118 },
					{ age: 1, circumference: 124 },
					{ age: 2, circumference: 141 },
					{ age: 3, circumference: 164 },
				],	
				[
					{ age: 0, circumference: 141 },
					{ age: 1, circumference: 152 },
					{ age: 2, circumference: 174 },
					{ age: 3, circumference: 175 },
				],
				[
					{ age: 0, circumference: 168 },
					{ age: 1, circumference: 184 },
					{ age: 2, circumference: 200 },
					{ age: 3, circumference: 216 },
					{ age: 4, circumference: 221 },
				],
				[
					{ age: 0, circumference: 184 },
					{ age: 1, circumference: 200 },
					{ age: 2, circumference: 219 },
					{ age: 3, circumference: 224 },
					{ age: 4, circumference: 230 },
					{ age: 5, circumference: 234 },
					{ age: 6, circumference: 232 },
				],
				[
					{ age: 0, circumference: 202 },
					{ age: 1, circumference: 221 },
					{ age: 2, circumference: 227 },
					{ age: 3, circumference: 232 },
					{ age: 4, circumference: 233 },
					{ age: 5, circumference: 235 },
				],
			],
			
		};
	},

	submitReview: function() {
		if (!this.state.reviewContent) { return this.setState({ error: 'A review is required' }); }
		if (this.state.reviewRating === undefined) { return this.setState({ error: 'A review score is required' }); }
		
		this.setState({ error: undefined });
		return this.props.onComplete({
			reviewContent: this.state.reviewContent,
			reviewRating: this.state.reviewRating,
		});
	},

	sliderUpdate: function(index, value) {
		const offsets = [...this.state.offsets];
		offsets[index] = Math.floor(value * 10) / 10;
		this.setState({ offsets: offsets });
	},

	render() {
		const tableNames = ['Femur 1', 'Femur 2', 'Femur 3', 'Femur 4', 'Femur 5', 'Femur 6'];
		const tableSites = ['CLDQ','CLDQ','CLDQ','Provincial Park','Provincial Park','Provincial Park'];

		return (
			<div style={styles.container}>
				<h1>Paper Review</h1>
				<p>Please review the following work and write a few sentences containing you review in the form at the bottom.</p>

				<div className={'pt-card pt-elevation-2 article-body'} style={styles.paper}>
					<h2 style={styles.header}>Assessing Growth Patterns of the Jurassic Theropod Dinosaur Allosaurus</h2>
					
					<h3 style={styles.header}>Introduction</h3>
					<p style={styles.p}>Allosaurus is one of the most common Mesozoic theropod dinosaurs. We present an analysis to understand its growth and bone scaling. Based on several sections of bones found in archealogical digs we present a growth curve reconstruction. Growth curve reconstruction suggests that maximum growth occurred at both 5 and 15 years, when body mass increased 148 kg/year.</p>
					
					
					<h3 style={styles.header}>Methods</h3>
					<p style={styles.p}>A total of six femur bones of Allosaurus were selected for this study. These bones came from the CLDQ in Utah and the Dinosaur Provincial Park in Alberta, Canada. Before sectioning, bone lengths and circumferences were measured. Because length as measured along the outer curve produces a measurement that is 10% larger and not directly comparable with measurements of theropods in other studies, we measured length of femora as the maximum linear distance that is roughly parallel to midshaft. Circumferences were measured at 60% of the proximodistal length in the femur to avoid major regions of muscle insertion. </p>

					<h3 style={styles.header}>Estimation of Age and Growth Curve</h3>
					<p style={styles.p}>We prefer to measure circumference because 1) estimates of circumference based on diameters are underestimates when sections are irregular in shape; 2) circumference is used to predict body mass and 3) circumference is easily comparable across sections of a given bone series. In an Excel spreadsheet, bone circumferences were visually aligned across each bone series and the circumferences of missing bones were retrocalculated using a signiﬁcant power relationship. Age estimates are presented in the table below. Estimates of body mass were calculated using both an inter-speciﬁc and a developmental relationship between body mass and femoral circumference. Maximum growth rate was calculated by ﬁnding the derivative of each regression equation at the inﬂection point.</p>

					<table style={styles.table}>
						<thead style={styles.thead}>
							<tr>
								<td>Bone</td>
								<td>Excavation Site</td>
								<td>Measured Circumferences (one per year)</td>
								<td>Offset</td>
							</tr>
						</thead>
						<tbody>
							{tableNames.map((name, index)=> {
								return (
									<tr key={`tablerow-${index}`}>
										<td>{name}</td>
										<td>{tableSites[index]}</td>
										<td>{this.state.data[index].reduce((previous, current)=>{
											return [...previous, current.circumference];
										}, []).join(', ')}</td>
										<td>{defaultOffsets[index]}</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<p style={styles.p}>The results of these calculations and estimates are plotted below. As shown in the graph, we discover a novel growth pattern that we believe to be unique to the Allosaurus and the first discovery of its kind. Contrary to current mammal and reptile growth patterns, Allosaurus appear to have a second growth spurt later in life. In the graph below, you can see the rapid rise in circumference of femur bones after stabilizing between the age of 10-12 years. </p>

					<div style={{ position: 'relative' }}>
						{(true || this.props.mode === 1) &&
							<div style={{ position: 'absolute', width: '200px', right: -30, }}>
								<table style={{ width: '100%', }}>
									<tbody>
										{this.state.offsets.map((item, index)=> {
											return (
												<tr key={`slider-${index}`} style={{ paddingBottom: '0.5em' }}>
													<td style={{ paddingTop: 0, paddingBottom: 0 }}>
														<div style={{ fontSize: '0.85em', }}>Femur {index + 1} offset</div>
														<Slider min={0} max={20} stepSize={0.1} labelStepSize={5} value={item} onChange={this.sliderUpdate.bind(this, index)} />	
													</td>
													
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						}
						<DinoFigure data={this.state.data} offsets={this.state.offsets} />
					</div>

					<h3 style={styles.header}>Conclusions</h3>
					<p style={styles.p}>Previous studies of the long bone growth of large dinosaurs report slowed growth patterns. Our data from sections of Allosaurus femora are novel and provide a new perspective on dinosaur growth. We theorize that this novel growth pattern may be part of the mechanism that led to Mesosoic dinosaurs being so much larger than their modern day reptile and bird counterparts.</p>
					<p style={styles.p}>If the growth dynamics of Allosaurus are similar to those in equally large theropods, this may explain the variation of sizes that existed between closely related species. Similarities in growth strategy suggest that the evolution of gigantism in those respective lineages might involve similar increases in maximum growth rate. We cannot directly reject or support the hypothesis of unlimited growth in Allosaurus in the situation where this repeated growth spurt continued to cycle throughout the duration of their lives. </p>
				</div>



				<label>
					Review the work. Please write a few short sentences containing your review and feedback on the work.
					<Textarea value={this.state.reviewContent} onChange={evt => this.setState({ reviewContent: evt.target.value })} style={styles.input} />
				</label>

				<div style={styles.inputBlock}>
					<div style={styles.label}>Review Rating</div>

					<div className={'pt-button-group pt-fill'} style={{ paddingTop: '1em' }}>
						<Button key={'reviewRating-0'} text={0} onClick={evt => this.setState({ reviewRating: 0 })} className={this.state.reviewRating === 0 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-1'} text={1} onClick={evt => this.setState({ reviewRating: 1 })} className={this.state.reviewRating === 1 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-2'} text={2} onClick={evt => this.setState({ reviewRating: 2 })} className={this.state.reviewRating === 2 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-3'} text={3} onClick={evt => this.setState({ reviewRating: 3 })} className={this.state.reviewRating === 3 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-4'} text={4} onClick={evt => this.setState({ reviewRating: 4 })} className={this.state.reviewRating === 4 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-5'} text={5} onClick={evt => this.setState({ reviewRating: 5 })} className={this.state.reviewRating === 5 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-6'} text={6} onClick={evt => this.setState({ reviewRating: 6 })} className={this.state.reviewRating === 6 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-7'} text={7} onClick={evt => this.setState({ reviewRating: 7 })} className={this.state.reviewRating === 7 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-8'} text={8} onClick={evt => this.setState({ reviewRating: 8 })} className={this.state.reviewRating === 8 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-9'} text={9} onClick={evt => this.setState({ reviewRating: 9 })} className={this.state.reviewRating === 9 ? 'pt-active' : ''}/>
						<Button key={'reviewRating-10'} text={10} onClick={evt => this.setState({ reviewRating: 10 })} className={this.state.reviewRating === 10 ? 'pt-active' : ''}/>
					</div>

					<div style={{ width: 'calc(100% / 11 * 4 - 2px', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#f3f3f4'}}>0-3 = Reject</div>
					<div style={{ width: 'calc(100% / 11 * 3', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#d3d3d4'}}>4-6 = Request Revisions</div>
					<div style={{ width: 'calc(100% / 11 * 4', display: 'inline-block', textAlign: 'center', padding: '4em 0em 1em', marginTop: '-3em', backgroundColor: '#f3f3f4'}}>7-10 = Accept</div>
				</div>

				<button className={'pt-button pt-intent-primary'} onClick={this.submitReview}>Finish Review and go to Final step</button>
				{!!this.state.error &&
					<div className={'pt-callout pt-intent-danger'}>
						{this.state.error}
					</div>
				}
			</div>
		);
	}

});

export default Radium(DinoPaper);

styles = {
	container: {
		width: '800px',
		margin: '0 auto',
	},
	text: {
		lineHeight: '1.6',
		fontSize: '1.2em',
		margin: '1em 0em',
	},
	inputBlock: {
		display: 'block',
		margin: '2em 0em',
	},
	input: {
		width: '100%',
		minHeight: '3em',
		resize: 'none',
	},
	paper: {
		margin: '2em 0em 3em',
	},
	table: {
		width: '100%',
	},
	thead: {
		fontWeight: 'bold',
	},
};
