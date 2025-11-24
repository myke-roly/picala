import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';
import { signOut } from '@/services/auth';
import { useRouter } from 'expo-router';
import { CustomButton, Header, MatchCard, Text } from '@/components';
import { BackgroundColors } from '@/constants/Colors';
import { getUpcomingMatch, Match } from '@/services/matches';
import { Share, Alert } from 'react-native';

const HomeScreen = () => {
  const { user, isAuthenticated } = usePersistentAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {

    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleMatchPress = (matchId: string) => {

    router.push({
      pathname: '/match',
      params: { matchId },
    });
  };

  const [upcomingMatch, setUpcomingMatch] = React.useState<Match | null>(null);

  React.useEffect(() => {
    const loadMatch = async () => {
      const match = await getUpcomingMatch();
      setUpcomingMatch(match);
    };
    loadMatch();
  }, []);

  const handleInvite = async () => {
    try {
      await Share.share({
        message: 'Join me for a match on Picala! Download the app now.',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share invite.');
    }
  };
  // Mock data for matches
  const matches = [
    {
      id: '1',
      team1: { logo: '', name: 'Barcelona FC' },
      team2: { logo: '', name: 'Real Madrid' },
      date: 'Dec 15, 2024',
      time: '20:00',
      location: 'Camp Nou, Barcelona',
      needsPlayers: true,
      playerCount: 8,
    },
    {
      id: '2',
      team1: {
        logo: '',
        name: 'Manchester United',
      },
      team2: {
        logo: '',
        name: 'Liverpool',
      },
      date: 'Dec 16, 2024',
      time: '15:30',
      location: 'Old Trafford, Manchester',
      needsPlayers: true,
      playerCount: 11,
    },
    {
      id: '3',
      team1: { logo: '', name: 'Bayern Munich' },
      team2: { logo: '', name: 'Borussia Dortmund' },
      date: 'Dec 17, 2024',
      time: '19:45',
      location: 'Allianz Arena, Munich',
      needsPlayers: true,
      playerCount: 6,
    },
  ];

  return (
    <>
      <Header
        title="Earn more"
        text="Invite friends to join the app and earn more points"
        button={{ title: 'Invite friends', onPress: () => { } }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {isAuthenticated ? (
            <Text>Welcome, {user?.email}</Text>
          ) : (
            <CustomButton title="Sign In" onPress={handleLogin} />
          )}
        </View>

        <View style={styles.inviteSection}>
          <Text variant="subtitle" level="md" strong style={styles.sectionTitle}>
            Invite Friends
          </Text>
          {/* TODO: Implement invite friends functionality */}
          <View style={styles.inviteCard}>
            <Text>Invite your friends to play!</Text>
            <CustomButton
              title="Invite"
              onPress={handleInvite}
              variant="outline"
              size="small"
              style={{ marginTop: 8 }}
            />
          </View>
        </View>

        <View style={styles.matchesContainer}>
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              time={match.time}
              location={match.location}
              playerCount={match.playerCount}
              maxPlayers={match.playerCount}
              onPress={() => handleMatchPress(match.id)}
            />
          ))}
        </View>

        {isAuthenticated && (
          <View style={styles.logoutContainer}>
            <CustomButton title="Sign Out" variant="danger" onPress={handleLogout} />
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  userInfo: {
    marginVertical: 10,
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
  },
  authMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  matchesContainer: {
    gap: 16,
  },
  logoutContainer: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  inviteSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  inviteCard: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
