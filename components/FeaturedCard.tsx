import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from './Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface FeaturedCardProps {
    imageSource: any;
    label: string;
    title: string;
    time: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ imageSource, label, title, time }) => {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.featuredCard}>
                <Image
                    source={imageSource}
                    style={styles.featuredImage}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.featuredGradient}
                >
                    <Text style={styles.featuredLabel}>{label}</Text>
                    <Text style={styles.featuredTitle}>{title}</Text>
                    <View style={styles.featuredFooter}>
                        <Text style={styles.featuredTime}>{time}</Text>
                        <Ionicons name="stats-chart" size={16} color="#fff" />
                    </View>
                </LinearGradient>
                <View style={styles.playButton}>
                    <Ionicons name="play" size={24} color="#fff" style={{ marginLeft: 4 }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    featuredCard: {
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#1a1b26',
        position: 'relative',
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        justifyContent: 'flex-end',
        padding: 20,
    },
    featuredLabel: {
        color: '#94a3b8',
        fontSize: 12,
        marginBottom: 4,
    },
    featuredTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    featuredFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featuredTime: {
        color: '#fff',
        fontSize: 12,
        opacity: 0.8,
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -24,
        marginTop: -24,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(10px)', // Note: backdropFilter might not work on all RN versions, but simple opacity is fine
    },
});

export default FeaturedCard;
