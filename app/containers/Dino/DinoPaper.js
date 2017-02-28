import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Slider, Button } from '@blueprintjs/core';
import Textarea from 'react-textarea-autosize';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DinoFigure from './DinoFigure';

let styles;

export const DinoPaper = React.createClass({
	propTypes: {
		onComplete: PropTypes.func,
		onChange: PropTypes.func,
	},

	getInitialState() {
		return {
			reviewContent: '',
			reviewRating: undefined,
			width: 400,
			margin: 0,
			offsets: [
				3,
				3,
				4,
				5,
				5,
				8,
			],
			colors: [
				'#8884d8',
				'#82ca9d',
				'#a2ca9d',
				'#822a9d',
				'#82ca2d',
				'#222a9d',
			],
			data: [ 
				[
					{ age: 0, circumference: 104 },
					{ age: 1, circumference: 112 },
					{ age: 2, circumference: 119 },
					{ age: 3, circumference: 126 },
					{ age: 4, circumference: 134 },
					{ age: 5, circumference: 143 },
					{ age: 6, circumference: 153 },
					{ age: 7, circumference: 158 },
					{ age: 8, circumference: 162 },
					{ age: 9, circumference: 165 },
					{ age: 10, circumference: 190 },
				],	
				[
					{ age: 0, circumference: 110 },
					{ age: 1, circumference: 113 },
					{ age: 2, circumference: 120 },
					{ age: 3, circumference: 125 },
				],	
				[
					{ age: 0, circumference: 138 },
					{ age: 1, circumference: 144 },
					{ age: 2, circumference: 146 },
					{ age: 3, circumference: 153 },
				],
				[
					{ age: 0, circumference: 130 },
					{ age: 1, circumference: 158 },
					{ age: 2, circumference: 171 },
					{ age: 3, circumference: 182 },
					{ age: 4, circumference: 209 },
				],
				[
					{ age: 0, circumference: 135 },
					{ age: 1, circumference: 152 },
					{ age: 2, circumference: 163 },
					{ age: 3, circumference: 202 },
					{ age: 4, circumference: 260 },
					{ age: 5, circumference: 262 },
					{ age: 6, circumference: 279 },
					{ age: 7, circumference: 286 },
				],
				[
					{ age: 0, circumference: 172 },
					{ age: 1, circumference: 235 },
					{ age: 2, circumference: 265 },
					{ age: 3, circumference: 274 },
					{ age: 4, circumference: 335 },
					{ age: 5, circumference: 338 },
				],
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
		let margin = (element.offsetWidth - 800) / 2 + 20; 
		this.setState({ 
			width: width,
			margin: margin
		});	
		
	},

	sliderUpdate: function(index, value) {
		const offsets = this.state.offsets;
		offsets[index] = Math.floor(value * 10) / 10;
		this.setState({ offsets: offsets });
	},

	render() {

		return (
			<div style={styles.container}>
				<h1>Paper Review</h1>

				<div className={'pt-card pt-elevation-2 article-body'} style={styles.paper}>
					<h2 style={styles.header}>Assessing Growth Patterns of the Jurassic Theropod Dinosaur Allosaurus</h2>
					<h3 style={styles.header}>Abstract</h3>
					<p style={styles.p}>Allosaurus is one of the most common Mesozoic theropod dinosaurs. We present a histological analysis to assess its growth strategy and ontogenetic limbbone scaling. Based on an ontogenetic series of humeral, ulnar, femoral, and tibial sections of bone, we estimate the ages of the largest individuals in the sample to be between 13–19 years. Growth curve reconstruction suggests that maximum growth occurred at 15 years, when body mass increased 148 kg/year. Based on larger bones of Allosaurus, we estimate an upper age limit of between 22–28 years of age, which is similar to preliminary data for other large theropods. </p>
					<h3 style={styles.header}>Introduction</h3>
					
					<p style={styles.p}>
						The growth dynamics of some theropod dinosaursare well documented. Over the past decade, histo-logical studies of bones have estimated growth dy-namics for coelophysoids (Chinsamy, 1990; Padianet al., 2004), tyrannosaurids, and livingavians. Those and other studies suggest thatsmall basal dinosaur taxa (e.g., Psittacosaurus, Mas-sospondylus, Scutellosaurus, and Orodromeus) grewat rates comparable to or exceeding rates in livingreptiles and marsupials (Erickson and Tumanova,2000; Erickson et al., 2001; Padian et al., 2001,2004), whereas large derived taxa (e.g., sauropods,hadrosaurids, tyrannosaurids, and ceratopsids)grew at least as rapidly as living birds and placentalmammals.Changes in size as well as in body proportionaccompany growth. For example, the femora of thelarge to gigantic tyrannosaurids lengthen more rap-idly than do the humeri, ulnae, and tibiae (Russell,1970; Currie, 2003). Such ontogenetic changes inlimb bone proportions have implications on locomo-tion: smaller and younger tyrannosaurids probablyran faster than larger and older ones (Hutchinsonand Garcia, 2002).
					</p>

					<h3 style={styles.header}>Methods</h3>
					<p style={styles.p}>A total of six humeri, ﬁve ulnae, six femora, and three tibiae ofAllosaurus (Marsh, 1877) was selected for histological analysis(Table 1). Those disarticulated limb bones came from the CLDQin Utah and were collected by crews from the University of Utah,Salt Lake City, UT (UUVP) (Madsen, 1976). The bones representa range of ontogenetic stages available at CLDQ from juveniles tosubadults. Our histological sample does not provide robust onto-genetic scaling relationships between bone length and circumfer-ence, so we also measured CLDQ specimens currently stored atUUVP and Dinosaur National Monument (DINO) in Vernal, UT,as well as non-CLDQ specimens at the American Museum ofNatural History (AMNH) in New York City and Brigham YoungUniversity (BYUVP) in Provo, UT (Appendix). The additionallimb bones not only increase the statistical power of our analyses,but also allow us to characterize growth of the species.Before sectioning, bone lengths and midshaft circumferenceswere measured. Because length as measured along the outercurve (Madsen, 1976) produces a measurement that is ⬃10%larger and not directly comparable with measurements of thero-pods in other studies (Table 2), we measured length of femora,humeri, and tibiae as the maximum linear distance that isroughly parallel to midshaft. </p>

					<h3 style={styles.header}>Estimation of Age and Growth Curve</h3>
					<p style={styles.p}>Periosteal and LAG circumferences were measured by the pe-rimeter function in NIH ImageJ (NIH, Bethesda, MD). We preferto measure circumference because 1) estimates of circumferencebased on diameters are underestimates when sections are irreg-ular in shape; 2) circumference is used to predict body mass(Anderson et al., 1985); and 3) circumference is easily comparableacross sections of a given bone series. In Excel (Microsoft, Red-mond, WA), LAG circumferences were visually aligned acrosseach bone series and the circumferences of missing LAGs wereretrocalculated using a signiﬁcant power relationship. Thatpower relationship predicts rapid growth early in ontogeny fol-lowed by slower growth during late ontogeny. Although somevaranids can show rapid growth either during early or late on-togeny (de Buffre´nil and Castanet, 2000), all assessed dinosaurtaxa show higher periosteal growth rates earlier rather than laterin ontogeny (Chinsamy, 1993; Curry, 1999; Horner et al., 1999,2000; Erickson and Tumanova, 2000; Padian et al., 2004; Erick-son et al., 2004; Horner and Padian, 2004). </p>

					<h3 style={styles.header}>Results</h3>
					<DinoFigure data={this.state.data} offsets={this.state.offsets} />

					{(true || this.props.mode === 1) &&
						<div style={{ maxWidth: '400px', margin: '0 auto' }}>
							<table style={{ width: '100%', }}>
								<tbody>
									{this.state.offsets.map((item, index)=> {
										return (
											<tr key={`slider-${index}`} style={{ paddingBottom: '1em' }}>
												<td style={{ width: '1%', whiteSpace: 'nowrap', verticalAlign: 'top', paddingRight: '1em' }}>Femur {index + 1} offset:</td>
												<td>
													<Slider min={0} max={20} stepSize={0.1} labelStepSize={5} value={item} onChange={this.sliderUpdate.bind(this, index)} />	
												</td>
												
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					}


					<h3 style={styles.header}>Conclusions</h3>
					<p style={styles.p}>Previous studies of the long bone histology of largedinosaurs report ﬁbrolamellar bony tissue (Reid,1996; Curry, 1999; Horner et al., 1999, 2000; Hornerand Padian, 2004). Our histological data from sec-tions of Allosaurus humeri, ulnae, femora, andtibiae are consistent with previous observations.Furthermore, as in large hadrosaurids and Tyran-nosaurus rex (Horner et al., 1999, 2000; Horner andPadian, 2004).</p>
					<p style={styles.p}>The growth dynamics of Allosaurus are similar tothose in equally large theropods. Similarities ingrowth strategy suggest that the evolution of gigan-tism in those respective lineages might involve sim-ilar increases in maximum growth rate. Further-more, similarities in the ontogenetic scaling of limbbones and phylogenetic optimization suggest thatlarge theropods independently evolved reduced hu-meral, ulnar, and tibial lengths by a phyletic reduc-tion in longitudinal growth relative to the femur.We cannot directly reject or support the hypothe-sis of indeterminate growth in Allosaurus. </p>
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


				<button className={'pt-button pt-intent-primary'} onClick={this.props.onComplete}>Finish Review and go to Final step</button>
			</div>
		);
	}

});

export default Radium(DinoPaper);

styles = {
	container: {
		maxWidth: '800px',
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
	},
	paper: {
		marginBottom: '3em',
	}
};
