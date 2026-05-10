export interface Location {
  division: string;
  divisionBn: string;
  districts: {
    name: string;
    nameBn: string;
    upazilas: string[];
  }[];
}

export const locations: Location[] = [
  {
    division: "Dhaka",
    divisionBn: "ঢাকা",
    districts: [
      {
        name: "Dhaka",
        nameBn: "ঢাকা",
        upazilas: ["Mirpur", "Dhanmondi", "Shahbag", "Gulshan", "Uttara", "Bashundhara", "Mohammadpur", "Motijheel", "Sher-e-Bangla Nagar", "Agargaon", "Panthapath"],
      },
      {
        name: "Gazipur",
        nameBn: "গাজীপুর",
        upazilas: ["Gazipur Sadar", "Tongi", "Kaliakair", "Kapasia", "Sreepur"],
      },
      {
        name: "Narayanganj",
        nameBn: "নারায়ণগঞ্জ",
        upazilas: ["Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon"],
      },
      {
        name: "Manikganj",
        nameBn: "মানিকগঞ্জ",
        upazilas: ["Manikganj Sadar", "Singair", "Shibalaya", "Saturia", "Harirampur"],
      },
    ],
  },
  {
    division: "Chattogram",
    divisionBn: "চট্টগ্রাম",
    districts: [
      {
        name: "Chattogram",
        nameBn: "চট্টগ্রাম",
        upazilas: ["Panchlaish", "Kotwali", "Double Mooring", "Pahartali", "Halishahar", "Agrabad", "Khulshi", "Nasirabad"],
      },
      {
        name: "Cox's Bazar",
        nameBn: "কক্সবাজার",
        upazilas: ["Cox's Bazar Sadar", "Chakaria", "Teknaf", "Ukhia", "Ramu"],
      },
      {
        name: "Comilla",
        nameBn: "কুমিল্লা",
        upazilas: ["Comilla Sadar", "Debidwar", "Brahmanpara", "Burichang", "Chandina"],
      },
    ],
  },
  {
    division: "Rajshahi",
    divisionBn: "রাজশাহী",
    districts: [
      {
        name: "Rajshahi",
        nameBn: "রাজশাহী",
        upazilas: ["Rajshahi Sadar", "Boalia", "Shah Makhdum", "Rajpara", "Motihar"],
      },
      {
        name: "Bogura",
        nameBn: "বগুড়া",
        upazilas: ["Bogura Sadar", "Gabtali", "Shajahanpur", "Shibganj", "Adamdighi"],
      },
      {
        name: "Natore",
        nameBn: "নাটোর",
        upazilas: ["Natore Sadar", "Baraigram", "Bagatipara", "Lalpur", "Singra"],
      },
    ],
  },
  {
    division: "Sylhet",
    divisionBn: "সিলেট",
    districts: [
      {
        name: "Sylhet",
        nameBn: "সিলেট",
        upazilas: ["Sylhet Sadar", "Beanibazar", "Gowainghat", "Jaintiapur", "Kanaighat"],
      },
      {
        name: "Habiganj",
        nameBn: "হবিগঞ্জ",
        upazilas: ["Habiganj Sadar", "Madhabpur", "Chunarughat", "Nabiganj", "Bahubal"],
      },
      {
        name: "Moulvibazar",
        nameBn: "মৌলভীবাজার",
        upazilas: ["Moulvibazar Sadar", "Srimangal", "Kamalganj", "Kulaura", "Barlekha"],
      },
    ],
  },
  {
    division: "Khulna",
    divisionBn: "খুলনা",
    districts: [
      {
        name: "Khulna",
        nameBn: "খুলনা",
        upazilas: ["Khulna Sadar", "Sonadanga", "Khalishpur", "Khan Jahan Ali", "Daulatpur"],
      },
      {
        name: "Jessore",
        nameBn: "যশোর",
        upazilas: ["Jessore Sadar", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargacha"],
      },
      {
        name: "Satkhira",
        nameBn: "সাতক্ষীরা",
        upazilas: ["Satkhira Sadar", "Assasuni", "Debhata", "Kaliganj", "Shyamnagar"],
      },
    ],
  },
  {
    division: "Rangpur",
    divisionBn: "রংপুর",
    districts: [
      {
        name: "Rangpur",
        nameBn: "রংপুর",
        upazilas: ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur"],
      },
      {
        name: "Dinajpur",
        nameBn: "দিনাজপুর",
        upazilas: ["Dinajpur Sadar", "Birampur", "Birganj", "Chirirbandar", "Parbatipur"],
      },
    ],
  },
  {
    division: "Mymensingh",
    divisionBn: "ময়মনসিংহ",
    districts: [
      {
        name: "Mymensingh",
        nameBn: "ময়মনসিংহ",
        upazilas: ["Mymensingh Sadar", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon"],
      },
      {
        name: "Jamalpur",
        nameBn: "জামালপুর",
        upazilas: ["Jamalpur Sadar", "Baksiganj", "Dewanganj", "Islampur", "Madarganj"],
      },
    ],
  },
  {
    division: "Barishal",
    divisionBn: "বরিশাল",
    districts: [
      {
        name: "Barishal",
        nameBn: "বরিশাল",
        upazilas: ["Barishal Sadar", "Agailzhara", "Bakerganj", "Banaripara", "Gournadi"],
      },
      {
        name: "Patuakhali",
        nameBn: "পটুয়াখালী",
        upazilas: ["Patuakhali Sadar", "Bauphal", "Dashmina", "Dumki", "Galachipa"],
      },
    ],
  },
];
