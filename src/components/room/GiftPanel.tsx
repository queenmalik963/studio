
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
    // 100 new hot gifts with video and animations
    { name: "Lion Cub", price: 99, image: "https://em-content.zobj.net/source/apple/391/lion_1f981.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Tiger Cub", price: 98, image: "https://em-content.zobj.net/source/apple/391/tiger_1f405.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Bear Cub", price: 97, image: "https://em-content.zobj.net/source/apple/391/bear_1f43b.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Wolf Pup", price: 96, image: "https://em-content.zobj.net/source/apple/391/wolf_1f43a.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Fox Kit", price: 95, image: "https://em-content.zobj.net/source/apple/391/fox_1f98a.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Deer Fawn", price: 94, image: "https://em-content.zobj.net/source/apple/391/deer_1f98c.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Playful Monkey", price: 89, image: "https://em-content.zobj.net/source/apple/391/monkey_1f412.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Cuddly Panda", price: 110, image: "https://em-content.zobj.net/source/apple/391/panda_1f43c.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "Sleepy Koala", price: 105, image: "https://em-content.zobj.net/source/apple/391/koala_1f428.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Happy Puppy", price: 79, image: "https://em-content.zobj.net/source/apple/391/dog_1f415.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Cute Kitten", price: 78, image: "https://em-content.zobj.net/source/apple/391/cat_1f408.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Bunny Hop", price: 69, image: "https://em-content.zobj.net/source/apple/391/rabbit_1f407.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Chirpy Chick", price: 49, image: "https://em-content.zobj.net/source/apple/391/front-facing-baby-chick_1f425.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Waddling Penguin", price: 85, image: "https://em-content.zobj.net/source/apple/391/penguin_1f427.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Soaring Eagle", price: 120, image: "https://em-content.zobj.net/source/apple/391/eagle_1f985.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Hooting Owl", price: 88, image: "https://em-content.zobj.net/source/apple/391/owl_1f989.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Mystical Unicorn", price: 150, image: "https://em-content.zobj.net/source/apple/391/unicorn_1f984.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { name: "Fiery Dragon", price: 180, image: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Sparkling Dolphin", price: 130, image: "https://em-content.zobj.net/source/apple/391/dolphin_1f42c.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Gentle Whale", price: 160, image: "https://em-content.zobj.net/source/apple/391/whale_1f40b.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "Cheeky Chipmunk", price: 65, image: "https://em-content.zobj.net/source/apple/391/chipmunk_1f43f-fe0f.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Sly Raccoon", price: 75, image: "https://em-content.zobj.net/source/apple/391/raccoon_1f99d.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Prickly Hedgehog", price: 70, image: "https://em-content.zobj.net/source/apple/391/hedgehog_1f994.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Busy Beaver", price: 80, image: "https://em-content.zobj.net/source/apple/391/beaver_1f9ab.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Fluttering Butterfly", price: 55, image: "https://em-content.zobj.net/source/apple/391/butterfly_1f98b.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Buzzing Bee", price: 45, image: "https://em-content.zobj.net/source/apple/391/honeybee_1f41d.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Ladybug's Luck", price: 40, image: "https://em-content.zobj.net/source/apple/391/lady-beetle_1f41e.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Croaking Frog", price: 50, image: "https://em-content.zobj.net/source/apple/391/frog_1f438.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Slithering Snake", price: 90, image: "https://em-content.zobj.net/source/apple/391/snake_1f40d.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { name: "Wise Turtle", price: 100, image: "https://em-content.zobj.net/source/apple/391/turtle_1f422.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Snappy Crocodile", price: 115, image: "https://em-content.zobj.net/source/apple/391/crocodile_1f40a.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Tropical Fish", price: 60, image: "https://em-content.zobj.net/source/apple/391/tropical-fish_1f420.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "Pufferfish Kiss", price: 68, image: "https://em-content.zobj.net/source/apple/391/blowfish_1f421.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Jiggly Octopus", price: 82, image: "https://em-content.zobj.net/source/apple/391/octopus_1f419.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Crab Dance", price: 72, image: "https://em-content.zobj.net/source/apple/391/crab_1f980.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Shrimp Snack", price: 35, image: "https://em-content.zobj.net/source/apple/391/shrimp_1f990.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Spiral Shell", price: 30, image: "https://em-content.zobj.net/source/apple/391/spiral-shell_1f41a.png", animation: 'spin-slow', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Galloping Horse", price: 125, image: "https://em-content.zobj.net/source/apple/391/horse_1f40e.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Majestic Elephant", price: 170, image: "https://em-content.zobj.net/source/apple/391/elephant_1f418.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Tall Giraffe", price: 140, image: "https://em-content.zobj.net/source/apple/391/giraffe_1f992.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Grumpy Camel", price: 110, image: "https://em-content.zobj.net/source/apple/391/two-hump-camel_1f42b.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { name: "Spitting Llama", price: 108, image: "https://em-content.zobj.net/source/apple/391/llama_1f999.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Hippopotamus Yawn", price: 135, image: "https://em-content.zobj.net/source/apple/391/hippopotamus_1f99b.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Tough Rhino", price: 145, image: "https://em-content.zobj.net/source/apple/391/rhinoceros_1f98f.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "Scary Bat", price: 66, image: "https://em-content.zobj.net/source/apple/391/bat_1f987.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Fluffy Ram", price: 86, image: "https://em-content.zobj.net/source/apple/391/ram_1f40f.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Bleating Goat", price: 76, image: "https://em-content.zobj.net/source/apple/391/goat_1f410.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Striped Zebra", price: 112, image: "https://em-content.zobj.net/source/apple/391/zebra_1f993.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Spotted Leopard", price: 122, image: "https://em-content.zobj.net/source/apple/391/leopard_1f406.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Rooster's Crow", price: 58, image: "https://em-content.zobj.net/source/apple/391/rooster_1f413.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Proud Peacock", price: 92, image: "https://em-content.zobj.net/source/apple/391/peacock_1f99a.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Colorful Parrot", price: 87, image: "https://em-content.zobj.net/source/apple/391/parrot_1f99c.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Graceful Swan", price: 93, image: "https://em-content.zobj.net/source/apple/391/swan_1f9a2.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { name: "Dodo Bird", price: 63, image: "https://em-content.zobj.net/source/apple/391/dodo_1f9a4.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Feather", price: 23, image: "https://em-content.zobj.net/source/apple/391/feather_1fab6.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Gecko", price: 43, image: "https://em-content.zobj.net/source/apple/391/lizard_1f98e.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "T-Rex", price: 193, image: "https://em-content.zobj.net/source/apple/391/t-rex_1f996.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Sauropod", price: 183, image: "https://em-content.zobj.net/source/apple/391/sauropod_1f995.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Cricket", price: 13, image: "https://em-content.zobj.net/source/apple/391/cricket_1f997.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Spider", price: 24, image: "https://em-content.zobj.net/source/apple/391/spider_1f577-fe0f.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Scorpion", price: 34, image: "https://em-content.zobj.net/source/apple/391/scorpion_1f982.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Mosquito", price: 4, image: "https://em-content.zobj.net/source/apple/391/mosquito_1f99f.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Microbe", price: 1, image: "https://em-content.zobj.net/source/apple/391/microbe_1f9a0.png", animation: 'spin-slow', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Bouquet", price: 54, image: "https://em-content.zobj.net/source/apple/391/bouquet_1f490.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Cherry Blossom", price: 31, image: "https://em-content.zobj.net/source/apple/391/cherry-blossom_1f338.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { name: "White Flower", price: 21, image: "https://em-content.zobj.net/source/apple/391/white-flower_1f4ae.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Rosette", price: 41, image: "https://em-content.zobj.net/source/apple/391/rosette_1f3f5-fe0f.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Rose", price: 51, image: "https://em-content.zobj.net/source/apple/391/rose_1f339.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "Wilted Flower", price: 11, image: "https://em-content.zobj.net/source/apple/391/wilted-flower_1f940.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Hibiscus", price: 29, image: "https://em-content.zobj.net/source/apple/391/hibiscus_1f33a.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Sunflower", price: 39, image: "https://em-content.zobj.net/source/apple/391/sunflower_1f33b.png", animation: 'spin-slow', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Blossom", price: 19, image: "https://em-content.zobj.net/source/apple/391/blossom_1f33c.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Tulip", price: 28, image: "https://em-content.zobj.net/source/apple/391/tulip_1f337.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Seedling", price: 8, image: "https://em-content.zobj.net/source/apple/391/seedling_1f331.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Potted Plant", price: 48, image: "https://em-content.zobj.net/source/apple/391/potted-plant_1fab4.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Evergreen Tree", price: 68, image: "https://em-content.zobj.net/source/apple/391/evergreen-tree_1f332.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Deciduous Tree", price: 67, image: "https://em-content.zobj.net/source/apple/391/deciduous-tree_1f333.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { name: "Palm Tree", price: 77, image: "https://em-content.zobj.net/source/apple/391/palm-tree_1f334.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Cactus", price: 47, image: "https://em-content.zobj.net/source/apple/391/cactus_1f335.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Sheaf of Rice", price: 17, image: "https://em-content.zobj.net/source/apple/391/sheaf-of-rice_1f33e.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "Herb", price: 14, image: "https://em-content.zobj.net/source/apple/391/herb_1f33f.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Shamrock", price: 22, image: "https://em-content.zobj.net/source/apple/391/shamrock_2618-fe0f.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Four Leaf Clover", price: 44, image: "https://em-content.zobj.net/source/apple/391/four-leaf-clover_1f340.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Maple Leaf", price: 33, image: "https://em-content.zobj.net/source/apple/391/maple-leaf_1f341.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Fallen Leaf", price: 12, image: "https://em-content.zobj.net/source/apple/391/fallen-leaf_1f342.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Mushroom", price: 25, image: "https://em-content.zobj.net/source/apple/391/mushroom_1f344.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Hot Pepper", price: 36, image: "https://em-content.zobj.net/source/apple/391/hot-pepper_1f336-fe0f.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Fire", price: 61, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Kiss Mark", price: 46, image: "https://em-content.zobj.net/source/apple/391/kiss-mark_1f48b.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { name: "Red Heart", price: 56, image: "https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Broken Heart", price: 6, image: "https://em-content.zobj.net/source/apple/391/broken-heart_1f494.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Revolving Hearts", price: 76, image: "https://em-content.zobj.net/source/apple/391/revolving-hearts_1f49e.png", animation: 'spin-slow', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "Heart with Arrow", price: 64, image: "https://em-content.zobj.net/source/apple/391/heart-with-arrow_1f498.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Sparkling Heart", price: 84, image: "https://em-content.zobj.net/source/apple/391/sparkling-heart_1f496.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Heart with Ribbon", price: 74, image: "https://em-content.zobj.net/source/apple/391/heart-with-ribbon_1f49d.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Love Letter", price: 53, image: "https://em-content.zobj.net/source/apple/391/love-letter_1f48c.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Ring", price: 199, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
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
    { name: "Carnival Mask", price: 110, image: "https://em-content.zobj.net/source/apple/391/performing-arts_1f3ad.png" },
    { name: "Wedding Rings", price: 1000, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png" },
    { name: "Champagne", price: 300, image: "https://em-content.zobj.net/source/apple/391/bottle-with-popping-cork_1f37e.png" },
    { name: "Love Letter", price: 45, image: "https://em-content.zobj.net/source/apple/391/love-letter_1f48c.png" },
    { name: "Heart with Arrow", price: 55, image: "https://em-content.zobj.net/source/apple/391/heart-with-arrow_1f498.png" },
    { name: "Bouquet", price: 130, image: "https://em-content.zobj.net/source/apple/391/bouquet_1f490.png" },
    { name: "Shamrock", price: 22, image: "https://em-content.zobj.net/source/apple/391/shamrock_2618-fe0f.png" },
    { name: "Maple Leaf", price: 18, image: "https://em-content.zobj.net/source/apple/391/maple-leaf_1f341.png" },
    { name: "Fallen Leaf", price: 12, image: "https://em-content.zobj.net/source/apple/391/fallen-leaf_1f342.png" },
    { name: "Easter Egg", price: 33, image: "https://em-content.zobj.net/source/apple/391/egg_1f95a.png" },
    { name: "Turkey", price: 160, image: "https://em-content.zobj.net/source/apple/391/turkey_1f983.png" },
    { name: "Cornucopia", price: 140, image: "https://em-content.zobj.net/source/apple/391/amphora_1f3fa.png" },
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
    { name: "Lottery Ticket", price: 5, image: "https://em-content.zobj.net/source/apple/391/admission-tickets_1f39f-fe0f.png" },
    { name: "Teddy Bear", price: 125, image: "https://em-content.zobj.net/source/apple/391/teddy-bear_1f9f8.png" },
    { name: "Pinata", price: 135, image: "https://em-content.zobj.net/source/apple/391/pi_c3_b1ata_1fa85.png" },
    { name: "Nazar Amulet", price: 85, image: "https://em-content.zobj.net/source/apple/391/nazar-amulet_1f9ff.png" },
    { name: "Ballet Shoes", price: 155, image: "https://em-content.zobj.net/source/apple/391/ballet-shoes_1fa70.png" },
    { name: "Prayer Beads", price: 95, image: "https://em-content.zobj.net/source/apple/391/prayer-beads_1f4ff.png" },
    { name: "Dove", price: 175, image: "https://em-content.zobj.net/source/apple/391/dove_1f54a-fe0f.png" },
  ],
  luxury: [
    { name: "Car", price: 10000, image: "https://em-content.zobj.net/source/apple/391/racing-car_1f3ce-fe0f.png", animation: 'pulse-luxury' },
    { name: "Yacht", price: 50000, image: "https://em-content.zobj.net/source/apple/391/speedboat_1f6a4.png", animation: 'pulse-luxury' },
    { name: "Helicopter", price: 80000, image: "https://em-content.zobj.net/source/apple/391/helicopter_1f681.png", animation: 'fly-across' },
    { name: "Private Jet", price: 200000, image: "https://em-content.zobj.net/source/apple/391/airplane_2708-fe0f.png", animation: 'fly-across' },
    { name: "Mansion", price: 500000, image: "https://em-content.zobj.net/source/apple/391/house_1f3e0.png", animation: 'pulse-luxury' },
    { name: "Castle", price: 1000000, image: "https://em-content.zobj.net/source/apple/391/castle_1f3f0.png", animation: 'pulse-luxury' },
    { name: "Island", price: 5000000, image: "https://em-content.zobj.net/source/apple/391/desert-island_1f3dd-fe0f.png", animation: 'pulse-luxury' },
    { name: "Diamond Ring", price: 25000, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png", animation: 'shimmer' },
    { name: "Gold Bars", price: 100000, image: "https://em-content.zobj.net/source/apple/391/dollar-banknote_1f4b5.png", animation: 'shimmer' },
    { name: "Money Bag", price: 5000, image: "https://em-content.zobj.net/source/apple/391/money-bag_1f4b0.png", animation: 'shimmer' },
    { name: "Credit Card", price: 1000, image: "https://em-content.zobj.net/source/apple/391/credit-card_1f4b3.png", animation: 'shimmer' },
    { name: "Watch", price: 15000, image: "https://em-content.zobj.net/source/apple/391/watch_231a.png", animation: 'pulse-luxury' },
    { name: "Briefcase", price: 2000, image: "https://em-content.zobj.net/source/apple/391/briefcase_1f4bc.png" },
    { name: "Fountain Pen", price: 800, image: "https://em-content.zobj.net/source/apple/391/fountain-pen_1f58b-fe0f.png" },
    { name: "Cigar", price: 500, image: "https://em-content.zobj.net/source/apple/391/cigarette_1f6ac.png" },
    { name: "Whiskey", price: 1200, image: "https://em-content.zobj.net/source/apple/391/tumbler-glass_1f943.png" },
    { name: "Caviar", price: 3000, image: "https://em-content.zobj.net/source/apple/391/canned-food_1f96b.png" },
    { name: "Sake", price: 900, image: "https://em-content.zobj.net/source/apple/391/sake_1f376.png" },
    { name: "Pearls", price: 18000, image: "https://em-content.zobj.net/source/apple/391/prayer-beads_1f4ff.png", animation: 'shimmer' },
    { name: "Top Hat", price: 600, image: "https://em-content.zobj.net/source/apple/391/top-hat_1f3a9.png" },
    { name: "Billiards", price: 4000, image: "https://em-content.zobj.net/source/apple/391/pool-8-ball_1f3b1.png" },
    { name: "Motorcycle", price: 12000, image: "https://em-content.zobj.net/source/apple/391/motorcycle_1f3cd-fe0f.png", animation: 'pulse-luxury' },
    { name: "Scuba Mask", price: 1500, image: "https://em-content.zobj.net/source/apple/391/diving-mask_1f93f.png" },
    { name: "Skyscraper", price: 800000, image: "https://em-content.zobj.net/source/apple/391/skyscraper_1f3d9-fe0f.png", animation: 'pulse-luxury' },
    { name: "Statue of Liberty", price: 1200000, image: "https://em-content.zobj.net/source/apple/391/statue-of-liberty_1f5fd.png", animation: 'pulse-luxury' },
    { name: "Tokyo Tower", price: 1100000, image: "https://em-content.zobj.net/source/apple/391/tokyo-tower_1f5fc.png", animation: 'pulse-luxury' },
    { name: "Eiffel Tower", price: 1500000, image: "https://em-content.zobj.net/source/apple/391/eiffel-tower_1f5fc.png", animation: 'pulse-luxury' },
    { name: "Spaceship", price: 2500000, image: "https://em-content.zobj.net/source/apple/391/flying-saucer_1f6f8.png", animation: 'fly-across' },
    { name: "Satellite", price: 750000, image: "https://em-content.zobj.net/source/apple/391/satellite_1f6f0-fe0f.png", animation: 'fly-across' },
    { name: "T-Rex", price: 300000, image: "https://em-content.zobj.net/source/apple/391/t-rex_1f996.png", animation: 'pulse-luxury' },
    // Video Gifts Start Here
    { name: "Galaxy Cruise", price: 6000000, image: "https://em-content.zobj.net/source/apple/391/milky-way_1f30c.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", animation: 'spin-slow' },
    { name: "Lion's Roar", price: 6500000, image: "https://em-content.zobj.net/source/apple/391/lion_1f981.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", animation: 'tada' },
    { name: "Pegasus Flight", price: 7000000, image: "https://em-content.zobj.net/source/apple/391/horse_1f40e.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", animation: 'fly-across' },
    { name: "Dragon's Fire", price: 7500000, image: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", animation: 'pulse-luxury' },
    { name: "Unicorn's Grace", price: 8000000, image: "https://em-content.zobj.net/source/apple/391/unicorn_1f984.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", animation: 'shimmer' },
    { name: "Phoenix Rising", price: 8500000, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4", animation: 'pulse-luxury' },
    { name: "Royal Carriage", price: 9000000, image: "https://em-content.zobj.net/source/apple/391/horse-racing_1f3c7.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", animation: 'fly-across' },
    { name: "Loveboat Party", price: 9500000, image: "https://em-content.zobj.net/source/apple/391/speedboat_1f6a4.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", animation: 'fly-across' },
    { name: "Meteor Shower", price: 10000000, image: "https://em-content.zobj.net/source/apple/391/comet_2604-fe0f.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", animation: 'fly-across' },
    { name: "Tsunami Wave", price: 11000000, image: "https://em-content.zobj.net/source/apple/391/water-wave_1f30a.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", animation: 'bounce' },
    { name: "Volcano Eruption", price: 12000000, image: "https://em-content.zobj.net/source/apple/391/volcano_1f30b.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", animation: 'pulse-luxury' },
    { name: "Earthquake", price: 13000000, image: "https://em-content.zobj.net/source/apple/391/desert_1f3dc-fe0f.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", animation: 'bounce' },
    { name: "Interstellar", price: 14000000, image: "https://em-content.zobj.net/source/apple/391/rocket_1f680.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", animation: 'fly-across' },
    { name: "World Tour", price: 15000000, image: "https://em-content.zobj.net/source/apple/391/globe-showing-europe-africa_1f30d.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", animation: 'spin-slow' },
    { name: "Diamond Rain", price: 16000000, image: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", animation: 'bounce' },
    { name: "Gold Rush", price: 17000000, image: "https://em-content.zobj.net/source/apple/391/coin_1fa99.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", animation: 'bounce' },
    { name: "King's Coronation", price: 18000000, image: "https://em-content.zobj.net/source/apple/391/crown_1f451.png", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", animation: 'shimmer' },
    { "name": "God of Fortune", "price": 19000000, "image": "https://em-content.zobj.net/source/apple/391/man-in-tuxedo_1f935.png", "videoUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4", "animation": "shimmer" },
    { "name": "Eternal Love", "price": 20000000, "image": "https://em-content.zobj.net/source/apple/391/couple-with-heart_1f491.png", "videoUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", "animation": "pulse-luxury" },
    { "name": "Royal Parade", "price": 21000000, "image": "https://em-content.zobj.net/source/apple/391/horse-racing_1f3c7.png", "videoUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", "animation": "fly-across" }
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
    { name: "Rocking Chair", price: 110, image: "https://em-content.zobj.net/source/apple/391/chair_1fa91.png" },
    { name: "Fireplace", price: 220, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png" },
    { name: "Photo Frame", price: 38, image: "https://em-content.zobj.net/source/apple/391/frame-with-picture_1f5bc-fe0f.png" },
    { name: "Kite", price: 29, image: "https://em-content.zobj.net/source/apple/391/kite_1fa81.png" },
    { name: "Puzzle Piece", price: 17, image: "https://em-content.zobj.net/source/apple/391/puzzle-piece_1f9e9.png" },
    { name: "Nesting Dolls", price: 105, image: "https://em-content.zobj.net/source/apple/391/nesting-dolls_1fa86.png" },
    { name: "Safety Pin", price: 1, image: "https://em-content.zobj.net/source/apple/391/safety-pin_1f9f7.png" },
    { name: "Abacus", price: 31, image: "https://em-content.zobj.net/source/apple/391/abacus_1f9ee.png" },
    { name: "Toolbox", price: 62, image: "https://em-content.zobj.net/source/apple/391/toolbox_1f9f0.png" },
    { name: "Magnet", price: 23, image: "https://em-content.zobj.net/source/apple/391/magnet_1f9f2.png" },
    { name: "Test Tube", price: 27, image: "https://em-content.zobj.net/source/apple/391/test-tube_1f9ea.png" },
    { name: "Petri Dish", price: 26, image: "https://em-content.zobj.net/source/apple/391/petri-dish_1f9eb.png" },
  ],
  exclusive: [
    { name: "Phoenix", price: 10000, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", animation: 'shimmer' },
    { name: "Pegasus", price: 12000, image: "https://em-content.zobj.net/source/apple/391/horse_1f40e.png", animation: 'fly-across' },
    { name: "Gryphon", price: 15000, image: "https://em-content.zobj.net/source/apple/391/eagle_1f985.png", animation: 'fly-across' },
    { name: "Hydra", price: 18000, image: "https://em-content.zobj.net/source/apple/391/snake_1f40d.png", animation: 'tada' },
    { name: "Leviathan", price: 25000, image: "https://em-content.zobj.net/source/apple/391/whale_1f40b.png", animation: 'bounce' },
    { name: "Golden Fleece", price: 5000, image: "https://em-content.zobj.net/source/apple/391/ram_1f40f.png", animation: 'shimmer' },
    { name: "Excalibur", price: 8000, image: "https://em-content.zobj.net/source/apple/391/dagger_1f5e1-fe0f.png", animation: 'shimmer' },
    { name: "Pandora's Box", price: 20000, image: "https://em-content.zobj.net/source/apple/391/wrapped-gift_1f381.png", animation: 'pulse-luxury' },
    { name: "Midas Touch", price: 50000, image: "https://em-content.zobj.net/source/apple/391/hand-with-fingers-splayed_1f590-fe0f.png", animation: 'shimmer' },
    { name: "Wishing Well", price: 7500, image: "https://em-content.zobj.net/source/apple/391/water-wave_1f30a.png", animation: 'pulse-luxury' },
    { name: "Magic Carpet", price: 9000, image: "https://em-content.zobj.net/source/apple/391/rugby-football_1f3c9.png", animation: 'fly-across' },
    { name: "Love Potion", price: 1999, image: "https://em-content.zobj.net/source/apple/391/test-tube_1f9ea.png", animation: 'tada' },
    { name: "Shooting Star", price: 3000, image: "https://em-content.zobj.net/source/apple/391/star_2b50.png", animation: 'fly-across' },
    { name: "Galaxy", price: 40000, image: "https://em-content.zobj.net/source/apple/391/milky-way_1f30c.png", animation: 'spin-slow' },
    { name: "Black Hole", price: 100000, image: "https://em-content.zobj.net/source/apple/391/black-hole_1f573-fe0f.png", animation: 'spin-slow' },
    { name: "Supernova", price: 75000, image: "https://em-content.zobj.net/source/apple/391/collision_1f4a5.png", animation: 'pulse-luxury' },
    { name: "Nebula", price: 35000, image: "https://em-content.zobj.net/source/apple/391/milky-way_1f30c.png", animation: 'shimmer' },
    { name: "Aurora", price: 22000, image: "https://em-content.zobj.net/source/apple/391/rainbow_1f308.png", animation: 'shimmer' },
    { name: "Singing Harp", price: 6000, image: "https://em-content.zobj.net/source/apple/391/violin_1f3bb.png", animation: 'tada' },
    { name: "Crystal Skull", price: 13000, image: "https://em-content.zobj.net/source/apple/391/skull_1f480.png", animation: 'shimmer' },
    { name: "Dragon Egg", price: 9500, image: "https://em-content.zobj.net/source/apple/391/egg_1f95a.png", animation: 'pulse-luxury' },
    { name: "Fountain of Youth", price: 60000, image: "https://em-content.zobj.net/source/apple/391/fountain_26f2.png", animation: 'pulse-luxury' },
    { name: "World Tree", price: 80000, image: "https://em-content.zobj.net/source/apple/391/deciduous-tree_1f333.png", animation: 'pulse-luxury' },
    { name: "Time Machine", price: 150000, image: "https://em-content.zobj.net/source/apple/391/alarm-clock_23f0.png", animation: 'spin-slow' },
    { name: "Royal Crown", price: 28000, image: "https://em-content.zobj.net/source/apple/391/crown_1f451.png", animation: 'shimmer' },
    { name: "Throne of Gods", price: 90000, image: "https://em-content.zobj.net/source/apple/391/chair_1fa91.png", animation: 'pulse-luxury' },
    { name: "Angel Feathers", price: 4000, image: "https://em-content.zobj.net/source/apple/391/feather_1fab6.png", animation: 'fly-across' },
    { name: "Comet Strike", price: 45000, image: "https://em-content.zobj.net/source/apple/391/comet_2604-fe0f.png", animation: 'fly-across' },
    { name: "Cursed Treasure", price: 16666, image: "https://em-content.zobj.net/source/apple/391/skull-and-crossbones_2620-fe0f.png", animation: 'tada' },
    { name: "Sacred Scroll", price: 5500, image: "https://em-content.zobj.net/source/apple/391/scroll_1f4dc.png", animation: 'shimmer' },
    { name: "Enchanted Rose", price: 2500, image: "https://em-content.zobj.net/source/apple/391/rose_1f339.png", animation: 'pulse-luxury' },
    { name: "Cupid's Arrow", price: 3333, image: "https://em-content.zobj.net/source/apple/391/heart-with-arrow_1f498.png", animation: 'fly-across' },
    { name: "Golden Apple", price: 8888, image: "https://em-content.zobj.net/source/apple/391/green-apple_1f34f.png", animation: 'shimmer' },
    { name: "Lightning Bolt", price: 7777, image: "https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png", animation: 'bounce' },
    { name: "Summoning Circle", price: 14000, image: "https://em-content.zobj.net/source/apple/391/dotted-six-pointed-star_1f52f.png", animation: 'spin-slow' },
    { name: "Ghost Ship", price: 17500, image: "https://em-content.zobj.net/source/apple/391/sailboat_26f5.png", animation: 'fly-across' },
    { name: "Heart of the Ocean", price: 99999, image: "https://em-content.zobj.net/source/apple/391/blue-heart_1f499.png", animation: 'shimmer' },
    { name: "Kraken", price: 33000, image: "https://em-content.zobj.net/source/apple/391/octopus_1f419.png", animation: 'bounce' },
    { name: "Meteor Shower", price: 55000, image: "https://em-content.zobj.net/source/apple/391/comet_2604-fe0f.png", animation: 'fly-across' },
    { name: "Pocket Dimension", price: 120000, image: "https://em-content.zobj.net/source/apple/391/hole_1f573-fe0f.png", animation: 'pulse-luxury' },
    { name: "Raining Coins", price: 4999, image: "https://em-content.zobj.net/source/apple/391/coin_1fa99.png", animation: 'bounce' },
    { name: "Spirit Wolf", price: 11000, image: "https://em-content.zobj.net/source/apple/391/wolf_1f43a.png", animation: 'shimmer' },
    { name: "Sun Stone", price: 44000, image: "https://em-content.zobj.net/source/apple/391/sun_2600-fe0f.png", animation: 'shimmer' },
    { name: "Moon Stone", price: 44000, image: "https://em-content.zobj.net/source/apple/391/new-moon_1f311.png", animation: 'shimmer' },
    { name: "Earthquake", price: 23000, image: "https://em-content.zobj.net/source/apple/391/volcano_1f30b.png", animation: 'bounce' },
    { name: "Tsunami", price: 24000, image: "https://em-content.zobj.net/source/apple/391/water-wave_1f30a.png", animation: 'bounce' },
    { name: "Tornado", price: 22000, image: "https://em-content.zobj.net/source/apple/391/tornado_1f32a-fe0f.png", animation: 'spin-slow' },
    { name: "Blizzard", price: 21000, image: "https://em-content.zobj.net/source/apple/391/snowflake_2744-fe0f.png", animation: 'bounce' },
    { name: "Sandstorm", price: 20000, image: "https://em-content.zobj.net/source/apple/391/desert_1f3dc-fe0f.png", animation: 'spin-slow' },
    { name: "Solar Flare", price: 65000, image: "https://em-content.zobj.net/source/apple/391/sun-with-face_1f31e.png", animation: 'pulse-luxury' },
    { name: "Mystical Orb", price: 12345, image: "https://em-content.zobj.net/source/apple/391/crystal-ball_1f52e.png", animation: 'spin-slow' },
    { name: "Clover Field", price: 777, image: "https://em-content.zobj.net/source/apple/391/four-leaf-clover_1f340.png", animation: 'bounce' },
    { name: "Golden Harp", price: 8500, image: "https://em-content.zobj.net/source/apple/391/violin_1f3bb.png", animation: 'shimmer' },
    { name: "Diamond Sword", price: 11500, image: "https://em-content.zobj.net/source/apple/391/crossed-swords_2694-fe0f.png", animation: 'shimmer' },
    { name: "Fairy Dust", price: 999, image: "https://em-content.zobj.net/source/apple/391/sparkles_2728.png", animation: 'bounce' },
    { name: "Magic Potion", price: 1500, image: "https://em-content.zobj.net/source/apple/391/alembic_2697-fe0f.png", animation: 'tada' },
    { name: "Cinderella's Slipper", price: 9999, image: "https://em-content.zobj.net/source/apple/391/woman-s-sandal_1f461.png", animation: 'shimmer' },
    { name: "Treant", price: 19000, image: "https://em-content.zobj.net/source/apple/391/evergreen-tree_1f332.png", animation: 'bounce' },
    { name: "Golem", price: 18000, image: "https://em-content.zobj.net/source/apple/391/rock_1faa8.png", animation: 'bounce' },
    { name: "Djinn Lamp", price: 16000, image: "https://em-content.zobj.net/source/apple/391/amphora_1f3fa.png", animation: 'pulse-luxury' },
    { name: "Flying Broomstick", price: 6500, image: "https://em-content.zobj.net/source/apple/391/broom_1f9f9.png", animation: 'fly-across' },
    { name: "Holy Grail", price: 250000, image: "https://em-content.zobj.net/source/apple/391/goblet-of-fire_1f3c3.png", animation: 'shimmer' },
    { name: "Manticore", price: 17000, image: "https://em-content.zobj.net/source/apple/391/lion_1f981.png", animation: 'bounce' },
    { name: "Rainbow Bridge", price: 30000, image: "https://em-content.zobj.net/source/apple/391/bridge-at-night_1f309.png", animation: 'shimmer' },
    { name: "Angel Wings", price: 15555, image: "https://em-content.zobj.net/source/apple/391/feather_1fab6.png", animation: 'fly-across' },
    { name: "Devil's Trident", price: 16666, image: "https://em-content.zobj.net/source/apple/391/trident-emblem_1f531.png", animation: 'tada' },
    { name: "God's Hammer", price: 55000, image: "https://em-content.zobj.net/source/apple/391/hammer_1f528.png", animation: 'bounce' },
    { name: "Eternal Flame", price: 13500, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", animation: 'pulse-luxury' },
    { name: "Ice Fortress", price: 48000, image: "https://em-content.zobj.net/source/apple/391/castle_1f3f0.png", animation: 'shimmer' },
    { name: "Poison Apple", price: 666, image: "https://em-content.zobj.net/source/apple/391/green-apple_1f34f.png", animation: 'tada' },
    { name: "Magic Mirror", price: 4500, image: "https://em-content.zobj.net/source/apple/391/mirror_1fa9e.png", animation: 'pulse-luxury' },
    { name: "Charming Prince", price: 5200, image: "https://em-content.zobj.net/source/apple/391/prince_1f934.png", animation: 'tada' },
    { name: "Beautiful Princess", price: 5200, image: "https://em-content.zobj.net/source/apple/391/princess_1f478.png", animation: 'tada' },
    { name: "Loyal Knight", price: 4800, image: "https://em-content.zobj.net/source/apple/391/shield_1f6e1-fe0f.png", animation: 'bounce' },
    { name: "Treasure Map", price: 1500, image: "https://em-content.zobj.net/source/apple/391/world-map_1f5fa-fe0f.png", animation: 'shimmer' },
    { name: "Golden Goose", price: 11000, image: "https://em-content.zobj.net/source/apple/391/goose_1fabf.png", animation: 'bounce' },
    { name: "Singing Sword", price: 8500, image: "https://em-content.zobj.net/source/apple/391/dagger_1f5e1-fe0f.png", animation: 'tada' },
    { name: "Invisible Cloak", price: 14500, image: "https://em-content.zobj.net/source/apple/391/coat_1f9e5.png", animation: 'shimmer' },
    { name: "Flying Ship", price: 70000, image: "https://em-content.zobj.net/source/apple/391/ship_1f6a2.png", animation: 'fly-across' },
    { name: "Moonlight Serenade", price: 3800, image: "https://em-content.zobj.net/source/apple/391/full-moon_1f315.png", animation: 'pulse-luxury' },
    { name: "Starlight Kiss", price: 4200, image: "https://em-content.zobj.net/source/apple/391/kiss-mark_1f48b.png", animation: 'shimmer' },
    { name: "Diamond Rain", price: 60000, image: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png", animation: 'bounce' },
    { name: "Gold Rush", price: 50000, image: "https://em-content.zobj.net/source/apple/391/coin_1fa99.png", animation: 'bounce' },
    { name: "Loveboat", price: 28000, image: "https://em-content.zobj.net/source/apple/391/speedboat_1f6a4.png", animation: 'fly-across' },
    { name: "Dream Catcher", price: 2800, image: "https://em-content.zobj.net/source/apple/391/spider-web_1f578-fe0f.png", animation: 'spin-slow' },
    { name: "Northern Lights", price: 26000, image: "https://em-content.zobj.net/source/apple/391/rainbow_1f308.png", animation: 'shimmer' },
    { name: "Mystic Forest", price: 19500, image: "https://em-content.zobj.net/source/apple/391/national-park_1f3de-fe0f.png", animation: 'pulse-luxury' },
    { name: "Volcanic Eruption", price: 45000, image: "https://em-content.zobj.net/source/apple/391/volcano_1f30b.png", animation: 'bounce' },
    { name: "Coral Reef", price: 18500, image: "https://em-content.zobj.net/source/apple/391/coral_1fab8.png", animation: 'pulse-luxury' },
    { name: "Genie in a Bottle", price: 17777, image: "https://em-content.zobj.net/source/apple/391/genie_1f9de.png", animation: 'tada' },
    { name: "Unicorn Stampede", price: 33333, image: "https://em-content.zobj.net/source/apple/391/unicorn_1f984.png", animation: 'fly-across' },
    { name: "Dragon's Lair", price: 29000, image: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png", animation: 'pulse-luxury' },
    { name: "Mermaid's Song", price: 24000, image: "https://em-content.zobj.net/source/apple/391/mermaid_1f9dc-200d-2640-fe0f.png", animation: 'tada' },
    { name: "God of Fortune", price: 88888, image: "https://em-content.zobj.net/source/apple/391/man-in-tuxedo_1f935.png", animation: 'shimmer' },
    { name: "Eternal Love", price: 52013, image: "https://em-content.zobj.net/source/apple/391/couple-with-heart-woman-woman_1f469-200d-2764-fe0f-200d-1f469.png", animation: 'pulse-luxury' },
    { name: "Royal Parade", price: 47000, image: "https://em-content.zobj.net/source/apple/391/horse-racing_1f3c7.png", animation: 'fly-across' },
    { name: "Interstellar Journey", price: 95000, image: "https://em-content.zobj.net/source/apple/391/rocket_1f680.png", animation: 'fly-across' },
    { name: "Diamond Waterfall", price: 77000, image: "https://em-content.zobj.net/source/apple/391/waterfall_1f3de-fe0f.png", animation: 'bounce' },
    { name: "Golden Chariot", price: 68000, image: "https://em-content.zobj.net/source/apple/391/articulated-lorry_1f69b.png", animation: 'fly-across' },
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


export function GiftPanel({ onSendGift }: { onSendGift: (gift: Gift) => void }) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(gifts.hot[0]);
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState("All");

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  }

  const getAnimationClass = (gift: Gift) => {
    if ('animation' in gift) {
        switch (gift.animation) {
            case 'fly-across': return 'animate-fly-across';
            case 'shimmer': return 'animate-shimmer';
            case 'pulse-luxury': return 'animate-pulse-luxury';
            case 'tada': return 'animate-tada';
            case 'bounce': return 'animate-bounce';
            case 'spin-slow': return 'animate-spin-slow';
            default: return '';
        }
    }
    return '';
  }
  
  const handleSend = () => {
    if (selectedGift) {
        onSendGift(selectedGift);
    }
  }

  return (
    <div className="absolute inset-0 bg-[#1F0A2E]/90 backdrop-blur-sm flex flex-col p-2 rounded-t-lg">
      <Tabs defaultValue="hot" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="bg-transparent p-0 justify-start gap-4 border-b border-white/10">
          <TabsTrigger value="hot" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Hot</TabsTrigger>
          <TabsTrigger value="event" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Event</TabsTrigger>
          <TabsTrigger value="luxury" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Luxury</TabsTrigger>
          <TabsTrigger value="family" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Family</TabsTrigger>
          <TabsTrigger value="exclusive" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Exclusive</TabsTrigger>
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
                                onClick={() => setSelectedGift(gift as Gift)}
                            >
                                <div className={cn("w-12 h-12 relative flex items-center justify-center overflow-hidden", (category === 'luxury' || category === 'exclusive' || category === 'hot') && 'p-1')}>
                                    <Image
                                      src={gift.image}
                                      alt={gift.name}
                                      width={48}
                                      height={48}
                                      unoptimized={true}
                                      className={cn(getAnimationClass(gift as Gift))}
                                    />
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
         <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-1 bg-black/20 rounded-full h-9 px-3 border border-white/20 text-sm">
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
            <Button className="bg-gradient-to-r from-pink-500 to-orange-400 h-9" onClick={handleSend}>
                Send
            </Button>
        </div>
      </div>
    </div>
  );
}

    