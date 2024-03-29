import { useState } from "react";
import { Modal, Row, Text } from "native-base";
import {  MaterialIcons  } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

import { Button } from "../button";
import { IconComponent } from "../icon";
import { useAuth } from "../../hooks/useAuth";

import { AppNavigatorRoutesProps } from "../../routes/app.routes";

export function BottomNavigation(){
    const navigation = useNavigation<AppNavigatorRoutesProps >()
    const [showModal, setShowModal] = useState(false);
    const { signOut } = useAuth();

    function handleGoHome(){
        navigation.navigate('home')
    }

    function handleGoDetais(){
        navigation.navigate('adverts')
    }

    function handleLogout(){
        signOut();
    }

    function openModal(){
        setShowModal(true)
    }

    return (
        <>
         <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content width="full" bottom={3} marginTop={'auto'}>
                <Modal.CloseButton />
                <Modal.Body>
                    <Text fontSize={14} fontWeight={"bold"}>Deseja sair ?</Text>
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
                                onPress={handleLogout}
                            />
                        </Row>
                </Modal.Body>
            </Modal.Content>
        </Modal>
            <Row 
                bgColor={'#F7F7F8'} 
                height={20} 
                paddingX={12} 
                width={400} 
                paddingBottom={7} 
                bottom={0} 
                position={'absolute'} 
                alignItems={'center'} 
                justifyContent={'space-between'}>
                <IconComponent name="home" familyIcon={MaterialIcons} size={7} onPress={handleGoHome} />
                <IconComponent name="tag"  size={7} onPress={handleGoDetais} />
                <IconComponent name="logout"  familyIcon={MaterialIcons} size={7} onPress={openModal} />
            </Row>
        </>
    )
}