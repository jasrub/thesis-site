import React from 'react';
import Radium from 'radium';

let styles;

export const AppFooter = React.createClass({

    render() {

        return (
            <div style={styles.container}>
                <div> © <a href={"http://www.jasrub.com/"} style={styles.link}> Jasmin Rubinovitz</a></div>
            </div>
        );
    }

});

export default Radium(AppFooter);

styles = {
    container: {
        //borderTop: '1px solid #888',
        padding: '1em',
        textAlign: 'center',
        color: '#888',
        position:'absolute',
        right: '0',
        bottom: '0',
        left: '0',
        width: '100%',

    },
    link: {
        color: '#888',
    },

};