import { Center, Text, VStack, ScrollView, Avatar, Row, Column,  Image, Box} from 'native-base';
import {  MaterialCommunityIcons  } from '@expo/vector-icons'
import { Button } from '../../components/button';
import { IconComponent } from '../../components/icon';
import { Header } from '../../components/Header';
import { SafeAreaView, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function Details (){
    const testando = [1, 2, 3, 4, 5, 6, 7, 8]
    
    return (
        <SafeAreaView>
            <Header 
                back
            />
        <ScrollView>
            <Center>
            <Image 
                source={{
                    uri: 'https://wallpaperaccess.com/full/317501.jpg'
                }}
                width={390} 
                height={280}
                alt='foto'
            />

            {/* <Carousel
                width={390}
                data={testando}
                renderItem={({ index }) => (
                    <Text>
                        {index}
                    </Text>

                )}
                />
                 */}
        
            </Center>
            <VStack padding={6} bgColor={"#EDECEE"}>

                <Row alignItems={'center'} >
                    <Avatar size={6} mr={2}/>
                    <Text>Markenna Baptista</Text>
                </Row>
                <Box width={43} height={17} borderRadius={20} bgColor={'gray.300'} mt={6} alignItems={'center'} justifyContent={'center'}>
                    <Text fontSize={10} >NOVO</Text>
                </Box>
                <Row justifyContent={'space-between'} mt={2}>
                    <Text fontSize={20} fontWeight={'semibold'}>Bicicleta</Text>
                    <Text color={"#647ac7"}  fontWeight={'bold'} fontSize={20} >R$ 120,00</Text>
                </Row>
                <Text mt={2} fontWeight={'400'} fontSize={14} lineHeight={18.2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptas accusantium, delectus eius fugit enim, debitis dolor cumque eveniet consequatur soluta distinctio maxime libero. Nobis asperiores doloremque saepe eius velit.</Text>
                <Row mt={6}>
                    <Text fontSize={14} lineHeight={18} fontWeight={'bold'}>Aceitar troca?</Text>
                    <Text ml={2}>Sim</Text>
                </Row>
                <Column>
                    <Text>Meios de pagamento:</Text>
                    <Row mt={1}>
                        <IconComponent name='barcode' size={5} mr={2} />
                        <Text>Boleto</Text>
                    </Row>
                    <Row mt={1}>
                    <IconComponent name='qrcode' size={5} mr={2} />
                        <Text>Pix</Text>
                    </Row>
                    <Row mt={1}>
                        <IconComponent name='cash' familyIcon={MaterialCommunityIcons} size={5} mr={2} />
                        <Text>Dinheiro</Text>
                    </Row>
                    <Row mt={1}>
                        <IconComponent name='creditcard' size={5} mr={2} />       
                        <Text>Cartão de Crédito</Text>
                    </Row>
                    <Row mt={1}>   
                        <IconComponent name='bank' size={5} mr={2} />
                        <Text>Depósito Bancário</Text>
                    </Row>
                </Column>
            </VStack>
            <VStack padding={6} marginBottom={4} >
                <Row justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={24} color={"#364d9d"} fontWeight={'bold'}>
                        <Text fontSize={12}>R$</Text>
                        120,00
                    </Text>
                    <Button 
                        iconLeftName={'phone'}
                        iconColor='white'
                        title='Entrar em Contato'
                        width={169}
                        height={42}
                    />
                </Row>
            </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}