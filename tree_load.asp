<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<html>
<head>
<title>阿赖目录树控件示例--ASP后台加载程序</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
</head>

<body>
<%
set adCn=Server.CreateObject("Adodb.Connection")
adCn.open "Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" & server.MapPath("tree.mdb")
parentid=Request.QueryString("id")
set adRs=adCn.execute("select * ,(select count(*) from tree where parentid=subTree.id) as childNum from tree subTree where parentid=" & parentid)
Response.Write("<script>")
Response.Write("var tree=self.parent.tree;")
''加载第一级节点时，应设id为-1
if parentid="-1" then
	Response.Write("var toNode=tree.root;")
else
	''节点的键值已依次设成n1,n2,n3........
	Response.Write("var toNode=tree.nodes['n" & parentid & "'];")
end if
while not adRs.EOF
'''如果icon字段不为空，图标取数据库的值，否则根据是否子节点取"folder"或"file"。相应地imagelist应提供这两个键值的图标
	if(adRs("icon")<>"") then
		icon=adRs("icon")
	elseif(adRs("childNum")=0) then
		icon="file"
	else
		icon="folder"
	end if
	''输出添加节点的代码,第三个参数是设键值的
	Response.Write "tree.add(toNode,'last','" & adRs("text") & "','" & "n" & adRs("id") & "','" & icon & "','" & adRs("exeCategory") & "','" & adRs("exeArgv") & "');"
	adRs.MoveNext
wend 
Response.Write("</script>")
%>
<p align="center">copywrite by 赖国欣 2003/7 All right reserved</p>
<p align="center">Email: <a href="mailto:a@lai.com.cn">a@lai.com.cn</a> website: 
<a href="http://www.9499.net">http://www.9499.net</a></p>
</body>
</html>
