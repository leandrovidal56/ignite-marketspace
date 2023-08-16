import { Text, VStack, Row, Select, useToast, FlatList} from 'native-base';
import { BoxSale } from '../../components/boxSale';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { BottomNavigation } from '../../components/bottomNavigation';
import { Loading } from '../../components/loading';
import { AppError } from '../../utils/AppError';
import { useAuth } from '../../hooks/useAuth';
export default function Adverts (){

    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const [ select, setSelect] = useState('')
    const [ data, setData] = useState([])
    const [ loading, setIsLoading] = useState(false)
    
    const toast = useToast()
    const { productGetStorageData } = useAuth()

    function handleDetailsMyAdvert(productId: string){
        navigation.navigate('detailsMyAdverts', {productId} )
    }

    async function loadMyProducts(){
        try{
            setIsLoading(true)
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
        } finally{
            setIsLoading(false)
        }
    }
    
    async function handleCreateAdvert(){
        navigation.navigate('createAdverts')
    }
    
    useEffect(() => {
        loadMyProducts()
    },[])

    return (
        <>
            <VStack flex={1} mt={9} padding={6}> 
                <Row alignItems={'center'} mb={10} justifyContent={'center'}>
                    <Header
                        title="Meus anúncios"
                        showIconRight
                        iconLeftName='plus'
                        navigationIconRight={handleCreateAdvert}
                    />
                </Row>
                <Row justifyContent={'space-between'} mb={5}>
                    <Text color="#3E3A40">{data.length} anúncios</Text>
                    <Select 
                        selectedValue={select} 
                        minWidth="111" 
                        accessibilityLabel="Todos" 
                        placeholder="Todos" 
                        _selectedItem={{bg: "teal.600"}} 
                        mt={1} 
                        onValueChange={itemValue => setSelect(itemValue)}>
                            <Select.Item label="UX Research" value="ux"  />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                    </Select>
                </Row>
                {
                    loading 
                    ? <Loading/>
                    : <FlatList 
                        data={data} 
                        numColumns={2}
                        renderItem={({item, index}) => 
                            <BoxSale 
                                key={index}
                                price={item.price}
                                title={item.name}
                                type={item.is_new ? 'novo' : 'usado'}
                                imageAdress={item.product_images[0]?.path}
                                altImage='Foto do anúncio'
                                onPress={() => handleDetailsMyAdvert(item.id)}
                                hideProfilePicture={true}
                            />  
                        }
                    />
                }
                <BottomNavigation/>
            </VStack>
        </>
    );
}