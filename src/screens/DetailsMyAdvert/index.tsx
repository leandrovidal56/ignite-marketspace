import { Center, Text, VStack, ScrollView, Avatar, Row, Column,  Image, Box, Modal} from 'native-base';
import {  MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons'

import { Button } from '../../components/button';
import { IconComponent } from '../../components/icon';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { useState } from 'react';
export default function DetailsMyAdverts (){

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState(true);
    
    function handleEditMyAdvert(){
        navigation.navigate('editAdverts')
    }
    
    function openModal(){
        setShowModal(true)
    }

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
                                onPress={() => setShowModal(false)}
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
        <ScrollView marginBottom={10}>
            <Center 
            background={active ? '#1A181B' : 'transparent'}
            >
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
                    <Text>Markenna Baptista</Text>
                </Row>
                <Box width={43} height={17} borderRadius={20} bgColor={'gray.300'} mt={6} alignItems={'center'} justifyContent={'center'}>
                    <Text fontSize={10} >NOVO</Text>
                </Box>
                <Row justifyContent={'space-between'} mt={2}>
                    <Text fontSize={20} fontWeight={'semibold'}>Bicicleta</Text>
                    <Text color={"#647ac7"}  fontWeight={'bold'} fontSize={20} >R$ 120,00</Text>
                </Row>
                <Text color={'#3E3A40'} fontWeight={'normal'} fontSize={14} lineHeight={18.2} mt={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptas accusantium, delectus eius fugit enim, debitis dolor cumque eveniet consequatur soluta distinctio maxime libero. Nobis asperiores doloremque saepe eius velit.</Text>
                <Row mt={6}>
                    <Text fontSize={14} lineHeight={18} fontWeight={'bold'}>Aceitar troca?</Text>
                    <Text ml={2}>Sim</Text>
                </Row>
                <Column>
                    <Text fontSize={14} lineHeight={18} fontWeight={'bold'} mt={4}>Meios de pagamento:</Text>
                    <Row mt={2}>
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
                        onPress={openModal}
                    />
            </VStack>
            </ScrollView>
        </VStack>
    );
}