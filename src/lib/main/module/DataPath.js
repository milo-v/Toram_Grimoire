import Papa from "papaparse";
import { currentLanguage, secondLanguage } from "./LanguageSystem.js";

function DataPath(id) {
  /* 語言資料：
      依陣列排序，依序為[en, zh_tw, ja, zh_cn]
  */
  switch (id) {
    case 'Skill':
      return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=170573319&single=true&output=csv&range=A:Q';
    case 'Skill/language':
      return [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=170573319&single=true&output=csv&range=R:R',
        null,
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=170573319&single=true&output=csv&range=S:S',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=170573319&single=true&output=csv&range=T:T'
      ];
    case 'Skill Main':
      return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=2033454381&single=true&output=csv&range=A:D';
    case 'Skill Main/language':
      return [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=2033454381&single=true&output=csv&range=F:F',
        null,
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=2033454381&single=true&output=csv&range=G:G',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=2033454381&single=true&output=csv&range=H:H'
      ];
    case 'Stats':
      return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=616452461&single=true&output=csv&range=A:E';
    case 'Stats/language':
      return [
        null,
        null,
        null,
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=1353062937&single=true&output=csv&range=F:G'
      ];
    case 'Character Stats':
      return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHrEp60Q4BFKM2yI09FyJWZFKnxif0oZfTkWiXXL-7am6BWoAtN___hxKtFDkbofflHQgrON74qOdk/pub?gid=0&single=true&output=csv&range=A:I';
    case 'Character Stats/language':
      return [
        null,
        null,
        null,
        null
      ];
    case 'Tag':
      return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=1107380961&single=true&output=csv&range=A:C';
    case 'Tag/language':
      return [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=1107380961&single=true&output=csv&range=D:E',
        null,
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=1107380961&single=true&output=csv&range=F:G',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_XhF85gZ5sd9AtOMSM6JY4OuQwFlD6kToQynQ4bMq_fiaUNr26c7dbrIs6WeWnscKe1rau1npWYe7/pub?gid=1107380961&single=true&output=csv&range=H:I'
      ];
    case 'Equipment/divided':
      return [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwaGM9CClGkSw-6iUFmdOyIeI-_9i5RvIuHdSCTCUgFCk7GV4v1evt5C79JSG5P66ZGopM2-ZJJaEA/pub?gid=0&single=true&output=csv&range=A2:I12000',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwaGM9CClGkSw-6iUFmdOyIeI-_9i5RvIuHdSCTCUgFCk7GV4v1evt5C79JSG5P66ZGopM2-ZJJaEA/pub?gid=0&single=true&output=csv&range=A12001:I24000'
      ];
    case 'Crystal':
      return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwaGM9CClGkSw-6iUFmdOyIeI-_9i5RvIuHdSCTCUgFCk7GV4v1evt5C79JSG5P66ZGopM2-ZJJaEA/pub?gid=1665548440&single=true&output=csv&range=A:D';
    case 'Enchant':
      return 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4beI9I-sFoTgbTaKeMHRVo3xNm3gc5nQ-MWb9u7dlzRk0QmnMoJwcaR0815IqP0t-9-htpS8mUdQ1/pub?gid=0&single=true&output=csv&range=A:K';

  }
  console.warn("Unknow DataPath Name.")
  return void 0;
}

function createLoadDataPromise(path, data_ary, index) {
  return new Promise((resolve, reject) => {
    if (typeof path == 'string' && path) {
      path = encodeURIComponent(path);
      path = 'https://script.google.com/macros/s/AKfycbxGeeJVBuTL23gNtaC489L_rr8GoKfaQHONtl2HQuX0B1lCGbEo/exec?url=' + path;

      Papa.parse(path, {
        download: true,
        complete(res) {
          data_ary[index] = res.data;
          resolve();
        },
        error(err) {
          data_ary[index] = null;
          console.warn('Error when load data: ' + path);
          console.log(err);
          reject();
        }
      });
    } else {
      data_ary[index] = null;
      resolve();
    }
  });
}

function loadLangDatas(path_id, promise_ary, default_lang_no = 1) {
  const current = currentLanguage(),
    second = secondLanguage();
  const datas = Array(3);

  promise_ary.push(createLoadDataPromise(DataPath(path_id), datas, 0));
  if (current != default_lang_no) {
    const path = DataPath(path_id + '/language');
    promise_ary.push(createLoadDataPromise(path[current], datas, 1));
    if (current != second)
      promise_ary.push(createLoadDataPromise(path[second], datas, 2));
  }

  return datas;
}

export { DataPath, createLoadDataPromise, loadLangDatas };