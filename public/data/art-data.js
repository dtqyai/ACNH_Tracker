// Names and comparison images: BWIKI art catalogue and forgery guide.
// Identification notes checked against Future Press's official companion guide.
// See README data sources for scope and the corrected Moving Painting clue.
// IDs are permanent collection keys; adding or reordering entries must not change them.
const ART_ITEMS = [
  {
    "id": "art_001",
    "name": "学术性的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "维特鲁威人",
    "genuineNote": "右上角没有污渍。",
    "fakeNote": "右上角有圆形咖啡渍。",
    "image": "./images/art/art_001.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_001-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_001-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%AD%A6%E6%9C%AF%E6%80%A7%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_002",
    "name": "惊人的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "夜巡",
    "genuineNote": "前排黑衣男子戴着帽子。",
    "fakeNote": "前排黑衣男子没有帽子。",
    "image": "./images/art/art_002.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_002-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_002-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E6%83%8A%E4%BA%BA%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_003",
    "name": "远古的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "遮光器土偶",
    "genuineNote": "头部两侧没有突出的触角。",
    "fakeNote": "头部两侧有触角。",
    "image": "./images/art/art_003.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_003-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_003-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E8%BF%9C%E5%8F%A4%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_004",
    "name": "勇敢的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "蓝衣少年",
    "genuineNote": "额头露出，刘海较短。",
    "fakeNote": "厚重的刘海遮住额头。",
    "image": "./images/art/art_004.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_004-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_004-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%8B%87%E6%95%A2%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_005",
    "name": "美丽的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "米洛斯的维纳斯",
    "genuineNote": "颈部没有项链。",
    "fakeNote": "颈部多了一条项链。",
    "image": "./images/art/art_005.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_005-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_005-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%BE%8E%E4%B8%BD%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_006",
    "name": "和煦的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "大碗岛的星期天下午",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_006.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_006-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%92%8C%E7%85%A6%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_007",
    "name": "常见的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "拾穗者",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_007.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_007-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%B8%B8%E8%A7%81%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_008",
    "name": "细致的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "紫阳花双鸡图",
    "genuineNote": "花朵为蓝色，并有印章。",
    "fakeNote": "花朵为紫色，缺少印章。",
    "image": "./images/art/art_008.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_008-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_008-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%BB%86%E8%87%B4%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_009",
    "name": "磅礴的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "神奈川冲浪里",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_009.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_009-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%A3%85%E7%A4%B4%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_010",
    "name": "似曾相识的雕塑",
    "artType": "雕塑",
    "authenticity": "仅真品",
    "realName": "思想者",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_010.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_010-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E4%BC%BC%E6%9B%BE%E7%9B%B8%E8%AF%86%E7%9A%84%E9%9B%95%E5%A1%91"
  },
  {
    "id": "art_011",
    "name": "有名的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "蒙娜丽莎",
    "genuineNote": "没有明显上挑的眉毛。",
    "fakeNote": "多了一对上挑的眉毛。",
    "image": "./images/art/art_011.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_011-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_011-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E6%9C%89%E5%90%8D%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_012",
    "name": "珍贵的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "向日葵",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_012.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_012-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%8F%8D%E8%B4%B5%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_013",
    "name": "英挺的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "大卫",
    "genuineNote": "手臂旁没有书。",
    "fakeNote": "右臂下夹着一本书。",
    "image": "./images/art/art_013.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_013-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_013-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E8%8B%B1%E6%8C%BA%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_014",
    "name": "光线的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "被拖去解体的战舰无畏号",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_014.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_014-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%85%89%E7%BA%BF%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_015",
    "name": "端庄的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "回眸美人图",
    "genuineNote": "人物较小，头顶留白较多，面向画面右侧。",
    "fakeNote": "人物放大、头顶留白少；也有面向画面左侧的变化。",
    "image": "./images/art/art_015.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_015-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_015-comparison-2.jpg"
      },
      {
        "label": "赝品的另一种状态",
        "url": "./images/art/art_015-comparison-3.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%AB%AF%E5%BA%84%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_016",
    "name": "伟大的雕塑",
    "artType": "雕塑",
    "authenticity": "仅真品",
    "realName": "卡美哈美哈一世国王像",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_016.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_016-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E4%BC%9F%E5%A4%A7%E7%9A%84%E9%9B%95%E5%A1%91"
  },
  {
    "id": "art_017",
    "name": "线索的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "罗塞塔石碑",
    "genuineNote": "石碑为灰黑色。",
    "fakeNote": "石碑为蓝色。",
    "image": "./images/art/art_017.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_017-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_017-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%BA%BF%E7%B4%A2%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_018",
    "name": "有趣的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "夏季",
    "genuineNote": "胸口有向上伸出的花。",
    "fakeNote": "胸口缺少这朵花。",
    "image": "./images/art/art_018.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_018-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_018-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E6%9C%89%E8%B6%A3%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_019",
    "name": "强健的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "播种者",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_019.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_019-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%BC%BA%E5%81%A5%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_020",
    "name": "充满母爱的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "青铜母狼像",
    "genuineNote": "母狼没有伸出舌头。",
    "fakeNote": "母狼伸出舌头。",
    "image": "./images/art/art_020.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_020-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_020-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%85%85%E6%BB%A1%E6%AF%8D%E7%88%B1%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_021",
    "name": "动人的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "维纳斯的诞生",
    "genuineNote": "画面右上方、女子身后有树。",
    "fakeNote": "右上方的树消失，露出天空。",
    "image": "./images/art/art_021.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_021-comparison-1.png"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_021-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%8A%A8%E4%BA%BA%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_022",
    "name": "神秘的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "死之岛",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_022.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_022.png"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%A5%9E%E7%A7%98%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_023",
    "name": "神秘的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "娜芙蒂蒂胸像",
    "genuineNote": "没有垂下的耳饰。",
    "fakeNote": "多了一枚垂下的长耳饰。",
    "image": "./images/art/art_023.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_023-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_023-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%A5%9E%E7%A7%98%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_024",
    "name": "很好的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "吹笛少年",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_024.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_024-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%BE%88%E5%A5%BD%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_025",
    "name": "厉害的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "苹果与橘子",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_025.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_025-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%8E%89%E5%AE%B3%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_026",
    "name": "热闹的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "女神游乐厅的吧台",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_026.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_026-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%83%AD%E9%97%B9%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_027",
    "name": "平静的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "倒牛奶的女仆",
    "genuineNote": "倒出的牛奶是一道细流。",
    "fakeNote": "倒出的牛奶明显更粗、量更多。",
    "image": "./images/art/art_027.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_027-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_027-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%B9%B3%E9%9D%99%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_028",
    "name": "强壮的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "掷铁饼者",
    "genuineNote": "右手腕没有手表。",
    "fakeNote": "右手腕戴着手表。",
    "image": "./images/art/art_028.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_028-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_028-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%BC%BA%E5%A3%AE%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_029",
    "name": "石头颅雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "奥尔梅克巨石头像",
    "genuineNote": "嘴角下垂，没有笑容。",
    "fakeNote": "嘴角上扬，露出笑容。",
    "image": "./images/art/art_029.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_029-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_029-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%9F%B3%E5%A4%B4%E9%A2%85%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_030",
    "name": "俊俏的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "第三代大谷鬼次之奴江户兵卫",
    "genuineNote": "眉头朝下，表情严肃。",
    "fakeNote": "眉头上扬；也有露出笑容的变化。",
    "image": "./images/art/art_030.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_030-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_030-comparison-2.jpg"
      },
      {
        "label": "赝品的另一种状态",
        "url": "./images/art/art_030-comparison-3.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E4%BF%8A%E4%BF%8F%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_031",
    "name": "优美的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "雪中猎人",
    "genuineNote": "左下方有三名猎人。",
    "fakeNote": "左下方只剩一名猎人，猎犬也变少。",
    "image": "./images/art/art_031.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_031-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_031-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E4%BC%98%E7%BE%8E%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_032",
    "name": "婀娜的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "抱银鼠的女子",
    "genuineNote": "怀中的动物通体为白色。",
    "fakeNote": "动物身上有深色斑块。",
    "image": "./images/art/art_032.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_032-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_032-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%A9%80%E5%A8%9C%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_033",
    "name": "沉没的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "奥菲利亚",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_033.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_033-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E6%B2%89%E9%BB%98%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_034",
    "name": "肃穆的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "宫娥",
    "genuineNote": "后方门口男子的手臂较低。",
    "fakeNote": "后方男子把手抬得更高，指向上方。",
    "image": "./images/art/art_034.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_034-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_034-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E8%82%83%E7%A9%86%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_035",
    "name": "出乎意料的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "后母戊鼎",
    "genuineNote": "鼎口敞开，没有盖子。",
    "fakeNote": "鼎上多了盖子。",
    "image": "./images/art/art_035.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_035-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_035-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%87%BA%E4%B9%8E%E6%84%8F%E6%96%99%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_036",
    "name": "闪烁的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "星月夜",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_036.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_036-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E9%97%AA%E7%83%81%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_037",
    "name": "神圣的雕塑",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "萨莫色雷斯的胜利女神",
    "genuineNote": "雕像自身的右腿在前。",
    "fakeNote": "雕像自身的左腿在前，与真品左右相反。",
    "image": "./images/art/art_037.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_037-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_037-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%A5%9E%E5%9C%A3%E7%9A%84%E9%9B%95%E5%A1%91%E7%9C%9F"
  },
  {
    "id": "art_038",
    "name": "舒适的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "着衣的玛哈",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_038.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_038-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E8%88%92%E9%80%82%E7%9A%84%E5%90%8D%E7%94%BB"
  },
  {
    "id": "art_039",
    "name": "武士的雕刻",
    "artType": "雕塑",
    "authenticity": "有赝品",
    "realName": "兵马俑",
    "genuineNote": "双手之间没有铲子。",
    "fakeNote": "双手扶着一把铲子。",
    "image": "./images/art/art_039.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_039-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_039-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E6%AD%A6%E5%A3%AB%E7%9A%84%E9%9B%95%E5%88%BB%E7%9C%9F"
  },
  {
    "id": "art_040",
    "name": "粗野的名画左半边",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "风神雷神图屏风（雷神）",
    "genuineNote": "神像为白色。",
    "fakeNote": "神像变成绿色。",
    "image": "./images/art/art_040.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_040-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_040-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%B2%97%E9%87%8E%E7%9A%84%E5%90%8D%E7%94%BB%E5%B7%A6%E5%8D%8A%E8%BE%B9%E7%9C%9F"
  },
  {
    "id": "art_041",
    "name": "粗野的名画右半边",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "风神雷神图屏风（风神）",
    "genuineNote": "神像为绿色。",
    "fakeNote": "神像变成白色。",
    "image": "./images/art/art_041.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_041-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_041-comparison-2.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E7%B2%97%E9%87%8E%E7%9A%84%E5%90%8D%E7%94%BB%E5%8F%B3%E5%8D%8A%E8%BE%B9%E7%9C%9F"
  },
  {
    "id": "art_042",
    "name": "漂亮的名画",
    "artType": "名画",
    "authenticity": "有赝品",
    "realName": "戴珍珠耳环的少女",
    "genuineNote": "耳饰为圆形珍珠。",
    "fakeNote": "耳饰为星形；也有闭眼的变化。",
    "image": "./images/art/art_042.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_042-comparison-1.jpg"
      },
      {
        "label": "赝品",
        "url": "./images/art/art_042-comparison-2.jpg"
      },
      {
        "label": "赝品的另一种状态",
        "url": "./images/art/art_042-comparison-3.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E6%BC%82%E4%BA%AE%E7%9A%84%E5%90%8D%E7%94%BB%E7%9C%9F"
  },
  {
    "id": "art_043",
    "name": "名贵的名画",
    "artType": "名画",
    "authenticity": "仅真品",
    "realName": "自由引导人民",
    "genuineNote": "这件艺术品没有赝品。",
    "fakeNote": "",
    "image": "./images/art/art_043.png",
    "comparisons": [
      {
        "label": "真品",
        "url": "./images/art/art_043-comparison-1.jpg"
      }
    ],
    "sourceUrl": "https://wiki.biligame.com/dongsen/%E5%90%8D%E8%B4%B5%E7%9A%84%E5%90%8D%E7%94%BB"
  }
];

export const ART_DATA = Object.freeze(ART_ITEMS.map(item => Object.freeze({
  ...item,
  comparisons: Object.freeze(item.comparisons.map(comparison => Object.freeze(comparison)))
})));
