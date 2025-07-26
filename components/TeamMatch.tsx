import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {ThemedText} from '@/components';
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
            <ThemedText style={[styles.teamLogoText]}>{team1.logo}</ThemedText>
          </View>
          <ThemedText style={[styles.teamName]}>{team1.name}</ThemedText>
        </View>

        {/* VS and Time */}
        <View style={styles.vsContainer}>
          {showVS && <ThemedText style={[styles.vsText]}>VS</ThemedText>}
          {matchTime && <ThemedText style={[styles.matchTime]}>{matchTime}</ThemedText>}
          {matchDate && <ThemedText style={[styles.matchDate]}>{matchDate}</ThemedText>}
        </View>

        {/* Team 2 */}
        <View style={styles.teamSection}>
          <View style={styles.teamLogo}>
            <ThemedText style={[styles.teamLogoText]}>{team2.logo}</ThemedText>
          </View>
          <ThemedText style={[styles.teamName]}>{team2.name}</ThemedText>
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
  teamLogoText: {
    fontWeight: '700',
    color: TextColors.primary,
    fontSize: 16,
  },
  teamName: {
    fontWeight: '600',
    color: TextColors.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  vsContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  vsText: {
    color: TextColors.secondary,
    marginBottom: 4,
  },
  matchTime: {
    color: TextColors.primary,
    marginBottom: 2,
  },
  matchDate: {
    color: TextColors.secondary,
  },
});

export default TeamMatch;
