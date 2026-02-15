import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/Text';
import { BackgroundColors, TextColors, AccentColors } from '@/constants/Colors';

interface Message {
  id: string;
  user: {
    name: string;
    avatar?: string;
    online?: boolean;
  };
  lastMessage: string;
  time: string;
  unread: number;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    user: { name: 'Alex Johnson', online: true },
    lastMessage: 'Hey! Are you coming to the match tomorrow?',
    time: '2 min',
    unread: 2,
  },
  {
    id: '2',
    user: { name: 'Sarah Miller', online: false },
    lastMessage: 'Great game! Lets play again soon.',
    time: '1 hour',
    unread: 0,
  },
  {
    id: '3',
    user: { name: 'Mike Davis', online: true },
    lastMessage: 'Can you bring extra balls?',
    time: '3 hours',
    unread: 1,
  },
  {
    id: '4',
    user: { name: 'Emily Chen', online: false },
    lastMessage: 'Thanks for the invite!',
    time: 'Yesterday',
    unread: 0,
  },
];

const MessageItem = ({ message }: { message: Message }) => {
  return (
    <Pressable style={({ pressed }) => [styles.messageCard, pressed && { opacity: 0.8 }]}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text variant="title" color={BackgroundColors.white}>
            {message.user.name.charAt(0)}
          </Text>
        </View>
        {message.user.online && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text variant="subtitle" strong>
            {message.user.name}
          </Text>
          <Text variant="caption" color={TextColors.secondary}>
            {message.time}
          </Text>
        </View>
        <View style={styles.messagePreview}>
          <Text
            variant="body"
            color={message.unread > 0 ? TextColors.primary : TextColors.secondary}
            numberOfLines={1}
          >
            {message.lastMessage}
          </Text>
          {message.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text variant="caption" color={BackgroundColors.white} strong>
                {message.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="title" level="xl" color={TextColors.primary}>
          Messages
        </Text>
        <Text variant="body" color={TextColors.secondary}>
          Your conversations
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text variant="body" color={TextColors.disabled}>
              Search conversations...
            </Text>
          </View>
        </View>

        <View style={styles.messagesList}>
          {MOCK_MESSAGES.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.light,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: BackgroundColors.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: BackgroundColors.elevated,
  },
  messagesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: BackgroundColors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: AccentColors.alternative,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: BackgroundColors.white,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadBadge: {
    backgroundColor: AccentColors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
});

export default MessagesScreen;
