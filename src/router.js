/*global Vue*/
import Router from 'vue-router'
import main from '@/components/main'
import selectRegion from '@/components/selectRegion'
import adminList from '@/components/adminList'
import chooseAdmin from '@/components/chooseAdmin'
import subpages from '@/components/subpages'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/selectRegion',
      name: 'selectRegion',
      component: selectRegion
    },
    {
      path: '/adminList/:id',
      name: 'adminList',
      component: adminList
    },
    {
      path: '/chooseAdmin/:areaId',
      name: 'chooseAdmin',
      component: chooseAdmin
    },
    {
      path: '/subpages/:areaId/:parentId',
      name: 'subpages',
      component: subpages
    }
  ]
})
