<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif!important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .font-family,.el-cascader-menu{
        font-family: 'Avenir', Helvetica, Arial, sans-serif!important;
    }

    body {
        margin: 0;
    }

    .list-question {
        font-size: 12px;
    }

    .list-question-icon {
        margin-left: 8px;
        font-size: 18px;
    }

    .el-dialog__body{
        padding: 10px 20px ;
    }
    .el-submenu__title {
        height: 30px !important;
        line-height: 30px !important;
        color: white !important;
        padding: 0;
    }

    .el-submenu__title:hover {
        background: #5c90ea !important;
    }

    .list-popper {
        position: absolute;
        background: #666 !important;
        min-width: 150px;
        border: 1px solid #ebeef5;
        padding: 12px;
        z-index: 2000;
        color: white;
        line-height: 1.4;
        text-align: justify;
        box-shadow: none;
    }

    .el-popper[x-placement^=right] .popper__arrow::after {
        border-right-color: #666;
    }

    .header-submenu ul.el-menu {
        background-color: white !important;
        padding: 0;
        border-radius: 0;
    }

    .header-submenu ul.el-menu li, .header-submenu ul.el-menu li:hover {
        background-color: white !important;
    }

    .el-menu--horizontal .el-menu {
        margin-top: 0 !important;

    }

    .list-table-header th:first-child, .list-table-row td:first-child {
        padding-left: 40px !important;
    }

    .list-table-header th {
        background: #f2f2f2 !important;
        text-align: center;
        font-size: 16px;
        color: #333;
        padding: 15px 0;
        font-weight: 100;
    }

    .list-main-block {
        position: relative;
        margin: 10px;
        color: #666;
        min-width: 1110px;
    }

    .el-tabs__item {
        font-weight: 700;
        font-size: 16px;
    }

    .text-blue {
        color: #409EFF;
    }
    .text-red {
        color: #f56c6c;
    }

    .userList-table th {
        background: #f2f2f2 !important;
        text-align: center;
        font-size: 13px;
        color: #333;
        font-weight: 600;
    }

    .el-tabs__nav-wrap::after {
        width: 0;
    }

    .list-table-row td {
        padding: 8px 0 !important;
    }
</style>
