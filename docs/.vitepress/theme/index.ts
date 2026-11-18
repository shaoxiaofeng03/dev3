import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './custom.css';

import TodayPanel from './components/TodayPanel.vue';
import WeekTasks from './components/WeekTasks.vue';
import Heatmap from './components/Heatmap.vue';
import CheckinDashboard from './components/CheckinDashboard.vue';
import FlashCards from './components/FlashCards.vue';
import GhSettings from './components/GhSettings.vue';
import SiteSearch from './components/SiteSearch.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('TodayPanel', TodayPanel);
    app.component('WeekTasks', WeekTasks);
    app.component('Heatmap', Heatmap);
    app.component('CheckinDashboard', CheckinDashboard);
    app.component('FlashCards', FlashCards);
    app.component('GhSettings', GhSettings);
    app.component('SiteSearch', SiteSearch);
  },
} satisfies Theme;
