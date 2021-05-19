import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'داشبورد',
    url: '/dashboard',
    icon: 'icon-speedometer',
    attributes: {hidden: null}

  },

  {
    name: 'مدیریت مراکز مخابراتی',
    url: '/telecom-center/telecom-center',
    icon: 'icon-settings',
    attributes: {hidden: null}
  },
  {
    name: ' هزینه های مرکز',
    url: '/telecom_costs',
    icon: 'icon-settings',
    attributes: {hidden: null}

     },
  {
    name: 'مدیریت روترها',
    url: '/router/router',
    icon: 'icon-settings',
    attributes: {hidden: null}

  },
  {
    name: 'مدیریت سوئیچ ها',
    url: '/switch/switch',
    icon: 'icon-settings',
    attributes: {hidden: null}
  },
  {
    name: 'مدیریت دی اس لم ها',
    url: '/dslam',
    icon: 'icon-settings',
    attributes: {hidden: null}
     },
  {
    name: 'مدیریت پورت ها',
    url: '/dslamport/dslamport',
    icon: 'icon-settings',
    attributes: {hidden: null}
  },
  {
    name: 'وضعیت پورت ها',
    url: '/icons/coreui-icons',
    icon: 'icon-settings',
    attributes: {hidden: null}
   },
  {
    name: 'پورت مپ',
    url: '/contact/port-map',
    icon: 'icon-settings',
    attributes: {hidden: null}
  },
  {
    name: 'جستجو',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null}
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
    attributes: {hidden: null}
  },
  {
    name: 'مدیریت کاربران',
    url: '/userManagement',
    icon: 'icon-settings',
    attributes: {hidden: null}
  },
  {
    name: 'مدیریت اعضا',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null}
  },
  {
    name: ' مدیریت شهر و استان',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null}
  },
  {
    name: ' مدیریت وی لن ها',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null}
  },
  {
    name: ' مدیریت پروفایل خط',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null}

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
    attributes: {hidden: null}
  },
  {
    name: 'آیکون ها',
    url: '/icons',
    icon: 'icon-settings',


  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-settings',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
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
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-settings',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },

  }
];
