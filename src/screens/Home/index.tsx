import { Center, Heading, Text, Modal, VStack, Checkbox, Avatar, Row, Column, Divider, Switch, useToast, FlatList} from 'native-base';
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
import { useAuth } from '../../hooks/useAuth';
import { useProduct } from '../../hooks/useProduct';
import { AppError } from '../../utils/AppError';
import { Loading } from '../../components/loading';
import { IProduct } from '../../interfaces/IProduct';
import { IPaymentMethods } from '../../interfaces/IPaymentMethods';

LogBox.ignoreLogs(['We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320'])

export default function Home (){
    const { user } = useAuth()
    const {  productGetStorageData } = useProduct()

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const [showModal, setShowModal] = useState(false);
    const [loading, setIsLoading] = useState(false)
    const [data, setData] = useState<IProduct[]>([] as IProduct[]);
    const [myProduct, setMyProduct] = useState([])
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethods[]>([]);
    const [search, setSearch] = useState('');
    const toast = useToast()
    const [acceptTrade, setAcceptTrade] = useState<boolean | null>(null);
    const [isNew, setIsNew] = useState<boolean | null>(null);


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

    async function handleResetFilter(){
        try{
            closeModal()
            setIsLoading(true)
            const response = await api.get('/products/')
            setData(response.data)        
            const lengthAdvert = await productGetStorageData()
            setMyProduct(lengthAdvert)
            setPaymentMethods([])
            setIsNew(null)
            setAcceptTrade(null)
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


    async function fetchFilterProducts(){
        try{
            let filter = `?query=${search}`;

            if (isNew !== null) {
            filter += `&is_new=${isNew}`;
            }
            if (acceptTrade !== null) {
            filter += `&accept_trade=${acceptTrade}`;
            }
            if (paymentMethods.length > 0) {
                let paymentMethodFilter = 'payment_methods'
                let str = paymentMethods
                str.map(item => {
                    if(item){
                        filter += `&${paymentMethodFilter}=${item}`
                    }
                })
            }
            console.log('filtro:', filter);
            const lengthAdvert = await productGetStorageData()
            setMyProduct(lengthAdvert)
            const { data } = await api.get(`/products${filter}`);
            setData(data)        
        }catch(error){
            
        } finally{
            closeModal()
        }
    }
    
   function handleIsNew(value: boolean) {
    if (isNew !== value) {
      setIsNew(value);
    } else {
      setIsNew(null);
    }
  }

  useEffect(() => {
    fetchFilterProducts();
  }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#EDECEE', flex: 1}} >
            {
                loading 
            ?   <Loading/>
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
                        <VStack width={350}  >
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
                                                background={isNew ? '#647AC7' : 'gray.300'}
                                                borderRadius={20}
                                                mr={2}
                                                onPress={() => handleIsNew(true)}
                                                iconRightName={isNew ? 'close' : ''} 
                                                iconColor='white'
                                            />
                                            <Button 
                                                title='Usado'
                                                width={76}
                                                height={28}
                                                padding={0}
                                                fontSize={10}
                                                fontWeight={'bold'}
                                                background={isNew === false ? '#647AC7' : 'gray.300'}
                                                borderRadius={20}
                                                mr={2}
                                                onPress={() => handleIsNew(false)}
                                                iconRightName={isNew === false ? 'close' : ''} 
                                                iconColor='white'
                                            />
                                        </Row>
                                        <Text fontSize={14} fontWeight={"bold"} mt={6}>Aceita troca ?</Text>
                                        <Switch size="md" mt={3} mb={6} value={acceptTrade} onToggle={setAcceptTrade}/>
                                        <Text fontSize={14} fontWeight={"bold"}>Meios de pagamento aceitos</Text>
                                        <Checkbox.Group 
                                        onChange={setPaymentMethods} 
                                        value={paymentMethods}
                                         accessibilityLabel="choose numbers">
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
                                                value="cash"
                                                >
                                                Dinheiro
                                            </Checkbox>
                                            <Checkbox mt={3}
                                                value="card"     
                                                >
                                                Cartão de Crédito
                                            </Checkbox>
                                            <Checkbox mt={3}
                                                value="deposit"
                                                >
                                                Depósito Bancário
                                            </Checkbox>
                                        </Checkbox.Group>
                                    </Modal.Body>
                                    <Row width={'full'} justifyContent={'space-between'} padding={4}>
                                        <Button 
                                            title="Resetar filtros"
                                            backgroundColor={'#D9D8DA'}
                                            width={157}
                                            variant={'outline'}
                                            onPress={handleResetFilter}
                                        />
                                        <Button 
                                            title="Aplicar filtros"
                                            backgroundColor={'#1A181B'}
                                            width={157}
                                            onPress={fetchFilterProducts}
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
                                            <Heading color="#3E3A40">{myProduct.length}</Heading>
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
                                                    onPress={fetchFilterProducts}
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
                                        onChangeText={setSearch}
                                        onSubmitEditing={fetchFilterProducts}
                                        placeholder='Buscar anúncio'
                                    />
                                    <FlatList 
                                        data={data} 
                                        numColumns={2}
                                        contentContainerStyle={{ justifyContent: 'space-between'}}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({item, index}) => 
                                            <BoxSale 
                                                key={index}
                                                price={item.price}
                                                title={item.name}
                                                type={item.is_new ? 'novo' : 'usado'}
                                                imageAdress={item?.product_images[index]?.path}
                                                altImage='Foto do anúncio'
                                                onPress={() => handleDetails(item.id)}
                                                profilePicture={item.user.avatar}
                                            />  
                                        }
                                    />
                            </VStack>
                        </VStack>
                    </VStack>
                    <BottomNavigation/>
                </>
        }
        </SafeAreaView>
    );
}