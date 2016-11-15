import emojiData from 'emoji-datasource';
const CATEGORIES = ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'];

function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? Math.floor : Math.ceil)(it);
}
function toIndex(index, length) {
    index = toInteger(index);
    return index < 0 ? Math.max(index + length, 0) : Math.min(index, length);
}
function fromCodePoint (x) {
    var res   = []
    , $$    = arguments
    , $$len = $$.length
    , i     = 0
    , code;
    while($$len > i){
        code = +$$[i++];
        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000
            ? String.fromCharCode(code)
            : String.fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
        );
    } return res.join('');
}

if (!String.fromCodePoint) {
    String.fromCodePoint = fromCodePoint;
}

const charFromCode = utf16 => String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
var emoji;

export default function getEmojiData() {
    if (emoji) {
        return emoji;
    }
    const _emoji = emojiData.reduce((acc, item) => {
        const { category } = item;
        if (!acc[category]) acc[category] = [];
        acc[category].push({ sortOrder: item.sort_order, char: charFromCode(item.unified) });
        return acc;
    }, {});

    emoji = CATEGORIES.map(category => {
        let items = _emoji[category] || [];
        items = items.sort((a, b) => {
            return (a.sortOrder > b.sortOrder) ? 1 : -1;
        }).map(x => x.char);
        return { category, items };
    });
    
    return emoji;
}
