<%@page import="org.springframework.web.context.WebApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%
    WebApplicationContext context = WebApplicationContextUtils
            .getWebApplicationContext(application);
%>
<%@ page import="java.net.InetAddress" %>
<%@ page import="java.util.Properties" %>
<html>
    <body>
        <h1>Welcome to CAMS-UI !</h1>

        <%
            Properties propertiesBean = Properties.class.cast(context.getBean("cmsProperties"));
            InetAddress localMachine = InetAddress.getLocalHost();
        %>
        <br/>
        <h2><a href="monitoring?output=html" target="_self">Link to the monitoring page</a></h2>
        <h2><a href="properties" target="_self">Link to propeties servlet</a></h2>
        <h2><a href="log" target="_self">Link to logs servlet</a></h2>
        <br/>

        <table border="1">
            <tr>
                <td>Maven version</td>
                <td><%= propertiesBean.getProperty("cams.ui.version") %></td>
            </tr>
            <tr>
                <td>CAR Contracts Version</td>
                <td><%= propertiesBean.getProperty("car-contracts-version") %></td>
            </tr>
            <tr>
                <td>Svn Revision</td>
                <td><%= propertiesBean.getProperty("cams.ui.revision") %></td>
            </tr>
            <tr>
                <td>Build time</td>
                <td><%= propertiesBean.getProperty("cams.ui.build.timestamp") %></td>
            </tr>
            <tr>
                <td>Host</td>
                <td><%= localMachine.getHostName() + "/" + localMachine.getHostAddress() %></td>
            </tr>
        </table>

    </body>
</html>
