import {StyleSheet, View, ScrollView} from 'react-native';
import {usePersistentAuth} from '@/hooks/usePersistentAuth';
import {signOutUser} from '@/services/auth';
import {useRouter} from 'expo-router';
import {CustomButton, Header, MatchCard, Text} from '@/components';

const HomeScreen = () => {
  const {user, isAuthenticated} = usePersistentAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleMatchPress = (matchId: string) => {
    console.log('Match pressed:', matchId);
    router.push({
      pathname: '/match',
      params: {matchId},
    });
  };

  // Mock data for matches
  const matches = [
    {
      id: '1',
      team1: {logo: '', name: 'Barcelona FC'},
      team2: {logo: '', name: 'Real Madrid'},
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
      team1: {logo: '', name: 'Bayern Munich'},
      team2: {logo: '', name: 'Borussia Dortmund'},
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
        button={{title: 'Invite friends', onPress: () => {}}}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {isAuthenticated ? (
            <Text>Welcome, {user?.email}</Text>
          ) : (
            <CustomButton title="Sign In" onPress={handleLogin} />
          )}
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
    padding: 20,
    paddingTop: 0,
  },
});

export default HomeScreen;
