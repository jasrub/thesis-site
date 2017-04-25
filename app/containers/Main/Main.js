import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getDescriptors, getRelated, getStories, getStoryImage, getSources } from './actions';
import { connect } from 'react-redux';
import AppNav from 'components/AppNav/AppNav';
import AppFooter from 'components/AppFooter/AppFooter';
import BySourceChart from 'components/BySourceChart/BySourceChart';
import StoryControls from 'components/StoryControls/StoryControls';
import Sliders from 'components/Sliders/Sliders';
import TopDescriptors from 'containers/TopDescriptors/TopDescriptors';
import Topic from 'containers/Topic/Topic';
import {Spinner, Overlay} from '@blueprintjs/core';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Joyride from 'react-joyride';
import ReactGA from 'react-ga';


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
            },
            isJoyrideRunning:false,
        };
    },

    handleFilterChange(filter, value) {
        const loading = (this.props.descriptorsData.loading || this.props.descriptorsData.storiesLoading ||
        this.props.descriptorsData.sourcesLoading );
        ReactGA.event({
            category: 'Filter',
            action: 'filter changed',
            label: filter+' '+value[0]+' , '+value[1]
        });
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
        //this.resetSourceSelection();
        ReactGA.event({
            category: 'Descriptor',
            action: 'Descriptor Clicked',
            label: descriptor
        });
    },

    storyClicked(storyId) {
        this.setState({
            selectedStory: true,
            selectedStoryId: storyId,
        });
        ReactGA.event({
            category: 'Story',
            action: 'Story Clicked',
            label: storyId
        });
    },

    storyClosed() {
        ReactGA.event({
            category: 'Story',
            action: 'Story Closed',
            label: this.state.selectedStoryId
        });
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
            ReactGA.event({
                category: 'Source',
                action: 'Source clicked',
                label: sourceName
            });
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
        if (Object.keys(this.props.descriptorsData.constStories).length<1 || (!this.state.selected && !this.state.selectedSource)) {
            return this.props.descriptorsData.storyPlots;
        }
        else {
            const arrToUse = this.state.selected?
                this.props.descriptorsData.descriptors[this.state.selectedDescriptorId].DescriptorsResults :
                Object.keys(this.props.descriptorsData.constStories).map((id)=>{return{storyId:id}});
            const storyPlots = clone(this.props.descriptorsData.storyPlots);
            arrToUse.forEach((s)=>{
                const story = this.props.descriptorsData.constStories[s.storyId];
                Object.keys( this.props.descriptorsData.storyPlots).forEach((filterName)=>{
                    if ((this.state.selectedSource && story.mediaName == this.state.selectedSourceName)|| !this.state.selectedSource) {
                        var val = story[filterName].toFixed(1);
                        if (val == '-0.0') {
                            val = '0.0'
                        }
                        var element = storyPlots[filterName].find((el) => el.val == val)
                        element['descCount'] += 1
                    }
                })
            })
            return storyPlots
        }
    },

    callback(data) {
        console.log('%ccallback', 'color: #47AAAC; font-weight: bold; font-size: 13px;'); //eslint-disable-line no-console
        console.log(data); //eslint-disable-line no-console
    },

    addSteps(steps) {
        let newSteps = steps;

        if (!Array.isArray(newSteps)) {
            newSteps = [newSteps];
        }

        if (!newSteps.length) {
            return;
        }

        // Force setState to be synchronous to keep step order.
        this.setState(currentState => {
            currentState.steps = currentState.steps.concat(newSteps);
            return currentState;
        });
    },

    resetTour() {
        this.joyride.reset(true);
        this.setState({isJoyrideRunning:true})
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

        const storyPlots = this.state.selected || this.state.selectedSource ? this.storyPlots(): this.props.descriptorsData.storyPlots;

        return (

            <div>
                <Joyride
                    ref={c => (this.joyride = c)}
                    steps={[
                        {
                            title: 'Topics',
                            text: 'These are the most mentioned topics in the news from the past 24 hours. <br/>' +
                            'Click on one of them to see the stories about this topic. You can also search for other topics that are not on the top list <br/>' +
                            'Try! click one!',
                            position: 'right',
                            selector: '.topics',
                        },
                        {
                            title: 'Sources',
                            text: 'This section shows all the different media sources of news stories. When you select a specific topic, or play with the filters on the right, you could see how many stories form each source matched you selections.',
                            position: 'top',
                            selector: '.sources',
                        },
                        {
                            title: 'Filters',
                            text: 'Use these sliders to determine what content you see. ' +
                            'You can choose to see only politically left leaning stories, or only trending, positive subjective stories.' +
                            'The charts show the distribution of stories across each on of the labels.',
                            position: 'left',
                            selector: '.filters',
                        },
                        {
                            title: 'Story',
                            text: 'Click on any story to read it. Then, you\'ll also get to help the "Panorama" algorithms improve. <br/>' +
                            'Click one now!',
                            position: 'bottom',
                            selector: '.story',
                        },
                        {
                            title: 'Your Job:',
                            text: 'Here you can see what the machine learning algorithm thought of the story you are reading. Disagree? Please send in your opinion, so the algorithms can improve',
                            position: 'left',
                            selector: '.story-controls',
                        },


                    ]}
                    run={this.state.isJoyrideRunning} // or some other boolean for when you want to start it
                    type={"continuous"}
                    showOverlay={true}
                    allowClicksThruHole={true}
                    autoStart={true}
                    disableOverlay={true}
                />
                <AppNav onHomeClick={this.resetSelection} onTourClick={this.resetTour}/>
                <div className="grid">
                    <div style={styles.topics(this.state.selected)}>

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
                        <div className={"sources"}>
                            <h3 onClick={this.resetSourceSelection} style={{cursor:"pointer"}}>Sources</h3>
                            <BySourceChart bySourceData={bySourceData}
                                           selectedSource={this.state.selectedStory?stories[this.state.selectedStoryId].mediaName : this.state.selectedSourceName}
                                           descriptorId={this.state.selectedDescriptorId}
                                           onSourceClick={this.sourceClicked}
                            />
                        </div>}
                    </div>

                    <div style={styles.stories}>

                        <div style={styles.centerContent(!this.state.selected)}>
                            <div style={styles.explain}>
                            Click around to explore, compare & control today's news stories
                                <img width="100%" src="/static/arrows.png" style={{paddingTop:'1em'}}/>
                            </div>
                        </div>


                        <div style={styles.centerContent(this.state.selected)}>
                        <Topic descriptor={selected}
                                                       stories = {stories}
                                                       show={this.state.selected}
                                                       allDescriptors={allDescriptors}
                                                       descriptorClicked = {this.descriptorClicked}
                                                       getImage = {this.getStoryImage}
                                                       isStorySelected = {this.state.selectedStory}
                                                       selectedStoryId = {this.state.selectedStoryId}
                                                       onStoryClick = {this.storyClicked}
                                                       onStoryClose = {this.storyClosed}
                               selectedSource={this.state.selectedSource}
                               selectedSourceName={this.state.selectedSourceName}
                        />
                        </div>
                    </div>
                    <div style={styles.sideBar}>
                        <div>
                            <Overlay isOpen={this.state.selectedStory} inline={true} hasBackdrop={false}
                                     transitionDuration={1}>
                                {storyControls}
                            </Overlay>
                            <div className="filters">
                                <h3>Filter By:</h3>
                            <Sliders title={""}
                                      filters={this.state.filters}
                                      onFilterChange={this.handleFilterChange}
                                      isRange={true}
                                      linesData={storyPlots}
                                     isStorySelected = {this.state.selectedStory}
                                     selectedStory = {stories[this.state.selectedStoryId]||{}}
                            />
                            </div>
                            {loading &&
                            <div>
                                <Spinner />
                            </div>
                            }
                        </div>
                    </div>

                </div>
                <AppFooter/>
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
        width: '25%',
        paddingTop:'3em',
    },
    topics: (selected)=>{
        return {
            float:'left',
            width: '30%',
            paddingTop:'3em',
            transition:'all 1s',
        }
    },
    stories: {
            float:'left',
            width: '45%',
            padding:'3em 1em 0 1em',
            textAlign:'center',

        },
    centerContent: (show)=>{
        return {
            opacity: show? '1' : '0',
            display: show? 'block': 'none',
            transition:'all 1s',

        }
    },
    explain: {
        fontSize: '3em',
        fontWeight:'100',
        width:'70%',
        margin: '0 auto',
        opacity: '0.7',
    },
};

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
