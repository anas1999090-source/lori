import { Language } from '../types';

export interface Translations {
  nav: {
    packs: string;
    shampoo: string;
    oils: string;
    keratin: string;
    blog: string;
  };
  categories: {
    ALL: string;
    PACKS: string;
    SHAMPOO: string;
    OILS: string;
    KERATIN: string;
  };
  hero: {
    seeMore: string;
    orderNow: string;
    carouselView: string;
    gridView: string;
    freeDeliveryTag: string;
    currency: string;
  };
  pdp: {
    back: string;
    orderCod: string;
    size: string;
    needForTitle: string;
    hairRoleTitle: string;
    howToUseTitle: string;
    details: string;
    delivery: string;
    reviews: string;
    benefitsTitle: string;
    ingredientsTitle: string;
    deliveryBody: string[];
    youMayAlsoLike: string;
    wishlistAdd: string;
    wishlistSaved: string;
    freeDeliveryBadge: string;
  };
  orderModal: {
    title: string;
    codBadge: string;
    freeDelivery: string;
    standardDelivery: string;
    quantity: string;
    subtotal: string;
    delivery: string;
    total: string;
    fullName: string;
    phone: string;
    city: string;
    address: string;
    submitWhatsapp: string;
    successTitle: string;
    successSub: string;
    openWhatsappBtn: string;
    orderRef: string;
    close: string;
    validationError: string;
    whatsappGreeting: string;
  };
  whatsapp: {
    contactTooltip: string;
    defaultGreeting: string;
  };
  search: {
    placeholder: string;
    noResults: string;
    close: string;
  };
  blog: {
    title: string;
    subtitle: string;
    backHome: string;
    shopFormula: string;
  };
  footer: {
    rights: string;
    naturalFormula: string;
    codWorldwide: string;
    admin: string;
  };
  admin: {
    title: string;
    subtitle: string;
    passwordLabel: string;
    unlock: string;
    wrongPassword: string;
    backToStore: string;
    noOrders: string;
    totalOrders: string;
    revenue: string;
    exportCsv: string;
    clearOrder: string;
    customer: string;
    items: string;
    status: string;
    date: string;
    total: string;
    logout: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    nav: {
      packs: 'الباك',
      shampoo: 'شامبوان',
      oils: 'زيوت',
      keratin: 'كيراتين',
      blog: 'المجلة',
    },
    categories: {
      ALL: 'الكل',
      PACKS: 'الباك',
      SHAMPOO: 'شامبوان',
      OILS: 'زيوت',
      KERATIN: 'كيراتين',
    },
    hero: {
      seeMore: 'اكتشف التفاصيل',
      orderNow: 'الدفع عند الاستلام',
      carouselView: 'عرض دائري',
      gridView: 'عرض شبكي',
      freeDeliveryTag: 'توصيل مجاني',
      currency: 'درهم',
    },
    pdp: {
      back: 'رجوع',
      orderCod: 'اطلب الآن — الدفع عند الاستلام',
      size: 'الحجم',
      needForTitle: 'لماذا يُستعمل هذا المنتج؟',
      hairRoleTitle: 'دوره الأساسي في العناية بالشعر',
      howToUseTitle: 'طريقة الاستعمال',
      details: 'الفوائد والمكونات الطبيعية',
      delivery: 'التوصيل والدفع عند الاستلام',
      reviews: 'آراء الزبناء',
      benefitsTitle: 'الفوائد الأساسية',
      ingredientsTitle: 'المكونات الطبيعية',
      deliveryBody: [
        'الباك الكامل بـ 199 درهم فقط مع توصيل مجاني لجميع مدن المغرب.',
        'الدفع نقداً عند الاستلام بعد فحص طلبك.',
        'تجهيز وإرسال الطلب خلال 24 إلى 48 ساعة في جميع أنحاء المغرب.',
      ],
      youMayAlsoLike: 'منتجات أخرى قد تهمك',
      wishlistAdd: 'حفظ في المفضلة',
      wishlistSaved: 'محفوظ في المفضلة',
      freeDeliveryBadge: 'توصيل مجاني',
    },
    orderModal: {
      title: 'إتمام الطلب — الدفع عند الاستلام',
      codBadge: 'الدفع نقداً عند الاستلام · إرسال الطلب مباشرة عبر واتساب',
      freeDelivery: 'توصيل مجاني',
      standardDelivery: '30 درهم (مجاني للباك أو فوق 199 درهم)',
      quantity: 'الكمية',
      subtotal: 'سعر المنتج',
      delivery: 'التوصيل',
      total: 'المجموع',
      fullName: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      city: 'المدينة',
      address: 'العنوان الكامل للتوصيل',
      submitWhatsapp: 'تأكيد وإرسال عبر واتساب',
      successTitle: 'تم تجهيز طلبك للإرسال',
      successSub: 'إذا لم يفتح واتساب تلقائياً، اضغط على الزر أدناه لإرسال تفاصيل طلبك مباشرة إلى الرقم 572534-621 212+.',
      openWhatsappBtn: 'إرسال الطلب عبر واتساب الآن',
      orderRef: 'رقم الطلب',
      close: 'إغلاق',
      validationError: 'يرجى إدخال الاسم الكامل ورقم هاتف صحيح والمدينة والعنوان.',
      whatsappGreeting: 'السلام عليكم، أود طلب هذا المنتج من LORI Bio (الدفع عند الاستلام):',
    },
    whatsapp: {
      contactTooltip: 'تواصل معنا عبر واتساب +212 621-572534',
      defaultGreeting: 'السلام عليكم LORI Bio، أود الاستفسار عن منتجات العناية بالشعر.',
    },
    search: {
      placeholder: 'ابحث عن الباك الكامل، الكيراتين، زيت التساقط، الشامبوان...',
      noResults: 'لم يتم العثور على منتجات مطابقة لبحثك.',
      close: 'إغلاق',
    },
    blog: {
      title: 'المجلة النباتية',
      subtitle: 'مقالات حول الكيراتين الطبيعي، البيوتين، إكليل الجبل وزيت الخروع.',
      backHome: 'العودة للمجموعة',
      shopFormula: 'عرض المنتج',
    },
    footer: {
      rights: 'لوري بيو للعناية الطبيعية بالشعر',
      naturalFormula: 'خالٍ من السلفات والبارابين · 98-100% أصل طبيعي',
      codWorldwide: 'الدفع عند الاستلام · واتساب +212 621-572534',
      admin: 'الإدارة',
    },
    admin: {
      title: 'لوحة طلبات لوري',
      subtitle: 'سجل الطلبات المحلية (الدفع عند الاستلام)',
      passwordLabel: 'أدخل كلمة مرور الإدارة',
      unlock: 'دخول',
      wrongPassword: 'كلمة المرور غير صحيحة (الافتراضية: lori2026).',
      backToStore: 'العودة للمتجر',
      noOrders: 'لا توجد طلبات مسجلة بعد.',
      totalOrders: 'الطلبات',
      revenue: 'إجمالي المبيعات',
      exportCsv: 'تصدير CSV',
      clearOrder: 'حذف',
      customer: 'العميل',
      items: 'المنتجات',
      status: 'الحالة',
      date: 'التاريخ',
      total: 'المجموع',
      logout: 'قفل',
    },
  },
  fr: {
    nav: {
      packs: 'PACKS',
      shampoo: 'SHAMPOING',
      oils: 'HUILES',
      keratin: 'KÉRATINE',
      blog: 'BLOG',
    },
    categories: {
      ALL: 'TOUT',
      PACKS: 'PACKS',
      SHAMPOO: 'SHAMPOING',
      OILS: 'HUILES',
      KERATIN: 'KÉRATINE',
    },
    hero: {
      seeMore: 'VOIR DÉTAILS',
      orderNow: 'PAIEMENT À LA LIVRAISON',
      carouselView: 'Vue carrousel',
      gridView: 'Vue grille',
      freeDeliveryTag: 'Livraison Gratuite',
      currency: 'DH',
    },
    pdp: {
      back: 'Retour',
      orderCod: 'COMMANDER — PAIEMENT À LA LIVRAISON',
      size: 'Format',
      needForTitle: 'À quoi sert ce soin ?',
      hairRoleTitle: 'Son rôle pour vos cheveux',
      howToUseTitle: 'Conseils d’utilisation',
      details: 'Bienfaits & Ingrédients Naturels',
      delivery: 'Livraison & Paiement à la livraison',
      reviews: 'Avis',
      benefitsTitle: 'Bienfaits Clés',
      ingredientsTitle: 'Ingrédients Naturels',
      deliveryBody: [
        'Le Pack Complet est à 199 DH avec livraison gratuite partout au Maroc.',
        'Paiement en espèces à la livraison (Cash on Delivery).',
        'Expédition rapide sous 24 à 48h.',
      ],
      youMayAlsoLike: 'Vous aimerez aussi',
      wishlistAdd: 'Ajouter aux favoris',
      wishlistSaved: 'Dans vos favoris',
      freeDeliveryBadge: 'Livraison Gratuite',
    },
    orderModal: {
      title: 'COMMANDER — PAIEMENT À LA LIVRAISON',
      codBadge: 'Paiement à la livraison · Envoi direct sur WhatsApp',
      freeDelivery: 'Livraison Gratuite',
      standardDelivery: '30 DH (Offerte sur le Pack ou dès 199 DH)',
      quantity: 'Quantité',
      subtotal: 'Sous-total',
      delivery: 'Livraison',
      total: 'Total',
      fullName: 'Nom complet',
      phone: 'Téléphone',
      city: 'Ville',
      address: 'Adresse de livraison',
      submitWhatsapp: 'CONFIRMER & ENVOYER SUR WHATSAPP',
      successTitle: 'COMMANDE PRÊTE SUR WHATSAPP',
      successSub: 'Si WhatsApp ne s’est pas ouvert automatiquement, cliquez ci-dessous pour envoyer votre commande au +212 621-572534.',
      openWhatsappBtn: 'ENVOYER VIA WHATSAPP MAINTENANT',
      orderRef: 'Référence',
      close: 'Fermer',
      validationError: 'Veuillez renseigner votre nom, téléphone valide, ville et adresse.',
      whatsappGreeting: 'Bonjour LORI Bio, je souhaite commander (Paiement à la livraison) :',
    },
    whatsapp: {
      contactTooltip: 'Contacter sur WhatsApp +212 621-572534',
      defaultGreeting: 'Bonjour LORI Bio, je souhaite des informations sur vos soins capillaires.',
    },
    search: {
      placeholder: 'Rechercher pack 199 DH, kératine, huile anti-chute, shampoing...',
      noResults: 'Aucun soin ne correspond à votre recherche.',
      close: 'Fermer',
    },
    blog: {
      title: 'JOURNAL BOTANIQUE',
      subtitle: 'Notes sur la kératine naturelle, la biotine, le romarin et l’huile de ricin.',
      backHome: 'Retour à la collection',
      shopFormula: 'Voir le soin',
    },
    footer: {
      rights: 'LORI Bio Soins Capillaires Naturels',
      naturalFormula: 'Sans Sulfates ni Parabènes · 98–100% Origine Naturelle',
      codWorldwide: 'Paiement à la livraison · WhatsApp +212 621-572534',
      admin: 'Admin',
    },
    admin: {
      title: 'GESTION DES COMMANDES LORI',
      subtitle: 'Registre local des commandes paiement à la livraison',
      passwordLabel: 'Mot de passe administrateur',
      unlock: 'OUVRIR',
      wrongPassword: 'Mot de passe incorrect (par défaut : lori2026).',
      backToStore: 'Retour à la boutique',
      noOrders: 'Aucune commande enregistrée.',
      totalOrders: 'Commandes',
      revenue: 'Chiffre d’affaires',
      exportCsv: 'Exporter CSV',
      clearOrder: 'Supprimer',
      customer: 'Client',
      items: 'Articles',
      status: 'Statut',
      date: 'Date',
      total: 'Total',
      logout: 'Verrouiller',
    },
  },
  en: {
    nav: {
      packs: 'PACKS',
      shampoo: 'SHAMPOO',
      oils: 'OILS',
      keratin: 'KERATIN',
      blog: 'BLOG',
    },
    categories: {
      ALL: 'ALL',
      PACKS: 'PACKS',
      SHAMPOO: 'SHAMPOO',
      OILS: 'OILS',
      KERATIN: 'KERATIN',
    },
    hero: {
      seeMore: 'VIEW DETAILS',
      orderNow: 'CASH ON DELIVERY',
      carouselView: 'Carousel view',
      gridView: 'Grid view',
      freeDeliveryTag: 'Free Delivery',
      currency: 'DH',
    },
    pdp: {
      back: 'Back',
      orderCod: 'ORDER NOW — CASH ON DELIVERY',
      size: 'Size',
      needForTitle: 'What is it needed for?',
      hairRoleTitle: 'Role in Hair Care',
      howToUseTitle: 'How to Use',
      details: 'Benefits & Natural Ingredients',
      delivery: 'Delivery & Cash on Delivery',
      reviews: 'Reviews',
      benefitsTitle: 'Key Benefits',
      ingredientsTitle: 'Natural Ingredients',
      deliveryBody: [
        'Complete Hair Care Pack is 199 DH with Free Delivery across Morocco.',
        'Cash on Delivery payment upon receiving your order.',
        'Fast 24–48h dispatch across Morocco.',
      ],
      youMayAlsoLike: 'You may also like',
      wishlistAdd: 'Save to wishlist',
      wishlistSaved: 'Saved in wishlist',
      freeDeliveryBadge: 'Free Delivery',
    },
    orderModal: {
      title: 'CASH ON DELIVERY ORDER',
      codBadge: 'Cash on Delivery · Sent directly to WhatsApp',
      freeDelivery: 'Free Delivery',
      standardDelivery: '30 DH (Free on Pack or orders ≥ 199 DH)',
      quantity: 'Quantity',
      subtotal: 'Subtotal',
      delivery: 'Delivery',
      total: 'Total',
      fullName: 'Full Name',
      phone: 'Phone Number',
      city: 'City',
      address: 'Delivery Address',
      submitWhatsapp: 'CONFIRM & SEND VIA WHATSAPP',
      successTitle: 'ORDER READY FOR WHATSAPP',
      successSub: 'If WhatsApp did not open automatically, click below to send your order details to +212 621-572534.',
      openWhatsappBtn: 'SEND ON WHATSAPP NOW',
      orderRef: 'Order Reference',
      close: 'Close',
      validationError: 'Please fill in your full name, valid phone number, city, and address.',
      whatsappGreeting: 'Hello LORI Bio, I would like to order (Cash on Delivery):',
    },
    whatsapp: {
      contactTooltip: 'Chat on WhatsApp +212 621-572534',
      defaultGreeting: 'Hello LORI Bio, I would like to ask about your hair care products.',
    },
    search: {
      placeholder: 'Search complete pack, keratin treatment, hair oil, shampoo...',
      noResults: 'No natural formulas match your search.',
      close: 'Close',
    },
    blog: {
      title: 'BOTANICAL JOURNAL',
      subtitle: 'Notes on natural keratin, biotin, rosemary & castor oil hair rituals.',
      backHome: 'Back to collection',
      shopFormula: 'View formula',
    },
    footer: {
      rights: 'LORI Bio Natural Hair Care',
      naturalFormula: 'Sulfate & Paraben Free · 98–100% Natural Origin',
      codWorldwide: 'Cash on Delivery · WhatsApp +212 621-572534',
      admin: 'Admin',
    },
    admin: {
      title: 'LORI ORDERS CONSOLE',
      subtitle: 'Local Cash-on-Delivery order ledger',
      passwordLabel: 'Enter admin password',
      unlock: 'UNLOCK',
      wrongPassword: 'Incorrect password. Hint: check README.md (default: lori2026).',
      backToStore: 'Back to store',
      noOrders: 'No orders placed yet.',
      totalOrders: 'Orders',
      revenue: 'Total Revenue',
      exportCsv: 'Export CSV',
      clearOrder: 'Delete',
      customer: 'Customer',
      items: 'Items',
      status: 'Status',
      date: 'Date',
      total: 'Total',
      logout: 'Lock',
    },
  },
};
