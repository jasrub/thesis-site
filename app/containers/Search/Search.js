import React, { PropTypes } from 'react';
import Radium from 'radium';
import { searchDescriptors, getDescriptors } from './actions';
import { connect } from 'react-redux';
import { Button, Spinner, ProgressBar } from '@blueprintjs/core';

const MATCHING_ITEM_LIMIT = 25;

export const Search = React.createClass ({
    PropTypes: {
        descriptorsData: PropTypes.object,
        location: PropTypes.object,
        dispatch: PropTypes.func,
    },

    componentWillMount() {
        this.props.dispatch(getDescriptors());
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.descriptorsData.descriptors !== nextProps.descriptorsData.descriptors) {
            const allDescriptors = this.getAllDescriptors(nextProps.descriptorsData.descriptors);
            this.setState({
                allDescriptors: allDescriptors
            })
        }
    },

    getInitialState() {
        return {
            allDescriptors: [],
            searchDescriptors: [],
            searchValue: '',
        };
    },

    handleSearchChange(e){
        const value = e.target.value;

        this.setState({
            searchValue: value,
        });

        if (value === '') {
            this.setState({
                searchDescriptors: [],
            });
        } else {
            const searchResults= this.state.allDescriptors.filter((desc)=>{
                    return desc.id.includes(value) && desc.numStories>0;
                }
            );
            this.setState({
                searchDescriptors: searchResults

        });
        }
    },

    handleSearchCancel() {
        this.setState({
            searchDescriptors: [],
            searchValue: '',
        });
    },

    getAllDescriptors(descriptors) {
        const allDescriptors = descriptors || [];
        allDescriptors.forEach((desc)=>{
            desc.score = desc.DescriptorsResults.reduce((acc, val)=>acc+val.score, 0);
            desc.numStories = desc.DescriptorsResults.length;
            desc.avgScore = desc.score/desc.numStories;
            desc.DescriptorsResults.sort((a,b)=>(b.score-a.score))
            }
        );
        allDescriptors.sort((a,b)=>(b.numStories-a.numStories || b.score-a.score))
        return allDescriptors;
    },

    render() {
        const allDescriptors = this.state.allDescriptors;
        const searchResults = this.state.searchDescriptors || []
        //console.log(descriptors)

        const searchResultsRows = searchResults.map((descriptor, idx) =>{
            return (
                <div key={idx}>
                    <h2>{descriptor.id} ({descriptor.DescriptorsResults.length} stories)</h2>
                    {descriptor.DescriptorsResults.slice(0,5).map((result, idx)=>{
                        return (
                        <div key={idx}>
                            <span> <a href={result.Story.url} target="_blank">{result.Story.title}</a> - {result.score} </span>
                        </div>
                        )})}
                </div>
        )});

        return (

            <div>
                <h1>Today's Hot Topics</h1>

                <div>
                    {this.props.descriptorsData.loading &&
                    <div>
                        <Spinner />
                    </div>
                    }
                    {allDescriptors.slice(0,20).map((desc, idx)=><Descriptor key={idx} descriptor={desc}/>)}

                </div>

                    <label className="pt-label">
                        Search Other Topics
                        <div className="pt-input-group">
                    <span className="pt-icon pt-icon-search"></span>
                    <input className="pt-input" type="search" placeholder="Search input" dir="auto"
                           value={this.state.searchValue}
                           onChange={this.handleSearchChange}/>
                        </div>
                    </label>

                {searchResultsRows}
            </div>
        );
    }
});

export const Descriptor = React.createClass ({
    PropTypes: {
        descriptor: PropTypes.object,
    },

    setInitialState() {
          showStories: false
    },

    render() {
        const desc = this.props.descriptor;
        return (
            <p> {desc.id} - {desc.numStories} </p>
        )


    },


});


function mapStateToProps(state) {
    return {
        descriptorsData: state.search.toJS(),
    };
}

export default connect(mapStateToProps)(Radium(Search));

// export default Radium(Search);

