import React from 'react';
import SideMenu from './SideMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerNavigator, StackNavigator} from 'react-navigation'
import {Dimensions, Text} from "react-native";

var {height, width} = Dimensions.get('window');

import HomeScreen from '../screens/Home';
import WorkoutsScreen from '../screens/Workouts';
import ExercisesScreen from '../screens/Exercises';
import DietsScreen from '../screens/Diets';
import PostsScreen from '../screens/Posts';
import EBodypartsScreen from '../screens/EBodyparts';
import EquipmentsScreen from '../screens/Equipments';
import WGoalsScreen from "../screens/WGoals";
import WLevelsScreen from "../screens/WLevels";
import ExercisesByMuscleScreen from "../screens/ExercisesByMuscle";
import ExercisesByEquipmentScreen from "../screens/ExercisesByEquipment";
import WorkoutsByGoalScreen from "../screens/WorkoutsByGoal";
import WorkoutsByLevelScreen from "../screens/WorkoutsByLevel";
import PostsByTagScreen from "../screens/PostsByTag";
import DietsByCategoryScreen from "../screens/DietsByCategory";
import WorkoutDetailsScreen from "../screens/WorkoutDetails";
import ExerciseDetailsScreen from "../screens/ExerciseDetails";
import DietDetailsScreen from "../screens/DietDetails";
import PostDetailsScreen from "../screens/PostDetails";
import VideoExerciseScreen from "../screens/VideoExercise";
import Day1Screen from "../screens/Day1";
import Day2Screen from "../screens/Day2";
import Day3Screen from "../screens/Day3";
import Day4Screen from "../screens/Day4";
import Day5Screen from "../screens/Day5";
import Day6Screen from "../screens/Day6";
import Day7Screen from "../screens/Day7";
import ProfileScreen from "../screens/Profile";
import LogoutScreen from "../screens/Logout";
import WorkoutSearchScreen from "../screens/WorkoutSearch";
import WorkoutResultsScreen from "../screens/WorkoutResults";
import CalculatorScreen from "../screens/Calculator";
import QuotesScreen from "../screens/Quotes";
import SettingsScreen from "../screens/Settings";
import TermsScreen from "../screens/Terms";
import AboutUsScreen from "../screens/AboutUs";
import TagsScreen from "../screens/Tags";
import CategoriesScreen from "../screens/Categories";
import ContactUsScreen from "../screens/ContactUs";



const leftIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={27}
	color="white"
	onPress={() => navigation.navigate('DrawerOpen')}
/>;

const navigationOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f39c12',
      shadowOpacity: 0,
      elevation: 0,
    },
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold'
    }
  }
};

const HomeNavigator = StackNavigator(
{
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
	  headerLeft: leftIcon(navigation, 'md-menu')
	})
  },
  WorkoutsScreen: {
    screen: WorkoutsScreen
  },
  ExercisesScreen: {
    screen: ExercisesScreen
  },
  DietsScreen: {
    screen: DietsScreen
  },
  PostsScreen: {
    screen: PostsScreen
  },
  EBodypartsScreen: {
    screen: EBodypartsScreen
  },
  EquipmentsScreen: {
    screen: EquipmentsScreen
  },
  ExercisesByMuscleScreen: {
    screen: ExercisesByMuscleScreen
  },
  ExercisesByEquipmentScreen: {
    screen: ExercisesByEquipmentScreen
  },
  WorkoutsByGoalScreen: {
    screen: WorkoutsByGoalScreen
  },
  WorkoutsByLevelScreen: {
    screen: WorkoutsByLevelScreen
  },
  PostsByTagScreen: {
    screen: PostsByTagScreen
  },
  DietsByCategoryScreen: {
    screen: DietsByCategoryScreen
  },
  TagsScreen: {
    screen: TagsScreen
  },
  CategoriesScreen: {
    screen: CategoriesScreen
  },
  WGoalsScreen: {
    screen: WGoalsScreen
  },
  WLevelsScreen: {
    screen: WLevelsScreen
  },
  Day1Screen: {
    screen: Day1Screen
  },
  Day2Screen: {
    screen: Day2Screen
  },
  Day3Screen: {
    screen: Day3Screen
  },
  Day4Screen: {
    screen: Day4Screen
  },
  Day5Screen: {
    screen: Day5Screen
  },
  Day6Screen: {
    screen: Day6Screen
  },
  Day7Screen: {
    screen: Day7Screen
  },
  WorkoutDetailsScreen: {
    screen: WorkoutDetailsScreen
  },
  VideoExerciseScreen: {
    screen: VideoExerciseScreen
  },
  ExerciseDetailsScreen: {
    screen: ExerciseDetailsScreen
  },
  DietDetailsScreen: {
    screen: DietDetailsScreen
  },
  PostDetailsScreen: {
    screen: PostDetailsScreen
  },
  ProfileScreen: {
    screen: ProfileScreen
  },
  LogoutScreen: {
    screen: LogoutScreen
  },
  WorkoutSearchScreen: {
    screen: WorkoutSearchScreen
  },
  WorkoutResultsScreen: {
    screen: WorkoutResultsScreen
  },
  CalculatorScreen: {
    screen: CalculatorScreen
  },
  QuotesScreen: {
    screen: QuotesScreen
  },
  SettingsScreen: {
    screen: SettingsScreen
  },
  AboutUsScreen: {
    screen: AboutUsScreen
  },
  TermsScreen: {
    screen: TermsScreen
  },
  ContactUsScreen: {
    screen: ContactUsScreen
  },
}, navigationOptions

);

const MainNavigator = DrawerNavigator({
Home: {
    screen: HomeNavigator,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: width * .7,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

export default MainNavigator;