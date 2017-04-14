import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getDescriptors, getRelated, getStories, getStoryImage, getSources } from './actions';
import { connect } from 'react-redux';
import AppNav from 'components/AppNav/AppNav';
import BySourceChart from 'components/BySourceChart/BySourceChart';
import StoryControls from 'components/StoryControls/StoryControls';
import Sliders from 'components/Sliders/Sliders';
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
            selectedSource: false,
            selectedSourceName:'',
            filters: {
                leftRight: {
                    min:-1,
                    max: 1,
                    label: "Left / Right",
                    leftLabel: "Left",
                    rightLabel: "Right"
                },
                posNeg: {
                    min:-1,
                    max: 1,
                    label: "Positive / Negative",
                    leftLabel: "Positive",
                    rightLabel: "Negative"
                },
                objective: {
                    min:-1,
                    max: 1,
                    label: "Objective / Subjective",
                    leftLabel: "Objective",
                    rightLabel: "Subjective"
                },
                trend: {
                    min:-1,
                    max: 1,
                    label: "Trending / Ongoing",
                    leftLabel: "Trending",
                    rightLabel: "Ongoing"
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
            //this.props.dispatch(getSources(this.state.filters));
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

    sourceClicked(sourceName) {
        if (this.state.selectedSourceName==sourceName) {
            this.resetSourceSelection()
        }
        else {
            this.setState({
                selectedSource: true,
                selectedSourceName: sourceName,
            });
        }

    },
    resetSourceSelection() {
        this.setState({
            selectedSource: false,
            selectedSourceName:'',
        });

    },

    resetSelection() {
        this.setState({
            selected:false,
            selectedDescriptorId:null,
            selectedStory: false,
            selectedStoryId: null,
            selectedSource: false,
            selectedSourceName:'',
        });
    },

    getStoryImage(storyId) {
        this.props.dispatch(getStoryImage(storyId))
    },

    bySourceData(descriptorId) {
        const all_stories = this.props.descriptorsData.constStories;
        const all_sources = {};
        Object.keys(this.props.descriptorsData.sources).forEach((source)=>{
            all_sources[source] = []
        });
        if (this.props.descriptorsData.descriptors && this.props.descriptorsData.descriptors[descriptorId]) {
            return this.props.descriptorsData.descriptors[descriptorId].DescriptorsResults.reduce(function (rv, x) {
                (rv[all_stories[x.storyId].mediaName] = rv[all_stories[x.storyId].mediaName] || []).push(x);
                return rv;
            }, all_sources);

        }
        else {
            return Object.keys(all_stories).reduce(function(rv, x){
                (rv[all_stories[x].mediaName] = rv[all_stories[x].mediaName] || []).push({storyId:x});
                return rv;
            }, all_sources);
        }
    },
    storyPlots(){
        if (!this.state.selected || Object.keys(this.props.descriptorsData.stories).length<1) {
            return this.props.descriptorsData.storyPlots;
        }
        else {
            const storyPlots = this.props.descriptorsData.storyPlots
            this.props.descriptorsData.descriptors[this.state.selectedDescriptorId].DescriptorsResults.forEach((s)=>{
                const story = this.props.descriptorsData.constStories[s.storyId];
                Object.keys(storyPlots).forEach((filterName)=>{
                    var val = story[filterName].toFixed(1);
                    if (val=='-0.0') {
                        val = '0.0'
                    }
                    var element = storyPlots[filterName].find((el)=>el.val==val)
                    element['descCount'] += 1
                })
            })
            return storyPlots
        }
    },


    render() {
        console.log('story count: ', this.props.descriptorsData.storyCount);
        const allDescriptors = this.props.descriptorsData.descriptors || {};

        const descriptorsArray = Object.keys(allDescriptors);
        descriptorsArray.sort((a,b)=>{
            return (allDescriptors[b].numStories-allDescriptors[a].numStories ||
            allDescriptors[b].score-allDescriptors[a].score)});

        const loading = (this.props.descriptorsData.loading || this.props.descriptorsData.storiesLoading || this.props.descriptorsData.sourcesLoading );

        const maxDescSize = descriptorsArray.length>0? allDescriptors[descriptorsArray[0]].numStories: 0;
        const related = this.props.descriptorsData.relatedTopics[this.state.selectedDescriptorId] || [];
        const relatedTopics = related.map((desc)=>desc.dest);
        relatedTopics.unshift(this.state.selectedDescriptorId);

        const selected = this.state.selected? allDescriptors[this.state.selectedDescriptorId]: null;

        const storiesBySource = this.bySourceData(this.state.selectedDescriptorId, loading);
        const bySourceData = Object.keys(storiesBySource).map((source)=>{
            return {'name':source, 'size':storiesBySource[source].length/this.props.descriptorsData.sources[source]}
        });

        const stories = this.props.descriptorsData.stories;

        const storyControls = this.state.selectedStory?
            <StoryControls key={`story-controls-${this.state.selectedStoryId}`}
                           story={stories[this.state.selectedStoryId]}
                           descriptorClicked={this.descriptorClicked}/>: <div/>;

        const storyPlots = this.props.descriptorsData.storyPlots//this.storyPlots();

        return (

            <div>
                <AppNav onHomeClick={this.resetSelection}/>
                <div className="grid">
                    <div style={styles.topics(this.state.selected)}>

                        <h3>Topics</h3>
                        <TopDescriptors descriptors={allDescriptors}
                                        list = {descriptorsArray}
                                        relatedTopics = {relatedTopics}
                                        stories = {this.props.descriptorsData.constStories}
                                        loading={loading}
                                        onClick={this.descriptorClicked}
                                        selected={this.state.selectedDescriptorId}
                                        isSelected = {this.state.selected}
                                        maxSize = {maxDescSize}
                        />

                        {!loading &&
                        <div>
                            <h3 onClick={this.resetSourceSelection}>Sources</h3>
                            <BySourceChart bySourceData={bySourceData}
                                           selectedSource={this.state.selectedStory?stories[this.state.selectedStoryId].mediaName : this.state.selectedSourceName}
                                           descriptorId={this.state.selectedDescriptorId}
                                           onSourceClick={this.sourceClicked}
                            />
                        </div>}
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
                            <Sliders title={""}
                                      filters={this.state.filters}
                                      onFilterChange={this.handleFilterChange}
                                      isRange={true}
                                      linesData={storyPlots}
                                     isStorySelected = {this.state.selectedStory}
                                     selectedStory = {stories[this.state.selectedStoryId]||{}}
                            />
                            {loading &&
                            <div>
                                <Spinner />
                            </div>
                            }
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
        width: '35%',
        paddingTop:'3em',
    },
    topics: (selected)=>{
        return {
            float:'left',
            width: '23%',
            paddingTop:'3em',
            transition:'all 1s',
        }
    },
    stories: (selected)=>{
        return {
            float:'left',
            width: '42%',
            opacity: selected? '1' : '0',
            paddingTop:'3em',
            textAlign:'center',
            transition:'all 1s',
        }
    }

};

