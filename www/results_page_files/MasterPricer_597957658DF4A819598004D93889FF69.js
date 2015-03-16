function SalesChannel(n) {
    thisSalesChannel = this, this.Id, this.Name = n, this.GetRequest = function () {
        var n;
        return n = {Name: thisSalesChannel.Name}
    }
}
function InitVariables() {
    CurrentPointOfSale.toUpperCase() == "BRADESCO" || CurrentPointOfSale.toUpperCase() == "AMEX" ? (CurrentCurrencyFormat = " PTS", RemakeSearchInitialPosition = "bottom", CurrencyPrefixed = !1, ShowRulerOptions = !0, CheckCookiesOnProcessOrder = !0) : (CurrentCurrencyFormat = "R$ ", RemakeSearchInitialPosition = "relative", CurrencyPrefixed = !0, ShowRulerOptions = !1, CheckCookiesOnProcessOrder = !1)
}
function SearchParameters(n) {
    function l() {
        var r = QueryString("PackageSourcesHotelId"), f = [], i, n, u, t;
        if (r)for (i = r.split(";"), n = 0; n < i.length; n++)u = i[n], t = u.split(","), f.push({
            Key: t[0],
            Value: t[1]
        });
        return f
    }

    function o(n) {
        return n.select(function (n) {
            return n.Adults
        }).join(",")
    }

    function u(n) {
        return n.select(function (n) {
            return n.ChildAges.length
        }).join(",")
    }

    function f(n) {
        return n.select(function (n) {
            return n.ChildAges.join(",")
        }).join(";")
    }

    function i(n) {
        return n.Day + "/" + n.Month + "/" + n.Year
    }

    function r(n, t) {
        var i = undefined;
        return t == "start" ? i = n : t == "end" && (i = n + 6), i
    }

    function h(n, t) {
        return n != undefined && n != null && !isNaN(n) && t && (n = parseInt(n), t == "start" ? n -= 1 : t == "end" && (n += 1), n > 24 ? n = 24 : n < 0 && (n = 0)), n
    }

    var t = this, s, c, e;
    this.Type = n, this.TestType = function () {
        this.Type != undefined && s.contains(this.Type) || alert("Type property on SearchParameters is not valid!")
    }, s = ["Air", "AirHotel", "Hotel", "Attraction", "SearchIATA"], c = "", this.PointOfSale = "", this.SearchMode = 1, this.CheckQueryString = !1, this.Source = 0, this.OptimizedSearch = !0, this.IsRoundTrip = !0, this.MultiDestination = !1, this.SearchType = 1, this.Adults = 0, this.Children = 0, this.Baby = 0, this.AdultsQtQuerystring = "", this.ChildQtQuerystring = "", this.ChildAgeQuerystring = "", this.RoomsQtdQuerystring = "", this.offerValue = 0, this.Origin = "", this.OriginId = 0, this.Destination = "", this.DestinationId = 0, this.CabinFilter = "", this.CabinQualifier = "", this.NonStop = !1, this.StartTimeOut = 0, this.EndTimeOut = 0, this.StartTimeIn = 0, this.EndTimeIn = 0, this.SlotId = "", this.AffiliatedId = 655, this.AffiliatedPw = 123456, this.IsSearch = !0, this.svm_utm_source = "", this.svm_AffiliatedID = "", this.svm_utm_campaign = "", this.svm_s_cid = "", this.svm_utm_medium = "", this.CiaCodeList = [], this.Origins = [], this.Destinations = [], this.Dates = [], this.StartTime = [], this.EndTime = [], this.CabinType = [], this.CiaCode = [], this.AnotherDestination = !1, this.AnotherDate = !1, this.LocationId = 0, this.Location = "", this.RoomsRequest = [], this.Sources = [], this.Hotel = [], this.MarkupType = 1, this.AdultCount = 0, this.AttractionId = 0, this.LoadDependencies = !0, this.AttractionLocation = {
        Id: -1,
        Continent: "",
        Country: "",
        StateProvince: "",
        City: "",
        IATA: ""
    }, this.CheckIn = "", this.CheckOut = "", this.WordOrigin = "", this.WordDestin = "", this.DataBase = "", this.LoadParameters = function () {
        this.TestType(), this.PointOfSale = CurrentPointOfSale, this.Type == "Air" ? this.LoadAirParameters() : this.Type == "Hotel" ? this.LoadHotelParameters() : this.Type == "Attraction" ? this.LoadAttractionParameters() : this.Type == "AirHotel" ? this.LoadAirHotelParameters() : this.Type == "SearchIATA" && this.LoadSearchIATAParameters()
    }, this.LoadAirParameters = function () {
        var v, b, f, u, y, a, l, s, w, p, n, c, h, r, t, i, o;
        if (this.CheckQueryString)if (v = QueryString("Multi"), b = $("#hQtdeOrigem").val(), v != null && v == "true") {
            for (f = $("#hOrigem").val(), u = $("#hDestino").val(), f = f.replaceAll("%20", " "), u = u.replaceAll("%20", " "), f = f.replaceAll("(", "--").replaceAll(")", "---"), u = u.replaceAll("(", "--").replaceAll(")", "---"), this.Origins = f.split("|"), this.Destinations = u.split("|"), y = $("#hData").val(), a = y.split("|"), n = 0; n < a.length; n++)this.Dates.push(StringToDateValues(a[n].toString()));
            l = $("#hHoraInicio").val(), s = $("#hHoraFim").val(), l = l.replaceAll(" ", ""), s = s.replaceAll(" ", ""), w = l.split("|"), p = s.split("|"), this.StartTime = w, this.EndTime = p, this.IsRoundTrip = !1, this.MultiDestination = !0;
            var d = $("#hCia").val(), t = d.split("|"), e = [];
            for (n = 0; n < t.length; n++)e = [], t[n].toString().indexOf(",") >= 0 ? e = t[n].toString().split(",") : e.push(t[n].toString()), this.CiaCode.push(e), this.CiaCodeList.push(e);
            this.Adults = QueryString("NumADT"), this.Children = QueryString("NumCHD"), this.Baby = QueryString("NumINF"), i = QueryString("SomenteDireto"), i != null && (this.NonStop = !(i == 0 || i == "false")), AirMotorUC.SetValues(this)
        } else {
            c = QueryString("SomenteIda"), c != null && (this.IsRoundTrip = c == 0 || c == "false"), this.Origin = QueryString("Origem").replaceAll("%20", " "), this.Destination = QueryString("Destino").replaceAll("%20", " ");
            var g = $("#hOrigem").val(), nt = $("#hDestino").val(), k = StringToDateValues(QueryString("Data"));
            this.Dates.push(k), this.IsRoundTrip && (h = StringToDateValues(QueryString("Data", 1)), h && h.isValid ? this.Dates.push(h) : this.IsRoundTrip = !1), this.MultiDestination = !1, this.Adults = parseInt(QueryString("NumADT")), this.Children = parseInt(QueryString("NumCHD")), this.Baby = parseInt(QueryString("NumINF")), QueryString("offerValue") != null && (this.offerValue = parseInt(QueryString("offerValue"))), r = QueryString("Cia"), r != undefined && (t = [], r.indexOf(",") >= 0 ? (t = r.split(","), this.CiaCodeList = t, this.CiaCode = t) : (t.push(r), this.CiaCodeList.push(r), this.CiaCode.push(r))), i = QueryString("SomenteDireto"), i != null && (this.NonStop = !(i == 0 || i == "false")), this.StartTimeOut = this.EndTimeOut = QueryString("Hora"), this.StartTimeIn = this.EndTimeIn = QueryString("Hora", 1), o = QueryString("selCabin"), o != undefined && o != "" && (this.CabinFilter = o, this.CabinQualifier = "RC"), AirMotorUC.SetValues(this)
        } else AirMotorUC.LoadData(), this.IsRoundTrip = AirMotorUC.IsRoundTrip, this.MultiDestination = AirMotorUC.MultiDestination, this.Adults = AirMotorUC.Adults, this.Children = AirMotorUC.Children, this.Baby = AirMotorUC.Baby, this.Origin = AirMotorUC.Origin, this.Destination = AirMotorUC.Destination, this.svm_AffiliatedID = AirMotorUC.svm_AffiliatedID, this.svm_s_cid = AirMotorUC.svm_s_cid, this.svm_utm_campaign = AirMotorUC.svm_utm_campaign, this.svm_utm_medium = AirMotorUC.svm_utm_medium, this.svm_utm_source = AirMotorUC.svm_utm_source, AirMotorUC.Origins.length > 0 && (this.IsRoundTrip || this.MultiDestination) && (this.Origins = AirMotorUC.Origins, this.Destinations = AirMotorUC.Destinations), this.CabinFilter = AirMotorUC.CabinFilter, this.CabinQualifier = AirMotorUC.CabinQualifier, this.NonStop = AirMotorUC.NonStop, this.StartTimeOut = AirMotorUC.StartTimeOut, this.EndTimeOut = AirMotorUC.EndTimeOut, this.StartTimeIn = AirMotorUC.StartTimeIn, this.EndTimeIn = AirMotorUC.EndTimeIn, this.CiaCodeList = AirMotorUC.CiaCodeList, this.Dates = AirMotorUC.Dates, this.StartTime = AirMotorUC.StartTime, this.EndTime = AirMotorUC.EndTime, this.CabinType = AirMotorUC.CabinType, this.CiaCode = AirMotorUC.CiaCode;
        QueryString("SlotId") && (this.SlotId = QueryString("SlotId").toString())
    }, this.LoadHotelParameters = function () {
        var n = HotelMotorUC.LoadParameters(), r, e, t, i;
        if (this.RoomsRequest = n.RoomsRequest, this.CheckIn = n.CheckIn, this.CheckOut = n.CheckOut, this.LocationId = n.LocationId, this.Location = n.Location, this.AdultsQtQuerystring = o(n.RoomsRequest), this.ChildQtQuerystring = u(n.RoomsRequest), this.ChildAgeQuerystring = f(n.RoomsRequest), this.RoomsQtdQuerystring = n.RoomsRequest.length, this.svm_AffiliatedID = HotelMotorUC.svm_AffiliatedID, this.svm_s_cid = HotelMotorUC.svm_s_cid, this.svm_utm_campaign = HotelMotorUC.svm_utm_campaign, this.svm_utm_medium = HotelMotorUC.svm_utm_medium, this.svm_utm_source = HotelMotorUC.svm_utm_source, QueryString("MarkupType") && !isNaN(parseInt(QueryString("MarkupType"))) && (this.MarkupType = QueryString("MarkupType")), this.CheckQueryString && (QueryString("HotelId") && (this.HotelId = QueryString("HotelId")), QueryString("Source") && (this.Source = QueryString("Source")), QueryString("SourcesHotelId"))) {
            for (r = [], e = QueryString("SourcesHotelId").split(";"), t = 0; t < e.length; t++)i = e[t].split(","), i.length > 1 && r.push({
                Key: i[0],
                Value: i[1]
            });
            r.length > 0 && (this.SourcesHotelId = r, this.SearchMode = 0)
        }
        QueryString("SlotId") && (this.SlotId = QueryString("SlotId").toString())
    }, this.LoadAttractionParameters = function () {
        var n = AttractionMotorUC.LoadParameters();
        this.CheckIn = n.CheckIn, this.CheckOut = n.CheckOut, this.LocationId = n.Location.Id, this.AttractionLocation = n.Location, this.AdultCount = n.Adults
    }, this.LoadAirHotelParameters = function () {
        var t, n, i;
        this.OptimizedSearch = !0, t = AirHotelMotorUC.LoadRoomsAndTravelers(), this.Children = t.Children, this.Baby = t.Baby, this.Adults = t.Adults, this.RoomsRequest = t.RoomsRequest, this.AdultsQtQuerystring = o(t.RoomsRequest), this.ChildQtQuerystring = u(t.RoomsRequest), this.ChildAgeQuerystring = f(t.RoomsRequest), this.RoomsQtdQuerystring = t.RoomsRequest.length, n = AirHotelMotorUC.LoadAirParameters(), this.OriginId = n.Locations.OriginId, this.Origin = n.Locations.Origin, this.DestinationId = n.Locations.DestinationId, this.Destination = n.Locations.Destination, this.Dates = n.Dates, this.IsRoundTrip = n.Options.IsRoundTrip, this.MultiDestination = n.Options.MultiDestination, this.CabinFilter = n.Options.CabinFilter, this.NonStop = n.Options.NonStop, this.StartTimeOut = n.Options.StartTimeOut, this.EndTimeOut = n.Options.StartTimeOut, this.StartTimeIn = n.Options.StartTimeIn, this.EndTimeIn = n.Options.EndTimeOut, this.CiaCodeList = n.Options.CiaCodeList, i = AirHotelMotorUC.LoadHotelParameters(), this.AnotherDestination = i.AnotherDestination, this.LocationId = i.LocationId, this.Location = i.Location, this.AnotherDate = i.AnotherDate, this.CheckIn = i.CheckIn, this.CheckOut = i.CheckOut, this.svm_AffiliatedID = AirHotelMotorUC.svm_AffiliatedID, this.svm_s_cid = AirHotelMotorUC.svm_s_cid, this.svm_utm_campaign = AirHotelMotorUC.svm_utm_campaign, this.svm_utm_medium = AirHotelMotorUC.svm_utm_medium, this.svm_utm_source = AirHotelMotorUC.svm_utm_source, QueryString("SlotId") && (this.SlotId = QueryString("SlotId").toString())
    }, this.LoadSearchIATAParameters = function () {
        this.WordOrigin = this.Origin.replace("---", ")").replace("--", "("), this.WordDestin = this.Destination.replace("---", ")").replace("--", "(")
    }, e = {
        SlotId: null,
        PointOfSale: null,
        identifier: null,
        SearchData: {
            SearchMode: null,
            AffiliatedId: null,
            AffiliatedPw: null,
            IsSearch: null,
            AirSearchData: {
                CityPairsRequest: null,
                NumberADTs: null,
                NumberCHDs: null,
                NumberINFs: null,
                SearchType: null,
                BestCombinationWithSwitchAirport: null,
                CabinFilter: null
            },
            HotelSearchData: {
                LocationId: null,
                Location: null,
                CheckIn: null,
                CheckOut: null,
                AnotherDate: null,
                RoomsRequest: null,
                Sources: null,
                HotelId: null,
                Source: null,
                SourcesHotelId: null
            },
            AttractionSearchData: {
                Location: null,
                CheckIn: null,
                CheckOut: null,
                LoadDependencies: !0,
                Source: null,
                AttractionId: null,
                AdultCount: 0
            }
        }
    }, this.GetRequestData = function () {
        var n, f, u, i, t, r;
        if (this.TestType(), n = e, n.SearchData.OptimizedSearch = this.OptimizedSearch, f = Cookies.checkCookie("UserAuthenticated"), f && (u = Cookies.getCookieObject("UserAuthenticated"), n.SearchData.identifier = u.B2BUser.Identifier.toString()), this.Type == "Air") {
            if (this.Origins != null && this.Origins != undefined && this.Origins.length > 0 && this.MultiDestination)for (t = [this.CreateCityPairRequestFromList(0)], i = 1; i < this.Origins.length; i++)t.push(this.CreateCityPairRequestFromList(i)); else t = [this.CreateCityPairRequest(!0)], this.IsRoundTrip && t.push(this.CreateCityPairRequest(!1));
            n.SlotId = this.SlotId, n.PointOfSale = this.PointOfSale, n.SearchData.SearchMode = this.SearchMode, n.SearchData.HotelSearchData = null, n.SearchData.AttractionSearchData = null, n.SearchData.AirSearchData.CityPairsRequest = t, n.SearchData.AirSearchData.NumberADTs = this.Adults, n.SearchData.AirSearchData.NumberCHDs = this.Children, n.SearchData.AirSearchData.NumberINFs = this.Baby, n.SearchData.AirSearchData.SearchType = this.SearchType, n.SearchData.AirSearchData.BestCombinationWithSwitchAirport = this.BestCombinationWithSwitchAirport, n.SearchData.AirSearchData.CabinFilter = this.getCabinRequest(), n.SearchData.AffiliatedId = this.AffiliatedId, n.SearchData.AffiliatedPw = this.AffiliatedPw, n.SearchData.IsSearch = this.IsSearch
        } else this.Type == "Hotel" ? (n.SlotId = this.SlotId, n.PointOfSale = this.PointOfSale, n.SearchData.AirSearchData = null, n.SearchData.AttractionSearchData = null, n.SearchData.HotelSearchData.LocationId = this.LocationId, n.SearchData.HotelSearchData.Location = this.Location, n.SearchData.HotelSearchData.CheckIn = this.CheckIn, n.SearchData.HotelSearchData.CheckOut = this.CheckOut, n.SearchData.HotelSearchData.RoomsRequest = this.RoomsRequest, n.SearchData.HotelSearchData.Sources = this.Sources, n.SearchData.HotelSearchData.HotelId = this.HotelId, n.SearchData.HotelSearchData.Source = this.Source, n.SearchData.HotelSearchData.MarkupType = this.MarkupType, n.SearchData.HotelSearchData.SourcesHotelId = this.SourcesHotelId, n.SearchData.SearchMode = this.SearchMode, n.SearchData.PointOfSale = this.PointOfSale, n.SearchData.AffiliatedId = this.AffiliatedId, n.SearchData.AffiliatedPw = this.AffiliatedPw, n.SearchData.IsSearch = this.IsSearch) : this.Type == "AirHotel" ? (r = [this.CreateCityPairRequest(!0)], this.IsRoundTrip && r.push(this.CreateCityPairRequest(!1)), n.SlotId = this.SlotId, n.PointOfSale = this.PointOfSale, n.SearchData.AttractionSearchData = null, n.SearchData.HotelSearchData.LocationId = this.LocationId, n.SearchData.HotelSearchData.Location = this.Location, n.SearchData.HotelSearchData.CheckIn = this.CheckIn, n.SearchData.HotelSearchData.CheckOut = this.CheckOut, n.SearchData.HotelSearchData.RoomsRequest = this.RoomsRequest, n.SearchData.HotelSearchData.Sources = this.Sources, n.SearchData.HotelSearchData.HotelId = this.HotelId, n.SearchData.HotelSearchData.Source = this.Source, n.SearchData.HotelSearchData.MarkupType = 3, n.SearchData.HotelSearchData.SourcesHotelId = this.SourcesHotelId, n.SearchData.HotelSearchData.AnotherDate = this.AnotherDate, n.SearchData.AirSearchData.CityPairsRequest = r, n.SearchData.AirSearchData.NumberADTs = this.Adults, n.SearchData.AirSearchData.NumberCHDs = this.Children, n.SearchData.AirSearchData.NumberINFs = this.Baby, n.SearchData.AirSearchData.SearchType = this.SearchType, n.SearchData.AirSearchData.BestCombinationWithSwitchAirport = this.BestCombinationWithSwitchAirport, n.SearchData.AirSearchData.CabinFilter = this.getCabinRequest(), n.SearchData.SearchMode = this.SearchMode, n.SearchData.PointOfSale = this.PointOfSale, n.SearchData.AffiliatedId = this.AffiliatedId, n.SearchData.AffiliatedPw = this.AffiliatedPw, n.SearchData.IsSearch = this.IsSearch, n.SearchData.MountedPackageSearchData = {
            CiaCode: QueryString("CiaCode"),
            SourcesHotelId: l()
        }) : this.Type == "Attraction" ? (n.PointOfSale = this.PointOfSale, n.SearchData.AirSearchData = null, n.SearchData.HotelSearchData = null, n.SearchData.AttractionSearchData.Location = this.AttractionLocation, n.SearchData.AttractionSearchData.CheckIn = this.CheckIn, n.SearchData.AttractionSearchData.CheckOut = this.CheckOut, n.SearchData.AttractionSearchData.LoadDependencies = this.LoadDependencies, n.SearchData.AttractionSearchData.AttractionId = this.AttractionId, n.SearchData.AttractionSearchData.AdultCount = this.AdultCount, n.SearchData.AttractionSearchData.Source = this.Source, n.SearchData.SearchMode = this.SearchMode, n.SearchData.PointOfSale = this.PointOfSale) : this.Type == "SearchIATA" && (n = {
            WordOrigin: this.WordOrigin,
            WordDestin: this.WordDestin,
            DataBase: 1,
            SearchMode: 1
        });
        return n.UserSessionId = Cookies.getCookie("UserSessionId"), AffiliatedId != undefined && AffiliatedId != 0 && AffiliatedId != null && (n.AffiliatedId = AffiliatedId), n
    }, this.SetParameters = function (n) {
        var i, t;
        this.TestType(), this.Type == "Air" || this.Type == "Hotel" || this.Type == "AirHotel" && (this.LocationId = n.HotelSearchData.LocationId, this.Location = n.HotelSearchData.Location, this.CheckIn = n.HotelSearchData.CheckIn, this.CheckOut = n.HotelSearchData.CheckOut, this.RoomsRequest = n.HotelSearchData.RoomsRequest, this.AnotherDate = !0, this.Dates = [], n.AirSearchData != null && n.AirSearchData.CityPairsRequest != null && n.AirSearchData.CityPairsRequest.length > 0 && (this.Origin = n.AirSearchData.CityPairsRequest[0].Origin, this.Destination = n.AirSearchData.CityPairsRequest[0].Destination, this.NonStop = n.AirSearchData.CityPairsRequest[0].NonStop, i = StringToDateValues(n.AirSearchData.CityPairsRequest[0].DepartureDay + "/" + n.AirSearchData.CityPairsRequest[0].DepartureMonth + "/" + n.AirSearchData.CityPairsRequest[0].DepartureYear), this.Dates.push(i), n.AirSearchData.CityPairsRequest.length > 1 && (t = StringToDateValues(n.AirSearchData.CityPairsRequest[1].DepartureDay + "/" + n.AirSearchData.CityPairsRequest[1].DepartureMonth + "/" + n.AirSearchData.CityPairsRequest[1].DepartureYear), this.Dates.push(t))), this.Adults = n.AirSearchData.NumberADTs, this.Children = n.AirSearchData.NumberCHDs, this.Baby = n.AirSearchData.NumberINFs)
    }, this.VerifySearchRules = function () {
        this.TestType();
        var n = !1;
        return this.Type == "Air" ? n = AirMotorUC.SearchRules() : this.Type == "Hotel" ? n = HotelMotorUC.VerifySearchRules() : this.Type == "AirHotel" && (n = AirHotelMotorUC.VerifySearchRules()), n
    }, this.GetCiaCode = function () {
        var t, n;
        for (this.TestType(), t = "", n = 0; n < this.CiaCode.length; n++)this.CiaCode[n] && (t = t + "&Cia=" + this.CiaCode[n]);
        return t
    }, this.GetCiaCodeList = function () {
        var t, n;
        for (this.TestType(), t = "", n = 0; n < this.CiaCodeList.length; n++)this.CiaCodeList[n] && (t = t + "&Cia=" + this.CiaCodeList[n]);
        return t
    }, this.GetQueryString = function () {
        var n, o, s, h, u, f, e, r;
        if (this.TestType(), n = "", this.Type == "Air")if (n = "", this.MultiDestination && this.MultiDestination == !0) {
            for (n = n + "?SomenteIda=false", o = "", r = 0; r < t.Origins.length; r++)o = o + "&Origem=" + t.Origins[r].toString();
            for (n = n + o, s = "", r = 0; r < t.Destinations.length; r++)s = s + "&Destino=" + t.Destinations[r].toString();
            for (n = n + s, h = "", r = 0; r < t.Dates.length; r++)h = h + "&Data=" + FormatSimpleDateValues(t.Dates[r]);
            for (n = n + h, u = "", r = 0; r < t.StartTime.length; r++)u = u + "&HoraInicio=" + t.StartTime[r].toString();
            for (n = n + u, f = "", r = 0; r < t.EndTime.length; r++)f = f + "&HoraFim=" + t.EndTime[r].toString();
            n = n + f, n = n + t.GetCiaCode(), n = n + "&NumADT=" + t.Adults, n = n + "&NumCHD=" + t.Children, n = n + "&NumINF=" + t.Baby, n = n + "&SomenteDireto=" + t.NonStop, n = n + "&Multi=true", n = n + "&selCabin=" + this.CabinFilter, n = n.replace("undefined", ""), n = n.replace("null", "")
        } else {
            for (n = n + "?SomenteIda=" + !t.IsRoundTrip, n = n + "&Origem=" + t.Origin, n = n + "&Destino=" + t.Destination, e = "", r = 0; r < t.CiaCode.length; r++)t.CiaCode[r] != null && t.CiaCode[r].length > 0 && (e = e + "&Cia=" + t.CiaCode.join(","));
            n = n + e, t.IsRoundTrip && (n = n + "&Origem=" + t.Destination, n = n + "&Destino=" + t.Origin), n = n + "&Data=" + FormatSimpleDateValues(t.Dates[0]), t.Dates.length > 1 && t.Dates[1] != undefined && (n = n + "&Data=" + FormatSimpleDateValues(t.Dates[1])), n = n + "&NumADT=" + t.Adults, n = n + "&NumCHD=" + t.Children, n = n + "&NumINF=" + t.Baby, n = n + "&SomenteDireto=" + t.NonStop, n = n + "&Hora=" + t.EndTimeOut, n = n + "&Hora=" + t.StartTimeIn, n = n + "&selCabin=" + this.CabinFilter, n = n + "&Multi=false", n = n.replace("undefined", ""), n = n.replace("null", "")
        } else this.Type == "Hotel" ? (n = "", n += "Location=" + this.Location + "&LocationId=" + this.LocationId + "&CheckIn=" + i(this.CheckIn), n += "&CheckOut=" + i(this.CheckOut) + "&Rooms=" + this.RoomsQtdQuerystring + "&Adults=" + this.AdultsQtQuerystring, n += "&Children=" + this.ChildQtQuerystring + "&ChildAges=" + this.ChildAgeQuerystring, QueryString("MarkupType") && !isNaN(parseInt(QueryString("MarkupType"))) && (n += "&MarkupType=" + QueryString("MarkupType")), QueryString("ParentOrderId") && !isNaN(parseInt(QueryString("ParentOrderId"))) && (n += "&ParentOrderId=" + QueryString("ParentOrderId"))) : this.Type == "Attraction" ? (n = "Location=" + this.Location + "&LocationId=" + this.LocationId + "&CheckIn=" + i(this.CheckIn), n += "&CheckOut=" + i(this.CheckOut) + "&Adults=" + this.AdultCount) : this.Type == "AirHotel" && (n = "", n += "Origem=" + this.Origin.RemoveDiacritics() + "&OrigemId=" + this.OriginId, n += "&Destino=" + this.Destination.RemoveDiacritics() + "&DestinoId=" + this.DestinationId, n += "&DataIda=" + FormatSimpleDateValues(this.Dates[0]) + "&HoraIda=" + this.StartTimeOut, n += "&DataVolta=" + (this.Dates.length > 1 && this.Dates[1] != undefined ? FormatSimpleDateValues(this.Dates[1]) : "") + "&HoraVolta=" + this.StartTimeIn, n += "&Location=" + this.Location.RemoveDiacritics() + "&LocationId=" + this.LocationId, n += "&CheckIn=" + FormatSimpleDateValues(this.CheckIn) + "&CheckOut=" + FormatSimpleDateValues(this.CheckOut), n += "&Rooms=" + this.RoomsQtdQuerystring, n += "&Adults=" + this.AdultsQtQuerystring, n += "&Children=" + this.ChildQtQuerystring, n += "&ChildAges=" + this.ChildAgeQuerystring, n += "&RoundTrip=" + (this.IsRoundTrip == !0 ? "1" : "0"), n += "&NonStop=" + (this.NonStop == !0 ? "1" : "0"), n += "&AnotherDate=" + (this.AnotherDate == !0 ? "true" : "false"), this.CiaCodeList.length > 0 && this.CiaCodeList.orderBy(function (n) {
            return n
        }), n += "&Cia=" + (this.CiaCodeList.length > 0 ? this.CiaCodeList.join(",") : ""), n += "&SelCabin=" + this.CabinFilter, n += "&CiaCode=" + (QueryString("CiaCode") ? QueryString("CiaCode") : ""), n += "&PackageSourcesHotelId=" + (QueryString("PackageSourcesHotelId") ? QueryString("PackageSourcesHotelId") : ""));
        return this.svm_AffiliatedID != "" && (n += "&AffiliatedID=" + this.svm_AffiliatedID), this.svm_utm_source != "" && (n += "&utm_source=" + this.svm_utm_source), this.svm_utm_medium != "" && (n += "&utm_medium=" + this.svm_utm_medium), this.svm_utm_campaign != "" && (n += "&utm_campaign=" + this.svm_utm_campaign), this.svm_s_cid != "" && (n += "&s_cid=" + this.svm_s_cid), n.RemoveDiacritics()
    }, this.LoadFromQueryString = function () {
        var u, c, y, l, b, s, t, f, a, v, p, k, h, i, d, o, r, n;
        if (this.TestType(), this.Type != "Hotel" && this.Type == "AirHotel") {
            for (u = QueryString("Cabine") != null ? QueryString("Cabine") : QueryString("selCabin"), u != null && (this.CabinType = u), u != "" && u != null && (this.CabinQualifier = "RC"), c = QueryString("RoundTrip"), c != null && (this.IsRoundTrip = c == 1), this.Origin = QueryString("Origem").replaceAll("%20", " ").replaceAll("%28", "(").replaceAll("%29", ")"), y = QueryString("OrigemId"), y && (this.OriginId = parseInt(y)), this.Destination = QueryString("Destino").replaceAll("%20", " ").replaceAll("%28", "(").replaceAll("%29", ")"), l = QueryString("DestinoId"), l && (this.DestinationId = parseInt(l)), b = StringToDateValues(QueryString("DataIda")), this.Dates.push(b), this.IsRoundTrip && (s = StringToDateValues(QueryString("DataVolta")), s && s.isValid ? this.Dates.push(s) : this.IsRoundTrip = !1), this.MultiDestination = !1, t = QueryString("Cia"), t != undefined && (t.indexOf(",") >= 0 ? (this.CiaCodeList = t.split(","), this.CiaCode = t.split(",")) : (this.CiaCodeList.push(t), this.CiaCode.push(t))), f = QueryString("NonStop"), f != null && (this.NonStop = !(f == 0 || f == "false")), this.StartTimeOut = this.EndTimeOut = QueryString("HoraIda"), this.StartTimeIn = this.EndTimeIn = QueryString("HoraVolta"), a = QueryString("Location"), this.Location = a ? a.replaceAll("%20", " ").replaceAll("%28", "(").replaceAll("%29", ")") : this.Origin, v = QueryString("LocationId"), v && (this.LocationId = parseInt(v)), p = this.Location.split("/"), k = this.Destination.split("/"), this.AnotherDestination = p[0] != k[0], this.CheckIn = StringToDateValues(QueryString("CheckIn")), this.CheckOut = StringToDateValues(QueryString("CheckOut")), h = QueryString("AnotherDate"), h != null ? this.AnotherDate = h == "true" : (this.AnotherDate = !1, CompareDateValues(this.CheckIn, this.Dates[0]) || (this.AnotherDate = !0), (this.Dates.length == 1 || this.Dates.length > 1 && this.Dates[1] != undefined && !CompareDateValues(this.CheckOut, this.Dates[1])) && (this.AnotherDate = !0)), this.Adults = 0, i = QueryString("Adults").replaceAll(";", ",").split(","), n = 0, d = i.length; n < d; n++)i[n] = parseInt(i[n]), this.Adults += i[n];
            var w = QueryString("Rooms"), g = w != "" ? parseInt(w) : 0, o = QueryString("Children").replaceAll(";", ",").split(","), e = QueryString("ChildAges").split(";");
            for (this.Baby = 0, this.Children = 0, n = 0; n < e.length; n++)for (o = e[n].split(","), r = 0; r < o.length; r++)(o[r] = parseInt(o[r])) < 2 ? this.Baby++ : this.Children++;
            for (n = 0; n < g; n++)this.RoomsRequest.push({
                Adults: i[n],
                ChildAges: e[n].length > 0 ? e[n].split(",") : []
            });
            AirHotelMotorUC.SetValues(this)
        }
    }, this.IsValidRequest = function () {
        return this.MultiDestination ? t.Origins && t.Destinations : t.Origin && t.Destination && t.getShortIATA(t.Origin) != "" && t.getShortIATA(t.Destination) != ""
    }, this.IsValidOrigin = function () {
        return this.MultiDestination ? t.getShortIATAOriginFromList() == !0 : t.getShortIATA(t.Origin) != ""
    }, this.IsValidDestination = function () {
        return this.MultiDestination ? t.getShortIATADestinationFromList() == !0 : t.getShortIATA(t.Destination) != ""
    }, this.IsValidOriginDestination = function () {
        return this.MultiDestination ? t.getShortIATAOriginFromList() == !0 && t.getShortIATADestinationFromList() == !0 : t.getShortIATA(t.Origin) != "" || t.getShortIATA(t.Destination) != ""
    }, this.IsValidTextByIATAOriginAndDestination_old = function () {
        return this.Origin == "" || this.Destination == "" ? !1 : ContainsSpecialCharacters(this.Origin) || ContainsSpecialCharacters(this.Destination) ? !1 : !0
    }, this.IsValidTextByIATAOriginAndDestination = function (n, t) {
        return n == "" || t == "" ? !1 : ContainsSpecialCharacters(n) || ContainsSpecialCharacters(t) ? !1 : !0
    }, this.IsValidTextByIATAOriginsAndDestinations = function () {
        if (t.MultiDestination) {
            if (t.Origins != null && t.Origins != undefined && t.Origins.length > 0)for (var n = 0; n < t.Origins.length; n++)if (!this.IsValidTextByIATAOriginAndDestination(t.Origins[n], t.Destinations[n]))return !1
        } else if (!this.IsValidTextByIATAOriginAndDestination(t.Origin, t.Destination))return !1;
        return !0
    }, this.IsValidIATAOriginAndDestination = function () {
        var t = "", n = "";
        return this.Origin != "" && this.Destination != "" && (t = GetIATA(this.Origin), n = GetIATA(this.Destination)), this.Origin != "" && this.Destination != "" && t == "" && n == "" && (t = "origin", n = "destination"), t != n
    }, this.IsValidPassengerQuantity = function () {
        return parseInt($("#drpQtdADT").val()) + parseInt($("#drpQtdCHD").val()) + parseInt($("#drpQtdINF").val()) <= 9
    }, this.getShortIATAOriginFromList = function () {
        var i = 0, r = "", e, n, f, u;
        if (t.Origins != null && t.Origins != undefined && t.Origins.length > 0)for (e = 0; e < t.Origins.length; e++)if (n = t.Origins[e].toString(), n)if (n.length == 3)r = t.Origin; else if (n.indexOf("(") >= 0)try {
            f = n.indexOf("("), u = n.indexOf(")"), r = n.substring(f + 1, u)
        } catch (o) {
            r = "", i++
        } else if (n.indexOf("--") >= 0)try {
            f = n.indexOf("--"), u = n.lastIndexOf("--"), r = n.substring(f + 2, u - 1)
        } catch (o) {
            r = "", i++
        } else i++; else i++;
        return i == 0
    }, this.getShortIATA = function (n) {
        var r, i, t;
        if (n) {
            if (n.length == 3)return n;
            if ((r = n.indexOf("(")) >= 0)try {
                return i = r, t = n.indexOf(")"), n.substring(i + 1, t)
            } catch (u) {
                return ""
            } else if ((r = n.indexOf("--")) >= 0)try {
                return i = r, t = n.lastIndexOf("--"), n.substring(i + 2, t - 1)
            } catch (u) {
                return ""
            } else if ((r = n.indexOf("%28")) >= 0)try {
                return i = r, t = n.indexOf("%29"), n.substring(i + 3, t)
            } catch (u) {
                return ""
            }
        }
        return ""
    }, this.getShortIATADestinationFromList = function () {
        var i = 0, r = "", e, n, f, u;
        if (t.Destinations != null && t.Destinations != undefined && t.Destinations.length > 0)for (e = 0; e < t.Destinations.length; e++)if (n = t.Destinations[e].toString(), n)if (n.length == 3)r = t.Destination; else if (n.indexOf("(") >= 0)try {
            f = n.indexOf("("), u = n.indexOf(")"), r = n.substring(f + 1, u)
        } catch (o) {
            r = "", i++
        } else if (n.indexOf("--") >= 0)try {
            f = n.indexOf("--"), u = n.lastIndexOf("--"), r = n.substring(f + 2, u - 1)
        } catch (o) {
            r = "", i++
        } else i++; else i++;
        return i == 0
    }, this.PassengersDescription = function () {
        var n = "";
        n += t.Adults, n += " Adultos, ", n += t.Children, n += " Crianças, ", n += t.Baby, n += " Bebê, "
    }, this.getTreatyTime = function (n, t) {
        if (t = t.toLowerCase(), n != undefined && n != null && n != "") {
            var i = undefined;
            return isNaN(n) && (n.indexOf(":") >= 0 ? n = n.split(":")[0] : (n = n.toLowerCase(), n == "madrugada" ? i = r(0, t) : n == "manhã" ? i = r(6, t) : n == "tarde" ? i = r(12, t) : n == "noite" && (i = r(18, t)))), i ? i : h(n, t)
        }
        return undefined
    }, this.getCabinRequest = function () {
        return parseFloat(this.CabinFilter)
    }, this.CreateCityPairRequest = function (n) {
        for (var r = [], t, i = 0; i < this.CiaCodeList.length; i++)this.CiaCodeList[i] != undefined && this.CiaCodeList[i] != "" && this.CiaCodeList[i].length >= 2 && r.push(this.CiaCodeList[i]);
        return t = {
            CiaCodeList: r,
            NonStop: this.NonStop
        }, n ? (t.Origin = this.getShortIATA(this.Origin).toUpperCase(), t.Destination = this.getShortIATA(this.Destination).toUpperCase(), t.Origin == "" && (t.Origin = this.Origin), t.Destination == "" && (t.Destination = this.Destination), t.DepartureYear = this.Dates[0].Year, t.DepartureMonth = this.Dates[0].Month, t.DepartureDay = this.Dates[0].Day, t.StartTime = this.getTreatyTime(this.StartTimeOut, "START"), t.EndTime = this.getTreatyTime(this.EndTimeOut, "END")) : (t.Origin = this.getShortIATA(this.Destination).toUpperCase(), t.Destination = this.getShortIATA(this.Origin).toUpperCase(), t.Origin == "" && (t.Origin = this.Destination), t.Destination == "" && (t.Destination = this.Origin), t.DepartureYear = this.Dates[1].Year, t.DepartureMonth = this.Dates[1].Month, t.DepartureDay = this.Dates[1].Day, t.StartTime = this.getTreatyTime(this.StartTimeIn, "START"), t.EndTime = this.getTreatyTime(this.EndTimeIn, "END")), t
    }, this.CreateCityPairRequestFromList = function (n) {
        var u = [], i = [], r, t;
        if (i = this.CiaCode[n], i != undefined)for (r = 0; r < i.length; r++)i[r] != undefined && i[r] != "" && i[r].length >= 2 && u.push(i[r]);
        return t = {
            CiaCodeList: u,
            NonStop: this.NonStop
        }, t.Origin = this.getShortIATA(this.Origins[n].toString()).toUpperCase(), t.Destination = this.getShortIATA(this.Destinations[n].toString()).toUpperCase(), t.DepartureYear = this.Dates[n].Year, t.DepartureMonth = this.Dates[n].Month, t.DepartureDay = this.Dates[n].Day, t.StartTime = this.getTreatyTime(this.StartTime[n], "START"), t.EndTime = this.getTreatyTime(this.EndTime[n], "END"), t
    }, this.isValidWordOrigin = function () {
        return this.getShortIATA(this.WordOrigin)
    }, this.isValidWordDestin = function () {
        return this.getShortIATA(this.WordDestin)
    }, this.LoadFrom = function (n) {
        n != undefined && (this.Adults = n.Adults, this.AnotherDate = n.AnotherDate, this.AnotherDestination = n.AnotherDestination, this.Baby = n.Baby, this.CabinFilter = n.CabinFilter, this.CabinType = n.CabinType, this.CabinQualifier = n.CabinQualifier, this.CheckIn = n.CheckIn, this.CheckOut = n.CheckOut, this.CheckQueryString = n.CheckQueryString, this.Children = n.Children, this.CiaCode = n.CiaCode, this.CiaCodeList = n.CiaCodeList, this.DataBase = n.DataBase, this.Dates = n.Dates, this.Destination = n.Destination, this.DestinationId = n.DestinationId, this.Destinations = n.Destinations, this.EndTime = n.EndTime, this.EndTimeIn = n.EndTimeIn, this.EndTimeOut = n.EndTimeOut, this.Hotel = n.Hotel, this.IsRoundTrip = n.IsRoundTrip, this.Location = n.Location, this.LocationId = n.LocationId, this.NonStop = n.NonStop, this.Origin = n.Origin, this.OriginId = n.OriginId, this.Origins = n.Origins, this.PointOfSale = n.PointOfSale, this.RoomsRequest = n.RoomsRequest, this.SearchMode = n.SearchMode, this.SearchType = n.SearchType, this.Sources = n.Sources, this.StartTime = n.StartTime, this.StartTimeIn = n.StartTimeIn, this.StartTimeOut = n.StartTimeOut, this.WordDestin = n.WordDestin, this.WordOrigin = n.WordOrigin, this.AdultCount = n.AdultCount, this.AttractionId = n.AttractionId, this.LoadDependencies = n.LoadDependencies)
    }
}
function SearchParametersLocation() {
    thisSearchParameters = this, this.Origin = "", this.Word = "", this.DataBase = "", this.SearchMode = "", this.GetRequestData = function () {
        return {Word: sPalavraErrada, DataBase: 1, SearchMode: 1}
    }
}
function TagsManagerTrack() {
    var n = this;
    this.MasterPriceTrack = function (t) {
        var u = t.Type, r = null;
        u == "Air" ? r = new n.MontaObjRetorno(t, "Air") : u == "Hotel" ? r = new n.MontaObjRetorno(t, "Hotel") : u == "AirHotel" && (r = new n.MontaObjRetorno(t, "AirHotel")), r != null && window.dataLayer.push({
            event: "MasterPage",
            pageType: "search",
            origin: r.Origem,
            dest: r.Destino,
            checkin: n.TagDateFormat(r.DataIda, "DD/MM/YYYY"),
            checkout: r.IdaVolta ? n.TagDateFormat(r.DataVolta, "DD/MM/YYYY") : "",
            "Checkin-ISO-8601": n.TagDateFormat(r.DataIda, "YYYY-MM-DD"),
            "Checkout-ISO-8601": r.IdaVolta ? n.TagDateFormat(r.DataVolta, "YYYY-MM-DD") : ""
        })
    }, this.CheckOutTrack = function (t) {
        t.ShoppingCart.AirItems.length > 0 && t.ShoppingCart.AirHotelItems.length == 0 && window.dataLayer.push({
            origin: t.ShoppingCart.AirItems[0].FlightGroups[0].Origin,
            dest: t.ShoppingCart.AirItems[0].FlightGroups[0].Destination,
            orderPrice: t.Summary.TotalAmount.toString().replace(/\./g, "#").replace(/\,/g, ".").replace(/\#/g, ","),
            striptOrderPrice: t.Summary.TotalAmount.toString().replace(/\,/g, "").replace(/\./g, ""),
            replacedOrderPrice: t.Summary.TotalAmount.toString(),
            striptreplacedOrderPrice: t.Summary.TotalAmount.toString().replace(/\,/g, ""),
            TotalPassangers: t.Summary.Adults + t.Summary.Childs,
            "Checkin-ISO-8601": n.TagDateFormat(new Date(t.ShoppingCart.AirItems[0].FlightGroups[0].FirstArrivalTimeValues.Year, t.ShoppingCart.AirItems[0].FlightGroups[0].FirstArrivalTimeValues.Month - 1, t.ShoppingCart.AirItems[0].FlightGroups[0].FirstArrivalTimeValues.Day), "YYYY-MM-DD"),
            "Checkout-ISO-8601": t.ShoppingCart.AirItems[0].FlightGroups[1] ? n.TagDateFormat(new Date(t.ShoppingCart.AirItems[0].FlightGroups[1].FirstArrivalTimeValues.Year, t.ShoppingCart.AirItems[0].FlightGroups[1].FirstArrivalTimeValues.Month - 1, t.ShoppingCart.AirItems[0].FlightGroups[1].FirstArrivalTimeValues.Day), "YYYY-MM-DD") : "",
            ciaAerea: t.ShoppingCart.AirItems[0].FlightGroups[0].IssuerCiaName
        }), t.ShoppingCart.HotelItems.length > 0 && t.ShoppingCart.AirItems.length == 0 && t.ShoppingCart.AirHotelItems.length == 0 && window.dataLayer.push({
            origin: "",
            dest: t.ShoppingCart.HotelItems[0].Hotel.Location,
            orderPrice: t.Summary.TotalAmount.toString().replace(/\./g, "#").replace(/\,/g, ".").replace(/\#/g, ","),
            striptOrderPrice: t.Summary.TotalAmount.toString().replace(/\,/g, "").replace(/\./g, ""),
            replacedOrderPrice: t.Summary.TotalAmount.toString(),
            striptreplacedOrderPrice: t.Summary.TotalAmount.toString().replace(/\,/g, ""),
            TotalPassangers: t.Summary.Adults + t.Summary.Childs,
            "Checkin-ISO-8601": n.TagDateFormat(new Date(t.ShoppingCart.HotelItems[0].CheckIn.Year, t.ShoppingCart.HotelItems[0].CheckIn.Month - 1, t.ShoppingCart.HotelItems[0].CheckIn.Day), "YYYY-MM-DD"),
            "Checkout-ISO-8601": t.ShoppingCart.HotelItems[0].CheckOut ? n.TagDateFormat(new Date(t.ShoppingCart.HotelItems[0].CheckOut.Year, t.ShoppingCart.HotelItems[0].CheckOut.Month - 1, t.ShoppingCart.HotelItems[0].CheckOut.Day), "YYYY-MM-DD") : ""
        }), t.ShoppingCart.AirHotelItems.length > 0 && t.ShoppingCart.AirItems.length == 0 && t.ShoppingCart.HotelItems.length == 0 && window.dataLayer.push({
            origin: t.ShoppingCart.AirHotelItems[0].FlightGroups[0].Origin,
            dest: t.ShoppingCart.AirHotelItems[0].FlightGroups[0].Destination,
            orderPrice: t.Summary.TotalAmount.toString().replace(/\./g, "#").replace(/\,/g, ".").replace(/\#/g, ","),
            striptOrderPrice: t.Summary.TotalAmount.toString().replace(/\,/g, "").replace(/\./g, ""),
            replacedOrderPrice: t.Summary.TotalAmount.toString(),
            striptreplacedOrderPrice: t.Summary.TotalAmount.toString().replace(/\,/g, ""),
            TotalPassangers: t.Summary.Adults + t.Summary.Childs,
            "Checkin-ISO-8601": n.TagDateFormat(new Date(t.ShoppingCart.AirHotelItems[0].FlightGroups[0].FirstArrivalTimeValues.Year, t.ShoppingCart.AirHotelItems[0].FlightGroups[0].FirstArrivalTimeValues.Month - 1, t.ShoppingCart.AirHotelItems[0].FlightGroups[0].FirstArrivalTimeValues.Day), "YYYY-MM-DD"),
            "Checkout-ISO-8601": t.ShoppingCart.AirHotelItems[0].FlightGroups[1] ? n.TagDateFormat(new Date(t.ShoppingCart.AirHotelItems[0].FlightGroups[1].FirstArrivalTimeValues.Year, t.ShoppingCart.AirHotelItems[0].FlightGroups[1].FirstArrivalTimeValues.Month - 1, t.ShoppingCart.AirHotelItems[0].FlightGroups[1].FirstArrivalTimeValues.Day), "YYYY-MM-DD") : "",
            ciaAerea: t.ShoppingCart.AirHotelItems[0].FlightGroups[0].IssuerCiaName
        }), window.dataLayer.push({event: "Checkout", pageType: "checkout"})
    }, this.MontaObjRetorno = function (n, t) {
        try {
            switch (t) {
                case"Air":
                    this.Origem = getIATA(n.Origin).toUpperCase(), this.Destino = getIATA(n.Destination).toUpperCase(), this.DataIda = new Date(n.Dates[0].Year, n.Dates[0].Month - 1, n.Dates[0].Day), this.DataVolta = n.Dates[1] ? new Date(n.Dates[1].Year, n.Dates[1].Month - 1, n.Dates[1].Day) : "", this.IdaVolta = n.IsRoundTrip ? !0 : !1;
                    break;
                case"AirHotel":
                    this.Origem = getIATA(n.Origin).toUpperCase(), this.Destino = getIATA(n.Destination).toUpperCase(), this.DataIda = new Date(n.CheckIn.Year, n.CheckIn.Month - 1, n.CheckIn.Day), this.DataVolta = n.CheckOut ? new Date(n.CheckOut.Year, n.CheckOut.Month - 1, n.CheckOut.Day) : "", this.IdaVolta = n.IsRoundTrip ? !0 : !1;
                    break;
                case"Hotel":
                    this.Origem = "", this.Destino = stripaccents(n.Location), this.DataIda = new Date(n.CheckIn.Year, n.CheckIn.Month - 1, n.CheckIn.Day), this.DataVolta = new Date(n.CheckOut.Year, n.CheckOut.Month - 1, n.CheckOut.Day), this.IdaVolta = !0
            }
        } catch (i) {
            PublishStringClientError(i)
        }
    }, this.TagDateFormat = function (n, t) {
        try {
            return t = t.replace("DD", (n.getDate() < 10 ? "0" : "") + n.getDate()), t = t.replace("MM", (n.getMonth() < 9 ? "0" : "") + (n.getMonth() + 1)), t = t.replace("YYYY", n.getFullYear())
        } catch (i) {
            PublishStringClientError(i)
        }
        return ""
    }
}
function MasterPricerModel() {
    function h(t) {
        var r, u;
        try {
            n.modelSearchParameter.PointOfSale !== "SUBMARINO" || n.modelSearchParameter.Type !== "Air" || n.modelSearchParameter.MultiDestination || t !== undefined && t.PriceGroups !== undefined && t.PriceGroups.length > 0 && (o === undefined || t.PriceGroups[0].Price < o) && (o = t.PriceGroups[0].Price, t.FlightGroups !== undefined && t.FlightGroups.length > 0 && (r = "id_parceiro=8297", r += "&origem=" + t.FlightGroups[t.PriceGroups[0].CityPairs[0].FlightGroupIndexes[0]].Origin, r += "&destino=" + t.FlightGroups[t.PriceGroups[0].CityPairs[0].FlightGroupIndexes[0]].Destination, r += "&data_ida=" + t.FlightGroups[t.PriceGroups[0].CityPairs[0].FlightGroupIndexes[0]].FirstDepartureTimeValues.Year + f(t.FlightGroups[t.PriceGroups[0].CityPairs[0].FlightGroupIndexes[0]].FirstDepartureTimeValues.Month) + f(t.FlightGroups[t.PriceGroups[0].CityPairs[0].FlightGroupIndexes[0]].FirstDepartureTimeValues.Day), n.modelSearchParameter.IsRoundTrip && (r += "&data_volta=" + t.FlightGroups[t.PriceGroups[0].CityPairs[1].FlightGroupIndexes[0]].FirstDepartureTimeValues.Year + f(t.FlightGroups[t.PriceGroups[0].CityPairs[1].FlightGroupIndexes[0]].FirstDepartureTimeValues.Month) + f(t.FlightGroups[t.PriceGroups[0].CityPairs[1].FlightGroupIndexes[0]].FirstDepartureTimeValues.Day), r += "&cia_volta=" + t.FlightGroups[t.PriceGroups[0].CityPairs[1].FlightGroupIndexes[0]].IssuerCia), r += "&classe=" + t.FlightGroups[t.PriceGroups[0].CityPairs[0].FlightGroupIndexes[0]].CabinType, r += "&tarifa=" + t.PriceGroups[0].Price, r += "&moeda=BRL", r += "&cia_ida=" + t.FlightGroups[t.PriceGroups[0].CityPairs[0].FlightGroupIndexes[0]].IssuerCia, $.post("http://www.submarinoviagens.com.br/tarifas", r, function () {
            })))
        } catch (e) {
            u = getClientIP(), i.invoke("Log", {req: {Message: "IP:" + u + " Problemas na function _callFareNotification: " + e.message}}, undefined, undefined, undefined, function () {
            })
        }
    }

    function f(n) {
        return n.toString().length == 2 ? n : "0" + n
    }

    function s(n, t) {
        var r = n.first(function (n) {
            return n.FriendlyMessage == "Maximum request quota exceeded"
        }), i;
        r && typeof logLibrary != "undefined" && (i = '{"Message":"' + encodeURIComponent("IP: " + t + " - " + r.FriendlyMessage) + '","LineNumber":"' + encodeURIComponent("0") + '","Url":"' + document.URL + '","FilesLoaded":"","ServerIp":"","File":""}', logLibrary.LogEvent("LogClientError", i))
    }

    var n = this, i, t;
    this.modelSearchParameter = null, this.Data = null, this.OnGetSearchStatus = new Event, this.OnSearchEnded = new Event, this.OnSearchEndedAuto = new Event, this.OnFilter = new Event, this.OnResetFilters = new Event, this.OnError = new Event;
    var e = 0, r = 0, u = null, o;
    this.CurrentSearchParameters = undefined, i = new ServiceProxy(PathWebService), this.ResetFilter = function () {
        this.PrepareResetFilter(), n.OnResetFilters.notify(n, n.Data)
    }, this.PrepareResetFilter = function () {
        for (var e = n.Data.PriceGroups, t, r, i, f, u = 0, o = e.length; u < o; u++)for (t = e[u], t.OriginalCityPairs && (t.CityPairs = t.OriginalCityPairs), i = 0, f = t.CityPairs.length; i < f; i++)r = t.CityPairs[i], r.OriginalFlightGroups && (r.FlightGroups = r.OriginalFlightGroups)
    }, this.HasResultsEnoughtToRender = function () {
        var t = !0;
        return t = t && n.Data != null, t = t && n.Data.PriceGroups && n.Data.PriceGroups.length > 0, t = t && n.Data.PriceMatrix && n.Data.PriceMatrix.AirCompanies && n.Data.PriceMatrix.AirCompanies.length > 0
    }, this.GetPriceGroup = function (t) {
        var u = null, i, r;
        if (n.Data.PriceGroups)for (i = 0, r = n.Data.PriceGroups.length; i < r; i++)if (priceGroup = n.Data.PriceGroups[i], priceGroup.GroupingKey == t) {
            u = priceGroup;
            break
        }
        return u
    }, this.GetBuyFlightGroup = function (t, i) {
        for (var e = null, r = undefined, f, u = 0; u < n.Data.PriceGroups.length; u++)if (n.Data.PriceGroups[u].InterfaceIndex == i) {
            r = n.Data.PriceGroups[u];
            break
        }
        if (r && r.CityPairs)for (iCityPair = 0; iCityPair < r.CityPairs.length; iCityPair++)for (f = 0; f < r.CityPairs[iCityPair].FlightGroups.length; f++)if (flightGroup = r.CityPairs[iCityPair].FlightGroups[f], flightGroup.Hash == t) {
            e = flightGroup;
            break
        }
        return JSON2.stringifyWcf(e)
    }, this.FilterDateToNumericTime = function (n) {
        var t = new Date;
        return t.setTime(n), getNumericTime(t)
    }, this.HasResultsEnoughtToRender = function () {
        var t = !0;
        return t = t && n.Data != null, t = t && n.Data.PriceGroups && n.Data.PriceGroups.length > 0, t = t && n.Data.PriceMatrix && n.Data.PriceMatrix.AirCompanies && n.Data.PriceMatrix.AirCompanies.length > 0
    }, this.FilterResults = function (t) {
        var i = {PriceGroups: []}, u, r;
        i.PriceGroups = n.Data.PriceGroups, i.Filter = t, n.OnFilter.notify(n, i), u = i.PriceGroups.length, r = 0, controller.FilterEnded
    }, this.ShowInfoDelay = function (t) {
        i.invoke("GetDelayCancellationInfoFlight", {delayCancellationRQ: t}, n.OnShowInfoDelay, n.onError)
    }, this.OnShowInfoDelay = function (n) {
        controller.GetResultInfoDelay(n)
    }, this.StartSearch = function (t) {
        n.Data = null, this.modelSearchParameter = t, (t.EndTimeIn != undefined && t.EndTimeIn != "" || t.EndTimeIn != undefined && t.EndTimeIn != "" || t.CiaCode[0] != undefined && t.CiaCode[0] != "" || t.CabinFilter != undefined && t.CabinFilter != "") && view.OpenBuscaAvancada(), controller.statusTypeSearch == 1 && (u = null), r == 0 && (r = PAGING_RESULT), i.invoke(Util.GetMethodToInvoke("SearchGroupedFlightsPagingResult"), {
            req: t.GetRequestData(),
            inicio: e,
            fim: r,
            filter: u
        }, n.OnSearchGroupedFlights, n.onError)
    }, this.StartSearchPagingResult = function (t, f, o, s) {
        n.Data = null, this.modelSearchParameter = t, isNaN(f) && (f = 0), e = f, r = o, u = s, controller.statusTypeSearch == 2 && (controller.statusTypeSearch = 3), (t.EndTimeIn != undefined && t.EndTimeIn != "" || t.EndTimeIn != undefined && t.EndTimeIn != "" || t.CiaCode[0] != undefined && t.CiaCode[0] != "" || t.CabinFilter != undefined && t.CabinFilter != "") && view.OpenBuscaAvancada(), i.invoke(Util.GetMethodToInvoke("SearchGroupedFlightsPagingResult"), {
            req: t.GetRequestData(),
            inicio: f,
            fim: o,
            filter: u
        }, n.OnSearchGroupedFlights, n.onError)
    }, t = {SearchId: null, PointOfSale: null}, this.GetSearchStatus = function (r, u) {
        setTimeout(function () {
            t.SearchId = u.SearchId, t.PointOfSale = CurrentPointOfSale, t.UserSessionId = Cookies.getCookie("UserSessionId"), AffiliatedId != 0 && (t.AffiliatedId = AffiliatedId), i.invoke(Util.GetMethodToInvoke("GetSearchStatus"), {
                req: t,
                pullStatusFrom: u.PullStatusFrom
            }, n.OnSearchStatus, n.onError)
        }, r)
    }, this.GetSearchStatusPagingResult = function (u, f, o) {
        setTimeout(function () {
            t.SearchId = f.SearchId, t.PointOfSale = CurrentPointOfSale, t.UserSessionId = Cookies.getCookie("UserSessionId"), r == 0 && (r = 50), AffiliatedId != 0 && (t.AffiliatedId = AffiliatedId), i.invoke(Util.GetMethodToInvoke("GetSearchStatusPagingResult"), {
                req: t,
                pullStatusFrom: f.PullStatusFrom,
                inicio: e,
                fim: r,
                filter: o
            }, n.OnSearchStatus, n.onError)
        }, u)
    }, this.OnSearchGroupedFlights = function (t) {
        if (t.Errors && t.Errors.length > 0)n.onError(t); else t.Status == 0 ? n.GetSearchStatusPagingResult(MilisecondsToDoGetSearchStatus, t, u) : t.Status == 1 && n.OnSearchStatus(t)
    }, this.OnSearchStatus = function (t) {
        t && (t.PriceMatrix && t.PriceMatrix.AirCompanies && t.PriceMatrix.AirCompanies.length > 0 && (n.Data = n.ApplyInterfaceIndex(t), n.FillFlightGroups(t), n.OnGetSearchStatus.notify(n, t), view.ProgressShowBestPrices(), $("#progressInterno1").hide(), $("#CreateHintBoxyDIVFundo").css("backgroundColor", ""), view.RenderPriceGroups(t)), n.Data = t, t.Status == 0 ? n.GetSearchStatusPagingResult(MilisecondsToDoGetSearchStatus, t, u) : (view.ProgressHideBestPrices(), n.Data = n.ApplyInterfaceIndex(t), n.OnSearchEnded.notify(n, t), h(t)))
    }, this.onError = function (t) {
        var f = getClientIP(), r, u;
        if (t.Errors)if (t.Errors.first(function (n) {
                return n.FriendlyMessage == "Maximum request quota exceeded"
            }))s(t.Errors, f); else for (r = 0; r < t.Errors.length; r++)i.invoke("Log", {req: {Message: "IP:" + f + " " + t.Errors[r].FriendlyMessage}}, undefined, undefined, undefined, function () {
        });
        t.InvalidLocation == !0 ? (u = window.document.getElementById("frmBuscaIata"), FieldForm = window.document.getElementById("SearchParameters"), FieldForm.value = JSON2.stringifyWcf(n.modelSearchParameter), u.submit()) : n.OnError.notify(n, t)
    }, this.SendEmailPriceGroup = function (t) {
        n.Data && n.Data.SearchId && (t.TraceId = n.Data.SearchId), i.invoke("SendEmailIndication", {req: t.GetRequestData()}, n.SendEmailPriceGroupSuccess, n.SendEmailPriceGroupSuccess)
    }, this.SendEmailPriceGroupSuccess = function () {
        return
    }, this.SearchLocationAuto = function (t) {
        i.invoke(Util.GetMethodToInvoke("SearchLocations"), {req: t.GetRequestData()}, n.OnSearchLocationAuto, n.onError)
    }, this.OnSearchLocationAuto = function (t) {
        t && (n.Data = t, n.OnSearchEndedAuto.notify(n, t))
    }, this.ApplyInterfaceIndex = function (n) {
        if (n && n.PriceGroups)for (var t = 0; t < n.PriceGroups.length; t++)n.PriceGroups[t].InterfaceIndex = t;
        return n
    }, this.FillFlightGroups = function (n) {
        var i, u, f, t, r, e;
        if (n && n.OptimizedSearch && n.PriceGroups)for (i = 0; i < n.PriceGroups.length; i++) {
            if (u = n.PriceGroups[i], u.CityPairs)for (f = 0; f < u.CityPairs.length; f++)if (t = u.CityPairs[f], t.FlightGroups = [], t.FlightGroupIndexes)for (r = 0; r < t.FlightGroupIndexes.length; r++)e = t.FlightGroupIndexes[r], t.FlightGroups.push(n.FlightGroups[e]);
            n.PriceGroups[i].InterfaceIndex = i
        }
        return n
    }, this.ValidateCountryVisa = function (t, r) {
        n.fg = r, i.invoke("GetCountryHasVisa", {req: t}, n.CountryVisa, n.onError)
    }, this.CountryVisa = function (t) {
        n.fg.HasVisa = t.HasVisa, RenderFlightInfo = TrimPath.parseTemplate(GetHTML("templateFlightInfo")), CreateHintBoxy($(RenderFlightInfo.process(n.fg)), null, !0, "fixed"), $(".btnIATA").tooltip({
            bodyHandler: function () {
                return $(this).siblings(".toolTipTemplate").html()
            }, delay: 0, fade: 250, showURL: !1
        }), $(".showEasterEgg").mouseover(function () {
            $(".easter-egg").toggle()
        })
    }
}
function MasterPricerController(n) {
    function o(n, t) {
        return JSON.stringify(n) === JSON.stringify(t)
    }

    function e(n) {
        n.Location = t.Location, n.RoomsRequest = t.RoomsRequest
    }

    var t, u, f, i, r;
    view = n, model = new MasterPricerModel, thisController = this, t = null, f = new TagsManagerTrack, u = new OmnitureTrack, this.statusTypeSearch = 1, this.sendBlockClickedQTDblocks = function (n) {
        u.sendBlockClickedQTDblocks(n)
    }, this.StartSearch = function (n) {
        thisController.statusTypeSearch = 1, $("#priceGroupsContainer").empty(), $("#topOrderContainer").empty(), $("#bottomOrderContainer").empty(), view.ProgressShow(), t = n, $("#NumberADTs").val(n.Adults), $("#NumberCHDs").val(n.Children), $("#NumberINFs").val(n.Baby), model.OnGetSearchStatus.attach(thisController.RefreshSearch), model.OnSearchEnded.attach(thisController.SearchEnded), model.OnFilter.attach(thisController.FilterEnded), model.OnResetFilters.attach(thisController.ResetFiltersEnded), model.OnError.attach(thisController.SearchError), renderPriceGroup = !1, thisController.SetSearchHistory(n), view.ResetSearchResults(), $("#topOrderContainerPriceGroups").empty(), $("#bottomOrderContainerPriceGroups").empty(), model.StartSearch(n)
    }, this.StartSearchPagingResult = function (n, t, i, r) {
        model.StartSearchPagingResult(n, t, i, r)
    }, this.CookieExpiresIn = 5, this.SetSearchHistory = function (n) {
        var r = GetIATA(n.Origin), i = GetIATA(n.Destination), u = DateValuesToDate(n.Dates[0]).format("dd/mm/yyyy"), t = "";
        n.Dates.length > 1 && (t = DateValuesToDate(n.Dates[1]).format("dd/mm/yyyy")), r != "" && i != "" && Cookies.setCookie("SearchHistory", r + "|" + i + "|" + u + "|" + t, thisController.CookieExpiresIn)
    }, this.ShowInfoDelay = function () {
        model.ShowInfoDelay()
    }, this.ContinueSearch = function (n) {
        view.ProgressShow(), model.OnGetSearchStatus.attach(thisController.RefreshSearch), model.OnSearchEnded.attach(thisController.SearchEnded), model.OnFilter.attach(thisController.FilterEnded), model.OnResetFilters.attach(thisController.ResetFiltersEnded), model.OnError.attach(thisController.SearchError), renderPriceGroup = !1, n.IsValidRequest() && (view.ResetSearchResults(), model.GetSearchStatus(MilisecondsToDoGetSearchStatus, {
            SearchId: serverSearchId,
            PullStatusFrom: serverPullStatusFrom,
            SessionId: serverSessionId
        }))
    }, this.SendEmailPriceGroup = function (n) {
        model.SendEmailPriceGroup(n)
    }, this.ResetFilters = function () {
        model.ResetFilter()
    }, this.ResetFiltersEnded = function (n, t) {
        t && (view.RenderFilters(t), model.Data && model.Data.TotalPriceGroups && (PriceGroupsUC.CurrentPriceGroupQuantity = model.Data.TotalPriceGroups), view.RenderPriceGroups(t))
    }, this.Filter = function (n) {
        model.FilterResults(n), this.SaveFiltersOnCookie(n, t)
    }, this.IsCookieFilterEqualsCurrentSearch = function (n) {
        var i = $.jStorage.get(r);
        return !(n == null) && t.Location == n.Location && Util.compareIgnoringCaseAndAccents(i.Adults, t.Adults) && Util.compareIgnoringCaseAndAccents(i.Children, t.Children) && Util.compareIgnoringCaseAndAccents(i.Baby, t.Baby) && Util.compareIgnoringCaseAndAccents(i.Origin, t.Origin) && Util.compareIgnoringCaseAndAccents(i.Destination, t.Destination) && o(i.Dates, t.Dates)
    }, i = "AirFilter", r = "AirSearch", this.SaveFiltersOnCookie = function (n, t) {
        e(n), $.jStorage.set(i, n), $.jStorage.set(r, t)
    }, this.RetrieveFiltersFromCookie = function () {
        return $.jStorage.get(i)
    }, this.GetBuyFlightGroup = function (n, t) {
        return model.GetBuyFlightGroup(n, t)
    }, this.GetPriceGroup = function (n) {
        return model.GetPriceGroup(n)
    }, this.ValidateCountryVisa = function (n, t) {
        return model.ValidateCountryVisa(n, t)
    }, this.ShowInfoDelay = function (n) {
        return model.ShowInfoDelay(n)
    }, this.GetResultInfoDelay = function (n) {
        view.RenderDelayCancellation(n)
    }, this.FilterEnded = function (n, t) {
        var i, u;
        if (t) {
            model.Data && model.Data.TotalPriceGroups && (PriceGroupsUC.CurrentPriceGroupQuantity = model.Data.TotalPriceGroups), view.RenderPriceGroups(t);
            var f = t.PriceGroups.length, r = 0, i = 0;
            t.PriceGroups.length > 0 && (i = t.PriceGroups[0].Price), r == 0 && (r = i), u = !1, i >= 1e5 && (u = !0), view.FillBestPriceBox(model.Data.TotalPriceGroups, r, u)
        }
    }, this.RefreshSearch = function (n, t) {
        view.ProgressMinimize(), $("#pricematrix_load_gif").show(), $("#pricematrix_BestPrices").hide(), view.RenderMatrix(t), renderPriceGroup && view.RenderPriceGroups(t), $("#pricematrix_BestPrices").show(), $("#pricematrix_load_gif").hide()
    }, this.SearchError = function (n, t) {
        view.ProgressHide();
        try {
            if (typeof t == "string")t.replace("Tempo limite se esgotou para a operação.", "O tempo limite para operação se esgotou. Favor refazer sua busca."), view.ShowMessage(t, "ERRO"); else if (t && t != null) {
                if (t.Errors && t.Errors.length != 0) {
                    var i = "";
                    for (imsg = 0; imsg < t.Errors.length; imsg++)t.Errors[imsg].FriendlyMessage != "" ? i += t.Errors[imsg].FriendlyMessage + "<br>" : t.Errors[imsg].ErrorMessage != "" && (i += t.Errors[imsg].ErrorMessage + "<br>");
                    view.ShowMessage(i, "ERRO")
                }
            } else view.ShowMessage("Ocorreu um erro na tarifação. Favor efetuar a pesquisa novamente.", "ERRO")
        } catch (r) {
            view.ShowMessage("Ocorreu um erro na tarifação. Favor efetuar a pesquisa novamente.", "ERRO"), PublishStringClientError(r)
        }
        view.ProgressHide()
    }, this.SearchEnded = function (n, t) {
        t.PriceGroups ? t.PriceGroups.length > 0 ? (controller.statusTypeSearch == 1 && (view.RenderMatrix(t), view.RenderFilters(t)), view.RenderSearchLabel(t), view.setSessionID(t.SessionId), view.Filter(), view.RenderErrorsVisible(t), view.ProgressHide()) : t.Errors && t.Errors.length > 0 ? thisController.SearchError(n, t) : view.ShowMessage("A busca não retornou resultados. Favor refazer sua pesquisa.", "ALERTA") : t && t != null && t.Errors && t.Errors.length != 0 ? thisController.SearchError(thisController, t) : view.ShowMessage("A busca não retornou resultados. Favor refazer sua pesquisa.", "ALERTA"), view.ProgressHide(), f.MasterPriceTrack(n.modelSearchParameter, t), u.identificaBusca(n.modelSearchParameter, t), serverSearchId = null
    }, this.SearchLocationAuto = function (n) {
        model.OnSearchEndedAuto.attach(thisController.SearchEndedAuto), model.OnError.attach(thisController.SearchError), model.SearchLocationAuto(n)
    }, this.SearchEndedAuto = function (n, t) {
        view.retornoLocation(t)
    }, this.GetFlightGroup = function (n, t) {
        return model.GetFlightGroup(n, t)
    }, this.ShowInfoDelay = function (n) {
        return model.ShowInfoDelay(n)
    }, this.GetResultInfoDelay = function (n) {
        view.RenderDelayCancellation(n)
    }
}
function MasterPricerView() {
    function s() {
        return u.length == 0 && (u = $("#progressInterno1")), u
    }

    function b(n, t, i, r, u) {
        var f = !1;
        return n.MultiDestination ? t == i && (f = !0) : n.IsRoundTrip ? r == u && u == t && (f = !0) : u == t && (f = !0), f ? "" : isB2B() ? "Para finalizar sua compra utilize o 'Escolher este' dos voos que voce selecionou.<br>" : "Para finalizar sua compra utilize o 'COMPRAR' dos voos que voce selecionou.<br>"
    }

    function f() {
        w.length == 0 && (w = $("#remakeSearch_btnSearch")), y.length == 0 && (y = $("#txtDataIda")), l.length == 0 && (l = $("#txtDataVolta")), a.length == 0 && (a = $("#txtOrigem")), h.length == 0 && (h = $("#txtDestino")), i.length == 0 && (i = $("#Matrixbto"))
    }

    var r, o, u;
    thisView = this, controller = new MasterPricerController(this);
    var e = null, n = 1, t = 0, d = 5, nt = 3, g = 0, k = !0, v = "", c = "", p = !1, tt = "";
    $(document).ready(function () {
        var t, n;
        f(), $(".segura-bloco").hide(), $(".campo-passageiros").css("margin-top", "5px"), $(".passagem_off_sub").addClass("passagem_on_sub"), $(".passagem_on_sub").removeClass("passagem_off_sub"), $(".busca-avancada").show(), thisView.ProgressHide(), PreviousMatrixCiaAreas = [], AirMotorUC.Initialize(), AirMotorUC.OnSearch = thisView.PrepareSearch, AirMotorUC.OnSearchLocationComplete = thisView.searchLocationComplete, PriceGroupsUC.OnBuy = thisView.Buy, PriceGroupsUC.CurrentLimitPriceGroup = PAGING_RESULT, PriceGroupsUC.PreviousLimitPriceGroup = PriceGroupsUC.CurrentLimitPriceGroup, PreviousMatrixCiaAreas = [], QueryString("Origem") ? (t = new SearchParameters("Air"), t.CheckQueryString = !0, t.LoadParameters(), controller.StartSearch(t)) : serverSearchId != undefined && serverSearchId != null && serverSearchId != "" && (n = new SearchParameters("Air"), n.CheckQueryString = !0, n.LoadParameters(), controller.ContinueSearch(n)), v = $("#tooltip_matrix_maximizar").html(), c = $("#tooltip_matrix_maximizar").html(), i.tooltip({
            bodyHandler: function () {
                return c
            }, delay: 0, fade: 250, showURL: !1
        }), $("strong.iataTitle").click(function () {
            $(this).siblings().focus()
        }), AirFilterUC.OnDoFilter = thisView.Filter, AirFilterUC.OnDoFilterStarted = thisView.FilterStarted, AirFilterUC.OnDoReset = thisView.ResetFilters, thisView.isResetSearch = !0
    }), this.FilterStarted = function () {
        controller.statusTypeSearch = 2
    }, this.PrepareSearch = function () {
        PriceGroupsUC.CurrentLimitPriceGroup = PAGING_RESULT, PriceGroupsUC.PreviousLimitPriceGroup = PriceGroupsUC.CurrentLimitPriceGroup, PreviousMatrixCiaAreas = [], thisView.RemakeSearch()
    }, this.toggleMatrix = function (n, t) {
        f(), toggleAnimateDIV(this, t);
        var r = "";
        i.removeClass(), $(n).attr("State") == "Menos" ? (i.addClass("bto_mais"), $(n).attr("State", "Mais"), r = v) : $(n).attr("State") == "Mais" && (i.addClass("bto_menos"), $(n).attr("State", "Menos"), r = c), i.tooltip({
            bodyHandler: function () {
                return r
            }, delay: 0, fade: 250, showURL: !1
        })
    }, this.RemakeSearch = function () {
        if (thisView.HideMessage(), AirMotorUC.SearchRules()) {
            RemakeSearchInitialPosition == "relative" && isB2B() ? CloseHintBoxy("remakeSearch") : RemakeSearchInitialPosition == "bottom" && isB2B() && thisView.CloseRemakeSearch();
            var n = new SearchParameters("Air");
            n.LoadParameters(), n.IsValidOriginDestination() ? n.IsValidTextByIATAOriginsAndDestinations() ? (serverSearchId = null, controller.StartSearch(n)) : thisView.ShowMessage("As IATAS de Origem e Destino não podem conter caracteres especiais.", "ALERTA") : thisView.ShowMessage("As IATAS de Origem e Destino são inválidas, Favor verificar.", "ALERTA")
        }
    }, this.OpenBuscaAvancada = function () {
        $(".segura-bloco").fadeIn("slow"), $(".busca-avancada").hide()
    }, this.navigateSearchDate = function (n, t, i, r) {
        var u, e, o;
        f(), u = new SearchParameters("Air"), u.LoadParameters(), e = Clone_Object(AirMotorUC.OptionDatePicker), o = $("#" + i), t.toUpperCase() == "IDA" ? (o.val(DateValuesToDate(u.Dates[0]).format("dd/mm/yyyy")), u.Dates[1] && (e.maxDate = DateValuesToDate(u.Dates[1]))) : t.toUpperCase() == "VOLTA" ? (o.val(DateValuesToDate(u.Dates[1]).format("dd/mm/yyyy")), e.minDate = DateValuesToDate(u.Dates[0])) : t.toUpperCase().indexOf("TRECHO") >= 0 && (o.val(DateValuesToDate(u.Dates[r]).format("dd/mm/yyyy")), e.minDate = r > 0 ? DateValuesToDate(u.Dates[r - 1]) : DateValuesToDate(u.Dates[r])), e.onSelect = function (n) {
            var u = new SearchParameters("Air"), f;
            u.LoadParameters(), serverSearchId = null, f = StringToDateValues(n), t.toUpperCase() == "IDA" ? u.Dates[0] = f : t.toUpperCase() == "VOLTA" ? u.Dates[1] = f : t.toUpperCase().indexOf("TRECHO") >= 0 && (u.Dates[r] = f, e.minDate = r > 0 ? DateValuesToDate(u.Dates[r - 1]) : DateValuesToDate(u.Dates[r])), AirMotorUC.SetValues(u), u.ForceSearch = !0, controller.StartSearch(u)
        }, o.datepicker(e).datepicker("option", "currentText", "Mes Atual").datepicker("option", "showCurrentAtPos", 1).datepicker("option", "showButtonPanel", !0).datepicker("show")
    }, this.ResetSearchResults = function () {
        $("#pricematrix_Container").hide(), $("#pricematrix_ColumnsContainer").empty(), $("#priceGroupsContainer").empty(), $("#filtersContainer").empty(), $("#btnBestPriceNoStop").text(""), $("#btnBestPriceOneStop").text(""), $("#btnBestPriceTwoStop").text(""), $("#btnBack").hide(), $("#btnSeeMore").hide(), $("#tooltip").hide(), $("#spnOrigin").text(""), $("#spnDestination").text(""), $("#spnPassengers").text(""), $("#spnDateTimeOutBound").text(""), $("#spnDateTimeInBound").text("")
    }, r = undefined, this.RenderDelayCancellation = function (n) {
        var i, t;
        if (n != null && n != undefined) {
            for (RenderFlightInfo = TrimPath.parseTemplate(GetHTML("TemplateDelayCancellationInfo")), i = new Date, i.setMonth(i.getMonth() - 1), n.date = i.format("mm/yyyy"), t = 0; t < n.DelayCancellationInfos.length; t++)n.DelayCancellationInfos[t].msg = n.DelayCancellationInfos[t].Id != null && n.DelayCancellationInfos[t].Id > 0 ? "" : "Não existe histórico recente de percentuais de atrasos e cancelamentos para esta etapa do voo selecionado.";
            CreateHintBoxy($(RenderFlightInfo.process(n)), null, !0, "fixed"), $(".btnIATA").tooltip({
                bodyHandler: function () {
                    return $(this).siblings(".toolTipTemplate").html()
                }, delay: 0, fade: 50, showURL: !1
            }), $(".showEasterEgg").mouseover(function () {
                $(".easter-egg").toggle()
            })
        }
    }, this.RenderMatrix = function (i) {
        var f, u, h, e, o, s;
        if (i.PriceMatrix && (r || (r = TrimPath.parseTemplate(GetHTML("templateMatrix"))), i.PriceMatrix.AirCompanies)) {
            for (n = 1, $("#pricematrix_Container").show(), t = 0, thisView.RenderBestPrices(i), f = $("#pricematrix_ColumnsContainer"), f.empty(), u = 0, h = i.PriceMatrix.AirCompanies.length; u < h; u++)e = i.PriceMatrix.AirCompanies[u], e.InBlackList || (o = $(r.process(e)), f.append(o), o.show(), t = t + 1);
            f.append("<div style='clear:both' />"), navigator.appName == "Microsoft Internet Explorer" && thisView.MatrixCollumnInterfaceController(n, t), t > 4 ? $("#btnSeeMore").show() : $("#btnSeeMore").hide(), s = $("#toolTipCombo").html(), $(".ComboHeader").tooltip({
                bodyHandler: function () {
                    return s
                }, delay: 0, fade: 250, showURL: !1
            }), $(".matrixCell").each(function () {
                var n = $(this);
                n.next().hasClass("toolTipTemplate") && n.tooltip({
                    bodyHandler: function () {
                        return $(this).next().html()
                    }, delay: 0, fade: 250, showURL: !1
                })
            })
        }
    }, this.RenderPriceGroups = function (n) {
        n.PriceGroups && ($("#priceGroupsContainer").empty(), n.PriceGroups.length > 0 ? (thisView.HideMessage(), PriceGroupsUC.TotalPriceGroups = n.TotalPriceGroups, PriceGroupsUC.Render(n.PriceGroups), thisView.showMsgToolTip()) : n.Status == 1 && (thisView.ProgressHide(), thisView.ShowMessage("A busca não retornou resultados. Limpe o filtro ou refaça sua pesquisa.", "ALERTA")))
    }, o = undefined, this.RenderFilters = function (n) {
        if (n.AirFiltersData) {
            var i = controller.RetrieveFiltersFromCookie();
            controller.IsCookieFilterEqualsCurrentSearch(i) ? AirFilterUC.Render(n) : AirFilterUC.Render(n), o = n.AirFiltersData
        }
    }, this.ResetFilters = function () {
        AirFilterUC.HasFilter ? (AirFilterUC.Render({AirFiltersData: o}), thisView.isResetSearch && (thisController.statusTypeSearch = 2), thisView.Filter(), AirFilterUC.HideClearLink()) : thisView.ShowMessage("Nenhuma opção havia sido alterada.", "ALERTA"), AirFilterUC.HasFilter = !1
    }, this.ShowMore = function () {
        var t = $("div[id^=tdGroup]");
        t.each(function () {
            lastPriceGroup = $(this)[0].id
        }), PriceGroupsUC.PreviousLimitPriceGroup = PriceGroupsUC.CurrentLimitPriceGroup, PriceGroupsUC.CurrentLimitPriceGroup += PriceGroupsUC.CurrentLimitPriceGroup > QuantityToShowMore ? OtherShowMore : FirstShowMore, setTimeout(function () {
            thisView.Filter(lastPriceGroup)
        }, 0)
    }, this.ShowFAQ = function (n, t) {
        return t.toUpperCase() != "SUBMARINO" && (CreateHintBoxy($("#divFAQ" + n), null, !0, "absolute"), window.scrollTo(0, 0)), !1
    }, this.ShowAviso100MilPontos = function () {
        if ((CurrentPointOfSale == "BRADESCO" || CurrentPointOfSale == "AMEX") && showB2BNotify)return !1
    }, this.ShowComparePontosAmex = function () {
        this.fecharModalAviso100MilPontos(), this.ShowFAQ("COMPARE")
    }, this.HideMessage = function () {
        $("#erro").hide(), $("#alerta").hide()
    }, this.ShowMessage = function (n, t) {
        return thisView.HideMessage(), n == undefined || n == null || n == "" ? !0 : (t == undefined && (t = "erro"), n.ReplaceStringMessage(CurrentPointOfSale), t = t.toLowerCase(), t != "erro" && t != "alerta" && (t = "erro"), t == "erro" ? n = "<p><strong>ERRO:</strong><br />" + n : t == "alerta" && (n = "<p><strong>IMPORTANTE:</strong><br />" + n), n = n + "</p>", n = n.replace("Tempo limite se esgotou para a operação.", "O tempo limite para operação se esgotou. Favor refazer sua busca."), $("#" + t.toLowerCase()).html(n).show(), window.scrollTo(0, 0), !1)
    }, this.ShowFlights = function (n, t) {
        CreateHintBoxy($("#" + t), null, !0, "fixed")
    }, this.ShowInfo = function (n, t) {
        var f = undefined, r = controller.GetPriceGroup(n), i = undefined, u;
        if (r.CityPairs)for (iCityPair = 0; iCityPair < r.CityPairs.length; iCityPair++)for (u = 0; u < r.CityPairs[iCityPair].FlightGroups.length; u++)if (flightGroup = r.CityPairs[iCityPair].FlightGroups[u], flightGroup.Hash == t) {
            i = flightGroup;
            break
        }
        i != null && i != undefined && (f || (f = TrimPath.parseTemplate(GetHTML("templateFlightInfo"))), i.HashPriceGroup = n, CreateHintBoxy($(f.process(i)).html(), null, !1, "fixed"), $(".btnIATA").tooltip({
            bodyHandler: function () {
                return $(this).siblings(".toolTipTemplate").html()
            }, delay: 0, fade: 250, showURL: !1
        }), $(".showEasterEgg").mouseover(function () {
            $(".easter-egg").toggle()
        }))
    }, this.ShowInfoTerrainPath = function (n, t, i, r, u) {
        CreateHintBoxy($("#divTerrainPath"), null, !0, "fixed"), $("#dvContinue").unbind("click"), $("#dvContinue").click(function () {
            thisView.Buy(n, t, i, r, u)
        })
    }, this.ShowInfoAMEX = function (n, t) {
        CreateHintBoxy($("#" + t), null, !0, "fixed"), $(".btnIATA").tooltip({
            bodyHandler: function () {
                return $(this).siblings(".toolTipTemplate").html()
            }, delay: 0, fade: 250, showURL: !1
        })
    }, this.RenderSearchLabel = function (n) {
        if (n) {
            var t = "";
            if (n.SearchSummary.AirSummary.Adults > 0 && (t += " Adulto(s): " + n.SearchSummary.AirSummary.Adults), n.SearchSummary.AirSummary.Children > 0 && (t += " Criança(s): " + n.SearchSummary.AirSummary.Children), n.SearchSummary.AirSummary.Infanty > 0 && (t += " Bebê(s): " + n.SearchSummary.AirSummary.Infanty), $("#spnOrigin").text(n.SearchSummary.AirSummary.Origin), $("#spnDestination").text(n.SearchSummary.AirSummary.Destin), $("#spnPassengers").text(t), $("#spnDateTimeOutBound").text(FormatSimpleDateValues(n.SearchSummary.AirSummary.OutboundDateValues)), n.SearchSummary.AirSummary.TypeTrip == 2) {
                try {
                    $("#spnDateTimeInBound").text(FormatSimpleDateValues(n.SearchSummary.AirSummary.InboundDateValues))
                } catch (i) {
                    $("#spnDateTimeInBound").text(""), PublishStringClientError(i)
                }
                $("#spnBack").show()
            } else $("#spnBack").hide()
        }
    }, this.RenderBestPrices = function (n) {
        var r = 0, u = 0, i = 0, h = "", s = "", c = "", t;
        if (n)for (iPriceMatrix = 0; iPriceMatrix < n.PriceMatrix.AirCompanies.length; iPriceMatrix++)for (iCell = 0; iCell < n.PriceMatrix.AirCompanies[iPriceMatrix].Cells.length; iCell++)n.PriceMatrix.AirCompanies[iPriceMatrix].InBlackList || (t = n.PriceMatrix.AirCompanies[iPriceMatrix].Cells[iCell], t.Type == 0 && t.Price > 0 && (t.Price < r || r == 0) && (r = t.Price, h = t.Message), t.Type == 1 && t.Price > 0 && (t.Price < u || u == 0) && (u = t.Price, s = t.Message), t.Type == 2 && t.Price > 0 && (t.Price < i || i == 0) && (i = t.Price, c = t.Message));
        var e = $("#btnBestPriceNoStop"), f = $("#btnBestPriceOneStop"), o = $("#btnBestPriceTwoStop");
        r > 0 ? (CurrencyPrefixed ? e.text(CurrentCurrencyFormat + r.FormatCurrency()) : e.text(FormatDecimalPointsB2B(r) + CurrentCurrencyFormat), e.unbind().click(function () {
            thisView.FilterByPrice(r)
        }), e.fadeIn(1e3)) : e.text("").unbind(), u > 0 ? (CurrencyPrefixed ? f.text(CurrentCurrencyFormat + u.FormatCurrency()) : f.text(FormatDecimalPointsB2B(u) + CurrentCurrencyFormat), f.unbind().click(function () {
            thisView.FilterByPrice(u)
        }), f.fadeIn(1e3)) : f.text("").unbind(), i > 0 ? (CurrencyPrefixed ? o.text(CurrentCurrencyFormat + i.FormatCurrency()) : o.text(FormatDecimalPointsB2B(i) + CurrentCurrencyFormat), o.unbind().click(function () {
            thisView.FilterByPrice(i)
        }), o.fadeIn(1e3)) : o.text("").unbind(), $("#tdMessageNoStop").text(h), $("#tdMessageOneStop").text(s), $("#tdMessageTwoStop").text(c), h != "" && $(".spanBestPriceNoStop").tooltip({
            bodyHandler: function () {
                return $(this).next().html()
            }, delay: 0, fade: 250, showURL: !1
        }), s != "" && $(".spanBestPriceOneStop").tooltip({
            bodyHandler: function () {
                return $(this).next().html()
            }, delay: 0, fade: 250, showURL: !1
        }), c != "" && $(".spanBestPriceTwoStop").tooltip({
            bodyHandler: function () {
                return $(this).next().html()
            }, delay: 0, fade: 250, showURL: !1
        })
    }, u = [], this.ProgressShowBestPrices = function () {
        isB2B() ? $("#titulo-melhores-condicoes").hide() : $("#pricematrix_BestPrices").hide(), $("#pricematrix_load_gif").show()
    }, this.ProgressHideBestPrices = function () {
        isB2B() ? $("#titulo-melhores-condicoes").show() : $("#pricematrix_BestPrices").show(), $("#pricematrix_load_gif").hide()
    }, this.ProgressShow = function () {
        var n = s();
        CreateHintBoxy(n)
    }, this.ProgressHide = function () {
        var n = s();
        CloseHintBoxy(n.attr("id"))
    }, this.ProgressMinimize = function () {
        var i = s(), r = i.attr("lockPosition"), n, t;
        r || renderPriceGroup || (n = 0, t = 0, self.innerHeight ? (n = self.innerWidth, t = self.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (n = document.documentElement.clientWidth, t = document.documentElement.clientHeight) : document.body && (n = document.body.clientWidth, t = document.body.clientHeight))
    }, this.RemakeSearchPagingResult = function (n, t, i) {
        var r;
        e == null && (r = new SearchParameters("Air"), r.LoadParameters(), e = r), r = new SearchParameters("Air"), r.LoadParameters(), e = r, controller.statusTypeSearch = 2, controller.StartSearchPagingResult(e, n, t, i)
    }, this.Filter = function (n) {
        n || (AirFilterUC.Load(), AirFilterUC.HasFilter = !0, thisView.isResetSearch = !0, AirFilterUC.ShowClearLink(), controller.statusTypeSearch == 2 ? thisView.RemakeSearchPagingResult(0, PAGING_RESULT, AirFilterUC.LoadFiltersData()) : controller.Filter(AirFilterUC)), ScrollToElement(n)
    }, this.MatrixLeft = function () {
        if (n <= t - 4) {
            var i = "-" + $(".pricematrix_column_AirCompany").width() * n;
            n++, navigator.appName == "Microsoft Internet Explorer" && thisView.MatrixCollumnInterfaceController(n, t), $(".pricematrix_column_AirCompany").animate({left: i}, 500, "easeOutExpo"), $("#btnBack").show(), n == t - 3 && $("#btnSeeMore").hide(500)
        }
    }, this.MatrixRight = function () {
        if (n != 1) {
            n--;
            var i = "-" + ($(".pricematrix_column_AirCompany").width() * n - $(".pricematrix_column_AirCompany").width());
            navigator.appName == "Microsoft Internet Explorer" && thisView.MatrixCollumnInterfaceController(n, t), $(".pricematrix_column_AirCompany").animate({left: i}, 500, "easeOutExpo"), $("#btnSeeMore").show(500), n == 1 && $("#btnBack").hide(500)
        }
    }, this.MatrixCollumnInterfaceController = function (n, t) {
        for (var r = n - 1, f = r + 3, u = $(".pricematrix_column_AirCompany"), i = 0; i < t; i++)i >= r && i <= f ? $(u[i]).css("visibility", "visible") : $(u[i]).css("visibility", "hidden")
    }, this.FilterSincronizeInterface = function (n) {
        $(".chkFilterAirCompany").each(function () {
            for (iCiaCode = 0; iCiaCode < n.CiaCodes.length; iCiaCode++)this.value == n.CiaCodes[iCiaCode] ? $(this).attr("checked", "checked") : $(this).attr("checked", "")
        })
    }, this.FilterByPrice = function (n) {
        thisView.isResetSearch = !1, thisView.ResetFilters(), AirFilterUC.Load(), AirFilterUC.MinPrice = n, AirFilterUC.MaxPrice = n, AirFilterUC.HasFilter = !0, view.FilterSincronizeInterface(AirFilterUC), thisView.RemakeSearchPagingResult(0, PAGING_RESULT, AirFilterUC.LoadFiltersData())
    }, this.ProgressShowModal = function () {
        view.ProgressShow(), $("#progressInterno1").hide(), $("#CreateHintBoxyDIVFundo").css("backgroundColor", "")
    }, this.FilterByAirCompany = function (n) {
        view.ProgressShowBestPrices(), view.ProgressShowModal(), $("#topOrderContainerPriceGroups").empty(), $("#bottomOrderContainerPriceGroups").empty(), thisView.isResetSearch = !1, thisView.ResetFilters(), AirFilterUC.Load(), AirFilterUC.CiaCodes = [], AirFilterUC.CiaCodes.push(n), AirFilterUC.HasFilter = !0, view.FilterSincronizeInterface(AirFilterUC), thisView.RemakeSearchPagingResult(0, PAGING_RESULT, AirFilterUC.LoadFiltersData())
    }, this.OpenRemakeSearch = function (n) {
        CreateHintBoxy($("#remakeSearch"), n, !1, "absolute", !0, !0), AirMotorUC.SearchRules(n), $("#ui-datepicker-div").css("z-index", "1001"), $("#remakeSearch").css("z-index", "999"), $("#div_fechar").css("display", "block")
    }, this.CloseRemakeSearch = function () {
        CloseHintBoxy("remakeSearch"), oDiv = window.document.getElementById("remakeSearch"), $(oDiv).show().css("display", "block").css("visibility", "visible").css("position", "static"), window.document.getElementById("remakeSearchContainer").appendChild(oDiv), $("#div_fechar").css("display", "none")
    }, this.Buy = function (n, t, i, r, u) {
        var y = "", h = "", o = "", lt, ut, rt, it = "", p = [], ot = !1, ct = !1, et = !1, f, a, st, c, l, v, k, w, tt, d, ft, s, e;
        if (typeof u == "undefined" && (u = !0), f = new SearchParameters("Air"), f.LoadParameters(), a = undefined, st = undefined, f.MultiDestination) {
            if (f.Origins && f.Origins.length > 0) {
                for (e = 0; e < f.Origins.length; e++)$(".rdoFlight" + e + ":checked").each(function () {
                    p[e] = this.value, lt = $(this).attr("Price"), ot = $(this).attr("hasterrainpath")
                });
                it = "Multi"
            }
        } else it = f.IsRoundTrip ? "RoundTrip" : "OneWay", t.parents("div.price-group").find(".rdoFlight0:checked").each(function () {
            var t = $(this);
            y = this.value, ut = t.attr("Price"), ct = $(this).attr("hasterrainpath"), a = t.attr("IndicePriceGroup")
        }), t.parents("div.price-group").find(".rdoFlight1:checked").each(function () {
            var t = $(this);
            h = this.value, rt = t.attr("Price"), et = $(this).attr("hasterrainpath"), st = t.attr("IndicePriceGroup")
        });
        o += b(f, n, lt, rt, ut), o.length > 0 && (c = CurrentPointOfSale == "BRADESCO" || CurrentPointOfSale == "AMEX" ? t.parents()[0].id : t.parents()[1].id, $(".warning_msg").hide(), ut == undefined ? (l = $("#MsgAlertIda-" + c), l.show()) : (l = $("#MsgAlertIda-" + c), l.hide()), rt == undefined ? (v = $("#MsgAlertVolta-" + c), v.show()) : (v = $("#MsgAlertVolta-" + c), v.hide()));
        var ht = 0, nt = 0, g = [];
        if (f.MultiDestination) {
            for (e = 0; e < f.Origins.length; e++)(p[e] == undefined || p[e].toString() == "") && (nt++, g.push(e));
            if (nt > 0)for (o = nt == 1 ? o + "Selecione Opção no seguinte Trecho: <br>" : o + "Selecione Opções nos seguintes Trechos: <br>", k = 0; k < g.length; k++)ht = g[k] + 1, o = o + "Trecho " + ht + "<br>"
        } else $(".rdoFlight1").length > 0 && h == "" && y == "" ? o = o + "Selecione o trecho de ida e volta para continuar.<br>" : ($(".rdoFlight1").length > 0 && h == "" && (o = o + "Selecione o trecho de volta para continuar.<br>"), y == "" && (o = o + "Selecione o trecho de ida para continuar.<br>"));
        if (thisView.ShowMessage(o, "ALERTA")) {
            if (w = [], f.MultiDestination)for (e = 0; e < f.Origins.length; e++)w.push(controller.GetBuyFlightGroup(p[e], r)); else tt = controller.GetBuyFlightGroup(y, a), h != undefined && h != null && h != "" && (d = controller.GetBuyFlightGroup(h, a), d.FirstDepartureTime < tt.FirstDepartureTime && (o = o + "Obrigatorio selecionar a volta com um horario maior que a ida para finalizar a compra<br>"));
            if (thisView.ShowMessage(o, "ALERTA")) {
                if ((ot == "true" || ct == "true" || et == "true") && u) {
                    thisView.ShowInfoTerrainPath(n, t, i, r, !1);
                    return
                }
                if (ft = window.document.getElementById("frmBuy"), FieldForm = window.document.getElementById("TravelEngineSessionID"), FieldForm.value = $("#TravelEngineSessionID").val(), FieldForm = window.document.getElementById("PurchasedPrice"), FieldForm.value = n, FieldForm = window.document.getElementById("SearchQuery"), FieldForm.value = f.GetQueryString() + "&AdvantagesUserToken=" + AdvantagesUserToken + "&AdvantagesCampaignId=" + AdvantagesCampaignId, FieldForm = window.document.getElementById("FlightGroups"), f.MultiDestination) {
                    for (s = "", e = 0; e < w.length; e++)s = s + "," + w[e];
                    s = s.substr(1, s.length - 1), FieldForm.value = "[" + s + "]"
                } else FieldForm.value = "[" + tt + "," + d + "]";
                FieldForm = window.document.getElementById("AdvantagesData"), FieldForm.value = AdvantagesUserToken && AdvantagesUserToken != "" ? JSON2.stringifyWcf({
                    UserToken: AdvantagesUserToken,
                    CampaignId: AdvantagesCampaignId
                }) : "null", FieldForm = window.document.getElementById("TripType"), FieldForm.value = f.MultiDestination.toString(), FieldForm = window.document.getElementById("AirType"), FieldForm.value = it.toString(), FieldForm = window.document.getElementById("hOrigem"), FieldForm.value = f.GetRequestData().SearchData.AirSearchData.CityPairsRequest[0].Origin, FieldForm = window.document.getElementById("hDestino"), FieldForm.value = f.GetRequestData().SearchData.AirSearchData.CityPairsRequest[0].Destination, $("#NumberADTs").val(f.Adults), $("#NumberCHDs").val(f.Children), $("#NumberINFs").val(f.Baby), controller.sendBlockClickedQTDblocks(t), ft.submit()
            }
        }
    }, this.PrintPriceGroup = function (n) {
        var t = controller.GetPriceGroup(n), i;
        t && t != null && (i = window.document.getElementById("frmPrint"), FieldForm = window.document.getElementById("PriceGroupPrint"), FieldForm.name = "PriceGroupPrint", FieldForm.value = JSON2.stringifyWcf(t), i.submit())
    }, this.setSessionID = function (n) {
        $("#TravelEngineSessionID").val(n)
    }, this.LoadFlightGroupList = function (n) {
        listaFli = [];
        var r = $("." + n.replace(/\./g, "\\.")), t = r.find(".rdoFlight0:checked").val(), i = r.find(".rdoFlight1:checked").val();
        return $("#chkSomenteIda").is(":checked") ? t != undefined && listaFli.push(t) : t != "" && t != null && i != "" && i != null && (listaFli.push(t), listaFli.push(i)), listaFli
    }, this.LoadSendEmail = function () {
        var n = new RecomendationEmail, t = 0, u, i, r;
        for (n.NameSender = $("#txtNomeRemSendEmail").val(), n.EmailSender = $("#txtEmailRemSendEmail").val(), n.Origin = $("#spnOrigin").text(), n.Destin = $("#spnDestination").text(), n.DepartureOutBoundDate = $("#txtSendEmailDepartureOutBoundDate").val(), n.DepartureInBoundDate = $("#txtSendEmailDepartureInBoundDate").val(), n.Price = $("#txtSendEmailPrice").val(), (isNaN(n.Price) || n.Price == "") && (n.Price = 0), n.Message = $("#txtMensagem").val(), u = $("#txtSendEmailhashPriceGroup").val(), n.PriceGroup = controller.GetPriceGroup(u), n.ListaHashFlightGroup = this.LoadFlightGroupList(u), n.Passengers = $("#spnPassengers").text(), n.SalesChannel = new SalesChannel(CurrentPointOfSale), i = this.LoadCookie("AffiliatedId"), n.AffiliatedId = i == "" && i != null ? 0 : i, n.NumberADTs = $("#NumberADTs").val(), n.NumberCHDs = $("#NumberCHDs").val(), n.NumberINFs = $("#NumberINFs").val(); ;) {
            if (window.document.getElementById("txtNomeDesSendEmail" + t) == null)break;
            r = new RecomendationAddres, r.Name = $("#txtNomeDesSendEmail" + t).val(), r.Email = $("#txtEmailDesSendEmail" + t).val(), n.Recipients.push(r), t = t + 1
        }
        return n
    }, this.LoadCookie = function (n) {
        return document.cookie.length > 0 && (c_start = document.cookie.indexOf(n + "="), c_start != -1) ? (c_start = c_start + n.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
    }, this.OpenPopSendEmailPriceGroup = function (n, t, i, r) {
        $("#txtSendEmailDepartureOutBoundDate").val(t), $("#txtSendEmailDepartureInBoundDate").val(i), $("#txtSendEmailPrice").val(r), $("#txtSendEmailhashPriceGroup").val(n);
        var u = this.LoadCookie("AffiliatedId");
        u > 0 && ($("#EscondeRemetenteParaAfiliado").hide(), $("#mensagem").hide()), $("#txtNomeRemSendEmail").val(""), $("#txtEmailRemSendEmail").val(""), $("#txtNomeDesSendEmail0").val(""), $("#txtEmailDesSendEmail0").val(""), $("#txtMensagem").val(""), $("#msgSendEmail").empty(), CreateHintBoxy($("#SendEmail"), null, !0, "fixed")
    }, this.SendEmailPriceGroup = function () {
        var i = this.LoadCookie("AffiliatedId"), t = thisView.LoadSendEmail(), n = t.getMessageValidation(i);
        n == undefined || n == "" ? (controller.SendEmailPriceGroup(t), CloseHintBoxy("SendEmail")) : $("#msgSendEmail").html(n)
    }, this.showMsgToolTip = function () {
        $("img[title]").tooltip({showURL: !1, extraClass: "cssToolTipCias", fade: 250})
    }, this.searchLocationComplete = function () {
        word = $(this).val(), word.length >= 3 && thisView.SearchLocationAuto(word)
    }, this.SearchLocationAuto = function (n) {
        sPalavraErrada = n;
        var t = thisView.LoadSearchParametersLocation();
        controller.SearchLocationAuto(t)
    }, this.LoadSearchParametersLocation = function () {
        var n = new SearchParametersLocation;
        return n.Word = sPalavraErrada, n.DataBase = 1, n.SearchMode = 1, n
    }, this.retornoLocation = function (n) {
        f(), thisView.carregarIatasCities(n), h.autocomplete(cities), $("#txtOrigem").autocomplete(cities)
    }, this.carregarIatasCities = function (n) {
        for (var t = 0; t < n.Locations.length; t++)n.Locations[t].Name != null && n.Locations[t].H2WCountryName != null && n.Locations[t].IATA != null && (thisView.isLocationAdd(word) || cities.push(word + " - " + n.Locations[t].Name + " / " + n.Locations[t].H2WCountryName + " (" + n.Locations[t].IATA + ")"))
    }, this.isLocationAdd = function (n) {
        for (var i = !1, r = "", t = 0; t < cities.length; t++)if (r = cities[t].split(" - "), $.trim(n) == $.trim(r[0])) {
            i = !0;
            break
        }
        return i
    };
    var y = [], l = [], a = [], h = [], i = [], w = [];
    this.FillBestPriceBox = function (n, t, i) {
        var e = $("#lblActualNumberOfHotels"), o = $("#lblNumberOfHotels"), u = 9999, r, f;
        $("#selCabin").val() != "" && (u = $("#selCabin").val()), e.text(n), r = $("#lblMinPrice"), r.text(isB2B() ? FormatDecimalPointsB2B(Math.ceil(t)) : FormatPriceSlider(t)), isB2B() && r.append("<span style='font-size:16pt;'>&nbsp;pts</span>"), f = r.text().replaceAll(" ", "").length, f >= 10 ? r.addClass("tamanho-valor-menor-preco") : r.removeClass("tamanho-valor-menor-preco"), i == !0 && p == !1 && u != "2" && this.ShowAviso100MilPontos()
    }, this.fecharModalAviso100MilPontos = function () {
        p = !0, CloseHintBoxy("divAviso100MilPontos")
    }, this.fecharModalAvisoHorario = function () {
        CloseHintBoxy("divAvisoHorarioFechamento")
    }, this.RenderErrorsVisible = function (n) {
        if (n.Errors)for (var t = 0; t < n.Errors.length; t++)n.Errors[t].Source == "Mostrar Erro" && thisView.ShowMessage(n.Errors[t].FriendlyMessage, "ALERTA")
    }
}
function RecomendationEmail() {
    thisRecomendationEmail = this, this.NameSender, this.EmailSender, this.Recipients = [], this.AcceptsReceiveEmail, this.Origin, this.Destin, this.DepartureOutBoundDate, this.DepartureInBoundDate, this.Price, this.PriceGroup, this.ListaHashFlightGroup = [], this.Passengers, this.Link, this.SalesChannel, this.NumberADTs = 0, this.NumberCHDs = 0, this.NumberINFs = 0, this.Message = "", this.TraceId, this.AffiliatedId = 0, this.getMessageValidation = function (n) {
        var t = "";
        for ((n == "" || n == null) && ((thisRecomendationEmail.NameSender == undefined || thisRecomendationEmail.NameSender == "") && (t = t + "O campo nome do remetente é preenchimento obrigatório.<br>"), thisRecomendationEmail.EmailSender == undefined || thisRecomendationEmail.EmailSender == "" ? t = t + "O campo e-mail do remetente é preenchimento obrigatório.<br>" : isEmail(thisRecomendationEmail.EmailSender) ? thisRecomendationEmail.EmailSender.indexOf(";") >= 0 && (t = t + "O campo e-mail do remetente está preenchido de forma incorreta. Favor preencher novamente.<br>") : t = t + "O campo e-mail do remetente está preenchido de forma incorreta. Favor preencher novamente.<br>"), i = 0; i < thisRecomendationEmail.Recipients.length; i++)(thisRecomendationEmail.Recipients[i].Name == undefined || thisRecomendationEmail.Recipients[i].Name == "") && (t = t + "O campo nome do destinatário é preenchimento obrigatório.<br>"), thisRecomendationEmail.Recipients[i].Email == undefined || thisRecomendationEmail.Recipients[i].Email == "" ? t = t + "O campo e-mail do destinatário é preenchimento obrigatório.<br>" : isEmail(thisRecomendationEmail.Recipients[i].Email) ? thisRecomendationEmail.Recipients[i].Email.indexOf(";") >= 0 && (t = t + "O campo e-mail do destinatário so permite envio a 1 pessoa. Favor preencher corretamente.<br>") : t = t + "O campo e-mail do destinatário está preenchido de forma incorreta. Favor preencher novamente.<br>";
        return t
    }, this.GetRequestRecipients = function () {
        var n = [];
        for (i = 0; i < thisRecomendationEmail.Recipients.length; i++)n.push(thisRecomendationEmail.Recipients[i].GetRequestData());
        return n
    }, this.GetRequestData = function () {
        var n;
        return n = {
            TraceId: this.TraceId,
            Message: this.Message,
            FromName: this.NameSender,
            FromEmail: this.EmailSender,
            ToName: this.Recipients[0].Name,
            ToEmail: this.Recipients[0].Email,
            AcceptsReceiveEmail: this.AcceptsReceiveEmail,
            Origin: this.Origin,
            Destin: this.Destin,
            DepartureOutBoundDate: StringToDateValues(this.DepartureOutBoundDate),
            DepartureInBoundDate: StringToDateValues(this.DepartureInBoundDate),
            Price: this.Price,
            Link: this.Link,
            NumberADTs: this.NumberADTs,
            NumberCHDs: this.NumberCHDs,
            NumberINFs: this.NumberINFs,
            SalesChannel: this.SalesChannel,
            PriceGroup: this.PriceGroup,
            ListaHashFlightGroup: this.ListaHashFlightGroup,
            AffiliatedId: this.AffiliatedId
        }
    }
}
function RecomendationAddres() {
    thisRecomendationAddres = this, this.Name, this.Email, this.GetRequestData = function () {
        var n;
        return n = {Name: this.Name, Email: this.Email}
    }
}
function AirTrip() {
    this.Origin, this.Destination, this.Date, this.CabinType, this.Hour, this.AirCompany, this.GetRequest = function () {
        var n;
        return n = {
            Origin: this.Origin,
            Destination: this.Destination,
            Date: StringToDateValues(this.Date),
            CabinType: this.CabinType,
            Hour: this.Hour,
            AirCompany: this.AirCompany
        }
    }
}
var Event = function () {
    var n = this;
    n.listeners = [], this.attach = function (t) {
        if (n.listeners) {
            for (var i = 0; i < n.listeners.length; i++)if (n.listeners[i] == t)return;
            n.listeners.push(t)
        } else n.listeners = [t]
    }, this.notify = function (t, i) {
        for (var r = 0; r < n.listeners.length; r++)n.listeners[r](t, i)
    }
}, cities = ["Buenos Aires,Argentina (BUE)", "Rio de Janeiro,Sudeste (RIO)", "Fortaleza, Ceara (FOR)", "Porto Seguro, Bahia (BPS)", "Natal, Rio Grande do Norte (NAT)", "Orlando,Estados Unidos da America (ORL)", "Nova Iorque,Estados Unidos da America (NYC)", "Salvador, Bahia (SSA)", "Foz do Iguacu, Parana (IGU)", "Miami,Estados Unidos da America (MIA)", "Sao Paulo, Sao Paulo (SAO)", "Florianopolis, Santa Catarina (FLN)", "Maceio, Alagoas (MCZ)", "Santiago,Chile (SCL)", "Recife, Pernambuco (REC)", "Paris,Franca (PAR)", "Cancun,Mexico (CUN)", "Bariloche,Argentina (BRC)", "Montevideo,Uruguai (MVD)", "Curitiba, Parana (CWB)", "Punta Cana,Republica Dominicana (PUJ)", "Joao Pessoa, Paraiba (JPA)", "Las Vegas,Estados Unidos da America (LAS)", "Porto Alegre, Rio Grande do Sul (POA)", "Aracaju, Sergipe (AJU)", "Lisboa,Portugal (LIS)", "Londres,Inglaterra (LON)", "Fernando de Noronha, Pernambuco (FEN)", "Brasilia, Distrito Federal (BSB)", "Madri,Espanha (MAD)", "Punta del Este,Uruguai (PDP)", "Belo Horizonte, Minas Gerais (BHZ)", "Sao Luis, Maranhao (SLZ)", "Ilheus, Bahia (IOS)", "Vitoria, Espirito Santo (VIX)", "Lima,Peru (LIM)", "Bonito, Mato Grosso do Sul (BYO)", "Los Angeles,Estados Unidos da America (LAX)", "Ushuaia,Argentina (USH)", "Manaus, Amazonas (MAO)", "Goiania, Goias (GYN)", "Cabo Frio, Rio de Janeiro (CFB)", "Cuzco,Peru (CUZ)", "Cartagena,Colombia (CTG)", "Belem, Para (BEL)", "Milao,Italia (MIL)", "Barcelona,Espanha (BCN)", "Amsterdam,Holanda (AMS)", "Caxias do Sul, Rio Grande do Sul (CXJ)", "Campinas, Sao Paulo (VCP)", "Veneza,Italia (VCE)", "Porto,Portugal (OPO)", "Mendoza,Argentina (MDZ)", "Oranjestad,Aruba (AUA)", "Cuiaba, Mato Grosso (CGB)", "Asuncion,Paraguai (ASU)", "Atenas,Grecia (ATH)", "San Francisco,Estados Unidos da America (SFO)", "Havana,Cuba (HAV)", "El Calafate,Argentina (FTE)", "Campo Grande, Mato Grosso do Sul (CGR)", "Ibiza,Espanha (IBZ)", "Joinville, Santa Catarina (JOI)", "Toronto,Canada (YTO)", "Bogota,Colombia (BOG)", "Ribeirao Preto, Sao Paulo (RAO)", "Teresina, Piaui (THE)", "Tel Aviv,Israel (TLV)", "Navegantes, Santa Catarina (NVT)", "Cape Town,Africa do Sul (CPT)", "San Andres,Colombia (ADZ)", "Araxa, Minas Gerais (AAX)", "Praga,Republica Tcheca (PRG)", "Cairo,Egito (CAI)", "Campina Grande, Paraiba (CPV)", "Fort Lauderdale,Estados Unidos da America (FLL)", "Ciudad de Mexico,Mexico (MEX)", "Una, Bahia (UNA)", "Londrina, Parana (LDB)", "Frankfurt,Alemanha (FRA)", "Caracas,Venezuela (CCS)", "Dublin,Irlanda (DUB)", "Lencois, Bahia (LEC)", "Chicago,Estados Unidos da America (CHI)", "Istambul,Turquia (IST)", "San Jose,Costa Rica (SJO)", "Maringa, Parana (MGF)", "Juazeiro do Norte, Ceara (JDO)", "Vancouver,Canada (YVR)", "Uberlandia, Minas Gerais (UDI)", "Berlin,Alemanha (BER)", "San Diego,Estados Unidos da America (SAN)", "Sao Jose do Rio preto, Sao Paulo (SJP)", "Sao Jose dos Campos, Sao Paulo (SJK)", "porto Velho, Rondonia (PVH)", "Petrolina, Pernambuco (PNZ)", "Washington,Estados Unidos da America (WAS)", "Boston,Estados Unidos da America (BOS)", "Moscou,Russia (MOW)", "Munique,Alemanha (MUC)", "Aracatuba, Sao Paulo (ARU)", "Santarem, Para (STM)", "Sidnei,Australia (SYD)", "Santa Cruz de la Sierra,Bolivia (SRZ)", "Toquio,Japao (TYO)", "Palmas, Tocantins (PMW)", "La Paz,Bolivia (LPB)", "Cordoba,Argentina (COR)", "Imperatriz, Maranhao (IMP)", "Vitoria da Conquista, Bahia (VDC)", "Santo Domingo,Republica Dominicana (SDQ)", "Florenca,Italia (FLR)", "San Isidro,Argentina (AEP)", "Zurich,Suica (ZRH)", "Juiz de Fora, Minas Gerais (JDF)", "Hong Kong,Hong Kong (HKG)", "Confins, Minas Gerais (CNF)", "Macapa, Amapa (MCP)", "Quebec,Canada (YQB)", "Panama City,Panama (PTY)", "Vienna,Austria (VIE)", "Santiago de Compostela,Espanha (SCQ)", "Casablanca,Marrocos (CAS)", "Chapeco, Santa Catarina (XAP)", "Rio Branco, Acre (RBR)", "Quito,Equador (UIO)", "Atlanta,Estados Unidos da America (ATL)", "Budapest,Hungria (BUD)", "Copenhagen,Dinamarca (CPH)", "Verona,Italia (VRN)", "Montes Claros, Minas Gerais (MOC)", "Patos de Minas, Minas Gerais (POJ)", "Cochabamba,Bolivia (CBB)", "Uberaba, Minas Gerais (UBA)", "Delhi,India (DEL)", "Dourados, Mato Grosso do Sul (DOU)", "Diamantina, Minas Gerais (DIA)", "Valencia,Espanha (VLC)", "Presidente Prudente, Sao Paulo (PPB)", "Faro,Portugal (FAO)", "San Salvador,El Salvador (SAL)", "Parintins, Amazonas (PIN)", "Houston,Estados Unidos da America (HOU)", "Luanda,Angola (LAD)", "Oslo,Noruega (OSL)", "Sao Joao del Rei, Minas Gerais (JDR)", "Maraba, Para (MAB)", "Helsinki,Finlandia (HEL)", "Funchal,Portugal (FNC)", "Curacao,Antilhas Holandesas (CUR)", "Bologna,Italia (BLQ)", "Cascavel, Parana (CAC)", "Honolulu,Hawaii (HNL)", "Seattle,Estados Unidos da America (SEA)", "Marilia, Sao Paulo (MII)", "Nice,Franca (NCE)", "Denver,Estados Unidos da America (DEN)", "Tampa,Estados Unidos da America (TPA)", "Dallas,Estados Unidos da America (DFW)", "Medellin,Colombia (MDE)", "Rio Verde, Goias (RVD)", "Salt Lake City,Estados Unidos da America (SLC)", "Ji-Parana, Rondonia (JPR)", "Alta Floresta, Mato Grosso (AFL)", "Guangzhou,China (CAN)", "Seoul,Coreia do Sul (SEL)", "Napoles,Italia (NAP)", "Governador Valadares, Minas Gerais (GVR)", "Barreiras, Bahia (BRA)", "Ipatinga, Minas Gerais (IPN)", "Dusseldorf,Alemanha (DUS)", "Calgary,Canada (YYC)", "Criciuma, Santa Catarina (CCM)", "Corumba, Mato Grosso do Sul (CMG)", "Ottawa,Canada (YOW)", "Johannesburgo,Africa do Sul (JNB)", "Nagoya,Japao (NGO)", "Hamburg,Alemanha (HAM)", "Melbourne,Australia (MEL)", "Rondonopolis, Mato Grosso (ROO)", "Pelotas, Rio Grande do Sul (PET)", "Sevilha,Espanha (SVQ)", "Edimburgo,Inglaterra (EDI)", "Guayaquil,Equador (GYE)", "Passo Fundo, Rio Grande do Sul (PFB)", "Brisbane,Australia (BNE)", "Malaga,Espanha (AGP)", "New Orleans,Estados Unidos da America (MSY)", "Indianapolis,Estados Unidos da America (IND)", "Joacaba, Santa Catarina (JCB)", "Araguaina, Tocantins (AUX)", "Austin,Estados Unidos da America (AUS)", "Turin,Italia (TRN)", "Charlotte,Estados Unidos da America (CLT)", "Stuttgart,Alemanha (STR)", "Lyon,Franca (LYS)", "Bilbao,Espanha (BIO)", "Baltimore,Estados Unidos da America (BWI)", "Altamira, Para (ATM)", "Vilhena, Rondonia (BVH)", "Manchester,Inglaterra (MAN)", "Minneapolis,Estados Unidos da America (MSP)", "Bombay,India (BOM)", "Phoenix,Estados Unidos da America (PHX)", "Cruzeiro do Sul, Acre (CZS)", "Tabatinga, Amazonas (TBT)", "Hannover,Alemanha (HAJ)", "Uruguaiana, Rio Grande do Sul (URG)", "Reno,Estados Unidos da America (RNO)", "Marseille,Franca (MRS)", "Itaituba, Para (ITB)", "Vigo,Espanha (VGO)", "Carajas, Para (CKS)", "Saint Louis,Estados Unidos da America (STL)", "Tefe, Amazonas (TFF)", "Cologne,Alemanha (CGN)", "San Jose,Estados Unidos da America (SJC)", "Santo Angelo, Rio Grande do Sul (GEL)", "Tucurui, Para (TUR)", "Dorval,Canada (YUL)", "Stockholm,Suecia (STO)", "Eirunepe, Amazonas (ERN)", "Coari, Amazonas (CIZ)", "Labrea, Amazonas (LBR)", "Humaita, Amazonas (HIA)", "Barcelos, Amazonas (BAZ)", "Trombetas, Amazonas (TMT)", "Guatemala,Guatemala (GUA)", "El Jadida,Marrocos (CMN)", "Fonte Boa, Amazonas (FBO)", "Buenos Aires,Buenos Aires (EZE)", "Nova Iorque,New York (JFK)", "Cacador, Santa Catarina (CFC)", "Tokyo,Tokyo (NRT)", "Londres,London, City of (LHR)", "Brussels,Brussels Hoofdstedelijk Gewest (BRU)", "Rio de Janeiro,Rio de Janeiro (SDU)", "Shanghai,Shanghai (SHA)", "Philadelphia,Pennsylvania (PHL)", "Sodertalje,Suecia (BMA)", "Luxembourg,Luxembourg (LUX)", "Chicago,Illinois (ORD)", "Paris,Ile-de-France (ORY)", "Singapore,Singapura (SIN)", "Pequim,Beijing (PEK)", "Shanghai,Shanghai (PVG)", "Rio de Janeiro,Rio de Janeiro (GIG)", "Rio Grande, Rio Grande do Sul (RIG)", "Santa Maria, Rio Grande do Sul (RIA)", "Lara,Victoria (AVV)"];
/*!
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui || function (n) {
    n.ui = {
        version: "1.8",
        plugin: {
            add: function (t, i, r) {
                var f = n.ui[t].prototype, u;
                for (u in r)f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
            }, call: function (n, t, i) {
                var u = n.plugins[t], r;
                if (u && n.element[0].parentNode)for (r = 0; r < u.length; r++)n.options[u[r][0]] && u[r][1].apply(n.element, i)
            }
        },
        contains: function (n, t) {
            return document.compareDocumentPosition ? n.compareDocumentPosition(t) & 16 : n !== t && n.contains(t)
        },
        hasScroll: function (t, i) {
            if (n(t).css("overflow") == "hidden")return !1;
            var r = i && i == "left" ? "scrollLeft" : "scrollTop", u = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
        },
        isOverAxis: function (n, t, i) {
            return n > t && n < t + i
        },
        isOver: function (t, i, r, u, f, e) {
            return n.ui.isOverAxis(t, r, f) && n.ui.isOverAxis(i, u, e)
        },
        keyCode: {
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }, n.fn.extend({
        _focus: n.fn.focus, focus: function (t, i) {
            return typeof t == "number" ? this.each(function () {
                var r = this;
                setTimeout(function () {
                    n(r).focus(), i && i.call(r)
                }, t)
            }) : this._focus.apply(this, arguments)
        }, enableSelection: function () {
            return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui")
        }, disableSelection: function () {
            return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () {
                return !1
            })
        }, scrollParent: function () {
            var t;
            return t = n.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(n.curCSS(this, "position", 1)) && /(auto|scroll)/.test(n.curCSS(this, "overflow", 1) + n.curCSS(this, "overflow-y", 1) + n.curCSS(this, "overflow-x", 1))
            }).eq(0) : this.parents().filter(function () {
                return /(auto|scroll)/.test(n.curCSS(this, "overflow", 1) + n.curCSS(this, "overflow-y", 1) + n.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? n(document) : t
        }, zIndex: function (t) {
            if (t !== undefined)return this.css("zIndex", t);
            if (this.length)for (var i = n(this[0]), u, r; i.length && i[0] !== document;) {
                if (u = i.css("position"), (u == "absolute" || u == "relative" || u == "fixed") && (r = parseInt(i.css("zIndex")), !isNaN(r) && r != 0))return r;
                i = i.parent()
            }
            return 0
        }
    }), n.extend(n.expr[":"], {
        data: function (t, i, r) {
            return !!n.data(t, r[3])
        }, focusable: function (t) {
            var i = t.nodeName.toLowerCase(), r = n.attr(t, "tabindex");
            return (/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i || "area" == i ? t.href || !isNaN(r) : !isNaN(r)) && !n(t)["area" == i ? "parents" : "closest"](":hidden").length
        }, tabbable: function (t) {
            var i = n.attr(t, "tabindex");
            return (isNaN(i) || i >= 0) && n(t).is(":focusable")
        }
    })
}(jQuery);
/*!
 * jQuery UI Widget 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function (n) {
    var t = n.fn.remove;
    n.fn.remove = function (i, r) {
        return this.each(function () {
            return r || (!i || n.filter(i, [this]).length) && n("*", this).add(this).each(function () {
                n(this).triggerHandler("remove")
            }), t.call(n(this), i, r)
        })
    }, n.widget = function (t, i, r) {
        var u = t.split(".")[0], e, f;
        t = t.split(".")[1], e = u + "-" + t, r || (r = i, i = n.Widget), n.expr[":"][e] = function (i) {
            return !!n.data(i, t)
        }, n[u] = n[u] || {}, n[u][t] = function (n, t) {
            arguments.length && this._createWidget(n, t)
        }, f = new i, f.options = n.extend({}, f.options), n[u][t].prototype = n.extend(!0, f, {
            namespace: u,
            widgetName: t,
            widgetEventPrefix: n[u][t].prototype.widgetEventPrefix || t,
            widgetBaseClass: e
        }, r), n.widget.bridge(t, n[u][t])
    }, n.widget.bridge = function (t, i) {
        n.fn[t] = function (r) {
            var e = typeof r == "string", f = Array.prototype.slice.call(arguments, 1), u = this;
            return (r = !e && f.length ? n.extend.apply(null, [!0, r].concat(f)) : r, e && r.substring(0, 1) === "_") ? u : (e ? this.each(function () {
                var i = n.data(this, t), e = i && n.isFunction(i[r]) ? i[r].apply(i, f) : i;
                if (e !== i && e !== undefined)return u = e, !1
            }) : this.each(function () {
                var u = n.data(this, t);
                u ? (r && u.option(r), u._init()) : n.data(this, t, new i(r, this))
            }), u)
        }
    }, n.Widget = function (n, t) {
        arguments.length && this._createWidget(n, t)
    }, n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {disabled: !1},
        _createWidget: function (t, i) {
            this.element = n(i).data(this.widgetName, this), this.options = n.extend(!0, {}, this.options, n.metadata && n.metadata.get(i)[this.widgetName], t);
            var r = this;
            this.element.bind("remove." + this.widgetName, function () {
                r.destroy()
            }), this._create(), this._init()
        },
        _create: function () {
        },
        _init: function () {
        },
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (t, i) {
            var u = t, r = this;
            if (arguments.length === 0)return n.extend({}, r.options);
            if (typeof t == "string") {
                if (i === undefined)return this.options[t];
                u = {}, u[t] = i
            }
            return n.each(u, function (n, t) {
                r._setOption(n, t)
            }), r
        },
        _setOption: function (n, t) {
            return this.options[n] = t, n === "disabled" && this.widget()[t ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", t), this
        },
        enable: function () {
            return this._setOption("disabled", !1)
        },
        disable: function () {
            return this._setOption("disabled", !0)
        },
        _trigger: function (t, i, r) {
            var e = this.options[t], f, u;
            if (i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), r = r || {}, i.originalEvent)for (f = n.event.props.length; f;)u = n.event.props[--f], i[u] = i.originalEvent[u];
            return this.element.trigger(i, r), !(n.isFunction(e) && e.call(this.element[0], i, r) === !1 || i.isDefaultPrevented())
        }
    }
})(jQuery);
/*!
 * jQuery UI Mouse 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function (n) {
    n.widget("ui.mouse", {
        options: {cancel: ":input,option", distance: 1, delay: 0}, _mouseInit: function () {
            var n = this;
            this.element.bind("mousedown." + this.widgetName, function (t) {
                return n._mouseDown(t)
            }).bind("click." + this.widgetName, function (t) {
                if (n._preventClickEvent)return n._preventClickEvent = !1, t.stopImmediatePropagation(), !1
            }), this.started = !1
        }, _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        }, _mouseDown: function (t) {
            if (t.originalEvent = t.originalEvent || {}, !t.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var i = this, u = t.which == 1, r = typeof this.options.cancel == "string" ? n(t.target).parents().add(t.target).filter(this.options.cancel).length : !1;
                return !u || r || !this._mouseCapture(t) ? !0 : (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted)) ? (t.preventDefault(), !0) : (this._mouseMoveDelegate = function (n) {
                    return i._mouseMove(n)
                }, this._mouseUpDelegate = function (n) {
                    return i._mouseUp(n)
                }, n(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), n.browser.safari || t.preventDefault(), t.originalEvent.mouseHandled = !0, !0)
            }
        }, _mouseMove: function (t) {
            return n.browser.msie && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        }, _mouseUp: function (t) {
            return n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, this._preventClickEvent = t.target == this._mouseDownEvent.target, this._mouseStop(t)), !1
        }, _mouseDistanceMet: function (n) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance
        }, _mouseDelayMet: function () {
            return this.mouseDelayMet
        }, _mouseStart: function () {
        }, _mouseDrag: function () {
        }, _mouseStop: function () {
        }, _mouseCapture: function () {
            return !0
        }
    })
})(jQuery), function (n) {
    n.ui = n.ui || {};
    var u = /left|center|right/, t = "center", r = /top|center|bottom/, i = "center", e = n.fn.position, f = n.fn.offset;
    n.fn.position = function (f) {
        if (!f || !f.of)return e.apply(this, arguments);
        f = n.extend({}, f);
        var h = n(f.of), a = (f.collision || "flip").split(" "), s = f.offset ? f.offset.split(" ") : [0, 0], l, c, o;
        return f.of.nodeType === 9 ? (l = h.width(), c = h.height(), o = {
            top: 0,
            left: 0
        }) : f.of.scrollTo && f.of.document ? (l = h.width(), c = h.height(), o = {
            top: h.scrollTop(),
            left: h.scrollLeft()
        }) : f.of.preventDefault ? (f.at = "left top", l = c = 0, o = {
            top: f.of.pageY,
            left: f.of.pageX
        }) : (l = h.outerWidth(), c = h.outerHeight(), o = h.offset()), n.each(["my", "at"], function () {
            var n = (f[this] || "").split(" ");
            n.length === 1 && (n = u.test(n[0]) ? n.concat([i]) : r.test(n[0]) ? [t].concat(n) : [t, i]), n[0] = u.test(n[0]) ? n[0] : t, n[1] = r.test(n[1]) ? n[1] : i, f[this] = n
        }), a.length === 1 && (a[1] = a[0]), s[0] = parseInt(s[0], 10) || 0, s.length === 1 && (s[1] = s[0]), s[1] = parseInt(s[1], 10) || 0, f.at[0] === "right" ? o.left += l : f.at[0] === t && (o.left += l / 2), f.at[1] === "bottom" ? o.top += c : f.at[1] === i && (o.top += c / 2), o.left += s[0], o.top += s[1], this.each(function () {
            var u = n(this), e = u.outerWidth(), h = u.outerHeight(), r = n.extend({}, o);
            f.my[0] === "right" ? r.left -= e : f.my[0] === t && (r.left -= e / 2), f.my[1] === "bottom" ? r.top -= h : f.my[1] === i && (r.top -= h / 2), n.each(["left", "top"], function (t, i) {
                n.ui.position[a[t]] && n.ui.position[a[t]][i](r, {
                    targetWidth: l,
                    targetHeight: c,
                    elemWidth: e,
                    elemHeight: h,
                    offset: s,
                    my: f.my,
                    at: f.at
                })
            }), n.fn.bgiframe && u.bgiframe(), u.offset(n.extend(r, {using: f.using}))
        })
    }, n.ui.position = {
        fit: {
            left: function (t, i) {
                var u = n(window), r = t.left + i.elemWidth - u.width() - u.scrollLeft();
                t.left = r > 0 ? t.left - r : Math.max(0, t.left)
            }, top: function (t, i) {
                var u = n(window), r = t.top + i.elemHeight - u.height() - u.scrollTop();
                t.top = r > 0 ? t.top - r : Math.max(0, t.top)
            }
        }, flip: {
            left: function (t, i) {
                if (i.at[0] !== "center") {
                    var f = n(window), e = t.left + i.elemWidth - f.width() - f.scrollLeft(), r = i.my[0] === "left" ? -i.elemWidth : i.my[0] === "right" ? i.elemWidth : 0, u = -2 * i.offset[0];
                    t.left += t.left < 0 ? r + i.targetWidth + u : e > 0 ? r - i.targetWidth + u : 0
                }
            }, top: function (t, i) {
                if (i.at[1] !== "center") {
                    var f = n(window), e = t.top + i.elemHeight - f.height() - f.scrollTop(), r = i.my[1] === "top" ? -i.elemHeight : i.my[1] === "bottom" ? i.elemHeight : 0, o = i.at[1] === "top" ? i.targetHeight : -i.targetHeight, u = -2 * i.offset[1];
                    t.top += t.top < 0 ? r + i.targetHeight + u : e > 0 ? r + o + u : 0
                }
            }
        }
    }, n.offset.setOffset || (n.offset.setOffset = function (t, i) {
        /static/.test(n.curCSS(t, "position")) && (t.style.position = "relative");
        var f = n(t), u = f.offset(), e = parseInt(n.curCSS(t, "top", !0), 10) || 0, o = parseInt(n.curCSS(t, "left", !0), 10) || 0, r = {
            top: i.top - u.top + e,
            left: i.left - u.left + o
        };
        "using"in i ? i.using.call(t, r) : f.css(r)
    }, n.fn.offset = function (t) {
        var i = this[0];
        return !i || !i.ownerDocument ? null : t ? this.each(function () {
            n.offset.setOffset(this, t)
        }) : f.call(this)
    })
}(jQuery), function (n) {
    n.widget("ui.draggable", n.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function () {
            this.options.helper != "original" || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        destroy: function () {
            if (this.element.data("draggable"))return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
        },
        _mouseCapture: function (t) {
            var i = this.options;
            return this.helper || i.disabled || n(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), !this.handle) ? !1 : !0
        },
        _mouseStart: function (t) {
            var i = this.options;
            return (this.helper = this._createHelper(t), this._cacheHelperProportions(), n.ui.ddmanager && (n.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, n.extend(this.offset, {
                click: {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), i.containment && this._setContainment(), this._trigger("start", t) === !1) ? (this._clear(), !1) : (this._cacheHelperProportions(), n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this.helper.addClass("ui-draggable-dragging"), this._mouseDrag(t, !0), !0)
        },
        _mouseDrag: function (t, i) {
            if (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1)return this._mouseUp({}), !1;
                this.position = r.position
            }
            return this.options.axis && this.options.axis == "y" || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && this.options.axis == "x" || (this.helper[0].style.top = this.position.top + "px"), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), !1
        },
        _mouseStop: function (t) {
            var i = !1, r;
            return (n.ui.ddmanager && !this.options.dropBehaviour && (i = n.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1), !this.element[0] || !this.element[0].parentNode) ? !1 : (this.options.revert == "invalid" && !i || this.options.revert == "valid" && i || this.options.revert === !0 || n.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? (r = this, n(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                r._trigger("stop", t) !== !1 && r._clear()
            })) : this._trigger("stop", t) !== !1 && this._clear(), !1)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (t) {
            var i = !this.options.handle || !n(this.options.handle, this.element).length ? !0 : !1;
            return n(this.options.handle, this.element).find("*").andSelf().each(function () {
                this == t.target && (i = !0)
            }), i
        },
        _createHelper: function (t) {
            var r = this.options, i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t])) : r.helper == "clone" ? this.element.clone() : this.element;
            return i.parents("body").length || i.appendTo(r.appendTo == "parent" ? this.element[0].parentNode : r.appendTo), i[0] == this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"), i
        },
        _adjustOffsetFromHelper: function (t) {
            typeof t == "string" && (t = t.split(" ")), n.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left"in t && (this.offset.click.left = t.left + this.margins.left), "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top"in t && (this.offset.click.top = t.top + this.margins.top), "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return this.cssPosition == "absolute" && this.scrollParent[0] != document && n.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && n.browser.msie) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var n = this.element.position();
                return {
                    top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var i = this.options, t, r, u;
            if (i.containment == "parent" && (i.containment = this.helper[0].parentNode), (i.containment == "document" || i.containment == "window") && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, n(i.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (n(i.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(i.containment) || i.containment.constructor == Array)i.containment.constructor == Array && (this.containment = i.containment); else {
                if (t = n(i.containment)[0], !t)return;
                r = n(i.containment).offset(), u = n(t).css("overflow") != "hidden", this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (t, i) {
            i || (i = this.position);
            var r = t == "absolute" ? 1 : -1, e = this.options, u = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && n.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, f = /(html|body)/i.test(u[0].tagName);
            return {
                top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - (n.browser.safari && n.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r),
                left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - (n.browser.safari && n.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r)
            }
        },
        _generatePosition: function (t) {
            var i = this.options, o = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && n.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, s = /(html|body)/i.test(o[0].tagName), e = t.pageX, f = t.pageY, r, u;
            return this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (e = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (f = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (e = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (f = this.containment[3] + this.offset.click.top)), i.grid && (r = this.originalPageY + Math.round((f - this.originalPageY) / i.grid[1]) * i.grid[1], f = this.containment ? r - this.offset.click.top < this.containment[1] || r - this.offset.click.top > this.containment[3] ? r - this.offset.click.top < this.containment[1] ? r + i.grid[1] : r - i.grid[1] : r : r, u = this.originalPageX + Math.round((e - this.originalPageX) / i.grid[0]) * i.grid[0], e = this.containment ? u - this.offset.click.left < this.containment[0] || u - this.offset.click.left > this.containment[2] ? u - this.offset.click.left < this.containment[0] ? u + i.grid[0] : u - i.grid[0] : u : u)), {
                top: f - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (n.browser.safari && n.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
                left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (n.browser.safari && n.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] == this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function (t, i, r) {
            return r = r || this._uiHash(), n.ui.plugin.call(this, t, [i, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), n.Widget.prototype._trigger.call(this, t, i, r)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), n.extend(n.ui.draggable, {version: "1.8"}), n.ui.plugin.add("draggable", "connectToSortable", {
        start: function (t, i) {
            var r = n(this).data("draggable"), f = r.options, u = n.extend({}, i, {item: r.element});
            r.sortables = [], n(f.connectToSortable).each(function () {
                var i = n.data(this, "sortable");
                i && !i.options.disabled && (r.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }), i._refreshItems(), i._trigger("activate", t, u))
            })
        }, stop: function (t, i) {
            var r = n(this).data("draggable"), u = n.extend({}, i, {item: r.element});
            n.each(r.sortables, function () {
                this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, u))
            })
        }, drag: function (t, i) {
            var r = n(this).data("draggable"), u = this, f = function (t) {
                var o = this.offset.click.top, e = this.offset.click.left, h = this.positionAbs.top, s = this.positionAbs.left, r = t.height, i = t.width, f = t.top, u = t.left;
                return n.ui.isOver(h + o, s + e, f, u, r, i)
            };
            n.each(r.sortables, function () {
                this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = n(u).clone().appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                    return i.helper[0]
                }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
            })
        }
    }), n.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var r = n("body"), u = n(this).data("draggable").options;
            r.css("cursor") && (u._cursor = r.css("cursor")), r.css("cursor", u.cursor)
        }, stop: function () {
            var r = n(this).data("draggable").options;
            r._cursor && n("body").css("cursor", r._cursor)
        }
    }), n.ui.plugin.add("draggable", "iframeFix", {
        start: function () {
            var r = n(this).data("draggable").options;
            n(r.iframeFix === !0 ? "iframe" : r.iframeFix).each(function () {
                n('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(n(this).offset()).appendTo("body")
            })
        }, stop: function () {
            n("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            })
        }
    }), n.ui.plugin.add("draggable", "opacity", {
        start: function (t, i) {
            var r = n(i.helper), u = n(this).data("draggable").options;
            r.css("opacity") && (u._opacity = r.css("opacity")), r.css("opacity", u.opacity)
        }, stop: function (t, i) {
            var r = n(this).data("draggable").options;
            r._opacity && n(i.helper).css("opacity", r._opacity)
        }
    }), n.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var r = n(this).data("draggable");
            r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
        }, drag: function (t) {
            var u = n(this).data("draggable"), r = u.options, f = !1;
            u.scrollParent[0] != document && u.scrollParent[0].tagName != "HTML" ? (r.axis && r.axis == "x" || (u.overflowOffset.top + u.scrollParent[0].offsetHeight - t.pageY < r.scrollSensitivity ? u.scrollParent[0].scrollTop = f = u.scrollParent[0].scrollTop + r.scrollSpeed : t.pageY - u.overflowOffset.top < r.scrollSensitivity && (u.scrollParent[0].scrollTop = f = u.scrollParent[0].scrollTop - r.scrollSpeed)), r.axis && r.axis == "y" || (u.overflowOffset.left + u.scrollParent[0].offsetWidth - t.pageX < r.scrollSensitivity ? u.scrollParent[0].scrollLeft = f = u.scrollParent[0].scrollLeft + r.scrollSpeed : t.pageX - u.overflowOffset.left < r.scrollSensitivity && (u.scrollParent[0].scrollLeft = f = u.scrollParent[0].scrollLeft - r.scrollSpeed))) : (r.axis && r.axis == "x" || (t.pageY - n(document).scrollTop() < r.scrollSensitivity ? f = n(document).scrollTop(n(document).scrollTop() - r.scrollSpeed) : n(window).height() - (t.pageY - n(document).scrollTop()) < r.scrollSensitivity && (f = n(document).scrollTop(n(document).scrollTop() + r.scrollSpeed))), r.axis && r.axis == "y" || (t.pageX - n(document).scrollLeft() < r.scrollSensitivity ? f = n(document).scrollLeft(n(document).scrollLeft() - r.scrollSpeed) : n(window).width() - (t.pageX - n(document).scrollLeft()) < r.scrollSensitivity && (f = n(document).scrollLeft(n(document).scrollLeft() + r.scrollSpeed)))), f !== !1 && n.ui.ddmanager && !r.dropBehaviour && n.ui.ddmanager.prepareOffsets(u, t)
        }
    }), n.ui.plugin.add("draggable", "snap", {
        start: function () {
            var r = n(this).data("draggable"), u = r.options;
            r.snapElements = [], n(u.snap.constructor != String ? u.snap.items || ":data(draggable)" : u.snap).each(function () {
                var t = n(this), i = t.offset();
                this != r.element[0] && r.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        }, drag: function (t, i) {
            for (var r = n(this).data("draggable"), d = r.options, u = d.snapTolerance, c = i.offset.left, a = c + r.helperProportions.width, l = i.offset.top, v = l + r.helperProportions.height, k, f = r.snapElements.length - 1; f >= 0; f--) {
                var e = r.snapElements[f].left, s = e + r.snapElements[f].width, o = r.snapElements[f].top, h = o + r.snapElements[f].height;
                if (!(e - u < c && c < s + u && o - u < l && l < h + u || e - u < c && c < s + u && o - u < v && v < h + u || e - u < a && a < s + u && o - u < l && l < h + u || e - u < a && a < s + u && o - u < v && v < h + u)) {
                    r.snapElements[f].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, n.extend(r._uiHash(), {snapItem: r.snapElements[f].item})), r.snapElements[f].snapping = !1;
                    continue
                }
                if (d.snapMode != "inner") {
                    var b = Math.abs(o - v) <= u, w = Math.abs(h - l) <= u, y = Math.abs(e - a) <= u, p = Math.abs(s - c) <= u;
                    b && (i.position.top = r._convertPositionTo("relative", {
                        top: o - r.helperProportions.height,
                        left: 0
                    }).top - r.margins.top), w && (i.position.top = r._convertPositionTo("relative", {
                        top: h,
                        left: 0
                    }).top - r.margins.top), y && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: e - r.helperProportions.width
                    }).left - r.margins.left), p && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: s
                    }).left - r.margins.left)
                }
                if (k = b || w || y || p, d.snapMode != "outer") {
                    var b = Math.abs(o - l) <= u, w = Math.abs(h - v) <= u, y = Math.abs(e - c) <= u, p = Math.abs(s - a) <= u;
                    b && (i.position.top = r._convertPositionTo("relative", {
                        top: o,
                        left: 0
                    }).top - r.margins.top), w && (i.position.top = r._convertPositionTo("relative", {
                        top: h - r.helperProportions.height,
                        left: 0
                    }).top - r.margins.top), y && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: e
                    }).left - r.margins.left), p && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: s - r.helperProportions.width
                    }).left - r.margins.left)
                }
                !r.snapElements[f].snapping && (b || w || y || p || k) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, n.extend(r._uiHash(), {snapItem: r.snapElements[f].item})), r.snapElements[f].snapping = b || w || y || p || k
            }
        }
    }), n.ui.plugin.add("draggable", "stack", {
        start: function () {
            var f = n(this).data("draggable").options, r = n.makeArray(n(f.stack)).sort(function (t, i) {
                return (parseInt(n(t).css("zIndex"), 10) || 0) - (parseInt(n(i).css("zIndex"), 10) || 0)
            }), u;
            if (r.length)u = parseInt(r[0].style.zIndex) || 0, n(r).each(function (n) {
                this.style.zIndex = u + n
            }), this[0].style.zIndex = u + r.length
        }
    }), n.ui.plugin.add("draggable", "zIndex", {
        start: function (t, i) {
            var r = n(i.helper), u = n(this).data("draggable").options;
            r.css("zIndex") && (u._zIndex = r.css("zIndex")), r.css("zIndex", u.zIndex)
        }, stop: function (t, i) {
            var r = n(this).data("draggable").options;
            r._zIndex && n(i.helper).css("zIndex", r._zIndex)
        }
    })
}(jQuery), function (n) {
    n.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var t = this.options, i = t.accept;
            this.isover = 0, this.isout = 1, this.accept = n.isFunction(i) ? i : function (n) {
                return n.is(i)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, n.ui.ddmanager.droppables[t.scope] = n.ui.ddmanager.droppables[t.scope] || [], n.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function () {
            for (var i = n.ui.ddmanager.droppables[this.options.scope], t = 0; t < i.length; t++)i[t] == this && i.splice(t, 1);
            return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
        },
        _setOption: function (t, i) {
            t == "accept" && (this.accept = n.isFunction(i) ? i : function (n) {
                return n.is(i)
            }), n.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (t) {
            var i = n.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", t, this.ui(i))
        },
        _deactivate: function (t) {
            var i = n.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", t, this.ui(i))
        },
        _over: function (t) {
            var i = n.ui.ddmanager.current;
            if (i && (i.currentItem || i.element)[0] != this.element[0])this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)))
        },
        _out: function (t) {
            var i = n.ui.ddmanager.current;
            if (i && (i.currentItem || i.element)[0] != this.element[0])this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)))
        },
        _drop: function (t, i) {
            var r = i || n.ui.ddmanager.current, u;
            return !r || (r.currentItem || r.element)[0] == this.element[0] ? !1 : (u = !1, this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var t = n.data(this, "droppable");
                if (t.options.greedy && !t.options.disabled && t.options.scope == r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && n.ui.intersect(r, n.extend(t, {offset: t.element.offset()}), t.options.tolerance))return u = !0, !1
            }), u) ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1
        },
        ui: function (n) {
            return {
                draggable: n.currentItem || n.element,
                helper: n.helper,
                position: n.position,
                offset: n.positionAbs
            }
        }
    }), n.extend(n.ui.droppable, {version: "1.8"}), n.ui.intersect = function (t, i, r) {
        if (!i.offset)return !1;
        var e = (t.positionAbs || t.position.absolute).left, c = e + t.helperProportions.width, o = (t.positionAbs || t.position.absolute).top, l = o + t.helperProportions.height, f = i.offset.left, h = f + i.proportions.width, u = i.offset.top, s = u + i.proportions.height;
        switch (r) {
            case"fit":
                return f < e && c < h && u < o && l < s;
            case"intersect":
                return f < e + t.helperProportions.width / 2 && c - t.helperProportions.width / 2 < h && u < o + t.helperProportions.height / 2 && l - t.helperProportions.height / 2 < s;
            case"pointer":
                var y = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, v = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top;
                return n.ui.isOver(v, y, u, f, i.proportions.height, i.proportions.width);
            case"touch":
                return (o >= u && o <= s || l >= u && l <= s || o < u && l > s) && (e >= f && e <= h || c >= f && c <= h || e < f && c > h);
            default:
                return !1
        }
    }, n.ui.ddmanager = {
        current: null, droppables: {"default": []}, prepareOffsets: function (t, i) {
            var u = n.ui.ddmanager.droppables[t.options.scope] || [], o = i ? i.type : null, e = (t.currentItem || t.element).find(":data(droppable)").andSelf(), r, f;
            n:for (r = 0; r < u.length; r++) {
                if (u[r].options.disabled || t && !u[r].accept.call(u[r].element[0], t.currentItem || t.element))continue;
                for (f = 0; f < e.length; f++)if (e[f] == u[r].element[0]) {
                    u[r].proportions.height = 0;
                    continue n
                }
                if (u[r].visible = u[r].element.css("display") != "none", !u[r].visible)continue;
                u[r].offset = u[r].element.offset(), u[r].proportions = {
                    width: u[r].element[0].offsetWidth,
                    height: u[r].element[0].offsetHeight
                }, o == "mousedown" && u[r]._activate.call(u[r], i)
            }
        }, drop: function (t, i) {
            var r = !1;
            return n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function () {
                if (this.options)!this.options.disabled && this.visible && n.ui.intersect(t, this, this.options.tolerance) && (r = r || this._drop.call(this, i)), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, i))
            }), r
        }, drag: function (t, i) {
            t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i), n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function () {
                var e, u, r, f;
                if (!this.options.disabled && !this.greedyChild && this.visible && (e = n.ui.intersect(t, this, this.options.tolerance), u = !e && this.isover == 1 ? "isout" : e && this.isover == 0 ? "isover" : null, u))this.options.greedy && (f = this.element.parents(":data(droppable):eq(0)"), f.length && (r = n.data(f[0], "droppable"), r.greedyChild = u == "isover" ? 1 : 0)), r && u == "isover" && (r.isover = 0, r.isout = 1, r._out.call(r, i)), this[u] = 1, this[u == "isout" ? "isover" : "isout"] = 0, this[u == "isover" ? "_over" : "_out"].call(this, i), r && u == "isout" && (r.isout = 0, r.isover = 1, r._over.call(r, i))
            })
        }
    }
}(jQuery), function (n) {
    n.widget("ui.resizable", n.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function () {
            var r = this, t = this.options, e, u;
            if (this.element.addClass("ui-resizable"), n.extend(this, {
                    _aspectRatio: !!t.aspectRatio,
                    aspectRatio: t.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (/relative/.test(this.element.css("position")) && n.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                }), this.element.wrap(n('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = t.handles || (n(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor == String)for (this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, u = 0; u < e.length; u++) {
                var i = n.trim(e[u]), o = "ui-resizable-" + i, f = n('<div class="ui-resizable-handle ' + o + '"></div>');
                /sw|se|ne|nw/.test(i) && f.css({zIndex: ++t.zIndex}), "se" == i && f.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[i] = ".ui-resizable-" + i, this.element.append(f)
            }
            this._renderAxis = function (t) {
                var i, u, r, f;
                t = t || this.element;
                for (i in this.handles)if (this.handles[i].constructor == String && (this.handles[i] = n(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (u = n(this.handles[i], this.element), r = 0, r = /sw|ne|nw|se|n|s/.test(i) ? u.outerHeight() : u.outerWidth(), f = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(f, r), this._proportionallyResize()), !n(this.handles[i]).length)continue
            }, this._renderAxis(this.element), this._handles = n(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
                if (!r.resizing) {
                    if (this.className)var n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    r.axis = n && n[1] ? n[1] : "se"
                }
            }), t.autoHide && (this._handles.hide(), n(this.element).addClass("ui-resizable-autohide").hover(function () {
                n(this).removeClass("ui-resizable-autohide"), r._handles.show()
            }, function () {
                r.resizing || (n(this).addClass("ui-resizable-autohide"), r._handles.hide())
            })), this._mouseInit()
        },
        destroy: function () {
            var i, t;
            return this._mouseDestroy(), i = function (t) {
                n(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            }, this.elementIsWrapper && (i(this.element), t = this.element, t.after(this.originalElement.css({
                position: t.css("position"),
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: t.css("top"),
                left: t.css("left")
            })).remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _mouseCapture: function (t) {
            var r = !1, i;
            for (i in this.handles)n(this.handles[i])[0] == t.target && (r = !0);
            return !this.options.disabled && r
        },
        _mouseStart: function (t) {
            var u = this.options, s = this.element.position(), r = this.element, e, f, o;
            return this.resizing = !0, this.documentScroll = {
                top: n(document).scrollTop(),
                left: n(document).scrollLeft()
            }, (r.is(".ui-draggable") || /absolute/.test(r.css("position"))) && r.css({
                position: "absolute",
                top: s.top,
                left: s.left
            }), n.browser.opera && /relative/.test(r.css("position")) && r.css({
                position: "relative",
                top: "auto",
                left: "auto"
            }), this._renderProxy(), e = i(this.helper.css("left")), f = i(this.helper.css("top")), u.containment && (e += n(u.containment).scrollLeft() || 0, f += n(u.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: e,
                top: f
            }, this.size = this._helper ? {width: r.outerWidth(), height: r.outerHeight()} : {
                width: r.width(),
                height: r.height()
            }, this.originalSize = this._helper ? {width: r.outerWidth(), height: r.outerHeight()} : {
                width: r.width(),
                height: r.height()
            }, this.originalPosition = {left: e, top: f}, this.sizeDiff = {
                width: r.outerWidth() - r.width(),
                height: r.outerHeight() - r.height()
            }, this.originalMousePosition = {
                left: t.pageX,
                top: t.pageY
            }, this.aspectRatio = typeof u.aspectRatio == "number" ? u.aspectRatio : this.originalSize.width / this.originalSize.height || 1, o = n(".ui-resizable-" + this.axis).css("cursor"), n("body").css("cursor", o == "auto" ? this.axis + "-resize" : o), r.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
        },
        _mouseDrag: function (t) {
            var s = this.helper, v = this.options, a = {}, l = this, r = this.originalMousePosition, o = this.axis, e = t.pageX - r.left || 0, f = t.pageY - r.top || 0, u = this._change[o];
            if (!u)return !1;
            var i = u.apply(this, [t, e, f]), c = n.browser.msie && n.browser.version < 7, h = this.sizeDiff;
            return (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._propagate("resize", t), s.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(i), this._trigger("resize", t, this.ui()), !1
        },
        _mouseStop: function (t) {
            var u, i;
            if (this.resizing = !1, u = this.options, i = this, this._helper) {
                var r = this._proportionallyResizeElements, f = r.length && /textarea/i.test(r[0].nodeName), h = f && n.ui.hasScroll(r[0], "left") ? 0 : i.sizeDiff.height, c = f ? 0 : i.sizeDiff.width, s = {
                    width: i.size.width - c,
                    height: i.size.height - h
                }, e = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, o = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                u.animate || this.element.css(n.extend(s, {
                    top: o,
                    left: e
                })), i.helper.height(i.size.height), i.helper.width(i.size.width), this._helper && !u.animate && this._proportionallyResize()
            }
            return n("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
        },
        _updateCache: function (n) {
            var i = this.options;
            this.offset = this.helper.offset(), t(n.left) && (this.position.left = n.left), t(n.top) && (this.position.top = n.top), t(n.height) && (this.size.height = n.height), t(n.width) && (this.size.width = n.width)
        },
        _updateRatio: function (n) {
            var f = this.options, r = this.position, i = this.size, u = this.axis;
            return n.height ? n.width = i.height * this.aspectRatio : n.width && (n.height = i.width / this.aspectRatio), u == "sw" && (n.left = r.left + (i.width - n.width), n.top = null), u == "nw" && (n.top = r.top + (i.height - n.height), n.left = r.left + (i.width - n.width)), n
        },
        _respectSize: function (n, i) {
            var p = this.helper, r = this.options, y = this._aspectRatio || i.shiftKey, c = this.axis, a = t(n.width) && r.maxWidth && r.maxWidth < n.width, e = t(n.height) && r.maxHeight && r.maxHeight < n.height, v = t(n.width) && r.minWidth && r.minWidth > n.width, l = t(n.height) && r.minHeight && r.minHeight > n.height, u;
            v && (n.width = r.minWidth), l && (n.height = r.minHeight), a && (n.width = r.maxWidth), e && (n.height = r.maxHeight);
            var f = this.originalPosition.left + this.originalSize.width, o = this.position.top + this.size.height, h = /sw|nw|w/.test(c), s = /nw|ne|n/.test(c);
            return v && h && (n.left = f - r.minWidth), a && h && (n.left = f - r.maxWidth), l && s && (n.top = o - r.minHeight), e && s && (n.top = o - r.maxHeight), u = !n.width && !n.height, u && !n.left && n.top ? n.top = null : u && !n.top && n.left && (n.left = null), n
        },
        _proportionallyResize: function () {
            var e = this.options, i, r, t, u, f;
            if (this._proportionallyResizeElements.length)for (i = this.helper || this.element, r = 0; r < this._proportionallyResizeElements.length; r++) {
                if (t = this._proportionallyResizeElements[r], this.borderDif || (u = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], f = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")], this.borderDif = n.map(u, function (n, t) {
                        var r = parseInt(n, 10) || 0, i = parseInt(f[t], 10) || 0;
                        return r + i
                    })), n.browser.msie && !!(n(i).is(":hidden") || n(i).parents(":hidden").length))continue;
                t.css({
                    height: i.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: i.width() - this.borderDif[1] - this.borderDif[3] || 0
                })
            }
        },
        _renderProxy: function () {
            var u = this.element, f = this.options;
            if (this.elementOffset = u.offset(), this._helper) {
                this.helper = this.helper || n('<div style="overflow:hidden;"></div>');
                var r = n.browser.msie && n.browser.version < 7, i = r ? 1 : 0, t = r ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + t,
                    height: this.element.outerHeight() + t,
                    position: "absolute",
                    left: this.elementOffset.left - i + "px",
                    top: this.elementOffset.top - i + "px",
                    zIndex: ++f.zIndex
                }), this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function (n, t) {
                return {width: this.originalSize.width + t}
            }, w: function (n, t) {
                var f = this.options, u = this.originalSize, r = this.originalPosition;
                return {left: r.left + t, width: u.width - t}
            }, n: function (n, t, i) {
                var f = this.options, u = this.originalSize, r = this.originalPosition;
                return {top: r.top + i, height: u.height - i}
            }, s: function (n, t, i) {
                return {height: this.originalSize.height + i}
            }, se: function (t, i, r) {
                return n.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
            }, sw: function (t, i, r) {
                return n.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
            }, ne: function (t, i, r) {
                return n.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
            }, nw: function (t, i, r) {
                return n.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
            }
        },
        _propagate: function (t, i) {
            n.ui.plugin.call(this, t, [i, this.ui()]), t != "resize" && this._trigger(t, i, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), n.extend(n.ui.resizable, {version: "1.8"}), n.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var f = n(this).data("resizable"), r = f.options, u = function (t) {
                n(t).each(function () {
                    n(this).data("resizable-alsoresize", {
                        width: parseInt(n(this).width(), 10),
                        height: parseInt(n(this).height(), 10),
                        left: parseInt(n(this).css("left"), 10),
                        top: parseInt(n(this).css("top"), 10)
                    })
                })
            };
            typeof r.alsoResize != "object" || r.alsoResize.parentNode ? u(r.alsoResize) : r.alsoResize.length ? (r.alsoResize = r.alsoResize[0], u(r.alsoResize)) : n.each(r.alsoResize, function (n) {
                u(n)
            })
        }, resize: function () {
            var r = n(this).data("resizable"), u = r.options, o = r.originalSize, e = r.originalPosition, s = {
                height: r.size.height - o.height || 0,
                width: r.size.width - o.width || 0,
                top: r.position.top - e.top || 0,
                left: r.position.left - e.left || 0
            }, f = function (t, i) {
                n(t).each(function () {
                    var t = n(this), e = n(this).data("resizable-alsoresize"), u = {}, f = i && i.length ? i : ["width", "height", "top", "left"];
                    n.each(f || ["width", "height", "top", "left"], function (n, t) {
                        var i = (e[t] || 0) + (s[t] || 0);
                        i && i >= 0 && (u[t] = i || null)
                    }), /relative/.test(t.css("position")) && n.browser.opera && (r._revertToRelativePosition = !0, t.css({
                        position: "absolute",
                        top: "auto",
                        left: "auto"
                    })), t.css(u)
                })
            };
            typeof u.alsoResize != "object" || u.alsoResize.nodeType ? f(u.alsoResize) : n.each(u.alsoResize, function (n, t) {
                f(n, t)
            })
        }, stop: function () {
            var r = n(this).data("resizable");
            r._revertToRelativePosition && n.browser.opera && (r._revertToRelativePosition = !1, el.css({position: "relative"})), n(this).removeData("resizable-alsoresize-start")
        }
    }), n.ui.plugin.add("resizable", "animate", {
        stop: function (t) {
            var r = n(this).data("resizable"), s = r.options, u = r._proportionallyResizeElements, o = u.length && /textarea/i.test(u[0].nodeName), h = o && n.ui.hasScroll(u[0], "left") ? 0 : r.sizeDiff.height, c = o ? 0 : r.sizeDiff.width, l = {
                width: r.size.width - c,
                height: r.size.height - h
            }, f = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null, e = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
            r.element.animate(n.extend(l, e && f ? {top: e, left: f} : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function () {
                    var i = {
                        width: parseInt(r.element.css("width"), 10),
                        height: parseInt(r.element.css("height"), 10),
                        top: parseInt(r.element.css("top"), 10),
                        left: parseInt(r.element.css("left"), 10)
                    };
                    u && u.length && n(u[0]).css({
                        width: i.width,
                        height: i.height
                    }), r._updateCache(i), r._propagate("resize", t)
                }
            })
        }
    }), n.ui.plugin.add("resizable", "containment", {
        start: function () {
            var u = n(this).data("resizable"), v = u.options, y = u.element, e = v.containment, f = e instanceof n ? e.get(0) : /parent/.test(e) ? y.parent().get(0) : e, o, s;
            if (f)if (u.containerElement = n(f), /document/.test(e) || e == document)u.containerOffset = {
                left: 0,
                top: 0
            }, u.containerPosition = {left: 0, top: 0}, u.parentData = {
                element: n(document),
                left: 0,
                top: 0,
                width: n(document).width(),
                height: n(document).height() || document.body.parentNode.scrollHeight
            }; else {
                o = n(f), s = [], n(["Top", "Right", "Left", "Bottom"]).each(function (n, t) {
                    s[n] = i(o.css("padding" + t))
                }), u.containerOffset = o.offset(), u.containerPosition = o.position(), u.containerSize = {
                    height: o.innerHeight() - s[3],
                    width: o.innerWidth() - s[1]
                };
                var h = u.containerOffset, p = u.containerSize.height, c = u.containerSize.width, a = n.ui.hasScroll(f, "left") ? f.scrollWidth : c, l = n.ui.hasScroll(f) ? f.scrollHeight : p;
                u.parentData = {element: f, left: h.left, top: h.top, width: a, height: l}
            }
        }, resize: function (t) {
            var r = n(this).data("resizable"), o = r.options, y = r.containerSize, u = r.containerOffset, p = r.size, l = r.position, e = r._aspectRatio || t.shiftKey, f = {
                top: 0,
                left: 0
            }, c = r.containerElement;
            c[0] != document && /static/.test(c.css("position")) && (f = u), l.left < (r._helper ? u.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - u.left : r.position.left - f.left), e && (r.size.height = r.size.width / o.aspectRatio), r.position.left = o.helper ? u.left : 0), l.top < (r._helper ? u.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - u.top : r.position.top), e && (r.size.width = r.size.height * o.aspectRatio), r.position.top = r._helper ? u.top : 0), r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top;
            var s = Math.abs((r._helper ? r.offset.left - f.left : r.offset.left - f.left) + r.sizeDiff.width), h = Math.abs((r._helper ? r.offset.top - f.top : r.offset.top - u.top) + r.sizeDiff.height), a = r.containerElement.get(0) == r.element.parent().get(0), v = /relative|absolute/.test(r.containerElement.css("position"));
            a && v && (s -= r.parentData.left), s + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - s, e && (r.size.height = r.size.width / r.aspectRatio)), h + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - h, e && (r.size.width = r.size.height * r.aspectRatio))
        }, stop: function () {
            var r = n(this).data("resizable"), h = r.options, a = r.position, c = r.containerOffset, l = r.containerPosition, s = r.containerElement, u = n(r.helper), e = u.offset(), o = u.outerWidth() - r.sizeDiff.width, f = u.outerHeight() - r.sizeDiff.height;
            r._helper && !h.animate && /relative/.test(s.css("position")) && n(this).css({
                left: e.left - l.left - c.left,
                width: o,
                height: f
            }), r._helper && !h.animate && /static/.test(s.css("position")) && n(this).css({
                left: e.left - l.left - c.left,
                width: o,
                height: f
            })
        }
    }), n.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var r = n(this).data("resizable"), f = r.options, u = r.size;
            r.ghost = r.originalElement.clone(), r.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: u.height,
                width: u.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof f.ghost == "string" ? f.ghost : ""), r.ghost.appendTo(r.helper)
        }, resize: function () {
            var r = n(this).data("resizable"), u = r.options;
            r.ghost && r.ghost.css({position: "relative", height: r.size.height, width: r.size.width})
        }, stop: function () {
            var r = n(this).data("resizable"), u = r.options;
            r.ghost && r.helper && r.helper.get(0).removeChild(r.ghost.get(0))
        }
    }), n.ui.plugin.add("resizable", "grid", {
        resize: function (t) {
            var r = n(this).data("resizable"), f = r.options, c = r.size, u = r.originalSize, s = r.originalPosition, h = r.axis, l = f._aspectRatio || t.shiftKey, e, o;
            f.grid = typeof f.grid == "number" ? [f.grid, f.grid] : f.grid, e = Math.round((c.width - u.width) / (f.grid[0] || 1)) * (f.grid[0] || 1), o = Math.round((c.height - u.height) / (f.grid[1] || 1)) * (f.grid[1] || 1), /^(se|s|e)$/.test(h) ? (r.size.width = u.width + e, r.size.height = u.height + o) : /^(ne)$/.test(h) ? (r.size.width = u.width + e, r.size.height = u.height + o, r.position.top = s.top - o) : /^(sw)$/.test(h) ? (r.size.width = u.width + e, r.size.height = u.height + o, r.position.left = s.left - e) : (r.size.width = u.width + e, r.size.height = u.height + o, r.position.top = s.top - o, r.position.left = s.left - e)
        }
    });
    var i = function (n) {
        return parseInt(n, 10) || 0
    }, t = function (n) {
        return !isNaN(parseInt(n, 10))
    }
}(jQuery), function (n) {
    n.widget("ui.selectable", n.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        }, _create: function () {
            var i = this, t;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
                t = n(i.options.filter, i.element[0]), t.each(function () {
                    var t = n(this), i = t.offset();
                    n.data(this, "selectable-item", {
                        element: this,
                        $element: t,
                        left: i.left,
                        top: i.top,
                        right: i.left + t.outerWidth(),
                        bottom: i.top + t.outerHeight(),
                        startselected: !1,
                        selected: t.hasClass("ui-selected"),
                        selecting: t.hasClass("ui-selecting"),
                        unselecting: t.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = n(document.createElement("div")).css({border: "1px dotted black"}).addClass("ui-selectable-helper")
        }, destroy: function () {
            return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
        }, _mouseStart: function (t) {
            var r = this, i;
            if (this.opos = [t.pageX, t.pageY], !this.options.disabled)i = this.options, this.selectees = n(i.filter, this.element[0]), this._trigger("start", t), n(i.appendTo).append(this.helper), this.helper.css({
                "z-index": 100,
                position: "absolute",
                left: t.clientX,
                top: t.clientY,
                width: 0,
                height: 0
            }), i.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                var i = n.data(this, "selectable-item");
                i.startselected = !0, t.metaKey || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, r._trigger("unselecting", t, {unselecting: i.element}))
            }), n(t.target).parents().andSelf().each(function () {
                var i = n.data(this, "selectable-item");
                if (i)return i.$element.removeClass("ui-unselecting").addClass("ui-selecting"), i.unselecting = !1, i.selecting = !0, i.selected = !0, r._trigger("selecting", t, {selecting: i.element}), !1
            })
        }, _mouseDrag: function (t) {
            var o = this, e;
            if (this.dragged = !0, !this.options.disabled) {
                var s = this.options, i = this.opos[0], r = this.opos[1], f = t.pageX, u = t.pageY;
                return i > f && (e = f, f = i, i = e), r > u && (e = u, u = r, r = e), this.helper.css({
                    left: i,
                    top: r,
                    width: f - i,
                    height: u - r
                }), this.selectees.each(function () {
                    var e = n.data(this, "selectable-item"), h;
                    if (e && e.element != o.element[0])h = !1, s.tolerance == "touch" ? h = !(e.left > f || e.right < i || e.top > u || e.bottom < r) : s.tolerance == "fit" && (h = e.left > i && e.right < f && e.top > r && e.bottom < u), h ? (e.selected && (e.$element.removeClass("ui-selected"), e.selected = !1), e.unselecting && (e.$element.removeClass("ui-unselecting"), e.unselecting = !1), e.selecting || (e.$element.addClass("ui-selecting"), e.selecting = !0, o._trigger("selecting", t, {selecting: e.element}))) : (e.selecting && (t.metaKey && e.startselected ? (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.$element.addClass("ui-selected"), e.selected = !0) : (e.$element.removeClass("ui-selecting"), e.selecting = !1, e.startselected && (e.$element.addClass("ui-unselecting"), e.unselecting = !0), o._trigger("unselecting", t, {unselecting: e.element}))), e.selected && (t.metaKey || e.startselected || (e.$element.removeClass("ui-selected"), e.selected = !1, e.$element.addClass("ui-unselecting"), e.unselecting = !0, o._trigger("unselecting", t, {unselecting: e.element}))))
                }), !1
            }
        }, _mouseStop: function (t) {
            var i = this, r;
            return this.dragged = !1, r = this.options, n(".ui-unselecting", this.element[0]).each(function () {
                var r = n.data(this, "selectable-item");
                r.$element.removeClass("ui-unselecting"), r.unselecting = !1, r.startselected = !1, i._trigger("unselected", t, {unselected: r.element})
            }), n(".ui-selecting", this.element[0]).each(function () {
                var r = n.data(this, "selectable-item");
                r.$element.removeClass("ui-selecting").addClass("ui-selected"), r.selecting = !1, r.selected = !0, r.startselected = !0, i._trigger("selected", t, {selected: r.element})
            }), this._trigger("stop", t), this.helper.remove(), !1
        }
    }), n.extend(n.ui.selectable, {version: "1.8"})
}(jQuery), function (n) {
    n.widget("ui.sortable", n.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3
        },
        _create: function () {
            var n = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) : !1, this.offset = this.element.offset(), this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable"), this._mouseDestroy();
            for (var n = this.items.length - 1; n >= 0; n--)this.items[n].item.removeData("sortable-item");
            return this
        },
        _mouseCapture: function (t, i) {
            var u;
            if (this.reverting || this.options.disabled || this.options.type == "static")return !1;
            this._refreshItems(t);
            var r = null, f = this, e = n(t.target).parents().each(function () {
                if (n.data(this, "sortable-item") == f)return r = n(this), !1
            });
            return (n.data(t.target, "sortable-item") == f && (r = n(t.target)), !r) ? !1 : this.options.handle && !i && (u = !1, n(this.options.handle, r).find("*").andSelf().each(function () {
                this == t.target && (u = !0)
            }), !u) ? !1 : (this.currentItem = r, this._removeCurrentsFromItems(), !0)
        },
        _mouseStart: function (t, i, r) {
            var u = this.options, e = this, f;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), n.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    }, parent: this._getParentOffset(), relative: this._getRelativeOffset()
                }), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), u.containment && this._setContainment(), u.cursor && (n("body").css("cursor") && (this._storedCursor = n("body").css("cursor")), n("body").css("cursor", u.cursor)), u.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", u.opacity)), u.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", u.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !r)for (f = this.containers.length - 1; f >= 0; f--)this.containers[f]._trigger("activate", t, e._uiHash(this));
            return n.ui.ddmanager && (n.ui.ddmanager.current = this), n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
        },
        _mouseDrag: function (t) {
            var i, r, e;
            for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (i = this.options, r = !1, this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - n(document).scrollTop() < i.scrollSensitivity ? r = n(document).scrollTop(n(document).scrollTop() - i.scrollSpeed) : n(window).height() - (t.pageY - n(document).scrollTop()) < i.scrollSensitivity && (r = n(document).scrollTop(n(document).scrollTop() + i.scrollSpeed)), t.pageX - n(document).scrollLeft() < i.scrollSensitivity ? r = n(document).scrollLeft(n(document).scrollLeft() - i.scrollSpeed) : n(window).width() - (t.pageX - n(document).scrollLeft()) < i.scrollSensitivity && (r = n(document).scrollLeft(n(document).scrollLeft() + i.scrollSpeed))), r !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && this.options.axis == "y" || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && this.options.axis == "x" || (this.helper[0].style.top = this.position.top + "px"), e = this.items.length - 1; e >= 0; e--) {
                var f = this.items[e], u = f.item[0], o = this._intersectsWithPointer(f);
                if (!o)continue;
                if (u != this.currentItem[0] && this.placeholder[o == 1 ? "next" : "prev"]()[0] != u && !n.ui.contains(this.placeholder[0], u) && (this.options.type == "semi-dynamic" ? !n.ui.contains(this.element[0], u) : !0)) {
                    if (this.direction = o == 1 ? "down" : "up", this.options.tolerance == "pointer" || this._intersectsWithSides(f))this._rearrange(t, f); else break;
                    this._trigger("change", t, this._uiHash());
                    break
                }
            }
            return this._contactContainers(t), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function (t, i) {
            if (t) {
                if (n.ui.ddmanager && !this.options.dropBehaviour && n.ui.ddmanager.drop(this, t), this.options.revert) {
                    var r = this, u = r.placeholder.offset();
                    r.reverting = !0, n(this.helper).animate({
                        left: u.left - this.offset.parent.left - r.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: u.top - this.offset.parent.top - r.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        r._clear(t)
                    })
                } else this._clear(t, i);
                return !1
            }
        },
        cancel: function () {
            var i = this, t;
            if (this.dragging)for (this._mouseUp(), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show(), t = this.containers.length - 1; t >= 0; t--)this.containers[t]._trigger("deactivate", null, i._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, i._uiHash(this)), this.containers[t].containerCache.over = 0);
            return this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), n.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? n(this.domPosition.prev).after(this.currentItem) : n(this.domPosition.parent).prepend(this.currentItem), this
        },
        serialize: function (t) {
            var r = this._getItemsAsjQuery(t && t.connected), i = [];
            return t = t || {}, n(r).each(function () {
                var r = (n(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[-=_](.+)/);
                r && i.push((t.key || r[1] + "[]") + "=" + (t.key && t.expression ? r[1] : r[2]))
            }), i.join("&")
        },
        toArray: function (t) {
            var r = this._getItemsAsjQuery(t && t.connected), i = [];
            return t = t || {}, r.each(function () {
                i.push(n(t.item || this).attr(t.attribute || "id") || "")
            }), i
        },
        _intersectsWith: function (n) {
            var i = this.positionAbs.left, c = i + this.helperProportions.width, t = this.positionAbs.top, l = t + this.helperProportions.height, r = n.left, s = r + n.width, u = n.top, o = u + n.height, f = this.offset.click.top, e = this.offset.click.left, h = t + f > u && t + f < o && i + e > r && i + e < s;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"] ? h : r < i + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < s && u < t + this.helperProportions.height / 2 && l - this.helperProportions.height / 2 < o
        },
        _intersectsWithPointer: function (t) {
            var f = n.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height), u = n.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width), e = f && u, i = this._getDragVerticalDirection(), r = this._getDragHorizontalDirection();
            return e ? this.floating ? r && r == "right" || i == "down" ? 2 : 1 : i && (i == "down" ? 2 : 1) : !1
        },
        _intersectsWithSides: function (t) {
            var f = n.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height), u = n.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width), i = this._getDragVerticalDirection(), r = this._getDragHorizontalDirection();
            return this.floating && r ? r == "right" && u || r == "left" && !u : i && (i == "down" && f || i == "up" && !f)
        },
        _getDragVerticalDirection: function () {
            var n = this.positionAbs.top - this.lastPositionAbs.top;
            return n != 0 && (n > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var n = this.positionAbs.left - this.lastPositionAbs.left;
            return n != 0 && (n > 0 ? "right" : "left")
        },
        refresh: function (n) {
            return this._refreshItems(n), this.refreshPositions(), this
        },
        _connectWith: function () {
            var n = this.options;
            return n.connectWith.constructor == String ? [n.connectWith] : n.connectWith
        },
        _getItemsAsjQuery: function (t) {
            var h = this, s = [], f = [], o = this._connectWith(), e, u, i, r;
            if (o && t)for (r = o.length - 1; r >= 0; r--)for (e = n(o[r]), u = e.length - 1; u >= 0; u--)i = n.data(e[u], "sortable"), i && i != this && !i.options.disabled && f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element) : n(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i]);
            for (f.push([n.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : n(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), r = f.length - 1; r >= 0; r--)f[r][0].each(function () {
                s.push(this)
            });
            return n(s)
        },
        _removeCurrentsFromItems: function () {
            for (var i = this.currentItem.find(":data(sortable-item)"), t, n = 0; n < this.items.length; n++)for (t = 0; t < i.length; t++)i[t] == this.items[n].item[0] && this.items.splice(n, 1)
        },
        _refreshItems: function (t) {
            var c, i, r, e, s, u, l, o;
            this.items = [], this.containers = [this];
            var a = this.items, v = this, f = [[n.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {item: this.currentItem}) : n(this.options.items, this.element), this]], h = this._connectWith();
            if (h)for (r = h.length - 1; r >= 0; r--)for (c = n(h[r]), u = c.length - 1; u >= 0; u--)i = n.data(c[u], "sortable"), i && i != this && !i.options.disabled && (f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {item: this.currentItem}) : n(i.options.items, i.element), i]), this.containers.push(i));
            for (r = f.length - 1; r >= 0; r--)for (e = f[r][1], s = f[r][0], u = 0, l = s.length; u < l; u++)o = n(s[u]), o.data("sortable-item", e), a.push({
                item: o,
                instance: e,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            })
        },
        refreshPositions: function (t) {
            var r, f, i, u;
            for (this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset()), i = this.items.length - 1; i >= 0; i--)r = this.items[i], f = this.options.toleranceElement ? n(this.options.toleranceElement, r.item) : r.item, t || (r.width = f.outerWidth(), r.height = f.outerHeight()), u = f.offset(), r.left = u.left, r.top = u.top;
            if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--)u = this.containers[i].element.offset(), this.containers[i].containerCache.left = u.left, this.containers[i].containerCache.top = u.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function (t) {
            var i = t || this, r = i.options, u;
            r.placeholder && r.placeholder.constructor != String || (u = r.placeholder, r.placeholder = {
                element: function () {
                    var t = n(document.createElement(i.currentItem[0].nodeName)).addClass(u || i.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                    return u || (t.style.visibility = "hidden"), t
                }, update: function (n, t) {
                    if (!u || r.forcePlaceholderSize)t.height() || t.height(i.currentItem.innerHeight() - parseInt(i.currentItem.css("paddingTop") || 0, 10) - parseInt(i.currentItem.css("paddingBottom") || 0, 10)), t.width() || t.width(i.currentItem.innerWidth() - parseInt(i.currentItem.css("paddingLeft") || 0, 10) - parseInt(i.currentItem.css("paddingRight") || 0, 10))
                }
            }), i.placeholder = n(r.placeholder.element.call(i.element, i.currentItem)), i.currentItem.after(i.placeholder), r.placeholder.update(i, i.placeholder)
        },
        _contactContainers: function (t) {
            for (var e = null, i = null, u, o, r = this.containers.length - 1; r >= 0; r--) {
                if (n.ui.contains(this.currentItem[0], this.containers[r].element[0]))continue;
                if (this._intersectsWith(this.containers[r].containerCache)) {
                    if (e && n.ui.contains(this.containers[r].element[0], e.element[0]))continue;
                    e = this.containers[r], i = r
                } else this.containers[r].containerCache.over && (this.containers[r]._trigger("out", t, this._uiHash(this)), this.containers[r].containerCache.over = 0)
            }
            if (e)if (this.containers.length === 1)this.containers[i]._trigger("over", t, this._uiHash(this)), this.containers[i].containerCache.over = 1; else if (this.currentContainer != this.containers[i]) {
                var s = 1e4, f = null, h = this.positionAbs[this.containers[i].floating ? "left" : "top"];
                for (u = this.items.length - 1; u >= 0; u--) {
                    if (!n.ui.contains(this.containers[i].element[0], this.items[u].item[0]))continue;
                    o = this.items[u][this.containers[i].floating ? "left" : "top"], Math.abs(o - h) < s && (s = Math.abs(o - h), f = this.items[u])
                }
                if (!f && !this.options.dropOnEmpty)return;
                this.currentContainer = this.containers[i], f ? this._rearrange(t, f, null, !0) : this._rearrange(t, null, this.containers[i].element, !0), this._trigger("change", t, this._uiHash()), this.containers[i]._trigger("change", t, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[i]._trigger("over", t, this._uiHash(this)), this.containers[i].containerCache.over = 1
            }
        },
        _createHelper: function (t) {
            var r = this.options, i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t, this.currentItem])) : r.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            return i.parents("body").length || n(r.appendTo != "parent" ? r.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] == this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (i[0].style.width == "" || r.forceHelperSize) && i.width(this.currentItem.width()), (i[0].style.height == "" || r.forceHelperSize) && i.height(this.currentItem.height()), i
        },
        _adjustOffsetFromHelper: function (t) {
            typeof t == "string" && (t = t.split(" ")), n.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left"in t && (this.offset.click.left = t.left + this.margins.left), "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top"in t && (this.offset.click.top = t.top + this.margins.top), "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return this.cssPosition == "absolute" && this.scrollParent[0] != document && n.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && n.browser.msie) && (t = {
                top: 0,
                left: 0
            }), {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var n = this.currentItem.position();
                return {
                    top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var i = this.options;
            if (i.containment == "parent" && (i.containment = this.helper[0].parentNode), (i.containment == "document" || i.containment == "window") && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, n(i.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (n(i.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), !/^(document|window|parent)$/.test(i.containment)) {
                var t = n(i.containment)[0], r = n(i.containment).offset(), u = n(t).css("overflow") != "hidden";
                this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (t, i) {
            i || (i = this.position);
            var r = t == "absolute" ? 1 : -1, e = this.options, u = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && n.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, f = /(html|body)/i.test(u[0].tagName);
            return {
                top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - (n.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r),
                left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - (n.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r)
            }
        },
        _generatePosition: function (t) {
            var i = this.options, o = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && n.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, s = /(html|body)/i.test(o[0].tagName), e, f, r, u;
            return this.cssPosition != "relative" || this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), e = t.pageX, f = t.pageY, this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (e = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (f = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (e = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (f = this.containment[3] + this.offset.click.top)), i.grid && (r = this.originalPageY + Math.round((f - this.originalPageY) / i.grid[1]) * i.grid[1], f = this.containment ? r - this.offset.click.top < this.containment[1] || r - this.offset.click.top > this.containment[3] ? r - this.offset.click.top < this.containment[1] ? r + i.grid[1] : r - i.grid[1] : r : r, u = this.originalPageX + Math.round((e - this.originalPageX) / i.grid[0]) * i.grid[0], e = this.containment ? u - this.offset.click.left < this.containment[0] || u - this.offset.click.left > this.containment[2] ? u - this.offset.click.left < this.containment[0] ? u + i.grid[0] : u - i.grid[0] : u : u)), {
                top: f - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (n.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
                left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (n.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
            }
        },
        _rearrange: function (n, t, i, r) {
            i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var u = this, f = this.counter;
            window.setTimeout(function () {
                f == u.counter && u.refreshPositions(!r)
            }, 0)
        },
        _clear: function (t, i) {
            var u, f, r;
            if (this.reverting = !1, u = [], f = this, !this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
                for (r in this._storedCSS)(this._storedCSS[r] == "auto" || this._storedCSS[r] == "static") && (this._storedCSS[r] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            if (this.fromOutside && !i && u.push(function (n) {
                    this._trigger("receive", n, this._uiHash(this.fromOutside))
                }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !i && u.push(function (n) {
                    this._trigger("update", n, this._uiHash())
                }), !n.ui.contains(this.element[0], this.currentItem[0]))for (i || u.push(function (n) {
                this._trigger("remove", n, this._uiHash())
            }), r = this.containers.length - 1; r >= 0; r--)n.ui.contains(this.containers[r].element[0], this.currentItem[0]) && !i && (u.push(function (n) {
                return function (t) {
                    n._trigger("receive", t, this._uiHash(this))
                }
            }.call(this, this.containers[r])), u.push(function (n) {
                return function (t) {
                    n._trigger("update", t, this._uiHash(this))
                }
            }.call(this, this.containers[r])));
            for (r = this.containers.length - 1; r >= 0; r--)i || u.push(function (n) {
                return function (t) {
                    n._trigger("deactivate", t, this._uiHash(this))
                }
            }.call(this, this.containers[r])), this.containers[r].containerCache.over && (u.push(function (n) {
                return function (t) {
                    n._trigger("out", t, this._uiHash(this))
                }
            }.call(this, this.containers[r])), this.containers[r].containerCache.over = 0);
            if (this._storedCursor && n("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!i) {
                    for (this._trigger("beforeStop", t, this._uiHash()), r = 0; r < u.length; r++)u[r].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return !1
            }
            if (i || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, !i) {
                for (r = 0; r < u.length; r++)u[r].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function () {
            n.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function (t) {
            var i = t || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || n([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: t ? t.element : null
            }
        }
    }), n.extend(n.ui.sortable, {version: "1.8"})
}(jQuery), function (n) {
    n.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: !0,
            clearStyle: !1,
            collapsible: !1,
            event: "click",
            fillSpace: !1,
            header: "> li > :first-child,> :not(li):even",
            icons: {header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s"},
            navigation: !1,
            navigationFilter: function () {
                return this.href.toLowerCase() == location.href.toLowerCase()
            }
        }, _create: function () {
            var t = this.options, u = this, i, r;
            this.running = 0, this.element.addClass("ui-accordion ui-widget ui-helper-reset"), this.element[0].nodeName == "UL" && this.element.children("li").addClass("ui-accordion-li-fix"), this.headers = this.element.find(t.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                n(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                n(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function () {
                n(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                n(this).removeClass("ui-state-focus")
            }), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"), t.navigation && (i = this.element.find("a").filter(t.navigationFilter), i.length && (r = i.closest(".ui-accordion-header"), this.active = r.length ? r : i.closest(".ui-accordion-content").prev())), this.active = this._findActive(this.active || t.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), this.active.next().addClass("ui-accordion-content-active"), this._createIcons(), n.browser.msie && this.element.find("a").css("zoom", "1"), this.resize(), this.element.attr("role", "tablist"), this.headers.attr("role", "tab").bind("keydown", function (n) {
                return u._keydown(n)
            }).next().attr("role", "tabpanel"), this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide(), this.active.length ? this.active.attr("aria-expanded", "true").attr("tabIndex", "0") : this.headers.eq(0).attr("tabIndex", "0"), n.browser.safari || this.headers.find("a").attr("tabIndex", "-1"), t.event && this.headers.bind(t.event + ".accordion", function (n) {
                u._clickHandler.call(u, n, this), n.preventDefault()
            })
        }, _createIcons: function () {
            var t = this.options;
            t.icons && (n("<span/>").addClass("ui-icon " + t.icons.header).prependTo(this.headers), this.active.find(".ui-icon").toggleClass(t.icons.header).toggleClass(t.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
        }, _destroyIcons: function () {
            this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
        }, destroy: function () {
            var t = this.options, n;
            return this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex"), this.headers.find("a").removeAttr("tabindex"), this._destroyIcons(), n = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active"), (t.autoHeight || t.fillHeight) && n.css("height", ""), this
        }, _setOption: function (t, i) {
            n.Widget.prototype._setOption.apply(this, arguments), t == "active" && this.activate(i), t == "icons" && (this._destroyIcons(), i && this._createIcons())
        }, _keydown: function (t) {
            var e = this.options, i = n.ui.keyCode;
            if (!e.disabled && !t.altKey && !t.ctrlKey) {
                var u = this.headers.length, f = this.headers.index(t.target), r = !1;
                switch (t.keyCode) {
                    case i.RIGHT:
                    case i.DOWN:
                        r = this.headers[(f + 1) % u];
                        break;
                    case i.LEFT:
                    case i.UP:
                        r = this.headers[(f - 1 + u) % u];
                        break;
                    case i.SPACE:
                    case i.ENTER:
                        this._clickHandler({target: t.target}, t.target), t.preventDefault()
                }
                return r ? (n(t.target).attr("tabIndex", "-1"), n(r).attr("tabIndex", "0"), r.focus(), !1) : !0
            }
        }, resize: function () {
            var r = this.options, t, i;
            return r.fillSpace ? (n.browser.msie && (i = this.element.parent().css("overflow"), this.element.parent().css("overflow", "hidden")), t = this.element.parent().height(), n.browser.msie && this.element.parent().css("overflow", i), this.headers.each(function () {
                t -= n(this).outerHeight(!0)
            }), this.headers.next().each(function () {
                n(this).height(Math.max(0, t - n(this).innerHeight() + n(this).height()))
            }).css("overflow", "auto")) : r.autoHeight && (t = 0, this.headers.next().each(function () {
                t = Math.max(t, n(this).height())
            }).height(t)), this
        }, activate: function (n) {
            this.options.active = n;
            var t = this._findActive(n)[0];
            return this._clickHandler({target: t}, t), this
        }, _findActive: function (t) {
            return t ? typeof t == "number" ? this.headers.filter(":eq(" + t + ")") : this.headers.not(this.headers.not(t)) : t === !1 ? n([]) : this.headers.filter(":eq(0)")
        }, _clickHandler: function (t, i) {
            var r = this.options, u, f;
            if (!r.disabled) {
                if (!t.target) {
                    if (!r.collapsible)return;
                    this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header), this.active.next().addClass("ui-accordion-content-active");
                    var e = this.active.next(), s = {
                        options: r,
                        newHeader: n([]),
                        oldHeader: r.active,
                        newContent: n([]),
                        oldContent: e
                    }, o = this.active = n([]);
                    this._toggle(o, e, s);
                    return
                }
                if (u = n(t.currentTarget || i), f = u[0] == this.active[0], r.active = r.collapsible && f ? !1 : n(".ui-accordion-header", this.element).index(u), !this.running && (r.collapsible || !f)) {
                    this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header), f || (u.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(r.icons.header).addClass(r.icons.headerSelected), u.next().addClass("ui-accordion-content-active"));
                    var o = u.next(), e = this.active.next(), s = {
                        options: r,
                        newHeader: f && r.collapsible ? n([]) : u,
                        oldHeader: this.active,
                        newContent: f && r.collapsible ? n([]) : o,
                        oldContent: e
                    }, h = this.headers.index(this.active[0]) > this.headers.index(u[0]);
                    this.active = f ? n([]) : u, this._toggle(o, e, s, f, h);
                    return
                }
            }
        }, _toggle: function (t, i, r, u, f) {
            var e = this.options, l = this, c, s;
            if (this.toShow = t, this.toHide = i, this.data = r, c = function () {
                    if (l)return l._completed.apply(l, arguments)
                }, this._trigger("changestart", null, this.data), this.running = i.size() === 0 ? t.size() : i.size(), e.animated) {
                s = {}, s = e.collapsible && u ? {
                    toShow: n([]),
                    toHide: i,
                    complete: c,
                    down: f,
                    autoHeight: e.autoHeight || e.fillSpace
                } : {
                    toShow: t,
                    toHide: i,
                    complete: c,
                    down: f,
                    autoHeight: e.autoHeight || e.fillSpace
                }, e.proxied || (e.proxied = e.animated), e.proxiedDuration || (e.proxiedDuration = e.duration), e.animated = n.isFunction(e.proxied) ? e.proxied(s) : e.proxied, e.duration = n.isFunction(e.proxiedDuration) ? e.proxiedDuration(s) : e.proxiedDuration;
                var h = n.ui.accordion.animations, a = e.duration, o = e.animated;
                !o || h[o] || n.easing[o] || (o = "slide"), h[o] || (h[o] = function (n) {
                    this.slide(n, {easing: o, duration: a || 700})
                }), h[o](s)
            } else e.collapsible && u ? t.toggle() : (i.hide(), t.show()), c(!0);
            i.prev().attr("aria-expanded", "false").attr("tabIndex", "-1").blur(), t.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus()
        }, _completed: function (n) {
            var t = this.options;
            if (this.running = n ? 0 : --this.running, !this.running)t.clearStyle && this.toShow.add(this.toHide).css({
                height: "",
                overflow: ""
            }), this.toHide.removeClass("ui-accordion-content-active"), this._trigger("change", null, this.data)
        }
    }), n.extend(n.ui.accordion, {
        version: "1.8", animations: {
            slide: function (t, i) {
                if (t = n.extend({easing: "swing", duration: 300}, t, i), !t.toHide.size()) {
                    t.toShow.animate({height: "show"}, t);
                    return
                }
                if (!t.toShow.size()) {
                    t.toHide.animate({height: "hide"}, t);
                    return
                }
                var s = t.toShow.css("overflow"), e = 0, u = {}, o = {}, h = ["height", "paddingTop", "paddingBottom"], f, r = t.toShow;
                f = r[0].style.width, r.width(parseInt(r.parent().width(), 10) - parseInt(r.css("paddingLeft"), 10) - parseInt(r.css("paddingRight"), 10) - (parseInt(r.css("borderLeftWidth"), 10) || 0) - (parseInt(r.css("borderRightWidth"), 10) || 0)), n.each(h, function (i, r) {
                    o[r] = "hide";
                    var f = ("" + n.css(t.toShow[0], r)).match(/^([\d+-.]+)(.*)$/);
                    u[r] = {value: f[1], unit: f[2] || "px"}
                }), t.toShow.css({
                    height: 0,
                    overflow: "hidden"
                }).show(), t.toHide.filter(":hidden").each(t.complete).end().filter(":visible").animate(o, {
                    step: function (n, i) {
                        i.prop == "height" && (e = i.end - i.start == 0 ? 0 : (i.now - i.start) / (i.end - i.start)), t.toShow[0].style[i.prop] = e * u[i.prop].value + u[i.prop].unit
                    }, duration: t.duration, easing: t.easing, complete: function () {
                        t.autoHeight || t.toShow.css("height", ""), t.toShow.css("width", f), t.toShow.css({overflow: s}), t.complete()
                    }
                })
            }, bounceslide: function (n) {
                this.slide(n, {easing: n.down ? "easeOutBounce" : "swing", duration: n.down ? 1e3 : 200})
            }
        }
    })
}(jQuery), function (n) {
    var t, r = "ui-button ui-widget ui-state-default ui-corner-all", u = "ui-state-hover ui-state-active ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon ui-button-text-only", f = function (t) {
        n(":ui-button", t.target.form).each(function () {
            var t = n(this).data("button");
            setTimeout(function () {
                t.refresh()
            }, 1)
        })
    }, i = function (t) {
        var r = t.name, u = t.form, i = n([]);
        return r && (i = u ? n(u).find("[name='" + r + "']") : n("[name='" + r + "']", t.ownerDocument).filter(function () {
            return !this.form
        })), i
    };
    n.widget("ui.button", {
        options: {text: !0, label: null, icons: {primary: null, secondary: null}},
        _create: function () {
            this.element.closest("form").unbind("reset.button").bind("reset.button", f), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var e = this, u = this.options, s = this.type === "checkbox" || this.type === "radio", h = "ui-state-hover" + (s ? "" : " ui-state-active"), o = "ui-state-focus";
            u.label === null && (u.label = this.buttonElement.html()), this.element.is(":disabled") && (u.disabled = !0), this.buttonElement.addClass(r).attr("role", "button").bind("mouseenter.button", function () {
                if (!u.disabled)n(this).addClass("ui-state-hover"), this === t && n(this).addClass("ui-state-active")
            }).bind("mouseleave.button", function () {
                if (!u.disabled)n(this).removeClass(h)
            }).bind("focus.button", function () {
                n(this).addClass(o)
            }).bind("blur.button", function () {
                n(this).removeClass(o)
            }), s && this.element.bind("change.button", function () {
                e.refresh()
            }), this.type === "checkbox" ? this.buttonElement.bind("click.button", function () {
                if (u.disabled)return !1;
                n(this).toggleClass("ui-state-active"), e.buttonElement.attr("aria-pressed", e.element[0].checked)
            }) : this.type === "radio" ? this.buttonElement.bind("click.button", function () {
                if (u.disabled)return !1;
                n(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", !0);
                var t = e.element[0];
                i(t).not(t).map(function () {
                    return n(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", !1)
            }) : (this.buttonElement.bind("mousedown.button", function () {
                if (u.disabled)return !1;
                n(this).addClass("ui-state-active"), t = this;
                n(document).one("mouseup", function () {
                    t = null
                })
            }).bind("mouseup.button", function () {
                if (u.disabled)return !1;
                n(this).removeClass("ui-state-active")
            }).bind("keydown.button", function (t) {
                if (u.disabled)return !1;
                (t.keyCode == n.ui.keyCode.SPACE || t.keyCode == n.ui.keyCode.ENTER) && n(this).addClass("ui-state-active")
            }).bind("keyup.button", function () {
                n(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (t) {
                t.keyCode === n.ui.keyCode.SPACE && n(this).click()
            })), this._setOption("disabled", u.disabled)
        },
        _determineButtonType: function () {
            if (this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button", this.type === "checkbox" || this.type === "radio") {
                this.buttonElement = this.element.parents().last().find("[for=" + this.element.attr("id") + "]"), this.element.addClass("ui-helper-hidden-accessible");
                var n = this.element.is(":checked");
                n && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", n)
            } else this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(r + " " + u).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), n.Widget.prototype.destroy.call(this)
        },
        _setOption: function (t, i) {
            n.Widget.prototype._setOption.apply(this, arguments), t === "disabled" && (i ? this.element.attr("disabled", !0) : this.element.removeAttr("disabled")), this._resetButton()
        },
        refresh: function () {
            var t = this.element.is(":disabled");
            t !== this.options.disabled && this._setOption("disabled", t), this.type === "radio" ? i(this.element[0]).each(function () {
                n(this).is(":checked") ? n(this).button("widget").addClass("ui-state-active").attr("aria-pressed", !0) : n(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", !1)
            }) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", !0) : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", !1))
        },
        _resetButton: function () {
            if (this.type === "input") {
                this.options.label && this.element.val(this.options.label);
                return
            }
            var i = this.buttonElement, u = n("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(i.empty()).text(), t = this.options.icons, r = t.primary && t.secondary;
            t.primary || t.secondary ? (i.addClass("ui-button-text-icon" + (r ? "s" : "")), t.primary && i.prepend("<span class='ui-button-icon-primary ui-icon " + t.primary + "'></span>"), t.secondary && i.append("<span class='ui-button-icon-secondary ui-icon " + t.secondary + "'></span>"), this.options.text || (i.addClass(r ? "ui-button-icons-only" : "ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon"), this.hasTitle || i.attr("title", u))) : i.addClass("ui-button-text-only")
        }
    }), n.widget("ui.buttonset", {
        _create: function () {
            this.element.addClass("ui-buttonset"), this._init()
        }, _init: function () {
            this.refresh()
        }, _setOption: function (t, i) {
            t === "disabled" && this.buttons.button("option", t, i), n.Widget.prototype._setOption.apply(this, arguments)
        }, refresh: function () {
            this.buttons = this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return n(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
        }, destroy: function () {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                return n(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), n.Widget.prototype.destroy.call(this)
        }
    })
}(jQuery), function (n) {
    var t = "ui-dialog ui-widget ui-widget-content ui-corner-all ";
    n.widget("ui.dialog", {
        options: {
            autoOpen: !0,
            buttons: {},
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: !1,
            maxWidth: !1,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: "center",
            resizable: !0,
            show: null,
            stack: !0,
            title: "",
            width: 300,
            zIndex: 1e3
        }, _create: function () {
            this.originalTitle = this.element.attr("title");
            var i = this, r = i.options, s = r.title || i.originalTitle || "&#160;", o = n.ui.dialog.getTitleId(i.element), e = (i.uiDialog = n("<div></div>")).appendTo(document.body).hide().addClass(t + r.dialogClass).css({zIndex: r.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(function (t) {
                r.closeOnEscape && t.keyCode && t.keyCode === n.ui.keyCode.ESCAPE && (i.close(t), t.preventDefault())
            }).attr({role: "dialog", "aria-labelledby": o}).mousedown(function (n) {
                i.moveToTop(!1, n)
            }), l = i.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(e), f = (i.uiDialogTitlebar = n("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(e), u = n('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                u.addClass("ui-state-hover")
            }, function () {
                u.removeClass("ui-state-hover")
            }).focus(function () {
                u.addClass("ui-state-focus")
            }).blur(function () {
                u.removeClass("ui-state-focus")
            }).click(function (n) {
                return i.close(n), !1
            }).appendTo(f), c = (i.uiDialogTitlebarCloseText = n("<span></span>")).addClass("ui-icon ui-icon-closethick").text(r.closeText).appendTo(u), h = n("<span></span>").addClass("ui-dialog-title").attr("id", o).html(s).prependTo(f);
            n.isFunction(r.beforeclose) && !n.isFunction(r.beforeClose) && (r.beforeClose = r.beforeclose), f.find("*").add(f).disableSelection(), r.draggable && n.fn.draggable && i._makeDraggable(), r.resizable && n.fn.resizable && i._makeResizable(), i._createButtons(r.buttons), i._isOpen = !1, n.fn.bgiframe && e.bgiframe()
        }, _init: function () {
            this.options.autoOpen && this.open()
        }, destroy: function () {
            var n = this;
            return n.overlay && n.overlay.destroy(), n.uiDialog.hide(), n.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), n.uiDialog.remove(), n.originalTitle && n.element.attr("title", n.originalTitle), n
        }, widget: function () {
            return this.uiDialog
        }, close: function (t) {
            var i = this, r;
            if (!1 !== i._trigger("beforeClose", t))return i.overlay && i.overlay.destroy(), i.uiDialog.unbind("keypress.ui-dialog"), i._isOpen = !1, i.options.hide ? i.uiDialog.hide(i.options.hide, function () {
                i._trigger("close", t)
            }) : (i.uiDialog.hide(), i._trigger("close", t)), n.ui.dialog.overlay.resize(), i.options.modal && (r = 0, n(".ui-dialog").each(function () {
                this !== i.uiDialog[0] && (r = Math.max(r, n(this).css("z-index")))
            }), n.ui.dialog.maxZ = r), i
        }, isOpen: function () {
            return this._isOpen
        }, moveToTop: function (t, i) {
            var r = this, u = r.options, f;
            return u.modal && !t || !u.stack && !u.modal ? r._trigger("focus", i) : (u.zIndex > n.ui.dialog.maxZ && (n.ui.dialog.maxZ = u.zIndex), r.overlay && (n.ui.dialog.maxZ += 1, r.overlay.$el.css("z-index", n.ui.dialog.overlay.maxZ = n.ui.dialog.maxZ)), f = {
                scrollTop: r.element.attr("scrollTop"),
                scrollLeft: r.element.attr("scrollLeft")
            }, n.ui.dialog.maxZ += 1, r.uiDialog.css("z-index", n.ui.dialog.maxZ), r.element.attr(f), r._trigger("focus", i), r)
        }, open: function () {
            if (!this._isOpen) {
                var t = this, r = t.options, i = t.uiDialog;
                return t.overlay = r.modal ? new n.ui.dialog.overlay(t) : null, i.next().length && i.appendTo("body"), t._size(), t._position(r.position), i.show(r.show), t.moveToTop(!0), r.modal && i.bind("keypress.ui-dialog", function (t) {
                    if (t.keyCode === n.ui.keyCode.TAB) {
                        var u = n(":tabbable", this), r = u.filter(":first"), i = u.filter(":last");
                        if (t.target !== i[0] || t.shiftKey) {
                            if (t.target === r[0] && t.shiftKey)return i.focus(1), !1
                        } else return r.focus(1), !1
                    }
                }), n([]).add(i.find(".ui-dialog-content :tabbable:first")).add(i.find(".ui-dialog-buttonpane :tabbable:first")).add(i).filter(":first").focus(), t._trigger("open"), t._isOpen = !0, t
            }
        }, _createButtons: function (t) {
            var i = this, u = !1, r = n("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            i.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof t == "object" && t !== null && n.each(t, function () {
                return !(u = !0)
            }), u && (n.each(t, function (t, u) {
                var f = n('<button type="button"></button>').text(t).click(function () {
                    u.apply(i.element[0], arguments)
                }).appendTo(r);
                n.fn.button && f.button()
            }), r.appendTo(i.uiDialog))
        }, _makeDraggable: function () {
            function i(n) {
                return {position: n.position, offset: n.offset}
            }

            var t = this, f = t.options, r = n(document), u;
            t.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (r, e) {
                    u = f.height === "auto" ? "auto" : n(this).height(), n(this).height(n(this).height()).addClass("ui-dialog-dragging"), t._trigger("dragStart", r, i(e))
                },
                drag: function (n, r) {
                    t._trigger("drag", n, i(r))
                },
                stop: function (e, o) {
                    f.position = [o.position.left - r.scrollLeft(), o.position.top - r.scrollTop()], n(this).removeClass("ui-dialog-dragging").height(u), t._trigger("dragStop", e, i(o)), n.ui.dialog.overlay.resize()
                }
            })
        }, _makeResizable: function (t) {
            function u(n) {
                return {
                    originalPosition: n.originalPosition,
                    originalSize: n.originalSize,
                    position: n.position,
                    size: n.size
                }
            }

            t = t === undefined ? this.options.resizable : t;
            var i = this, r = i.options, f = i.uiDialog.css("position"), e = typeof t == "string" ? t : "n,e,s,w,se,sw,ne,nw";
            i.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: i.element,
                maxWidth: r.maxWidth,
                maxHeight: r.maxHeight,
                minWidth: r.minWidth,
                minHeight: i._minHeight(),
                handles: e,
                start: function (t, r) {
                    n(this).addClass("ui-dialog-resizing"), i._trigger("resizeStart", t, u(r))
                },
                resize: function (n, t) {
                    i._trigger("resize", n, u(t))
                },
                stop: function (t, f) {
                    n(this).removeClass("ui-dialog-resizing"), r.height = n(this).height(), r.width = n(this).width(), i._trigger("resizeStop", t, u(f)), n.ui.dialog.overlay.resize()
                }
            }).css("position", f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        }, _minHeight: function () {
            var n = this.options;
            return n.height === "auto" ? n.minHeight : Math.min(n.minHeight, n.height)
        }, _position: function (t) {
            var i = [], r = [0, 0], u;
            t = t || n.ui.dialog.prototype.options.position, typeof t == "string" || typeof t == "object" && "0"in t ? (i = t.split ? t.split(" ") : [t[0], t[1]], i.length === 1 && (i[1] = i[0]), n.each(["left", "top"], function (n, t) {
                +i[n] === i[n] && (r[n] = i[n], i[n] = t)
            })) : typeof t == "object" && ("left"in t ? (i[0] = "left", r[0] = t.left) : "right"in t && (i[0] = "right", r[0] = -t.right), "top"in t ? (i[1] = "top", r[1] = t.top) : "bottom"in t && (i[1] = "bottom", r[1] = -t.bottom)), u = this.uiDialog.is(":visible"), u || this.uiDialog.show(), this.uiDialog.css({
                top: 0,
                left: 0
            }).position({
                my: i.join(" "),
                at: i.join(" "),
                offset: r.join(" "),
                of: window,
                collision: "fit",
                using: function (t) {
                    var i = n(this).css(t).offset().top;
                    i < 0 && n(this).css("top", t.top - i)
                }
            }), u || this.uiDialog.hide()
        }, _setOption: function (i, r) {
            var f = this, u = f.uiDialog, o = u.is(":data(resizable)"), e = !1;
            switch (i) {
                case"beforeclose":
                    i = "beforeClose";
                    break;
                case"buttons":
                    f._createButtons(r);
                    break;
                case"closeText":
                    f.uiDialogTitlebarCloseText.text("" + r);
                    break;
                case"dialogClass":
                    u.removeClass(f.options.dialogClass).addClass(t + r);
                    break;
                case"disabled":
                    r ? u.addClass("ui-dialog-disabled") : u.removeClass("ui-dialog-disabled");
                    break;
                case"draggable":
                    r ? f._makeDraggable() : u.draggable("destroy");
                    break;
                case"height":
                    e = !0;
                    break;
                case"maxHeight":
                    o && u.resizable("option", "maxHeight", r), e = !0;
                    break;
                case"maxWidth":
                    o && u.resizable("option", "maxWidth", r), e = !0;
                    break;
                case"minHeight":
                    o && u.resizable("option", "minHeight", r), e = !0;
                    break;
                case"minWidth":
                    o && u.resizable("option", "minWidth", r), e = !0;
                    break;
                case"position":
                    f._position(r);
                    break;
                case"resizable":
                    o && !r && u.resizable("destroy"), o && typeof r == "string" && u.resizable("option", "handles", r), o || r === !1 || f._makeResizable(r);
                    break;
                case"title":
                    n(".ui-dialog-title", f.uiDialogTitlebar).html("" + (r || "&#160;"));
                    break;
                case"width":
                    e = !0
            }
            n.Widget.prototype._setOption.apply(f, arguments), e && f._size()
        }, _size: function () {
            var n = this.options, t;
            this.element.css("width", "auto").hide(), t = this.uiDialog.css({
                height: "auto",
                width: n.width
            }).height(), this.element.css(n.height === "auto" ? {
                minHeight: Math.max(n.minHeight - t, 0),
                height: "auto"
            } : {
                minHeight: 0,
                height: Math.max(n.height - t, 0)
            }).show(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    }), n.extend(n.ui.dialog, {
        version: "1.8", uuid: 0, maxZ: 0, getTitleId: function (n) {
            var t = n.attr("id");
            return t || (this.uuid += 1, t = this.uuid), "ui-dialog-title-" + t
        }, overlay: function (t) {
            this.$el = n.ui.dialog.overlay.create(t)
        }
    }), n.extend(n.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: n.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (n) {
            return n + ".dialog-overlay"
        }).join(" "),
        create: function (t) {
            this.instances.length === 0 && (setTimeout(function () {
                n.ui.dialog.overlay.instances.length && n(document).bind(n.ui.dialog.overlay.events, function (t) {
                    return n(t.target).zIndex() >= n.ui.dialog.overlay.maxZ
                })
            }, 1), n(document).bind("keydown.dialog-overlay", function (i) {
                t.options.closeOnEscape && i.keyCode && i.keyCode === n.ui.keyCode.ESCAPE && (t.close(i), i.preventDefault())
            }), n(window).bind("resize.dialog-overlay", n.ui.dialog.overlay.resize));
            var i = (this.oldInstances.pop() || n("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            return n.fn.bgiframe && i.bgiframe(), this.instances.push(i), i
        },
        destroy: function (t) {
            this.oldInstances.push(this.instances.splice(n.inArray(t, this.instances), 1)[0]), this.instances.length === 0 && n([document, window]).unbind(".dialog-overlay"), t.remove();
            var i = 0;
            n.each(this.instances, function () {
                i = Math.max(i, this.css("z-index"))
            }), this.maxZ = i
        },
        height: function () {
            var t, i;
            return n.browser.msie && n.browser.version < 7 ? (t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), i = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), t < i ? n(window).height() + "px" : t + "px") : n(document).height() + "px"
        },
        width: function () {
            var t, i;
            return n.browser.msie && n.browser.version < 7 ? (t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), i = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), t < i ? n(window).width() + "px" : t + "px") : n(document).width() + "px"
        },
        resize: function () {
            var t = n([]);
            n.each(n.ui.dialog.overlay.instances, function () {
                t = t.add(this)
            }), t.css({width: 0, height: 0}).css({
                width: n.ui.dialog.overlay.width(),
                height: n.ui.dialog.overlay.height()
            })
        }
    }), n.extend(n.ui.dialog.overlay.prototype, {
        destroy: function () {
            n.ui.dialog.overlay.destroy(this.$el)
        }
    })
}(jQuery), function (n) {
    var t = 5;
    n.widget("ui.slider", n.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var i = this, r = this.options;
            if (this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), r.disabled && this.element.addClass("ui-slider-disabled ui-disabled"), this.range = n([]), r.range && (r.range === !0 ? (this.range = n("<div></div>"), r.values || (r.values = [this._valueMin(), this._valueMin()]), r.values.length && r.values.length != 2 && (r.values = [r.values[0], r.values[0]])) : this.range = n("<div></div>"), this.range.appendTo(this.element).addClass("ui-slider-range"), (r.range == "min" || r.range == "max") && this.range.addClass("ui-slider-range-" + r.range), this.range.addClass("ui-widget-header")), n(".ui-slider-handle", this.element).length == 0 && n('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle"), r.values && r.values.length)while (n(".ui-slider-handle", this.element).length < r.values.length)n('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle");
            this.handles = n(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all"), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function (n) {
                n.preventDefault()
            }).hover(function () {
                r.disabled || n(this).addClass("ui-state-hover")
            }, function () {
                n(this).removeClass("ui-state-hover")
            }).focus(function () {
                r.disabled ? n(this).blur() : (n(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), n(this).addClass("ui-state-focus"))
            }).blur(function () {
                n(this).removeClass("ui-state-focus")
            }), this.handles.each(function (t) {
                n(this).data("index.ui-slider-handle", t)
            }), this.handles.keydown(function (r) {
                var s = !0, o = n(this).data("index.ui-slider-handle"), f, u, e;
                if (!i.options.disabled) {
                    switch (r.keyCode) {
                        case n.ui.keyCode.HOME:
                        case n.ui.keyCode.END:
                        case n.ui.keyCode.PAGE_UP:
                        case n.ui.keyCode.PAGE_DOWN:
                        case n.ui.keyCode.UP:
                        case n.ui.keyCode.RIGHT:
                        case n.ui.keyCode.DOWN:
                        case n.ui.keyCode.LEFT:
                            s = !1, i._keySliding || (i._keySliding = !0, n(this).addClass("ui-state-active"), i._start(r, o))
                    }
                    e = i._step(), f = i.options.values && i.options.values.length ? u = i.values(o) : u = i.value();
                    switch (r.keyCode) {
                        case n.ui.keyCode.HOME:
                            u = i._valueMin();
                            break;
                        case n.ui.keyCode.END:
                            u = i._valueMax();
                            break;
                        case n.ui.keyCode.PAGE_UP:
                            u = f + (i._valueMax() - i._valueMin()) / t;
                            break;
                        case n.ui.keyCode.PAGE_DOWN:
                            u = f - (i._valueMax() - i._valueMin()) / t;
                            break;
                        case n.ui.keyCode.UP:
                        case n.ui.keyCode.RIGHT:
                            if (f == i._valueMax())return;
                            u = f + e;
                            break;
                        case n.ui.keyCode.DOWN:
                        case n.ui.keyCode.LEFT:
                            if (f == i._valueMin())return;
                            u = f - e
                    }
                    return i._slide(r, o, u), s
                }
            }).keyup(function (t) {
                var r = n(this).data("index.ui-slider-handle");
                i._keySliding && (i._keySliding = !1, i._stop(t, r), i._change(t, r), n(this).removeClass("ui-state-active"))
            }), this._refreshValue(), this._animateOff = !1
        },
        destroy: function () {
            return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
        },
        _mouseCapture: function (t) {
            var u = this.options, e, o;
            if (u.disabled)return !1;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset();
            var s = {
                x: t.pageX,
                y: t.pageY
            }, f = this._normValueFromMouse(s), h = this._valueMax() - this._valueMin() + 1, i, c = this, r;
            return this.handles.each(function (t) {
                var u = Math.abs(f - c.values(t));
                h > u && (h = u, i = n(this), r = t)
            }), u.range == !0 && this.values(1) == u.min && (i = n(this.handles[++r])), this._start(t, r), this._mouseSliding = !0, c._handleIndex = r, i.addClass("ui-state-active").focus(), e = i.offset(), o = !n(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = o ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - e.left - i.width() / 2,
                top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0)
            }, f = this._normValueFromMouse(s), this._slide(t, r, f), this._animateOff = !0, !0
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (n) {
            var i = {x: n.pageX, y: n.pageY}, t = this._normValueFromMouse(i);
            return this._slide(n, this._handleIndex, t), !1
        },
        _mouseStop: function (n) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(n, this._handleIndex), this._change(n, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = this.options.orientation == "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (n) {
            var i, r, t;
            "horizontal" == this.orientation ? (i = this.elementSize.width, r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height, r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), t = r / i, t > 1 && (t = 1), t < 0 && (t = 0), "vertical" == this.orientation && (t = 1 - t);
            var o = this._valueMax() - this._valueMin(), f = t * o, u = f % this.options.step, e = this._valueMin() + f - u;
            return u > this.options.step / 2 && (e += this.options.step), parseFloat(e.toFixed(5))
        },
        _start: function (n, t) {
            var i = {handle: this.handles[t], value: this.value()};
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", n, i)
        },
        _slide: function (n, t, i) {
            var e = this.handles[t], f, r, u;
            this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length == 2 && this.options.range === !0 && (t == 0 && i > r || t == 1 && i < r) && (i = r), i != this.values(t) && (f = this.values(), f[t] = i, u = this._trigger("slide", n, {
                handle: this.handles[t],
                value: i,
                values: f
            }), r = this.values(t ? 0 : 1), u !== !1 && this.values(t, i, !0))) : i != this.value() && (u = this._trigger("slide", n, {
                handle: this.handles[t],
                value: i
            }), u !== !1 && this.value(i))
        },
        _stop: function (n, t) {
            var i = {handle: this.handles[t], value: this.value()};
            this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", n, i)
        },
        _change: function (n, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {handle: this.handles[t], value: this.value()};
                this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("change", n, i)
            }
        },
        value: function (n) {
            return arguments.length && (this.options.value = this._trimValue(n), this._refreshValue(), this._change(null, 0)), this._value()
        },
        values: function (t, i) {
            var u, e, r, f;
            if (arguments.length > 1 && (this.options.values[t] = this._trimValue(i), this._refreshValue(), this._change(null, t)), arguments.length)if (n.isArray(arguments[0])) {
                for (u = this.options.values, e = arguments[0], r = 0, f = u.length; r < f; r++)u[r] = this._trimValue(e[r]), this._change(null, r);
                this._refreshValue()
            } else return this.options.values && this.options.values.length ? this._values(t) : this.value(); else return this._values()
        },
        _setOption: function (t, i) {
            var r, u = 0;
            jQuery.isArray(this.options.values) && (u = this.options.values.length), n.Widget.prototype._setOption.apply(this, arguments);
            switch (t) {
                case"disabled":
                    i ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.attr("disabled", "disabled"), this.element.addClass("ui-disabled")) : (this.handles.removeAttr("disabled"), this.element.removeClass("ui-disabled"));
                case"orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case"value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case"values":
                    for (this._animateOff = !0, this._refreshValue(), r = 0; r < u; r++)this._change(null, r);
                    this._animateOff = !1
            }
        },
        _step: function () {
            return this.options.step
        },
        _value: function () {
            var n = this.options.value;
            return n = this._trimValue(n)
        },
        _values: function (n) {
            var r, i, t, u;
            if (arguments.length)return r = this.options.values[n], r = this._trimValue(r);
            for (i = this.options.values.slice(), t = 0, u = i.length; t < u; t++)i[t] = this._trimValue(i[t]);
            return i
        },
        _trimValue: function (n) {
            return n < this._valueMin() && (n = this._valueMin()), n > this._valueMax() && (n = this._valueMax()), n
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var f = this.options.range, i = this.options, t = this, r = this._animateOff ? !1 : i.animate, l, c;
            if (this.options.values && this.options.values.length)this.handles.each(function (u) {
                var e = (t.values(u) - t._valueMin()) / (t._valueMax() - t._valueMin()) * 100, o = {};
                o[t.orientation == "horizontal" ? "left" : "bottom"] = e + "%", n(this).stop(1, 1)[r ? "animate" : "css"](o, i.animate), t.options.range === !0 && (t.orientation == "horizontal" ? (u == 0 && t.range.stop(1, 1)[r ? "animate" : "css"]({left: e + "%"}, i.animate), u == 1 && t.range[r ? "animate" : "css"]({width: e - lastValPercent + "%"}, {
                    queue: !1,
                    duration: i.animate
                })) : (u == 0 && t.range.stop(1, 1)[r ? "animate" : "css"]({bottom: e + "%"}, i.animate), u == 1 && t.range[r ? "animate" : "css"]({height: e - lastValPercent + "%"}, {
                    queue: !1,
                    duration: i.animate
                }))), lastValPercent = e
            }); else {
                var h = this.value(), e = this._valueMin(), o = this._valueMax(), u = o != e ? (h - e) / (o - e) * 100 : 0, s = {};
                s[t.orientation == "horizontal" ? "left" : "bottom"] = u + "%", this.handle.stop(1, 1)[r ? "animate" : "css"](s, i.animate), f == "min" && this.orientation == "horizontal" && this.range.stop(1, 1)[r ? "animate" : "css"]({width: u + "%"}, i.animate), f == "max" && this.orientation == "horizontal" && this.range[r ? "animate" : "css"]({width: 100 - u + "%"}, {
                    queue: !1,
                    duration: i.animate
                }), f == "min" && this.orientation == "vertical" && this.range.stop(1, 1)[r ? "animate" : "css"]({height: u + "%"}, i.animate), f == "max" && this.orientation == "vertical" && this.range[r ? "animate" : "css"]({height: 100 - u + "%"}, {
                    queue: !1,
                    duration: i.animate
                })
            }
        }
    }), n.extend(n.ui.slider, {version: "1.8"})
}(jQuery), function (n) {
    var r = 0, i = 0;
    n.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: !1,
            cookie: null,
            collapsible: !1,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
        }, _create: function () {
            this._tabify(!0)
        }, _setOption: function (n, t) {
            if (n == "selected") {
                if (this.options.collapsible && t == this.options.selected)return;
                this.select(t)
            } else this.options[n] = t, this._tabify()
        }, _tabId: function (n) {
            return n.title && n.title.replace(/\s/g, "_").replace(/[^A-Za-z0-9\-_:\.]/g, "") || this.options.idPrefix + ++r
        }, _sanitizeSelector: function (n) {
            return n.replace(/:/g, "\\:")
        }, _cookie: function () {
            var t = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++i);
            return n.cookie.apply(null, [t].concat(n.makeArray(arguments)))
        }, _ui: function (n, t) {
            return {tab: n, panel: t, index: this.anchors.index(n)}
        }, _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var t = n(this);
                t.html(t.data("label.tabs")).removeData("label.tabs")
            })
        }, _tabify: function (t) {
            function a(t, i) {
                t.css({display: ""}), !n.support.opacity && i.opacity && t[0].style.removeAttribute("filter")
            }

            var e, h, c, l, f, u, s, o;
            this.list = this.element.find("ol,ul").eq(0), this.lis = n("li:has(a[href])", this.list), this.anchors = this.lis.map(function () {
                return n("a", this)[0]
            }), this.panels = n([]);
            var r = this, i = this.options, v = /^#.+/;
            for (this.anchors.each(function (t, u) {
                var f = n(u).attr("href"), s = f.split("#")[0], h, o, e;
                s && (s === location.toString().split("#")[0] || (h = n("base")[0]) && s === h.href) && (f = u.hash, u.href = f), v.test(f) ? r.panels = r.panels.add(r._sanitizeSelector(f)) : f != "#" ? (n.data(u, "href.tabs", f), n.data(u, "load.tabs", f.replace(/#.*$/, "")), o = r._tabId(u), u.href = "#" + o, e = n("#" + o), e.length || (e = n(i.panelTemplate).attr("id", o).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(r.panels[t - 1] || r.list), e.data("destroy.tabs", !0)), r.panels = r.panels.add(e)) : i.disabled.push(t)
            }), t ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), i.selected === undefined ? (location.hash && this.anchors.each(function (n, t) {
                if (t.hash == location.hash)return i.selected = n, !1
            }), typeof i.selected != "number" && i.cookie && (i.selected = parseInt(r._cookie(), 10)), typeof i.selected != "number" && this.lis.filter(".ui-tabs-selected").length && (i.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), i.selected = i.selected || (this.lis.length ? 0 : -1)) : i.selected === null && (i.selected = -1), i.selected = i.selected >= 0 && this.anchors[i.selected] || i.selected < 0 ? i.selected : 0, i.disabled = n.unique(i.disabled.concat(n.map(this.lis.filter(".ui-state-disabled"), function (n) {
                return r.lis.index(n)
            }))).sort(), n.inArray(i.selected, i.disabled) != -1 && i.disabled.splice(n.inArray(i.selected, i.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), i.selected >= 0 && this.anchors.length && (this.panels.eq(i.selected).removeClass("ui-tabs-hide"), this.lis.eq(i.selected).addClass("ui-tabs-selected ui-state-active"), r.element.queue("tabs", function () {
                r._trigger("show", null, r._ui(r.anchors[i.selected], r.panels[i.selected]))
            }), this.load(i.selected)), n(window).bind("unload", function () {
                r.lis.add(r.anchors).unbind(".tabs"), r.lis = r.anchors = r.panels = null
            })) : i.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[i.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), i.cookie && this._cookie(i.selected, i.cookie), e = 0; h = this.lis[e]; e++)n(h)[n.inArray(e, i.disabled) != -1 && !n(h).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            i.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs"), i.event != "mouseover" && (c = function (n, t) {
                t.is(":not(.ui-state-disabled)") && t.addClass("ui-state-" + n)
            }, l = function (n, t) {
                t.removeClass("ui-state-" + n)
            }, this.lis.bind("mouseover.tabs", function () {
                c("hover", n(this))
            }), this.lis.bind("mouseout.tabs", function () {
                l("hover", n(this))
            }), this.anchors.bind("focus.tabs", function () {
                c("focus", n(this).closest("li"))
            }), this.anchors.bind("blur.tabs", function () {
                l("focus", n(this).closest("li"))
            })), i.fx && (n.isArray(i.fx) ? (f = i.fx[0], u = i.fx[1]) : f = u = i.fx), s = u ? function (t, i) {
                n(t).closest("li").addClass("ui-tabs-selected ui-state-active"), i.hide().removeClass("ui-tabs-hide").animate(u, u.duration || "normal", function () {
                    a(i, u), r._trigger("show", null, r._ui(t, i[0]))
                })
            } : function (t, i) {
                n(t).closest("li").addClass("ui-tabs-selected ui-state-active"), i.removeClass("ui-tabs-hide"), r._trigger("show", null, r._ui(t, i[0]))
            }, o = f ? function (n, t) {
                t.animate(f, f.duration || "normal", function () {
                    r.lis.removeClass("ui-tabs-selected ui-state-active"), t.addClass("ui-tabs-hide"), a(t, f), r.element.dequeue("tabs")
                })
            } : function (n, t) {
                r.lis.removeClass("ui-tabs-selected ui-state-active"), t.addClass("ui-tabs-hide"), r.element.dequeue("tabs")
            }, this.anchors.bind(i.event + ".tabs", function () {
                var f = this, e = n(this).closest("li"), t = r.panels.filter(":not(.ui-tabs-hide)"), u = n(r._sanitizeSelector(this.hash));
                if (e.hasClass("ui-tabs-selected") && !i.collapsible || e.hasClass("ui-state-disabled") || e.hasClass("ui-state-processing") || r._trigger("select", null, r._ui(this, u[0])) === !1)return this.blur(), !1;
                if (i.selected = r.anchors.index(this), r.abort(), i.collapsible) {
                    if (e.hasClass("ui-tabs-selected"))return i.selected = -1, i.cookie && r._cookie(i.selected, i.cookie), r.element.queue("tabs", function () {
                        o(f, t)
                    }).dequeue("tabs"), this.blur(), !1;
                    if (!t.length)return i.cookie && r._cookie(i.selected, i.cookie), r.element.queue("tabs", function () {
                        s(f, u)
                    }), r.load(r.anchors.index(this)), this.blur(), !1
                }
                if (i.cookie && r._cookie(i.selected, i.cookie), u.length)t.length && r.element.queue("tabs", function () {
                    o(f, t)
                }), r.element.queue("tabs", function () {
                    s(f, u)
                }), r.load(r.anchors.index(this)); else throw"jQuery UI Tabs: Mismatching fragment identifier.";
                n.browser.msie && this.blur()
            }), this.anchors.bind("click.tabs", function () {
                return !1
            })
        }, destroy: function () {
            var t = this.options;
            return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function () {
                var i = n.data(this, "href.tabs"), t;
                i && (this.href = i), t = n(this).unbind(".tabs"), n.each(["href", "load", "cache"], function (n, i) {
                    t.removeData(i + ".tabs")
                })
            }), this.lis.unbind(".tabs").add(this.panels).each(function () {
                n.data(this, "destroy.tabs") ? n(this).remove() : n(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
            }), t.cookie && this._cookie(null, t.cookie), this
        }, add: function (t, i, r) {
            var u;
            r === undefined && (r = this.anchors.length);
            var o = this, e = this.options, f = n(e.tabTemplate.replace(/#\{href\}/g, t).replace(/#\{label\}/g, i)), s = t.indexOf("#") ? this._tabId(n("a", f)[0]) : t.replace("#", "");
            return f.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0), u = n("#" + s), u.length || (u = n(e.panelTemplate).attr("id", s).data("destroy.tabs", !0)), u.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), r >= this.lis.length ? (f.appendTo(this.list), u.appendTo(this.list[0].parentNode)) : (f.insertBefore(this.lis[r]), u.insertBefore(this.panels[r])), e.disabled = n.map(e.disabled, function (n) {
                return n >= r ? ++n : n
            }), this._tabify(), this.anchors.length == 1 && (e.selected = 0, f.addClass("ui-tabs-selected ui-state-active"), u.removeClass("ui-tabs-hide"), this.element.queue("tabs", function () {
                o._trigger("show", null, o._ui(o.anchors[0], o.panels[0]))
            }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[r], this.panels[r])), this
        }, remove: function (t) {
            var r = this.options, i = this.lis.eq(t).remove(), u = this.panels.eq(t).remove();
            return i.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(t + (t + 1 < this.anchors.length ? 1 : -1)), r.disabled = n.map(n.grep(r.disabled, function (n) {
                return n != t
            }), function (n) {
                return n >= t ? --n : n
            }), this._tabify(), this._trigger("remove", null, this._ui(i.find("a")[0], u[0])), this
        }, enable: function (t) {
            var i = this.options;
            if (n.inArray(t, i.disabled) != -1)return this.lis.eq(t).removeClass("ui-state-disabled"), i.disabled = n.grep(i.disabled, function (n) {
                return n != t
            }), this._trigger("enable", null, this._ui(this.anchors[t], this.panels[t])), this
        }, disable: function (n) {
            var i = this, t = this.options;
            return n != t.selected && (this.lis.eq(n).addClass("ui-state-disabled"), t.disabled.push(n), t.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[n], this.panels[n]))), this
        }, select: function (n) {
            return typeof n == "string" ? n = this.anchors.index(this.anchors.filter("[href$=" + n + "]")) : n === null && (n = -1), n == -1 && this.options.collapsible && (n = this.options.selected), this.anchors.eq(n).trigger(this.options.event + ".tabs"), this
        }, load: function (t) {
            var i = this, u = this.options, r = this.anchors.eq(t)[0], e = n.data(r, "load.tabs"), f;
            if (this.abort(), !e || this.element.queue("tabs").length !== 0 && n.data(r, "cache.tabs")) {
                this.element.dequeue("tabs");
                return
            }
            return this.lis.eq(t).addClass("ui-state-processing"), u.spinner && (f = n("span", r), f.data("label.tabs", f.html()).html(u.spinner)), this.xhr = n.ajax(n.extend({}, u.ajaxOptions, {
                url: e,
                success: function (f, e) {
                    n(i._sanitizeSelector(r.hash)).html(f), i._cleanup(), u.cache && n.data(r, "cache.tabs", !0), i._trigger("load", null, i._ui(i.anchors[t], i.panels[t]));
                    try {
                        u.ajaxOptions.success(f, e)
                    } catch (o) {
                    }
                },
                error: function (n, f) {
                    i._cleanup(), i._trigger("load", null, i._ui(i.anchors[t], i.panels[t]));
                    try {
                        u.ajaxOptions.error(n, f, t, r)
                    } catch (e) {
                    }
                }
            })), i.element.dequeue("tabs"), this
        }, abort: function () {
            return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this
        }, url: function (n, t) {
            return this.anchors.eq(n).removeData("cache.tabs").data("load.tabs", t), this
        }, length: function () {
            return this.anchors.length
        }
    }), n.extend(n.ui.tabs, {version: "1.8"}), n.extend(n.ui.tabs.prototype, {
        rotation: null, rotate: function (n, i) {
            var r = this, f = this.options, u = r._rotate || (r._rotate = function (t) {
                    clearTimeout(r.rotation), r.rotation = setTimeout(function () {
                        var n = f.selected;
                        r.select(++n < r.anchors.length ? n : 0)
                    }, n), t && t.stopPropagation()
                }), e = r._unrotate || (r._unrotate = i ? function () {
                    t = f.selected, u()
                } : function (n) {
                    n.clientX && r.rotate(null)
                });
            return n ? (this.element.bind("tabsshow", u), this.anchors.bind(f.event + ".tabs", e), u()) : (clearTimeout(r.rotation), this.element.unbind("tabsshow", u), this.anchors.unbind(f.event + ".tabs", e), delete this._rotate, delete this._unrotate), this
        }
    })
}(jQuery), function (n) {
    function u() {
        this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "show",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "_default",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1
        }, n.extend(this._defaults, this.regional[""]), this.dpDiv = n('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
    }

    function r(t, i) {
        n.extend(t, i);
        for (var r in i)(i[r] == null || i[r] == undefined) && (t[r] = i[r]);
        return t
    }

    n.extend(n.ui, {datepicker: {version: "1.8"}});
    var i = "datepicker", t = +new Date;
    n.extend(u.prototype, {
        markerClassName: "hasDatepicker",
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (n) {
            return r(this._defaults, n || {}), this
        },
        _attachDatepicker: function (t, i) {
            var r = null, e, o, u, s, f;
            for (e in this._defaults)if (o = t.getAttribute("date:" + e), o) {
                r = r || {};
                try {
                    r[e] = eval(o)
                } catch (h) {
                    r[e] = o
                }
            }
            u = t.nodeName.toLowerCase(), s = u == "div" || u == "span", t.id || (t.id = "dp" + ++this.uuid), f = this._newInst(n(t), s), f.settings = n.extend({}, i || {}, r || {}), u == "input" ? this._connectDatepicker(t, f) : s && this._inlineDatepicker(t, f)
        },
        _newInst: function (t, i) {
            var r = t[0].id.replace(/([^A-Za-z0-9_])/g, "\\\\$1");
            return {
                id: r,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? n('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>') : this.dpDiv
            }
        },
        _connectDatepicker: function (t, r) {
            var u = n(t);
            if (r.append = n([]), r.trigger = n([]), !u.hasClass(this.markerClassName))this._attachments(u, r), u.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (n, t, i) {
                r.settings[t] = i
            }).bind("getData.datepicker", function (n, t) {
                return this._get(r, t)
            }), this._autoSize(r), n.data(t, i, r)
        },
        _attachments: function (t, i) {
            var o = this._get(i, "appendText"), e = this._get(i, "isRTL"), u, r, f;
            i.append && i.append.remove(), o && (i.append = n('<span class="' + this._appendClass + '">' + o + "</span>"), t[e ? "before" : "after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), u = this._get(i, "showOn"), (u == "focus" || u == "both") && t.focus(this._showDatepicker), (u == "button" || u == "both") && (r = this._get(i, "buttonText"), f = this._get(i, "buttonImage"), i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
                src: f,
                alt: r,
                title: r
            }) : n('<button type="button"></button>').addClass(this._triggerClass).html(f == "" ? r : n("<img/>").attr({
                src: f,
                alt: r,
                title: r
            }))), t[e ? "before" : "after"](i.trigger), i.trigger.click(function () {
                return n.datepicker._datepickerShowing && n.datepicker._lastInput == t[0] ? n.datepicker._hideDatepicker() : n.datepicker._showDatepicker(t[0]), !1
            }))
        },
        _autoSize: function (n) {
            var t, i, r;
            this._get(n, "autoSize") && !n.inline && (t = new Date(2009, 11, 20), i = this._get(n, "dateFormat"), i.match(/[DM]/) && (r = function (n) {
                for (var i = 0, r = 0, t = 0; t < n.length; t++)n[t].length > i && (i = n[t].length, r = t);
                return r
            }, t.setMonth(r(this._get(n, i.match(/MM/) ? "monthNames" : "monthNamesShort"))), t.setDate(r(this._get(n, i.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - t.getDay())), n.input.attr("size", this._formatDate(n, t).length))
        },
        _inlineDatepicker: function (t, r) {
            var u = n(t);
            if (!u.hasClass(this.markerClassName))u.addClass(this.markerClassName).append(r.dpDiv).bind("setData.datepicker", function (n, t, i) {
                r.settings[t] = i
            }).bind("getData.datepicker", function (n, t) {
                return this._get(r, t)
            }), n.data(t, i, r), this._setDate(r, this._getDefaultDate(r), !0), this._updateDatepicker(r), this._updateAlternate(r)
        },
        _dialogDatepicker: function (t, u, f, e, o) {
            var s = this._dialogInst, h;
            if (s || (h = "dp" + ++this.uuid, this._dialogInput = n('<input type="text" id="' + h + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'), this._dialogInput.keydown(this._doKeyDown), n("body").append(this._dialogInput), s = this._dialogInst = this._newInst(this._dialogInput, !1), s.settings = {}, n.data(this._dialogInput[0], i, s)), r(s.settings, e || {}), u = u && u.constructor == Date ? this._formatDate(s, u) : u, this._dialogInput.val(u), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, !this._pos) {
                var a = document.documentElement.clientWidth, v = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, l = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [a / 2 - 100 + c, v / 2 - 150 + l]
            }
            return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), s.settings.onSelect = f, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), n.blockUI && n.blockUI(this.dpDiv), n.data(this._dialogInput[0], i, s), this
        },
        _destroyDatepicker: function (t) {
            var u = n(t), f = n.data(t, i), r;
            if (u.hasClass(this.markerClassName))r = t.nodeName.toLowerCase(), n.removeData(t, i), r == "input" ? (f.append.remove(), f.trigger.remove(), u.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (r == "div" || r == "span") && u.removeClass(this.markerClassName).empty()
        },
        _enableDatepicker: function (t) {
            var f = n(t), e = n.data(t, i), r, u;
            if (f.hasClass(this.markerClassName))r = t.nodeName.toLowerCase(), r == "input" ? (t.disabled = !1, e.trigger.filter("button").each(function () {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : (r == "div" || r == "span") && (u = f.children("." + this._inlineClass), u.children().removeClass("ui-state-disabled")), this._disabledInputs = n.map(this._disabledInputs, function (n) {
                return n == t ? null : n
            })
        },
        _disableDatepicker: function (t) {
            var f = n(t), e = n.data(t, i), r, u;
            if (f.hasClass(this.markerClassName))r = t.nodeName.toLowerCase(), r == "input" ? (t.disabled = !0, e.trigger.filter("button").each(function () {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : (r == "div" || r == "span") && (u = f.children("." + this._inlineClass), u.children().addClass("ui-state-disabled")), this._disabledInputs = n.map(this._disabledInputs, function (n) {
                return n == t ? null : n
            }), this._disabledInputs[this._disabledInputs.length] = t
        },
        _isDisabledDatepicker: function (n) {
            if (!n)return !1;
            for (var t = 0; t < this._disabledInputs.length; t++)if (this._disabledInputs[t] == n)return !0;
            return !1
        },
        _getInst: function (t) {
            try {
                return n.data(t, i)
            } catch (r) {
                throw"Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function (t, i, u) {
            var f = this._getInst(t), e, o;
            if (arguments.length == 2 && typeof i == "string")return i == "defaults" ? n.extend({}, n.datepicker._defaults) : f ? i == "all" ? n.extend({}, f.settings) : this._get(f, i) : null;
            e = i || {}, typeof i == "string" && (e = {}, e[i] = u), f && (this._curInst == f && this._hideDatepicker(), o = this._getDateDatepicker(t, !0), r(f.settings, e), this._attachments(n(t), f), this._autoSize(f), this._setDateDatepicker(t, o), this._updateDatepicker(f))
        },
        _changeDatepicker: function (n, t, i) {
            this._optionDatepicker(n, t, i)
        },
        _refreshDatepicker: function (n) {
            var t = this._getInst(n);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function (n, t) {
            var i = this._getInst(n);
            i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function (n, t) {
            var i = this._getInst(n);
            return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
        },
        _doKeyDown: function (t) {
            var i = n.datepicker._getInst(t.target), r = !0, f = i.dpDiv.is(".ui-datepicker-rtl"), u;
            if (i._keyEvent = !0, n.datepicker._datepickerShowing)switch (t.keyCode) {
                case 9:
                    n.datepicker._hideDatepicker(), r = !1;
                    break;
                case 13:
                    return u = n("td." + n.datepicker._dayOverClass, i.dpDiv).add(n("td." + n.datepicker._currentClass, i.dpDiv)), u[0] ? n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, u[0]) : n.datepicker._hideDatepicker(), !1;
                case 27:
                    n.datepicker._hideDatepicker();
                    break;
                case 33:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 34:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target), r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target), r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, f ? 1 : -1, "D"), r = t.ctrlKey || t.metaKey, t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D"), r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, f ? -1 : 1, "D"), r = t.ctrlKey || t.metaKey, t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D"), r = t.ctrlKey || t.metaKey;
                    break;
                default:
                    r = !1
            } else t.keyCode == 36 && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
            r && (t.preventDefault(), t.stopPropagation())
        },
        _doKeyPress: function (t) {
            var u = n.datepicker._getInst(t.target), i, r;
            if (n.datepicker._get(u, "constrainInput"))return i = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")), r = String.fromCharCode(t.charCode == undefined ? t.keyCode : t.charCode), t.ctrlKey || r < " " || !i || i.indexOf(r) > -1
        },
        _doKeyUp: function (t) {
            var i = n.datepicker._getInst(t.target), r;
            if (i.input.val() != i.lastVal)try {
                r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i)), r && (n.datepicker._setDateFromField(i), n.datepicker._updateAlternate(i), n.datepicker._updateDatepicker(i))
            } catch (t) {
                n.datepicker.log(t)
            }
            return !0
        },
        _showDatepicker: function (t) {
            var i, h, u, f;
            if ((t = t.target || t, t.nodeName.toLowerCase() != "input" && (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput != t) && (i = n.datepicker._getInst(t), n.datepicker._curInst && n.datepicker._curInst != i && n.datepicker._curInst.dpDiv.stop(!0, !0), h = n.datepicker._get(i, "beforeShow"), r(i.settings, h ? h.apply(t, [t, i]) : {}), i.lastVal = null, n.datepicker._lastInput = t, n.datepicker._setDateFromField(i), n.datepicker._inDialog && (t.value = ""), n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t), n.datepicker._pos[1] += t.offsetHeight), u = !1, n(t).parents().each(function () {
                    return u |= n(this).css("position") == "fixed", !u
                }), u && n.browser.opera && (n.datepicker._pos[0] -= document.documentElement.scrollLeft, n.datepicker._pos[1] -= document.documentElement.scrollTop), f = {
                    left: n.datepicker._pos[0],
                    top: n.datepicker._pos[1]
                }, n.datepicker._pos = null, i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), n.datepicker._updateDatepicker(i), f = n.datepicker._checkOffset(i, f, u), i.dpDiv.css({
                    position: n.datepicker._inDialog && n.blockUI ? "static" : u ? "fixed" : "absolute",
                    display: "none",
                    left: f.left + "px",
                    top: f.top + "px"
                }), !i.inline)) {
                var e = n.datepicker._get(i, "showAnim"), s = n.datepicker._get(i, "duration"), o = function () {
                    n.datepicker._datepickerShowing = !0;
                    var t = n.datepicker._getBorders(i.dpDiv);
                    i.dpDiv.find("iframe.ui-datepicker-cover").css({
                        left: -t[0],
                        top: -t[1],
                        width: i.dpDiv.outerWidth(),
                        height: i.dpDiv.outerHeight()
                    })
                };
                i.dpDiv.zIndex(n(t).zIndex() + 1), n.effects && n.effects[e] ? i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), s, o) : i.dpDiv[e || "show"](e ? s : null, o), e && s || o(), i.input.is(":visible") && !i.input.is(":disabled") && i.input.focus(), n.datepicker._curInst = i
            }
        },
        _updateDatepicker: function (t) {
            var e = this, u = n.datepicker._getBorders(t.dpDiv);
            t.dpDiv.empty().append(this._generateHTML(t)).find("iframe.ui-datepicker-cover").css({
                left: -u[0],
                top: -u[1],
                width: t.dpDiv.outerWidth(),
                height: t.dpDiv.outerHeight()
            }).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
                n(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") != -1 && n(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") != -1 && n(this).removeClass("ui-datepicker-next-hover")
            }).bind("mouseover", function () {
                e._isDisabledDatepicker(t.inline ? t.dpDiv.parent()[0] : t.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), n(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") != -1 && n(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") != -1 && n(this).addClass("ui-datepicker-next-hover"))
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            var i = this._getNumberOfMonths(t), r = i[1], f = 17;
            r > 1 ? t.dpDiv.addClass("ui-datepicker-multi-" + r).css("width", f * r + "em") : t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), t.dpDiv[(i[0] != 1 || i[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t == n.datepicker._curInst && n.datepicker._datepickerShowing && t.input && t.input.is(":visible") && !t.input.is(":disabled") && t.input.focus()
        },
        _getBorders: function (n) {
            var t = function (n) {
                return {thin: 1, medium: 2, thick: 3}[n] || n
            };
            return [parseFloat(t(n.css("border-left-width"))), parseFloat(t(n.css("border-top-width")))]
        },
        _checkOffset: function (t, i, r) {
            var u = t.dpDiv.outerWidth(), e = t.dpDiv.outerHeight(), h = t.input ? t.input.outerWidth() : 0, s = t.input ? t.input.outerHeight() : 0, f = document.documentElement.clientWidth + n(document).scrollLeft(), o = document.documentElement.clientHeight + n(document).scrollTop();
            return i.left -= this._get(t, "isRTL") ? u - h : 0, i.left -= r && i.left == t.input.offset().left ? n(document).scrollLeft() : 0, i.top -= r && i.top == t.input.offset().top + s ? n(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + u > f && f > u ? Math.abs(i.left + u - f) : 0), i.top -= Math.min(i.top, i.top + e > o && o > e ? Math.abs(e + s) : 0), i
        },
        _findPos: function (t) {
            for (var r = this._getInst(t), u = this._get(r, "isRTL"), i; t && (t.type == "hidden" || t.nodeType != 1);)t = t[u ? "previousSibling" : "nextSibling"];
            return i = n(t).offset(), [i.left, i.top]
        },
        _hideDatepicker: function (t) {
            var r = this._curInst, f;
            if (r && (!t || r == n.data(t, i)) && this._datepickerShowing) {
                var u = this._get(r, "showAnim"), o = this._get(r, "duration"), e = function () {
                    n.datepicker._tidyDialog(r), this._curInst = null
                };
                n.effects && n.effects[u] ? r.dpDiv.hide(u, n.datepicker._get(r, "showOptions"), o, e) : r.dpDiv[u == "slideDown" ? "slideUp" : u == "fadeIn" ? "fadeOut" : "hide"](u ? o : null, e), u || e(), f = this._get(r, "onClose"), f && f.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._datepickerShowing = !1, this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))), this._inDialog = !1
            }
        },
        _tidyDialog: function (n) {
            n.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (t) {
            if (n.datepicker._curInst) {
                var i = n(t.target);
                i[0].id == n.datepicker._mainDivId || i.parents("#" + n.datepicker._mainDivId).length != 0 || i.hasClass(n.datepicker.markerClassName) || i.hasClass(n.datepicker._triggerClass) || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI || n.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (t, i, r) {
            var f = n(t), u = this._getInst(f[0]);
            if (!this._isDisabledDatepicker(f[0]))this._adjustInstDate(u, i + (r == "M" ? this._get(u, "showCurrentAtPos") : 0), r), this._updateDatepicker(u)
        },
        _gotoToday: function (t) {
            var u = n(t), i = this._getInst(u[0]), r;
            this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (r = new Date, i.selectedDay = r.getDate(), i.drawMonth = i.selectedMonth = r.getMonth(), i.drawYear = i.selectedYear = r.getFullYear()), this._notifyChange(i), this._adjustDate(u)
        },
        _selectMonthYear: function (t, i, r) {
            var f = n(t), u = this._getInst(f[0]);
            u._selectingMonthYear = !1, u["selected" + (r == "M" ? "Month" : "Year")] = u["draw" + (r == "M" ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(u), this._adjustDate(f)
        },
        _clickMonthYear: function (t) {
            var r = n(t), i = this._getInst(r[0]);
            i.input && i._selectingMonthYear && !n.browser.msie && i.input.focus(), i._selectingMonthYear = !i._selectingMonthYear
        },
        _selectDay: function (t, i, r, u) {
            var e = n(t), f;
            if (!n(u).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(e[0]))f = this._getInst(e[0]), f.selectedDay = f.currentDay = n("a", u).html(), f.selectedMonth = f.currentMonth = i, f.selectedYear = f.currentYear = r, this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
        },
        _clearDate: function (t) {
            var i = n(t), r = this._getInst(i[0]);
            this._selectDate(i, "")
        },
        _selectDate: function (t, i) {
            var f = n(t), r = this._getInst(f[0]), u;
            i = i != null ? i : this._formatDate(r), r.input && r.input.val(i), this._updateAlternate(r), u = this._get(r, "onSelect"), u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change"), r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], typeof r.input[0] != "object" && r.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (t) {
            var i = this._get(t, "altField");
            if (i) {
                var f = this._get(t, "altFormat") || this._get(t, "dateFormat"), u = this._getDate(t), r = this.formatDate(f, u, this._getFormatConfig(t));
                n(i).each(function () {
                    n(this).val(r)
                })
            }
        },
        noWeekends: function (n) {
            var t = n.getDay();
            return [t > 0 && t < 6, ""]
        },
        iso8601Week: function (n) {
            var t = new Date(n.getTime()), i;
            return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
        },
        parseDate: function (n, t, i) {
            var e, a, r;
            if (n == null || t == null)throw"Invalid arguments";
            if (t = typeof t == "object" ? t.toString() : t + "", t == "")return null;
            var w = (i ? i.shortYearCutoff : null) || this._defaults.shortYearCutoff, k = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, g = (i ? i.dayNames : null) || this._defaults.dayNames, d = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, b = (i ? i.monthNames : null) || this._defaults.monthNames, u = -1, f = -1, s = -1, v = -1, y = !1, c = function (t) {
                var i = e + 1 < n.length && n.charAt(e + 1) == t;
                return i && e++, i
            }, h = function (n) {
                c(n);
                var r = n == "@" ? 14 : n == "!" ? 20 : n == "y" ? 4 : n == "o" ? 3 : 2, u = new RegExp("^\\d{1," + r + "}"), i = t.substring(o).match(u);
                if (!i)throw"Missing number at position " + o;
                return o += i[0].length, parseInt(i[0], 10)
            }, p = function (n, i, r) {
                for (var f = c(n) ? r : i, u = 0; u < f.length; u++)if (t.substr(o, f[u].length) == f[u])return o += f[u].length, u + 1;
                throw"Unknown name at position " + o;
            }, l = function () {
                if (t.charAt(o) != n.charAt(e))throw"Unexpected literal at position " + o;
                o++
            }, o = 0;
            for (e = 0; e < n.length; e++)if (y)n.charAt(e) != "'" || c("'") ? l() : y = !1; else switch (n.charAt(e)) {
                case"d":
                    s = h("d");
                    break;
                case"D":
                    p("D", k, g);
                    break;
                case"o":
                    v = h("o");
                    break;
                case"m":
                    f = h("m");
                    break;
                case"M":
                    f = p("M", d, b);
                    break;
                case"y":
                    u = h("y");
                    break;
                case"@":
                    r = new Date(h("@")), u = r.getFullYear(), f = r.getMonth() + 1, s = r.getDate();
                    break;
                case"!":
                    r = new Date((h("!") - this._ticksTo1970) / 1e4), u = r.getFullYear(), f = r.getMonth() + 1, s = r.getDate();
                    break;
                case"'":
                    c("'") ? l() : y = !0;
                    break;
                default:
                    l()
            }
            if (u == -1 ? u = (new Date).getFullYear() : u < 100 && (u += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u <= w ? 0 : -100)), v > -1) {
                f = 1, s = v;
                do {
                    if (a = this._getDaysInMonth(u, f - 1), s <= a)break;
                    f++, s -= a
                } while (1)
            }
            if (r = this._daylightSavingAdjust(new Date(u, f - 1, s)), r.getFullYear() != u || r.getMonth() + 1 != f || r.getDate() != s)throw"Invalid date";
            return r
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 864e9,
        formatDate: function (n, t, i) {
            var u;
            if (!t)return "";
            var c = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, l = (i ? i.dayNames : null) || this._defaults.dayNames, a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, h = (i ? i.monthNames : null) || this._defaults.monthNames, f = function (t) {
                var i = u + 1 < n.length && n.charAt(u + 1) == t;
                return i && u++, i
            }, o = function (n, t, i) {
                var r = "" + t;
                if (f(n))while (r.length < i)r = "0" + r;
                return r
            }, s = function (n, t, i, r) {
                return f(n) ? r[t] : i[t]
            }, r = "", e = !1;
            if (t)for (u = 0; u < n.length; u++)if (e)n.charAt(u) != "'" || f("'") ? r += n.charAt(u) : e = !1; else switch (n.charAt(u)) {
                case"d":
                    r += o("d", t.getDate(), 2);
                    break;
                case"D":
                    r += s("D", t.getDay(), c, l);
                    break;
                case"o":
                    r += o("o", (t.getTime() - +new Date(t.getFullYear(), 0, 0)) / 864e5, 3);
                    break;
                case"m":
                    r += o("m", t.getMonth() + 1, 2);
                    break;
                case"M":
                    r += s("M", t.getMonth(), a, h);
                    break;
                case"y":
                    r += f("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
                    break;
                case"@":
                    r += t.getTime();
                    break;
                case"!":
                    r += t.getTime() * 1e4 + this._ticksTo1970;
                    break;
                case"'":
                    f("'") ? r += "'" : e = !0;
                    break;
                default:
                    r += n.charAt(u)
            }
            return r
        },
        _possibleChars: function (n) {
            for (var i = "", r = !1, u = function (i) {
                var r = t + 1 < n.length && n.charAt(t + 1) == i;
                return r && t++, r
            }, t = 0; t < n.length; t++)if (r)n.charAt(t) != "'" || u("'") ? i += n.charAt(t) : r = !1; else switch (n.charAt(t)) {
                case"d":
                case"m":
                case"y":
                case"@":
                    i += "0123456789";
                    break;
                case"D":
                case"M":
                    return null;
                case"'":
                    u("'") ? i += "'" : r = !0;
                    break;
                default:
                    i += n.charAt(t)
            }
            return i
        },
        _get: function (n, t) {
            return n.settings[t] !== undefined ? n.settings[t] : this._defaults[t]
        },
        _setDateFromField: function (n, t) {
            var e, r, i, f, u;
            if (n.input.val() != n.lastVal) {
                e = this._get(n, "dateFormat"), r = n.lastVal = n.input ? n.input.val() : null, i = f = this._getDefaultDate(n), u = this._getFormatConfig(n);
                try {
                    i = this.parseDate(e, r, u) || f
                } catch (o) {
                    this.log(o), r = t ? "" : r
                }
                n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear(), n.currentDay = r ? i.getDate() : 0, n.currentMonth = r ? i.getMonth() : 0, n.currentYear = r ? i.getFullYear() : 0, this._adjustInstDate(n)
            }
        },
        _getDefaultDate: function (n) {
            return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
        },
        _determineDate: function (t, i, r) {
            var f = function (n) {
                var t = new Date;
                return t.setDate(t.getDate() + n), t
            }, u = function (i) {
                try {
                    return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
                } catch (h) {
                }
                for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, e = o.getFullYear(), f = o.getMonth(), r = o.getDate(), s = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u;) {
                    switch (u[2] || "d") {
                        case"d":
                        case"D":
                            r += parseInt(u[1], 10);
                            break;
                        case"w":
                        case"W":
                            r += parseInt(u[1], 10) * 7;
                            break;
                        case"m":
                        case"M":
                            f += parseInt(u[1], 10), r = Math.min(r, n.datepicker._getDaysInMonth(e, f));
                            break;
                        case"y":
                        case"Y":
                            e += parseInt(u[1], 10), r = Math.min(r, n.datepicker._getDaysInMonth(e, f))
                    }
                    u = s.exec(i)
                }
                return new Date(e, f, r)
            };
            return i = i == null ? r : typeof i == "string" ? u(i) : typeof i == "number" ? isNaN(i) ? r : f(i) : i, i = i && i.toString() == "Invalid Date" ? r : i, i && (i.setHours(0), i.setMinutes(0), i.setSeconds(0), i.setMilliseconds(0)), this._daylightSavingAdjust(i)
        },
        _daylightSavingAdjust: function (n) {
            return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) : null
        },
        _setDate: function (n, t, i) {
            var f = !t, u = n.selectedMonth, r = n.selectedYear;
            t = this._restrictMinMax(n, this._determineDate(n, t, new Date)), n.selectedDay = n.currentDay = t.getDate(), n.drawMonth = n.selectedMonth = n.currentMonth = t.getMonth(), n.drawYear = n.selectedYear = n.currentYear = t.getFullYear(), u == n.selectedMonth && r == n.selectedYear || i || this._notifyChange(n), this._adjustInstDate(n), n.input && n.input.val(f ? "" : this._formatDate(n))
        },
        _getDate: function (n) {
            return !n.currentYear || n.input && n.input.val() == "" ? null : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay))
        },
        _generateHTML: function (i) {
            var v = new Date, g, a, yt, c, ct, l, p, ot, b, et, kt, wt, lt, vt, h, ti;
            v = this._daylightSavingAdjust(new Date(v.getFullYear(), v.getMonth(), v.getDate()));
            var o = this._get(i, "isRTL"), hi = this._get(i, "showButtonPanel"), ri = this._get(i, "hideIfNoPrevNext"), at = this._get(i, "navigationAsDateFormat"), s = this._getNumberOfMonths(i), si = this._get(i, "showCurrentAtPos"), it = this._get(i, "stepMonths"), pt = s[0] != 1 || s[1] != 1, rt = this._daylightSavingAdjust(i.currentDay ? new Date(i.currentYear, i.currentMonth, i.currentDay) : new Date(9999, 9, 9)), d = this._getMinMaxDate(i, "min"), y = this._getMinMaxDate(i, "max"), r = i.drawMonth - si, ut = !1, bt = this._get(i, "ShowCurrentRule"), f = i.drawYear, ui = [];
            if (r < 0 && (r += 12, f--), y)for (g = this._daylightSavingAdjust(new Date(y.getFullYear(), y.getMonth() - s[0] * s[1] + 1, y.getDate())), g = d && g < d ? d : g; this._daylightSavingAdjust(new Date(f, r, 1)) > g;)r--, r < 0 && (r = 11, f--);
            i.drawMonth = r, i.drawYear = f, a = this._get(i, "prevText"), a = at ? this.formatDate(a, this._daylightSavingAdjust(new Date(f, r - it, 1)), this._getFormatConfig(i)) : a, yt = this._canAdjustMonth(i, -1, f, r) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + t + ".datepicker._adjustDate('#" + i.id + "', -" + it + ", 'M');\" title=\"" + a + '"><span class="ui-icon ui-icon-circle-triangle-' + (o ? "e" : "w") + '">' + a + "</span></a>" : ri ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + a + '"><span class="ui-icon ui-icon-circle-triangle-' + (o ? "e" : "w") + '">' + a + "</span></a>", c = this._get(i, "nextText"), c = at ? this.formatDate(c, this._daylightSavingAdjust(new Date(f, r + it, 1)), this._getFormatConfig(i)) : c;
            var ii = this._canAdjustMonth(i, 1, f, r) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + t + ".datepicker._adjustDate('#" + i.id + "', +" + it + ", 'M');\" title=\"" + c + '"><span class="ui-icon ui-icon-circle-triangle-' + (o ? "w" : "e") + '">' + c + "</span></a>" : ri ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + c + '"><span class="ui-icon ui-icon-circle-triangle-' + (o ? "w" : "e") + '">' + c + "</span></a>", tt = this._get(i, "currentText"), li = this._get(i, "gotoCurrent") && i.currentDay ? rt : v;
            tt = at ? this.formatDate(tt, li, this._getFormatConfig(i)) : tt, ct = i.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + t + '.datepicker._hideDatepicker();">' + this._get(i, "closeText") + "</button>", l = parseInt(this._get(i, "firstDay"), 10), l = isNaN(l) ? 0 : l;
            var ni = this._get(i, "showWeek"), ci = this._get(i, "dayNames"), wi = this._get(i, "dayNamesShort"), ai = this._get(i, "dayNamesMin"), vi = this._get(i, "monthNames"), yi = this._get(i, "monthNamesShort"), fi = this._get(i, "beforeShowDay"), ht = this._get(i, "showOtherMonths"), oi = this._get(i, "selectOtherMonths"), bi = this._get(i, "calculateWeek") || this.iso8601Week, ei = this._getDefaultDate(i), st = "";
            for (p = 0; p < s[0]; p++) {
                for (ot = "", b = 0; b < s[1]; b++) {
                    var dt = this._daylightSavingAdjust(new Date(f, r, i.selectedDay)), k = " ui-corner-all", e = "";
                    if (pt) {
                        if (e += '<div class="ui-datepicker-group', s[1] > 1)switch (b) {
                            case 0:
                                e += " ui-datepicker-group-first", k = " ui-corner-" + (o ? "right" : "left");
                                break;
                            case s[1] - 1:
                                e += " ui-datepicker-group-last", k = " ui-corner-" + (o ? "left" : "right");
                                break;
                            default:
                                e += " ui-datepicker-group-middle", k = ""
                        }
                        e += '">'
                    }
                    for (e += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + k + '">' + (/all|left/.test(k) && p == 0 ? o ? ii : yt : "") + (/all|right/.test(k) && p == 0 ? o ? yt : ii : "") + this._generateMonthYearHeader(i, r, f, d, y, p > 0 || b > 0, vi, yi) + '</div><table class="ui-datepicker-calendar"><thead><tr>', et = ni ? '<th class="ui-datepicker-week-col">' + this._get(i, "weekHeader") + "</th>" : "", h = 0; h < 7; h++)kt = (h + l) % 7, et += "<th" + ((h + l + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + ci[kt] + '">' + ai[kt] + "</span></th>";
                    e += et + "</tr></thead><tbody>", wt = this._getDaysInMonth(f, r), f == i.selectedYear && r == i.selectedMonth && (i.selectedDay = Math.min(i.selectedDay, wt));
                    var gt = (this._getFirstDayOfMonth(f, r) - l + 7) % 7, pi = pt ? 6 : Math.ceil((gt + wt) / 7), u = this._daylightSavingAdjust(new Date(f, r, 1 - gt));
                    for (lt = 0; lt < pi; lt++) {
                        for (e += "<tr>", vt = ni ? '<td class="ui-datepicker-week-col">' + this._get(i, "calculateWeek")(u) + "</td>" : "", h = 0; h < 7; h++) {
                            var nt = fi ? fi.apply(i.input ? i.input[0] : null, [u]) : [!0, ""], w = u.getMonth() != r, ft = w && !oi || !nt[0] || d && u < d || y && u > y;
                            vt += '<td class="' + ((h + l + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (w ? " ui-datepicker-other-month" : "") + (u.getTime() == dt.getTime() && r == i.selectedMonth && i._keyEvent || ei.getTime() == u.getTime() && ei.getTime() == dt.getTime() ? " " + this._dayOverClass : "") + (ft ? " " + this._unselectableClass + " ui-state-disabled" : "") + (w && !ht ? "" : " " + nt[1] + (u.getTime() == rt.getTime() ? " " + this._currentClass : "") + (u.getTime() == v.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!w || ht) && nt[2] ? ' title="' + nt[2] + '"' : "") + (ft ? "" : ' onclick="DP_jQuery_' + t + ".datepicker._selectDay('#" + i.id + "'," + u.getMonth() + "," + u.getFullYear() + ', this);return false;"') + ">" + (w && !ht ? "&#xa0;" : ft ? '<span class="ui-state-default">' + u.getDate() + "</span>" : '<a class="ui-state-default' + (u.getTime() == v.getTime() ? " ui-state-highlight" : "") + (u.getTime() == rt.getTime() ? " ui-state-active" : "") + (w ? " ui-priority-secondary" : "") + '" href="#">' + u.getDate() + "</a>") + "</td>", u.setDate(u.getDate() + 1), u = this._daylightSavingAdjust(u)
                        }
                        e += vt + "</tr>"
                    }
                    ui.push(r + 1 + "/" + f), r++, r > 11 && (r = 0, f++), e += "</tbody></table>" + (pt ? "</div>" + (s[0] > 0 && b == s[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), ot += e
                }
                st += ot
            }
            return ut = bt == undefined || bt == null ? this._get(i, "ShowCurrent") : bt(ui, i), ti = hi ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (o ? ct : "") + ('<button type="button" ' + (ut ? "" : 'style="display:none;"') + ' class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + t + ".datepicker._gotoToday('#" + i.id + "');\">" + tt + "</button>") + (o ? "" : ct) + "</div>" : "", st += ti + (n.browser.msie && parseInt(n.browser.version, 10) < 7 && !i.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), i._keyEvent = !1, st
        },
        _generateMonthYearHeader: function (n, i, r, u, f, e, o, s) {
            var p = this._get(n, "changeMonth"), y = this._get(n, "changeYear"), b = this._get(n, "showMonthAfterYear"), h = '<div class="ui-datepicker-title">', a = "", d, g, l;
            if (e || !p)a += '<span class="ui-datepicker-month">' + o[i] + "</span>"; else {
                for (d = u && u.getFullYear() == r, g = f && f.getFullYear() == r, a += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + t + ".datepicker._selectMonthYear('#" + n.id + "', this, 'M');\" onclick=\"DP_jQuery_" + t + ".datepicker._clickMonthYear('#" + n.id + "');\">", l = 0; l < 12; l++)(!d || l >= u.getMonth()) && (!g || l <= f.getMonth()) && (a += '<option value="' + l + '"' + (l == i ? ' selected="selected"' : "") + ">" + s[l] + "</option>");
                a += "</select>"
            }
            if (b || (h += a + (e || !(p && y) ? "&#xa0;" : "")), e || !y)h += '<span class="ui-datepicker-year">' + r + "</span>"; else {
                var nt = this._get(n, "yearRange").split(":"), k = (new Date).getFullYear(), w = function (n) {
                    var t = n.match(/c[+-].*/) ? r + parseInt(n.substring(1), 10) : n.match(/[+-].*/) ? k + parseInt(n, 10) : parseInt(n, 10);
                    return isNaN(t) ? k : t
                }, c = w(nt[0]), v = Math.max(c, w(nt[1] || ""));
                for (c = u ? Math.max(c, u.getFullYear()) : c, v = f ? Math.min(v, f.getFullYear()) : v, h += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + t + ".datepicker._selectMonthYear('#" + n.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + t + ".datepicker._clickMonthYear('#" + n.id + "');\">"; c <= v; c++)h += '<option value="' + c + '"' + (c == r ? ' selected="selected"' : "") + ">" + c + "</option>";
                h += "</select>"
            }
            return h += this._get(n, "yearSuffix"), b && (h += (e || !(p && y) ? "&#xa0;" : "") + a), h += "</div>"
        },
        _adjustInstDate: function (n, t, i) {
            var u = n.drawYear + (i == "Y" ? t : 0), f = n.drawMonth + (i == "M" ? t : 0), e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + (i == "D" ? t : 0), r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u, f, e)));
            n.selectedDay = r.getDate(), n.drawMonth = n.selectedMonth = r.getMonth(), n.drawYear = n.selectedYear = r.getFullYear(), (i == "M" || i == "Y") && this._notifyChange(n)
        },
        _restrictMinMax: function (n, t) {
            var r = this._getMinMaxDate(n, "min"), i = this._getMinMaxDate(n, "max");
            return t = r && t < r ? r : t, t = i && t > i ? i : t
        },
        _notifyChange: function (n) {
            var t = this._get(n, "onChangeMonthYear");
            t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n])
        },
        _getNumberOfMonths: function (n) {
            var t = this._get(n, "numberOfMonths");
            return t == null ? [1, 1] : typeof t == "number" ? [1, t] : t
        },
        _getMinMaxDate: function (n, t) {
            return this._determineDate(n, this._get(n, t + "Date"), null)
        },
        _getDaysInMonth: function (n, t) {
            return 32 - new Date(n, t, 32).getDate()
        },
        _getFirstDayOfMonth: function (n, t) {
            return new Date(n, t, 1).getDay()
        },
        _canAdjustMonth: function (n, t, i, r) {
            var f = this._getNumberOfMonths(n), u = this._daylightSavingAdjust(new Date(i, r + (t < 0 ? t : f[0] * f[1]), 1));
            return t < 0 && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())), this._isInRange(n, u)
        },
        _isInRange: function (n, t) {
            var r = this._getMinMaxDate(n, "min"), i = this._getMinMaxDate(n, "max");
            return (!r || t.getTime() >= r.getTime()) && (!i || t.getTime() <= i.getTime())
        },
        _getFormatConfig: function (n) {
            var t = this._get(n, "shortYearCutoff");
            return t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                shortYearCutoff: t,
                dayNamesShort: this._get(n, "dayNamesShort"),
                dayNames: this._get(n, "dayNames"),
                monthNamesShort: this._get(n, "monthNamesShort"),
                monthNames: this._get(n, "monthNames")
            }
        },
        _formatDate: function (n, t, i, r) {
            t || (n.currentDay = n.selectedDay, n.currentMonth = n.selectedMonth, n.currentYear = n.selectedYear);
            var u = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r, i, t)) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
            return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
        }
    }), n.fn.datepicker = function (t) {
        n.datepicker.initialized || (n(document).mousedown(n.datepicker._checkExternalClick).find("body").append(n.datepicker.dpDiv), n.datepicker.initialized = !0);
        var i = Array.prototype.slice.call(arguments, 1);
        return typeof t == "string" && (t == "isDisabled" || t == "getDate" || t == "widget") ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : t == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function () {
            typeof t == "string" ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
        })
    }, n.datepicker = new u, n.datepicker.initialized = !1, n.datepicker.uuid = +new Date, n.datepicker.version = "1.8", window["DP_jQuery_" + t] = n
}(jQuery), function (n) {
    n.widget("ui.progressbar", {
        options: {value: 0}, _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this._valueMin(),
                "aria-valuemax": this._valueMax(),
                "aria-valuenow": this._value()
            }), this.valueDiv = n("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
        }, destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove(), n.Widget.prototype.destroy.apply(this, arguments)
        }, value: function (n) {
            return n === undefined ? this._value() : (this._setOption("value", n), this)
        }, _setOption: function (t, i) {
            switch (t) {
                case"value":
                    this.options.value = i, this._refreshValue(), this._trigger("change")
            }
            n.Widget.prototype._setOption.apply(this, arguments)
        }, _value: function () {
            var n = this.options.value;
            return typeof n != "number" && (n = 0), n < this._valueMin() && (n = this._valueMin()), n > this._valueMax() && (n = this._valueMax()), n
        }, _valueMin: function () {
            return 0
        }, _valueMax: function () {
            return 100
        }, _refreshValue: function () {
            var n = this.value();
            this.valueDiv[n === this._valueMax() ? "addClass" : "removeClass"]("ui-corner-right").width(n + "%"), this.element.attr("aria-valuenow", n)
        }
    }), n.extend(n.ui.progressbar, {version: "1.8"})
}(jQuery), jQuery.effects || function (n) {
    function u(t) {
        var i;
        return t && t.constructor == Array && t.length == 3 ? t : (i = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)] : (i = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) ? [parseFloat(i[1]) * 2.55, parseFloat(i[2]) * 2.55, parseFloat(i[3]) * 2.55] : (i = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) ? [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)] : (i = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) ? [parseInt(i[1] + i[1], 16), parseInt(i[2] + i[2], 16), parseInt(i[3] + i[3], 16)] : (i = /rgba\(0, 0, 0, 0\)/.exec(t)) ? e.transparent : e[n.trim(t).toLowerCase()]
    }

    function o(t, i) {
        var r;
        do {
            if (r = n.curCSS(t, i), r != "" && r != "transparent" || n.nodeName(t, "body"))break;
            i = "backgroundColor"
        } while (t = t.parentNode);
        return u(r)
    }

    function i() {
        var n = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, r = {}, t, u, i;
        if (n && n.length && n[0] && n[n[0]])for (i = n.length; i--;)t = n[i], typeof n[t] == "string" && (u = t.replace(/\-(\w)/g, function (n, t) {
            return t.toUpperCase()
        }), r[u] = n[t]); else for (t in n)typeof n[t] == "string" && (r[t] = n[t]);
        return r
    }

    function r(t) {
        var i, r;
        for (i in t)r = t[i], (r == null || n.isFunction(r) || i in h || /scrollbar/.test(i) || !/color/i.test(i) && isNaN(parseFloat(r))) && delete t[i];
        return t
    }

    function s(n, t) {
        var r = {_: 0}, i;
        for (i in t)n[i] != t[i] && (r[i] = t[i]);
        return r
    }

    function t(t, i, r, u) {
        return typeof t == "object" && (u = i, r = null, i = t, t = i.effect), n.isFunction(i) && (u = i, r = null, i = {}), n.isFunction(r) && (u = r, r = null), (typeof i == "number" || n.fx.speeds[i]) && (u = r, r = i, i = {}), i = i || {}, r = r || i.duration, r = n.fx.off ? 0 : typeof r == "number" ? r : n.fx.speeds[r] || n.fx.speeds._default, u = u || i.complete, [t, i, r, u]
    }

    n.effects = {}, n.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (t, i) {
        n.fx.step[i] = function (n) {
            n.colorInit || (n.start = o(n.elem, i), n.end = u(n.end), n.colorInit = !0), n.elem.style[i] = "rgb(" + Math.max(Math.min(parseInt(n.pos * (n.end[0] - n.start[0]) + n.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(n.pos * (n.end[1] - n.start[1]) + n.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(n.pos * (n.end[2] - n.start[2]) + n.start[2], 10), 255), 0) + ")"
        }
    });
    var e = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }, f = ["add", "remove", "toggle"], h = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    n.effects.animateClass = function (t, u, e, o) {
        return n.isFunction(e) && (o = e, e = null), this.each(function () {
            var h = n(this), l = h.attr("style") || " ", v = r(i.call(this)), c, a = h.attr("className");
            n.each(f, function (n, i) {
                t[i] && h[i + "Class"](t[i])
            }), c = r(i.call(this)), h.attr("className", a), h.animate(s(v, c), u, e, function () {
                n.each(f, function (n, i) {
                    t[i] && h[i + "Class"](t[i])
                }), typeof h.attr("style") == "object" ? (h.attr("style").cssText = "", h.attr("style").cssText = l) : h.attr("style", l), o && o.apply(this, arguments)
            })
        })
    }, n.fn.extend({
        _addClass: n.fn.addClass, addClass: function (t, i, r, u) {
            return i ? n.effects.animateClass.apply(this, [{add: t}, i, r, u]) : this._addClass(t)
        }, _removeClass: n.fn.removeClass, removeClass: function (t, i, r, u) {
            return i ? n.effects.animateClass.apply(this, [{remove: t}, i, r, u]) : this._removeClass(t)
        }, _toggleClass: n.fn.toggleClass, toggleClass: function (t, i, r, u, f) {
            return typeof i == "boolean" || i === undefined ? r ? n.effects.animateClass.apply(this, [i ? {add: t} : {remove: t}, r, u, f]) : this._toggleClass(t, i) : n.effects.animateClass.apply(this, [{toggle: t}, i, r, u])
        }, switchClass: function (t, i, r, u, f) {
            return n.effects.animateClass.apply(this, [{add: i, remove: t}, r, u, f])
        }
    }), n.extend(n.effects, {
        version: "1.8", save: function (n, t) {
            for (var i = 0; i < t.length; i++)t[i] !== null && n.data("ec.storage." + t[i], n[0].style[t[i]])
        }, restore: function (n, t) {
            for (var i = 0; i < t.length; i++)t[i] !== null && n.css(t[i], n.data("ec.storage." + t[i]))
        }, setMode: function (n, t) {
            return t == "toggle" && (t = n.is(":hidden") ? "show" : "hide"), t
        }, getBaseline: function (n, t) {
            var r, i;
            switch (n[0]) {
                case"top":
                    r = 0;
                    break;
                case"middle":
                    r = .5;
                    break;
                case"bottom":
                    r = 1;
                    break;
                default:
                    r = n[0] / t.height
            }
            switch (n[1]) {
                case"left":
                    i = 0;
                    break;
                case"center":
                    i = .5;
                    break;
                case"right":
                    i = 1;
                    break;
                default:
                    i = n[1] / t.width
            }
            return {x: i, y: r}
        }, createWrapper: function (t) {
            if (t.parent().is(".ui-effects-wrapper"))return t.parent();
            var i = {
                width: t.outerWidth(!0),
                height: t.outerHeight(!0),
                float: t.css("float")
            }, r = n("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            });
            return t.wrap(r), r = t.parent(), t.css("position") == "static" ? (r.css({position: "relative"}), t.css({position: "relative"})) : (n.extend(i, {
                position: t.css("position"),
                zIndex: t.css("z-index")
            }), n.each(["top", "left", "bottom", "right"], function (n, r) {
                i[r] = t.css(r), isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
            }), t.css({position: "relative", top: 0, left: 0})), r.css(i).show()
        }, removeWrapper: function (n) {
            return n.parent().is(".ui-effects-wrapper") ? n.parent().replaceWith(n) : n
        }, setTransition: function (t, i, r, u) {
            return u = u || {}, n.each(i, function (n, i) {
                unit = t.cssUnit(i), unit[0] > 0 && (u[i] = unit[0] * r + unit[1])
            }), u
        }
    }), n.fn.extend({
        effect: function (i) {
            var e = t.apply(this, arguments), s = {options: e[1], duration: e[2], callback: e[3]}, o = n.effects[i];
            return o && !n.fx.off ? o.call(this, s) : this
        }, _show: n.fn.show, show: function (i) {
            if (!i || typeof i == "number" || n.fx.speeds[i])return this._show.apply(this, arguments);
            var r = t.apply(this, arguments);
            return r[1].mode = "show", this.effect.apply(this, r)
        }, _hide: n.fn.hide, hide: function (i) {
            if (!i || typeof i == "number" || n.fx.speeds[i])return this._hide.apply(this, arguments);
            var r = t.apply(this, arguments);
            return r[1].mode = "hide", this.effect.apply(this, r)
        }, __toggle: n.fn.toggle, toggle: function (i) {
            if (!i || typeof i == "number" || n.fx.speeds[i] || typeof i == "boolean" || n.isFunction(i))return this.__toggle.apply(this, arguments);
            var r = t.apply(this, arguments);
            return r[1].mode = "toggle", this.effect.apply(this, r)
        }, cssUnit: function (t) {
            var r = this.css(t), i = [];
            return n.each(["em", "px", "%", "pt"], function (n, t) {
                r.indexOf(t) > 0 && (i = [parseFloat(r), t])
            }), i
        }
    }), n.easing.jswing = n.easing.swing, n.extend(n.easing, {
        def: "easeOutQuad", swing: function (t, i, r, u, f) {
            return n.easing[n.easing.def](t, i, r, u, f)
        }, easeInQuad: function (n, t, i, r, u) {
            return r * (t /= u) * t + i
        }, easeOutQuad: function (n, t, i, r, u) {
            return -r * (t /= u) * (t - 2) + i
        }, easeInOutQuad: function (n, t, i, r, u) {
            return (t /= u / 2) < 1 ? r / 2 * t * t + i : -r / 2 * (--t * (t - 2) - 1) + i
        }, easeInCubic: function (n, t, i, r, u) {
            return r * (t /= u) * t * t + i
        }, easeOutCubic: function (n, t, i, r, u) {
            return r * ((t = t / u - 1) * t * t + 1) + i
        }, easeInOutCubic: function (n, t, i, r, u) {
            return (t /= u / 2) < 1 ? r / 2 * t * t * t + i : r / 2 * ((t -= 2) * t * t + 2) + i
        }, easeInQuart: function (n, t, i, r, u) {
            return r * (t /= u) * t * t * t + i
        }, easeOutQuart: function (n, t, i, r, u) {
            return -r * ((t = t / u - 1) * t * t * t - 1) + i
        }, easeInOutQuart: function (n, t, i, r, u) {
            return (t /= u / 2) < 1 ? r / 2 * t * t * t * t + i : -r / 2 * ((t -= 2) * t * t * t - 2) + i
        }, easeInQuint: function (n, t, i, r, u) {
            return r * (t /= u) * t * t * t * t + i
        }, easeOutQuint: function (n, t, i, r, u) {
            return r * ((t = t / u - 1) * t * t * t * t + 1) + i
        }, easeInOutQuint: function (n, t, i, r, u) {
            return (t /= u / 2) < 1 ? r / 2 * t * t * t * t * t + i : r / 2 * ((t -= 2) * t * t * t * t + 2) + i
        }, easeInSine: function (n, t, i, r, u) {
            return -r * Math.cos(t / u * (Math.PI / 2)) + r + i
        }, easeOutSine: function (n, t, i, r, u) {
            return r * Math.sin(t / u * (Math.PI / 2)) + i
        }, easeInOutSine: function (n, t, i, r, u) {
            return -r / 2 * (Math.cos(Math.PI * t / u) - 1) + i
        }, easeInExpo: function (n, t, i, r, u) {
            return t == 0 ? i : r * Math.pow(2, 10 * (t / u - 1)) + i
        }, easeOutExpo: function (n, t, i, r, u) {
            return t == u ? i + r : r * (-Math.pow(2, -10 * t / u) + 1) + i
        }, easeInOutExpo: function (n, t, i, r, u) {
            return t == 0 ? i : t == u ? i + r : (t /= u / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + i : r / 2 * (-Math.pow(2, -10 * --t) + 2) + i
        }, easeInCirc: function (n, t, i, r, u) {
            return -r * (Math.sqrt(1 - (t /= u) * t) - 1) + i
        }, easeOutCirc: function (n, t, i, r, u) {
            return r * Math.sqrt(1 - (t = t / u - 1) * t) + i
        }, easeInOutCirc: function (n, t, i, r, u) {
            return (t /= u / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + i : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i
        }, easeInElastic: function (n, t, i, r, u) {
            var o = 1.70158, f = 0, e = r;
            return t == 0 ? i : (t /= u) == 1 ? i + r : (f || (f = u * .3), e < Math.abs(r) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), -(e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f)) + i)
        }, easeOutElastic: function (n, t, i, r, u) {
            var o = 1.70158, f = 0, e = r;
            return t == 0 ? i : (t /= u) == 1 ? i + r : (f || (f = u * .3), e < Math.abs(r) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), e * Math.pow(2, -10 * t) * Math.sin((t * u - o) * 2 * Math.PI / f) + r + i)
        }, easeInOutElastic: function (n, t, i, r, u) {
            var o = 1.70158, f = 0, e = r;
            return t == 0 ? i : (t /= u / 2) == 2 ? i + r : (f || (f = u * .3 * 1.5), e < Math.abs(r) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), t < 1) ? -.5 * e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f) + i : e * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f) * .5 + r + i
        }, easeInBack: function (n, t, i, r, u, f) {
            return f == undefined && (f = 1.70158), r * (t /= u) * t * ((f + 1) * t - f) + i
        }, easeOutBack: function (n, t, i, r, u, f) {
            return f == undefined && (f = 1.70158), r * ((t = t / u - 1) * t * ((f + 1) * t + f) + 1) + i
        }, easeInOutBack: function (n, t, i, r, u, f) {
            return (f == undefined && (f = 1.70158), (t /= u / 2) < 1) ? r / 2 * t * t * (((f *= 1.525) + 1) * t - f) + i : r / 2 * ((t -= 2) * t * (((f *= 1.525) + 1) * t + f) + 2) + i
        }, easeInBounce: function (t, i, r, u, f) {
            return u - n.easing.easeOutBounce(t, f - i, 0, u, f) + r
        }, easeOutBounce: function (n, t, i, r, u) {
            return (t /= u) < 1 / 2.75 ? r * 7.5625 * t * t + i : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
        }, easeInOutBounce: function (t, i, r, u, f) {
            return i < f / 2 ? n.easing.easeInBounce(t, i * 2, 0, u, f) * .5 + r : n.easing.easeOutBounce(t, i * 2 - f, 0, u, f) * .5 + u * .5 + r
        }
    })
}(jQuery), function (n) {
    n.effects.blind = function (t) {
        return this.queue(function () {
            var i = n(this), s = ["position", "top", "left"], f = n.effects.setMode(i, t.options.mode || "hide"), e = t.options.direction || "vertical", u;
            n.effects.save(i, s), i.show();
            var r = n.effects.createWrapper(i).css({overflow: "hidden"}), o = e == "vertical" ? "height" : "width", h = e == "vertical" ? r.height() : r.width();
            f == "show" && r.css(o, 0), u = {}, u[o] = f == "show" ? h : 0, r.animate(u, t.duration, t.options.easing, function () {
                f == "hide" && i.hide(), n.effects.restore(i, s), n.effects.removeWrapper(i), t.callback && t.callback.apply(i[0], arguments), i.dequeue()
            })
        })
    }
}(jQuery), function (n) {
    n.effects.bounce = function (t) {
        return this.queue(function () {
            var i = n(this), a = ["position", "top", "left"], e = n.effects.setMode(i, t.options.mode || "effect"), l = t.options.direction || "up", r = t.options.distance || 20, v = t.options.times || 5, c = t.duration || 250, y, h, o, s;
            /show|hide/.test(e) && a.push("opacity"), n.effects.save(i, a), i.show(), n.effects.createWrapper(i);
            var u = l == "up" || l == "down" ? "top" : "left", f = l == "up" || l == "left" ? "pos" : "neg", r = t.options.distance || (u == "top" ? i.outerHeight({margin: !0}) / 3 : i.outerWidth({margin: !0}) / 3);
            for (e == "show" && i.css("opacity", 0).css(u, f == "pos" ? -r : r), e == "hide" && (r = r / (v * 2)), e != "hide" && v--, e == "show" && (h = {opacity: 1}, h[u] = (f == "pos" ? "+=" : "-=") + r, i.animate(h, c / 2, t.options.easing), r = r / 2, v--), y = 0; y < v; y++)o = {}, s = {}, o[u] = (f == "pos" ? "-=" : "+=") + r, s[u] = (f == "pos" ? "+=" : "-=") + r, i.animate(o, c / 2, t.options.easing).animate(s, c / 2, t.options.easing), r = e == "hide" ? r * 2 : r / 2;
            e == "hide" ? (h = {opacity: 0}, h[u] = (f == "pos" ? "-=" : "+=") + r, i.animate(h, c / 2, t.options.easing, function () {
                i.hide(), n.effects.restore(i, a), n.effects.removeWrapper(i), t.callback && t.callback.apply(this, arguments)
            })) : (o = {}, s = {}, o[u] = (f == "pos" ? "-=" : "+=") + r, s[u] = (f == "pos" ? "+=" : "-=") + r, i.animate(o, c / 2, t.options.easing).animate(s, c / 2, t.options.easing, function () {
                n.effects.restore(i, a), n.effects.removeWrapper(i), t.callback && t.callback.apply(this, arguments)
            })), i.queue("fx", function () {
                i.dequeue()
            }), i.dequeue()
        })
    }
}(jQuery), function (n) {
    n.effects.clip = function (t) {
        return this.queue(function () {
            var i = n(this), h = ["position", "top", "left", "height", "width"], e = n.effects.setMode(i, t.options.mode || "hide"), s = t.options.direction || "vertical", u;
            n.effects.save(i, h), i.show();
            var c = n.effects.createWrapper(i).css({overflow: "hidden"}), r = i[0].tagName == "IMG" ? c : i, f = {
                size: s == "vertical" ? "height" : "width",
                position: s == "vertical" ? "top" : "left"
            }, o = s == "vertical" ? r.height() : r.width();
            e == "show" && (r.css(f.size, 0), r.css(f.position, o / 2)), u = {}, u[f.size] = e == "show" ? o : 0, u[f.position] = e == "show" ? 0 : o / 2, r.animate(u, {
                queue: !1,
                duration: t.duration,
                easing: t.options.easing,
                complete: function () {
                    e == "hide" && i.hide(), n.effects.restore(i, h), n.effects.removeWrapper(i), t.callback && t.callback.apply(i[0], arguments), i.dequeue()
                }
            })
        })
    }
}(jQuery), function (n) {
    n.effects.drop = function (t) {
        return this.queue(function () {
            var i = n(this), h = ["position", "top", "left", "opacity"], u = n.effects.setMode(i, t.options.mode || "hide"), r = t.options.direction || "left", f;
            n.effects.save(i, h), i.show(), n.effects.createWrapper(i);
            var s = r == "up" || r == "down" ? "top" : "left", o = r == "up" || r == "left" ? "pos" : "neg", e = t.options.distance || (s == "top" ? i.outerHeight({margin: !0}) / 2 : i.outerWidth({margin: !0}) / 2);
            u == "show" && i.css("opacity", 0).css(s, o == "pos" ? -e : e), f = {opacity: u == "show" ? 1 : 0}, f[s] = (u == "show" ? o == "pos" ? "+=" : "-=" : o == "pos" ? "-=" : "+=") + e, i.animate(f, {
                queue: !1,
                duration: t.duration,
                easing: t.options.easing,
                complete: function () {
                    u == "hide" && i.hide(), n.effects.restore(i, h), n.effects.removeWrapper(i), t.callback && t.callback.apply(this, arguments), i.dequeue()
                }
            })
        })
    }
}(jQuery), function (n) {
    n.effects.explode = function (t) {
        return this.queue(function () {
            var u = t.options.pieces ? Math.round(Math.sqrt(t.options.pieces)) : 3, r = t.options.pieces ? Math.round(Math.sqrt(t.options.pieces)) : 3, i, o, s, h, f, e;
            for (t.options.mode = t.options.mode == "toggle" ? n(this).is(":visible") ? "hide" : "show" : t.options.mode, i = n(this).show().css("visibility", "hidden"), o = i.offset(), o.top -= parseInt(i.css("marginTop"), 10) || 0, o.left -= parseInt(i.css("marginLeft"), 10) || 0, s = i.outerWidth(!0), h = i.outerHeight(!0), f = 0; f < u; f++)for (e = 0; e < r; e++)i.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -e * (s / r),
                top: -f * (h / u)
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: s / r,
                height: h / u,
                left: o.left + e * (s / r) + (t.options.mode == "show" ? (e - Math.floor(r / 2)) * (s / r) : 0),
                top: o.top + f * (h / u) + (t.options.mode == "show" ? (f - Math.floor(u / 2)) * (h / u) : 0),
                opacity: t.options.mode == "show" ? 0 : 1
            }).animate({
                left: o.left + e * (s / r) + (t.options.mode == "show" ? 0 : (e - Math.floor(r / 2)) * (s / r)),
                top: o.top + f * (h / u) + (t.options.mode == "show" ? 0 : (f - Math.floor(u / 2)) * (h / u)),
                opacity: t.options.mode == "show" ? 1 : 0
            }, t.duration || 500);
            setTimeout(function () {
                t.options.mode == "show" ? i.css({visibility: "visible"}) : i.css({visibility: "visible"}).hide(), t.callback && t.callback.apply(i[0]), i.dequeue(), n("div.ui-effects-explode").remove()
            }, t.duration || 500)
        })
    }
}(jQuery), function (n) {
    n.effects.fold = function (t) {
        return this.queue(function () {
            var i = n(this), a = ["position", "top", "left"], u = n.effects.setMode(i, t.options.mode || "hide"), f = t.options.size || 15, c = !!t.options.horizFirst, y = t.duration ? t.duration / 2 : n.fx.speeds._default / 2, s, e;
            n.effects.save(i, a), i.show();
            var r = n.effects.createWrapper(i).css({overflow: "hidden"}), l = u == "show" != c, v = l ? ["width", "height"] : ["height", "width"], o = l ? [r.width(), r.height()] : [r.height(), r.width()], h = /([0-9]+)%/.exec(f);
            h && (f = parseInt(h[1], 10) / 100 * o[u == "hide" ? 0 : 1]), u == "show" && r.css(c ? {
                height: 0,
                width: f
            } : {
                height: f,
                width: 0
            }), s = {}, e = {}, s[v[0]] = u == "show" ? o[0] : f, e[v[1]] = u == "show" ? o[1] : 0, r.animate(s, y, t.options.easing).animate(e, y, t.options.easing, function () {
                u == "hide" && i.hide(), n.effects.restore(i, a), n.effects.removeWrapper(i), t.callback && t.callback.apply(i[0], arguments), i.dequeue()
            })
        })
    }
}(jQuery), function (n) {
    n.effects.highlight = function (t) {
        return this.queue(function () {
            var i = n(this), f = ["backgroundImage", "backgroundColor", "opacity"], r = n.effects.setMode(i, t.options.mode || "show"), u = {backgroundColor: i.css("backgroundColor")};
            r == "hide" && (u.opacity = 0), n.effects.save(i, f), i.show().css({
                backgroundImage: "none",
                backgroundColor: t.options.color || "#ffff99"
            }).animate(u, {
                queue: !1, duration: t.duration, easing: t.options.easing, complete: function () {
                    r == "hide" && i.hide(), n.effects.restore(i, f), r == "show" && !n.support.opacity && this.style.removeAttribute("filter"), t.callback && t.callback.apply(this, arguments), i.dequeue()
                }
            })
        })
    }
}(jQuery), function (n) {
    n.effects.pulsate = function (t) {
        return this.queue(function () {
            var i = n(this), u = n.effects.setMode(i, t.options.mode || "show"), r;
            for (times = (t.options.times || 5) * 2 - 1, duration = t.duration ? t.duration / 2 : n.fx.speeds._default / 2, isVisible = i.is(":visible"), animateTo = 0, isVisible || (i.css("opacity", 0).show(), animateTo = 1), (u == "hide" && isVisible || u == "show" && !isVisible) && times--, r = 0; r < times; r++)i.animate({opacity: animateTo}, duration, t.options.easing), animateTo = (animateTo + 1) % 2;
            i.animate({opacity: animateTo}, duration, t.options.easing, function () {
                animateTo == 0 && i.hide(), t.callback && t.callback.apply(this, arguments)
            }), i.queue("fx", function () {
                i.dequeue()
            }).dequeue()
        })
    }
}(jQuery), function (n) {
    n.effects.puff = function (t) {
        return this.queue(function () {
            var i = n(this), u = n.effects.setMode(i, t.options.mode || "hide"), f = parseInt(t.options.percent, 10) || 150, e = f / 100, r = {
                height: i.height(),
                width: i.width()
            };
            n.extend(t.options, {
                fade: !0,
                mode: u,
                percent: u == "hide" ? f : 100,
                from: u == "hide" ? r : {height: r.height * e, width: r.width * e}
            }), i.effect("scale", t.options, t.duration, t.callback), i.dequeue()
        })
    }, n.effects.scale = function (t) {
        return this.queue(function () {
            var i = n(this), u = n.extend(!0, {}, t.options), r = n.effects.setMode(i, t.options.mode || "effect"), o = parseInt(t.options.percent, 10) || (parseInt(t.options.percent, 10) == 0 ? 0 : r == "hide" ? 0 : 100), s = t.options.direction || "both", h = t.options.origin, f, e;
            r != "effect" && (u.origin = h || ["middle", "center"], u.restore = !0), f = {
                height: i.height(),
                width: i.width()
            }, i.from = t.options.from || (r == "show" ? {
                height: 0,
                width: 0
            } : f), e = {
                y: s != "horizontal" ? o / 100 : 1,
                x: s != "vertical" ? o / 100 : 1
            }, i.to = {
                height: f.height * e.y,
                width: f.width * e.x
            }, t.options.fade && (r == "show" && (i.from.opacity = 0, i.to.opacity = 1), r == "hide" && (i.from.opacity = 1, i.to.opacity = 0)), u.from = i.from, u.to = i.to, u.mode = r, i.effect("size", u, t.duration, t.callback), i.dequeue()
        })
    }, n.effects.size = function (t) {
        return this.queue(function () {
            var i = n(this), f = ["position", "top", "left", "width", "height", "overflow", "opacity"], v = ["position", "top", "left", "overflow", "opacity"], a = ["width", "height", "overflow"], c = ["fontSize"], e = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], o = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], p = n.effects.setMode(i, t.options.mode || "effect"), l = t.options.restore || !1, s = t.options.scale || "both", y = t.options.origin, u = {
                height: i.height(),
                width: i.width()
            }, h, r;
            i.from = t.options.from || u, i.to = t.options.to || u, y && (h = n.effects.getBaseline(y, u), i.from.top = (u.height - i.from.height) * h.y, i.from.left = (u.width - i.from.width) * h.x, i.to.top = (u.height - i.to.height) * h.y, i.to.left = (u.width - i.to.width) * h.x), r = {
                from: {
                    y: i.from.height / u.height,
                    x: i.from.width / u.width
                }, to: {y: i.to.height / u.height, x: i.to.width / u.width}
            }, (s == "box" || s == "both") && (r.from.y != r.to.y && (f = f.concat(e), i.from = n.effects.setTransition(i, e, r.from.y, i.from), i.to = n.effects.setTransition(i, e, r.to.y, i.to)), r.from.x != r.to.x && (f = f.concat(o), i.from = n.effects.setTransition(i, o, r.from.x, i.from), i.to = n.effects.setTransition(i, o, r.to.x, i.to))), (s == "content" || s == "both") && r.from.y != r.to.y && (f = f.concat(c), i.from = n.effects.setTransition(i, c, r.from.y, i.from), i.to = n.effects.setTransition(i, c, r.to.y, i.to)), n.effects.save(i, l ? f : v), i.show(), n.effects.createWrapper(i), i.css("overflow", "hidden").css(i.from), (s == "content" || s == "both") && (e = e.concat(["marginTop", "marginBottom"]).concat(c), o = o.concat(["marginLeft", "marginRight"]), a = f.concat(e).concat(o), i.find("*[width]").each(function () {
                child = n(this), l && n.effects.save(child, a);
                var i = {height: child.height(), width: child.width()};
                child.from = {
                    height: i.height * r.from.y,
                    width: i.width * r.from.x
                }, child.to = {
                    height: i.height * r.to.y,
                    width: i.width * r.to.x
                }, r.from.y != r.to.y && (child.from = n.effects.setTransition(child, e, r.from.y, child.from), child.to = n.effects.setTransition(child, e, r.to.y, child.to)), r.from.x != r.to.x && (child.from = n.effects.setTransition(child, o, r.from.x, child.from), child.to = n.effects.setTransition(child, o, r.to.x, child.to)), child.css(child.from), child.animate(child.to, t.duration, t.options.easing, function () {
                    l && n.effects.restore(child, a)
                })
            })), i.animate(i.to, {
                queue: !1, duration: t.duration, easing: t.options.easing, complete: function () {
                    i.to.opacity === 0 && i.css("opacity", i.from.opacity), p == "hide" && i.hide(), n.effects.restore(i, l ? f : v), n.effects.removeWrapper(i), t.callback && t.callback.apply(this, arguments), i.dequeue()
                }
            })
        })
    }
}(jQuery), function (n) {
    n.effects.shake = function (t) {
        return this.queue(function () {
            var i = n(this), a = ["position", "top", "left"], y = n.effects.setMode(i, t.options.mode || "effect"), u = t.options.direction || "left", c = t.options.distance || 20, v = t.options.times || 3, r = t.duration || t.options.duration || 140, e;
            n.effects.save(i, a), i.show(), n.effects.createWrapper(i);
            var h = u == "up" || u == "down" ? "top" : "left", f = u == "up" || u == "left" ? "pos" : "neg", s = {}, o = {}, l = {};
            for (s[h] = (f == "pos" ? "-=" : "+=") + c, o[h] = (f == "pos" ? "+=" : "-=") + c * 2, l[h] = (f == "pos" ? "-=" : "+=") + c * 2, i.animate(s, r, t.options.easing), e = 1; e < v; e++)i.animate(o, r, t.options.easing).animate(l, r, t.options.easing);
            i.animate(o, r, t.options.easing).animate(s, r / 2, t.options.easing, function () {
                n.effects.restore(i, a), n.effects.removeWrapper(i), t.callback && t.callback.apply(this, arguments)
            }), i.queue("fx", function () {
                i.dequeue()
            }), i.dequeue()
        })
    }
}(jQuery), function (n) {
    n.effects.slide = function (t) {
        return this.queue(function () {
            var i = n(this), h = ["position", "top", "left"], o = n.effects.setMode(i, t.options.mode || "show"), r = t.options.direction || "left", e;
            n.effects.save(i, h), i.show(), n.effects.createWrapper(i).css({overflow: "hidden"});
            var s = r == "up" || r == "down" ? "top" : "left", u = r == "up" || r == "left" ? "pos" : "neg", f = t.options.distance || (s == "top" ? i.outerHeight({margin: !0}) : i.outerWidth({margin: !0}));
            o == "show" && i.css(s, u == "pos" ? -f : f), e = {}, e[s] = (o == "show" ? u == "pos" ? "+=" : "-=" : u == "pos" ? "-=" : "+=") + f, i.animate(e, {
                queue: !1,
                duration: t.duration,
                easing: t.options.easing,
                complete: function () {
                    o == "hide" && i.hide(), n.effects.restore(i, h), n.effects.removeWrapper(i), t.callback && t.callback.apply(this, arguments), i.dequeue()
                }
            })
        })
    }
}(jQuery), function (n) {
    n.effects.transfer = function (t) {
        return this.queue(function () {
            var i = n(this), r = n(t.options.to), f = r.offset(), o = {
                top: f.top,
                left: f.left,
                height: r.innerHeight(),
                width: r.innerWidth()
            }, u = i.offset(), e = n('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(t.options.className).css({
                top: u.top,
                left: u.left,
                height: i.innerHeight(),
                width: i.innerWidth(),
                position: "absolute"
            }).animate(o, t.duration, t.options.easing, function () {
                e.remove(), t.callback && t.callback.apply(i[0], arguments), i.dequeue()
            })
        })
    }
}(jQuery), function (n) {
    n.fn.extend({
        autocomplete: function (t, i, r) {
            var u = typeof t == "string";
            return i = n.extend({}, n.Autocompleter.defaults, {
                url: u ? t : null,
                data: u ? null : t,
                delay: u ? n.Autocompleter.defaults.delay : 10,
                max: i && !i.scroll ? 10 : 150
            }, i), i.highlight = i.highlight || function (n) {
                return n
            }, i.formatMatch = i.formatMatch || i.formatItem, this.each(function () {
                new n.Autocompleter(this, i, r)
            })
        }, result: function (n) {
            return this.bind("result", n)
        }, search: function (n) {
            return this.trigger("search", [n])
        }, flushCache: function () {
            return this.trigger("flushCache")
        }, setOptions: function (n) {
            return this.trigger("setOptions", [n])
        }, unautocomplete: function () {
            return this.trigger("unautocomplete")
        }
    }), n.Autocompleter = function (t, i, r) {
        function d() {
            var o = f.selected(), r, e;
            if (!o)return !1;
            if (r = o.data[0], h = r, i.multiple) {
                if (e = s(u.val()), e.length > 1) {
                    var v = i.multipleSeparator.length, y = n(t).selection().start, l, c = 0;
                    n.each(e, function (n, t) {
                        if (c += t.length, y <= c)return l = n, !1;
                        c += v
                    }), e[l] = r, r = e.join(i.multipleSeparator)
                }
                r += i.multipleSeparator
            }
            return u.val(r), a(), u.trigger("result", [o.data, o.value]), !0
        }

        function o(n, t) {
            if (b == e.DEL) {
                f.hide();
                return
            }
            var r = u.val();
            if (t || r != h)h = r, r = v(r), r.length >= i.minChars ? (u.addClass(i.loadingClass), i.matchCase || (r = r.toLowerCase()), r.length >= 3 && k(r, nt, a)) : (y(), f.hide())
        }

        function s(t) {
            return t ? i.multiple ? n.map(t.split(i.multipleSeparator), function (i) {
                return n.trim(t).length ? n.trim(i) : null
            }) : [n.trim(t)] : [""]
        }

        function v(r) {
            var u, f;
            return i.multiple ? (u = s(r), u.length == 1) ? u[0] : (f = n(t).selection().start, u = f == r.length ? s(r) : s(r.replace(r.substring(f), "")), u[u.length - 1]) : r
        }

        function rt(r, f) {
            i.autoFill && v(u.val()).toLowerCase() == r.toLowerCase() && b != e.BACKSPACE && (u.val(u.val() + f.substring(v(h).length)), n(t).selection(h.length, h.length + f.length))
        }

        function it() {
            clearTimeout(c), c = setTimeout(a, 200)
        }

        function a() {
            var n = f.visible();
            f.hide(), clearTimeout(c), y(), i.mustMatch && u.search(function (n) {
                if (!n)if (i.multiple) {
                    var t = s(u.val()).slice(0, -1);
                    u.val(t.join(i.multipleSeparator) + (t.length ? i.multipleSeparator : ""))
                } else u.val(""), u.trigger("result", null)
            })
        }

        function nt(n, t) {
            t && t.length && l ? (y(), f.display(t, n), rt(n, t[0].value), f.show()) : a()
        }

        function ut(n) {
            for (var o = "áàãââÁÀÃÂéêÉÊíÍóõôÓÔÕúüÚÜçÇabcdefghijklmnopqrstuvxwyz", e = "aaaaaAAAAeeEEiIoooOOOuuUUcCABCDEFGHIJKLMNOPQRSTUVXWYZ", r, f, i = "", u = n.toUpperCase(), t = 0; t < n.length; t++)f = u.charAt(t), r = o.indexOf(f), i += r > -1 ? e.charAt(r) : u.charAt(t);
            return i
        }

        function k(t, u) {
            var s, h, e, o, c;
            i.matchCase || (t = ut(t)), s = p.load(t), s && s.length ? u(t, s) : (h = "PesquisarLocalidade=0;PesquisarCidade=1;PesquisarEstado=1;PesquisarPais=1;PesquisarContinente=0;PesquisarAeroporto=1;PesquisarIata=1;QuantidadeItensRetorno=20;MostrarLocalidade=0;MostrarCidadeEstado=1;MostrarPais=1;MostrarAeroportoIata=1;MostrarContinente=0", r && r == "hotel" && (h = "PesquisarLocalidade=0;PesquisarCidade=1;PesquisarEstado=1;PesquisarPais=1;PesquisarContinente=0;PesquisarAeroporto=0;PesquisarIata=0;QuantidadeItensRetorno=20;MostrarLocalidade=0;MostrarCidadeEstado=1;MostrarPais=1;MostrarAeroportoIata=0;MostrarContinente=0"), e = undefined, o = undefined, PescIncB2WGenerico ? (e = PathWebService + "LoadItemsPesqIncB2W", o = JSON2.stringifyWcf({
                prefixText: t,
                contextKey: h
            })) : (e = "/Produtos/UserControls/asmx/PesqInc.asmx/RetornarLocalidade", o = "{'prefixText':'" + t + "','count':10,'contextKey': '" + h + "'}"), c = typeof PescIncAfiliado != "undefined" ? PescIncAfiliado : !1, c == !1 && n.ajax({
                type: "POST",
                url: e,
                data: o,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (n) {
                    var r = i.parse && i.parse(n) || tt(n);
                    u(t, r)
                }
            }))
        }

        function tt(n) {
            var r = [], t, i;
            if (n)for (t = 0; t < n.length; t++)i = [], i[0] = n[t], r[t] = {data: i, value: n[t], resulta: n[t]};
            return r
        }

        function y() {
            u.removeClass(i.loadingClass)
        }

        var e = {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        }, u = n(t).attr("autocomplete", "off").addClass(i.inputClass), r = r, c, h = "", p = n.Autocompleter.Cache(i), l = 0, b, g = {mouseDownOnSelect: !1}, f = n.Autocompleter.Select(i, t, d, g), w;
        n.browser.opera && n(t.form).bind("submit.autocomplete", function () {
            if (w)return w = !1, !1
        }), u.bind((n.browser.opera ? "keypress" : "keydown") + ".autocomplete", function (t) {
            l = 1, b = t.keyCode;
            switch (t.keyCode) {
                case e.UP:
                    t.preventDefault(), f.visible() ? f.prev() : o(0, !0);
                    break;
                case e.DOWN:
                    t.preventDefault(), f.visible() ? f.next() : o(0, !0);
                    break;
                case e.PAGEUP:
                    t.preventDefault(), f.visible() ? f.pageUp() : o(0, !0);
                    break;
                case e.PAGEDOWN:
                    t.preventDefault(), f.visible() ? f.pageDown() : o(0, !0);
                    break;
                case i.multiple && n.trim(i.multipleSeparator) == "," && e.COMMA:
                case e.TAB:
                case e.RETURN:
                    if (d())return t.preventDefault(), w = !0, !1;
                    break;
                case e.ESC:
                    f.hide();
                    break;
                default:
                    clearTimeout(c), c = setTimeout(o, i.delay)
            }
        }).focus(function () {
            l++
        }).blur(function () {
            l = 0, g.mouseDownOnSelect || it()
        }).click(function () {
            l++ > 1 && !f.visible() && o(0, !0)
        }).bind("search", function () {
            function t(n, t) {
                var f, r;
                if (t && t.length)for (r = 0; r < t.length; r++)if (t[r].result.toLowerCase() == n.toLowerCase()) {
                    f = t[r];
                    break
                }
                typeof i == "function" ? i(f) : u.trigger("result", f && [f.data, f.value])
            }

            var i = arguments.length > 1 ? arguments[1] : null;
            n.each(s(u.val()), function (n, i) {
                k(i, t, t)
            })
        }).bind("flushCache", function () {
            p.flush()
        }).bind("setOptions", function () {
            n.extend(i, arguments[1]), "data"in arguments[1] && p.populate()
        }).bind("unautocomplete", function () {
            f.unbind(), u.unbind(), n(t.form).unbind(".autocomplete")
        })
    }, n.Autocompleter.defaults = {
        inputClass: "ac_input",
        resultsClass: "ac_results",
        loadingClass: "ac_loading",
        minChars: 1,
        delay: 400,
        matchCase: !1,
        matchSubset: !0,
        matchContains: "word",
        cacheLength: 350,
        max: 350,
        mustMatch: !1,
        extraParams: {},
        selectFirst: !0,
        formatItem: function (n) {
            return n[0]
        },
        formatMatch: null,
        autoFill: !1,
        width: 500,
        multiple: !1,
        multipleSeparator: ", ",
        highlight: function (n, t) {
            return n.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + t.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
        },
        scroll: !0,
        scrollHeight: 580
    }, n.Autocompleter.Cache = function (t) {
        function e(n, i) {
            t.matchCase || (n = n.toLowerCase());
            var r = n.indexOf(i);
            if (t.matchContains == "word")try {
                r = n.toLowerCase().search("\\b" + i.toLowerCase())
            } catch (u) {
            }
            return r == -1 ? !1 : r == 0 || t.matchContains
        }

        function o(n, u) {
            r > t.cacheLength && f(), i[n] || r++, i[n] = u
        }

        function u() {
            var r, c, u, h, i, f, e, s;
            if (!t.data)return !1;
            for (r = {}, c = 0, t.url || (t.cacheLength = 1), r[""] = [], u = 0, h = t.data.length; u < h; u++) {
                if (i = t.data[u], i = typeof i == "string" ? [i] : i, f = t.formatMatch(i, u + 1, t.data.length), f === !1)continue;
                e = f.charAt(0).toLowerCase(), r[e] || (r[e] = []), s = {
                    value: f,
                    data: i,
                    result: t.formatResult && t.formatResult(i) || f
                }, r[e].push(s), c++ < t.max && r[""].push(s)
            }
            n.each(r, function (n, i) {
                t.cacheLength++, o(n, i)
            })
        }

        function f() {
            i = {}, r = 0
        }

        var i = {}, r = 0;
        return setTimeout(u, 25), {
            flush: f, add: o, populate: u, load: function (u) {
                var h, s, o, f;
                if (!t.cacheLength || !r)return null;
                if (!t.url && t.matchContains) {
                    f = [];
                    for (h in i)h.length > 0 && (o = i[h], n.each(o, function (n, t) {
                        e(t.value, u) && f.push(t)
                    }));
                    return f
                }
                if (i[u])return i[u];
                if (t.matchSubset)for (s = u.length - 1; s >= t.minChars; s--)if (o = i[u.substr(0, s)], o)return f = [], n.each(o, function (n, t) {
                    e(t.value, u) && (f[f.length] = t)
                }), f;
                return null
            }
        }
    }, n.Autocompleter.Select = function (t, i, r, u) {
        function b() {
            if (y)s = n("<div/>").hide().addClass(t.resultsClass).css("position", "absolute").appendTo(document.body), o = n("<ul/>").appendTo(s).mouseover(function (t) {
                a(t).nodeName && a(t).nodeName.toUpperCase() == "LI" && (e = n("li", o).removeClass(h.ACTIVE).index(a(t)), n(a(t)).addClass(h.ACTIVE))
            }).click(function (t) {
                return n(a(t)).addClass(h.ACTIVE), r(), i.focus(), !1
            }).mousedown(function () {
                u.mouseDownOnSelect = !0
            }).mouseup(function () {
                u.mouseDownOnSelect = !1
            }), t.width > 0 && s.css("width", t.width), y = !1
        }

        function a(n) {
            for (var t = n.target; t && t.tagName != "LI";)t = t.parentNode;
            return t ? t : []
        }

        function c(n) {
            var r, i;
            f.slice(e, e + 1).removeClass(h.ACTIVE), k(n), r = f.slice(e, e + 1).addClass(h.ACTIVE), t.scroll && (i = 0, f.slice(0, e).each(function () {
                i += this.offsetHeight
            }), i + r[0].offsetHeight - o.scrollTop() > o[0].clientHeight ? o.scrollTop(i + r[0].offsetHeight - o.innerHeight()) : i < o.scrollTop() && o.scrollTop(i))
        }

        function k(n) {
            e += n, e < 0 ? e = f.size() - 1 : e >= f.size() && (e = 0)
        }

        function p(n) {
            return t.max && t.max < n ? t.max : n
        }

        function w() {
            var u, i, r, s;
            for (o.empty(), u = p(l.length), i = 0; i < u; i++) {
                if (!l[i])continue;
                if (r = t.formatItem(l[i].data, i + 1, u, l[i].value, v), r === !1)continue;
                s = n("<li/>").html(t.highlight(r, v)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(o)[0], n.data(s, "ac_data", l[i])
            }
            f = o.find("li"), t.selectFirst && (f.slice(0, 1).addClass(h.ACTIVE), e = 0), n.fn.bgiframe && o.bgiframe()
        }

        var h = {ACTIVE: "ac_over"}, f, e = -1, l, v = "", y = !0, s, o;
        return {
            display: function (n, t) {
                b(), l = n, v = t, w()
            }, next: function () {
                c(1)
            }, prev: function () {
                c(-1)
            }, pageUp: function () {
                e != 0 && e - 8 < 0 ? c(-e) : c(-8)
            }, pageDown: function () {
                e != f.size() - 1 && e + 8 > f.size() ? c(f.size() - 1 - e) : c(8)
            }, hide: function () {
                s && s.hide(), f && f.removeClass(h.ACTIVE), e = -1
            }, visible: function () {
                return s && s.is(":visible")
            }, current: function () {
                return this.visible() && (f.filter("." + h.ACTIVE)[0] || t.selectFirst && f[0])
            }, show: function () {
                var e = n(i).offset(), r, u;
                s.css({
                    width: typeof t.width == "string" || t.width > 0 ? t.width : n(i).width(),
                    top: e.top + i.offsetHeight,
                    left: e.left
                }).show(), t.scroll && (o.scrollTop(0), o.css({
                    maxHeight: t.scrollHeight,
                    overflow: "auto"
                }), n.browser.msie && typeof document.body.style.maxHeight == "undefined" && (r = 0, f.each(function () {
                    r += this.offsetHeight
                }), u = r > t.scrollHeight, o.css("height", u ? t.scrollHeight : r), u || f.width(o.width() - parseInt(f.css("padding-left")) - parseInt(f.css("padding-right")))))
            }, selected: function () {
                var t = f && f.filter("." + h.ACTIVE).removeClass(h.ACTIVE);
                return t && t.length && n.data(t[0], "ac_data")
            }, emptyList: function () {
                o && o.empty()
            }, unbind: function () {
                s && s.remove()
            }
        }
    }, n.fn.selection = function (n, t) {
        var i, r;
        if (n !== undefined)return this.each(function () {
            if (this.createTextRange) {
                var i = this.createTextRange();
                t === undefined || n == t ? (i.move("character", n), i.select()) : (i.collapse(!0), i.moveStart("character", n), i.moveEnd("character", t), i.select())
            } else this.setSelectionRange ? this.setSelectionRange(n, t) : this.selectionStart && (this.selectionStart = n, this.selectionEnd = t)
        });
        if (i = this[0], i.createTextRange) {
            var f = document.selection.createRange(), o = i.value, e = "<->", u = f.text.length;
            return f.text = e, r = i.value.indexOf(e), i.value = o, this.selection(r, r + u), {start: r, end: r + u}
        }
        if (i.selectionStart !== undefined)return {start: i.selectionStart, end: i.selectionEnd}
    }
}(jQuery);
var CurrentCurrencyFormat = !0, RemakeSearchInitialPosition = "", CurrencyPrefixed = !0, ShowRulerOptions = !1, CheckCookiesOnProcessOrder = !1;
InitVariables(), function (n) {
    function u(i, r) {
        var f;
        if (n.fn.ThreeDots.c_settings.allow_dangle == !0)return !1;
        var u = n(i).children("." + n.fn.ThreeDots.c_settings.e_span_class).get(0), e = n(u).css("display"), o = t(i, r);
        return n(u).css("display", "none"), f = t(i, r), n(u).css("display", e), o > f ? !0 : !1
    }

    function t(t, r) {
        var u = typeof r, f;
        return u == "object" || u == undefined ? n(t).height() / r.lh : u == "boolean" ? (f = i(n(t)), {lh: f}) : void 0
    }

    function f(t) {
        var e, f = n.fn.ThreeDots.c_settings.valid_delimiters;
        t = jQuery.trim(t);
        var i = -1, r = null, u = null;
        return jQuery.each(f, function (n, f) {
            if (new String(f).length != 1 || f == null)return !1;
            var e = t.lastIndexOf(f);
            e != -1 && e > i && (i = e, r = t.substring(i + 1), u = f)
        }), i > 0 ? {updated_string: jQuery.trim(t.substring(0, i)), word: r, del: u} : {
            updated_string: "",
            word: jQuery.trim(t),
            del: null
        }
    }

    function i(t) {
        n(t).append("<div id='temp_ellipsis_div' style='position:absolute; visibility:hidden'>H</div>");
        var i = n("#temp_ellipsis_div").height();
        return n("#temp_ellipsis_div").remove(), i
    }

    function r(i, r, u) {
        var s = n(r).text(), o = s, l = n.fn.ThreeDots.c_settings.max_rows, e, h, a, v, c, f;
        if (!(t(i, u) <= l))for (f = 0, curr_length = o.length, curr_middle = Math.floor((curr_length - f) / 2), e = s.substring(f, f + curr_middle), h = s.substring(f + curr_middle); curr_middle != 0;)n(r).text(e), t(i, u) <= l ? (c = Math.floor(h.length / 2), a = h.substring(0, c), f = e.length, o = e + a, curr_length = o.length, n(r).text(o)) : (o = e, curr_length = o.length), curr_middle = Math.floor((curr_length - f) / 2), e = s.substring(0, f + curr_middle), h = s.substring(f + curr_middle)
    }

    n.fn.ThreeDots = function (t) {
        var i = this;
        return (typeof t == "object" || t == undefined) && (n.fn.ThreeDots.the_selected = this, i = n.fn.ThreeDots.update(t)), i
    }, n.fn.ThreeDots.update = function (i) {
        var e, l = null, p, y, k, b, w, o, c, h, d, a, s, v;
        if (typeof i == "object" || i == undefined) {
            if ((n.fn.ThreeDots.c_settings = n.extend({}, n.fn.ThreeDots.settings, i), s = n.fn.ThreeDots.c_settings.max_rows, s < 1) || (v = !1, jQuery.each(n.fn.ThreeDots.c_settings.valid_delimiters, function (n, t) {
                    new String(t).length == 1 && (v = !0)
                }), v == !1))return n.fn.ThreeDots.the_selected;
            n.fn.ThreeDots.the_selected.each(function () {
                var i, v, p, y;
                if (e = n(this), n(e).children("." + n.fn.ThreeDots.c_settings.text_span_class).length == 0)return !0;
                if (o = n(e).children("." + n.fn.ThreeDots.c_settings.text_span_class).get(0), i = t(e, !0), v = n(o).text(), r(e, o, i), p = n(o).text(), h = n(o).text(), h.length <= 0 && (h = ""), t(e, i) > s) {
                    for (curr_ellipsis = n(e).append('<span style="white-space:nowrap" class="' + n.fn.ThreeDots.c_settings.e_span_class + '">' + n.fn.ThreeDots.c_settings.ellipsis_string + "</span>"); t(e, i) > s;)if (c = f(n(o).text()), n(o).text(c.updated_string), l = c.word, a = c.del, a == null)break;
                    if (l != null && (y = u(e, i), t(e, i) <= s - 1 || y || !n.fn.ThreeDots.c_settings.whole_word))if (h = n(o).text(), c.del != null && n(o).text(h + a), t(e, i) > s)n(o).text(h); else if (n(o).text(n(o).text() + l), t(e, i) > s + 1 || !n.fn.ThreeDots.c_settings.whole_word || p == l || y)while (t(e, i) > s)if (n(o).text().length > 0)n(o).text(n(o).text().substr(0, n(o).text().length - 1)); else break
                }
                v == n(n(e).children("." + n.fn.ThreeDots.c_settings.text_span_class).get(0)).text() ? n(e).children("." + n.fn.ThreeDots.c_settings.e_span_class).remove() : n(e).children("." + n.fn.ThreeDots.c_settings.e_span_class).length > 0 && (n.fn.ThreeDots.c_settings.alt_text_t && n(e).children("." + n.fn.ThreeDots.c_settings.text_span_class).attr("title", v), n.fn.ThreeDots.c_settings.alt_text_e && n(e).children("." + n.fn.ThreeDots.c_settings.e_span_class).attr("title", v))
            })
        }
        return n.fn.ThreeDots.the_selected
    }, n.fn.ThreeDots.settings = {
        valid_delimiters: [" ", ",", "."],
        ellipsis_string: "...",
        max_rows: 2,
        text_span_class: "ellipsis_text",
        e_span_class: "threedots_ellipsis",
        whole_word: !0,
        allow_dangle: !1,
        alt_text_e: !1,
        alt_text_t: !1
    }
}(jQuery);
var AirTripView = new function () {
    var n = 5, t = 1;
    this.LoadAirTrips = function () {
        for (var u = [], i, r, t = 1; t <= n; t++)r = window.document.getElementById("tabTrip" + t), r != null && r.style.display != "none" && window.document.getElementById("originTextF" + t) != null && (i = new AirTrip, i.Origin = $("#originTextF" + t).val(), i.Destination = $("#DestinationTextF" + t).val(), i.CabinType = $("#drpClassF" + t).val(), i.Hour = $("#hrInicioF" + t).val(), i.AirCompany = $("#drpCiaCodeF" + t).val(), window.document.getElementById("dtF" + t) != null && (i.Date = StringToDateValues($("#dtF" + t).val().toString())), u.push(i));
        return u
    }, this.RemoveAirTrips = function () {
        var h, o, a, l, c, e = new Date, u = 0, r = AirTripView.LoadAirTrips(), f = r.length - 1, s, i;
        if (r.length > 1)for (r.remove(f), document.getElementById("AirTripContainer").innerHTML = "", i = 1; i <= r.length; i++)u = i - 1, s = $(TrimPath.processDOMTemplate("templateAirTrip", {
            Indice: i,
            AirTrip: r[u]
        })), h = r[u].Origin, o = r[u].Destination, e = r[u].Date, a = r[u].AirCompany, l = r[u].CabinType, c = r[u].Hour, $("#AirTripContainer").append(s), $("#originTextF" + i).val(h), $("#DestinationTextF" + i).val(o), $("#originTextF" + i).focus().autocomplete(cities), $("#DestinationTextF" + i).focus().autocomplete(cities), $("#hrInicioF" + i).val(c), $("#drpCiaCodeF" + i).val(a), $("#drpClassF" + i).val(l), $("#dtF" + i).datepicker(Clone_Object(optionDatePicker)), e.isValid && $("#dtF" + i).val(FormatSimpleDateValues(e));
        r = AirTripView.LoadAirTrips(), f = r.length, f == n ? $("#add-trajeto").hide() : $("#add-trajeto").show(), f <= n && f > t ? $("#remove-trajeto").show() : $("#remove-trajeto").hide(), this.ClearTrips(f)
    }, this.AddAirTrips = function (i) {
        var u, f, r;
        i ? (u = $(TrimPath.processDOMTemplate("templateAirTrip", i)), $("#AirTripContainer").append(u)) : (f = AirTripView.LoadAirTrips(), r = f.length + 1, r == n && $("#add-trajeto").hide(), r <= n && r > t ? $("#remove-trajeto").show() : $("#remove-trajeto").hide(), AirTripView.AddAirTrips({Indice: r}), $("#originTextF" + r).focus().autocomplete(cities), $("#DestinationTextF" + r).focus().autocomplete(cities), $("#dtF" + r).datepicker(Clone_Object(optionDatePicker)), $("#imgData" + r).click(function () {
            $("#dtF" + r).datepicker("show")
        })), this.ClearTrips(r)
    }, this.ClearTrips = function (n) {
        n <= t ? ($("#remakeSearch_content").css("height", "535px"), $("#remakeSearch_content").css("*height", "545px")) : ($("#remakeSearch_content").css("height", "705px"), $("#remakeSearch_content").css("*height", "705px"))
    }
}, AirMotorUC = new function () {
    this.PesqIncAereo = undefined, this.airMotorAfiliado = !1, this.airMotorAfiliadoVarejo = !1, this.OnSearch = function () {
        var t = new SearchParameters("Air"), n;
        t.LoadParameters(), t.VerifySearchRules() && (n = rootPath + "selecionarvoo" + t.GetQueryString(), AirMotorUC.airMotorAfiliado ? AirMotorUC.CallBack != null ? AirMotorUC.CallBack(n) : AirMotorUC.CallBackRedirect != null ? window.open(decodeURIComponent(AirMotorUC.CallBackRedirect + n), "_blank") : window.open(n, "_blank") : window.location = n)
    }, this.CallBack = null, this.CallBackRedirect = null, this.IsRoundTrip = !0, this.MultiDestination = !0, this.Adults = 0, this.Children = 0, this.Baby = 0, this.Origin = "", this.Destination = "", this.CabinFilter = "", this.CabinQualifier = "", this.NonStop = !1, this.StartTimeOut = 0, this.EndTimeOut = 0, this.StartTimeIn = 0, this.EndTimeIn = 0, this.CiaCodeList = [], this.IsFlight = 0, this.Origins = [], this.Destinations = [], this.Dates = [], this.StartTime = [], this.EndTime = [], this.CabinType = [], this.CiaCode = [], this.svm_utm_source = "", this.svm_AffiliatedID = "", this.svm_utm_campaign = "", this.svm_s_cid = "", this.svm_utm_medium = "";
    var n = new Date;
    n.setDate(n.getDate() + 331), this.OptionDatePicker = {
        showAnim: "",
        numberOfMonths: 2,
        showButtonPanel: !0,
        dateFormat: "dd/mm/yy",
        minDate: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate()),
        maxDate: n,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        nextText: "Próximo",
        prevText: "Anterior",
        closeText: "Fechar",
        currentText: "Mês Atual",
        showCurrentAtPos: 0,
        ShowCurrentRule: function (n) {
            var r = (new Date).getMonth() + 1, i = (new Date).getFullYear();
            return n.any(r + "/" + i) ? !1 : !0
        }
    }, this.InputOriginDestination, this.ItemsForSearch = 5, this.ItemsStartedForSearch = 3, this.OnSearchLocationComplete = function () {
    }, this.Initialize = function () {
        var n, i, t;
        AirMotorUC.airMotorAfiliadoVarejo == !1 && ($("#txtDataIda").datepicker(Clone_Object(AirMotorUC.OptionDatePicker)), $("#txtDataVolta").datepicker(Clone_Object(AirMotorUC.OptionDatePicker))), $("#dtF1").datepicker(Clone_Object(AirMotorUC.OptionDatePicker)), $("#dtF2").datepicker(Clone_Object(AirMotorUC.OptionDatePicker)), $("#dtF3").datepicker(Clone_Object(AirMotorUC.OptionDatePicker)), $("#dtF4").datepicker(Clone_Object(AirMotorUC.OptionDatePicker)), $("#dtF5").datepicker(Clone_Object(AirMotorUC.OptionDatePicker)), AirMotorUC.airMotorAfiliadoVarejo == !1 && ($("#imgDataIda").click(function () {
            $("#txtDataIda").datepicker("show")
        }), $("#imgDataVolta").click(function () {
            $("#txtDataVolta").datepicker("show")
        })), $("#imgData1").click(function () {
            $("#dtF1").datepicker("show")
        }), $("#imgData2").click(function () {
            $("#dtF2").datepicker("show")
        }), $("#imgData3").click(function () {
            $("#dtF3").datepicker("show")
        }), $("#imgData4").click(function () {
            $("#dtF4").datepicker("show")
        }), $("#imgData5").click(function () {
            $("#dtF5").datepicker("show")
        }), AirMotorUC.PesqIncAereo == "GLOBAL" ? (n = {
            IsCity: !0,
            IsAirport: !0,
            HasIata: !0,
            HasHotelCode: !1,
            clientCache: Global.LocationsCache,
            controllers: {locationsController: Global.LocationsController}
        }, $("#txtDestino").focusin(function () {
            $(this).locationsFinder(n)
        }), $("#txtOrigem").focusin(function () {
            $(this).locationsFinder(n)
        }), this.InputOriginDestination = "txtDestino", $("#txtDestino").keyup(AirMotorUC.OnSearchLocationComplete), this.InputOriginDestination = "txtOrigem", $("#txtOrigem").keyup(AirMotorUC.OnSearchLocationComplete), $("#originTextF1").focus().locationsFinder(n), $("#DestinationTextF1").focus().locationsFinder(n), $("#originTextF2").focus().locationsFinder(n), $("#DestinationTextF2").focus().locationsFinder(n), $("#originTextF3").focus().locationsFinder(n), $("#DestinationTextF3").focus().locationsFinder(n), $("#originTextF4").focus().locationsFinder(n), $("#DestinationTextF4").focus().locationsFinder(n), $("#originTextF5").focus().locationsFinder(n), $("#DestinationTextF5").focus().locationsFinder(n)) : AirMotorUC.PesqIncAereo == "B2W" ? ($("#txtOrigem").autocomplete(cities), $("#txtDestino").autocomplete(cities), this.InputOriginDestination = "txtOrigem", $("#txtOrigem").keyup(AirMotorUC.OnSearchLocationComplete), this.InputOriginDestination = "txtDestino", $("#txtDestino").keyup(AirMotorUC.OnSearchLocationComplete), this.InputOriginDestination = "txtOrigem", $("#txtOrigem").keyup(AirMotorUC.OnSearchLocationComplete), $("#originTextF1").focus().autocomplete(cities), $("#DestinationTextF1").focus().autocomplete(cities), $("#originTextF2").focus().autocomplete(cities), $("#DestinationTextF2").focus().autocomplete(cities), $("#originTextF3").focus().autocomplete(cities), $("#DestinationTextF3").focus().autocomplete(cities), $("#originTextF4").focus().autocomplete(cities), $("#DestinationTextF4").focus().autocomplete(cities), $("#originTextF5").focus().autocomplete(cities), $("#DestinationTextF5").focus().autocomplete(cities)) : ($("#txtOrigem").pesqInc("Air"), $("#txtDestino").pesqInc("Air"), $("#originTextF1").pesqInc("Air"), $("#DestinationTextF1").pesqInc("Air"), $("#originTextF2").pesqInc("Air"), $("#DestinationTextF2").pesqInc("Air"), $("#originTextF3").pesqInc("Air"), $("#DestinationTextF3").pesqInc("Air"), $("#originTextF4").pesqInc("Air"), $("#DestinationTextF4").pesqInc("Air"), $("#originTextF5").pesqInc("Air"), $("#DestinationTextF5").pesqInc("Air")), $("#remakeSearch_btnSearch").click(function () {
            navigator.appName.indexOf("Internet Explorer") > 0 && AirMotorUC.airMotorAfiliado == !1 && ($("#txtOrigem").val().indexOf("Brasil") == -1 || $("#txtDestino").val().indexOf("Brasil") == -1) && openPopunder(), $("#hOrigem").val($("#txtOrigem").val()), $("#hDestino").val($("#txtDestino").val()), $("#hData").val($("#txtDataIda").val() + "|" + $("#txtDataVolta").val()), AirMotorUC.OnSearch()
        }), $("#remakeSearch_btnSearchMulti").click(function () {
            navigator.appName.indexOf("Internet Explorer") > 0 && AirMotorUC.airMotorAfiliado == !1 && ($("#txtOrigem").val().indexOf("Brasil") == -1 || $("#txtDestino").val().indexOf("Brasil") == -1) && openPopunder(), AirMotorUC.OnSearch()
        }), isB2B() || (i = window.location.toString(), t = i.split("?"), t.length == 1)
    }, this.LoadFields = function () {
        var i = "", f = "", e = "", o = "", s = Cookies.getCookie("SearchHistory"), t, n, r, u;
        if (s != "" ? (t = s.split("|"), i = t[0], f = t[1], e = t[2], o = t[3]) : i = GetOriginIATA(), i != "")for (n = 0; n < cities.length; n++)cities[n].indexOf("(" + i + ")") > -1 && ($("#txtOrigem").val(cities[n]), setCaretToPos($("#txtOrigem")[0], 0), $("#txtDestino").focus());
        if (f != "")for (n = 0; n < cities.length; n++)cities[n].indexOf("(" + f + ")") > -1 && ($("#txtDestino").val(cities[n]), setCaretToPos($("#txtDestino")[0], 0));
        e != "" && (r = DateValuesToDate(StringToDateValues(e)), r > new Date && ($("#txtDataIda").datepicker("setDate", r), o != "" && (u = DateValuesToDate(StringToDateValues(o)), u > new Date && $("#txtDataVolta").datepicker("setDate", u))))
    }, this.Show = function () {
        $("#remakeSearch").show(), $(".info_fechar").hide()
    }, this.SearchRules = function (n) {
        var t = [], s = new Date, h = s.getFullYear(), l = s.getMonth(), a = s.getDate(), c = $("#txtDataVolta").datepicker("option", "minDate"), v = $("#txtDataVolta").datepicker("option", "maxDate"), r, o, i, f, u, e;
        if ($("#chkSomenteIda").is(":checked") && ($("#lblDataVolta").css("visibility", "hidden"), $("#txtDataVolta").css("visibility", "hidden"), $("#spnDtRetorno").css("visibility", "hidden"), $("#imgDataVolta").css("visibility", "hidden"), $("#drpEndTime").css("visibility", "hidden"), $("#spnHorarioVolta").css("visibility", "hidden"), $("#tabMulti").css("display", "none"), $("#tabIdaVolta").css("display", "block"), $("#tabIdaVolta").css("float", "left"), $("#add-trajeto").css("display", "none"), $("#remove-trajeto").css("display", "none"), $("#remakeSearch_content").css("height", "255px"), $("#remakeSearch_content").css("*height", "255px")), $("#chkIdaVolta").is(":checked") && ($("#lblDataVolta").css("visibility", "visible"), $("#txtDataVolta").css("visibility", "visible"), $("#spnDtRetorno").css("visibility", "visible"), $("#imgDataVolta").css("visibility", "visible"), $("#drpEndTime").css("visibility", "visible"), $("#spnHorarioVolta").css("visibility", "visible"), $("#tabMulti").css("display", "none"), $("#tabIdaVolta").css("display", "block"), $("#tabIdaVolta").css("float", "left"), $("#add-trajeto").css("display", "none"), $("#remove-trajeto").css("display", "none"), $("#remakeSearch_content").css("height", "255px"), $("#remakeSearch_content").css("*height", "255px")), $("#chkMulti").is(":checked") && (r = null, $("#tabMulti").css("display") == "none" && (r = AirTripView.LoadAirTrips(), r == null || r.length == 0 ? (AirTripView.AddAirTrips(), AirTripView.AddAirTrips(), AirTripView.AddAirTrips()) : $("#remakeSearch_content").css("height", "705px").css("*height", "705px")), $("#tabMulti").css("display", "block"), $("#tabIdaVolta").css("display", "none"), r != null && (r.length == 1 ? ($("#add-trajeto").css("display", "block"), $("#remove-trajeto").css("display", "none")) : r.length == 5 ? ($("#add-trajeto").css("display", "none"), $("#remove-trajeto").css("display", "block"), $("#remakeSearch_content").css("height", "725px").css("*height", "725px")) : ($("#add-trajeto").css("display", "block"), r.length > 3 && $("#remove-trajeto").css("display", "block")))), o = AirMotorUC.ItemsForSearch, n == undefined || n == null)if ($("#chkMulti").is(":checked"))for (i = 1; i <= AirMotorUC.ItemsForSearch; i++)$("#originTextF" + i).val() == "" && $("#DestinationTextF" + i).val() == "" && $("#dtF" + i).val() == "" ? o-- : ($("#originTextF" + i).val() == "" && t.push("Trajeto " + i + ": Preencha o campo Origem e tente novamente."), $("#DestinationTextF" + i).val() == "" && t.push("Trajeto " + i + ": Preencha o campo Destino e tente novamente."), $("#originTextF" + i).val() == $("#DestinationTextF" + i).val() && t.push("Trajeto " + i + ": A Origem não pode ser igual ao Destino."), $("#dtF" + i).val() == "" && t.push("Trajeto " + i + ": Preencha a Data e tente novamente.")); else $("#txtOrigem").val() == "" && t.push("Preencha o campo Origem e tente novamente."), $("#txtDestino").val() == "" && t.push("Preencha o campo Destino e tente novamente."), $("#txtOrigem").val() == $("#txtDestino").val() && t.push("A Origem não pode ser igual ao Destino."), $("#txtDataIda").val() == "" && t.push("Preencha a Data de Ida e tente novamente."), $("#txtDataVolta").val() != "" || $("#chkSomenteIda").is(":checked") || t.push("Preencha a Data de Volta ou marque a opção Somente Ida para continuar.");
        if (o == 0 && t.push("Preencha os dados para efetuar a busca"), $("#chkSomenteIda").is(":checked") || ($("#lblDataVolta").css("visibility", "visible"), $("#txtDataVolta").css("visibility", "visible"), $("#spnDtRetorno").css("visibility", "visible"), $("#imgDataVolta").css("visibility", "visible"), $("#drpEndTime").css("visibility", "visible"), $("#spnHorarioVolta").css("visibility", "visible"), $("#txtDataIda").val() != "" && $("#txtDataVolta").val() != "" && AirMotorUC.airMotorAfiliadoVarejo == !1 && ($("#txtDataIda").datepicker("getDate") > $("#txtDataVolta").datepicker("getDate") && ($("#txtDataVolta").val($("#txtDataIda").val()), (n == undefined || n == null) && t.push("Preencha a Data de Ida maior que a Data de Volta.")), $("#txtDataIda").val() != "" && (f = $("#txtDataIda").datepicker("getDate"), f = new Date(f.getTime() + 8634e4), f <= new Date && (t.push("A data de ida não pode ser menor que a data atual."), $("#txtDataIda").datepicker("setDate", c))), $("#txtDataIda").val() != "" && ($("#txtDataIda").datepicker("getDate") > new Date(h + 1, l, a) || $("#txtDataVolta").datepicker("getDate") > new Date(h + 1, l, a - 5)) && (t.push("A pesquisa realizada deve ser inferior a 1 ano."), $("#txtDataIda").datepicker("setDate", c), $("#txtDataVolta").datepicker("setDate", v)))), parseInt($("#drpQtdADT").val()) + parseInt($("#drpQtdCHD").val()) + parseInt($("#drpQtdINF").val()) > 9 && (t.push("Algumas companhias aéreas não permitem a compra acima de 9 passagens em um mesmo pedido. Favor adquirir as passagens em dois pedidos diferentes ou entrar em contato com a Central de Vendas pelo telefone 4003-9888."), $("#drpQtdADT").val(1), $("#drpQtdCHD").val(0), $("#drpQtdINF").val(0)), $("#drpQtdADT").val() < $("#drpQtdINF").val() && (t.push("O número de adultos deve ser maior ou igual ao número de bebês."), $("#drpQtdINF").val($("#drpQtdADT").val())), t.length > 0) {
            for (u = "", e = 0; e < t.length; e++)u += t[e], u += "\n";
            return alert(u), !1
        }
        return !0
    }, this.ApplyInBoundCalendarMinDate = function (n, t) {
        n != undefined && n.toUpperCase().indexOf("DTF") >= 0 ? $("#dtF" + t).datepicker("option", "minDate", $("#" + n).datepicker("getDate")) : ($("#txtDataVolta").datepicker("option", "minDate", $("#txtDataIda").datepicker("getDate")), $("#chkIdaVolta").attr("checked") && setTimeout(function () {
            $("#txtDataVolta").focus()
        }, 100))
    }, this.Update = function () {
        $("#txtOrigem").autocomplete(cities), $("#txtDestino").autocomplete(cities)
    }, this.ShowMoreTrips = function () {
        for (var t = 0, n = 1; n <= AirMotorUC.ItemsForSearch; n++)if ($("#tabTrip" + n).css("display") == "none") {
            t = n;
            break
        }
        $("#titTrip" + t).css("display", "block"), $("#tabTrip" + t).css("display", "block"), AirMotorUC.ClearTrips(t)
    }, this.HideMoreTrips = function () {
        for (var t = 0, n = 5; n >= 0; n--)if ($("#tabTrip" + n).css("display") == "block") {
            t = n;
            break
        }
        $("#titTrip" + t).css("display", "none"), $("#tabTrip" + t).css("display", "none"), AirMotorUC.ClearTrips(t - 1)
    }, this.ShowStartedTrips = function () {
        for (var n = 1; n <= AirMotorUC.ItemsForSearch; n++)n < AirMotorUC.ItemsStartedForSearch ? ($("#titTrip" + n).css("display", "block"), $("#tabTrip" + n).css("display", "block")) : ($("#titTrip" + n).css("display", "none"), $("#tabTrip" + n).css("display", "none"));
        AirMotorUC.ClearTrips(AirMotorUC.ItemsStartedForSearch)
    }, this.ClearTrips = function (n) {
        n > AirMotorUC.ItemsStartedForSearch ? $("#remove-trajeto").css("display", "block") : $("#remove-trajeto").css("display", "none"), n == AirMotorUC.ItemsForSearch ? $("#add-trajeto").css("display", "none") : $("#add-trajeto").css("display", "block"), n <= AirMotorUC.ItemsStartedForSearch ? ($("#remakeSearch_content").css("height", "535px"), $("#remakeSearch_content").css("*height", "545px")) : ($("#remakeSearch_content").css("height", "775px"), $("#remakeSearch_content").css("*height", "775px"))
    }, this.ResetData = function () {
        AirMotorUC.IsRoundTrip = !0, AirMotorUC.MultiDestination = !0, AirMotorUC.Adults = 0, AirMotorUC.Children = 0, AirMotorUC.Baby = 0, AirMotorUC.Origin = "", AirMotorUC.Destination = "", AirMotorUC.CabinFilter = "", AirMotorUC.CabinQualifier = "", AirMotorUC.NonStop = !1, AirMotorUC.StartTimeOut = 0, AirMotorUC.EndTimeOut = 0, AirMotorUC.StartTimeIn = 0, AirMotorUC.EndTimeIn = 0, AirMotorUC.IsFlight = 0, AirMotorUC.CiaCodeList = [], AirMotorUC.Origins = [], AirMotorUC.Destinations = [], AirMotorUC.Dates = [], AirMotorUC.StartTime = [], AirMotorUC.EndTime = [], AirMotorUC.CabinType = [], AirMotorUC.CiaCode = []
    }, this.LoadData = function () {
        var h = AirMotorUC.ItemsForSearch, t, n, s, o, e, i;
        if (AirMotorUC.ResetData(), AirMotorUC.IsFlight = 1, $("#chkMulti").is(":checked"))for (AirMotorUC.IsRoundTrip = !1, AirMotorUC.MultiDestination = !0, t = [], n = 1; n <= AirMotorUC.ItemsForSearch; n++) {
            t = [];
            var f = $("#dtF" + n).val(), u = $("#DestinationTextF" + n).val(), r = $("#originTextF" + n).val();
            r || u || f ? (r && AirMotorUC.Origins.push(r), u && AirMotorUC.Destinations.push(u), f && AirMotorUC.Dates.push(StringToDateValues(f)), AirMotorUC.StartTime.push($("#hrInicioF" + n).val()), AirMotorUC.EndTime.push($("#hrInicioF" + n).val()), AirMotorUC.CabinType.push($("#drpClassF" + n).val()), $("#drpCiaCodeF" + n).val().indexOf(",") >= 0 ? t = $("#drpCiaCodeF" + n).val().split(",") : t.push($("#drpCiaCodeF" + n).val()), AirMotorUC.CiaCode.push(t), AirMotorUC.CiaCodeList.push(t)) : h--
        } else AirMotorUC.IsRoundTrip = !$("#chkSomenteIda").attr("checked"), AirMotorUC.MultiDestination = !1, AirMotorUC.Origin = $("#txtOrigem").val().replaceAll("(", "--").replaceAll(")", "---"), AirMotorUC.Destination = $("#txtDestino").val().replaceAll("(", "--").replaceAll(")", "---"), AirMotorUC.IsRoundTrip && (s = AirMotorUC.Origin + "|" + AirMotorUC.Destination, o = AirMotorUC.Destination + "|" + AirMotorUC.Origin, AirMotorUC.Origins = s.split("|"), AirMotorUC.Destinations = o.split("|")), e = $("#txtDataIda").val(), AirMotorUC.Dates.push(StringToDateValues(e)), i = $("#txtDataVolta").val(), i && AirMotorUC.Dates.push(StringToDateValues(i)), AirMotorUC.CabinFilter = $("#selCabin").val(), AirMotorUC.CabinFilter != "" && AirMotorUC.CabinFilter != null && (AirMotorUC.CabinQualifier = "RC"), AirMotorUC.NonStop = $("#chkSemParada").attr("checked"), AirMotorUC.StartTimeOut = $("#drpStartTime").val(), AirMotorUC.EndTimeOut = $("#drpStartTime").val(), AirMotorUC.StartTimeIn = $("#drpEndTime").val(), AirMotorUC.EndTimeIn = $("#drpEndTime").val();
        AirMotorUC.Adults = $("#drpQtdADT").val(), AirMotorUC.Children = $("#drpQtdCHD").val(), AirMotorUC.Baby = $("#drpQtdINF").val(), $("#drpCia").val().indexOf(",") >= 0 ? (AirMotorUC.CiaCodeList = $("#drpCia").val().split(","), AirMotorUC.CiaCode = $("#drpCia").val().split(",")) : (AirMotorUC.CiaCodeList.push($("#drpCia").val()), AirMotorUC.CiaCode.push($("#drpCia").val()))
    }, this.SetValues = function (n) {
        var t, i, r;
        if (n.MultiDestination) {
            for ($("#chkSomenteIda").attr("checked", !n.MultiDestination), $("#chkMulti").attr("checked", n.MultiDestination), $("#drpQtdADT").val(n.Adults), $("#drpQtdCHD").val(n.Children), $("#drpQtdINF").val(n.Baby), $("#chkSemParada").attr("checked", n.NonStop), t = 0; t < n.Origins.length; t++)i = t + 1, $("#dtF" + i).datepicker("setDate", DateValuesToDate(n.Dates[t])), $("#dtF" + i).val(FormatSimpleDateValues(n.Dates[t])), $("#DestinationTextF" + i).val(n.Destinations[t].toString()), $("#originTextF" + i).val(n.Origins[t].toString()), $("#hrInicioF" + i).val(n.StartTime[t].toString()), $("#drpCiaCodeF" + i).val(n.CiaCode[t][0].toString()), $("#tabTrip" + i).css("display", "block"), $("#titTrip" + i).css("display", "block");
            $("#tabTrip4").css("display") == "block" && ($("#remakeSearch_content").css("height", "775px"), $("#remakeSearch_content").css("*height", "775px"), $("#tabTrip5").css("display", "block"), $("#titTrip5").css("display", "block"))
        } else $("#chkSomenteIda").attr("checked", !n.IsRoundTrip), $("#txtOrigem").val(decodeURI(n.Origin).replace("--", "(").replace("---", ")")), $("#txtDestino").val(decodeURI(n.Destination).replace("--", "(").replace("---", ")")), n.Dates.length > 0 && n.Dates[0] != undefined && (r = new Date, DateValuesToDate(n.Dates[0]) < r ? ($("#txtDataIda").datepicker("setDate", FormatJavaScriptDateToSimpleDate(r)), $("#txtDataIda").val(FormatJavaScriptDateToSimpleDate(r))) : ($("#txtDataIda").datepicker("setDate", DateValuesToDate(n.Dates[0])), $("#txtDataIda").val(FormatSimpleDateValues(n.Dates[0])))), n.Dates.length > 1 && n.Dates[1] != undefined && ($("#txtDataVolta").datepicker("setDate", DateValuesToDate(n.Dates[1])), $("#txtDataVolta").val(FormatSimpleDateValues(n.Dates[1]))), $("#drpQtdADT").val(n.Adults), $("#drpQtdCHD").val(n.Children), $("#drpQtdINF").val(n.Baby), $("#chkSemParada").attr("checked", n.NonStop), $("#drpStartTime").val(n.StartTimeOut), $("#drpEndTime").val(n.StartTimeIn), $("#selCabin").val(n.CabinFilter), n.CiaCode.length > 0 && $("#drpCia").val(n.CiaCode);
        $("#NumberADTs").val(n.Adults), $("#NumberCHDs").val(n.Children), $("#NumberINFs").val(n.Baby)
    }
}, AirFilterUC = new function () {
    function i(n, t, i) {
        for (var r = 0; r < n.length; r++)t.any(n[r]) && !i.any(n[r]) && i.push(n[r])
    }

    function u(n) {
        for (var i = [], t = 0; t < n.FlightGroups.length; t++)fg = n.FlightGroups[t], i.any(fg.MajorityAirCompany) || i.push(fg.MajorityAirCompany);
        return i
    }

    function r(n, t) {
        for (var r = [], i = 0; i < n.FlightGroups.length; i++)fg = n.FlightGroups[i], r.any(fg[t]) || r.push(fg[t]);
        return r
    }

    this.HasFilter = !1, this.CiaCodes = [], this.AirportsOutBound = [], this.AirportsInbound = [], this.Stops = [], this.Cabins = [], this.MinPrice = 0, this.MaxPrice = 0, this.MinOutBoundTime, this.MaxOutBoundTime, this.MinInBoundTime, this.MaxInBoundTime, this.MinDuration = 0, this.MaxDuration = 0, this.RoundTripCiaCompany = !1, this.RoundTripAirport = !1, this.HasInBoundAirports = !1, this.Messages = "", this.OnFilterStarted = function () {
        $("#topOrderContainerPriceGroups").empty(), $("#bottomOrderContainerPriceGroups").empty(), AirFilterUC.OnDoFilterStarted(), AirFilterUC.OnDoFilter()
    }, this.OnDoFilter = function () {
    }, this.OnDoReset = function () {
    }, this.OnDoFilterStarted = function () {
    }, this.MultiDestination = !1, this.Clear = function () {
        $("#filtersContainer").empty()
    }, this.LoadFiltersData = function () {
        var n = {};
        return n.HasFilter = AirFilterUC.HasFilter, n.CiaCodes = AirFilterUC.CiaCodes, n.AirportsOutBound = AirFilterUC.AirportsOutBound, n.AirportsInbound = AirFilterUC.AirportsInbound, n.Stops = AirFilterUC.Stops, n.Cabins = AirFilterUC.Cabins, n.MinPrice = AirFilterUC.MinPrice, n.MaxPrice = AirFilterUC.MaxPrice, n.MinOutBoundTime = AirFilterUC.MinOutBoundTime, n.MaxOutBoundTime = AirFilterUC.MaxOutBoundTime, n.MinInBoundTime = AirFilterUC.MinInBoundTime, n.MaxInBoundTime = AirFilterUC.MaxInBoundTime, n.MinDuration = AirFilterUC.MinDuration, n.MaxDuration = AirFilterUC.MaxDuration, n.RoundTripCiaCompany = AirFilterUC.RoundTripCiaCompany, n.RoundTripAirport = AirFilterUC.RoundTripAirport, n.HasInBoundAirports = AirFilterUC.HasInBoundAirports, n.MultiDestination = AirFilterUC.MultiDestination, n
    }, this.Load = function () {
        var i, u, f, r, n, t;
        for (AirFilterUC.ClearAtualData(), this.MultiDestination = $("#chkMulti").is(":checked") ? !0 : !1, i = $("#sliderAirPrice"), AirFilterUC.MinPrice = i.slider("values", 0), isNaN(AirFilterUC.MinPrice) && (AirFilterUC.MinPrice = 0), AirFilterUC.MaxPrice = i.slider("values", 1), isNaN(AirFilterUC.MaxPrice) && (AirFilterUC.MaxPrice = 0), AirFilterUC.RoundTripCiaCompany = $("#chkFilterAirCompanyRoundTrip").is(":checked"), AirFilterUC.RoundTripAirport = $("#chkFilterAirportsRoundTrip").is(":checked"), u = $("#sliderDepartureTime"), AirFilterUC.MinOutBoundTime = u.slider("values", 0), isNaN(AirFilterUC.MinOutBoundTime) && (AirFilterUC.MinOutBoundTime = 0), AirFilterUC.MaxOutBoundTime = u.slider("values", 1), isNaN(AirFilterUC.MaxOutBoundTime) && (AirFilterUC.MaxOutBoundTime = 999999), f = $("#sliderArrivalTime"), AirFilterUC.MinInBoundTime = f.slider("values", 0), isNaN(AirFilterUC.MinInBoundTime) && (AirFilterUC.MinInBoundTime = 0), AirFilterUC.MaxInBoundTime = f.slider("values", 1), isNaN(AirFilterUC.MaxInBoundTime) && (AirFilterUC.MaxInBoundTime = 999999), r = $("#sliderDuration"), AirFilterUC.MinDuration = r.slider("values", 0), isNaN(AirFilterUC.MinDuration) && (AirFilterUC.MinDuration = 0), AirFilterUC.MaxDuration = r.slider("values", 1), isNaN(AirFilterUC.MaxDuration) && (AirFilterUC.MaxDuration = 999999), $(".chkFilterAirCompany:checked").each(function () {
            AirFilterUC.CiaCodes.push(this.value)
        }), AirFilterUC.CiaCodes.length == 0 && $(".chkFilterAirCompany").each(function () {
            AirFilterUC.CiaCodes.push(this.value)
        }), $(".chkFilterAirportsOutBound:checked").each(function () {
            AirFilterUC.AirportsOutBound.push(this.value)
        }), AirFilterUC.AirportsOutBound.length == 0 && $(".chkFilterAirportsOutBound").each(function () {
            AirFilterUC.AirportsOutBound.push(this.value)
        }), n = $(".chkFilterAirportsInbound"), AirFilterUC.HasInBoundAirports = n.length > 0, t = 0; t < n.length; t++)ctrl = n[t], $(ctrl).is(":checked") && AirFilterUC.AirportsInbound.push(ctrl.value);
        AirFilterUC.AirportsInbound.length == 0 && n.length > 0 && $(".chkFilterAirportsInbound").each(function () {
            AirFilterUC.AirportsInbound.push(this.value)
        }), $(".chkFilterStops:checked").each(function () {
            AirFilterUC.Stops.push(this.value)
        }), AirFilterUC.Stops.length == 0 && $(".chkFilterStops").each(function () {
            AirFilterUC.Stops.push(this.value)
        }), $(".chkFilterCabinType:checked").each(function () {
            this.value == 2 || this.value == 3 || this.value == 4 ? (AirFilterUC.Cabins.push(2), AirFilterUC.Cabins.push(3), AirFilterUC.Cabins.push(4)) : this.value != 3 && this.value != 4 && AirFilterUC.Cabins.push(this.value)
        }), AirFilterUC.Cabins.length == 0 && $(".chkFilterCabinType").each(function () {
            this.value == 2 || this.value == 3 || this.value == 4 ? (AirFilterUC.Cabins.push(2), AirFilterUC.Cabins.push(3), AirFilterUC.Cabins.push(4)) : this.value != 3 && this.value != 4 && AirFilterUC.Cabins.push(this.value)
        })
    }, this.ClearAtualData = function () {
        AirFilterUC.CiaCodes = [], AirFilterUC.AirportsOutBound = [], AirFilterUC.AirportsInbound = [], AirFilterUC.Stops = [], AirFilterUC.Cabins = []
    }, this.ValidTime = function (n, t) {
        return getNumericTime(n.FirstDepartureTimeValues) <= AirFilterUC.MaxOutBoundTime && getNumericTime(n.FirstDepartureTimeValues) >= AirFilterUC.MinOutBoundTime && !t || getNumericTime(n.FirstDepartureTimeValues) <= AirFilterUC.MaxInBoundTime && getNumericTime(n.FirstDepartureTimeValues) >= AirFilterUC.MinInBoundTime && t
    }, this.ValidAirports = function (n, t) {
        return AirFilterUC.AirportsInbound.length > 0 ? AirFilterUC.AirportsInbound.any(n.Origin) && t || AirFilterUC.AirportsOutBound.any(n.Origin) && AirFilterUC.AirportsInbound.any(n.Destination) && !t : AirFilterUC.AirportsInbound.any(n.Origin) && t || AirFilterUC.AirportsOutBound.any(n.Origin) && !t
    }, this.ValidAirCompanies = function (n, t) {
        return AirFilterUC.CiaCodes.any(t != undefined && t ? "Combo" : n.MajorityAirCompany)
    }, this.ValidDuration = function (n) {
        return (AirFilterUC.MinDuration <= n.TotalMinuteDuration || n.TotalMinuteDuration == 0) && (AirFilterUC.MaxDuration >= n.TotalMinuteDuration || n.TotalMinuteDuration == 0)
    }, this.ValidStops = function (n, t, i) {
        for (var t, f = !1, o = n.NumberOfStops, e = !0, r, u = 0; u < t.OriginalFlightGroups.length; u++)if (AirFilterUC.Stops.any(t.OriginalFlightGroups.NumberOfStops)) {
            f = !0;
            break
        }
        for (r = 0; r < i.OriginalCityPairs.length; r++)if (AirFilterUC.Stops.any(i.OriginalCityPairs[r].OriginalFlightGroups.NumberOfStops)) {
            e = !1;
            break
        }
        return AirFilterUC.Stops.any(o) || !f && !e
    }, this.ValidCabins = function (n) {
        return isB2B() ? !0 : AirFilterUC.Cabins.any(n.CabinType)
    }, this.FilterRoundTripSameAirCompany = function (n) {
        var e = [], s = u(n.CityPairs[0]), o = u(n.CityPairs[1]), t, f, r;
        for (i(o, s, e), i(s, o, e), t = 0; t < n.CityPairs.length; t++) {
            for (f = [], r = 0; r < n.CityPairs[t].FlightGroups.length; r++)fg = n.CityPairs[t].FlightGroups[r], e.any(fg.MajorityAirCompany) && f.push(fg);
            n.CityPairs[t].FlightGroups = f
        }
    }, this.FilterRoundTripSameAirports = function (n) {
        var e = [], s = r(n.CityPairs[0], "Origin"), o = r(n.CityPairs[1], "Destination"), t, f, u;
        for (i(s, o, e), t = 0; t < n.CityPairs.length; t++) {
            for (f = [], u = 0; u < n.CityPairs[t].FlightGroups.length; u++)fg = n.CityPairs[t].FlightGroups[u], (t == 0 && e.any(fg.Origin) || t == 1 && e.any(fg.Destination)) && f.push(fg);
            n.CityPairs[t].FlightGroups = f
        }
    }, this.ValidFilter = function () {
        var t, n;
        if (!AirFilterUC.HasFilter)return !1;
        if (t = [], t.length > 0) {
            for (AirFilterUC.Messages = "", n = 0; n < t.length; n++)AirFilterUC.Messages += t[n], AirFilterUC.Messages += "\n";
            return !1
        }
        return !0
    }, this.Reset = function () {
        AirFilterUC.OnDoReset()
    }, this.ShowClearLink = function () {
        $(".LimparFiltro").show()
    }, this.HideClearLink = function () {
        $(".LimparFiltro").hide()
    };
    var t = undefined, n = [];
    this.Render = function (i, r) {
        var y, ut, l, ot, c, tt, o, g;
        if (i.AirFiltersData) {
            if (t || (t = TrimPath.parseTemplate(GetHTML("templateAirFilters"))), n.length == 0 && (n = $("#filtersContainer")), n.html(t.process(i)), y = $("#divSliderPrice"), ut = $("#sliderAirPrice"), isAirHotel() && $(".filter_slider_control").addClass("filter_slider_control_padding"), i.AirFiltersData.MinPrice != i.AirFiltersData.MaxPrice) {
                y.show();
                var p = r ? r.MinPrice : i.AirFiltersData.MinPrice, v = r ? r.MaxPrice : i.AirFiltersData.MaxPrice, f = $("#spnAirMinPrice"), u = $("#spnAirMaxPrice");
                isB2B() ? (f.text(FormatDecimalPointsB2B(p)), u.text(FormatDecimalPointsB2B(v))) : (f.text(FormatPriceSlider(p)), u.text(FormatPriceSlider(v))), ut.slider({
                    range: !0,
                    min: parseFloat(i.AirFiltersData.MinPrice.toFixed(2)),
                    max: parseFloat(i.AirFiltersData.MaxPrice.toFixed(2)),
                    step: .01,
                    values: [p, v],
                    slide: function (n, t) {
                        isB2B() ? (f.text(FormatDecimalPointsB2B(t.values[0])), u.text(FormatDecimalPointsB2B(t.values[1]))) : (f.text(FormatPriceSlider(t.values[0])), u.text(FormatPriceSlider(t.values[1])))
                    },
                    stop: AirFilterUC.OnFilterStarted
                })
            } else $("h1.sliderPrice").hide(), y.hide();
            var ft = !1, it = !1, a = getNumericTime(i.AirFiltersData.MinDepartureTime), e = getNumericTime(i.AirFiltersData.MaxDepartureTime), rt = r ? r.MinOutBoundTime : a, et = r ? r.MaxOutBoundTime : e, ht = $("#spnMinDepartureTime"), ct = $("#spnMaxDepartureTime");
            if (ht.text(FormatTimeSlider(rt)), ct.text(FormatTimeSlider(et)), l = $(".SliderIda"), ot = $("#sliderDepartureTime"), a != e ? (ft = !0, l.show(), ot.slider({
                    range: !0,
                    min: a,
                    max: e,
                    values: [rt, et],
                    slide: function (n, t) {
                        ht.text(FormatTimeSlider(t.values[0])), ct.text(FormatTimeSlider(t.values[1]))
                    },
                    stop: AirFilterUC.OnFilterStarted
                })) : l.hide(), i.AirFiltersData.RoundTrip) {
                var s = getNumericTime(i.AirFiltersData.MinArrivalTime), h = getNumericTime(i.AirFiltersData.MaxArrivalTime), st = r ? r.MinInBoundTime : s, w = r ? r.MaxInBoundTime : h, b = $("#spnMinArrivalTime"), nt = $("#spnMaxArrivalTime");
                b.text(FormatTimeSlider(st)), nt.text(FormatTimeSlider(w)), c = $(".SliderVolta"), tt = $("#sliderArrivalTime"), s != h ? (it = !0, c.show(), tt.slider({
                    range: !0,
                    min: s,
                    max: h,
                    values: [st, w],
                    slide: function (n, t) {
                        b.text(FormatTimeSlider(t.values[0])), nt.text(FormatTimeSlider(t.values[1]))
                    },
                    stop: AirFilterUC.OnFilterStarted
                })) : c.hide(), $("#divInOutSameCia").css("display", ""), $("#h2AirportsInBound").css("display", ""), $("#divAirportsInBound").css("display", ""), $("#divInOutSameAirport").css("display", "")
            } else $("#divSliderVolta").css("display", "none"), $("#divInOutSameCia").css("display", "none"), $("#h2AirportsInBound").css("display", "none"), $("#divAirportsInBound").css("display", "none"), $("#divInOutSameAirport").css("display", "none"), $("#h2InBoundSlider").css("display", "none");
            if (ft || it || $(".HorarioSaida").hide(), o = $(".sliderDuration1"), g = $("#sliderDuration"), i.AirFiltersData.MinDuration != i.AirFiltersData.MaxDuration) {
                o.show();
                var d = $("#spnMinDuration", n), k = $("#spnMaxDuration", n), at = r ? r.MinDuration : i.AirFiltersData.MinDuration - 1, lt = r ? r.MaxDuration : i.AirFiltersData.MaxDuration + 1;
                d.text(formatMinutesInHourMinute(i.AirFiltersData.MinDuration)), k.text(formatMinutesInHourMinute(i.AirFiltersData.MaxDuration)), g.slider({
                    range: !0,
                    min: i.AirFiltersData.MinDuration - 1,
                    max: i.AirFiltersData.MaxDuration + 1,
                    values: [at, lt],
                    slide: function (n, t) {
                        d.text(formatMinutesInHourMinute(t.values[0])), k.text(formatMinutesInHourMinute(t.values[1]))
                    },
                    stop: AirFilterUC.OnFilterStarted
                })
            } else o.hide();
            r && ($(".chkFilterAirCompany").each(function () {
                var t = $(this).val(), n = r.CiaCodes.any(function (n) {
                    return n == t
                });
                $(this).attr("checked", n)
            }), $(".chkFilterStops").each(function () {
                var t = $(this).val(), n = r.Stops.any(function (n) {
                    return n == t
                });
                $(this).attr("checked", n)
            }), $(".chkFilterCabinType").each(function () {
                var t = $(this).val(), n = r.Cabins.any(function (n) {
                    return n == t
                });
                $(this).attr("checked", n)
            }), $(".chkFilterAirportsOutBound").each(function () {
                var t = $(this).val(), n = r.AirportsOutBound.any(function (n) {
                    return n == t
                });
                $(this).attr("checked", n)
            }), $(".chkFilterAirportsInbound").each(function () {
                var t = $(this).val(), n = r.AirportsInbound.any(function (n) {
                    return n == t
                });
                $(this).attr("checked", n)
            }), $(".chkFilterAirportsRoundTrip").attr("checked", r.RoundTripAirport), $(".chkFilterAirCompanyRoundTrip").attr("checked", r.RoundTripCiaCompany)), $(".filterControl").click(function () {
                isAirHotel() || (view.ProgressShowModal(), view.ProgressShowBestPrices(), $("#topOrderContainerPriceGroups").empty(), $("#bottomOrderContainerPriceGroups").empty()), AirFilterUC.OnFilterStarted()
            })
        }
    }
}, PriceGroupsUC = new function () {
    function c() {
        o.length == 0 && (o = $("#priceGroupsContainer"))
    }

    function l(n) {
        if (n) {
            u.length == 0 && (u = $("a.pagerIndex"));
            var t = u.index($("a.pagerIndexSelected"));
            u.eq(t + n).trigger("click")
        }
    }

    var f, o, s;
    this.IsPackage = !1, this.IsUpdateValues = !1, f = [], this.GetFlightGroup = function () {
    }, this.ValidateCountryVisa = function () {
    }, this.ShowInfoDelayView = function () {
    }, this.CurrentPriceGroupQuantity = 0, this.CurrentLimitPriceGroup = PAGING_RESULT, this.PreviousLimitPriceGroup = 0, this.IsShowMore = !1, this.OnBuy = function () {
    }, this.Clear = function () {
        c(), o.empty()
    }, o = [];
    var t = {
        PriceGroup: undefined,
        Hash: undefined,
        IndicePriceGroup: undefined
    }, e = undefined, h = undefined, a = 0, v = 0;
    this.ArrayVoo = [];
    var u = [], r = [], n = {};
    n.PagerOptions = [], this.Render = function (n) {
        var s, l, r, u, i;
        if (n.length > 0 && (PriceGroupsUC.ArrayVoo = n, this.RenderPagingResultComponent(parseInt($("a.pagerIndexSelected").eq(0).text()), PAGING_RESULT)), h || (h = TrimPath.parseTemplate(GetHTML("templatePriceGroups"))), c(), PriceGroupsUC.IsUpdateValues)for (i = 0; i < n.length && i <= PriceGroupsUC.CurrentLimitPriceGroup; i++)isB2B() ? $("#priceGroup_priceBox-" + i).text("Pontos " + FormatDecimalPointsB2B(n[i].Price)) : $("#priceGroup_priceBox-" + i).text("R$ " + n[i].Price.FormatCurrency()); else {
            for (s = 0, this.IsShowMore ? (s = this.PreviousLimitPriceGroup + 1, this.IsShowMore = !1) : o.empty(), i = s; i < n.length && i <= PriceGroupsUC.CurrentLimitPriceGroup; i++)t.PriceGroup = n[i], t.Hash = n[i].GroupingKey, t.IndicePriceGroup = n[i].InterfaceIndex, n[i].OriginalValues != undefined ? (t.OriginalPromoPrice = n[i].OriginalValues.OriginalPromoPrice, t.isPackage = n[i].OriginalValues.isPackage) : (t.OriginalPromoPrice = n[i].PromoOriginalPrice, t.isPackage = !1), t.PriceGroup.CityPairs.length > 0 && o.append(h.process(t));
            $("img.img-cias, img.icon-cia").unbind("error"), $("img.img-cias, img.icon-cia").error(function () {
                imgError($(this))
            }), (CurrentPointOfSale == "BRADESCO" || CurrentPointOfSale == "AMEX") && (l = getParamQueryString("showDebugAH"), (AffiliatedId != null && AffiliatedId != "undefined" && AffiliatedId != 0 || l == "true") && ($(".pessoaClickIcon").show("slow"), $(".pessoaClickIcon").unbind().dblclick(function () {
                var r = $(this), u = r.attr("groupingKey"), n = controller.GetPriceGroup(u), o = {
                    SourceType: n.CityPairs[0].FlightGroups[0].SourceType,
                    FareOptionGo: n.CityPairs[0].FlightGroups[0].FareOption,
                    ExtensionGo: n.CityPairs[0].FlightGroups[0].B2BExtension,
                    FareOptionBack: n.CityPairs.length > 1 ? n.CityPairs[1].FlightGroups[0].FareOption : null,
                    ExtensionBack: n.CityPairs.length > 1 ? n.CityPairs[1].FlightGroups[0].B2BExtension : null
                }, i, t;
                e || (e = TrimPath.parseTemplate(GetHTML("templateInformation"))), i = e.process(o), f.length == 0 && (f = $("#conteudo-debug")), t = f.html(i), t.modal && t.modal()
            }), $(".pessoaClick").unbind().dblclick(function () {
                var i = $(this), u = i.attr("groupingKey"), n = controller.GetPriceGroup(u), r = {
                    SourceType: n.CityPairs[0].FlightGroups[0].SourceType,
                    FareOptionGo: n.CityPairs[0].FlightGroups[0].FareOption,
                    ExtensionGo: n.CityPairs[0].FlightGroups[0].B2BExtension,
                    FareOptionBack: n.CityPairs.length > 1 ? n.CityPairs[1].FlightGroups[0].FareOption : null,
                    ExtensionBack: n.CityPairs.length > 1 ? n.CityPairs[1].FlightGroups[0].B2BExtension : null
                }, t;
                e || (e = TrimPath.parseTemplate(GetHTML("templateInformation"))), t = e.process(r), f.length == 0 && (f = $("#conteudo-debug")), f.html(t).modal()
            }))), this.CloseDebugger = function () {
                $.modal.close()
            }, $("td.priceGroup_FlightLine").unbind("click").click(function () {
                $(this).parent().find("input.rdoFlight").trigger("click").trigger("change")
            }), PriceGroupsUC.IsPackage || (r = $("#toolTip_ico_seta").html(), $(".ico_seta_data_esq").tooltip({
                bodyHandler: function () {
                    return r
                }, delay: 0, fade: 250, showURL: !1
            }), $(".ico_seta_data_dir").tooltip({
                bodyHandler: function () {
                    return r
                }, delay: 0, fade: 250, showURL: !1
            })), $("span.linkIATA").tooltip({
                bodyHandler: function () {
                    return $(this).siblings(".toolTipTemplate").html()
                }, delay: 0, fade: 250, showURL: !1
            }), $("div.ico_madrugada").tooltip({
                bodyHandler: function () {
                    return $(this).siblings(".toolTipTemplate").html()
                }, delay: 0, fade: 250, showURL: !1
            }), $("div.ico_terrestre").tooltip({
                bodyHandler: function () {
                    return $(this).siblings(".toolTipTemplateTerrestre").html()
                }, delay: 0, fade: 250, showURL: !1
            }), u = $("#divVejaMais"), PriceGroupsUC.CurrentLimitPriceGroup >= n.length ? u.hide() : u.show(), PriceGroupsUC.IsPackage && ($("#topOrderContainerPriceGroups").hide(), $("#bottomOrderContainerPriceGroups").hide())
        }
    }, this.ShowMore = function () {
        $("div[id^=tdGroup]").each(function () {
            lastPriceGroup = $(this)[0].id
        }), PriceGroupsUC.PreviousLimitPriceGroup = PriceGroupsUC.CurrentLimitPriceGroup, PriceGroupsUC.CurrentLimitPriceGroup += PriceGroupsUC.CurrentLimitPriceGroup > QuantityToShowMore ? OtherShowMore : FirstShowMore, this.IsShowMore = !0, AirFilterUC.OnDoFilter(lastPriceGroup)
    }, s = undefined, this.ShowInfoDelay = function (n, t) {
        var u = undefined, r = undefined, o = undefined, e = {SearchInfos: []}, f, i;
        if (isAirHotel()) {
            for (r = PriceGroupsUC.GetFlightGroup(n, t), i = 0; i < r.Flights.length; i++)e.SearchInfos.push({
                FlightNumber: r.Flights[i].FlightNumber,
                CompanyCode: r.Flights[i].OperatedBy,
                Origin: r.Flights[i].Origin,
                Destination: r.Flights[i].Destination,
                Leg: r.Flights[i].Legs
            });
            PriceGroupsUC.ShowInfoDelayView(e)
        } else {
            if (u = controller.GetPriceGroup(n), u.CityPairs)for (iCityPair = 0; iCityPair < u.CityPairs.length; iCityPair++)for (f = 0; f < u.CityPairs[iCityPair].FlightGroups.length; f++)if (flightGroup = u.CityPairs[iCityPair].FlightGroups[f], flightGroup.Hash == t) {
                r = flightGroup;
                break
            }
            for (i = 0; i < r.Flights.length; i++)e.SearchInfos.push({
                FlightNumber: r.Flights[i].FlightNumber,
                CompanyCode: r.Flights[i].OperatedBy,
                Origin: r.Flights[i].Origin,
                Destination: r.Flights[i].Destination,
                Leg: r.Flights[i].Legs
            });
            controller.ShowInfoDelay(e)
        }
    }, this.RenderPopUpInfo = function (n) {
        s || (s = TrimPath.parseTemplate(GetHTML("templateFlightInfo"))), CreateHintBoxy($(s.process(n)), null, !0, "fixed"), $(".btnIATA").tooltip({
            bodyHandler: function () {
                return $(this).siblings(".toolTipTemplate").html()
            }, delay: 0, fade: 250, showURL: !1
        }), $(".showEasterEgg").mouseover(function () {
            $(".easter-egg").toggle()
        })
    }, this.ShowInfo = function (n, t) {
        var u = undefined, r = undefined, e, o, f;
        if (isAirHotel())r = PriceGroupsUC.GetFlightGroup(n, t); else if (u = controller.GetPriceGroup(n), u.CityPairs)for (iCityPair = 0; iCityPair < u.CityPairs.length; iCityPair++)for (e = 0; e < u.CityPairs[iCityPair].FlightGroups.length; e++)if (flightGroup = u.CityPairs[iCityPair].FlightGroups[e], flightGroup.Hash == t) {
            r = flightGroup;
            break
        }
        if (r != null && r != undefined)if (o = null, f = [], r.HashPriceGroup = n, isB2B())this.RenderPopUpInfo(r); else if (r.Flights.length > 1) {
            for (i = 0; i < r.Flights.length; i++)r.Destination != r.Flights[i].Destination && f.push(r.Flights[i].Destination);
            isAirHotel() ? PriceGroupsUC.ValidateCountryVisa({
                conexaoIATA: f,
                destinoIATA: r.Destination
            }, r) : controller.ValidateCountryVisa({conexaoIATA: f, destinoIATA: r.Destination}, r)
        } else this.RenderPopUpInfo(r);
        $("img.img-cias, img.icon-cia").unbind("error"), $("img.img-cias, img.icon-cia").error(function () {
            imgError($(this))
        })
    }, this.ShowAvisoHorarioResgate = function () {
        return CurrentPointOfSale == "BRADESCO" && (setTimeout('CreateHintBoxy($("#divAvisoHorarioFechamento"), null, true, "absolute");$("#divAvisoHorarioFechamento").css("opacity", "1");', 1e3), window.scrollTo(0, 0)), !1
    }, this.Buy = function (n, t, i) {
        if (CurrentPointOfSale.toUpperCase() == "BRADESCO") {
            var u = new Date, f = u.getHours(), r = !1;
            if ($.ajax({
                    type: "POST", url: rootPath + "IsCheckoutAvailable", success: function (n) {
                        r = n.Result
                    }, dataType: "json", async: !1
                }), !r) {
                this.ShowAvisoHorarioResgate();
                return
            }
            PriceGroupsUC.OnBuy(n, t, i)
        } else PriceGroupsUC.OnBuy(n, t, i)
    }, this.SelectFlightGroup = function (n, t, i, r) {
        $(n).attr("checked", "checked"), this.iType = t, $(".rdoFlight" + t + ":checked").each(function () {
            var u = $(this), n;
            for (u.attr("checked", ""), u.parent().parent().removeClass("priceGroup_selectedFlight"), n = 0; n < r; n++)n != t && $(".rdoFlight" + n + ":checked").each(function () {
                this.attributes.IndicePriceGroup.value != i && (this.checked = !1, $(this).parent().parent().removeClass("priceGroup_selectedFlight"))
            })
        }), n.checked = !0, $(n).parent().parent().addClass("priceGroup_selectedFlight")
    }, this.ChangeBackgroundColor = function (n, t) {
        if ($(".flightGroup-pacote").removeClass("flightGroup-pacote"), t != null && t != undefined)for (var i = 0, r = t.length; i < r; i++)$("#" + n + "-" + t[i]).addClass("flightGroup-pacote")
    }, this.IsCiaVal = function (n, t, i, r) {
        return t > 1 && t <= n && i != r
    }, this.IsOnlyOneCia = function (n) {
        var t = n[0].CiaCode;
        return !n.any(function (n) {
            return n.CiaCode != t
        })
    }, this.RenderPagingResultComponent = function (t, i) {
        var f = PriceGroupsUC.CurrentPriceGroupQuantity, r, u;
        if (isNaN(t) && (t = 1), r = Math.ceil(f / i), r < t && (t = r), n.PagerOptions = [], n.NumberOfItens = PriceGroupsUC.ArrayVoo.length, r > 4) {
            for ((t == 2 || t == 3) && n.PagerOptions.push({
                Number: 1,
                Selected: ""
            }), t == r && n.PagerOptions.push({
                Number: r - 2,
                Selected: ""
            }), n.ShowLeftPagerArrow = t > 3, u = t > 2 ? t - 1 : t; u < Math.min(r, t + (t == 1 ? 3 : 2)); u++)n.PagerOptions.push({
                Number: u,
                Selected: u == t ? "pagerIndexSelected" : ""
            });
            t + 2 >= r ? (n.PagerOptions.push({
                Number: r,
                Selected: r == t ? "pagerIndexSelected" : ""
            }), n.ShowRightPagerArrow = !1) : n.ShowRightPagerArrow = r != t
        } else for (n.ShowLeftPagerArrow = !1, n.ShowRightPagerArrow = !1, u = 1; u <= r; u++)n.PagerOptions.push({
            Number: u,
            Selected: u == t ? "pagerIndexSelected" : ""
        });
        n.LastPagerOption = r, n.RangeToShow = [t * i - i, t * i], this.UpdatePagingResult()
    }, this.UpdatePagingResult = function () {
        var f, t, i;
        if (PriceGroupsUC.ArrayVoo.length > 0) {
            for (f = TrimPath.processDOMTemplate("templatePagingResultData", n), r.length == 0 && (r.push($("#topOrderContainerPriceGroups")), r.push($("#bottomOrderContainerPriceGroups"))), t = 0, i = r.length; t < i; t++)r[t].html(f).show();
            u = $("a.pagerIndex"), u.unbind().click(function () {
                view.ProgressShowBestPrices();
                var n = $(this);
                n.hasClass("pagerIndexSelected") ? view.ProgressHideBestPrices() : (u.removeClass("pagerIndexSelected"), n.addClass("pagerIndexSelected"), PriceGroupsUC.UpdatePager())
            }), $("div.left-pager-arrow").unbind().click(function () {
                l(-1)
            }), $("div.right-pager-arrow").unbind().click(function () {
                l(1)
            })
        }
    }, this.RefreshSearch = function () {
        this.Async(this.Render, null)
    }, this.Async = function (n, t) {
        setTimeout(function () {
            n(), t && t()
        }, 0)
    }, this.UpdatePager = function () {
        PriceGroupsUC.RenderPagingResultComponent(parseInt($("a.pagerIndexSelected").eq(0).text()), PAGING_RESULT), view.RemakeSearchPagingResult(parseInt($("a.pagerIndexSelected").eq(0).text()), PAGING_RESULT, AirFilterUC.LoadFiltersData()), r.length == 0 && (r.push($("#topOrderContainerPriceGroups")), r.push($("#bottomOrderContainerPriceGroups")))
    }
}