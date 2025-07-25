// 禁止所有键盘事件
document.addEventListener('keydown', function(e) {
    e.preventDefault();
    e.stopPropagation();
}, true);

document.addEventListener('keyup', function(e) {
    e.preventDefault();
    e.stopPropagation();
}, true);

document.addEventListener('keypress', function(e) {
    e.preventDefault();
    e.stopPropagation();
}, true);

// 禁止右键菜单
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
}, true);
