export interface Venue {
    id: string;
    name: string;
    description: string;
    coordinates: [number, number];
    imageUrl: string;
    category: string;
}

export const venues: Venue[] = [
    {
        id: "sultanahmet",
        name: "Sultanahmet Camii (Mavi Cami)",
        description: "1609-1616 yılları arasında inşa edilen, 6 minaresiyle ünlü tarihi cami. İç mekanındaki mavi İznik çinileri nedeniyle 'Mavi Cami' olarak da bilinir.",
        coordinates: [41.0054, 28.9768],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sultanahmet_Camii_2020.jpg/1200px-Sultanahmet_Camii_2020.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "ayasofya",
        name: "Ayasofya",
        description: "537 yılında Bizans İmparatoru I. Justinianus tarafından yaptırılan, dünya mimarlık tarihinin en önemli eserlerinden biri. Yaklaşık 1500 yıllık tarihiyle UNESCO Dünya Mirası listesinde.",
        coordinates: [41.0086, 28.9802],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/1200px-Hagia_Sophia_Mars_2013.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "galata",
        name: "Galata Kulesi",
        description: "1348 yılında Cenevizliler tarafından inşa edilen, 67 metre yüksekliğindeki tarihi kule. İstanbul'un en ikonik simgelerinden biri olup, panoramik şehir manzarası sunar.",
        coordinates: [41.0256, 28.9741],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Istanbul_Galata_Tower.jpg/800px-Istanbul_Galata_Tower.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "kizkulesi",
        name: "Kız Kulesi",
        description: "Üsküdar açıklarında, Boğaz'ın ortasında yer alan efsanevi kule. M.Ö. 5. yüzyıldan beri var olan yapı, pek çok efsane ve filme konu olmuştur.",
        coordinates: [41.0211, 29.0041],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Kiz_Kulesi_2013.jpg/1200px-Kiz_Kulesi_2013.jpg",
        category: "Simge Yapı"
    },
    {
        id: "dolmabahce",
        name: "Dolmabahçe Sarayı",
        description: "1856 yılında tamamlanan, Osmanlı İmparatorluğu'nun son dönem sarayı. Barok, Rokoko ve Neoklasik mimari tarzlarını birleştiren görkemli yapı, 285 oda ve 46 salona sahiptir.",
        coordinates: [41.0392, 29.0006],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dolmabahce_Palace_2019.jpg/1200px-Dolmabahce_Palace_2019.jpg",
        category: "Saray"
    },
    {
        id: "kapalicarsı",
        name: "Kapalıçarşı (Grand Bazaar)",
        description: "1455-1461 yılları arasında inşa edilen dünyanın en eski ve en büyük kapalı çarşılarından biri. 60'tan fazla sokak ve 4.000'den fazla dükkanıyla tarihi alışveriş merkezi.",
        coordinates: [41.0107, 28.9680],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Grand_Bazaar_Istanbul_2007.jpg/1200px-Grand_Bazaar_Istanbul_2007.jpg",
        category: "Tarihi Çarşı"
    }
];
