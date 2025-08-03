
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Coins, ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const gifts = {
  hot: [
    { name: "Rose", price: 10, image: "https://em-content.zobj.net/source/apple/391/rose_1f339.png" },
    { name: "Heart", price: 20, image: "https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png" },
    { name: "Fire", price: 30, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png" },
    { name: "Kiss", price: 40, image: "https://em-content.zobj.net/source/apple/391/kiss-mark_1f48b.png" },
    { name: "Lipstick", price: 50, image: "https://em-content.zobj.net/source/apple/391/lipstick_1f484.png" },
    { name: "Ring", price: 100, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png" },
    { name: "Crown", price: 500, image: "https://em-content.zobj.net/source/apple/391/crown_1f451.png" },
    { name: "Diamond", price: 1000, image: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png" },
    { name: "Perfume", price: 60, image: "https://em-content.zobj.net/source/apple/391/perfume_1f4e0.png" }, // Placeholder replaced
    { name: "High Heel", price: 70, image: "https://em-content.zobj.net/source/apple/391/high-heeled-shoe_1f460.png" },
    { name: "Chocolate", price: 15, image: "https://em-content.zobj.net/source/apple/391/chocolate-bar_1f36b.png" },
    { name: "Lollipop", price: 5, image: "https://em-content.zobj.net/source/apple/391/lollipop_1f36d.png" },
    { name: "Star", price: 25, image: "https://em-content.zobj.net/source/apple/391/star_2b50.png" },
    { name: "Unicorn", price: 250, image: "https://em-content.zobj.net/source/apple/391/unicorn_1f984.png" },
    { name: "Rainbow", price: 150, image: "https://em-content.zobj.net/source/apple/391/rainbow_1f308.png" },
    { name: "Butterfly", price: 80, image: "https://em-content.zobj.net/source/apple/391/butterfly_1f98b.png" },
    { name: "Sparkles", price: 35, image: "https://em-content.zobj.net/source/apple/391/sparkles_2728.png" },
    { name: "Cherry", price: 12, image: "https://em-content.zobj.net/source/apple/391/cherries_1f352.png" },
    { name: "Music Note", price: 18, image: "https://em-content.zobj.net/source/apple/391/musical-notes_1f3b6.png" },
    { name: "Microphone", price: 90, image: "https://em-content.zobj.net/source/apple/391/microphone_1f3a4.png" },
    { name: "Headphones", price: 120, image: "https://em-content.zobj.net/source/apple/391/headphone_1f3a7.png" },
    { name: "Pizza", price: 22, image: "https://em-content.zobj.net/source/apple/391/pizza_1f355.png" },
    { name: "Taco", price: 20, image: "https://em-content.zobj.net/source/apple/391/taco_1f32e.png" },
    { name: "Cocktail", price: 45, image: "https://em-content.zobj.net/source/apple/391/cocktail-glass_1f378.png" },
    { name: "Sunglasses", price: 55, image: "https://em-content.zobj.net/source/apple/391/sunglasses_1f576-fe0f.png" },
    { name: "Magic Wand", price: 110, image: "https://em-content.zobj.net/source/apple/391/magic-wand_1fa84.png" },
    { name: "Crystal Ball", price: 130, image: "https://em-content.zobj.net/source/apple/391/crystal-ball_1f52e.png" },
    { name: "Moon", price: 65, image: "https://em-content.zobj.net/source/apple/391/crescent-moon_1f319.png" },
    { name: "Planet", price: 180, image: "https://em-content.zobj.net/source/apple/391/ringed-planet_1fa90.png" },
    { name: "Alien", price: 200, image: "https://em-content.zobj.net/source/apple/391/alien_1f47d.png" },
    { name: "Ghost", price: 28, image: "https://em-content.zobj.net/source/apple/391/ghost_1f47b.png" },
    { name: "Robot", price: 300, image: "https://em-content.zobj.net/source/apple/391/robot_1f916.png" },
    { name: "Dragon", price: 800, image: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png" },
    { name: "Fairy", price: 400, image: "https://em-content.zobj.net/source/apple/391/fairy_1f9da.png" },
    { name: "Genie", price: 450, image: "https://em-content.zobj.net/source/apple/391/genie_1f9de.png" },
    { name: "Mermaid", price: 420, image: "https://em-content.zobj.net/source/apple/391/mermaid_1f9dc.png" },
    { name: "Vampire", price: 380, image: "https://em-content.zobj.net/source/apple/391/vampire_1f9db.png" },
    { name: "Wizard", price: 480, image: "https://em-content.zobj.net/source/apple/391/mage_1f9d9.png" },
    { name: "Elf", price: 350, image: "https://em-content.zobj.net/source/apple/391/elf_1f9dd.png" },
    { name: "Angel", price: 550, image: "https://em-content.zobj.net/source/apple/391/baby-angel_1f47c.png" },
    { name: "King", price: 600, image: "https://em-content.zobj.net/source/apple/391/man-in-tuxedo_1f935.png" },
    { name: "Queen", price: 600, image: "https://em-content.zobj.net/source/apple/391/woman-with-veil_1f470.png" },
    { name: "Key", price: 75, image: "https://em-content.zobj.net/source/apple/391/key_1f511.png" },
    { name: "Lock", price: 75, image: "https://em-content.zobj.net/source/apple/391/locked_1f512.png" },
    { name: "Treasure Chest", price: 1200, image: "https://em-content.zobj.net/source/apple/391/treasure-chest_1f381.png" },
    { name: "Medal", price: 220, image: "https://em-content.zobj.net/source/apple/391/sports-medal_1f3c5.png" },
    { name: "Trophy", price: 750, image: "https://em-content.zobj.net/source/apple/391/trophy_1f3c6.png" },
    { name: "Guitar", price: 280, image: "https://em-content.zobj.net/source/apple/391/guitar_1f3b8.png" },
    { name: "Violin", price: 320, image: "https://em-content.zobj.net/source/apple/391/violin_1f3bb.png" },
  ],
  event: [
    { name: "Cake", price: 100, image: "https://em-content.zobj.net/source/apple/391/birthday-cake_1f382.png" },
    { name: "Confetti", price: 20, image: "https://em-content.zobj.net/source/apple/391/confetti-ball_1f38a.png" },
    { name: "Balloon", price: 15, image: "https://em-content.zobj.net/source/apple/391/balloon_1f388.png" },
    { name: "Gift Box", price: 50, image: "https://em-content.zobj.net/source/apple/391/wrapped-gift_1f381.png" },
    { name: "Party Popper", price: 25, image: "https://em-content.zobj.net/source/apple/391/party-popper_1f389.png" },
    { name: "Fireworks", price: 150, image: "https://em-content.zobj.net/source/apple/391/fireworks_1f386.png" },
    { name: "New Year", price: 200, image: "https://em-content.zobj.net/source/apple/391/sparkler_1f387.png" },
    { name: "Christmas Tree", price: 180, image: "https://em-content.zobj.net/source/apple/391/christmas-tree_1f384.png" },
    { name: "Santa Claus", price: 500, image: "https://em-content.zobj.net/source/apple/391/santa-claus_1f385.png" },
    { name: "Snowman", price: 120, image: "https://em-content.zobj.net/source/apple/391/snowman-without-snow_26c4.png" },
    { name: "Jack-o'-lantern", price: 80, image: "https://em-content.zobj.net/source/apple/391/jack-o-lantern_1f383.png" },
    { name: "Red Envelope", price: 30, image: "https://em-content.zobj.net/source/apple/391/red-envelope_1f9e7.png" },
    { name: "Carp Streamer", price: 60, image: "https://em-content.zobj.net/source/apple/391/carp-streamer_1f38f.png" },
    { name: "Dolls", price: 70, image: "https://em-content.zobj.net/source/apple/391/japanese-dolls_1f38e.png" },
    { name: "Wind Chime", price: 40, image: "https://em-content.zobj.net/source/apple/391/wind-chime_1f390.png" },
    { name: "Moon Viewing", price: 90, image: "https://em-content.zobj.net/source/apple/391/moon-viewing-ceremony_1f391-fe0f.png" },
    { name: "Ribbon", price: 10, image: "https://em-content.zobj.net/source/apple/391/ribbon_1f380.png" },
    { name: "Graduation Cap", price: 250, image: "https://em-content.zobj.net/source/apple/391/graduation-cap_1f393.png" },
    { name: "Carnival Mask", price: 110, image: "https://em-content.zobj.net/source/apple/391/performing-arts_1f3ad.png" }, // Placeholder replaced
    { name: "Wedding Rings", price: 1000, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png" },
    { name: "Champagne", price: 300, image: "https://em-content.zobj.net/source/apple/391/bottle-with-popping-cork_1f37e.png" },
    { name: "Love Letter", price: 45, image: "https://em-content.zobj.net/source/apple/391/love-letter_1f48c.png" },
    { name: "Heart with Arrow", price: 55, image: "https://em-content.zobj.net/source/apple/391/heart-with-arrow_1f498.png" },
    { name: "Bouquet", price: 130, image: "https://em-content.zobj.net/source/apple/391/bouquet_1f490.png" },
    { name: "Shamrock", price: 22, image: "https://em-content.zobj.net/source/apple/391/shamrock_2618-fe0f.png" },
    { name: "Maple Leaf", price: 18, image: "https://em-content.zobj.net/source/apple/391/maple-leaf_1f341.png" },
    { name: "Fallen Leaf", price: 12, image: "https://em-content.zobj.net/source/apple/391/fallen-leaf_1f342.png" },
    { name: "Easter Egg", price: 33, image: "https://em-content.zobj.net/source/apple/391/egg_1f95a.png" }, // Placeholder replaced
    { name: "Turkey", price: 160, image: "https://em-content.zobj.net/source/apple/391/turkey_1f983.png" },
    { name: "Cornucopia", price: 140, image: "https://em-content.zobj.net/source/apple/391/amphora_1f3fa.png" }, // Placeholder replaced
    { name: "Diya Lamp", price: 44, image: "https://em-content.zobj.net/source/apple/391/diya-lamp_1fa94.png" },
    { name: "Megaphone", price: 66, image: "https://em-content.zobj.net/source/apple/391/megaphone_1f4e3.png" },
    { name: "Ticket", price: 8, image: "https://em-content.zobj.net/source/apple/391/ticket_1f3ab.png" },
    { name: "Clapper Board", price: 88, image: "https://em-content.zobj.net/source/apple/391/clapper-board_1f3ac.png" },
    { name: "Film Projector", price: 222, image: "https://em-content.zobj.net/source/apple/391/film-projector_1f4fd-fe0f.png" },
    { name: "Video Game", price: 111, image: "https://em-content.zobj.net/source/apple/391/video-game_1f3ae.png" },
    { name: "Joker", price: 77, image: "https://em-content.zobj.net/source/apple/391/joker_1f0cf.png" },
    { name: "Mahjong", price: 99, image: "https://em-content.zobj.net/source/apple/391/mahjong-red-dragon_1f004.png" },
    { name: "Chess Pawn", price: 11, image: "https://em-content.zobj.net/source/apple/391/chess-pawn_265f-fe0f.png" },
    { name: "Bullseye", price: 101, image: "https://em-content.zobj.net/source/apple/391/bullseye_1f3af.png" },
    { name: "Bowling", price: 69, image: "https://em-content.zobj.net/source/apple/391/bowling_1f3b3.png" },
    { name: "Slot Machine", price: 777, image: "https://em-content.zobj.net/source/apple/391/slot-machine_1f3b0.png" },
    { name: "Lottery Ticket", price: 5, image: "https://em-content.zobj.net/source/apple/391/admission-tickets_1f39f-fe0f.png" }, // Placeholder replaced
    { name: "Teddy Bear", price: 125, image: "https://em-content.zobj.net/source/apple/391/teddy-bear_1f9f8.png" },
    { name: "Pinata", price: 135, image: "https://em-content.zobj.net/source/apple/391/pi_c3_b1ata_1fa85.png" },
    { name: "Nazar Amulet", price: 85, image: "https://em-content.zobj.net/source/apple/391/nazar-amulet_1f9ff.png" },
    { name: "Ballet Shoes", price: 155, image: "https://em-content.zobj.net/source/apple/391/ballet-shoes_1fa70.png" },
    { name: "Prayer Beads", price: 95, image: "https://em-content.zobj.net/source/apple/391/prayer-beads_1f4ff.png" },
    { name: "Dove", price: 175, image: "https://em-content.zobj.net/source/apple/391/dove_1f54a-fe0f.png" },
  ],
  luxury: [
    { name: "Car", price: 10000, image: "https://em-content.zobj.net/source/apple/391/racing-car_1f3ce-fe0f.png" },
    { name: "Yacht", price: 50000, image: "https://em-content.zobj.net/source/apple/391/speedboat_1f6a4.png" },
    { name: "Helicopter", price: 80000, image: "https://em-content.zobj.net/source/apple/391/helicopter_1f681.png" },
    { name: "Private Jet", price: 200000, image: "https://em-content.zobj.net/source/apple/391/airplane_2708-fe0f.png" },
    { name: "Mansion", price: 500000, image: "https://em-content.zobj.net/source/apple/391/house_1f3e0.png" },
    { name: "Castle", price: 1000000, image: "https://em-content.zobj.net/source/apple/391/castle_1f3f0.png" },
    { name: "Island", price: 5000000, image: "https://em-content.zobj.net/source/apple/391/desert-island_1f3dd-fe0f.png" },
    { name: "Diamond Ring", price: 25000, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png" },
    { name: "Gold Bars", price: 100000, image: "https://em-content.zobj.net/source/apple/391/dollar-banknote_1f4b5.png" }, // Placeholder replaced
    { name: "Money Bag", price: 5000, image: "https://em-content.zobj.net/source/apple/391/money-bag_1f4b0.png" },
    { name: "Credit Card", price: 1000, image: "https://em-content.zobj.net/source/apple/391/credit-card_1f4b3.png" },
    { name: "Watch", price: 15000, image: "https://em-content.zobj.net/source/apple/391/watch_231a.png" },
    { name: "Briefcase", price: 2000, image: "https://em-content.zobj.net/source/apple/391/briefcase_1f4bc.png" },
    { name: "Fountain Pen", price: 800, image: "https://em-content.zobj.net/source/apple/391/fountain-pen_1f58b-fe0f.png" },
    { name: "Cigar", price: 500, image: "https://em-content.zobj.net/source/apple/391/cigarette_1f6ac.png" },
    { name: "Whiskey", price: 1200, image: "https://em-content.zobj.net/source/apple/391/tumbler-glass_1f943.png" },
    { name: "Caviar", price: 3000, image: "https://em-content.zobj.net/source/apple/391/canned-food_1f96b.png" }, // Placeholder replaced
    { name: "Sake", price: 900, image: "https://em-content.zobj.net/source/apple/391/sake_1f376.png" },
    { name: "Pearls", price: 18000, image: "https://em-content.zobj.net/source/apple/391/prayer-beads_1f4ff.png" }, // Placeholder replaced
    { name: "Top Hat", price: 600, image: "https://em-content.zobj.net/source/apple/391/top-hat_1f3a9.png" },
    { name: "Billiards", price: 4000, image: "https://em-content.zobj.net/source/apple/391/pool-8-ball_1f3b1.png" },
    { name: "Motorcycle", price: 12000, image: "https://em-content.zobj.net/source/apple/391/motorcycle_1f3cd-fe0f.png" },
    { name: "Scuba Mask", price: 1500, image: "https://em-content.zobj.net/source/apple/391/diving-mask_1f93f.png" },
    { name: "Skyscraper", price: 800000, image: "https://em-content.zobj.net/source/apple/391/skyscraper_1f3d9-fe0f.png" },
    { name: "Statue of Liberty", price: 1200000, image: "https://em-content.zobj.net/source/apple/391/statue-of-liberty_1f5fd.png" },
    { name: "Tokyo Tower", price: 1100000, image: "https://em-content.zobj.net/source/apple/391/tokyo-tower_1f5fc.png" },
    { name: "Eiffel Tower", price: 1500000, image: "https://em-content.zobj.net/source/apple/391/eiffel-tower_1f5fc.png" }, // Placeholder replaced
    { name: "Spaceship", price: 2500000, image: "https://em-content.zobj.net/source/apple/391/flying-saucer_1f6f8.png" },
    { name: "Satellite", price: 750000, image: "https://em-content.zobj.net/source/apple/391/satellite_1f6f0-fe0f.png" },
    { name: "T-Rex", price: 300000, image: "https://em-content.zobj.net/source/apple/391/t-rex_1f996.png" },
    { name: "Brontosaurus", price: 280000, image: "https://em-content.zobj.net/source/apple/391/sauropod_1f995.png" },
    { name: "Meteor", price: 400000, image: "https://em-content.zobj.net/source/apple/391/comet_2604-fe0f.png" },
    { name: "Volcano", price: 350000, image: "https://em-content.zobj.net/source/apple/391/volcano_1f30b.png" },
    { name: "Bank", price: 600000, image: "https://em-content.zobj.net/source/apple/391/bank_1f3e6.png" },
    { name: "Diamond Heart", price: 35000, image: "https://em-content.zobj.net/source/apple/391/sparkling-heart_1f496.png" },
    { name: "Golden Key", price: 5000, image: "https://em-content.zobj.net/source/apple/391/key_1f511.png" },
    { name: "Platinum Disc", price: 22000, image: "https://em-content.zobj.net/source/apple/391/dvd_1f4c0.png" }, // Placeholder replaced
    { name: "Royal Carriage", price: 90000, image: "https://em-content.zobj.net/source/apple/391/horse-racing_1f3c7.png" }, // Placeholder replaced
    { name: "Throne", price: 65000, image: "https://em-content.zobj.net/source/apple/391/chair_1fa91.png" },
    { name: "Scepter", price: 30000, image: "https://em-content.zobj.net/source/apple/391/magic-wand_1fa84.png" }, // Placeholder replaced
    { name: "Faberge Egg", price: 45000, image: "https://em-content.zobj.net/source/apple/391/egg_1f95a.png" }, // Placeholder replaced
    { name: "Antique Vase", price: 28000, image: "https://em-content.zobj.net/source/apple/391/amphora_1f3fa.png" },
    { name: "World Map", price: 10000, image: "https://em-content.zobj.net/source/apple/391/world-map_1f5fa-fe0f.png" },
    { name: "Telescope", price: 7500, image: "https://em-content.zobj.net/source/apple/391/telescope_1f52d.png" },
    { name: "Microscope", price: 7000, image: "https://em-content.zobj.net/source/apple/391/microscope_1f52c.png" },
    { name: "Piano", price: 40000, image: "https://em-content.zobj.net/source/apple/391/musical-keyboard_1f3b9.png" },
    { name: "Harp", price: 32000, image: "https://em-content.zobj.net/source/apple/391/violin_1f3bb.png" }, // Placeholder replaced
    { name: "Saxophone", price: 26000, image: "https://em-content.zobj.net/source/apple/391/saxophone_1f3b7.png" },
    { name: "Trumpet", price: 24000, image: "https://em-content.zobj.net/source/apple/391/trumpet_1f3ba.png" },
  ],
  family: [
    { name: "Teddy Bear", price: 50, image: "https://em-content.zobj.net/source/apple/391/teddy-bear_1f9f8.png" },
    { name: "Baby Bottle", price: 10, image: "https://em-content.zobj.net/source/apple/391/baby-bottle_1f37c.png" },
    { name: "House", price: 200, image: "https://em-content.zobj.net/source/apple/391/house_1f3e0.png" },
    { name: "Dog", price: 100, image: "https://em-content.zobj.net/source/apple/391/dog_1f415.png" },
    { name: "Cat", price: 100, image: "https://em-content.zobj.net/source/apple/391/cat_1f408.png" },
    { name: "Baby Chick", price: 30, image: "https://em-content.zobj.net/source/apple/391/front-facing-baby-chick_1f425.png" },
    { name: "Family", price: 500, image: "https://em-content.zobj.net/source/apple/391/family-man-woman-girl-boy_1f468-200d-1f469-200d-1f467-200d-1f466.png" },
    { name: "Couple", price: 250, image: "https://em-content.zobj.net/source/apple/391/couple-with-heart_1f491.png" },
    { name: "Yarn", price: 20, image: "https://em-content.zobj.net/source/apple/391/yarn_1f9f6.png" },
    { name: "Sewing Needle", price: 15, image: "https://em-content.zobj.net/source/apple/391/sewing-needle_1faa1.png" },
    { name: "Scarf", price: 40, image: "https://em-content.zobj.net/source/apple/391/scarf_1f9e3.png" },
    { name: "Gloves", price: 35, image: "https://em-content.zobj.net/source/apple/391/gloves_1f9e4.png" },
    { name: "Coat", price: 80, image: "https://em-content.zobj.net/source/apple/391/coat_1f9e5.png" },
    { name: "Socks", price: 12, image: "https://em-content.zobj.net/source/apple/391/socks_1f9e6.png" },
    { name: "Pancakes", price: 25, image: "https://em-content.zobj.net/source/apple/391/pancakes_1f95e.png" },
    { name: "Waffle", price: 28, image: "https://em-content.zobj.net/source/apple/391/waffle_1f9c7.png" },
    { name: "Honey Pot", price: 33, image: "https://em-content.zobj.net/source/apple/391/honey-pot_1f36f.png" },
    { name: "Milk", price: 8, image: "https://em-content.zobj.net/source/apple/391/glass-of-milk_1f95b.png" },
    { name: "Bread", price: 5, image: "https://em-content.zobj.net/source/apple/391/bread_1f35e.png" },
    { name: "Cheese", price: 18, image: "https://em-content.zobj.net/source/apple/391/cheese-wedge_1f9c0.png" },
    { name: "Apple", price: 3, image: "https://em-content.zobj.net/source/apple/391/red-apple_1f34e.png" },
    { name: "Watermelon", price: 7, image: "https://em-content.zobj.net/source/apple/391/watermelon_1f349.png" },
    { name: "Book", price: 22, image: "https://em-content.zobj.net/source/apple/391/open-book_1f4d6.png" },
    { name: "Seedling", price: 9, image: "https://em-content.zobj.net/source/apple/391/seedling_1f331.png" },
    { name: "Evergreen Tree", price: 44, image: "https://em-content.zobj.net/source/apple/391/evergreen-tree_1f332.png" },
    { name: "Deciduous Tree", price: 44, image: "https://em-content.zobj.net/source/apple/391/deciduous-tree_1f333.png" },
    { name: "Palm Tree", price: 55, image: "https://em-content.zobj.net/source/apple/391/palm-tree_1f334.png" },
    { name: "Cactus", price: 19, image: "https://em-content.zobj.net/source/apple/391/cactus_1f335.png" },
    { name: "Flower", price: 6, image: "https://em-content.zobj.net/source/apple/391/blossom_1f33c.png" },
    { name: "Sunflower", price: 11, image: "https://em-content.zobj.net/source/apple/391/sunflower_1f33b.png" },
    { name: "Tulip", price: 13, image: "https://em-content.zobj.net/source/apple/391/tulip_1f337.png" },
    { name: "Hibiscus", price: 14, image: "https://em-content.zobj.net/source/apple/391/hibiscus_1f33a.png" },
    { name: "Soap", price: 4, image: "https://em-content.zobj.net/source/apple/391/soap_1f9fc.png" },
    { name: "Sponge", price: 2, image: "https://em-content.zobj.net/source/apple/391/sponge_1f9fd.png" },
    { name: "Basket", price: 16, image: "https://em-content.zobj.net/source/apple/391/basket_1f9fa.png" },
    { name: "Roll of Paper", price: 1, image: "https://em-content.zobj.net/source/apple/391/roll-of-paper_1f9fb.png" },
    { name: "Broom", price: 21, image: "https://em-content.zobj.net/source/apple/391/broom_1f9f9.png" },
    { name: "Rocking Chair", price: 110, image: "https://em-content.zobj.net/source/apple/391/chair_1fa91.png" }, // Placeholder replaced
    { name: "Fireplace", price: 220, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png" }, // Placeholder replaced
    { name: "Photo Frame", price: 38, image: "https://em-content.zobj.net/source/apple/391/frame-with-picture_1f5bc-fe0f.png" }, // Placeholder replaced
    { name: "Kite", price: 29, image: "https://em-content.zobj.net/source/apple/391/kite_1fa81.png" },
    { name: "Puzzle Piece", price: 17, image: "https://em-content.zobj.net/source/apple/391/puzzle-piece_1f9e9.png" },
    { name: "Nesting Dolls", price: 105, image: "https://em-content.zobj.net/source/apple/391/nesting-dolls_1fa86.png" },
    { name: "Safety Pin", price: 1, image: "https://em-content.zobj.net/source/apple/391/safety-pin_1f9f7.png" },
    { name: "Abacus", price: 31, image: "https://em-content.zobj.net/source/apple/391/abacus_1f9ee.png" },
    { name: "Toolbox", price: 62, image: "https://em-content.zobj.net/source/apple/391/toolbox_1f9f0.png" },
    { name: "Magnet", price: 23, image: "https://em-content.zobj.net/source/apple/391/magnet_1f9f2.png" },
    { name: "Test Tube", price: 27, image: "https://em-content.zobj.net/source/apple/391/test-tube_1f9ea.png" },
    { name: "Petri Dish", price: 26, image: "https://em-content.zobj.net/source/apple/391/petri-dish_1f9eb.png" },
  ]
};

type GiftCategory = keyof typeof gifts;

export function GiftPanel() {
  const [selectedGift, setSelectedGift] = useState<(typeof gifts.hot)[0] | null>(gifts.hot[0]);
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState("All");

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  }

  return (
    <div className="absolute inset-0 bg-[#1F0A2E]/90 backdrop-blur-sm flex flex-col p-2 rounded-t-lg">
      <Tabs defaultValue="hot" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="bg-transparent p-0 justify-start gap-4 border-b border-white/10">
          <TabsTrigger value="hot" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">Hot</TabsTrigger>
          <TabsTrigger value="event" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">Event</TabsTrigger>
          <TabsTrigger value="luxury" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">Luxury</TabsTrigger>
          <TabsTrigger value="family" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">Family</TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1 my-2">
            {(Object.keys(gifts) as GiftCategory[]).map(category => (
                 <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-4 gap-3">
                        {gifts[category].map(gift => (
                            <div 
                                key={gift.name} 
                                className={cn(
                                    "flex flex-col items-center gap-1 p-1 rounded-lg cursor-pointer border-2",
                                    selectedGift?.name === gift.name ? "border-primary bg-primary/20" : "border-transparent"
                                )}
                                onClick={() => setSelectedGift(gift)}
                            >
                                <div className="w-12 h-12 relative">
                                    <Image src={gift.image} alt={gift.name} width={64} height={64} data-ai-hint={gift.hint} />
                                </div>
                                <p className="text-xs truncate">{gift.name}</p>
                                <div className="flex items-center gap-1 text-xs text-yellow-400">
                                    <Coins className="w-3 h-3"/>
                                    <span>{gift.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            ))}
        </ScrollArea>
      </Tabs>
      <div className="flex-shrink-0 flex items-center justify-between gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-black/20 border-white/20 h-9 text-xs">
                    To: {recipient} <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setRecipient("All")}>All in Room</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRecipient("All on Mic")}>All on Mic</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRecipient("Jodie")}>Jodie</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setRecipient("Koko")}>Koko</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
            <div className="flex items-center bg-black/20 rounded-full border border-white/20">
                 <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full" onClick={() => handleQuantityChange(-1)}>
                    <Minus className="w-4 h-4" />
                </Button>
                <span className="px-2 text-sm">{quantity}</span>
                <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full" onClick={() => handleQuantityChange(1)}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-orange-400 h-9">
                Send
            </Button>
        </div>
      </div>
    </div>
  );
}

    