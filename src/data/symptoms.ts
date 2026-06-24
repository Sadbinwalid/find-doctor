export interface Symptom {
  id: string;
  nameEn: string;
  nameBn: string;
  specialties: string[];
}

export const symptoms: Symptom[] = [
  { id: "fever", nameEn: "Fever", nameBn: "জ্বর", specialties: ["general-physician", "pediatrician"] },
  { id: "cold", nameEn: "Cold / Runny Nose", nameBn: "সর্দি / নাক দিয়ে পানি পড়া", specialties: ["general-physician", "ent"] },
  { id: "cough", nameEn: "Cough", nameBn: "কাশি", specialties: ["general-physician", "ent"] },
  { id: "body-pain", nameEn: "Body Pain", nameBn: "শরীরে ব্যথা", specialties: ["general-physician", "orthopedic"] },
  { id: "headache", nameEn: "Headache", nameBn: "মাথাব্যথা", specialties: ["general-physician", "neurologist"] },
  { id: "chest-pain", nameEn: "Chest Pain", nameBn: "বুকে ব্যথা", specialties: ["cardiologist", "general-physician"] },
  { id: "shortness-of-breath", nameEn: "Shortness of Breath", nameBn: "শ্বাসকষ্ট", specialties: ["cardiologist", "general-physician"] },
  { id: "skin-rash", nameEn: "Skin Rash / Itching", nameBn: "ত্বকে ফুসকুড়ি / চুলকানি", specialties: ["dermatologist"] },
  { id: "acne", nameEn: "Acne / Skin Breakout", nameBn: "ব্রণ / ত্বকের সমস্যা", specialties: ["dermatologist"] },
  { id: "stomach-pain", nameEn: "Stomach Pain", nameBn: "পেটে ব্যথা", specialties: ["gastroenterologist", "general-physician"] },
  { id: "nausea", nameEn: "Nausea / Vomiting", nameBn: "বমি বমি ভাব / বমি", specialties: ["gastroenterologist", "general-physician"] },
  { id: "joint-pain", nameEn: "Joint Pain", nameBn: "জয়েন্টে ব্যথা", specialties: ["orthopedic"] },
  { id: "back-pain", nameEn: "Back / Neck Pain", nameBn: "পিঠ / ঘাড়ের ব্যথা", specialties: ["orthopedic"] },
  { id: "eye-problem", nameEn: "Eye Pain / Blurry Vision", nameBn: "চোখে ব্যথা / ঝাপসা দৃষ্টি", specialties: ["ophthalmologist"] },
  { id: "ear-pain", nameEn: "Ear Pain / Hearing Loss", nameBn: "কানে ব্যথা / শ্রবণশক্তি হ্রাস", specialties: ["ent"] },
  { id: "sore-throat", nameEn: "Sore Throat / Tonsillitis", nameBn: "গলা ব্যথা / টনসিলাইটিস", specialties: ["ent", "general-physician"] },
  { id: "dizziness", nameEn: "Dizziness / Vertigo", nameBn: "মাথা ঘোরা / ভার্টিগো", specialties: ["neurologist", "ent", "cardiologist"] },
  { id: "anxiety", nameEn: "Anxiety / Depression", nameBn: "উদ্বেগ / বিষণ্নতা", specialties: ["psychiatrist"] },
  { id: "irregular-periods", nameEn: "Irregular Periods", nameBn: "অনিয়মিত মাসিক", specialties: ["gynecologist"] },
  { id: "high-bp", nameEn: "High Blood Pressure", nameBn: "উচ্চ রক্তচাপ", specialties: ["cardiologist", "general-physician"] },
  { id: "child-illness", nameEn: "Child Fever / Illness", nameBn: "শিশুর জ্বর / অসুস্থতা", specialties: ["pediatrician"] },
  { id: "diabetes", nameEn: "Diabetes", nameBn: "ডায়াবেটিস", specialties: ["general-physician"] },
  { id: "kidney-problem", nameEn: "Kidney / Urinary Problems", nameBn: "কিডনি / প্রস্রাবের সমস্যা", specialties: ["nephrologist"] },
  { id: "memory-problem", nameEn: "Memory Loss / Confusion", nameBn: "স্মৃতিশক্তি হ্রাস / বিভ্রান্তি", specialties: ["neurologist"] },
  { id: "hair-loss", nameEn: "Hair Loss", nameBn: "চুল পড়া", specialties: ["dermatologist"] },
];
