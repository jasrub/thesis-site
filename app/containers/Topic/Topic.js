import React, { PropTypes } from 'react';
import Radium from 'radium';
import Stories from 'components/Stories/Stories';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


let styles;

export const Topic = React.createClass ({
    PropTypes: {
        descriptor: PropTypes.object,
        loading: PropTypes.boolean,
        stories: PropTypes.object,
        allDescriptors: PropTypes.object,
        descriptorClicked: PropTypes.func,
        getImage: PropTypes.func,
        isStorySelected: PropTypes.boolean,
        selectedStoryId: PropTypes.string,
        onStoryClick: PropTypes.func,
        onStoryClose: PropTypes.func,
    },

    getInitialState() {
        return{
            storiesCount:12,
        }
    },

    moreClicked() {
        const newStoriesCount = this.state.storiesCount+12;
        this.setState({storiesCount: newStoriesCount})
    },

    render() {
        const desc = this.props.descriptor;
        const storyList = desc? desc.DescriptorsResults.sort(fieldSorter(['-score', 'storyId'])):[];
        const moreStories = storyList.length>this.state.storiesCount?
            <span onClick={this.moreClicked}>Show More Stories</span>:
            <div><p>No more stories to show.</p><p> Try Playing with the sliders on the right or select another topic</p></div>
        return(
            <div style={styles.container}>
                <div style={styles.grid}>
                <ReactCSSTransitionGroup
                    transitionName="iframe"
                    transitionEnterTimeout={700}
                    transitionLeaveTimeout={500}>
                {this.props.isStorySelected &&
                <Iframe url={this.props.stories[this.props.selectedStoryId].url}
                        id={this.props.stories[this.props.selectedStoryId].id}
                        title={this.props.stories[this.props.selectedStoryId].title}
                        onClose={this.props.onStoryClose}/>}
                </ReactCSSTransitionGroup>
                <div>
                    <Stories storiesIds = {storyList.slice(0,this.state.storiesCount)}
                             stories = {this.props.stories}
                             onClick = {this.props.onStoryClick}
                             getImage = {this.props.getImage}
                    />
                </div>
                    {moreStories}
                </div>
            </div>)

    }

});

export const Iframe = React.createClass({
    PropTypes: {
        url: PropTypes.string,
        onClose: PropTypes.func,
        id: PropTypes.string,
        title : PropTypes.string,
    },

    render() {
        return(

            <div key={this.props.id} style={{textAlign:'center'}}>
            <div style={styles.iframeBox}>
                <button style={styles.closeButton} onClick={this.props.onClose} type="button" className="pt-button pt-minimal pt-icon-cross"/>
                <div style={styles.titleLink}><a style={styles.titleLink} href={this.props.url} target="_blank">{this.props.title}</a></div>
                <iframe width="100%" height="92%" src={this.props.url}
                        frameBorder="0" allowTransparency="true" style={{background: '#FFFFFF'}} onLoad={()=>{}}/>
            </div>
            </div>
        )
    }
})

styles = {
    container: {
        textAlign: 'center',
    },
    grid: {
        position:'relative',
        display: 'block',
margin: 'auto',
    },
    title: {
        fontSize:'3em',

    },
    iframeBox: {
        position: 'relative',
        width:'96.8%',
        // border: 'solid 3px #10a38a',
        //background: 'rgba(0,0,0,0.4)',
        height: '60vh',
        margin:'auto',
        // padding: '0.1em',

    },
    closeButton: {
        position:'absolute',
        top: '0',
        right: '0',
        zIndex:'100',
    },
    titleLink:{
        color: '#10a38a',
        fontWeight: 'bold',
        paddingBottom:'0.5em',
    }
};

export default Radium(Topic);

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

function fieldSorter(fields) {
    return (a, b) => fields.map(o => {
        let dir = 1;
        if (o[0] === '-') { dir = -1; o=o.substring(1); }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p,n) => p ? p : n, 0);
}