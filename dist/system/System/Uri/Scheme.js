System.register([], function(exports_1) {
    "use strict";
    var UriScheme, PIPE, TCP;
    return {
        setters:[],
        execute: function() {
            (function (UriScheme) {
                UriScheme[UriScheme["file"] = 0] = "file";
                UriScheme[UriScheme["ftp"] = 1] = "ftp";
                UriScheme[UriScheme["gopher"] = 2] = "gopher";
                UriScheme[UriScheme["http"] = 3] = "http";
                UriScheme[UriScheme["https"] = 4] = "https";
                UriScheme[UriScheme["ldap"] = 5] = "ldap";
                UriScheme[UriScheme["mailto"] = 6] = "mailto";
                UriScheme[UriScheme["pipe"] = 7] = "pipe";
                UriScheme[UriScheme["tcp"] = 8] = "tcp";
                UriScheme[UriScheme["news"] = 9] = "news";
                UriScheme[UriScheme["nntp"] = 10] = "nntp";
                UriScheme[UriScheme["telnet"] = 11] = "telnet";
                UriScheme[UriScheme["uuid"] = 12] = "uuid";
            })(UriScheme || (UriScheme = {}));
            PIPE = 'net.pipe';
            TCP = 'net.tcp';
            UriScheme[UriScheme.pipe] = PIPE;
            UriScheme[UriScheme.tcp] = TCP;
            UriScheme[PIPE] = UriScheme.pipe;
            UriScheme[TCP] = UriScheme.tcp;
            Object.freeze(UriScheme);
            exports_1("default",UriScheme);
        }
    }
});
//# sourceMappingURL=Scheme.js.map