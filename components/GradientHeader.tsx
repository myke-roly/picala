import React from 'react';
import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { Text } from './Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface GradientHeaderProps {
    onInvite: () => void;
    onMenuPress: () => void;
    userEmail?: string;
}

const GradientHeader: React.FC<GradientHeaderProps> = ({ onInvite, onMenuPress, userEmail }) => {
    return (
        <LinearGradient
            colors={['#1a1b26', '#0f172a']}
            style={styles.headerContainer}
        >
            <View style={styles.topBar}>
                <View />
                <Pressable onPress={onMenuPress} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
                    <Ionicons name="menu" size={24} color="white" />
                </Pressable>
            </View>

            <View style={styles.headerContent}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Earn more</Text>
                    <Text style={styles.headerSubtitle}>
                        Invite your friends to receive payouts for their successful parlays.
                    </Text>
                    <Pressable
                        style={({ pressed }) => [styles.inviteButton, { opacity: pressed ? 0.7 : 1 }]}
                        onPress={onInvite}
                    >
                        <Text style={styles.inviteButtonText}>Invite friend</Text>
                    </Pressable>
                </View>
                <Image
                    source={require('@/assets/images/header-bg.png')}
                    style={styles.headerImage}
                    resizeMode="contain"
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTextContainer: {
        flex: 1,
        paddingRight: 10,
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#94a3b8',
        marginBottom: 20,
        lineHeight: 20,
    },
    inviteButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    inviteButtonText: {
        color: '#1a1b26',
        fontWeight: 'bold',
        fontSize: 14,
    },
    headerImage: {
        width: 150,
        height: 150,
        position: 'absolute',
        right: -40,
        bottom: -40,
        opacity: 0.8,
    },
});

export default GradientHeader;
