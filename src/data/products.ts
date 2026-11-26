import { BlogArticle, Product } from '../types';

const KERATIN_IMG = '/images/lori-keratin.png';
const HAIR_LOSS_OIL_IMG = '/images/lori-oil.png';
const SHAMPOO_IMG = '/images/lori-shampoo.png';
const PACK_IMG = '/images/lori-pack.png';

/**
 * LORI Bio Product Catalog
 * ------------------------
 * To edit prices: update `price` and each item's `price` inside `variants` (in Moroccan Dirhams / DH).
 * Images are genuine transparent-background PNGs inside `public/images/`.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'hair-care-pack',
    slug: 'lori-complete-hair-care-pack',
    category: 'PACKS',
    categoryLabel: {
      en: 'PACK',
      fr: 'COFFRET',
      ar: 'الباك الكامل',
    },
    name: {
      en: 'LORI HAIR CARE PACK',
      fr: 'LORI COFFRET COMPLET',
      ar: 'الباك الكامل للعناية بالشعر LORI',
    },
    shortName: {
      en: 'Complete Pack · 199 DH',
      fr: 'Coffret Complet · 199 DH',
      ar: 'الباك الكامل · 199 درهم',
    },
    subtitle: {
      en: 'Shampoo 100ml + Anti-Hair Loss Oil 100ml | Free Delivery',
      fr: 'Shampoing 100ml + Huile Anti-Chute 100ml | Livraison Gratuite',
      ar: 'شامبوان 100 مل + زيت ضد التساقط 100 مل | توصيل مجاني',
    },
    description: {
      en: 'The complete LORI Bio anti-hair loss routine presented in a luxury matte black gift box: includes the Natural Anti-Hair Loss Shampoo (100 ml) and Natural Anti-Hair Loss Hair Oil (100 ml) enriched with Biotin, Rosemary & Castor Oil, with free delivery across Morocco.',
      fr: 'Le rituel complet LORI Bio anti-chute dans son coffret noir signature : Shampoing Naturel Anti-Chute (100 ml) + Huile Naturelle Anti-Chute (100 ml) enrichis en Biotine, Romarin et Huile de Ricin, avec livraison gratuite.',
      ar: 'الروتين الكامل من لوري بيو لمحاربة تساقط الشعر وتكثيفه في علبة فاخرة: يضم الشامبوان الطبيعي ضد التساقط (100 مل) والزيت الطبيعي ضد التساقط (100 مل) الغنيين بالبيوتين وإكليل الجبل وزيت الخروع، بسعر 199 درهم فقط مع توصيل مجاني.',
    },
    needFor: {
      en: 'Designed for people experiencing hair thinning, seasonal shedding, weak roots, or slow hair growth who want a complete two-step natural treatment.',
      fr: 'Idéal en cas de chute de cheveux, manque de densité, racines fragilisées ou pousse lente nécessitant une routine complète.',
      ar: 'يُستعمل للأشخاص الذين يعانون من تساقط الشعر، ضعف البصيلات، الفراغات أو بطء النمو، ويبحثون عن علاج طبيعي متكامل من الجذور حتى الأطراف.',
    },
    hairRole: {
      en: 'Step 1 (Oil) deeply nourishes hair follicles and stimulates blood micro-circulation at the scalp; Step 2 (Sulfate-Free Shampoo) purifies the scalp gently without stripping natural oils, restoring strength, volume, and density.',
      fr: 'L’Huile nourrit le bulbe en profondeur et stimule la microcirculation; le Shampoing sans sulfates nettoie sans agresser et redonne force, volume et vitalité.',
      ar: 'يعمل الزيت أولاً على تغذية البصيلات وتنشيط الدورة الدموية في فروة الرأس لإيقاف التساقط، ثم يأتي الشامبوان الخالي من السلفات لينظف الفروة بلطف ويحافظ على قوة الشعر وكثافته ولمعانه.',
    },
    howToUse: {
      en: 'Apply 4–6 drops of Anti-Hair Loss Oil to the scalp and massage for 5 minutes twice a week, leave 45 minutes, then wash gently with Anti-Hair Loss Shampoo.',
      fr: 'Appliquez 4 à 6 gouttes d’Huile sur le cuir chevelu en massant 5 min deux fois par semaine, laissez poser 45 min puis lavez avec le Shampoing.',
      ar: 'ضعي 4 إلى 6 قطرات من الزيت على فروة الرأس مع تدليك لطيف لمدة 5 دقائق مرتين أسبوعياً، اتركيه 45 دقيقة ثم اغسلي بالشامبوان الطبيعي.',
    },
    freeDelivery: true,
    price: 199,
    variants: [
      { id: 'duo-pack', label: 'الباك الكامل (شامبوان + زيت 2×100 مل)', price: 199, dotColor: '#4A5F34' },
      { id: 'trio-pack', label: 'الباك الثلاثي (+ علاج الكيراتين)', price: 299, dotColor: '#F4C2C2' },
    ],
    benefits: {
      en: [
        'Complete 2-step anti-hair loss routine at 199 DH with Free Delivery',
        'Rich in Biotin, Rosemary & Cold-Pressed Castor Oil',
        'Sulfate, Paraben, Hexane & Silicone Free',
        'Luxury black presentation box ideal for gifting or personal use',
      ],
      fr: [
        'Routine complète anti-chute en 2 étapes à 199 DH avec Livraison Gratuite',
        'Riche en Biotine, Romarin et Huile de Ricin pressée à froid',
        'Sans Sulfates, Sans Parabènes, Sans Hexane ni Silicones',
        'Coffret noir élégant prêt à offrir',
      ],
      ar: [
        'الروتين العلاجي الكامل ضد تساقط الشعر بـ 199 درهم فقط مع توصيل مجاني',
        'غني بالبيوتين وإكليل الجبل وزيت الخروع المعصور على البارد',
        'خالٍ تماماً من السلفات والبارابين والهيكسان والسيليكون',
        'علبة هدايا فاخرة تناسب الاستعمال الشخصي أو الإهداء',
      ],
    },
    ingredients: {
      en: [
        '1 × LORI Natural Anti-Hair Loss Shampoo (100 ml)',
        '1 × LORI Natural Anti-Hair Loss Hair Oil (100 ml)',
        'Active Complex: Biotin, Rosemary & Castor Oil',
      ],
      fr: [
        '1 × LORI Shampoing Naturel Anti-Chute (100 ml)',
        '1 × LORI Huile Naturelle Anti-Chute (100 ml)',
        'Complexe actif : Biotine, Romarin & Huile de Ricin',
      ],
      ar: [
        '1 × شامبوان لوري الطبيعي ضد تساقط الشعر (100 مل)',
        '1 × زيت لوري الطبيعي ضد تساقط الشعر (100 مل)',
        'المكونات النشطة: البيوتين، إكليل الجبل وزيت الخروع',
      ],
    },
    images: [PACK_IMG, SHAMPOO_IMG, HAIR_LOSS_OIL_IMG, PACK_IMG],
    imageLabels: {
      en: ['Complete Hair Care Pack', 'Anti-Hair Loss Shampoo', 'Anti-Hair Loss Oil', 'Gift Box Ritual'],
      fr: ['Coffret Complet', 'Shampoing Anti-Chute', 'Huile Anti-Chute', 'Rituel Coffret'],
      ar: ['الباك الكامل', 'شامبوان ضد التساقط', 'زيت ضد التساقط', 'علبة العناية الفاخرة'],
    },
    accentColor: '#4A5F34',
    reviewCount: 20,
    reviews: [
      {
        id: 'r7',
        author: 'Kenza L.',
        city: 'Casablanca',
        rating: 5,
        comment: {
          en: 'Incredible value at 199 DH with free delivery. Both bottles work seamlessly together.',
          fr: 'Excellent rapport qualité-prix à 199 DH avec livraison gratuite.',
          ar: 'سعر ممتاز 199 درهم مع التوصيل المجاني، والنتيجة رائعة عند استعمال الزيت مع الشامبوان.',
        },
      },
      {
        id: 'r8',
        author: 'Meriem S.',
        city: 'Agadir',
        rating: 5,
        comment: {
          en: 'My hair feels much thicker and shedding dropped noticeably within three weeks.',
          fr: 'Mes cheveux sont plus denses et la chute a nettement diminué en trois semaines.',
          ar: 'خف تساقط شعري بشكل ملحوظ خلال ثلاثة أسابيع وأصبح أكثر كثافة.',
        },
      },
    ],
  },
  {
    id: 'anti-hair-loss-shampoo',
    slug: 'lori-anti-hair-loss-shampoo',
    category: 'SHAMPOO',
    categoryLabel: {
      en: 'SHAMPOO',
      fr: 'SHAMPOING',
      ar: 'شامبوان',
    },
    name: {
      en: 'LORI ANTI-HAIR LOSS SHAMPOO',
      fr: 'LORI SHAMPOING ANTI-CHUTE',
      ar: 'شامبوان طبيعي ضد تساقط الشعر LORI',
    },
    shortName: {
      en: 'Anti-Hair Loss Shampoo',
      fr: 'Shampoing Anti-Chute',
      ar: 'شامبوان ضد التساقط',
    },
    subtitle: {
      en: 'Fortifiant • Revitalisant | 98% Natural Origin',
      fr: 'Fortifiant • Revitalisant | 98% Origine Naturelle',
      ar: 'مقوٍّ ومنشط للشعر | 98% أصل طبيعي',
    },
    description: {
      en: 'Sulfate- and paraben-free strengthening cleanser rich in Biotin, Rosemary, and Castor Oil. Gently purifies the scalp and fortifies fragile hair roots without harsh chemicals.',
      fr: 'Soin lavant fortifiant sans sulfates ni parabènes, riche en Biotine, Romarin et Huile de Ricin. Purifie le cuir chevelu en douceur et renforce les racines.',
      ar: 'شامبوان طبيعي خالٍ من السلفات والبارابين بنسبة 98% من أصل طبيعي، غني بالبيوتين وإكليل الجبل وزيت الخروع لتنظيف فروة الرأس بلطف وتقوية الجذور.',
    },
    needFor: {
      en: 'Needed for daily or weekly cleansing of thinning, weak, or shedding-prone hair that cannot tolerate harsh sulfate shampoos.',
      fr: 'Indispensable pour laver en douceur les cheveux fragilisés, sujets à la chute ou sensibilisés par les sulfates.',
      ar: 'يُستعمل لتنظيف الشعر الضعيف والمعرض للتساقط دون التسبب في جفاف الفروة، وهو بديل طبيعي آمن للشامبوهات التي تحتوي على السلفات.',
    },
    hairRole: {
      en: 'Removes impurities and excess sebum gently, reinforces the hair root with Biotin and Rosemary, reduces breakage during washing, and keeps hair light and voluminous.',
      fr: 'Élimine les impuretés en douceur, fortifie la racine grâce à la Biotine et au Romarin, limite la casse au lavage et préserve le volume.',
      ar: 'ينقي فروة الرأس من الدهون والشوائب بلطف، يمد البصيلات بالبيوتين وإكليل الجبل لتقوية الجذور، يقلل التساقط أثناء الغسل ويحافظ على نعومة وحيوية الشعر.',
    },
    howToUse: {
      en: 'Apply to wet hair, massage gently into the scalp with fingertips for 2 minutes, then rinse thoroughly with lukewarm water.',
      fr: 'Appliquez sur cheveux mouillés, massez doucement le cuir chevelu pendant 2 minutes puis rincez abondamment.',
      ar: 'يوضع على شعر مبلل، تُدلك فروة الرأس بلطف بأطراف الأصابع لمدة دقيقتين ثم يُشطف جيداً بالماء الفاتر.',
    },
    freeDelivery: false,
    price: 110,
    variants: [
      { id: '100ml', label: '100 ml', price: 110, dotColor: '#4A5F34' },
      { id: '250ml', label: '250 ml', price: 195, dotColor: '#A9BC93' },
    ],
    benefits: {
      en: [
        'Strengthens roots and reduces breakage while washing',
        'Nourishes the scalp with Biotin, Rosemary & Castor Oil',
        'Sulfate & Paraben Free — 98% Natural Origin',
        'Certified Bio botanical cleanser',
      ],
      fr: [
        'Renforce les racines et limite la casse au lavage',
        'Nourrit le cuir chevelu grâce à la Biotine, au Romarin et au Ricin',
        'Sans Sulfates ni Parabènes — 98% Origine Naturelle',
        'Formule bio certifiée',
      ],
      ar: [
        'يقوي الجذور ويقلل تكسر الشعر أثناء الغسل',
        'يغذي فروة الرأس بالبيوتين وإكليل الجبل وزيت الخروع',
        'خالٍ من السلفات والبارابين — 98% من أصل طبيعي',
        'تركيبة بيو معتمدة وآمنة للشعر المعالج',
      ],
    },
    ingredients: {
      en: [
        'Biotin (Vitamin B7)',
        'Rosemary Botanical Extract',
        'Cold-Pressed Castor Oil',
        'Sulfate-Free Plant Cleansers',
      ],
      fr: [
        'Biotine (Vitamine B7)',
        'Extrait botanique de Romarin',
        'Huile de Ricin pressée à froid',
        'Tensioactifs doux sans sulfates',
      ],
      ar: [
        'البيوتين (فيتامين B7)',
        'خلاصة إكليل الجبل الطبيعية',
        'زيت الخروع المعصور على البارد',
        'منظفات نباتية لطيفة خالية من السلفات',
      ],
    },
    images: [SHAMPOO_IMG, SHAMPOO_IMG, PACK_IMG, SHAMPOO_IMG],
    imageLabels: {
      en: ['Front Studio 100 ml', 'Formula Detail', 'Inside Complete Pack', 'Botanical Cleanser'],
      fr: ['Flacon 100 ml', 'Détail Formule', 'Dans le Coffret', 'Soin Lavant'],
      ar: ['العبوة 100 مل', 'تفاصيل التركيبة', 'ضمن الباك الكامل', 'منظف نباتي لطيف'],
    },
    accentColor: '#4A5F34',
    reviewCount: 20,
    reviews: [
      {
        id: 'r1',
        author: 'Yasmine M.',
        city: 'Casablanca',
        rating: 5,
        comment: {
          en: 'Gentle lather, zero sulfates, and my hair feels noticeably stronger after two weeks.',
          fr: 'Mousse douce sans sulfates et mes cheveux sont nettement plus forts.',
          ar: 'رغوة لطيفة بدون سلفات، وشعري أصبح أقوى بشكل واضح بعد أسبوعين.',
        },
      },
      {
        id: 'r2',
        author: 'Salma B.',
        city: 'Rabat',
        rating: 5,
        comment: {
          en: 'Pairs perfectly with the LORI Anti-Hair Loss Oil.',
          fr: 'Se combine parfaitement avec l’Huile Anti-Chute LORI.',
          ar: 'يتكامل بشكل رائع مع زيت لوري ضد تساقط الشعر.',
        },
      },
    ],
  },
  {
    id: 'anti-hair-loss-oil',
    slug: 'lori-anti-hair-loss-oil',
    category: 'OILS',
    categoryLabel: {
      en: 'OIL',
      fr: 'HUILE',
      ar: 'زيت',
    },
    name: {
      en: 'LORI ANTI-HAIR LOSS OIL',
      fr: 'LORI HUILE ANTI-CHUTE',
      ar: 'زيت طبيعي ضد تساقط الشعر LORI',
    },
    shortName: {
      en: 'Anti-Hair Loss Oil',
      fr: 'Huile Anti-Chute',
      ar: 'زيت ضد التساقط',
    },
    subtitle: {
      en: 'Fortifiant • Nourrissant | 100% Natural Origin',
      fr: 'Fortifiant • Nourrissant | 100% Origine Naturelle',
      ar: 'مقوٍّ ومغذٍّ | تحفيز النمو وتقوية الجذور',
    },
    description: {
      en: '100% natural origin hair growth & strengthening oil rich in Biotin, Rosemary, and cold-pressed Castor Oil. Hexane- and silicone-free precision dropper formula.',
      fr: 'Huile fortifiante et nourrissante 100% d’origine naturelle, riche en Biotine, Romarin et Huile de Ricin. Sans hexane ni silicones.',
      ar: 'زيت نباتي نقي 100% غني بالبيوتين وإكليل الجبل وزيت الخروع، خالٍ تماماً من الهيكسان والسيليكون، مصمم بقطارة دقيقة لتقوية البصيلات وتنشيط نمو الشعر.',
    },
    needFor: {
      en: 'Needed for hair loss, thinning crown or hairline, weak roots, and dormant follicles needing concentrated nourishment.',
      fr: 'Recommandée contre la chute active, les zones clairsemées, les racines fatiguées et le manque de densité.',
      ar: 'يُستعمل لعلاج تساقط الشعر المستمر، ملء الفراغات، تقوية البصيلات الضعيفة وتحفيز إنبات شعر جديد أكثر سماكة وقوة.',
    },
    hairRole: {
      en: 'Penetrates the scalp deeply with cold-pressed Castor Oil, stimulates follicle circulation via Rosemary oil, and fortifies keratin structure with Biotin to halt shedding and boost thickness.',
      fr: 'Pénètre le cuir chevelu pour nourrir le bulbe, active la microcirculation grâce au Romarin et renforce la fibre grâce à la Biotine.',
      ar: 'يتغلغل داخل فروة الرأس ليغذي البصيلات بالبيوتين وزيت الخروع، ينشط الدورة الدموية بفضل إكليل الجبل، يحد من التساقط ويمنح الشعر كثافة وامتلاءً تدريجياً.',
    },
    howToUse: {
      en: 'Apply directly to scalp partings using the dropper, massage gently for 5 minutes, leave for 45–60 minutes (or overnight), then wash out.',
      fr: 'Déposez raie par raie à l’aide de la pipette, massez 5 min, laissez agir 45 à 60 min puis lavez.',
      ar: 'تُوضع قطرات مباشرة على فروة الرأس بالقطارة، تُدلك بلطف لمدة 5 دقائق وتُترك من 45 إلى 60 دقيقة قبل الغسل.',
    },
    freeDelivery: false,
    price: 135,
    variants: [
      { id: '100ml', label: '100 ml', price: 135, dotColor: '#4A5F34' },
      { id: '2x100ml', label: '2 × 100 ml (توصيل مجاني)', price: 245, dotColor: '#F4C2C2' },
    ],
    benefits: {
      en: [
        'Strengthens follicles and supports new hair growth',
        'Nourishes scalp deeply with Castor Oil & Rosemary',
        '100% Natural Origin — Hexane & Silicone Free',
        'Prevents premature hair shedding',
      ],
      fr: [
        'Fortifie les follicules et favorise la pousse',
        'Nourrit intensément au Ricin et Romarin',
        '100% Origine Naturelle — Sans Hexane ni Silicones',
        'Prévient la chute prématurée',
      ],
      ar: [
        'يقوي البصيلات ويدعم نمو الشعر الجديد',
        'يغذي الفروة بعمق بزيت الخروع وإكليل الجبل',
        '100% من أصل طبيعي — خالٍ من الهيكسان والسيليكون',
        'يحد من التساقط ويحافظ على كثافة الشعر',
      ],
    },
    ingredients: {
      en: [
        'Biotin Active',
        'Rosmarinus Officinalis (Rosemary) Oil',
        'Cold-Pressed Castor Oil',
        'Hexane-Free & Silicone-Free Pure Botanical Oils',
      ],
      fr: [
        'Biotine active',
        'Huile de Romarin (Rosmarinus Officinalis)',
        'Huile de Ricin pressée à froid',
        'Huiles végétales pures sans hexane ni silicones',
      ],
      ar: [
        'البيوتين النشط',
        'زيت إكليل الجبل النقي',
        'زيت الخروع المعصور على البارد',
        'زيوت نباتية نقية خالية من الهيكسان والسيليكون',
      ],
    },
    images: [HAIR_LOSS_OIL_IMG, HAIR_LOSS_OIL_IMG, PACK_IMG, HAIR_LOSS_OIL_IMG],
    imageLabels: {
      en: ['Dropper Bottle 100 ml', 'Formula Detail', 'Inside Complete Pack', 'Root Nourishment'],
      fr: ['Flacon Pipette 100 ml', 'Détail Formule', 'Dans le Coffret', 'Soin Racines'],
      ar: ['عبوة 100 مل بالقطارة', 'تفاصيل التركيبة', 'ضمن الباك الكامل', 'تغذية الجذور'],
    },
    accentColor: '#A9BC93',
    reviewCount: 20,
    reviews: [
      {
        id: 'r3',
        author: 'Hajar E.',
        city: 'Marrakech',
        rating: 5,
        comment: {
          en: 'Noticeably less hair on my brush after 3 weeks.',
          fr: 'Nettement moins de chute sur la brosse après 3 semaines.',
          ar: 'لاحظت تراجعاً كبيراً في تساقط الشعر بعد 3 أسابيع.',
        },
      },
      {
        id: 'r4',
        author: 'Nadia K.',
        city: 'Tangier',
        rating: 5,
        comment: {
          en: 'Clean 100% natural formula with zero silicones.',
          fr: 'Formule 100% naturelle sans silicones.',
          ar: 'تركيبة طبيعية 100% وخالية من السيليكون.',
        },
      },
    ],
  },
  {
    id: 'keratin-hair-treatment',
    slug: 'lori-keratin-hair-treatment',
    category: 'KERATIN',
    categoryLabel: {
      en: 'KERATIN',
      fr: 'KÉRATINE',
      ar: 'كيراتين',
    },
    name: {
      en: 'LORI KERATIN HAIR TREATMENT',
      fr: 'LORI SOIN KÉRATINE NATURELLE',
      ar: 'علاج الكيراتين الطبيعي للشعر LORI',
    },
    shortName: {
      en: 'Keratin Treatment',
      fr: 'Soin Kératine',
      ar: 'علاج الكيراتين',
    },
    subtitle: {
      en: 'Lissant • Réparateur | Smooth & Shiny Hair Formula',
      fr: 'Lissant • Réparateur | Formule Douceur & Brillance',
      ar: 'منعم ومصلح للشعر | نعومة ولمعان حريري',
    },
    description: {
      en: 'Enriched with Natural Keratin and Biotin, this smoothing & repairing treatment tames frizz, repairs damaged lengths, and restores glossy shine without sulfates or parabens.',
      fr: 'Enrichi en Kératine Naturelle et Biotine, ce soin lissant et réparateur discipline les frisottis, répare la fibre et révèle une brillance soyeuse sans sulfates ni parabènes.',
      ar: 'علاج طبيعي منعم ومصلح غني بالكيراتين الطبيعي والبيوتين، بنسبة 98% من أصل طبيعي وخالٍ من السلفات والبارابين. يعالج الجفاف والتقصف ويمنح الشعر انسيابية ولمعاناً فورياً.',
    },
    needFor: {
      en: 'Needed for dry, frizzy, dull, heat-damaged, or color-treated hair needing smooth manageability and cuticle repair.',
      fr: 'Idéal pour les cheveux secs, mousseux, ternes ou sensibilisés par la chaleur nécessitant réparation et lissage naturel.',
      ar: 'يُستعمل للشعر الجاف، المتقصف، الباهت أو المجعد والمتضرر من حرارة السيشوار والصبغات، لإعادة ترميمه وتسهيل تسريحه.',
    },
    hairRole: {
      en: 'Replenishes depleted keratin along the hair shaft, seals split ends and rough cuticles, eliminates frizz, and leaves hair silky, smooth, and luminous without weighing it down.',
      fr: 'Recharge la fibre en kératine, lisse les écailles, élimine les frisottis et apporte une brillance miroir sans alourdir.',
      ar: 'يعوض نقص الكيراتين داخل ألياف الشعرة، يغلف الأطراف المتقصفة، يهدئ الهيشان والتطاير، ويترك الشعر ناعماً وانسيابياً بلمعان حريري دون أي ملمس دهني.',
    },
    howToUse: {
      en: 'Pump 1–2 doses into your palm and apply evenly to damp or dry mid-lengths and ends after washing. Do not rinse.',
      fr: 'Prélevez 1 à 2 pressions et répartissez sur longueurs et pointes humides ou sèches après le lavage. Sans rinçage.',
      ar: 'ضعي ضغطة إلى ضغطتين في راحة اليد ووزعيه بالتساوي على أطراف وطول الشعر الرطب أو الجاف بعد الغسل، دون شطف.',
    },
    freeDelivery: false,
    price: 150,
    variants: [
      { id: '100ml', label: '100 ml', price: 150, dotColor: '#F4C2C2' },
      { id: '200ml', label: '200 ml (توصيل مجاني)', price: 270, dotColor: '#4A5F34' },
    ],
    benefits: {
      en: [
        'Smooths frizz and repairs split ends immediately',
        'Enriched with Natural Keratin & Biotin',
        'Adds glossy, silky shine without greasy residue',
        'Sulfate & Paraben Free — 98% Natural Origin',
      ],
      fr: [
        'Lisse les frisottis et répare les pointes abîmées',
        'Enrichi en Kératine Naturelle et Biotine',
        'Brillance soyeuse sans effet gras',
        'Sans Sulfates ni Parabènes — 98% Origine Naturelle',
      ],
      ar: [
        'ينعم الشعر ويصلح الأطراف المتقصفة فوراً',
        'غني بالكيراتين الطبيعي والبيوتين',
        'يمنح لمعاناً حريرياً بدون أثر دهني',
        'خالٍ من السلفات والبارابين — 98% من أصل طبيعي',
      ],
    },
    ingredients: {
      en: [
        'Natural Keratin Protein',
        'Biotin (Pro-Strength Vitamin)',
        'Botanical Repairing Complex',
        'Sulfate & Paraben Free — 98% Natural Origin',
      ],
      fr: [
        'Kératine Naturelle',
        'Biotine fortifiante',
        'Complexe réparateur végétal',
        'Sans Sulfates ni Parabènes — 98% Origine Naturelle',
      ],
      ar: [
        'بروتين الكيراتين الطبيعي',
        'البيوتين المقوي',
        'مركب نباتي مرمم للألياف',
        'خالٍ من السلفات والبارابين — 98% من أصل طبيعي',
      ],
    },
    images: [KERATIN_IMG, KERATIN_IMG, KERATIN_IMG, KERATIN_IMG],
    imageLabels: {
      en: ['Studio Pump 100 ml', 'Formula Detail', 'Smooth & Shiny Complex', 'Daily Ritual'],
      fr: ['Flacon Pompe 100 ml', 'Détail Formule', 'Complexe Lissant', 'Rituel Quotidien'],
      ar: ['عبوة بمضخة 100 مل', 'تفاصيل التركيبة', 'مركب التنعيم واللمعان', 'الاستعمال اليومي'],
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
          en: 'My hair looks sleek and glossy without feeling greasy.',
          fr: 'Mes cheveux sont lisses et brillants sans effet gras.',
          ar: 'شعري أصبح ناعماً ولامعاً دون أي ملمس دهني.',
        },
      },
      {
        id: 'r6',
        author: 'Rim A.',
        city: 'Fes',
        rating: 5,
        comment: {
          en: 'Best natural keratin treatment—frizz disappears instantly.',
          fr: 'Meilleur soin kératine naturel, les frisottis disparaissent.',
          ar: 'أفضل علاج كيراتين طبيعي، يقضي على التطاير فوراً.',
        },
      },
    ],
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'biotin-rosemary-ritual',
    title: {
      en: 'Biotin, Rosemary & Castor Oil: The Anti-Hair Loss Triad',
      fr: 'Biotine, Romarin & Ricin : le trio fortifiant anti-chute',
      ar: 'البيوتين وإكليل الجبل وزيت الخروع: الثلاثي الطبيعي ضد تساقط الشعر',
    },
    category: {
      en: 'SCALP SCIENCE',
      fr: 'SCIENCE DU CUIR CHEVELU',
      ar: 'العناية بالفروة',
    },
    readTime: {
      en: '3 min read',
      fr: '3 min de lecture',
      ar: '3 دقائق للقراءة',
    },
    excerpt: {
      en: 'How pairing a hexane-free rosemary & castor oil scalp massage with a sulfate-free biotin cleanser reduces breakage and awakens density.',
      fr: 'Comment l’association d’un massage à l’huile sans hexane et d’un shampoing doux à la biotine freine la chute et stimule la densité.',
      ar: 'كيف يساعد الجمع بين تدليك الفروة بالزيت الخالي من الهيكسان والغسل بشامبوان البيوتين على تقوية الجذور وتقليل التساقط.',
    },
    body: {
      en: [
        'Hair shedding often accelerates when harsh sulfates strip the scalp barrier while heavy silicones suffocate follicles.',
        'LORI Bio’s 2-step routine pairs our 100% Natural Origin Anti-Hair Loss Oil (rich in Biotin, Rosemary & Castor Oil) with our Sulfate & Paraben Free Shampoo.',
      ],
      fr: [
        'La chute de cheveux s’accentue souvent lorsque les sulfates fragilisent le cuir chevelu et que les silicones étouffent le bulbe.',
        'La routine en 2 étapes LORI Bio associe l’Huile Anti-Chute 100% naturelle au Shampoing doux sans sulfates ni parabènes.',
      ],
      ar: [
        'غالباً ما يزداد تساقط الشعر عندما تضعف المنظفات القاسية فروة الرأس أو تسد السيليكونات المسام.',
        'يجمع روتين لوري بيو بين الزيت الطبيعي بنسبة 100% (بالبيوتين وإكليل الجبل والخروع) والشامبوان الخالي من السلفات والبارابين.',
      ],
    },
    relatedProductId: 'anti-hair-loss-oil',
    accentColor: '#4A5F34',
  },
  {
    id: 'natural-keratin-shine',
    title: {
      en: 'Natural Keratin & Biotin: Repairing Lengths Without Silicones',
      fr: 'Kératine Naturelle & Biotine : réparer les longueurs sans alourdir',
      ar: 'الكيراتين الطبيعي والبيوتين: ترميم الشعر ومنحه لمعاناً حريرياً',
    },
    category: {
      en: 'HAIR CARE',
      fr: 'SOIN CAPILLAIRE',
      ar: 'العناية بالشعر',
    },
    readTime: {
      en: '4 min read',
      fr: '4 min de lecture',
      ar: '4 دقائق للقراءة',
    },
    excerpt: {
      en: 'A 98% natural origin smoothing formula designed to seal frizz, repair heat stress, and deliver weightless shine.',
      fr: 'Une formule lissante à 98% d’origine naturelle pour dompter les frisottis, réparer la fibre et révéler l’éclat.',
      ar: 'تركيبة طبيعية بنسبة 98% لتنعيم الشعر وتهدئة التطاير وإصلاح الأطراف دون أي ثقل.',
    },
    body: {
      en: [
        'Daily brushing, sun exposure, and heat styling gradually deplete natural keratin proteins from the hair cuticle.',
        'LORI Natural Keratin Hair Treatment replenishes brittle strands with plant-compatible keratin and biotin.',
      ],
      fr: [
        'Le brossage quotidien et la chaleur appauvrissent progressivement la kératine naturelle de la fibre.',
        'Le Soin Kératine Naturelle LORI recharge les longueurs en kératine et biotine pour un fini lisse et lumineux.',
      ],
      ar: [
        'التمشيط اليومي والحرارة يفقدان الشعرة بروتين الكيراتين الطبيعي بمرور الوقت.',
        'يعيد علاج الكيراتين الطبيعي من لوري الحيوية والانسيابية للأطراف بفضل الكيراتين الطبيعي والبيوتين.',
      ],
    },
    relatedProductId: 'keratin-hair-treatment',
    accentColor: '#F4C2C2',
  },
  {
    id: 'complete-pack-guide',
    title: {
      en: 'Inside the Complete Hair Care Pack (199 DH · Free Delivery)',
      fr: 'Dans le Coffret Complet (199 DH · Livraison Gratuite)',
      ar: 'الباك الكامل للعناية بالشعر (199 درهم · توصيل مجاني)',
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
      en: 'How to combine the Anti-Hair Loss Oil and Anti-Hair Loss Shampoo from the 199 DH Complete Pack for maximum strength and density.',
      fr: 'Comment associer l’Huile Anti-Chute et le Shampoing Fortifiant du Coffret à 199 DH pour des résultats durables.',
      ar: 'طريقة تنسيق زيت التساقط مع الشامبوان من الباك الكامل بـ 199 درهم للحصول على شعر قوي وكثيف.',
    },
    body: {
      en: [
        'Step 1: Apply LORI Anti-Hair Loss Hair Oil directly to the scalp with the glass dropper and massage gently.',
        'Step 2: Wash gently with LORI Anti-Hair Loss Shampoo (98% natural origin, sulfate-free).',
      ],
      fr: [
        'Étape 1 : Appliquez l’Huile Anti-Chute LORI sur le cuir chevelu grâce à la pipette et massez doucement.',
        'Étape 2 : Lavez avec le Shampoing Naturel Anti-Chute (98% naturel, sans sulfates).',
      ],
      ar: [
        'الخطوة 1: وزعي زيت تساقط الشعر على الفروة بالقطارة ودلكي بلطف.',
        'الخطوة 2: اغسلي بالشامبوان الطبيعي الخالي من السلفات.',
      ],
    },
    relatedProductId: 'hair-care-pack',
    accentColor: '#A9BC93',
  },
];
