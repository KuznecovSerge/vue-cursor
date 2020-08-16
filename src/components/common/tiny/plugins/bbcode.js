const Convert = {
  html2bbcode: function(s) {
    const tools = window.tinyMCE.util.Tools.resolve("tinymce.util.Tools");
    s = tools.trim(s);
    var rep = function(re, str) {
      s = s.replace(re, str);
    };
    rep(/<a.*?href=\"(.*?)\".*?>(.*?)<\/a>/gi, "[url=$1]$2[/url]");
    rep(
      /<font.*?color=\"(.*?)\".*?class=\"codeStyle\".*?>(.*?)<\/font>/gi,
      "[code][color=$1]$2[/color][/code]"
    );
    rep(
      /<font.*?color=\"(.*?)\".*?class=\"quoteStyle\".*?>(.*?)<\/font>/gi,
      "[quote][color=$1]$2[/color][/quote]"
    );
    rep(
      /<font.*?class=\"codeStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi,
      "[code][color=$1]$2[/color][/code]"
    );
    rep(
      /<font.*?class=\"quoteStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi,
      "[quote][color=$1]$2[/color][/quote]"
    );
    rep(
      /<span style=\"color: ?(.*?);\">(.*?)<\/span>/gi,
      "[color=$1]$2[/color]"
    );
    rep(/<font.*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, "[color=$1]$2[/color]");
    rep(
      /<span style=\"font-size:(.*?);\">(.*?)<\/span>/gi,
      "[size=$1]$2[/size]"
    );
    rep(/<font>(.*?)<\/font>/gi, "$1");
    rep(/<img.*?src=\"(.*?)\".*?\/>/gi, "[img]$1[/img]");
    rep(/<span class=\"codeStyle\">(.*?)<\/span>/gi, "[code]$1[/code]");
    rep(/<span class=\"quoteStyle\">(.*?)<\/span>/gi, "[quote]$1[/quote]");
    rep(
      /<strong class=\"codeStyle\">(.*?)<\/strong>/gi,
      "[code][b]$1[/b][/code]"
    );
    rep(
      /<strong class=\"quoteStyle\">(.*?)<\/strong>/gi,
      "[quote][b]$1[/b][/quote]"
    );
    rep(/<em class=\"codeStyle\">(.*?)<\/em>/gi, "[code][i]$1[/i][/code]");
    rep(/<em class=\"quoteStyle\">(.*?)<\/em>/gi, "[quote][i]$1[/i][/quote]");
    rep(/<u class=\"codeStyle\">(.*?)<\/u>/gi, "[code][u]$1[/u][/code]");
    rep(/<u class=\"quoteStyle\">(.*?)<\/u>/gi, "[quote][u]$1[/u][/quote]");
    rep(/<\/(strong|b)>/gi, "[/b]");
    rep(/<(strong|b)>/gi, "[b]");
    rep(/<\/(em|i)>/gi, "[/i]");
    rep(/<(em|i)>/gi, "[i]");
    rep(/<\/u>/gi, "[/u]");
    rep(
      /<span style=\"text-decoration: ?underline;\">(.*?)<\/span>/gi,
      "[u]$1[/u]"
    );
    rep(/<u>/gi, "[u]");
    rep(/<blockquote[^>]*>/gi, "[quote]");
    rep(/<\/blockquote>/gi, "[/quote]");
    rep(/<br \/>/gi, "\n");
    rep(/<br\/>/gi, "\n");
    rep(/<br>/gi, "\n");
    rep(/<p>/gi, "");
    rep(/<\/p>/gi, "\n");
    rep(/&nbsp;|\u00a0/gi, " ");
    rep(/&quot;/gi, '"');
    rep(/&lt;/gi, "<");
    rep(/&gt;/gi, ">");
    rep(/&amp;/gi, "&");
    return s;
  },

  bbcode2html: function(s) {
    const tools = window.tinyMCE.util.Tools.resolve("tinymce.util.Tools");
    s = tools.trim(s);
    var rep = function(re, str) {
      s = s.replace(re, str);
    };
    rep(/\[b\]/gi, "<strong>");
    rep(/\[\/b\]/gi, "</strong>");
    rep(/\[i\]/gi, "<em>");
    rep(/\[\/i\]/gi, "</em>");
    rep(/\[u\]/gi, "<u>");
    rep(/\[\/u\]/gi, "</u>");
    rep(/\[url=([^\]]+)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>');
    rep(/\[url\](.*?)\[\/url\]/gi, '<a href="$1">$1</a>');
    rep(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" />');
    rep(/\[color=(.*?)\](.*?)\[\/color\]/gi, '<font color="$1">$2</font>');
    rep(/\[code\](.*?)\[\/code\]/gi, '<span class="codeStyle">$1</span>&nbsp;');
    rep(
      /\[quote.*?\](.*?)\[\/quote\]/gi,
      '<span class="quoteStyle">$1</span>&nbsp;'
    );

    rep(
      /\[youtube\](?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=|be\.com\/embed\/)([A-Z0-9\-_]+)\[\/youtube\]/gi,
      `<iframe class=\"youtube-player\" width=\"640\" height=\"385\" src=\"//www.youtube.com/embed/$1\" frameborder=\"0\"></iframe>`
    );
    rep(
      /\[video\](.+)?\[\/video\]/gi,
      `<iframe class=\"youtube-player\" width=\"640\" height=\"385\" src=\"$1\" frameborder=\"0\"></iframe>`
    );
    rep(
      /\[size=(\d+)\](.*?)\[\/size\]/gis,
      `<span style=\"font-size:$1%\">$2</span>`
    );

    s = s.replace(
      /[\n\r]*\[list\](.*?)\[\/list\][\n\r]*/gis,
      (whole, s1, s2) => {
        s1 = s1.replace(/\[\*\](.*?)[\n\r]/gis, (whole, ss1, ss2) => {
          ss2 = ss2.replace(/\n\r?/gi, "");
          return `<li>${ss2}</li>`;
        });
        s1 = s1.replace(/\n\r?/gi, "");
        return `<ul>${s1}</ul>`;
      }
    );

    s = s.replace(
      /[\n\r]*\[list=(1|a)\](.*?)\[\/list\][\n\r]*/gis,
      (whole, s1, s2) => {
        const tag =
          s1 == "1"
            ? "<ol>"
            : s1 == "a"
            ? '<ol style="list-style-type: lower-alpha">'
            : "<ol>";

        s2 = s2.replace(/\[\*\](.*?)[\n\r]/gis, (whole, s1, s2) => {
          s1 = s1.replace(/\n\r?/gi, "");
          return `<li>${s1}</li>`;
        });
        s2 = s2.replace(/\n\r?/gi, "");
        return `${tag}${s2}</ol>`;
      }
    );

    rep(/\[br\]/gi, "<br/>");
    rep(/\n\r?/gi, "<br/>");
    return s;
  }
};

const BBCode = {
  name: "bbcodeMonecle",

  onLoad(editor) {
    editor.on("BeforeSetContent", function(e) {
      e.content = Convert.bbcode2html(e.content);
    });
    editor.on("PostProcess", function(e) {
      if (e.set) {
        e.content = Convert.bbcode2html(e.content);
      }
      if (e.get) {
        e.content = Convert.html2bbcode(e.content);
      }
    });
  }
};

export default BBCode;
