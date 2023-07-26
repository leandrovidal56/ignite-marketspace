import { Center, Text, VStack, ScrollView, Avatar, Row, Column,  Image, Box, useToast} from 'native-base';
import {  MaterialCommunityIcons  } from '@expo/vector-icons'
import { Button } from '../../components/button';
import { IconComponent } from '../../components/icon';
import { Header } from '../../components/Header';
import { SafeAreaView, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useRoute } from '@react-navigation/native';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/loading';
import { AppError } from '../../utils/AppError';

type RouteParamsProps = {
    productId: string;
}
export default function Details (){
    const testando = [1, 2, 3]
    const testando1 = ['https://wallpaperaccess.com/full/317501.jpg', 'https://wallpaperaccess.com/full/317502.jpg', 'https://wallpaperaccess.com/full/317503.jpg']
    const route = useRoute();
    const [loading, setIsLoading] = useState(false)
    const [ data, setData] = useState([])
    const toast = useToast()
    async function loadProductDetails(productId:string){
        try{
            setIsLoading(true)
            const response = await api.get(`/products/${productId}`)
            console.log(response, 'take a moment response')
            console.log(response.data, 'take a moment response')
            setData(response.data)
        } catch (error) {
            console.log(error, 'take error')
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do produto. Tente novamente mais tarde.' 
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })

        }finally{
            setIsLoading(false)
        }

    }
    const { productId } = route.params as RouteParamsProps;

    function showLogs(){

        
        // console.log(productId)
        // console.log(data)
        // console.log(data.accept_trade ? 'sim' : 'não')
        // console.log(data.is_active ? 'sim' : 'não')
        // console.log(data.is_new ? 'sim' : 'não')
    
        console.log(data.payment_methods)
        data.payment_methods.map((item, index) =>{
                    console.log(item.name)
                } )
                // console.log(data.price)
                // console.log(data.user)
                // console.log(data.user.name)
                // console.log(data.user.avatar)
                // console.log(data.user.tel)
                // console.log(data.description)
            
    }
            
    useEffect(()=>{
        loadProductDetails(productId)
    }, [])
    
    return (
            
        <SafeAreaView>
                <Header back/>
                {
            loading ? 
            <Loading/>
        :
                <ScrollView>
                    <Center>
                        <Carousel
                            width={390}
                            height={280}
                            data={testando1}
                            renderItem={({ index }) => (
                                <Image 
                                    source={{ uri: `${testando1[index]}`}}
                                    width={390} 
                                    height={280}
                                    alt='foto'
                                /> 
                            )}
                        />
                    </Center>
                    <VStack padding={6} bgColor={"#EDECEE"}>

                        <Row alignItems={'center'} >
                            <Avatar size={6} mr={2}/>
                            <Text>{data.name}</Text>
                            {/* <Text>Teste</Text> */}
                        </Row>
                        <Box width={43} height={17} borderRadius={20} bgColor={'gray.300'} mt={6} alignItems={'center'} justifyContent={'center'}>
                            {/* <Text fontSize={10} >{data.is_new ? 'novo' : 'usado'}</Text> */}
                            <Text fontSize={10} >novo</Text>
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
                                onPress={showLogs}
                            />
                        </Row>
                    </VStack>
                </ScrollView>
                }
                </SafeAreaView>
            
    );
}