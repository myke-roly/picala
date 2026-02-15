import { VISIBLE_TABS, MAX_TABS, TABS_CONFIG } from '@/constants/Tabs';

describe('TabLayout Configuration', () => {
    it('should not have more than 5 tabs', () => {
        expect(VISIBLE_TABS.length).toBeLessThanOrEqual(MAX_TABS);
        expect(VISIBLE_TABS.length).toBeLessThanOrEqual(5);
    });

    it('should have the correct tab structure', () => {
        TABS_CONFIG.forEach(tab => {
            expect(tab).toHaveProperty('name');
            expect(tab).toHaveProperty('title');
            expect(tab).toHaveProperty('icon');
            expect(typeof tab.name).toBe('string');
            expect(typeof tab.title).toBe('string');
            expect(typeof tab.icon).toBe('string');
        });
    });

    it('should include mandatory tabs', () => {
        const names = TABS_CONFIG.map(t => t.name);
        expect(names).toContain('index');
        expect(names).toContain('profile');
    });

    it('should have exactly 5 tabs in current configuration', () => {
        expect(TABS_CONFIG.length).toBe(5);
    });
});
