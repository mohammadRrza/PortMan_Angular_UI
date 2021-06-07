import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'داشبورد',
    url: '/dashboard',
    icon: 'icon-speedometer',
    attributes: {hidden: null, who: ['ADMIN']},
  },

  {
    name: 'مدیریت مراکز مخابراتی',
    url: '/telecom-center/telecom-center',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: ' هزینه های مرکز',
    url: '/telecom_costs',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},

     },
  {
    name: 'مدیریت روترها',
    url: '/router/router',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN', 'RESELLER']},

  },
  {
    name: 'مدیریت سوئیچ ها',
    url: '/switch/switch',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: 'مدیریت دی اس لم ها',
    url: '/dslam',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN', 'RESELLER']},
     },
  {
    name: 'مدیریت پورت ها',
    url: '/dslamport/dslamport',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN', 'RESELLER']},
  },
  {
    name: 'وضعیت پورت ها',
    url: '/icons/coreui-icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN', 'RESELLER']},
   },
  {
    name: 'پورت مپ',
    url: '/contact/port-map',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: 'جستجو',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: 'نماینده ریسلر',
    url: '/reseller',
    icon: 'icon-settings',
    children: [
      {
        name: 'مدیر پورت ریسلر',
        url: '/reseller/reseller-ports',
        icon: 'icon-bell'

      },
      {
        name: 'ریسلر',
        url: '/reseller/resellers',
        icon: 'icon-bell'

      }
    ],
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: 'مدیریت کاربران',
    url: '/userManagement',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: 'مدیریت اعضا',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: ' مدیریت شهر و استان',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: ' مدیریت وی لن ها',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: ' مدیریت پروفایل خط',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},

  },
  {
    name: 'مجوزهای دسترسی',
    url: '/permission',
    icon: 'icon-settings',
    children: [
      {
        name: 'مجوزهای کاربران',
        url: '/permission/userpermission',
        icon: 'icon-bell'

      },
      {
        name: 'پروفایل های دسترسی',
        url: '/permission/accessprofile',
        icon: 'icon-bell'

      }
    ],
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: 'آیکون ها',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-settings',
    badge: {
      variant: 'info',
      text: 'NEW'
    },
    attributes: {hidden: null, who: ['ADMIN']},

  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
    attributes: {hidden: null, who: ['ADMIN']},
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ],
    attributes: {hidden: null, who: ['ADMIN']},

  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-settings',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: {hidden: null, who: ['ADMIN']},

  }
];
