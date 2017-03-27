import React, { PropTypes } from 'react';
import Radium from 'radium';
import {Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, ResponsiveContainer} from 'recharts';

let styles;

export const RadarCharts = React.createClass({
    propTypes: {
        sources:PropTypes.object,
        bySourceData: PropTypes.func,
    },

    radarData() {
        const topics = [
            "politics and government",
            "finances",
            "medicine and health",
            "law and legislation",
            "athletics and sports",
            "computers and the internet",
            "education and schools",
        ];
        const sources = this.props.sources;
        const result ={};
        Object.keys(sources).forEach((source)=>{
            result[source] = {'total':sources[source], data:[]}
        });
        topics.forEach((topic)=>{
            const topicData = this.props.bySourceData(topic);
            Object.keys(topicData).forEach((sourceName)=>{
                const obj = {"subject": topic}
                obj.count = topicData[sourceName].length;
                obj.percent = topicData[sourceName].length/result[sourceName].total*100;
                result[sourceName].data.push(obj)
            })
        });
        return result;
    },

    render() {
        const data = this.radarData();
        return (
            <div style={styles.chartsContainer}>

                {Object.keys(data).map((source)=>{
                return (
                    <div key={source} style={styles.radar}>
                        <div>{source}</div>
                        <ResponsiveContainer width="100%" aspect={1}>
                         <RadarChart data={data[source].data}>
                            <Radar name={source} dataKey="percent" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                             <PolarGrid gridType="polygon"/>
                             <PolarAngleAxis dataKey="subject" axisLineType="circle" tick={{fill:'white'}}/>
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
    }



};




// {source1: [{subject: , count: 40% }, {subject:, count: 32%}], source2:{...
