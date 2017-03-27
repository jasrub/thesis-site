import React, { PropTypes } from 'react';
import Radium from 'radium';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

let styles;

export const BySourceChart = React.createClass({
    propTypes: {
        bySourceData:PropTypes.array
    },
    // getInitialState() {
    //     return {
    //         data:this.props.bySourceData
    //     }
    // },
    // componentWillReceiveProps(nextProps){
    //     console.log('recieved!')
    //     console.log(this.props.bySourceData, nextProps.bySourceData)
    //     if (!objectsAreSame(this.props.bySourceData, nextProps.bySourceData)) {
    //         console.log('change!')
    //         const newData = nextProps.bySourceData;
    //         this.setState({
    //             data:newData
    //         })
    //     }
    //
    // },

    render() {
        const data = this.props.bySourceData;
        return (
            <ResponsiveContainer  width={'100%'} aspect={5.0/3.0}>
                <BarChart  data={data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <Bar dataKey="size" fill="rgba(0, 167, 126, 0.6)" />
                    <Tooltip formatter={(val)=>Math.round(val*100)+'%'}
                             labelStyle={{color:'#000', fontWeight:'bold'}}
                             wrapperStyle={{background:'#fff'}}
                             cursor={{fill: 'red', fillOpacity: 0.05}}/>
                </BarChart>
            </ResponsiveContainer>
        );
    }

});

export default Radium(BySourceChart);

styles = {


};

function objectsAreSame(x, y) {
    var objectsAreSame = true;
    for(var propertyName in x) {
        if(x[propertyName] !== y[propertyName]) {
            objectsAreSame = false;
            break;
        }
    }
    return objectsAreSame;
}
