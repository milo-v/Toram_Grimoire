import {Skill, SkillEffect} from "../SkillElements.js";
import GetLang from "../../../main/module/LanguageSystem.js";
import CY from "../../../main/module/cyteria.js";
import StatBase from "../../../CharacterSystem/module/StatBase.js";
import getBranchHTML from "./getBranchHTML.js";
import {createSkillAttributeScope, getStackBranchIdKey, simpleCreateHTML, Lang, getSkillAttributeData} from "./main.js";
import {TempSkillEffect, TempSkillBranch} from "./TempSkillElement.js";
import strings from "../strings.js";
import {InitSkillBranch} from "./InitSkillData.js";
import Icons from "../../../main/module/SvgIcons.js";
import {selectSkillElement} from "../SkillElementMethods.js";

import Grimoire from "../../../main/Grimoire.js";

// /* 特殊屬性
//  * @none: 無條件去除該屬性。*/
// const GLOBAL_EXTRA_VALUE = {
// 	none: '@none'
// };


/**
 * 儲存被覆蓋前的 TempSkillEffect 鏡像
 * @param  {SkillEffect} sef 複製用的
 * @return {void}     branchDevelopmentController Object
 */
function branchDevelopmentController(sef, output){
	this.baseEffect = new TempSkillEffect().from(sef);
    this.currentOutput = new TempSkillEffect().from(output); // 複製一份尚未init的output
}
branchDevelopmentController.prototype = {
	/**
	 * 取得此分支覆蓋前後的細節。
	 * @param  {TempSkillBranch} branch 欲取得細節的分支
	 * @return {HTMLElement}
	 */
	branchDetail(branch, currentBranch, is_default, is_exist){
		function getAttrEx(type){
			switch (type){
				case StatBase.TYPE_CONSTANT:
					return '';
				case StatBase.TYPE_MULTIPLIER:
					return '%';
				case StatBase.TYPE_TOTAL:
					return '~';
			}
		}
        const before_init = this.currentOutput.branchs[currentBranch.findLocation()];
		const cmp = branch.no !== '-'
            ? InitSkillBranch(this.baseEffect.branchs.find(b => b.no == branch.no))
            : branch;
		const he = simpleCreateHTML('div', 'dev_branchDetail');

		const top = simpleCreateHTML('div', 'top');
		top.appendChild(simpleCreateHTML('span', '_no', branch.no));
		top.appendChild(simpleCreateHTML('span', '_name', cmp.name));
		he.appendChild(top);

		const s1 = document.createElement('tbody');
        const title1_tr = document.createElement('tr');
		const title1_td = simpleCreateHTML('td', null, null, {colspan: cmp.stats.length !== 0 ? 3 : 2});
		title1_td.appendChild(simpleCreateHTML('div', '_title', Lang('branch development controller/title: default')));
		title1_tr.appendChild(title1_td);
        s1.appendChild(title1_tr);

		Object.keys(cmp.branchAttributes).forEach(k => {
			const t = document.createElement('tr');
			t.appendChild(simpleCreateHTML('td', '_name', k));
			const v = simpleCreateHTML('td', '_value', cmp.branchAttributes[k]);
			if ( cmp.stats.length !== 0 )
				v.setAttribute('colspan', 2);
			t.appendChild(v); 
			if ( before_init.branchAttributes[k] === void 0 )
				t.classList.add('by_default');
			if ( k in branch.branchAttributes && branch.branchAttributes[k] !== cmp.branchAttributes[k] )
				t.classList.add('overwrite');
			s1.appendChild(t);
		});
		cmp.stats.forEach(a => {
			const t = document.createElement('tr');
			t.appendChild(simpleCreateHTML('td', '_name', a.baseName()));
			t.appendChild(simpleCreateHTML('td', '_value', a.statValue()));
			t.appendChild(simpleCreateHTML('td', '_extra', getAttrEx(a.type)));
			if ( branch.stats.find(b => a.equals(b) && a.statValue() != b.statValue()) )
				t.classList.add('overwrite');
			s1.appendChild(t);
		});
		if ( !is_default && branch.no !== '-' && is_exist ){
			const s2 = document.createDocumentFragment();
            const title2_tr = document.createElement('tr');
			const title2_td = simpleCreateHTML('td', null, null, {colspan: branch.stats.length !== 0 ? 3 : 2});
			title2_td.appendChild(simpleCreateHTML('div', '_title', Lang('branch development controller/title: not default')));
			title2_tr.appendChild(title2_td);
            s2.appendChild(title2_tr);
			Object.keys(branch.branchAttributes).forEach(k => {
				const t = document.createElement('tr');
				t.appendChild(simpleCreateHTML('td', '_name', k));
				const v = simpleCreateHTML('td', '_value', branch.branchAttributes[k]);
				if ( branch.stats.length !== 0 )
					v.setAttribute('colspan', 2);
				t.appendChild(v); 
				s2.appendChild(t);
			});
			branch.stats.forEach(a => {
				const t = document.createElement('tr');
				t.appendChild(simpleCreateHTML('td', '_name', a.baseName()));
				t.appendChild(simpleCreateHTML('td', '_value', a.statValue()));
				t.appendChild(simpleCreateHTML('td', '_extra', getAttrEx(a.type)));
				s2.appendChild(t);
			});
			s1.appendChild(s2);
		}
		const table1 = document.createElement('table');
		table1.appendChild(s1);
		he.appendChild(table1);
		return he;
	}
};

function getEffectHTML(sef, attr_name, ctrr){
    const data = ctrr.status;
    const SLv = data.skillLevel, CLv = data.characterLevel;
	const safeEval = str => {
		try {
			return eval(str);
		}
		catch(e){
			console.warn(e);
			return '?';
		}
	};
	const {ICON_DATA, TITLE_DATA, TEXT_LIST} = getSkillAttributeData();

	let title = TITLE_DATA[attr_name],
		v = sef.attributes[attr_name],
		tail = '';
	const icon = !Array.isArray(ICON_DATA[attr_name]) ? ICON_DATA[attr_name] : ICON_DATA[attr_name][v];
	switch (attr_name){
		case SkillEffect.CASTING_TIME:
			title = TITLE_DATA[attr_name][sef.attributes[SkillEffect.SKILL_TYPE]];
			tail = GetLang('global/second');
		case SkillEffect.MP_COST:
			v = safeEval(v);
			break;
		case SkillEffect.RANGE:
			v = v != '-' ? safeEval(v) + 'm' : Lang('range: no limit');
			break;
		case SkillEffect.SKILL_TYPE:
		case SkillEffect.IN_COMBO:
		case SkillEffect.ACTION_TIME:
			v = TEXT_LIST[attr_name][v];
			break;
	}

	const he = createSkillAttributeScope(Icons(icon), null, v + tail);

	return he;
}


function beforeExport(he, ctrr){
    const data = ctrr.status;

    // 處理Tag按鈕
    Grimoire.TagSystem.controller.processShowTagButton(he.querySelectorAll('.show_tag_button'));

    // 處理因skill屬性而被標記的按鈕
    function skill_text_button_listener(event){
        const scope = ctrr.status.skill_from_where_scope;
        CY.element.removeAllChild(scope);
        scope.classList.remove('hidden');

        let temp_scope = this.querySelector("div.temp");
        if ( !temp_scope ){
            temp_scope = simpleCreateHTML('div', 'temp');
            this.appendChild(temp_scope);
        }

        temp_scope.appendChild(scope);

        const skill_scope = ctrr.getSkillElementScope(Skill.TYPE);
        const remv = CY.element.convertRemToPixels(1);
        const vr = this.getBoundingClientRect();
        const pvr = scope.getBoundingClientRect();
        const spvr = skill_scope.getBoundingClientRect();
        let x = vr.left - spvr.left, y = vr.top,
            w = pvr.width, mw = spvr.width,
            h = pvr.height, mh = window.innerHeight;
        scope.style.left = "0";
        if ( x + pvr.width > mw - remv ) // 超過右邊界
            scope.style.left = ((mw -1*w - x)/remv - 0.5) + "rem";
        else if ( x < pvr.width ) // 超過左邊界
            scope.style.left = (-1*x/remv + 0.5) + "rem";
            
        if ( y > mh/2 )
            scope.style.top = ((-1*h)/remv - 0.5) + "rem";
        else 
            scope.style.top = (vr.height/remv + 0.5) + "rem";

        const skill = selectSkillElement(ctrr.skillRoot, this.getAttribute(strings().data_skillElementNo));
        scope.appendChild(createSkillAttributeScope(null, GetLang('Skill Query/Skill Element/skill tree: from'), skill.parent.name));
        const btns = simpleCreateHTML('div', 'button_scope');
        const cancel = simpleCreateHTML('span', ['Cyteria', 'Button', 'simple'], GetLang('global/cancel'));
        cancel.addEventListener('click', function(event){
            this.parentNode.parentNode.classList.add('hidden');
            event.stopPropagation();
        });
        const to_skill = simpleCreateHTML('span', ['Cyteria', 'Button', 'simple'],Lang('button text/to skill'));
        to_skill.addEventListener('click', function(event){
            this.parentNode.parentNode.classList.add('hidden');
            ctrr.skillRecord(skill);
            event.stopPropagation();
        });
        btns.appendChild(cancel);
        btns.appendChild(to_skill);
        scope.appendChild(btns);
    }
    he.querySelectorAll('span.skill_from_where_button').forEach(btn => btn.addEventListener('click', skill_text_button_listener));

    // 建立分支的展開/收合按鈕
    function hiddenSubCaption(event){
        const scope1 = this.parentNode.querySelector('div.scope1');
        scope1.classList.toggle('hidden');
        this.querySelector('.open').classList.toggle('hidden');
        this.querySelector('.close').classList.toggle('hidden');
        event.stopPropagation();
    }
    he.querySelectorAll('div.content > div.scope1').forEach(sc1 => {
        if ( sc1.parentNode.classList.contains('content-line') || sc1.childElementCount === 0 )
            return;
        sc1.classList.add('Cyteria', 'entrance', 'fade-in-down');
        const btn = simpleCreateHTML('span', 'hidden_toggle_button',
            '<span class="close Cyteria Button icon-only right">' + Icons('arrow-up') + '</span><span class="open hidden Cyteria Button icon-only right">' + Icons('arrow-down') + '</span>');

        btn.addEventListener('click', hiddenSubCaption);
        sc1.parentNode.insertBefore(btn, sc1.parentNode.firstChild);

        btn.click();
    });

    // 處理group
    function group_title_click(e){
        function checkExpanded(node){
            return node.getAttribute('data-expanded') === '1';
        }
        function getSize(node){
            return parseInt(node.getAttribute('data-groupsize'), 10);
        }
        function setHidden(node, doHidden){
            doHidden
            ? node.classList.add('hidden')
            : node.classList.remove('hidden');
        }
        const gs = this.parentNode.querySelectorAll('.branch');
        let p = Array.from(gs).indexOf(this);
        while ( p != -1 && !gs[p].hasAttribute('data-groupsize') )
            --p;
        if ( p == -1 )
            return;

        const mainExpanded = checkExpanded(gs[p]);
        const stk = [], expandeds = [];
        stk.push(getSize(gs[p]));
        expandeds.push(mainExpanded);
        while ( p != gs.length && stk.length != 0 ){
            ++p;
            --stk[stk.length-1];
            setHidden(gs[p], expandeds[expandeds.length-1]);
            if ( stk[stk.length-1] == 0 ){
                stk.pop();
                expandeds.pop();
            }
            if ( gs[p].hasAttribute('data-expanded') ){
                stk.push(getSize(gs[p]));
                expandeds.push(!mainExpanded ? mainExpanded : checkExpanded(gs[p]));
            }
        }

        this.setAttribute('data-expanded', mainExpanded ? '0' : '1');
    }
    const branch_scopes = he.querySelectorAll('.branch');
    branch_scopes.forEach((a, i) => {
        if ( !a.hasAttribute('data-groupsize') )
            return;
        a.classList.add('group_content');
        let gtitle = null;
        let end = i+parseInt(a.getAttribute('data-groupsize'), 10);
        for (let t=i+1; t<=end && t<branch_scopes.length; ++t){
            const cur = branch_scopes[t];
            if ( cur.hasAttribute('data-groupsize') ){
                const d = parseInt(cur.getAttribute('data-groupsize'), 10);
                i += d;
                end += d;
            }
            else {
                cur.classList.add('group_content');
                if ( !cur.classList.contains('branch_stack') )
                    cur.classList.add('Cyteria', 'entrance', 'fade-in-down');
                if ( cur.getAttribute('data-grouptitle') === '1' ){
                    gtitle = cur;
                    break;
                }
            }
        }
        if ( !gtitle )
            gtitle = a;
        gtitle.addEventListener('click', group_title_click);
        gtitle.classList.add('group_title');
        gtitle.click();
    });
    he.querySelectorAll('.group_content').forEach(a => {
        if ( !a.classList.contains('group_title') ){
            const pre = a.previousSibling;
            if ( pre.tagName.toUpperCase() == 'HR' )
                CY.element.remove(pre);
        }
    });

    function adjustInputWidth(e){
        this.style.width = (CY.element.calcInputWidthPx(this, ctrr.nodes.toCalcInputWidth) + 2) + 'px';
    }

    // 處理stack input width
    he.querySelectorAll('.stack-input').forEach(p => {
        adjustInputWidth.call(p);
        p.addEventListener('input', adjustInputWidth);
    });

    // 醒目標示history value
    he.querySelectorAll('.skill-attribute > .value > .value-history').forEach(p => {
        p.parentNode.parentNode.classList.add('border-mark');
    });
}

/*
| @param SkillElement.Skill skill ::使用者選取的技能
| @param Object equip ::使用者選取的裝備
| @return documentFragment
*/
export default function(ctrr){
    const data = ctrr.status;
	const skill = data.currentSkill;
	const equip = data;
	const SLv = data.skillLevel, CLv = data.characterLevel;

	// 複製一份預設Effect
	const output = new TempSkillEffect().from(skill.defaultEffect);

    // 執行覆蓋
	const overwrite_eft = skill.effects.find(eft => {
		if ( ctrr.equipmentCheck(eft, data) ){
			if ( eft != skill.defaultEffect )
				output.overWrite(eft);
			return true;
		}
	});

	/*----------  產生輸出介面  ----------*/

	if ( overwrite_eft !== void 0 ){
		const frg = document.createDocumentFragment();

        /*----------  歷史紀錄  ----------*/
        
        /* 處理 */
        if ( data.currentSkillHistoryDate != null ){
            const date = data.currentSkillHistoryDate;
            const date_list = output.getHistoryDates();

            const brhs = output.branchs;

            brhs.forEach(brh => {
                const hry = brhs.find(b => b.name == 'history' && b.branchAttributes['target_branch'] == brh.no && b.branchAttributes['date'] == date);
                if ( hry ){
                    // 將資料還原到date的下一個date
                    const index = date_list.indexOf(date);
                    date_list.slice(0, index).forEach(p => {
                        // 屬性
                        const cur_hry = brhs.find(b => b.name == 'history' && b.branchAttributes['target_branch'] == brh.no && b.branchAttributes['date'] == p);
                        if ( cur_hry ){
                            Object.keys(cur_hry.branchAttributes).forEach(k => brh.branchAttributes[k] = cur_hry.branchAttributes[k]);
                            // 能力
                            cur_hry.stats.forEach(st => {
                                const brh_stat = brh.stats.find(_st => st.equals(_st));
                                if ( brh_stat )
                                    brh_stat.statValue(st.statValue());
                                else
                                    brh.appendExistingStat(st.copy());
                            });
                        }
                    });

                    brh.historyBranchAttributes = hry.branchAttributes;
                    // Object.keys(hry.branchAttributes).forEach(k => brh.branchAttributes[k] = [hry.branchAttributes[k], brh.branchAttributes[k]]);
                    brh.historyStats = hry.stats;
                }
            });
        }
        else /* 更新選擇介面 */
            ctrr.updateSelectSkillHistoryDateScope(output.getHistoryDates());

        /*----------  基本屬性  ----------*/
		const order = [
			SkillEffect.MP_COST,
			SkillEffect.RANGE,
			SkillEffect.SKILL_TYPE,
			SkillEffect.IN_COMBO,
			SkillEffect.ACTION_TIME,
			SkillEffect.CASTING_TIME
		];
		const one = simpleCreateHTML('div', 'skill-attributes');
		
		order.forEach(item => {
			if ( item in output.attributes ){
                const he = getEffectHTML(output, item, ctrr);
                if ( he )
                    one.appendChild(he);
            }
		});
        one.appendChild(ctrr.nodes.openSkillAttributeIconTipsButton);
		frg.appendChild(one);


		const two = simpleCreateHTML('div', 'skill_branchs');
        two.appendChild(document.createElement('hr'));
		
		if ( output.checkData() ){
			// 初始化
            const branchDevelopmentMode = data.branchDevelopmentMode;
            let branchDevCtr = null;
            if ( branchDevelopmentMode )
                branchDevCtr = new branchDevelopmentController(skill.defaultEffect, output);
			output.branchs.forEach(b => {
                if ( !b.isEmpty() )
                    InitSkillBranch(b);
            });
			
			if ( data.stackValues === null ){
				data.stackValues = {};
				CY.object.empty(data.stackNames);
				output.branchs.forEach(branch => {
					if ( branch.name == 'stack' ){
						const _attr = branch.branchAttributes;
						const v = _attr['default'] == 'auto' ? _attr['min'] : _attr['default'];
						data.stackValues[getStackBranchIdKey(branch)] = v;
						data.stackNames[getStackBranchIdKey(branch)] = branch.branchAttributes['name'];
					}
				});
			}

			let temp_html= null;
			output.branchs.forEach(branch => {
				const t = getBranchHTML(branch, ctrr);
				if ( t !== null ){
					if ( temp_html !== null ){
						two.appendChild(temp_html);
                        two.appendChild(document.createElement('hr'));
                    }
					temp_html = t;
				}
				if ( branchDevelopmentMode ){
					const is_default = overwrite_eft === skill.defaultEffect;
					let _t = overwrite_eft.branchs.find(b => branch.no == b.no);
					two.appendChild(branchDevCtr.branchDetail(
						( !is_default && _t ) ? _t : branch, branch,
                        is_default, _t !== void 0
					));
				}
			});
			if ( temp_html !== null )
				two.appendChild(temp_html);
		}
		else
            two.appendChild(simpleCreateHTML('div', 'no_data', Lang('no data')));

		frg.appendChild(two);

		beforeExport(frg, ctrr);

		return frg;
	}

    return simpleCreateHTML('div', 'no_data', Lang('equipment not confirm'));
};