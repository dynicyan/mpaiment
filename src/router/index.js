import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
  }
}
export default new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('../Page')), 'mpaiment-nav'),
      children: [
        {
          path: '/',
          name: 'home',
          component: r => require.ensure([], () => r(require('../Page')), 'mpaiment-nav')
        },
        {
          path: '/mpbutton',
          name: 'mpbutton',
          component: r => require.ensure([], () => r(require('../packages/mpaiButton/Index')), 'mpaiment-button')
        },
        {
          path: '/mpinput',
          name: 'mpinput',
          component: r => require.ensure([], () => r(require('../packages/mpaiInput/Index')), 'mpaiment-button')
        },
        {
          path: '/mpselect',
          name: 'mpselect',
          component: r => require.ensure([], () => r(require('../packages/mpaiSelect/Index')), 'mpaiment-button')
        },
        {
          path: '/mpcheck',
          name: 'mpcheck',
          component: r => require.ensure([], () => r(require('../packages/mpaiCheck/Index')), 'mpaiment-button')
        },
        {
          path: '/mphistory',
          name: 'mphistory',
          component: r => require.ensure([], () => r(require('../packages/mpaiHistory/Index')), 'mpaiment-button')
        },
        {
          path: '/mpage',
          name: 'mpage',
          component: r => require.ensure([], () => r(require('../packages/mpaiPage/Index')), 'mpaiment-button')
        },
        {
          path: '/mpnodata',
          name: 'mnodata',
          component: r => require.ensure([], () => r(require('../packages/mpaiNodata/Index')), 'mpaiment-button')
        }
      ]
    }
  ]
})
