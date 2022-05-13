import { createRouter, createWebHashHistory } from "vue-router";

// import ListPage from '../modules/pokemon/pages/ListPage'
// // import AboutPage from '../modules/pokemon/pages/AboutPage'
// import PokemonPage from '../modules/pokemon/pages/PokemonPage'

// import NoPageFound from '../modules/shared/pages/NoPageFound'

const routes = [
  // { path: '/', component: ListPage },
  {
    path: "/",
    redirect: '/pokemon'
  },
  {
    path: "/pokemon",
    name: "pokemon",
    component: () =>
      import(
        /* webpackChunkName: "ListPage" */ "../modules/pokemon/layouts/PokemonLayout"
      ),
    children: [
      {
        path: "home",
        name: "pokemon-home",
        component: () =>
          import(
            /* webpackChunkName: "ListPage" */ "../modules/pokemon/pages/ListPage"
          ),
      },
      {
        path: "about",
        name: "pokemon-about",
        component: () =>
          import(
            /* webpackChunkName: "AboutPage" */ "../modules/pokemon/pages/AboutPage"
          ),
      },
      {
        path: "pokemonid/:id",
        name: "pokemon-id",
        component: () =>
          import(
            /* webpackChunkName: "PokemonPage" */ "../modules/pokemon/pages/PokemonPage"
          ),
        props: (route) => {
          const id = Number(route.params.id);
          return isNaN(id) ? { id: 1 } : { id: id };
        },
      },
      {
        path: '',
        redirect: { name: 'pokemon-about' }
      }
    ],
  },
  // {
  //   path: "/home",
  //   name: 'home',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "ListPage" */ "../modules/pokemon/pages/ListPage"
  //     ),
  // },
  // {
  //   path: "/about",
  //   name: 'about',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "AboutPage" */ "../modules/pokemon/pages/AboutPage"
  //     ),
  // },
  // {
  //   path: "/pokemonid/:id",
  //   name: "pokemon-id",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "PokemonPage" */ "../modules/pokemon/pages/PokemonPage"
  //     ),
  //   props: (route) => {
  //     const id = Number( route.params.id )
  //     return isNaN(id) ? { id: 1 } : { id: id }
  //   }
  // },
  // DBZ LAYOUT
  {
    path: '/dbz',
    component: () =>
      import(
        /* webpackChunkName: "DBZLayout" */ "../modules/dbz/layouts/DragonBallLayout"
      ),
    children: [
      {
        path: 'characters',
        name: 'dbz-characters',
        component: () =>
          import(
            /* webpackChunkName: "DBZ-Characteres" */ "../modules/dbz/pages/Characteres"
          )
      },
      {
        path: 'about',
        name: 'dbz-about',
        component: () =>
          import(
            /* webpackChunkName: "DBZ-About" */ "../modules/dbz/pages/About"
          )
      },
      {
        path: "",
        redirect: { name: 'dbz-characters' }
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(
        /* webpackChunkName: "NoPageFound" */ "../modules/shared/pages/NoPageFound"
      ),
  },
  // { path: '/id', component: PokemonPage },
  // { path: '/:pathMatch(.*)*', component: NoPageFound }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Guard global - syncronic
// router.beforeEach((to, from, next) => {
//   console.log({ to, from, next });
//   const random = Math.random() * 100
//   if ( random > 50 ) {
//     console.log(random, 'authenticated')
//     next()
//   } else {
//     console.log(random, 'blocked by beforeEach Guard')
//     next({ name: 'pokemon-home' })
//   }
// })

const canAccess = () => {
  return new Promise( resolve => {
    const random = Math.random() * 100

    if ( random > 50 ) {
      console.log(random, 'authenticated')
      resolve(true)
    } else {
      console.log(random, 'blocked by beforeEach Guard')
      // next({ name: 'pokemon-home' })
      resolve(false)
    }
  })
}

router.beforeEach( async(to, from, next) => {
  const authorized = await canAccess()

  authorized ? next() : next({ name: 'pokemon-home' })
})

export default router;
