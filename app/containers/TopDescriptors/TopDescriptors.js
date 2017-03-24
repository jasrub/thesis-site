/**
 * Created by jasrub on 3/17/17.
 */
import React, { PropTypes } from 'react';
import Radium from 'radium';
import Descriptor from 'components/Descriptor/Descriptor';
import Search from 'components/Search/Search';
import chroma from 'chroma-js';

export const TopDescriptors = React.createClass({

    PropTypes: {
        descriptors: PropTypes.object,
        list: PropTypes.object,
        loading: PropTypes.boolean,
        stories: PropTypes.object,
    },


    render(){
        const descriptors = this.props.descriptors;
        const list = this.props.list;
        const top20 = list.slice(0,10);

        return(

        <div>
            <h1>Today's Hot Topics</h1>

            <div>
                {top20.map((desc)=>{
                    return (
                        <Descriptor
                            key={desc}
                            descriptor={descriptors[desc]}
                            clicked={this.props.clicked}
                            stories = {this.props.stories}
                        />);
                })}

            </div>

            <Search descriptorsList={this.props.list}
                    descriptors={this.props.descriptors}
                    notInclude={top20}
                    clicked={this.props.clicked}
                    stories={this.props.stories}
            />

        </div>)
    },


});



export default Radium(TopDescriptors);

function mapNum(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}