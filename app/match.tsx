import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {CustomButton, Text} from '@/components';
import HeaderNavigation from '@/components/HeaderNavigation';
import TeamMatch from '@/components/TeamMatch';
import {BackgroundColors, TextColors, AccentColors} from '@/constants';

export default function MatchScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleJoinMatch = () => {
    console.log('Joining match...');
    // Add join match logic here
  };

  const handleShareMatch = () => {
    console.log('Sharing match...');
    // Add share logic here
  };

  return (
    <View style={styles.container}>
      <HeaderNavigation
        title="Barcelona vs Real Madrid"
        onBackPress={handleBackPress}
        rightButton={{
          icon: 'share-outline',
          onPress: handleShareMatch,
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Match Header */}
        <TeamMatch
          team1={{logo: 'FCB', name: 'Barcelona'}}
          team2={{logo: 'RMA', name: 'Real Madrid'}}
          matchTime="20:00"
          matchDate="Sat, 15 Apr"
          style={{marginBottom: 24}}
        />

        {/* Match Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color={TextColors.secondary} />
              <Text>Camp Nou, Barcelona</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color={TextColors.secondary} />
              <Text>Saturday, April 15, 2024</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color={TextColors.secondary} />
              <Text>20:00 - 22:00 (2 hours)</Text>
            </View>
          </View>
        </View>

        {/* Player Status */}
        <View style={styles.playerSection}>
          <Text variant="subtitle" level="md" strong>
            Player Status
          </Text>
          <View style={styles.playerCard}>
            <View style={styles.playerStats}>
              <View style={styles.statItem}>
                <Text variant="title" level="lg" strong>
                  8
                </Text>
                <Text variant="caption" color="secondary">
                  Current Players
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="title" level="lg" strong>
                  11
                </Text>
                <Text variant="caption" color="secondary">
                  Max Players
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="title" level="lg" strong>
                  3
                </Text>
                <Text variant="caption" color="secondary">
                  Needed
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '73%'}]} />
            </View>
          </View>
        </View>

        {/* Match Rules */}
        <View style={styles.rulesSection}>
          <Text variant="subtitle" level="md" strong>
            Match Rules
          </Text>
          <View style={styles.rulesCard}>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <Text>11 players per team</Text>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <Text>90 minutes duration</Text>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <Text>Bring your own equipment</Text>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <Text>Fair play required</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <CustomButton
            title="Join Match"
            onPress={handleJoinMatch}
            variant="primary"
            size="large"
            style={styles.joinButton}
          />
          <CustomButton
            title="Contact Organizer"
            onPress={() => console.log('Contact organizer')}
            variant="outline"
            size="medium"
            style={styles.contactButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.light,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  playerSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  playerCard: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 12,
    padding: 16,
  },
  playerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },

  progressBar: {
    height: 8,
    backgroundColor: BackgroundColors.elevated,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: AccentColors.primary,
    borderRadius: 4,
  },
  rulesSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  rulesCard: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 12,
    padding: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  actionSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  joinButton: {
    marginBottom: 12,
  },
  contactButton: {
    marginBottom: 20,
  },
});
