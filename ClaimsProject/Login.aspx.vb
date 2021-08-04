Imports System.DirectoryServices

Public Class Login
    Inherits UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Structure messageType
        Const success = "success"
        Const warning = "warning"
        Const info = "info"
        Const [Error] = "Error"
    End Structure

    Protected Sub btnLogin_Click(sender As Object, e As EventArgs) 
        Dim methodMessage As String = Nothing
        Try
            Dim user = txtUser.Text.Trim()
            Dim pass = txtPass.Text.Trim()

            If AuthenticateUser(user, pass) Then
                Response.Redirect("Default.aspx")
            Else
                methodMessage = "There is an error in the credential validation for the user: " + user.ToUpper()
                SendMessage(methodMessage, messageType.info)
            End If
            'SearchOneUser(user)
        Catch ex As Exception

        End Try
    End Sub

    Private Function getLDAPConnectionString(defSearch As String, ByRef strLdap As String, Optional flag As Boolean = False) As Boolean
        Dim blResult As Boolean = False
        Try
            Dim de As DirectoryEntry = New DirectoryEntry("LDAP://RootDSE")
            If de IsNot Nothing Then
                If flag Then
                    strLdap = "LDAP://" + de.Properties("defaultNamingContext")(0).ToString()
                Else
                    strLdap = de.Properties("defaultNamingContext")(0).ToString()
                End If

                'strLdap = If(flag, strLdap = "LDAP://" + de.Properties("defaultNamingContext")(0).ToString(), strLdap = de.Properties("defaultNamingContext")(0).ToString())
                blResult = If(String.IsNullOrEmpty(de.Properties("defaultNamingContext")(0).ToString()), False, True)
            End If

            Return blResult
        Catch ex As Exception
            Dim msg = ex.Message
            Return blResult
        End Try
    End Function

    Public Function AuthenticateUser(userName As String, password As String) As Boolean
        Dim blResult As Boolean = False
        Dim strLdap As String = Nothing
        Try
            Dim blFlag = getLDAPConnectionString("", strLdap, True)
            If blFlag Then
                Dim de As DirectoryEntry = New DirectoryEntry(strLdap, userName, password)
                Dim dSearch As DirectorySearcher = New DirectorySearcher(de)
                Dim results As SearchResult = Nothing

                results = dSearch.FindOne()
                blResult = True
            End If

            Return blResult
        Catch ex As Exception
            Dim msg = ex.Message
            Return blResult
        End Try
    End Function

    Public Sub SendMessage(methodMessage As String, detailInfo As String)
        ScriptManager.RegisterStartupScript(Me, Page.GetType, "Message", "messageFormSubmitted('" & methodMessage & " ', '" & detailInfo & "')", True)
    End Sub

    'Protected Sub Validate_User(sender As Object, e As EventArgs)
    '    Dim user = lgAuthentication.UserName
    '    'txtUser.Text.Trim()
    '    Dim pass = lgAuthentication.Password
    '    'txtPass.Text.Trim()
    '    Try
    '        If AuthenticateUser(user, pass) Then
    '            lgAuthentication.FailureText = "Username and/or password is incorrect."
    '        Else
    '            FormsAuthentication.RedirectFromLoginPage(user, lgAuthentication.RememberMeSet)
    '        End If
    '    Catch ex As Exception

    '    End Try

    'End Sub

End Class