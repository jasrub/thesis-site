import React, { PropTypes } from 'react';
import Radium from 'radium';
import Controls from 'components/Controls/Controls';
import {BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

let styles;

export const StoryControls = React.createClass({
    propTypes: {
        story:PropTypes.object,
        descriptorClicked:PropTypes.func,
    },

    getInitialState() {
        return {
            values: {
                leftRight: {
                    val: this.props.story.leftRight,
                    label: "Left / Right",
                    leftLabel: "Left",
                    rightLabel: "Right"
                },
                posNeg: {
                    val: this.props.story.posNeg,
                    label: "Positive / Negative",
                    leftLabel: "Positive",
                    rightLabel: "Negative"
                },
                trend: {
                    val:this.props.story.trend,
                    label: "Trending / Ongoing",
                    leftLabel: "Trending",
                    rightLabel: "Ongoing"
                },
                cont: {
                    val: this.props.story.cont,
                    label: "Controversial / Safe",
                    leftLabel: "Controversial",
                    rightLabel: "Safe"
                },

            }
        }
    },

    handleValueChange(filter, isToggle, value) {
        const newValues = this.state.values;
        if (isToggle) {
            newValues[filter].on = !newValues[filter].on;
        }
        else {
            newValues[filter].val = value;
        }
        this.setState({
            values: newValues,
        });
    },

    render() {
        const data = this.props.story.DescriptorsResults;
        console.log(data);
        return (
            <div>
                <div> Related To</div>
                {data.map((desc)=>(<div onClick={()=>this.props.descriptorClicked(desc.descriptorId)}>{desc.descriptorId}</div>))}

                <Controls title={"Label As:"} filters={this.state.values} onFilterChange={this.handleValueChange}/>
            </div>
        );
    }

});

export default Radium(StoryControls);

styles = {


};
