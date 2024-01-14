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
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NormalNotif = () => {
  return (
    <HStack space="xs" alignItems="center">
      <Avatar size="lg" borderRadius="$full" mr={4}>
        <AvatarFallbackText>a</AvatarFallbackText>
        <AvatarImage
          alt="404"
          source={{
            uri: "https://images.openfoodfacts.org/images/products/619/401/960/5807/front_fr.10.full.jpg",
          }}
        />
      </Avatar>
      <VStack w="$1/2" space="md">
        <Heading size="md">Boga disliked your post</Heading>
        <HStack space="md">
          <Text>Today</Text>
          <Divider orientation="vertical" />
          <Text>09:24 am</Text>
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
        <MenuItemLabel size="sm">BAbabaooye</MenuItemLabel>
        </MenuItem>
      </Menu>
    </HStack>
  );
};

export default NormalNotif;
