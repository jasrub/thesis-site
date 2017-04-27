/**
 * Created by jasrub on 3/16/17.
*/
import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Tooltip } from '@blueprintjs/core';


let styles;

export const Descriptor = React.createClass ({
    PropTypes: {
        descriptor: PropTypes.object,
        maxSize: PropTypes.integer,
        selected: PropTypes.boolean,
        clicked: PropTypes.func,
        stories: PropTypes.object,
        glow: PropTypes.boolean,
    },

    getInitialState() {
        return {
            selected: false
        }
    },

    handleClick() {
        this.props.clicked(this.props.descriptor.id);
    },


    render() {
        const desc = this.props.descriptor;
        const size = desc? mapNum(desc.numStories, 0, this.props.maxSize, 20, 100): 0;
        // console.log(size)
        // console.log(this.props.maxSize)
        const selected = this.props.selected;
        return (
            <div>
                {desc && <div style={styles.rect(size, selected, this.props.glow)} className={selected? "":"circle"}
                      onClick={this.handleClick}>
                    <div style={styles.title}>
                             <div> {toTitleCase(desc.id)} </div>
                    </div>
                </div>}
            </div>
        )


    },

});

styles = {
    circle: (size, selected, glow) => {
        const shadowColor = selected? 'rgba(255, 136, 92, 0.5)' : 'rgba(250, 250, 250, 0.2)';
        const shadowSize = selected? '80px ': '100px ';
        const boxShadow = glow || selected? '0 0 '+shadowSize+ shadowColor: 'none';
        const background = selected? '#FF885C': 'rgba(220, 220, 220, 0.27)';//' radial-gradient(ellipse at center, '+colorA+' 0%,'+colorB+' 100%)';
        const transition = 'width 0.7s, height 0.7s, background 0.3s,  ease-out';
        return {
        borderRadius: '50%',
        width: size + 'vw',
        height: size + 'vw',
        background: background,


        boxShadow: boxShadow,
        MozBoxShadow: boxShadow,
        WebkitBoxShadow: boxShadow,
        OBoxShadow: boxShadow,

        margin: '0.5em',
        display: 'flex',
        alignItems: 'center',
        WebkitTransition: transition,
        MozTransition: transition,
        MsTransition: transition,
        OTransition: transition,
        transition: transition,

            cursor: 'pointer',

    }
    },

    rect:function(width, selected, glow){
        return{
            background:selected? '#9C5586': 'rgba(220, 220, 220, 0.27)',
            borderRadius: '10px',
            margin:'0.7em 0',
            padding: '0.1em',
            cursor: 'pointer',
            width:width+'%',
            fontSize: width<30?mapNum(width,0,30, 0.4, 0.9)+'em':'1em',

        }},

    title: {
        textAlign: 'left',
        fontSize: '1em',
        color: '#FFF',
        margin: '0 auto',
        opacity: '0.9',
        //margin: '6em',
        padding: '0.3em',
        fontWeight:'300',

    },
};

function mapNum(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default Radium(Descriptor);