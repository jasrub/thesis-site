import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Slider, Switch } from '@blueprintjs/core';

const MIN = 0;
const MAX = 50;
const STEP = 0.5;

let styles;

export const Controls = React.createClass ({
    PropTypes: {

    },

    getInitialState() {
        return {
            isLeftRight: false,
            isPosNeg: false,
            isTrend: false,
            isCont: false,
            leftRightVal:25,
            posNegVal: 25,
            trendVal: 25,
            contVal:25
        }
    },

    getChangeHandler(key) {
        return (value) => {
            this.setState({[key]: value});
        }
    },

    getBoolHandler(key) {
        return () => {
            const currVal = this.state[key];
            this.setState({[key]: !currVal});
        }
    },

    getLabels(minStr, maxStr) {
        return(value)=>{
            const add = 3;
            if (value==MIN+add) {
                return minStr;
            }
            else if (value==MAX-add) {
                return maxStr;
            }
            else {
                return ''
            }
        }
        //return false
    },


    render() {
        return(
        <div>

            <div className="pt-card pt-elevation-3" style={styles.controlsCard}>
            <div className="pt-form-group">
                <Switch checked={this.state.isLeftRight} label="Political Stance" onChange={this.getBoolHandler("isLeftRight")} />
                { this.state.isLeftRight && <SliderRow
                name={"leftRightVal"}
                changeFunction={this.getChangeHandler}
                value={this.state.leftRightVal}
                leftLabel={"Left"}
                rightLabel={"Right"}/>}
            </div>

            <div className="pt-form-group">
                <Switch checked={this.state.isPosNeg} label="Emotive Value" onChange={this.getBoolHandler("isPosNeg")} />
                {this.state.isPosNeg &&
                <SliderRow
                    name={"posNegVal"}
                    changeFunction={this.getChangeHandler}
                    value={this.state.posNegVal}
                    leftLabel={"Positive"}
                    rightLabel={"Negative"}/>}
            </div>

            <div className="pt-form-group">
                <Switch checked={this.state.isTrend} label="Emerging Topics" onChange={this.getBoolHandler("isTrend")} />
                {this.state.isTrend &&
                <SliderRow
                    name={"trendVal"}
                    changeFunction={this.getChangeHandler}
                    value={this.state.trendVal}
                    leftLabel={"Trending"}
                    rightLabel={"Ongoing"}/>}
            </div>

            <div className="pt-form-group">
                <Switch checked={this.state.isCont} label="Controversial Subjects" onChange={this.getBoolHandler("isCont")} />
                {this.state.isCont &&
                <SliderRow
                    name={"contVal"}
                    changeFunction={this.getChangeHandler}
                    value={this.state.contVal}
                    leftLabel={"Controversial"}
                    rightLabel={"Safe"}/>}
            </div>
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
    render() {
        return(
            <div>
                <Slider
                    min={MIN}
                    max={MAX}
                    stepSize={STEP}
                    onChange={this.props.changeFunction(this.props.name)}
                    value={this.props.value}
                    renderLabel={false}/>
                <div>
                    <span style={{float:'left'}}>{this.props.leftLabel}</span>
                    <span style={{float:'right'}}>{this.props.rightLabel}</span>
                </div>
            </div>

        )
    }
})

styles = {
    controlsCard: {
        width: '30%',
        background: '#ffe4cb',
        //color: '#fff',
    }
}

export default Radium(Controls);