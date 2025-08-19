import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Image} from 'react-native';
import {Text} from '@/components';
import {TextColors, BackgroundColors} from '@/constants';

const EmptyTeamLogo = ({name = 'N N', size = 48}: {name: string; size?: number}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <View style={[styles.teamLogo, {width: size, height: size}]}>
      <Text level="lg" strong>
        {initials.toUpperCase()}
      </Text>
    </View>
  );
};

const TeamComponent = ({logo, name}: Team) => {
  const isEmpty = !logo;

  return (
    <View style={styles.teamSection}>
      {isEmpty ? <EmptyTeamLogo name={name} /> : <Image source={{uri: logo}} style={styles.teamLogo} />}

      <Text center strong>
        {name}
      </Text>
    </View>
  );
};

interface Team {
  logo: string;
  name: string;
}

export interface TeamMatchProps {
  team1: Team;
  team2: Team;
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
        <TeamComponent logo={team1.logo} name={team1.name} />

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
        <TeamComponent logo={team2.logo} name={team2.name} />
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
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 25,
    padding: 8,
    backgroundColor: BackgroundColors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },
});

export default TeamMatch;
