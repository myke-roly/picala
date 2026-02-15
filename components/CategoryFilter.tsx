import React from 'react';
import { ScrollView, Pressable, StyleSheet } from 'react-native';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';

interface Category {
    id: string;
    name: string;
    icon: string;
}

interface CategoryFilterProps {
    categories: Category[];
    activeCategory: string;
    onCategoryPress: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onCategoryPress }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
        >
            {categories.map((cat) => (
                <Pressable
                    key={cat.id}
                    style={({ pressed }) => [
                        styles.categoryItem,
                        activeCategory === cat.id && styles.categoryItemActive,
                        pressed && { opacity: 0.7 }
                    ]}
                    onPress={() => onCategoryPress(cat.id)}
                >
                    {cat.id === 'all' ? (
                        <Text style={[styles.categoryText, activeCategory === 'all' && styles.categoryTextActive]}>All</Text>
                    ) : (
                        <Ionicons
                            name={cat.icon as any}
                            size={24}
                            color={activeCategory === cat.id ? '#fff' : '#1a1b26'}
                        />
                    )}
                </Pressable>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        gap: 12,
    },
    categoryItem: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    categoryItemActive: {
        backgroundColor: '#1a1b26',
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1a1b26',
    },
    categoryTextActive: {
        color: '#fff',
    },
});

export default CategoryFilter;
