Imports System.IO

Public Class SeeFiles
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Not IsPostBack Then

            Dim lst = DirectCast(Session("SeeFilesDct"), List(Of String))
            If lst IsNot Nothing Then

                Response.Write("<script>")
                Response.Write("window.open('SeeFiles.aspx')")
                Response.Write("</script>")

            End If

        Else

        End If

    End Sub

End Class