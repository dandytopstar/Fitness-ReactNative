 import React, {Component} from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { Container, Content, Body, Text, List, Right, Button, ListItem} from 'native-base';
import{ ImageBackground, Dimensions, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList, AsyncStorage, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo';
import PostRating from '../components/PostRating';
import PostForm from '../forms/PostForm';
import PostComments from '../forms/PostComments';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';
import BannerAd from '../components/BannerAd';
import HTML from 'react-native-render-html';

import ToastModal from '../components/ToastModal';
import {Toast} from 'antd-mobile';
const Checked = () => (<ToastModal title="Saved!"/>);

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

export default class PostDetails extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.post_title}`,
    });

  constructor(props) {
    super(props)
    const {params} = props.navigation.state;
    this.state = {
      item: params.item,
    };
  }

savePosts = async (post_id, post_title, post_image, post_date, tag_title, post_description, uid) => {
    try {
        let post = {
            userId: uid,
            post_id: post_id,
            post_title: post_title,
            post_image: post_image,
            post_date: post_date,
            tag_title: tag_title,
            post_description: post_description

        }

        const posts = await AsyncStorage.getItem('posts') || '[]';
        let postsFav = JSON.parse(posts);
        postsItems = postsFav.filter(function(e){ return e.post_id !== post_id && e.userId == uid })
        postsItems.push(post);
        AsyncStorage.setItem('posts', JSON.stringify(postsItems)).then(() => {

            Toast.info(Strings.ST53, 1)
           

        });
        
    } catch(error) {

    }
};

  render() {

    const {item} = this.state;  
    var user = firebase.auth().currentUser;

    return (
<Container style={styles.background_general}>
<ScrollView>
<KeyboardAwareScrollView>

<ImageBackground source={{uri: ConfigApp.URL+'images/'+item.post_image}} style={styles.postDetail_background}>
<LinearGradient colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.9)']} style={styles.postDetail_gradient}/>
<TouchableOpacity activeOpacity={1} style={{backgroundColor: '#f39c12', width: 50, height: 50, position: 'absolute', right: 15, bottom: -25, borderRadius: 50 , alignItems: 'center', justifyContent: 'center'}} onPress={this.savePosts.bind(this, item.post_id, item.post_title, item.post_image, item.post_date, item.tag_title, item.post_description, user.uid)}>
<Image source={require('../../assets/images/bookmarked.png')} style={{width: 25, height: 25}}/>
</TouchableOpacity>
</ImageBackground>


<View style={{margin: 15, marginBottom: 5}}>

<Text style={styles.postDetail_tag}>{item.tag_title}</Text>
<Text style={styles.postDetail_title}>{item.post_title}</Text>   
<PostRating postId={item.post_id}/>
       
<Button transparent>
<Icon name='calendar' />
<Text style={styles.postDetail_date}>{item.post_date}</Text>
</Button>

<HTML html={item.post_description} onLinkPress={(evt, href) => { Linking.openURL(href); }} />

</View>


<Text style={{padding: 15, fontWeight: 'bold'}}>{Strings.ST83}</Text>

<View style={{height: 1, backgroundColor: '#EEE', width: width, marginBottom: 5}}></View>

<View style={{margin: 15}}>
<PostForm postId={item.post_id}/>
</View>

<Text style={{padding: 15, fontWeight: 'bold'}}>{Strings.ST84}</Text>
<View style={{height: 1, backgroundColor: '#EEE', width: width, marginBottom: 0}}></View>

<View style={{margin: 15, marginTop: 0}}>
<PostComments postId={item.post_id} />
</View>

    </KeyboardAwareScrollView>

</ScrollView>
<SafeAreaView>
<View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
<BannerAd/>
</View>

</SafeAreaView>
</Container>
    );
  }
}

