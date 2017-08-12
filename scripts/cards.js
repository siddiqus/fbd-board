CARDS = [{
        xpos: 0,
        ypos: 0,
        front: "https://unsplash.it/300/300/",
        back: "http://lorempixel.com/400/400/"
    },
    {
        xpos: 0,
        ypos: 1,
        back: "http://lorempixel.com/400/400/",
        front: "https://unsplash.it/300/300/"
    },
    {
        xpos: 1,
        ypos: 0,
        front: "https://unsplash.it/300/300/",
        back: "http://lorempixel.com/400/400/"
    },
    {
        xpos: 1,
        ypos: 1,
        back: "http://lorempixel.com/400/400/",
        front: "https://unsplash.it/300/300/"
    }
]

CARD_MAP = function() {
    var grid = [];
    for (var row = 0; row < AppConfig.rowCount; row++) {
        var columns = new Array(AppConfig.columnCount)
        grid.push(columns)
    }

    CARDS.forEach(function(card) {
        grid[card.xpos][card.ypos] = {
            back: card.back,
            front: card.front
        }
    })

    return grid;
}();