Imports System.DirectoryServices.AccountManagement
Imports System.Security.Principal

Public Class SiteMaster
    Inherits MasterPage
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load

        Dim windowsUser = System.Web.HttpContext.Current.User.Identity.Name
        If windowsUser IsNot Nothing Then
            If String.IsNullOrEmpty(windowsUser.Trim()) Then
                windowsUser = WindowsIdentity.GetCurrent().Name
            End If
        End If

        Dim domainName As String = System.Net.NetworkInformation.IPGlobalProperties.GetIPGlobalProperties().DomainName.ToString()
        Dim strUser = UserPrincipal.FindByIdentity(New PrincipalContext(ContextType.Domain, domainName),
                                             IdentityType.SamAccountName, windowsUser)

        Session("UserPrincipal") = strUser

        Dim onlyUser As String = Nothing
        If strUser IsNot Nothing Then
            If windowsUser.Contains("\") Then
                onlyUser = windowsUser.Split("\")(1)
            Else
                onlyUser = windowsUser
            End If

            Session("username") = strUser.Name
            Session("userid") = strUser.SamAccountName
            lblUsername.Text = "User: " + onlyUser + " - " + strUser.Name
        Else
            lblUsername.Text = "User Logged: " + onlyUser
        End If

    End Sub
End Class