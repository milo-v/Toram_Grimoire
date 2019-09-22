import {SkillRoot, SkillTreeCategory, SkillTree, Skill, SkillEffect, SkillBranch} from "./SkillElements.js";
import {DrawSkillTree, GetDrawData} from "./DrawSkillTree.js";

import Icons from "../../main/module/SvgIcons.js";
import GetLang from "../../main/module/LanguageSystem.js";

import CY from "../../main/module/cyteria.js";

function Lang(s){
    return GetLang('Skill Simulator/Controller/' + s);
}

export default class SkillSimulatorController {
    constructor(sr){
        this.skillRoot = sr;

        this.nodes = {
            main: null,
            buttons: null
        };

        this.listeners = {
            setStep(e){

            }
        }
    }
    init(el){
        const simpleCreateHTML = CY.element.simpleCreateHTML;

        el.classList.add('SkillSimulator-main')

        const main = simpleCreateHTML('div', 'main');

        // Buttons
        const buttons = simpleCreateHTML('div', 'buttons-scope');

        const set_step_scope = simpleCreateHTML('span', 'scope');
        [1, 5, 10].forEach(p => {
            const btn = simpleCreateHTML('span', ['Cyteria', 'Button', 'icon-only', 'select-fill'], Icons('numeric-' + p));
            btn.setAttribute('data-step', p);
            btn.addEventListener('click', this.listeners.setStep);
            set_step_scope.appendChild(btn);
        });
    }
}