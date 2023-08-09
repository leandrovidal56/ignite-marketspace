import { Center, Text, VStack, ScrollView, Avatar, Row, Column,  Image, Box, Modal, useToast} from 'native-base';
import {  MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons'
import { Button } from '../../components/button';
import { IconComponent } from '../../components/icon';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ProductDetailsDTO } from '../../dtos/productDetailsDTO';
import { api } from '../../services/api';
import { useRoute } from '@react-navigation/native';
import { AppError } from '../../utils/AppError';
import { Loading } from '../../components/loading';
import { getIconName, transformLabel } from '../Preview/types';
import {  AntDesign  } from '@expo/vector-icons'

type RouteParamsProps = {
    productId: string;
}

export default function DetailsMyAdverts (){

    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState(true);
    const [loading, setIsLoading] = useState(false)
    const [ data, setData ] = useState<ProductDetailsDTO>({ } as ProductDetailsDTO)
    const toast = useToast();
    const route = useRoute();

    const { productId } = route.params as RouteParamsProps;

    async function loadDetailsMyAdvert(productId:string){
        try{
            setIsLoading(true)
            console.log(productId, 'take ')
            const response = await api.get(`/products/${productId}`)
            setData(response.data)

        }catch(error){
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

    async function deleteMyProductAdvert(productId: string){
        try{
            setIsLoading(true)
            console.log(productId, 'delete')
            const response = await api.delete(`/products/${productId}`)
            console.log(response)
            console.log(response.data)
            Alert.alert('Excluído com sucesso')
            navigation.navigate('home')
        }catch(error){ 
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível excluir seu anúncio. Tente novamente mais tarde.' 
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })

        }finally{
            setIsLoading(false)
        }
    }
    function handleEditMyAdvert(){
        navigation.navigate('editAdverts', {data})
    }
    
    function openModal(){
        setShowModal(true)
    }

    useEffect(() => {
        loadDetailsMyAdvert(productId)
    }, [])
    

    return (
        <VStack justifyContent={'center'} paddingTop={12}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content width="full" bottom={3} marginTop={'auto'}>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <Text fontSize={14} fontWeight={"bold"}>Deseja excluir o anúncio</Text>
                            <Row justifyContent={'space-between'} mt={5}>
                                <Button 
                                    title="Não"
                                    backgroundColor={'#D9D8DA'}
                                    width={157}
                                    variant={'outline'}
                                    onPress={() => setShowModal(false)}
                                />
                                <Button 
                                    title="Sim"
                                    backgroundColor={'#1A181B'}
                                    width={157}
                                    onPress={() => deleteMyProductAdvert(data.id)}
                                />
                            </Row>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Header 
                back
                showIconRight
                navigationIconRight={handleEditMyAdvert}
            />
            {
            loading ? 
            <Loading/>
            : 
            <ScrollView marginBottom={10}>
                <Center background={active ? '#1A181B' : 'transparent'}>
                    {active ? 
                        <Text position={'absolute'} fontWeight={'bold'} color={'#F7F7F8'} zIndex={10}>
                            Anúncio desativado
                        </Text>
                        : ''
                    }
                    <Image 
                        source={{
                            uri: 'https://wallpaperaccess.com/full/317501.jpg'
                        }}
                        width={390} 
                        height={280}
                        alt='foto'
                        opacity={active ? 0.6 : 1}
                    />
                </Center>
                <VStack padding={6} bgColor={"#EDECEE"} >
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
                        <Text fontSize={14} lineHeight={18} fontWeight={'bold'} mt={4}>Meios de pagamento:</Text>
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
                <VStack padding={6}>
                    <Button 
                        iconLeftName='poweroff' 
                        iconColor='white'
                        title={active? 'Reativar anúncio' : 'Desativar anúncio'}
                        height={42}
                        background={!active? '#647AC7' : '#1A181B'}
                        textWeight={'bold'}
                    />
                    <Button 
                        iconLeftName='trash'
                        title='Excluir anúncio'
                        iconFamily={FontAwesome}
                        height={42}
                        variant={'outline'}
                        mt={2}
                        onPress={() => openModal(data.id)}
                    />
                </VStack>
            </ScrollView>
            }
        </VStack>
    );
}