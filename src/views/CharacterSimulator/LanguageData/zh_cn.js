export default function() {
  return {
    'Character Simulator': {
      'character': '角色',
      'append character': '新建角色',
      'character stats': '角色面板',
      'character level': '角色等级',
      'character name': '角色名称',
      'character stat points': '角色能力点数',
      'equipment': '装备',
      'skill': '技能',
      'food build': '料理',
      'save-load': '存档',
      'stability': '稳定度',
      'confirm selection': '确定选取',
      'refining': '精鍊值',
      'crystal': '锻晶',
      'crystal empty': '空空的锻晶',
      'equipment type': '装备类型',
      'custom equipment': '自订装备',
      'character optional base stat': '角色个人能力',
      'custom equipment: default name prefix': '自订',
      'character field names': {
        'main-weapon': '主手武器',
        'sub-weapon': '副手装备',
        'body-armor': '身体装备',
        'additional': '追加装备',
        'special': '特殊装备',
        'avatar': '时装'
      },
      'equipment type category': {
        'main-weapon': '主手武器',
        'sub-weapon': '副手武器',
        'sub-armor': '副手防具',
        'body-armor': '身体装备',
        'additional': '追加装备',
        'special': '特殊装备',
        'avatar': '时装'
      },
      'field type text': {
        'one-hand-sword': '单手剑',
        'two-hand-sword': '双手剑',
        'bow': '弓',
        'bowgun': '弩',
        'staff': '杖',
        'magic-device': '魔导具',
        'knuckle': '拳套',
        'halberd': '旋风枪',
        'katana': '拔刀剑',
        'sub-weapon|arrow': '箭矢',
        'sub-weapon|dagger': '小刀',
        'sub-armor|shield': '盾牌',
        'body-armor|normal': '一般防具',
        'body-armor|dodge': '轻化防具',
        'body-armor|defense': '重化防具'
      },
      'stat restriction text': {
        'event': '活动',
        'one-hand-sword': '单手剑',
        'two-hand-sword': '双手剑',
        'dual-sword': '双剑',
        'bow': '弓',
        'bowgun': '弩',
        'staff': '法杖',
        'magic-device': '魔导具',
        'knuckle': '拳套',
        'halberd': '旋风枪',
        'katana': '拔刀剑',
        'sub': {
          'arrow': '箭矢',
          'shield': '盾牌',
          'dagger': '小刀',
          'katana': '副手拔刀剑',
          'magic-device': '副手魔导具',
          'knuckle': '副手拳套',
          'one-hand-sword': '双剑'
        },
        'body': {
          'dodge': '轻化防具',
          'defense': '重化防具',
          'normal': '一般防具'
        }
      },
      'browse equipments': {
        'action: normal': '装备清单',
        'action: select-field-equipment': '装备清单',
        'append equipments': '新增装备',
        'message: remove equipment': '已移除装备：$0。',
        'message: removed equipment recovery': '已复原装备：$0。',
        'message: copy equipment': '成功复制装备。'
      },
      'append equipments': {
        'window title: select-mode': '选择新增方式',
        'window title: search': '查询装备',
        'window title: custom': '自订装备',
        'action: search': '查询装备',
        'action: custom': '自订装备',
        'action: search description': '可以从现存的装备资料中选取多个想加入的装备。',
        'action: custom description': '建立一件新装备，可以自订该装备的各项能力值。',
        'search equipment placeholder': '搜寻装备名称...',
        'search equipment result: selected title': '件装备已被选取',
        'search equipment result: obtain': {
          'mobs': '小怪掉落',
          'boss': '定点BOSS掉落',
          'mini_boss': '地图BOSS掉落',
          'quest': '任务奖励',
          'smith': '铁匠铺制作',
          'unknow': '未知的取得方式',
          'other': '其它',
          'box': '箱子道具内容物',
          'exchange': '交换所兑换'
        },

        'search equipment result: limit reached': '可显示的搜寻结果数量已达上限。如果没有找到想找的装备，请试着更改关键字。',
        'search text is empty': '搜寻的关键字须至少一个字元。',
        'append equipments successfully': '已成功新增$0件装备。',
        'selected equipments cleared': '已清除选取的装备。'
      },
      'create custom equipment': {
        'window title': '建立自订装备',
        'select equipment type': '选择装备类型',
      },
      'custom equipment editor': {
        'select stat: window title': '管理装备能力',
        'select stat: search placeholder': '搜寻能力',
        'select stat: current stats': '现存的能力',
        'select stat: appended stats': '新增的能力',
        'select stat: deleted stats': '删除的能力',
        'equipment name': '装备名称',
        'equipment stats': '装备能力',
        'equipment other': '其他',
        'window title': '自订装备设定',
        'equipment can only have one element stat': '一件装备只能拥有一个属性'
      },
      'select crystals': {
        'window title': '选择锻晶',
        'search placeholder': '搜寻缎晶',
        'selected crystals': '已选择的锻晶',
        'category title': ['武器', '身体装备', '追加装备', '特殊装备', '通用']
      },
      'skill management': {
        'passive skills': '被动技能',
        'active skills': '主动技能',
        'user sets: window title': '参数数值设定',
        'default name of stack': '技能层数',
        'default name of skill branch': '技能效果',
        'skill disable': '装备不符。',
        'skill multiple effects': '包含多个效果。',
        'tips: skill-builds data not be replaced': '自动读档时侦测到技能模拟器有现存的资料，读档这些资料将不会被删除。',
        'formula text': {
          'target_def': '目标防御',
          'target_level': '目标等级'
        },
        'suffix branch': {
          'condition: default': '额外效果'
        },
        'no build has been created': '还没有建立任何配置喔～请先透过左上方的选单进入「技能模拟器」，建立新的技能配置。',
        'there are no skills yet': '这里还没有任何技能喔～请先透过左上方的选单进入「技能模拟器」，来进行技能的配点。请注意，要对角色能力有提升的技能才会显示在这里。'
      },
      'show character stats': {
        'base value': '基础值',
        'init value': '初始值',
        'additional value': '额外加成',
        'equipped with: prefix text': '装备为',
        'equipped with: suffix text': '时',
        'Click anywhere to close': '点击任意处以关闭',
        'text of conditional values': {
          '1h_sword': '主手｜单手剑',
          '2h_sword': '双手剑',
          'bow': '弓',
          'bowgun': '弩',
          'staff': '法杖',
          'magic_device': '主手魔导具',
          'knuckle': '主手｜拳套',
          'dual_sword': '双剑',
          'halberd': '旋风枪',
          'katana': '拔刀剑',
          'main': {
            'none': '主手｜空手'
          },
          'sub': {
            'magic_device': '副手｜魔导具',
            'knuckle': '副手｜拳套',
            'arrow': '箭矢',
            'dagger': '小刀',
            'shield': '盾牌'
          },
          'armor': {
            'normal': '身体防具｜一般',
            'dodge': '身体防具｜轻量化',
            'defense': '身体防具｜重量化',
            'none': '身体防具｜无装备'
          }
        }
      },
      'Food Builds Control': {
        'food build': '料理配置',
        'append food build': '新增料理配置',
        'food build name': '料理配置名称',
        'food list': '料理清单',
        'Copy food build successfully': '复制料理配置成功。',
        'Remove food build successfully': '移除料理配置成功。',
        'Recovery food build successfully': '复原料理配置成功。',
        'Must have at least one food build': '必须至少留下一个配置。',
        'Current food-build is not exist': '无法获取当前的料理配置，请点选下方的按钮尝试复原介面。',
        'Number of selected food has reached the maximum': '可选取的料理数量已达上限。',
        'tips: select food': '透过点击前方的圆点来选取最多五个料理。',
        'tips: auto select food': '原本是0级的料理在提升等级时会自动选取。'
      },
      'save-load control': {
        'Auto save Successfully': '自动存档成功。',
        'Auto load Successfully': '自动读取成功。',
        'save button: title': '手动存档',
        'load button: title': '手动读取',
        'top caption': '正常情况下，系统会在使用者离开页面或进入页面时自动进行存档或读档。但如果有需要的话，下面的按钮提供手动存档或读档的功能。',
        'button: deleta all data': '删除角色模拟器资料',
        'Message: deleta all data': '成功删除角色模拟器所有资料，系统也已关闭自动存档功能。请重新整理网页。',
        'delete counter: title': '计数器',
        'delete all data: caption': [
          '在某些情况下，角色模拟器的档案可能毁损，导致系统无法正常运行。使用下方的按钮可以删除角色模拟器所有资料。自动存档功能也将暂时失效，意即当前的资料将不会自动储存。',
          '请将下方的计数器数值调整到10，删除按钮就会出现。',
          '将资料删除成功后，请立即重新整理，来让系统重新初始化。'
        ]
      },
      'Warn': {
        'Current character is not exist': '发生了ㄧ些小错误，导致无法获取当前的角色资讯，介面也无法正常显示......<br />请点选下面的按钮来建立一个新的角色，以复原介面(_ _)',
        'no equipment selected': '这个栏位是空的w',
        'no eligible equipments found': '没有符合条件的装备～点击上面的按钮来新增装备。',
        'no result found': '找不到任何结果0.0',
        'clear equipments completed': '清除成功。',
        'create custom equipment: no equipment type selected': '请先选择一个装备类别',
        'create custom equipment editor: selected stats clear': '已取消更动',
        'character stats compare: no result': '没有任何能力值变化。',
        'Copy character successfully': '已成功复制：$0',
        'Remove character successfully': '已成功移除：$0',
        'Recovery character successfully': '已复原被删除的：$0',
        'Must have at least one character': '必须至少留下一个角色。'
      }
    }
  };
}