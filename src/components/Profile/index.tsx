import { Image, IImageProps } from "native-base";
import { Button as ButtonNativeBase  } from "native-base"
import { useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';

type Props = IImageProps & {
    setImage: React.Dispatch<React.SetStateAction<string>>
    image: string
}

export function UserPhoto({setImage, image, ...rest}: Props){
    const pickImage = async () => {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.1,
            });
            if(!result.canceled){
                await setImage(result.assets[0].uri)
            }
        } catch(err){
            console.log(err)
        }
      };
      
      useEffect(() => {
      }, [image])


    return (
        <ButtonNativeBase 
            size={20}
            borderRadius={50}
            onPress={pickImage}
        >
            <Image
                size={20}
                borderRadius={50}
                source={{ uri: image ? image :  'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png'}}
                {...rest}
                alt="Image de Perfil"
            />
        </ButtonNativeBase>
    )
}