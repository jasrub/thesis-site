/**
 * Created by jasrub on 3/17/17.
 */
import React, { PropTypes } from 'react';
import Radium from 'radium';
import Descriptor from 'components/Descriptor/Descriptor';
import Controls from 'components/Controls/Controls';
import Search from 'components/Search/Search';
import {Spinner} from '@blueprintjs/core';
import chroma from 'chroma-js';

export const TopDescriptors = React.createClass({

    PropTypes: {
        descriptors: PropTypes.object,
        list: PropTypes.object,
        loading: PropTypes.boolean,
    },


    render(){
        const descriptors = this.props.descriptors;
        const list = this.props.list;
        const top20 = list.slice(0,20);
        const colors = chroma.scale(["#fff", "295A6D"]);
        const maxNum = list.length>1? descriptors[list[0]].numStories: 0;
        const color = (num)=>colors(mapNum(num, 0, maxNum, 0, 1)).hex();

        return(

        <div>
            <h1>Today's Hot Topics</h1>

            <div>
                {this.props.loading &&
                <div>
                    <Spinner />
                </div>
                }
                {top20.map((desc)=>{
                    return (
                        <Descriptor
                            key={desc}
                            descriptor={descriptors[desc]}
                            color={color(descriptors[desc].numStories)}
                            clicked={this.props.clicked}
                        />);
                })}

            </div>

            <Search descriptorsList={this.props.list} descriptors={this.props.descriptors} notInclude={top20} color={color} clicked={this.props.clicked}/>

            <div>
                Filter By:
                <Controls/>
            </div>

        </div>)
    },


});



export default Radium(TopDescriptors);

function mapNum(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}