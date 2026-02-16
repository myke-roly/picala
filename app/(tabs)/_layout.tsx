import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import AnimatedTabBar from '@/components/ui/AnimatedTabBar';
import { Colors } from '@/constants/Colors';

import { VISIBLE_TABS } from '@/constants/Tabs';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tabBar.active,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            borderTopWidth: 0,
          },
          default: {
            borderTopWidth: 0,
          },
        }),
      }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      {VISIBLE_TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <IconSymbol size={24} name={tab.icon} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
