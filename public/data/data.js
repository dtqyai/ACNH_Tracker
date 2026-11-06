import { shiftMonths } from './schema.js';
import { MUSIC_DATA } from './music-data.js';
import { ART_DATA } from './art-data.js';
import { VILLAGER_DATA } from './villager-data.js';

const FISH_DATA = [
  {
    id: "fish_001",
    name: "红目鲫",
    image: "./images/fish/fish_001.png",
    location: "河流",
    shadowSize: "特小",
    northMonths: [1,2,3,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 900
  },
  {
    id: "fish_002",
    name: "溪哥",
    image: "./images/fish/fish_002.png",
    location: "河流",
    shadowSize: "特小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [9,10,11,12,13,14,15],
    price: 200
  },
  {
    id: "fish_003",
    name: "鲫鱼",
    image: "./images/fish/fish_003.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 160
  },
  {
    id: "fish_004",
    name: "雅罗鱼",
    image: "./images/fish/fish_004.png",
    location: "河流",
    shadowSize: "中",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 240
  },
  {
    id: "fish_005",
    name: "鲤鱼",
    image: "./images/fish/fish_005.png",
    location: "池塘",
    shadowSize: "稍大",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 300
  },
  {
    id: "fish_006",
    name: "锦鲤",
    image: "./images/fish/fish_006.png",
    location: "池塘",
    shadowSize: "稍大",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 4000
  },
  {
    id: "fish_007",
    name: "金鱼",
    image: "./images/fish/fish_007.png",
    location: "池塘",
    shadowSize: "特小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1300
  },
  {
    id: "fish_008",
    name: "龙睛金鱼",
    image: "./images/fish/fish_008.png",
    location: "池塘",
    shadowSize: "特小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [9,10,11,12,13,14,15],
    price: 1300
  },
  {
    id: "fish_009",
    name: "兰寿金鱼",
    image: "./images/fish/fish_009.png",
    location: "池塘",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [9,10,11,12,13,14,15],
    price: 4500
  },
  {
    id: "fish_010",
    name: "稻田鱼",
    image: "./images/fish/fish_010.png",
    location: "池塘",
    shadowSize: "特小",
    northMonths: [4,5,6,7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 300
  },
  {
    id: "fish_011",
    name: "淡水龙虾",
    image: "./images/fish/fish_011.png",
    location: "池塘",
    shadowSize: "稍小",
    northMonths: [4,5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 200
  },
  {
    id: "fish_012",
    name: "鳖",
    image: "./images/fish/fish_012.png",
    location: "河流",
    shadowSize: "稍大",
    northMonths: [8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 3750
  },
  {
    id: "fish_013",
    name: "拟鳄龟",
    image: "./images/fish/fish_013.png",
    location: "河流",
    shadowSize: "稍大",
    northMonths: [4,5,6,7,8,9,10],
    hours: [0,1,2,3,21,22,23],
    price: 5000
  },
  {
    id: "fish_014",
    name: "蝌蚪",
    image: "./images/fish/fish_014.png",
    location: "池塘",
    shadowSize: "特小",
    northMonths: [3,4,5,6,7],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 100
  },
  {
    id: "fish_015",
    name: "青蛙",
    image: "./images/fish/fish_015.png",
    location: "池塘",
    shadowSize: "稍小",
    northMonths: [5,6,7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 120
  },
  {
    id: "fish_016",
    name: "塘鳢鱼",
    image: "./images/fish/fish_016.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 400
  },
  {
    id: "fish_017",
    name: "泥鳅",
    image: "./images/fish/fish_017.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [3,4,5],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 400
  },
  {
    id: "fish_018",
    name: "鲶鱼",
    image: "./images/fish/fish_018.png",
    location: "池塘",
    shadowSize: "稍大",
    northMonths: [5,6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 800
  },
  {
    id: "fish_019",
    name: "黑鱼",
    image: "./images/fish/fish_019.png",
    location: "池塘",
    shadowSize: "稍大",
    northMonths: [6,7,8],
    hours: [9,10,11,12,13,14,15],
    price: 5500
  },
  {
    id: "fish_020",
    name: "蓝腮太阳鱼",
    image: "./images/fish/fish_020.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [9,10,11,12,13,14,15],
    price: 180
  },
  {
    id: "fish_021",
    name: "黄鲈鱼",
    image: "./images/fish/fish_021.png",
    location: "河流",
    shadowSize: "中",
    northMonths: [1,2,3,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 300
  },
  {
    id: "fish_022",
    name: "黑鲈鱼",
    image: "./images/fish/fish_022.png",
    location: "河流",
    shadowSize: "稍大",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 400
  },
  {
    id: "fish_023",
    name: "吴郭鱼",
    image: "./images/fish/fish_023.png",
    location: "河流",
    shadowSize: "中",
    northMonths: [6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 800
  },
  {
    id: "fish_024",
    name: "白斑狗鱼",
    image: "./images/fish/fish_024.png",
    location: "河流",
    shadowSize: "大",
    northMonths: [9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1800
  },
  {
    id: "fish_025",
    name: "西太公鱼",
    image: "./images/fish/fish_025.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [1,2,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 400
  },
  {
    id: "fish_026",
    name: "香鱼",
    image: "./images/fish/fish_026.png",
    location: "河流",
    shadowSize: "中",
    northMonths: [7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 900
  },
  {
    id: "fish_027",
    name: "樱花钩吻鲑",
    image: "./images/fish/fish_027.png",
    location: "悬崖上",
    shadowSize: "中",
    northMonths: [3,4,5,6,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    northSeasons: [
      { months: [3,4,5,6], hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23] },
      { months: [9,10,11], hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] }
    ],
    price: 1000
  },
  {
    id: "fish_028",
    name: "花羔红点鲑",
    image: "./images/fish/fish_028.png",
    location: "悬崖上",
    shadowSize: "中",
    northMonths: [3,4,5,6,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    northSeasons: [
      { months: [3,4,5,6], hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23] },
      { months: [9,10,11], hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] }
    ],
    price: 3800
  },
  {
    id: "fish_029",
    name: "金鳟",
    image: "./images/fish/fish_029.png",
    location: "悬崖上",
    shadowSize: "中",
    northMonths: [3,4,5,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 15000
  },
  {
    id: "fish_030",
    name: "远东哲罗鱼",
    image: "./images/fish/fish_030.png",
    location: "悬崖上",
    shadowSize: "大",
    northMonths: [1,2,3,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 15000
  },
  {
    id: "fish_031",
    name: "鲑鱼",
    image: "./images/fish/fish_031.png",
    location: "出海口",
    shadowSize: "稍大",
    northMonths: [9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 700
  },
  {
    id: "fish_032",
    name: "帝王鲑",
    image: "./images/fish/fish_032.png",
    location: "出海口",
    shadowSize: "大",
    northMonths: [9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1800
  },
  {
    id: "fish_033",
    name: "中华绒螯蟹",
    image: "./images/fish/fish_033.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 2000
  },
  {
    id: "fish_034",
    name: "孔雀鱼",
    image: "./images/fish/fish_034.png",
    location: "河流",
    shadowSize: "特小",
    northMonths: [4,5,6,7,8,9,10,11],
    hours: [9,10,11,12,13,14,15],
    price: 1300
  },
  {
    id: "fish_035",
    name: "温泉医生鱼",
    image: "./images/fish/fish_035.png",
    location: "河流",
    shadowSize: "特小",
    northMonths: [5,6,7,8,9],
    hours: [9,10,11,12,13,14,15],
    price: 1500
  },
  {
    id: "fish_036",
    name: "神仙鱼",
    image: "./images/fish/fish_036.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [5,6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 3000
  },
  {
    id: "fish_037",
    name: "斗鱼",
    image: "./images/fish/fish_037.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [5,6,7,8,9,10],
    hours: [9,10,11,12,13,14,15],
    price: 2500
  },
  {
    id: "fish_038",
    name: "霓虹灯鱼",
    image: "./images/fish/fish_038.png",
    location: "河流",
    shadowSize: "特小",
    northMonths: [4,5,6,7,8,9,10,11],
    hours: [9,10,11,12,13,14,15],
    price: 500
  },
  {
    id: "fish_039",
    name: "彩虹鱼",
    image: "./images/fish/fish_039.png",
    location: "河流",
    shadowSize: "特小",
    northMonths: [5,6,7,8,9,10],
    hours: [9,10,11,12,13,14,15],
    price: 800
  },
  {
    id: "fish_040",
    name: "食人鱼",
    image: "./images/fish/fish_040.png",
    location: "河流",
    shadowSize: "稍小",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,9,10,11,12,13,14,15,21,22,23],
    price: 2500
  },
  {
    id: "fish_041",
    name: "骨舌鱼",
    image: "./images/fish/fish_041.png",
    location: "河流",
    shadowSize: "稍大",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 10000
  },
  {
    id: "fish_042",
    name: "黄金河虎",
    image: "./images/fish/fish_042.png",
    location: "河流",
    shadowSize: "大",
    northMonths: [6,7,8,9],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    price: 15000
  },
  {
    id: "fish_043",
    name: "雀鳝",
    image: "./images/fish/fish_043.png",
    location: "池塘",
    shadowSize: "大",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 6000
  },
  {
    id: "fish_044",
    name: "巨骨舌鱼",
    image: "./images/fish/fish_044.png",
    location: "河流",
    shadowSize: "特大",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 10000
  },
  {
    id: "fish_045",
    name: "恩氏多鳍鱼",
    image: "./images/fish/fish_045.png",
    location: "河流",
    shadowSize: "稍大",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,21,22,23],
    price: 4000
  },
  {
    id: "fish_046",
    name: "鲟鱼",
    image: "./images/fish/fish_046.png",
    location: "出海口",
    shadowSize: "特大",
    northMonths: [1,2,3,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 10000
  },
  {
    id: "fish_047",
    name: "海天使",
    image: "./images/fish/fish_047.png",
    location: "大海",
    shadowSize: "特小",
    northMonths: [1,2,3,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1000
  },
  {
    id: "fish_048",
    name: "海马",
    image: "./images/fish/fish_048.png",
    location: "大海",
    shadowSize: "特小",
    northMonths: [4,5,6,7,8,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1100
  },
  {
    id: "fish_049",
    name: "小丑鱼",
    image: "./images/fish/fish_049.png",
    location: "大海",
    shadowSize: "特小",
    northMonths: [4,5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 650
  },
  {
    id: "fish_050",
    name: "拟刺尾鲷",
    image: "./images/fish/fish_050.png",
    location: "大海",
    shadowSize: "稍小",
    northMonths: [4,5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1000
  },
  {
    id: "fish_051",
    name: "耳带蝴蝶鱼",
    image: "./images/fish/fish_051.png",
    location: "大海",
    shadowSize: "稍小",
    northMonths: [4,5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1000
  },
  {
    id: "fish_052",
    name: "苏眉鱼",
    image: "./images/fish/fish_052.png",
    location: "大海",
    shadowSize: "特大",
    northMonths: [7,8],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    price: 10000
  },
  {
    id: "fish_053",
    name: "狮子鱼",
    image: "./images/fish/fish_053.png",
    location: "大海",
    shadowSize: "中",
    northMonths: [4,5,6,7,8,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 500
  },
  {
    id: "fish_054",
    name: "河豚",
    image: "./images/fish/fish_054.png",
    location: "大海",
    shadowSize: "中",
    northMonths: [1,2,11,12],
    hours: [0,1,2,3,21,22,23],
    price: 5000
  },
  {
    id: "fish_055",
    name: "刺豚",
    image: "./images/fish/fish_055.png",
    location: "大海",
    shadowSize: "中",
    northMonths: [7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 250
  },
  {
    id: "fish_056",
    name: "凤尾鱼",
    image: "./images/fish/fish_056.png",
    location: "大海",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    price: 200
  },
  {
    id: "fish_057",
    name: "竹荚鱼",
    image: "./images/fish/fish_057.png",
    location: "大海",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 150
  },
  {
    id: "fish_058",
    name: "条石鲷",
    image: "./images/fish/fish_058.png",
    location: "大海",
    shadowSize: "中",
    northMonths: [3,4,5,6,7,8,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 5000
  },
  {
    id: "fish_059",
    name: "鲈鱼",
    image: "./images/fish/fish_059.png",
    location: "大海",
    shadowSize: "大",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 400
  },
  {
    id: "fish_060",
    name: "鲷鱼",
    image: "./images/fish/fish_060.png",
    location: "大海",
    shadowSize: "稍大",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 3000
  },
  {
    id: "fish_061",
    name: "鲽鱼",
    image: "./images/fish/fish_061.png",
    location: "大海",
    shadowSize: "中",
    northMonths: [1,2,3,4,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 300
  },
  {
    id: "fish_062",
    name: "比目鱼",
    image: "./images/fish/fish_062.png",
    location: "大海",
    shadowSize: "大",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 800
  },
  {
    id: "fish_063",
    name: "鱿鱼",
    image: "./images/fish/fish_063.png",
    location: "大海",
    shadowSize: "中",
    northMonths: [1,2,3,4,5,6,7,8,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 500
  },
  {
    id: "fish_064",
    name: "裸胸鳝",
    image: "./images/fish/fish_064.png",
    location: "大海",
    shadowSize: "细长",
    northMonths: [8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 2000
  },
  {
    id: "fish_065",
    name: "五彩鳗",
    image: "./images/fish/fish_065.png",
    location: "大海",
    shadowSize: "细长",
    northMonths: [6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 600
  },
  {
    id: "fish_066",
    name: "鲔鱼",
    image: "./images/fish/fish_066.png",
    location: "码头",
    shadowSize: "特大",
    northMonths: [1,2,3,4,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 7000
  },
  {
    id: "fish_067",
    name: "旗鱼",
    image: "./images/fish/fish_067.png",
    location: "码头",
    shadowSize: "特大",
    northMonths: [1,2,3,4,7,8,9,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 10000
  },
  {
    id: "fish_068",
    name: "白面弄鱼",
    image: "./images/fish/fish_068.png",
    location: "码头",
    shadowSize: "大",
    northMonths: [5,6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 4500
  },
  {
    id: "fish_069",
    name: "鬼头刀",
    image: "./images/fish/fish_069.png",
    location: "码头",
    shadowSize: "大",
    northMonths: [5,6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 6000
  },
  {
    id: "fish_070",
    name: "翻车鱼",
    image: "./images/fish/fish_070.png",
    location: "大海",
    shadowSize: "背鳍",
    northMonths: [7,8,9],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    price: 4000
  },
  {
    id: "fish_071",
    name: "鳐鱼",
    image: "./images/fish/fish_071.png",
    location: "大海",
    shadowSize: "大",
    northMonths: [8,9,10,11],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    price: 3000
  },
  {
    id: "fish_072",
    name: "锯鲨",
    image: "./images/fish/fish_072.png",
    location: "大海",
    shadowSize: "背鳍",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 12000
  },
  {
    id: "fish_073",
    name: "双髻鲨",
    image: "./images/fish/fish_073.png",
    location: "大海",
    shadowSize: "背鳍",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 8000
  },
  {
    id: "fish_074",
    name: "鲨鱼",
    image: "./images/fish/fish_074.png",
    location: "大海",
    shadowSize: "背鳍",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 15000
  },
  {
    id: "fish_075",
    name: "鲸鲨",
    image: "./images/fish/fish_075.png",
    location: "大海",
    shadowSize: "背鳍",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 13000
  },
  {
    id: "fish_076",
    name: "吸盘鱼",
    image: "./images/fish/fish_076.png",
    location: "大海",
    shadowSize: "背鳍",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1500
  },
  {
    id: "fish_077",
    name: "灯笼鱼",
    image: "./images/fish/fish_077.png",
    location: "大海",
    shadowSize: "稍大",
    northMonths: [1,2,3,11,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 2500
  },
  {
    id: "fish_078",
    name: "皇带鱼",
    image: "./images/fish/fish_078.png",
    location: "大海",
    shadowSize: "特大",
    northMonths: [1,2,3,4,5,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 9000
  },
  {
    id: "fish_079",
    name: "太平洋桶眼鱼",
    image: "./images/fish/fish_079.png",
    location: "大海",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,21,22,23],
    price: 15000
  },
  {
    id: "fish_080",
    name: "矛尾鱼",
    image: "./images/fish/fish_080.png",
    location: "大海",
    shadowSize: "特大",
    weather: "雨天",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 15000
  }
];

const BUG_DATA = [
  {
    id: "bug_001",
    name: "白粉蝶",
    image: "./images/bug/bug_001.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [1,2,3,4,5,6,9,10,11,12],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    price: 160
  },
  {
    id: "bug_002",
    name: "斑缘点粉蝶",
    image: "./images/bug/bug_002.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [3,4,5,6,9,10],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    price: 160
  },
  {
    id: "bug_003",
    name: "凤蝶",
    image: "./images/bug/bug_003.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [3,4,5,6,7,8,9],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    price: 240
  },
  {
    id: "bug_004",
    name: "乌鸦凤蝶",
    image: "./images/bug/bug_004.png",
    location: "绿地",
    note: "飞行；异色花附近",
    weather: "雨雪天除外",
    northMonths: [3,4,5,6],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    price: 2500
  },
  {
    id: "bug_005",
    name: "青带凤蝶",
    image: "./images/bug/bug_005.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [4,5,6,7,8],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    price: 300
  },
  {
    id: "bug_006",
    name: "大白斑蝶",
    image: "./images/bug/bug_006.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [8,9,10,11,12,13,14,15,16,17,18],
    price: 1000
  },
  {
    id: "bug_007",
    name: "大紫蛱蝶",
    image: "./images/bug/bug_007.png",
    location: "绿地",
    note: "飞行",
    weather: "无限制",
    northMonths: [5,6,7,8],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    price: 3000
  },
  {
    id: "bug_008",
    name: "大桦斑蝶",
    image: "./images/bug/bug_008.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [9,10,11],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16],
    price: 140
  },
  {
    id: "bug_009",
    name: "大蓝闪蝶",
    image: "./images/bug/bug_009.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [1,2,3,6,7,8,9,12],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 4000
  },
  {
    id: "bug_010",
    name: "彩袄蛱蝶",
    image: "./images/bug/bug_010.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [4,5,6,7,8,9],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 3000
  },
  {
    id: "bug_011",
    name: "红颈凤蝶",
    image: "./images/bug/bug_011.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [1,2,4,5,6,7,8,9,12],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 2500
  },
  {
    id: "bug_012",
    name: "亚历山大凤蝶",
    image: "./images/bug/bug_012.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [5,6,7,8,9],
    hours: [8,9,10,11,12,13,14,15],
    price: 4000
  },
  {
    id: "bug_013",
    name: "飞蛾",
    image: "./images/bug/bug_013.png",
    location: "其他",
    note: "户外灯光附近飞行",
    weather: "雨雪天除外",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,19,20,21,22,23],
    price: 130
  },
  {
    id: "bug_014",
    name: "皇蛾",
    image: "./images/bug/bug_014.png",
    location: "树干",
    weather: "无限制",
    northMonths: [4,5,6,7,8,9],
    hours: [0,1,2,3,19,20,21,22,23],
    price: 3000
  },
  {
    id: "bug_015",
    name: "日落蛾",
    image: "./images/bug/bug_015.png",
    location: "绿地",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [4,5,6,7,8,9],
    hours: [8,9,10,11,12,13,14,15],
    price: 2500
  },
  {
    id: "bug_016",
    name: "中华剑角蝗",
    image: "./images/bug/bug_016.png",
    location: "草地",
    note: "地面跳跃",
    weather: "无限制",
    northMonths: [4,5,6,7,8,9,10,11],
    hours: [8,9,10,11,12,13,14,15,16,17,18],
    price: 200
  },
  {
    id: "bug_017",
    name: "飞蝗",
    image: "./images/bug/bug_017.png",
    location: "草地",
    note: "地面跳跃",
    weather: "雨雪天除外",
    northMonths: [8,9,10,11],
    hours: [8,9,10,11,12,13,14,15,16,17,18],
    price: 600
  },
  {
    id: "bug_018",
    name: "稻蝗",
    image: "./images/bug/bug_018.png",
    location: "草地",
    note: "地面跳跃",
    weather: "雨雪天除外",
    northMonths: [8,9,10,11],
    hours: [8,9,10,11,12,13,14,15,16,17,18],
    price: 400
  },
  {
    id: "bug_019",
    name: "蚱蜢",
    image: "./images/bug/bug_019.png",
    location: "草地",
    note: "地面跳跃",
    weather: "雨雪天除外",
    northMonths: [7,8,9],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 160
  },
  {
    id: "bug_020",
    name: "蟋蟀",
    image: "./images/bug/bug_020.png",
    location: "草地",
    note: "地面跳跃",
    weather: "雨雪天除外",
    northMonths: [9,10,11],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 130
  },
  {
    id: "bug_021",
    name: "铃虫",
    image: "./images/bug/bug_021.png",
    location: "草地",
    note: "地面跳跃",
    weather: "雨雪天除外",
    northMonths: [9,10],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 430
  },
  {
    id: "bug_022",
    name: "螳螂",
    image: "./images/bug/bug_022.png",
    location: "花朵",
    note: "会逃走",
    weather: "雨雪天除外",
    northMonths: [3,4,5,6,7,8,9,10,11],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 430
  },
  {
    id: "bug_023",
    name: "兰花螳螂",
    image: "./images/bug/bug_023.png",
    location: "花朵",
    note: "白色花；会逃走",
    weather: "雨雪天除外",
    northMonths: [3,4,5,6,7,8,9,10,11],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 2400
  },
  {
    id: "bug_024",
    name: "蜜蜂",
    image: "./images/bug/bug_024.png",
    location: "花朵",
    note: "花丛附近飞行",
    weather: "雨雪天除外",
    northMonths: [3,4,5,6,7],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 200
  },
  {
    id: "bug_025",
    name: "黄蜂",
    image: "./images/bug/bug_025.png",
    location: "树干",
    note: "摇晃或敲击树干，落下蜂巢中出现",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 2500
  },
  {
    id: "bug_026",
    name: "油蝉",
    image: "./images/bug/bug_026.png",
    location: "树干",
    note: "除椰子和香蕉树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 250
  },
  {
    id: "bug_027",
    name: "斑透翅蝉",
    image: "./images/bug/bug_027.png",
    location: "树干",
    note: "除椰子和香蕉树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 300
  },
  {
    id: "bug_028",
    name: "熊蝉",
    image: "./images/bug/bug_028.png",
    location: "树干",
    note: "除椰子和香蕉树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 500
  },
  {
    id: "bug_029",
    name: "寒蝉",
    image: "./images/bug/bug_029.png",
    location: "树干",
    note: "除椰子和香蕉树",
    weather: "无限制",
    northMonths: [8,9],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 400
  },
  {
    id: "bug_030",
    name: "暮蝉",
    image: "./images/bug/bug_030.png",
    location: "树干",
    note: "除椰子和香蕉树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [4,5,6,7,16,17,18],
    price: 550
  },
  {
    id: "bug_031",
    name: "蝉蜕",
    image: "./images/bug/bug_031.png",
    location: "树干",
    note: "除椰子和香蕉树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 10
  },
  {
    id: "bug_032",
    name: "红蜻蜓",
    image: "./images/bug/bug_032.png",
    location: "水边",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [9,10],
    hours: [8,9,10,11,12,13,14,15,16,17,18],
    price: 180
  },
  {
    id: "bug_033",
    name: "绿胸晏蜓",
    image: "./images/bug/bug_033.png",
    location: "水边",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [4,5,6,7,8,9,10],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 230
  },
  {
    id: "bug_034",
    name: "无霸勾蜓",
    image: "./images/bug/bug_034.png",
    location: "水边",
    note: "飞行",
    weather: "雨雪天除外",
    northMonths: [5,6,7,8,9,10],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 4500
  },
  {
    id: "bug_035",
    name: "豆娘",
    image: "./images/bug/bug_035.png",
    location: "水边",
    note: "飞行",
    weather: "雨天除外",
    northMonths: [1,2,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 500
  },
  {
    id: "bug_036",
    name: "萤火虫",
    image: "./images/bug/bug_036.png",
    location: "水边",
    note: "淡水附近飞行",
    weather: "雨雪天除外",
    northMonths: [6],
    hours: [0,1,2,3,19,20,21,22,23],
    price: 300
  },
  {
    id: "bug_037",
    name: "蝼蛄",
    image: "./images/bug/bug_037.png",
    location: "地面",
    note: "听声音挖掘地面",
    weather: "无限制",
    northMonths: [1,2,3,4,5,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 500
  },
  {
    id: "bug_038",
    name: "水黾",
    image: "./images/bug/bug_038.png",
    location: "水中",
    note: "池塘水面滑行",
    weather: "雪天除外",
    northMonths: [5,6,7,8,9],
    hours: [8,9,10,11,12,13,14,15,16,17,18],
    price: 130
  },
  {
    id: "bug_039",
    name: "龙虱",
    image: "./images/bug/bug_039.png",
    location: "水中",
    note: "河流或池塘",
    weather: "无限制",
    northMonths: [5,6,7,8,9],
    hours: [8,9,10,11,12,13,14,15,16,17,18],
    price: 800
  },
  {
    id: "bug_040",
    name: "田鳖",
    image: "./images/bug/bug_040.png",
    location: "水中",
    note: "河流或池塘",
    weather: "无限制",
    northMonths: [4,5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,19,20,21,22,23],
    price: 2000
  },
  {
    id: "bug_041",
    name: "椿象",
    image: "./images/bug/bug_041.png",
    location: "花朵",
    note: "会逃走",
    weather: "无限制",
    northMonths: [3,4,5,6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 120
  },
  {
    id: "bug_042",
    name: "人面樁象",
    image: "./images/bug/bug_042.png",
    location: "花朵",
    note: "会逃走",
    weather: "无限制",
    northMonths: [3,4,5,6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,19,20,21,22,23],
    price: 1000
  },
  {
    id: "bug_043",
    name: "瓢虫",
    image: "./images/bug/bug_043.png",
    location: "花朵",
    note: "会逃走",
    weather: "雨雪天除外",
    northMonths: [3,4,5,6,10],
    hours: [8,9,10,11,12,13,14,15,16],
    price: 200
  },
  {
    id: "bug_044",
    name: "虎甲虫",
    image: "./images/bug/bug_044.png",
    location: "草地",
    note: "地面爬行",
    weather: "雨雪天除外",
    northMonths: [2,3,4,5,6,7,8,9,10],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1500
  },
  {
    id: "bug_045",
    name: "吉丁虫",
    image: "./images/bug/bug_045.png",
    location: "树桩",
    weather: "无限制",
    northMonths: [4,5,6,7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 2400
  },
  {
    id: "bug_046",
    name: "提琴虫",
    image: "./images/bug/bug_046.png",
    location: "树桩",
    weather: "雨雪天除外",
    northMonths: [5,6,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 450
  },
  {
    id: "bug_047",
    name: "星天牛",
    image: "./images/bug/bug_047.png",
    location: "树桩",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 350
  },
  {
    id: "bug_048",
    name: "琉璃星天牛",
    image: "./images/bug/bug_048.png",
    location: "树桩",
    weather: "无限制",
    northMonths: [5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 3000
  },
  {
    id: "bug_049",
    name: "宝石象鼻虫",
    image: "./images/bug/bug_049.png",
    location: "树干",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 800
  },
  {
    id: "bug_050",
    name: "蜣螂",
    image: "./images/bug/bug_050.png",
    location: "其他",
    note: "雪球附近出现",
    weather: "无限制",
    northMonths: [1,2,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 3000
  },
  {
    id: "bug_051",
    name: "雪隐金龟",
    image: "./images/bug/bug_051.png",
    location: "草地",
    note: "地面爬行",
    weather: "无限制",
    northMonths: [7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 300
  },
  {
    id: "bug_052",
    name: "宝石金龟",
    image: "./images/bug/bug_052.png",
    location: "树干",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,23],
    price: 10000
  },
  {
    id: "bug_053",
    name: "日铜锣花金龟",
    image: "./images/bug/bug_053.png",
    location: "树干",
    weather: "无限制",
    northMonths: [6,7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 200
  },
  {
    id: "bug_054",
    name: "歌利亚大角花金龟",
    image: "./images/bug/bug_054.png",
    location: "椰子树",
    weather: "无限制",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 8000
  },
  {
    id: "bug_055",
    name: "锯锹形虫",
    image: "./images/bug/bug_055.png",
    location: "树干",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 2000
  },
  {
    id: "bug_056",
    name: "深山锹形虫",
    image: "./images/bug/bug_056.png",
    location: "树干",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1000
  },
  {
    id: "bug_057",
    name: "大锹形虫",
    image: "./images/bug/bug_057.png",
    location: "树干",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,23],
    price: 10000
  },
  {
    id: "bug_058",
    name: "彩虹锹形虫",
    image: "./images/bug/bug_058.png",
    location: "树干",
    weather: "无限制",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,19,20,21,22,23],
    price: 6000
  },
  {
    id: "bug_059",
    name: "细身赤锹形虫",
    image: "./images/bug/bug_059.png",
    location: "椰子树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 8000
  },
  {
    id: "bug_060",
    name: "黄金鬼锹形虫",
    image: "./images/bug/bug_060.png",
    location: "椰子树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 12000
  },
  {
    id: "bug_061",
    name: "长颈鹿锯锹形虫",
    image: "./images/bug/bug_061.png",
    location: "椰子树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 12000
  },
  {
    id: "bug_062",
    name: "独角仙",
    image: "./images/bug/bug_062.png",
    location: "树干",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 1350
  },
  {
    id: "bug_063",
    name: "高卡萨斯南洋大兜虫",
    image: "./images/bug/bug_063.png",
    location: "椰子树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 8000
  },
  {
    id: "bug_064",
    name: "象兜虫",
    image: "./images/bug/bug_064.png",
    location: "椰子树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 8000
  },
  {
    id: "bug_065",
    name: "长戟大兜虫",
    image: "./images/bug/bug_065.png",
    location: "椰子树",
    weather: "无限制",
    northMonths: [7,8],
    hours: [0,1,2,3,4,5,6,7,17,18,19,20,21,22,23],
    price: 12000
  },
  {
    id: "bug_066",
    name: "竹节虫",
    image: "./images/bug/bug_066.png",
    location: "树干",
    weather: "无限制",
    northMonths: [7,8,9,10,11],
    hours: [4,5,6,7,17,18],
    price: 600
  },
  {
    id: "bug_067",
    name: "叶竹节虫",
    image: "./images/bug/bug_067.png",
    location: "树干",
    note: "拟态为叶片（家具物品形式）",
    weather: "无限制",
    northMonths: [7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 600
  },
  {
    id: "bug_068",
    name: "蓑衣虫",
    image: "./images/bug/bug_068.png",
    location: "树干",
    note: "摇晃或敲击垂下",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 600
  },
  {
    id: "bug_069",
    name: "蚂蚁",
    image: "./images/bug/bug_069.png",
    location: "地面",
    note: "下雨或有腐烂的大头菜时出现",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 80
  },
  {
    id: "bug_070",
    name: "寄居蟹",
    image: "./images/bug/bug_070.png",
    location: "沙滩",
    note: "平时像是个贝壳",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,19,20,21,22,23],
    price: 1000
  },
  {
    id: "bug_071",
    name: "海蟑螂",
    image: "./images/bug/bug_071.png",
    location: "沙滩",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 200
  },
  {
    id: "bug_072",
    name: "苍蝇",
    image: "./images/bug/bug_072.png",
    location: "其他",
    note: "腐烂的大头菜和垃圾附近飞行",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 60
  },
  {
    id: "bug_073",
    name: "蚊子",
    image: "./images/bug/bug_073.png",
    location: "其他",
    note: "随机出现（飞到附近会有嗡嗡声）",
    weather: "雨雪天除外",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,17,18,19,20,21,22,23],
    price: 130
  },
  {
    id: "bug_074",
    name: "跳蚤",
    image: "./images/bug/bug_074.png",
    location: "其他",
    note: "居民身上",
    weather: "无限制",
    northMonths: [4,5,6,7,8,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 70
  },
  {
    id: "bug_075",
    name: "蜗牛",
    image: "./images/bug/bug_075.png",
    location: "岩石",
    note: "岩石或灌木上；会逃走",
    weather: "雨天",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 250
  },
  {
    id: "bug_076",
    name: "鼠妇",
    image: "./images/bug/bug_076.png",
    location: "岩石",
    note: "敲击岩石",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,23],
    price: 250
  },
  {
    id: "bug_077",
    name: "蜈蚣",
    image: "./images/bug/bug_077.png",
    location: "岩石",
    note: "敲击岩石",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,9,10,11,12],
    hours: [16,17,18,19,20,21,22],
    price: 300
  },
  {
    id: "bug_078",
    name: "蜘蛛",
    image: "./images/bug/bug_078.png",
    location: "树干",
    note: "摇晃或敲击垂下",
    weather: "无限制",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,19,20,21,22,23],
    price: 600
  },
  {
    id: "bug_079",
    name: "狼蛛",
    image: "./images/bug/bug_079.png",
    location: "草地",
    note: "地面爬行；靠近会主动攻击",
    weather: "无限制",
    northMonths: [1,2,3,4,11,12],
    hours: [0,1,2,3,19,20,21,22,23],
    price: 8000
  },
  {
    id: "bug_080",
    name: "蝎子",
    image: "./images/bug/bug_080.png",
    location: "草地",
    note: "地面爬行；靠近会主动攻击",
    weather: "无限制",
    northMonths: [5,6,7,8,9,10],
    hours: [0,1,2,3,19,20,21,22,23],
    price: 8000
  }
];

const SEA_DATA = [
  {
    id: "sea_001",
    name: "裙带菜",
    image: "./images/sea/sea_001.png",
    location: "海洋底部",
    shadowSize: "稍大",
    northMonths: [1,2,3,4,5,6,7,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 600
  },
  {
    id: "sea_002",
    name: "海葡萄",
    image: "./images/sea/sea_002.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 900
  },
  {
    id: "sea_003",
    name: "海参",
    image: "./images/sea/sea_003.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [1,2,3,4,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 500
  },
  {
    id: "sea_004",
    name: "海猪",
    image: "./images/sea/sea_004.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [1,2,11,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 10000
  },
  {
    id: "sea_005",
    name: "海星",
    image: "./images/sea/sea_005.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 500
  },
  {
    id: "sea_006",
    name: "海胆",
    image: "./images/sea/sea_006.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1700
  },
  {
    id: "sea_007",
    name: "石笔海胆",
    image: "./images/sea/sea_007.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 2000
  },
  {
    id: "sea_008",
    name: "海葵",
    image: "./images/sea/sea_008.png",
    location: "海洋底部",
    shadowSize: "稍大",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 500
  },
  {
    id: "sea_009",
    name: "海月水母",
    image: "./images/sea/sea_009.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 600
  },
  {
    id: "sea_010",
    name: "海蛞蝓",
    image: "./images/sea/sea_010.png",
    location: "海洋底部",
    shadowSize: "特小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 600
  },
  {
    id: "sea_011",
    name: "马氏珠母贝",
    image: "./images/sea/sea_011.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 2800
  },
  {
    id: "sea_012",
    name: "贻贝",
    image: "./images/sea/sea_012.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1500
  },
  {
    id: "sea_013",
    name: "牡蛎",
    image: "./images/sea/sea_013.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [1,2,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1100
  },
  {
    id: "sea_014",
    name: "虾夷扇贝",
    image: "./images/sea/sea_014.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1200
  },
  {
    id: "sea_015",
    name: "花螺",
    image: "./images/sea/sea_015.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1000
  },
  {
    id: "sea_016",
    name: "角蝾螺",
    image: "./images/sea/sea_016.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [3,4,5,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1000
  },
  {
    id: "sea_017",
    name: "鲍鱼",
    image: "./images/sea/sea_017.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [1,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 2000
  },
  {
    id: "sea_018",
    name: "大砗磲",
    image: "./images/sea/sea_018.png",
    location: "海洋底部",
    shadowSize: "大",
    northMonths: [5,6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 15000
  },
  {
    id: "sea_019",
    name: "鹦鹉螺",
    image: "./images/sea/sea_019.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [3,4,5,6,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 1800
  },
  {
    id: "sea_020",
    name: "章鱼",
    image: "./images/sea/sea_020.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1200
  },
  {
    id: "sea_021",
    name: "扁面蛸",
    image: "./images/sea/sea_021.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [3,4,5,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 6000
  },
  {
    id: "sea_022",
    name: "吸血鬼乌贼",
    image: "./images/sea/sea_022.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [5,6,7,8],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 10000
  },
  {
    id: "sea_023",
    name: "萤火鱿",
    image: "./images/sea/sea_023.png",
    location: "海洋底部",
    shadowSize: "特小",
    northMonths: [3,4,5,6],
    hours: [0,1,2,3,21,22,23],
    price: 1400
  },
  {
    id: "sea_024",
    name: "梭子蟹",
    image: "./images/sea/sea_024.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [6,7,8,9,10,11],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 2200
  },
  {
    id: "sea_025",
    name: "珍宝蟹",
    image: "./images/sea/sea_025.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [1,2,3,4,5,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1900
  },
  {
    id: "sea_026",
    name: "松叶蟹",
    image: "./images/sea/sea_026.png",
    location: "海洋底部",
    shadowSize: "稍大",
    northMonths: [1,2,3,4,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 6000
  },
  {
    id: "sea_027",
    name: "帝王蟹",
    image: "./images/sea/sea_027.png",
    location: "海洋底部",
    shadowSize: "稍大",
    northMonths: [1,2,3,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 8000
  },
  {
    id: "sea_028",
    name: "藤壶",
    image: "./images/sea/sea_028.png",
    location: "海洋底部",
    shadowSize: "特小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 600
  },
  {
    id: "sea_029",
    name: "高脚蟹",
    image: "./images/sea/sea_029.png",
    location: "海洋底部",
    shadowSize: "大",
    northMonths: [3,4],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 12000
  },
  {
    id: "sea_030",
    name: "日本对虾",
    image: "./images/sea/sea_030.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [6,7,8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 3000
  },
  {
    id: "sea_031",
    name: "甜虾",
    image: "./images/sea/sea_031.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [1,2,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 1400
  },
  {
    id: "sea_032",
    name: "虾蛄",
    image: "./images/sea/sea_032.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 2500
  },
  {
    id: "sea_033",
    name: "伊势龙虾",
    image: "./images/sea/sea_033.png",
    location: "海洋底部",
    shadowSize: "稍大",
    northMonths: [10,11,12],
    hours: [0,1,2,3,21,22,23],
    price: 5000
  },
  {
    id: "sea_034",
    name: "龙虾",
    image: "./images/sea/sea_034.png",
    location: "海洋底部",
    shadowSize: "稍大",
    northMonths: [1,4,5,6,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 4500
  },
  {
    id: "sea_035",
    name: "大王具足虫",
    image: "./images/sea/sea_035.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [7,8,9,10],
    hours: [0,1,2,3,9,10,11,12,13,14,15,21,22,23],
    price: 12000
  },
  {
    id: "sea_036",
    name: "鲎",
    image: "./images/sea/sea_036.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [7,8,9],
    hours: [0,1,2,3,21,22,23],
    price: 2500
  },
  {
    id: "sea_037",
    name: "海鞘",
    image: "./images/sea/sea_037.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [4,5,6,7,8],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 1500
  },
  {
    id: "sea_038",
    name: "花园鳗",
    image: "./images/sea/sea_038.png",
    location: "海洋底部",
    shadowSize: "稍小",
    northMonths: [5,6,7,8,9,10],
    hours: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    price: 1100
  },
  {
    id: "sea_039",
    name: "海扁虫",
    image: "./images/sea/sea_039.png",
    location: "海洋底部",
    shadowSize: "特小",
    northMonths: [8,9],
    hours: [0,1,2,3,4,5,6,7,8,16,17,18,19,20,21,22,23],
    price: 700
  },
  {
    id: "sea_040",
    name: "偕老同穴",
    image: "./images/sea/sea_040.png",
    location: "海洋底部",
    shadowSize: "中",
    northMonths: [1,2,10,11,12],
    hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    price: 5000
  }
];

function withDerivedHemisphere(items) {
  return items.map(item => Object.freeze({
    ...item,
    southMonths: Object.freeze(shiftMonths(item.northMonths))
  }));
}

export const DATA_MAP = Object.freeze({
  fish: Object.freeze(withDerivedHemisphere(FISH_DATA)),
  bug: Object.freeze(withDerivedHemisphere(BUG_DATA)),
  sea: Object.freeze(withDerivedHemisphere(SEA_DATA)),
  art: ART_DATA,
  music: MUSIC_DATA,
  villager: VILLAGER_DATA
});
