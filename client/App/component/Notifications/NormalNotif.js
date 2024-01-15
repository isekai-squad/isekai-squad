import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Divider,
  GripVerticalIcon,
  HStack,
  Heading,
  Icon,
  Image,
  Menu,
  MenuItem,
  MenuItemLabel,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NormalNotif = ({data}) => {

  const formatTimeDifference = (createdAt) => {
    const now = moment();
    const postTime = moment(createdAt, "YYYY-MM-DD HH:mm");
    const duration = moment.duration(now.diff(postTime));
    if (duration.asMinutes() < 60) {
      // Less than 60 minutes
      return moment.duration(duration).humanize(true);
    } else if (duration.asHours() < 24) {
      // Less than 24 hours
      const hours = Math.floor(duration.asHours());
      return `${hours}h`;
    } else {
      // More than 24 hours
      const days = Math.floor(duration.asDays());
      return days === 1 ? "one day" : `${days} days`;
    }
  };
  
  const navigation = useNavigation()

  const exactTime = (createdAt) => {
    const postDate = new Date(createdAt)
    return postDate.toLocaleTimeString()
  }

  return (
    <HStack space="xs" alignItems="center">
      <Avatar size="lg" borderRadius="$full" mr={4}>
        <AvatarFallbackText>I</AvatarFallbackText>
        <AvatarImage
          alt="404"
          source={{
            uri: data.sender.pdp,
          }}
        />
      </Avatar>
      <VStack w="$1/2" space="md">
        <Heading size="md" onPress={() => navigation.navigate('ForumCategories')}>{data.content}</Heading>
        <HStack space="md">
          <Text>{formatTimeDifference(data.created_at)}</Text>
          <Divider orientation="vertical" />
          <Text>{exactTime(data.created_at)}</Text>
        </HStack>
      </VStack>
       <Image
        alt="404"
        source={{
          uri: "https://media.auchan.fr/A0220140206000628731PRIMARY_2048x2048/B2CD/",
        }}
        size="md"
        borderRadius={10}
      />
      <Menu
      placement="bottom"
      trigger={({...triggerProps})=>{
        return  (<Button {...triggerProps} size="md" variant="link">
            <MaterialCommunityIcons name="dots-vertical" size={26} />
        </Button>)
    }}
    >
        <MenuItem key='Report' textValue="Report">
            <MaterialCommunityIcons name="trash-can-outline" style={{marginRight : 2}} color='red'/>
        <MenuItemLabel size="sm" color="$red500">Report</MenuItemLabel>
        </MenuItem>
        <MenuItem key='da' textValue="da">
        <MenuItemLabel size="sm">Mark as Read</MenuItemLabel>
        </MenuItem>
      </Menu>
    </HStack>
  );
};

export default NormalNotif;
