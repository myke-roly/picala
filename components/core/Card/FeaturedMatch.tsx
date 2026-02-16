import React from 'react';
import { View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { LinearGradient } from 'expo-linear-gradient';

interface FeaturedMatchProps {
  title: string;
  category: string;
  time?: string;
  onPress?: () => void;
}

export function FeaturedMatch({ title, category, time, onPress }: FeaturedMatchProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.95, transform: [{ scale: 0.99 }] }
      ]}
    >
      <ImageBackground
        source={require('@/assets/images/featured-player.png')}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.categoryBadge}>
              <Text variant="small" weight="bold" style={styles.categoryText}>
                {category.toUpperCase()}
              </Text>
            </View>
            <Text variant="h2" weight="bold" style={styles.title}>
              {title}
            </Text>
            {time && (
              <View style={styles.timeContainer}>
                <Text variant="caption" style={styles.timeText}>
                  Starts in {time}
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: Spacing.xl,
    borderRadius: Spacing.borderRadius.xl,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: Spacing.borderRadius.xl,
  },
  gradient: {
    padding: Spacing.lg,
    height: '60%',
    justifyContent: 'flex-end',
  },
  content: {
    gap: 4,
  },
  categoryBadge: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  title: {
    color: '#FFFFFF',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: 'rgba(255,255,255,0.8)',
  },
});
