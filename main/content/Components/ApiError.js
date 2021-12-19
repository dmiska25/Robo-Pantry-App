import React from 'react';
import { Button, Text, View } from "react-native";

const ApiError = ({message, reload}) => (
    <View testID="ApiError">
        <Text>{message}</Text>
        <Button
            onPress={reload}
            title="Reload"
        />
    </View>
)

export default ApiError;