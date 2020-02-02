import React, {createContext, useState, useEffect } from 'react';
import { ActivityIndicator, Image, ImageStore } from 'react-native';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { exp } from 'react-native-reanimated';

const Loading = Styled.View `
    flex: 1;
    background-color: #feffff;
    align-items: center;
    justify-content: center;
`

interface Props {
    cache?: boolean;
    children: JSX.Element | Array<JSX.Element>
}

interface IRandomUserData {
    getMyFeed: (number?: number) => Array<IFeed>
}

const RandomUserDataContext = createContext<IRandomUserData>({
    getMyFeed: (number: number = 10) => {
        return [];
    }
})

//프로바이더 세팅 
const RandomUserDataProvider = ({ cache, children }: Props) => {
    const [userList, setUserList] = useState<Array<IUserProfile>>([]);
    const [descriptionList, setDescriptionList] = useState<Array<string>>([]);
    const [imageList, setImageList ] = useState<Array<string>>([]);

    //캐시데이터 가져오기
    const getCacheData = async (key: string) => {
        const cacheData = await AsyncStorage.getItem(key);
        if(!cache  || cache === null){
            return undefined;
        }
        const cacheList = JSON.parse(cacheData);

        if(cacheList.length !== 25){
            return undefined;
        }
        return cacheList;
    }

    //캐시데이터 세팅하기
    const setCachedData = (key: string, data:Array  <any>) => {
        AsyncStorage.setItem(key, JSON.stringify(data));
    }

    //유저(멤버) 인포 세팅
    const setUsers = async () => {

        //캐시 데이터 확인
        const cachedData = await getCacheData('User');
        if( cachedData ) {
            setUserList(cachedData);
            return; 
        }

        //
        try{
            const response = await fetch('https://uinames.com/api/?amount=25&ext');
            const data = await response.json();
            setUserList(data);
            setCachedData('UserList', data);
            

        }catch(error){
            console.log(error)
        }
    
    }
    //디스크립션 세팅
    const setDescriptions = async () => {

        //캐시 데이터 확인 
        const cachedData = await getCacheData('DescriptionList');
        console.log(cachedData);
        if(cachedData){
            setDescriptionList(cachedData);
            return;
        }

        try{
            const response = await fetch(
                'https://opinionated-quotes-api.gigalixirapp.com/v1/quotes?rand=t&n=25'
            )
            const data = await response.json(); //TODO: 왜 then 안쓰지
            let text = [];
            for (const index in data.quotes){
                text.push(data.quotes[index].quotes)
            }
            
            setDescriptionList(text);
            setCachedData('DescriptionList', text);
        }catch(error){
            console.log(error);
        }

    }

    //이미지 세팅
    const setImages = async ()=>{
        const cachedData = await getCacheData('imageList');
        if(cachedData){
            if(Image.queryCache){
                Image.queryCache(cachedData);
                cachedData.map((data: string)=>{
                    Image.prefetch(data);
                });
            }
            setImageList(cachedData);
            return;
        }

        // 4초에 한번씩 이미지 하나씩 가져옴 
        setTimeout(async () => {
            try {
              const response = await fetch('https://source.unsplash.com/random/');
              const data = response.url;
              if (imageList.indexOf(data) >= 0) {
                setImages();
                return;
              }
              setImageList([...imageList, data]);
            } catch (error) {
              console.log(error);
            }
          }, 400);
    }

    useEffect(()=>{
        setUsers();
        setDescriptions();
    },[])

    useEffect(()=>{

        //이미지 리스트가 25개 될때까지 이미지 세팅 
        if(imageList.length !== 25){
            setImages();
        }else{
            setCachedData('ImageList', imageList)
        }
    },[imageList])


    const getImages = (): Array<string> => {
        let images: Array<string> = [];
        const count = Math.floor(Math.random() * 4);
    
        for (let i = 0; i <= count; i++) {
          images.push(imageList[Math.floor(Math.random() * 24)]);
        }
    
        return images;
      };
    const getMyFeed = (number: number = 10): Array<IFeed> =>{
        let feeds: Array<IFeed> = [];
        for (let i = 0; i < number; i++){
            const user = userList[Math.floor(Math.random()*24)]
            feeds.push({
                name: user.name,
                photo: user.photo,
                description: descriptionList[Math.floor(Math.random()*24)],
                images: getImages(),
            })
        }
        return feeds;
    }

    console.log(`${userList.length} / ${descriptionList.length} / ${imageList.length}`);

    return(
        <RandomUserDataContext.Provider value={{getMyFeed}}>
            {userList.length === 25 && imageList.length === 25 && descriptionList.length === 25 ? 
                (children)
                :
                (<Loading>
                    <ActivityIndicator color="#D3d3d3" size="large" />
                </Loading>)
            }
            
        </RandomUserDataContext.Provider>
    )

    
}

export {RandomUserDataProvider, RandomUserDataContext};