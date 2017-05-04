import React from 'react';
import Radium from 'radium';

let styles;

export const AppFooter = React.createClass({

    render() {

        return (
            <div style={styles.container}>
                <div>This is an experimental interface built at MIT Media Lab</div>
                <div>Have any feedback, questions or thoughts? contact  <a href="mailto:jasrub@media.mit.edu">  jasrub@media.mit.edu</a></div>
                {/*<div> © <a href={"http://www.jasrub.com/"} style={styles.link}> Jasmin Rubinovitz</a></div>*/}
            </div>
        );
    }

});

export default Radium(AppFooter);

styles = {
    container: {
        borderTop: '0.3px solid #555',
        marginTop:  '2em',
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
        fontSize: '0.5em'
    },

};