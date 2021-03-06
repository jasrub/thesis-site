import React, {PropTypes} from 'react';
import Radium from 'radium';
import Descriptor from 'components/Descriptor/Descriptor';
import FlipMove from 'react-flip-move';

let styles;

export const Search = React.createClass({

    PropTypes: {
        descriptorsList: PropTypes.object,
        descriptors: PropTypes.object,
        notInclude: PropTypes.array,
        clicked: PropTypes.func,
    },

    getInitialState() {
        return {
            searchDescriptors: [],
            searchValue: '',
        };
    },

    handleSearchChange(e){
        const value = e.target.value;

        this.setState({
            searchValue: value,
        });

        if (value == '') {
            this.setState({
                searchDescriptors: [],
                searchValue: '',
            });
        } else {

            const searchResults = value.length>2? this.props.descriptorsList.filter((desc) => {
                    return desc.includes(value) && this.props.notInclude.indexOf(desc) === -1;
                }
            ): [];
            this.setState({
                searchDescriptors: searchResults

            });
        }
    },

    handleSearchCancel() {
        this.setState({
            searchDescriptors: [],
            searchValue: '',
        });
    },

    render(){
        const searchResults = this.state.searchDescriptors || [];

        const searchResultsRows = searchResults.map((desc) => {
            return (<Descriptor key={desc} descriptor={this.props.descriptors[desc]}
                                clicked={()=>{
                                    this.props.clicked(desc);
                                    this.handleSearchCancel();
                                }}
                                stories={this.props.stories}
                                maxSize={this.props.maxSize}
                />
            )
        });

        return (

            <div style={styles.search}>


                <label className="pt-label">
                    <h3> Search other topics </h3>
                    <div className="pt-input-group" style={styles.searchBar}>
                        <span className="pt-icon pt-icon-search"></span>
                        <input className="pt-input" type="search" placeholder="Try things like animals or basketball" dir="auto"
                               value={this.state.searchValue}
                               onChange={this.handleSearchChange}/>
                    </div>
                </label>
                <FlipMove duration={750} easing="ease-out">
                {searchResultsRows}
                </FlipMove>

            </div>)
    },


});

styles = {
    search: {
        maxWidth: '70%',
    },
    searchBar: {

    }
};


export default Radium(Search);

