```less
// 本文件是对 ant-design 相应变量值的覆盖，注意：只需写出要覆盖的变量即可（不需要覆盖的变量不要写）
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
// http://www.iconfont.cn/collections/detail?cid=790

@import '~antd/lib/style/themes/default.less';

// color palettes 调色板
@blue-6: #108ee9;
@green-6: #00a854;
@red-6: #f04134;
@yellow-6: #ffbf00;

// The prefix to use on all css classes from ant. 用于 ant 的所有 css 类的前缀
@ant-prefix             : ant;

// -------- Colors 颜色 -----------
@primary-color          : @blue-6;   // 主色
@info-color             : @blue-6;   // 信息色
@success-color          : @green-6;  // 成功色
@error-color            : @red-6;    // 错误色
@highlight-color        : @red-6;    // 高亮色
@warning-color          : @yellow-6; // 警告色
@normal-color           : #d9d9d9;   // 正常色

// Color used by default to control hover and active backgrounds and for
// alert info backgrounds.
// 默认颜色，用于控制 hover 和 active 时的背景色，alert 信息的背景色
@primary-1: color(~`colorPalette("@{primary-color}", 1)`);  // replace tint(@primary-color, 90%)
@primary-2: color(~`colorPalette("@{primary-color}", 2)`);  // replace tint(@primary-color, 80%)

// unused 未使用
@primary-3: color(~`colorPalette("@{primary-color}", 3)`);
@primary-4: color(~`colorPalette("@{primary-color}", 4)`);

// Color used to control the text color in many active and hover states.
// 用于控制许多 active 和 hover 状态下文本的颜色
@primary-5: color(~`colorPalette("@{primary-color}", 5)`);  // replace tint(@primary-color, 20%)
@primary-6: @primary-color;                                 // don't use, use @primary-color 不要用

// Color used to control the text color of active buttons.
// 用于控制 active 状态的按钮文本的颜色
@primary-7: color(~`colorPalette("@{primary-color}", 7)`);  // replace shade(@primary-color, 5%)

// unused 未使用
@primary-8: color(~`colorPalette("@{primary-color}", 8)`);
@primary-9: color(~`colorPalette("@{primary-color}", 9)`);
@primary-10: color(~`colorPalette("@{primary-color}", 10)`);

// Base Scaffolding Variables 基础脚手架变量
// ---

// Background color for `<body>` 设置 body 的背景色
@body-background        : #fff;

// Base background color for most components 大多数组件的背景色
@component-background   : #fff;

// 非数字字体
// @font-family-no-number  : -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", crosoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;

// 数字字体
@font-family            : "Helvetica Neue For Number", @font-family-no-number;

// 代码字体
@code-family            : Consolas, Menlo, Courier, monospace;

@heading-color          : fade(#000, 85%);         // 标题颜色
@text-color             : fade(#000, 65%);         // 文本颜色
@text-color-secondary   : fade(#000, 43%);         // 次要文本颜色
@heading-color-dark     : fade(#fff, 97%);         // 标题颜色-黑暗主题
@text-color-dark        : fade(#fff, 91%);         // 文本颜色-黑暗主题
@text-color-secondary-dark: fade(#fff, 67%);       // 次要文本颜色-黑暗主题

@font-size-base         : 12px;                    // 文字大小-基础
@font-size-lg           : @font-size-base + 2px;   // 文字大小-大码
@line-height-base       : 1.5;                     // 行高-基础

@border-radius-base     : 4px;                     // 圆角-基础，默认：4px
@border-radius-sm       : 2px;                     // 圆角-小码，默认：4px

// The background colors for active and hover states for things like
// list items or table cells.
// 设置列表项或表格单元格在 active 和 hover 状态时的背景色
@item-active-bg         : @primary-1;
@item-hover-bg          : @primary-1;

// ICONFONT 图标字体
@iconfont-css-prefix    : anticon;
@icon-url               : "https://at.alicdn.com/t/font_zck90zmlh7hf47vi";

// LINK 链接
@link-color             : @primary-color;
@link-hover-color       : @primary-5;
@link-active-color      : @primary-7;
@link-hover-decoration  : none;

// Animation 动画
@ease-out            : cubic-bezier(0.215, 0.61, 0.355, 1);
@ease-in             : cubic-bezier(0.55, 0.055, 0.675, 0.19);
@ease-in-out         : cubic-bezier(0.645, 0.045, 0.355, 1);
@ease-out-back       : cubic-bezier(0.12, 0.4, 0.29, 1.46);
@ease-in-back        : cubic-bezier(0.71, -0.46, 0.88, 0.6);
@ease-in-out-back    : cubic-bezier(0.71, -0.46, 0.29, 1.46);
@ease-out-circ       : cubic-bezier(0.08, 0.82, 0.17, 1);
@ease-in-circ        : cubic-bezier(0.6, 0.04, 0.98, 0.34);
@ease-in-out-circ    : cubic-bezier(0.78, 0.14, 0.15, 0.86);
@ease-out-quint      : cubic-bezier(0.23, 1, 0.32, 1);
@ease-in-quint       : cubic-bezier(0.755, 0.05, 0.855, 0.06);
@ease-in-out-quint   : cubic-bezier(0.86, 0, 0.07, 1);

// Border color 边框颜色
@border-color-base      : #d9d9d9;        // base border outline a component 组件轮廓边框的颜色
@border-color-split     : #e9e9e9;        // split border inside a component 组件内部分隔线的颜色
@border-width-base      : 1px;            // width of the border for a component 组件边框宽度
@border-style-base      : solid;          // style of a components border 组件边框类型

// Outline 轮廓
@outline-blur-size      : 0;               // 轮廓模糊大小
@outline-width          : 2px;             // 轮廓宽度
@outline-color          : @primary-color;  // 轮廓颜色

// Default background color for disabled states, Collapse wrappers,
// and several active and hover states.
// 设置禁用状态、折叠包装的背景色，以及个别 active 和 hover 状态
@background-color-base  : #f7f7f7;
@background-color-active: #eee;

// Disabled states 禁用状态
@disabled-color         : fade(#000, 25%);         // 禁用颜色
@disabled-bg            : @background-color-base;  // 禁用背景色
@disabled-color-dark    : fade(#fff, 35%);         // 禁用颜色-黑暗主题

// Shadow 阴影
@shadow-color           : rgba(0, 0, 0, .2);
@box-shadow-base        : @shadow-1-down;
@shadow-1-up            : 0 -1px 6px @shadow-color;
@shadow-1-down          : 0 1px 6px @shadow-color;
@shadow-1-left          : -1px 0 6px @shadow-color;
@shadow-1-right         : 1px 0 6px @shadow-color;
@shadow-2               : 0 2px 8px @shadow-color;

// Buttons 按钮
@btn-font-weight        : 500;                     // 按钮文字重量
@btn-border-radius-base : @border-radius-base;     // 按钮边框圆角-基本
@btn-border-radius-sm   : @border-radius-base;     // 按钮边框圆角-小码

// 主色按钮
@btn-primary-color      : #fff;
@btn-primary-bg         : @primary-color;

// 默认按钮
@btn-default-color      : @text-color;
@btn-default-bg         : #fff;
@btn-default-border     : @border-color-base;

// 危险按钮
@btn-danger-color       : @error-color;
@btn-danger-bg          : @background-color-base;
@btn-danger-border      : @border-color-base;

// 禁用按钮
@btn-disable-color      : @disabled-color;
@btn-disable-bg         : @disabled-bg;
@btn-disable-border     : @border-color-base;

@btn-font-size-lg       : @font-size-lg;       // 按钮文本-大码
@btn-padding-base       : 0 15px;              // 按钮内边距-基本
@btn-padding-lg         : @btn-padding-base;   // 按钮内边距-大码
@btn-padding-sm         : 0 7px;               // 按钮内边距-小码

@btn-height-base        : 28px;                // 按钮高度-基本
@btn-height-lg          : 32px;                // 按钮高度-大码
@btn-height-sm          : 22px;                // 按钮高度-小码

@btn-circle-size        : @btn-height-base;    // 按钮圈大小-基本
@btn-circle-size-lg     : @btn-height-lg;      // 按钮圈大小-大码
@btn-circle-size-sm     : @btn-height-sm;      // 按钮圈大小-小码

@btn-group-border       : @primary-7;          // 按钮组边框颜色

// Radio buttons 单选按钮
@radio-button-bg           : @btn-default-bg;      // 单选按钮背景颜色
@radio-button-color        : @btn-default-color;   // 单选按钮文字颜色

// Media queries breakpoints 媒体查询断点
// Extra small screen / phone 附加小屏幕/手机
@screen-xs              : 480px;
@screen-xs-min          : @screen-xs;

// Small screen / tablet 小屏幕/平板
@screen-sm              : 768px;
@screen-sm-min          : @screen-sm;

// Medium screen / desktop 中等/桌面
@screen-md              : 992px;
@screen-md-min          : @screen-md;

// Large screen / wide desktop 大屏/宽桌面
@screen-lg              : 1200px;
@screen-lg-min          : @screen-lg;

// Extra Large screen / full hd 附加 大屏/全高清
@screen-xl              : 1600px;
@screen-xl-min          : @screen-xl;

// provide a maximum 提供最大值
@screen-xs-max          : (@screen-sm-min - 1px);
@screen-sm-max          : (@screen-md-min - 1px);
@screen-md-max          : (@screen-lg-min - 1px);
@screen-lg-max          : (@screen-xl-min - 1px);

// Grid system 网格系统
@grid-columns           : 24;  // 网格列数
@grid-gutter-width      : 0;   // 网格间隔宽度

// Layout 布局
@layout-body-background      : #ececec;                    // 布局-主体-背景色
@layout-header-background    : #404040;                    // 布局-头部-背景色
@layout-header-height        : 64px;                       // 布局-头部-高度
@layout-header-padding       : 0 50px;                     // 布局-头部-内边距
@layout-footer-padding       : 24px 50px;                  // 布局-底部-内边距
@layout-sider-background     : @layout-header-background;  // 布局-侧栏-背景色
@layout-trigger-height       : 48px;                       // 布局-侧栏-触发器-高度
@layout-trigger-background   : tint(@heading-color, 20%);  // 布局-侧栏-触发器-背景颜色
@layout-trigger-color        : #fff;                       // 布局-侧栏-触发器-文本颜色
@layout-zero-trigger-width   : 36px;                       // 布局-侧栏-零触发器-宽度
@layout-zero-trigger-height  : 42px;                       // 布局-侧栏-零触发器-高度

// z-index list 层级列表
@zindex-affix           : 10;      // 固钉
@zindex-back-top        : 10;      // 回到顶部
@zindex-modal-mask      : 1000;    // 模态遮罩
@zindex-modal           : 1000;    // 模态
@zindex-notification    : 1010;    // 通知
@zindex-message         : 1010;    // 消息
@zindex-popover         : 1030;    // 气泡
@zindex-picker          : 1050;    // 选择框（日期选择）
@zindex-dropdown        : 1050;    // 下拉框（下拉列表）
@zindex-tooltip         : 1060;    // 文字提示

// Animation 动画
@animation-duration-slow: .3s; // 动画持续时间-长，如：Modal
@animation-duration-base: .2s; // 动画持续时间-基本
@animation-duration-fast: .1s; // 动画持续时间-短，如：Tooltip

// Form 表单
// ---
@label-required-color        : @highlight-color;   // 文本颜色-必填项
@label-color                 : @heading-color;     // 文本颜色
@form-item-margin-bottom     : 24px;   // 表单项下外边距大小
@form-item-trailing-colon    : true;   // 表单项尾随冒号

// Input 输入框
// ---
@input-height-base           : 28px;                 // 输入框高度-基本
@input-height-lg             : 32px;                 // 输入框高度-大码
@input-height-sm             : 22px;                 // 输入框高度-小码
@input-padding-horizontal    : 7px;                  // 输入框内边距-水平
@input-padding-vertical-base : 4px;                  // 输入框内边距-垂直-基本
@input-padding-vertical-sm   : 1px;                  // 输入框内边距-垂直-大码
@input-padding-vertical-lg   : 6px;                  // 输入框内边距-垂直-小码
@input-placeholder-color     : @disabled-color;      // 输入框占位符文字颜色
@input-color                 : @text-color;          // 输入框文字颜色
@input-border-color          : @border-color-base;   // 输入框边框颜色
@input-bg                    : #fff;                 // 输入框背景色
@input-addon-bg              : #eee;                 // 输入框插件背景色
@input-hover-border-color    : @primary-color;       // 输入框 hover 时边框颜色
@input-disabled-bg           : @disabled-bg;         // 输入框禁用时背景色

// Tooltip 文字提示
// ---
//* Tooltip max width 提示最大宽度
@tooltip-max-width: 250px;
//** Tooltip text color 提示文本颜色
@tooltip-color: #fff;
//** Tooltip background color 提示背景颜色
@tooltip-bg: rgba(64, 64, 64, .85);
//** Tooltip arrow width 提示箭头宽度
@tooltip-arrow-width: 5px;
//** Tooltip distance with trigger 提示触发距离
@tooltip-distance: @tooltip-arrow-width - 1px + 4px;
//** Tooltip arrow color 提示箭头颜色
@tooltip-arrow-color: @tooltip-bg;

// Popover 气泡
// ---
//** Popover body background color 气泡主体背景色
@popover-bg: #fff;
//** Popover text color 气泡文本颜色
@popover-color: @text-color;
//** Popover maximum width 气泡最大宽度
@popover-min-width: 177px;
//** Popover arrow width 气泡箭头宽度
@popover-arrow-width: 4px;
//** Popover arrow color 气泡箭头颜色
@popover-arrow-color: @popover-bg;
//** Popover outer arrow width 气泡外部箭头宽度
@popover-arrow-outer-width: (@popover-arrow-width + 1px);
//** Popover outer arrow color 气泡外部箭头颜色
@popover-arrow-outer-color: fadeout(@border-color-base, 30%);
//** Popover distance with trigger 气泡触发距离
@popover-distance: @popover-arrow-width + 4px;

// Modal 模态
// --
@modal-mask-bg: rgba(55, 55, 55, 0.6);   // 模态遮罩背景色

// Progress 进度条
// --
@process-default-color: @primary-color;              // 进度条默认颜色
@progress-remaining-color: @background-color-base;   // 进度条剩余颜色

// Menu 菜单
// ---
@menu-dark-bg: @layout-header-background;    // 菜单背景色-黑暗主题
@menu-dark-submenu-bg: #333;                 // 子菜单背景色-黑暗主题
@menu-collapsed-width: 64px;                 // 菜单折叠宽度

// Spin 加载中
// ---
@spin-dot-size-sm: 14px;   // 转动点大小-小码
@spin-dot-size: 20px;      // 转动点大小
@spin-dot-size-lg: 32px;   // 转动点大小-大码

// Table 表格
// --
@table-header-bg: @background-color-base;          // 表格头部背景色
@table-header-sort-bg: @background-color-active;   // 表格头部列背景色
@table-row-hover-bg: @primary-1;                   // 表格行 hover 背景色
@table-selected-row-bg: #fafafa;                   // 表格选中行背景色
@table-padding-vertical: 16px;                     // 表格内边距-垂直
@table-padding-horizontal: 8px;                    // 表格内边距-水平

// Tag 标签
// --
@tag-default-bg: #f3f3f3;          // 标签默认背景色
@tag-default-color: @text-color;   // 标签默认文本色
@tag-font-size: @font-size-base;   // 标签文字大小

// TimePicker 时间选择
// ---
@time-picker-panel-column-width: 56px;                           // 时间选择面板-列宽度
@time-picker-panel-width: @time-picker-panel-column-width * 3;   // 时间选择面板-宽度
@time-picker-selected-bg: @background-color-base;                // 时间选择选中背景色

// Carousel 走马灯
// ---
@carousel-dot-width: 16px;         // 走马灯点宽度
@carousel-dot-height: 3px;         // 走马灯点高度
@carousel-dot-active-width: 24px;  // 走马灯点激活时宽度

// Badge 徽标数
// ---
@badge-height: 20px;               // 徽标数高度
@badge-dot-size: 8px;              // 徽标数点大小
@badge-font-size: @font-size-base; // 徽标数文字大小

// Rate 评分
// ---
@rate-star-color: #f5a623;   // 评分星星颜色
@rate-star-bg: #e9e9e9;      // 评分星星背景色

// Card 卡片
// ---
@card-head-height: 48px;                         // 卡片头部高度
@card-head-color: @heading-color;                // 卡片头部文本颜色
@card-head-background: @component-background;    // 卡片头部背景色

// Tabs 标签页
// ---
@tabs-card-head-background: #f9f9f9;   // 标签卡头部背景色
@tabs-title-font-size: @font-size-lg;  // 标签标题文字大小

// BackTop 回到顶部
@back-top-color: #fff;                       // 回到顶部文本颜色
@back-top-bg: rgba(64, 64, 64, 0.4);         // 回到顶部背景颜色
@back-top-hover-bg: rgba(64, 64, 64, 0.6);   // 回到顶部 hover 时背景颜色

// Avatar 头像
@avatar-size-base: 32px;                       // 头像大小-基本
@avatar-size-lg: 40px;                         // 头像大小-大码
@avatar-size-sm: 24px;                         // 头像大小-小码
@avatar-font-size-base: 18px;                  // 头像文本大小-基本
@avatar-font-size-lg: 24px;                    // 头像文本大小-大码
@avatar-font-size-sm: 14px;                    // 头像文本大小-小码
@avatar-bg: #ccc;                              // 头像背景颜色
@avatar-color: #fff;                           // 头像文本颜色
@avatar-border-radius: @border-radius-base;    // 头像圆角
```
