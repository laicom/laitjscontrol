<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<html>
<head>
<title>����Ŀ¼���ؼ�ʾ��--ASP��̨���س���</title>
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
''���ص�һ���ڵ�ʱ��Ӧ��idΪ-1
if parentid="-1" then
	Response.Write("var toNode=tree.root;")
else
	''�ڵ�ļ�ֵ���������n1,n2,n3........
	Response.Write("var toNode=tree.nodes['n" & parentid & "'];")
end if
while not adRs.EOF
'''���icon�ֶβ�Ϊ�գ�ͼ��ȡ���ݿ��ֵ����������Ƿ��ӽڵ�ȡ"folder"��"file"����Ӧ��imagelistӦ�ṩ��������ֵ��ͼ��
	if(adRs("icon")<>"") then
		icon=adRs("icon")
	elseif(adRs("childNum")=0) then
		icon="file"
	else
		icon="folder"
	end if
	''�����ӽڵ�Ĵ���,���������������ֵ��
	Response.Write "tree.add(toNode,'last','" & adRs("text") & "','" & "n" & adRs("id") & "','" & icon & "','" & adRs("exeCategory") & "','" & adRs("exeArgv") & "');"
	adRs.MoveNext
wend 
Response.Write("</script>")
%>
<p align="center">copywrite by ������ 2003/7 All right reserved</p>
<p align="center">Email: <a href="mailto:a@lai.com.cn">a@lai.com.cn</a> website: 
<a href="http://www.9499.net">http://www.9499.net</a></p>
</body>
</html>
