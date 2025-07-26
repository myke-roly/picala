import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemedText} from '@/components/ThemedText';

interface MatchCardProps {
  team1: string;
  team2: string;
  date: string;
  time: string;
  location: string;
  needsPlayers?: boolean;
  playerCount?: number;
  maxPlayers?: number;
  onPress?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  date,
  time,
  location,
  needsPlayers = false,
  playerCount,
  maxPlayers,
  onPress,
}) => {
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Location at the top center */}
      <View style={styles.locationContainer}>
        <ThemedText style={styles.locationText}>{location}</ThemedText>
      </View>

      {/* Main content with three sections */}
      <View style={styles.mainContent}>
        {/* Left section - Team 1 */}
        <View style={styles.teamSection}>
          <View style={styles.teamIcon}>
            <ThemedText style={styles.iconText}>x</ThemedText>
          </View>
          <ThemedText style={styles.teamName}>{team1}</ThemedText>
        </View>

        {/* Center section - Time and Date */}
        <View style={styles.timeSection}>
          <ThemedText style={styles.timeText}>{time}</ThemedText>
          <ThemedText style={styles.dateText}>{date}</ThemedText>
        </View>

        {/* Right section - Team 2 */}
        <View style={styles.teamSection}>
          <ThemedText style={styles.teamName}>{team2}</ThemedText>
          <View style={styles.teamIcon}>
            <ThemedText style={styles.iconText}>x</ThemedText>
          </View>
        </View>
      </View>

      {/* Optional player count info */}
      {playerCount !== undefined && maxPlayers !== undefined && (
        <View style={styles.playerInfo}>
          <ThemedText style={styles.playerText}>
            {playerCount}/{maxPlayers} players
          </ThemedText>
        </View>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamIcon: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  timeSection: {
    alignItems: 'center',
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  dateText: {
    fontSize: 14,
    color: '#000000',
    marginTop: 2,
  },
  playerInfo: {
    marginTop: 8,
    alignItems: 'center',
  },
  playerText: {
    fontSize: 12,
    color: '#666666',
  },
});

export default MatchCard;
