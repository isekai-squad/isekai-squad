import { Avatar, AvatarFallbackText, AvatarImage, Button, ButtonText, Divider, HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import React from 'react'
import { ScrollView } from 'react-native'

const InterviewNotif = () => {
  return (
    <VStack space='md'>
        <HStack alignItems='center' space='xs'>
            <Avatar size='lg' borderRadius='$full'>
                <AvatarFallbackText>s</AvatarFallbackText>
                <AvatarImage
                alt='404'
                source={{uri : "https://images.openfoodfacts.org/images/products/619/401/960/5807/front_fr.10.full.jpg"}}
                />
            </Avatar>
            <VStack w='$56' space='sm'>
                <Heading size="md">Wakey Wakey its time for schoo</Heading>
                <HStack space="md" alignItems='center'>
                    <Text>Today</Text>
                    <Divider orientation="vertical" />
                    <Text>09:24 am</Text>
            <Button w={100} bgColor='#674188' borderRadius={8}>
                <ButtonText  fontSize={12}>Accepted</ButtonText>
            </Button>
                </HStack>
            </VStack>
        </HStack>
        <Text>Boga is a brand of Tunisian carbonated soft drinks, produced by the Société de Fabrication des Boissons de Tunisie</Text>
    </VStack>
  )
}

export default InterviewNotif