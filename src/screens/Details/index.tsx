import { Center, Text, VStack, ScrollView, Avatar, Row, Column,  Image, Box, useToast} from 'native-base';
import {  MaterialCommunityIcons  } from '@expo/vector-icons'
import { Button } from '../../components/button';
import { IconComponent } from '../../components/icon';
import { Header } from '../../components/Header';
import { SafeAreaView} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useRoute } from '@react-navigation/native';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/loading';
import { AppError } from '../../utils/AppError';
import { ProductDetailsDTO } from '../../dtos/productDetailsDTO';
import { getIconName, transformLabel } from '../Preview/types';
import {  AntDesign  } from '@expo/vector-icons'
import { Linking } from 'react-native';

type RouteParamsProps = {
    productId: string;
}
export default function Details (){
    const images = ['https://wallpaperaccess.com/full/317501.jpg', 'https://wallpaperaccess.com/full/317502.jpg', 'https://wallpaperaccess.com/full/317503.jpg']
    const route = useRoute();
    const [loading, setIsLoading] = useState(false)
    const [ data, setData ] = useState<ProductDetailsDTO>({ } as ProductDetailsDTO)
    const toast = useToast()
    const { productId } = route.params as RouteParamsProps;
    
    async function loadProductDetails(productId:string){
        try{
            setIsLoading(true)
            const response = await api.get(`/products/${productId}`)
            setData(response.data)
        } catch (error) {
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

    async function openWhatsLink(){
        await Linking.openURL(`http://wa.me/+${data.tel}`)
    }
            
    useEffect(() => {
        loadProductDetails(productId)
    }, [])
    
    return (
        <SafeAreaView>
            <Header back/>
            {
            loading ? 
            <Loading/>
            :   
                <VStack>
                    <ScrollView height={'650px'} >
                        <Center>
                            <Carousel
                                width={390}
                                height={280}
                                data={data.product_images}
                                renderItem={({ index, item }) => (
                                    <Image 
                                        source={{ uri: `${api.defaults.baseURL}/images/${item.path}`}}
                                        width={390} 
                                        height={280}
                                        alt='foto'
                                    /> 
                                )}
                            />
                        </Center>
                        <VStack height={'full'} padding={6} bgColor={"#EDECEE"}>
                            <Row alignItems={'center'} >
                                <Avatar size={6} mr={2}/>
                                <Text>{data.name}</Text>
                            </Row>
                            <Box width={43} height={17} borderRadius={20} bgColor={'gray.300'} mt={6} alignItems={'center'} justifyContent={'center'}>
                                <Text fontSize={10} >{data.is_new ? 'novo' : 'usado'}</Text>
                            </Box>
                            <Row justifyContent={'space-between'} mt={2}>
                                <Text fontSize={20} fontWeight={'semibold'}>{data.name}</Text>
                                <Text color={"#647ac7"}  fontWeight={'bold'} fontSize={20} >R$ {data.price}</Text>
                            </Row>
                                <Text mt={2} fontWeight={'400'} fontSize={14} lineHeight={18.2}>
                                    {data.description}
                                </Text>
                            <Row mt={6}>
                                <Text fontSize={14} lineHeight={18} fontWeight={'bold'}>Aceitar troca?</Text>
                                <Text ml={2}>{data.accept_trade ? 'Sim' : 'Não'}</Text>
                            </Row>
                            <Column>
                                <Text>Meios de pagamento:</Text>
                                    {data.payment_methods?.map(item => {
                                        return (
                                            <Row mt={1}>
                                                <IconComponent familyIcon={item.name === "Dinheiro" ? MaterialCommunityIcons : AntDesign } 
                                                name={getIconName(item.name)} size={5} mr={2} />
                                                <Text>{transformLabel(item.name)}</Text>
                                            </Row>
                                        )
                                    })}
                            </Column>
                        </VStack>
                    </ScrollView>
                        <VStack padding={6} marginBottom={4} >
                            <Row justifyContent={'space-between'} alignItems={'center'}>
                                <Text fontSize={24} color={"#364d9d"} fontWeight={'bold'}>
                                    <Text fontSize={12}>R$</Text>
                                    {data.price}
                                </Text>
                                <Button 
                                    iconLeftName={'phone'}
                                    iconColor='white'
                                    title='Entrar em Contato'
                                    width={169}
                                    height={42}
                                    onPress={openWhatsLink}
                                />
                            </Row>
                        </VStack>
                </VStack>
            }
        </SafeAreaView>
    );
}