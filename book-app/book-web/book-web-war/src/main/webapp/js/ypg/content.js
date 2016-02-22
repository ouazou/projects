var jYP = {
    author: "Mickael Dubois",
    addEventListener: function (o, typeEvent, callback) {
        if (o.addEventListener) {
            o.addEventListener(typeEvent, callback, false);
        }
        else if (o.attachEvent) {
            o.attachEvent("on" + typeEvent, callback);
        }
    }
};

(function () {
    var f = function () {
        if (typeof jYP === "undefined") {
            console.log("The namespace jYP was deleted.");
            return false;
        }
        else if (typeof jYP.author === "undefined" || jYP.author !== "Mickael Dubois") {
            console.log("The namespace jYP was altered.");
            return false;
        }

        return true;
    };

    if (window.addEventListener) { // non-IE browser
        window.addEventListener("load", f, false);
    }
    else if (window.attachEvent) { // IE browser
        window.attachEvent("onload", f);
    }

    if (!f())
        return;

    // extends jYP

    jYP.content = {
        author: "Mickael Dubois"
    };

})(); // run the anonymous function

(function () {
    var f = function () {
        if (typeof jYP === "undefined") {
            console.log("The namespace jYP was deleted.");
            return false;
        }
        else if (typeof jYP.author === "undefined" || jYP.author !== "Mickael Dubois") {
            console.log("The namespace jYP was altered.");
            return false;
        }
        else if (typeof jYP.content === "undefined") {
            console.log("The namespace jYP.content was deleted.");
            return false;
        }

        return true;
    };

    if (window.addEventListener) { // non-IE browser
        window.addEventListener("load", f, false);
    }
    else if (window.attachEvent) { // IE browser
        window.attachEvent("onload", f);
    }
    if (!f())
        return;


    // extends jYP.content
    jYP.content.DateTimeLocal = function (date) {
        this.date = "";
        this.$$createOnToJSONIfNull = false;
        if (date) {
            this.date = moment(date).format("YYYY-MM-DDTHH:mm");
        }
    };

    // extends jYP.content
    jYP.content.DateTimeLocal.prototype.toJSON = function () {
        if (this.date !== "") {
            return moment.utc(moment(this.date)).format("YYYY-MM-DDTHH:mm") + ":00Z";
        } else if (this.date === "" && this.$$createOnToJSONIfNull) {
            this.date = moment(Date.now()).format("YYYY-MM-DDTHH:mm");
            return moment.utc(moment(this.date)).format("YYYY-MM-DDTHH:mm") + ":00Z";
        } else {
            return null;
        }
    };

    // extends jYP.content
    jYP.content.DateTimeLocal.prototype.toString = function () {
        return this.date + ":00Z";
    };

    // extends jYP.content
    jYP.content.DateTimeLocal.prototype.toLocaleString = function () {
        return this.date + ":00Z";
    };

    // extends jYP.content
    jYP.content.MetaData = function (config) {
        this.sourceDateTime = new jYP.content.DateTimeLocal();
        this.sourceDateTime.$$createOnToJSONIfNull = true;
        this.profileId;
        this.sourceSystem = "CAMS";
        this.status = "";
        this.searchable;
        this.effectiveDate = new jYP.content.DateTimeLocal();
        this.effectiveDate.$$createOnToJSONIfNull = true;
        this.expirationDate = new jYP.content.DateTimeLocal();
        this.creationDate = new jYP.content.DateTimeLocal();
        this.replacedDate;
        this.contentId;
        this.updateComment;
        this.sourceVersion;
        if (config) {
            this.sourceDateTime = config.sourceDateTime || "";
            this.profileId = config.profileId || "";
            this.sourceSystem = config.sourceSystem || "CAMS";
            this.status = config.status || "";
            this.searchable = config.searchable || "";
            if (config.effectiveDate !== undefined) {
                this.effectiveDate = new jYP.content.DateTimeLocal(config.effectiveDate);
                this.effectiveDate.$$createOnToJSONIfNull = true;
            }
            if (config.expirationDate !== undefined) {
                this.expirationDate = new jYP.content.DateTimeLocal(config.expirationDate);
            }
            if (config.replacedDate !== undefined) {
                this.replacedDate = new jYP.content.DateTimeLocal(config.replacedDate);
            }
            if (config.creationDate !== undefined) {
                this.creationDate = new jYP.content.DateTimeLocal(config.creationDate);
            }
            this.contentId = config.contentId || "";
            this.updateComment = config.updateComment || "";
            this.sourceVersion = config.sourceVersion;
        }
    };

    jYP.content.MetaData.prototype.hasError = function () {
        this.validate();
        return this.$$error.status !== undefined
                || this.$$error.sourceSystem !== undefined
                || this.$$error.effectiveDate !== undefined
                || this.$$error.expirationDate !== undefined;
    };

    jYP.content.MetaData.prototype.validate = function () {
        this.$$error = {};
        if ((this.status || "") === "") {
            this.$$error.status = "Please choose a valid status";
        }
        if ((this.sourceSystem || "" ) === "") {
            this.$$error.sourceSystem = "Please enter a valid source system";
        }

        if (this.effectiveDate !== "") {
            if (moment(this.effectiveDate).format() === "Invalid date") {
                this.$$error.effectiveDate = "Please enter a valid date (format expecting : yyyy-MM-dd'T'HH:mm)";
            }
        }

        if (this.expirationDate !== "") {
            if (moment(this.expirationDate).format() === "Invalid date") {
                this.$$error.expirationDate = "Please enter a valid date (format expecting : yyyy-MM-dd'T'HH:mm)";
            }
        }
    };

    // extends jYP.content
    jYP.content.SocialNetworkOptins = function (config) {
        this.socialNetworkOptin = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);

            if (config.socialNetworkOptin) {
                for (var i = 0; i < config.socialNetworkOptin.length; i++) {
                    this.socialNetworkOptin.push(new jYP.content.SocialNetworkOptin(config.socialNetworkOptin[i]));
                }
            }
        }
    };

    jYP.content.SocialNetworkOptin = function (config) {
        this.optin = "U";
        this.syndicatedSite = "";
        this.$$open = false;
        if (config) {
            this.optin = config.optin || "U";
            this.syndicatedSite = config.syndicatedSite || "";
            this.email = config.email || "";
            this.url = config.url || "";
        }
    };

    // extends jYP.content
    jYP.content.Contact = function (config) {
        this.contactId = "U";
        this.name = "";
        this.email = "";
        this.phone = "";
        this.preferredLanguage = "";
        this.preferredTime = "";
        this.$$open = false;
        if (config) {
            this.contactId = config.optin || "";
            this.name = config.name || "";
            this.email = config.email || "";
            this.phone = config.phone || "";
            this.preferredLanguage = config.preferredLanguage ? config.preferredLanguage.toUpperCase() : "";
            if (config.preferredTime) {
                this.preferredTime = config.preferredTime
                if (this.preferredTime.dayPeriod) {
                    this.preferredTime.dayPeriod = this.preferredTime.dayPeriod.toUpperCase();
                }
            } else {
                this.preferredTime = "";
            }
        }
    };


    // extends jYP.content
    jYP.content.syndicationStatus = function (config) {
        this.lastSuccessfullInfo = {};
        this.lastSuccessfullInfo.site = {};

        if (config) {
            if (config.siteSyndicationInfo) {
                for (var i = 0; i < config.siteSyndicationInfo.length; i++) {
                    var site = config.siteSyndicationInfo[ i ];

                    this.lastSuccessfullInfo.site[ site.syndicationSite ] = {};
                    this.lastSuccessfullInfo.site[ site.syndicationSite ].name = site.syndicationSite;
                    this.lastSuccessfullInfo.site[ site.syndicationSite ].source = site.syndicatedBy;
                    this.lastSuccessfullInfo.site[ site.syndicationSite ].status = site.syndicationStatus.status;

                    if (site.syndicatedSiteInfo !== undefined) {
                        this.lastSuccessfullInfo.site[ site.syndicationSite ].syndicatedSiteInfo = site.syndicatedSiteInfo;
                    }
                }
            }
        }
    };

    // extends jYP.content
    jYP.content.Contents = function (config) {
        this.headingContent = [];
        this.directoryContent = [];
        this.urlContent = [];
        this.keywordContent = [];
        this.geocodeContent = [];
        this.phoneContent = [];
        this.addressContent = [];
        this.departmentContent = [];
        this.emailContent = [];
        this.merchantInfoContent = [];
        this.mediaContent = [];
        this.businessHourContent = [];
        this.holidayBusinessHourContent = [];
        this.refCodeContent = [];
        this.textLineContent = [];
        if (config) {
            if (config.headingContent) {
                for (var i = 0; i < config.headingContent.length; i++) {
                    this.headingContent.push(new jYP.content.HeadingContent(config.headingContent[i]));
                }
            }
            if (config.directoryContent) {
                for (var i = 0; i < config.directoryContent.length; i++) {
                    this.directoryContent.push(new jYP.content.DirectoryContent(config.directoryContent[i]));
                }
            }
            if (config.urlContent) {
                for (var i = 0; i < config.urlContent.length; i++) {
                    this.urlContent.push(new jYP.content.UrlContent(config.urlContent[i]));
                }
            }
            if (config.keywordContent) {
                for (var i = 0; i < config.keywordContent.length; i++) {
                    this.keywordContent.push(new jYP.content.KeywordContent(config.keywordContent[i]));
                }
            }
            if (config.geocodeContent) {
                for (var i = 0; i < config.geocodeContent.length; i++) {
                    this.geocodeContent.push(new jYP.content.GeocodeContent(config.geocodeContent[i]));
                }
            }
            if (config.phoneContent) {
                for (var i = 0; i < config.phoneContent.length; i++) {
                    this.phoneContent.push(new jYP.content.PhoneContent(config.phoneContent[i]));
                }
            }
            if (config.addressContent) {
                for (var i = 0; i < config.addressContent.length; i++) {
                    this.addressContent.push(new jYP.content.AddressContent(config.addressContent[i]));
                }
            }
            if (config.departmentContent) {
                for (var i = 0; i < config.departmentContent.length; i++) {
                    this.departmentContent.push(new jYP.content.DepartmentContent(config.departmentContent[i]));
                }
            }
            if (config.emailContent) {
                for (var i = 0; i < config.emailContent.length; i++) {
                    this.emailContent.push(new jYP.content.EmailContent(config.emailContent[i]));
                }
            }
            if (config.merchantInfoContent) {
                for (var i = 0; i < config.merchantInfoContent.length; i++) {
                    this.merchantInfoContent.push(new jYP.content.MerchantInfoContent(config.merchantInfoContent[i]));
                }
            }
            if (config.mediaContent) {
                for (var i = 0; i < config.mediaContent.length; i++) {
                    this.mediaContent.push(new jYP.content.MediaContent(config.mediaContent[i]));
                }
            }
            if (config.businessHourContent) {
                for (var i = 0; i < config.businessHourContent.length; i++) {
                    this.businessHourContent.push(new jYP.content.BusinessHourContent(config.businessHourContent[i], false));
                    this.holidayBusinessHourContent.push(new jYP.content.BusinessHourContent(config.businessHourContent[i], true));
                }
            }
            if (config.refCodeContent) {
                for (var i = 0; i < config.refCodeContent.length; i++) {
                    this.refCodeContent.push(new jYP.content.RefCodeContent(config.refCodeContent[i]));
                }
            }
            if (config.textLineContent) {
                for (var i = 0; i < config.textLineContent.length; i++) {
                    this.textLineContent.push(new jYP.content.TextLineContent(config.textLineContent[i]));
                }
            }
        }
    };

    jYP.content.Contents.prototype.openAll = function () {
        for (var i = 0; i < this.headingContent.length; i++) {
            this.headingContent[i].$$open = true;
        }
        for (var i = 0; i < this.directoryContent.length; i++) {
            this.directoryContent[i].$$open = true;
        }
        for (var i = 0; i < this.urlContent.length; i++) {
            this.urlContent[i].$$open = true;
        }
        for (var i = 0; i < this.keywordContent.length; i++) {
            this.keywordContent[i].$$open = true;
        }
        for (var i = 0; i < this.geocodeContent.length; i++) {
            this.geocodeContent[i].$$open = true;
        }
        for (var i = 0; i < this.phoneContent.length; i++) {
            this.phoneContent[i].$$open = true;
        }
        for (var i = 0; i < this.addressContent.length; i++) {
            this.addressContent[i].$$open = true;
        }
        for (var i = 0; i < this.departmentContent.length; i++) {
            this.departmentContent[i].$$open = true;
        }
        for (var i = 0; i < this.emailContent.length; i++) {
            this.emailContent[i].$$open = true;
        }
        for (var i = 0; i < this.merchantInfoContent.length; i++) {
            this.merchantInfoContent[i].$$open = true;
        }
        for (var i = 0; i < this.mediaContent.length; i++) {
            this.mediaContent[i].$$open = true;
        }
        for (var i = 0; i < this.businessHourContent.length; i++) {
            this.businessHourContent[i].$$open = true;
        }
        for (var i = 0; i < this.refCodeContent.length; i++) {
            this.refCodeContent[i].$$open = true;
        }
        for (var i = 0; i < this.textLineContent.length; i++) {
            this.textLineContent[i].$$open = true;
        }
    };

    jYP.content.Contents.prototype.closeAll = function () {
        for (var i = 0; i < this.headingContent.length; i++) {
            this.headingContent[i].$$open = false;
        }
        for (var i = 0; i < this.directoryContent.length; i++) {
            this.directoryContent[i].$$open = false;
        }
        for (var i = 0; i < this.urlContent.length; i++) {
            this.urlContent[i].$$open = false;
        }
        for (var i = 0; i < this.keywordContent.length; i++) {
            this.keywordContent[i].$$open = false;
        }
        for (var i = 0; i < this.geocodeContent.length; i++) {
            this.geocodeContent[i].$$open = false;
        }
        for (var i = 0; i < this.phoneContent.length; i++) {
            this.phoneContent[i].$$open = false;
        }
        for (var i = 0; i < this.addressContent.length; i++) {
            this.addressContent[i].$$open = false;
        }
        for (var i = 0; i < this.departmentContent.length; i++) {
            this.departmentContent[i].$$open = false;
        }
        for (var i = 0; i < this.emailContent.length; i++) {
            this.emailContent[i].$$open = false;
        }
        for (var i = 0; i < this.merchantInfoContent.length; i++) {
            this.merchantInfoContent[i].$$open = false;
        }
        for (var i = 0; i < this.mediaContent.length; i++) {
            this.mediaContent[i].$$open = false;
        }
        for (var i = 0; i < this.businessHourContent.length; i++) {
            this.businessHourContent[i].$$open = false;
        }
        for (var i = 0; i < this.refCodeContent.length; i++) {
            this.refCodeContent[i].$$open = false;
        }
        for (var i = 0; i < this.textLineContent.length; i++) {
            this.textLineContent[i].$$open = false;
        }
    };

    jYP.content.Contents.prototype.show = function (contentsId) {
        for (var i = 0; i < this.headingContent.length; i++) {
            this.headingContent[i].$$display = false;
            this.headingContent[i].$$open = false;
            if ($.inArray(this.headingContent[i].metaData.contentId, contentsId) >= 0) {
                this.headingContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.directoryContent.length; i++) {
            this.directoryContent[i].$$display = false;
            this.directoryContent[i].$$open = false;
            if ($.inArray(this.directoryContent[i].metaData.contentId, contentsId) >= 0) {
                this.directoryContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.urlContent.length; i++) {
            this.urlContent[i].$$display = false;
            this.urlContent[i].$$open = false;
            if ($.inArray(this.urlContent[i].metaData.contentId, contentsId) >= 0) {
                this.urlContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.keywordContent.length; i++) {
            this.keywordContent[i].$$display = false;
            this.keywordContent[i].$$open = false;
            if ($.inArray(this.keywordContent[i].metaData.contentId, contentsId) >= 0) {
                this.keywordContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.geocodeContent.length; i++) {
            this.geocodeContent[i].$$display = false;
            this.geocodeContent[i].$$open = false;
            if ($.inArray(this.geocodeContent[i].metaData.contentId, contentsId) >= 0) {
                this.geocodeContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.phoneContent.length; i++) {
            this.phoneContent[i].$$display = false;
            this.phoneContent[i].$$open = false;
            if ($.inArray(this.phoneContent[i].metaData.contentId, contentsId) >= 0) {
                this.phoneContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.addressContent.length; i++) {
            this.addressContent[i].$$display = false;
            this.addressContent[i].$$open = false;
            if ($.inArray(this.addressContent[i].metaData.contentId, contentsId) >= 0) {
                this.addressContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.departmentContent.length; i++) {
            this.departmentContent[i].$$display = false;
            this.departmentContent[i].$$open = false;
            if ($.inArray(this.departmentContent[i].metaData.contentId, contentsId) >= 0) {
                this.departmentContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.emailContent.length; i++) {
            this.emailContent[i].$$display = false;
            this.emailContent[i].$$open = false;
            if ($.inArray(this.emailContent[i].metaData.contentId, contentsId) >= 0) {
                this.emailContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.merchantInfoContent.length; i++) {
            this.merchantInfoContent[i].$$display = false;
            this.merchantInfoContent[i].$$open = false;
            if ($.inArray(this.merchantInfoContent[i].metaData.contentId, contentsId) >= 0) {
                this.merchantInfoContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.mediaContent.length; i++) {
            this.mediaContent[i].$$display = false;
            this.mediaContent[i].$$open = false;
            if ($.inArray(this.mediaContent[i].metaData.contentId, contentsId) >= 0) {
                this.mediaContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.businessHourContent.length; i++) {
            this.businessHourContent[i].$$display = false;
            this.businessHourContent[i].$$open = false;
            if ($.inArray(this.businessHourContent[i].metaData.contentId, contentsId) >= 0) {
                this.businessHourContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.refCodeContent.length; i++) {
            this.refCodeContent[i].$$display = false;
            this.refCodeContent[i].$$open = false;
            if ($.inArray(this.refCodeContent[i].metaData.contentId, contentsId) >= 0) {
                this.refCodeContent[i].$$display = true;
            }
        }
        for (var i = 0; i < this.textLineContent.length; i++) {
            this.textLineContent[i].$$display = false;
            this.textLineContent[i].$$open = false;
            if ($.inArray(thistextLineContent[i].metaData.contentId, contentsId) >= 0) {
                this.textLineContent[i].$$display = true;
            }
        }
    };

    jYP.content.Contents.prototype.showAll = function () {
        for (var i = 0; i < this.headingContent.length; i++) {
            this.headingContent[i].$$display = true;
            this.headingContent[i].$$open = false;
        }
        for (var i = 0; i < this.directoryContent.length; i++) {
            this.directoryContent[i].$$display = true;
            this.directoryContent[i].$$open = false;
        }
        for (var i = 0; i < this.urlContent.length; i++) {
            this.urlContent[i].$$display = true;
            this.urlContent[i].$$open = false;
        }
        for (var i = 0; i < this.keywordContent.length; i++) {
            this.keywordContent[i].$$display = true;
            this.keywordContent[i].$$open = false;
        }
        for (var i = 0; i < this.geocodeContent.length; i++) {
            this.geocodeContent[i].$$display = true;
            this.geocodeContent[i].$$open = false;
        }
        for (var i = 0; i < this.phoneContent.length; i++) {
            this.phoneContent[i].$$display = true;
            this.phoneContent[i].$$open = false;
        }
        for (var i = 0; i < this.addressContent.length; i++) {
            this.addressContent[i].$$display = true;
            this.addressContent[i].$$open = false;
        }
        for (var i = 0; i < this.departmentContent.length; i++) {
            this.departmentContent[i].$$display = true;
            this.departmentContent[i].$$open = false;
        }
        for (var i = 0; i < this.emailContent.length; i++) {
            this.emailContent[i].$$display = true;
            this.emailContent[i].$$open = false;
        }
        for (var i = 0; i < this.merchantInfoContent.length; i++) {
            this.merchantInfoContent[i].$$display = true;
            this.merchantInfoContent[i].$$open = false;
        }
        for (var i = 0; i < this.mediaContent.length; i++) {
            this.mediaContent[i].$$display = true;
            this.mediaContent[i].$$open = false;
        }
        for (var i = 0; i < this.businessHourContent.length; i++) {
            this.businessHourContent[i].$$display = true;
            this.businessHourContent[i].$$open = false;
        }
        for (var i = 0; i < this.refCodeContent.length; i++) {
            this.refCodeContent[i].$$display = true;
            this.refCodeContent[i].$$open = false;
        }
        for (var i = 0; i < this.textLineContent.length; i++) {
            this.textLineContent[i].$$display = true;
            this.textLineContent[i].$$open = false;
        }
    };

    jYP.content.Contents.prototype.hasError = function () {
        var result = false;
        for (var i = 0; i < this.headingContent.length; i++) {
            result = result | this.headingContent[i].hasError();
        }
        for (var i = 0; i < this.directoryContent.length; i++) {
            result = result | this.directoryContent[i].hasError();
        }
        for (var i = 0; i < this.urlContent.length; i++) {
            result = result | this.urlContent[i].hasError();
        }
        for (var i = 0; i < this.keywordContent.length; i++) {
            result = result | this.keywordContent[i].hasError();
        }
        return result;
    };

    jYP.content.Contents.prototype.empty = function () {
        this.headingContent = [];
        this.urlContent = [];
        this.keywordContent = [];
        this.geocodeContent = [];
        this.phoneContent = [];
        this.addresseContent = [];
        this.departmentContent = [];
        this.emailContent = [];
        this.merchantInfoContent = [];
        this.mediaContent = [];
        this.textLineContent = [];
    };

    jYP.content.Contents.prototype.creationDates = [];

    jYP.content.Contents.prototype.getPreviousDate = function ( ) {
        var previousCreationDate = null;

        for (var i = 0; i < this.headingContent.length; i++) {
            if (previousCreationDate < this.headingContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.headingContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.urlContent.length; i++) {
            if (previousCreationDate < this.urlContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.urlContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.keywordContent.length; i++) {
            if (previousCreationDate < this.keywordContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.keywordContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.geocodeContent.length; i++) {
            if (previousCreationDate < this.geocodeContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.geocodeContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.phoneContent.length; i++) {
            if (previousCreationDate < this.phoneContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.phoneContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.addressContent.length; i++) {
            if (previousCreationDate < this.addressContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.addressContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.departmentContent.length; i++) {
            if (previousCreationDate < this.departmentContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.departmentContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.emailContent.length; i++) {
            if (previousCreationDate < this.emailContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.emailContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.merchantInfoContent.length; i++) {
            if (previousCreationDate < this.merchantInfoContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.merchantInfoContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.mediaContent.length; i++) {
            if (previousCreationDate < this.mediaContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.mediaContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.businessHourContent.length; i++) {
            if (previousCreationDate < this.businessHourContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.businessHourContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.refCodeContent.length; i++) {
            if (previousCreationDate < this.refCodeContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.refCodeContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }
        for (var i = 0; i < this.textLineContent.length; i++) {
            if (previousCreationDate < this.textLineContent[i].metaData.creationDate.date || previousCreationDate === null) {
                previousCreationDate = this.textLineContent[i].metaData.creationDate.date;

                if (this.creationDates.indexOf(previousCreationDate) === -1) {
                    this.creationDates.push(previousCreationDate);
                }
            }
        }

        return previousCreationDate;
    };

    jYP.content.Contents.prototype.getNextDate = function (currentDate, today) {
        var nextIndex = nextIdex = this.creationDates.indexOf(currentDate);

        if (currentDate !== today) {
            this.creationDates.push(today);
            nextIndex = this.creationDates.indexOf(currentDate) + 1;
        }

        return this.creationDates[ nextIndex ];
    };

    // extends jYP.content
    jYP.content.Content = function (config) {
        this.$$error = false;
        this.$$open = false;
        this.$$editMode = false;
        this.$$display = true;
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
        }
    };

    //    Urls
    // extends jYP.content.Content
    jYP.content.UrlContent = function (config) {
        this.$$type = 'urlcontent';
        this.url = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.url) {
                for (var i = 0; i < config.url.length; i++) {
                    this.url.push(new jYP.content.Url(config.url[i]));
                }
                this.$$error = this.hasError();
            }
        }
    };
    jYP.content.UrlContent.prototype = new jYP.content.Content();

    jYP.content.UrlContent.prototype.hasError = function () {
        this.$$errorMessage = "";
        this.$$error = this.metaData.hasError();
        if (this.url.length > 0) {
            for (var i = 0; i < this.url.length; i++) {
                this.$$error = this.$$error | this.url[i].hasError();
            }
        } else {
            this.$$error = true;
            this.$$errorMessage = "At least one element is required. You must add a URL before saving changes.";
        }
        return this.$$error;
    };

    jYP.content.UrlLocalized = function (config) {
        this.languageCode = config.languageCode || "";
        this.url = config.url || "";
    };


    // extends jYP.content
    jYP.content.Url = function (config) {
        this.urlType = "";
        this.urlLocalized = [];
        this.verifiedBy = null;
        this.dateLastVerified = new jYP.content.DateTimeLocal();
        if (config) {
            this.urlType = config.urlType || "";
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
            if (config.urlLocalized) {
                for (var i = 0; i < config.urlLocalized.length; i++) {
                    this.urlLocalized.push(new jYP.content.UrlLocalized(config.urlLocalized[i]));
                }
            }
        }
    };

    jYP.content.Url.prototype.hasError = function () {
        this.$$error = {};
        if (this.urlType === "") {
            this.$$error.urlType = "Please choose a url type";
        }

        if (this.urlLocalized.length > 0) {
            var error = undefined;
            for (var i = 0; i < this.urlLocalized.length; i++) {
                error = error | this.urlLocalized[i].hasError();
            }
            if (error !== 0) {
                this.$$error.urlLocalize = error;
            }
        } else {
            this.$$errorMessage = "At least one element is required. You must add a URL before saving changes.";
        }
        return this.$$error.urlType !== undefined
                || this.$$error.urlLocalize !== undefined
                || this.$$errorMessage !== undefined;
    };

    jYP.content.UrlLocalized.prototype.hasError = function () {
        this.$$error = {};
        if (this.url === "") {
            this.$$error.value = "Please enter a valid url";
        }

        if (this.languageCode === "") {
            this.$$error.languageCode = "Please enter a valid language";
        }

        return this.$$error.value !== undefined
                || this.$$error.languageCode !== undefined;
    };


    //    Headings
    // extends jYP.content.Content
    jYP.content.HeadingContent = function (config) {
        this.$$type = 'headingcontent';
        this.heading = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);

            if (config.heading) {
                for (var i = 0; i < config.heading.length; i++) {
                    this.heading.push(new jYP.content.Heading(config.heading[i]));
                }
            }
        }
    };
    jYP.content.HeadingContent.prototype = new jYP.content.Content();

    jYP.content.HeadingContent.prototype.hasError = function (config) {
        this.$$errorMessage = "";
        this.$$error = this.metaData.hasError();

        if (this.heading.length > 0) {
            for (var i = 0; i < this.heading.length; i++) {
                this.$$error = this.$$error | this.heading[i].hasError();
            }
            if (config && config.getPrimaryHeadings() > 1) {
                this.$$error = true;
                this.$$errorMessage = "A merchant can have only one heading with Heading Type 'Primary'";
            }
        } else {
            this.$$error = true;
            this.$$errorMessage = "At least one element is required. You must add a heading before saving changes.";
        }
        return this.$$error;
    };

    jYP.content.Contents.prototype.getPrimaryHeadings = function () {
        var result = 0;
        for (var i = 0; i < this.headingContent.length; i++) {
            result = result + this.headingContent[i].getPrimaryHeadings();
        }
        return result;
    };

    jYP.content.HeadingContent.prototype.getPrimaryHeadings = function () {
        var primaryCount = 0;
        for (var i = 0; i < this.heading.length; i++) {
            if (this.heading[i].headingType == "PRIMARY") {
                primaryCount++;
            }
        }
        return primaryCount;
    };

    jYP.content.Contents.prototype.getPrimaryHeadingContent = function () {
        for (var i = 0; i < this.headingContent.length; i++) {
            if (this.headingContent[i].heading[0].headingType == "PRIMARY") {
                return this.headingContent[i];
            }
        }
        return null;
    };

    jYP.content.PrimaryHeadingContent = function (primaryHeadingId) {
        this.$$type = 'headingcontent';
        this.heading = [];
        this.metaData = new jYP.content.MetaData();
        this.metaData.status = "APPROVED";
        if (primaryHeadingId) {
            primaryHeading = {headingType: "PRIMARY", headingId: primaryHeadingId};
            this.heading.push(new jYP.content.Heading(primaryHeading));
        }
    };

    jYP.content.PrimaryHeadingContent.prototype = new jYP.content.HeadingContent();

    // extends jYP.content
    jYP.content.Heading = function (config) {
        this.headingId = "";
        this.source = "MANUAL";
        this.orderNo = "";
        this.headingType = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        if (config) {
            this.headingId = config.headingId || "";
            this.source = config.source || "MANUAL";
            this.orderNo = config.orderNo || "";
            this.verifiedBy = config.verifiedBy || "";
            this.headingType = config.headingType || "";
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
        }
    };

    jYP.content.Heading.prototype.hasError = function () {
        this.$$error = {};
        if (this.headingId.length !== 8 || !jQuery.isNumeric(this.headingId)) {
            this.$$error.headingId = "Please enter a valid 8 digits heading id";
        }
        if (this.headingType === undefined || (this.headingType || "").length < 1) {
            this.$$error.headingType = "Please select a heading type";
        }
        return (this.$$error.headingId !== undefined || this.$$error.headingType !== undefined);
    };

    //    Directorys
    // extends jYP.content.Content
    jYP.content.DirectoryContent = function (config) {
        this.$$type = 'directorycontent';
        this.directory = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);

            if (config.directory) {
                for (var i = 0; i < config.directory.length; i++) {
                    this.directory.push(new jYP.content.Directory(config.directory[i]));
                }
            }
        }
    };
    jYP.content.DirectoryContent.prototype = new jYP.content.Content();

    jYP.content.DirectoryContent.prototype.hasError = function (config) {
        this.$$errorMessage = "";
        this.$$error = this.metaData.hasError();

        if (this.directory.length > 0) {
            for (var i = 0; i < this.directory.length; i++) {
                this.$$error = this.$$error | this.directory[i].hasError();
            }
            if (config && config.getHomeDirectorys() > 1) {
                this.$$error = true;
                this.$$errorMessage = "A merchant can have only one directory with Directory Type 'Home'";
            }
        } else {
            this.$$error = true;
            this.$$errorMessage = "At least one element is required. You must add a directory before saving changes.";
        }
        return this.$$error;
    };

    jYP.content.Contents.prototype.getHomeDirectorys = function () {
        var result = 0;
        for (var i = 0; i < this.directoryContent.length; i++) {
            result = result + this.directoryContent[i].getHomeDirectorys();
        }
        return result;
    };

    jYP.content.DirectoryContent.prototype.getHomeDirectorys = function () {
        var homeCount = 0;
        for (var i = 0; i < this.directory.length; i++) {
            if (this.directory[i].type == "HOME") {
                homeCount++;
            }
        }
        return homeCount;
    };


    jYP.content.Contents.prototype.getHomeDirectoryContent = function () {
        for (var i = 0; i < this.directoryContent.length; i++) {
            if (this.directoryContent[i].directory[0].type == "HOME") {
                return this.directoryContent[i];
            }
        }
        return null;
    };

    jYP.content.HomeDirectoryContent = function (directoryCode) {
        this.$$type = 'directorycontent';
        this.directory = [];
        this.metaData = new jYP.content.MetaData();
        this.metaData.status = "APPROVED";
        if (directoryCode) {
            homeDirectory = {type: "HOME", code: directoryCode};
            this.directory.push(new jYP.content.Directory(homeDirectory));
        }
    };

    jYP.content.HomeDirectoryContent.prototype = new jYP.content.DirectoryContent();

    // extends jYP.content
    jYP.content.Directory = function (config) {
        this.code = "";
        this.orderNo = "";
        this.type = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        if (config) {
            this.code = config.code || "";
            this.orderNo = config.orderNo || "";
            this.verifiedBy = config.verifiedBy || "";
            this.type = config.type || "";
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
        }
    };

    jYP.content.Directory.prototype.hasError = function () {
        this.$$error = {};
        if (this.code.length !== 6 || !jQuery.isNumeric(this.code)) {
            this.$$error.code = "Please enter a valid 6 digits directory code";
        }
        if (this.type === undefined || (this.type || "").length < 1) {
            this.$$error.type = "Please select a directory type";
        }
        return (this.$$error.code !== undefined || this.$$error.type !== undefined);
    };

    //    Keywords
    // extends jYP.content.Content
    jYP.content.KeywordContent = function (config) {
        this.$$type = 'keywordcontent';
        this.keyword = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);

            if (config.keyword) {
                for (var i = 0; i < config.keyword.length; i++) {
                    this.keyword.push(new jYP.content.Keyword(config.keyword[i]));
                }
            }
        }
    };
    jYP.content.KeywordContent.prototype = new jYP.content.Content();

    jYP.content.KeywordContent.prototype.hasError = function () {
        this.$$errorMessage = "";
        this.$$error = this.metaData.hasError();

        if (this.keyword.length > 0) {
            for (var i = 0; i < this.keyword.length; i++) {
                this.$$error = this.$$error | this.keyword[i].hasError();
            }
        } else {
            this.$$error = true;
            this.$$errorMessage = "At least one element is required. You must add a keyword before saving changes.";
        }
        return this.$$error;
    };


    // extends jYP.content
    jYP.content.Keyword = function (config) {
        this.keywordId = "";
        this.keywordClass = "";
        this.displayable = false;
        this.keywordLocalized = [];
        if (config) {
            this.keywordId = config.keywordId || "";
            this.keywordClass = config.keywordClass || "";
            this.displayable = config.displayable || false;
            if (config.keywordLocalized) {
                for (var i = 0; i < config.keywordLocalized.length; i++) {
                    this.keywordLocalized.push(new jYP.content.KeywordLocalized(config.keywordLocalized[i]));
                }
            }
        }
    };

    jYP.content.Keyword.prototype.hasError = function () {
        this.$$error = {};

        if (this.keywordLocalized.length > 0) {
            var error = undefined;
            for (var i = 0; i < this.keywordLocalized.length; i++) {
                error = error | this.keywordLocalized[i].hasError();
            }
            if (error !== 0) {
                this.$$error.keywordLocalize = error;
            }
        } else {
            this.$$errorMessage = "At least one element is required. You must add a keyword before saving changes.";
        }
        return this.$$error.keywordLocalize !== undefined
                || this.$$errorMessage !== undefined;
    };

    jYP.content.KeywordLocalized = function (config) {
        this.languageCode = "";
        this.value = "";
        if (config) {
            this.languageCode = config.languageCode || "";
            this.value = config.value || "";
        }
    };

    jYP.content.KeywordLocalized.prototype.hasError = function () {
        this.$$error = {};
        if (this.value === "") {
            this.$$error.value = "Please enter a valid keyword";
        }

        if (this.languageCode === "") {
            this.$$error.languageCode = "Please enter a valid language";
        }

        return this.$$error.value !== undefined
                || this.$$error.languageCode !== undefined;
    };

    //    Geocodes
    // extends jYP.content.Content
    jYP.content.GeocodeContent = function (config) {
        this.$$type = 'geocodecontent';
        this.geocode = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.geocode) {
                for (var i = 0; i < config.geocode.length; i++) {
                    this.geocode.push(new jYP.content.Geocode(config.geocode[i]));
                }
            }
        }
    };
    jYP.content.GeocodeContent.prototype = new jYP.content.Content();

    // extends jYP.content
    jYP.content.Geocode = function (config) {
        this.latitude = "";
        this.longitude = "";
        this.precisionLevel = "";
        this.geocodeDate = null;
        this.source = "";
        this.channel = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        if (config) {
            this.latitude = config.latitude || "";
            this.longitude = config.longitude || "";
            this.precisionLevel = config.precisionLevel || "";
            this.source = config.source || "";
            this.channel = config.channel || "";
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
            if (config.geocodeDate !== undefined) {
                this.geocodeDate = new jYP.content.DateTimeLocal(config.geocodeDate);
            }
        }
    };

    //    Phones
    // extends jYP.content.Content
    jYP.content.PhoneContent = function (config) {
        this.$$type = 'phonecontent';
        this.phone = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.phone) {
                for (var i = 0; i < config.phone.length; i++) {
                    this.phone.push(new jYP.content.Phone(config.phone[i]));
                }
            }
        }
    };
    jYP.content.PhoneContent.prototype = new jYP.content.Content();

    // extends jYP.content
    jYP.content.Phone = function (config) {
        this.phoneNumber = "";
        this.phoneType = "";
        this.phoneConfidentiality = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        if (config) {
            this.phoneNumber = config.phoneNumber || "";
            this.phoneType = config.phoneType || "";
            this.phoneConfidentiality = config.phoneConfidentiality || "";
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
        }
    };

    //    Addresses
    // extends jYP.content.Content
    jYP.content.AddressContent = function (config) {
        this.$$type = 'addresscontent';
        this.address = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.address) {
                for (var i = 0; i < config.address.length; i++) {
                    this.address.push(new jYP.content.Address(config.address[i]));
                }
            }
        }
    };
    jYP.content.AddressContent.prototype = new jYP.content.Content();

    // extends jYP.content
    jYP.content.Address = function (config) {
        this.displayLine = "";
        this.suiteNumber = "";
        this.civicNumber = "";
        this.streetName = "";
        this.streetType = "";
        this.streetDirection = "";
        this.city = "";
        this.postalCode = "";
        this.province = "";
        this.country = "";
        this.addressConfidentiality = false;
        this.addressConfidenceLevel = "";
        this.streetId = "";
        this.type = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        if (config) {
            this.displayLine = config.displayLine || "";
            this.suiteNumber = config.suiteNumber || "";
            this.civicNumber = config.civicNumber || "";
            this.streetName = config.streetName || "";
            this.streetType = config.streetType || "";
            this.streetDirection = config.streetDirection || "";
            this.city = config.city || "";
            this.postalCode = config.postalCode || "";
            this.province = config.province || null;
            this.country = config.country || null;
            this.addressConfidentiality = config.addressConfidentiality;
            this.addressConfidenceLevel = config.addressConfidenceLevel || null;
            this.streetId = config.streetId || null;
            this.type = config.type || null;
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
        }
    };

    //    Departments
    // extends jYP.content.Content
    jYP.content.DepartmentContent = function (config) {
        this.$$type = 'departmentcontent';
        this.department = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.department) {
                for (var i = 0; i < config.department.length; i++) {
                    this.department.push(new jYP.content.Department(config.department[i]));
                }
            }
        }
    };
    jYP.content.DepartmentContent.prototype = new jYP.content.Content();

    jYP.content.DepartmentLocalised = function (languageCode, name) {
        this.languageCode = languageCode;
        this.name = name;
    };

    // extends jYP.content
    jYP.content.Department = function (config) {
        this.phoneNumber = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        this.departmentLocalized = [];
        if (config) {
            this.phoneNumber = config.phoneNumber || "";
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
            if (config.departmentLocalized) {
                for (var i = 0; i < config.departmentLocalized.length; i++) {
                    this.departmentLocalized.push(new jYP.content.DepartmentLocalised(config.departmentLocalized[i].languageCode, config.departmentLocalized[i].name));
                }
            }
        }
    };


    // Medias
    // extends jYP.content.Content
    jYP.content.MediaContent = function (config) {
        this.$$type = 'mediacontent';
        this.media = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.media) {
                for (var i = 0; i < config.media.length; i++) {
                    this.media.push(new jYP.content.Media(config.media[i]));
                }
            }
        }
    };

    jYP.content.MediaContent.prototype = new jYP.content.Content();

    jYP.content.MediaLocalised = function (config) {
        this.languageCode = config.languageCode || "";
        this.tag = config.tag || "";
        this.transcript = config.transcript || "";
        this.resource = [];
        if (config.resource) {
            for (var i = 0; i < config.resource.length; i++) {
                this.resource.push(new jYP.content.MediaResource(config.resource[i]));
            }
        }
    };

    jYP.content.MediaResource = function (config) {
        this.type = config.type || "";
        this.url = config.url || "";
    };

    // extends jYP.content
    jYP.content.Media = function (config) {
        this.mediaType = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        this.mediaLocalized = [];
        if (config) {
            this.mediaType = config.mediaType || "";
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
            if (config.mediaLocalized) {
                for (var i = 0; i < config.mediaLocalized.length; i++) {
                    this.mediaLocalized.push(new jYP.content.MediaLocalised(config.mediaLocalized[i]));
                }
            }
        }
    };

    // BusinessHourContent
    // extends jYP.content.Content
    jYP.content.BusinessHourContent = function (config, holiday) {
        this.$$type = 'businesshourcontent';
        this.holiday = holiday;
        this.businessHour = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.businessHour) {
                for (var i = 0; i < config.businessHour.length; i++) {
                    if (!holiday && config.businessHour[i].dayCode.length === 3) {
                        var alreadyFound = false;
                        for (var j = 0; j < this.businessHour.length; j++) {
                            if (this.businessHour[j].dayCode === config.businessHour[i].dayCode) {
                                this.businessHour[j].hourFromTo =
                                        this.businessHour[j].hourFromTo +
                                        '<br />' + formatRange(new String(config.businessHour[i].hourFrom), new String(config.businessHour[i].hourTo));
                                alreadyFound = true;
                                break;
                            }
                        }
                        if (!alreadyFound) {
                            config.businessHour[i].open = (config.businessHour[i].open === "true");
                            this.businessHour.push(new jYP.content.BusinessHour(config.businessHour[i]));
                        }
                    } else if (holiday && config.businessHour[i].dayCode.length > 3) {
                        var alreadyFound = false;
                        for (var j = 0; j < this.businessHour.length; j++) {
                            if (this.businessHour[j].dayCode === config.businessHour[i].dayCode) {
                                this.businessHour[j].hourFromTo =
                                        this.businessHour[j].hourFromTo +
                                        '<br />' + formatRange(new String(config.businessHour[i].hourFrom), new String(config.businessHour[i].hourTo));
                                alreadyFound = true;
                                break;
                            }
                        }
                        if (!alreadyFound) {
                            config.businessHour[i].open = (config.businessHour[i].open === "true");
                            this.businessHour.push(new jYP.content.BusinessHour(config.businessHour[i]));
                        }
                    }
                }
            }
        }
    };
    jYP.content.BusinessHourContent.prototype = new jYP.content.Content();

    // extends jYP.content
    jYP.content.BusinessHour = function (config) {
        this.dayCode = "";
        this.hourFromTo = "";
        this.open = false;
        this.verifiedBy = null;
        this.dateLastVerified = null;
        if (config) {
            this.dayCode = angular.uppercase(config.dayCode || "");
            this.hourFrom = config.hourFrom || "";
            this.hourTo = config.hourTo || "";
            this.hourFromTo = formatRange(new String(this.hourFrom), new String(this.hourTo));
            this.open = config.open;
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
        }
    };

    //TODO : WTF ? where is the package and the class
    formatRange = function (from, to) {
        if (from.length === 3) {
            from = "0" + from;
        }
        if (to.length === 3) {
            to = "0" + to;
        }
        return from.substring(0, 2) + ":" + from.substring(2, 4) + " - " + to.substring(0, 2) + ":" + to.substring(2, 4);
    };


    // RefCodeContent
    // extends jYP.content.Content
    jYP.content.RefCodeContent = function (config) {
        this.$$type = 'refcodecontent';
        this.refCode = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.refCode) {
                for (var i = 0; i < config.refCode.length; i++) {
                    this.refCode.push(new jYP.content.RefCode(config.refCode[i]));
                }
            }
        }
    };
    jYP.content.RefCodeContent.prototype = new jYP.content.Content();

    // extends jYP.content
    jYP.content.RefCode = function (config) {
        this.kmsClass = "";
        this.kmsCode = [];
        this.verifiedBy = null;
        this.dateLastVerified = null;
        if (config) {
            this.kmsClass = config.kmsClass;
            if (config.kmsCode) {
                for (var i = 0; i < config.kmsCode.length; i++) {
                    for (var j = 0; j < config.kmsCode[i].labelLocalized.length; j++) {
                        if (config.kmsCode[i].labelLocalized.length === 1) {
                            if (config.kmsCode[i].labelLocalized[0].languageCode === 'FR') {
                                config.kmsCode[i].labelLocalized.push({"languageCode": 'EN', "label": "", "value": ""});
                            } else {
                                config.kmsCode[i].labelLocalized.push({"languageCode": 'FR', "label": "", "value": ""});
                            }
                        }

                    }
                    this.kmsCode.push(config.kmsCode[i]);
                }

            }

            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
        }

    };

    // TextLines
    // extends jYP.content.Content
    jYP.content.TextLineContent = function (config) {
        this.$$type = 'textlinecontent';
        this.textLine = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.textLine) {
                for (var i = 0; i < config.textLine.length; i++) {
                    this.textLine.push(new jYP.content.TextLine(config.textLine[i]));
                }
            }
        }
    };
    jYP.content.TextLineContent.prototype = new jYP.content.Content();

    jYP.content.TextLineLocalised = function (languageCode, value) {
        this.languageCode = languageCode;
        this.value = value;
    };

    // extends jYP.content
    jYP.content.TextLine = function (config) {
        this.textLineType = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        this.textLineLocalized = [];
        if (config) {
            this.textLineType = config.textLineType || "";
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
            if (config.textLineLocalized) {
                for (var i = 0; i < config.textLineLocalized.length; i++) {
                    this.textLineLocalized.push(new jYP.content.TextLineLocalised(config.textLineLocalized[i].languageCode, config.textLineLocalized[i].value));
                }
            }
        }
    };

    //    Emails
    // extends jYP.content.Content
    jYP.content.EmailContent = function (config) {
        this.$$type = 'emailcontent';
        this.$$display = true;
        this.email = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.email) {
                for (var i = 0; i < config.email.length; i++) {
                    this.email.push(new jYP.content.Email(config.email[i]));
                }
            }
        }
    };
    jYP.content.EmailContent.prototype = new jYP.content.Content();

    jYP.content.EmailLocalised = function (languageCode, value) {
        this.languageCode = languageCode;
        this.value = value;
    };

    // extends jYP.content
    jYP.content.Email = function (config) {
        this.emailType = "";
        this.verifiedBy = null;
        this.dateLastVerified = null;
        this.emailLocalized = [];
        if (config) {
            this.emailType = config.emailType || "";
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
            if (config.emailLocalized) {
                for (var i = 0; i < config.emailLocalized.length; i++) {
                    this.emailLocalized.push(new jYP.content.EmailLocalised(config.emailLocalized[i].languageCode, config.emailLocalized[i].value));
                }
            }
        }
    };
    //    merchantInfos
    // extends jYP.content.Content
    jYP.content.MerchantInfoContent = function (config) {
        this.$$type = 'merchantinfocontent';
        this.$$open = true;
        this.merchantInfo = [];
        this.metaData = new jYP.content.MetaData();
        if (config) {
            this.metaData = new jYP.content.MetaData(config.metaData);
            if (config.merchantInfo) {
                for (var i = 0; i < config.merchantInfo.length; i++) {
                    this.merchantInfo.push(new jYP.content.MerchantInfo(config.merchantInfo[i]));
                }
            }
        }
    };
    jYP.content.MerchantInfoContent.prototype = new jYP.content.Content();

    jYP.content.MerchantInfoLocalised = function (languageCode, name) {
        this.languageCode = languageCode;
        this.name = name;
    };

    // extends jYP.content
    jYP.content.MerchantInfo = function (config) {
        this.verifiedBy = null;
        this.dateLastVerified = null;
        this.merchantsInfoLocalized = [];
        if (config) {
            this.verifiedBy = config.verifiedBy || null;
            if (config.dateLastVerified !== undefined) {
                this.dateLastVerified = new jYP.content.DateTimeLocal(config.dateLastVerified);
            }
            if (config.merchantsInfoLocalized) {
                for (var i = 0; i < config.merchantsInfoLocalized.length; i++) {
                    this.merchantsInfoLocalized.push(new jYP.content.MerchantInfoLocalised(config.merchantsInfoLocalized[i].languageCode, config.merchantsInfoLocalized[i].name));
                }
            }
        }
    };

})(); // run the anonymous function