﻿Imports System.DirectoryServices.AccountManagement
Imports System.Security.Principal
Imports ClaimsProject.DTO

Public Class SiteMaster
    Inherits MasterPage

    Private Shared strLogCadenaCabecera As String = System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.ToString()
    Dim strLogCadena As String = Nothing
    Private Shared eventLog1 As EventLog = New EventLog("MassivePricingUpdate.Log", GetComputerName(), "MassivePricingUpdate.App")
    'Private Shared ReadOnly Log As log4net.ILog = log4net.LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType)

    Dim objLog = New Logs()

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load

        Dim url As String = Nothing

        If Session("userid") Is Nothing Then
            'url = String.Format("Login.aspx?data={0}", "Session Expired!")
            'Response.Redirect(url, False)
            hdShowMenu.Value = "0"
        Else
            Dim validUsers = ConfigurationManager.AppSettings("validUsersForWeb")
            Dim user = If(Session("userid") IsNot Nothing, Session("userid").ToString(), "NA")
            Dim usernam = If(Session("userid") IsNot Nothing, Session("username").ToString(), "")

            Dim fullData = If(LCase(validUsers.Trim()).Contains(LCase(user.Trim())), True, False)
            If fullData Then
                lblUsername.Text = Session("userid").ToString() + "-" + usernam.Trim()
                hdShowMenu.Value = "1"
            Else
                hdShowMenu.Value = "0"
            End If
        End If

        Try
            'Dim windowsUser = System.Web.HttpContext.Current.User.Identity.Name
            'If windowsUser IsNot Nothing Then
            '    If String.IsNullOrEmpty(windowsUser.Trim()) Then
            '        windowsUser = WindowsIdentity.GetCurrent().Name
            '    End If
            'End If

            'Dim domainName As String = System.Net.NetworkInformation.IPGlobalProperties.GetIPGlobalProperties().DomainName.ToString()
            'Dim strUser = UserPrincipal.FindByIdentity(New PrincipalContext(ContextType.Domain, domainName),
            '                                     IdentityType.SamAccountName, windowsUser)

            'Session("UserPrincipal") = strUser

            'Dim onlyUser As String = Nothing
            'If strUser IsNot Nothing Then
            '    If windowsUser.Contains("\") Then
            '        onlyUser = windowsUser.Split("\")(1)
            '    Else
            '        onlyUser = windowsUser
            '    End If

            '    Session("username") = strUser.Name
            '    Session("userid") = strUser.SamAccountName
            '    lblUsername.Text = "User: " + onlyUser + " - " + strUser.Name
            'Else
            '    lblUsername.Text = "User Logged: " + onlyUser
            'End If
        Catch ex As Exception
            writeComputerEventLog(ex.Message)
            Dim usr = If(Session("userid") IsNot Nothing, Session("userid").ToString(), "N/A")
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "An Exception occurs: " + ex.Message + " for the user: " + usr, " at time: " + DateTime.Now.ToString())
        End Try

    End Sub

    Public Shared Function GetComputerName() As String
        Dim exMessage As String = Nothing
        Try
            Dim ComputerName As String
            ComputerName = Environment.MachineName
            Return ComputerName
        Catch ex As Exception
            'Log.Error(strLogCadenaCabecera + ".." + ex.Message)
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return Nothing
        End Try
    End Function


    Protected Sub lnkLogout_Click()
        Try
            FormsAuthentication.SignOut()
            Session.Abandon()
            coockieWork()
            Session("UserLoginData") = Nothing
            FormsAuthentication.RedirectToLoginPage()

        Catch ex As Exception

        End Try
    End Sub

    Private Sub coockieWork()
        Try

            Dim cookie1 As HttpCookie = New HttpCookie(FormsAuthentication.FormsCookieName, "")
            cookie1.HttpOnly = True
            cookie1.Expires = DateTime.Now.AddYears(-1)
            Response.Cookies.Add(cookie1)

        Catch ex As Exception

        End Try
    End Sub

#Region "Logs"

    Public Sub writeComputerEventLog(Optional strMessage As String = Nothing)
        Dim exMessage As String = Nothing
        Try

            If Not EventLog.SourceExists("MassivePricingUpdate.App") Then
                EventLog.CreateEventSource("MassivePricingUpdate.App", "MassivePricingUpdate.Log")
            End If
            'EventLog.CreateEventSource("CTPSystem-Net", "CTPSystem-Log")

            Dim lgSource = "MassivePricingUpdate.App"
            Dim lgName = "MassivePricingUpdate.Log"
            Dim msg = If(String.IsNullOrEmpty(strMessage), "Info: Session started for: " & Environment.UserName, strMessage)

            eventLog1 = New EventLog(lgName, Environment.MachineName, lgSource)
            eventLog1.WriteEntry(msg, EventLogEntryType.Information)

        Catch ex As Exception
            'Log.Error("Error trying to put info un console log: " + ex.Message + ".")
        End Try
    End Sub

    Public Sub writeLog(strLogCadenaCabecera As String, strLevel As Logs.ErrorTypeEnum, strMessage As String, strDetails As String)
        strLogCadena = strLogCadenaCabecera + " " + System.Reflection.MethodBase.GetCurrentMethod().ToString()
        Dim userid = If(DirectCast(Session("userid"), String) IsNot Nothing, DirectCast(Session("userid"), String), "N/A")
        objLog.WriteLog(strLevel, "CustomerPaymentsApp" & strLevel, strLogCadena, userid, strMessage, strDetails)
    End Sub

#End Region


End Class