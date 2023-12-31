(function(){
var translateObjs = {};
function trans(c, d) {
    var e = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
    translateObjs[e[0x0]] = e;
    return '';
}
function regTextVar(f, g) {
    var h = ![];
    return i(g);
    function i(p, q) {
        switch (p['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var s = function () {
                switch (p['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }();
            if (s) {
                return function () {
                    var x, y;
                    var z = (q && q['viewerName'] ? this['getComponentByName'](q['viewerName']) : undefined) || this['getMainViewer']();
                    if (p['toLowerCase']()['startsWith']('photo'))
                        x = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (B) {
                            var C = B['get']('player');
                            return C && C['get']('viewerArea') == z;
                        })['map'](function (D) {
                            return D['get']('media')['get']('playList');
                        });
                    else {
                        x = this['_getPlayListsWithViewer'](z);
                        y = o['bind'](this, z);
                    }
                    if (!h) {
                        for (var A = 0x0; A < x['length']; ++A) {
                            x[A]['bind']('changing', k, this);
                        }
                        h = !![];
                    }
                    return n['call'](this, x, s, y);
                };
            }
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](p);
            };
        default:
            if (p['toLowerCase']()['startsWith']('viewer.')) {
                var t = p['split']('.');
                var u = t[0x1];
                if (u) {
                    var v = t['slice'](0x2)['join']('.');
                    return i(v, { 'viewerName': u });
                }
            } else if (p['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                var w = undefined;
                var s = function () {
                    switch (p['toLowerCase']()) {
                    case 'quiz.questions.answered':
                        return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                    case 'quiz.question.count':
                        return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                    case 'quiz.items.found':
                        return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                    case 'quiz.item.count':
                        return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                    case 'quiz.score':
                        return TDV['Quiz']['PROPERTY']['SCORE'];
                    case 'quiz.score.total':
                        return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                    case 'quiz.time.remaining':
                        return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                    case 'quiz.time.elapsed':
                        return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                    case 'quiz.time.limit':
                        return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                    case 'quiz.media.items.found':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                    case 'quiz.media.item.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                    case 'quiz.media.questions.answered':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                    case 'quiz.media.question.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                    case 'quiz.media.score':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                    case 'quiz.media.score.total':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                    case 'quiz.media.index':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                    case 'quiz.media.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                    case 'quiz.media.visited':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                    default:
                        var E = /quiz\.([\w_]+)\.(.+)/['exec'](p);
                        if (E) {
                            w = E[0x1];
                            switch ('quiz.' + E[0x2]) {
                            case 'quiz.score':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            }
                        }
                    }
                }();
                if (s) {
                    return function () {
                        var F = this['get']('data')['quiz'];
                        if (F) {
                            if (!h) {
                                if (w != undefined)
                                    if (w == 'global') {
                                        var H = this['get']('data')['quizConfig'];
                                        var J = H['objectives'];
                                        for (var L = 0x0, N = J['length']; L < N; ++L) {
                                            F['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], m['call'](this, J[L]['id'], s), this);
                                        }
                                    } else {
                                        F['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], m['call'](this, w, s), this);
                                    }
                                else
                                    F['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], l['call'](this, s), this);
                                h = !![];
                            }
                            try {
                                var O = 0x0;
                                if (w != undefined) {
                                    if (w == 'global') {
                                        var H = this['get']('data')['quizConfig'];
                                        var J = H['objectives'];
                                        for (var L = 0x0, N = J['length']; L < N; ++L) {
                                            O += F['getObjective'](J[L]['id'], s);
                                        }
                                    } else {
                                        O = F['getObjective'](w, s);
                                    }
                                } else {
                                    O = F['get'](s);
                                    if (s == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                        O += 0x1;
                                }
                                return O;
                            } catch (P) {
                                return undefined;
                            }
                        }
                    };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function j() {
        var Q = this['get']('data');
        Q['updateText'](Q['translateObjs'][f]);
    }
    function k(R) {
        var S = R['data']['nextSelectedIndex'];
        if (S >= 0x0) {
            var T = R['source']['get']('items')[S];
            var U = function () {
                T['unbind']('begin', U, this);
                j['call'](this);
            };
            T['bind']('begin', U, this);
        }
    }
    function l(V) {
        return function (W) {
            if (V in W) {
                j['call'](this);
            }
        }['bind'](this);
    }
    function m(X, Y) {
        return function (Z, a0) {
            if (X == Z && Y in a0) {
                j['call'](this);
            }
        }['bind'](this);
    }
    function n(a1, a2, a3) {
        for (var a4 = 0x0; a4 < a1['length']; ++a4) {
            var a5 = a1[a4];
            var a6 = a5['get']('selectedIndex');
            if (a6 >= 0x0) {
                var a7 = a2['split']('.');
                var a8 = a5['get']('items')[a6];
                if (a3 !== undefined && !a3['call'](this, a8))
                    continue;
                for (var a9 = 0x0; a9 < a7['length']; ++a9) {
                    if (a8 == undefined)
                        return '';
                    a8 = 'get' in a8 ? a8['get'](a7[a9]) : a8[a7[a9]];
                }
                return a8;
            }
        }
        return '';
    }
    function o(aa, ab) {
        var ac = ab['get']('player');
        return ac !== undefined && ac['get']('viewerArea') == aa;
    }
}
var script = {"minWidth":0,"id":"rootPlayer","backgroundColor":["#FFFFFF"],"vrPolyfillScale":1,"start":"this.playAudioList([this.audio_9404E649_AB8B_E364_41E0_C63D25D0719C], true); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B8784122_AB9D_E124_41AE_4319268AB159,this.IconButton_BEDEF0BA_AB9C_FF24_41E2_547D17E39535], 'cardboardAvailable'); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916], 'gyroscopeAvailable'); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }; this.restartTourWithoutInteraction(600)","data":{"defaultLocale":"en","name":"Player6915","textToSpeechConfig":{"speechOnInfoWindow":false,"speechOnTooltip":false,"speechOnQuizQuestion":false,"volume":1,"rate":1,"pitch":1,"stopBackgroundAudio":false},"locales":{"en":"locale/en.txt"},"history":{}},"defaultVRPointer":"gaze","watermark":false,"propagateClick":false,"class":"Player","defaultMenu":[],"menu":["this.menuItem_BB06B93F_AFAB_512F_41D3_2FF7A58C4E4B"],"buttonToggleMute":"this.IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF","layout":"absolute","scrollBarColor":"#000000","hash": "7251f6f6399b9b1211afe9bcc9a8f1e0477a73141bb08ae3ee9892119e696ee1", "definitions": [{"id":"Menu_A53B86F4_AA95_232C_41E4_463AFB121ADA","selectedFontColor":"#FFFFFF","label":trans('Menu_A53B86F4_AA95_232C_41E4_463AFB121ADA.label'),"fontFamily":"Arial","backgroundColor":"#404040","selectedBackgroundColor":"#202020","rollOverOpacity":0.8,"rollOverFontColor":"#FFFFFF","distance":2,"opacity":0.4,"children":["this.MenuItem_B1023D71_BE4B_CBE8_41B7_30339AE6F83C","this.MenuItem_B1021D71_BE4B_CBE8_41DD_BE81F99B4BDB"],"class":"Menu","fontColor":"#FFFFFF","rollOverBackgroundColor":"#000000"},{"minWidth":1,"id":"IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812","verticalAlign":"middle","iconURL":"skin/IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812.png","data":{"name":"IconButton FULLSCREEN"},"class":"IconButton","mode":"toggle","pressedIconURL":"skin/IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812_pressed.png","pressedRollOverIconURL":"skin/IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812_pressed_rollover.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"maxWidth":58,"maxHeight":58,"minHeight":1,"horizontalAlign":"center"},{"id":"Container_B80E0303_AB9B_22E4_413A_FC9089943162","right":"0%","overflow":"scroll","class":"Container","data":{"name":"-button set"},"bottom":"0%","layout":"vertical","scrollBarColor":"#000000","width":"91.304%","backgroundOpacity":0,"height":"85.959%","visible":false,"gap":3,"children":["this.IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5","this.IconButton_B8784122_AB9D_E124_41AE_4319268AB159","this.IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916","this.IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF","this.IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86","this.IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812","this.IconButton_B80DA303_AB9B_22E4_41E0_CA72CE60548B","this.IconButton_B80DB303_AB9B_22E4_41C7_309008370D33"],"minHeight":1,"scrollBarMargin":2,"horizontalAlign":"center","minWidth":1},{"minWidth":1,"id":"IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF","verticalAlign":"middle","iconURL":"skin/IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF.png","data":{"name":"IconButton MUTE"},"class":"IconButton","mode":"toggle","pressedIconURL":"skin/IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF_pressed.png","pressedRollOverIconURL":"skin/IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF_pressed_rollover.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"maxWidth":58,"maxHeight":58,"minHeight":1,"horizontalAlign":"center"},{"minWidth":1,"id":"IconButton_B80DB303_AB9B_22E4_41C7_309008370D33","verticalAlign":"middle","iconURL":"skin/IconButton_B80DB303_AB9B_22E4_41C7_309008370D33.png","data":{"name":"IconButton FB"},"rollOverIconURL":"skin/IconButton_B80DB303_AB9B_22E4_41C7_309008370D33_rollover.png","class":"IconButton","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"maxWidth":58,"maxHeight":58,"click":"this.shareSocial('facebook', undefined, false, {\"includeCurrentMeasureModel3DObjects\":false,\"includeCurrentVisibleHotspots\":false,\"includeCurrentView\":false}, undefined)","minHeight":1,"horizontalAlign":"center"},{"minWidth":1,"id":"IconButton_B80DA303_AB9B_22E4_41E0_CA72CE60548B","verticalAlign":"middle","iconURL":"skin/IconButton_B80DA303_AB9B_22E4_41E0_CA72CE60548B.png","data":{"name":"IconButton TWITTER"},"rollOverIconURL":"skin/IconButton_B80DA303_AB9B_22E4_41E0_CA72CE60548B_rollover.png","class":"IconButton","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"maxWidth":58,"maxHeight":58,"click":"this.shareSocial('twitter', undefined, false, {\"includeCurrentMeasureModel3DObjects\":false,\"includeCurrentVisibleHotspots\":false,\"includeCurrentView\":false}, undefined)","minHeight":1,"horizontalAlign":"center"},{"id":"video_B8FC9C32_AAB7_2724_41A6_57CF61E83BD6","label":trans('video_B8FC9C32_AAB7_2724_41A6_57CF61E83BD6.label'),"video":"this.videores_B886F451_AAB5_2764_41D0_C05372C452FD","width":824,"chromaSmoothing":0.15,"height":1080,"chromaThreshold":0.08,"class":"Video","chromaColor":"#099423","data":{"label":"pano_01_1 - Panorama (VR2 Edit 2)"},"thumbnailUrl":"media/video_B8FC9C32_AAB7_2724_41A6_57CF61E83BD6_t.jpg"},{"minWidth":1,"id":"IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5","verticalAlign":"middle","iconURL":"skin/IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5.png","data":{"name":"IconButton VR"},"rollOverIconURL":"skin/IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5_rollover.png","class":"IconButton","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"maxWidth":58,"maxHeight":58,"visible":false,"minHeight":1,"horizontalAlign":"center"},{"id":"panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_camera","timeToIdle":14000,"class":"PanoramaCamera","idleSequence":"this.sequence_A320C793_AFE9_51F6_41E3_5CE5054BDBB9","initialPosition":{"yaw":0,"class":"PanoramaCameraPosition","pitch":0},"enterPointingToHorizon":true,"initialSequence":"this.sequence_A320C793_AFE9_51F6_41E3_5CE5054BDBB9"},{"minWidth":1,"id":"IconButton_B8784122_AB9D_E124_41AE_4319268AB159","verticalAlign":"middle","iconURL":"skin/IconButton_B8784122_AB9D_E124_41AE_4319268AB159.png","data":{"name":"IconButton14318"},"propagateClick":false,"class":"IconButton","width":56,"backgroundOpacity":0,"height":56,"maxWidth":56,"maxHeight":56,"minHeight":1,"horizontalAlign":"center"},{"id":"video_B9F1D367_AABD_E12D_41D6_C11BBB4D34CA","label":trans('video_B9F1D367_AABD_E12D_41D6_C11BBB4D34CA.label'),"video":"this.videores_B8C42948_AABD_2164_41CE_FC09B4184576","width":824,"chromaSmoothing":0.21,"height":1080,"chromaThreshold":0.09,"class":"Video","chromaColor":"#008020","data":{"label":"horse"},"thumbnailUrl":"media/video_B9F1D367_AABD_E12D_41D6_C11BBB4D34CA_t.jpg"},{"id":"MainViewer","playbackBarProgressBorderSize":0,"progressBackgroundColor":["#000000"],"progressBottom":10,"playbackBarBackgroundColorDirection":"vertical","subtitlesBottom":50,"data":{"name":"Main Viewer"},"toolTipFontSize":"1.11vmin","surfaceReticleColor":"#FFFFFF","playbackBarHeadShadowBlurRadius":3,"propagateClick":false,"playbackBarRight":0,"progressHeight":2,"subtitlesTextShadowVerticalLength":1,"playbackBarProgressBorderRadius":0,"progressBorderSize":0,"playbackBarLeft":0,"subtitlesFontColor":"#FFFFFF","progressBarBorderSize":0,"toolTipTextShadowColor":"#000000","playbackBarProgressBackgroundColor":["#3399FF"],"playbackBarHeadHeight":15,"vrPointerColor":"#FFFFFF","playbackBarHeadShadowColor":"#000000","playbackBarHeadShadowOpacity":0.7,"progressBarBorderRadius":2,"subtitlesTextShadowColor":"#000000","subtitlesGap":0,"progressBackgroundColorRatios":[0],"playbackBarHeadBackgroundColorRatios":[0,1],"toolTipShadowColor":"#333138","subtitlesBackgroundColor":"#000000","width":"100%","progressRight":"33%","toolTipBorderColor":"#767676","minWidth":100,"progressOpacity":0.7,"minHeight":50,"progressBarBackgroundColorDirection":"horizontal","toolTipFontFamily":"Arial","subtitlesFontSize":"3vmin","progressBarBorderColor":"#000000","playbackBarProgressBackgroundColorRatios":[0],"playbackBarBorderColor":"#FFFFFF","playbackBarHeadBorderSize":0,"playbackBarHeadShadow":true,"playbackBarBorderRadius":0,"progressBarBackgroundColorRatios":[0],"playbackBarProgressBorderColor":"#000000","height":"100%","toolTipPaddingRight":6,"playbackBarHeadBackgroundColor":["#111111","#666666"],"vrPointerSelectionColor":"#FF6600","class":"ViewerArea","progressBorderRadius":2,"toolTipPaddingBottom":4,"toolTipBackgroundColor":"#F6F6F6","vrPointerSelectionTime":2000,"playbackBarBottom":5,"playbackBarHeadBorderRadius":0,"toolTipPaddingTop":4,"subtitlesBorderColor":"#FFFFFF","subtitlesTextShadowHorizontalLength":1,"progressBorderColor":"#000000","progressLeft":"33%","toolTipPaddingLeft":6,"playbackBarHeadBorderColor":"#000000","playbackBarBackgroundOpacity":1,"playbackBarBackgroundColor":["#FFFFFF"],"firstTransitionDuration":0,"playbackBarBorderSize":0,"playbackBarHeight":10,"subtitlesTop":0,"toolTipFontColor":"#606060","subtitlesBackgroundOpacity":0.2,"progressBarBackgroundColor":["#3399FF"],"subtitlesTextShadowOpacity":1,"playbackBarHeadWidth":6,"surfaceReticleSelectionColor":"#FFFFFF","subtitlesFontFamily":"Arial"},{"minWidth":1,"id":"Container_B80D8303_AB9B_22E4_41D1_4E9977A18321","right":"0%","overflow":"scroll","class":"Container","data":{"name":"--SETTINGS"},"layout":"absolute","scrollBarColor":"#000000","top":"0%","width":115.05,"backgroundOpacity":0,"height":641,"gap":10,"children":["this.Container_B80E2302_AB9B_22E4_41A4_8887E35DE617","this.Container_B80E0303_AB9B_22E4_413A_FC9089943162"],"minHeight":1,"scrollBarMargin":2},{"id":"mainPlayList","items":["this.PanoramaPlayListItem_B1024D60_BE4B_CBE8_41D9_D6378DC74593","this.PanoramaPlayListItem_B1027D60_BE4B_CBE8_41DF_894D4140648E"],"class":"PlayList"},{"id":"panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_camera","timeToIdle":14000,"class":"PanoramaCamera","idleSequence":"this.sequence_A320A792_AFE9_51F6_41E0_8A2B03E4FEB7","initialPosition":{"yaw":0,"class":"PanoramaCameraPosition","pitch":0},"enterPointingToHorizon":true,"initialSequence":"this.sequence_A320A792_AFE9_51F6_41E0_8A2B03E4FEB7"},{"id":"panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB","label":trans('panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB.label'),"hfov":360,"hfovMax":130,"frames":[{"cube":{"levels":[{"height":5632,"rowCount":11,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/0/{row}_{column}.jpg","width":33792,"colCount":66},{"height":3072,"rowCount":6,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/1/{row}_{column}.jpg","width":18432,"colCount":36},{"height":1536,"rowCount":3,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/2/{row}_{column}.jpg","width":9216,"colCount":18},{"height":1024,"rowCount":2,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/3/{row}_{column}.jpg","width":6144,"colCount":12},{"height":512,"rowCount":1,"class":"TiledImageResourceLevel","tags":["ondemand","preload"],"url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/4/{row}_{column}.jpg","width":3072,"colCount":6}],"class":"ImageResource"},"thumbnailUrl":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_t.jpg","class":"CubicPanoramaFrame"}],"adjacentPanoramas":[{"select":"this.overlay_BF6BD11A_AFFB_6EF1_41C3_68C1D31248C8.get('areas').forEach(function(a){ a.trigger('click') })","yaw":35.18,"distance":5.7,"panorama":"this.panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3","data":{"overlayID":"overlay_BF6BD11A_AFFB_6EF1_41C3_68C1D31248C8"},"class":"AdjacentPanorama"}],"overlays":["this.overlay_BF2980A7_AFFB_2FDE_41C0_2E97A64640C4","this.overlay_BF6BD11A_AFFB_6EF1_41C3_68C1D31248C8","this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_tcap0"],"data":{"label":"\u0646\u0642\u0640\u0640\u0640\u0637\u0640\u0640\u0629 2"},"class":"Panorama","cardboardMenu":"this.Menu_A53B86F4_AA95_232C_41E4_463AFB121ADA","thumbnailUrl":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_t.jpg","vfov":180},{"id":"panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3","label":trans('panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3.label'),"hfov":360,"hfovMax":130,"frames":[{"cube":{"levels":[{"height":5632,"rowCount":11,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/0/{row}_{column}.jpg","width":33792,"colCount":66},{"height":3072,"rowCount":6,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/1/{row}_{column}.jpg","width":18432,"colCount":36},{"height":1536,"rowCount":3,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/2/{row}_{column}.jpg","width":9216,"colCount":18},{"height":1024,"rowCount":2,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/3/{row}_{column}.jpg","width":6144,"colCount":12},{"height":512,"rowCount":1,"class":"TiledImageResourceLevel","tags":["ondemand","preload"],"url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/4/{row}_{column}.jpg","width":3072,"colCount":6}],"class":"ImageResource"},"thumbnailUrl":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_t.jpg","class":"CubicPanoramaFrame"}],"adjacentPanoramas":[{"select":"this.overlay_BF9FC753_AFF9_5176_41CC_55C1E2EB9BAE.get('areas').forEach(function(a){ a.trigger('click') })","yaw":-1.47,"distance":7.39,"panorama":"this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB","data":{"overlayID":"overlay_BF9FC753_AFF9_5176_41CC_55C1E2EB9BAE"},"class":"AdjacentPanorama"}],"overlays":["this.overlay_A041F06C_AFF9_EF52_41D5_3DCF9DA08D43","this.overlay_BF9FC753_AFF9_5176_41CC_55C1E2EB9BAE","this.Cap_B0C18EEA_BE44_46FB_41BC_57D510476160"],"data":{"label":"\u0646\u0642\u0640\u0640\u0640\u0637\u0640\u0640\u0629 1"},"class":"Panorama","cardboardMenu":"this.Menu_A53B86F4_AA95_232C_41E4_463AFB121ADA","thumbnailUrl":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_t.jpg","vfov":180},{"id":"MainViewerPanoramaPlayer","buttonToggleGyroscope":"this.IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916","touchControlMode":"drag_rotation","aaEnabled":true,"viewerArea":"this.MainViewer","buttonCardboardView":["this.IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5","this.IconButton_B8784122_AB9D_E124_41AE_4319268AB159","this.IconButton_BEDEF0BA_AB9C_FF24_41E2_547D17E39535"],"displayPlaybackBar":true,"mouseControlMode":"drag_rotation","class":"PanoramaPlayer","zoomEnabled":false,"arrowKeysAction":"translate"},{"minWidth":1,"id":"IconButton_BEDEF0BA_AB9C_FF24_41E2_547D17E39535","right":"0.94%","verticalAlign":"middle","iconURL":"skin/IconButton_B8784122_AB9D_E124_41AE_4319268AB159.png","data":{"name":"IconButton14318"},"propagateClick":false,"class":"IconButton","bottom":"0.99%","width":56,"backgroundOpacity":0,"height":56,"maxWidth":56,"maxHeight":56,"minHeight":1,"horizontalAlign":"center"},{"minWidth":1,"id":"IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86","verticalAlign":"middle","iconURL":"skin/IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86.png","data":{"name":"IconButton HS"},"class":"IconButton","mode":"toggle","pressedIconURL":"skin/IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86_pressed.png","pressedRollOverIconURL":"skin/IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86_pressed_rollover.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"maxWidth":58,"maxHeight":58,"click":"this.MainViewerPanoramaPlayer.set('hotspotsEnabled', !this.MainViewerPanoramaPlayer.get('hotspotsEnabled'))","minHeight":1,"horizontalAlign":"center"},{"id":"audio_9404E649_AB8B_E364_41E0_C63D25D0719C","autoplay":true,"class":"MediaAudio","data":{"label":"saudiAudio"},"audio":"this.audiores_EB947C13_AB8B_26E4_41D1_B4FF3BC3FFD3"},{"minWidth":1,"id":"Container_B80E2302_AB9B_22E4_41A4_8887E35DE617","right":"0%","verticalAlign":"middle","class":"Container","data":{"name":"button menu sup"},"layout":"horizontal","scrollBarColor":"#000000","top":"0%","width":110,"backgroundOpacity":0,"height":110,"gap":10,"children":["this.IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6"],"minHeight":1,"scrollBarMargin":2,"horizontalAlign":"center"},{"minWidth":1,"id":"IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6","verticalAlign":"middle","iconURL":"skin/IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6.png","data":{"name":"image button menu"},"class":"IconButton","mode":"toggle","pressedIconURL":"skin/IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6_pressed.png","pressedRollOverIconURL":"skin/IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6_pressed_rollover.png","transparencyActive":true,"width":60,"backgroundOpacity":0,"height":60,"maxWidth":60,"maxHeight":60,"click":"var visibleFunc = function(component) { this.setComponentVisibility(component, true, 0, null, 'showEffect', false)}.bind(this); var invisibleFunc = function(component) { this.setComponentVisibility(component, false, 0, null, 'hideEffect', false)}.bind(this); if(!this.Container_B80E0303_AB9B_22E4_413A_FC9089943162.get('visible')){ visibleFunc(this.Container_B80E0303_AB9B_22E4_413A_FC9089943162) } else { invisibleFunc(this.Container_B80E0303_AB9B_22E4_413A_FC9089943162) }","minHeight":1,"horizontalAlign":"center"},{"minWidth":1,"id":"IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916","verticalAlign":"middle","iconURL":"skin/IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916.png","data":{"name":"IconButton GYRO"},"class":"IconButton","mode":"toggle","pressedIconURL":"skin/IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916_pressed.png","pressedRollOverIconURL":"skin/IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916_pressed_rollover.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"maxWidth":58,"maxHeight":58,"minHeight":1,"horizontalAlign":"center"},{"id":"menuItem_BB06B93F_AFAB_512F_41D3_2FF7A58C4E4B","label":trans('menuItem_BB06B93F_AFAB_512F_41D3_2FF7A58C4E4B.label'),"click":"this.openLink(this.translate('LinkBehaviour_BA387120_AFA9_2ED2_41DD_50AE25499B07.source'), '_blank')","class":"PlayerMenuItem"},{"id":"MenuItem_B1023D71_BE4B_CBE8_41B7_30339AE6F83C","label":trans('MenuItem_B1023D71_BE4B_CBE8_41B7_30339AE6F83C.label'),"click":"this.setPlayListSelectedIndex(this.mainPlayList, 0)","class":"MenuItem"},{"id":"MenuItem_B1021D71_BE4B_CBE8_41DD_BE81F99B4BDB","label":trans('MenuItem_B1021D71_BE4B_CBE8_41DD_BE81F99B4BDB.label'),"click":"this.setPlayListSelectedIndex(this.mainPlayList, 1)","class":"MenuItem"},{"hasAudio":false,"id":"videores_B886F451_AAB5_2764_41D0_C05372C452FD","height":1080,"class":"VideoResource","levels":["this.videolevel_B16D0BD5_BE4B_CF28_41CB_F8E51F7F78E1"],"width":824},{"id":"sequence_A320C793_AFE9_51F6_41E3_5CE5054BDBB9","class":"PanoramaCameraSequence","movements":[{"easing":"cubic_in_out","pitchSpeed":15.92,"targetPitch":0,"class":"TargetPanoramaCameraMovement"},{"yawDelta":18.5,"easing":"cubic_in","class":"DistancePanoramaCameraMovement","yawSpeed":7.96},{"yawDelta":323,"class":"DistancePanoramaCameraMovement","yawSpeed":7.96},{"yawDelta":18.5,"easing":"cubic_out","class":"DistancePanoramaCameraMovement","yawSpeed":7.96}]},{"hasAudio":false,"id":"videores_B8C42948_AABD_2164_41CE_FC09B4184576","height":982,"class":"VideoResource","levels":["this.videolevel_B16CDBF7_BE4B_CEE8_41E3_76B6FDBC4A8A"],"width":750},{"id":"PanoramaPlayListItem_B1024D60_BE4B_CBE8_41D9_D6378DC74593","player":"this.MainViewerPanoramaPlayer","class":"PanoramaPlayListItem","camera":"this.panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_camera","media":"this.panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3","begin":"this.executeFunctionWhenChange(this.mainPlayList, 0, function(){;this.mainPlayList.set('selectedIndex', 1)}); "},{"id":"PanoramaPlayListItem_B1027D60_BE4B_CBE8_41DF_894D4140648E","player":"this.MainViewerPanoramaPlayer","class":"PanoramaPlayListItem","end":"this.trigger('tourEnded')","camera":"this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_camera","media":"this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB","begin":"this.executeFunctionWhenChange(this.mainPlayList, 1, function(){;this.mainPlayList.set('selectedIndex', 0)}); "},{"id":"sequence_A320A792_AFE9_51F6_41E0_8A2B03E4FEB7","class":"PanoramaCameraSequence","movements":[{"easing":"cubic_in_out","pitchSpeed":15.92,"targetPitch":0,"class":"TargetPanoramaCameraMovement"},{"yawDelta":18.5,"easing":"cubic_in","class":"DistancePanoramaCameraMovement","yawSpeed":7.96},{"yawDelta":323,"class":"DistancePanoramaCameraMovement","yawSpeed":7.96},{"yawDelta":18.5,"easing":"cubic_out","class":"DistancePanoramaCameraMovement","yawSpeed":7.96}]},{"id":"overlay_BF2980A7_AFFB_2FDE_41C0_2E97A64640C4","autoplay":true,"video":"this.videores_B8C42948_AABD_2164_41CE_FC09B4184576","vertices":[{"yaw":-8.64,"class":"PanoramaPoint","pitch":-5.21},{"yaw":21.04,"class":"PanoramaPoint","pitch":-5.2},{"yaw":27.25,"class":"PanoramaPoint","pitch":-44.71},{"yaw":-14.83,"class":"PanoramaPoint","pitch":-44.72}],"loop":true,"chromaSmoothing":0.21,"image":"this.res_B8F5E650_AABD_2364_41E1_F8C7C1CDE24D","chromaThreshold":0.09,"data":{"hasAudio":false,"label":"Video"},"class":"QuadVideoPanoramaOverlay","useHandCursor":true,"distance":50,"chromaColor":"#008020","cues":[]},{"id":"overlay_BF6BD11A_AFFB_6EF1_41C3_68C1D31248C8","class":"HotspotPanoramaOverlay","useHandCursor":true,"items":[{"distance":100,"pitch":-16.6,"class":"HotspotPanoramaOverlayImage","yaw":35.18,"image":"this.AnimatedImageResource_B107AC9C_BE4B_C958_41C5_6F00ABF9E310","hfov":10.5,"vfov":3.97,"data":{"label":"Arrow 03c"},"scaleMode":"fit_inside"}],"areas":["this.HotspotPanoramaOverlayArea_BF546120_AFFB_6ED1_41E1_EEFDFB181989"],"enabledInCardboard":true,"data":{"label":"Arrow 03c","hasPanoramaAction":true},"maps":[]},{"id":"panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_tcap0","hfov":99,"distance":50,"class":"TripodCapPanoramaOverlay","image":"this.res_B11C29E1_BE44_CAE8_41D1_18946857FABF"},{"id":"overlay_A041F06C_AFF9_EF52_41D5_3DCF9DA08D43","autoplay":true,"video":"this.videores_B8C42948_AABD_2164_41CE_FC09B4184576","vertices":[{"yaw":-8.64,"class":"PanoramaPoint","pitch":-5.21},{"yaw":21.04,"class":"PanoramaPoint","pitch":-5.2},{"yaw":27.25,"class":"PanoramaPoint","pitch":-44.71},{"yaw":-14.83,"class":"PanoramaPoint","pitch":-44.72}],"loop":true,"chromaSmoothing":0.21,"image":"this.res_B8F5E650_AABD_2364_41E1_F8C7C1CDE24D","chromaThreshold":0.09,"data":{"hasAudio":false,"label":"Video"},"class":"QuadVideoPanoramaOverlay","useHandCursor":true,"distance":50,"chromaColor":"#008020","cues":[]},{"id":"overlay_BF9FC753_AFF9_5176_41CC_55C1E2EB9BAE","class":"HotspotPanoramaOverlay","useHandCursor":true,"items":[{"distance":100,"pitch":-12.94,"class":"HotspotPanoramaOverlayImage","yaw":-1.47,"image":"this.AnimatedImageResource_B1781C9C_BE4B_C958_41AD_485791C949A0","hfov":10.5,"vfov":3.97,"data":{"label":"Arrow 03c"},"scaleMode":"fit_inside"}],"areas":["this.HotspotPanoramaOverlayArea_BFC4C779_AFF9_5132_41DE_3E7483D05A7D"],"enabledInCardboard":true,"data":{"label":"Arrow 03c","hasPanoramaAction":true},"maps":[]},{"id":"Cap_B0C18EEA_BE44_46FB_41BC_57D510476160","hfov":99,"distance":50,"class":"TripodCapPanoramaOverlay","image":"this.res_B11C29E1_BE44_CAE8_41D1_18946857FABF"},{"id":"audiores_EB947C13_AB8B_26E4_41D1_B4FF3BC3FFD3","mp3Url":trans('audiores_EB947C13_AB8B_26E4_41D1_B4FF3BC3FFD3.mp3Url'),"class":"AudioResource"},{"framerate":30,"id":"videolevel_B16D0BD5_BE4B_CF28_41CB_F8E51F7F78E1","height":1080,"codec":"h264","posterURL":trans('videolevel_B16D0BD5_BE4B_CF28_41CB_F8E51F7F78E1.posterURL'),"class":"VideoResourceLevel","type":"video/mp4","bitrate":610,"url":trans('videolevel_B16D0BD5_BE4B_CF28_41CB_F8E51F7F78E1.url'),"width":824},{"framerate":30,"id":"videolevel_B16CDBF7_BE4B_CEE8_41E3_76B6FDBC4A8A","height":982,"codec":"h264","posterURL":trans('videolevel_B16CDBF7_BE4B_CEE8_41E3_76B6FDBC4A8A.posterURL'),"class":"VideoResourceLevel","type":"video/mp4","bitrate":526,"url":trans('videolevel_B16CDBF7_BE4B_CEE8_41E3_76B6FDBC4A8A.url'),"width":750},{"id":"res_B8F5E650_AABD_2364_41E1_F8C7C1CDE24D","levels":[{"height":1080,"class":"ImageResourceLevel","url":"media/res_B8F5E650_AABD_2364_41E1_F8C7C1CDE24D_0.jpg","width":824}],"class":"ImageResource"},{"id":"AnimatedImageResource_B107AC9C_BE4B_C958_41C5_6F00ABF9E310","frameDuration":41,"rowCount":6,"class":"AnimatedImageResource","finalFrame":"first","levels":[{"height":420,"class":"ImageResourceLevel","url":"media/res_B3C95823_AB8D_2F24_41E4_E1FE0B22DCAF_0.png","width":925}],"colCount":5,"frameCount":30},{"id":"HotspotPanoramaOverlayArea_BF546120_AFFB_6ED1_41E1_EEFDFB181989","class":"HotspotPanoramaOverlayArea","click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.PanoramaPlayListItem_B1024D60_BE4B_CBE8_41D9_D6378DC74593, 0, 0, NaN || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 0)","displayTooltipInTouchScreens":true,"mapColor":"any"},{"id":"res_B11C29E1_BE44_CAE8_41D1_18946857FABF","levels":[{"height":843,"class":"ImageResourceLevel","url":"media/res_B11C29E1_BE44_CAE8_41D1_18946857FABF_0.png","width":843}],"class":"ImageResource"},{"id":"AnimatedImageResource_B1781C9C_BE4B_C958_41AD_485791C949A0","frameDuration":41,"rowCount":6,"class":"AnimatedImageResource","finalFrame":"first","levels":[{"height":420,"class":"ImageResourceLevel","url":"media/res_B3C95823_AB8D_2F24_41E4_E1FE0B22DCAF_0.png","width":925}],"colCount":5,"frameCount":30},{"id":"HotspotPanoramaOverlayArea_BFC4C779_AFF9_5132_41DE_3E7483D05A7D","class":"HotspotPanoramaOverlayArea","click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.PanoramaPlayListItem_B1027D60_BE4B_CBE8_41DF_894D4140648E, 0, 0, NaN || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 1)","displayTooltipInTouchScreens":true,"mapColor":"any"}],"width":"100%","height":"100%","gap":10,"minHeight":0,"buttonToggleFullscreen":"this.IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812","backgroundColorRatios":[0],"children":["this.MainViewer","this.Container_B80D8303_AB9B_22E4_41D1_4E9977A18321","this.IconButton_BEDEF0BA_AB9C_FF24_41E2_547D17E39535"],"scrollBarMargin":2,"scripts":{"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"registerKey":TDV.Tour.Script.registerKey,"getOverlays":TDV.Tour.Script.getOverlays,"getPixels":TDV.Tour.Script.getPixels,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"quizShowScore":TDV.Tour.Script.quizShowScore,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"unregisterKey":TDV.Tour.Script.unregisterKey,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"initQuiz":TDV.Tour.Script.initQuiz,"startMeasurement":TDV.Tour.Script.startMeasurement,"existsKey":TDV.Tour.Script.existsKey,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"quizFinish":TDV.Tour.Script.quizFinish,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"getComponentByName":TDV.Tour.Script.getComponentByName,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"getKey":TDV.Tour.Script.getKey,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"resumePlayers":TDV.Tour.Script.resumePlayers,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"textToSpeech":TDV.Tour.Script.textToSpeech,"init":TDV.Tour.Script.init,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"createTween":TDV.Tour.Script.createTween,"playAudioList":TDV.Tour.Script.playAudioList,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"translate":TDV.Tour.Script.translate,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"setLocale":TDV.Tour.Script.setLocale,"quizStart":TDV.Tour.Script.quizStart,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"cloneBindings":TDV.Tour.Script.cloneBindings,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"setMapLocation":TDV.Tour.Script.setMapLocation,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"isPanorama":TDV.Tour.Script.isPanorama,"clone":TDV.Tour.Script.clone,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"getMainViewer":TDV.Tour.Script.getMainViewer,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"setValue":TDV.Tour.Script.setValue,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"historyGoBack":TDV.Tour.Script.historyGoBack,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"shareSocial":TDV.Tour.Script.shareSocial,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"mixObject":TDV.Tour.Script.mixObject,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"getMediaByName":TDV.Tour.Script.getMediaByName,"downloadFile":TDV.Tour.Script.downloadFile,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"historyGoForward":TDV.Tour.Script.historyGoForward,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"executeJS":TDV.Tour.Script.executeJS,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"showPopupImage":TDV.Tour.Script.showPopupImage,"openLink":TDV.Tour.Script.openLink,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"showWindow":TDV.Tour.Script.showWindow,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"initAnalytics":TDV.Tour.Script.initAnalytics}};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs;
script['data']['createQuizConfig'] = function () {
    var ad = {};
    this['get']('data')['translateObjs'] = translateObjs;
    return ad;
};
TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device_v2023.2.4.js.map
})();
//Generated with v2023.2.4, Sun Dec 31 2023