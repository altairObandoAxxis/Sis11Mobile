import { Button, Icon, Text, useTheme } from '@rneui/themed'
import { View, StyleSheet } from 'react-native';

export const ChangeStatus =({ route, navigation })=>{
    const Result = route.params;
    const { theme } = useTheme();
    return <View style={ style.container }>
        <View style={ style.informationContainer }>
            <Icon name='checkmark-circle' type='ionicon' size={ 70 } color={ theme.colors.success }/>
            <Text h1>Saved Policy Change </Text>
            <Text h4>Change Number is { Result.id }</Text>
        </View>
        <View style={ style.buttonContainer }>
            <Button 
                title={ 'Close' } 
                containerStyle={{ flex: 1 }}
                onPress={ ()=> navigation.popToTop() }/>
        </View>
    </View>
}

const style = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    informationContainer:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    }

})