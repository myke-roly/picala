import { IconSymbolName } from '@/components/ui/IconSymbol';

export interface TabConfig {
    name: string;
    title: string;
    icon: IconSymbolName;
}

export const TABS_CONFIG: TabConfig[] = [
    { name: 'index', title: 'Home', icon: 'house.fill' },
    { name: 'explore', title: 'Explore', icon: 'paperplane.fill' },
    { name: 'matches', title: 'Matches', icon: 'sportscourt.fill' },
    { name: 'messages', title: 'Messages', icon: 'message.fill' },
    { name: 'profile', title: 'Profile', icon: 'person.fill' },
];

export const MAX_TABS = 5;
export const VISIBLE_TABS = TABS_CONFIG.slice(0, MAX_TABS);
