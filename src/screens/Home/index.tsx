import { Center, Heading, Text, Modal, VStack, Checkbox, ScrollView, Avatar, Row, Column, Divider, Switch, useToast} from 'native-base';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BoxSale } from '../../components/boxSale';
import { IconComponent } from '../../components/icon';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { BottomNavigation } from '../../components/bottomNavigation';
import { SafeAreaView, LogBox } from 'react-native';
import { api } from '../../services/api';
import { useAuth } from '../../hookes/useAuth';
import { AppError } from '../../utils/AppError';
import { Loading } from '../../components/loading';

LogBox.ignoreLogs(['We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320'])

export default function Home (){
    const { user, productGetStorageData } = useAuth()

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const [newProduct, setNewProduct] = useState(false)
    const [usedProduct, setUsedProduct] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [ data, setData] = useState([])
    const toast = useToast()

    function clickNewProduct (){
        setNewProduct(!newProduct)
    }
    function clickUsedProduct (){
        setUsedProduct(!usedProduct)
    }

    function handleNewAdvert(){
        navigation.navigate('createAdverts')
    }

    function handleGoMyAdvert(){
        navigation.navigate('adverts')
    }

    function handleDetails(productId: string){
        navigation.navigate('details', {productId})
    }

    function openModal(){
        setShowModal(true)
    }

    function closeModal(){
        setShowModal(false)
    }


    async function loadMyProducts(){
        try{
            const productsSaved = await productGetStorageData()
            setData(productsSaved)        
        }catch(error){
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar seus anúncios. Tente novamente mais tarde.' 
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })

        }finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        loadMyProducts()
    }, [])
    
    const [showModal, setShowModal] = useState(false);
    const [change, setChange] = useState(false);

    return (
        <SafeAreaView style={{ backgroundColor: '#EDECEE', flex: 1}} >
        {
            loading 
            ? <Loading/>
        :
        <>
            <VStack padding={2} mb={8} alignItems={'center'} >
            <Center justifyContent={'space-between'} height={42} width={350} flexDirection={'row'}> 
                    <Row alignItems={'center'}>
                        <Avatar
                        source={{
                            uri:  `${api.defaults.baseURL}/images/${user.avatar}`
                        }}
                        />
                        <Column ml={4}>
                            <Text>Boas Vindas,</Text>
                            <Heading>{user?.name ?? ''}!</Heading>
                        </Column>
                    </Row>
                    <Button
                        background={'black'}
                        title='Criar anúncio'
                        width={139}
                        iconLeftName='plus'
                        textWeight={'bold'}
                        iconColor='#F7F7F8'
                        onPress={handleNewAdvert}
                    />
            </Center>
            
            <ScrollView width={350}  showsVerticalScrollIndicator={false}  >
                <Modal isOpen={showModal} onClose={closeModal}>
                    <Modal.Content width="400px" bottom={3} marginTop={'auto'}>
                    <Modal.CloseButton />
                    <Text padding={4} fontSize={14} fontWeight={"bold"}>Filtrar anúncios</Text>
                    <Modal.Body>
                    <Text fontSize={14} fontWeight={"bold"}>Condição</Text>
                        <Row mt={3}>
                            <Button 
                                title='Novo'
                                width={76}
                                height={28}
                                padding={0}
                                fontSize={10}
                                fontWeight={'bold'}
                                background={newProduct ? '#647AC7' : 'gray.300'}
                                borderRadius={20}
                                mr={2}
                                onPress={clickNewProduct}
                                iconRightName={newProduct ? 'close' : ''} 
                                iconColor='white'
                            />
                            <Button 
                                title='Usado'
                                width={76}
                                height={28}
                                padding={0}
                                fontSize={10}
                                fontWeight={'bold'}
                                background={usedProduct ? '#647AC7' : 'gray.300'}
                                borderRadius={20}
                                mr={2}
                                onPress={clickUsedProduct}
                                iconRightName={usedProduct ? 'close' : ''} 
                                iconColor='white'
                            />
                        </Row>
                        <Text fontSize={14} fontWeight={"bold"} mt={6}>Aceita troca ?</Text>
                        <Switch size="md" mt={3} mb={6} value={change} onChange={() => setChange(!change)}/>
                        <Text fontSize={14} fontWeight={"bold"}>Meios de pagamento aceitos</Text>
                        <Checkbox mt={3}
                            value="boleto"
                            >
                            Boleto
                        </Checkbox>
                        <Checkbox mt={3}
                            value="pix"
                            >
                            Pix
                        </Checkbox>
                        <Checkbox mt={3}
                            value="dinheiro"
                            >
                            Dinheiro
                        </Checkbox>
                        <Checkbox mt={3}
                            value="cartao de credito"
                            >
                            Cartão de Crédito
                        </Checkbox>
                        <Checkbox mt={3}
                            value="deposito bancario"
                            >
                            Depósito Bancário
                        </Checkbox>
                    </Modal.Body>
                        <Row width={'full'} justifyContent={'space-between'} padding={4}>
                            <Button 
                                title="Resetar filtros"
                                backgroundColor={'#D9D8DA'}
                                width={157}
                                variant={'outline'}
                                onPress={closeModal}
                            />
                            <Button 
                                title="Aplicar filtros"
                                backgroundColor={'#1A181B'}
                                width={157}
                                onPress={closeModal}
                            />
                        </Row>
                    </Modal.Content>
                </Modal>
                <VStack mt={8} mb={16}>
                    <Text color={'#5F5B62'}>Seus produtos anunciados para venda</Text>
                    <Row mt={4} alignItems={'center'} justifyContent={'space-between'} padding={4} background={"#647AC71A"}>
                        <Row  alignItems={'center'}>
                            <IconComponent
                                name="tag"
                                size={5}
                                color="#364D9D"                            
                            />
                            <Column ml={4}>
                                <Heading color="#3E3A40">{data.length}</Heading>
                                <Text color="#3E3A40">anúncios ativos</Text>
                            </Column>
                        </Row>
                        <Button 
                            title='Meus anúncios'
                            width={111}
                            backgroundColor={'none'}
                            iconRightName='arrowright'
                            textColor='#364D9D'
                            iconColor='#364D9D'
                            mr={5}
                            onPress={handleGoMyAdvert}
                        
                        />
                    </Row>
                        <Text mt={8}>Compre produtos variados</Text>
                        <Input 
                            rightElement={
                                <Row alignItems={'center'}>
                                    <IconComponent
                                        name="search1"
                                        size={5}
                                        color="#1E1E1E"
                                        mr={3}
                                    />
                                    <Divider width={0.5} height={8} />
                                    <IconComponent
                                        name="filter"
                                        size={5}
                                        color="#1E1E1E"
                                        ml={3}
                                        mr={3}
                                        onPress={openModal}
                                    />
                                    
                                </Row>
                            }
                            placeholder='Buscar anúncio'
                        />
                        

                            <Row justifyContent={'space-between'} mt={6}>
                                {data.map((item, index) => (
                                    <BoxSale 
                                    key={index}
                                    price={item.price}
                                    title={item.name}
                                    type={item.is_new ? 'novo' : 'usado'}
                                    imageAdress={item?.product_images[index]?.name}
                                    altImage='Foto do anúncio'
                                    onPress={() => handleDetails(item.id)}
                                    hideProfilePicture={true}
                                    />  
                                    ))}
                            </Row>

                </VStack>
            </ScrollView>
            </VStack>
            <BottomNavigation/>
        </>
            
        }
        </SafeAreaView>
    );
}