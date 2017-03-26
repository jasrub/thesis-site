/**
 * Created by jasrub on 3/17/17.
 */
import React, { PropTypes } from 'react';
import Radium from 'radium';
import Descriptor from 'components/Descriptor/Descriptor';
import Search from 'components/Search/Search';
import chroma from 'chroma-js';

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
    },


    render(){
        const descriptors = this.props.descriptors;
        const list = this.props.isSelected? this.props.relatedTopics : this.props.list;
        const top = list.slice(0,8);

        return(

        <div>
            <div style={styles.circles}>
                {top.map((desc)=>{
                    const shouldGlow = Math.random();
                    const glow = shouldGlow<0.3? true : false;

                    return (
                        <Descriptor
                            key={desc}
                            descriptor={descriptors[desc]}
                            clicked={this.props.clicked}
                            stories = {this.props.stories}
                            selected = {this.props.selected===desc}
                            glow={glow}
                        />);
                })}

            </div>

            <Search descriptorsList={this.props.list}
                    descriptors={this.props.descriptors}
                    notInclude={top}
                    clicked={this.props.clicked}
                    stories={this.props.stories}
            />

        </div>)
    },


});

styles = {
    circles:{
        paddingBottom: '3em',
    }
};

export default Radium(TopDescriptors);

function mapNum(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}