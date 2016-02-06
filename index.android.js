/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
} from 'react-native';

var CourseraSearch = require('./CourseraSearch');

class SocialLearning extends Component {

    render() {
        return (
            <CourseraSearch></CourseraSearch>
        );
    }


}

const styles = StyleSheet.create({


});

AppRegistry.registerComponent('SocialLearning', () => SocialLearning);
