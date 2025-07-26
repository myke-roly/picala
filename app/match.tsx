import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {ThemedText} from '@/components/ThemedText';
import {CustomButton} from '@/components/CustomButton';
import HeaderNavigation from '@/components/HeaderNavigation';
import TeamMatch from '@/components/TeamMatch';
import Colors, {BackgroundColors, TextColors, AccentColors} from '@/constants/Colors';

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
        <View style={styles.matchHeader}>
          <View style={styles.teamsContainer}>
            <View style={styles.teamSection}>
              <View style={styles.teamLogo}>
                <ThemedText style={styles.teamLogoText}>FCB</ThemedText>
              </View>
              <ThemedText style={styles.teamName}>Barcelona</ThemedText>
            </View>

            <View style={styles.vsContainer}>
              <ThemedText style={styles.vsText}>VS</ThemedText>
              <ThemedText style={styles.matchTime}>20:00</ThemedText>
            </View>

            <View style={styles.teamSection}>
              <View style={styles.teamLogo}>
                <ThemedText style={styles.teamLogoText}>RMA</ThemedText>
              </View>
              <ThemedText style={styles.teamName}>Real Madrid</ThemedText>
            </View>
          </View>
        </View>

        {/* Match Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color={TextColors.secondary} />
              <ThemedText style={styles.infoText}>Camp Nou, Barcelona</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color={TextColors.secondary} />
              <ThemedText style={styles.infoText}>Saturday, April 15, 2024</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color={TextColors.secondary} />
              <ThemedText style={styles.infoText}>20:00 - 22:00 (2 hours)</ThemedText>
            </View>
          </View>
        </View>

        {/* Player Status */}
        <View style={styles.playerSection}>
          <ThemedText style={styles.sectionTitle}>Player Status</ThemedText>
          <View style={styles.playerCard}>
            <View style={styles.playerStats}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>8</ThemedText>
                <ThemedText style={styles.statLabel}>Current Players</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>11</ThemedText>
                <ThemedText style={styles.statLabel}>Max Players</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>3</ThemedText>
                <ThemedText style={styles.statLabel}>Needed</ThemedText>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '73%'}]} />
            </View>
          </View>
        </View>

        {/* Match Rules */}
        <View style={styles.rulesSection}>
          <ThemedText style={styles.sectionTitle}>Match Rules</ThemedText>
          <View style={styles.rulesCard}>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <ThemedText style={styles.ruleText}>11 players per team</ThemedText>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <ThemedText style={styles.ruleText}>90 minutes duration</ThemedText>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <ThemedText style={styles.ruleText}>Bring your own equipment</ThemedText>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={16} color={AccentColors.primary} />
              <ThemedText style={styles.ruleText}>Fair play required</ThemedText>
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
  },
  matchHeader: {
    padding: 20,
    backgroundColor: BackgroundColors.white,
    margin: 16,
    borderRadius: 12,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.backgrounds.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamLogoText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.backgrounds.dark,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: TextColors.primary,
    textAlign: 'center',
  },
  vsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  vsText: {
    fontSize: 18,
    fontWeight: '700',
    color: AccentColors.primary,
    marginBottom: 4,
  },
  matchTime: {
    fontSize: 14,
    color: TextColors.secondary,
  },
  infoSection: {
    paddingHorizontal: 16,
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
  infoText: {
    fontSize: 14,
    color: TextColors.primary,
    marginLeft: 12,
    flex: 1,
  },
  playerSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: TextColors.primary,
    marginBottom: 12,
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
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: AccentColors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: TextColors.secondary,
    textAlign: 'center',
    marginTop: 4,
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
  ruleText: {
    fontSize: 14,
    color: TextColors.primary,
    marginLeft: 8,
    flex: 1,
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
