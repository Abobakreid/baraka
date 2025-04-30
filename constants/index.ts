export const topbarSocial = [
  {
    image: "/socialImages/youtube.svg",
    route: "/",
    name: "tiktok",
  },
  {
    image: "/socialImages/twitter.svg",
    route: "/",
    name: "twitter",
  },
  {
    image: "/socialImages/tiktok.svg",
    route: "/",
    name: "instagram",
  },
  {
    image: "/socialImages/insta.svg",
    route: "/",
    name: "youtube",
  },
  {
    image: "/socialImages/facebook.svg",
    route: "/",
    name: "facebook",
  },
];

export const navbarLinks = [
  {
    route: "/",
    label: "الرئيسية",
  },
  {
    route: "/car-maintenance",
    label: "صيانة السيارات",
    subLinks: [
      {
        route: "/car-maintenance/ميكانيكا",
        label: "ميكانيكا",
        updatedAt: "2025-03-01",
      },
      {
        route: "/car-maintenance/كهرباء",
        label: "كهرباء",
        updatedAt: "2025-03-01",
      },
      {
        route: "/car-maintenance/عفشة",
        label: "عفشة",
        updatedAt: "2025-03-01",
      },
      {
        route: "/car-maintenance/سمكره ودهان",
        label: "سمكره ودهان",
        updatedAt: "2025-03-01",
      },
      {
        route: "/car-maintenance/كاوتش",
        label: "كاوتش",
        updatedAt: "2025-03-01",
      },
    ],
  },
  {
    route: "/car-inspection",
    label: "فحص السيارات",
  },
  {
    route: "/auto-parts",
    label: "قطع الغيار",
  },
  {
    route: "/car-oils",
    label: "الزيوت",
  },
  {
    route: "/our-works",
    label: "اعمالنا",
  },
];

export const slides = [
  {
    src: "/hero/hero-1.png",
    alt: "hero image",
  },
  {
    src: "/hero/hero-2.png",
    alt: "hero image",
  },
];

export const whyUsCards = [
  {
    image: "/whyus/why-4.svg",
    head: "خدمة العملاء الممتازة",
    paragraph: "تقديم استشارات فنية وخدمة عملاء متواصلة لضمان رضا العملاء.",
  },
  {
    image: "/whyus/why-3.svg",
    head: "جودة مضمونة",
    paragraph: "قطع غيار أصلية وخدمات عالية الجودة عليها ضمان كامل.",
  },
  {
    image: "/whyus/why-2.svg",
    head: "أحدث الأجهزة والتقنيات",
    paragraph: "ستخدام معدات متطورة تضمن دقة الفحص وسرعة الإصلاح.",
  },
  {
    image: "/whyus/why-1.svg",
    head: "الخبرة والكفاءة",
    paragraph: "فريق عمل محترف ذو خبرة واسعة في صيانة وفحص السيارات.",
  },
];

export const servicesCards = [
  {
    image: "/services/service-4.png",
    head: "الزيوت",
    route: "/car-oils",
  },
  {
    image: "/services/service-3.png",
    head: "قطع الغيار",
    route: "/auto-parts",
  },
  {
    image: "/services/service-2.png",
    head: "فحص السيارات",
    route: "/car-inspection",
  },
  {
    image: "/services/service-1.png",
    head: "صيانة السيارات",
    route: "/car-maintenance/ميكانيكا",
  },
];

export const footerLinks = [
  {
    head: "الخدمات",
    links: [
      {
        route: "/car-maintenance/ميكانيكا",
        label: "صيانة السيارات",
      },
      {
        route: "/car-inspection",
        label: "فحص السيارات",
      },
      {
        route: "/auto-parts",
        label: "قطع الغيارات",
      },
      {
        route: "/car-oils",
        label: "الزيوت",
      },
      {
        route: "/our-works",
        label: "اعمالنا",
      },
    ],
  },
];

export const checkPoints = [
  {
    title: "الاطارات",
    image: "/inspection/inspection-6.svg",
  },
  {
    title: "الموتور",
    image: "/inspection/inspection-5.svg",
  },
  {
    title: "الكهرباء",
    image: "/inspection/inspection-4.svg",
  },
  {
    title: "البودي",
    image: "/inspection/inspection-3.svg",
  },
  {
    title: "الفرامل",
    image: "/inspection/inspection-2.svg",
  },
  {
    title: "الشاسية",
    image: "/inspection/inspection-1.svg",
  },
];

export const howImplementData = [
  {
    num: "1",
    title: "تحديد الموعد",
    des: "قم بحجز موعد يناسب وقتك لزيارتنا",
  },
  {
    num: "2",
    title: "إجراء الفحص",
    des: "سيقوم فريقنا بفحص شامل لسيارتك باستخدام أحدث التقنيات.",
  },
  {
    num: "3",
    title: "استلام النتائج",
    des: "احصل على تقرير مفصل يوضح حالة سيارتك وجميع الملاحظات الهامة.",
  },
];

export const workCardsColors = {
  red: {
    textColor: "#C11574",
    textBg: "#FCCEEE",
  },
  blue: {
    textColor: "#3538CD",
    textBg: "#C7D7FE",
  },
  green: {
    textColor: "#067647",
    textBg: "#ABEFC6",
  },
} as const;

export const CustomerReviewsData = [
  {
    image: "/customers/avatar.svg",
    name: "محمد حسن",
    modification: "فحص السيارة",
    review:
      "بعد ضبط زوايا العجلات، لاحظت فرقًا كبيرًا في استقرار السيارة. الفريق كان محترفًا ويعرف عمله جيدًا. شكرًا لكم!",
  },
  {
    image: "/customers/avatar.svg",
    name: "خالد علي",
    modification: "إصلاح الإطارات",
    review:
      "كان لدي إطار مثقوب، وتم إصلاحه بسرعة واحترافية. الأسعار معقولة والخدمة ممتازة. شكرًا لكم!",
  },

  {
    image: "/customers/avatar.svg",
    name: "احمد خالد",
    modification: "فحص السيارة",
    review:
      "فريق العمل كان محترفًا جدًا في فحص سيارتي. قدموا لي تقريرًا مفصلًا عن حالة السيارة ونصائح قيمة للصيانة. أشكرهم على الشفافية والجودة العالية في العمل!",
  },
];

export const MainSectionLists = [
  {
    title: "دور السمكرة والدهان؟",
    list: [
      {
        text: "تلعب السمكرة دورًا حيويًا في إصلاح الهيكل الخارجي للسيارة بعد الحوادث أو الخدوش، بينما يساعد الدهان في حماية الجسم من التآكل والصدأ، إلى جانب تحسين المظهر العام.",
      },
    ],
  },
  {
    title: "أهمية طلاء السيارات في الصيانة",
    list: [
      {
        text: "حماية من التآكل والصدأ: يمنع وصول الماء والرطوبة إلى الهيكل المعدني.",
      },
      {
        text: "مقاومة أشعة الشمس: يقلل من تأثير الأشعة فوق البنفسجية التي قد تسبب بهتان اللون.",
      },
    ],
  },
  {
    title: "كيف تحافظ على بوية سيارتك؟",
    list: [
      {
        text: "غسل السيارة بانتظام: يمنع تراكم الأتربة والملوثات التي قد تؤثر على الطلاء.",
      },
      {
        text: "استخدام مواد تنظيف آمنة: تجنب المواد الكيميائية القاسية التي قد تتسبب في تآكل الطلاء.",
      },
      {
        text: "تطبيق طبقة حماية (الشمع أو السيراميك): يساعد في حماية الدهان من الخدوش والعوامل البيئية.",
      },
    ],
  },
];

export const maxPrice = 10000;
