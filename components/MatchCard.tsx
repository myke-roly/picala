import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '@/components';

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
        <Text>{location}</Text>
      </View>

      {/* Main content with three sections */}
      <View style={styles.mainContent}>
        {/* Left section - Team 1 */}
        <View style={styles.teamSection}>
          <View style={styles.teamIcon}>
            <Text>x</Text>
          </View>
          <Text>{team1}</Text>
        </View>

        {/* Center section - Time and Date */}
        <View style={styles.timeSection}>
          <Text>{time}</Text>
          <Text>{date}</Text>
        </View>

        {/* Right section - Team 2 */}
        <View style={styles.teamSection}>
          <Text>{team2}</Text>
          <View style={styles.teamIcon}>
            <Text>x</Text>
          </View>
        </View>
      </View>

      {/* Optional player count info */}
      {playerCount !== undefined && maxPlayers !== undefined && (
        <View style={styles.playerInfo}>
          <Text>
            {playerCount}/{maxPlayers} players
          </Text>
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
  timeSection: {
    alignItems: 'center',
    flex: 1,
  },
  playerInfo: {
    marginTop: 8,
    alignItems: 'center',
  },
});

export default MatchCard;
