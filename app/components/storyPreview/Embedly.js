/* global embedly */
import React from 'react';
import {connect} from 'react-redux';


export const EmbedlyPreview = React.createClass( {
    propTypes:{
        url: React.PropTypes.string.isRequired,
    },

    link: null,

    getInitialState() {
        return {
            updCounter: 0
        }
    },

    setLink(el) {
        this.link = el
    },

    componentDidMount() {
        embedly('card', this.link);
    },

    componentDidUpdate() {
        embedly('card', this.link);
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.feedIsLoading && !nextProps.feedIsLoading) {
            this.setState({updCounter: this.state.updCounter + 1});
        }
    },

    render() {
        // We use 'key' to force re-render HTML-code on
        // the feed update or on the props.url change
        return (
            <div key={`${this.props.url}##${this.state.updCounter}`}>
                <a
                    ref={this.setLink}
                    href={this.props.url}
                    data-card-controls="0"
                    data-card-recommend="0"/>
            </div>
        );
    }
})

function select(state) {
    return {
        feedIsLoading: state.routeLoadingState,
    };
}

export default connect(select)(EmbedlyPreview);