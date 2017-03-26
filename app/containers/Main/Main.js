import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getDescriptors, getRelated, getStories, getStoryImage } from './actions';
import { connect } from 'react-redux';
import AppNav from 'components/AppNav/AppNav';
import Controls from 'components/Controls/Controls';
import TopDescriptors from 'containers/TopDescriptors/TopDescriptors';
import Topic from 'containers/Topic/Topic';
import {Spinner} from '@blueprintjs/core';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

let styles;

export const Main = React.createClass ({
    PropTypes: {
        descriptorsData: PropTypes.object,
        location: PropTypes.object,
        dispatch: PropTypes.func,
    },

    componentWillMount() {
        this.props.dispatch(getStories());
        this.props.dispatch(getDescriptors(this.state.filters));
    },

    getInitialState() {
        return {
            selected: false,
            selectedDescriptor: null,
            filters: {
                leftRight: {
                    on: false,
                    val: 2,
                    label: "Political Stance",
                    leftLabel: "Left",
                    rightLabel: "Right"
                },
                posNeg: {
                    on: false,
                    val: 2,
                    label: "Emotive Value",
                    leftLabel: "Positive",
                    rightLabel: "Negative"
                },
                trend: {
                    on: false,
                    val:2,
                    label: "Emerging Topics",
                    leftLabel: "Trending",
                    rightLabel: "Ongoing"
                },
                cont: {
                    on: false,
                    val: 2,
                    label: "Polarity",
                    leftLabel: "Controversial",
                    rightLabel: "Safe"
                },
            }
        };
    },

    handleFilterChange(filter, isToggle, value) {
        const newFilters = this.state.filters;
        if (isToggle) {
            newFilters[filter].on = !newFilters[filter].on;
        }
        else {
            newFilters[filter].val = value;
        }
        this.setState({
            filters:newFilters
        });
        this.props.dispatch(getDescriptors(this.state.filters));
    },

    descriptorClicked(descriptor) {
        if (!this.props.descriptorsData.relatedTopics[descriptor]) {
            this.props.dispatch(getRelated(descriptor))
        }
        this.setState({
            selected:true,
            selectedDescriptor:descriptor,
        });
    },

    resetSelection() {
        this.setState({
            selected:false,
            selectedDescriptor:null,
        });
    },

    getStoryImage(storyId) {
        this.props.dispatch(getStoryImage(storyId))
    },

    bySourceData(descriptorId) {
        const stories = this.props.descriptorsData.stories;
        return this.props.descriptorsData.descriptors[descriptorId].DescriptorsResults.reduce(function(rv, x) {
            (rv[stories[x.storyId].mediaName] = rv[stories[x.storyId].mediaName] || []).push(x);
            return rv;
        }, {});
    },

    render() {
        const allDescriptors = this.props.descriptorsData.descriptors || {};

        const descriptorsArray = Object.keys(allDescriptors);
        descriptorsArray.sort((a,b)=>{
            return (allDescriptors[b].numStories-allDescriptors[a].numStories ||
            allDescriptors[b].score-allDescriptors[a].score)});

        const related = this.props.descriptorsData.relatedTopics[this.state.selectedDescriptor] || []
        const relatedTopics = related.map((desc)=>desc.dest);
        relatedTopics.unshift(this.state.selectedDescriptor);

        const selected = this.state.selected? allDescriptors[this.state.selectedDescriptor]: null;
        const storiesBySource = this.state.selected? this.bySourceData(this.state.selectedDescriptor) : [];
        const bySourceData = Object.keys(storiesBySource).map((source)=>{
            return {'name':source, 'size':storiesBySource[source].length}
        });

        return (

            <div>
                <AppNav onHomeClick={this.resetSelection}/>
        <div className="grid">
            <div style={styles.topics(this.state.selected)}>
                {!this.state.selected && <h3>Today's Hot Topics:</h3> }
                    <TopDescriptors descriptors={allDescriptors}
                                    list = {descriptorsArray}
                                    relatedTopics = {relatedTopics}
                                    stories = {this.props.descriptorsData.stories}
                                    loading={this.props.descriptorsData.loading || this.props.descriptorsData.storiesLoading}
                                    clicked={this.descriptorClicked}
                                    selected={this.state.selectedDescriptor}
                                    isSelected = {this.state.selected}
                    />

            </div>
            <div style={styles.stories(this.state.selected)}>

                    {this.state.selected && <Topic descriptor={selected}
                                                   stories = {this.props.descriptorsData.stories}
                                                   show={this.state.selected}
                                                   allDescriptors={allDescriptors}
                                                   descriptorClicked = {this.descriptorClicked}
                                                   getImage = {this.getStoryImage}
                    />
                    }
            </div>
            <div style={styles.sideBar}>
                <div>
                    <Controls filters={this.state.filters} onFilterChange={this.handleFilterChange}/>
                    {this.props.descriptorsData.loading &&
                    <div>
                        <Spinner />
                    </div>
                    }
                    {this.state.selected && !this.props.descriptorsData.loading &&
                    <ResponsiveContainer  width={'100%'} aspect={5.0/3.0}>
                        <BarChart  data={bySourceData}
                                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <Bar dataKey="size" fill="rgba(0, 167, 126, 0.6)" />
                            <Tooltip/>
                        </BarChart>
                    </ResponsiveContainer>}
                </div>
            </div>
        </div>
            </div>
        );
    }
});


function mapStateToProps(state) {
    return {
        descriptorsData: state.main.toJS(),
    };
}

export default connect(mapStateToProps)(Radium(Main));

styles = {
    container: {
        margin: '0 auto',
        padding: '4em',
    },
    sideBar: {
        float: 'left',
        width: '22.5%',
        paddingTop:'3em',
    },
    topics: (selected)=>{
        return {
            float:'left',
            width: selected? '22.5%': '77.5%',
            transition: 'all 1s',
            paddingTop:'3em',
        }
    },
    stories: (selected)=>{
        return {
            float:'left',
            width: selected? '55%': '0%',
            transition: 'all 1s',
            paddingTop:'3em',
            textAlign:'center',
        }
    }

};

