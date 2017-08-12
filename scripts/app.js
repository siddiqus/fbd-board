$(document).ready(function() {
    var _getSquareSideLength = function(windowHeight, windowWidth, factor) {
        var maxHeight = windowHeight / AppConfig.rowCount;
        var maxWidth = windowWidth / AppConfig.columnCount;
        var maxSide = Math.min(maxHeight, maxWidth);
        return maxSide;
    };

    var _getImage = function(url, className) {
        if (!className) className = 'fbd-tile-img';
        var img = $("<img class='lazy'/>");
        // img.attr('data-src', url);
        img.addClass(className);
        img.attr('src', url);
        return img;
    };

    var _getFlipCard = function(imgBack, imgFront) {
        var flipContainer = $("<div class='fbd-flip-container'></div>");
        var flipper = $("<div class='fbd-flipper'></div>");
        var front = $("<div class='fbd-img-container fbd-front'></div>");
        var back = $("<div class='fbd-img-container fbd-back'></div>");

        front.append(imgFront);
        back.append(imgBack);

        flipper.append(front);
        flipper.append(back);
        flipContainer.append(flipper);
        return flipContainer;
    };

    var _showCardModal = function(backSrc, frontSrc) {
        var modal = $('#fbdModal');

        var modalLength = $('.fbd-modal-content').width()
        $('.fbd-modal-content').height();
        // var back = $("<img class='fbd-modal-img'/>");
        // back.attr('src', backSrc);
        var back = _getImage(backSrc, 'fbd-modal-img');
        var front = _getImage(frontSrc, 'fbd-modal-img');

        var paddedSide = modalLength - 32;
        $('#fbdModal').find('.fbd-img-container').width(paddedSide);
        $('#fbdModal').find('.fbd-img-container').height(paddedSide);
        back.css('height', paddedSide);
        back.css('width', paddedSide);
        front.css('height', paddedSide);
        front.css('width', paddedSide);

        var flipContainer = _getFlipCard(back, front);

        $('.fbd-modal-body').html(flipContainer);
        $('.fbd-modal-body').height(paddedSide);
        $('.fbd-modal-body').width(paddedSide);
        modal.css('display', 'block')
    };

    var _getTileContent = function() {
        var imgBack = _getImage("https://unsplash.it/300/300/");
        var imgFront = _getImage("http://lorempixel.com/400/400/");

        var flipContainer = _getFlipCard(imgBack, imgFront);
        return flipContainer;
    };

    var _getRowDiv = function() {
        var rowDiv = $("<div class='fbd-row'></div>");

        for (var col = 0; col < AppConfig.columnCount; col++) {
            var tile = $("<div class='fbd-tile'></div>");
            tile.css('height', squareSideLength);
            tile.css('width', squareSideLength);

            var tileContent = _getTileContent();
            tile.append(tileContent)
            rowDiv.append(tile);
        }

        return rowDiv;
    };

    var windowFactor = 0.8;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var boardWidth = windowFactor * windowWidth;
    var boardHeight = windowFactor * windowHeight;

    var squareSideLength = _getSquareSideLength(boardHeight, boardWidth);

    var board = $('#fbd-grid');
    for (var row = 0; row < AppConfig.rowCount; row++) {
        var rowDiv = _getRowDiv();
        board.append(rowDiv);
    };

    $('.fbd-tile-img').css('height', squareSideLength);
    $('.fbd-tile-img').css('width', squareSideLength);

    // $(function() {
    //     $('.lazy').Lazy({
    //         effect: 'fadeIn',
    //         effectTime: 500
    //     });
    // });

    $('.fbd-close').click(function() {
        $('#fbdModal').fadeOut('fast');
        // $('#fbdModal').css('display', 'none')
    })

    $(document).click(function(e) {
        if (e.target.id === 'fbdModal') {
            $('#fbdModal').fadeOut('fast');
        };
    });

    // fbd-flip-container
    $(document).on('tap click', '.fbd-flip-container', function() {
        this.classList.toggle('fbd-flip');

        var backImg = $(this).find('.fbd-back img').attr('src');
        var frontImg = $(this).find('.fbd-front img').attr('src');

        _showCardModal(backImg, frontImg);
    });

    $(document).on('mouseenter', '.fbd-flip-container', function() {
        console.log('on enter')
        this.classList.toggle('fbd-flip');
    });

    // $(document).on('mouseleave', '.fbd-flip-container', function() {
    //     this.classList.remove('fbd-flip');
    // });
})