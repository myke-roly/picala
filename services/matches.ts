import Logger from './logger';

export interface Team {
    logo: string;
    name: string;
}

export interface Match {
    id: number | string;
    team1: Team;
    team2: Team;
    date: string;
    time: string;
    location: string;
    playerCount: number;
    maxPlayers: number;
    odds1?: string;
    odds2?: string;
}

// Mock data
const UPCOMING_MATCH: Match = {
    id: 'upcoming-1',
    team1: { logo: '', name: 'Barcelona' },
    team2: { logo: '', name: 'Real Madrid' },
    date: 'Sat, 15 Apr',
    time: '20:00',
    location: 'Camp Nou',
    playerCount: 8,
    maxPlayers: 11,
};

const FEATURED_MATCHES: Match[] = [
    {
        id: 1,
        team1: { logo: '', name: 'Man City' },
        team2: { logo: '', name: 'Liverpool' },
        date: 'Sun, 16 Apr',
        time: '18:30',
        location: 'Etihad Stadium',
        playerCount: 10,
        maxPlayers: 11,
    },
    {
        id: 2,
        team1: { logo: '', name: 'Arsenal' },
        team2: { logo: '', name: 'Chelsea' },
        date: 'Mon, 17 Apr',
        time: '20:00',
        location: 'Emirates Stadium',
        playerCount: 6,
        maxPlayers: 11,
    },
];

export const getUpcomingMatch = async (): Promise<Match | null> => {
    // TODO: Replace with real API call
    // const { data, error } = await supabase.from('matches').select('*').single();
    Logger.log('Fetching upcoming match');
    return new Promise((resolve) => {
        setTimeout(() => resolve(UPCOMING_MATCH), 500);
    });
};

export const getFeaturedMatches = async (): Promise<Match[]> => {
    // TODO: Replace with real API call
    Logger.log('Fetching featured matches');
    return new Promise((resolve) => {
        setTimeout(() => resolve(FEATURED_MATCHES), 500);
    });
};

export const joinMatch = async (matchId: string | number): Promise<boolean> => {
    // TODO: Replace with real API call
    Logger.log(`Joining match ${matchId}`);
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
};
