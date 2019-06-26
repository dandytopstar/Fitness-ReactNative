import React, {Component} from 'react';
import * as firebase from 'firebase';
import { NavigationActions, StackNavigator, withNavigation} from 'react-navigation';
import{AsyncStorage, TouchableOpacity, Dimensions, View, Image, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Container, Body, Thumbnail, Text, List, Right, ListItem} from 'native-base';
import ConfigApp from '../utils/ConfigApp';
import ListEmpty from './ListEmpty';

var styles = require('../../assets/files/Styles');
var {height, width} = Dimensions.get('window');

class PostFav extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      posts: []
    }

  }

  componentDidMount () {
    this.fetchPosts();
  }

  PostDetails (item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PostDetailsScreen',
      params: {item}
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderFooterPosts = () => {
  const posts = this.state.posts
  if (posts.length != 0) return null;


  return (
    <ListEmpty/>
   );
};

removePost = async (post_id) => {
try {

var user = firebase.auth().currentUser;
uid = user.uid;

const posts = await AsyncStorage.getItem('posts');
let postsFav = JSON.parse(posts);
postsItems = postsFav.filter(function(e){ return e.post_id !== post_id && e.userId == uid })

await AsyncStorage.setItem('posts', JSON.stringify(postsItems));

this.setState({ 
...this.state, 
posts: postsItems || [] 
}); 

} catch(error) {

}}; 

  render () {

    return (

<ScrollView>
 <View style={{margin: 5, marginTop: 5}}> 

<List>


<FlatList
          data={this.state.posts}
          refreshing="true"
          renderItem={({item, index}) =>

<ListItem style={{paddingLeft: 0, marginLeft: 0, backgroundColor:'#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1}}  onPress={() => this.PostDetails(item)} >
              <Thumbnail square size={80} source={{ uri: ConfigApp.URL+'images/'+item.post_image }} style={{paddingLeft: 10, marginLeft: 10, borderRadius: 6}} />
              <Body style={{paddingLeft: 0, marginLeft: 0}}>
                <Text numberOfLines={2} style={{fontSize: 14, marginBottom: 3}}>
                {item.post_title}
                </Text>
              </Body>
              <Right>
              <TouchableOpacity onPress={this.removePost.bind(this, item.post_id)} activeOpacity={1}>
                <Text note>
                <Icon name="close" style={{fontSize: 19}}/>
                </Text>
                </TouchableOpacity>

              </Right>
            </ListItem>

          
}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={this.renderFooterPosts}


        /> 

</List>

  </View> 
</ScrollView>

    )
  }

    async fetchPosts () {
      var user = firebase.auth().currentUser;
      uid = user.uid;

      let postsJSON= await AsyncStorage.getItem('posts');
      let postsFav = JSON.parse(postsJSON);
      postsItems = postsFav.filter(function(e){
            return e.userId == uid
        })
      const postsArray = postsItems || [];
      this.setState({
        ...this.state,
        posts: postsArray
      });
  }

}

export default withNavigation(PostFav);
