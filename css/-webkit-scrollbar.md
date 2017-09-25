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
