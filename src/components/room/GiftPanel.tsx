
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Coins, ChevronDown, Minus, Plus, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { roomSeats } from "@/app/audio/room/page";

const gifts = {
  hot: [
    { name: "Heart", price: 10, image: "https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png", animation: 'jump-to-seat' },
    { name: "Thumbs Up", price: 5, image: "https://em-content.zobj.net/source/apple/391/thumbs-up_1f44d.png", animation: 'jump-to-seat' },
    { name: "Kiss", price: 15, image: "https://em-content.zobj.net/source/apple/391/kiss-mark_1f48b.png", animation: 'jump-to-seat' },
    { name: "Rose", price: 25, image: "https://em-content.zobj.net/source/apple/391/rose_1f339.png", animation: 'jump-to-seat' },
    { name: "Clapping", price: 15, image: "https://em-content.zobj.net/source/apple/391/clapping-hands_1f44f.png" },
    { name: "Fire", price: 50, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", animation: 'pulse-luxury' },
    { name: "100", price: 100, image: "https://em-content.zobj.net/source/apple/391/100-points_1f4af.png", animation: 'tada' },
    { name: "Sparkles", price: 30, image: "https://em-content.zobj.net/source/apple/391/sparkles_2728.png", animation: 'bounce' },
    { name: "Star", price: 40, image: "https://em-content.zobj.net/source/apple/391/star_2b50.png", animation: 'jump-to-seat' },
    { name: "Wow Face", price: 20, image: "https://em-content.zobj.net/source/apple/391/winking-face-with-tongue_1f61c.png" },
    { name: "Cool", price: 35, image: "https://em-content.zobj.net/source/apple/391/smiling-face-with-sunglasses_1f60e.png" },
    { name: "Mic Drop", price: 75, image: "https://em-content.zobj.net/source/apple/391/microphone_1f3a4.png", animation: 'bounce' },
    { name: "Rocket", price: 150, image: "https://em-content.zobj.net/source/apple/391/rocket_1f680.png", animation: 'fade-in-out' },
    { name: "Laughing", price: 12, image: "https://em-content.zobj.net/source/apple/391/rolling-on-the-floor-laughing_1f923.png" },
    { name: "Mind Blown", price: 45, image: "https://em-content.zobj.net/source/apple/391/exploding-head_1f92f.png", animation: 'tada' },
    { name: "Crown", price: 5000, image: "https://em-content.zobj.net/source/apple/391/crown_1f451.png", animation: 'pulse-luxury' },
    { name: "Diamond", price: 1000, image: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png", animation: 'shimmer' },
    { name: "Money Bag", price: 750, image: "https://em-content.zobj.net/source/apple/391/money-bag_1f4b0.png" },
    { name: "Trophy", price: 300, image: "https://em-content.zobj.net/source/apple/391/trophy_1f3c6.png", animation: 'pulse-luxury' },
    { name: "Gift Box", price: 50, image: "https://em-content.zobj.net/source/apple/391/wrapped-gift_1f381.png", animation: 'jump-to-seat' },
    { name: "Balloons", price: 40, image: "https://em-content.zobj.net/source/apple/391/balloon_1f388.png" },
    { name: "Party Popper", price: 30, image: "https://em-content.zobj.net/source/apple/391/party-popper_1f389.png", animation: 'tada' },
    { name: "Confetti", price: 20, image: "https://em-content.zobj.net/source/apple/391/confetti-ball_1f38a.png", animation: 'bounce' },
    { name: "Pizza Slice", price: 45, image: "https://em-content.zobj.net/source/apple/391/pizza_1f355.png" },
    { name: "Cookie", price: 20, image: "https://em-content.zobj.net/source/apple/391/cookie_1f36a.png" },
    { name: "Ice Cream", price: 25, image: "https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png" },
    { name: "Doughnut", price: 30, image: "https://em-content.zobj.net/source/apple/391/doughnut_1f369.png" },
    { name: "Popcorn", price: 22, image: "https://em-content.zobj.net/source/apple/391/popcorn_1f37f.png" },
    { name: "Taco", price: 38, image: "https://em-content.zobj.net/source/apple/391/taco_1f32e.png" },
    { name: "Hotdog", price: 33, image: "https://em-content.zobj.net/source/apple/391/hot-dog_1f32d.png" },
    { name: "Burger", price: 48, image: "https://em-content.zobj.net/source/apple/391/hamburger_1f354.png" },
    { name: "Fries", price: 28, image: "https://em-content.zobj.net/source/apple/391/french-fries_1f35f.png" },
    { name: "Sushi", price: 55, image: "https://em-content.zobj.net/source/apple/391/sushi_1f363.png" },
    { name: "Cupcake", price: 27, image: "https://em-content.zobj.net/source/apple/391/cupcake_1f9c1.png" },
    { name: "Candy", price: 18, image: "https://em-content.zobj.net/source/apple/391/candy_1f36c.png" },
    { name: "Lollipop", price: 15, image: "https://em-content.zobj.net/source/apple/391/lollipop_1f36d.png" },
    { name: "Chocolate", price: 30, image: "https://em-content.zobj.net/source/apple/391/chocolate-bar_1f36b.png" },
    { name: "Unicorn", price: 7500, image: "https://em-content.zobj.net/source/apple/391/unicorn_1f984.png", animation: 'shimmer' },
    { name: "Dragon", price: 30000, image: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png", animation: 'fade-in-out' },
    { name: "Alien", price: 9000, image: "https://em-content.zobj.net/source/apple/391/alien_1f47d.png" },
    { name: "Ghost", price: 80, image: "https://em-content.zobj.net/source/apple/391/ghost_1f47b.png" },
    { name: "Robot", price: 1200, image: "https://em-content.zobj.net/source/apple/391/robot_1f916.png" },
    { name: "Pumpkin", price: 60, image: "https://em-content.zobj.net/source/apple/391/jack-o-lantern_1f383.png" },
    { name: "Christmas Tree", price: 120, image: "https://em-content.zobj.net/source/apple/391/christmas-tree_1f384.png" },
    { name: "Santa", price: 150, image: "https://em-content.zobj.net/source/apple/391/santa-claus_1f385.png" },
    { name: "Fireworks", price: 250, image: "https://em-content.zobj.net/source/apple/391/fireworks_1f386.png", animation: 'tada' },
    { name: "Palm Tree", price: 70, image: "https://em-content.zobj.net/source/apple/391/palm-tree_1f334.png" },
    { name: "Cactus", price: 65, image: "https://em-content.zobj.net/source/apple/391/cactus_1f335.png" },
    { name: "Cherry Blossom", price: 85, image: "https://em-content.zobj.net/source/apple/391/cherry-blossom_1f338.png" },
    { name: "Sunflower", price: 77, image: "https://em-content.zobj.net/source/apple/391/sunflower_1f33b.png" },
    { name: "Tulip", price: 68, image: "https://em-content.zobj.net/source/apple/391/tulip_1f337.png" },
    { name: "Four Leaf Clover", price: 88, image: "https://em-content.zobj.net/source/apple/391/four-leaf-clover_1f340.png" },
    { name: "Maple Leaf", price: 66, image: "https://em-content.zobj.net/source/apple/391/maple-leaf_1f341.png" },
    { name: "Fallen Leaf", price: 58, image: "https://em-content.zobj.net/source/apple/391/fallen-leaf_1f342.png" },
    { name: "Mushroom", price: 49, image: "https://em-content.zobj.net/source/apple/391/mushroom_1f344.png" },
    { name: "Earth", price: 110, image: "https://em-content.zobj.net/source/apple/391/earth-asia-australia_1f30f.png" },
    { name: "Moon", price: 95, image: "https://em-content.zobj.net/source/apple/391/full-moon-face_1f31d.png" },
    { name: "Sun", price: 105, image: "https://em-content.zobj.net/source/apple/391/sun-with-face_1f31e.png" },
    { name: "Rainbow", price: 125, image: "https://em-content.zobj.net/source/apple/391/rainbow_1f308.png" },
    { name: "Lightning", price: 99, image: "https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png" },
    { name: "Snowflake", price: 82, image: "https://em-content.zobj.net/source/apple/391/snowflake_2744-fe0f.png" },
    { name: "Water Wave", price: 72, image: "https://em-content.zobj.net/source/apple/391/water-wave_1f30a.png" },
    { name: "Ocean", price: 130, image: "https://em-content.zobj.net/source/apple/391/water-wave_1f30a.png" }
  ],
  event: [
    { name: "Birthday Cake", price: 100, image: "https://em-content.zobj.net/source/apple/391/birthday-cake_1f382.png", animation: 'tada' },
    { name: "Confetti", price: 20, image: "https://em-content.zobj.net/source/apple/391/confetti-ball_1f38a.png", animation: 'bounce' },
    { name: "Party Popper", price: 30, image: "https://em-content.zobj.net/source/apple/391/party-popper_1f389.png", animation: 'tada' },
    { name: "Gift Box", price: 50, image: "https://em-content.zobj.net/source/apple/391/wrapped-gift_1f381.png" },
    { name: "Balloons", price: 40, image: "https://em-content.zobj.net/source/apple/391/balloon_1f388.png" },
    { name: "Champagne", price: 200, image: "https://em-content.zobj.net/source/apple/391/bottle-with-popping-cork_1f37e.png", animation: 'pulse-luxury' },
    { name: "Wedding Rings", price: 500, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png", animation: 'shimmer' },
    { name: "Trophy", price: 300, image: "https://em-content.zobj.net/source/apple/391/trophy_1f3c6.png", animation: 'pulse-luxury' },
    { name: "Jack-o'-lantern", price: 60, image: "https://em-content.zobj.net/source/apple/391/jack-o-lantern_1f383.png" },
    { name: "Christmas Tree", price: 120, image: "https://em-content.zobj.net/source/apple/391/christmas-tree_1f384.png" },
    { name: "Santa Claus", price: 150, image: "https://em-content.zobj.net/source/apple/391/santa-claus_1f385.png" },
    { name: "Fireworks", price: 250, image: "https://em-content.zobj.net/source/apple/391/fireworks_1f386.png", animation: 'tada' },
    { name: "Girl Dancer", price: 55, image: "https://em-content.zobj.net/source/apple/391/woman-dancing_1f483.png" },
    { name: "Boy Dancer", price: 55, image: "https://em-content.zobj.net/source/apple/391/man-dancing_1f57a.png" },
    { name: "Red Envelope", price: 88, image: "https://em-content.zobj.net/source/apple/391/red-envelope_1f9e7.png" },
    { name: "New Year", price: 188, image: "https://em-content.zobj.net/source/apple/391/sparkler_1f387.png" },
    { name: "Graduation", price: 288, image: "https://em-content.zobj.net/source/apple/391/graduation-cap_1f393.png" },
    { name: "School", price: 45, image: "https://em-content.zobj.net/source/apple/391/school_1f3eb.png" },
    { name: "Megaphone", price: 65, image: "https://em-content.zobj.net/source/apple/391/megaphone_1f4e3.png" },
    { name: "Calendar", price: 35, image: "https://em-content.zobj.net/source/apple/391/tear-off-calendar_1f4c6.png" },
    { name: "Carnival", price: 150, image: "https://em-content.zobj.net/source/apple/391/carousel-horse_1f3a0.png" },
    { name: "Ferris Wheel", price: 180, image: "https://em-content.zobj.net/source/apple/391/ferris-wheel_1f3a1.png" },
    { name: "Roller Coaster", price: 220, image: "https://em-content.zobj.net/source/apple/391/roller-coaster_1f3a2.png" },
    { name: "Circus Tent", price: 130, image: "https://em-content.zobj.net/source/apple/391/circus-tent_1f3aa.png" },
    { name: "Ticket", price: 10, image: "https://em-content.zobj.net/source/apple/391/admission-tickets_1f39f-fe0f.png" },
    { name: "Clapper Board", price: 70, image: "https://em-content.zobj.net/source/apple/391/clapper-board_1f3ac.png" },
    { name: "Movie Camera", price: 110, image: "https://em-content.zobj.net/source/apple/391/film-projector_1f4fd-fe0f.png" },
    { name: "Art Palette", price: 80, image: "https://em-content.zobj.net/source/apple/391/artist-palette_1f3a8.png" },
    { name: "Music Note", price: 25, image: "https://em-content.zobj.net/source/apple/391/musical-notes_1f3b6.png" },
    { name: "Headphones", price: 90, image: "https://em-content.zobj.net/source/apple/391/headphone_1f3a7.png" },
    { name: "Saxophone", price: 120, image: "https://em-content.zobj.net/source/apple/391/saxophone_1f3b7.png" },
    { name: "Guitar", price: 140, image: "https://em-content.zobj.net/source/apple/391/guitar_1f3b8.png" },
    { name: "Piano", price: 180, image: "https://em-content.zobj.net/source/apple/391/musical-keyboard_1f3b9.png" },
    { name: "Violin", price: 160, image: "https://em-content.zobj.net/source/apple/391/violin_1f3bb.png" },
    { name: "Drum", price: 130, image: "https://em-content.zobj.net/source/apple/391/drum_1f941.png" },
    { name: "Game Die", price: 15, image: "https://em-content.zobj.net/source/apple/391/game-die_1f3b2.png" },
    { name: "Bowling", price: 50, image: "https://em-content.zobj.net/source/apple/391/bowling_1f3b3.png" },
    { name: "Target", price: 60, image: "https://em-content.zobj.net/source/apple/391/bullseye_1f3af.png" },
    { name: "Soccer Ball", price: 70, image: "https://em-content.zobj.net/source/apple/391/soccer-ball_26bd.png" },
    { name: "Basketball", price: 70, image: "https://em-content.zobj.net/source/apple/391/basketball_1f3c0.png" },
    { name: "American Football", price: 70, image: "https://em-content.zobj.net/source/apple/391/american-football_1f3c8.png" },
    { name: "Baseball", price: 70, image: "https://em-content.zobj.net/source/apple/391/baseball_26be.png" },
    { name: "Tennis", price: 70, image: "https://em-content.zobj.net/source/apple/391/tennis_1f3be.png" },
    { name: "Volleyball", price: 70, image: "https://em-content.zobj.net/source/apple/391/volleyball_1f3d0.png" },
    { name: "Rugby", price: 70, image: "https://em-content.zobj.net/source/apple/391/rugby-football_1f3c9.png" },
    { name: "Billiard", price: 55, image: "https://em-content.zobj.net/source/apple/391/pool-8-ball_1f3b1.png" },
    { name: "Medal", price: 95, image: "https://em-content.zobj.net/source/apple/391/sports-medal_1f3c5.png" },
    { name: "Ribbon", price: 45, image: "https://em-content.zobj.net/source/apple/391/reminder-ribbon_1f397-fe0f.png" },
    { name: "Love Letter", price: 85, image: "https://em-content.zobj.net/source/apple/391/love-letter_1f48c.png" },
    { name: "Diploma", price: 175, image: "https://em-content.zobj.net/source/apple/391/scroll_1f4dc.png" },
  ],
  luxury: [
    { name: "Diamond", price: 1000, image: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png", animation: 'shimmer' },
    { name: "Crown", price: 5000, image: "https://em-content.zobj.net/source/apple/391/crown_1f451.png", animation: 'pulse-luxury' },
    { name: "Sports Car", price: 20000, image: "https://em-content.zobj.net/source/apple/391/racing-car_1f3ce-fe0f.png", animation: 'fade-in-out' },
    { name: "Helicopter", price: 50000, image: "https://em-content.zobj.net/source/apple/391/helicopter_1f681.png", animation: 'fade-in-out' },
    { name: "Yacht", price: 100000, image: "https://em-content.zobj.net/source/apple/391/speedboat_1f6a4.png", animation: 'pulse-luxury' },
    { name: "Private Jet", price: 250000, image: "https://em-content.zobj.net/source/apple/391/airplane_2708-fe0f.png", animation: 'fade-in-out' },
    { name: "Mansion", price: 500000, image: "https://em-content.zobj.net/source/apple/391/house-with-garden_1f3e1.png", animation: 'pulse-luxury' },
    { name: "Gold Medal", price: 2500, image: "https://em-content.zobj.net/source/apple/391/1st-place-medal_1f947.png", animation: 'shimmer' },
    { name: "Money Bag", price: 750, image: "https://em-content.zobj.net/source/apple/391/money-bag_1f4b0.png" },
    { name: "Diamond Ring", price: 15000, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png", animation: 'shimmer' },
    { name: "Watch", price: 8000, image: "https://em-content.zobj.net/source/apple/391/watch_231a.png", animation: 'pulse-luxury' },
    { name: "Gold Chain", price: 3500, image: "https://em-content.zobj.net/source/apple/391/chains_26d3-fe0f.png" },
    { name: "Gold Button", price: 10000, image: "https://em-content.zobj.net/source/apple/391/radio-button_1f518.png" },
    { name: "Diamond Button", price: 25000, image: "https://em-content.zobj.net/source/apple/391/diamond-with-a-dot_1f4a0.png" },
    { name: "Silver Button", price: 5000, image: "https://em-content.zobj.net/source/apple/391/white-circle_26aa.png" },
    { name: "Lipstick", price: 300, image: "https://em-content.zobj.net/source/apple/391/lipstick_1f484.png" },
    { name: "Perfume", price: 800, image: "https://em-content.zobj.net/source/apple/391/bell-pepper_1f951.png" }, // Using a bell pepper as a stand-in for a perfume bottle shape
    { name: "Handbag", price: 1200, image: "https://em-content.zobj.net/source/apple/391/handbag_1f45c.png" },
    { name: "High-Heel Shoe", price: 900, image: "https://em-content.zobj.net/source/apple/391/high-heeled-shoe_1f460.png" },
    { name: "Briefcase", price: 1500, image: "https://em-content.zobj.net/source/apple/391/briefcase_1f4bc.png" },
    { name: "Dollar Bills", price: 400, image: "https://em-content.zobj.net/source/apple/391/dollar-banknote_1f4b5.png" },
    { name: "Euro Bills", price: 400, image: "https://em-content.zobj.net/source/apple/391/euro-banknote_1f4b6.png" },
    { name: "Pound Bills", price: 400, image: "https://em-content.zobj.net/source/apple/391/pound-banknote_1f4b7.png" },
    { name: "Yen Bills", price: 400, image: "https://em-content.zobj.net/source/apple/391/yen-banknote_1f4b4.png" },
    { name: "Credit Card", price: 200, image: "https://em-content.zobj.net/source/apple/391/credit-card_1f4b3.png" },
    { name: "Key", price: 150, image: "https://em-content.zobj.net/source/apple/391/key_1f511.png" },
    { name: "Old Key", price: 250, image: "https://em-content.zobj.net/source/apple/391/old-key_1f5dd-fe0f.png" },
    { name: "Lock", price: 180, image: "https://em-content.zobj.net/source/apple/391/locked_1f512.png" },
    { name: "Unlocked", price: 180, image: "https://em-content.zobj.net/source/apple/391/unlocked_1f513.png" },
    { name: "Safe", price: 3000, image: "https://em-content.zobj.net/source/apple/391/bank_1f3e6.png" }, // Using bank emoji for safe
    { name: "Fountain Pen", price: 600, image: "https://em-content.zobj.net/source/apple/391/fountain-pen_1f58b-fe0f.png" },
    { name: "Necktie", price: 450, image: "https://em-content.zobj.net/source/apple/391/necktie_1f454.png" },
    { name: "Dress", price: 1100, image: "https://em-content.zobj.net/source/apple/391/dress_1f457.png" },
    { name: "Bikini", price: 700, image: "https://em-content.zobj.net/source/apple/391/bikini_1f459.png" },
    { name: "Jeans", price: 550, image: "https://em-content.zobj.net/source/apple/391/jeans_1f456.png" },
    { name: "Scarf", price: 350, image: "https://em-content.zobj.net/source/apple/391/scarf_1f9e3.png" },
    { name: "Gloves", price: 300, image: "https://em-content.zobj.net/source/apple/391/gloves_1f9e4.png" },
    { name: "Coat", price: 1300, image: "https://em-content.zobj.net/source/apple/391/coat_1f9e5.png" },
    { name: "Socks", price: 100, image: "https://em-content.zobj.net/source/apple/391/socks_1f9e6.png" },
    { name: "Top Hat", price: 850, image: "https://em-content.zobj.net/source/apple/391/top-hat_1f3a9.png" },
    { name: "Satchel", price: 950, image: "https://em-content.zobj.net/source/apple/391/womans-boot_1f462.png" }, // Using boot as placeholder
    { name: "Briefs", price: 250, image: "https://em-content.zobj.net/source/apple/391/briefs_1fa72.png" },
    { name: "Shorts", price: 400, image: "https://em-content.zobj.net/source/apple/391/shorts_1fa73.png" },
    { name: "Ballet Shoes", price: 650, image: "https://em-content.zobj.net/source/apple/391/ballet-shoes_1fa70.png" },
    { name: "Stethoscope", price: 750, image: "https://em-content.zobj.net/source/apple/391/stethoscope_1fa7a.png" },
    { name: "Goggles", price: 500, image: "https://em-content.zobj.net/source/apple/391/goggles_1f97d.png" },
    { name: "Lab Coat", price: 1000, image: "https://em-content.zobj.net/source/apple/391/lab-coat_1f97c.png" },
    { name: "Telescope", price: 1800, image: "https://em-content.zobj.net/source/apple/391/telescope_1f52d.png" },
    { name: "Microscope", price: 1600, image: "https://em-content.zobj.net/source/apple/391/microscope_1f52c.png" },
    { name: "Money-Mouth Face", price: 1500, image: "https://em-content.zobj.net/source/apple/391/money-mouth-face_1f911.png" },
  ],
  family: [
    { name: "Walking Cat", price: 60, image: "https://i.imgur.com/Qy3C2a7.gif", animation: 'walking' },
    { name: "Teddy Bear", price: 50, image: "https://em-content.zobj.net/source/apple/391/teddy-bear_1f9f8.png" },
    { name: "Baby Bottle", price: 10, image: "https://em-content.zobj.net/source/apple/391/baby-bottle_1f37c.png" },
    { name: "Family", price: 100, image: "https://em-content.zobj.net/source/apple/391/family-man-woman-girl-boy_1f468-200d-1f469-200d-1f467-200d-1f466.png" },
    { name: "Dog", price: 60, image: "https://em-content.zobj.net/source/apple/391/dog_1f415.png", animation: 'bounce' },
    { name: "Cat", price: 60, image: "https://em-content.zobj.net/source/apple/391/cat_1f408.png", animation: 'bounce' },
    { name: "House", price: 200, image: "https://em-content.zobj.net/source/apple/391/house_1f3e0.png" },
    { name: "Bouquet", price: 80, image: "https://em-content.zobj.net/source/apple/391/bouquet_1f490.png" },
    { name: "Chocolate", price: 30, image: "https://em-content.zobj.net/source/apple/391/chocolate-bar_1f36b.png" },
    { name: "Ice Cream", price: 25, image: "https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png" },
    { name: "Pizza Slice", price: 45, image: "https://em-content.zobj.net/source/apple/391/pizza_1f355.png" },
    { name: "Lollipop", price: 15, image: "https://em-content.zobj.net/source/apple/391/lollipop_1f36d.png" },
    { name: "Cookie", price: 20, image: "https://em-content.zobj.net/source/apple/391/cookie_1f36a.png" },
    { name: "Eagle", price: 120, image: "https://em-content.zobj.net/source/apple/391/eagle_1f985.png" },
    { name: "Parrot", price: 90, image: "https://em-content.zobj.net/source/apple/391/parrot_1f99c.png" },
    { name: "Peacock", price: 110, image: "https://em-content.zobj.net/source/apple/391/peacock_1f99a.png" },
    { name: "Rabbit", price: 55, image: "https://em-content.zobj.net/source/apple/391/rabbit_1f407.png" },
    { name: "Hedgehog", price: 65, image: "https://em-content.zobj.net/source/apple/391/hedgehog_1f994.png" },
    { name: "Bat", price: 75, image: "https://em-content.zobj.net/source/apple/391/bat_1f987.png" },
    { name: "Bear", price: 130, image: "https://em-content.zobj.net/source/apple/391/bear_1f43b.png" },
    { name: "Panda", price: 150, image: "https://em-content.zobj.net/source/apple/391/panda_1f43c.png" },
    { name: "Koala", price: 140, image: "https://em-content.zobj.net/source/apple/391/koala_1f428.png" },
    { name: "Tiger", price: 180, image: "https://em-content.zobj.net/source/apple/391/tiger_1f405.png" },
    { name: "Lion", price: 200, image: "https://em-content.zobj.net/source/apple/391/lion_1f981.png" },
    { name: "Cow", price: 80, image: "https://em-content.zobj.net/source/apple/391/cow_1f404.png" },
    { name: "Pig", price: 70, image: "https://em-content.zobj.net/source/apple/391/pig_1f416.png" },
    { name: "Frog", price: 40, image: "https://em-content.zobj.net/source/apple/391/frog_1f438.png" },
    { name: "Monkey", price: 85, image: "https://em-content.zobj.net/source/apple/391/monkey_1f412.png" },
    { name: "Chicken", price: 45, image: "https://em-content.zobj.net/source/apple/391/chicken_1f414.png" },
    { name: "Penguin", price: 95, image: "https://em-content.zobj.net/source/apple/391/penguin_1f427.png" },
    { name: "Bird", price: 35, image: "https://em-content.zobj.net/source/apple/391/bird_1f426.png" },
    { name: "Duck", price: 50, image: "https://em-content.zobj.net/source/apple/391/duck_1f986.png" },
    { name: "Owl", price: 100, image: "https://em-content.zobj.net/source/apple/391/owl_1f989.png" },
    { name: "Wolf", price: 160, image: "https://em-content.zobj.net/source/apple/391/wolf_1f43a.png" },
    { name: "Boar", price: 140, image: "https://em-content.zobj.net/source/apple/391/boar_1f417.png" },
    { name: "Horse", price: 170, image: "https://em-content.zobj.net/source/apple/391/horse_1f40e.png" },
    { name: "Zebra", price: 160, image: "https://em-content.zobj.net/source/apple/391/zebra_1f993.png" },
    { name: "Giraffe", price: 190, image: "https://em-content.zobj.net/source/apple/391/giraffe_1f992.png" },
    { name: "Elephant", price: 220, image: "https://em-content.zobj.net/source/apple/391/elephant_1f418.png" },
    { name: "Camel", price: 180, image: "https://em-content.zobj.net/source/apple/391/two-hump-camel_1f42b.png" },
    { name: "Dolphin", price: 130, image: "https://em-content.zobj.net/source/apple/391/dolphin_1f42c.png" },
    { name: "Whale", price: 250, image: "https://em-content.zobj.net/source/apple/391/whale_1f40b.png" },
    { name: "Fish", price: 30, image: "https://em-content.zobj.net/source/apple/391/fish_1f41f.png" },
    { name: "Tropical Fish", price: 40, image: "https://em-content.zobj.net/source/apple/391/tropical-fish_1f420.png" },
    { name: "Blowfish", price: 45, image: "https://em-content.zobj.net/source/apple/391/blowfish_1f421.png" },
    { name: "Shark", price: 300, image: "https://em-content.zobj.net/source/apple/391/shark_1f988.png" },
    { name: "Octopus", price: 110, image: "https://em-content.zobj.net/source/apple/391/octopus_1f419.png" },
    { name: "Crab", price: 80, image: "https://em-content.zobj.net/source/apple/391/crab_1f980.png" },
    { name: "Shrimp", price: 70, image: "https://em-content.zobj.net/source/apple/391/shrimp_1f990.png" },
    { name: "Squid", price: 90, image: "https://em-content.zobj.net/source/apple/391/squid_1f991.png" },
    { name: "Snail", price: 20, image: "https://em-content.zobj.net/source/apple/391/snail_1f40c.png" },
  ],
  exclusive: [
    { name: "Welcome", price: 25000, image: "https://i.imgur.com/OZegNuK.gif", animation: 'fly-across' },
    { name: "Baby Tiger", price: 35000, image: "https://i.imgur.com/RqnqCso.gif", animation: 'fly-across' },
    { name: "No No", price: 10000, image: "https://i.imgur.com/g7CCqJE.gif", animation: 'fly-across' },
    { name: "Thank You", price: 20000, image: "https://i.imgur.com/KkRoyNG.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/lDBMcei.mp4' },
    { name: "Happy", price: 22000, image: "https://i.imgur.com/ur8gnNg.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/5tm8G6E.mp4' },
    { name: "I'm King", price: 50000, image: "https://i.imgur.com/RGlRi8p.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/gUFx8XH.mp4' },
    { name: "Long Life", price: 45000, image: "https://i.imgur.com/uuYE1y6.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/5bsNyMA.mp4' },
    { name: "Don't Worry", price: 18000, image: "https://i.imgur.com/R5PCG1C.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/zM45cFd.mp4' },
    { name: "Boss", price: 60000, image: "https://i.imgur.com/Oz4ud1o.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/fBuCquk.mp4' },
    { name: "Geooo", price: 40000, image: "https://i.imgur.com/O4Fxx4F.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/Dz61udI.mp4' },
    { name: "Baby", price: 15000, image: "https://i.imgur.com/Z1q3Wzp.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/DdLy4Ki.mp4' },
    { name: "I'm Going", price: 28000, image: "https://i.imgur.com/7aQbGmH.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/nbPrT6e.mp4' },
    { name: "I'm Coming", price: 30000, image: "https://i.imgur.com/kUs3XY4.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/6KV0BPz.mp4' },
    { name: "Gift Box 1", price: 12000, image: "https://i.imgur.com/cnp5DtX.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/S4JCZLn.mp4' },
    { name: "Gift Box 2", price: 18000, image: "https://i.imgur.com/0I2I0qJ.gif", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/x6kDTKX.mp4' },
    { name: "Gift Box 3", price: 25000, image: "https://em-content.zobj.net/source/apple/391/wrapped-gift_1f381.png", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/xd8YyEk.mp4' },
    { name: "Gift Box 4", price: 32000, image: "https://em-content.zobj.net/source/apple/391/wrapped-gift_1f381.png", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/kkYzjpL.mp4' },
    { name: "Gift Box 5", price: 40000, image: "https://em-content.zobj.net/source/apple/391/wrapped-gift_1f381.png", animation: 'fullscreen-video', videoUrl: 'https://i.imgur.com/pKmGsxA.mp4' },
    { name: "Unicorn", price: 7500, image: "https://em-content.zobj.net/source/apple/391/unicorn_1f984.png", animation: 'shimmer' },
    { name: "Dragon", price: 30000, image: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png", animation: 'fade-in-out' },
    { name: "Phoenix", price: 50000, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", animation: 'shimmer' },
    { name: "Galaxy", price: 15000, image: "https://em-content.zobj.net/source/apple/391/milky-way_1f30c.png", animation: 'pulse-luxury' },
    { name: "Castle", price: 150000, image: "https://em-content.zobj.net/source/apple/391/castle_1f3f0.png", animation: 'pulse-luxury' },
    { name: "Treasure Chest", price: 80000, image: "https://em-content.zobj.net/source/apple/391/chestnut_1f330.png" }, 
    { name: "Magic Wand", price: 6000, image: "https://em-content.zobj.net/source/apple/391/magic-wand_1fa84.png", animation: 'shimmer' },
    { name: "Genie", price: 40000, image: "https://em-content.zobj.net/source/apple/391/genie_1f9de.png", animation: 'pulse-luxury' },
    { name: "Alien", price: 9000, image: "https://em-content.zobj.net/source/apple/391/alien_1f47d.png" },
    { name: "Meteor", price: 25000, image: "https://em-content.zobj.net/source/apple/391/comet_2604-fe0f.png", animation: 'fade-in-out' },
    { name: "Train", price: 1800, image: "https://em-content.zobj.net/source/apple/391/train_1f686.png" },
    { name: "Bus", price: 1500, image: "https://em-content.zobj.net/source/apple/391/bus_1f68c.png" },
    { name: "Motorcycle", price: 2200, image: "https://em-content.zobj.net/source/apple/391/motorcycle_1f3cd-fe0f.png" },
    { name: "Bicycle", price: 800, image: "https://em-content.zobj.net/source/apple/391/bicycle_1f6b2.png" },
    { name: "Mobile Phone", price: 1300, image: "https://em-content.zobj.net/source/apple/391/mobile-phone_1f4f1.png" },
    { name: "Telephone", price: 700, image: "https://em-content.zobj.net/source/apple/391/telephone_260e-fe0f.png" },
    { name: "Mermaid", price: 12000, image: "https://em-content.zobj.net/source/apple/391/mermaid_1f9dc-200d-2640-fe0f.png" },
    { name: "Fairy", price: 10000, image: "https://em-content.zobj.net/source/apple/391/fairy_1f9da.png" },
    { name: "Vampire", price: 11000, image: "https://em-content.zobj.net/source/apple/391/vampire_1f9db.png" },
    { name: "Zombie", price: 9500, image: "https://em-content.zobj.net/source/apple/391/zombie_1f9df.png" },
    { name: "Elf", price: 8500, image: "https://em-content.zobj.net/source/apple/391/elf_1f9dd.png" },
    { name: "Brain", price: 5500, image: "https://em-content.zobj.net/source/apple/391/brain_1f9e0.png" },
    { name: "Crystal Ball", price: 7000, image: "https://em-content.zobj.net/source/apple/391/crystal-ball_1f52e.png", animation: 'shimmer' },
    { name: "Alembic", price: 6500, image: "https://em-content.zobj.net/source/apple/391/alembic_2697-fe0f.png" },
    { name: "Gear", price: 4500, image: "https://em-content.zobj.net/source/apple/391/gear_2699-fe0f.png" },
    { name: "Atom Symbol", price: 8800, image: "https://em-content.zobj.net/source/apple/391/atom-symbol_269b-fe0f.png" },
    { name: "Yin Yang", price: 3300, image: "https://em-content.zobj.net/source/apple/391/yin-yang_262f-fe0f.png" },
    { name: "Peace Symbol", price: 2200, image: "https://em-content.zobj.net/source/apple/391/peace-symbol_262e-fe0f.png" },
    { name: "Radioactive", price: 9900, image: "https://em-content.zobj.net/source/apple/391/radioactive_2622-fe0f.png" },
    { name: "Biohazard", price: 9800, image: "https://em-content.zobj.net/source/apple/391/biohazard_2623-fe0f.png" },
    { name: "Flying Saucer", price: 13000, image: "https://em-content.zobj.net/source/apple/391/flying-saucer_1f6f8.png", animation: 'fade-in-out' },
    { name: "Satellite", price: 18000, image: "https://em-content.zobj.net/source/apple/391/satellite_1f6f0-fe0f.png" },
    { name: "DNA", price: 11500, image: "https://em-content.zobj.net/source/apple/391/dna_1f9ec.png" },
    { name: "Abacus", price: 3000, image: "https://em-content.zobj.net/source/apple/391/abacus_1f9ee.png" },
    { name: "Magnet", price: 4000, image: "https://em-content.zobj.net/source/apple/391/magnet_1f9f2.png" },
    { name: "Test Tube", price: 5000, image: "https://em-content.zobj.net/source/apple/391/test-tube_1f9ea.png" },
    { name: "Petri Dish", price: 4800, image: "https://em-content.zobj.net/source/apple/391/petri-dish_1f9eb.png" },
    { name: "Moai", price: 16000, image: "https://em-content.zobj.net/source/apple/391/moai_1f5ff.png" },
    { name: "Statue of Liberty", price: 22000, image: "https://em-content.zobj.net/source/apple/391/statue-of-liberty_1f5fd.png" },
    { name: "Tokyo Tower", price: 19000, image: "https://em-content.zobj.net/source/apple/391/tokyo-tower_1f5fc.png" },
    { name: "Kaaba", price: 35000, image: "https://em-content.zobj.net/source/apple/391/kaaba_1f54b.png" },
    { name: "Mosque", price: 28000, image: "https://em-content.zobj.net/source/apple/391/mosque_1f54c.png" },
    { name: "Synagogue", price: 27000, image: "https://em-content.zobj.net/source/apple/391/synagogue_1f54d.png" },
    { name: "Church", price: 26000, image: "https://em-content.zobj.net/source/apple/391/church_26ea.png" },
    { name: "Rocket Ship", price: 14000, image: "https://em-content.zobj.net/source/apple/391/rocket_1f680.png", animation: 'fade-in-out' },
    { name: "Ambulance", price: 8000, image: "https://em-content.zobj.net/source/apple/391/ambulance_1f691.png" },
    { name: "Fire Truck", price: 8500, image: "https://em-content.zobj.net/source/apple/391/fire-engine_1f692.png" },
    { name: "Police Car", price: 9000, image: "https://em-content.zobj.net/source/apple/391/police-car_1f693.png" },
    { name: "Taxi", price: 2500, image: "https://em-content.zobj.net/source/apple/391/taxi_1f695.png" },
    { name: "Delivery Truck", price: 3500, image: "https://em-content.zobj.net/source/apple/391/delivery-truck_1f69a.png" },
  ],
};


export type Gift = {
    name: string;
    price: number;
    image: string;
    animation?: string;
    videoUrl?: string;
};
type GiftCategory = keyof typeof gifts;


type GiftPanelProps = {
    onSendGift: (gift: Gift, quantity: number, recipient: string) => void;
    sendButtonRef: React.RefObject<HTMLButtonElement>;
    roomSeats: typeof roomSeats | any[];
    giftContext?: 'audio' | 'video';
}

export function GiftPanel({ onSendGift, sendButtonRef, roomSeats, giftContext = 'audio' }: GiftPanelProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(gifts.hot[0]);
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState("All in Room");

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  }
  
  const handleSend = () => {
    if (!selectedGift) return;
    onSendGift(selectedGift, quantity, recipient);
  }

  const getAnimationClass = (animation?: string) => {
    if (!animation) return '';
    switch (animation) {
        case 'fade-in-out': return 'animate-fade-in-out';
        case 'shimmer': return 'animate-shimmer';
        case 'pulse-luxury': return 'animate-pulse-luxury';
        case 'tada': return 'animate-tada';
        case 'bounce': return 'animate-bounce';
        case 'spin-slow': return 'animate-spin-slow';
        default: return '';
    }
  }

  const occupiedSeats = roomSeats.filter(seat => seat.isOccupied && seat.user);

  const videoGiftSet = {
      exclusive: gifts.exclusive,
      luxury: gifts.luxury,
  }

  const audioGiftSet = {
      hot: gifts.hot,
      event: gifts.event,
      luxury: gifts.luxury,
      family: gifts.family,
      exclusive: gifts.exclusive
  }

  const currentGiftSet = giftContext === 'video' ? videoGiftSet : audioGiftSet;
  const defaultTab = Object.keys(currentGiftSet)[0];


  return (
    <div className="absolute inset-0 bg-[#1F0A2E]/90 backdrop-blur-sm flex flex-col rounded-lg">
      <div className="flex-1 flex flex-col overflow-hidden p-2">
        <Tabs defaultValue={defaultTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="bg-transparent p-0 justify-start gap-4 border-b border-white/10">
            {Object.keys(currentGiftSet).map(category => (
                <TabsTrigger key={category} value={category} className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm capitalize">{category}</TabsTrigger>
            ))}
          </TabsList>
          <ScrollArea className="flex-1 my-2">
              {(Object.keys(currentGiftSet) as (keyof typeof currentGiftSet)[]).map(category => (
                   <TabsContent key={category} value={category} className="mt-0">
                      <div className="grid grid-cols-4 gap-3">
                          {currentGiftSet[category].map(gift => (
                              <div
                                  key={gift.name}
                                  className={cn(
                                      "flex flex-col items-center gap-1 p-1 rounded-lg cursor-pointer border-2",
                                      selectedGift?.name === gift.name ? "border-primary bg-primary/20" : "border-transparent"
                                  )}
                                  onClick={() => setSelectedGift(gift as Gift)}
                              >
                                  <div className={cn("w-12 h-12 relative flex items-center justify-center overflow-hidden", (category === 'luxury' || category === 'exclusive' || category === 'hot') && 'p-1')}>
                                      <Image
                                        src={gift.image}
                                        alt={gift.name}
                                        width={48}
                                        height={48}
                                        unoptimized={gift.image.endsWith('.gif')}
                                        className={cn(getAnimationClass(gift.animation))}
                                      />
                                       {gift.animation === 'fullscreen-video' && (
                                            <div className="absolute bottom-0 right-0 bg-black/50 p-0.5 rounded-sm">
                                                <Volume2 className="w-2.5 h-2.5 text-white" />
                                            </div>
                                        )}
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
      </div>
      <div className="flex-shrink-0 flex items-center justify-between gap-2 p-2 border-t border-white/10">
         <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-black/20 border-white/20 h-9 text-xs px-2">
                        To: {recipient} <ChevronDown className="ml-1 w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-popover text-popover-foreground max-h-60 overflow-y-auto">
                    <DropdownMenuItem onClick={() => setRecipient("All in Room")}>All in Room</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setRecipient("All on Mic")}>All on Mic</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {occupiedSeats.map(seat => (
                        <DropdownMenuItem key={seat.id} onClick={() => setRecipient(seat.user.name)}>
                           {seat.user.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex-shrink-0 flex items-center gap-1 bg-black/20 rounded-full h-9 px-3 border border-white/20 text-sm">
                <Coins className="w-4 h-4 text-yellow-300" />
                <span className="font-bold text-white">1,250</span>
            </div>
         </div>

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
            <Button ref={sendButtonRef} className="bg-gradient-to-r from-pink-500 to-orange-400 h-9 px-4 text-sm" onClick={handleSend}>
                Send
            </Button>
        </div>
      </div>
    </div>
  );
}
