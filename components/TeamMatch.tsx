import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Text} from '@/components';
import {TextColors, BackgroundColors} from '@/constants';

interface TeamMatchProps {
  team1: {
    logo: string;
    name: string;
  };
  team2: {
    logo: string;
    name: string;
  };
  matchTime?: string;
  matchDate?: string;
  showVS?: boolean;
  style?: StyleProp<ViewStyle>;
}

const TeamMatch: React.FC<TeamMatchProps> = ({team1, team2, matchTime, matchDate, showVS = true, style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {/* Team 1 */}
        <View style={styles.teamSection}>
          <View style={styles.teamLogo}>
            <Text variant="title" strong>
              {team1.logo}
            </Text>
          </View>
          <Text strong>{team1.name}</Text>
        </View>

        {/* VS and Time */}
        <View style={styles.vsContainer}>
          {showVS && (
            <Text variant="subtitle" color="secondary" strong>
              VS
            </Text>
          )}
          {matchTime && <Text strong>{matchTime}</Text>}
          {matchDate && (
            <Text variant="caption" color={TextColors.secondary}>
              {matchDate}
            </Text>
          )}
        </View>

        {/* Team 2 */}
        <View style={styles.teamSection}>
          <View style={styles.teamLogo}>
            <Text variant="title" strong>
              {team2.logo}
            </Text>
          </View>
          <Text strong>{team2.name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamSection: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    backgroundColor: BackgroundColors.elevated,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    width: 48,
    height: 48,
  },
  vsContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },
});

export default TeamMatch;
