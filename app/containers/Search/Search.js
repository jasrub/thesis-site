import React, { PropTypes } from 'react';
import Radium from 'radium';
import { searchDescriptors, getDescriptors } from './actions';
import { connect } from 'react-redux';
import { Button, Spinner, ProgressBar, Tooltip, Popover, Checkbox, Position, Slider } from '@blueprintjs/core';
import chroma from 'chroma-js';
import Controls from 'components/Controls/Controls';

const MATCHING_ITEM_LIMIT = 25;

let styles;

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
            const top20 = allDescriptors.slice(0,20);
            this.setState({
                allDescriptors: allDescriptors,
                top20: top20
            })
        }
    },

    getInitialState() {
        return {
            allDescriptors: [],
            top20: [],
            searchDescriptors: [],
            searchValue: '',
            value2: 2.5,
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
                    return desc.id.includes(value) && desc.numStories>0 && this.state.top20.indexOf(desc)===-1;
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
        const top20 = this.state.top20;
        const searchResults = this.state.searchDescriptors || [];
        const colors = chroma.scale(["#fff", "295A6D"]);
        const maxNum = allDescriptors.length>1? allDescriptors[0].numStories: 0;
        const color = (num)=>colors(mapNum(num, 0, maxNum, 0, 1)).hex();

        const searchResultsRows = searchResults.map((desc) =>{
            return (<Descriptor key={desc.id} descriptor={desc} color={color(desc.numStories)}/>
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
                    {top20.map((desc)=>{
                        return (<Descriptor key={desc.id} descriptor={desc} color={color(desc.numStories)}/>);
                    })}

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

                <div>
                    Filter By:
                    <Controls/>
                </div>
            </div>
        );
    }
});

export const Descriptor = React.createClass ({
    PropTypes: {
        descriptor: PropTypes.object,
        color: PropTypes.string,
    },

    setInitialState() {
          selected:false
    },

    handleEnabledChange() {
        const newSelected = !this.state.selected;

        this.setState({
            selected: newSelected
        });
    },


    render() {
        const desc = this.props.descriptor;
        const tooltipContent = (
            <div>
            <div>{desc.numStories} Stories</div>
                <ul>
                {desc.DescriptorsResults.slice(0,5).map((result, idx)=>{
                    return (
                            <li key={idx}> <a href={result.Story.url} target="_blank">
                                <span dangerouslySetInnerHTML={{__html: result.Story.title}} /></a>
                            </li>

                    )})}
                </ul>
            </div>
        )
        return (

            <Tooltip content={tooltipContent}
                     useSmartPositioning={true}
                     tooltipClassName="pt-popover-content-sizing pt-dark">
                <span className="pt-card pt-elevation-3 pt-interactive"
                      style={styles.descriptorBorder(this.props.color)}><span>{desc.id}</span>
                </span>
            </Tooltip>
        )


    },

});


function mapStateToProps(state) {
    return {
        descriptorsData: state.search.toJS(),
    };
}

export default connect(mapStateToProps)(Radium(Search));

styles = {
    descriptorBorder: function(color){
        return {
        display:'inline-block',
        //lineHeight:'0px',
        borderRadius:'10px',
        //border:'2px solid',
        height:'70px',
        width: '200px',

        fontSize:'1em',
        margin:'0.3em',
        verticalAlign:'middle',
        background: color,
        };
    },
};
// export default Radium(Search);
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

function mapNum(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
