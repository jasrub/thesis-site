import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getDescriptors, getRelated, getStories } from './actions';
import { connect } from 'react-redux';
import AppNav from 'components/AppNav/AppNav';
import Controls from 'components/Controls/Controls';
import TopDescriptors from 'containers/TopDescriptors/TopDescriptors';
import Topic from 'containers/Topic/Topic';
import Sidebar from 'react-sidebar';
import {Spinner} from '@blueprintjs/core';

let styles;
const FILTER_THRESHOLD = 1.5

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

    render() {
        const allDescriptors = this.props.descriptorsData.descriptors || {};

        const descriptorsArray = Object.keys(allDescriptors);
        descriptorsArray.sort((a,b)=>{
            return (allDescriptors[b].numStories-allDescriptors[a].numStories ||
            allDescriptors[b].score-allDescriptors[a].score)});

        const selected = allDescriptors[this.state.selectedDescriptor]

        return (

            
        <Sidebar sidebar={
            <div>
            <Controls filters={this.state.filters} onFilterChange={this.handleFilterChange}/>
                {this.props.descriptorsData.loading &&
                <div>
                    <Spinner />
                </div>
                }
            </div>
        }
                 open={true}
                 docked={true}
                 pullRight={true}>
            <div>
                <AppNav onHomeClick={this.resetSelection}/>
                <div style={styles.container}>
                    {!this.state.selected &&
                        <TopDescriptors descriptors={allDescriptors}
                                        list = {descriptorsArray}
                                        stories = {this.props.descriptorsData.stories}
                                        loading={this.props.descriptorsData.loading || this.props.descriptorsData.storiesLoading}
                                        clicked={this.descriptorClicked}/>

                    }

                    {this.state.selected && <Topic descriptor={selected}
                                                   stories = {this.props.descriptorsData.stories}
                                                   related = {this.props.descriptorsData.relatedTopics[this.state.selectedDescriptor]}
                                                   allDescriptors={allDescriptors}
                                                    descriptorClicked = {this.descriptorClicked}/>
                        }
            </div>
            </div>
        </Sidebar>
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
    }

};

