import React from 'react';
import AppNav from 'components/AppNav/AppNav';

let styles;
export const About = React.createClass({

    render() {
        return (
            <div style={{minHeight:'100%'}}>
                <AppNav onHomeClick={()=>{}}/>
                <div style={styles.container}>
                    <div style={styles.content}>
                    <p>
                        In the era of information, we are free to access as many news stories as we want. However, today news is so abundant that people don’t have the time to read or watch all of it, nor the time to select what stories they want to know about. We trust editors and algorithms to decide for us, giving away our control and sometimes missing the big picture.
                        For computers, news stories are usually not annotated or categorized, they come in as an unstructured text in natural language that for machines is hard to generalize.
                    </p>
                        <p>
                        Panorama proposes a novel interaction method of coupling principles of data visualization and user experience with an interactive machine learning approach, easing our understanding and exploration of mass information as well as collecting nuanced annotations for the same information. This is a human machine collaboration where the computer analyzes and renders the data, making it graspable, and the user in turn gives annotated labels that help the computer better analyze the next data points it sees.
                        </p>
                        <p>
                        Panorama is an interface for open, transparent and collaborative exploration of news. It addresses information overload, by allowing users to filter, organize and control their news feed. Panorama is also an interactive machine learning system, it is based on machine learning models that analyze news stories. As the user reads and explores the news, she is encouraged to submit feedback that is sent back to the underlying machine learning models, helping them improve.
                        By showing all the available information, from all U.S mainstream media sources, and placing the power to filter in the user’s hands, Panorama encourages serendipity in news consumption and bursts filter bubbles.ciples of information visualization and user experience  to address the problem of information overload. It allows readers to explore underlying patterns of news stories, reflect on our world by adding meaning and help manage information overload and focus the attention to what matters.
                    </p>
                        <p>
                        This is a first prototype built by <a href="http://www.jasrub.com/">Jasmin Rubinovitz</a>, as part of her masters thesis at the Viral Communications group at MIT Media Lab
                        <p>
                        Please email <a href="mailto:jasrub@media.mit.edu">jasrub@media.mit.edu</a> with any questions or thoughts.
                        </p>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

export default About;

styles = {
    container: {
        maxWidth: '1024px',
        textAlign: 'center',
    },
    content: {
        textAlign: 'left',
    }
}