var colorsNow;

function changeTheme() {
    try {
        var colors = JSON.parse(
            window.localStorage.getItem('__theme')
        );
    } catch (error) {}
    if (!colors) {
        return;
    }
    var keys = ['background', 'background-color', 'color', 'border-color'];
    var rules = document.styleSheets[0].rules;
    if (!rules) {
        return;
    }
    rules = [].slice.call(rules).filter(function(val) {
        return (
            val.style &&
            (val.style.background ||
                val.style['background-color'] ||
                val.style.color ||
                val.style['border-color'])
        );
    });
    for (var index = 0; index < rules.length; index++) {
        var rule = rules[index];
        Object.keys(colors).forEach(function(key) {
            keys.forEach(function(styleKey) {
                if (rule.style.getPropertyValue(styleKey) === (colorsNow ? colorsNow[key] : key)) {
                    rule.style.setProperty(
                        styleKey,
                        colors[key],
                        rule.style.getPropertyPriority(styleKey)
                    );
                }
            });
        });
    }
    colorsNow = colors;
}
changeTheme();