CQ_Analytics.registerAfterCallback(function (options) {
    if (!options.compatibility && $CQ.inArray(options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0)
        return false;    // component not in framework, skip SC callback
    CQ_Analytics.Sitecatalyst.saveEvars();
    CQ_Analytics.Sitecatalyst.updateEvars(options);
    CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
    return false;
}, 10);

CQ_Analytics.registerAfterCallback(function (options) {
    if (!options.compatibility && $CQ.inArray(options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0)
        return false;    // component not in framework, skip SC callback
    s = s_gi("viagenssubmarino");
    if (s.linkTrackVars == "None") {
        s.linkTrackVars = "events";
    } else {
        s.linkTrackVars = s.linkTrackVars + ",events";
    }
    CQ_Analytics.Sitecatalyst.trackLink(options);
    return false;
}, 100);


CQ_Analytics.registerAfterCallback(function (options) {
    if (!options.compatibility && $CQ.inArray(options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0)
        return false;    // component not in framework, skip SC callback
    CQ_Analytics.Sitecatalyst.restoreEvars();
    return false;
}, 200);

CQ_Analytics.adhocLinkTracking = "false";


var s_account = "viagenssubmarino";
var s = s_gi(s_account);
s.fpCookieDomainPeriods = "3";
s.currencyCode = 'BRL';
s.trackInlineStats = true;
s.linkTrackVars = 'None';
s.charSet = 'UTF-8';
s.linkLeaveQueryString = false;
s.linkExternalFilters = '';
s.linkTrackEvents = 'None';
s.trackExternalLinks = true;
s.linkDownloadFileTypes = 'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
s.linkInternalFilters = 'javascript:,' + window.location.hostname;
s.trackDownloadLinks = true;

s.visitorNamespace = "b2wviagens";
s.trackingServer = "b2wviagens.122.2o7.net";
s.trackingServerSecure = "b2wviagens.122.2o7.net";

var campaignTmp = "";
var campaignIntTmp = "";
var s_first_doPlugins = true;

//CTQ variable para bounce rate de campanha mida display
var i = 1;

s.usePlugins = true;
function s_doPlugins(s) {
    /* Add usage of plugins here */
    if (s_first_doPlugins) {
        s_first_doPlugins = s.pageName ? false : true;

        //Todos os indices do array devem estar somados em 1 no ambiente do content finder. Numeros original(5-5-4-4-4-5-4-4)

        if (typeof s.pageName == 'string') {
            var aux_arr = s.pageName.split('/');
            console.log('pageName => ' + s.pageName);
            s.prop39 = s.eVar39 = s.channel;
            s.pageName = s.channel + ':';
            if (aux_arr.length < 6) {
                s.pageName += "home";
            } else if (aux_arr.length == 6) {
                s.pageName += aux_arr[5];
                if (aux_arr[4] == 'error-pages') {
                    s.pageType = 'errorPage';
                }
                s.prop40 = s.eVar40 = s.pageName;
            } else if (aux_arr[5] == 'institucional' || aux_arr[5] == 'siteunder') {
                s.pageName += aux_arr[5];
                s.prop40 = s.eVar40 = s.pageName;
                s.pageName += ':' + aux_arr[aux_arr.length - 1];
                s.prop41 = s.eVar41 = s.pageName;
            } else {
                s.pageName += aux_arr[6].replace(/[-_]/gi, '');
                s.prop40 = s.eVar40 = s.pageName;
                if (aux_arr[5] != 'nome-de-hoteis') {
                    var lastname = aux_arr[aux_arr.length - 1] != 'landing-page' ? aux_arr[aux_arr.length - 1] : 'mapa';
                    s.pageName += ':' + aux_arr[5] + '-' + lastname;
                    s.prop41 = s.eVar41 = s.pageName;
                } else {
                    s.pageName += ':' + aux_arr[aux_arr.length - 1];
                    s.prop41 = s.eVar41 = s.pageName;
                }
            }
        }
    }

    if ((!s.pageType) && (s.pageName == '')) {
        s.pageName = s.getPageName().toLowerCase();
    }

    s_cid_aux = s.getQueryParam('s_cid');
    if (s_cid_aux) {
        if (!s.campaign) {
            s.campaign = s_cid_aux;
            s.prop57 = s.campaign;
            s.prop58 = s.campaign + ':' + s.pageName;
            s.eVar57 = s.prop57;
            s.eVar58 = s.prop58;
        }
    }

    s_emid_aux = s.getQueryParam('s_emid');
    if (s_emid_aux) {
        if (!s.campaign) {
            s.campaign = s_emid_aux;
            s.prop57 = s.campaign;
            s.prop58 = s.campaign + ':' + s.pageName;
            s.eVar57 = s.prop57;
            s.eVar58 = s.prop58;
        }
    }

    s_kwcid_aux = s.getQueryParam('s_kwcid');
    if (s_kwcid_aux) {
        if (!s.campaign) {
            s.campaign = s_kwcid_aux;
            s.prop57 = s.campaign;
            s.prop58 = s.campaign + ':' + s.pageName;
            s.eVar57 = s.prop57;
            s.eVar58 = s.prop58;
        }
    }

    s_icid_aux = s.getQueryParam('s_icid');
    if (s_icid_aux) {
        if (!s.eVar59) {
            s.eVar59 = s_icid_aux;
            s.prop59 = s.eVar59;
            s.prop60 = s.eVar59 + ':' + s.pageName;
            s.eVar60 = s.prop60;
        }
    }

    s.prop61 = 'Sem Informacao de Origem';
    s.eVar61 = s.prop61;
    if (!s.campaign) {
        if (document.referrer) {
            var partes = new Array();
            partes = document.referrer.split('/');
            s.prop61 = partes[2];
            s.eVar61 = s.prop61;
        }
    } else {
        s.prop61 = s.campaign;
        s.eVar61 = s.prop61;
    }

    campaignTmp = getCookie('gpv_v0');
    if (campaignTmp != '' && campaignTmp != 'no value') {
        s.prop58 = campaignTmp + ':' + s.pageName;
    } else if (s.campaign && campaignTmp == '') {
        setCookie('gpv_v0', s.campaign, null, "/");
    }

    campaignIntTmp = getCookie('gpv_v1');
    if (campaignIntTmp != '' && campaignIntTmp != 'no value') {
        s.prop60 = campaignIntTmp + ':' + s.pageName;
    } else if (s.eVar59 && campaignIntTmp == '') {
        setCookie('gpv_v1', s.eVar59, null, "/");
    }

    s.campaign = s.getValOnce(s.campaign, "gvo_v0", 0);
    s.eVar59 = s.getValOnce(s.eVar59, "gvo_v1", 0);
    s.server = ServerHost ? ServerHost : 'desconhecido';
    //bounce rate de campanha midia display e LP
    s.clickThruQuality('s_kwcid,s_cid', 'event38', 'event39');

}
s.doPlugins = s_doPlugins;

/*
 * Plugin: Get Cookie
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/*
 * Plugin: getValOnce_v1.1
 */
s.getValOnce = new Function("v", "c", "e", "t", ""
+ "var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+ "0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+ "==0?0:a);}return v==k?'':v");

/*
 * Plugin: clickThruQuality 0.8 para Bounce Rate de campanhas
 */
s.clickThruQuality = new Function("scp", "tcth_ev", "cp_ev", "cff_ev", "cf_th", ""
+ "if(i<=1){var ev=(s.events?s.events+',':'');if(s.getQueryParam(scp)){s.events=ev+"
+ "tcth_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct"
+ ",0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;};}else{s.c_w('cf',1,0"
+ ");}}else{if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev+cp_ev;}}i++;}");

/*
 * Plugin: Set Cookie
 */
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName = new Function("u", ""
+ "var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+ "x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+ "queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+ "string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+ "ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+ "efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+ "z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+ "substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+ ";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+ "ubstring(x+1)}return n");

/*
 * Utility Function: p_c
 */
s.p_c = new Function("v", "c", ""
+ "var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+ "ngth:x).toLowerCase()?v:0");

/*Tags de interacao*/
function TrackOmni_cadastro(email) {
    var oldPagename = s.pageName;
    s.pageName = oldPagename + ':cadastro';
    s.prop34 = email;
    s.eVar34 = s.prop34;
    s.events = 'event7';
    s.t();
    s.pageName = oldPagename;
    s.prop34 = '';
    s.eVar34 = '';
}

function TrackOmni_ExtremeSearch(origem, destino, duracao, mes, pagina) {
    var oldPagename = s.pageName;
    s.pageName = oldPagename + ":extremme-search";
    s.prop40 = oldPagename;
    s.eVar40 = s.prop40;
    s.prop42 = origem + '-' + destino + '|' + duracao.replace(" ", "") + '|' + mes;
    s.eVar42 = s.prop42;
    s.events = "event34";
    s.t();
    s.pageName = oldPagename;
    s.prop40 = '';
    s.eVar40 = '';
    s.prop42 = '';
    s.eVar42 = '';
}
/*Interecao entre abas do motor na home*/
jQuery('.search-engine-manager').find('li').on('mousedown', function () {
    s.tl(this, 'o', s.channel + ':busca-' + jQuery(this).text().toLowerCase());
});

/*Botao - FAQ Inteligente*/
$(document).ready(function () {
    $('#NeoAssistTag').on('click', function () {
        var _pagename = s.pageName;
        s.pageName = s.pageName + ':faq-inteligente';
        s.eVar41 = s.prop41 = s.pageName;
        s.t();
        s.pageName = _pagename;
        s.eVar41 = s.prop41 = '';
    });
});



