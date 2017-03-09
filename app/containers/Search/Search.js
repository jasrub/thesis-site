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
        this.setState({
            searchDescriptors:nextProps.descriptorsData.searchResults
        })

    },

    getInitialState() {
        return {
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
            this.props.dispatch(searchDescriptors(value))
        }
    },

    handleSearchCancel() {
        this.setState({
            searchDescriptors: [],
            searchValue: '',
        });
    },

    getAllDescriptors() {
        const allDescriptors = this.props.descriptorsData.descriptors || [];
        allDescriptors.forEach((desc)=>{
            desc.score = desc.DescriptorsResults.reduce((acc, val)=>acc+val.score, 0);
            desc.numStories = desc.DescriptorsResults.length;
            desc.avgScore = desc.score/desc.numStories;
            }
        );
        allDescriptors.sort((a,b)=>(b.numStories-a.numStories))
        return allDescriptors;
    },

    render() {
        const allDescriptors = this.getAllDescriptors();
        const searchResults = this.state.searchDescriptors || []
        //console.log(descriptors)

        const foodRows = searchResults.map((descriptor, idx) =>{
            descriptor.DescriptorsResults.sort((a,b)=>(a.socre-b.score));
            return (
            <tr
                key={idx}
            >
                <td>
                    <h2>{descriptor.id} ({descriptor.DescriptorsResults.length} stories)</h2>
                    {descriptor.DescriptorsResults.slice(0,5).map((result, idx)=>{
                        return (
                        <div key={idx}>
                            <a href={result.Story.url} target="_blank">{result.Story.title}</a>
                        </div>
                        )})}
                </td>
            </tr>
        )});

        return (

            <div id='food-search'>
                <table className='ui selectable structured large table'>
                    <thead>
                    <tr>
                        <th colSpan='5'>
                            <div className='ui fluid search'>
                                <div className='ui icon input'>
                                    <input
                                        className='prompt'
                                        type='text'
                                        placeholder='Search topics...'
                                        value={this.state.searchValue}
                                        onChange={this.handleSearchChange}
                                    />
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th className='eight wide'>Descriptors </th>
                    </tr>
                    </thead>
                    <tbody>
                    {foodRows}
                    </tbody>
                </table>
                {this.props.descriptorsData.loadingSearch &&
                <div>
                    <ProgressBar />
                </div>
                }
                <div>
                    {this.props.descriptorsData.loading &&
                    <div>
                        <Spinner />
                    </div>
                    }
                    {allDescriptors.map((desc, idx)=><p key={idx}> {desc.id} - {desc.numStories} </p>)}

                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        descriptorsData: state.search.toJS(),
    };
}

export default connect(mapStateToProps)(Radium(Search));

// export default Radium(Search);

