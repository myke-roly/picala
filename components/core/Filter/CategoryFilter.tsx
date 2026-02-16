import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryPress: (id: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryPress,
}: CategoryFilterProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => onCategoryPress(category.id)}
            style={[
              styles.pill,
              {
                backgroundColor: isActive
                  ? Colors.primary
                  : Colors[colorScheme].input,
              },
            ]}
          >
            <Text
              variant="body"
              weight={isActive ? 'semibold' : 'medium'}
              style={{
                color: isActive
                  ? '#FFFFFF'
                  : Colors[colorScheme].text.secondary,
              }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  pill: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: 10,
    borderRadius: Spacing.borderRadius.full,
    marginRight: Spacing.xs,
  },
});
