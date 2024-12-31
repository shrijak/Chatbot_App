import React from "react";
import { View, StyleSheet } from "react-native";
import { MarkdownView } from 'react-native-markdown-view'

const Message = (props) => {
    if (props.idx % 2 === 0) {
        return (
            <View style={styles.item_me}>
                <MarkdownView style={styles.itemText}>{props.text}</MarkdownView>
            </View>
        )
    }
    else {
        return (
            <View style={styles.item_bot}>
                <MarkdownView style={styles.itemText}>{props.text}</MarkdownView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item_me: {
        backgroundColor: '#87cefb',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginLeft: 60,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 5,
    },
    item_bot: {
        backgroundColor: '#83f28f',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginRight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 5,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
        marginTop: 10,
    },
    itemText: {
        maxWidth: '100%',
        textAlign: 'justify',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: "#55BCF6",
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default Message;