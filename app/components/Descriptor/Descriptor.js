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
    },

    setInitialState() {
        selected:false
    },

    handleClick() {
        this.props.clicked(this.props.descriptor.id);
    },


    render() {
        const desc = this.props.descriptor;
        // const tooltipContent = (
        //     <div>
        //         <div>{desc.numStories}%</div>
        //         <ul>
        //             {desc.DescriptorsResults.slice(0,5).map((result, idx)=>{
        //                 const story = this.props.stories[result.storyId];
        //                 return (
        //                     <li key={idx}> <a href={story.url} target="_blank">
        //                         <span dangerouslySetInnerHTML={{__html: story.title}} /></a>
        //                     </li>
        //
        //                 )})}
        //         </ul>
        //     </div>
        // );
        const size = mapNum(desc.numStories, 0, 100, 6, 30)
        return (
            <div style={{display: 'inline-block'}}>
                <div style={styles.circle(size)}
                      onClick={this.handleClick}>
                    <span style={styles.title}>
                        <Hover onHover={<div> {desc.numStories}% </div>}>
                             <div> {desc.id} </div>
                        </Hover>
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
    circle: (size) => {
        const boxShadow = '0 0 8px rgba(50, 50, 50, 0.8)';
        const colorA = '#a6a6a6';
        const colorB = '#454545';
        const background = ' radial-gradient(ellipse at center, '+colorA+' 0%,'+colorB+' 100%)';
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
        WebkitTransition: 'all 0.7s ease-out',
        MozTransition: 'all 0.7s ease-out',
        MsTransition: 'all 0.7s ease-out',
        OTransition: 'all 0.7s ease-out',
        transition: 'all 0.7s ease-out',

            cursor: 'pointer',

    }
    },

    title: {
        textAlign: 'center',
        fontSize: '1em',
        color: '#000',
        margin: '0 auto',
        //margin: '6em',
        //padding: '6em',

    },
};

function mapNum(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export default Radium(Descriptor);