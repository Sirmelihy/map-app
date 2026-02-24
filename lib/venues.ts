export interface Venue {
    id: string;
    name: string;
    description: string;
    coordinates: [number, number];
    imageUrl: string;
    category: string;
}

export const venues: Venue[] = [
    // ─── Sultanahmet / Fatih Bölgesi ───
    {
        id: "sultanahmet",
        name: "Sultanahmet Camii (Mavi Cami)",
        description: "1609-1616 yılları arasında inşa edilen, 6 minaresiyle ünlü tarihi cami. İç mekanındaki mavi İznik çinileri nedeniyle 'Mavi Cami' olarak da bilinir.",
        coordinates: [41.0054, 28.9768],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "ayasofya",
        name: "Ayasofya",
        description: "537 yılında Bizans İmparatoru I. Justinianus tarafından yaptırılan, dünya mimarlık tarihinin en önemli eserlerinden biri.",
        coordinates: [41.0086, 28.9802],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/1200px-Hagia_Sophia_Mars_2013.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "topkapi",
        name: "Topkapı Sarayı",
        description: "1478'den 1856'ya kadar Osmanlı padişahlarının yaşadığı saray. Muhteşem Boğaz manzarası.",
        coordinates: [41.0115, 28.9834],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Saray"
    },
    {
        id: "yerebatan",
        name: "Yerebatan Sarnıcı",
        description: "532 yılında inşa edilen, 336 sütunlu devasa yeraltı su deposu.",
        coordinates: [41.0084, 28.9779],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "hipodrom",
        name: "Sultanahmet Meydanı (Hipodrom)",
        description: "Roma döneminden kalma at yarışı meydanı. Dikilitaş ve Yılanlı Sütun burada.",
        coordinates: [41.0062, 28.9755],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Meydan"
    },
    {
        id: "arkeoloji",
        name: "İstanbul Arkeoloji Müzesi",
        description: "1891'de açılan, bir milyondan fazla esere sahip dünya çapında önemli müze.",
        coordinates: [41.0117, 28.9812],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Müze"
    },
    {
        id: "turkislam",
        name: "Türk ve İslam Eserleri Müzesi",
        description: "İbrahim Paşa Sarayı'nda yer alan, zengin İslam sanatı koleksiyonu.",
        coordinates: [41.0058, 28.9745],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Müze"
    },
    {
        id: "sogukceşme",
        name: "Soğukçeşme Sokağı",
        description: "Ayasofya ile Topkapı Sarayı arasındaki tarihi Osmanlı sokağı.",
        coordinates: [41.0098, 28.9815],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Tarihi Sokak"
    },
    // ─── Kapalıçarşı / Eminönü Bölgesi ───
    {
        id: "kapalicarsı",
        name: "Kapalıçarşı (Grand Bazaar)",
        description: "1455-1461 yılları arasında inşa edilen dünyanın en eski ve en büyük kapalı çarşılarından biri.",
        coordinates: [41.0107, 28.9680],
        imageUrl: "/kapali_carsi.jpg",
        category: "Tarihi Çarşı"
    },
    {
        id: "misircarsisi",
        name: "Mısır Çarşısı (Baharatçılar)",
        description: "1660'ta açılan tarihi baharat çarşısı. Binlerce çeşit baharat ve lokum.",
        coordinates: [41.0165, 28.9707],
        imageUrl: "/kapali_carsi.jpg",
        category: "Tarihi Çarşı"
    },
    {
        id: "yeni_cami",
        name: "Yeni Cami",
        description: "1597-1665 yılları arasında inşa edilen Osmanlı camisi. Eminönü meydanının simgesi.",
        coordinates: [41.0172, 28.9712],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "suleymaniye",
        name: "Süleymaniye Camii",
        description: "Mimar Sinan'ın 1557'de tamamladığı başyapıtı. Osmanlı mimarisinin zirvesi.",
        coordinates: [41.0162, 28.9641],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "rustem_pasa",
        name: "Rüstem Paşa Camii",
        description: "Mimar Sinan eseri, muhteşem İznik çinileriyle süslü küçük cami.",
        coordinates: [41.0167, 28.9697],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "galata_koprusu",
        name: "Galata Köprüsü",
        description: "Haliç üzerindeki ikonik köprü. Altında restoranlar, üstünde balıkçılar.",
        coordinates: [41.0201, 28.9733],
        imageUrl: "/galata_kulesi.jpg",
        category: "Köprü"
    },
    // ─── Beyoğlu / Taksim / Galata Bölgesi ───
    {
        id: "galata",
        name: "Galata Kulesi",
        description: "1348 yılında Cenevizliler tarafından inşa edilen, 67 metre yüksekliğindeki tarihi kule.",
        coordinates: [41.0256, 28.9741],
        imageUrl: "/galata_kulesi.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "istiklal",
        name: "İstiklal Caddesi",
        description: "Taksim'den Tünel'e uzanan 1.4 km'lik tarihi yaya caddesi.",
        coordinates: [41.0335, 28.9775],
        imageUrl: "/galata_kulesi.jpg",
        category: "Cadde"
    },
    {
        id: "taksim",
        name: "Taksim Meydanı",
        description: "İstanbul'un en ünlü meydanı. Cumhuriyet Anıtı burada yer alır.",
        coordinates: [41.0370, 28.9850],
        imageUrl: "/galata_kulesi.jpg",
        category: "Meydan"
    },
    {
        id: "cicek_pasaji",
        name: "Çiçek Pasajı",
        description: "1876'da inşa edilen tarihi pasaj. Meyhane ve restoranlarla ünlü.",
        coordinates: [41.0342, 28.9782],
        imageUrl: "/galata_kulesi.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "pera_muzesi",
        name: "Pera Müzesi",
        description: "Osmanlı dönemi resimlerinin ve Kütahya çinilerinin sergilendiği müze.",
        coordinates: [41.0330, 28.9765],
        imageUrl: "/galata_kulesi.jpg",
        category: "Müze"
    },
    {
        id: "galata_mevlevi",
        name: "Galata Mevlevihanesi",
        description: "1491'de kurulan, İstanbul'un en eski Mevlevi tekkesi.",
        coordinates: [41.0280, 28.9735],
        imageUrl: "/galata_kulesi.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "tunel",
        name: "Tünel (Tarihi Metro)",
        description: "1875'te açılan dünyanın ikinci en eski yeraltı metrosu.",
        coordinates: [41.0268, 28.9745],
        imageUrl: "/galata_kulesi.jpg",
        category: "Ulaşım"
    },
    {
        id: "aga_camii",
        name: "Ağa Camii",
        description: "Beyoğlu'nun merkezinde küçük ama tarihi cami.",
        coordinates: [41.0348, 28.9798],
        imageUrl: "/galata_kulesi.jpg",
        category: "Tarihi Yapı"
    },
    // ─── Beşiktaş / Dolmabahçe Bölgesi ───
    {
        id: "dolmabahce",
        name: "Dolmabahçe Sarayı",
        description: "1856 yılında tamamlanan, Osmanlı İmparatorluğu'nun son dönem sarayı.",
        coordinates: [41.0392, 29.0006],
        imageUrl: "/dolmabahce.jpg",
        category: "Saray"
    },
    {
        id: "dolmabahce_saat",
        name: "Dolmabahçe Saat Kulesi",
        description: "1895'te inşa edilen, sarayın bahçesindeki Neobarok saat kulesi.",
        coordinates: [41.0388, 28.9988],
        imageUrl: "/dolmabahce.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "besiktas_meydani",
        name: "Beşiktaş Meydanı",
        description: "Barbaros Hayrettin Paşa heykeli ve yoğun alışveriş alanı.",
        coordinates: [41.0430, 29.0045],
        imageUrl: "/dolmabahce.jpg",
        category: "Meydan"
    },
    {
        id: "deniz_muzesi",
        name: "Deniz Müzesi",
        description: "Osmanlı ve Türk denizcilik tarihini sergileyen büyük müze.",
        coordinates: [41.0415, 29.0022],
        imageUrl: "/dolmabahce.jpg",
        category: "Müze"
    },
    {
        id: "yildiz_parki",
        name: "Yıldız Parkı",
        description: "Beşiktaş'taki tarihi park ve eski saray bahçeleri.",
        coordinates: [41.0475, 29.0135],
        imageUrl: "/dolmabahce.jpg",
        category: "Park"
    },
    {
        id: "ortakoy_cami",
        name: "Ortaköy Camii",
        description: "Boğaz kenarındaki neobarok tarzı cami. İstanbul'un en çok fotoğraflanan mekanı.",
        coordinates: [41.0475, 29.0272],
        imageUrl: "/dolmabahce.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "ciragan_sarayi",
        name: "Çırağan Sarayı",
        description: "1871'de tamamlanan Osmanlı sarayı, bugün lüks otel olarak hizmet veriyor.",
        coordinates: [41.0455, 29.0195],
        imageUrl: "/dolmabahce.jpg",
        category: "Saray"
    },
    // ─── Kadıköy / Anadolu Yakası ───
    {
        id: "kadikoy_carsisi",
        name: "Kadıköy Çarşısı",
        description: "Tarihi Kadıköy pazarı. Taze balık, meyve ve hediyelik eşyalar.",
        coordinates: [40.9905, 29.0245],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Çarşı"
    },
    {
        id: "moda_sahili",
        name: "Moda Sahili",
        description: "Kadıköy'ün popüler yürüyüş ve piknik alanı. Adalar manzarası.",
        coordinates: [40.9830, 29.0275],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Sahil"
    },
    {
        id: "sureyya_operasi",
        name: "Süreyya Operası",
        description: "1927'de açılan tarihi opera binası. Kadıköy'ün kültürel simgesi.",
        coordinates: [40.9890, 29.0265],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Kültür"
    },
    {
        id: "bahariye",
        name: "Bahariye Caddesi",
        description: "Kadıköy'ün ana alışveriş caddesi, kafeler ve mağazalarla dolu.",
        coordinates: [40.9870, 29.0290],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Cadde"
    },
    {
        id: "kadikoy_iskele",
        name: "Kadıköy İskelesi",
        description: "Tarihi vapur iskelesi. Anadolu yakasının kapısı.",
        coordinates: [40.9920, 29.0235],
        imageUrl: "/kiz_kulesi.jpg",
        category: "İskele"
    },
    {
        id: "haydarpaşa",
        name: "Haydarpaşa Garı",
        description: "1909'da açılan tarihi tren garı, Neoklasik mimari.",
        coordinates: [40.9968, 29.0190],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "fenerbahce_parki",
        name: "Fenerbahçe Parkı",
        description: "Deniz kenarında geniş yeşil alan, yürüyüş ve piknik.",
        coordinates: [40.9710, 29.0365],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Park"
    },
    // ─── Üsküdar Bölgesi ───
    {
        id: "kizkulesi",
        name: "Kız Kulesi",
        description: "Üsküdar açıklarında, Boğaz'ın ortasında yer alan efsanevi kule.",
        coordinates: [41.0211, 29.0041],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Simge Yapı"
    },
    {
        id: "uskudar_iskelesi",
        name: "Üsküdar İskelesi",
        description: "Anadolu yakasının önemli iskele noktası.",
        coordinates: [41.0254, 29.0146],
        imageUrl: "/kiz_kulesi.jpg",
        category: "İskele"
    },
    {
        id: "mihrimah_sultan",
        name: "Mihrimah Sultan Camii (Üsküdar)",
        description: "Mimar Sinan'ın 1548'de inşa ettiği zarif cami.",
        coordinates: [41.0260, 29.0155],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "camlica_tepesi",
        name: "Çamlıca Tepesi",
        description: "İstanbul'un en yüksek noktası, muhteşem Boğaz manzarası.",
        coordinates: [41.0275, 29.0700],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Doğa"
    },
    {
        id: "camlica_camii",
        name: "Çamlıca Camii",
        description: "2019'da açılan Türkiye'nin en büyük camisi.",
        coordinates: [41.0248, 29.0720],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Cami"
    },
    {
        id: "fethi_pasa",
        name: "Fethi Paşa Korusu",
        description: "Üsküdar'daki tarihi park, Boğaz manzarası ve doğa yürüyüşleri.",
        coordinates: [41.0345, 29.0320],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Park"
    },
    // ─── Sarıyer / Boğaz Kuzey ───
    {
        id: "rumeli_hisari",
        name: "Rumeli Hisarı",
        description: "1452'de Fatih Sultan Mehmet tarafından inştirılan kale. Boğaz'ın en dar noktasında.",
        coordinates: [41.0845, 29.0570],
        imageUrl: "/galata_kulesi.jpg",
        category: "Kale"
    },
    {
        id: "bebek_sahili",
        name: "Bebek Sahili",
        description: "Boğaz kenarındaki şık semt, kafeler ve parkla ünlü.",
        coordinates: [41.0760, 29.0440],
        imageUrl: "/dolmabahce.jpg",
        category: "Sahil"
    },
    {
        id: "anadolu_hisari",
        name: "Anadolu Hisarı",
        description: "1395'te I. Bayezid tarafından inşa edilen kale.",
        coordinates: [41.0825, 29.0670],
        imageUrl: "/galata_kulesi.jpg",
        category: "Kale"
    },
    {
        id: "emirgan_parki",
        name: "Emirgan Korusu",
        description: "Sarıyer'deki tarihi park. Lale festivaliyle ünlü.",
        coordinates: [41.1075, 29.0545],
        imageUrl: "/dolmabahce.jpg",
        category: "Park"
    },
    {
        id: "sakip_sabanci",
        name: "Sakıp Sabancı Müzesi",
        description: "Emirgan'daki çağdaş sanat müzesi, eski köşkte.",
        coordinates: [41.1090, 29.0560],
        imageUrl: "/dolmabahce.jpg",
        category: "Müze"
    },
    // ─── Eyüp / Haliç Bölgesi ───
    {
        id: "eyup_sultan",
        name: "Eyüp Sultan Camii",
        description: "İstanbul'un fetihten sonra inşa edilen ilk camisi. Önemli ziyaret yeri.",
        coordinates: [41.0485, 28.9335],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Cami"
    },
    {
        id: "pierre_loti",
        name: "Pierre Loti Tepesi",
        description: "Haliç manzaralı tarihi kafe ve seyir terası.",
        coordinates: [41.0542, 28.9340],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Seyir Terası"
    },
    {
        id: "miniaturk",
        name: "Miniatürk",
        description: "Türkiye'nin ve Osmanlı'nın en önemli yapılarının minyatür modelleri.",
        coordinates: [41.0630, 28.9490],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Müze"
    },
    {
        id: "feshane",
        name: "Feshane",
        description: "Haliç kıyısındaki eski Osmanlı fabrikası, şimdi kültür merkezi.",
        coordinates: [41.0440, 28.9420],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Kültür"
    },
    // ─── Adalar ───
    {
        id: "buyukada",
        name: "Büyükada",
        description: "Prens Adaları'nın en büyüğü. Faytonlarla ünlü tarihi ada.",
        coordinates: [40.8695, 29.1270],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Ada"
    },
    {
        id: "heybeliada",
        name: "Heybeliada",
        description: "Ruhban Okulu ve doğal güzellikleriyle ünlü ada.",
        coordinates: [40.8760, 29.0865],
        imageUrl: "/kiz_kulesi.jpg",
        category: "Ada"
    },
    // ─── Balat / Fener Bölgesi ───
    {
        id: "balat_evleri",
        name: "Balat Renkli Evler",
        description: "Tarihi yarımadadaki renkli Osmanlı evleri. Fotoğrafçıların gözdesi.",
        coordinates: [41.0292, 28.9488],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Tarihi Semt"
    },
    {
        id: "fener_rum_patrikhanesi",
        name: "Fener Rum Patrikhanesi",
        description: "Ortodoks Hristiyanlığın merkezi. Tarihi ve dini öneme sahip.",
        coordinates: [41.0285, 28.9515],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Tarihi Yapı"
    },
    {
        id: "chora_muzesi",
        name: "Kariye Müzesi (Chora)",
        description: "Bizans mozaikleri ve freskolarıyla ünlü eski kilise.",
        coordinates: [41.0315, 28.9395],
        imageUrl: "/sultanahmet_camii.jpg",
        category: "Müze"
    },
];
