import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {ThemedText} from '@/components/ThemedText';
import {CustomButton} from '@/components/CustomButton';
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
              <ThemedText color="primary">Camp Nou, Barcelona</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color={TextColors.secondary} />
              <ThemedText color="primary">Saturday, April 15, 2024</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color={TextColors.secondary} />
              <ThemedText color="primary">20:00 - 22:00 (2 hours)</ThemedText>
            </View>
          </View>
        </View>

        {/* Player Status */}
        <View style={styles.playerSection}>
          <ThemedText variant="subtitle" level="md" color="primary" strong>
            Player Status
          </ThemedText>
          <View style={styles.playerCard}>
            <View style={styles.playerStats}>
              <View style={styles.statItem}>
                <ThemedText variant="title" level="lg" color="primary" strong>
                  8
                </ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Current Players
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText variant="title" level="lg" color="primary" strong>
                  11
                </ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Max Players
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText variant="title" level="lg" color="primary" strong>
                  3
                </ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Needed
                </ThemedText>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '73%'}]} />
            </View>
          </View>
        </View>

        {/* Match Rules */}
        <View style={styles.rulesSection}>
          <ThemedText variant="subtitle" level="md" color="primary" strong>
            Match Rules
          </ThemedText>
          <View style={styles.rulesCard}>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <ThemedText color="primary">11 players per team</ThemedText>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <ThemedText color="primary">90 minutes duration</ThemedText>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <ThemedText color="primary">Bring your own equipment</ThemedText>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <ThemedText color="primary">Fair play required</ThemedText>
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
