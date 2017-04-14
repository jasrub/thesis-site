import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Slider, RangeSlider } from '@blueprintjs/core';
import {Area, AreaChart, ResponsiveContainer, YAxis, ScatterChart, Scatter, XAxis} from 'recharts';

const MIN = -1;
const MAX = 1;
const STEP = 0.1;

let styles;

export const Controls = React.createClass ({
    PropTypes: {
        filters: PropTypes.object,
        onFilterChange: PropTypes.func,
    },

    render() {
        const filters = this.props.filters;

        return(
        <div style={styles.controls}>
            <div style={styles.title}> {this.props.title} </div>

            <div>
                {Object.keys(filters).map((filterName)=>{
                    const filter = filters[filterName];
                    return(
                        <div key={filterName} className="pt-form-group story-control" style={styles.controlLine}>
                            <SliderRow
                                name={filterName}
                                changeFunction={this.props.onFilterChange}
                                value={this.props.isRange? [filter.min, filter.max] :filter.val}
                                leftLabel={filter.leftLabel}
                                rightLabel={filter.rightLabel}
                                isRange={this.props.isRange}/>
                        </div>
                    )
                })}
            </div>
        </div>)

    }

});

export const SliderRow = React.createClass ({
    PropTypes: {
        name: PropTypes.string,
        changeFunction:PropTypes.func,
        value:PropTypes.float,
        leftLabel:PropTypes.string,
        rightLabel:PropTypes.string,
        isRange: PropTypes.boolean,
    },
    getInitialState() {
        return {
            value:this.props.value
        }
    },
    onChange(value) {
        this.setState( {
            value:value
        })
    },
    onRelease(value) {
        this.props.changeFunction(this.props.name, value)
    },
    render() {
        const props = {
            min:MIN,
            max:MAX,
            stepSize:STEP,
            onRelease:this.onRelease,
            onChange: this.onChange,
            value:this.state.value,
            renderLabel:false,
            showTrackFill: this.props.isRange? true: false,

        };
        const slider = this.props.isRange?(<RangeSlider {...props}/>):(<Slider {...props}/>)
        return(
            <div>
                {slider}
                <div>
                    <span style={{float:'left'}}>{this.props.leftLabel}</span>
                    <span style={{float:'right'}}>{this.props.rightLabel}</span>
                </div>
            </div>

        )
    }
});

styles = {
    controls: {
        padding: '0 1em',
    },
    title: {
        fontSize: '1em',
        paddingBottom: '1em',
        fontWeight: 'semi-bold',
    },
    controlLine:{
        padding:'0.5em 0',
    }
};

export default Radium(Controls);