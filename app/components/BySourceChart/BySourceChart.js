import React, { PropTypes } from 'react';
import Radium from 'radium';
import {BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, ResponsiveContainer, Label} from 'recharts';

let styles;

export const BySourceChart = React.createClass({
    propTypes: {
        bySourceData:PropTypes.array,
        selectedSource: PropTypes.string,
    },

    getInitialState() {
        return {
            animate: true,
        }
    },
    componentWillReceiveProps(nextProps) {
        let animate = false;
        if (this.props.descriptorId!==nextProps.descriptorId) {
            animate=true;
        }
        this.setState({
            animate:animate
        });

    },

    handleBarClick(data, index) {
        this.props.onSourceClick(this.props.bySourceData[index].name)
    },

    render() {
        const data = this.props.bySourceData;
        const selectedSource = this.props.selectedSource;
        return (
            <div>
            <ResponsiveContainer  width={'100%'} aspect={5.0/1.2}>
                <BarChart  data={data}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <XAxis dataKey="name" hide={true}/>
                    <YAxis type="number" dataKey="size" hide={true} domain={[0,1]}/>
                    <Bar dataKey="size" fill="rgba(0, 167, 126, 0.4)"
                         isAnimationActive={this.state.animate}
                         verticalAnchor="middle" label={<CustomizedAxisTick onClick={this.handleBarClick}/> }
                         onClick={this.handleBarClick}
                    >
                        {
                            data.map((entry, index) => {

                                const isSelected = data[index].name === selectedSource;
                                return (
                                <Cell  key={`cell-${index}`} cursor="pointer"
                                           fill= {isSelected? '#9C5586': 'rgba(255, 125, 58, 0.8)'}
                                      stroke = {isSelected?"white": "none"}
                                       strokeWidth = {isSelected?1: 0}
                                />)
                            })

                        }
                    </Bar>
                    <Tooltip
                        content={<CustomTooltip/>}
                        cursor={{fill:'#fff', opacity: '0.2'}}
                    />
                </BarChart>
            </ResponsiveContainer>
            </div>
        );
    }

});

const CustomTooltip  = React.createClass({
    propTypes: {
        type: PropTypes.string,
        payload: PropTypes.array,
        label: PropTypes.string,
    },
    render() {
        const { active } = this.props;
        if (active) {
            const { payload, label } = this.props;
            return (
                <div style={styles.tooltip}>
                    <p style={styles.tooltipLabel}>{`${label}`}</p>
                    <p style={styles.tooltipValue}>{Math.round(payload[0].value*100)+'%'}</p>
                </div>
            );
        }

        return null;
    }
});

const CustomizedAxisTick = React.createClass({
    render () {
        const {x, y, fill, name, index, onClick} = this.props;

        return (
            <g transform={`translate(${x},${y})`} onClick={()=>onClick(null, index)} cursor="pointer">
                <text x={(-y+3)} y={0} dx={0} textAnchor="start" dominantBaseline="middle" fill="#fff" transform="rotate(90)" fontSize="0.73vw">{name}</text>
            </g>
        );
    }
});

export default Radium(BySourceChart);

styles = {
 tooltip:{
     background:'rgba(255, 255, 255, 0.8)',
     padding: '0.5em',
     borderRadius: '5px',
 },
 tooltipLabel:{
     color: '#000',
     fontWeight: 'bold',
 },
    tooltipValue: {
     color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'
    },

};
