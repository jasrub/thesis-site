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
    },

    getInitialState() {
        return{
            storyClicked: false,
            selectedStoryId: -1,
        }
    },

    bySourceData() {
        const stories = this.props.stories;
        return this.props.descriptor.DescriptorsResults.reduce(function(rv, x) {
            (rv[stories[x.storyId].mediaName] = rv[stories[x.storyId].mediaName] || []).push(x);
            return rv;
        }, {});
    },

    handleStoryClicked(storyId) {
        this.setState({
            storyClicked: true,
            selectedStoryId: storyId,
        })
    },
    handleStoryClosed () {
        this.setState({
            storyClicked: false,
            selectedStoryId: -1
        })
    },

    render() {
        const desc = this.props.descriptor;
        const related = this.props.related || [];
        const storiesBySource = this.bySourceData() || [];
        const bySourceData = Object.keys(storiesBySource).map((source)=>{
            return {'name':source, 'size':storiesBySource[source].length}
        });
        const chartWidth = this.props.show? '100%': '1px';
        return(
            <div style={styles.container}>
                <div style={styles.grid}>
                <ReactCSSTransitionGroup
                    transitionName="iframe"
                    transitionEnterTimeout={700}
                    transitionLeaveTimeout={500}>
                {this.state.storyClicked &&
                <Iframe url={this.props.stories[this.state.selectedStoryId].url} id={this.props.stories[this.state.selectedStoryId].id} onClose={this.handleStoryClosed}/>}
                </ReactCSSTransitionGroup>
                <div>
                    <Stories storiesIds = {desc.DescriptorsResults.slice(0,12)}
                             stories = {this.props.stories}
                             onClick = {this.handleStoryClicked}
                             getImage = {this.props.getImage}
                    />
                </div>
                </div>
            </div>)

    }

});

export const Iframe = React.createClass({
    PropTypes: {
        url: PropTypes.string,
        onClose: PropTypes.func,
        id: PropTypes.string,
    },
    render() {
        return(

            <div key={this.props.id} style={{textAlign:'center'}}>
            <div style={styles.iframeBox}>
                <button style={styles.closeButton} onClick={this.props.onClose} type="button" className="pt-button pt-minimal pt-icon-cross"/>
                <a href={this.props.url} target="_blank">Click here to open the story in a new tab</a>
                <iframe width="100%" height="95%" src={this.props.url} frameBorder="0" allowtransparency="true" style={{background: '#FFFFFF'}}/>
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
        //background: 'rgba(0,0,0,0.4)',
        height: '60vh',
        margin:'auto',

    },
    closeButton: {
        position:'absolute',
        top: '0',
        right: '0',
        zIndex:'100',
    }
};




export default Radium(Topic);

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};