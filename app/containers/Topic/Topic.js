import React, { PropTypes } from 'react';
import Radium from 'radium';
import Controls from 'components/Controls/Controls';
import Descriptor from 'components/Descriptor/Descriptor';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

let styles;

export const Topic = React.createClass ({
    PropTypes: {
        descriptor: PropTypes.object,
        loading: PropTypes.boolean,
        stories: PropTypes.object,
    },

    bySourceData() {
        const stories = this.props.stories;
        return this.props.descriptor.DescriptorsResults.reduce(function(rv, x) {
            (rv[stories[x.storyId].mediaName] = rv[stories[x.storyId].mediaName] || []).push(x);
            return rv;
        }, {});
    },

    render() {
        const desc = this.props.descriptor;
        const related = desc.related || [];
        const storiesBySource = this.bySourceData() || [];
        const bySourceData = Object.keys(storiesBySource).map((source)=>{
            return {'name':source, 'size':storiesBySource[source].length}
        });
        //const connections = desc.connections;
        return(
            <div style={styles.container}>
                <Descriptor
                    key={desc.id}
                    descriptor={desc}
                    stories={this.props.stories}
                    color='#b0c6cb'/>

                <div>
                    <div>{desc.numStories} Stories</div>
                    <ul>
                        {desc.DescriptorsResults.slice(0,15).map((result, idx)=>{
                            const story = this.props.stories[result.storyId];
                            return (
                                <li key={idx}> <a href={story.url} target="_blank">
                                    <span dangerouslySetInnerHTML={{__html: story.title}} /></a>
                                </li>

                            )})}
                    </ul>
                </div>

                <div>
                    <h3>Related Topics</h3>
                {related.map((rel)=>{
                    return <div key={rel.dest}>{rel.dest}</div>
                })

                }
                </div>

                <div> <h3> By Source</h3>
                <BarChart width={1000} height={300} data={bySourceData}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name" label={<AxisLabel axisType='yAxis'/>}/>
                    <Bar dataKey="size" fill="#8884d8" />
                    <Tooltip/>
                </BarChart>
                </div>
            </div>)

    }

});

styles = {
    container: {
        padding: '2em',
    },
};

const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
    const isVert = axisType === 'yAxis';
    const cx = isVert ? x : x + (width / 2);
    const cy = isVert ? (height / 2) + y : y + height + 10;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
        <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
            {children}
        </text>
    );
};


export default Radium(Topic);

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};