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
        selected: PropTypes.boolean,
        clicked: PropTypes.func,
        stories: PropTypes.object,
        glow: PropTypes.boolean,
    },

    setInitialState() {
        selected:false
    },

    handleClick() {
        this.props.clicked(this.props.descriptor.id);
    },


    render() {
        const desc = this.props.descriptor;
        const size = mapNum(desc.numStories, 0, 100, 6, 20)
        return (
            <div style={{display: 'inline-block'}}>
                <div style={styles.circle(size, this.props.selected, this.props.glow)} className="circle"
                      onClick={this.handleClick}>
                    <span style={styles.title}>
                             <div> {toTitleCase(desc.id)} </div>
                    </span>
                </div>
            </div>
        )


    },

});

const Hover = ({ onHover, children }) => (
    <div className="hover">
        <div className="hover__no-hover">{children}</div>
        <div className="hover__hover">{onHover}</div>
    </div>
)

styles = {
    article: {
        position: 'absolute',
        left: '0',
        WebkitTransition: '.3s',
        MozTransition: '.3s',
        MsTransition: '.3s',
        OTransition: '.3s',
        transition: '.3s',

    },
    circle: (size, selected, glow) => {
        const shadowColor = selected? 'rgba(255, 136, 92, 0.5)' : 'rgba(250, 250, 250, 0.2)';
        const shadowSize = selected? '80px ': '100px ';
        const boxShadow = glow || selected? '0 0 '+shadowSize+ shadowColor: 'none';
        const background = selected? '#FF885C': 'rgba(220, 220, 220, 0.27)';//' radial-gradient(ellipse at center, '+colorA+' 0%,'+colorB+' 100%)';
        const transition = 'all 0.7s ease-out';
        return {
        borderRadius: '50%',
        width: size + 'em',
        height: size + 'em',
        background: background,


        boxShadow: boxShadow,
        MozBoxShadow: boxShadow,
        WebkitBoxShadow: boxShadow,
        OBoxShadow: boxShadow,

        margin: '0.5em',
        display: 'flex',
        alignItems: 'center',
        // WebkitTransition: 'all 0.7s ease-out',
        // MozTransition: 'all 0.7s ease-out',
        // MsTransition: 'all 0.7s ease-out',
        // OTransition: 'all 0.7s ease-out',
        // transition: 'all 1s',

            cursor: 'pointer',

    }
    },

    title: {
        textAlign: 'center',
        fontSize: '1.2em',
        color: '#FFF',
        margin: '0 auto',
        opacity: '0.7',
        //margin: '6em',
        padding: '1em',

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