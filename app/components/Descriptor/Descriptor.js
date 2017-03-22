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
        color: PropTypes.string,
        selected: PropTypes.boolean,
        clicked: PropTypes.func,
    },

    setInitialState() {
        selected:false
    },

    handleClick() {
        this.props.clicked(this.props.descriptor.id);
    },


    render() {
        const desc = this.props.descriptor;
        const tooltipContent = (
            <div>
                <div>{desc.numStories} Stories</div>
                <ul>
                    {desc.DescriptorsResults.slice(0,5).map((result, idx)=>{
                        return (
                            <li key={idx}> <a href={result.Story.url} target="_blank">
                                <span dangerouslySetInnerHTML={{__html: result.Story.title}} /></a>
                            </li>

                        )})}
                </ul>
            </div>
        );
        return (

            <Tooltip content={tooltipContent}
                     useSmartPositioning={true}
                     tooltipClassName="pt-popover-content-sizing pt-dark">
                <span className="pt-card pt-elevation-3 pt-interactive"
                      style={styles.descriptorBorder(this.props.color)}
                      onClick={this.handleClick}>
                    <span>{desc.id}</span>
                </span>
            </Tooltip>
        )


    },

});

styles = {
    descriptorBorder: function(color){
        return {
            display:'inline-block',
            //lineHeight:'0px',
            borderRadius:'10px',
            //border:'2px solid',
            height:'70px',
            width: '200px',

            fontSize:'1em',
            margin:'0.3em',
            verticalAlign:'middle',
            background: color,
        };
    },
};

export default Radium(Descriptor);