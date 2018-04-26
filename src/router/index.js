import Vue from 'vue';
import Router from 'vue-router';
// authentication service
import Auth from '@/utils/auth.js';
// List of Components
import Login from '@/components/contents/login/Login';
import Hello from '@/components/contents/Hello';
import Ajax from '@/components/example/Ajax';
import Tree from '@/components/example/Tree';
import Chart from '@/components/example/Chart';
import PNF from './error/404';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/example/ajax',
      name: 'ajax-example',
      component: Ajax
    },
    {
      path: '/example/tree',
      name: 'tree-example',
      component: Tree,
      meta: { requiresAuth: true }
    },
    {
      path: '/example/chart',
      name: 'chart-example',
      component: Chart,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    PNF
  ]
});

/**
 * Route 실행전 로그인 여부 확인 및 기타 권한 확인
 * 참고: https://router.vuejs.org/kr/advanced/transitions.html
 * {
 *  routes 설정의 각 라우트 객체를 라우트 레코드 라고합니다. 라우트 레코드는 중첩 될 수 있습니다.
 *  라우트와 일치하는 모든 라우트 레코드는 $route 객체(그리고 네비게이션 가드의 라우트 객체)에 $route.matched 배열로 노출됩니다.
 *  그러므로 우리는 $route.matched를 반복하여 라우트 레코드의 메타 필드를 검사 할 필요가 있습니다.
 *    > 검사 구문: if (to.matched.some(record => record.meta.requiresAuth)) ...
 * }
 * @author minam.cho
 * @since September 06, 2017
 */
router.beforeEach((to, from, next) => {
  if (Auth.checkAuth() && to.name === 'Login') {
    // 이미 로그인 한 경우 다시 "로그인"페이지로 접근했을 때 메인 페이지로 돌아가도록 한다.
    next({
      path: '/'
    });
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!Auth.checkAuth()) {
        console.log(to.fullPath);
        alert('로그인이 필요합니다.');
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next(); // 반드시 next()를 호출하십시오!
    }
  }
});

export default router;
