import React, { PropTypes } from 'react';
import Radium from 'radium';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

let styles;

export const BySourceChart = React.createClass({
    propTypes: {
        bySourceData:PropTypes.array
    },

    render() {
        return (
            <ResponsiveContainer  width={'100%'} aspect={5.0/3.0}>
                <BarChart  data={this.props.bySourceData}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <Bar dataKey="size" fill="rgba(0, 167, 126, 0.6)" />
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

