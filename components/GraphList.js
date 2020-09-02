import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import LineChartWrapper from './LineChartWrapper';

export default class GraphList extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return fetch(this.props.uri)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }



    render(){

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList data={this.state.dataSource} renderItem={({item}) => <LineChartWrapper data={item.data} title={item.title} format={item.format} />} />
            </View>
        );
    }
}
