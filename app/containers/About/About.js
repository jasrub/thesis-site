import React from 'react';
import AppNav from 'components/AppNav/AppNav';

let styles;
export const About = React.createClass({

    render() {
        return (
            <div>
                <AppNav onHomeClick={()=>{}}/>
                <div style={styles.container}>
                    <div style={styles.content}>
                    <p>
                    Panorama is an interactive interface , that is used both as an open-box news aggregator, as well as a set of  news annotators, and is  based on underlying machine learning models that learn from the user as the user herself explores the material.
                    Facebook is a black box aggregator. It selects and prioritizes posts based on rules you don't know and can't control. Christian Sandvig proposes glass-box algorithms - you can see how they work and test them, but not alter them. An open box aggregator is one where you can flip the switches, try different settings and compare their results.
                    </p>
                    <p>
                    Panorama is built to allow open, transparent and collaborative exploration of news from all across the political map, it presents different perspectives and encourages serendipity in news exploration, vs. getting all of our news from one single source.
                    </p>
                    <p>
                    Panorama is a Human-in-the-loop interface. Initially, it uses machine learning algorithms to decide  what topics each story is talking about and if the stories are positive, subjective, trending, etc.
                    Thinking of how machine learning works in general — it pours over massive datasets and learns to generalize in smart ways, but not in the same smart way that humans generalize. As a result, it can be brilliant and also get very confused. In our case, some of the training data was a large open set of movie reviews, and while this is a great dataset to start with, it is not mapped so well to news stories.
                    As humans interact with Panorama, they are encouraged to give better annotations to each story they read. Those labels are fed back into the algorithm to make it better.
                    </p>
                    <p>
                    Panorama uses principles of information visualization and user experience  to address the problem of information overload. It allows readers to explore underlying patterns of news stories, reflect on our world by adding meaning and help manage information overload and focus the attention to what matters.
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