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
                         <RadarChart data={data[source].data}>
                            <Radar name={source} dataKey="percent" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                             <PolarGrid gridType="polygon" />
                             <PolarAngleAxis dataKey="subject" axisLineType="circle" tick={{fill:'white', className:'tick'}}/>
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
        width: '25%',
        //padding: '2em',
        textAlign: 'center',
        display: 'inline-block',
    },
    chartsContainer: {
        textAlign: 'center',
    },
    sourceName: {
        fontWeight: 'bold',
        fontSize: '1.2em',
    }



};




// {source1: [{subject: , count: 40% }, {subject:, count: 32%}], source2:{...
