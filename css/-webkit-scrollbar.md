# ::-webkit-scrollbar

1. 滚动条的大小通过 ::-webkit-scrollbar 设置，width 设置垂直滚动条的宽度，height 设置水平滚动条的高度
2. 滚动条的其他部件不能设置宽度和高度，其宽度或高度跟随滚动条的大小


```css
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 11px;
  height: 11px;
}

/* 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条） */
::-webkit-scrollbar-thumb {
  border: 1px solid #000;
  background: #999;
}


/* 滚动条的轨道（里面装有Thumb） */
::-webkit-scrollbar-track {
  border: 1px solid #000;
  background: #f00;
}

::-webkit-scrollbar-track:vertical{background-clip:padding-box}

/* 内层轨道，滚动条中间部分（除去） */
::-webkit-scrollbar-track-piece {
  border: 4px solid #f00;
  background: #ff0;
}

/* 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。 */
::-webkit-scrollbar-button {
  display: none;
}

/* 边角，即两个滚动条的交汇处 */
::-webkit-scrollbar-corner {
  width: 11px;
  height: 11px;
  background: #f0f;
}

/* 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件 */
::-webkit-resizer {}

/* horizontal 伪类适用于任何水平方向上的滚动条 */
:horizontal {}

/* vertical 伪类适用于任何垂直方向的滚动条 */
:vertical {}

/* decrement 伪类适用于按钮和轨道碎片。表示递减的按钮或轨道碎片，例如可以使区域向上或者向右移动的区域和按钮 */
:decrement {}

/* increment 伪类适用于按钮和轨道碎片。表示递增的按钮或轨道碎片，例如可以使区域向下或者向左移动的区域和按钮 */
:increment {}

/* start 伪类适用于按钮和轨道碎片。表示对象（按钮 轨道碎片）是否放在滑块的前面 */
:start {}

/* end 伪类适用于按钮和轨道碎片。表示对象（按钮 轨道碎片）是否放在滑块的后面 */
:end {}

/* double-button 伪类适用于按钮和轨道碎片。判断轨道结束的位置是否是一对按钮。也就是轨道碎片紧挨着一对在一起的按钮。 */
:double-button {}

/* single-button 伪类适用于按钮和轨道碎片。判断轨道结束的位置是否是一个按钮。也就是轨道碎片紧挨着一个单独的按钮。 */
:single-button {}

/* no-button 伪类表示轨道结束的位置没有按钮。 */
:no-button {}

/* corner-present 伪类表示滚动条的角落是否存在。 */
:corner-present {}

/* 适用于所有滚动条，表示包含滚动条的区域，焦点不在该窗口的时候。 */
:window-inactive {}

/* 滚动条上半边或左半边 */
::-webkit-scrollbar-track-piece:start {}

/* 焦点不在当前区域滑块的状态 */
::-webkit-scrollbar-thumb:window-inactive {}

/* 当鼠标在水平滚动条下面的按钮上的状态 */
::-webkit-scrollbar-button:horizontal:decrement:hover {}
```



```css
::-webkit-scrollbar{width:16px;height:16px}
::-webkit-scrollbar{width:16px;height:16px}
::-webkit-scrollbar{width:16px;height:16px}
::-webkit-scrollbar{width:16px;height:16px}
::-webkit-scrollbar{width:16px;height:16px}
::-webkit-scrollbar{height:12px;overflow:visible;width:12px}
::-webkit-scrollbar{display:none}
::-webkit-scrollbar{height:15px;width:15px}
::-webkit-scrollbar{height:15px;width:15px}
::-webkit-scrollbar{background-color:#fff}
::-webkit-scrollbar{display:none}
::-webkit-scrollbar{width:14px;height:14px;overflow:visible}
::-webkit-scrollbar{width:14px;height:14px;overflow:visible}
::-webkit-scrollbar{display:none}

::-webkit-scrollbar:horizontal{display:none}
::-webkit-scrollbar:horizontal{display:block!important}

::-webkit-scrollbar-button{height:0;width:0}
::-webkit-scrollbar-button{height:0;width:0}
::-webkit-scrollbar-button{height:0;width:0}
::-webkit-scrollbar-button{height:0;width:0}
::-webkit-scrollbar-button{height:0;width:0}
::-webkit-scrollbar-button{width:0;height:0;display:none}
::-webkit-scrollbar-button{width:0;height:0;display:none}
::-webkit-scrollbar-button{width:0;height:0;display:none}
::-webkit-scrollbar-button{width:0;height:0;display:none}
::-webkit-scrollbar-button{width:0;height:0;display:none}

::-webkit-scrollbar-button:start:decrement{display:block}
::-webkit-scrollbar-button:start:decrement{display:block}

::-webkit-scrollbar-button:end:increment{display:block}
::-webkit-scrollbar-button:end:increment{display:block}

::-webkit-scrollbar-button:vertical:start:increment{display:none}
::-webkit-scrollbar-button:vertical:start:increment{display:none}

::-webkit-scrollbar-button:vertical:end:decrement{display:none}
::-webkit-scrollbar-button:vertical:end:decrement{display:none}

::-webkit-scrollbar-corner{background-color:transparent}
::-webkit-scrollbar-corner{background-color:transparent}
::-webkit-scrollbar-corner{background-color:transparent}
::-webkit-scrollbar-corner{background-color:transparent}
::-webkit-scrollbar-corner{background-color:transparent}
::-webkit-scrollbar-corner{background-color:#fff}
::-webkit-scrollbar-corner{background:transparent}

::-webkit-scrollbar-track{background-clip:padding-box;border:solid transparent;width:16px;border-width:0 0 0 4px}
::-webkit-scrollbar-track{background-clip:padding-box;border:solid transparent;width:16px;border-width:0 0 0 4px}
::-webkit-scrollbar-track{background-color:transparent;-webkit-box-shadow:none!important;box-shadow:none!important;border:none}
::-webkit-scrollbar-track{background-color:rgba(255,255,255,0.1)}
::-webkit-scrollbar-track{background-color:rgba(0,0,0,0.1)}

::-webkit-scrollbar-track:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset 1px 0 0 rgba(0,0,0,0.1);box-shadow:inset 1px 0 0 rgba(0,0,0,0.1)}
::-webkit-scrollbar-track:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset 1px 0 0 rgba(0,0,0,0.1);box-shadow:inset 1px 0 0 rgba(0,0,0,0.1)}

::-webkit-scrollbar-track:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 1px 0 0 rgba(0,0,0,0.14),inset -1px 0 0 rgba(0,0,0,0.07);box-shadow:inset 1px 0 0 rgba(0,0,0,0.14),inset -1px 0 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 1px 0 0 rgba(0,0,0,0.14),inset -1px 0 0 rgba(0,0,0,0.07);box-shadow:inset 1px 0 0 rgba(0,0,0,0.14),inset -1px 0 0 rgba(0,0,0,0.07)}

::-webkit-scrollbar-track:vertical{background-clip:padding-box}
::-webkit-scrollbar-track:vertical{border-left:6px solid transparent;border-right:1px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-track:vertical{border-left:6px solid transparent;border-right:1px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-track:vertical{border-left:6px solid transparent;border-right:1px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-track:vertical{border-left:6px solid transparent;border-right:1px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-track:vertical{border-left:5px solid transparent;border-right:0 solid transparent}

::-webkit-scrollbar-track:vertical:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:vertical:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:vertical:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:vertical:hover{background-color:rgba(255,255,255,0.07);-webkit-box-shadow:inset 1px 1px 0 rgba(255,255,255,0.28),inset -1px -1px 0 rgba(255,255,255,0.14)}
::-webkit-scrollbar-track:vertical:hover{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 1px 0 0 rgba(0,0,0,0.10)}
::-webkit-scrollbar-track:vertical:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}

::-webkit-scrollbar-track:vertical:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:vertical:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:vertical:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:vertical:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:vertical:active{background-color:rgba(255,255,255,0.10);-webkit-box-shadow:inset 1px 1px 0 rgba(255,255,255,0.28),inset -1px -1px 0 rgba(255,255,255,0.14)}
::-webkit-scrollbar-track:vertical:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.14),inset -1px -1px 0 rgba(0,0,0,0.07)}

::-webkit-scrollbar-track:horizontal{border-top:6px solid transparent;border-bottom:1px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-track:horizontal{border-top:6px solid transparent;border-bottom:1px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-track:horizontal{border-top:6px solid transparent;border-bottom:1px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-track:horizontal{border-top:6px solid transparent;border-bottom:1px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-track:horizontal{border-top:5px solid transparent;border-bottom:0 solid transparent}
::-webkit-scrollbar-track:horizontal{border-width:4px 0 0}
::-webkit-scrollbar-track:horizontal{border-width:4px 0 0}

::-webkit-scrollbar-track:horizontal:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:hover{background-color:rgba(255,255,255,0.07);-webkit-box-shadow:inset -1px 1px 0 rgba(255,255,255,0.28),inset 1px -1px 0 rgba(255,255,255,0.14)}
::-webkit-scrollbar-track:horizontal:hover{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset 0 1px 0 rgba(0,0,0,0.10)}
::-webkit-scrollbar-track:horizontal:hover{background-color:rgba(0,0,0,0.035);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:hover{-webkit-box-shadow:inset 0 1px 0 rgba(0,0,0,0.1);box-shadow:inset 0 1px 0 rgba(0,0,0,0.1)}
::-webkit-scrollbar-track:horizontal:hover{-webkit-box-shadow:inset 0 1px 0 rgba(0,0,0,0.1);box-shadow:inset 0 1px 0 rgba(0,0,0,0.1)}

::-webkit-scrollbar-track:horizontal:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:active{background-color:rgba(255,255,255,0.10);-webkit-box-shadow:inset -1px 1px 0 rgba(255,255,255,0.28),inset 1px -1px 0 rgba(255,255,255,0.14)}
::-webkit-scrollbar-track:horizontal:active{background-color:rgba(0,0,0,0.05);-webkit-box-shadow:inset -1px 1px 0 rgba(0,0,0,0.14),inset 1px -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:active{-webkit-box-shadow:inset 0 1px 0 rgba(0,0,0,0.14),inset 0 -1px 0 rgba(0,0,0,0.07);box-shadow:inset 0 1px 0 rgba(0,0,0,0.14),inset 0 -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-track:horizontal:active{-webkit-box-shadow:inset 0 1px 0 rgba(0,0,0,0.14),inset 0 -1px 0 rgba(0,0,0,0.07);box-shadow:inset 0 1px 0 rgba(0,0,0,0.14),inset 0 -1px 0 rgba(0,0,0,0.07)}


::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.2);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.10),inset 0 -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.2);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.10),inset 0 -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.2);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.10),inset 0 -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.2);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.10),inset 0 -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-thumb{background-color:rgba(255,255,255,0.4);-webkit-box-shadow:inset 1px 1px 0 rgba(255,255,255,0.10),inset 0 -1px 0 rgba(255,255,255,0.07)}
::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.2);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.10),inset 0 -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-thumb{min-height:28px;padding-top:100px;background-clip:padding-box;background-color:rgba(0,0,0,0.2);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.1),inset 0 -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-thumb{min-height:28px;padding-top:100px;background-clip:padding-box;background-color:rgba(0,0,0,0.2);-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,0.1),inset 0 -1px 0 rgba(0,0,0,0.07)}
::-webkit-scrollbar-thumb{background-color:#cecece}
::-webkit-scrollbar-thumb{min-height:0!important}
::-webkit-scrollbar-thumb{background-color:rgba(255,255,255,0.9)}
::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.6)}
::-webkit-scrollbar-thumb{background-color:#4c4c4c;background-clip:padding-box;border-style:solid;border-color:transparent;border-width:0 1px 0 0;-webkit-box-shadow:inset 1px 1px 0 #676767,inset 0 -1px 0 #676767;box-shadow:inset 1px 1px 0 #676767,inset 0 -1px 0 #676767;min-height:75px;padding:100px 0 0}
::-webkit-scrollbar-thumb{background-color:rgba(255,255,255,0.75);-webkit-border-radius:1px;border-radius:1px;border-width:0;-webkit-box-shadow:none;box-shadow:none;min-height:56px;padding:0}
::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.5)}
::-webkit-scrollbar-thumb{background-color:#4c4c4c}
::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:rgba(0,0,0,.3);border:5px solid transparent;-webkit-border-radius:10px;border-radius:10px;min-height:20px;min-width:20px;height:5px;width:5px}
::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:rgba(0,0,0,.3);border:5px solid transparent;-webkit-border-radius:10px;border-radius:10px;min-height:20px;min-width:20px;height:5px;width:5px}

::-webkit-scrollbar-thumb:hover{background-color:#919191}
::-webkit-scrollbar-thumb:hover{background-color:#9f9f9f;-webkit-box-shadow:inset 1px 1px 0 #ccc;box-shadow:inset 1px 1px 0 #ccc}
::-webkit-scrollbar-thumb:hover{background-color:rgba(255,255,255,0.9);-webkit-box-shadow:none;box-shadow:none}
::-webkit-scrollbar-thumb:hover{background-color:#9f9f9f}
::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,.4)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,.4)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.4);-webkit-box-shadow:inset 1px 1px 1px rgba(0,0,0,0.25)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.4);-webkit-box-shadow:inset 1px 1px 1px rgba(0,0,0,0.25)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.4);-webkit-box-shadow:inset 1px 1px 1px rgba(0,0,0,0.25)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(255,255,255,0.8);-webkit-box-shadow:inset 1px 1px 1px rgba(255,255,255,0.50)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.4);-webkit-box-shadow:inset 1px 1px 1px rgba(0,0,0,0.25)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.4);-webkit-box-shadow:inset 1px 1px 1px rgba(0,0,0,0.25)}
::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.4);-webkit-box-shadow:inset 1px 1px 1px rgba(0,0,0,0.25)}

::-webkit-scrollbar-thumb:active{background-color:rgba(0,0,0,0.5);-webkit-box-shadow:inset 1px 1px 3px rgba(0,0,0,0.35)}
::-webkit-scrollbar-thumb:active{background-color:rgba(0,0,0,0.5);-webkit-box-shadow:inset 1px 1px 3px rgba(0,0,0,0.35)}
::-webkit-scrollbar-thumb:active{background-color:rgba(0,0,0,0.5);-webkit-box-shadow:inset 1px 1px 3px rgba(0,0,0,0.35)}
::-webkit-scrollbar-thumb:active{background-color:rgba(255,255,255,0.9);-webkit-box-shadow:inset 1px 1px 3px rgba(255,255,255,0.6)}
::-webkit-scrollbar-thumb:active{background-color:rgba(0,0,0,.4)}
::-webkit-scrollbar-thumb:active{background-color:rgba(0,0,0,.4)}
::-webkit-scrollbar-thumb:active{background-color:rgba(0,0,0,0.5);-webkit-box-shadow:inset 1px 1px 3px rgba(0,0,0,0.35)}
::-webkit-scrollbar-thumb:active{-webkit-box-shadow:inset 1px 1px 3px rgba(0,0,0,0.35);background-color:rgba(0,0,0,.5)}
::-webkit-scrollbar-thumb:active{-webkit-box-shadow:inset 1px 1px 3px rgba(0,0,0,0.35);background-color:rgba(0,0,0,.5)}

::-webkit-scrollbar-thumb:vertical{border:0 solid transparent;border-left:5px solid transparent}
::-webkit-scrollbar-thumb:vertical{border:0 solid transparent;border-left:5px solid transparent}
::-webkit-scrollbar-thumb:vertical{background-clip:padding-box;min-height:28px}
::-webkit-scrollbar-thumb:vertical{background-clip:padding-box;border-top:0 solid transparent;border-bottom:0 solid transparent;border-left:6px solid transparent;border-right:1px solid transparent;min-height:28px}
::-webkit-scrollbar-thumb:vertical{background-clip:padding-box;border-top:0 solid transparent;border-bottom:0 solid transparent;border-left:6px solid transparent;border-right:1px solid transparent;min-height:28px}
::-webkit-scrollbar-thumb:vertical{background-clip:padding-box;border-top:0 solid transparent;border-bottom:0 solid transparent;border-left:6px solid transparent;border-right:1px solid transparent;min-height:28px}
::-webkit-scrollbar-thumb:vertical{background-clip:padding-box;border-top:0 solid transparent;border-bottom:0 solid transparent;border-left:6px solid transparent;border-right:1px solid transparent;min-height:28px}
::-webkit-scrollbar-thumb:vertical{border-top:0 solid transparent;border-bottom:0 solid transparent;border-left:5px solid transparent;border-right:0 solid transparent}

::-webkit-scrollbar-thumb:vertical:hover{background-color:rgba(0,0,0,0.4);-webkit-box-shadow:inset 1px 1px 1px rgba(0,0,0,0.25)}

::-webkit-scrollbar-thumb:vertical:active{background-color:rgba(0,0,0,0.5);-webkit-box-shadow:inset 1px 1px 3px rgba(0,0,0,0.35)}

::-webkit-scrollbar-thumb:horizontal{border:0 solid transparent;border-top:5px solid transparent}
::-webkit-scrollbar-thumb:horizontal{border:0 solid transparent;border-top:5px solid transparent}
::-webkit-scrollbar-thumb:horizontal{background-clip:padding-box;min-width:28px}
::-webkit-scrollbar-thumb:horizontal{background-clip:padding-box;border-top:6px solid transparent;border-bottom:1px solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;min-width:28px}
::-webkit-scrollbar-thumb:horizontal{background-clip:padding-box;border-top:6px solid transparent;border-bottom:1px solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;min-width:28px}
::-webkit-scrollbar-thumb:horizontal{background-clip:padding-box;border-top:6px solid transparent;border-bottom:1px solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;min-width:28px}
::-webkit-scrollbar-thumb:horizontal{background-clip:padding-box;border-top:6px solid transparent;border-bottom:1px solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;min-width:28px}
::-webkit-scrollbar-thumb:horizontal{border-top:5px solid transparent;border-bottom:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent}


```
