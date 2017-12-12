function astar(size) {

}
astar.map = function (size) {
    let arr = [];
    _.times(size, y => {
        _.times(size, x => {
            arr.push({ x: x, y: y });
        });
    });
    return arr;
};
astar.html = function (map) {
    return map
        .map(e => `<div class='td' id='td${e.x}-${e.y}' data-index='{"x":${e.x},"y":${e.y}}'></div>`)
        .join('');
}
