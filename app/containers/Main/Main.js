import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getDescriptors, getRelated, getStories } from './actions';
import { connect } from 'react-redux';
import AppNav from 'components/AppNav/AppNav';
import Controls from 'components/Controls/Controls';
import TopDescriptors from 'containers/TopDescriptors/TopDescriptors';
import Topic from 'containers/Topic/Topic';
import Sidebar from 'react-sidebar';

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
                isLeftRight: {
                    on: false,
                    val: 2,
                    label: "Political Stance",
                    leftLabel: "Left",
                    rightLabel: "Right"
                },
                isPosNeg: {
                    on: false,
                    val: 2,
                    label: "Emotive Value",
                    leftLabel: "Positive",
                    rightLabel: "Negative"
                },
                isTrend: {
                    on: false,
                    val:2,
                    label: "Emerging Topics",
                    leftLabel: "Trending",
                    rightLabel: "Ongoing"
                },
                isCont: {
                    on: false,
                    val: 2,
                    label: "Controversial Subjects",
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
        // this.props.dispatch(filterStories(this.state.filters));
    },

    descriptorClicked(descriptor) {
        if (!this.props.descriptorsData.descriptors[descriptor].related) {
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
        <Sidebar sidebar={<Controls filters={this.state.filters} onFilterChange={this.handleFilterChange}/>}
                 open={true}
                 docked={true}
                 pullRight={true}>
            <div>
                <AppNav onHomeClick={this.resetSelection}/>
                    {!this.state.selected && !this.props.descriptorsData.storiesLoading &&
                        <TopDescriptors descriptors={allDescriptors}
                                        list = {descriptorsArray}
                                        stories = {this.props.descriptorsData.stories}
                                        loading={this.props.descriptorsData.loading}
                                        clicked={this.descriptorClicked}/>

                    }

                    {this.state.selected && <Topic descriptor={selected}
                                                   stories = {this.props.descriptorsData.stories}
                                                   loading={this.props.descriptorsData.relatedLoading}/>}
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

};

