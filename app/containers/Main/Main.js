import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getDescriptors, getRelated } from './actions';
import { connect } from 'react-redux';
import AppNav from 'components/AppNav/AppNav';
import TopDescriptors from 'containers/TopDescriptors/TopDescriptors';
import Topic from 'containers/Topic/Topic';

let styles;

export const Main = React.createClass ({
    PropTypes: {
        descriptorsData: PropTypes.object,
        location: PropTypes.object,
        dispatch: PropTypes.func,
    },

    componentWillMount() {
        this.props.dispatch(getDescriptors());
    },

    getInitialState() {
        return {
            selected: false,
            selectedDescriptor: null,
            selectedIndex: -1,
        };
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
            <div>
                <AppNav onHomeClick={this.resetSelection}/>
                    {!this.state.selected &&
                        <TopDescriptors descriptors={allDescriptors}
                                        list = {descriptorsArray}
                                        loading={this.props.descriptorsData.loading}
                                        clicked={this.descriptorClicked}/>

                    }

                    {this.state.selected && <Topic descriptor={selected}
                                                   loading={this.props.descriptorsData.relatedLoading}/>}
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

};
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}


