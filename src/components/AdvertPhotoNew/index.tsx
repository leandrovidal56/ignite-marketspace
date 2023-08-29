import { useState } from "react";
import { Image, useToast, Row, Center, Button as ButtonNativeBase } from "native-base";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { useProduct } from '../../hooks/useProduct';

import { IconComponent } from "../icon";
import { Loading } from "../loading";

import { api } from "../../services/api";


export function AdvertPhotoNew(){
    const [hidePicure, setHidePicture] = useState(false)
    const toast = useToast()
    const {  image, setImage } = useProduct()

    const changeImage = async (item?: number) => {
        try{
            if(image[item]){
                setHidePicture(true)
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 0.1,
                allowsEditing: true,
            });

            if(result.canceled){
                return
            }

            if(result.assets[0].uri){
                const photoInfo = await FileSystem.getInfoAsync(result.assets[0].uri)

                if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5){
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
                const fileExtension = result.assets[0].uri.split('.').pop()

                const photoFile = {
                    name: `${fileExtension}`.toLowerCase(),
                    uri: result.assets[0].uri,
                    type: `${result.assets[0].type}/${fileExtension}`,
                  } as any;
                

                if(image[item]){
                    image.splice(item, 1, photoFile)
                }else {
                    setImage((prev) => [photoFile, ...prev]);
                }
            }
        
        } catch(err){
            console.log(err)
        } finally{
            setHidePicture(false)
        }
    };


    function removeItem(item: number){
        image.splice(item, 1)
        setHidePicture(true)
    }

    return (       
        <Row>
            {image.map((item, index) => (
                <ButtonNativeBase 
                    size={100}
                    borderRadius={6}
                    onPress={() => changeImage(index)}
                    mr={2}
                    background={'#D9D8DA'}
                >
                    {!hidePicure 
                    ?
                    <>
                        <Image
                            size={100}
                            borderRadius={6}
                            source={{ uri: image[index].path ? `${api.defaults.baseURL}/images/${image[index].path}`: image[index]?.uri }}
                            background={'#D9D8DA'}
                            {...rest}
                            display={ hidePicure ? 'none' : 'flex'}
                            alt="Image de Perfil"
                        />
                        <IconComponent onPress={() => removeItem(index)} position={'absolute'} right={0}  name="plus" size={5} />
                    </>
                    : 
                    <Center>
                        <Loading />
                    </Center>
                    }
                </ButtonNativeBase>
            ))}
            {image.length < 3 
            ?   <ButtonNativeBase 
                    size={100}
                    borderRadius={6}
                    onPress={() => changeImage() }
                    mr={2}
                    background={'#D9D8DA'}
                >   
                    <IconComponent name="plus" size={5} />
                </ButtonNativeBase>
            : ''
            }
        </Row>
    )
}
