<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014/12/3
  Time: 15:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title></title>
    <link href="extjs/resources/css/ext-all-gray-debug.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="extjs/bootstrap.js"></script>
    <script src="extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script src="main2.js" type="text/javascript"></script>
    <script type="text/javascript">
        Ext.onReady(function(){
            Ext.create('main2', {

                renderTo: Ext.getBody()
            }).center();

        });
    </script>
</head>
<body style="background:url('images/login1.jpg'); background-size: 100%">
    <s:hidden id="abc" value="%{#session.username}"></s:hidden>

</body>
</html>
