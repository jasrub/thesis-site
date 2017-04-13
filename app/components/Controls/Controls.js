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
        const linesData = this.props.linesData || {};
        const showLinesData = this.props.linesData? true : false;
        const allNumberArr = Object.keys(linesData).map((filterName)=> {
            return (linesData[filterName].map((item) => item.count))
        });
        // const max = Math.max.apply(null, [].concat.apply([], allNumberArr));
        // const stories = this.props.stories
        //
        // const storiesArr = Object.keys(this.props.stories).map((storyId)=>{
        //     return stories[storyId]
        // });

        return(
        <div style={styles.controls}>
            <div style={styles.title}> {this.props.title} </div>

            <div>
                {Object.keys(filters).map((filterName)=>{
                    const filter = filters[filterName];
                    return(
                        <div key={filterName} className="pt-form-group" style={styles.controlLine}>
                            {/*{showLinesData && <FilterScatterChart data={storiesArr} dataKey={filterName} style={{marginBottom:'-10px'}} max={max}/>}*/}
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

        return (
            <ResponsiveContainer width={'100%'} aspect={9/1}>
            <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <YAxis type="number" domain={['0', this.props.max]}  hide={true}/>
                <Area type='monotone' dataKey='count' stroke='#673a18' fill='rgba(187, 105, 17, 0.3)' isAnimationActive={false}/>
            </AreaChart>
            </ResponsiveContainer>
        );
    }

})

export const FilterScatterChart = React.createClass({
    render () {
        const valCount = {}
        const data = this.props.data.map((story)=>{
            const xVal = story[this.props.dataKey]
            valCount[xVal] = valCount[xVal]+1 || 0;
            const yVal = valCount[xVal]
            return {
                x: xVal,
                y:yVal
            }
        });
        return (
            <ResponsiveContainer width={'100%'} aspect={9/1}>
        <ScatterChart margin={{top: 0, right: 5, bottom: 0, left: 5}}>
            <XAxis dataKey={'x'} hide={true}/>
            <YAxis  dataKey={'y'} hide={true}/>
            <Scatter  data={data} fill='#666'/>
            {/*<CartesianGrid />*/}
            {/*<Tooltip cursor={{strokeDasharray: '3 3'}}/>*/}
        </ScatterChart>
            </ResponsiveContainer>
            // <ResponsiveContainer width={'100%'} aspect={9/1}>
            //     <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
            //         <YAxis type="number" domain={['0', this.props.max]}  hide={true}/>
            //         <Area type='monotone' dataKey='count' stroke='#673a18' fill='rgba(187, 105, 17, 0.3)' isAnimationActive={false}/>
            //     </AreaChart>
            // </ResponsiveContainer>
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

export default Radium(Controls);