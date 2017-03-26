import React, { PropTypes } from 'react';
import Radium from 'radium';

let styles;
export const Stories = React.createClass({

    PropTypes: {
        storiesIds: PropTypes.object,
        stories: PropTypes.object,
        onClick: PropTypes.func,
        getImage: PropTypes.func,
    },


    render(){
        return(
            <div>

                <div>
                    {this.props.storiesIds.map((result)=>{
                        const id = result.storyId;
                        const story = this.props.stories[id];
                        return(
                            <Story key={id} story={story} onClick={this.props.onClick} getImage={this.props.getImage}/>)
                    })}

                </div>

            </div>)
    },


});

export default Radium(Stories);

export const Story = React.createClass({

    PropTypes: {
        story: PropTypes.object,
        onClick: PropTypes.func,
        getImage: PropTypes.func
    },

    onClick() {
        return this.props.onClick(this.props.story.id)
    },
    componentWillMount() {
        if (!this.props.story.image) {
            this.props.getImage(this.props.story.id);
        }
    },

    render() {
        const s = this.props.story;
        return(
                <div className="outer-square">

                <div className="square" style={styles.square(s.image)} onClick={this.onClick}>
                    <div className="overlay">
                        <div className="content">
                            <div className="table">
                                <div className="table-cell">
                                    {/*{s.image && <img className="rs" src={s.image}/>}*/}
                                    <span dangerouslySetInnerHTML={{__html: s.title}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        )
    }
});

styles = {
    square: (url)=>{
        return{
            backgroundImage: 'url('+url+')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }
    },
    grid: {
        margin: '0 auto',
    }
};

// {/*<div key={id}>*/}
//
// {/*<a href={story.url} target="_blank">*/}
// {/*<span dangerouslySetInnerHTML={{__html: story.title}} /></a>*/}
// {/*{story.image && <img src={story.image}/>}*/}
// {/*</div>*/}
// {/*)*/}