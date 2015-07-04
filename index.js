window.addEventListener("load",function() {

    function DevAnswersTab() {
        this.init();
        this.body = document.querySelector('body');
        this.phrase_text = document.querySelector('.phrase__text');
        this.phrase_link = document.querySelector('.phrase__link');
    }


    DevAnswersTab.prototype.init = function() {
        this.getPhrases();
    };

    DevAnswersTab.prototype.getPhrases = function() {
        var xhr = new XMLHttpRequest();
        var that = this;

        xhr.open("GET", chrome.extension.getURL('/phrase.json'), true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function(st) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    that.renderTab(xhr.response.phrases);
                }
            }
        }
        xhr.send();
    };

    DevAnswersTab.prototype.renderTab = function(phrases) {
        this.renderBackground();
        this.renderPhrase(phrases);
    };

    DevAnswersTab.prototype._getRandomNumber = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    DevAnswersTab.prototype.renderPhrase = function(phrases) {
        var number = this._getRandomNumber(0, phrases.length);
        var randomPhrase = phrases[number].phrase;
        var randomPhraseLink = phrases[number].link;

        this.phrase_text.innerHTML = randomPhrase;
        this.phrase_link.setAttribute('href', randomPhraseLink)
    };

    DevAnswersTab.prototype.renderBackground = function() {
        var number = this._getRandomNumber(1, 11);

        this.body.className = 'bg' + number;
    };

    var tab = new DevAnswersTab();
});
