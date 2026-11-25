import { BlogArticle, Product } from '../types';

/**
 * LORI Product Catalog
 * --------------------
 * To edit prices: update `price` and each item's `price` inside `variants` (in Moroccan Dirhams / DH).
 * To replace product images: drop transparent-background PNGs into `public/images/`
 * keeping the exact filenames below, or update the paths in `images`.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'frankincense-soap',
    slug: 'lori-frankincense-soap',
    category: 'SOAP',
    categoryLabel: {
      en: 'SOAP',
      fr: 'SAVON',
      ar: 'صابون',
    },
    name: {
      en: 'LORI FRANKINCENSE SOAP',
      fr: "LORI SAVON À L'ENCENS",
      ar: 'لوري صابون اللبان',
    },
    shortName: {
      en: 'Frankincense Soap',
      fr: "Savon à l'encens",
      ar: 'صابون اللبان',
    },
    subtitle: {
      en: 'Natural Frankincense Soap',
      fr: "Savon naturel à l'encens (Lban)",
      ar: 'صابون اللبان الطبيعي',
    },
    description: {
      en: 'Cold-processed botanical cleansing bar crafted with pure Boswellia sacra (Lban) resin, organic olive oil, and sweet almond butter. Gently clarifies pores, brightens uneven tone, and leaves skin supple without stripping its natural barrier.',
      fr: "Savon saponifié à froid formulé avec de la résine pure de Boswellia sacra (Lban), de l'huile d'olive vierge et du beurre d'amande douce. Purifie en douceur, illumine le teint et préserve l'hydratation naturelle.",
      ar: 'صابون طبيعي محضر على البارد بخلاصة اللبان الحر وزيت الزيتون البكر وزبدة اللوز الحلو. ينقي المسام بلطف ويوحد لون البشرة ويمنحها نعومة وإشراقة طبيعية دون جفاف.',
    },
    price: 45,
    variants: [
      { id: '100g', label: '100g', price: 45, dotColor: '#4A5F34' },
      { id: '200g', label: '200g', price: 79, dotColor: '#A9BC93' },
    ],
    benefits: {
      en: [
        'Refines skin texture and gently clears impurities',
        'Supports collagen renewal with pure Lban resin extracts',
        '100% cold-pressed plant oils, zero sulfates or synthetic fragrance',
        'Suitable for daily facial and body rituals',
      ],
      fr: [
        'Affine le grain de peau et purifie les pores en douceur',
        'Soutient la régénération cutanée grâce à la résine de Lban',
        '100% huiles végétales pressées à froid, sans sulfates ni parfum synthétique',
        'Adapté au rituel quotidien du visage et du corps',
      ],
      ar: [
        'ينقي البشرة بلطف ويساعد على تضييق المسام',
        'يدعم تجديد خلايا البشرة بفضل مستخلص اللبان الطبيعي',
        'زيوت نباتية معصورة على البارد خالية من السلفات والعطور الصناعية',
        'مناسب للاستخدام اليومي للوجه والجسم',
      ],
    },
    ingredients: {
      en: [
        'Boswellia Sacra (Frankincense / Lban) Resin Extract',
        'Extra Virgin Olea Europaea (Olive) Fruit Oil',
        'Prunus Amygdalus Dulcis (Sweet Almond) Oil',
        'Cocos Nucifera (Coconut) Oil & Shea Butter',
        'Natural Vegetable Glycerin & Vitamin E',
      ],
      fr: [
        "Extrait de résine de Boswellia Sacra (Encens / Lban)",
        "Huile d'olive extra vierge (Olea Europaea)",
        "Huile d'amande douce (Prunus Amygdalus Dulcis)",
        'Huile de coco & Beurre de karité brut',
        'Glycérine végétale naturelle & Vitamine E',
      ],
      ar: [
        'مستخلص اللبان الحر (Boswellia Sacra)',
        'زيت الزيتون البكر الممتاز',
        'زيت اللوز الحلو الطبيعي',
        'زيت جوز الهند وزبدة الشيا الخام',
        'غليسرين نباتي وفيتامين E',
      ],
    },
    images: [
      '/images/lori-soap-1.png',
      '/images/lori-soap-2.png',
      '/images/lori-soap-3.png',
      '/images/lori-soap-4.png',
    ],
    imageLabels: {
      en: ['Front Studio', 'Back & Ingredients', 'Texture Detail', 'Botanical Ritual'],
      fr: ['Vue Studio', 'Dos & Ingrédients', 'Détail Texture', 'Rituel Botanique'],
      ar: ['الواجهة الرئيسية', 'المكونات', 'تفاصيل الملمس', 'طقوس العناية'],
    },
    accentColor: '#4A5F34',
    reviewCount: 20,
    reviews: [
      {
        id: 'r1',
        author: 'Salma B.',
        city: 'Casablanca',
        rating: 5,
        comment: {
          en: 'Leaves my skin noticeably brighter and calm without any tightness.',
          fr: 'Laisse ma peau visiblement plus lumineuse et apaisée, sans aucun tiraillement.',
          ar: 'يترك بشرتي أكثر إشراقاً ونعومة دون أي جفاف.',
        },
      },
      {
        id: 'r2',
        author: 'Nadia K.',
        city: 'Rabat',
        rating: 5,
        comment: {
          en: 'Subtle natural frankincense aroma and creamy lather. Ordering my third bar.',
          fr: "Parfum subtil d'encens naturel et mousse crémeuse. Déjà mon troisième savon.",
          ar: 'رائحة اللبان الطبيعية هادئة ورغوته ناعمة جداً، طلبته للمرة الثالثة.',
        },
      },
    ],
  },
  {
    id: 'natural-shampoo',
    slug: 'lori-natural-shampoo',
    category: 'SHAMPOO',
    categoryLabel: {
      en: 'SHAMPOO',
      fr: 'SHAMPOING',
      ar: 'شامبوان',
    },
    name: {
      en: 'LORI NATURAL SHAMPOO',
      fr: 'LORI SHAMPOING NATUREL',
      ar: 'لوري شامبوان طبيعي',
    },
    shortName: {
      en: 'Natural Shampoo',
      fr: 'Shampoing naturel',
      ar: 'شامبوان طبيعي',
    },
    subtitle: {
      en: 'Sulfate-Free Botanical Cleanser',
      fr: 'Soin lavant botanique sans sulfates',
      ar: 'شامبوان طبيعي خالٍ من السلفات',
    },
    description: {
      en: 'Ultra-gentle botanical hair cleanser infused with Atlas rosemary hydrosol, aloe vera juice, and mild coconut glucosides. Purifies the scalp effortlessly while preserving natural shine and lightweight volume.',
      fr: "Shampoing botanique ultra-doux enrichi à l'hydrolat de romarin de l'Atlas, jus d'aloe vera et tensioactifs de coco. Nettoie le cuir chevelu en douceur tout en préservant brillance et légèreté.",
      ar: 'شامبوان نباتي لطيف غني بماء إكليل الجبل وعصير الألوفيرا ومنظفات جوز الهند اللطيفة. ينظف فروة الرأس بعمق مع الحفاظ على لمعان الشعر وحيويته.',
    },
    price: 95,
    variants: [
      { id: '250ml', label: '250ml', price: 95, dotColor: '#A9BC93' },
      { id: '500ml', label: '500ml', price: 165, dotColor: '#4A5F34' },
    ],
    benefits: {
      en: [
        'Sulfate-free, silicone-free, and paraben-free formula',
        'Balances scalp hydration without weighing down curls or straight hair',
        'Infused with Atlas rosemary & soothing chamomile extract',
        'Safe for keratin-treated and color-treated hair',
      ],
      fr: [
        'Formule sans sulfates, sans silicones et sans parabènes',
        "Équilibre l'hydratation du cuir chevelu sans alourdir la fibre",
        'Enrichi au romarin de l’Atlas et extrait de camomille apaisante',
        'Compatible avec les soins à la kératine et cheveux colorés',
      ],
      ar: [
        'تركيبة خالية تماماً من السلفات والسيليكون والبارابين',
        'يوازن ترطيب فروة الرأس دون إثقال الشعر',
        'غني بإكليل الجبل وخلاصة البابونج المهدئة',
        'آمن للشعر المعالج بالكيراتين أو المصبوغ',
      ],
    },
    ingredients: {
      en: [
        'Rosmarinus Officinalis (Atlas Rosemary) Leaf Water',
        'Aloe Barbadensis (Aloe Vera) Leaf Juice',
        'Coco-Glucoside & Decyl Glucoside (Plant-Derived)',
        'Panthenol (Pro-Vitamin B5) & Hydrolyzed Oat Protein',
        'Chamomilla Recutita (Chamomile) Flower Extract',
      ],
      fr: [
        'Hydrolat de romarin de l’Atlas (Rosmarinus Officinalis)',
        "Jus frais d'Aloe Vera (Aloe Barbadensis)",
        'Coco-Glucoside & Decyl Glucoside d’origine végétale',
        'Panthénol (Pro-Vitamine B5) & Protéine d’avoine',
        'Extrait de fleur de camomille (Chamomilla Recutita)',
      ],
      ar: [
        'ماء إكليل الجبل الطبيعي',
        'عصير الألوفيرا النقي',
        'منظفات نباتية لطيفة مستخلصة من جوز الهند',
        'بانثينول (فيتامين B5) وبروتين الشوفان',
        'مستخلص زهرة البابونج المهدئة',
      ],
    },
    images: [
      '/images/lori-shampoo-1.png',
      '/images/lori-shampoo-2.png',
      '/images/lori-shampoo-3.png',
      '/images/lori-shampoo-4.png',
    ],
    imageLabels: {
      en: ['Front Studio', 'Back & Ingredients', 'Texture Detail', 'Botanical Ritual'],
      fr: ['Vue Studio', 'Dos & Ingrédients', 'Détail Texture', 'Rituel Botanique'],
      ar: ['الواجهة الرئيسية', 'المكونات', 'تفاصيل الملمس', 'طقوس العناية'],
    },
    accentColor: '#A9BC93',
    reviewCount: 20,
    reviews: [
      {
        id: 'r3',
        author: 'Yasmine M.',
        city: 'Marrakech',
        rating: 5,
        comment: {
          en: 'My scalp feels clean for days and my hair stays airy and soft.',
          fr: 'Mon cuir chevelu reste frais plusieurs jours et mes longueurs sont souples.',
          ar: 'فروة رأسي تبقى منتعشة لأيام وشعري أصبح أكثر نعومة وخفة.',
        },
      },
      {
        id: 'r4',
        author: 'Kenza L.',
        city: 'Tangier',
        rating: 5,
        comment: {
          en: 'Finally a sulfate-free shampoo that actually lathers nicely and rinses clean.',
          fr: 'Enfin un shampoing sans sulfates qui mousse bien et se rince facilement.',
          ar: 'أخيراً شامبوان بدون سلفات يرغو بلطف وينظف بفعالية.',
        },
      },
    ],
  },
  {
    id: 'keratin-oil',
    slug: 'lori-keratin-oil',
    category: 'OILS',
    categoryLabel: {
      en: 'OIL',
      fr: 'HUILE',
      ar: 'زيت',
    },
    name: {
      en: 'LORI KERATIN OIL',
      fr: 'LORI HUILE KÉRATINE',
      ar: 'لوري زيت الكيراتين',
    },
    shortName: {
      en: 'Keratin Oil',
      fr: 'Huile de kératine',
      ar: 'زيت الكيراتين',
    },
    subtitle: {
      en: 'Pure Silk & Botanical Keratin Elixir',
      fr: 'Élixir lissant à la kératine végétale',
      ar: 'زيت الكيراتين الطبيعي للشعر',
    },
    description: {
      en: 'Weightless repairing oil blending plant-derived phytokeratin, cold-pressed Moroccan argan oil, and prickly pear seed oil. Seals split ends, tames frizz instantly, and restores mirror-like luminosity.',
      fr: "Huile réparatrice légère associant phytokératine végétale, huile d'argan pressée à froid et huile de pépins de figue de Barbarie. Lisse les pointes, discipline les frisottis et révèle une brillance soyeuse.",
      ar: 'زيت علاجي خفيف يمزج بين الكيراتين النباتي وزيت الأركان المغربي المعصور على البارد وزيت بذور التين الشوكي. يغلف الأطراف المتقصفة ويمنح الشعر لمعاناً حريرياً فورياً.',
    },
    price: 120,
    variants: [
      { id: '50ml', label: '50ml', price: 120, dotColor: '#F4C2C2' },
      { id: '100ml', label: '100ml', price: 210, dotColor: '#A9BC93' },
    ],
    benefits: {
      en: [
        'Smooths frizz and protects lengths from heat styling',
        'Reinforces brittle hair fiber with botanical phytokeratin',
        'Fast-absorbing dry oil finish with zero greasy residue',
        'Rich in Vitamin E and essential Omega fatty acids',
      ],
      fr: [
        'Discipline les frisottis et protège de la chaleur',
        'Renforce la fibre fragilisée grâce à la phytokératine végétale',
        'Fini sec à absorption rapide sans effet gras',
        'Riche en Vitamine E et acides gras essentiels Oméga',
      ],
      ar: [
        'يهدئ تطاير الشعر ويحميه من حرارة التصفيف',
        'يقوي ألياف الشعر المتضررة بالكيراتين النباتي',
        'سريع الامتصاص ولا يترك أي أثر دهني',
        'غني بفيتامين E والأحماض الدهنية الأساسية',
      ],
    },
    ingredients: {
      en: [
        'Argania Spinosa (Moroccan Argan) Kernel Oil',
        'Hydrolyzed Plant Phytokeratin Complex',
        'Opuntia Ficus-Indica (Prickly Pear) Seed Oil',
        'Simmondsia Chinensis (Jojoba) Seed Oil',
        'Tocopherol (Natural Vitamin E)',
      ],
      fr: [
        "Huile d'argan biologique du Maroc (Argania Spinosa)",
        'Complexe de Phytokératine végétale hydrolysée',
        'Huile de pépins de figue de Barbarie (Opuntia Ficus-Indica)',
        'Huile de graines de jojoba (Simmondsia Chinensis)',
        'Tocophérol (Vitamine E naturelle)',
      ],
      ar: [
        'زيت الأركان المغربي العضوي',
        'مركب الكيراتين النباتي المحلل',
        'زيت بذور التين الشوكي النقي',
        'زيت الجوجوبا الطبيعي',
        'فيتامين E الطبيعي',
      ],
    },
    images: [
      '/images/lori-keratin-1.png',
      '/images/lori-keratin-2.png',
      '/images/lori-keratin-3.png',
      '/images/lori-keratin-4.png',
    ],
    imageLabels: {
      en: ['Front Studio', 'Back & Ingredients', 'Texture Detail', 'Botanical Ritual'],
      fr: ['Vue Studio', 'Dos & Ingrédients', 'Détail Texture', 'Rituel Botanique'],
      ar: ['الواجهة الرئيسية', 'المكونات', 'تفاصيل الملمس', 'طقوس العناية'],
    },
    accentColor: '#F4C2C2',
    reviewCount: 20,
    reviews: [
      {
        id: 'r5',
        author: 'Ines T.',
        city: 'Casablanca',
        rating: 5,
        comment: {
          en: 'Two drops on damp ends make my hair silky without weighing it down.',
          fr: 'Deux gouttes sur pointes humides rendent mes cheveux soyeux sans les alourdir.',
          ar: 'قطرتان على الأطراف المبللة تمنحان شعري نعومة فائقة دون تثقيل.',
        },
      },
      {
        id: 'r6',
        author: 'Rim A.',
        city: 'Fes',
        rating: 5,
        comment: {
          en: 'Completely transformed my dry ends after the first week.',
          fr: 'A transformé mes pointes sèches dès la première semaine.',
          ar: 'غيّر ملمس أطراف شعري الجافة منذ الأسبوع الأول.',
        },
      },
    ],
  },
  {
    id: 'hair-loss-oil',
    slug: 'lori-hair-loss-oil',
    category: 'OILS',
    categoryLabel: {
      en: 'OIL',
      fr: 'HUILE',
      ar: 'زيت',
    },
    name: {
      en: 'LORI HAIR LOSS OIL',
      fr: 'LORI HUILE ANTI-CHUTE',
      ar: 'لوري زيت تساقط الشعر',
    },
    shortName: {
      en: 'Hair Loss Oil',
      fr: 'Huile anti-chute',
      ar: 'زيت تساقط الشعر',
    },
    subtitle: {
      en: 'Root-Fortifying Botanical Concentrate',
      fr: 'Concentré fortifiant anti-chute',
      ar: 'زيت مقوٍّ للجذور ومضاد لتساقط الشعر',
    },
    description: {
      en: 'Concentrated scalp treatment combining cold-pressed black castor oil, Atlas rosemary essential oil, and nigella seed oil. Stimulates micro-circulation at the follicle, reduces seasonal shedding, and promotes fuller density.',
      fr: "Soin concentré du cuir chevelu associant huile de ricin noir pressée à froid, huile essentielle de romarin et huile de nigelle. Stimule la microcirculation du bulbe, freine la chute et favorise la densité.",
      ar: 'علاج مركز لفروة الرأس يجمع بين زيت الخروع الأسود المعصور على البارد وزيت إكليل الجبل وزيت الحبة السوداء. ينشط الدورة الدموية في البصيلات ويقلل التساقط ويعزز كثافة الشعر.',
    },
    price: 135,
    variants: [
      { id: '50ml', label: '50ml', price: 135, dotColor: '#4A5F34' },
      { id: '100ml', label: '100ml', price: 235, dotColor: '#F4C2C2' },
    ],
    benefits: {
      en: [
        'Targets thinning areas and strengthens fragile hair roots',
        'Stimulates scalp circulation when massaged 2–3 times weekly',
        '100% pure cold-pressed botanical oils, no mineral oil',
        'Calms dry, stressed scalps with soothing nigella oil',
      ],
      fr: [
        'Cible les zones clairsemées et fortifie les racines fragiles',
        'Stimule la circulation du cuir chevelu en massage 2 à 3 fois par semaine',
        '100% huiles botaniques pures pressées à froid, sans huiles minérales',
        'Apaise le cuir chevelu sec grâce à l’huile de nigelle',
      ],
      ar: [
        'يستهدف مناطق الفراغات ويقوي جذور الشعر الضعيفة',
        'ينشط فروة الرأس عند التدليك مرتين إلى ثلاث مرات أسبوعياً',
        'زيوت نباتية نقية 100% معصورة على البارد دون زيوت معدنية',
        'يهدئ فروة الرأس الجافة بفضل زيت الحبة السوداء',
      ],
    },
    ingredients: {
      en: [
        'Ricinus Communis (Black Castor) Seed Oil',
        'Nigella Sativa (Black Seed) Cold-Pressed Oil',
        'Rosmarinus Officinalis (Rosemary) Essential Oil',
        'Persea Gratissima (Avocado) & Sweet Almond Oils',
        'Mentha Piperita (Peppermint) Trace Extract',
      ],
      fr: [
        'Huile de ricin noir pressée à froid (Ricinus Communis)',
        'Huile vierge de nigelle (Nigella Sativa)',
        'Huile essentielle de romarin (Rosmarinus Officinalis)',
        "Huiles d'avocat et d'amande douce",
        'Extrait pur de menthe poivrée (Mentha Piperita)',
      ],
      ar: [
        'زيت الخروع الأسود المعصور على البارد',
        'زيت الحبة السوداء البكر',
        'زيت إكليل الجبل العطري النقي',
        'زيت الأفوكادو وزيت اللوز الحلو',
        'خلاصة النعناع الفلفلي المنعشة',
      ],
    },
    images: [
      '/images/lori-hairloss-1.png',
      '/images/lori-hairloss-2.png',
      '/images/lori-hairloss-3.png',
      '/images/lori-hairloss-4.png',
    ],
    imageLabels: {
      en: ['Front Studio', 'Back & Ingredients', 'Texture Detail', 'Botanical Ritual'],
      fr: ['Vue Studio', 'Dos & Ingrédients', 'Détail Texture', 'Rituel Botanique'],
      ar: ['الواجهة الرئيسية', 'المكونات', 'تفاصيل الملمس', 'طقوس العناية'],
    },
    accentColor: '#4A5F34',
    reviewCount: 20,
    reviews: [
      {
        id: 'r7',
        author: 'Hajar E.',
        city: 'Agadir',
        rating: 5,
        comment: {
          en: 'Noticeably less shedding in the shower after three weeks of scalp massages.',
          fr: 'Chute nettement réduite sous la douche après trois semaines de massages.',
          ar: 'لاحظت تراجعاً واضحاً في تساقط الشعر بعد ثلاثة أسابيع من التدليك.',
        },
      },
      {
        id: 'r8',
        author: 'Meriem S.',
        city: 'Rabat',
        rating: 5,
        comment: {
          en: 'Rich yet easy to rinse out with the LORI Natural Shampoo.',
          fr: 'Riche mais très facile à rincer avec le shampoing naturel LORI.',
          ar: 'زيت غني وسهل الغسل عند استخدامه مع شامبوان لوري الطبيعي.',
        },
      },
    ],
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'lban-ritual',
    title: {
      en: 'The Ancient Resin: Why Frankincense (Lban) Calms Modern Skin',
      fr: "La résine sacrée : pourquoi l'encens (Lban) apaise la peau",
      ar: 'سر اللبان الحر: كيف يهدئ البشرة ويجدد إشراقتها الطبيعية',
    },
    category: {
      en: 'BOTANICAL ARCHIVE',
      fr: 'ARCHIVES BOTANIQUES',
      ar: 'أرشيف النباتات',
    },
    readTime: {
      en: '3 min read',
      fr: '3 min de lecture',
      ar: '3 دقائق للقراءة',
    },
    excerpt: {
      en: 'Harvested in aromatic droplets, pure Boswellia sacra resin supports skin elasticity, balances sebum, and restores quiet radiance.',
      fr: 'Récoltée en larmes aromatiques, la résine pure de Boswellia sacra soutient l’élasticité cutanée et restaure l’éclat naturel.',
      ar: 'تُجمع دموع اللبان النقية لدعم مرونة البشرة وتوازن إفرازاتها واستعادة نضارتها الهادئة.',
    },
    body: {
      en: [
        'For centuries across North Africa and the Mediterranean, white and golden frankincense resin—known locally as Lban—has been treasured as a restorative skin tonic.',
        'At LORI, we infuse cold-processed olive and sweet almond oils with raw frankincense extract for 28 days before curing each soap bar slowly. This low-temperature process preserves delicate boswellic acids without synthetic stabilizers.',
        'Use morning and evening with lukewarm water, letting the soft mineral lather rest for thirty seconds before rinsing.',
      ],
      fr: [
        'Depuis des siècles en Afrique du Nord et en Méditerranée, la résine d’encens — connue sous le nom de Lban — est prisée pour ses vertus régénérantes.',
        'Chez LORI, nous macérons lentement l’extrait pur de Lban dans des huiles d’olive et d’amande douce avant une saponification à froid de 28 jours qui préserve les actifs précieux.',
        'Utilisez matin et soir à l’eau tiède en laissant poser la mousse crémeuse trente secondes avant de rincer.',
      ],
      ar: [
        'منذ قرون في شمال إفريقيا والمتوسط، اشتُهر اللبان الحر بخصائصه المهدئة والمجددة للبشرة.',
        'في لوري، ننقع مستخلص اللبان النقي في زيت الزيتون البكر وزيت اللوز الحلو قبل التصبين على البارد لمدة 28 يوماً للحفاظ على كامل العناصر الفعالة.',
        'يُستخدم صباحاً ومساءً بماء فاتر مع ترك الرغوة اللطيفة ثلاثين ثانية قبل الشطف.',
      ],
    },
    relatedProductId: 'frankincense-soap',
    accentColor: '#4A5F34',
  },
  {
    id: 'phytokeratin-care',
    title: {
      en: 'Botanical Phytokeratin vs. Heavy Silicones',
      fr: 'Phytokératine végétale contre silicones occlusifs',
      ar: 'الكيراتين النباتي مقابل السيليكون الثقيل للشعر',
    },
    category: {
      en: 'HAIR SCIENCE',
      fr: 'SCIENCE CAPILLAIRE',
      ar: 'العناية بالشعر',
    },
    readTime: {
      en: '4 min read',
      fr: '4 min de lecture',
      ar: '4 دقائق للقراءة',
    },
    excerpt: {
      en: 'Why cold-pressed argan, prickly pear seed oil, and plant keratin deliver lasting silkiness without coating the cuticle.',
      fr: 'Pourquoi l’argan pressé à froid, la figue de Barbarie et la kératine végétale subliment la fibre sans l’étouffer.',
      ar: 'لماذا يمنحكِ الأركان وبذور التين الشوكي مع الكيراتين النباتي نعومة دائمة دون سد مسام الشعرة.',
    },
    body: {
      en: [
        'Conventional shine serums rely on heavy dimethicones that create temporary gloss while blocking moisture from entering the hair shaft.',
        'LORI Keratin Oil pairs lightweight plant phytokeratin amino acids with cold-pressed Moroccan argan and prickly pear seed oils. Because the molecular profile mirrors natural hair lipids, two drops absorb effortlessly.',
        'Apply to towel-dried mid-lengths and ends before air-drying or gentle brushing.',
      ],
      fr: [
        'Les sérums conventionnels s’appuient souvent sur des silicones lourds qui créent une brillance artificielle tout en empêchant l’hydratation.',
        'L’Huile Kératine LORI associe acides aminés végétaux, huile d’argan marocaine et pépins de figue de Barbarie pour une absorption immédiate sans résidu gras.',
        'Appliquez deux gouttes sur longueurs humides avant le séchage naturel ou le brossage.',
      ],
      ar: [
        'تعتمد معظم السيرومات التقليدية على السيليكون الثقيل الذي يعطي لمعاناً مؤقتاً لكنه يمنع وصول الرطوبة لألياف الشعر.',
        'يمزج زيت الكيراتين من لوري بين الأحماض الأمينية النباتية وزيت الأركان وزيت التين الشوكي ليمتصه الشعر بسرعة دون أي ثقل.',
        'ضعي قطرتين على أطراف الشعر الرطب قبل التجفيف أو التمشيط.',
      ],
    },
    relatedProductId: 'keratin-oil',
    accentColor: '#F4C2C2',
  },
  {
    id: 'scalp-circulation',
    title: {
      en: 'The Five-Minute Evening Scalp Massage',
      fr: 'Le rituel du massage crânien en cinq minutes',
      ar: 'طقوس تدليك فروة الرأس في خمس دقائق مساءً',
    },
    category: {
      en: 'RITUALS',
      fr: 'RITUELS',
      ar: 'طقوس يومية',
    },
    readTime: {
      en: '3 min read',
      fr: '3 min de lecture',
      ar: '3 دقائق للقراءة',
    },
    excerpt: {
      en: 'Pairing black castor oil and Atlas rosemary with fingertip pressure awakens dormant follicles and eases tension.',
      fr: 'Associer ricin noir et romarin de l’Atlas à un massage doux réveille la microcirculation du cuir chevelu.',
      ar: 'الجمع بين زيت الخروع الأسود وإكليل الجبل مع التدليك اللطيف ينشط البصيلات ويخفف التوتر.',
    },
    body: {
      en: [
        'Healthy hair density begins beneath the surface. Stress, tight hairstyles, and harsh cleansers constrict micro-circulation around the hair bulb.',
        'Warm 4–6 drops of LORI Hair Loss Oil between your palms and massage in slow circular motions from the nape upward for five minutes twice a week before washing with LORI Natural Shampoo.',
      ],
      fr: [
        'La densité capillaire commence sous la surface. Le stress et les nettoyants agressifs ralentissent la microcirculation autour du bulbe.',
        'Chauffez 4 à 6 gouttes d’Huile Anti-Chute LORI entre vos mains puis massez lentement de la nuque vers le sommet deux fois par semaine avant le shampoing.',
      ],
      ar: [
        'تبدأ كثافة الشعر الصحية من جذور فروة الرأس. فالتوتر والمنظفات القاسية يضعفان تدفق الدم حول البصيلة.',
        'دفئي 4 إلى 6 قطرات من زيت تساقط الشعر من لوري بين راحتيك ودلكي الفروة بحركات دائرية لمدة خمس دقائق مرتين أسبوعياً قبل الغسل بالشامبوان الطبيعي.',
      ],
    },
    relatedProductId: 'hair-loss-oil',
    accentColor: '#A9BC93',
  },
];
