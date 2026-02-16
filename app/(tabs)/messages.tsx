import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { ScreenContainer, BaseInput } from '@/components/core';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';

interface Message {
  id: string;
  user: {
    name: string;
    avatarInitial: string;
    online: boolean;
  };
  lastMessage: string;
  time: string;
  unread: number;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    user: { name: 'Alex Johnson', avatarInitial: 'A', online: true },
    lastMessage: 'Hey! Are you coming to the match tomorrow?',
    time: '2m',
    unread: 2,
  },
  {
    id: '2',
    user: { name: 'Sarah Miller', avatarInitial: 'S', online: false },
    lastMessage: 'Great game! Lets play again soon.',
    time: '1h',
    unread: 0,
  },
  {
    id: '3',
    user: { name: 'Mike Davis', avatarInitial: 'M', online: true },
    lastMessage: 'Can you bring extra balls?',
    time: '3h',
    unread: 1,
  },
  {
    id: '4',
    user: { name: 'Emily Chen', avatarInitial: 'E', online: false },
    lastMessage: 'Thanks for the invite!',
    time: 'Yesterday',
    unread: 0,
  },
];

const MessagesScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <ScreenContainer withScroll>
      <BaseInput
        placeholder="Search conversations..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon="magnifyingglass"
        containerStyle={styles.searchBar}
      />

      <View style={styles.messagesList}>
        {MOCK_MESSAGES.map((message, index) => (
          <Pressable
            key={message.id}
            style={({ pressed }) => [
              styles.messageItem,
              index < MOCK_MESSAGES.length - 1 && styles.divider,
              pressed && { backgroundColor: '#F8FAFC' }
            ]}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text weight="bold" style={styles.avatarText}>
                  {message.user.avatarInitial}
                </Text>
              </View>
              {message.user.online && <View style={styles.onlineDot} />}
            </View>

            <View style={styles.content}>
              <View style={styles.row}>
                <Text variant="body" weight="bold" style={styles.name}>
                  {message.user.name}
                </Text>
                <Text variant="caption" opacity={0.5}>
                  {message.time}
                </Text>
              </View>

              <View style={styles.row}>
                <Text
                  variant="body"
                  numberOfLines={1}
                  opacity={message.unread > 0 ? 1 : 0.6}
                  weight={message.unread > 0 ? 'semibold' : 'regular'}
                  style={styles.lastMessage}
                >
                  {message.lastMessage}
                </Text>
                {message.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text variant="small" weight="bold" style={styles.unreadText}>
                      {message.unread}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: Spacing.xl,
  },
  messagesList: {
    backgroundColor: '#FFFFFF',
    borderRadius: Spacing.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.status.success,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    color: '#1E293B',
  },
  lastMessage: {
    flex: 1,
    marginRight: Spacing.md,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
});

export default MessagesScreen;
