import React, { useState, useEffect, createRef } from 'react';
import { Button, Input } from '@rneui/themed'
import { ImageBackground, Image, View, Dimensions, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { DoLogin } from '../Api/login';
import { useUserData } from '../Util/UserContext';
export const Login =()=>{
    const screenWidth = Dimensions.get('screen').width;
    const emailRef = createRef();
    const passwordRef = createRef();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ email, setEmail ] = useState()
    const [ passw, setPassw ] = useState()
    const [ errorEmail, setErrorEmail ] = useState();
    const [ errorPass, setErrorPass ] = useState();
    const userData = useUserData();
    const ValidateLogin =()=>{
        if( !email || email.trim() == ''){
            setErrorEmail('Please input your username');
            emailRef.current.focus()
            emailRef.current.shake()
            return;
        }
        if( !passw || passw.trim() == ''){
            setErrorPass('Please input your username');
            passwordRef.current.focus()
            passwordRef.current.shake()
            return;
        }
        setIsLoading(true);
        DoLogin({ email: email, clave: passw })
        .then( response =>{
            if(!response.ok){
                Alert.alert('Login Error', response.msg);
                return;
            }
            userData.setUserData(response.outData);
        }).finally(() => setIsLoading(false))
    }
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus(false);
        });    
        return () => {
        showSubscription.remove();
        hideSubscription.remove();
        };
    }, []);

    return <View style={{ flex: 1, width: screenWidth, justifyContent: 'center' }}>
        <ImageBackground 
            source={require('../assets/landing.png')} 
            resizeMode='cover' 
            style={{ 
                flex: 1, 
                justifyContent:'center',
                padding: 10
                }}>
            <KeyboardAvoidingView
                behavior={ Platform.OS == 'ios' ? 'padding' : 'height' }
                style={{ flex: 1 }}>
                <Image
                    source={require('../assets/fatum.png')} 
                    style={{ 
                        resizeMode:'contain', 
                        alignSelf:'center', 
                        width: 200, 
                        height: 200,
                        marginBottom: Platform.OS == 'ios' && keyboardStatus ? 75: 200,
                        }} />
                <Input 
                    name='email' 
                    ref={ emailRef } 
                    keyboardType='email-address' 
                    placeholder='User'
                    errorMessage={ errorEmail }
                    value={ email }
                    leftIcon={{ type: 'font-awesome', name: 'user', color:'gray' }}
                    onChangeText={ value => setEmail(value )}/>
                <Input 
                    name='password'
                    secureTextEntry={true}
                    ref={ passwordRef }
                    placeholder='Password'
                    errorMessage={ errorPass }
                    leftIcon={{ type: 'font-awesome', name: 'lock', color:'gray' }}
                    value={ passw }
                    onChangeText={ value => setPassw( value )}/>
                <Button 
                    title="Sign In" onPress={ ValidateLogin }
                    style={{ width: '90%', alignSelf:'center', borderRadius: 10, overflow: 'hidden'}}
                    loading={ isLoading }
                    disabled={ isLoading }
                    />
            </KeyboardAvoidingView>
            
        </ImageBackground>
    </View>
}