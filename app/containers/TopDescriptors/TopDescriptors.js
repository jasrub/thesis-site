/**
 * Created by jasrub on 3/17/17.
 */
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Radium from 'radium';
import Descriptor from 'components/Descriptor/Descriptor';
import Search from 'components/Search/Search';
import FlipMove from 'react-flip-move';

let styles;
export const TopDescriptors = React.createClass({

    PropTypes: {
        descriptors: PropTypes.object,
        list: PropTypes.object,
        loading: PropTypes.boolean,
        stories: PropTypes.object,
        selected: PropTypes.string,
        isSelected: PropTypes.boolean,
        relatedTopics: PropTypes.array,
        onClick: PropTypes.func
    },


    render(){
        const descriptors = this.props.descriptors;
        const list = this.props.isSelected? this.props.relatedTopics : this.props.list;
        const count = this.props.isSelected? 6 : 8;
        const top = list.slice(0,count);

        const items = top.map((desc)=>{
            const shouldGlow = Math.random();
            const glow = shouldGlow<0.3? true : false;
            return (
                <Descriptor
                    key={desc}
                    descriptor={descriptors[desc]}
                    clicked={this.props.onClick}
                    stories = {this.props.stories}
                    selected = {this.props.selected===desc}
                    glow={glow}
                />);
        });

        return(

        <div>
                <FlipMove duration={750} easing="ease-out">
                    {items}
                    <div style={styles.searchBar} key="searchBar"><Search descriptorsList={this.props.list}
                            descriptors={this.props.descriptors}
                            notInclude={top}
                            clicked={this.props.onClick}
                            stories={this.props.stories}
                    />
                    </div>
                </FlipMove>
        </div>)
    },


});

styles = {
    searchBar:{
        padding: '3em 0',
    }
};

export default Radium(TopDescriptors);

function mapNum(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}