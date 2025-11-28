import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';
import { Team } from '@/services/matches';

interface MatchCardProps {
  team1: Team;
  team2: Team;
  date: string;
  odds1?: string;
  odds2?: string;
  onPress?: () => void;
  // Legacy props (optional for backward compatibility if needed, or ignored)
  time?: string;
  location?: string;
  playerCount?: number;
  maxPlayers?: number;
}

const MatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  date,
  odds1,
  odds2,
  onPress,
}) => {
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer style={styles.matchCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.matchHeader}>
        <Text style={styles.matchDate}>{date}</Text>
        <Ionicons name="star" size={16} color="#1a1b26" />
      </View>

      <View style={styles.teamRow}>
        <View style={styles.teamInfo}>
          {/* Placeholder for team logo */}
          <View style={[styles.teamLogo, { backgroundColor: '#0077b6' }]} >
            <Ionicons name="shield" size={16} color="#fff" />
          </View>
          <Text style={styles.teamName}>{team1.name}</Text>
        </View>
        {odds1 && (
          <View style={styles.oddsBadge}>
            <Text style={styles.oddsText}>{odds1}</Text>
          </View>
        )}
      </View>

      <View style={[styles.teamRow, { marginTop: 12 }]}>
        <View style={styles.teamInfo}>
          {/* Placeholder for team logo */}
          <View style={[styles.teamLogo, { backgroundColor: '#d00000' }]} >
            <Ionicons name="shield" size={16} color="#fff" />
          </View>
          <Text style={styles.teamName}>{team2.name}</Text>
        </View>
        {odds2 && (
          <View style={styles.oddsBadge}>
            <Text style={styles.oddsText}>{odds2}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onPress}
      >
        <Text style={styles.actionButtonText}>Place a parlay</Text>
      </TouchableOpacity>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  matchDate: {
    color: '#64748b',
    fontSize: 14,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  oddsBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  oddsText: {
    color: '#059669',
    fontWeight: '600',
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: '#1a1b26',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MatchCard;
