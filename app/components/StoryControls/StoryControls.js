import React, { PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import Controls from 'components/Controls/Controls';
import { Position, Toaster } from "@blueprintjs/core";
import { postLabel } from './actions';


let styles;

export const StoryControls = React.createClass({
    propTypes: {
        story:PropTypes.object,
        descriptorClicked:PropTypes.func,
        storyControlsData: PropTypes.object,
        location: PropTypes.object,
        dispatch: PropTypes.func,
    },


    getInitialState() {
        return {
            values:{}}

    },

    componentWillMount() {
        this.setState({
            clicked: false,
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
                objective: {
                    val: this.props.story.objective,
                    label: "Objective / Subjective",
                    leftLabel: "Objective",
                    rightLabel: "Subjective"
                },
                trend: {
                    val:this.props.story.trend,
                    label: "Trending / Ongoing",
                    leftLabel: "Trending",
                    rightLabel: "Ongoing"
                },
            }
        })
    },

    handleValueChange(filter, value) {
        const newValues = this.state.values;
        newValues[filter].val = value;
        this.setState({
            values: newValues,
        });
    },

    addToast() {
        this.toaster.show({ message: "Thanks! Your labels were submitted!", timeout:2000 });
    },

    submitLabels() {
        this.addToast();
        this.setState({
                clicked: true
        });
        this.props.dispatch(postLabel(this.props.story, this.state.values))
        // send labels to api!!
    },

    render() {
        const data = this.props.story.DescriptorsResults;

        return (
            <div>
                <div style={styles.labelBox}>
                <Controls title={"Help the Algorithms Improve! How would you rate this story?"} filters={this.state.values} onFilterChange={this.handleValueChange}/>
                <div style={styles.buttonContainer}>
                    <button className={"label-button"}
                            onClick={this.submitLabels}
                            disabled={this.state.clicked}>Label Now</button>
                    <Toaster position={Position.BOTTOM_RIGHT} ref={(ref)=>(this.toaster=ref)}/>
                </div>
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

function mapStateToProps(state) {
    return {
        storyControlsData: state.storyControls.toJS(),
    };
}

export default connect(mapStateToProps)(Radium(StoryControls));


styles = {
    storyTopic:function(width){
        return{
            background:'rgba(100, 100, 100, 0.5)',
            borderRadius: '10px',
            margin:'0.7em 0',
            padding: '0.5em',
            cursor: 'pointer',
            width:Math.max(width, 0.2)*100+'%',
            fontSize: width<0.3?mapNum(width,0,0.3, 0.4, 0.9)+'em':'1em',
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
        color: '#fff',
        fontWeight: 'lighter',

    },
    buttonContainer: {
        textAlign:'center',
    },
    labelBox:{
        background:'rgba(10, 120, 103, 0.22)',
        border: '0.5px solid #064649',
        padding: '1em 0',
        borderRadius: '1%',
        boxShadow :'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }



};

function mapNum(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}