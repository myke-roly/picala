import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TeamMatch} from '@/components';
import {TeamMatchProps} from './TeamMatch';
import {BackgroundColors} from '@/constants';

interface MatchCardProps extends TeamMatchProps {
  date: string;
  time: string;
  location: string;
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

      {/* Team Match Component */}
      <TeamMatch team1={team1} team2={team2} matchTime={time} matchDate={date} style={styles.teamMatchContainer} />

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
    backgroundColor: BackgroundColors.white,
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
  teamMatchContainer: {
    marginVertical: 8,
  },
  playerInfo: {
    marginTop: 8,
    alignItems: 'center',
  },
});

export default MatchCard;
