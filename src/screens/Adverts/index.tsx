import { Text, VStack, Row, Select, useToast} from 'native-base';
import { BoxSale } from '../../components/boxSale';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import {  useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { BottomNavigation } from '../../components/bottomNavigation';
import { api } from '../../services/api';
import { Loading } from '../../components/loading';
import { AppError } from '../../utils/AppError';
export default function Adverts (){
    const [ select, setSelect] = useState('')
    const [ data, setData] = useState([])
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const [loading, setIsLoading] = useState(false)
    const toast = useToast()

    function handleDetailsMyAdvert(){
        navigation.navigate('detailsMyAdverts')
    }

    async function loadMyProducts(){
        try{
            setIsLoading(true)
            const response = await api.get('/products/')
            setData(response.data)
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
                <Text color="#3E3A40">9 anúncios</Text>
                <Select 
                    selectedValue={select} 
                    minWidth="111" 
                    accessibilityLabel="Todos" 
                    placeholder="Todos" 
                    _selectedItem={{bg: "teal.600",}} 
                    mt={1} 
                    onValueChange={itemValue => setSelect(itemValue)}>
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item label="Cross Platform Development" value="cross" />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item label="Backend Development" value="backend" />
                </Select>
            </Row>
            {
                loading 
                ? <Loading/>
                :<Row justifyContent={'space-between'}>
                    {data.map((item, index) => (
                        <BoxSale 
                            price={item.price}
                            title={item.name}
                            type={item.is_new ? 'novo' : 'usado'}
                            imageAdress={item.user.avatar}
                            altImage='Foto do anúncio'
                            onPress={handleDetailsMyAdvert}
                            hideProfilePicture={true}
                        />  
                    ))}
                </Row>
            }
        </VStack>
        <BottomNavigation/>
        </>
    );
}