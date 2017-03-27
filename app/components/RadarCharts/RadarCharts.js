import React, { PropTypes } from 'react';
import Radium from 'radium';
import {Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, ResponsiveContainer} from 'recharts';

let styles;

export const RadarCharts = React.createClass({
    propTypes: {
        data:PropTypes.object,
    },


    render() {
        const data = this.props.data;

        return (
            <div style={styles.chartsContainer}>

                {Object.keys(data).map((source)=>{
                return (
                    <div key={source} style={styles.radar}>
                        <div style={styles.sourceName}>{source}</div>
                        <ResponsiveContainer width="100%" aspect={1} className="radarChart">
                         <RadarChart data={data[source].data} outerRadius="50%" cy="45%">
                            <Radar name={source} dataKey="percent" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                             <PolarGrid gridType="polygon" />
                             <PolarAngleAxis width={300} dataKey="subject" axisLineType="circle" tick={{style:styles.tickStyle, ScaleToFit:true}}/>
                         </RadarChart>
                        </ResponsiveContainer>
                    </div>

                )})}
            </div>
        );
    }

});

export default Radium(RadarCharts);

styles = {
    radar: {
        color: '#fff',
        width: '16%',
        textAlign: 'center',
        display: 'inline-block',
    },
    chartsContainer: {
        textAlign: 'left',
    },
    sourceName: {
        fontWeight: 'bold',
        fontSize: '1.2em',
    },
    tickStyle: {
        fill:'white',
        fontSize: '0.8em',
        width:'100%',



    }



};




// {source1: [{subject: , count: 40% }, {subject:, count: 32%}], source2:{...
