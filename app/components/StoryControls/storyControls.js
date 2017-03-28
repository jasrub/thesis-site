import React, { PropTypes } from 'react';
import Radium from 'radium';
import Controls from 'components/Controls/Controls';


let styles;

export const StoryControls = React.createClass({
    propTypes: {
        story:PropTypes.object,
        descriptorClicked:PropTypes.func,
    },

    getInitialState() {
        return {
            values:{}}

    },

    componentWillMount() {
        this.setState({
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
        })
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
        return (
            <div>
                <Controls title={"Label As:"} filters={this.state.values} onFilterChange={this.handleValueChange}/>
                <div style={styles.buttonContainer}>
                <button style={styles.labelButton} onClick={()=>{}}>Label Now!</button>
                </div>

                <div style={styles.otherTopics}>
                    <div>This story is also related to:</div>
                {data.map((desc)=>{
                    const id = desc.descriptorId;
                    return (
                        <div style={styles.storyTopic(desc.score)} key={`descriptor-${id}`}
                             onClick={()=>this.props.descriptorClicked(id)}>{id}</div>)

                })}
                </div>


            </div>
        );
    }

});

export default Radium(StoryControls);

styles = {
    storyTopic:function(width){
        return{
        background:'rgba(100, 100, 100, 0.5)',
        borderRadius: '10px',
        margin:'0.7em 0',
        padding: '0.5em',
        cursor: 'pointer',
            width:width*100+'%',
    }},
    otherTopics:{
        padding:'2em 1em',
    },

    labelButton:{
        margin: '0 auto',
        background: '#ff8833',
        boxShadow:'none',
        border: 'none',
        borderRadius: '10px',
        padding:'1em',
        cursor:'pointer',

    },
    buttonContainer: {
        textAlign:'center',
    }


};
