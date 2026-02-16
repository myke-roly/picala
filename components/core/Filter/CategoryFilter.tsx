import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';

export interface Category {
  id: string;
  name: string;
  icon?: IconSymbolName;
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
        // Default icon if none provided or mapping not found
        const iconName = category.icon || 'trophy.fill';

        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => onCategoryPress(category.id)}
            style={styles.categoryItem}
          >
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isActive
                    ? (colorScheme === 'light' ? '#1E293B' : '#F1F5F9')
                    : Colors[colorScheme].card,
                  borderColor: isActive ? 'transparent' : Colors[colorScheme].border,
                  borderWidth: isActive ? 0 : 1,
                },
              ]}
            >
              <IconSymbol
                name={iconName}
                size={32}
                color={isActive
                  ? (colorScheme === 'light' ? '#FFFFFF' : '#0F172A')
                  : Colors[colorScheme].text.secondary
                }
              />
            </View>
            <Text
              variant="small"
              weight="medium"
              style={{
                color: isActive
                  ? Colors[colorScheme].text.primary
                  : Colors[colorScheme].text.secondary,
                marginTop: Spacing.xs,
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
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    gap: Spacing.lg,
  },
  categoryItem: {
    alignItems: 'center',
    minWidth: 72,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
