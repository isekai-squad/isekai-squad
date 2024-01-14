import { Avatar, AvatarFallbackText, AvatarImage, Button, ButtonText, Divider, HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import React from 'react'
import { ScrollView } from 'react-native'

const InterviewNotif = () => {
  return (
    <VStack space='md'>
        <HStack alignItems='center' space='sm'>
            <Avatar size='lg' borderRadius='$full'>
                <AvatarFallbackText>s</AvatarFallbackText>
                <AvatarImage
                alt='404'
                source={{uri : "https://images.openfoodfacts.org/images/products/619/401/960/5807/front_fr.10.full.jpg"}}
                />
            </Avatar>
            <VStack w='$56' space='sm'>
                <Heading size="md">Wakey Wakey its time for schoo</Heading>
                <HStack space="md">
                    <Text>Today</Text>
                    <Divider orientation="vertical" />
                    <Text>09:24 am</Text>
                </HStack>
            </VStack>
            <Button w={30} h={30} bgColor='#674188' borderRadius={8}>
                <ButtonText w={23} h={25} fontSize={10}>New</ButtonText>
            </Button>
        </HStack>
        <Text>Boga is a brand of Tunisian carbonated soft drinks, produced by the Société de Fabrication des Boissons de Tunisie</Text>
    </VStack>
  )
}

export default InterviewNotif