const zh_tw = {
    'Top List': {
        'item 1': '布偶的魔法書',
        'item 2': '簡易傷害計算器'
    },
    'Damage Calculation': {
        'Calc Item Base Text': {
            'physical_damage': '物理傷害',
            'magic_damage': '魔法傷害',
            'atk': 'ATK',
            'matk': 'MATK',
            'sub_atk': '副手ATK',
            'sub_atk_multiplier': '副手倍率',
            'two_handed_skill_level': '((雙手合持))等級',
            'character_level': '角色等級',
            'target_level': '目標等級',
            'target_def': '目標DEF',
            'target_mdef': '目標MDEF',
            'physical_pierce': '物理貫穿',
            'magic_pierce': '魔法貫穿',
            'skill_constant': '技能常數',
            'skill_constant_str': 'STR',
            'skill_constant_dex': 'DEX',
            'skill_constant_agi': 'AGI',
            'skill_constant_int': 'INT',
            'skill_constant_vit': 'VIT',
            'unsheathe_attack': '拔刀攻擊',
            'dagger_atk': '小刀ATK',
            'other_constant': '其它常數',
            'skill_multiplier': '技能倍率',
            'skill_multiplier_str': 'STR',
            'skill_multiplier_dex': 'DEX',
            'skill_multiplier_agi': 'AGI',
            'skill_multiplier_int': 'INT',
            'skill_multiplier_vit': 'VIT',
            'critical_damage': '暴擊傷害',
            'critical_rate': '暴擊率',
            'short_range_damage': '近距離威力',
            'long_range_damage': '遠距離威力',
            'unsheathe_attack_multiplier': '拔刀攻擊',
            'netural_element': '無屬性',
            'fire_element': '火屬性',
            'water_element': '水屬性',
            'earth_element': '地屬性',
            'wind_element': '風屬性',
            'light_element': '光屬性',
            'dark_element': '暗屬性',
            'stronger_against_neutral': '對無屬性',
            'stronger_against_fire': '對火屬性',
            'stronger_against_water': '對水屬性',
            'stronger_against_earth': '對地屬性',
            'stronger_against_wind': '對風屬性',
            'stronger_against_light': '對光屬性',
            'stronger_against_dark': '對暗屬性',
            'target_neutral_resistance': '對無抗性',
            'target_fire_resistance': '對火抗性',
            'target_water_resistance': '對水抗性',
            'target_earth_resistance': '對地抗性',
            'target_wind_resistance': '對風抗性',
            'target_light_resistance': '對光抗性',
            'target_dark_resistance': '對暗抗性',
            'target_physical_resistance': '物理抗性',
            'target_magic_resistance': '魔法抗性',
            'poration': '慣性加成',
            'stability': '穩定率',
            'probability_of_graze': 'Graze機率',
            'combo_multiplier': '連擊倍率',
            'other_multiplier': '其它倍率'
        },
        'Container Title': {
            'damage_type': '傷害類型',
            'atk': '角色攻擊力',
            'atk_other': '角色攻擊力（其它）',
            'level_difference': '等級差距',
            'target_def': '目標防禦力',
            'pierce': '防禦貫穿',
            'skill_constant': '技能常數',
            'unsheathe_attack_contant': '拔刀攻擊（常數）',
            'other_constant': '其它常數',
            'skill_multiplier': '技能倍率',
            'critical': '暴擊',
            'range_damage': '距離威力',
            'unsheathe_attack_multiplier': '拔刀攻擊（倍率）',
            'element': '攻擊屬性',
            'stronger_against_element': '對屬性傷害加成',
            'target_element_resistance': '目標對屬抗性',
            'target_resistance': '目標抗性',
            'poration': '慣性影響',
            'stability': '穩定率',
            'other_multiplier': '其它倍率'
        },
        'Container Tips': {
            'damage_type': '攻擊的傷害類型。',
            'atk': '角色的面板攻擊力。',
            'atk_other': [
                '在特定條件下，會影響攻擊力的其它因素。',
                '((副手ATK))及((雙手合持等級))皆可以開關。關閉後該項目便不會被計算。',
                '((副手ATK))為裝備((雙劍))時特有的屬性。((雙劍技能))中的攻擊技能，((副手ATK))會被計入傷害公式內。',
                '簡要而言，((副手ATK))會乘上((副手倍率))並加到有效ATK上。',
                '技能((雙手合持))的觸發條件可於技能查詢中查看。'
            ],
            'level_difference': '角色與目標（怪物）的等級差值。',
            'target_def': '目標的防禦力。',
            'pierce': '角色的物理貫穿及魔法貫穿。貫穿會無視目標等比例的防禦力。',
            'skill_constant': '技能的傷害常數。',
            'unsheathe_attack_contant': [
                '常數的拔刀攻擊加成。',
                '例如：緞晶((葛瓦))提供的拔刀攻擊+100。'
            ],
            'other_constant': '特定情況下會有的其它常數。平常情況下不用特別設定',
            'skill_multiplier': '技能的傷害倍率。',
            'critical': [
                '傷害計算為((暴擊率))與((暴擊傷害))對傷害的期望值。',
                '((暴擊率))可透過點擊進行開關。關閉後，傷害計算會視為必定暴擊。意即傷害計算結果為暴擊時的傷害。',
                '若想計算無暴擊時的傷害，可將此項目關閉。或將暴擊率設為0。',
                '魔法傷害暴擊時的傷害與物理傷害略有不同，計算公式也不一樣。魔法傷害暴擊時的傷害加成減半，而暴擊機率則以1/4作計算。'
            ],
            'range_damage': [
                '發動技能時，與目標的距離會有不同的傷害加成。',
                '離目標8m以上（含）時，為視為遠距離，否則為近距離。'
            ],
            'unsheathe_attack_multiplier': [
                '倍率的拔刀攻擊加成。',
                '例如：緞晶((奧狄隆馬其納))提供的拔刀攻擊+10%。'
            ],
            'stronger_against_element': '對目標屬性的傷害加成。',
            'target_element_resistance': '目標對屬性攻擊的抗性。',
            'target_resistance': '目標的物理抗性或魔法抗性。例如物理抗性為30%時，受到的物理傷害會減少30%。',
            'poration': '慣性帶來的傷害加成。最低為-50%，最高為+150%。',
            'stability': [
                '穩定率會造成傷害浮動，因此傷害計算以期望值作計算。期望值部分亦包含Graze機率帶來的影響。',
                ' 傷害計算部分會顯示傷害的浮動。即最小傷害與最大傷害。',
                '((Graze))會使穩定度減半，因此計算出來的最小傷害也會減半。',
                '((Graze機率))可透過點擊進行開關。關閉後，傷害計算會視為必定不發生Graze。'
            ],
            'other_multiplier': [
                '特定情況下會有的其它倍率。會直接乘上最終傷害。',
                '多個其他倍率需自行相乘後，再填入((其他倍率))。例如：120%*120%=144%。計算完畢後填入144。'
            ]
        },
        'User Set': {
            'str': '角色STR', 'dex': '角色DEX', 'int': '角色INT',
            'agi': '角色AGI', 'vit': '角色VIT'
        },
        'Save Load': {
            'file': '檔案',
            'no data': '尚無檔案。',
            'Warn': {
                'Confirm to overwrite existing data': '確定要覆蓋現有的檔案嗎？再點擊一次以確定。',
                'An error occurred while loading data': '讀取失敗。資料可能受損，不清楚原因還請回報作者。',
                'Confirm to load data': '確定要讀取嗎？現有的配置將會遺失，再點擊一次以確定。',
                'Saving success': '存檔成功。',
                'Loading success': '讀取成功。',
                'Wrong file type: csv': '檔案格式需為CSV檔。',
                'File is empty': '讀取的檔案為空。',
                'Calculations is empty': '沒有可儲存的資料。'
            }
        },
        'Warn': {
            'Calculation Name too long': '名稱不得超過16個字元。',
            'Disable char': '已自動清除被禁用的字元。'
        },
        'build': '配置',
        'Damage': '傷害期望值',
        'Comparative Damage': '比較',
        'Damage Floating: without critical': '無暴擊傷害',
        'Damage Floating: critical': '暴擊傷害',
        'save': '儲存',
        'load': '讀取',
        'save to csv': '儲存成檔案',
        'load from csv': '讀取檔案',
        'Main Menu: title': '選單',
        'Save Load: title': '選取檔案',
        'delete': '刪除',
        'copy': '複製',
        'create calculation': '新增配置'
    }
};

export default zh_tw;