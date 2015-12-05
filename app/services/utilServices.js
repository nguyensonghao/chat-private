var dictUtilServices = angular.module('mazii.service.util', ['mazii.service.localstore']);


dictUtilServices.factory('dictUtilSer', ["$q", "$http", "$timeout", "$state", "localstoreServ",
    function ($q, $http, $timeout, $state, localstoreServ) {
    
    var service = {};
        
    var vietnameseChars = new Array("à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ", "ì", "í", "ị", "ỉ", "ĩ", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ", "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ", "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ", "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ", "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ", "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ");

    var kindTables = {
        "abbr": "từ viết tắt",
        "adj": "tính từ",
        "adj-na": "tính từ đuôi な",
        "adj-no": "danh từ sở hữu cách thêm の",
        "adj-pn": "tính từ đứng trước danh từ",
        "adj-s": "tínhh từ đặc biệt",
        "adj-t": "tính từ đuổi tara",
        "adv": "trạng từ",
        "adv-n": "danh từ làm phó từ",
        "adv-to": "trạng từ thêm と",
        "arch": "từ cổ",
        "ateji": "ký tự thay thế",
        "aux": "trợ từ",
        "aux-v": "trợ động từ",
        "aux-adj": "tính từ phụ trợ",
        "Buddh": "thuật ngữ phật giáo",
        "chn": "ngôn ngữ trẻ em",
        "col": "thân mật ngữ",
        "comp": "thuật ngữ tin học",
        "conj": "liên từ",
        "derog": "xúc phạm ngữ",
        "ek": "hán tự đặc trưng",
        "exp": "cụm từ",
        "fam": "từ ngữ thân thuộc",
        "fem": "phụ nữ hay dùng",
        "food": "thuật ngữ thực phẩm",
        "geom": "thuật ngữ hình học",
        "gikun": "gikun",
        "gram": "thuộc về ngữ pháp",
        "hon": "tôn kính ngữ",
        "hum": "khiêm nhường ngữ",
        "id": "thành ngữ",
        "int": "thán từ",
        "iK": "từ chứa kanji bất quy tắc",
        "ik": "từ chứa kana bất quy tắc",
        "io": "okurigana bất quy tắc",
        "iv": "động từ bất quy tắc",
        "kyb": "giọng Kyoto",
        "ksb": "giọng Kansai",
        "ktb": "giọng Kantou",
        "ling": "thuật ngữ ngôn ngữ học",
        "MA": "thuật ngữ nghệ thuật",
        "male": "tiếng lóng của nam giới",
        "math": "thuật ngữ toán học",
        "mil": "thuật ngữ quân sự",
        "m-sl": "thuật ngữ truyện tranh",
        "n": "danh từ",
        "n-adv": "danh từ làm phó từ",
        "n-pref": "danh từ làm tiền tố",
        "n-suf": "danh từ làm hậu tố",
        "n-t": "danh từ chỉ thời gian",
        "neg": "thể phủ định",
        "neg-v": "động từ mang nghĩa phủ định",
        "ng": "từ trung tính",
        "obs": "từ cổ",
        "obsc": "từ tối nghĩa",
        "oK": "từ chứa kanji cổ",
        "ok": "từ chứa kana cổ",
        "osk": "Giọng Osaka",
        "physics": "thuật ngữ vật lý",
        "pol": "thể lịch sự",
        "pref": "tiếp đầu ngữ",
        "prt": "giới từ",
        "qv": "tham khảo mục khác",
        "rare": "từ hiếm gặp",
        "sl": "tiếng lóng",
        "suf": "hậu tố",
        "tsb": "giọng Tosa",
        "uK": "từ sử dụng kanji đứng một mình",
        "uk": "từ sử dụng kana đứng một mình",
        "v": "động từ",
        "v1": "động từ nhóm 2",
        "v5": "động từ nhóm 1",
        "v5aru": "động từ nhóm 1 -aru",
        "v5b": "động từ nhóm 1 -bu",
        "v5g": "động từ nhóm 1 -ku",
        "v5k": "động từ nhóm 1 -ku",
        "v5k-s": "động từ nhóm 1 -iku/yuku",
        "v5m": "động từ nhóm 1 -mu",
        "v5n": "động từ nhóm 1 -nu",
        "v5r": "Động từ nhóm 1 -ru",
        "v5r-i": "Động từ nhóm 1 bất quy tắc -ru",
        "v5s": "động từ nhóm 1 -su",
        "v5t": "động từ nhóm 1 -tsu",
        "v5u": "động từ nhóm 1 -u",
        "v5u-s": "động từ nhóm 1 -u (đặc biệt)",
        "v5uru": "động từ nhóm 1 -uru",
        "vi": "tự động từ",
        "vk": "động từ kuru (đặc biệt)",
        "vs": "danh từ hoặc giới từ làm trợ từ cho động từ suru",
        "vs-i": "động từ bất quy tắc -suru",
        "vt": "tha động từ",
        "vulg": "thuật ngữ thô tục",
        "vz": "tha động từ",
        "X": "thuật ngữ thô tục"

    };    
        
    var mini_kanji_url = "db/kanjimini.json";
    var javi_fast_url = "db/javifastdict.txt";
    var vija_fast_url = "db/vijafastdict.txt";
        
    var miniKanjiDict = null;  
    var allJaviWords = null;
    var allVijaWords = null;    
    var autocomplete = localstoreServ.getItem('autocomplete');
    if (autocomplete == null) {
        autocomplete = true;
    }
        
    function loadMiniKanjiDict() {
        if (miniKanjiDict == null) {
            $.ajax({
                type: 'GET',
                url: mini_kanji_url,
                success: function (data, status, xhr) {
                    var kanjis = null;
                    if (typeof data == "string") {
                       kanjis = JSON.parse(data);
                    } else {
                        kanjis = data;
                    }
                    var kanjiDict = {};
                    for (var i = 0; i < kanjis.length; i++) {
                        kanjiDict[kanjis[i].w] = kanjis[i].h;
                    }

                    miniKanjiDict = kanjiDict;
                    if (autocomplete == true) {
                        loadJaviFastDict();
                    }
                },
                error: function (xhr, status, err) {
                   console.log("File not found: " + mini_kanji_url);
                },
            });
        }
    };

    function loadJaviFastDict() {
      if (allJaviWords == null) {
          $.ajax({
                type: 'GET',
                url: javi_fast_url,
                success: function (data, status, xhr) {
                    allJaviWords = data;
                    loadVijaFastDict();
                },
                error: function (xhr, status, err) {
                   console.log("File not found: " + javi_fast_url);
                }
            });
      }
    } 
        
    function loadVijaFastDict() {
      if (allVijaWords == null) {
          $.ajax({
                type: 'GET',
                url: vija_fast_url,
                success: function (data, status, xhr) {
                    allVijaWords = data;
                },
                error: function (xhr, status, err) {
                   console.log("File not found: " + vija_fast_url);
                }
            });
      }
    }         
        
    service.isVietnamese = function(keyword) {
        var len = keyword.length;
        for (var i = 0; i < len; i++) {
            if (vietnameseChars.indexOf(keyword[i]) != -1) {
                return true;
            }
        }

        return false;
    };
        
    service.capitaliseFirstLetter = function(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    service.isJapanese = function (keyword) {
        var len = keyword.length;
        for (var i = 0; i < len; i++) {
            if (service.isKanji(keyword.charAt(i)) ||
                service.isHiragana(keyword.charAt(i)) ||
                service.isKatakan(keyword.charAt(i))) {
                return true;
            }
        }

        return false;
    };
        
    service.getKanjiChara = function(keyword) {

        if (keyword == null) {
            return '';
        }

        var result = '';
        var len = keyword.length;
        for (var i = 0; i < len; i++) {
            if (service.isKanji(keyword.charAt(i)) && 
                result.indexOf(keyword.charAt(i)) == -1) {
                result += keyword.charAt(i);
            }
        }

        return result;
    }

    service.isRomanji = function(c) {
        var charcode = c.charCodeAt(0);
        if (charcode >= 0x0020 && charcode <= 0x007e) {
            return true;
        }

        return false;
    }

    service.allHiragana = function(keyword) {
        var len = keyword.length;
        for (var i = 0; i < len; i++) {
            if (isHiragana(keyword.charAt(i)) == false) {
                return false;
            }
        }

        return true;
    }    
        
    service.isKanji = function(c) {
        if (c == '々') {
            return true;
        }

        var charcode = c.charCodeAt(0);
        if (charcode >= 0x4E00 && charcode <= 0x9FBF) {
            return true;
        }
        return false;
    };
    
    service.isHiragana = function(c) {
        var charcode = c.charCodeAt(0);
        if (charcode >= 0x3040 && charcode <= 0x309F) {
            return true;
        }

        return false;
    };

    service.isKatakan = function (c) {
        var charcode = c.charCodeAt(0);
        if (charcode >= 0x30A0 && charcode <= 0x30FF) {
            return true;
        }

        return false;
    };
    
        
    service.mergeKanjiAndHiragana = function (kanji, hiragana) {
        if (kanji == '' || hiragana == '' || kanji == null || hiragana == null)
            return null;

        if (service.isJapanese(kanji) == false || service.isJapanese(hiragana) == false) {
            return null;
        }

        var re = new RegExp(' ', 'g');

        if (kanji.indexOf(' ') != -1) {
            kanji = kanji.replace(re, '');
        }

        if (hiragana.indexOf(' ') != -1) {
            hiragana = hiragana.replace(re, '');
        }

        re = new RegExp('　', 'g');
        if (kanji.indexOf('　') != -1) {
            kanji = kanji.replace(re, '');
        }

        if (hiragana.indexOf('　') != -1) {
            hiragana = hiragana.replace(re, '');
        }

        var result = [];
        var currentKanji = '';
        var currentHiragana = '';
        var nextHiraganaChar = '';

        var j = 0;
        for (var i = 0; i < kanji.length; i++) {
            var c = kanji.charAt(i);
            if (service.isKanji(c) || service.isKatakan(c)) {
                if (currentKanji == '' && currentHiragana != '') {
                    var mergedObj = new Object();
                    mergedObj.k = currentHiragana;
                    mergedObj.h = '';
                    result.push(mergedObj);
                    currentHiragana = '';
                    j += currentHiragana.length;
                }
                currentKanji += c;
            } else {
                if (currentKanji == '') {
                    currentHiragana += c;
                    j++;
                } else {

                    nextHiraganaChar = c;
                    while (j < hiragana.length) {
                        if (service.getLengthHiragana(currentHiragana) < currentKanji.length ||
                            hiragana.charAt(j) != nextHiraganaChar) {
                            currentHiragana += hiragana.charAt(j);
                        } else if (hiragana.charAt(j) == nextHiraganaChar) {
                            var mergedObj = new Object();
                            mergedObj.k = currentKanji;
                            mergedObj.h = currentHiragana;

                            result.push(mergedObj);

                            currentKanji = '';
                            currentHiragana = c;
                            j++;
                            break;
                        }

                        j++;
                    }

                    if (j == hiragana.length && currentKanji != '') {
                        var mergedObj = new Object();
                        mergedObj.k = currentKanji;
                        mergedObj.h = currentHiragana;

                        result.push(mergedObj);
                    }

                    if (j == hiragana.length && i < kanji.length - 1) {
                        // this case is parse error
                        return null;
                    }
                }
            }
        }

        if (currentKanji != '') {
            while (j < hiragana.length) {
                currentHiragana += hiragana.charAt(j);
                j++;
            }

            var mergedObj = new Object();
            mergedObj.k = currentKanji;
            mergedObj.h = currentHiragana;

            result.push(mergedObj);
        } else if (currentHiragana != '') {
            var mergedObj = new Object();
            mergedObj.k = currentHiragana;
            mergedObj.h = '';
            result.push(mergedObj);
        }

        return result;
    };
        
    service.getLengthHiragana = function(kanji) {
        if (kanji == null || kanji.length == 0) {
            return 0;
        }

        var result = 0;
        for (var i = 0; i < kanji.length; i++) {
            var c = kanji.charAt(i);
            if (c == 'ん' ||
                c == 'ぁ' ||
                c == 'ぃ' ||
                c == 'ぇ' ||
                c == 'ぅ' ||
                c == 'ぉ' ||
                c == 'ゅ' ||
                c == 'ょ') {
                continue;
            }

            result++;
        }

        return result;
    }

    service.removeJapaneseChar = function(data) {
        if (data == null)
            return '';

        var result = '';
        for (var i = 0; i < data.length; i++) {
            if (service.isJapanese(data[i]) || 
               data[i] == '～' || 
               data[i] == '、' ||
               data[i] == '　' ||
               data[i] == ':' || 
               data[i] == '：' ||
               data[i] == '（' ||
               data[i] == '。' || 
               data[i] == '）') {
                continue;
            }

            result += data[i];
        }
        
        result = result.trim();
        return result;
    }
    
    var tableConjugationConvert = {

    //  0           1       2       3       4       5           6           7       8                           9           10
    //  end with, past, negative, i form, te form, potential, passive, causative, Provisional Conditional, Imperative, Volitional   

        /*"aux-i": [
            "だ", "だった", "じゃない", "であり", "で", "", "", "", "であれば", "であれ", "だろう"
        ],

        "aux-p": [
            "です", "ですた", "じゃありません", "であり", "", "", "", "", "", "", "でしょう"
        ],

        "masu": [
            "ます", "ました", "", "", "まして", "", "", "", "", "", "ましょう"
        ],*/

        "vs": [
            "する", "した", "しない", "し", "して", "できる", "される", "させる", "すれば", "しろ", "しよう"
        ],
        "vk": [
            "くる", "きた", "きない", "き", "きて", "来られる", "来られる", "来させる", "くれば", "こい", "こよう"
        ],
        "v5u": [
            "う", "った", "わない", "い", "って", "える", "われる", "わせる", "えば", "え", "おう"
        ],
        "v5u-s": [
            "う", "うた", "わない", "い", "うて", "える", "われる", "わせる", "えば", "え", "おう"
        ],
        "v5k": [
            "く", "いた", "かない", "き", "いて", "ける", "かれる", "かせる", "けば", "け", "こう"
        ],
        "v5k-s": [
            "く", "った", "かない", "き", "って", "ける", "かれる", "かせる", "けば", "け", "こう"
        ],
        "v5g": [
            "ぐ", "いだ", "がない", "ぎ", "いで", "げる", "がれる", "がせる", "げば", "げ", "ごう"
        ],
        "v5s": [
            "す", "した", "さない", "し", "して", "せる", "される", "させる", "せば", "せ", "そう"
        ],
        "v5t": [
            "つ", "った", "たない", "ち", "って", "てる", "たれる", "たせる", "てば", "て", "とう"
        ],
        "v5n": [
            "ぬ", "んだ", "なない", "に", "んで", "ねる", "なれる", "なせる", "ねば", "ね", "のう"
        ],
        "v5b": [
            "ぶ", "んだ", "ばない", "び", "んで", "べる", "ばれる", "ばせる", "べば", "べ", "ぼう"
        ],
        "v5m": [
            "む", "んだ", "まない", "み", "んで", "める", "まれる", "ませる", "めば", "め", "もう"
        ],
        "v5r": [
            "る", "った", "らない", "り", "って", "れる", "られる", "らせる", "れば", "れ", "ろう"
        ],
        "v5r-i": [
            "る", "った", "", "り", "って", "ありえる", "", "らせる", "れば", "れる", "ろう"
        ],
        "v5aru": [
            "る", "った", "らない", "い", "って", "りえる", "", "", "", "い", ""
        ],
        "v1": [
            "る", "た", "ない", "-", "て", "られる", "られる", "させる", "れば", "いろ", "よう"
        ]

        /*"adj-i": [
            "い", "かった", "くない", "くて", "", "", "", "", "ければ", "", "かろう"
        ],
        "adj-na": [
            "な", "だった", "ではない", "で", "", "", "", "", "であれば", "", "だろう"
        ]*/
    }

    service.getConjugationTableOfVerb = function(dictVerb, phonetic, type) {

        // normalize phonetic
        if (phonetic.indexOf("「") != -1) {
            phonetic = phonetic.replace("「", "");
            phonetic = phonetic.replace("」", "");
        }

        // check type is in table
        var rule = tableConjugationConvert[type];
        if (rule == null)
            return null;

        phonetic = phonetic.split(" ")[0];
        
        // check base form
        if (dictVerb.indexOf(rule[0]) == -1) {
            dictVerb = dictVerb + rule[0];
            phonetic = phonetic + rule[0];
        }

        
        var verbConjug = {};
        verbConjug.base = {};
        verbConjug.base.word = dictVerb + "/" + phonetic;
        verbConjug.base.name = "Từ điển (辞書)"

        if (dictVerb == phonetic) {
            verbConjug.base.word = dictVerb;
        }

        var regex = new RegExp(rule[0] + "$");

        // get past form
        verbConjug.past = {};
        verbConjug.past.word = dictVerb.replace(regex, rule[1]);
        verbConjug.past.name = "Quá khứ (た)"

        // get nagative form
        if (rule[2] != "") {
            verbConjug.nagative = {};
            verbConjug.nagative.word = dictVerb.replace(regex, rule[2]);
            verbConjug.nagative.name = "Phủ định (未然)";
        } else {
            verbConjug.nagative = {};
            if (dictVerb.indexOf("する") != -1) {
                verbConjug.nagative.word = dictVerb.replace("する", "しない");
            } else if (dictVerb.indexOf("くる") != -1) {
                verbConjug.nagative.word = dictVerb.replace("くる", "こない")
            }

            verbConjug.nagative.name = "Phủ định (未然)";
        }

        // get polite form
        if (rule[3] != "") {
            verbConjug.polite = {};
            if (rule[3] == "-") {
                verbConjug.polite.word = dictVerb.replace(regex, "") + "ます"; 
            } else {
                verbConjug.polite.word = dictVerb.replace(regex, rule[3]) + "ます"; 
            }
            verbConjug.polite.name = "Lịch sự (丁寧)";
        }

        // get te form
        if (rule[4] != "") {
            verbConjug.te = {};
            verbConjug.te.word = dictVerb.replace(regex, rule[4]);
            verbConjug.te.name = "te (て)"
        }


        // get potential form
        if (rule[5] != "") {
            verbConjug.potential = {};
            verbConjug.potential.word = dictVerb.replace(regex, rule[5]);
            verbConjug.potential.name = "Khả năng (可能)";
        }

        // get passive form
        if (rule[6] != "") {
            verbConjug.passive = {};
            verbConjug.passive.word = dictVerb.replace(regex, rule[6]);
            verbConjug.passive.name = "Thụ động (受身)";
        }


        // get causative form
        if (rule[7] != "") {
            verbConjug.causative = {};
            verbConjug.causative.word = dictVerb.replace(regex, rule[7]);
            verbConjug.causative.name = "Sai khiến (使役)";
        } 

        if (rule[6] != "" && rule[7] != "") {
            var caupassRule = tableConjugationConvert["v1"];
            var caupassRegex = new RegExp(caupassRule[0] + "$");

            verbConjug.cau_pass = {};
            verbConjug.cau_pass.word = verbConjug.causative.word.replace(caupassRegex, rule[6]);
            verbConjug.cau_pass.name = "Sai khiến thụ động (使役受身)";
        }

        // get conditional form
        if (rule[8] != "") {
            verbConjug.conditional = {};
            verbConjug.conditional.word = dictVerb.replace(regex, rule[8]);
            verbConjug.conditional.name = "Điều kiện (条件)";
        }


        // get imperative form
        if (rule[9] != "") {
            verbConjug.imperative = {};
            verbConjug.imperative.word = dictVerb.replace(regex, rule[9]);
            verbConjug.imperative.name = "Mệnh lệnh (命令)";
        }


        // get volitional form
        if (rule[10] != "") {
            verbConjug.volitional = {};
            verbConjug.volitional.word = dictVerb.replace(regex, rule[10]);
            verbConjug.volitional.name = "Ý chí (意向)";
        }

        verbConjug.prohibition = {};
        verbConjug.prohibition.word = dictVerb + "な";
        verbConjug.prohibition.name = "Cấm chỉ(禁止)";

        return verbConjug;
    }
    
    service.convertKindToReadable = function(kind) {
    
        var kinds = [];
        if (kind.indexOf(',') != -1) {
            kinds = kind.split(',');
            for (var i = 0; i < kinds.length; i++) {
                kinds[i] = kinds[i].trim();
            }
        } else {
            kinds.push(kind);
        }

        var result = '';
        for (var i = 0; i < kinds.length; i++) {
            if (kindTables.hasOwnProperty(kinds[i])) {
                result += kindTables[kinds[i]];
            } else {
                result += kinds[i];
            }

            if (i != kinds.length - 1) {
                result += ", ";
            }
        }

        return result;
    }
    
    function getFirstWord(data) {
        var v1 = data.split(',')[0];
        return v1.split(';')[0];
    }
    
    service.getHVOfKey = function(keyword) {
        if (keyword == null ||
           keyword.length >= 5) {
            return "";
        }

        if (miniKanjiDict == null)
            return "";

        var result = "";
        for (var i = 0; i < keyword.length; i++) {
            if (service.isKanji(keyword[i])) {
                var hv = miniKanjiDict[keyword[i]];
                if (hv != null) {
                    if (result != "") {
                        result += " ";
                    }
                    result += getFirstWord(hv);
                }
            }
        }

        return result;
    }
    
    service.sortHVDataByKeyWord = function (kw, datas) {
        var newDatas = new Array();
        var count = 0;

        for (var i = 0; i < kw.length; i++) {
            for (j = 0; j < datas.length; j++) {
                if (kw[i] == datas[j].kanji) {

                    var exist = false;
                    // check this key is exist in new datas
                    for (k = 0; k < newDatas.length; k++) {
                        if (newDatas[k].kanji == kw[i]) {
                            exist = true;
                            break;
                        }
                    }

                    if (exist == false) {
                        newDatas[count] = datas[j];
                        count++;
                    }
                }
            }
        }

        return newDatas;
    }
    
    service.realtimeSearch = function(fastdict, query) {
        var dict = allJaviWords;
        var searchJapanese = true;
        if (fastdict == "vi") {
            dict = allVijaWords;
            searchJapanese = false;
        }
        
        var result = null;
        var queryLen = query.length;
        var rx = new RegExp('"([^"]*'+query+'[^"]*)"','gi');
        var i = 0, results = [];
        var max_diff_len = 4;
        if (queryLen > 4) {
            max_diff_len = 16;
        } else if (queryLen > 6) {
            max_diff_len = 20;
        }
        
        while (result = rx.exec(dict)) {
            
            var word = result[1];
            var str1 = '';
            if (searchJapanese) {
                var arr = word.split(" ");
                var str1 = arr[0];
                var k = 0;
                while (k < arr.length && str1.indexOf(query) == -1) {
                    k++;
                    str1 = arr[k];
                }
                
                if (str1.length - queryLen > max_diff_len) {
                    continue;
                }
            } else {
                str1 = word;
                if (str1.length - queryLen > max_diff_len) {
                    continue;
                }
            }
            
            if (str1 == query) {
                results.splice(0, 0, word);
            } else {
                results.push(word);
            }
            
            i += 1;
            if (i >= 150)
              break;
        }

        // get 20 first item
        var finalResults = [];
        for (var i = 0; i < 30 && i < results.length; i++) {
            finalResults.push(results[i]);
        }
        
        return finalResults;
    }

    service.sortResultSuggest = function(suggestList, keyword) {

        if (suggestList == null)
            return null;

        var leng = suggestList.length;
        for (var i = 0; i < leng; i++) {
            for (var j = i + 1; j < leng; j++) {  
            }
        }
    }

    service.convertStrToInt = function(str) {
        if (str == null)
            return 0;
        var r = 0;
        var i = str.length - 1;
        var iter = 1;
        while (i >= 0) {
            r += str.charCodeAt(i) * iter;
            i--;
            iter *= 10;
        }
        return r;
    }    
    
    
    service.generateSuggest = function (listSuggests, clickHandler) {
        
        if (listSuggests == null || listSuggests.length == 0)
            return '';
        
        var itemTemplate = '<div class="item suggest" ng-click="suggestClick({{item}})"><span><b>{{ item.split(" ")[0] }}</b> {{ item.replace(item.split(" ")[0], "") }} </span></div>';
        
        var templates = '<div class="list">';
        var miniScope = {
                item: '',
                suggestClick: clickHandler
            };
        for (var i = 0; i < listSuggests.length; i++) {
            miniScope.item = listSuggests[i];
            templates += $interpolate(itemTemplate)(miniScope);
        }
        
        templates += "</div>";
        
        return templates;
    } 

    service.closePanel = function () {
        $('.menu-left').removeClass('open-menu-left');
        $('.history-panel').removeClass('open-history-panel');
        $('.setting-panel').removeClass('open-setting-panel');
        $('.cover').css('display', 'none'); 
        $('body').css('overflow', 'auto');
    }

    service.showTitlePage = function () {
        $('.title-page').removeClass('hidden-title');
    }

    service.hiddenTitlePage = function () {
        $('.title-page').addClass('hidden-title');
    }

    service.checkExistNewlineinMessage = function (message) {
        return message.content.indexOf('\n');
    }

    service.renderHtmlMessage = function (message) {
        var indexOf = service.checkExistNewlineinMessage(message);
        if (indexOf == 0) {
            return message.substring(2, message.content.length);
        } else if (indexOf > 0) {
            var result = [];
            var msg1 = message;
            var msg2 = message;
            msg1.content = message.content.substring(0, indexOf);
            msg2.content = message.content.substring(indexOf + 2, message.content.length);            
            result.push(msg1);
            result.push(msg2);
            return result;
        } else {
            return message;
        }
    }

    service.renderHtmlListMessage = function (listMessage) {
        var size = listMessage.length;
        var result = [];
        for (var i = 0; i < size; i++) {
            var message = listMessage[i];
            var indexOf = service.checkExistNewlineinMessage(message);
            if (indexOf != -1) {

            } else {

            }
        }
    }
    
    loadMiniKanjiDict();
    
    return service;    
}]);