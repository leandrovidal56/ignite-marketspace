import { Text, VStack, Row, Select} from 'native-base';

import { BoxSale } from '../../components/boxSale';
import { useState } from 'react';
import { Header } from '../../components/Header';
export default function Adverts (){
    const [ select, setSelect] = useState('')
    return (
        <VStack flex={1} mt={9} padding={6}> 
            <Row alignItems={'center'} mb={10} justifyContent={'center'}>
                <Header
                    title="Meus anúncios"
                    showIconRight
                    iconName='plus'
                />
            </Row>
            <Row justifyContent={'space-between'} mb={5}>
                <Text>9 anúncios</Text>
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
            <Row justifyContent={'space-between'}>
                <BoxSale 
                    price={45}
                    title='Luminária pendente'
                    type='novo'
                    imageAdress='https://wallpaperaccess.com/thumb/246323.jpg'
                    altImage='cidade'
                />
                <BoxSale 
                    price={80}
                    title='Coturno feminino'
                    type='novo'
                    imageAdress='https://wallpaperaccess.com/thumb/216323.jpg'
                    altImage='cidade'
                />
            </Row>
            <Row justifyContent={'space-between'}>
                <BoxSale 
                    price={59}
                    title='Tênis vermelho'
                    type='usado'
                    imageAdress='https://wallpaperaccess.com/thumb/296323.jpg'
                    altImage='cidade'
                />
                <BoxSale 
                    price={80}
                    title='Tênis vermelho'
                    type='usado'
                    imageAdress='https://wallpaperaccess.com/thumb/246321.jpg'
                    altImage='cidade'
                />
            </Row>
             
        </VStack>
    );
}