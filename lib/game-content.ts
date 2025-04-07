// Game content in both English and Hindi

export const gameContent = {
  english: [
    {
      title: "The Beginning",
      background: "/ss2.png?height=300&width=600",
      narrative:
        "In the ancient kingdom of Ayodhya, King Dasharatha longed for an heir. After performing a sacred fire ritual, he was blessed with four sons. The eldest, Rama, grew into a virtuous prince beloved by all. As a young man, Rama was called upon to protect the sages in the forest from demons.",
      choices: [
        {
          text: "Rama agrees to help the sages immediately",
          outcome:
            "Rama's swift decision to help those in need demonstrates his commitment to dharma (righteousness). The sages are grateful and share ancient wisdom with him.",
          wisdomPoints: 3,
          skillBonus: "attention",
        },
        {
          text: "Rama consults with his teacher first",
          outcome:
            "Rama seeks guidance from his guru, showing humility and respect for wisdom. His teacher offers strategic advice that will help Rama in his upcoming challenges.",
          wisdomPoints: 2,
          skillBonus: "logic",
        },
        {
          text: "Rama gathers his brothers to join him",
          outcome:
            "Rama recognizes the value of family support. Together with his brother Lakshmana, he becomes better prepared for the challenges ahead.",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
      ],
      puzzle: {
        type: "memory",
        difficulty: 1,
        instructions: "Match the items that belong together in the royal court of Ayodhya.",
        content: {
          pairs: [
            {
              id: 1,
              name: "King",
              match: "Crown",
              image1: "/king.svg?height=100&width=100",
              image2: "/crown.svg?height=100&width=100",
            },
            {
              id: 2,
              name: "Bow",
              match: "Arrow",
              image1: "/bow.svg?height=100&width=100",
              image2: "/arrow.svg?height=100&width=100",
            },
            {
              id: 3,
              name: "Sage",
              match: "Scripture",
              image1: "/sage.svg?height=100&width=100",
              image2: "/Scripture.svg?height=100&width=100",
            },
            {
              id: 4,
              name: "Prince",
              match: "Sword",
              image1: "/prince.svg?height=100&width=100",
              image2: "/sword.svg?height=100&width=100",
            },
          ],
        },
      },
    },
    {
      title: "The Test of Strength",
      background: "/page2.png?height=300&width=600",
      narrative:
        "Rama and his brother Lakshmana traveled with the sage Vishwamitra to the kingdom of Mithila. There, King Janaka had organized a contest: whoever could lift and string the divine bow of Lord Shiva would win the hand of his daughter Sita in marriage. Many strong princes and warriors had already tried and failed.",
      choices: [
        {
          text: "Rama approaches the bow with confidence",
          outcome:
            "Rama's self-assurance impresses the court. With seemingly effortless strength, he not only lifts the bow but strings it so powerfully that it breaks in half, stunning everyone present.",
          wisdomPoints: 2,
          skillBonus: "attention",
        },
        {
          text: "Rama observes others before attempting",
          outcome:
            "Rama's careful observation reveals why others failed. When his turn comes, he adjusts his approach and succeeds where others failed, showing the value of learning from others' mistakes.",
          wisdomPoints: 3,
          skillBonus: "logic",
        },
        {
          text: "Rama pays respects to the bow before touching it",
          outcome:
            "Rama honors the divine nature of Lord Shiva's bow, showing his reverence. This spiritual connection gives him strength, and he completes the task with divine blessing.",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
      ],
      puzzle: {
        type: "pattern",
        difficulty: 2,
        instructions: "Arrange the royal symbols in the correct order to honor the ceremony.",
        content: {
          correctPattern: [3, 1, 4, 2],
          items: [
            { id: 1, name: "Lotus", image: "/lotus.svg?height=100&width=100" },
            { id: 2, name: "Conch", image: "/conch.svg?height=100&width=100" },
            { id: 3, name: "Lamp", image: "/lamp.svg?height=100&width=100" },
            { id: 4, name: "Garland", image: "/gardland.svg?height=100&width=100" },
          ],
        },
      },
    },
    {
      title: "Forest Exile",
      background: "/page3.png?height=300&width=600",
      narrative:
        "On the eve of Rama's coronation as king, Queen Kaikeyi asked King Dasharatha to honor two boons he had promised her: to crown her son Bharata instead and to send Rama to the forest for fourteen years. Though heartbroken, King Dasharatha was bound by his word. When Rama learned of this, he faced a difficult choice.",
      choices: [
        {
          text: "Rama accepts the exile without complaint",
          outcome:
            "Rama's unwavering adherence to duty and respect for his father's promise demonstrates his extraordinary character. His graceful acceptance inspires those around him, including his devoted wife Sita, who insists on accompanying him.",
          wisdomPoints: 3,
          skillBonus: "attention",
        },
        {
          text: "Rama discusses alternatives with his advisors",
          outcome:
            "Rama's advisors suggest many ways to challenge the decision, but ultimately Rama chooses the path of duty. His willingness to listen before deciding shows wisdom.",
          wisdomPoints: 2,
          skillBonus: "logic",
        },
        {
          text: "Rama prepares carefully for forest life",
          outcome:
            "Rama's practical approach serves him well. By gathering knowledge and supplies for forest survival, he ensures that he, Sita, and Lakshmana will be better prepared for the challenges ahead.",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
      ],
      puzzle: {
        type: "word",
        difficulty: 2,
        instructions: "Match these Sanskrit words with their meanings to understand the forest teachings.",
        content: {
          pairs: [
            { sanskrit: "धर्म", transliteration: "Dharma", meaning: "Righteousness" },
            { sanskrit: "सत्य", transliteration: "Satya", meaning: "Truth" },
            { sanskrit: "अहिंसा", transliteration: "Ahimsa", meaning: "Non-violence" },
            { sanskrit: "तपस्", transliteration: "Tapas", meaning: "Discipline" },
            { sanskrit: "सेवा", transliteration: "Seva", meaning: "Service" },
          ],
        },
      },
    },
    {
      title: "The Golden Deer",
      background: "/page4.png?height=300&width=600",
      narrative:
        "During their exile, Rama, Sita, and Lakshmana lived peacefully in the forest. One day, a beautiful golden deer appeared near their cottage. Sita was enchanted by it and asked Rama to catch it for her. Rama sensed something unusual about the deer.",
      choices: [
        {
          text: "Rama refuses to chase the deer",
          outcome:
            "Rama's caution proves wise. The deer was indeed the demon Maricha in disguise, sent to lure Rama away from Sita. By staying vigilant, Rama protected his wife from the demon king Ravana's plot.",
          wisdomPoints: 3,
          skillBonus: "logic",
        },
        {
          text: "Rama follows the deer but leaves instructions",
          outcome:
            "Before pursuing the deer, Rama instructs Lakshmana to protect Sita at all costs. Though he falls into the trap, his foresight ensures a plan is in place, showing the importance of preparation.",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
        {
          text: "Rama sends Lakshmana instead",
          outcome:
            "Rama delegates the task while staying to protect Sita himself. This proves partially effective, as Ravana must use more deception to proceed with his plan.",
          wisdomPoints: 2,
          skillBonus: "attention",
        },
      ],
      puzzle: {
        type: "attention",
        difficulty: 3,
        instructions: "Find the hidden demons disguised in this forest scene.",
        content: {
          image: "/placeholder.svg?height=400&width=600",
          hiddenItems: [
            { id: 1, name: "Demon in tree", coordinates: { x: 120, y: 200 }, radius: 30 },
            { id: 2, name: "Snake demon", coordinates: { x: 350, y: 300 }, radius: 25 },
            { id: 3, name: "Shadow demon", coordinates: { x: 500, y: 150 }, radius: 35 },
            { id: 4, name: "Water demon", coordinates: { x: 200, y: 350 }, radius: 30 },
          ],
        },
      },
    },
    {
      title: "The Search for Sita",
      background: "/page5.png?height=300&width=600",
      narrative:
        "After Ravana abducted Sita, Rama and Lakshmana searched desperately for her. They encountered Jatayu, an ancient bird who had tried to stop Ravana. Though mortally wounded, Jatayu informed them that Ravana had taken Sita southward. As they continued their journey, they met Hanuman, the mighty monkey warrior.",
      choices: [
        {
          text: "Rama forms an alliance with the monkey kingdom",
          outcome:
            "Rama's diplomatic skill secures powerful allies. With Hanuman and the monkey army at his side, finding Sita becomes possible, showing the strength that comes from cooperation.",
          wisdomPoints: 3,
          skillBonus: "logic",
        },
        {
          text: "Rama shares his complete story with Hanuman",
          outcome:
            "By opening up to Hanuman, Rama creates deep loyalty. Moved by Rama's integrity and suffering, Hanuman pledges his life to the cause, becoming Rama's most devoted servant.",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
        {
          text: "Rama gives Hanuman his ring as a token for Sita",
          outcome:
            "Rama's thoughtfulness provides a way for Sita to know any messenger is genuine. This small detail becomes crucial when Hanuman eventually finds her in Lanka.",
          wisdomPoints: 3,
          skillBonus: "attention",
        },
      ],
      puzzle: {
        type: "logic",
        difficulty: 3,
        instructions: "Help Hanuman determine the best route to Lanka by solving this puzzle.",
        content: {
          puzzle: "logic_puzzle",
          clues: [
            "The direct path across the ocean is 100 yojanas long.",
            "Hanuman can leap great distances but must rest between jumps.",
            "There are three small islands he could use for resting.",
            "The eastern route has more islands but is longer overall.",
            "The western route has stronger winds that can either help or hinder.",
          ],
          options: [
            { id: 1, text: "Take the direct southern route with no stops" },
            { id: 2, text: "Use the eastern island chain with multiple rests" },
            { id: 3, text: "Take the western route with favorable winds" },
            { id: 4, text: "Leap from mountain peak to Lanka in one tremendous jump" },
          ],
          correctAnswer: 4,
        },
      },
    },
  ],
  hindi: [
    {
      title: "शुरुआत",
      background: "/placeholder.svg?height=300&width=600",
      narrative:
        "प्राचीन अयोध्या राज्य में, राजा दशरथ एक वारिस की इच्छा रखते थे। एक पवित्र अग्नि यज्ञ करने के बाद, उन्हें चार पुत्रों का आशीर्वाद मिला। सबसे बड़े, राम, एक सद्गुणी राजकुमार बने जिन्हें सभी प्यार करते थे। एक युवा के रूप में, राम को वन में ऋषियों को राक्षसों से बचाने के लिए बुलाया गया था।",
      choices: [
        {
          text: "राम तुरंत ऋषियों की मदद करने के लिए सहमत होते हैं",
          outcome:
            "जरूरतमंदों की मदद करने का राम का त्वरित निर्णय धर्म (सत्यनिष्ठा) के प्रति उनकी प्रतिबद्धता को दर्शाता है। ऋषि आभारी हैं और उनके साथ प्राचीन ज्ञान साझा करते हैं।",
          wisdomPoints: 3,
          skillBonus: "attention",
        },
        {
          text: "राम पहले अपने गुरु से परामर्श करते हैं",
          outcome:
            "राम अपने गुरु से मार्गदर्शन मांगते हैं, जो विनम्रता और ज्ञान के प्रति सम्मान दिखाता है। उनके गुरु रणनीतिक सलाह देते हैं जो राम को आने वाली चुनौतियों में मदद करेगी।",
          wisdomPoints: 2,
          skillBonus: "logic",
        },
        {
          text: "राम अपने भाइयों को साथ आने के लिए इकट्ठा करते हैं",
          outcome:
            "राम परिवार के समर्थन के मूल्य को पहचानते हैं। अपने भाई लक्ष्मण के साथ, वह आगे आने वाली चुनौतियों के लिए बेहतर तैयार होते हैं।",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
      ],
      puzzle: {
        type: "memory",
        difficulty: 1,
        instructions: "अयोध्या के राजदरबार में एक साथ आने वाली वस्तुओं को मिलाएं।",
        content: {
          pairs: [
            {
              id: 1,
              name: "राजा",
              match: "मुकुट",
              image1: "/placeholder.svg?height=100&width=100",
              image2: "/placeholder.svg?height=100&width=100",
            },
            {
              id: 2,
              name: "धनुष",
              match: "बाण",
              image1: "/placeholder.svg?height=100&width=100",
              image2: "/placeholder.svg?height=100&width=100",
            },
            {
              id: 3,
              name: "ऋषि",
              match: "शास्त्र",
              image1: "/placeholder.svg?height=100&width=100",
              image2: "/placeholder.svg?height=100&width=100",
            },
            {
              id: 4,
              name: "राजकुमार",
              match: "तलवार",
              image1: "/placeholder.svg?height=100&width=100",
              image2: "/placeholder.svg?height=100&width=100",
            },
          ],
        },
      },
    },
    {
      title: "शक्ति की परीक्षा",
      background: "/placeholder.svg?height=300&width=600",
      narrative:
        "राम और उनके भाई लक्ष्मण ऋषि विश्वामित्र के साथ मिथिला राज्य गए। वहां, राजा जनक ने एक प्रतियोगिता आयोजित की थी: जो भी भगवान शिव के दिव्य धनुष को उठा और चढ़ा सकता है, वह उनकी बेटी सीता से विवाह करेगा। कई शक्तिशाली राजकुमारों और योद्धाओं ने पहले ही कोशिश की और असफल रहे थे।",
      choices: [
        {
          text: "राम आत्मविश्वास के साथ धनुष की ओर बढ़ते हैं",
          outcome:
            "राम का आत्मविश्वास दरबार को प्रभावित करता है। अद्भुत शक्ति के साथ, वह न केवल धनुष को उठाते हैं बल्कि इसे इतनी शक्ति से चढ़ाते हैं कि यह आधा टूट जाता है, जिससे सभी उपस्थित लोग चकित रह जाते हैं।",
          wisdomPoints: 2,
          skillBonus: "attention",
        },
        {
          text: "राम प्रयास करने से पहले दूसरों का निरीक्षण करते हैं",
          outcome:
            "राम का सावधानीपूर्वक निरीक्षण यह बताता है कि अन्य क्यों असफल रहे। जब उनकी बारी आती है, तो वह अपने दृष्टिकोण को समायोजित करते हैं और वहां सफल होते हैं जहां अन्य असफल रहे, जो दूसरों की गलतियों से सीखने के मूल्य को दिखाता है।",
          wisdomPoints: 3,
          skillBonus: "logic",
        },
        {
          text: "राम धनुष को छूने से पहले उसका सम्मान करते हैं",
          outcome:
            "राम भगवान शिव के धनुष की दिव्य प्रकृति का सम्मान करते हैं, अपनी श्रद्धा दिखाते हैं। यह आध्यात्मिक संबंध उन्हें शक्ति देता है, और वह दिव्य आशीर्वाद के साथ कार्य पूरा करते हैं।",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
      ],
      puzzle: {
        type: "pattern",
        difficulty: 2,
        instructions: "समारोह का सम्मान करने के लिए राजसी प्रतीकों को सही क्रम में व्यवस्थित करें।",
        content: {
          correctPattern: [3, 1, 4, 2],
          items: [
            { id: 1, name: "कमल", image: "/placeholder.svg?height=100&width=100" },
            { id: 2, name: "शंख", image: "/placeholder.svg?height=100&width=100" },
            { id: 3, name: "दीपक", image: "/placeholder.svg?height=100&width=100" },
            { id: 4, name: "माला", image: "/placeholder.svg?height=100&width=100" },
          ],
        },
      },
    },
    {
      title: "वनवास",
      background: "/placeholder.svg?height=300&width=600",
      narrative:
        "राम के राजा के रूप में राज्याभिषेक की पूर्व संध्या पर, रानी कैकेयी ने राजा दशरथ से दो वरदान मांगे जो उन्होंने उन्हें वादा किए थे: अपने बेटे भरत को राजा बनाना और राम को चौदह वर्षों के लिए वन भेजना। हृदय विदारक होने के बावजूद, राजा दशरथ अपने वचन से बंधे थे। जब राम को इसके बारे में पता चला, तो उन्होंने एक कठिन विकल्प का सामना किया।",
      choices: [
        {
          text: "राम बिना शिकायत के वनवास स्वीकार करते हैं",
          outcome:
            "कर्तव्य के प्रति राम की अटूट निष्ठा और अपने पिता के वादे के प्रति सम्मान उनके असाधारण चरित्र को दर्शाता है। उनकी सहज स्वीकृति उनके आसपास के लोगों को प्रेरित करती है, जिसमें उनकी समर्पित पत्नी सीता भी शामिल है, जो उनके साथ जाने पर जोर देती है।",
          wisdomPoints: 3,
          skillBonus: "attention",
        },
        {
          text: "राम अपने सलाहकारों के साथ विकल्पों पर चर्चा करते हैं",
          outcome:
            "राम के सलाहकार निर्णय को चुनौती देने के कई तरीके सुझाते हैं, लेकिन अंततः राम कर्तव्य के मार्ग को चुनते हैं। निर्णय लेने से पहले सुनने की उनकी इच्छा बुद्धिमत्ता दिखाती है।",
          wisdomPoints: 2,
          skillBonus: "logic",
        },
        {
          text: "राम वन जीवन के लिए सावधानीपूर्वक तैयारी करते हैं",
          outcome:
            "राम का व्यावहारिक दृष्टिकोण उन्हें अच्छी तरह से काम आता है। वन में जीवित रहने के लिए ज्ञान और आपूर्ति इकट्ठा करके, वह यह सुनिश्चित करते हैं कि वह, सीता और लक्ष्मण आगे आने वाली चुनौतियों के लिए बेहतर तैयार होंगे।",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
      ],
      puzzle: {
        type: "word",
        difficulty: 2,
        instructions: "वन शिक्षाओं को समझने के लिए इन संस्कृत शब्दों को उनके अर्थों से मिलाएं।",
        content: {
          pairs: [
            { sanskrit: "धर्म", transliteration: "Dharma", meaning: "धार्मिकता" },
            { sanskrit: "सत्य", transliteration: "Satya", meaning: "सच्चाई" },
            { sanskrit: "अहिंसा", transliteration: "Ahimsa", meaning: "अहिंसा" },
            { sanskrit: "तपस्", transliteration: "Tapas", meaning: "अनुशासन" },
            { sanskrit: "सेवा", transliteration: "Seva", meaning: "सेवा" },
          ],
        },
      },
    },
    {
      title: "स्वर्ण मृग",
      background: "/placeholder.svg?height=300&width=600",
      narrative:
        "वनवास के दौरान, राम, सीता और लक्ष्मण वन में शांतिपूर्वक रहते थे। एक दिन, उनके कुटिया के पास एक सुंदर स्वर्ण मृग दिखाई दिया। सीता इससे मोहित हो गईं और राम से इसे पकड़ने के लिए कहा। राम ने मृग के बारे में कुछ असामान्य महसूस किया।",
      choices: [
        {
          text: "राम मृग का पीछा करने से इनकार करते हैं",
          outcome:
            "राम की सावधानी बुद्धिमानी साबित होती है। मृग वास्तव में राक्षस मारीच था जो छद्म वेश में था, जिसे राम को सीता से दूर ले जाने के लिए भेजा गया था। सतर्क रहकर, राम ने अपनी पत्नी को राक्षस राजा रावण की योजना से बचाया।",
          wisdomPoints: 3,
          skillBonus: "logic",
        },
        {
          text: "राम मृग का पीछा करते हैं लेकिन निर्देश छोड़ जाते हैं",
          outcome:
            "मृग का पीछा करने से पहले, राम लक्ष्मण को हर कीमत पर सीता की रक्षा करने का निर्देश देते हैं। हालांकि वह जाल में फंस जाते हैं, उनकी दूरदर्शिता यह सुनिश्चित करती है कि एक योजना है, जो तैयारी के महत्व को दिखाती है।",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
        {
          text: "राम लक्ष्मण को भेजते हैं",
          outcome:
            "राम कार्य को सौंपते हैं जबकि स्वयं सीता की रक्षा के लिए रहते हैं। यह आंशिक रूप से प्रभावी साबित होता है, क्योंकि रावण को अपनी योजना के साथ आगे बढ़ने के लिए अधिक छल का उपयोग करना पड़ता है।",
          wisdomPoints: 2,
          skillBonus: "attention",
        },
      ],
      puzzle: {
        type: "attention",
        difficulty: 3,
        instructions: "इस वन दृश्य में छिपे राक्षसों को खोजें।",
        content: {
          image: "/placeholder.svg?height=400&width=600",
          hiddenItems: [
            { id: 1, name: "पेड़ में राक्षस", coordinates: { x: 120, y: 200 }, radius: 30 },
            { id: 2, name: "सर्प राक्षस", coordinates: { x: 350, y: 300 }, radius: 25 },
            { id: 3, name: "छाया राक्षस", coordinates: { x: 500, y: 150 }, radius: 35 },
            { id: 4, name: "जल राक्षस", coordinates: { x: 200, y: 350 }, radius: 30 },
          ],
        },
      },
    },
    {
      title: "सीता की खोज",
      background: "/placeholder.svg?height=300&width=600",
      narrative:
        "रावण द्वारा सीता का अपहरण करने के बाद, राम और लक्ष्मण निराशापूर्वक उनकी खोज करते हैं। उन्हें जटायु मिलता है, एक प्राचीन पक्षी जिसने रावण को रोकने की कोशिश की थी। घायल होने के बावजूद, जटायु उन्हें बताता है कि रावण सीता को दक्षिण की ओर ले गया है। अपनी यात्रा जारी रखते हुए, वे हनुमान से मिलते हैं, शक्तिशाली वानर योद्धा।",
      choices: [
        {
          text: "राम वानर राज्य के साथ गठबंधन बनाते हैं",
          outcome:
            "राम की राजनयिक कौशल शक्तिशाली सहयोगियों को सुरक्षित करता है। हनुमान और वानर सेना के साथ, सीता को खोजना संभव हो जाता है, जो सहयोग से आने वाली शक्ति को दिखाता है।",
          wisdomPoints: 3,
          skillBonus: "logic",
        },
        {
          text: "राम अपनी पूरी कहानी हनुमान के साथ साझा करते हैं",
          outcome:
            "हनुमान के साथ खुलकर, राम गहरी निष्ठा बनाते हैं। राम की ईमानदारी और पीड़ा से प्रभावित होकर, हनुमान अपने जीवन को उनके कारण के लिए समर्पित करते हैं, राम के सबसे समर्पित सेवक बनते हैं।",
          wisdomPoints: 2,
          skillBonus: "memory",
        },
        {
          text: "राम सीता के लिए एक प्रतीक के रूप में हनुमान को अपनी अंगूठी देते हैं",
          outcome:
            "राम की विचारशीलता सीता को यह जानने का एक तरीका प्रदान करती है कि कोई भी संदेशवाहक वास्तविक है। यह छोटा विवरण महत्वपूर्ण हो जाता है जब हनुमान अंततः उन्हें लंका में पाते हैं।",
          wisdomPoints: 3,
          skillBonus: "attention",
        },
      ],
      puzzle: {
        type: "logic",
        difficulty: 3,
        instructions: "इस पहेली को हल करके हनुमान को लंका का सबसे अच्छा मार्ग निर्धारित करने में मदद करें।",
        content: {
          puzzle: "logic_puzzle",
          clues: [
            "समुद्र के पार सीधा मार्ग 100 योजन लंबा है।",
            "हनुमान बड़ी दूरी तक कूद सकते हैं लेकिन कूदों के बीच आराम करना चाहिए।",
            "आराम के लिए उपयोग कर सकते हैं ऐसे तीन छोटे द्वीप हैं।",
            "पूर्वी मार्ग में अधिक द्वीप हैं लेकिन कुल मिलाकर यह लंबा है।",
            "पश्चिमी मार्ग में मजबूत हवाएं हैं जो मदद या बाधा दे सकती हैं।",
          ],
          options: [
            { id: 1, text: "बिना रुके सीधे दक्षिणी मार्ग लें" },
            { id: 2, text: "कई विश्राम के साथ पूर्वी द्वीप श्रृंखला का उपयोग करें" },
            { id: 3, text: "अनुकूल हवाओं के साथ पश्चिमी मार्ग लें" },
            { id: 4, text: "पर्वत शिखर से लंका तक एक विशाल छलांग लगाएं" },
          ],
          correctAnswer: 4,
        },
      },
    },
  ],
}

// Helper function to get game content based on language
export function getGameContent(language: string) {
  return language === "hindi" ? gameContent.hindi : gameContent.english
}

