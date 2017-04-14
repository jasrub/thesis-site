import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Slider, RangeSlider } from '@blueprintjs/core';
import {Area, AreaChart, ResponsiveContainer, YAxis, ReferenceLine, ReferenceDot, ScatterChart, Scatter, XAxis} from 'recharts';

const MIN = -1;
const MAX = 1;
const STEP = 0.1;

let styles;

export const Controls = React.createClass ({
    PropTypes: {
        filters: PropTypes.object,
        onFilterChange: PropTypes.func,
        isStorySelected: PropTypes.boolean,
        isDescriptorSelected: PropTypes.boolean,
    },

    render() {
        const filters = this.props.filters;

        return(
            <div style={styles.controls}>
                <div style={styles.title}> {this.props.title} </div>

                <div>
                    {Object.keys(filters).map((filterName)=>{
                        const filter = filters[filterName];
                        const dotX = this.props.isStorySelected? this.props.selectedStory[filterName].toFixed(1) : '-2'
                        return(
                            <div key={filterName} className="pt-form-group" style={styles.controlLine}>
                                <FilterLineChart data={this.props.linesData[filterName]}
                                                 showDot = {this.props.isStorySelected}
                                                 dotX = {dotX}
                                                 style={{marginBottom:'-10px'}}/>
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

export const FilterLineChart = React.createClass({
    render () {
        const data = this.props.data;
        const dot = <ReferenceDot x={this.props.dotX} y={320} r={7} fill="#10a38a" stroke="none"/>

        return (
            <ResponsiveContainer width={'100%'} aspect={9/1}>
                <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <XAxis dataKey="val" hide={true}/>
                    <YAxis hide={true}/>
                    <Area type='monotone' dataKey='count' stroke='rgba(220, 220, 220, 0.2)' fill='rgba(170, 170, 170, 0.27)' isAnimationActive={false}/>
                    {/*<Area type='monotone' dataKey='descCount' stroke='rgba(220, 220, 220, 0.2)' fill='#9C5586' isAnimationActive={true}/>*/}
                    {dot}

                </AreaChart>

            </ResponsiveContainer>
        );

    }

})

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

export default Radium(Controls);/**
 * Created by jasrub on 4/14/17.
 */
