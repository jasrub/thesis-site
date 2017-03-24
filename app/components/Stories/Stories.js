import React, { PropTypes } from 'react';
import Radium from 'radium';

export const Stories = React.createClass({

    PropTypes: {
        storiesIds: PropTypes.object,
        stories: PropTypes.object,
    },


    render(){
        return(
            <div>

                <div>
                    {this.props.storiesIds.map((result)=>{
                        const id = result.storyId;
                        const story = this.props.stories[id];
                        return(
                            <Story key={id} story={story}/>)
                    })}

                </div>

            </div>)
    },


});

export default Radium(Stories);

export const Story = React.createClass({

    render() {
        const s = this.props.story;
        return(
                <div className="outer-square">

                <div className="square">
                    <div className="content">
                        <div className="table">
                            <div className="table-cell">
                                {s.image && <img className="rs" src={s.image}/>}
                                <span dangerouslySetInnerHTML={{__html: s.title}} />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        )
    }
});

// {/*<div key={id}>*/}
//
// {/*<a href={story.url} target="_blank">*/}
// {/*<span dangerouslySetInnerHTML={{__html: story.title}} /></a>*/}
// {/*{story.image && <img src={story.image}/>}*/}
// {/*</div>*/}
// {/*)*/}