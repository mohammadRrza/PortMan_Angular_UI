import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'داشبورد',
    url: '/dashboard',
    icon: 'icon-speedometer',
    attributes: {hidden: null, who: ['ADMIN','SUPERVISOR']},
    ldap_attributes: {hidden: null, who: []},

  },
  {
    name: 'Portman CDMS',
    url: '/portman-cdms/portman-cdms',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN', 'RESELLER','DIRECTRESELLER','SUPPORT']},
    ldap_attributes: {hidden: null, who: ['Portman-support']},
   },
   {
    name: 'Pishgaman Note',
    url: '/pishgaman-note/pishgaman-note',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN', 'RESELLER']},
    ldap_attributes: {hidden: null, who: ['Portman-support']},
   },
  {
    name: 'مدیریت مراکز مخابراتی',
    url: '/telecom-center/telecom-center',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN','SUPERVISOR']},
    ldap_attributes: {hidden: null, who: []},

  },
  {
    name: ' هزینه های مرکز',
    url: '/telecom_costs',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},

     },
     {
      name: 'Backup Management',
      url: '/backup-management',
      icon: 'icon-settings',
      attributes: {hidden: null, who: []},
      ldap_attributes: {hidden: null, who: []},
  
       },
     {
      name: 'Back Up Errors',
      url: '/back_up_errors',
      icon: 'icon-settings',
      attributes: {hidden: null, who: []},
      ldap_attributes: {hidden: null, who: []},
  
    },
    {
        name: 'DDR Page',
        url: '/ddr-page/ddr-page-info',
        icon: 'icon-settings',
        attributes: {hidden: null, who: ['ADMIN', 'RESELLER']},
        ldap_attributes: {hidden: null, who: []},
    
    },
  {
    name: 'مدیریت روترها',
    url: '/router/router',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN','SUPERVISOR','COREUSER','Software']},
    ldap_attributes: {hidden: null, who: ['Portman-Teh-Backup-Group']},

  },
  {
    name: 'مدیریت رادیو ها',
    url: '/radio/radio',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN']},
    ldap_attributes: {hidden: null, who: ['Software']},
  },
  {
    name: 'مدیریت سوئیچ ها',
    url: '/switch/switch',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN','SUPERVISOR','COREUSER']},
    ldap_attributes: {hidden: null, who: ['Portman-Teh-Backup-Group']},
  },
  {
    name: 'به روز رسانی پارتاک',
    url: '/partak/update-partak-fqdns',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN','SUPPORT']},
    ldap_attributes: {hidden: null, who: ['Portman-support']},
   },
  {
    name: 'مدیریت دی اس لم ها',
    url: '/dslam',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN','SUPERVISOR','DIRECTRESELLER']},
    ldap_attributes: {hidden: null, who: ['Portman-support']},
  },
  {
    name: 'مدیریت پورت ها',
    url: '/dslamport/dslamport',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN','SUPERVISOR']},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: 'وضعیت پورت ها',
    url: '/icons/coreui-icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},
   },
  {
    name: 'پورت مپ',
    url: '/contact/port-map',
    icon: 'icon-settings',
    attributes: {hidden: null, who: ['ADMIN','SUPERVISOR']},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: 'جستجو',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: 'نماینده ریسلر',
    url: '/reseller',
    icon: 'icon-settings',
    children: [
      {
        name: 'مدیر پورت ریسلر',
        url: '/reseller/reseller-ports',
        icon: 'icon-bell',
        ldap_attributes: {hidden: null, who: []},
      },
      {
        name: 'ریسلر',
        url: '/reseller/resellers',
        icon: 'icon-bell',
        ldap_attributes: {hidden: null, who: []},
      }
    ],
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: 'مدیریت کاربران',
    url: '/userManagement',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: 'مدیریت اعضا',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: ' مدیریت شهر و استان',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: ' مدیریت وی لن ها',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: ' مدیریت پروفایل خط',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: 'مجوزهای دسترسی',
    url: '/permission',
    icon: 'icon-settings',
    children: [
      {
        name: 'مجوزهای کاربران',
        url: '/permission/userpermission',
        icon: 'icon-bell',
        ldap_attributes: {hidden: null, who: []},


      },
      {
        name: 'پروفایل های دسترسی',
        url: '/permission/accessprofile',
        icon: 'icon-bell',
        ldap_attributes: {hidden: null, who: []},

      }
    ],
    attributes: {hidden: null, who: ['ADMIN','SUPERVISOR']},
    ldap_attributes: {hidden: null, who: []},
  },
  {
    name: 'آیکون ها',
    url: '/icons',
    icon: 'icon-settings',
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},

  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-settings',
    badge: {
      variant: 'info',
      text: 'NEW'
    },
    attributes: {hidden: null, who: []},
    ldap_attributes: {hidden: null, who: []},

  },
  {
    divider: true,
    ldap_attributes: {hidden: null, who: []},

  },
  {
    title: true,
    name: 'Extras',
    attributes: {hidden: true, who: []},
    ldap_attributes: {hidden: true, who: []},
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star',
        ldap_attributes: {hidden: null, who: []},

      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star',
        ldap_attributes: {hidden: null, who: []},

      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star',
        ldap_attributes: {hidden: null, who: []},

      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star',
        ldap_attributes: {hidden: null, who: []},

      }
    ],
    attributes: {hidden: true, who: []},
    ldap_attributes: {hidden: true, who: []},

  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-settings',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: {hidden: true, who: []},
    ldap_attributes: {hidden: true, who: []},

  }
];
