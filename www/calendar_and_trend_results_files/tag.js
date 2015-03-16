// VDED10188 at 06/03/2015 12:57:34
if (typeof veTagData === 'undefined') {
    var veTagData = (function () {
        var b,
            tag = document.getElementById('veConnect'),
            d = {
                journeycode: '97FDADB1-85AB-45BA-BF39-7D103E57586D',
                captureConfigUrl: 'cdsusa.veinteractive.com/CaptureConfigService.asmx/CaptureConfig',
                chatServicesUrl: 'cdsusa.veinteractive.com/ConversationService.asmx/',
                assistServicesUrl: 'appsapiusa.veinteractive.com',
                veHostDomain: '//configusa.veinteractive.com',

                captureConfig: {
                    CaptureUrl: "cdsusa.veinteractive.com/CaptureConfigService.asmx/CaptureConfig",
                    customerid: 1001834,
                    datareceiverurl: "cdsusa.veinteractive.com/DataReceiverService.asmx/DataReceiver",
                    Forms: [
                        {
                            ChatAgentId: 732,
                            EmailOptOut: false,
                            FormFields: [
                                {
                                    ClientFieldName: "div.pedido div.numero,div.box_pedido",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 19197,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "div",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: "veConnect",
                                    DomEvent: "OnLoad",
                                    FieldTypeName: "Id",
                                    FormMappingId: 30146,
                                    HtmlAttributeTag: "Id",
                                    HtmlType: "div",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                }
                            ],
                            FormId: 10889,
                            FormTypeId: 2,
                            FormURLs: [
                                "submarinoviagens.com.br/*/confirmacao",
                                "submarinoviagens.com.br/confirmacao"
                            ],
                            IdentifyAbandonmentOr: true,
                            NumberIdentifiedFields: 0,
                            Name: null,
                            OptOuts: [],
                            Paremeter: []
                        },
                        {
                            ChatAgentId: 381,
                            EmailOptOut: false,
                            FormFields: [
                                {
                                    ClientFieldName: "#txtEmail",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 19192,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: true
                                },
                                {
                                    ClientFieldName: "valorTotalAereoHotel",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Id",
                                    FormMappingId: 19194,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "span",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: "#navega_centro>.navega02_on",
                                    DomEvent: "OnLoad",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 23205,
                                    HtmlAttributeTag: "Class",
                                    HtmlType: "div",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".border_tab_azul_branca [align='right']",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 28009,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "td",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".border_tab_azul_branca td:eq(4)",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 28010,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "td",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".border_tab_azul_branca td:eq(12)",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 28011,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "td",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".border_tab_azul_branca td:eq(18)",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 28012,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "td",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".border_tab_azul_branca td:eq(24)",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 28013,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "td",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                }
                            ],
                            FormId: 10984,
                            FormTypeId: 1,
                            FormURLs: [
                                "submarinoviagens.com.br/pacotes/compra"
                            ],
                            IdentifyAbandonmentOr: true,
                            NumberIdentifiedFields: 0,
                            Name: null,
                            OptOuts: [],
                            Paremeter: []
                        },
                        {
                            ChatAgentId: null,
                            EmailOptOut: false,
                            FormFields: [],
                            FormId: 12846,
                            FormTypeId: 1,
                            FormURLs: [
                                "submarinoviagens.com.br/atracoes/Fechamento"
                            ],
                            IdentifyAbandonmentOr: true,
                            NumberIdentifiedFields: 0,
                            Name: null,
                            OptOuts: [],
                            Paremeter: []
                        },
                        {
                            ChatAgentId: null,
                            EmailOptOut: false,
                            FormFields: [
                                {
                                    ClientFieldName: ".air-search-engine-partial .from .txtOrigin.ac_input",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 33213,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".air-search-engine-partial .from .txtInboundDate.hasDatepicker",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 33214,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".air-search-engine-partial .to .txtDestination.ac_input",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 33215,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".air-search-engine-partial .to .txtOutboundDate.hasDatepicker",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 33216,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".txtInboundDate:last",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 38025,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".txtOutboundDate:last",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 38026,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".ddlCountry",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 38027,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "select",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".ddlCity",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 38028,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "select",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                }
                            ],
                            FormId: 16235,
                            FormTypeId: 1,
                            FormURLs: [
                                "submarinoviagens.com.br"
                            ],
                            IdentifyAbandonmentOr: true,
                            NumberIdentifiedFields: 0,
                            Name: null,
                            OptOuts: [],
                            Paremeter: []
                        },
                        {
                            ChatAgentId: 381,
                            EmailOptOut: false,
                            FormFields: [
                                {
                                    ClientFieldName: ".bxTotalParcelado .ng-binding:first",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 36424,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "span",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: ".w226 input:first",
                                    DomEvent: "DynamicActivity",
                                    FieldTypeName: "Raw",
                                    FormMappingId: 36425,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: true
                                },
                                {
                                    ClientFieldName: "veConnect",
                                    DomEvent: "OnLoad",
                                    FieldTypeName: "Id",
                                    FormMappingId: 37192,
                                    HtmlAttributeTag: "Id",
                                    HtmlType: "div",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                }
                            ],
                            FormId: 17307,
                            FormTypeId: 1,
                            FormURLs: [
                                "submarinoviagens.com.br/passagens/compra"
                            ],
                            IdentifyAbandonmentOr: true,
                            NumberIdentifiedFields: 0,
                            Name: null,
                            OptOuts: [],
                            Paremeter: []
                        },
                        {
                            ChatAgentId: 381,
                            EmailOptOut: false,
                            FormFields: [
                                {
                                    ClientFieldName: "valorTotalHotel",
                                    DomEvent: "OnLoad",
                                    FieldTypeName: "Id",
                                    FormMappingId: 36483,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: "p",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                },
                                {
                                    ClientFieldName: "txtEmail",
                                    DomEvent: "OnloadOnChange",
                                    FieldTypeName: "Id",
                                    FormMappingId: 36484,
                                    HtmlAttributeTag: "Value",
                                    HtmlType: ":text",
                                    IdentifyAbandonment: false,
                                    isEmail: true
                                },
                                {
                                    ClientFieldName: "veConnect",
                                    DomEvent: "OnLoad",
                                    FieldTypeName: "Id",
                                    FormMappingId: 37193,
                                    HtmlAttributeTag: "Id",
                                    HtmlType: "div",
                                    IdentifyAbandonment: false,
                                    isEmail: false
                                }
                            ],
                            FormId: 17323,
                            FormTypeId: 1,
                            FormURLs: [
                                "submarinoviagens.com.br/hoteis/compra"
                            ],
                            IdentifyAbandonmentOr: true,
                            NumberIdentifiedFields: 0,
                            Name: null,
                            OptOuts: [],
                            Paremeter: []
                        }
                    ],
                    IdentifyAbandonmentOr: true,
                    JourneyCode: "97FDADB1-85AB-45BA-BF39-7D103E57586D",
                    JourneyId: 3047,
                    JourneyTimeOut: 1800,
                    NumberIdentifiedFields: 0,
                    OptOutField: 0
                },
                /*
                 * The custom settings are based on the standard defined on Settings.js.
                 */
                settings: {
                    domainsToIgnore: ['submarinoviagens.com.br'],
                    unsupportedBrowsersVersionPlatform: {'ie': ['8']},
                    consoleMessagesEnabled: true,
                    elementsStoppingAppsOnClick: [],
                    autocompleteInputsHandler: [],
                    keywordsRegExp: [{
                        source: 'Example',
                        regexp: / /,
                        notSearchEngine: false,
                        replaceCharactersBySpace: '-',
                        storeSearchTerm: false,
                        showNoProducts: false,
                        ignoreCloses: false
                    }],
                    cookies: {enabled: false, timeToLive: 60},

                    elementsStoppingAppsOnEvent: [
                        {
                            elementQuery: '.btComprar',
                            eventType: 'click',
                            doesElementExistOnLoad: true,
                        }]


                }
                ,

                /*
                 * Custom events that allow custom behavior per journey. The standard is defined on CustomEvents.js.
                 */
                customEvents: {},

                /*
                 * Criteria filters that are setup by tech team. The types of Criteria filters possible are:
                 *       * Personality - The matching of this criteria filters will defined the personality that the chat will have
                 *       * Variation
                 */
                criteriaFilters: {},

                /*
                 * All the apps that Ve Interactive has with the events
                 */
                apps: [
                    {
                        name: "Chat",
                        exit: true,
                        inactivity: false,
                        backButton: true,
                        load: false,
                        enabled: true
                    }
                ]
            };
        if (!tag) {

            // Send the request in order to create the cookie session
            if (d.settings.cookie && d.settings.cookie.enabled) {
                var xdr = null;
                if (window.XMLHttpRequest) {
                    xdr = new XMLHttpRequest();
                }

                if (xdr !== null) {
                    var url = d.chatServicesUrl.split('/')[0] + // Getting the rcs URL
                        '/DataReceiverService.asmx/SessionInit?journeyCode=a4744012-dfdd-4cec-8fa0-3840fd30a461&timeToLive=' +
                        (d.settings.cookie.timeToLive ? d.settings.cookie.timeToLive : 60); // either the time exist either we use the default time (minutes)

                    xdr.open("GET", location.protocol + "//" + url);
                    xdr.withCredentials = true;
                    xdr.send();
                }
            }


            // Adding the Capture-apps file to the DOM
            tag = document.createElement('script');
            tag.type = 'text/javascript';
            tag.id = 'veConnect';
            tag.async = true;
            tag.src = window.location.protocol + d.veHostDomain + '/scripts/3.0/capture-apps-3.0.3.js';
            b = document.getElementsByTagName('script')[0];
            b.parentNode.insertBefore(tag, b);
        }
        return d;
    })();
}
;
