import { createRouter, createWebHistory } from 'vue-router'

import signin from '../views/signin.vue'
import signup from '../views/signup.vue'

import HomePage from '../views/HomePage/HomePage.vue'

import MyFavorite from '../views/HomePage/MyFavorite.vue'
import ContactUs from '../views/HomePage/ContactUs.vue'
import  About from '../views/HomePage/About.vue'

import Home from '../views/HomePage/Home.vue'
import ShowQA from '../views/HomePage/ShowQA.vue'
import askQuestion from '../views/HomePage/askQuestion.vue'
import RecentArticles from '../views/HomePage/RecentArticles.vue'
import showTutorial from '../views/HomePage/showTutorial.vue'
import TopUpvote from '../views/HomePage/TopUpvote.vue'
import blogAdding from '../views/AdminPage/blogAdding.vue'
import Admin from '../views/AdminPage/Admin.vue'
import answer from '../views/HomePage/answer.vue'
import Blog from '../views/AdminPage/Blog.vue'
import User from '../views/AdminPage/User.vue'
import blogEditing from '../views/AdminPage/blogEditing.vue'
import Profile from '../views/HomePage/Profile.vue'
import Question from '../views/AdminPage/Question.vue'
import Feedback from '../views/AdminPage/Feedback.vue'

import axios from 'axios'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {title: 'home'},
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: Home,
        alias: '/',
        children: [
          {
          path: 'ShowQA',
          name: 'ShowQA',
          component: ShowQA,
          alias: ['/']
          },
          {
            path: 'askQuestion',
            name: 'askQuestion',
            component: askQuestion
          },
          {
            path: 'RecentArticles',
            name: 'RecentArticles',
            component: RecentArticles
          },
          {
            path: 'TopUpvote',
            name: 'TopUpvote',
            component: TopUpvote
          },
          {
            path: 'showTutorial',
            name: 'showTutorial',
            component: showTutorial
          }
        ]
      },
      {
        path: '/MyFavorite',
        name: 'MyFavorite',
        component: MyFavorite,
      },
      {
        path: '/ContactUs',
        name: 'ContactUs',
        component: ContactUs
      },
      {
        path: '/About',
        name: 'About',
        component: About
      },
      {
        path: '/Profile',
        name: 'Profile',
        component: Profile
      }
    ]
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    meta: {title: 'admin'},
    children: [
      {
        path: 'blogAdding',
        name: 'blogAdding',
        component: blogAdding
      },
      {
        path: 'blogEditing',
        name: 'blogEditing',
        component: blogEditing
      },
      {
        path: 'Blog',
        name: 'Blog',
        component: Blog
      },
      {
        path: 'User',
        name: 'User',
        component: User
      },
      {
        path: 'Feedback',
        name: 'Feedback',
        component: Feedback
      },
      {
        path: 'Question',
        name: 'Question',
        component: Question
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'HomePage',
  //   component: Homepage
  // },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: signin
  },
  {
    path: '/answer',
    name: 'answer',
    component: answer,
  }
  // {
  //   path: '/',
  //   name: 'HomePage',
  //   component: HomePage,
  //   meta: {title: 'home'},
  //   children: [
  //     {
  //       path: 'Home',
  //       name: 'Home',
  //       component: Home,
  //       alias: '/',
  //     }
  //   ],
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
