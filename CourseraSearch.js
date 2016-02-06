/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * Created: @Smit
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Text,
    View,
    ListView
} from 'react-native';


var API_URL = "https://api.coursera.org/api/courses.v1/";


class CourseraSearch extends Component {



    constructor(props){
        super(props);

        this.state = {
            searchText:'',
            password: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            clicked: false
        }
    }

    SearchCourse(){
        this.setState({clicked: true});
        API_URL = "https://api.coursera.org/api/courses.v1?q=search&query="+this.state.searchText;
        this.fetchData();
    };

    fetchData() {
        fetch(API_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.elements),
                    loaded: true
                });
            })
            .done();
    }




    render() {
        if (!this.state.clicked) {
            return this.renderInputView();
        }
        if (this.state.loaded && this.state.clicked) {
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}
                />
            );
        }
        if(!this.state.loaded && this.state.clicked){
            return this.renderLoadingView()
        }
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading courses...
                </Text>
            </View>
        );
    }


    renderInputView() {
        return (
            <View style={styles.searchLoadingText}>
                <Text style={styles.Maintitle}>Coursera</Text>
                <TextInput
                    style={styles.searchText}
                    placeholder="Search"
                    placeholderTextColor="black"
                    onChange={(event) => this.setState({searchText: event.nativeEvent.text})}
                    value={this.state.searchText}
                />
                <TouchableWithoutFeedback onPress={(this.SearchCourse.bind(this))}>
                    <View style={styles.SearchCourseButton}>
                        <Text style={styles.SearchCourseButtonText}>
                            Submit
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    renderMovie(elements) {
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{elements.name}</Text>
                    <Text>slug: {elements.slug}</Text>
                    <Text>courseType: {elements.courseType}</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    Maintitle:{
        fontSize: 40,
        textAlign: 'center'
    },

    searchText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 50
    },
    searchLoadingText:{
        marginTop: 100
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        marginTop: 15,
        marginBottom: 2
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    SearchCourseButtonText:{
        alignSelf: 'center',
        fontSize: 20,
        color: 'white'

    },
    SearchCourseButton:{
        marginTop: 10,
        height: 30,
        backgroundColor: 'blue'
    },

});

module.exports = CourseraSearch;