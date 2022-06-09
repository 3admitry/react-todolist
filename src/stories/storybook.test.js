// storybook.test.js

import initStoryshots from '@storybook/addon-storyshots';
initStoryshots({
    storyKindRegex: /^TodoList\/.*$/,
   /* suite: 'TodoList',*/
});
