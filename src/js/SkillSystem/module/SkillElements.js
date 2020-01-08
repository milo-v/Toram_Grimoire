import Grimoire from "../../main/Grimoire.js";
import StatBase from "../../CharacterSystem/module/StatBase.js";
import CY from "../../main/module/cyteria.js";

function checkConstructorArgs(){
	Array.from(arguments).forEach((arg, i) => {
		if ( arg === null || arg === undefined ){
			console.log(`argument[${i}] of Constructor is null`);
			console.log(arguments);
		}
	});
}

/*
Interface SkillElementParent {
	SkillElement newElement(const string type, Object constructorArgs);
}
Interface SkillElementChild {
	int findLocation(void);
}
*/

// class SkillElement {}



/**
 * @implements {SkillElementParent}
 */
class SkillRoot {
	constructor(){
		this.skillTreeCategorys = [];
		this.TYPE = SkillRoot.TYPE;
	}
	newElement(type, cArgs){
		if ( type == SkillTreeCategory.TYPE ){
			const {name, id} = cArgs;
			checkConstructorArgs(id, name);
			let stc = new SkillTreeCategory(this, id, name);
			this.skillTreeCategorys.push(stc);
			return stc;
		}
		return null;
	}
	findSkillByName(name){
		let find = void 0;
		this.skillTreeCategorys.forEach(stc => {
			if ( find ) return;
			stc.skillTrees.forEach(st => {
				if ( find ) return;
				const t = st.skills.find(skill => skill.name === name);
				if ( t !== void 0 )
					find = t;
			});
		});
		return find;
	}
}
SkillRoot.TYPE = Symbol('SkillRoot');


/**
 * @implements {SkillElementParent}
 * @implements {SkillElementChild}
 */
class SkillTreeCategory {
	constructor(sr, id, name){
		this.parent = sr;
		this.id = id;
		this.name = name;
		this.skillTrees = [];
		this.TYPE = SkillTreeCategory.TYPE;
	}
	newElement(type, cArgs){
		if ( type == SkillTree.TYPE ){
			const {name, id} = cArgs;
			checkConstructorArgs(id, name);
			let st = new SkillTree(this, id, name);
			this.skillTrees.push(st);
			return st;
		}
		return null;
	}
	findLocation(){
		return this.parent.skillTreeCategorys.indexOf(this);
	}
}
SkillTreeCategory.TYPE = Symbol("SkillTreeCategory");


/**
 * @implements {SkillElementParent}
 * @implements {SkillElementChild}
 */
class SkillTree {
	constructor(stc, id, name){
		this.parent = stc;
		this.id = id;
		this.name = name;
		this.skills = [];
		this.TYPE = SkillTree.TYPE;
	}
	init(dtc){
		this.drawTreeCode = dtc;
	}
	newElement(type, cArgs){
		if ( type == Skill.TYPE ){
			const {name, id} = cArgs;
			checkConstructorArgs(id, name);
			let skill = new Skill(this, id, name);
			this.skills.push(skill);
			return skill;
		}
		return null;
	}
	findLocation(){
		return this.parent.skillTrees.indexOf(this);
	}
}
SkillTree.TYPE = Symbol("SkillTree");
SkillTree.CATEGORY_TABLE = Symbol();
SkillTree.CATEGORY_DRAW_TREE = Symbol();
SkillTree.CATEGORY_EQUIPMENT = Symbol();


/**
 * @implements {SkillElementChild}
 */
class SkillBase {
	constructor(st, id, name, cap=""){
		this.parent = st;
		this.id = id;
		this.name = name;
		this.caption = cap;
	}
	init(pre, drawOrder){
		this.previous = pre;
		this.drawOrder = drawOrder;
	}
	findLocation(){
		return this.parent.skills.indexOf(this);
	}
}


// class LevelSkill extends SkillBase {
// 	constructor(st, id, name, cap=""){
// 		super(st, id, name, cap);

// 		this._level = 0;
// 	}
// 	level(v=-1){
// 		if ( v >= 0 && v <= 10 )
// 			this._level = v;
// 		return this._level;
// 	}
// 	refreshTree(lv){
// 		if ( lv )
// 			this.level(lv);

// 		let p = this;
// 		// p is head of tree if (p == -1)
// 		while ( p.previous != -1 ){
// 			p = p.parent.skills.find(a => a.id == p.previous);
// 			if ( p.level() < 5 )
// 				p.level(5);
// 		}
// 	}
// }


/**
 * @implements {SkillElementParent}
 */
class Skill extends SkillBase {
	constructor(st, id, name, cap=""){
		super(st, id, name, cap);

		this.effects = [];
		this.defaultEffect = null;
		this.TYPE = Skill.TYPE;

		this._level = 0;
	}
	newElement(type, cArgs){
		if ( type == SkillEffect.TYPE ){
			const {mainWeapon, subWeapon, bodyArmor} = cArgs;
			checkConstructorArgs(mainWeapon, subWeapon, bodyArmor);
			let effect = new SkillEffect(this, mainWeapon, subWeapon, bodyArmor);
			this.effects.push(effect);
			return effect;
		}
		return null;
	}
	setDefaultEffect(sef){
		this.defaultEffect = sef;
		return this;
	}
	checkData(){
		return this.defaultEffect !== void 0 && this.defaultEffect !== null;
	}

	level(v=-1){
		if ( v >= 0 && v <= 10 )
			this._level = v;
		return this._level;
	}
	addLevel(v){
		this.level(this._level + v);
		return this._level;
	}
	updateTree(){
		let p = this;
		// p is head of tree if (p == -1)
		while ( p.previous != -1 ){
			p = p.parent.skills.find(a => a.id == p.previous);
			if ( p.level() < 5 )
				p.level(5);
		}
	}
}
Skill.TYPE = Symbol("Skill");
Skill.CATEGORY_MAIN = Symbol();


/**
 * @implements {SkillElementParent}
 * @implements {SkillElementChild}
 */
class SkillEffect {
	constructor(sk, m, s, b){
		this.parent = sk;
		this.branchs = [];
		this.mainWeapon = m;
		this.subWeapon = s;
		this.bodyArmor = b;
		this.attributes = {};
		this.config = {
			equipmentConfirm: 0 // 0: or, 1: and
		};
		this.TYPE = SkillEffect.TYPE;
	}
	newElement(type, cArgs){
		if ( type == SkillBranch.TYPE ){
			const id = cArgs.id;
			const name = cArgs.name;
			checkConstructorArgs(id, name);
			let branch = new SkillBranch(this, id, name);
			this.branchs.push(branch);
			return branch;
		}
		return null;
	}
	findLocation(){
		return this.parent.effects.indexOf(this);
	}
	appendAttribute(name, v){
		if ( v !== null && v !== void 0 )
			this.attributes[name] = v;
		return this;
	}
	setConfig(set){
		Object.assign(this.config, set);
		return this;
	}
}
SkillEffect.TYPE = Symbol("SkillEffect");
SkillEffect.MP_COST = Symbol('mp_cost');
SkillEffect.RANGE = Symbol('range');
SkillEffect.SKILL_TYPE = Symbol('skill_type');
SkillEffect.IN_COMBO = Symbol('in_combo');
SkillEffect.ACTION_TIME = Symbol('action_type');
SkillEffect.CASTING_TIME = Symbol('casting_time');


/**
 * @implements {SkillElementChild}
 */
class SkillBranch {
	constructor(sef, id, name){
		this.parent = sef;
		this.id = id;
		this.name = name;
		this.branchAttributes = {};
		this.stats = [];
		this.TYPE = SkillBranch.TYPE;
	}
	appendBranchAttribute(name, v){
		this.branchAttributes[name] = v;
		return this;
	}
	findLocation(){
		return this.parent.branchs.indexOf(this);
	}
	appendStat(baseName, v, tail){
		let type;
		switch ( tail ){
			case '':
				type = StatBase.TYPE_CONSTANT;
				break;
			case '%':
				type = StatBase.TYPE_MULTIPLIER;
				break;
			case '~':
				type = StatBase.TYPE_TOTAL;
				break;
		}
		const stat = Grimoire.CharacterSystem.findStatBase(baseName).createSimpleStat(type, v);
		this.stats.push(stat);
		return stat;
	}
	isEmpty(){
		return CY.object.isEmpty(this.branchAttributes) && this.stats.length == 0;
	}
}
SkillBranch.TYPE = Symbol("SkillBranch");


export {SkillRoot, SkillTreeCategory, SkillTree, Skill, SkillEffect, SkillBranch};