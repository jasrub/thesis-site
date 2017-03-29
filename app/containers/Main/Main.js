import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getDescriptors, getRelated, getStories, getStoryImage, getSources } from './actions';
import { connect } from 'react-redux';
import AppNav from 'components/AppNav/AppNav';
import BySourceChart from 'components/BySourceChart/BySourceChart';
import StoryControls from 'components/StoryControls/StoryControls';
import RadarCharts from 'components/RadarCharts/RadarCharts';
import Controls from 'components/Controls/Controls';
import TopDescriptors from 'containers/TopDescriptors/TopDescriptors';
import Topic from 'containers/Topic/Topic';
import {Spinner} from '@blueprintjs/core';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


let styles;

export const Main = React.createClass ({
    PropTypes: {
        descriptorsData: PropTypes.object,
        location: PropTypes.object,
        dispatch: PropTypes.func,
    },

    componentWillMount() {
        this.props.dispatch(getDescriptors(this.state.filters));
        this.props.dispatch(getStories());
        this.props.dispatch(getSources(this.state.filters));
    },

    getInitialState() {
        return {
            selected: false,
            selectedDescriptorId: null,
            selectedStory: false,
            selectedStoryId: null,
            filters: {
                leftRight: {
                    min:0,
                    max: 4,
                    label: "Left / Right",
                    leftLabel: "Left",
                    rightLabel: "Right"
                },
                posNeg: {
                    min:0,
                    max: 4,
                    label: "Positive / Negative",
                    leftLabel: "Positive",
                    rightLabel: "Negative"
                },
                trend: {
                    min:0,
                    max: 4,
                    label: "Trending / Ongoing",
                    leftLabel: "Trending",
                    rightLabel: "Ongoing"
                },
                cont: {
                    min:0,
                    max: 4,
                    label: "Controversial / Safe",
                    leftLabel: "Controversial",
                    rightLabel: "Safe"
                },
            }
        };
    },

    handleFilterChange(filter, value) {
        const loading = (this.props.descriptorsData.loading || this.props.descriptorsData.storiesLoading ||
        this.props.descriptorsData.sourcesLoading );
        if (!loading) {
            const newFilters = this.state.filters;
            newFilters[filter].min = value[0];
            newFilters[filter].max = value[1];

            this.setState({
                filters: newFilters,
                selectedStory: false,
                selectedStoryId: null,
            });
            this.props.dispatch(getDescriptors(this.state.filters));
            this.props.dispatch(getSources(this.state.filters));
        }
    },

    descriptorClicked(descriptor) {
        if (!this.props.descriptorsData.relatedTopics[descriptor]) {
            this.props.dispatch(getRelated(descriptor))
        }
        this.setState({
            selected:true,
            selectedDescriptorId:descriptor,
            selectedStory: false,
            selectedStoryId: null,
        });
    },

    storyClicked(storyId) {
        this.setState({
            selectedStory: true,
            selectedStoryId: storyId,
        });
    },

    storyClosed() {
        this.setState({
            selectedStory: false,
            selectedStoryId: null,
        });
    },

    resetSelection() {
        this.setState({
            selected:false,
            selectedDescriptorId:null,
            selectedStory: false,
            selectedStoryId: null,
        });
    },

    getStoryImage(storyId) {
        this.props.dispatch(getStoryImage(storyId))
    },

    bySourceData(descriptorId) {
        const loading = (this.props.descriptorsData.loading || this.props.descriptorsData.storiesLoading ||
        this.props.descriptorsData.sourcesLoading );
        if (!loading && this.props.descriptorsData.descriptors && this.props.descriptorsData.descriptors[descriptorId]) {
            const stories = this.props.descriptorsData.constStories;
            return this.props.descriptorsData.descriptors[descriptorId].DescriptorsResults.reduce(function (rv, x) {
                (rv[stories[x.storyId].mediaName] = rv[stories[x.storyId].mediaName] || []).push(x);
                return rv;
            }, {});

        }
        else {
            return {}
        }
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
        const sources = this.props.descriptorsData.sources;
        const result ={};
        Object.keys(sources).forEach((source)=>{
            result[source] = {'total':sources[source], data:[]}
        });
        topics.forEach((topic)=>{
            const topicData = this.bySourceData(topic);
            Object.keys(result).forEach((sourceName)=>{
                const obj = {"subject": topic}
                if (topicData[sourceName]) {
                    obj.count = topicData[sourceName].length;
                    obj.percent = topicData[sourceName].length / result[sourceName].total * 100;
                }
                else {
                    obj.count = 0;
                    obj.percent = 0;
                }
                result[sourceName].data.push(obj)
            })
        });
        return result;
    },

    render() {
        const allDescriptors = this.props.descriptorsData.descriptors || {};

        const descriptorsArray = Object.keys(allDescriptors);
        descriptorsArray.sort((a,b)=>{
            return (allDescriptors[b].numStories-allDescriptors[a].numStories ||
            allDescriptors[b].score-allDescriptors[a].score)});

        const loading = (this.props.descriptorsData.loading || this.props.descriptorsData.storiesLoading || this.props.descriptorsData.sourcesLoading );

        const related = this.props.descriptorsData.relatedTopics[this.state.selectedDescriptorId] || [];
        const relatedTopics = related.map((desc)=>desc.dest);
        relatedTopics.unshift(this.state.selectedDescriptorId);

        const selected = this.state.selected? allDescriptors[this.state.selectedDescriptorId]: null;

        const storiesBySource = this.state.selected? this.bySourceData(this.state.selectedDescriptorId, loading) : [];
        const bySourceData = Object.keys(storiesBySource).map((source)=>{
            return {'name':source, 'size':storiesBySource[source].length/this.props.descriptorsData.sources[source]}
        });

        const stories = this.props.descriptorsData.stories;

        const radarData = (selected || loading || descriptorsArray.length<=0)? {} : this.radarData();

        const storyControls = this.state.selectedStory?
            <StoryControls key={`story-controls-${this.state.selectedStoryId}`}
                           story={stories[this.state.selectedStoryId]}
                           descriptorClicked={this.descriptorClicked}/>: <div/>;

        return (

            <div>
                <AppNav onHomeClick={this.resetSelection}/>
                    <div className="grid">
                        <div style={styles.topics(this.state.selected)}>
                            {!this.state.selected && <h3>Today's Hot Topics:</h3> }
                                <TopDescriptors descriptors={allDescriptors}
                                                list = {descriptorsArray}
                                                relatedTopics = {relatedTopics}
                                                stories = {this.props.descriptorsData.constStories}
                                                loading={loading}
                                                onClick={this.descriptorClicked}
                                                selected={this.state.selectedDescriptorId}
                                                isSelected = {this.state.selected}
                                />
                            {!this.state.selected && !loading && <RadarCharts data={radarData}/>}
                        </div>
                        <div style={styles.stories(this.state.selected)}>

                                {this.state.selected && <Topic descriptor={selected}
                                                               stories = {stories}
                                                               show={this.state.selected}
                                                               allDescriptors={allDescriptors}
                                                               descriptorClicked = {this.descriptorClicked}
                                                               getImage = {this.getStoryImage}
                                                               isStorySelected = {this.state.selectedStory}
                                                               selectedStoryId = {this.state.selectedStoryId}
                                                               onStoryClick = {this.storyClicked}
                                                               onStoryClose = {this.storyClosed}
                                />
                                }
                        </div>
                        <div style={styles.sideBar}>
                            <div>
                                <Controls title={"Filter By"} filters={this.state.filters} onFilterChange={this.handleFilterChange} isRange={true}/>
                                {loading &&
                                <div>
                                    <Spinner />
                                </div>
                                }
                                {this.state.selected && !loading &&
                                    <BySourceChart bySourceData={bySourceData}
                                                   selectedSource={this.state.selectedStory?stories[this.state.selectedStoryId].mediaName : ''}/>}

                                <ReactCSSTransitionGroup
                                    transitionName="opac"
                                    transitionEnterTimeout={500}
                                    transitionLeave={false}>
                                {storyControls}
                                </ReactCSSTransitionGroup>
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
            paddingTop:'3em',
            transition:'all 1s',
        }
    },
    stories: (selected)=>{
        return {
            float:'left',
            width: selected? '55%': '0%',
            opacity: selected? '1' : '0',
            paddingTop:'3em',
            textAlign:'center',
            transition:'all 1s',
        }
    }

};

