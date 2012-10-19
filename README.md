## jQuery StickyButtons

A jQuery plugin for making buttons stick to the top of the page when
user scrolls down a page so that the buttons are always visible.


### A typical usecase 

when a user scrolls down a page to fill in a long form with details,
the action buttons such as ``save`` and ``cancel`` get _stuck_ to the
top of the page so that the user doesn't need to scroll back to the
top again to click on them.

Such behaviour is observed in administration panel of
Magento installation.


### Usage

```javascript

    $("form > button").stickybuttons(options);
    
```


### Available options with their default values

```javascript

    var options = {
        menuBg: '#2c2c2c',
        menuHeight: '20px;',
        menuPadding: '5px 1%',
        menuBtnMargin: '10px'
    };
    
```

There are no external dependencies other than
[jQuery](http://jquery.com).

