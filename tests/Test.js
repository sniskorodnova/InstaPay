import { Selector } from 'testcafe';

fixture`Validates github search`
  .page`https://github.com/`;

test('Validates successful search for Nuxt.js', async t => {
  await t
    .typeText('form[action="/search"]', 'Nuxt.js')
    .pressKey('enter');

  await t
    .expect(Selector('.repo-list > li > .mt-n1 > div > a').getAttribute('href')).contains('/nuxt/nuxt.js');
});

test('Validates successful search for Vue.js', async t => {
  await t
    .typeText('form[action="/search"]', 'Vue.js')
    .pressKey('enter');

  await t
    .expect(Selector('.repo-list > li > .mt-n1 > div > a').getAttribute('href')).contains('/vuejs/vuex');
});

test('Validates topics for Nuxt.js', async t => {
  await t
    .typeText('form[action="/search"]', 'Nuxt.js')
    .pressKey('enter');
  const nuxtButton = Selector('.repo-list > li > .mt-n1 > div > a > em').withText('nuxt.js');

  await t
    .click(Selector('.repo-list > li > .mt-n1 > div > a > em').withText('nuxt.js'));

  await t.expect(Selector('a').withAttribute('title', 'Topic: vue').visible).ok();
  await t.expect(Selector('a').withAttribute('title', 'Topic: ssr').visible).ok();
  await t.expect(Selector('a').withAttribute('title', 'Topic: server-rendering').visible).ok();
});