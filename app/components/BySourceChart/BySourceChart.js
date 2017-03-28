import React, { PropTypes } from 'react';
import Radium from 'radium';
import {BarChart, Bar, XAxis, Cell, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

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
            <ResponsiveContainer  width={'100%'} aspect={5.0/1.8}>
                <BarChart  data={data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <Bar dataKey="size" fill="rgba(0, 167, 126, 0.6)" isAnimationActive={isAnimationActive}>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`}
                                      fill={data[index].name === selectedSource ? 'rgba(255, 125, 58, 0.8)' : 'rgba(0, 167, 126, 0.6)' }/>
                            ))
                        }
                    </Bar>
                    <Tooltip formatter={(val)=>Math.round(val*100)+'%'}
                             labelStyle={{color:'#000', fontWeight:'bold'}}
                             wrapperStyle={{background:'#fff'}}
                             cursor={{fill: 'red', fillOpacity: 0.05}}/>
                </BarChart>
            </ResponsiveContainer>
        );
    }

});

export default Radium(BySourceChart);

styles = {


};
