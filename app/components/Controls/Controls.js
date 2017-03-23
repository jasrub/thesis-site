import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Slider, Switch } from '@blueprintjs/core';

const MIN = 0;
const MAX = 4;
const STEP = 0.5;

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
            <h4> filter by: </h4>

            <div>
                {Object.keys(filters).map((filterName)=>{
                    const filter = filters[filterName];
                    const onSwitchChange = (value)=>this.props.onFilterChange(filterName, true, value);
                    return(
                        <div key={filterName} className="pt-form-group">
                            <Switch checked={filter.on} label={filter.label} onChange={onSwitchChange} />
                            { filter.on && <SliderRow
                                name={filterName}
                                changeFunction={this.props.onFilterChange}
                                value={filter.val}
                                leftLabel={filter.leftLabel}
                                rightLabel={filter.rightLabel}/>}
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
        rightLabel:PropTypes.string
    },
    onChange(value) {
        this.props.changeFunction(this.props.name, false, value)
    },
    render() {
        return(
            <div>
                <Slider
                    min={MIN}
                    max={MAX}
                    stepSize={STEP}
                    onRelease={this.onChange}
                    value={this.props.value}
                    renderLabel={false}/>
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
        padding: '1em'
    }
};

export default Radium(Controls);