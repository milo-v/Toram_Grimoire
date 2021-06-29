export default function(){
  return {
    'Enchant Simulator': {
      'build': '配置',
      'base options': '基本設定',
      'advanced options': '進階設定',
      'common options': '共通設定',
      'equipment type': '裝備類型',
      'append build': '新增配置',
      'equipment types': {
        'main-weapon': '主手武器',
        'body-armor': '身體防具',
        'main-weapon|original-element': '主手武器｜原有屬性'
      },
      'enchant step': '步驟',
      'append enchant step': '新增步驟',
      'step type - each: title': '分次附、每次附',
      'last step': '最終步驟',
      'invalid step': '無效步驟',
      'success rate': '成功率',
      'success rate: unlimited': '無限',
      'equipment original potential': '裝備初始潛力值',
      'equipment base potential': '製作裝備基礎潛力值',
      'character level': '角色等級',
      'smith level': '基礎鍛造熟練度',
      'material point type list': ['金屬', '獸品', '木材', '布料', '藥品', '魔素'],
      'step': {
        'insert step before': '向前插入步驟',
        'up swap': '上移一格',
        'down swap': '下移一格',
        'auto fill positive stat': '正屬全上（特定條件才會出現）',
        'select one stat item': '選擇單項能力',
        'select multiple stat items': '選擇多項能力',
        'type: each': '分次附模式',
        'button caption: title': '關於按鈕'
      },
      'select item': {
        'title: normal': '選擇多項能力',
        'title: once': '選擇單項能力'
      },
      'result': {
        'enchant: normal': '附',
        'enchant: each': '分次附、每次附$0、直到$1',
        'stats': '最終結果',
        'materials': '素材耗量',
        'show detail': '顯示詳細資訊',
      },
      'stat display mode': {
        'title': '切換能力項目的資訊',
        'potential cost': '潛力消耗',
        'material point': '素材消耗'
      },
      'tips': {
        'step stat repeated': '這個步驟已經有這個能力了0.0',
        'step is empty': '這個步驟還空空的...',
        'number of stats of equipment has reached the upper limit': '這件裝備的能力數量已達上限。',
        'keep at least one build': '請至少保留一個配置0.0',
        'invalid enchant result': '目前的配置還沒辦法產生結果唷0.0',
        'confirm: remove build': '確定要移除這個配置嗎0.0？',
        'copy build successfully': '複製配置成功。',
        'copy result text successfully': '複製結果成功。'
      },
      'save': {
        'tips': {
          'auto save successfully': '自動存檔成功。',
          'auto load successfully': '自動讀取成功。',
          'export successfully': '匯出成功。',
          'import successfully': '匯入$0成功。',
          'import: error': '匯入時發生錯誤。',
          'import: wrong file type': '匯入的檔案必須為.txt檔。'
        }
      },
      'footer guide': {
        'title': '關於下方選單',
        'title: close': '新增一個步驟來關閉這個說明視窗0.0',
        'toggle result': {
          'titles': ['正常模式', '懸浮模式'],
          'caption': '點擊按鈕來切換步驟結果的顯示模式，可以在不用滑動到最下面的情況下快速查看步驟結果。'
        },
        'toggle display mode': {
          'titles': ['潛力消耗', '素材消耗'],
          'caption': '對於每個步驟的能力項目後方會顯示什麼資訊，可以在兩者之間作切換。預設為「潛力消耗」'
        }
      }
    }
  };
}