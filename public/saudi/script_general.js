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
var script = {"id":"rootPlayer","minHeight":0,"backgroundColor":["#FFFFFF"],"vrPolyfillScale":1,"start":"this.playAudioList([this.audio_9404E649_AB8B_E364_41E0_C63D25D0719C], true); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B8784122_AB9D_E124_41AE_4319268AB159,this.IconButton_BEDEF0BA_AB9C_FF24_41E2_547D17E39535], 'cardboardAvailable'); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916], 'gyroscopeAvailable'); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); this.syncPlaylists([this.mainPlayList,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }; this.restartTourWithoutInteraction(600)","data":{"history":{},"locales":{"en":"locale/en.txt"},"textToSpeechConfig":{"speechOnTooltip":false,"speechOnInfoWindow":false,"volume":1,"rate":1,"speechOnQuizQuestion":false,"pitch":1,"stopBackgroundAudio":false},"name":"Player6915","defaultLocale":"en"},"defaultVRPointer":"gaze","propagateClick":false,"buttonToggleMute":"this.IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF","scrollBarColor":"#000000","hash": "9178603fee20e19d2b2508d7f537eaa96ac86ec35d640ec589b693641046424e", "definitions": [{"id":"Menu_A53B86F4_AA95_232C_41E4_463AFB121ADA","selectedFontColor":"#FFFFFF","label":trans('Menu_A53B86F4_AA95_232C_41E4_463AFB121ADA.label'),"fontFamily":"Arial","distance":2,"selectedBackgroundColor":"#202020","rollOverOpacity":0.8,"rollOverFontColor":"#FFFFFF","backgroundColor":"#404040","opacity":0.4,"children":["this.MenuItem_BC251675_AFA6_D332_41E4_F2EE4BCA2B3B","this.MenuItem_BC256675_AFA6_D332_41C6_3153054B0BAC"],"fontColor":"#FFFFFF","class":"Menu","rollOverBackgroundColor":"#000000"},{"id":"IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF.png","data":{"name":"IconButton MUTE"},"mode":"toggle","pressedIconURL":"skin/IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF_pressed.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"class":"IconButton","pressedRollOverIconURL":"skin/IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF_pressed_rollover.png","maxWidth":58,"horizontalAlign":"center","maxHeight":58,"minWidth":1},{"id":"video_B8FC9C32_AAB7_2724_41A6_57CF61E83BD6","label":trans('video_B8FC9C32_AAB7_2724_41A6_57CF61E83BD6.label'),"video":"this.videores_B886F451_AAB5_2764_41D0_C05372C452FD","width":824,"chromaSmoothing":0.15,"height":1080,"chromaThreshold":0.08,"data":{"label":"pano_01_1 - Panorama (VR2 Edit 2)"},"class":"Video","chromaColor":"#099423","thumbnailUrl":"media/video_B8FC9C32_AAB7_2724_41A6_57CF61E83BD6_t.jpg"},{"id":"IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6.png","data":{"name":"image button menu"},"mode":"toggle","pressedIconURL":"skin/IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6_pressed.png","transparencyActive":true,"width":60,"backgroundOpacity":0,"height":60,"class":"IconButton","pressedRollOverIconURL":"skin/IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6_pressed_rollover.png","click":"var visibleFunc = function(component) { this.setComponentVisibility(component, true, 0, null, 'showEffect', false)}.bind(this); var invisibleFunc = function(component) { this.setComponentVisibility(component, false, 0, null, 'hideEffect', false)}.bind(this); if(!this.Container_B80E0303_AB9B_22E4_413A_FC9089943162.get('visible')){ visibleFunc(this.Container_B80E0303_AB9B_22E4_413A_FC9089943162) } else { invisibleFunc(this.Container_B80E0303_AB9B_22E4_413A_FC9089943162) }","maxWidth":60,"horizontalAlign":"center","maxHeight":60,"minWidth":1},{"id":"IconButton_B80DA303_AB9B_22E4_41E0_CA72CE60548B","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B80DA303_AB9B_22E4_41E0_CA72CE60548B.png","data":{"name":"IconButton TWITTER"},"rollOverIconURL":"skin/IconButton_B80DA303_AB9B_22E4_41E0_CA72CE60548B_rollover.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"class":"IconButton","click":"this.shareSocial('twitter', undefined, false, {\"includeCurrentMeasureModel3DObjects\":false,\"includeCurrentVisibleHotspots\":false,\"includeCurrentView\":false}, undefined)","maxWidth":58,"horizontalAlign":"center","maxHeight":58,"minWidth":1},{"id":"IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812.png","data":{"name":"IconButton FULLSCREEN"},"mode":"toggle","pressedIconURL":"skin/IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812_pressed.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"class":"IconButton","pressedRollOverIconURL":"skin/IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812_pressed_rollover.png","maxWidth":58,"horizontalAlign":"center","maxHeight":58,"minWidth":1},{"id":"IconButton_B80DB303_AB9B_22E4_41C7_309008370D33","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B80DB303_AB9B_22E4_41C7_309008370D33.png","data":{"name":"IconButton FB"},"rollOverIconURL":"skin/IconButton_B80DB303_AB9B_22E4_41C7_309008370D33_rollover.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"class":"IconButton","click":"this.shareSocial('facebook', undefined, false, {\"includeCurrentMeasureModel3DObjects\":false,\"includeCurrentVisibleHotspots\":false,\"includeCurrentView\":false}, undefined)","maxWidth":58,"horizontalAlign":"center","maxHeight":58,"minWidth":1},{"id":"audio_9404E649_AB8B_E364_41E0_C63D25D0719C","autoplay":true,"data":{"label":"saudiAudio"},"class":"MediaAudio","audio":"this.audiores_EB947C13_AB8B_26E4_41D1_B4FF3BC3FFD3"},{"id":"panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_camera","timeToIdle":14000,"idleSequence":"this.sequence_A320C793_AFE9_51F6_41E3_5CE5054BDBB9","initialPosition":{"yaw":0,"class":"PanoramaCameraPosition","pitch":0},"enterPointingToHorizon":true,"initialSequence":"this.sequence_A320C793_AFE9_51F6_41E3_5CE5054BDBB9","class":"PanoramaCamera"},{"id":"panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_camera","timeToIdle":14000,"idleSequence":"this.sequence_A320A792_AFE9_51F6_41E0_8A2B03E4FEB7","initialPosition":{"yaw":0,"class":"PanoramaCameraPosition","pitch":0},"enterPointingToHorizon":true,"initialSequence":"this.sequence_A320A792_AFE9_51F6_41E0_8A2B03E4FEB7","class":"PanoramaCamera"},{"id":"IconButton_B8784122_AB9D_E124_41AE_4319268AB159","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B8784122_AB9D_E124_41AE_4319268AB159.png","data":{"name":"IconButton14318"},"propagateClick":false,"width":56,"backgroundOpacity":0,"height":56,"class":"IconButton","maxWidth":56,"horizontalAlign":"center","maxHeight":56,"minWidth":1},{"id":"IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5.png","data":{"name":"IconButton VR"},"rollOverIconURL":"skin/IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5_rollover.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"class":"IconButton","visible":false,"maxWidth":58,"horizontalAlign":"center","maxHeight":58,"minWidth":1},{"id":"IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916.png","data":{"name":"IconButton GYRO"},"mode":"toggle","pressedIconURL":"skin/IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916_pressed.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"class":"IconButton","pressedRollOverIconURL":"skin/IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916_pressed_rollover.png","maxWidth":58,"horizontalAlign":"center","maxHeight":58,"minWidth":1},{"id":"Container_B80D8303_AB9B_22E4_41D1_4E9977A18321","minHeight":1,"right":"0%","overflow":"scroll","data":{"name":"--SETTINGS"},"top":"0%","scrollBarColor":"#000000","width":115.05,"backgroundOpacity":0,"height":641,"class":"Container","gap":10,"children":["this.Container_B80E2302_AB9B_22E4_41A4_8887E35DE617","this.Container_B80E0303_AB9B_22E4_413A_FC9089943162"],"layout":"absolute","scrollBarMargin":2,"minWidth":1},{"id":"panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3","label":trans('panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3.label'),"hfov":360,"hfovMax":130,"adjacentPanoramas":[{"yaw":-1.47,"data":{"overlayID":"overlay_BF9FC753_AFF9_5176_41CC_55C1E2EB9BAE"},"distance":7.39,"panorama":"this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB","class":"AdjacentPanorama","select":"this.overlay_BF9FC753_AFF9_5176_41CC_55C1E2EB9BAE.get('areas').forEach(function(a){ a.trigger('click') })"}],"overlays":["this.overlay_A041F06C_AFF9_EF52_41D5_3DCF9DA08D43","this.overlay_BF9FC753_AFF9_5176_41CC_55C1E2EB9BAE","this.panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_tcap0","this.panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_ccap0"],"frames":[{"cube":{"class":"ImageResource","levels":[{"height":5632,"rowCount":11,"colCount":66,"tags":"ondemand","url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/0/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":33792},{"height":3072,"rowCount":6,"colCount":36,"tags":"ondemand","url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/1/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":18432},{"height":1536,"rowCount":3,"colCount":18,"tags":"ondemand","url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/2/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":9216},{"height":1024,"rowCount":2,"colCount":12,"tags":"ondemand","url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/3/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":6144},{"height":512,"rowCount":1,"colCount":6,"tags":["ondemand","preload"],"url":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_0/{face}/4/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":3072}]},"thumbnailUrl":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_t.jpg","class":"CubicPanoramaFrame"}],"data":{"label":"\u0646\u0642\u0640\u0640\u0640\u0637\u0640\u0640\u0629 1"},"class":"Panorama","cardboardMenu":"this.Menu_A53B86F4_AA95_232C_41E4_463AFB121ADA","thumbnailUrl":"media/panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_t.jpg","vfov":180},{"id":"Container_B80E2302_AB9B_22E4_41A4_8887E35DE617","minHeight":1,"verticalAlign":"middle","right":"0%","data":{"name":"button menu sup"},"top":"0%","scrollBarColor":"#000000","width":110,"backgroundOpacity":0,"height":110,"class":"Container","gap":10,"children":["this.IconButton_B80E3303_AB9B_22E4_41C8_49D5A1B375C6"],"horizontalAlign":"center","layout":"horizontal","scrollBarMargin":2,"minWidth":1},{"id":"MainViewer","playbackBarProgressBorderSize":0,"subtitlesBottom":50,"progressBackgroundColor":["#000000"],"progressBottom":10,"playbackBarBackgroundColorDirection":"vertical","data":{"name":"Main Viewer"},"toolTipFontSize":"1.11vmin","surfaceReticleColor":"#FFFFFF","playbackBarHeadShadowBlurRadius":3,"propagateClick":false,"playbackBarRight":0,"progressHeight":2,"toolTipFontFamily":"Arial","toolTipTextShadowColor":"#000000","subtitlesTextShadowVerticalLength":1,"progressBorderSize":0,"playbackBarProgressBorderRadius":0,"progressBarBorderRadius":2,"playbackBarProgressBackgroundColor":["#3399FF"],"subtitlesFontColor":"#FFFFFF","progressBarBorderSize":0,"playbackBarLeft":0,"playbackBarHeadHeight":15,"vrPointerColor":"#FFFFFF","playbackBarHeadShadowOpacity":0.7,"playbackBarHeadShadowColor":"#000000","subtitlesTextShadowColor":"#000000","subtitlesGap":0,"progressBackgroundColorRatios":[0],"playbackBarHeadBackgroundColorRatios":[0,1],"class":"ViewerArea","toolTipShadowColor":"#333138","width":"100%","progressRight":"33%","subtitlesBackgroundColor":"#000000","toolTipBorderColor":"#767676","playbackBarHeadBorderSize":0,"progressOpacity":0.7,"playbackBarProgressBackgroundColorRatios":[0],"subtitlesFontSize":"3vmin","minHeight":50,"progressBarBackgroundColorRatios":[0],"progressBarBorderColor":"#000000","playbackBarHeadShadow":true,"playbackBarBorderRadius":0,"progressBarBackgroundColorDirection":"horizontal","playbackBarBorderColor":"#FFFFFF","minWidth":100,"playbackBarProgressBorderColor":"#000000","toolTipPaddingRight":6,"playbackBarHeadBackgroundColor":["#111111","#666666"],"progressBorderRadius":2,"toolTipBackgroundColor":"#F6F6F6","playbackBarBottom":5,"toolTipFontColor":"#606060","vrPointerSelectionTime":2000,"playbackBarHeadBorderRadius":0,"height":"100%","toolTipPaddingTop":4,"vrPointerSelectionColor":"#FF6600","progressBorderColor":"#000000","progressLeft":"33%","toolTipPaddingLeft":6,"subtitlesBorderColor":"#FFFFFF","subtitlesTextShadowHorizontalLength":1,"playbackBarHeadBorderColor":"#000000","playbackBarBackgroundOpacity":1,"playbackBarBackgroundColor":["#FFFFFF"],"firstTransitionDuration":0,"playbackBarBorderSize":0,"playbackBarHeight":10,"subtitlesTop":0,"subtitlesBackgroundOpacity":0.2,"progressBarBackgroundColor":["#3399FF"],"subtitlesTextShadowOpacity":1,"toolTipPaddingBottom":4,"surfaceReticleSelectionColor":"#FFFFFF","playbackBarHeadWidth":6,"subtitlesFontFamily":"Arial"},{"id":"Container_B80E0303_AB9B_22E4_413A_FC9089943162","minHeight":1,"right":"0%","overflow":"scroll","data":{"name":"-button set"},"scrollBarColor":"#000000","bottom":"0%","width":"91.304%","backgroundOpacity":0,"height":"85.959%","class":"Container","visible":false,"gap":3,"children":["this.IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5","this.IconButton_B8784122_AB9D_E124_41AE_4319268AB159","this.IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916","this.IconButton_B80E7303_AB9B_22E4_41C9_C240229E8BCF","this.IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86","this.IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812","this.IconButton_B80DA303_AB9B_22E4_41E0_CA72CE60548B","this.IconButton_B80DB303_AB9B_22E4_41C7_309008370D33"],"horizontalAlign":"center","layout":"vertical","scrollBarMargin":2,"minWidth":1},{"id":"IconButton_BEDEF0BA_AB9C_FF24_41E2_547D17E39535","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B8784122_AB9D_E124_41AE_4319268AB159.png","right":"0.94%","data":{"name":"IconButton14318"},"propagateClick":false,"bottom":"0.99%","width":56,"backgroundOpacity":0,"height":56,"class":"IconButton","maxWidth":56,"horizontalAlign":"center","maxHeight":56,"minWidth":1},{"id":"mainPlayList","class":"PlayList","items":["this.PanoramaPlayListItem_BC22B665_AFA6_D353_41C9_2AF13257800C","this.PanoramaPlayListItem_BC229665_AFA6_D353_41C4_014357F1900E"]},{"id":"IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86","minHeight":1,"verticalAlign":"middle","iconURL":"skin/IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86.png","data":{"name":"IconButton HS"},"mode":"toggle","pressedIconURL":"skin/IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86_pressed.png","transparencyActive":true,"width":58,"backgroundOpacity":0,"height":58,"class":"IconButton","pressedRollOverIconURL":"skin/IconButton_B80E4303_AB9B_22E4_419E_B8F5A9198D86_pressed_rollover.png","click":"this.MainViewerPanoramaPlayer.set('hotspotsEnabled', !this.MainViewerPanoramaPlayer.get('hotspotsEnabled'))","maxWidth":58,"horizontalAlign":"center","maxHeight":58,"minWidth":1},{"id":"video_B9F1D367_AABD_E12D_41D6_C11BBB4D34CA","label":trans('video_B9F1D367_AABD_E12D_41D6_C11BBB4D34CA.label'),"video":"this.videores_B8C42948_AABD_2164_41CE_FC09B4184576","width":824,"chromaSmoothing":0.21,"height":1080,"chromaThreshold":0.09,"data":{"label":"horse"},"class":"Video","chromaColor":"#008020","thumbnailUrl":"media/video_B9F1D367_AABD_E12D_41D6_C11BBB4D34CA_t.jpg"},{"id":"panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB","label":trans('panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB.label'),"hfov":360,"hfovMax":130,"adjacentPanoramas":[{"yaw":35.18,"data":{"overlayID":"overlay_BF6BD11A_AFFB_6EF1_41C3_68C1D31248C8"},"distance":5.7,"panorama":"this.panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3","class":"AdjacentPanorama","select":"this.overlay_BF6BD11A_AFFB_6EF1_41C3_68C1D31248C8.get('areas').forEach(function(a){ a.trigger('click') })"}],"overlays":["this.overlay_BF2980A7_AFFB_2FDE_41C0_2E97A64640C4","this.overlay_BF6BD11A_AFFB_6EF1_41C3_68C1D31248C8","this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_tcap0","this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_ccap0"],"frames":[{"cube":{"class":"ImageResource","levels":[{"height":5632,"rowCount":11,"colCount":66,"tags":"ondemand","url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/0/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":33792},{"height":3072,"rowCount":6,"colCount":36,"tags":"ondemand","url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/1/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":18432},{"height":1536,"rowCount":3,"colCount":18,"tags":"ondemand","url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/2/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":9216},{"height":1024,"rowCount":2,"colCount":12,"tags":"ondemand","url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/3/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":6144},{"height":512,"rowCount":1,"colCount":6,"tags":["ondemand","preload"],"url":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_0/{face}/4/{row}_{column}.jpg","class":"TiledImageResourceLevel","width":3072}]},"thumbnailUrl":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_t.jpg","class":"CubicPanoramaFrame"}],"data":{"label":"\u0646\u0642\u0640\u0640\u0640\u0637\u0640\u0640\u0629 2"},"class":"Panorama","cardboardMenu":"this.Menu_A53B86F4_AA95_232C_41E4_463AFB121ADA","thumbnailUrl":"media/panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_t.jpg","vfov":180},{"id":"MainViewerPanoramaPlayer","buttonToggleGyroscope":"this.IconButton_B80E6303_AB9B_22E4_41C5_CAE499770916","touchControlMode":"drag_rotation","aaEnabled":true,"viewerArea":"this.MainViewer","buttonCardboardView":["this.IconButton_B80E1303_AB9B_22E4_41C1_7A9D009121B5","this.IconButton_B8784122_AB9D_E124_41AE_4319268AB159","this.IconButton_BEDEF0BA_AB9C_FF24_41E2_547D17E39535"],"mouseControlMode":"drag_rotation","displayPlaybackBar":true,"zoomEnabled":false,"arrowKeysAction":"translate","class":"PanoramaPlayer"},{"id":"menuItem_BB06B93F_AFAB_512F_41D3_2FF7A58C4E4B","class":"PlayerMenuItem","label":trans('menuItem_BB06B93F_AFAB_512F_41D3_2FF7A58C4E4B.label'),"click":"this.openLink(this.translate('LinkBehaviour_BA387120_AFA9_2ED2_41DD_50AE25499B07.source'), '_blank')"},{"id":"MenuItem_BC251675_AFA6_D332_41E4_F2EE4BCA2B3B","class":"MenuItem","label":trans('MenuItem_BC251675_AFA6_D332_41E4_F2EE4BCA2B3B.label'),"click":"this.setPlayListSelectedIndex(this.mainPlayList, 0)"},{"id":"MenuItem_BC256675_AFA6_D332_41C6_3153054B0BAC","class":"MenuItem","label":trans('MenuItem_BC256675_AFA6_D332_41C6_3153054B0BAC.label'),"click":"this.setPlayListSelectedIndex(this.mainPlayList, 1)"},{"hasAudio":false,"id":"videores_B886F451_AAB5_2764_41D0_C05372C452FD","height":1080,"levels":["this.videolevel_BC1C34FA_AFA6_D736_41DF_785FED5EB442"],"class":"VideoResource","width":824},{"id":"audiores_EB947C13_AB8B_26E4_41D1_B4FF3BC3FFD3","mp3Url":trans('audiores_EB947C13_AB8B_26E4_41D1_B4FF3BC3FFD3.mp3Url'),"class":"AudioResource"},{"id":"sequence_A320C793_AFE9_51F6_41E3_5CE5054BDBB9","movements":[{"easing":"cubic_in_out","targetPitch":0,"class":"TargetPanoramaCameraMovement","pitchSpeed":15.92},{"yawDelta":18.5,"easing":"cubic_in","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":323,"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":18.5,"easing":"cubic_out","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"}],"class":"PanoramaCameraSequence"},{"id":"sequence_A320A792_AFE9_51F6_41E0_8A2B03E4FEB7","movements":[{"easing":"cubic_in_out","targetPitch":0,"class":"TargetPanoramaCameraMovement","pitchSpeed":15.92},{"yawDelta":18.5,"easing":"cubic_in","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":323,"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":18.5,"easing":"cubic_out","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"}],"class":"PanoramaCameraSequence"},{"id":"overlay_A041F06C_AFF9_EF52_41D5_3DCF9DA08D43","autoplay":true,"video":"this.videores_B8C42948_AABD_2164_41CE_FC09B4184576","vertices":[{"yaw":-8.64,"class":"PanoramaPoint","pitch":-5.21},{"yaw":21.04,"class":"PanoramaPoint","pitch":-5.2},{"yaw":27.25,"class":"PanoramaPoint","pitch":-44.71},{"yaw":-14.83,"class":"PanoramaPoint","pitch":-44.72}],"data":{"hasAudio":false,"label":"Video"},"chromaSmoothing":0.21,"image":"this.res_B8F5E650_AABD_2364_41E1_F8C7C1CDE24D","loop":true,"class":"QuadVideoPanoramaOverlay","distance":50,"useHandCursor":true,"chromaThreshold":0.09,"chromaColor":"#008020","cues":[]},{"id":"overlay_BF9FC753_AFF9_5176_41CC_55C1E2EB9BAE","useHandCursor":true,"data":{"hasPanoramaAction":true,"label":"Arrow 03c"},"areas":["this.HotspotPanoramaOverlayArea_BFC4C779_AFF9_5132_41DE_3E7483D05A7D"],"enabledInCardboard":true,"items":[{"distance":100,"scaleMode":"fit_inside","hfov":10.5,"yaw":-1.47,"image":"this.AnimatedImageResource_BC26D59F_AFA6_D1EE_41CB_51BFC46BFC73","vfov":3.97,"class":"HotspotPanoramaOverlayImage","data":{"label":"Arrow 03c"},"pitch":-12.94}],"maps":[],"class":"HotspotPanoramaOverlay"},{"id":"panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_tcap0","class":"TripodCapPanoramaOverlay","hfov":99,"distance":50,"image":"this.res_BA5AE870_AFA9_5F32_41D3_5834ECFEDB95"},{"id":"panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_ccap0","class":"CeilingCapPanoramaOverlay","hfov":99,"distance":50,"angle":180,"image":"this.res_BA5AE870_AFA9_5F32_41D3_5834ECFEDB95"},{"id":"PanoramaPlayListItem_BC22B665_AFA6_D353_41C9_2AF13257800C","player":"this.MainViewerPanoramaPlayer","camera":"this.panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3_camera","media":"this.panorama_A23F5503_AFE9_D6D6_41E2_47951D622EB3","class":"PanoramaPlayListItem","begin":"this.executeFunctionWhenChange(this.mainPlayList, 0, function(){;this.mainPlayList.set('selectedIndex', 1)}); "},{"id":"PanoramaPlayListItem_BC229665_AFA6_D353_41C4_014357F1900E","player":"this.MainViewerPanoramaPlayer","end":"this.trigger('tourEnded')","camera":"this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_camera","media":"this.panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB","class":"PanoramaPlayListItem","begin":"this.executeFunctionWhenChange(this.mainPlayList, 1, function(){;this.mainPlayList.set('selectedIndex', 0)}); "},{"hasAudio":false,"id":"videores_B8C42948_AABD_2164_41CE_FC09B4184576","height":982,"levels":["this.videolevel_BC1C250F_AFA6_D6EE_41E2_86072A4E923C"],"class":"VideoResource","width":750},{"id":"overlay_BF2980A7_AFFB_2FDE_41C0_2E97A64640C4","autoplay":true,"video":"this.videores_B8C42948_AABD_2164_41CE_FC09B4184576","vertices":[{"yaw":-8.64,"class":"PanoramaPoint","pitch":-5.21},{"yaw":21.04,"class":"PanoramaPoint","pitch":-5.2},{"yaw":27.25,"class":"PanoramaPoint","pitch":-44.71},{"yaw":-14.83,"class":"PanoramaPoint","pitch":-44.72}],"data":{"hasAudio":false,"label":"Video"},"chromaSmoothing":0.21,"image":"this.res_B8F5E650_AABD_2364_41E1_F8C7C1CDE24D","loop":true,"class":"QuadVideoPanoramaOverlay","distance":50,"useHandCursor":true,"chromaThreshold":0.09,"chromaColor":"#008020","cues":[]},{"id":"overlay_BF6BD11A_AFFB_6EF1_41C3_68C1D31248C8","useHandCursor":true,"data":{"hasPanoramaAction":true,"label":"Arrow 03c"},"areas":["this.HotspotPanoramaOverlayArea_BF546120_AFFB_6ED1_41E1_EEFDFB181989"],"enabledInCardboard":true,"items":[{"distance":100,"scaleMode":"fit_inside","hfov":10.5,"yaw":35.18,"image":"this.AnimatedImageResource_BC26559F_AFA6_D1EE_41C0_E1A7C20E2BF1","vfov":3.97,"class":"HotspotPanoramaOverlayImage","data":{"label":"Arrow 03c"},"pitch":-16.6}],"maps":[],"class":"HotspotPanoramaOverlay"},{"id":"panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_tcap0","class":"TripodCapPanoramaOverlay","hfov":99,"distance":50,"image":"this.res_BA5AE870_AFA9_5F32_41D3_5834ECFEDB95"},{"id":"panorama_A321F63F_AFE9_332E_41BA_6A82C15A06EB_ccap0","class":"CeilingCapPanoramaOverlay","hfov":99,"distance":50,"angle":180,"image":"this.res_BA5AE870_AFA9_5F32_41D3_5834ECFEDB95"},{"id":"videolevel_BC1C34FA_AFA6_D736_41DF_785FED5EB442","height":1080,"codec":"h264","posterURL":trans('videolevel_BC1C34FA_AFA6_D736_41DF_785FED5EB442.posterURL'),"framerate":30,"type":"video/mp4","bitrate":610,"url":trans('videolevel_BC1C34FA_AFA6_D736_41DF_785FED5EB442.url'),"class":"VideoResourceLevel","width":824},{"id":"res_B8F5E650_AABD_2364_41E1_F8C7C1CDE24D","class":"ImageResource","levels":[{"height":1080,"url":"media/res_B8F5E650_AABD_2364_41E1_F8C7C1CDE24D_0.jpg","class":"ImageResourceLevel","width":824}]},{"id":"HotspotPanoramaOverlayArea_BFC4C779_AFF9_5132_41DE_3E7483D05A7D","displayTooltipInTouchScreens":true,"class":"HotspotPanoramaOverlayArea","click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.PanoramaPlayListItem_BC229665_AFA6_D353_41C4_014357F1900E, 0, 0, NaN || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 1)","mapColor":"any"},{"id":"AnimatedImageResource_BC26D59F_AFA6_D1EE_41CB_51BFC46BFC73","frameDuration":41,"rowCount":6,"levels":[{"height":420,"url":"media/res_B3C95823_AB8D_2F24_41E4_E1FE0B22DCAF_0.png","class":"ImageResourceLevel","width":925}],"finalFrame":"first","frameCount":30,"colCount":5,"class":"AnimatedImageResource"},{"id":"res_BA5AE870_AFA9_5F32_41D3_5834ECFEDB95","class":"ImageResource","levels":[{"height":1024,"url":"media/res_BA5AE870_AFA9_5F32_41D3_5834ECFEDB95_0.png","class":"ImageResourceLevel","width":1024}]},{"id":"videolevel_BC1C250F_AFA6_D6EE_41E2_86072A4E923C","height":982,"codec":"h264","posterURL":trans('videolevel_BC1C250F_AFA6_D6EE_41E2_86072A4E923C.posterURL'),"framerate":30,"type":"video/mp4","bitrate":526,"url":trans('videolevel_BC1C250F_AFA6_D6EE_41E2_86072A4E923C.url'),"class":"VideoResourceLevel","width":750},{"id":"HotspotPanoramaOverlayArea_BF546120_AFFB_6ED1_41E1_EEFDFB181989","displayTooltipInTouchScreens":true,"class":"HotspotPanoramaOverlayArea","click":"this.setPanoramaCameraWithSpot(this.mainPlayList, this.PanoramaPlayListItem_BC22B665_AFA6_D353_41C9_2AF13257800C, 0, 0, NaN || TDV.Player.DEFAULT_PANORAMA_HFOV); this.setPlayListSelectedIndex(this.mainPlayList, 0)","mapColor":"any"},{"id":"AnimatedImageResource_BC26559F_AFA6_D1EE_41C0_E1A7C20E2BF1","frameDuration":41,"rowCount":6,"levels":[{"height":420,"url":"media/res_B3C95823_AB8D_2F24_41E4_E1FE0B22DCAF_0.png","class":"ImageResourceLevel","width":925}],"finalFrame":"first","frameCount":30,"colCount":5,"class":"AnimatedImageResource"}],"menu":["this.menuItem_BB06B93F_AFAB_512F_41D3_2FF7A58C4E4B"],"buttonToggleFullscreen":"this.IconButton_B80E5303_AB9B_22E4_41CE_072D4633D812","width":"100%","height":"100%","class":"Player","watermark":false,"gap":10,"backgroundColorRatios":[0],"layout":"absolute","children":["this.MainViewer","this.Container_B80D8303_AB9B_22E4_41D1_4E9977A18321","this.IconButton_BEDEF0BA_AB9C_FF24_41E2_547D17E39535"],"scrollBarMargin":2,"defaultMenu":[],"scripts":{"historyGoBack":TDV.Tour.Script.historyGoBack,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"downloadFile":TDV.Tour.Script.downloadFile,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"textToSpeech":TDV.Tour.Script.textToSpeech,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"setMapLocation":TDV.Tour.Script.setMapLocation,"getOverlays":TDV.Tour.Script.getOverlays,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"shareSocial":TDV.Tour.Script.shareSocial,"getKey":TDV.Tour.Script.getKey,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"initAnalytics":TDV.Tour.Script.initAnalytics,"getComponentByName":TDV.Tour.Script.getComponentByName,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"playAudioList":TDV.Tour.Script.playAudioList,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"resumePlayers":TDV.Tour.Script.resumePlayers,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"init":TDV.Tour.Script.init,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"createTween":TDV.Tour.Script.createTween,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"translate":TDV.Tour.Script.translate,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"isPanorama":TDV.Tour.Script.isPanorama,"registerKey":TDV.Tour.Script.registerKey,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"showPopupImage":TDV.Tour.Script.showPopupImage,"setLocale":TDV.Tour.Script.setLocale,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"clone":TDV.Tour.Script.clone,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"unregisterKey":TDV.Tour.Script.unregisterKey,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"existsKey":TDV.Tour.Script.existsKey,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"cloneBindings":TDV.Tour.Script.cloneBindings,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"quizShowScore":TDV.Tour.Script.quizShowScore,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"historyGoForward":TDV.Tour.Script.historyGoForward,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"getMainViewer":TDV.Tour.Script.getMainViewer,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"quizStart":TDV.Tour.Script.quizStart,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"mixObject":TDV.Tour.Script.mixObject,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"setValue":TDV.Tour.Script.setValue,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"quizFinish":TDV.Tour.Script.quizFinish,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"getMediaByName":TDV.Tour.Script.getMediaByName,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"openLink":TDV.Tour.Script.openLink,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"startMeasurement":TDV.Tour.Script.startMeasurement,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"executeJS":TDV.Tour.Script.executeJS,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"initQuiz":TDV.Tour.Script.initQuiz,"showWindow":TDV.Tour.Script.showWindow,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"getPixels":TDV.Tour.Script.getPixels,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF},"minWidth":0};
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
//Generated with v2023.2.4, Thu Dec 28 2023