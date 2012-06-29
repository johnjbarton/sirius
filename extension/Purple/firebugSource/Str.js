/* Original code from fbug project http://code.google.com/p/fbug/source/browse/branches/firebug1.9/content/firebug/lib/string.js */

define([
],
function() {

// ********************************************************************************************* //
// Constants

var reNotWhitespace = /[^\s]/;


var Str = {};

Str.options = {  // global variables
  showTextNodesWithWhitespace: false,
  showTextNodesWithEntities: true,
  stringCropLength: 50,
  textWrapWidth: 80,
  sizeToStringPrecision: 2
};

// ************************************************************************************************
// Whitespace and Entity conversions

var entityConversionLists = Str.entityConversionLists =
{
    normal : {
        whitespace : {
            '\t' : '\u200c\u2192',
            '\n' : '\u200c\u00b6',
            '\r' : '\u200c\u00ac',
            ' '  : '\u200c\u00b7'
        }
    },
    reverse : {
        whitespace : {
            '&Tab;' : '\t',
            '&NewLine;' : '\n',
            '\u200c\u2192' : '\t',
            '\u200c\u00b6' : '\n',
            '\u200c\u00ac' : '\r',
            '\u200c\u00b7' : ' '
        }
    }
};

var normal = entityConversionLists.normal,
    reverse = entityConversionLists.reverse;

function addEntityMapToList(ccode, entity)
{
    var lists = Array.prototype.slice.apply(arguments, [2]),
        len = lists.length,
        ch = String.fromCharCode(ccode);

    for (var i = 0; i < len; i++)
    {
        var list = lists[i];
        normal[list]=normal[list] || {};
        normal[list][ch] = '&' + entity + ';';
        reverse[list]=reverse[list] || {};
        reverse[list]['&' + entity + ';'] = ch;
    }
}

var e = addEntityMapToList,
    white = 'whitespace',
    text = 'text',
    attr = 'attributes',
    css = 'css',
    editor = 'editor';

e(0x0000, '#0', text, attr, css, editor);
e(0x0022, 'quot', attr, css);
e(0x0026, 'amp', attr, text, css);
e(0x0027, 'apos', css);
e(0x003c, 'lt', attr, text, css);
e(0x003e, 'gt', attr, text, css);
e(0xa9, 'copy', text, editor);
e(0xae, 'reg', text, editor);
e(0x2122, 'trade', text, editor);

// See http://en.wikipedia.org/wiki/Dash
e(0x2012, '#8210', attr, text, editor); // figure dash
e(0x2013, 'ndash', attr, text, editor); // en dash
e(0x2014, 'mdash', attr, text, editor); // em dash
e(0x2015, '#8213', attr, text, editor); // horizontal bar

e(0x00a0, 'nbsp', attr, text, white, editor);
e(0x2002, 'ensp', attr, text, white, editor);
e(0x2003, 'emsp', attr, text, white, editor);
e(0x2009, 'thinsp', attr, text, white, editor);
e(0x200c, 'zwnj', attr, text, white, editor);
e(0x200d, 'zwj', attr, text, white, editor);
e(0x200e, 'lrm', attr, text, white, editor);
e(0x200f, 'rlm', attr, text, white, editor);
e(0x200b, '#8203', attr, text, white, editor); // zero-width space (ZWSP)

//************************************************************************************************
// Entity escaping

var entityConversionRegexes =
{
    normal : {},
    reverse : {}
};

var escapeEntitiesRegEx =
{
    normal : function(list)
    {
        var chars = [];
        for ( var ch in list)
        {
            chars.push(ch);
        }
        return new RegExp('([' + chars.join('') + '])', 'gm');
    },
    reverse : function(list)
    {
        var chars = [];
        for ( var ch in list)
        {
            chars.push(ch);
        }
        return new RegExp('(' + chars.join('|') + ')', 'gm');
    }
};

function getEscapeRegexp(direction, lists)
{
    var name = '', re;
    var groups = [].concat(lists);
    for (var i = 0; i < groups.length; i++)
    {
        name += groups[i].group;
    }
    re = entityConversionRegexes[direction][name];
    if (!re)
    {
        var list = {};
        if (groups.length > 1)
        {
            for (i = 0; i < groups.length; i++)
            {
                var aList = entityConversionLists[direction][groups[i].group];
                var aListKeys = Object.keys(aList).forEach(function (key) {
                      list[key] = aList[key];
                });
            }
        }
        else if (groups.length===1)
        {
            list = entityConversionLists[direction][groups[0].group]; // faster for special case
        }
        else
        {
            list = {}; // perhaps should print out an error here?
        }
        re = entityConversionRegexes[direction][name] = escapeEntitiesRegEx[direction](list);
    }
    return re;
}

function createSimpleEscape(name, direction)
{
    return function(value)
    {
        var list = entityConversionLists[direction][name];
        return String(value).replace(
                getEscapeRegexp(direction, {
                    group : name,
                    list : list
                }),
                function(ch)
                {
                    return list[ch];
                }
               );
    }
}

function escapeGroupsForEntities(str, lists)
{
    lists = [].concat(lists);
    var re = getEscapeRegexp('normal', lists),
        split = String(str).split(re),
        len = split.length,
        results = [],
        cur, r, i, ri = 0, l, list, last = '';
    if (!len)
        return [ {
            str : String(str),
            group : '',
            name : ''
        } ];
    for (i = 0; i < len; i++)
    {
        cur = split[i];
        if (cur == '')
            continue;
        for (l = 0; l < lists.length; l++)
        {
            list = lists[l];
            r = entityConversionLists.normal[list.group][cur];
            // if (cur == ' ' && list.group == 'whitespace' && last == ' ') // only show for runs of more than one space
            //     r = ' ';
            if (r)
            {
                results[ri] = {
                    'str' : r,
                    'class' : list['class'],
                    'extra' : list.extra[cur] ? list['class']
                            + list.extra[cur] : ''
                };
                break;
            }
        }
        // last=cur;
        if (!r)
            results[ri] = {
                'str' : cur,
                'class' : '',
                'extra' : ''
            };
        ri++;
    }
    return results;
}

Str.escapeGroupsForEntities = escapeGroupsForEntities;


// ************************************************************************************************
// String escaping

Str.escapeForTextNode = createSimpleEscape('text', 'normal');
Str.escapeForHtmlEditor = createSimpleEscape('editor', 'normal');
Str.escapeForElementAttribute = createSimpleEscape('attributes', 'normal');
Str.escapeForCss = createSimpleEscape('css', 'normal');
Str.escapeForSourceLine = createSimpleEscape('text', 'normal');
Str.unescapeWhitespace = createSimpleEscape('whitespace', 'reverse');

Str.unescapeForTextNode = function(str)
{
    if (Str.options.showTextNodesWithWhitespace)
        str = Str.unescapeWhitespace(str);

    if (!Str.options.showTextNodesWithEntities)
        str = Str.escapeForElementAttribute(str);

    return str;
};

Str.unescapeForURL = createSimpleEscape('text', 'reverse');

Str.escapeNewLines = function(value)
{
    return value.replace(/\r/gm, "\\r").replace(/\n/gm, "\\n");
};

Str.stripNewLines = function(value)
{
    return typeof(value) == "string" ? value.replace(/[\r\n]/gm, " ") : value;
};

Str.escapeSingleQuoteJS = function(value)
{
    return value.replace("\\", "\\\\", "g").replace(/\r/gm, "\\r")
                .replace(/\n/gm, "\\n").replace("'", "\\'", "g");
};

Str.escapeJS = function(value)
{
    return value.replace("\\", "\\\\", "g").replace(/\r/gm, "\\r")
        .replace(/\n/gm, "\\n").replace('"', '\\"', "g");
};

Str.cropString = function(text, limit, alterText)
{
    if (!alterText)
        alterText = "...";

    // Make sure it's a string.
    text = text + "";

    // Use default limit if necessary.
    if (!limit)
        limit = Str.options.stringCropLength;

    // Crop the string only if a limit is actualy specified.
    if (limit <= 0)
        return text;

    var halfLimit = (limit / 2);
    halfLimit -= 2; // adjustment for alterText's increase in size

    if (text.length > limit)
        return text.substr(0, halfLimit) + alterText + text.substr(text.length-halfLimit);

    return text;
};

Str.lineBreak = function()
{
    if (navigator.appVersion.indexOf("Win") != -1)
    {
      return '\r\n';
    }

    if (navigator.appVersion.indexOf("Mac") != -1)
    {
      return '\r';
    }

    return '\n';
};

Str.cropMultipleLines = function(text, limit)
{
    return this.escapeNewLines(this.cropString(text, limit));
};

Str.isWhitespace = function(text)
{
    return !reNotWhitespace.exec(text);
};

Str.splitLines = function(text)
{
    if (!text)
        return [];

    var reSplitLines2 = /.*(:?\r\n|\n|\r)?/mg;
    var lines;
    if (text.match)
    {
        lines = text.match(reSplitLines2);
    }
    else
    {
        var str = text+"";
        lines = str.match(reSplitLines2);
    }
    lines.pop();
    return lines;
};

Str.trim = function(text)
{
    return text.replace(/^\s*|\s*$/g,"");
};

Str.trimLeft = function(text)
{
    return text.replace(/^\s+/,"");
};

Str.trimRight = function(text)
{
    return text.replace(/\s+$/,"");
};

Str.wrapText = function(text, noEscapeHTML)
{
    var reNonAlphaNumeric = /[^A-Za-z_$0-9'"-]/;

    var html = [];
    var wrapWidth = Str.options.textWrapWidth;

    // Split long text into lines and put every line into a <code> element (only in case
    // if noEscapeHTML is false). This is useful for automatic scrolling when searching
    // within response body (in order to scroll we need an element).
    // Don't use <pre> elements since this adds additional new line endings when copying
    // selected source code using Firefox->Edit->Copy (Ctrl+C) (issue 2093).
    var lines = Str.splitLines(text);
    for (var i = 0; i < lines.length; ++i)
    {
        var line = lines[i];

        if (wrapWidth > 0)
        {
            while (line.length > wrapWidth)
            {
                var m = reNonAlphaNumeric.exec(line.substr(wrapWidth, 100));
                var wrapIndex = wrapWidth + (m ? m.index : 0);
                var subLine = line.substr(0, wrapIndex);
                line = line.substr(wrapIndex);

                if (!noEscapeHTML) html.push("<code class=\"wrappedText focusRow\" role=\"listitem\">");
                html.push(noEscapeHTML ? subLine : Str.escapeForTextNode(subLine));
                if (!noEscapeHTML) html.push("</code>");
            }
        }

        if (!noEscapeHTML) html.push("<code class=\"wrappedText focusRow\" role=\"listitem\">");
        html.push(noEscapeHTML ? line : Str.escapeForTextNode(line));
        if (!noEscapeHTML) html.push("</code>");
    }

    return html;
};

Str.insertWrappedText = function(text, textBox, noEscapeHTML)
{
    var html = Str.wrapText(text, noEscapeHTML);
    textBox.innerHTML = "<pre role=\"list\">" + html.join("") + "</pre>";
};

// ************************************************************************************************
// Indent

var reIndent = /^(\s+)/;

function getIndent(line)
{
    var m = reIndent.exec(line);
    return m ? m[0].length : 0;
};

Str.cleanIndentation = function(text)
{
    var lines = Str.splitLines(text);

    var minIndent = -1;
    for (var i = 0; i < lines.length; ++i)
    {
        var line = lines[i];
        var indent = getIndent(line);
        if (minIndent == -1 && line && !Str.isWhitespace(line))
            minIndent = indent;
        if (indent >= minIndent)
            lines[i] = line.substr(minIndent);
    }
    return lines.join("");
};

// ************************************************************************************************
// Formatting

Str.formatNumber = function(number)
{
    number += "";
    var x = number.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    return x1 + x2;
};

Str.formatSize = function(bytes)
{
    var negative = (bytes < 0);
    bytes = Math.abs(bytes);

    var sizeToStringPrecision = Str.options.sizeToStringPrecision;

    // Get size precision (number of decimal places from the preferences)
    // and make sure it's within limits.
    sizeToStringPrecision = (sizeToStringPrecision > 2) ? 2 : sizeToStringPrecision;
    sizeToStringPrecision = (sizeToStringPrecision < -1) ? -1 : sizeToStringPrecision;

    var result;

    if (sizeToStringPrecision == -1)
        result = bytes + " B";

    var a = Math.pow(10, sizeToStringPrecision);

    if (bytes == -1 || bytes == undefined)
        return "?";
    else if (bytes == 0)
        return "0";
    else if (bytes < 1024)
        result = bytes + " B";
    else if (bytes < (1024*1024))
        result = Math.round((bytes/1024)*a)/a + " KB";
    else
        result = Math.round((bytes/(1024*1024))*a)/a + " MB";

    return negative ? "-" + result : result;
};

Str.formatTime = function(elapsed)
{
    if (elapsed == -1)
        return "";
    else if (elapsed == 0)
        return "0";
    else if (elapsed < 1000)
        return elapsed + "ms";
    else if (elapsed < 60000)
        return (Math.round(elapsed/10) / 100) + "s";
    else
    {
        var min = Math.floor(elapsed/60000);
        var sec = (elapsed % 60000);
        return min + "m " + (Math.round((elapsed/1000)%60)) + "s";
    }
};


// ********************************************************************************************* //

return Str;

// ********************************************************************************************* //
});
