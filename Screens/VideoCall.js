import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ZegoUIKitPrebuiltCall, GROUP_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { UserContext } from '../context/UserContext';
import KeyCenter from '../KeyCenter';
import uuid from 'uuid-random';

const VideoCall = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const [callID, setCallID] = useState(route.params?.callID || uuid());

    useEffect(() => {
        if (!route.params?.callID) {
            navigation.setParams({ callID });
        }
    }, [callID, navigation, route.params?.callID]);

    if (!user) {
        return null; // Or a loading spinner
    }

    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={KeyCenter.appID}
                appSign={KeyCenter.appSign}
                userID={user.uid}
                userName={user.displayName}
                callID={callID}
                config={{
                    ...GROUP_VIDEO_CALL_CONFIG,
                    onCallEnd: (callID, reason, duration) => {
                        navigation.navigate('OfficeScreen'); // or any other screen
                    },
                    timingConfig: {
                        isDurationVisible: true,
                        onDurationUpdate: (duration) => {
                            console.log('Call duration:', duration);
                            if (duration === 10 * 60) { // 10 minutes
                                ZegoUIKitPrebuiltCallService.hangUp();
                            }
                        }
                    },
                    avatarBuilder: ({ userInfo }) => (
                        <View style={{ width: '100%', height: '100%' }}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                                source={{ uri: `https://robohash.org/${userInfo.userID}.png` }}
                            />
                        </View>
                    ),
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
});

export default VideoCall;
