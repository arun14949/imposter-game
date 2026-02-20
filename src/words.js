// Words shared across all categories — everyday, universally known
const COMMON = [
  "Sunglasses","Umbrella","Birthday","Homework","Traffic","Selfie","Password","Vacation","Breakfast","Midnight",
  "Rainbow","Elevator","Mosquito","Toothbrush","Charger","Pillow","Gossip","Laundry","Sneeze","Hangover",
  "Photobomb","Alarm Clock","Remote Control","Bubble Wrap","Speed Bump","Déjà Vu","Awkward Silence","Monday Morning",
  "Autocorrect","WiFi","Screenshot","Notification","Emoji","Playlist","Meme","Hashtag","Ringtone","Battery",
  "Sunburn","Pothole","Queue","Receipt","Sticker","Magnet","Keychain","Bookmark","Napkin","Doorbell"
];

export const WORDS = {
  Animals: [
    "Elephant","Tiger","Penguin","Dolphin","Giraffe","Kangaroo","Octopus","Flamingo","Chameleon","Panda",
    "Cheetah","Gorilla","Seahorse","Peacock","Koala","Platypus","Armadillo","Hedgehog","Wolverine","Toucan",
    "Jaguar","Bison","Iguana","Otter","Falcon","Parrot","Cobra","Pelican","Porcupine","Sloth",
    "Walrus","Narwhal","Meerkat","Hyena","Llama","Vulture","Starfish","Scorpion","Beetle","Raccoon",
    "Hamster","Swan","Moose","Coyote","Mantis","Lobster","Buffalo","Gazelle","Macaw","Badger",
    "Ferret","Lemur","Wombat","Stingray","Salamander","Chinchilla","Capybara","Manatee","Axolotl","Quail",
    ...COMMON
  ],
  Food: [
    "Pizza","Sushi","Burrito","Waffle","Pretzel","Croissant","Lasagna","Dumpling","Pancake","Brownie",
    "Guacamole","Tiramisu","Ramen","Churro","Falafel","Macaron","Risotto","Kebab","Mochi","Gelato",
    "Taco","Baklava","Fondue","Popcorn","Cheesecake","Empanada","Hummus","Ceviche","Samosa","Cannoli",
    "Edamame","Paella","Gnocchi","Tempura","Bruschetta","Poutine","Naan","Baguette","Scone","Pierogi",
    "Croquette","Granola","Kimchi","Wonton","Quesadilla","Gazpacho","Brioche","Soufflé","Gyoza","Tartare",
    "Cornbread","Pesto","Ravioli","Sorbet","Croûton","Biscotti","Couscous","Muffin","Praline","Strudel",
    ...COMMON
  ],
  Places: [
    "Volcano","Lighthouse","Pyramid","Castle","Waterfall","Glacier","Treehouse","Observatory","Colosseum","Bazaar",
    "Monastery","Vineyard","Carnival","Stadium","Aquarium","Planetarium","Dungeon","Rooftop","Subway","Airport",
    "Harbor","Oasis","Canyon","Cavern","Boardwalk","Palace","Cathedral","Pagoda","Ruins","Lagoon",
    "Jungle","Tundra","Savanna","Reef","Crater","Marsh","Plateau","Fjord","Ravine","Archipelago",
    "Catacombs","Fortress","Balcony","Penthouse","Attic","Basement","Courtyard","Terrace","Warehouse","Gallery",
    "Library","Theater","Diner","Marina","Chapel","Pier","Gazebo","Alley","Bridge","Tunnel",
    ...COMMON
  ],
  Objects: [
    "Telescope","Compass","Hourglass","Lantern","Umbrella","Typewriter","Binoculars","Kaleidoscope","Metronome","Pendulum",
    "Anchor","Suitcase","Candelabra","Gramophone","Monocle","Sextant","Periscope","Abacus","Sundial","Bellows",
    "Thimble","Locket","Spyglass","Anvil","Quill","Scepter","Gavel","Prism","Magnifier","Whistle",
    "Harmonica","Tambourine","Accordion","Boomerang","Dreamcatcher","Pinwheel","Snowglobe","Marionette","Matryoshka","Origami",
    "Zipline","Trampoline","Hammock","Chandelier","Gargoyle","Totem","Figurine","Relic","Fossil","Blueprint",
    "Loom","Spindle","Chisel","Belljar","Terrarium","Gyroscope","Astrolabe","Zoetrope","Pantograph","Sextant",
    ...COMMON
  ],
  Actions: [
    "Skydiving","Surfing","Juggling","Yodeling","Snorkeling","Moonwalking","Beatboxing","Sleepwalking","Bungee Jumping","Fencing",
    "Archery","Karate","Limbo","Salsa","Breakdancing","Whistling","Cartwheeling","Somersault","Tightrope","Skiing",
    "Kayaking","Rappelling","Paragliding","Horseback Riding","Arm Wrestling","Yoga","Meditation","Gardening","Sculpting","Painting",
    "Knitting","Welding","Blacksmithing","Pottery","Glassblowing","Calligraphy","Origami","Woodworking","Embroidery","Tattooing",
    "Stargazing","Birdwatching","Mushroom Hunting","Treasure Hunting","Spelunking","Sandcastle Building","Kite Flying","Ice Skating","Snowboarding","Rock Climbing",
    "Trampolining","Lasso Throwing","Fire Eating","Sword Swallowing","Ventriloquism","Contortion","Tango","Polka","Flamenco","Tapdancing",
    ...COMMON
  ],
  Malayalam: [
    // Iconic movies
    "Drishyam","Premam","Bangalore Days","Kumbalangi Nights","Virus","Maheshinte Prathikaaram",
    "Ustad Hotel","Charlie","Thattathin Marayathu","Oru Vadakkan Selfie","Ayyappanum Koshiyum",
    "Minnal Murali","Jaya Jaya Jaya Jaya Hey","Romancham","Manjummel Boys","Bramayugam",
    "CID Moosa","Manichitrathazhu","Kireedam","Nadodikkattu","Godfather","In Harihar Nagar",
    "Spadikam","Devasuram","Chithram","Boeing Boeing","Vietnam Colony","Ramji Rao Speaking",
    "Aaraam Thampuran","Narasimham","Classmates","Anuraga Karikkin Vellam","Sudani from Nigeria",
    "The Great Indian Kitchen","Jallikattu","Kunjiramayanam","Aadu","Ambili",
    // Actors & directors
    "Mohanlal","Mammootty","Fahadh Faasil","Dulquer Salmaan","Tovino Thomas","Nivin Pauly",
    "Prithviraj","Jayaram","Dileep","Suresh Gopi","Manju Warrier","Parvathy","Nazriya",
    "Aishwarya Lekshmi","Basil Joseph","Dileesh Pothan","Lijo Jose Pellissery","Jeethu Joseph",
    "Sreenivasan","Innocent","Jagathy Sreekumar","Harisree Ashokan","Salim Kumar","Vineeth Sreenivasan",
    // Iconic dialogues & references
    "Ayyappanum Koshiyum Fight","Pulimurugan","Lucifer","Empuraan",
    "Appangal Embadum","Entammede Jimikki Kammal","Thaikkudam Bridge",
    // Music & pop culture
    "Gopi Sundar","Sushin Shyam","Prashant Pillai","Bijibal",
    "Kappa","Porotta","Toddy Shop","Mundu","Lungi","Onam","Vishu","Theyyam","Kathakali","Thiruvathira",
    "Boat Race","Thrissur Pooram","Maveli","Kerala Blasters","Sachin's Blasters",
    // Food & culture
    "Sadhya","Payasam","Puttu","Appam","Dosa Kadai","Fish Curry","Beef Fry","Parotta Beef",
    "Chayakada","Kallumakkaya","Tapioca","Banana Chips","Halwa","Unniappam","Ela Ada",
    ...COMMON
  ]
};

export const CATEGORIES = ["Random", "Animals", "Food", "Places", "Objects", "Actions", "Malayalam"];
