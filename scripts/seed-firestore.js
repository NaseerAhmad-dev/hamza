/**
 * Firestore Seed Script
 * Run: node scripts/seed-firestore.js
 *
 * Requirements:
 *   npm install firebase-admin
 *   Set GOOGLE_APPLICATION_CREDENTIALS env var to your service account JSON path
 */

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'YOUR_PROJECT_ID', // ← replace
});

const db = admin.firestore();

const packages = [
  {
    type: 'umrah', title: 'Economy Umrah — 14 Days',
    price: 1849, duration: '14 Days / 13 Nights',
    departure: 'London', departureDate: admin.firestore.Timestamp.fromDate(new Date('2025-01-10')),
    seats: 28, featured: true,
    includes: ['Flights', 'Hotel', 'Breakfast', 'Ziyarat'],
    excludes: ['Visa Fees', 'Personal Expenses'],
    itinerary: [
      { day: 1, title: 'Departure from London', description: 'Fly from Heathrow to Jeddah. Transfer to Madinah hotel.' },
      { day: 2, title: 'Arrival in Madinah', description: 'Settle in, visit Masjid an-Nabawi.' },
      { day: 5, title: 'Travel to Makkah', description: 'Bus to Makkah, perform Tawaf and Sa\'i.' },
      { day: 14, title: 'Return to London', description: 'Transfer to Jeddah Airport for return flight.' },
    ],
    images: [], tier: 'Economy',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    type: 'umrah', title: 'Premium Umrah — 21 Days',
    price: 2999, duration: '21 Days / 20 Nights',
    departure: 'Manchester', departureDate: admin.firestore.Timestamp.fromDate(new Date('2025-02-15')),
    seats: 15, featured: true,
    includes: ['Business Class', '5-Star Hotel', 'All Meals', 'Private Ziyarat', 'Scholar Guide'],
    excludes: ['Personal Shopping'],
    itinerary: [
      { day: 1, title: 'Premium Departure', description: 'Business class from Manchester with VIP lounge.' },
      { day: 3, title: 'Madinah VIP Tour', description: 'Private guided Ziyarat with Islamic scholar.' },
      { day: 8, title: 'Makkah Stay', description: '5-Star hotel with Haram view.' },
    ],
    images: [], tier: 'Premium',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    type: 'hajj', title: 'Economy Hajj Package',
    price: 4500, duration: '35 Days / 34 Nights',
    departure: 'London', departureDate: admin.firestore.Timestamp.fromDate(new Date('2025-05-20')),
    seats: 45, featured: true, tier: 'Economy',
    includes: ['Flights', 'Hotels Makkah & Madinah', 'Breakfast', 'Mina Tent', 'Transport'],
    excludes: ['Qurban', 'Personal Expenses'],
    groupLeader: 'Sheikh Ibrahim Al-Madani — 25 years Hajj experience, Al-Azhar University graduate.',
    itinerary: [
      { day: 1,  title: 'Departure London', description: 'Group departure from Heathrow Airport.' },
      { day: 5,  title: 'Arrive Madinah', description: '8 days in Madinah. Visit Masjid Nabawi.' },
      { day: 13, title: 'Makkah Arrival', description: 'Ihram, Tawaf, Sa\'i upon arrival.' },
      { day: 22, title: 'Mina & Arafat', description: 'The sacred days: Yawm Arafat, Muzdalifah, Jamarat.' },
    ],
    images: [],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    type: 'hajj', title: 'VIP Hajj Package',
    price: 9999, duration: '35 Days / 34 Nights',
    departure: 'London', departureDate: admin.firestore.Timestamp.fromDate(new Date('2025-05-20')),
    seats: 10, featured: true, tier: 'VIP',
    includes: ['Business Class', '5-Star Hotels', 'All Meals', 'VIP Mina Camp', 'Private Guide'],
    excludes: ['Personal Expenses'],
    groupLeader: 'Sheikh Omar Qadri — Senior Islamic Scholar, 30 years Hajj leadership.',
    itinerary: [
      { day: 1,  title: 'VIP Departure', description: 'Exclusive lounge and business class to Jeddah.' },
      { day: 5,  title: 'Madinah VIP', description: 'Luxury hotel adjacent to Masjid Nabawi.' },
      { day: 13, title: 'Makkah VIP', description: '5-star hotel with Haram view.' },
    ],
    images: [],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
];

const jobs = [
  {
    title: 'Senior Civil Engineer', company: 'Al-Fozan Construction',
    country: 'Saudi Arabia', category: 'Construction',
    salary: '$4,500–6,000/mo', experience: '5+ years',
    deadline: 'Dec 2024', featured: true, logo: '🏗',
    description: 'We are seeking an experienced Civil Engineer to join large-scale infrastructure projects in Riyadh.',
    requirements: ['B.Sc. in Civil Engineering', '5+ years experience', 'AutoCAD and Revit proficiency'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: 'Registered Nurse — ICU', company: 'King Faisal Hospital',
    country: 'Qatar', category: 'Healthcare',
    salary: '$3,200–4,500/mo', experience: '3+ years',
    deadline: 'Jan 2025', featured: true, logo: '🏥',
    description: 'Join one of Qatar\'s leading hospitals as an ICU Registered Nurse.',
    requirements: ['BSc Nursing', '3+ years ICU experience', 'BLS & ACLS certification'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    title: 'IT Systems Administrator', company: 'Etisalat Digital',
    country: 'UAE', category: 'IT & Technology',
    salary: '$4,000–5,500/mo', experience: '3+ years',
    deadline: 'Mar 2025', featured: true, logo: '💻',
    description: 'Seeking a skilled System Administrator to manage cloud infrastructure and enterprise networks.',
    requirements: ['BSc Computer Science', 'AWS/Azure certification', 'CCNA or equivalent'],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  },
];

async function seed() {
  console.log('🌱 Seeding Firestore...');
  for (const pkg of packages) {
    const ref = await db.collection('packages').add(pkg);
    console.log(`✅ Package added: ${pkg.title} (${ref.id})`);
  }
  for (const job of jobs) {
    const ref = await db.collection('jobs').add(job);
    console.log(`✅ Job added: ${job.title} (${ref.id})`);
  }
  console.log('🎉 Seeding complete!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
