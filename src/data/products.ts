export type ProductReview = {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
};

export type ProductRecord = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  tag: string;
  category: string;
  href: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  highlights: string[];
  specs: { label: string; value: string }[];
  reviews: ProductReview[];
};

export const productsCatalog: ProductRecord[] = [
  {
    id: "luxury-gift-basket",
    name: "Luxury Gift Basket",
    description: "Handpicked gourmet treats, ready to surprise.",
    longDescription:
      "Curated by our concierge team, this luxury basket features artisan chocolates, premium spreads, infused honey, and sparkling beverages—perfect for corporate gifting or milestone celebrations.",
    price: 79900,
    originalPrice: 89900,
    rating: 4.8,
    reviewsCount: 64,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "https://images.unsplash.com/photo-1502740479091-635887520276?w=800&q=80",
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&q=80",
    ],
    tag: "Gifts",
    category: "Gifts",
    href: "/product/luxury-gift-basket",
    stockStatus: "in-stock",
    highlights: [
      "Includes 12+ premium gourmet items",
      "Complimentary handwritten card",
      "Next-day delivery within Lagos",
    ],
    specs: [
      { label: "Weight", value: "4.2kg" },
      { label: "Shelf life", value: "6 months" },
      { label: "Packaging", value: "Reusable wicker basket" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Amaka I.",
        avatar: "https://i.pravatar.cc/100?img=47",
        rating: 5,
        date: "Nov 12, 2024",
        comment:
          "Absolutely stunning presentation—the recipient sent photos immediately. Will reorder for Christmas!",
      },
      {
        id: "rev-2",
        author: "Chidi O.",
        avatar: "https://i.pravatar.cc/100?img=12",
        rating: 4,
        date: "Oct 28, 2024",
        comment:
          "Great selection, though I wish there were more savoury items. Delivery was prompt.",
      },
    ],
  },
  {
    id: "daily-essentials-pack",
    name: "Daily Essentials Pack",
    description: "Groceries and pantry staples bundled together.",
    longDescription:
      "A balanced mix of pantry must-haves sourced from trusted vendors. Perfect for busy households that need quality basics delivered weekly.",
    price: 25900,
    rating: 4.6,
    reviewsCount: 38,
    image:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    ],
    tag: "Groceries",
    category: "Groceries",
    href: "/product/daily-essentials-pack",
    stockStatus: "in-stock",
    highlights: [
      "Feeds a family of four for 3-4 days",
      "Includes fresh produce and grains",
      "Flexible subscription available",
    ],
    specs: [
      { label: "Bundle size", value: "12 items" },
      { label: "Origin", value: "Lagos farmers market" },
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Funmi K.",
        avatar: "https://i.pravatar.cc/100?img=5",
        rating: 5,
        date: "Nov 2, 2024",
        comment:
          "Great value. Produce was fresh and well packaged. Love the reusable tote.",
      },
    ],
  },
  {
    id: "statement-pendant",
    name: "Statement Pendant",
    description: "Minimal jewelry with maximum impact.",
    longDescription:
      "Crafted with 18k gold plating and hypoallergenic materials, this pendant elevates everyday looks while remaining timeless.",
    price: 129900,
    originalPrice: 149900,
    rating: 4.9,
    reviewsCount: 120,
    image:
      "https://images.unsplash.com/photo-1518544801958-efcbf8a7ec10?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1518544801958-efcbf8a7ec10?w=1000&q=80",
      "https://images.unsplash.com/photo-1514996937319-344454492b37?w=1000&q=80",
    ],
    tag: "Jewelry",
    category: "Fashion",
    href: "/product/statement-pendant",
    stockStatus: "low-stock",
    highlights: [
      "18k gold-plated finish",
      "Ships with velvet storage pouch",
      "Free size adjustments",
    ],
    specs: [
      { label: "Chain length", value: "18 inches" },
      { label: "Material", value: "Brass core, gold plating" },
      { label: "Warranty", value: "1 year" },
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Jemima T.",
        avatar: "https://i.pravatar.cc/100?img=33",
        rating: 5,
        date: "Oct 14, 2024",
        comment:
          "Looks far more expensive than it is. Received so many compliments at work.",
      },
    ],
  },
  {
    id: "smart-home-starter",
    name: "Smart Home Starter",
    description: "Connect your home with lights, plugs, and sensors.",
    longDescription:
      "Includes two smart bulbs, one smart plug, and a motion sensor with a companion app. Install in under 15 minutes.",
    price: 189900,
    rating: 4.5,
    reviewsCount: 44,
    image:
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1000&q=80",
      "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=1000&q=80",
    ],
    tag: "Home",
    category: "Electronics",
    href: "/product/smart-home-starter",
    stockStatus: "in-stock",
    highlights: [
      "Works with Alexa & Google Assistant",
      "Energy monitoring in real time",
      "No hub required",
    ],
    specs: [
      { label: "Bulb brightness", value: "800 lumens" },
      { label: "Connectivity", value: "2.4GHz Wi-Fi" },
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Lanre F.",
        avatar: "https://i.pravatar.cc/100?img=7",
        rating: 4,
        date: "Sep 30, 2024",
        comment:
          "Setup was straightforward. App UI could be better but the automations work great.",
      },
    ],
  },
  {
    id: "wellness-gift-set",
    name: "Wellness Gift Set",
    description: "Spa essentials, infused oils, candles, and more.",
    longDescription:
      "Treat someone special (or yourself) to a curated self-care box with aromatherapy candles, bath salts, silk eye masks, and calming playlists.",
    price: 55900,
    rating: 4.7,
    reviewsCount: 53,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&q=80",
    ],
    tag: "Wellness",
    category: "Wellness",
    href: "/product/wellness-gift-set",
    stockStatus: "in-stock",
    highlights: [
      "Includes guided meditation QR",
      "Custom gift note available",
      "Ships nationwide",
    ],
    specs: [
      { label: "Fragrance profile", value: "Lavender & eucalyptus" },
      { label: "Box weight", value: "2.4kg" },
    ],
    reviews: [],
  },
  {
    id: "premium-coffee-kit",
    name: "Premium Coffee Kit",
    description: "Single-origin beans with grinder and accessories.",
    longDescription:
      "All you need for a slow morning ritual: burr grinder, double-wall mug, and beans roasted within 5 days of shipping.",
    price: 99900,
    originalPrice: 119900,
    rating: 4.8,
    reviewsCount: 88,
    image:
      "https://images.unsplash.com/photo-1422207134147-65fb81f59e38?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1422207134147-65fb81f59e38?w=1000&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=80",
    ],
    tag: "Kitchen",
    category: "Kitchen",
    href: "/product/premium-coffee-kit",
    stockStatus: "low-stock",
    highlights: [
      "Includes 350g of single-origin beans",
      "Adjustable ceramic burr grinder",
      "Reusable cotton filters",
    ],
    specs: [
      { label: "Bean origin", value: "Ethiopia" },
      { label: "Roast level", value: "Medium" },
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Thomas E.",
        avatar: "https://i.pravatar.cc/100?img=52",
        rating: 5,
        date: "Nov 18, 2024",
        comment:
          "Gifted this to a client—they haven't stopped talking about it. Packaging is premium.",
      },
    ],
  },
];

export const getProductById = (id: string) =>
  productsCatalog.find((product) => product.id === id);


