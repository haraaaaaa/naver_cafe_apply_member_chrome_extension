const TABLE_ID = 'applymemberList';
const INPUT_ID = 'c1'
const SELECTED = 'selected'
const NAME = 'pers_nick_area';
const CHECKBOX = 'applyMemberCheck';
const YELLOW_COLOR = "#FFFF00";
const DELIMITER = ' ('
const BARCODE = /^[Il]+$/;
const MIN_LENGTH = 14;
const MAX_LENGTH = 20;
const DEFAULT_PROFILE_IMG = 'https://ssl.pstatic.net/static/cafe/cafe_profile3_45x45.gif';

checkInvalidNames();

function checkInvalidNames() {
    let names = document.getElementById(TABLE_ID).getElementsByClassName(NAME);

    Array.from(names).forEach(element => {
        let person = element.outerText.split(DELIMITER);
        let img = Array.from(element.getElementsByTagName('img'))[0];
        let name = person[0];
        let id = person[1].replace(')','');
        let isValid = isValidPerson(name, id, img);
        if (! isValid) {
            setBackgroundColor(element);
            setChecked(id);
            element.parentNode.parentNode.className += SELECTED;
        }
    });
};


function isValidPerson(name, id, img) {
    if (! name.match(BARCODE)) {
        console.log(id + ' : ' + '소문자 엘(l)과 대문자 아이(I)외의 글자로 이루어져 있음');
        return false
    } else if (name.length<MIN_LENGTH){
        console.log(id +' : '+MIN_LENGTH+'자 보다 짧음 ('+name.length+'자)');
        return false;
    } else if (name.length>MAX_LENGTH) {
        console.log(id + ' : ' + MIN_LENGTH + '자 보다 김 (' + name.length + '자)');
        return false
    } else if(img.src !== DEFAULT_PROFILE_IMG){
        console.log(id + ' : '+ '프로필 사진이 있음');
        return false
    }
    return true
}

function setChecked(id) {
    var inputs = document.getElementsByTagName('input');
    Array.from(inputs).forEach(input => {
        if(input.value === id){
            input.checked = true;
        }
    });
}

function setBackgroundColor(element) {
    element.style.backgroundColor = YELLOW_COLOR;
}

