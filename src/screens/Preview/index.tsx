import { Center, Text, VStack, ScrollView, Avatar, Row, Column, Image, Box, useToast} from 'native-base';
import { Button } from '../../components/button';
import { IconComponent } from '../../components/icon';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import {  MaterialCommunityIcons  } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native';
import { useAuth } from '../../hookes/useAuth';
import { api } from '../../services/api';
import { Loading } from '../../components/loading';
import { getIconName, transformLabel } from './types';
import {  AntDesign  } from '@expo/vector-icons'
import { useState } from 'react';
import { AppError } from '../../utils/AppError';

export default function Preview (){
    const [isLoadingProductSave, setIsLoadingProductSave ] = useState(false)

    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const { product, user, productSave } = useAuth()
    const toast = useToast()
    console.log(product.image, 'take images')
    


    async function handleFinished(){
        try{
            setIsLoadingProductSave(true)
            await productSave()
            await toast.show({
                title: 'Produto cadastrado com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            })
            navigation.navigate('adverts');

        }catch(error){
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível salvar seu produto. Tente novamente mais tarde.' 
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
            
        } finally{
            setIsLoadingProductSave(false)
        }
        
    }
    function handleGoBack(){
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ backgroundColor:"#647AC7"}}>
            <Box 
                height={90}
                width={'full'}
                background={'#647AC7'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Text fontSize={16} fontWeight={'bold'} textAlign={'center'} lineHeight={21} color="#F7F7F8">
                Pré visualização do anúncio</Text>
                <Text mt={1} fontSize={14} fontWeight={'normal'} textAlign={'center'} lineHeight={18} color="#F7F7F8">
                É assim que seu produto vai aparecer</Text>

            </Box>
        <ScrollView >
        {!product.image ? 
            <Loading/> : 
            
            <VStack justifyContent={'center'} bgColor={'#EDECEE'} >
                <Center>
                <Image 
                    source={{
                        uri:  `${product.image}`
                    }}
                    width={390} 
                    height={280}
                    alt='foto'
                />
                </Center>
                <VStack 
                paddingX={6}
                paddingTop={6}
                bgColor={"#EDECEE"}
                paddingBottom={'20'}
                >
                    <Row alignItems={'center'} >
                        <Avatar size={6} mr={2} 
                        source={{
                            uri:  `${api.defaults.baseURL}/images/${user.avatar}`
                        }}
                        />
                        <Text>{user.name}</Text>
                    </Row>
                    <Box width={43} height={17} borderRadius={20} bgColor={'gray.300'} mt={6} alignItems={'center'} justifyContent={'center'}>
                        <Text fontSize={10} >{product.is_new === true ? 'Novo' : 'Usado'}</Text>
                    </Box>
                    <Row justifyContent={'space-between'} mt={2}>
                        <Text fontSize={20} fontWeight={'semibold'}>{product.name}</Text>
                        <Text color={"#647ac7"}  fontWeight={'bold'} fontSize={20} >R$ {product.price}</Text>
                    </Row>
                    <Text mt={2} fontWeight={'normal'} fontSize={14} lineHeight={18.2}>{product.description}</Text>
                    <Row mt={6}>
                        <Text fontSize={14} lineHeight={18} fontWeight={'bold'}>Aceitar troca?</Text>
                        <Text ml={2}>{product.accept_trade ? 'Sim' : 'Não'}</Text>
                    </Row>
                    <Column>
                        <Text fontSize={14} lineHeight={18} fontWeight={'bold'}>Meios de pagamento:</Text>
                        
                        {product.payment_methods.map(item => {
                            return(
                                <Row mt={1}>
                                    <IconComponent familyIcon={item === "cash" ? MaterialCommunityIcons : AntDesign } name={getIconName(item)} size={5} mr={2} />
                                    <Text>{transformLabel(item)}</Text>
                                </Row>
                            )
                        })}
                    </Column>
                    <Row mt={6} justifyContent={'space-between'} alignItems={'center'}>
                        <Button 
                            iconLeftName='arrowleft'
                            iconColor='#3E3A40'
                            textColor='#3E3A40'
                            title='Voltar e editar'
                            width={157}
                            height={42}
                            variant={'outline'}
                            onPress={handleGoBack}
                        />
                        <Button 
                            iconLeftName='tag'
                            iconColor='white'
                            title='Publicar'
                            width={157}
                            height={42}
                            onPress={handleFinished}
                            isLoading={isLoadingProductSave}
                        />
                    </Row>
                </VStack>
            </VStack>
            }
        </ScrollView>
    </SafeAreaView>
    );
}
