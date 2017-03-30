import React, { PropTypes } from 'react';
import Radium from 'radium';
import {BarChart, Bar, XAxis, Cell, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';

let styles;

export const BySourceChart = React.createClass({
    propTypes: {
        bySourceData:PropTypes.array,
        selectedSource: PropTypes.string,
    },

    render() {
        const data = this.props.bySourceData;
        const selectedSource = this.props.selectedSource;
        const isAnimationActive = !selectedSource;
        return (
            <div>
            <ResponsiveContainer  width={'100%'} aspect={5.0/1.2}>
                <BarChart  data={data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name" hide={true}/>
                    <Bar dataKey="size" fill="rgba(0, 167, 126, 0.6)" isAnimationActive={isAnimationActive} label={<CustomizedAxisTick/>}>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`}
                                      fill={data[index].name === selectedSource ? 'rgba(255, 125, 58, 0.8)' : 'rgba(0, 167, 126, 0.6)' }
                                />
                            ))
                        }
                    </Bar>
                    <Tooltip formatter={(val)=>Math.round(val*100)+'%'}
                             labelStyle={{color:'#000', fontWeight:'bold'}}
                             wrapperStyle={{background:'#fff'}}
                             cursor={{fill: '#fff', fillOpacity: 0.1}}/>
                </BarChart>
            </ResponsiveContainer>
            </div>
        );
    }

});

const CustomizedLabel = React.createClass({
    render () {
        const {x, y, stroke, value} = this.props;

        return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
    }
});
const CustomizedAxisTick = React.createClass({
    render () {
        const {x, y, fill, name} = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dx={-y} textAnchor="start" fill="#666" transform="rotate(90)" fontSize="0.5vw">{name}</text>
            </g>
        );
    }
});

export default Radium(BySourceChart);

styles = {


};
