﻿Imports System.ComponentModel
Imports System.Data.Odbc
Imports System.Data.SqlClient
Imports System.Globalization
Imports System.IO
Imports System.Reflection
Imports System.Web.Services
Imports ClaimsProject.DTO
Imports ClosedXML.Excel
Imports System.Web
Imports System.Net.Mail
Imports System.Threading
Imports System.Threading.Tasks
Imports System.Net
Imports System.DirectoryServices.AccountManagement
Imports System.Management.Automation
Imports ClaimsProject.DTO.ExtremeMirror
Imports Outlook = Microsoft.Office.Interop.Outlook
Imports System.Runtime.InteropServices

Public Class CustomerClaims
    Inherits System.Web.UI.Page

    Dim datenow As String = Nothing
    Dim hournow As String = Nothing

    Private Shared strLogCadenaCabecera As String = System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.ToString()
    Dim strLogCadena As String = Nothing

    Dim objLog = New Logs()

#Region "Page Load"

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim url As String = Nothing
        Dim sel As Integer = -1

        Try

            If Session("userid") Is Nothing Then
                url = String.Format("Login.aspx?data={0}", "Session Expired!")
                Response.Redirect(url, False)
            Else
                Dim welcomeMsg = ConfigurationManager.AppSettings("UserWelcome")
                lblUserLogged.Text = String.Format(welcomeMsg, Session("username").ToString().Trim(), Session("userid").ToString().Trim())
                hdWelcomeMess.Value = lblUserLogged.Text
            End If

            If Not IsPostBack Then

                Dim flag = GetAccessByUsers(sel)

                If Not flag Then
                    If sel = 0 Then
                        Dim usr = If(Session("userid") IsNot Nothing, Session("userid").ToString(), "N/A")
                        writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Information, "User: " + usr, " User is not authorized to access to Claims. Time: " + DateTime.Now.ToString())
                        Response.Redirect("http://svrwebapps.costex.com/BaseProject/default.aspx", False)
                    ElseIf sel = 1 Then
                        Dim usr = If(Session("userid") IsNot Nothing, Session("userid").ToString(), "N/A")
                        writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Information, Nothing, "There is not an user detected tryng to access to Claims. Time: " + DateTime.Now.ToString())
                        Response.Redirect("https://www.costex.com/", False)
                    End If
                Else
                    writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Information, "User: " + Session("userid").ToString(), " Load Claim Application at Time: " + DateTime.Now.ToString())
                    initializationCode()
                End If

                'validate the criteria for add types to search
                'validate the criteria for add internal status to search
                'validate the criteria for add external status to search

                ' getClaimNumbers("130644", Today.AddYears(-2))

            Else

                'If hdChangePageLoad.Value.Equals("1") Then
                'Attributes.Add("class", "header-style")
                'gridviewRow.Attributes.Add("class", "hideProp")
                'rowFilters.Attributes.Add("class", "hideProp")
                'Dim className As String = navsSection.Attributes("class").ToString()
                'Dim myClas As String = If(className.Trim().Contains(" "), className.Split(" ")(0), className)
                'navsSection.Attributes.Remove("class")
                'rowFilters.Attributes.Add("class", myClas)
                'searchFilters
                'navsSection
                'End If

                Dim controlName As String = Page.Request.Params("__EVENTTARGET")
                GetDDLValidation(controlName)

                loadSessionClaims()
                LoadDropDownLists(ddlDiagnoseData)
                LoadDropDownLists(ddlSearchDiagnose)
                LoadDropDownLists(ddlSearchExtStatus)
                LoadDropDownLists(ddlSearchReason)
                LoadDropDownLists(ddlSearchUser)
                LoadDropDownLists(ddlSearchIntStatus)
                LoadDropDownLists(ddlClaimType)
                LoadDropDownLists(ddlVndNo)
                LoadDropDownLists(ddlLocat)
                LoadDropDownLists(ddlLocation)

                If hdLoadAllData.Value.Equals("1") Then
                    fillClaimData("C", hdClNo.Value.Trim())
                    hdLoadAllData.Value = "0"
                End If


                If hdDisplaySeeVndClaim.Value <> "0" Then

                    Dim ph As ContentPlaceHolder = DirectCast(Me.Master.FindControl("MainContent"), ContentPlaceHolder)
                    Dim grv As GridView = DirectCast(ph.FindControl("grvSeeVndComm"), GridView)
                    Dim grv1 As GridView = DirectCast(ph.FindControl("grvSeeComm"), GridView)
                    If grv.DataSource Is Nothing Then
                        Dim ds = DirectCast(Session("GridVndComm"), DataSet)
                        grvSeeVndComm.DataSource = ds
                        grvSeeVndComm.DataBind()

                        'Dim row = grv.Rows(7)
                        'Dim grv1 = DirectCast(row.FindControl("grvSeeVndCommDet"), GridView)
                        'If grv1 IsNot Nothing Then
                        '    Dim dsRet = DirectCast(Session("GridVndComm"), DataSet)
                        '    grv1.DataSource = dsRet
                        '    grv1.DataBind()
                        'End If

                    End If
                End If

                If hdDisplaySeeVndClaim.Value <> "0" Or hdSeeComments.Value = "1" Then

                    Dim ph As ContentPlaceHolder = DirectCast(Me.Master.FindControl("MainContent"), ContentPlaceHolder)
                    Dim grv As GridView = DirectCast(ph.FindControl("grvSeeVndComm"), GridView)
                    Dim grv1 As GridView = DirectCast(ph.FindControl("grvSeeComm"), GridView)
                    If grv1.DataSource Is Nothing Then
                        Dim ds = DirectCast(Session("GridComm"), DataSet) 'Session("GridComm")
                        grvSeeComm.DataSource = ds
                        grvSeeComm.DataBind()

                        'Dim row = grv.Rows(7)
                        'Dim grv1 = DirectCast(row.FindControl("grvSeeVndCommDet"), GridView)
                        'If grv1 IsNot Nothing Then
                        '    Dim dsRet = DirectCast(Session("GridVndComm"), DataSet)
                        '    grv1.DataSource = dsRet
                        '    grv1.DataBind()
                        'End If

                    End If
                End If


                'If hdDisplayAddVndClaim.Value <> "0" Then
                '    Dim ph As ContentPlaceHolder = DirectCast(Me.Master.FindControl("MainContent"), ContentPlaceHolder)
                '    Dim grv As GridView = DirectCast(ph.FindControl("grvAddComm"), GridView)
                '    If grv.DataSource Is Nothing Then
                '        Dim ds = DirectCast(Session("dsComment"), DataSet)
                '        If ds IsNot Nothing Then
                '            grvAddComm.DataSource = ds
                '            grvAddComm.DataBind()
                '        End If
                '    End If
                'End If

                LoadImages()
                LoadImagesOEM()
                LoadImagesCTP()

                If Not String.IsNullOrEmpty(controlName) Then
                    Session("currentCtr") = controlName
                    If ((LCase(controlName).Contains("ddl"))) Then
                        Dim ddlTrig As DropDownList = DirectCast(Me.Form.FindControl(controlName), DropDownList)
                        executesDropDownList(ddlTrig)
                    Else
                        Session("isDDL") = False
                    End If
                Else
                    Session("isDDL") = False
                End If

                'Dim blDownloadExc = If(Session("RequestDownloadExcel") IsNot Nothing, DirectCast(Session("RequestDownloadExcel"), Boolean), False)
                'If blDownloadExc Then
                '    Dim blResult = callRec()
                '    If blResult Then
                '        SendMessage("The requested document has been placed in the downloads folder.", messageType.success)
                '    End If
                'End If


            End If

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try

    End Sub

#Region "Not in Use"

    'Public Shared Function GetRadioValue(controls As ControlCollection, Optional groupName As String = Nothing) As RadioButton
    '    Dim exMessage As String = " "
    '    Dim myRadio As RadioButton = Nothing
    '    Try
    '        For Each item As Control In controls
    '            If item.Controls.Count > 0 Then
    '                For Each item1 As Control In item.Controls
    '                    If item1.UniqueID.Equals("aspnetForm") Then
    '                        For Each item2 As Control In item1.Controls
    '                            Dim pepe = item2.GetType().ToString()
    '                            If item2.GetType().ToString() = "System.Web.UI.WebControls.ContentPlaceHolder" Then
    '                                For Each item3 As Control In item2.Controls
    '                                    If item3.GetType().ToString() = "System.Web.UI.WebControls.RadioButton" Then
    '                                        myRadio = DirectCast(item3, RadioButton)
    '                                        If myRadio.Checked = True Then
    '                                            Return myRadio
    '                                        End If
    '                                    End If
    '                                Next
    '                            End If
    '                        Next
    '                    End If
    '                Next
    '            End If
    '        Next

    '        Return myRadio
    '        'Dim selectedRadioButton = controls.OfType(Of RadioButton)().FirstOrDefault(Function(rb) rb.Checked)
    '        ''rb.GroupName = groupName And
    '        'Dim rdControl = If(selectedRadioButton Is Nothing, Nothing, selectedRadioButton)
    '        'Return rdControl
    '        'Dim empty = myTableLayout.Controls.OfType(Of Windows.Forms.TextBox)().Where(Function(txt) txt.Text.Length = 0 And arrayCheckOk.Contains(txt.Name))
    '    Catch ex As Exception
    '        exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
    '        Return Nothing
    '    End Try
    'End Function

    'Private Sub checkPostBack(rdSelected As RadioButton, Optional ByVal opt As String = Nothing)
    '    Dim exMessage As String = " "
    '    Try
    ' If Session("SelectedRadio") IsNot Nothing Then
    'Dim myControl = rdSelected
    'Dim myControlAction = myControl.ID + "_CheckedChanged"
    'Dim mi As MethodInfo = Me.GetType().GetMethod(myControlAction)
    'If opt = "opt1" Then
    '    mi.Invoke(Me, Nothing)
    'Else
    'If rdSelected.ID.ToLower.Contains("reason") Then
    '    AddHandler myControl.CheckedChanged, AddressOf Me.rdReason_CheckedChanged
    '    ClientScript.GetPostBackEventReference(myControl, "")
    'ElseIf rdSelected.ID.ToLower.Contains("diagnose") Then
    '    AddHandler myControl.CheckedChanged, AddressOf Me.rdDiagnose_CheckedChanged
    '    ClientScript.GetPostBackEventReference(myControl, "")
    'End If
    'End If
    'AddHandler myControl.CheckedChanged, AddressOf m
    'End If
    '    Catch ex As Exception
    '        exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
    '    End Try
    'End Sub

#End Region

    Private Sub GetDDLValidation(cntlName As String)
        Try
            If LCase(cntlName).Contains("ddl") Then
                If LCase(cntlName).Contains("ddlpagesize") Then
                    Session("isDDL") = False
                Else
                    Session("isDDL") = True
                End If
            Else
                Session("isDDL") = False
            End If
        Catch ex As Exception

        End Try
    End Sub

    Private Function GetClaimDataByDemand() As DataSet
        Dim result As Integer = 0
        Dim dsResult = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                result = objBL.GetClaimsDataUpdated("C", dsResult)
                If result > 0 Then
                    If dsResult IsNot Nothing Then
                        If dsResult.Tables(0).Rows.Count > 0 Then
                            Return dsResult
                        Else
                            Return Nothing
                        End If
                    Else
                        Return Nothing
                    End If
                Else
                    Return Nothing
                End If
            End Using
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Protected Sub GetClaimsReport(strWhere As String, flag As Integer, Optional ByVal dsSessionResult As DataSet = Nothing, Optional ByVal strDates As String() = Nothing)
        Dim dsResult = New DataSet()
        Dim dsResult1 = New DataSet()
        Dim exMessage As String = " "
        Dim lstGeneral = New List(Of ClaimsGeneral)()
        Dim extObj = New DetailsHeader()
        Dim lstDetails = New List(Of ClaimsDetails)()
        Dim lastDate As String = Nothing
        Dim firstDate As String = Nothing
        Dim result As Integer = 0
        Dim resultFull As Integer = 0

        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                If dsSessionResult IsNot Nothing Then
                    If dsSessionResult.Tables(0).Rows.Count > 0 Then
                        Session("ItemCounts") = dsSessionResult.Tables(0).Rows.Count.ToString()

                        grvClaimReport.DataSource = dsSessionResult.Tables(0)
                        grvClaimReport.DataBind()
                    End If
                Else

                    If strDates IsNot Nothing Then
                        result = objBL.GetClaimsReportSingle(dsResult, strDates)
                        resultFull = objBL.GetClaimsReportFull(dsResult1, strDates)
                    Else

                        'Dim flagValue = ddlClaimType.SelectedItem.Text
                        'Dim flagValue1 = ddlClaimType.SelectedItem.Value

                        result = objBL.GetClaimsDataUpdated("C", dsResult) ' look for warranty types (<> 'B')

                        'DoExcel(dsResult.Tables(0))
                        'result = objBL.GetClaimsReportSingle(dsResult)
                        'resultFull = objBL.GetClaimsReportFull(dsResult1)
                    End If

                    'Session("ClaimsBckData") = dsResult1
                    Session("ClaimsBckData") = dsResult
                    Session("ClaimsSingleData") = dsResult

#Region "Revisar brutal"

                    'Dim prevClaimNo = New List(Of String)()

                    'For Each dw As DataRow In dsResult.Tables(0).Rows

                    '    Dim generalObj = New ClaimsGeneral()

                    '    If Not prevClaimNo.Contains(dw.ItemArray(0).ToString()) Then

                    '        Dim countClaimNo = dsResult.Tables(0).AsEnumerable().Count(Function(aa) UCase(aa.ItemArray(0).ToString()) = UCase(dw.ItemArray(0).ToString()))
                    '        Dim claimBase = dw.ItemArray(0).ToString()

                    '        If countClaimNo > 1 Then

                    '            Dim selectedClaims = dsResult.Tables(0).AsEnumerable().Where(Function(bb) UCase(bb.ItemArray(0).ToString()) = UCase(claimBase))


                    '            generalObj.Header = New DetailsHeader()
                    '            generalObj.Header.lstClaims = lstDetails

                    '            For Each dww As DataRow In selectedClaims
                    '                Dim detailObj = New ClaimsDetails()
                    '                detailObj.ClaimNo = dww.Item("CLAIM#").ToString()
                    '                detailObj.SubmittedBy = dww.Item("SUBMITTEDBY").ToString().Trim()
                    '                detailObj.InvoiceNo = dww.Item("INVOICENO").ToString()
                    '                detailObj.InitStatus = dww.Item("CLAIM#").ToString()
                    '                detailObj.Details = dww.Item("DESCRIPTION").ToString()
                    '                detailObj.Comment1 = dww.Item("COMMENT1").ToString()
                    '                detailObj.Comment2 = dww.Item("COMMENT2").ToString()
                    '                detailObj.Comment3 = dww.Item("COMMENT3").ToString()
                    '                detailObj.DateCM = dww.Item("DATECM").ToString() 'format to only date part
                    '                detailObj.App = dww.Item("APP").ToString()
                    '                detailObj.InitStatus = dww.Item("INTSTATUS").ToString()
                    '                generalObj.Header.lstClaims.Add(detailObj)
                    '            Next

                    '            generalObj.ClaimNo = dw.Item("CLAIM#").ToString()
                    '            generalObj.Type = dw.Item("TYPE").ToString()
                    '            generalObj.Reason = dw.Item("REASON").ToString()
                    '            generalObj.Diagnose = dw.Item("DIAGNOSE").ToString()
                    '            generalObj.Customer = dw.Item("CUSTOMER").ToString()
                    '            generalObj.Initdate = dw.Item("INITDATE").ToString()
                    '            generalObj.Extstatus = dw.Item("EXTSTATUS").ToString()
                    '            generalObj.PartNo = dw.Item("PART#").ToString()
                    '            generalObj.Qty = dw.Item("QTY").ToString()
                    '            generalObj.Unitpr = dw.Item("UNITPR").ToString()
                    '            generalObj.InclNo = dw.Item("INCLNO").ToString()
                    '            generalObj.User = dw.Item("USER").ToString()
                    '            lstGeneral.Add(generalObj)

                    '        Else
                    '            generalObj.ClaimNo = dw.Item("CLAIM#").ToString()
                    '            generalObj.Type = dw.Item("TYPE").ToString()
                    '            generalObj.Reason = dw.Item("REASON").ToString()
                    '            generalObj.Diagnose = dw.Item("DIAGNOSE").ToString()
                    '            generalObj.Customer = dw.Item("CUSTOMER").ToString()
                    '            generalObj.Initdate = dw.Item("INITDATE").ToString()
                    '            generalObj.Extstatus = dw.Item("EXTSTATUS").ToString()
                    '            generalObj.PartNo = dw.Item("PART#").ToString()
                    '            generalObj.Qty = dw.Item("QTY").ToString()
                    '            generalObj.Unitpr = dw.Item("UNITPR").ToString()
                    '            generalObj.Initdate = dw.Item("INCLNO").ToString()
                    '            generalObj.User = dw.Item("USER").ToString()
                    '            lstGeneral.Add(generalObj)
                    '        End If

                    '        prevClaimNo.Add(dw.ItemArray(0).ToString())

                    '    End If

                    'Next

#End Region

                    If (result > 0 And dsResult IsNot Nothing And dsResult.Tables(0).Rows.Count > 0) Then
                        Session("DataSource") = dsResult
                        Session("PageAmounts") = "10"
                        Session("currentPage") = 1
                        Session("ItemCounts") = dsResult.Tables(0).Rows.Count.ToString()
                        lblTotalClaims.Text = dsResult.Tables(0).Rows.Count

                        grvClaimReport.DataSource = dsResult.Tables(0)
                        grvClaimReport.DataBind()
                    End If
                End If
            End Using
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Private Sub loadSessionClaims(Optional ds As DataSet = Nothing, Optional loadNothing As Boolean = False)
        Dim exMessage As String = " "
        Try
            If Not loadNothing Then
                If ds IsNot Nothing Then
                    If ds.Tables(0).Rows.Count > 0 Then
                        lblTotalClaims.Text = ds.Tables(0).Rows.Count

                        Session("DataSource") = ds
                        Session("ItemCounts") = ds.Tables(0).Rows.Count.ToString()

                        grvClaimReport.DataSource = ds.Tables(0)
                        grvClaimReport.DataBind()
                    Else
                        Dim methodMessage = "There is not results for the selected filters. Please try again with other search criteria."
                        SendMessage(methodMessage, messageType.warning)

                        grvClaimReport.DataSource = Nothing
                        grvClaimReport.DataBind()
                    End If
                ElseIf Session("DataSource") IsNot Nothing Then
                    Dim allSessionClaims = DirectCast(Session("DataSource"), DataSet)
                    'Session("ItemCounts") = allSessionClaims.Tables(0).Rows.Count()
                    lblTotalClaims.Text = allSessionClaims.Tables(0).Rows.Count

                    Session("ItemCounts") = allSessionClaims.Tables(0).Rows.Count.ToString()

                    grvClaimReport.DataSource = allSessionClaims.Tables(0)
                    grvClaimReport.DataBind()
                Else
                    lblTotalClaims.Text = 0

                    Session("ItemCounts") = lblTotalClaims.Text.ToString()

                    grvClaimReport.DataSource = Nothing
                    grvClaimReport.DataBind()
                End If
            Else
                lblTotalClaims.Text = 0

                Session("ItemCounts") = lblTotalClaims.Text.ToString()

                grvClaimReport.DataSource = Nothing
                grvClaimReport.DataBind()
            End If

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

#End Region

#Region "Events"

#Region "GridView"

    Protected Sub grvClaimReport_RowCreated(sender As Object, e As GridViewRowEventArgs)
        Dim direction As String = Nothing

        Try

            If e.Row.RowType = DataControlRowType.Header Then

                For Each tc As TableCell In e.Row.Cells

                    If tc.HasControls() Then
                        Dim aa = tc.Controls(0).GetType()
                        Dim ctrType = tc.Controls(0).GetType().ToString()
                        If ctrType.ToLower().Contains("linkbutton") Then
                            direction = DirectCast(Session("sortDirection"), String)

                            Dim lnkControl As LinkButton = DirectCast(tc.Controls(0), LinkButton)
                            Dim img As Image = New Image()

                            If Session("sortExpression") Is Nothing Or Session("sortDirection") Is Nothing Then

                                If lnkControl.CommandArgument.Trim().ToLower().Equals("mhmrnr") Then

                                    img.ImageUrl = "~/Images/imgDesc.png"

                                End If

                            Else
                                If lnkControl IsNot Nothing And Session("sortExpression").ToString() = lnkControl.CommandArgument.Trim().ToLower() Then

                                    'SetSortDirection(direction) = "ASC"

                                    img.ImageUrl = "~/Images/img" + If(SetSortDirection(direction) = "ASC", "Desc", "Asc") + ".png"

                                Else
                                    'img.ImageUrl = "~/Images/imgAsc.png"
                                End If
                            End If

                            tc.Controls.Add(New LiteralControl(" "))
                            tc.Controls.Add(img)

                            'Dim divI As HtmlGenericControl = New HtmlGenericControl("i")
                            'divI.Attributes.Add("class", "fa fa-server")

                            'Dim divSpan As HtmlGenericControl = New HtmlGenericControl("span")
                            'divSpan.Attributes.Add("runat", "server")
                            'divSpan.Attributes.Add("aria-hidden", "true")


                        End If

                    End If

                Next

            End If

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub grvClaimReport_RowDataBound(sender As Object, e As GridViewRowEventArgs)
        Dim exMessage As String = " "
        Try
            If e.Row.RowType = DataControlRowType.DataRow Then

                'set currency format for price
                Dim price = System.Convert.ToDecimal(e.Row.Cells(5).Text)
                e.Row.Cells(5).Text = String.Format("{0:C2}", price)

                'set the color by date difference in days (make adjusts from here)
                Dim myDate As Literal = DirectCast(e.Row.Cells(2).FindControl("Literal1"), Literal)
                If Not String.IsNullOrEmpty(myDate.Text) Then
                    Dim value = setDateFlag(myDate.Text)
                    If value = 1 Then
                        e.Row.Cells(2).ForeColor = System.Drawing.Color.Green
                    ElseIf value = 2 Then
                        e.Row.Cells(2).ForeColor = System.Drawing.Color.Orange
                    ElseIf value = 3 Then
                        e.Row.Cells(2).ForeColor = System.Drawing.Color.Red
                    End If
                End If

                Dim seq = e.Row.Cells(7).Text

                Dim curStatus = GetCurrentIntStatus(seq)
                Dim lbl12 = DirectCast(e.Row.FindControl("Label12"), Label)
                lbl12.Text = curStatus

                Dim lastComm = getLastCommentByNumber(seq)
                Dim lbl1 = DirectCast(e.Row.FindControl("lblLastComment"), Label)
                Dim messageFix = If(String.IsNullOrEmpty(lastComm), lastComm, If(lastComm.Length < 70, lastComm, lastComm.Substring(0, Math.Min(lastComm.Length, 70))))
                messageFix += " ... "
                lbl1.Text = messageFix

            ElseIf e.Row.RowType = DataControlRowType.Header Then

                e.Row.Attributes.Add("class", "header-style")

                Dim x As Integer = 0
                For index = 0 To grvClaimReport.Columns.Count - 1
                    Dim name = grvClaimReport.Columns(index).HeaderText
                    Dim style = grvClaimReport.Columns(index).ItemStyle().CssClass

                    If style = "hidecol" Then
                        e.Row.Cells(x).Attributes.Add("class", "footermark")
                    End If

                    x += 1
                Next

                Dim y As Integer = 0
                Dim colName As String = hdSelectedHeaderCell.Value
                For index = 0 To grvClaimReport.Columns.Count - 1
                    Dim name = grvClaimReport.Columns(index).HeaderText
                    If name.Equals(colName) Then
                        e.Row.Cells(y).Attributes.Add("class", "header-Asc")
                    End If

                    y += 1
                Next

            ElseIf (e.Row.RowType = DataControlRowType.Pager) Then
                Dim strTotal = DirectCast(Session("ItemCounts"), String).ToString()
                Dim strNumberOfPages = DirectCast(Session("PageAmounts"), String).ToString()
                Dim strCurrentPage = ((DirectCast(Session("currentPage"), Integer))).ToString()

                Dim strGrouping = String.Format("Showing {0} to {1} of {2} entries ", strCurrentPage, strNumberOfPages, strTotal)
                lblGrvGroup.Text = strGrouping

                Dim sortCell As New HtmlTableCell()
                sortCell.Controls.Add(lblGrvGroup)

                Dim row1 As HtmlTableRow = New HtmlTableRow
                row1.Cells.Add(sortCell)
                ndtt.Rows.Add(row1)

                e.Row.Cells(0).Controls.AddAt(0, ndtt)
            End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub grvClaimReport_PageIndexChanging(sender As Object, e As GridViewPageEventArgs)
        Dim exMessage As String = " "
        Try
            grvClaimReport.PageIndex = e.NewPageIndex

            Session("currentPage") = (CInt(e.NewPageIndex + 1) * 10) - 9
            Dim vall = If((CInt(e.NewPageIndex + 1) * 10) > CInt(DirectCast(Session("ItemCounts"), String)), CInt(DirectCast(Session("ItemCounts"), String)), (CInt(e.NewPageIndex + 1) * 10))
            Session("PageAmounts") = vall.ToString()

            Dim ds = TryCast(Session("DataSource"), DataSet)
            If ds IsNot Nothing Then
                loadSessionClaims()
            Else
                GetClaimsReport("", 1)
            End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub grvClaimReport_RowCommand(sender As Object, e As GridViewCommandEventArgs) Handles grvClaimReport.RowCommand
        Dim exMessage As String = Nothing
        Dim ds As New DataSet
        Dim dsResult = New DataSet()
        Try
            If e.CommandName = "Detail" Then
                Dim row As GridViewRow = DirectCast(DirectCast((e.CommandSource), LinkButton).Parent.Parent, GridViewRow)

                ds = DirectCast(Session("DataSource"), DataSet)

                Dim claimNo = row.Cells(1).Text

                Dim myitem = ds.Tables(0).AsEnumerable().Where(Function(item) item.Item("MHMRNR").ToString().Equals(claimNo, StringComparison.InvariantCultureIgnoreCase))

                'Dim myLabel As Label = DirectCast(dataFrom.FindControl("textlbl1"), Label)
                'txtPartNumber2.Text = Trim(myLabel.Text)
                'txtPartNumber2.Enabled = False

                'Dim assigned As String = Trim(row.Cells(8).Text)
                'ddlAssignedTo.SelectedIndex = ddlAssignedTo.Items.IndexOf(ddlAssignedTo.Items.FindByText(assigned))

                'Dim status As String = row.Cells(7).Text
                'ddlStatus2.SelectedIndex = ddlStatus2.Items.IndexOf(ddlStatus2.Items.FindByText(status))

                'txtComments2.Text = GetCommentById(Trim(row.Cells(2).Text))
                'ElseIf e.CommandName = "show" Then
                '    Dim row As GridViewRow = DirectCast(DirectCast((e.CommandSource), LinkButton).Parent.Parent, GridViewRow)
                '    Dim claimNo = row.Cells(2).Text

                '    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                '        Dim rs1 = objBL.GetClaimsDetDataUpdated("C", claimNo, dsResult)

                '        Dim grv1 = DirectCast(row.Cells(11).Controls(3), GridView)

                '        'Dim grv = DirectCast(sender, GridView)
                '        'Dim grv1 = DirectCast(row.Cells(12).FindControl("grvDetails"), GridView)
                '        If grv1 IsNot Nothing Then
                '            'check what to do with more than one rows result
                '            grv1.DataSource = dsResult
                '            grv1.DataBind()
                '        End If

                '    End Using

#Region "without going to database"

                'Dim ds1 = DirectCast(Session("ClaimsBckData"), DataSet)
                'Dim myitem = ds1.Tables(0).AsEnumerable().Where(Function(item) item.Item("MHMRNR").ToString().Equals(claimNo, StringComparison.InvariantCultureIgnoreCase))
                'If myitem.Count > 1 Then
                '    Dim dtt = New DataTable()
                '    dtt = myitem(0).Table.Clone()
                '    For Each item As DataRow In myitem
                '        dtt.ImportRow(item)
                '    Next
                '    Dim grv1 = DirectCast(row.Cells(10).Controls(3), GridView)
                '    'Dim grv = DirectCast(sender, GridView)
                '    'Dim grv1 = DirectCast(row.Cells(12).FindControl("grvDetails"), GridView)
                '    If grv1 IsNot Nothing Then
                '        grv1.DataSource = dtt
                '        grv1.DataBind()
                '    End If

                'End If

#End Region

            ElseIf e.CommandName = "claimedit" Then

                Dim row As GridViewRow = DirectCast(DirectCast((e.CommandSource), LinkButton).Parent.Parent, GridViewRow)
                Dim claimNo = row.Cells(1).Text
                Dim claimStatus As String = Nothing

                Dim dataFrom = row.Cells(8)
                Dim myLabel As Label = DirectCast(dataFrom.FindControl("Label12"), Label)
                Dim statusOut As String = myLabel.Text.Trim()
                hdFullDisabled.Value = If(statusOut.Trim().ToUpper().Equals("CLOSED") Or statusOut.Trim().ToUpper().Equals("REJECT") Or statusOut.Trim().ToUpper().Contains("COMPLETED"), "0", "1")
                hdVoided.Value = If(statusOut.Trim().ToUpper().Equals("VOID"), "0", "1")

                Dim ds1 = DirectCast(Session("Datasource"), DataSet)
                'Dim myitem = ds.Tables(0).AsEnumerable().Where(Function(item) item.Item("MHMRNR").ToString().Equals(claimNo, StringComparison.InvariantCultureIgnoreCase))
                Dim dd = ds1.Tables(0).AsEnumerable().Where(Function(ee) ee.Item("MHMRNR").ToString().Trim().ToUpper().Equals(claimNo.Trim().ToUpper())).First
                If dd IsNot Nothing Then
                    Dim wrnNo As String = dd.Item("WRN").ToString().Trim()
                    Dim dctMain = New Dictionary(Of String, String)()
                    dctMain.Add(claimNo, wrnNo)
                    Session("MainValues") = dctMain
                    claimStatus = GetCurrentIntStatus(wrnNo)
                    'claimStatus = dd.Item("cwstde").ToString().Trim().ToUpper()
                Else
                    claimStatus = "Not Detected Status for this Claim Number."
                End If
                hdVariableStatus.Value = claimStatus

                'load all claim number data
                'Dim val1 = ddlClaimType.SelectedValue
                'Dim val2 = ddlClaimType.SelectedItem.Text
                'Dim val3 = ddlClaimType.SelectedItem.Value
                'Dim val4 = ddlClaimType.SelectedIndex

                hdCurrentActiveTab.Value = "#claimoverview"
                hdClNo.Value = claimNo.Trim()
                fillClaimData("C", claimNo)
                hdGetCommentTab.Value = "1"
                SeeCommentsMethod()
                Dim strSts = "You are currently viewing Claim Number:" + txtClaimNoData.Text + ". The current status for this Claim is:  {0} ."
                lblClaimQuickOverview.Text = String.Format(strSts, hdVariableStatus.Value)

                hdClaimNumber.Value = lblClaimQuickOverview.Text
                Session("currentClaim") = hdClaimNumber.Value

                clearAllDataFields(True)
                'setTabsHeader(txtClaimNoData.Text)

                'change the flags for grid and tabs visualization
                'hdGridViewContent.Value = "0"
                'hdNavTabsContent.Value = "1"
            ElseIf e.CommandName = "show1" Then
                'mdClaimDetailsExp.Show()
            End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub grvClaimReport_RowUpdating(ByVal sender As Object, ByVal e As GridViewUpdateEventArgs) Handles grvSeeVndComm.RowUpdating
        Try

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub grvSeeVndComm_RowDataBound(sender As Object, e As GridViewRowEventArgs) Handles grvSeeVndComm.RowDataBound
        Try
            If e.Row.RowType = DataControlRowType.DataRow Then
                'Dim IntCode = e.Row.Cells(1).Text
                'Dim ds = New DataSet()
                'Dim flag = GetCommDetail(IntCode, ds)
                'If flag Then
                '    If ds IsNot Nothing Then
                '        If ds.Tables(0).Rows.Count > 0 Then
                '            Dim msg = ds.Tables(0).Rows(0).Item("CCTEXT").ToString()
                '            If String.IsNullOrEmpty(msg.Replace(".", "").Trim()) Then
                '                Dim dataFrom = e.Row.Cells(6)
                '                Dim myButton As LinkButton = DirectCast(dataFrom.FindControl("lnkExpander"), LinkButton)
                '                myButton.Enabled = False
                '                myButton.ToolTip = "This comment does not have a detail."
                '            End If
                '        End If
                '    End If
                'End If
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub grvSeeVndComm_PageIndexChanging(sender As Object, e As GridViewPageEventArgs) Handles grvSeeVndComm.PageIndexChanging
        Try
            Dim ds = DirectCast(Session("GridVndComm"), DataSet)
            grvSeeVndComm.PageIndex = e.NewPageIndex
            grvSeeVndComm.DataSource = ds
            grvSeeVndComm.DataBind()
        Catch ex As Exception
            Dim msg = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + msg + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub grvSeeVndComm_RowCommand(sender As Object, e As GridViewCommandEventArgs) Handles grvSeeVndComm.RowCommand
        Try
            If e.CommandName = "commentDet" Then
                Dim row As GridViewRow = DirectCast(DirectCast((e.CommandSource), LinkButton).Parent.Parent, GridViewRow)
                Dim IdCommDet = txtSeeVndComm.Text.Trim()
                Dim intIdDet = Trim(row.Cells(1).Text)
                If Not String.IsNullOrEmpty(IdCommDet) And Not String.IsNullOrEmpty(intIdDet) Then
                    Dim dsRet = New DataSet()
                    Dim flag = GetCommDetail(intIdDet, dsRet)
                    Session("VndClaimCommHeader") = dsRet
                    If flag Then
                        Dim grv = DirectCast(sender, GridView)
                        Dim grv1 = DirectCast(row.FindControl("grvSeeVndCommDet"), GridView)
                        If grv1 IsNot Nothing Then
                            grv1.DataSource = dsRet
                            grv1.DataBind()
                        End If
                    End If
                End If
            End If
        Catch ex As Exception
            Dim msg = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + msg + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub grvSeeComm_RowDataBound(sender As Object, e As GridViewRowEventArgs) Handles grvSeeComm.RowDataBound
        Try
            'If e.Row.RowType = DataControlRowType.DataRow Then
            '    Dim IntCode = e.Row.Cells(1).Text
            '    Dim ds = New DataSet()
            '    Dim flag = GetCommDetail1(IntCode, ds)
            '    If flag Then
            '        If ds IsNot Nothing Then
            '            If ds.Tables(0).Rows.Count > 0 Then
            '                Dim msg = ds.Tables(0).Rows(0).Item("CWCDTX").ToString()
            '                If String.IsNullOrEmpty(msg.Replace(".", "").Trim()) Then
            '                    Dim dataFrom = e.Row.Cells(7)
            '                    Dim myButton As LinkButton = DirectCast(dataFrom.FindControl("lnkExpander1"), LinkButton)
            '                    myButton.Enabled = False
            '                    myButton.ToolTip = "This comment does not have a detail."
            '                End If
            '            End If
            '        End If
            '    End If
            'End If
        Catch ex As Exception

        End Try
    End Sub

    Protected Sub grvSeeComm_PageIndexChanging(sender As Object, e As GridViewPageEventArgs) Handles grvSeeComm.PageIndexChanging
        Try
            Dim ds = DirectCast(Session("GridComm"), DataSet)
            grvSeeComm.PageIndex = e.NewPageIndex
            grvSeeComm.DataSource = ds
            grvSeeComm.DataBind()
        Catch ex As Exception
            Dim msg = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + msg + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub grvSeeComm_RowCommand(sender As Object, e As GridViewCommandEventArgs) Handles grvSeeComm.RowCommand
        Try
            If e.CommandName = "commentDet" Then
                Dim row As GridViewRow = DirectCast(DirectCast((e.CommandSource), LinkButton).Parent.Parent, GridViewRow)
                Dim IdRetNo = txtRetNo.Text.Trim()
                Dim IdWrnNo = txtWrnNo.Text.Trim()
                Dim intIdDet = Trim(row.Cells(1).Text)
                If Not String.IsNullOrEmpty(IdRetNo) And Not String.IsNullOrEmpty(IdWrnNo) And Not String.IsNullOrEmpty(intIdDet) Then
                    Dim dsRet = New DataSet()
                    Dim flag = GetCommDetail1(intIdDet, dsRet)
                    Session("ClaimCommHeader") = dsRet
                    If flag Then
                        Dim grv = DirectCast(sender, GridView)
                        Dim grv1 = DirectCast(row.FindControl("grvSeeCommDet"), GridView)
                        If grv1 IsNot Nothing Then
                            grv1.DataSource = dsRet
                            grv1.DataBind()
                        End If
                    End If
                End If
            End If
        Catch ex As Exception
            Dim msg = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + msg + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub grvClaimReport_Sorting(sender As Object, e As GridViewSortEventArgs) Handles grvClaimReport.Sorting
        Dim dtw As DataView = Nothing
        Dim newDt As DataTable = New DataTable()
        Dim exMessage As String = Nothing
        Dim direction As String = Nothing
        Dim bDec As Boolean = False
        Dim bDecDate As Boolean = False
        Try
            direction = DirectCast(Session("sortDirection"), String)
            Dim dsFull = DirectCast(Session("Datasource"), DataSet)
            Dim dt As DataTable = DirectCast(grvClaimReport.DataSource, DataTable)
            Dim field = e.SortExpression.Trim().ToLower()
            Session("sortExpression") = field

            If field.Equals(dsFull.Tables(0).Columns(0).ColumnName.Trim().ToLower()) Or
                field.Equals(dsFull.Tables(0).Columns(5).ColumnName.Trim().ToLower()) Or field.Equals(dsFull.Tables(0).Columns(6).ColumnName.Trim().ToLower()) Then
                bDec = True
            End If
            If field.Equals(dsFull.Tables(0).Columns(3).ColumnName.Trim().ToLower()) Then
                bDecDate = True
            End If

            If dt IsNot Nothing Then
                Dim num = 0
                If bDec Then
                    If SetSortDirection(direction) = "ASC" Then
                        'Dim dtQuery = dt.AsEnumerable().Where(Function(ee) Integer.TryParse(ee.Item(field).ToString(), num) = True).CopyToDataTable()
                        grvClaimReport.DataSource = dt.AsEnumerable().OrderBy(Function(o) CInt(o.Item(field).ToString())).CopyToDataTable()
                    Else
                        grvClaimReport.DataSource = dt.AsEnumerable().OrderByDescending(Function(o) CInt(o.Item(field).ToString())).CopyToDataTable()
                    End If
                Else
                    If bDecDate Then
                        If SetSortDirection(direction) = "ASC" Then
                            grvClaimReport.DataSource = dt.AsEnumerable().OrderBy(Function(o) DateTime.Parse(o.Item(field).ToString().Split(" ")(0))).CopyToDataTable()
                        Else
                            grvClaimReport.DataSource = dt.AsEnumerable().OrderByDescending(Function(o) DateTime.Parse(o.Item(field).ToString().Split(" ")(0))).CopyToDataTable()
                        End If
                    Else
                        If SetSortDirection(direction) = "ASC" Then
                            'Dim dtQuery = dt.AsEnumerable().Where(Function(ee) Integer.TryParse(ee.Item(field).ToString(), num) = True).CopyToDataTable()
                            grvClaimReport.DataSource = dt.AsEnumerable().OrderBy(Function(o) o.Item(field).ToString()).CopyToDataTable()
                        Else
                            grvClaimReport.DataSource = dt.AsEnumerable().OrderByDescending(Function(o) o.Item(field).ToString()).CopyToDataTable()
                        End If
                    End If
                End If
            Else
                If bDec Then
                    If SetSortDirection(direction) = "ASC" Then
                        grvClaimReport.DataSource = dsFull.Tables(0).AsEnumerable().OrderBy(Function(o) CInt(o.Item(field).ToString())).CopyToDataTable()
                    Else
                        grvClaimReport.DataSource = dsFull.Tables(0).AsEnumerable().OrderByDescending(Function(o) CInt(o.Item(field).ToString())).CopyToDataTable()
                    End If
                Else
                    If bDecDate Then
                        If SetSortDirection(direction) = "ASC" Then
                            grvClaimReport.DataSource = dt.AsEnumerable().OrderBy(Function(o) DateTime.Parse(o.Item(field).ToString().Split(" ")(0))).CopyToDataTable()
                        Else
                            grvClaimReport.DataSource = dt.AsEnumerable().OrderByDescending(Function(o) DateTime.Parse(o.Item(field).ToString().Split(" ")(0))).CopyToDataTable()
                        End If
                    Else
                        If SetSortDirection(direction) = "ASC" Then
                            grvClaimReport.DataSource = dsFull.Tables(0).AsEnumerable().OrderBy(Function(o) o.Item(field).ToString()).CopyToDataTable()
                        Else
                            grvClaimReport.DataSource = dsFull.Tables(0).AsEnumerable().OrderByDescending(Function(o) o.Item(field).ToString()).CopyToDataTable()
                        End If
                    End If
                End If
            End If

            grvClaimReport.DataBind()
            Dim dtt = DirectCast(grvClaimReport.DataSource, DataTable)
            Dim ds = New DataSet()
            ds.Tables.Add(dtt)
            Session("Datasource") = ds

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, exMessage, "Occurs at time: " + DateTime.Now.ToString())
        End Try
    End Sub


#Region "Old add comment gridview"

    'Protected Sub grvAddComm_RowDataBound(sender As Object, e As GridViewRowEventArgs) Handles grvAddComm.RowDataBound
    '    Try
    '        If e.Row.RowType = DataControlRowType.DataRow Then
    '            e.Row.Attributes("ondblclick") = Page.ClientScript.GetPostBackClientHyperlink(grvAddComm, "Edit$" & e.Row.RowIndex)
    '            e.Row.Attributes("style") = "cursor:pointer"
    '        ElseIf e.Row.RowType = DataControlRowType.Footer Then
    '            Dim lnk As LinkButton = DirectCast(e.Row.Cells(0).FindControl("grvAddBtn"), LinkButton)

    '        End If
    '    Catch ex As Exception

    '    End Try
    'End Sub

    'Protected Sub grvAddComm_RowCommand(sender As Object, e As GridViewCommandEventArgs) Handles grvAddComm.RowCommand
    '    Try
    '        If e.CommandName = "AddNewRow" Then
    '            AddNewComment()
    '        End If
    '        '
    '    Catch ex As Exception

    '    End Try
    'End Sub

    'Protected Sub grvAddComm_OnRowEditing(sender As Object, e As GridViewEditEventArgs) Handles grvAddComm.RowEditing
    '    Try
    '        grvAddComm.EditIndex = e.NewEditIndex
    '        grvAddComm.DataBind()
    '        grvAddComm.Rows(e.NewEditIndex).Attributes.Remove("ondblclick")
    '        'grvAddComm.Rows(e.NewEditIndex).Cells(1).FindControl("")
    '    Catch ex As Exception

    '    End Try
    'End Sub

    'Protected Sub grvAddComm_OnRowUpdating(sender As Object, e As GridViewUpdateEventArgs)
    '    Dim row As GridViewRow = grvAddComm.Rows(e.RowIndex)
    '    Dim txt As TextBox = DirectCast(row.Cells(1).FindControl("txtInnerComment"), TextBox)
    '    'Dim comment As String = TryCast(row.Cells(1).Controls(0), TextBox).Text
    '    Dim comment As String = txt.Text

    '    Dim ds = DirectCast(Session("dsComment"), DataSet)
    '    ds.Tables(0).Rows(row.RowIndex)("Comment") = comment
    '    'Dim dt As DataTable = TryCast(ViewState("dt"), DataTable)
    '    'dt.Rows(row.RowIndex)("Name") = comment
    '    'ViewState("dt") = dt
    '    Session("dsComment") = ds
    '    grvAddComm.EditIndex = -1
    '    grvAddComm.DataBind()
    'End Sub

    'Protected Sub lnkClose_OnCancel(sender As Object, e As EventArgs)
    '    grvAddComm.EditIndex = -1
    '    grvAddComm.DataBind()
    'End Sub

#End Region

#End Region

#Region "Radios and checkboxes"

    Public Sub chkPCred_CheckedChanged(sender As Object, e As EventArgs)
        Try
            If chkPCred.Checked Then
                txtPartCred.Enabled = True
            Else
                txtPartCred.Enabled = False
            End If
        Catch ex As Exception

        End Try
    End Sub

    Public Sub chkConsDamage_CheckedChanged(sender As Object, e As EventArgs)
        Try
            If chkConsDamage.Checked Then
                txtCDFreight.Enabled = True
                txtCDLabor.Enabled = True
                txtCDMisc.Enabled = True
                txtCDPart.Enabled = True
                txtConsDamageTotal.Enabled = False
                'txtCDFreight.Text = txtFreight.Text
                cleanCDValues()
            Else
                txtCDFreight.Enabled = False
                txtCDLabor.Enabled = False
                txtCDMisc.Enabled = False
                txtCDPart.Enabled = False
                txtConsDamageTotal.Enabled = False
                cleanCDValues()
            End If
        Catch ex As Exception

        End Try
    End Sub

    Public Sub rdDate_CheckedChanged(sender As Object, e As EventArgs)
        Session("SelectedRadio") = sender
    End Sub

    Public Sub rdPartNo_CheckedChanged(sender As Object, e As EventArgs)
        Session("SelectedRadio") = sender
    End Sub

    Public Sub rdCustomer_CheckedChanged(sender As Object, e As EventArgs)
        Session("SelectedRadio") = sender
    End Sub

    Public Sub rdClaimNo_CheckedChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim dtOut As DataTable = New DataTable()
        Session("SelectedText") = sender
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Public Sub rdReason_CheckedChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim dtOut As DataTable = New DataTable()
        Session("SelectedRadio") = sender
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

            'Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
            '    result = objBL.getSearchByReasonData(dsData, dtOut)
            'End Using

            'LoadingDropDownList(ddlSearchReason, dtOut.Columns("Reason").ColumnName,
            '                            dtOut.Columns("ID").ColumnName, dtOut, True, "NA - Select Reason")

            'loadSessionClaims()
            'ddlSearchReason_SelectedIndexChanged(sender, e)
            'ddlSearchReason.DataSource = dtOut
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Public Sub rdDiagnose_CheckedChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim dtOut As DataTable = New DataTable()
        Session("SelectedRadio") = sender
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

            'Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
            '    result = objBL.getSearchByDiagnoseData(dsData, dtOut)
            'End Using

            'LoadingDropDownList(ddlSearchDiagnose, dtOut.Columns("Diagnose").ColumnName,
            '                            dtOut.Columns("ID").ColumnName, dtOut, True, "NA - Select Diagnose")

            'loadSessionClaims()
            'ddlSearchReason.DataSource = dtOut
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Public Sub rdStatusOut_CheckedChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim dtOut As DataTable = New DataTable()
        Session("SelectedRadio") = sender
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

            'Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
            '    result = objBL.getSearchByStatusOutData(dsData, dtOut)
            'End Using

            'LoadingDropDownList(ddlSearchExtStatus, dtOut.Columns("extstatus").ColumnName,
            '                            dtOut.Columns("ID").ColumnName, dtOut, True, "NA - Select Status")

            'loadSessionClaims()
            'ddlSearchReason.DataSource = dtOut
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Public Sub rdUser_CheckedChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim dtOut As DataTable = New DataTable()
        Session("SelectedRadio") = sender
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

            'Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
            '    result = objBL.getSearchByUserData(dsData, dtOut)
            'End Using

            'LoadingDropDownList(ddlSearchUser, dtOut.Columns("User").ColumnName,
            '                            dtOut.Columns("ID").ColumnName, dtOut, True, "NA - Select User")

            'loadSessionClaims()
            'ddlSearchReason.DataSource = dtOut
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Public Sub rdStatusIn_CheckedChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim dtOut As DataTable = New DataTable()
        Session("SelectedRadio") = sender
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

            'Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
            '    result = objBL.getSearchByStatusInData(dsData, dtOut)
            'End Using

            'LoadingDropDownList(ddlSearchIntStatus, dtOut.Columns("intstatus").ColumnName,
            '                            dtOut.Columns("ID").ColumnName, dtOut, True, "NA - Select Status")

            'loadSessionClaims()
            'ddlSearchReason.DataSource = dtOut
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Public Sub rdtype_CheckedChanged(sender As Object, e As EventArgs)

    End Sub

    Public Sub chkAcknowledgeEmail_CheckedChanged(sender As Object, e As EventArgs) Handles chkAcknowledgeEmail.CheckedChanged
        Try
            Dim ctrName As String = Nothing
            If Session("currentCtr") IsNot Nothing Then
                ctrName = Session("currentCtr").ToString()

                If chkInitialReview.Checked Then
                    If ((LCase(ctrName).Contains("chkack"))) Then
                        popAckEmail.Show()

                        hdGridViewContent.Value = "0"
                        hdNavTabsContent.Value = "1"
                        hdAckPopContent.Value = "1"
                        'chkAcknowledgeEmail.Enabled = False

                        'hdShowAckMsgForm.Value = If(chkAcknowledgeEmail.Checked, "1", "0")
                    Else

                    End If
                Else
                    Dim strMessage = "In order to update the Acknowledge Email Status, the Initial Review Status must have been selected."
                    chkAcknowledgeEmail.Checked = False
                    SendMessage(strMessage, messageType.info)
                    Exit Sub
                End If
            End If
        Catch ex As Exception

        End Try
    End Sub

    Public Sub chkInfoCust_CheckedChanged(sender As Object, e As EventArgs) Handles chkInfoCust.CheckedChanged
        Try
            Dim ctrName As String = Nothing
            If Session("currentCtr") IsNot Nothing Then
                ctrName = Session("currentCtr").ToString()

                If chkInitialReview.Checked And chkAcknowledgeEmail.Checked Then
                    If ((LCase(ctrName).Contains("chkinfoc"))) Then
                        popInfoCust.Show()

                        hdGridViewContent.Value = "0"
                        hdNavTabsContent.Value = "1"
                        hdAckPopContent.Value = "0"
                        hdInfoCustContent.Value = "1"
                        'chkAcknowledgeEmail.Enabled = False

                        'hdShowAckMsgForm.Value = If(chkAcknowledgeEmail.Checked, "1", "0")
                    Else

                    End If
                Else
                    Dim strMessage = "In order to update the Info Customer Status, the Initial Review and Acknowledge Email Statuses must have been selected each one."
                    'chkAcknowledgeEmail.Checked = False
                    chkInfoCust.Checked = False
                    'chkInitialReview.Checked = False
                    'cleanMe(txtInitialReview)
                    'cleanMe(txtInitialReviewDate)
                    SendMessage(strMessage, messageType.info)
                    Exit Sub
                End If
            End If
        Catch ex As Exception

        End Try
    End Sub

#End Region

#Region "DropDownList"

    Protected Sub ddlInitRev_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ddlSearchReason.SelectedIndexChanged
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try
            'If ddlSearchReason.SelectedIndex = 0 Then
            '    loadSessionClaims()
            'ElseIf ddlSearchReason.SelectedIndex > 0 Then
            '    Dim dsData = DirectCast(Session("DataSource"), DataSet)
            '    Dim dsFilter As DataSet = New DataSet()
            '    Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            '    Dim valueToCompare As String = ddlSearchReason.SelectedItem.Text.ToString()
            '    For Each dr As DataRow In dsData.Tables(0).Rows
            '        If dr.ItemArray(2).ToString() = valueToCompare Then
            '            Dim dtr As DataRow = dtFilter.NewRow()
            '            dtr.ItemArray = dr.ItemArray
            '            dtFilter.Rows.Add(dtr)
            '            'sentence = " and reason = " + valueToCompare + " "
            '            'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '        End If
            '    Next
            '    If dtFilter IsNot Nothing Then
            '        If dtFilter.Rows.Count > 0 Then
            '            dsFilter.Tables.Add(dtFilter)
            '            Session("DataFilter") = dsFilter
            '            lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '            GetClaimsReport("", 1, dsFilter)
            '        Else
            '            lblTotalClaims.Text = 0
            '            grvClaimReport.DataSource = Nothing
            '            grvClaimReport.DataBind()
            '        End If
            '    End If
            'Else
            '    'error message
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try

    End Sub

    Protected Sub ddlTechRev_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ddlInitRev.SelectedIndexChanged
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try
            'If ddlSearchReason.SelectedIndex = 0 Then
            '    loadSessionClaims()
            'ElseIf ddlSearchReason.SelectedIndex > 0 Then
            '    Dim dsData = DirectCast(Session("DataSource"), DataSet)
            '    Dim dsFilter As DataSet = New DataSet()
            '    Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            '    Dim valueToCompare As String = ddlSearchReason.SelectedItem.Text.ToString()
            '    For Each dr As DataRow In dsData.Tables(0).Rows
            '        If dr.ItemArray(2).ToString() = valueToCompare Then
            '            Dim dtr As DataRow = dtFilter.NewRow()
            '            dtr.ItemArray = dr.ItemArray
            '            dtFilter.Rows.Add(dtr)
            '            'sentence = " and reason = " + valueToCompare + " "
            '            'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '        End If
            '    Next
            '    If dtFilter IsNot Nothing Then
            '        If dtFilter.Rows.Count > 0 Then
            '            dsFilter.Tables.Add(dtFilter)
            '            Session("DataFilter") = dsFilter
            '            lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '            GetClaimsReport("", 1, dsFilter)
            '        Else
            '            lblTotalClaims.Text = 0
            '            grvClaimReport.DataSource = Nothing
            '            grvClaimReport.DataBind()
            '        End If
            '    End If
            'Else
            '    'error message
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try

    End Sub

    Protected Sub ddlSearchReason_SelectedIndexChanged(sender As Object, e As EventArgs) Handles ddlTechRev.SelectedIndexChanged
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try
            'If ddlSearchReason.SelectedIndex = 0 Then
            '    loadSessionClaims()
            'ElseIf ddlSearchReason.SelectedIndex > 0 Then
            '    Dim dsData = DirectCast(Session("DataSource"), DataSet)
            '    Dim dsFilter As DataSet = New DataSet()
            '    Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            '    Dim valueToCompare As String = ddlSearchReason.SelectedItem.Text.ToString()
            '    For Each dr As DataRow In dsData.Tables(0).Rows
            '        If dr.ItemArray(2).ToString() = valueToCompare Then
            '            Dim dtr As DataRow = dtFilter.NewRow()
            '            dtr.ItemArray = dr.ItemArray
            '            dtFilter.Rows.Add(dtr)
            '            'sentence = " and reason = " + valueToCompare + " "
            '            'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '        End If
            '    Next
            '    If dtFilter IsNot Nothing Then
            '        If dtFilter.Rows.Count > 0 Then
            '            dsFilter.Tables.Add(dtFilter)
            '            Session("DataFilter") = dsFilter
            '            lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '            GetClaimsReport("", 1, dsFilter)
            '        Else
            '            lblTotalClaims.Text = 0
            '            grvClaimReport.DataSource = Nothing
            '            grvClaimReport.DataBind()
            '        End If
            '    End If
            'Else
            '    'error message
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try

    End Sub

    Protected Sub ddlSearchUser_SelectedIndexChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try
            'If ddlSearchUser.SelectedIndex = 0 Then
            '    loadSessionClaims()
            'ElseIf ddlSearchUser.SelectedIndex > 0 Then
            '    Dim dsData = DirectCast(Session("DataSource"), DataSet)
            '    Dim dsFilter As DataSet = New DataSet()
            '    Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            '    Dim valueToCompare As String = ddlSearchUser.SelectedItem.Text.ToString()
            '    For Each dr As DataRow In dsData.Tables(0).Rows
            '        If dr.ItemArray(13).ToString() = valueToCompare Then
            '            Dim dtr As DataRow = dtFilter.NewRow()
            '            dtr.ItemArray = dr.ItemArray
            '            dtFilter.Rows.Add(dtr)
            '            'sentence = " and reason = " + valueToCompare + " "
            '            'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '        End If
            '    Next
            '    If dtFilter IsNot Nothing Then
            '        If dtFilter.Rows.Count > 0 Then
            '            dsFilter.Tables.Add(dtFilter)
            '            Session("DataFilter") = dsFilter
            '            lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '            GetClaimsReport("", 1, dsFilter)
            '        Else
            '            lblTotalClaims.Text = 0
            '            grvClaimReport.DataSource = Nothing
            '            grvClaimReport.DataBind()
            '        End If
            '    End If
            'Else
            '    'error
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Protected Sub ddlSearchIntStatus_SelectedIndexChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try
            'If ddlSearchIntStatus.SelectedIndex = 0 Then
            '    loadSessionClaims()
            'ElseIf ddlSearchIntStatus.SelectedIndex > 0 Then
            '    Dim dsData = DirectCast(Session("DataSource"), DataSet)
            '    Dim dsFilter As DataSet = New DataSet()
            '    Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            '    Dim valueToCompare As String = ddlSearchIntStatus.SelectedItem.Text.ToString()
            '    For Each dr As DataRow In dsData.Tables(0).Rows
            '        If dr.ItemArray(11).ToString() = valueToCompare Then
            '            Dim dtr As DataRow = dtFilter.NewRow()
            '            dtr.ItemArray = dr.ItemArray
            '            dtFilter.Rows.Add(dtr)
            '            'sentence = " and reason = " + valueToCompare + " "
            '            'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '        End If
            '    Next
            '    If dtFilter IsNot Nothing Then
            '        If dtFilter.Rows.Count > 0 Then
            '            dsFilter.Tables.Add(dtFilter)
            '            Session("DataFilter") = dsFilter
            '            lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '            GetClaimsReport("", 1, dsFilter)
            '        Else
            '            lblTotalClaims.Text = 0
            '            grvClaimReport.DataSource = Nothing
            '            grvClaimReport.DataBind()
            '        End If
            '    End If
            'Else
            '    'error
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Protected Sub ddlSearchExtStatus_SelectedIndexChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try
            'If ddlSearchExtStatus.SelectedIndex = 0 Then
            '    loadSessionClaims()
            'ElseIf ddlSearchExtStatus.SelectedIndex > 0 Then
            '    Dim dsData = DirectCast(Session("DataSource"), DataSet)
            '    Dim dsFilter As DataSet = New DataSet()
            '    Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            '    Dim valueToCompare As String = ddlSearchExtStatus.SelectedItem.Text.ToString()
            '    For Each dr As DataRow In dsData.Tables(0).Rows
            '        If dr.ItemArray(6).ToString() = valueToCompare Then
            '            Dim dtr As DataRow = dtFilter.NewRow()
            '            dtr.ItemArray = dr.ItemArray
            '            dtFilter.Rows.Add(dtr)
            '            'sentence = " and reason = " + valueToCompare + " "
            '            'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '        End If
            '    Next
            '    If dtFilter IsNot Nothing Then
            '        If dtFilter.Rows.Count > 0 Then
            '            dsFilter.Tables.Add(dtFilter)
            '            Session("DataFilter") = dsFilter
            '            lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '            GetClaimsReport("", 1, dsFilter)
            '        Else
            '            lblTotalClaims.Text = 0
            '            grvClaimReport.DataSource = Nothing
            '            grvClaimReport.DataBind()
            '        End If
            '    End If
            'Else
            '    'error
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Protected Sub ddlSearchDiagnose_SelectedIndexChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try
            'If ddlSearchDiagnose.SelectedIndex = 0 Then
            '    loadSessionClaims()
            'ElseIf ddlSearchDiagnose.SelectedIndex > 0 Then
            '    Dim dsData = DirectCast(Session("DataSource"), DataSet)
            '    Dim dsFilter As DataSet = New DataSet()
            '    Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            '    Dim valueToCompare As String = ddlSearchDiagnose.SelectedItem.Text.ToString()
            '    For Each dr As DataRow In dsData.Tables(0).Rows
            '        If dr.ItemArray(3).ToString() = valueToCompare Then
            '            Dim dtr As DataRow = dtFilter.NewRow()
            '            dtr.ItemArray = dr.ItemArray
            '            dtFilter.Rows.Add(dtr)
            '            'sentence = " and reason = " + valueToCompare + " "
            '            'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '        End If
            '    Next
            '    If dtFilter IsNot Nothing Then
            '        If dtFilter.Rows.Count > 0 Then
            '            dsFilter.Tables.Add(dtFilter)
            '            Session("DataFilter") = dsFilter
            '            lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '            GetClaimsReport("", 1, dsFilter)
            '        Else
            '            lblTotalClaims.Text = 0
            '            grvClaimReport.DataSource = Nothing
            '            grvClaimReport.DataBind()
            '        End If
            '    End If
            'Else
            '    'error
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Protected Sub ddlLocat_SelectedIndexChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub ddlVndNo_SelectedIndexChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Dim sentence As String = Nothing
        Try

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub ddlClaimType_SelectedIndexChanged(sender As Object, e As EventArgs)

    End Sub

    Protected Sub ddlPageSize_SelectedIndexChanged(sender As Object, e As EventArgs)
        Dim intValue As Integer
        Dim dsSetDataSource = New DataSet()
        Dim exMessage As String = Nothing

        Try
            If Integer.TryParse(ddlPageSize.SelectedValue, intValue) Then
                grvClaimReport.AllowPaging = True
                grvClaimReport.PageSize = If(ddlPageSize.SelectedValue > 10, CInt(ddlPageSize.SelectedValue), 10)

                Dim CurrentPage = (DirectCast(Session("currentPage"), Integer))
                Session("PageAmounts") = (grvClaimReport.PageSize * CurrentPage).ToString()

                'Dim ItemConttt = (DirectCast(Session("ItemCounts"), Integer))

                'Session("PageAmountsDdl") = grvWishList.PageSize

                Dim dsLoad = DirectCast(Session("DataSource"), DataSet)
                If dsLoad IsNot Nothing Then
                    If dsLoad.Tables(0).Rows.Count > 0 Then
                        loadSessionClaims(dsLoad)
                    End If
                Else
                    loadSessionClaims(Nothing, True)
                End If

            Else
                loadSessionClaims(Nothing, True)
            End If
            updatePagerSettings(grvClaimReport)
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
            'writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, exMessage, "Occurs at time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub ddlLocation_SelectedIndexChanged(sender As Object, e As EventArgs)
        Try
            'Dim selectedValue = hdLocatIndex.Value
            'ddlDiagnoseData.SelectedIndex = ddlDiagnoseData.Items.IndexOf(ddlDiagnoseData.Items.FindByText(selectedValue))
            'txtDiagnoseData.Text = ddlDiagnoseData.SelectedItem.Text

        Catch ex As Exception
            'Dim message = ex.Message
            'Dim pe = message
        End Try

    End Sub

    Protected Sub ddlDiagnoseData_SelectedIndexChanged(sender As Object, e As EventArgs)
        Try
            Dim selectedValue = hdSelectedDiagnose.Value
            ddlDiagnoseData.SelectedIndex = ddlDiagnoseData.Items.IndexOf(ddlDiagnoseData.Items.FindByText(selectedValue))
            txtDiagnoseData.Text = ddlDiagnoseData.SelectedItem.Text

        Catch ex As Exception
            Dim message = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + message + ". At Time: " + DateTime.Now.ToString())
        End Try

    End Sub

    Protected Sub ddlClaimTypeOk_SelectedIndexChanged(sender As Object, e As EventArgs)
        Try

        Catch ex As Exception

        End Try
    End Sub

#End Region

#Region "TextBox"

    Public Sub tqId_TextChanged(sender As Object, e As EventArgs)

    End Sub

    'Private Sub textBox1_KeyPress(sender As Object, e As KeyPressEventArgs)

    'End Sub


#End Region

#Region "Buttons"

    Protected Sub pepe_Click(sender As Object, e As EventArgs) Handles pepe.Click
        Dim exMessage As String = Nothing
        Try
            DownloadExcel()
            'ClientScript.RegisterOnSubmitStatement(Me.GetType(), "Doit", "test22(); return false")
            'SendMessage("Test MEssage", messageType.info, True)
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnGetTemplate_Click(sender As Object, e As EventArgs) Handles btnGetTemplate.Click
        Dim exMessage As String = Nothing
        Dim fileExtension As String = ""
        Dim fileName As String = ""
        Dim methodMessage As String = ""
        Try
            'Session("selectedUser") = userid
            'Session("PMP84DATAFULL") = ds
            'SendMessage("TEst MEssage", messageType.info)
            'pepe_Click(Nothing, Nothing)
            DownloadExcel()
            'SendMessage("the requested excel document is being prepared to be downloaded.", messageType.info)
            'Session("RequestDownloadExcel") = True
            'Dim ctx1 = HttpContext.Current
            'foo()
            'launchSecondaryThread()
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnExcel_Click(sender As Object, e As EventArgs) Handles btnExcel.Click
        Dim exMessage As String = Nothing
        Dim fileExtension As String = ""
        Dim fileName As String = ""
        Try

            Dim dsResult = DirectCast(Session("ClaimsBckData"), DataSet)
            If dsResult IsNot Nothing Then
                If dsResult.Tables(0).Rows.Count > 0 Then

                    Dim userPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)
                    Dim folderPath As String = userPath & "\Claims_Data\"

                    If Not Directory.Exists(folderPath) Then
                        Directory.CreateDirectory(folderPath)
                    End If

                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        fileExtension = objBL.Determine_OfficeVersion()
                        If String.IsNullOrEmpty(fileExtension) Then
                            Exit Sub
                        End If

                        Dim title As String
                        title = "Claims-File-Generated_by "
                        fileName = objBL.adjustDatetimeFormat(title, fileExtension)

                    End Using

                    Dim fullPath = folderPath + fileName

                    Using wb As New XLWorkbook()
                        wb.Worksheets.Add(dsResult.Tables(0), "ClaimsData")
                        wb.SaveAs(fullPath)
                    End Using

                    If File.Exists(fullPath) Then

                        Dim methodMessage = "The Claims Data Document will be downloaded to your documents folder."
                        SendMessage(methodMessage, messageType.info)
                        'Dim rsConfirm As DialogResult = MessageBox.Show("The file was created successfully in this path " & folderPath & " .Do you want to open the created document location?", "CTP System", MessageBoxButtons.YesNo)
                        'If rsConfirm = DialogResult.Yes Then
                        '    Try
                        '        Process.Start("explorer.exe", folderPath)
                        '    Catch Win32Exception As Win32Exception
                        '        Shell("explorer " & folderPath, AppWinStyle.NormalFocus)
                        '    End Try
                        'End If
                    End If

                End If
            End If

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    'load excel file
    Protected Sub btnSave_Click(sender As Object, e As EventArgs) Handles btnSave.Click
        Dim exMessage As String = Nothing
        Dim strResult As String = Nothing
        Try
            'Dim dtExcel = GetDataTableFromExcel(fuOPenEx)
            'If dtExcel IsNot Nothing Then
            '    If dtExcel.Rows.Count > 0 Then
            '        strResult = processExcelData(dtExcel)
            '        If strResult Is Nothing Then
            '            'ok
            '        Else
            '            'errores
            '        End If
            '    End If
            'End If

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    'add files to claim
    Protected Sub btnSaveFile_Click(sender As Object, e As EventArgs) Handles btnSaveFile.Click
        Dim exMessage As String = Nothing
        Dim strResult As String = Nothing
        Try
            AddFiles()
            hdGridViewContent.Value = "0"
            hdNavTabsContent.Value = "1"
            hdAddClaimFile.Value = "0"
            hdLoadAllData.Value = "1"

            'Dim dtExcel = GetDataTableFromExcel(fuOPenEx)
            'If dtExcel IsNot Nothing Then
            '    If dtExcel.Rows.Count > 0 Then
            '        strResult = processExcelData(dtExcel)
            '        If strResult Is Nothing Then
            '            'ok
            '        Else
            '            'errores
            '        End If
            '    End If
            'End If

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnReset_Click(sender As Object, e As EventArgs) Handles convert.Click
        Dim exMessage As String = " "
        Try
            Dim ds = DirectCast(Session("ClaimsBckData"), DataSet)
            Session("DataSource") = ds
            Session("DataFilter") = ds
            hiddenId2.Value = 1
            hiddenId1.Value = 0
            loadSessionClaims()

            'ScriptManager.RegisterStartupScript(Me, Page.GetType, "CleanControl", "cleanDDLRows()", True)
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    'Protected Sub btnSaveTab_Click(sender As Object, e As EventArgs)
    '    Dim exMessage As String = " "
    '    Try
    '        'mdClaimDetailsExp.Hide()
    '    Catch ex As Exception
    '        exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
    '    End Try
    'End Sub

    Protected Sub btnBackFile_click(sender As Object, e As EventArgs) Handles btnBackFile.Click
        closeAtkPopup()
    End Sub

    Protected Sub BtnBackSeeFiles_click(sender As Object, e As EventArgs) Handles BtnBackSeeFiles.Click
        hdSeeFilesContent.Value = "0"
        hdGridViewContent.Value = "0"
        hdNavTabsContent.Value = "1"
        'closeAtkPopup()
    End Sub

    Protected Sub BtnBackSeeFiles1_click(sender As Object, e As EventArgs) Handles BtnBackSeeFiles1.Click

        popAckEmail.Hide()

        hdAckPopContent.Value = "0"
        hdInfoCustContent.Value = "0"
        hdGridViewContent.Value = "0"
        hdNavTabsContent.Value = "1"
        'closeAtkPopup()
    End Sub

    Protected Sub BtnBackSeeFiles2_click(sender As Object, e As EventArgs) Handles BtnBackSeeFiles2.Click

        popInfoCust.Hide()

        hdInfoCustContent.Value = "0"
        hdAckPopContent.Value = "0"
        hdGridViewContent.Value = "0"
        hdNavTabsContent.Value = "1"
        'closeAtkPopup()
    End Sub

    Protected Sub btnSaveMessageAck_click(sender As Object, e As EventArgs) Handles btnSaveMessageAck.Click
        Dim exMessage As String = " "
        Try
            'lblTextEditorAck.Text = txtEditorExtender1.Text
            hdTextEditorAckMessage.Value = txtEditorExtender1.Text

            hdAckPopContent.Value = "0"
            hdGridViewContent.Value = "0"
            hdNavTabsContent.Value = "1"

            'lnkAcknowledgeEmail_Click(Nothing, Nothing)
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try

        'closeAtkPopup()
    End Sub

    Protected Sub btnSaveMessageInfoC_click(sender As Object, e As EventArgs) Handles btnSaveMessageInfoC.Click
        Dim exMessage As String = " "
        Try
            'lblTextEditorInfoCust.Text = txtEditorExtender2.Text
            hdTextEditorInfoCustMessage.Value = txtEditorExtender2.Text

            hdAckPopContent.Value = "0"
            hdInfoCustContent.Value = "0"
            hdGridViewContent.Value = "0"
            hdNavTabsContent.Value = "1"

            'lnkAcknowledgeEmail_Click(Nothing, Nothing)
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try

        'closeAtkPopup()
    End Sub

    Protected Sub btnVoid_Click(sender As Object, e As EventArgs) Handles btnVoidClaim.Click
        Dim exMessage As String = " "
        Dim methodMessage As String = Nothing
        Dim strMessage As String = Nothing
        Try
            Dim claimNo = txtClaimNoData.Text.Trim()
            Dim wrnNo = hdSeq.Value.Trim()
            Dim ds As DataSet = New DataSet()

            If Not String.IsNullOrEmpty(hdSeq.Value.Trim()) Then

                chkinitial.Value = "V"

                Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                    Dim rsResult = objBL.getNWrnClaimsHeader(claimNo, ds)
                    If rsResult > 0 Then
                        If ds IsNot Nothing Then
                            If ds.Tables(0).Rows.Count > 0 Then

                                If Not ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim().Equals("7") And Not ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim().Equals("8") Then

                                    saveComm("CLAIM VOIDED")
                                    saveComm("V : VOIDED")

                                    Dim rsIntUpdate = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().Trim(), datenow, hournow)
                                    If rsIntUpdate < 0 Then
                                        methodMessage = "There is an error updating the Internal status for the Warranty Claim Number: " + wrnNo + "."
                                        SendMessage(methodMessage, messageType.Error)
                                    Else
                                        Dim rsUpdate = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                                        If rsUpdate < 0 Then
                                            methodMessage = "There is an error updating the status for the Warranty Claim Number: " + wrnNo + "."
                                            SendMessage(methodMessage, messageType.Error)
                                        Else
                                            Dim rsExtUpdate = objBL.UpdateNWHeaderStatForce(claimNo, "9", "7,8", False)
                                            If rsExtUpdate < 0 Then
                                                methodMessage = "There is an error updating the status for the Claim Number: " + claimNo + "."
                                                SendMessage(methodMessage, messageType.Error)
                                            Else
                                                methodMessage = "The Void Proccess was successful."
                                                SendMessage(methodMessage, messageType.success)
                                            End If

                                        End If
                                    End If



                                End If

                            End If
                        End If
                    End If

                End Using

                'ExtraLoadGrv1(claimNo)
                btnSearchFilter_Click(Nothing, Nothing)

                hdNavTabsContent.Value = "0"
                hdClaimNumber.Value = ""
                hdGridViewContent.Value = "1"

            End If

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnReverseReject_Click(sender As Object, e As EventArgs) Handles btnReverseReject.Click
        Dim methodMessage As String = Nothing
        Dim exMessage As String = " "
        Try

            Dim claimNo = txtClaimNoData.Text.Trim()
            Dim wrnNo = hdSeq.Value.Trim()
            Dim ds As DataSet = New DataSet()
            If Not String.IsNullOrEmpty(hdSeq.Value.Trim()) Then

                chkinitial.Value = "I"

                Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                    Dim rsResult = objBL.getNWrnClaimsHeader(claimNo, ds)
                    If rsResult > 0 Then
                        If ds IsNot Nothing Then
                            If ds.Tables(0).Rows.Count > 0 Then

                                saveComm("REJECT REVERTED")
                                saveComm("I : IN PROC")
                                Dim curExtStat = ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()

                                Dim upd1 = UpdateWIntFinalStat(wrnNo, chkinitial.Value, "")
                                If upd1 > 0 Then
                                    Dim del1 = DeleteFromIntStatus(wrnNo, "R")
                                    If del1 Then
                                        Dim rsUpdate = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                                        If rsUpdate < 0 Then
                                            methodMessage = "There is an error updating the status for the Warranty Claim Number: " + wrnNo + "."
                                            SendMessage(methodMessage, messageType.Error)
                                        Else
                                            Dim rsExtUpdate = objBL.UpdateNWHeaderStatForce(claimNo, "2", curExtStat, True)
                                            If rsExtUpdate < 0 Then
                                                methodMessage = "There is an error updating the status for the Claim Number: " + claimNo + "."
                                                SendMessage(methodMessage, messageType.Error)
                                            Else

                                                'hdIsReopen.Value = "0"
                                                hdIsReversed.Value = "0"

                                                methodMessage = "The Reverse Reject Proccess was successful."
                                                SendMessage(methodMessage, messageType.success)
                                            End If
                                        End If
                                    Else
                                        methodMessage = "There is an error deleting the rejected internal status for warning number" + wrnNo + "."
                                        SendMessage(methodMessage, messageType.Error)
                                    End If
                                Else
                                    methodMessage = "There is an error updating the internal status for the Warranty Claim Number: " + wrnNo + "."
                                    SendMessage(methodMessage, messageType.Error)
                                End If
                            End If
                        End If
                    End If

                End Using

                btnSearchFilter_Click(Nothing, Nothing)

                hdNavTabsContent.Value = "0"
                hdClaimNumber.Value = ""
                hdGridViewContent.Value = "1"

            End If

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnReopen_Click(sender As Object, e As EventArgs) Handles btnReopenClaim.Click
        Dim methodMessage As String = Nothing
        Dim exMessage As String = " "
        Try
            Dim claimNo = txtClaimNoData.Text.Trim()
            Dim wrnNo = hdSeq.Value.Trim()
            Dim ds As DataSet = New DataSet()
            If Not String.IsNullOrEmpty(hdSeq.Value.Trim()) Then

                chkinitial.Value = "I"

                Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                    Dim rsResult = objBL.getNWrnClaimsHeader(claimNo, ds)
                    If rsResult > 0 Then
                        If ds IsNot Nothing Then
                            If ds.Tables(0).Rows.Count > 0 Then
                                If ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim().Equals("7") Or ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim().Equals("3") Or ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim().Equals("4") Then
                                    saveComm("CLAIM REOPENED")
                                    saveComm("I : IN PROC")
                                    Dim curExtStat = ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()

                                    Dim rsUpdate = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                                    If rsUpdate < 0 Then
                                        methodMessage = "There is an error updating the status for the Warranty Claim Number: " + wrnNo + "."
                                        SendMessage(methodMessage, messageType.Error)
                                        'error message
                                    Else
                                        Dim rsExtUpdate = objBL.UpdateNWHeaderStatForce(claimNo, "2", curExtStat, True)
                                        If rsExtUpdate < 0 Then
                                            methodMessage = "There is an error updating the status for the Claim Number: " + claimNo + "."
                                            SendMessage(methodMessage, messageType.Error)
                                        Else

                                            hdIsReopen.Value = "0"

                                            methodMessage = "The Re-Open Proccess was successful."
                                            SendMessage(methodMessage, messageType.success)
                                        End If
                                    End If
                                Else
                                    methodMessage = "The claim does not was Re-Open because claim must be in closed status."
                                    SendMessage(methodMessage, messageType.Error)
                                End If
                            End If
                        End If
                    End If
                End Using

                'ExtraLoadGrv1(claimNo)
                btnSearchFilter_Click(Nothing, Nothing)

                hdNavTabsContent.Value = "0"
                hdClaimNumber.Value = ""
                hdGridViewContent.Value = "1"

            End If

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnSentToComm_Click(sender As Object, e As EventArgs) Handles btnSentToComm.Click
        Dim exMessage As String = " "
        Dim methodMessage As String = Nothing
        Dim strMessage As String = Nothing
        Try
            hdGridViewContent.Value = "0"
            hdNavTabsContent.Value = "1"
            hdCurrentActiveTab.Value = "#claim-comments"
            hdShowCloseBtn.Value = "0"

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub btnCloseClaim_Click(sender As Object, e As EventArgs) Handles btnCloseClaim.Click
        Dim exMessage As String = " "
        Dim methodMessage As String = Nothing
        Dim strMessage As String = Nothing
        Try

            If chkApproved.Checked Or chkDeclined.Checked Then

                hdGridViewContent.Value = "1"
                hdNavTabsContent.Value = "0"
                hdClaimNumber.Value = ""
                hdCurrentActiveTab.Value = "#claimoverview"
                hdGetCommentTab.Value = "0"

                Dim totalClaimValue = txtTotValue.Text.Trim()
                Dim resultValue As Double = 0
                Double.TryParse(totalClaimValue, resultValue)

                'revisar este proceso

                'If resultValue <= 500 Then

                If Not String.IsNullOrEmpty(Session("lastComm").ToString().Trim()) Then
                    'hdOnlyReopen.Value = "1"
                    'cambiar button
                    'allow to add new comment and see comment
                    'allow to load files
                    'allow to update info

                    AfterReopenProc(True)
                Else
                    btnSaveTab_Click(Nothing, Nothing)
                End If
            Else
                methodMessage = "The Claim must be approved and then ti will be ready to close.."
                SendMessage(methodMessage, messageType.warning)
            End If

            'mdClaimDetailsExp.Hide()
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Private Sub AfterReopenProc(Optional endProc As Boolean = False)
        Dim wrnNo As String = ""
        Dim claimNo As String = ""
        Dim resultProc As Boolean = False
        Dim strMessageOut As String = ""
        Dim lstMessages As List(Of String) = New List(Of String)()
        Try

            If Not String.IsNullOrEmpty(hdSeq.Value.Trim()) Then
                wrnNo = hdSeq.Value.Trim()
                claimNo = txtClaimNoData.Text.Trim()

#Region "Update Diagnose"

                resultProc = UpdateDiagnoseValue(claimNo, strMessageOut)
                Dim blResultProcDiag As Boolean = False
                blResultProcDiag = resultProc
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    'Exit Sub
                End If

#End Region

#Region "Update Warranty Header Data"

                resultProc = UpdateWHeaderValues(wrnNo, strMessageOut)
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    'Exit Sub
                End If

#End Region

#Region "Get Data to process the full method"

                resultProc = PrepareDataTofullProcess(claimNo, strMessageOut)
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    'Exit Sub
                End If

#End Region

                If blResultProcDiag Then
                    If resultProc Then

#Region "Update Inicial to NW Header"

                        'resultProc = UpdateNWHeaderStatus(claimNo, strMessageOut)
                        'If Not resultProc Then
                        '    If Not String.IsNullOrEmpty(strMessageOut) Then
                        '        lstMessages.Add(strMessageOut)
                        '    End If
                        '    'method to prepare the message
                        '    'Exit Sub
                        'End If

#End Region

#Region "Save Engine Info"
                        resultProc = SaveEngineInfo(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region

#Region "Save New Claim Desc"
                        resultProc = SaveNewClaimDescProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region

#Region "Update Claim Reference"

                        If endProc Then
                            resultProc = endReopenProc(wrnNo, claimNo, strMessageOut)
                            If Not resultProc Then
                                If Not String.IsNullOrEmpty(strMessageOut) Then
                                    lstMessages.Add(strMessageOut)
                                End If
                                'method to prepare the message
                                'Exit Sub
                            End If
                        End If

#End Region

                        If lstMessages.Count = 0 Then

                            Dim objClaim = DirectCast(Session("finalObject"), FinalClaimObj)
                            clearAllDataFields()

                            btnSearchFilter_Click(Nothing, Nothing)

                            hdNavTabsContent.Value = "0"
                            hdClaimNumber.Value = ""
                            hdGridViewContent.Value = "1"

                            hdIsReopen.Value = "1"

                            Dim endMessage As String = Nothing
                            Dim username As String = Nothing
                            Dim FullPrivilegeUser = ConfigurationManager.AppSettings("claimFullPrivilegesApprove").ToString()

                            If Not String.IsNullOrEmpty(hdCLMuser.Value.Trim()) Then
                                GetUserEmailByUserId(hdCLMuser.Value.Trim(), username)
                            Else
                                GetUserEmailByUserId(FullPrivilegeUser.Split("@")(0), username)
                            End If

                            endMessage = "Record Updated"
                            SendMessage(endMessage, messageType.success)

                        Else

                            hdNavTabsContent.Value = "1"
                            Dim strMess = Session("currentClaim").ToString()

                            Dim dss = DirectCast(Session("Datasource"), DataSet)
                            Dim bIs = dss.Tables(0).AsEnumerable().Any(Function(oo) oo.Item("mhmrnr").ToString().Trim().Equals(txtClaimNoData.Text.Trim()))
                            Dim qq = If(bIs, dss.Tables(0).AsEnumerable().Where(Function(aa) aa.Item("mhmrnr").ToString().Trim().Equals(txtClaimNoData.Text.Trim())).First(), Nothing)

                            Dim names = GetCurrentIntStatus(hdSeq.Value.Trim())
                            'Dim names = If(qq IsNot Nothing, qq.Item("cwstde").ToString().Trim().ToUpper(), Nothing)

                            hdClaimNumber.Value = String.Format(Session("BaseMessage").ToString(), txtClaimNoData.Text.Trim(), names)
                            lblClaimQuickOverview.Text = hdClaimNumber.Value
                            hdGridViewContent.Value = "0"

                            Dim lstCol As List(Of String) = New List(Of String)()
                            lstCol.Add("Description")

                            Dim cols As ParamArrayAttribute = New ParamArrayAttribute()
                            'cols

                            Dim htmlTable = GetDatatableFromStringList(lstMessages, "Description")


                            'Dim htmlTable = "<table><tr><td>Pedro es bueno</td></tr></table>"

                            'SendMessage("There is warnings in the proccess. Please check the typed data.", messageType.warning)
                            SendMessage(htmlTable, messageType.warning)

                        End If

                    Else
                        strMessageOut = "There is an error getting data for the Claim Number: " + claimNo + "."
                        SendMessage(strMessageOut, messageType.Error)
                    End If
                End If

            End If

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub btnCloseTab_Click(sender As Object, e As EventArgs) Handles btnCloseTab.Click
        Dim exMessage As String = " "
        Dim methodMessage As String = Nothing
        Dim strMessage As String = Nothing
        Try
            hdGridViewContent.Value = "1"
            hdNavTabsContent.Value = "0"
            hdClaimNumber.Value = ""
            hdCurrentActiveTab.Value = "#claimoverview"
            hdGetCommentTab.Value = "0"
            hdAddVndComments.Value = "0"
            hdAddComments.Value = "0"
            hdAckPopContent.Value = "0"
            hdInfoCustContent.Value = "0"
            hdLoadAllData.Value = "1"

            clearAllDataFields()

            'Dim blClose = cmdCloseClaim(strMessage)
            'If blClose Then
            '    CleanCommentsValues()
            '    ClearInputCustom(navsSection)

            '    Dim dsData = DirectCast(Session("DataSource"), DataSet)
            '    grvClaimReport.DataSource = dsData.Tables(0)
            '    grvClaimReport.DataBind()

            '    If Not strMessage.Trim().ToUpper().Equals("PREVENT") Then
            '        methodMessage = "Claim closed successfully."
            '        SendMessage(methodMessage, messageType.warning)
            '    End If

            'Else
            '    methodMessage = "An error has occurred closing the Claim."
            '    SendMessage(methodMessage, messageType.warning)
            'End If

            'mdClaimDetailsExp.Hide()
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnChangePart_Click(sender As Object, e As EventArgs) Handles btnChangePart.Click
        Try
            If Not String.IsNullOrEmpty(txtVendorNo.Text.Trim()) Then
                Dim partNo As String = txtPartNoData.Text.Trim()
                If Not String.IsNullOrEmpty(partNo) Then
                    GetPartUsableData(partNo)
                Else
                    'error part is empty
                End If
            Else
                'error vendor is empty
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnChangeVendor_Click(sender As Object, e As EventArgs) Handles btnChangeVendor.Click
        Try
            If Not String.IsNullOrEmpty(txtVendorNo.Text.Trim()) Then
                GetVendorCustomValue(txtVendorNo.Text.Trim())
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    ''' <summary>
    ''' Main Method to save claim data
    ''' </summary>
    ''' <param name="sender"></param>
    ''' <param name="e"></param>
    Protected Sub btnSaveTab_Click(sender As Object, e As EventArgs) Handles btnSaveTab.Click
        Dim rsUpdateComments As Integer = -1
        Dim rsUpdateContacts As Integer = -1
        Dim claimNo As String = Nothing
        Dim wrnNo As String = Nothing
        Dim hournow As String = Nothing
        Dim datenow As String = Nothing
        Dim lstContactDataMiss As List(Of String) = New List(Of String)()
        Dim strMessageOut As String = Nothing
        Dim lstMessages As List(Of String) = New List(Of String)()
        Dim resultProc As Boolean = False

        'test user
        'Session("userid") = "AROBLES"
        'test user

        Try
            'must send email to customer here. Check this email template

            If Not String.IsNullOrEmpty(txtClaimNoData.Text.Trim()) And String.IsNullOrEmpty(hdSeq.Value.Trim()) Then
#Region "NON-WARRANTY CLAIMS"

                claimNo = txtClaimNoData.Text.Trim()
                wrnNo = hdSeq.Value.Trim()

#Region "Save Comments"
                resultProc = UpdateCommentsInNWHeader(txtCustStatement.Text.Trim(), claimNo, strMessageOut)
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    Exit Sub
                End If
#End Region
#Region "Contact Info"
                resultProc = UpdateContactInfoByClaimNo(claimNo, strMessageOut)
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    Exit Sub
                End If
#End Region
#Region "Approval process"
                resultProc = UpdateContactAndDiagnose(claimNo, strMessageOut)
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    Exit Sub
                End If
#End Region

#End Region
            ElseIf Not String.IsNullOrEmpty(hdSeq.Value.Trim()) Then
#Region "WARRANTY CLAIMS"

                wrnNo = hdSeq.Value.Trim()
                claimNo = txtClaimNoData.Text.Trim()

#Region "Update Diagnose"

                resultProc = UpdateDiagnoseValue(claimNo, strMessageOut)
                Dim blResultProcDiag As Boolean = False
                blResultProcDiag = resultProc
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    'Exit Sub
                End If

#End Region
#Region "Update Warranty Header Data"

                resultProc = UpdateWHeaderValues(wrnNo, strMessageOut)
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    'Exit Sub
                End If

#End Region
#Region "Get Data to process the full method"

                resultProc = PrepareDataTofullProcess(claimNo, strMessageOut)
                If Not resultProc Then
                    If Not String.IsNullOrEmpty(strMessageOut) Then
                        lstMessages.Add(strMessageOut)
                    End If
                    'method to prepare the message
                    'Exit Sub
                End If

#End Region
#Region "Exists Warranty Claim"

                If blResultProcDiag Then

                    If resultProc Then ' if teh previous query under CSMREH has data all the method continues if not end.

                        'updating internal status
#Region "Update Inicial to NW Header"

                        resultProc = UpdateNWHeaderStatus(claimNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If

#End Region
#Region "Internal Statuses Update"

#Region "Initial Review"
                        resultProc = InitialStatusProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Aknolowdge Email"
                        resultProc = AcknowledgeEmailProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Info Requested"
                        resultProc = InfoRequestedProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Part Requested"
                        resultProc = PartRequestedProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Part Received"
                        resultProc = PartReceivedProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Tech Review"
                        resultProc = TechReviewProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Waiting Supplier"
                        resultProc = WaitingSupplierProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region

#End Region
#Region "Save Engine Info"
                        resultProc = SaveEngineInfo(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Save New Claim Desc"
                        resultProc = SaveNewClaimDescProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Quarantine if selected"
                        resultProc = QuarantineProcess(wrnNo, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Auth to put costs (Consequental Damages and Freight values)"
                        resultProc = AuthToPutCostsProcess(claimNo, wrnNo, strMessageOut) ' consequental damages
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "CNTRL parm 186 status (Claim completed and declined - call to reject method and exit method if true )"

                        resultProc = Param186StatusIfDenied(wrnNo, "I", strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        Else
                            'claim denied


                            'GetClaimsReport("", 1, Nothing, Nothing)

                            btnSearchFilter_Click(Nothing, Nothing)

                            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

                            'Dim dt = dsData.Tables(0).AsEnumerable().Where(Function(ee) Not ee.Item("MHMRNR").ToString().Trim().Equals(claimNo)).CopyToDataTable()
                            'Dim dsNew As DataSet = New DataSet()
                            'dsNew.Tables.Add(dt)

                            'grvClaimReport.DataSource = dsNew.Tables(0)
                            'grvClaimReport.DataBind()
                            'Session("DataSource") = dsNew
                            'Session("ItemCounts") = dsNew.Tables(0).Rows.Count.ToString()
                            'lblTotalClaims.Text = dsNew.Tables(0).Rows.Count.ToString()

                            hdNavTabsContent.Value = "0"
                            hdClaimNumber.Value = ""
                            hdGridViewContent.Value = "1"

                            hdIsReopen.Value = "1"

                            strMessageOut = "The Claim Number: " + claimNo + " has rejected and closed successfully."
                            SendMessage(strMessageOut, messageType.success)

                            Exit Sub

                        End If

#End Region
#Region "Get email and user of person in charge to approve claims >500 and <=1500"
                        resultProc = GetEmailAndUserAuthApp500To1500(strMessageOut)
                        'Session("Obj500to1500")
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Get User and Limit to generate credit memo"

                        resultProc = GetUserAndLimitForCMGeneration(strMessageOut)
                        'Session("ObjCurUserLmt")
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Get General Values for Claim"

#Region "Double Variables"

                        Dim resultParts As Double = 0
                        Dim resultFreight As Double = 0
                        Dim resultAmoApproved As Double = 0
                        Dim resultLimit As Double = 0
                        Dim resultConsDamage As Double = 0
                        Dim totalClaimValue As Double = 0
                        Dim totalLimit As Double = 0
                        Dim totalConsDamage As Double = 0

#End Region

                        resultProc = GetGeneralValues(wrnNo, strMessageOut, totalClaimValue, totalLimit, totalConsDamage, resultFreight, resultParts, resultAmoApproved)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If

#End Region
#Region "Claim Approved and Completed < $500"
                        resultProc = ClaimApprovedCompletedUnder500(wrnNo, totalClaimValue, totalLimit, totalConsDamage, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        Else

                            Dim objClaim = DirectCast(Session("finalObject"), FinalClaimObj)
                            'GetClaimsReport("", 1, Nothing, Nothing)

                            btnSearchFilter_Click(Nothing, Nothing)

                            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

                            'If Not objClaim.RequiresAuth Then
                            '    Dim dt = dsData.Tables(0).AsEnumerable().Where(Function(ee) Not ee.Item("MHMRNR").ToString().Trim().Equals(claimNo)).CopyToDataTable()
                            '    Dim dsNew As DataSet = New DataSet()
                            '    dsNew.Tables.Add(dt)
                            '    dsData = dsNew
                            'End If

                            'grvClaimReport.DataSource = dsData.Tables(0)
                            'grvClaimReport.DataBind()
                            'Session("DataSource") = dsData
                            'Session("ItemCounts") = dsData.Tables(0).Rows.Count.ToString()
                            'lblTotalClaims.Text = dsData.Tables(0).Rows.Count.ToString()

                            hdNavTabsContent.Value = "0"
                            hdClaimNumber.Value = ""
                            hdGridViewContent.Value = "1"

                            hdIsReopen.Value = "1"

                            strMessageOut = "The Claim Number: " + claimNo + " has closed successfully."
                            SendMessage(strMessageOut, messageType.success)

                            Exit Sub
                        End If
#End Region
#Region "Send Email to person in charge to approved if Claim > $500"
                        Dim dbLimit As Double = 0
                        resultProc = SendEmailToPIChAppClaimOver500(wrnNo, totalClaimValue, totalLimit, dbLimit, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "Save Authorizacion by Sales Over $500"
                        resultProc = SaveAuthForOver500Sales(wrnNo, totalClaimValue, resultFreight, resultParts, resultAmoApproved, dbLimit, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        End If
#End Region
#Region "If claim > $500 and Credit Memo was generated, the Claim can be closed for Quality Claims person in charge (Call Method Close Claim)"
                        resultProc = ClaimOver500AndCMGenCloseClaim(wrnNo, totalClaimValue, strMessageOut)
                        If Not resultProc Then
                            If Not String.IsNullOrEmpty(strMessageOut) Then
                                lstMessages.Add(strMessageOut)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        Else
                            hdIsReopen.Value = "1"
                        End If
#End Region
#Region "Clear All Data"

                        'clearAllDataFields()

#End Region

                        If lstMessages.Count = 0 Then

                            Dim objClaim = DirectCast(Session("finalObject"), FinalClaimObj)

                            clearAllDataFields()

                            'GetClaimsReport("", 1, Nothing, Nothing)

                            btnSearchFilter_Click(Nothing, Nothing)

                            'Dim dsData = DirectCast(Session("DataSource"), DataSet)

                            'If Not objClaim.RequiresAuth Then
                            '    Dim dt = dsData.Tables(0).AsEnumerable().Where(Function(ee) Not ee.Item("MHMRNR").ToString().Trim().Equals(claimNo)).CopyToDataTable()
                            '    Dim dsNew As DataSet = New DataSet()
                            '    dsNew.Tables.Add(dt)
                            '    dsData = dsNew
                            'End If

                            'grvClaimReport.DataSource = dsData.Tables(0)
                            'grvClaimReport.DataBind()
                            'Session("DataSource") = dsData
                            'Session("ItemCounts") = dsData.Tables(0).Rows.Count.ToString()
                            'lblTotalClaims.Text = dsData.Tables(0).Rows.Count.ToString()

                            hdNavTabsContent.Value = "0"
                            hdClaimNumber.Value = ""
                            hdGridViewContent.Value = "1"

                            hdIsReopen.Value = "1"

                            'display message
                            'Record updated
                            Dim endMessage As String = Nothing
                            Dim username As String = Nothing
                            Dim FullPrivilegeUser = ConfigurationManager.AppSettings("claimFullPrivilegesApprove").ToString()

                            If Not String.IsNullOrEmpty(hdCLMuser.Value.Trim()) Then
                                GetUserEmailByUserId(hdCLMuser.Value.Trim(), username)
                            Else
                                GetUserEmailByUserId(FullPrivilegeUser.Split("@")(0), username)
                            End If

                            If String.IsNullOrEmpty(txtClaimAuth.Text.Trim()) Then
                                If Not objClaim.Over500Auth Then
                                    endMessage = "The claim approval process is under pending authorization by " + username.ToUpper() + "."
                                Else
                                    endMessage = "The authorization has been made for the claim number " + claimNo + "."
                                End If
                            Else
                                endMessage = "Record Updated"
                            End If

                            SendMessage(endMessage, messageType.success)

                        Else

                            hdNavTabsContent.Value = "1"
                            Dim strMess = Session("currentClaim").ToString()

                            Dim dss = DirectCast(Session("Datasource"), DataSet)
                            Dim bIs = dss.Tables(0).AsEnumerable().Any(Function(oo) oo.Item("mhmrnr").ToString().Trim().Equals(txtClaimNoData.Text.Trim()))
                            Dim qq = If(bIs, dss.Tables(0).AsEnumerable().Where(Function(aa) aa.Item("mhmrnr").ToString().Trim().Equals(txtClaimNoData.Text.Trim())).First(), Nothing)

                            Dim names = GetCurrentIntStatus(hdSeq.Value.Trim())
                            'Dim names = If(qq IsNot Nothing, qq.Item("cwstde").ToString().Trim().ToUpper(), Nothing)

                            hdClaimNumber.Value = String.Format(Session("BaseMessage").ToString(), txtClaimNoData.Text.Trim(), names)
                            lblClaimQuickOverview.Text = hdClaimNumber.Value
                            hdGridViewContent.Value = "0"

                            Dim lstCol As List(Of String) = New List(Of String)()
                            lstCol.Add("Description")

                            Dim cols As ParamArrayAttribute = New ParamArrayAttribute()
                            'cols

                            Dim htmlTable = GetDatatableFromStringList(lstMessages, "Description")


                            'Dim htmlTable = "<table><tr><td>Pedro es bueno</td></tr></table>"

                            'SendMessage("There is warnings in the proccess. Please check the typed data.", messageType.warning)
                            SendMessage(htmlTable, messageType.warning)

                        End If

                    Else
                        strMessageOut = "There is an error getting data for the Claim Number: " + claimNo + "."
                        SendMessage(strMessageOut, messageType.Error)
                        'display message
                    End If

                Else

                    hdNavTabsContent.Value = "1"
                    hdGridViewContent.Value = "0"

                    strMessageOut = "The Diagnose must be selected in order to work with this Claim."
                    SendMessage(strMessageOut, messageType.warning)

                End If


#End Region

#End Region
            End If
        Catch ex As Exception
            'get error in log
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub clearAllDataFields(Optional flag As Boolean = False)
        Try
            Dim lstPanels As List(Of String) = New List(Of String)()
            lstPanels.Add("MainContent_pnISDet")
            lstPanels.Add("MainContent_pnInformation")
            lstPanels.Add("MainContent_pnContact")
            lstPanels.Add("MainContent_pnRestock")
            lstPanels.Add("MainContent_pnSalesDept")
            lstPanels.Add("MainContent_pnPartImage")
            lstPanels.Add("MainContent_pnClaimsDept")
            lstPanels.Add("MainContent_pnExternalStatus")
            lstPanels.Add("MainContent_pnTotals")
            lstPanels.Add("MainContent_pnInternalStatus")
            lstPanels.Add("MainContent_pnConsequentalDamage")
            lstPanels.Add("lblSecondTabDesc")
            Dim i As Integer = 0

            For Each hc In navsSection.Controls

                Dim qty = lstPanels.AsEnumerable().Where(Function(x) LCase(x).Contains(LCase(hc.ClientID)))
                If qty.Count = 1 Then
                    Dim newIter = navsSection.Controls(i).Controls

                    For Each lvHc In newIter
                        If flag Then
                            DefaultInputConf(Nothing, lvHc)
                        Else
                            ClearInputCustom(Nothing, lvHc)
                        End If
                    Next

                End If
                i += 1
            Next

            'For Each item As String In lstPanels
            '    Dim cnt = navsSection.Controls(0)
            '    If cnt IsNot Nothing Then
            '        ClearInputCustom(cnt)
            '    End If
            'Next
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function cmdCloseClaim(Optional ByRef strMessage As String = Nothing) As Boolean
        Dim totalVal As Double = 0
        Dim result As Boolean = False
        Try
            If Not String.IsNullOrEmpty(hdSeq.Value.Trim()) And Not String.IsNullOrEmpty(txtClaimNoData.Text.Trim()) Then

                Dim dsClose As DataSet = New DataSet()
                'Dim flagClosed = GetClosedClaims(hdSeq.Value.Trim(), dsClose) ' review it is not working yet

                If True Then

                    Dim wrnNo = hdSeq.Value.Trim()
                    Dim claimNo = txtClaimNoData.Text.Trim()
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        Dim dsGet = New DataSet()
                        Dim rsGet = objBL.GetRGAAmountByClaim(txtClaimNoData.Text.Trim(), dsGet)
                        If rsGet > 0 Then
                            If dsGet IsNot Nothing Then
                                If dsGet.Tables(0).Rows.Count > 0 Then
                                    Dim RGAAmount As Integer = 0
                                    Dim goahead = Integer.TryParse(dsGet.Tables(0).Rows(0).Item("TRGAH").ToString().Trim(), RGAAmount)
                                    If RGAAmount <> 0 And goahead Then
                                        strMessage = "Return has an RGA. It has to be processed to close this Return"
                                        Return result
                                    Else
                                        'message (Are you sure, you want to close this claim?.)
                                        If True Then
                                            If Not String.IsNullOrEmpty(txtDiagnoseData.Text) Then
                                                Dim checkComm = saveComm("7 : CLAIM CLOSED", strMessage)

                                                chkinitial.Value = "C"
                                                Dim rsUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                                                If rsUpd > 0 Then
                                                    If hdFlagUpload.Value = "U" Then
                                                        Dim rsUpdClose = objBL.UpdateNWHeaderStat(claimNo, "7")
                                                        If rsUpdClose > 0 Then
                                                            result = True
                                                            strMessage = "Claim Closed."
                                                        Else
                                                            'error log
                                                            strMessage = "There is an error updating the NW Header status for the claim number: " + claimNo + "."
                                                            Return result
                                                        End If
                                                    Else
                                                        result = True
                                                        strMessage = "Claim Closed."
                                                    End If
                                                Else
                                                    'error log
                                                    strMessage = "There is an error updating the W Header status for the warning number: " + wrnNo + "."
                                                    Return result
                                                End If

                                                'call gotonew
                                                'fillcell1(strwhere)

                                                deactTxt()
                                                deactCmd()
                                                deactCmb()

                                            Else
                                                strMessage = "Claim can not be closed without a Diagnose selected."
                                                Return result
                                            End If
                                        Else

                                        End If

                                    End If
                                Else
                                    strMessage = "There is an error getting the RGA data for the claim number: " + claimNo + "."
                                    Return result
                                End If
                            Else
                                strMessage = "There is an error getting the RGA data for the claim number: " + claimNo + "."
                                Return result
                            End If
                        Else
                            strMessage = "There is an error getting the RGA data for the claim number: " + claimNo + "."
                            Return result
                        End If

                    End Using
                Else
                    result = True
                    strMessage = "PREVENT"
                End If

            Else
                strMessage = "The claim and warning numbers must have a value in order to proceed."
                Return result
            End If

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function cmdApproveds(Optional ByRef strMessage As String = Nothing) As Boolean
        Dim totalVal As Double = 0
        Dim result As Boolean = False
        Try
            If String.IsNullOrEmpty(hdSeq.Value.Trim()) And Not String.IsNullOrEmpty(txtClaimNoData.Text.Trim()) Then

                'Are you sure, you want to approve and generate CM to this claim?.
                If True Then
                    Dim wrnNo = hdSeq.Value.Trim()
                    Dim claimNo = txtClaimNoData.Text.Trim()
                    hdSwLimitAmt.Value = 0
                    Dim user = Session("userid").ToString().ToUpper()

                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        Dim dsGet = New DataSet()
                        Dim rsGet = objBL.getLimit(user, dsGet)
                        If rsGet > 0 Then
                            If dsGet IsNot Nothing Then
                                If dsGet.Tables(0).Rows.Count > 0 Then
                                    hdSwLimitAmt.Value = dsGet.Tables(0).Rows(0).Item("CMLIMIT").ToString().Trim()
                                Else
                                    strMessage = "There is not Limit value for the user: " + user + "."
                                    Return result
                                End If
                            Else
                                strMessage = "There is not Limit value for the user: " + user + "."
                                Return result
                            End If
                        Else
                            strMessage = "There is not Limit value for the user: " + user + "."
                            Return result
                        End If

                        hdWkStatOne.Value = ""
                        Dim dsGet1 = New DataSet()
                        Dim rsGet1 = objBL.GetNWDataByClaimNo(claimNo, dsGet1)
                        If rsGet1 > 0 Then
                            If dsGet1 IsNot Nothing Then
                                If dsGet1.Tables(0).Rows.Count > 0 Then
                                    hdWkStatOne.Value = dsGet1.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()
                                Else
                                    strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                    Return result
                                End If
                            Else
                                strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                Return result
                            End If
                        Else
                            strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                            Return result
                        End If

                        If hdWkStatOne.Value <> "2" And hdWkStatOne.Value <> "A" And hdWkStatOne.Value <> "B" And hdWkStatOne.Value <> "C" And
                            hdWkStatOne.Value <> "D" And hdWkStatOne.Value <> "E" And hdWkStatOne.Value <> "F" Then
                            strMessage = "To approve a Customer Claim, it should be in other Status."
                            Return result
                            'message To approve a Customer Claim, it should be in other Status
                        Else
                            Dim dbFreight As Double = 0
                            Dim dbtot As Double = 0
                            Dim dbLimit As Double = 0

                            Dim bFreight = If(Not String.IsNullOrEmpty(dsGet1.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()),
                                                Double.TryParse(dsGet1.Tables(0).Rows(0).Item("MHFRAM").ToString().Trim(), dbFreight), False)
                            Dim bTot = If(Not String.IsNullOrEmpty(dsGet1.Tables(0).Rows(0).Item("MHTOMR").ToString().Trim()),
                                                Double.TryParse(dsGet1.Tables(0).Rows(0).Item("MHTOMR").ToString().Trim(), dbtot), False)
                            Dim bLimit = If(Not String.IsNullOrEmpty(hdSwLimitAmt.Value),
                                                Double.TryParse(hdSwLimitAmt.Value, dbLimit), False)

                            totalVal = dbFreight + dbtot
                            If dbLimit < totalVal Then
                                strMessage = "You have no authorization to approve a claim for this amount: " + totalVal.ToString() + "."
                                Return result
                                'message You have no authorization to approve a claim for this amount  + totalVal
                            Else
                                'Create Credit memo transaction in AS400
                                Dim param1 = Right("0000" + claimNo, 7)
                                param1 = "X'" + param1 + "F'"
                                Dim param2 = Left((user + "          "), 10)
                                Dim param3 = "  "
                                Dim param4 = "N"

                                Dim dsCM = objBL.CreateCreditMemo(param1, param2, param3, param4)
                                If dsCM IsNot Nothing Then
                                    If dsCM.Tables(0).Rows.Count > 0 Then
                                        hdWkStatTwo.Value = ""
                                        Dim dsSts = New DataSet()
                                        Dim rsSts = objBL.getNWrnClaimsHeader(claimNo, dsSts)
                                        If rsSts > 0 Then
                                            If dsSts IsNot Nothing Then
                                                If dsSts.Tables(0).Rows.Count > 0 Then
                                                    hdWkStatTwo.Value = dsSts.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()
                                                Else
                                                    strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                                    Return result
                                                End If
                                            Else
                                                strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                                Return result
                                            End If
                                        Else
                                            strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                            Return result
                                        End If
                                    Else
                                        strMessage = "There is an error creating a credit memo."
                                        Return result
                                    End If
                                Else
                                    strMessage = "There is an error creating a credit memo."
                                    Return result
                                End If

                                If hdWkStatTwo.Value = "3" Or hdWkStatTwo.Value = "4" Then
                                    txtClaimStatus.Text = "Claim Approved, Credit Issued"

                                    'Move RGA to Historic - AALZATE-HOLIVEROS
                                    Dim dsRGANo = New DataSet()
                                    Dim rsRGANo = objBL.GetRGANumberByClaim(claimNo, dsRGANo)
                                    If rsRGANo > 0 Then
                                        If dsRGANo IsNot Nothing Then
                                            Dim paramrga = Right("000000" + dsRGANo.Tables(0).Rows(0).Item("GHRGA#").ToString().Trim(), 6)
                                            Dim dsRGA = objBL.MoveRGAToHistoric1(paramrga)
                                            If dsRGA IsNot Nothing Then
                                                If dsRGA.Tables(0).Rows.Count > 0 Then
                                                Else
                                                    'error log
                                                    strMessage = "There is an error moving the RGA to historic."
                                                    Return result
                                                End If
                                            Else
                                                'error log
                                                strMessage = "There is an error moving the RGA to historic."
                                                Return result
                                            End If
                                        Else
                                            strMessage = "There is not RGA number for the claim number: " + claimNo + "."
                                            Return result
                                        End If
                                    Else
                                        strMessage = "There is not RGA number for the claim number: " + claimNo + "."
                                        Return result
                                    End If

                                    Dim dsRGAEnd = objBL.MoveRGAToHistoric2(param2, txtCustomerName.Text.Trim(), txtCustomerData.Text.Trim(), claimNo)
                                    If dsRGAEnd IsNot Nothing Then
                                        result = True
                                        'call fillcell1
                                        strMessage = "Claim Approved."
                                        'message Claim Approved.

                                        deactCmb()
                                        deactCmd()
                                        deactTxt()
                                        Dim checkComm = saveComm("4 : CLAIM APPROVED", strMessage)
                                    Else
                                        strMessage = "There is an error moving the RGA to historic."
                                        Return result
                                    End If
                                Else
                                    strMessage = "Customer Claim # " + claimNo + " Could not be Approved... Please Contact M.I.S"
                                    Return result
                                    'message "Customer Claim # " + txtreturnno.Text + "Could not be Approved... Please Contact M.I.S"
                                End If
                            End If
                        End If

                    End Using

                End If

            End If
            'Verify if user has authorization to Credit Memo Creation, hence Approve
            If Not String.IsNullOrEmpty(hdSeq.Value.Trim()) Then
                'Are you sure, you want to approve and generate CM to this claim?.
                'If True Then
                Dim wrnNo = hdSeq.Value.Trim()
                Dim claimNo = txtClaimNoData.Text.Trim()
                hdSwLimitAmt.Value = 0
                Dim user = Session("userid").ToString().ToUpper()

                Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                    Dim dsGet = New DataSet()
                    Dim rsGet = objBL.getLimit(user, dsGet)
                    If rsGet > 0 Then
                        If dsGet IsNot Nothing Then
                            If dsGet.Tables(0).Rows.Count > 0 Then
                                hdSwLimitAmt.Value = dsGet.Tables(0).Rows(0).Item("CMLIMIT").ToString().Trim()
                            Else
                                strMessage = "There is not Limit value for the user: " + user + "."
                                Return result
                            End If
                        Else
                            strMessage = "There is not Limit value for the user: " + user + "."
                            Return result
                        End If
                    Else
                        strMessage = "There is not Limit value for the user: " + user + "."
                        Return result
                    End If

                    hdWkStatOne.Value = ""

                    Dim dsGet1 = New DataSet()
                    Dim rsGet1 = objBL.GetNWDataByClaimNo(claimNo, dsGet1)
                    If rsGet1 > 0 Then
                        If dsGet1 IsNot Nothing Then
                            If dsGet1.Tables(0).Rows.Count > 0 Then
                                hdWkStatOne.Value = dsGet1.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()
                            Else
                                strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                Return result
                            End If
                        Else
                            strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                            Return result
                        End If
                    Else
                        strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                        Return result
                    End If

                    If hdWkStatOne.Value <> "2" And hdWkStatOne.Value <> "A" And hdWkStatOne.Value <> "B" And hdWkStatOne.Value <> "C" And
                        hdWkStatOne.Value <> "D" And hdWkStatOne.Value <> "E" And hdWkStatOne.Value <> "F" Then

                        If hdWkStatOne.Value = "3" Or hdWkStatOne.Value = "4" Then
                            'only close
                            txtClaimStatus.Text = "Claim Approved, Credit Issued"

                            Dim param2 = Left((user + "          "), 10)

                            Dim dsRGAEnd = objBL.MoveRGAToHistoric2(param2, txtCustomerName.Text.Trim(), txtCustomerData.Text.Trim(), claimNo)
                            If dsRGAEnd IsNot Nothing Then
                                result = True
                                'call fillcell1
                                strMessage = "Claim Approved."
                                'message Claim Approved.

                                deactCmb()
                                deactCmd()
                                deactTxt()
                                Dim checkComm = saveComm("4 : CLAIM APPROVED", strMessage)
                            Else
                                strMessage = "There is an error moving the RGA to historic."
                                Return result
                            End If
                        Else
                            'message To approve a Customer Claim, it should be in other Status
                            strMessage = "To approve a Customer Claim, it should be in other Status."
                            Return result
                        End If
                    Else
                        'all the approve proccess
                        Dim dbFreight As Double = 0
                        Dim dbtot As Double = 0
                        Dim dbLimit As Double = 0

                        Dim bFreight = If(Not String.IsNullOrEmpty(dsGet1.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()),
                                            Double.TryParse(dsGet1.Tables(0).Rows(0).Item("MHFRAM").ToString().Trim(), dbFreight), False)
                        Dim bTot = If(Not String.IsNullOrEmpty(dsGet1.Tables(0).Rows(0).Item("MHTOMR").ToString().Trim()),
                                            Double.TryParse(dsGet1.Tables(0).Rows(0).Item("MHTOMR").ToString().Trim(), dbtot), False)
                        Dim bLimit = If(Not String.IsNullOrEmpty(hdSwLimitAmt.Value),
                                            Double.TryParse(hdSwLimitAmt.Value, dbLimit), False)

                        totalVal = dbFreight + dbtot
                        If dbLimit < totalVal Then
                            'message You have no authorization to approve a claim for this amount  + totalVal
                            strMessage = "You have no authorization to approve a claim for this amount: " + totalVal.ToString() + "."
                            Return result
                        Else
                            'Create Credit memo transaction in AS400
                            Dim param1 = Right("0000" + claimNo, 7)
                            param1 = "X'" + param1 + "F'"
                            Dim param2 = Left((user + "          "), 10)
                            Dim param3 = "  "
                            Dim param4 = "N"

                            Dim dsCM = objBL.CreateCreditMemo(param1, param2, param3, param4)
                            If dsCM IsNot Nothing Then
                                'If dsCM.Tables(0).Rows.Count > 0 Then
                                hdWkStatTwo.Value = ""
                                Dim dsSts = New DataSet()
                                Dim rsSts = objBL.GetNWDataByClaimNo(claimNo, dsSts)
                                If rsSts > 0 Then
                                    If dsSts IsNot Nothing Then
                                        If dsSts.Tables(0).Rows.Count > 0 Then
                                            hdWkStatTwo.Value = dsSts.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()
                                        Else
                                            strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                            Return result
                                        End If
                                    Else
                                        strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                        Return result
                                    End If
                                Else
                                    strMessage = "There is not data in NW Header for claim number: " + claimNo + "."
                                    Return result
                                End If
                                'Else
                                'strMessage = "There is an error creating a credit memo."
                                'Return result
                                'End If
                            Else
                                strMessage = "There is an error creating a credit memo."
                                Return result
                            End If

                            If hdWkStatTwo.Value = "3" Or hdWkStatTwo.Value = "4" Then
                                txtClaimStatus.Text = "Claim Approved, Credit Issued"

                                Dim dsRGAEnd = objBL.MoveRGAToHistoric2(param2, txtCustomerName.Text.Trim(), txtCustomerData.Text.Trim(), claimNo)
                                If dsRGAEnd IsNot Nothing Then
                                    result = True

                                    'call fillcell1
                                    strMessage = "Claim Approved."
                                    'message Claim Approved.

                                    deactCmb()
                                    deactCmd()
                                    deactTxt()
                                    Dim checkComm = saveComm("4 : CLAIM APPROVED", strMessage)
                                Else
                                    strMessage = "There is an error moving the RGA to historic."
                                    Return result
                                End If
                            Else
                                strMessage = "Customer Claim # " + claimNo + " Could not be Approved... Please Contact M.I.S"
                                Return result
                                'message "Customer Claim # " + txtreturnno.Text + "Could not be Approved... Please Contact M.I.S"
                            End If

                        End If

                    End If

                End Using

                'End If
            End If
            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function cmdRejects(Optional ByRef strMessage As String = Nothing) As Boolean
        Dim result As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If String.IsNullOrEmpty(hdSeq.Value.Trim()) And Not String.IsNullOrEmpty(txtClaimNoData.Text.Trim()) Then

                    Dim dsGet = New DataSet()
                    Dim rsGet = objBL.GetRGAAmountByClaim(txtClaimNoData.Text.Trim(), dsGet)
                    If rsGet > 0 Then
                        If dsGet IsNot Nothing Then
                            If dsGet.Tables(0).Rows.Count > 0 Then
                                If dsGet.Tables(0).Rows(0).Item("TRGAH").ToString().Trim() <> "0" Then
                                    strMessage = "Return Has an RGA. It has to be processed to Reject this Return"
                                    Return result
                                Else
                                    'ask to be sure to reject the claim
                                    If True Then
                                        Dim rsUpd = objBL.UpdateNWHeaderStat(txtClaimNoData.Text.Trim(), "8")
                                        If rsUpd > 0 Then
                                            result = True

                                            'call gotonew
                                            'call fillcell1

                                            deactCmb()
                                            deactCmd()
                                            deactTxt()

                                            'btnreverse visible
                                            'btn reverse enabled
                                        Else
                                            strMessage = "There is an error updating the NW Header status for the claim number: " + txtClaimNoData.Text.Trim() + "."
                                            Return result
                                        End If
                                    End If
                                End If
                            Else
                                strMessage = "There is an error getting the RGA data for the claim number: " + txtClaimNoData.Text.Trim() + "."
                                Return result
                            End If
                        Else
                            strMessage = "There is an error getting the RGA data for the claim number: " + txtClaimNoData.Text.Trim() + "."
                            Return result
                        End If
                    Else
                        strMessage = "There is an error getting the RGA data for the claim number: " + txtClaimNoData.Text.Trim() + "."
                        Return result
                    End If
                ElseIf Not String.IsNullOrEmpty(hdSeq.Value.Trim()) Then

                    Dim dsGet = New DataSet()
                    Dim rsGet = objBL.GetRGAAmountByClaim(txtClaimNoData.Text.Trim(), dsGet)

                    If rsGet > 0 Then
                        If dsGet IsNot Nothing Then
                            If dsGet.Tables(0).Rows.Count > 0 Then
                                If dsGet.Tables(0).Rows(0).Item("TRGAH").ToString().Trim() <> "0" Then
                                    strMessage = "Return Has an RGA. It has to be processed to Reject this Return"
                                    Return result
                                Else
                                    If True Then
                                        chkinitial.Value = "R"

                                        Dim rsIns = objBL.InsertInternalStatus(hdSeq.Value.Trim(), chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                                        If rsIns > 0 Then
                                            chkApproved.Enabled = False
                                            chkDeclined.Enabled = False
                                            chkClaimCompleted.Enabled = False
                                            txtClaimCompletedDate.Text = datenow
                                            txtClaimCompleted.Text = Session("userid").ToString().ToUpper()
                                            txtClaimCompleted.Enabled = False
                                            txtClaimCompletedDate.Enabled = False
                                        End If

                                        Dim checkComm = saveComm("R : CLAIM REJECTED")

                                        Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(hdSeq.Value.Trim(), chkinitial.Value)
                                        If rsLastUpd < 0 Then
                                            'log write
                                        End If

                                        Dim rsUpd = objBL.UpdateNWHeaderStat(txtClaimNoData.Text.Trim(), "8")
                                        If rsUpd < 0 Then
                                            'log write
                                        Else

                                            deactTxt()
                                            deactCmd()
                                            deactCmb()

                                            result = True

                                        End If

                                    End If
                                End If
                            End If
                        End If
                    End If

                Else
                    strMessage = "The Claim Number must have a value."
                    Return result
                End If

            End Using


            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function CheckIfCMGeneretad(claimNo As String, customer As String, cm As Double) As Boolean
        Dim ds As DataSet = New DataSet()
        Dim blResult As Boolean = False
        Dim ds1 As DataSet = New DataSet()
        Dim blResult1 As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rsResult1 = objBL.GetClaimWithCM1(claimNo, customer, cm, ds1)
                If rsResult1 > 0 Then
                    If ds1 IsNot Nothing Then
                        If ds1.Tables(0).Rows.Count > 0 Then
                            blResult1 = True
                            Return blResult1
                        End If
                    End If
                End If

                Dim rsResult = objBL.GetClaimWithCM2(claimNo, customer, cm, ds)
                If rsResult > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            blResult = True
                        End If
                    End If
                End If

            End Using
            Return blResult
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return blResult
        End Try

    End Function

    Public Function CheckIfClaimIsForReopen(claimNo As String) As Boolean
        Dim ds As DataSet = New DataSet()
        Dim curSts As String = Nothing
        Dim blResult As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rsResult = objBL.getNWrnClaimsHeader(claimNo, ds)
                If rsResult > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            curSts = ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim().ToUpper()
                            If curSts.Equals("7") Then
                                blResult = True
                            End If
                        End If
                    End If
                End If

            End Using
            Return blResult
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return blResult
        End Try
    End Function

    Public Function CheckIfClaimIsApproved(claimNo As String) As Boolean
        Dim ds As DataSet = New DataSet()
        Dim curSts As String = Nothing
        Dim blResult As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rsResult = objBL.getNWrnClaimsHeader(claimNo, ds)
                If rsResult > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            curSts = ds.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim().ToUpper()
                            If curSts.Equals("3") Or curSts.Equals("4") Then
                                blResult = True
                            End If
                        End If
                    End If
                End If

            End Using
            Return blResult
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return blResult
        End Try
    End Function

    Protected Sub fnAjUpd_UploadCompleteAll(sender As Object, e As AjaxControlToolkit.AjaxFileUploadCompleteAllEventArgs)
        Try

            'popAjUpLog.Hide()
            hdNavTabsContent.Value = "1"
            'hdClaimNumber.Value = ""
            hdGridViewContent.Value = "0"
            'closeAtkPopup()
            btnBackFile_click(Nothing, Nothing)
        Catch ex As Exception

        End Try
    End Sub

    Protected Sub fnAjUpd_UploadComplete(sender As Object, e As AjaxControlToolkit.AjaxFileUploadEventArgs)
        Dim wrnNo As String = hdSeq.Value.Trim()
        Dim claimNo As String = txtClaimNoData.Text.Trim()
        Dim FolderPath = ConfigurationManager.AppSettings("urlPathGeneral") + ConfigurationManager.AppSettings("PathClaimFiles")
        Dim folderpathvendor As String = Nothing
        Dim uploadedFiles As HttpFileCollection = Nothing
        Dim userPostedFile As HttpPostedFile = Nothing
        Try

            Dim dct As Dictionary(Of String, String) = DirectCast(Session("MainValues"), Dictionary(Of String, String))
            claimNo = If(String.IsNullOrEmpty(claimNo.Trim()), dct.Keys(0).ToString(), claimNo)
            wrnNo = If(String.IsNullOrEmpty(wrnNo.Trim()), dct.Values(0).ToString(), wrnNo)

            If e.FileSize > 0 Then
                Dim name = e.FileName
                Dim extension = Path.GetExtension(name)

                folderpathvendor = FolderPath + wrnNo + "\"
                If Directory.Exists(folderpathvendor) Then
                    Dim pathh = folderpathvendor + name
                    fnAjUpd.SaveAs(pathh)
                Else
                    Directory.CreateDirectory(folderpathvendor)
                    If Directory.Exists(folderpathvendor) Then
                        Dim pathh = folderpathvendor + name
                        fnAjUpd.SaveAs(pathh)
                    Else
                        'error creating path
                    End If
                End If
            End If
        Catch ex As Exception
            Dim pp = ex.Message
            Dim aa = pp
        End Try
    End Sub

    Protected Sub btnSeeFiles_Click(sender As Object, e As EventArgs) Handles btnSeeFiles.Click
        Try
            SeeFiles()
            popSeeFiles.Show()

            hdGridViewContent.Value = "0"
            hdNavTabsContent.Value = "1"
            hdSeeFilesContent.Value = "1"

            'SeeFiles1()
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnAddFiles_Click(sender As Object, e As EventArgs) Handles btnAddFiles.Click
        Try
            popAjUpLog.Show()
            hdNavTabsContent.Value = "1"
            'hdClaimNumber.Value = ""
            hdGridViewContent.Value = "0"
            hdSeeFilesContent.Value = "0"
            'SeeFiles()
            'AddFiles()
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnAddComments_Click(sender As Object, e As EventArgs) Handles btnAddComments.Click
        Try
            AddComments()
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnSeeComments_Click(sender As Object, e As EventArgs) Handles btnSeeComments.Click
        Try
            SeeCommentsMethod()
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnVndSaveComment_click(sender As Object, e As EventArgs) Handles btnVndSaveComment.Click
        Try
            fnAddVndComments()
            Session("LstMessages") = Nothing

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnSaveComment_click(sender As Object, e As EventArgs) Handles btnSaveComment.Click
        Try

            fnAddComments()

            Session("LstMessages") = Nothing

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnVndMessage_Click(sender As Object, e As EventArgs) Handles btnVndMessage.Click
        Dim lstMEssages As List(Of String) = New List(Of String)()
        Try

            Dim message = txtVndMessage.Text
            txtVndMessage.Text = Nothing

            If Session("LstMessages") IsNot Nothing Then
                lstMEssages = DirectCast(Session("LstMessages"), List(Of String))
            End If

            lstMEssages.Add(message)
            Session("LstMessages") = lstMEssages

            For Each item As String In lstMEssages
                lstVndMessage.Items.Add(item)
            Next

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnMessage_Click(sender As Object, e As EventArgs) Handles btnMessage.Click
        Dim lstMEssages As List(Of String) = New List(Of String)()
        Try

            fnAddComments()

            Session("LstMessages") = Nothing

            'Dim message = txtMessage.Text
            'txtMessage.Text = Nothing

            'If Session("LstMessages") IsNot Nothing Then
            '    lstMEssages = DirectCast(Session("LstMessages"), List(Of String))
            'End If

            'lstMEssages.Add(message)
            'Session("LstMessages") = lstMEssages

            'For Each item As String In lstMEssages
            '    lstComments.Items.Add(item)
            'Next

            'lstComments.DataSource = lstMEssages
            'lstComments.DataBind()

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnSearch_Click(sender As Object, e As EventArgs) Handles btnSearch.Click
        Dim exMessage As String = Nothing
        Dim searchstring As String = Trim(txtSearch.Text)
        Dim filterData = New List(Of ExtClaimObj)()
        Dim lstData = New List(Of ExtClaimObj)()
        Dim dsWork As DataSet = New DataSet()
        Dim methodMessage As String = Nothing
        Try
            If searchstring.Equals("Search...") Or String.IsNullOrEmpty(searchstring) Then

                Dim dsData = DirectCast(Session("ClaimsBckData"), DataSet)
                Dim blFirstValidation = If(dsData Is Nothing, False, If(dsData.Tables IsNot Nothing, True, False))

                If blFirstValidation And dsData.Tables(0).Rows.Count > 0 Then
                    loadSessionClaims(dsData)
                End If

                methodMessage = "When search without a search criteria the full data is loaded."
                SendMessage(methodMessage, messageType.info)

            Else
                Dim dsData = New DataSet()
                dsData = If((DirectCast(Session("DataSource"), DataSet)) IsNot Nothing, DirectCast(Session("DataSource"), DataSet), Nothing)
                If dsData IsNot Nothing Then
                    If dsData.Tables(0).Rows.Count > 0 Then
                        lstData = fillExtObj(dsData)
                    End If
                End If

                If lstData.Count > 0 Then

                    'all ocurrences without duplicate value string
                    filterData = lstData.Where(Function(da) _
                                                   If(Not String.IsNullOrEmpty(da.ClaimNo), UCase(da.ClaimNo).Trim().Contains(UCase(searchstring)), False) _
                                                   Or If(Not String.IsNullOrEmpty(da.Customer), UCase(da.Customer).Trim().Contains(UCase(searchstring)), False) _
                                                   Or If(Not String.IsNullOrEmpty(da.CustomerName), UCase(da.CustomerName).Trim().Contains(UCase(searchstring)), False) _
                                                   Or If(Not String.IsNullOrEmpty(da.PartNo), UCase(da.PartNo).Trim().Contains(UCase(searchstring)), False)
                                                   ).ToList()

                    If filterData.Count > 0 Then
                        Dim dtResult = ListToDataTable(filterData)
                        If dtResult IsNot Nothing Then
                            If dtResult.Rows.Count > 0 Then
                                Dim ds = New DataSet()
                                ds.Tables.Add(dtResult)
                                loadSessionClaims(ds)
                            End If
                        End If
                    Else

                        grvClaimReport.DataSource = Nothing
                        grvClaimReport.DataBind()

                    End If

                Else
                    methodMessage = "There is not data to load. Please refresh the page."
                    SendMessage(methodMessage, messageType.warning)
                End If

            End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Shared Function ListToDataTable(ByVal _List As Object) As DataTable

        Dim dt As New DataTable

        Dim obj As Object = _List(0)
        dt = ObjectToDataTable(obj)
        Dim dr As DataRow = dt.NewRow

        For Each obj In _List

            dr = dt.NewRow

            For Each p As PropertyInfo In obj.GetType.GetProperties

                'If p.Name = "WLIST" Then
                '    If p.GetValue(obj, p.GetIndexParameters) > 0 Then
                '        Dim pepe = p.GetValue(obj, p.GetIndexParameters)
                '    End If
                'End If
                dr.Item(p.Name) = p.GetValue(obj, p.GetIndexParameters)


            Next

            dt.Rows.Add(dr)

        Next

        Return dt

    End Function

    Public Shared Function ObjectToDataTable(ByVal o As Object) As DataTable
        Dim exMessage As String = Nothing
        Try
            Dim dt As New DataTable
            Dim properties As List(Of PropertyInfo) = o.GetType.GetProperties.ToList()

            For Each prop As PropertyInfo In properties
                dt.Columns.Add(prop.Name, prop.PropertyType)
            Next

            dt.TableName = o.GetType.Name
            Return dt
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            'writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Information, "User Logged In Wish List: " + Session("userid").ToString(), "Login at time: " + DateTime.Now.ToString())
            Return Nothing
        End Try

    End Function


    Public Sub ExtraLoadGrv1(claimNo As String, Optional blValidation As Boolean = False)
        Dim exMessage As String = Nothing
        Try
            Dim dsData = DirectCast(Session("DataSource"), DataSet)
            Dim dt As DataTable = New DataTable()

            Dim dd = dsData.Tables(0).AsEnumerable().Where(Function(ee) Not ee.Item("MHMRNR").ToString().Trim().Equals(claimNo))
            If dd.Count > 0 Then
                dt = dd.CopyToDataTable()
            End If

            If dt.Rows.Count > 0 Then
                Dim dsNew As DataSet = New DataSet()
                dsNew.Tables.Add(dt)

                grvClaimReport.DataSource = dsNew.Tables(0)
                grvClaimReport.DataBind()
                Session("DataSource") = dsNew
                Session("ItemCounts") = dsNew.Tables(0).Rows.Count.ToString()
                lblTotalClaims.Text = dsNew.Tables(0).Rows.Count.ToString()
                blValidation = True
            Else
                grvClaimReport.DataSource = Nothing
                grvClaimReport.DataBind()
                Session("DataSource") = Nothing
                Session("ItemCounts") = "0"
                lblTotalClaims.Text = "0"
                blValidation = False
            End If


        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub ExtraLoadGrv()
        Dim dsResult As DataSet = New DataSet()
        Dim Result As Integer = -1
        Dim exMessage As String = Nothing
        Dim BuildSql As String = Nothing
        Try
            BuildSql = Session("buildSql").ToString()

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                If Not String.IsNullOrEmpty(BuildSql) Then
                    Result = objBL.GetClaimsDataUpdated("C", dsResult, BuildSql)
                Else
                    Result = objBL.GetClaimsDataUpdated("C", dsResult)
                End If

                Session("DataSource") = dsResult
                loadSessionClaims(dsResult)
            End Using
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnSearchFilter_Click(sender As Object, e As EventArgs) Handles btnSearchFilter.Click
        Dim dsClaimsData = New DataSet()
        Dim dsResult = New DataSet()
        Dim goAhead As Boolean = False
        Dim dsQuery As DataSet = New DataSet()
        Dim strBuiltQuery As String = Nothing
        Dim result As Integer = -1
        Dim methodMessage As String = Nothing

        Dim lstExtSts As List(Of String) = New List(Of String)()

        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                dsClaimsData = DirectCast(Session("ClaimsSingleData"), DataSet)
                If dsClaimsData IsNot Nothing Then
                    If dsClaimsData.Tables(0).Rows.Count > 0 Then
                        goAhead = True
                    End If
                End If

                If goAhead Then
                    'dsQuery = dsClaimsData
                    PrepareQuery(strBuiltQuery)
                    Session("buildSql") = strBuiltQuery

                    If Not String.IsNullOrEmpty(strBuiltQuery) Then
                        result = objBL.GetClaimsDataUpdated("C", dsResult, strBuiltQuery)
                    Else
                        result = objBL.GetClaimsDataUpdated("C", dsResult)
                    End If

                    'DoExcel(dsResult.Tables(0))  download excel to local, only works local

                    Session("DataSource") = dsResult
                    loadSessionClaims(dsResult)

                    If dsResult Is Nothing Then
                        methodMessage = "There is not result for the selected criteria. Please try again with other filters!!"
                        SendMessage(methodMessage, messageType.warning)
                    ElseIf dsResult.Tables(0).Rows.Count <= 0 Then
                        methodMessage = "There is not result for the selected criteria. Please try again with other filters!!"
                        SendMessage(methodMessage, messageType.warning)
                    Else

                    End If

                End If

            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnClearFilter_Click(sender As Object, e As EventArgs) Handles btnClearFilter.Click
        Try

            ClearInputCustom(rowFilters)

            Dim ds = DirectCast(Session("ClaimsBckData"), DataSet)
            Session("PageAmounts") = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("PageAmounts")), ConfigurationManager.AppSettings("PageAmounts"), "10")
            Session("currentPage") = 1
            loadSessionClaims(ds)

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnGetTotalCDValue_Click(sender As Object, e As EventArgs) Handles btnGetTotalCDValue.Click
        Try
            Dim partvalue = If(String.IsNullOrEmpty(txtCDPart.Text), 0, CInt(txtCDPart.Text.Trim()))
            Dim laborvalue = If(String.IsNullOrEmpty(txtCDLabor.Text), 0, CInt(txtCDLabor.Text.Trim()))
            Dim freightvalue = If(String.IsNullOrEmpty(txtCDFreight.Text), 0, CInt(txtCDFreight.Text.Trim()))
            Dim miscvalue = If(String.IsNullOrEmpty(txtCDMisc.Text), 0, CInt(txtCDMisc.Text.Trim()))

            Dim totalValue = partvalue + laborvalue + freightvalue + miscvalue
            txtConsDamageTotal.Text = totalValue.ToString().Trim()

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub btnRestock_Click(sender As Object, e As EventArgs) Handles btnRestock.Click
        Dim userid = Session("userid").ToString().Trim().ToUpper()
        Dim dsResult As DataSet = New DataSet()
        Dim methodMessage As String = Nothing
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rsResult = objBL.GetIfOperationInProcess(userid, dsResult)
                If rsResult <= 0 Then
                    methodMessage = "This user already has an operation in process, please try again later or call to IT Department."
                    SendMessage(methodMessage, messageType.warning)
                Else
                    'restock process
                End If

            End Using

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub btnUndoRestock_Click(sender As Object, e As EventArgs) Handles btnUndoRestock.Click
        Try

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub hdGetCommentTab_Click(sender As Object, e As EventArgs) Handles hdGetCommentTab.ValueChanged
        Try
            'If hdGetCommentTab.Value.Equals("1") Then
            '    SeeCommentsMethod()
            '    hdGetCommentTab.Value = "0"
            'End If
        Catch ex As Exception

        End Try
    End Sub

#Region "Buttons for internal status update"

    Public Function UpdateWIntFinalStat(code As String, status As String, chkinitial As String) As Integer
        Dim result As Integer = -1
        Dim dsResult As DataSet = New DataSet()
        Dim methodMessage As String = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                result = objBL.UpdateWIntFinalStat(code, status, chkinitial)
                If result <= 0 Then
                    methodMessage = "There is an error updating the approval status."
                    SendMessage(methodMessage, messageType.warning)
                End If
            End Using

            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Private Sub UpdateInternalStatusGeneric(txt As TextBox, txt1 As TextBox, chk As CheckBox, lnk As LinkButton, flag As Boolean)
        'strMessage = Nothing
        Try
            'Dim wrnNo = hdSeq.Value.Trim()
            'Dim claimNo = txtClaimNoData.Text.Trim()

            txt.Text = Session("userid").ToString().ToUpper()
            txt1.Text = DateTime.Now().ToString().Split(" ")(0)

            'InitialStatusProcess(wrnNo, strMessage)

            txt.Enabled = flag
            txt1.Enabled = flag
            'chk.Enabled = flag

            'lnk.Attributes("href") = "javascript:void(0)"
            'lnk.Attributes("class").Replace("aspNetDisabled", "")
            'lnk.Attributes.Add("class", "btn btn-primary btnSmallSize")


        Catch ex As Exception
            Dim pp = ex.Message
        End Try
    End Sub

    Protected Sub lnkHome_Click(sender As Object, e As EventArgs) Handles lnkHome.Click
        Dim strMessage As String = Nothing
        Try
            btnCloseTab_Click(Nothing, Nothing)
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkInitialReview_Click(sender As Object, e As EventArgs) Handles lnkInitialReview.Click
        Dim strMessage As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkInitialReview.Checked Then
                UpdateInternalStatusGeneric(txtInitialReview, txtInitialReviewDate, chkInitialReview, lnkInitialReview, False)
                InitialStatusProcess(wrnNo, strMessage)
                If Not String.IsNullOrEmpty(strMessage) Then
                    UpdateInternalStatusGeneric(txtInitialReview, txtInitialReviewDate, chkInitialReview, lnkInitialReview, True)
                    'display an error in process
                End If
            Else
                Dim methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub prepareAckMessage(ByRef strMessage As String)
        strMessage = " "
        Dim messageOut As String = Nothing
        Try
            Dim objEmail = DirectCast(Session("emailObj"), ClaimEmailObj)
            Dim emailMsg = txtMsgAftAckEmail.Text.Trim()
            objEmail.MESSAGE = emailMsg

            If objEmail IsNot Nothing Then
                Dim bresult = PrepareEmail(objEmail, "2", messageOut)
                If Not bresult Then
                    strMessage += messageOut
                End If
            End If
        Catch ex As Exception
            strMessage = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkAcknowledgeEmail_Click(sender As Object, e As EventArgs) Handles lnkAcknowledgeEmail.Click
        Dim strMessage As String = Nothing
        Dim strMessageEmail As String = Nothing
        Dim methodMessage As String = Nothing
        Dim preventUpd As Boolean = False
        Dim doStop As Boolean = False
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkAcknowledgeEmail.Checked Then

                If String.IsNullOrEmpty(txtContactEmail.Text.Trim()) Then
                    strMessage = "Please check the contact email before to send the Acknowledge Email."
                    chkAcknowledgeEmail.Checked = False
                    SendMessage(strMessage, messageType.info)
                    Exit Sub
                End If

                MassiveInternalUpdate(wrnNo, "1", strMessage, doStop)
                If Not doStop Then
                    UpdateInternalStatusGeneric(txtAcknowledgeEmail, txtAcknowledgeEmailDate, chkAcknowledgeEmail, lnkAcknowledgeEmail, False)
                    If Not String.IsNullOrEmpty(strMessage) Then
                        UpdateInternalStatusGeneric(txtAcknowledgeEmail, txtAcknowledgeEmailDate, chkAcknowledgeEmail, lnkAcknowledgeEmail, True)
                    Else
                        txtEditorExtender1.Text = ""
                        lblTextEditorAck.Text = ""
                        txtEditorExtender2.Text = ""
                        lblTextEditorInfoCust.Text = ""
                        hdAckPopContent.Value = "0"
                        hdInfoCustContent.Value = "0"
                    End If
                Else
                    txtEditorExtender1.Text = ""
                    lblTextEditorAck.Text = ""
                    txtEditorExtender2.Text = ""
                    lblTextEditorInfoCust.Text = ""
                    hdAckPopContent.Value = "0"
                    hdInfoCustContent.Value = "0"
                End If
                'AcknowledgeEmailProcess(wrnNo, strMessage)


                'prepareAckMessage(strMessageEmail)
                'If Not String.IsNullOrEmpty(strMessageEmail.Trim()) Then
                '    methodMessage = strMessageEmail
                '    SendMessage(methodMessage, messageType.warning)
                'End If
            Else
                methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkInfoCust_Click(sender As Object, e As EventArgs) Handles lnkInfoCust.Click
        Dim strMessage As String = Nothing
        Dim doStop As Boolean = False
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkInfoCust.Checked Then

                If String.IsNullOrEmpty(txtContactEmail.Text.Trim()) Then
                    strMessage = "Please check the contact email before to send the an email requesting for info."
                    chkInfoCust.Checked = False
                    SendMessage(strMessage, messageType.info)
                    Exit Sub
                End If

                MassiveInternalUpdate(wrnNo, "2", strMessage, doStop)
                If Not doStop Then
                    UpdateInternalStatusGeneric(txtInfoCust, txtInfoCustDate, chkInfoCust, lnkInfoCust, False)
                    If Not String.IsNullOrEmpty(strMessage) Then
                        UpdateInternalStatusGeneric(txtInfoCust, txtInfoCustDate, chkInfoCust, lnkInfoCust, True)
                    Else
                        'add new modal popup for this
                        txtEditorExtender2.Text = ""
                        lblTextEditorInfoCust.Text = ""
                        hdInfoCustContent.Value = "0"
                        hdAckPopContent.Value = "0"
                    End If
                Else
                    'add new modal popup for this
                    txtEditorExtender2.Text = ""
                    lblTextEditorInfoCust.Text = ""
                    hdAckPopContent.Value = "0"
                    hdInfoCustContent.Value = "0"
                End If

                'InfoRequestedProcess(wrnNo, strMessage)
                If Not String.IsNullOrEmpty(strMessage) Then
                    UpdateInternalStatusGeneric(txtInfoCust, txtInfoCustDate, chkInfoCust, lnkInfoCust, True)
                End If
            Else
                Dim methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkPartRequested_Click(sender As Object, e As EventArgs) Handles lnkPartRequested.Click
        Dim strMessage As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkPartRequested.Checked Then
                If (chkInitialReview.Checked And chkAcknowledgeEmail.Checked And chkInfoCust.Checked) And
                    (Not String.IsNullOrEmpty(txtInitialReview.Text.Trim()) And Not String.IsNullOrEmpty(txtAcknowledgeEmail.Text.Trim()) And Not String.IsNullOrEmpty(txtInfoCust.Text.Trim())) Then
                    UpdateInternalStatusGeneric(txtPartRequested, txtPartRequestedDate, chkPartRequested, lnkPartRequested, False)
                    MassiveInternalUpdate(wrnNo, "3", strMessage)
                    'PartRequestedProcess(wrnNo, strMessage)
                    If Not String.IsNullOrEmpty(strMessage) Then
                        UpdateInternalStatusGeneric(txtPartRequested, txtPartRequestedDate, chkPartRequested, lnkPartRequested, True)
                    End If
                Else
                    UpdateInternalStatusGeneric(txtPartRequested, txtPartRequestedDate, chkPartRequested, lnkPartRequested, True)
                    chkPartRequested.Checked = False
                    cleanMe(txtPartRequested)
                    cleanMe(txtPartRequestedDate)
                    'chkInitialReview.Checked = False
                    'cleanMe(txtInitialReview)
                    'cleanMe(txtInitialReviewDate)

                    Dim methodMessage = "Please make the prior status selection in order to proceed!"
                    SendMessage(methodMessage, messageType.info)
                End If
            Else
                Dim methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnklnkPartReceived_Click(sender As Object, e As EventArgs) Handles lnkPartReceived.Click
        Dim strMessage As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkPartReceived.Checked Then
                If (chkInitialReview.Checked And chkAcknowledgeEmail.Checked And chkInfoCust.Checked) And
                    (Not String.IsNullOrEmpty(txtInitialReview.Text.Trim()) And Not String.IsNullOrEmpty(txtAcknowledgeEmail.Text.Trim()) And Not String.IsNullOrEmpty(txtInfoCust.Text.Trim())) Then

                    UpdateInternalStatusGeneric(txtPartReceived, txtPartReceivedDate, chkPartReceived, lnkPartReceived, False)
                    MassiveInternalUpdate(wrnNo, "4", strMessage)
                    'PartReceivedProcess(wrnNo, strMessage)
                    If Not String.IsNullOrEmpty(strMessage) Then
                        UpdateInternalStatusGeneric(txtPartReceived, txtPartReceivedDate, chkPartReceived, lnkPartReceived, True)
                    End If
                Else
                    UpdateInternalStatusGeneric(txtPartReceived, txtPartReceivedDate, chkPartReceived, lnkPartReceived, True)
                    chkPartReceived.Checked = False
                    cleanMe(txtPartReceived)
                    cleanMe(txtPartReceivedDate)
                    'chkInitialReview.Checked = False
                    'cleanMe(txtInitialReview)
                    'cleanMe(txtInitialReviewDate)

                    Dim methodMessage = "Please make the prior status selection in order to proceed!"
                    SendMessage(methodMessage, messageType.info)
                End If
            Else
                Dim methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkTechReview_Click(sender As Object, e As EventArgs) Handles lnkTechReview.Click
        Dim strMessage As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkTechReview.Checked Then
                If (chkInitialReview.Checked And chkAcknowledgeEmail.Checked And chkInfoCust.Checked) And
                    (Not String.IsNullOrEmpty(txtInitialReview.Text.Trim()) And Not String.IsNullOrEmpty(txtAcknowledgeEmail.Text.Trim()) And Not String.IsNullOrEmpty(txtInfoCust.Text.Trim())) Then
                    UpdateInternalStatusGeneric(txtTechReview, txtTechReviewDate, chkTechReview, lnkTechReview, False)
                    MassiveInternalUpdate(wrnNo, "5", strMessage)
                    'TechReviewProcess(wrnNo, strMessage)
                    If Not String.IsNullOrEmpty(strMessage) Then
                        UpdateInternalStatusGeneric(txtTechReview, txtTechReviewDate, chkTechReview, lnkTechReview, True)
                    End If
                Else
                    UpdateInternalStatusGeneric(txtTechReview, txtTechReviewDate, chkTechReview, lnkTechReview, True)
                    chkTechReview.Checked = False
                    cleanMe(txtTechReview)
                    cleanMe(txtTechReviewDate)
                    'chkInitialReview.Checked = False
                    'cleanMe(txtInitialReview)
                    'cleanMe(txtInitialReviewDate)

                    Dim methodMessage = "Please make the prior status selection in order to proceed!"
                    SendMessage(methodMessage, messageType.info)
                End If
            Else
                Dim methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkWaitSupReview_Click(sender As Object, e As EventArgs) Handles lnkWaitSupReview.Click
        Dim strMessage As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkWaitSupReview.Checked Then
                If (chkInitialReview.Checked And chkAcknowledgeEmail.Checked And chkInfoCust.Checked) And
                    (Not String.IsNullOrEmpty(txtInitialReview.Text.Trim()) And Not String.IsNullOrEmpty(txtAcknowledgeEmail.Text.Trim()) And Not String.IsNullOrEmpty(txtInfoCust.Text.Trim())) Then
                    UpdateInternalStatusGeneric(txtWaitSupReview, txtWaitSupReviewDate, chkWaitSupReview, lnkWaitSupReview, False)
                    MassiveInternalUpdate(wrnNo, "6", strMessage)
                    'WaitingSupplierProcess(wrnNo, strMessage)
                    If Not String.IsNullOrEmpty(strMessage) Then
                        UpdateInternalStatusGeneric(txtWaitSupReview, txtWaitSupReviewDate, chkWaitSupReview, lnkWaitSupReview, True)
                    End If
                Else
                    UpdateInternalStatusGeneric(txtWaitSupReview, txtWaitSupReviewDate, chkWaitSupReview, lnkWaitSupReview, True)
                    chkWaitSupReview.Checked = False
                    cleanMe(txtWaitSupReview)
                    cleanMe(txtWaitSupReviewDate)
                    'chkInitialReview.Checked = False
                    'cleanMe(txtInitialReview)
                    'cleanMe(txtInitialReviewDate)

                    Dim methodMessage = "Please make the prior status selection in order to proceed!"
                    SendMessage(methodMessage, messageType.info)
                End If

            Else
                Dim methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkClaimCompleted_Click(sender As Object, e As EventArgs) Handles lnkClaimCompleted.Click
        Dim strMessage As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkClaimCompleted.Checked Then
                UpdateInternalStatusGeneric(txtClaimCompleted, txtClaimCompletedDate, chkClaimCompleted, lnkClaimCompleted, False)
                'que viene aca?

            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkQuarantine_Click(sender As Object, e As EventArgs) Handles lnkQuarantine.Click
        Dim strMessage As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkQuarantine.Checked Then
                UpdateInternalStatusGeneric(txtQuarantine, txtQuarantineDate, chkQuarantine, lnkQuarantine, False)
                QuarantineProcess(wrnNo, strMessage)
                If Not String.IsNullOrEmpty(strMessage) Then
                    UpdateInternalStatusGeneric(txtQuarantine, txtQuarantineDate, chkQuarantine, lnkQuarantine, True)
                End If
            Else
                Dim methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkDiagnose_Click(sender As Object, e As EventArgs) Handles lnkDiagnose.Click
        Dim strMessage As String = Nothing
        Dim strMessageOut As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If Not String.IsNullOrEmpty(txtDiagnoseData.Text.Trim()) And Not ddlDiagnoseData.SelectedIndex.Equals(-1) Then

                Dim resultProc = UpdateDiagnoseValue(claimNo, strMessageOut)
                If resultProc Then
                    SendMessage(strMessageOut, messageType.success)
                Else
                    SendMessage(strMessageOut, messageType.warning)
                End If
            Else
                Dim methodMessage = "If you want to update the Diagnose please first fill in the information in the fields!"
                SendMessage(methodMessage, messageType.warning)
            End If
        Catch ex As Exception
            SendMessage(ex.Message, messageType.Error)
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub lnkCheckApprove_Click(sender As Object, e As EventArgs) Handles lnkCheckApprove.Click
        Dim strMessage As String = Nothing
        Dim methodMessage As String = Nothing
        Dim wrnNo = hdSeq.Value.Trim()
        Dim claimNo = txtClaimNoData.Text.Trim()
        Try
            If chkApproved.Checked And chkApproved.Enabled = True Then
                If chkAcknowledgeEmail.Checked Then
                    If chkTechReview.Checked Then
                        If Not String.IsNullOrEmpty(txtDiagnoseData.Text.Trim()) Then
                            Dim totVal = If(String.IsNullOrEmpty(txtTotValue.Text.Trim()), Double.Parse("0"), Double.Parse(txtTotValue.Text.Trim()))
                            If totVal > 0 And totVal <= 500 Then
                                Dim objUsrLImit = DirectCast(Session("ObjCurUserLmt"), ClaimObjUserLoggedLimit)
                                If objUsrLImit IsNot Nothing Then
                                    Dim dbUsrlmt As Double = 0
                                    Dim canBeDouble = Double.TryParse(objUsrLImit.ClaimLimitAmount, dbUsrlmt)
                                    If canBeDouble Then
                                        If dbUsrlmt >= 500 Then
                                            If chkApproved.Checked And chkClaimCompleted.Checked Then

                                                'Update internal status to completed
                                                'UpdateInternalStatusGeneric(txtClaimCompleted, txtClaimCompletedDate, chkClaimCompleted, lnkClaimCompleted, False)
                                                'CompletedClaimProcess(wrnNo, strMessage)
                                                'If String.IsNullOrEmpty(strMessage) Then
                                                '    UpdateInternalStatusGeneric(txtClaimCompleted, txtClaimCompletedDate, chkClaimCompleted, lnkClaimCompleted, True)
                                                'End If

                                                'Executes the approve method, create a credit memo proccess
                                                Dim blApprove = cmdApproveds(strMessage)
                                                If blApprove Then
                                                    chkApproved.Enabled = False
                                                    chkClaimCompleted.Enabled = False
                                                    txtClaimCompleted.Enabled = False
                                                    txtClaimCompletedDate.Enabled = False
                                                    Dim blClose = cmdCloseClaim(strMessage)
                                                    If blClose Then
                                                        chkApproved.Enabled = False
                                                        chkDeclined.Enabled = False

                                                        strMessage = "The claim in relation to claim number: " + claimNo + " was approved and properly closed."
                                                        SendMessage(strMessage, messageType.success)
                                                        Exit Sub
                                                    Else
                                                        strMessage = "There is an error in the Close Claim process for the Claim Number:" + claimNo + "."
                                                        SendMessage(strMessage, messageType.Error)
                                                        Exit Sub
                                                    End If
                                                Else
                                                    strMessage = "There is an error in the Approval Process for the Claim Number:" + claimNo + "."
                                                    SendMessage(strMessage, messageType.Error)
                                                    Exit Sub
                                                End If

                                            End If
                                        End If
                                    End If
                                End If
                            ElseIf totVal > 500 Then
                                'check user limit allowed and full limit for claim manager
                                'send email for authorization
                            Else
                                methodMessage = "An error has occurred. If the problem persists please call the IT department."
                                SendMessage(methodMessage, messageType.warning)
                            End If
                        End If
                    End If
                End If
            End If
        Catch ex As Exception
            methodMessage = "An error has occurred. If the problem persists please call the IT department."
            SendMessage(methodMessage, messageType.warning)
        End Try
    End Sub

    Protected Sub lnkPCred_Click(sender As Object, e As EventArgs) Handles lnkPCred.Click
        Dim strMessage As String = Nothing
        Dim methodMessage As String = Nothing
        Try

            Dim strUsers = ConfigurationManager.AppSettings("AuthUsersForPutCost")
            Dim currentUser = UCase(Session("userid").ToString().Trim().ToUpper())
            Dim lstUsers = If(Not String.IsNullOrEmpty(strUsers), strUsers.Split(","), Nothing)
            Dim myitem = lstUsers.AsEnumerable().Where(Function(value) UCase(value.ToString().Trim()).Contains(currentUser))
            If myitem.Count = 1 Then

                Dim strValue = If(Not String.IsNullOrEmpty(txtPartCred.Text.Trim()), txtPartCred.Text, "0")

                Dim partCredit As Double = 0
                Dim blPC = Double.TryParse(strValue, partCredit)
                If Not blPC Then
                    methodMessage = "The value must be a valid amount."
                    SendMessage(methodMessage, messageType.warning)
                Else

                    Dim partCredFull = "Part Cred : " + txtPartCred.Text.Trim()

                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                        'Dim rss = objBL.UpdateComplexPartCredInComments(partCredit, txtClaimNoData.Text)
                        'Dim pp = rss

                        Dim upd = objBL.SavePartialCreditRef(partCredFull, hdSeq.Value.Trim())
                        If upd > 0 Then
                            'fine

                            txtTotValue.Text = txtPartCred.Text
                            txtParts.Text = "0"
                            txtCDFreight.Text = "0"
                            txtCDLabor.Text = "0"
                            txtCDMisc.Text = "0"
                            txtCDPart.Text = "0"
                            txtConsDamageTotal.Text = "0"

                            hdPartialCredits.Value = "1"

                            methodMessage = "The Partial Credit values has been saved well."
                            SendMessage(methodMessage, messageType.info)

                        Else
                            'error updating log
                            methodMessage = "An error ocurred saving the Partial Credit value."
                            SendMessage(methodMessage, messageType.info)
                        End If

                    End Using

                    'update claim value to txtPartCred.Text
                    'update cons damage to 0
                End If
            End If

        Catch ex As Exception

        End Try
    End Sub

    Protected Sub lnkConsDamage_Click(sender As Object, e As EventArgs) Handles lnkConsDamage.Click
        Dim strMessage As String = Nothing
        Dim methodMessage As String = Nothing
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkConsDamage.Checked Then

                If Not String.IsNullOrEmpty(txtConsDamageTotal.Text.Trim()) Then
                    If Not String.IsNullOrEmpty(txtCDFreight.Text.Trim()) Or Not String.IsNullOrEmpty(txtCDLabor.Text.Trim()) Or Not String.IsNullOrEmpty(txtCDMisc.Text.Trim()) Or Not String.IsNullOrEmpty(txtCDPart.Text.Trim()) Then

                        Dim blResult = AuthToPutCostsProcess(claimNo, wrnNo, strMessage)
                        If Not blResult Then
                            If Not String.IsNullOrEmpty(strMessage) Then
                                methodMessage = strMessage
                                SendMessage(methodMessage, messageType.warning)
                            End If
                            'method to prepare the message
                            'Exit Sub
                        Else
                            Dim valueParts As Double = 0
                            Dim valueConsD As Double = 0
                            'Dim partsValue = If(Not String.IsNullOrEmpty(txtParts.Text.Trim()), Double.TryParse(txtParts.Text.Trim(), valueParts), 0)
                            'Dim ConsDValue = If(Not String.IsNullOrEmpty(txtConsDamageTotal.Text.Trim()), Double.TryParse(txtConsDamageTotal.Text, valueConsD), 0)
                            Dim partsValue = Double.TryParse(txtParts.Text.Trim(), valueParts)
                            Dim ConsDValue = Double.TryParse(txtConsDamageTotal.Text, valueConsD)

                            txtTotValue.Text = (valueParts + valueConsD).ToString()

                            methodMessage = "The Consequental Damages values has been saved successfully."
                            SendMessage(methodMessage, messageType.warning)
                        End If

                    Else
                        'message must have a value
                        methodMessage = "You must enter at least one consequental damage value in order to add it to this Claim."
                        SendMessage(methodMessage, messageType.warning)
                    End If
                Else
                    'message click on the calculate consequental damage
                    methodMessage = "You must click on the Calculate Cons.Damage buttom in order to summarize the total amoount."
                    SendMessage(methodMessage, messageType.warning)
                End If

                'UpdateInternalStatusGeneric(txtAcknowledgeEmail, txtAcknowledgeEmailDate, chkAcknowledgeEmail, lnkConsDamage, False)
                'AcknowledgeEmailProcess(wrnNo, strMessage)
                'If Not String.IsNullOrEmpty(strMessage) Then
                'UpdateInternalStatusGeneric(txtAcknowledgeEmail, txtAcknowledgeEmailDate, chkAcknowledgeEmail, lnkConsDamage, True)
                'End If
            Else
                methodMessage = "If you want to update the consequental damage values please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.info)
            End If
        Catch ex As Exception

        End Try
    End Sub

    Protected Sub lnkClaimAuth_Click(sender As Object, e As EventArgs) Handles lnkClaimAuth.Click
        Dim strMessage As String = Nothing
        Dim validation As Boolean = False
        Try
            Dim wrnNo = hdSeq.Value.Trim()
            Dim claimNo = txtClaimNoData.Text.Trim()

            If chkClaimAuth.Checked Then
                If chkApproved.Checked Then
                    'approve if user have auth

                    Dim lstObj = New List(Of ClaimObj500To1500User)()
                    lstObj = DirectCast(Session("LstObj500to1500"), List(Of ClaimObj500To1500User))
                    Dim curuser = Session("userid").ToString().Trim().ToLower()
                    Dim qy = lstObj.AsEnumerable().Any(Function(qq) qq.CLMuser.Trim().ToLower() = curuser) 'user is in the MG list
                    Dim dbTotal As Double = 0
                    Dim dbConf As Double = 0

                    Dim bbTotal = Double.TryParse(txtParts.Text.Trim(), dbTotal)
                    Dim bbConf = Double.TryParse(hdSwLimitAmt.Value.Trim(), dbConf)

                    If (chkApproved.Enabled = True Or String.IsNullOrEmpty(txtClaimCompleted.Text.Trim())) And qy And dbConf > dbTotal Then

                        If ddlDiagnoseData.SelectedIndex <> -1 And Not String.IsNullOrEmpty(txtDiagnoseData.Text.Trim()) Then

                            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                                BuildDates()
                                'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                                'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss
                                'chkinitial.Value = "K"
                                'Dim dsCheck As DataSet = New DataSet()
                                'Dim check = objBL.GetIfIntStatusExist(wrnNo, chkinitial.Value, dsCheck)
                                If True Then
                                    'Dim rsIns = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                                    'SendMessageResponse("TEst MEssage", messageType.info)
                                    If True Then
                                        chkApproved.Enabled = False
                                        chkDeclined.Enabled = False
                                        chkClaimCompleted.Enabled = False
                                        txtClaimCompletedDate.Text = datenow
                                        txtClaimCompleted.Text = Session("userid").ToString().ToUpper()
                                        txtClaimCompleted.Enabled = False
                                        txtClaimCompletedDate.Enabled = False

                                        chkinitial.Value = "L"
                                        Dim rss = objBL.UpdateWIntFinalStat(wrnNo, "I", chkinitial.Value)

                                        txtTotValue.Text = txtParts.Text.ToString()
                                        txtTotValue.Enabled = False

                                        chkApproved.Enabled = False
                                        chkDeclined.Enabled = False

                                        validation = True

                                    End If
                                Else
                                    'Dim appFlg = dsCheck.Tables(0).Rows(0).Item("INTAPPRV").ToString().Trim().ToUpper()
                                    'If String.IsNullOrEmpty(appFlg) Then
                                    '    chkinitial.Value = "L"
                                    '    Dim rss = objBL.UpdateWIntFinalStat(wrnNo, "I", chkinitial.Value)

                                    '    txtTotValue.Text = txtParts.Text.ToString()
                                    '    txtTotValue.Enabled = False

                                    '    chkApproved.Enabled = False
                                    '    chkDeclined.Enabled = False

                                    '    validation = True
                                    'End If
                                End If

                            End Using

                        Else
                            strMessage = "The Diagnose must a have a selected value."
                            SendMessage(strMessage, messageType.warning)
                            Exit Sub
                        End If

                    Else

                        If chkApproved.Enabled = False Then
                            strMessage = "You must first click the Claim Approval checkbox to continue."
                        ElseIf String.IsNullOrEmpty(txtClaimCompleted.Text.Trim()) Then
                            strMessage = "You must first click the Claim Approval checkbox to continue."
                        ElseIf qy Then
                            strMessage = "You do not have authorization to request the claim approval."
                        ElseIf dbConf > dbTotal Then
                            strMessage = "The claim total cost is bigger than your configured value to request the claim approval."
                        End If

                        SendMessage(strMessage, messageType.warning)
                        Exit Sub

                    End If

                    If validation Then
                        Dim objSales = DirectCast(Session("ClaimGeneralValues"), ClaimTotalValues)
                        Dim objLimit = DirectCast(Session("ObjCurUserLmt"), ClaimObjUserLoggedLimit)
                        Dim blResult = SaveAuthForOver500Sales(objSales.WrnNo, Double.Parse(objSales.UnitCostValue), Double.Parse(objSales.CDFreightValue), Double.Parse(objSales.CDPartValue), Double.Parse(objSales.AmountApproved), Double.Parse(objSales.UserLimit), strMessage)
                        'ClaimOver500AndCMGenCloseClaim
                        If String.IsNullOrEmpty(strMessage) And blResult Then
                            UpdateInternalStatusGeneric(txtClaimAuth, txtClaimAuthDate, chkClaimAuth, lnkClaimAuth, False)
                            txtAmountApproved.Enabled = False
                            txtAmountApproved.Text = "0"

                            Dim methodMessage = "The Authorization Request for this Claim has been sent."
                            SendMessage(methodMessage, messageType.success)

                            Dim dsData = DirectCast(Session("DataSource"), DataSet)

                            'Dim dt = dsData.Tables(0).AsEnumerable().Where(Function(ee) Not ee.Item("MHMRNR").ToString().Trim().Equals(claimNo)).CopyToDataTable()
                            'Dim dsNew As DataSet = New DataSet()
                            'dsNew.Tables.Add(dt)

                            grvClaimReport.DataSource = dsData.Tables(0)
                            grvClaimReport.DataBind()
                            Session("DataSource") = dsData
                            Session("ItemCounts") = dsData.Tables(0).Rows.Count.ToString()
                            lblTotalClaims.Text = dsData.Tables(0).Rows.Count.ToString()

                            'hdNavTabsContent.Value = "0"
                            'hdClaimNumber.Value = ""
                            'hdGridViewContent.Value = "1"

                            'Exit Sub
                        Else
                            chkClaimAuth.Checked = False
                            Dim methodMessage = strMessage
                            SendMessage(methodMessage, messageType.warning)
                        End If
                    End If

                Else
                    Dim methodMessage = "If you want to authorize this credit over $500 please check in the Approve Checkbox for this Claim!"
                    SendMessage(methodMessage, messageType.warning)
                End If
            Else
                Dim methodMessage = "If you want to update the status please click on the checkbox besides this button!"
                SendMessage(methodMessage, messageType.warning)
            End If

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

#End Region

    'Protected Sub btnCloseTab_Click(sender As Object, e As EventArgs) Handles btnCloseTab.Click
    '    Try
    '        ClearInputCustom(navsSection)
    '    Catch ex As Exception

    '    End Try
    'End Sub


#Region "Action Methods"

    Public Function DeleteFromIntStatus(wrno As String, sts As String) As Boolean
        Dim rsResult As Integer = -1
        Dim strMessage As String = Nothing
        Dim blResult As Boolean = False
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                rsResult = objBL.DeleteFromIntStatus(wrno.Trim(), sts.Trim())
                If rsResult < 0 Then
                    strMessage = "There is an deleting the rejected internal status for warning number" + wrno + "."
                Else
                    blResult = True
                End If

            End Using

            Return blResult
        Catch ex As Exception
            Return blResult
        End Try

    End Function

    Private Function endReopenProc(wrnNo As String, claimNo As String, ByRef strMessage As String) As Boolean
        Dim blEndProc As Boolean = False
        strMessage = ""
        Try
            If Not String.IsNullOrEmpty(txtDiagnoseData.Text) Then

                Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                    Dim checkComm = saveComm("7 : CLAIM CLOSED", strMessage)
                    chkinitial.Value = "C"
                    Dim rsUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                    If rsUpd > 0 Then
                        If hdFlagUpload.Value = "U" Then
                            Dim rsUpdClose = objBL.UpdateNWHeaderStat(claimNo, "7")
                            If rsUpdClose > 0 Then
                                blEndProc = True
                                strMessage = "Claim Closed."
                            Else
                                'error log
                                strMessage = "There is an error updating the NW Header status for the claim number: " + claimNo + "."
                                blEndProc = False
                            End If
                        Else
                            blEndProc = True
                            strMessage = "Claim Closed."
                        End If
                    Else
                        'error log
                        strMessage = "There is an error updating the W Header status for the warning number: " + wrnNo + "."
                        blEndProc = False
                    End If

                End Using

                deactTxt()
                deactCmd()
                deactCmb()

            Else
                strMessage = "Claim can not be closed without a Diagnose selected."
                blEndProc = False
            End If
            Return blEndProc
        Catch ex As Exception
            Return blEndProc
        End Try
    End Function

    Public Function UpdateCommentsInNWHeader(str As String, claimno As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                If Not String.IsNullOrEmpty(str) Then
                    Dim fullComments = hdComments.Value.Trim()
                    If fullComments IsNot Nothing Then
                        If Not String.IsNullOrEmpty(fullComments) Then
                            If fullComments.Length > 60 Then
                                Dim arrayComments As String() = fullComments.Split(".")
                                Dim comm1 = If(Not String.IsNullOrEmpty(arrayComments(0).Trim()), objBL.FixSingleCommentsLenght(arrayComments(0).Trim()), "")
                                Dim comm2 = If(Not String.IsNullOrEmpty(arrayComments(1).Trim()), objBL.FixSingleCommentsLenght(arrayComments(1).Trim()), "")
                                Dim comm3 = If(Not String.IsNullOrEmpty(arrayComments(2).Trim()), objBL.FixSingleCommentsLenght(arrayComments(2).Trim()), "")

                                Dim rsUpd = objBL.UpdateCommentsByClaimNo(claimno, comm1, comm2, comm3)
                                If rsUpd > 0 Then
                                    'done
                                    result = True
                                    'trazabilidad del proceso
                                Else
                                    result = False
                                    'error and log
                                End If
                            Else
                                Dim rsUpd = objBL.UpdateCommentsByClaimNo(claimno, fullComments)
                                If rsUpd > 0 Then
                                    'done
                                    result = True
                                Else
                                    result = False
                                    'error and log
                                End If
                            End If
                        Else
                            strMessage = "The Description must have a value."
                        End If
                    Else
                        strMessage = "The Description must have a value."
                        Return result
                    End If
                    'get all description for claim.
                    'fix comments by method FixCommentsLenght
                    'update comments in BD
                Else
                    strMessage = "The Description must have a value."
                    Return result
                End If
            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function UpdateContactInfoByClaimNo(claimno As String, ByRef strMessage As String) As Boolean
        Dim lstContactDataMiss As List(Of String) = New List(Of String)()
        Dim result As Boolean = False
        Dim strContactErrors As String = Nothing
        strMessage = Nothing
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If String.IsNullOrEmpty(txtContactName.Text.Trim()) Then
                    lstContactDataMiss.Add("Contact Name")
                ElseIf String.IsNullOrEmpty(txtContactPhone.Text.Trim()) Then
                    lstContactDataMiss.Add("Contact Phone")
                ElseIf String.IsNullOrEmpty(txtContactEmail.Text.Trim()) Then
                    lstContactDataMiss.Add("Contact Email")
                End If

                'get possible empty fields
                If lstContactDataMiss.Count > 0 Then
                    strContactErrors = "The following data should not be empty: "
                    For Each item As String In lstContactDataMiss
                        strContactErrors += item + ", "
                    Next
                    strContactErrors = strContactErrors.TrimEnd(",")
                End If
                strMessage = strContactErrors

                Dim rsUpd = objBL.UpdateContactInfoByClaimNo(claimno, False, txtContactName.Text.Trim(), txtContactPhone.Text.Trim(), txtContactEmail.Text.Trim())
                If rsUpd > 0 Then
                    'done
                    result = True
                Else
                    'error and log
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function UpdateContactAndDiagnose(claimno As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkApproved.Checked And chkApproved.Enabled = True Then
                    'first 
                    Dim ds1 = New DataSet()
                    Dim rs1 = objBL.GetClaimByTypeAndReason(claimno, "B", "B1", ds1)
                    If rs1 > 0 Then
                        If ds1 IsNot Nothing Then
                            If ds1.Tables(0).Rows.Count > 0 Then
                                'second validation
                                Dim ds2 = New DataSet()
                                Dim flagGoAhead = False
                                Dim rs2 = objBL.GetClaimWithCM(claimno, ds2)
                                If rs2 > 0 Then
                                    If ds2 IsNot Nothing Then
                                        If ds2.Tables(0).Rows.Count > 0 Then
                                            strMessage = "This claim already have a credit, please check."
                                            'message --> This claim already have a credit, please check.
                                            flagGoAhead = False
                                        Else
                                            'third validation
                                            flagGoAhead = True
                                        End If
                                    Else
                                        'third validation
                                        flagGoAhead = True
                                    End If
                                Else
                                    'third validation
                                    flagGoAhead = True
                                End If

                                'no data results in order to continue the process
                                If flagGoAhead Then
                                    'third validation
                                    Dim dsInProcessSta = New DataSet()
                                    Dim flagGoAhead1 = False
                                    Dim rsInProcessSta = objBL.GetClaimInProcessST(claimno, dsInProcessSta)
                                    If rsInProcessSta > 0 Then
                                        If dsInProcessSta IsNot Nothing Then
                                            If dsInProcessSta.Tables(0).Rows.Count > 0 Then
                                                flagGoAhead1 = False
                                                strMessage = "To process this claim, it must be in In Process status or RGA NO. ISSUED status, please check."
                                                'message --> To process this claim, it must be in In Process status or RGA NO. ISSUED status, please check.
                                            Else
                                                flagGoAhead1 = True
                                            End If
                                        Else
                                            flagGoAhead1 = True
                                        End If
                                    Else
                                        flagGoAhead1 = True
                                    End If

                                    'no data results in order to continue the process
                                    If flagGoAhead1 Then
                                        Dim dsRGAReceived = New DataSet()
                                        Dim flagGoAhead2 = False
                                        Dim rsRGAReceived = objBL.GetClaimRGAReceived(claimno, dsRGAReceived)
                                        If rsRGAReceived > 0 Then
                                            If dsRGAReceived IsNot Nothing Then
                                                If dsRGAReceived.Tables(0).Rows.Count > 0 Then
                                                    flagGoAhead2 = False
                                                    strMessage = "RGA already was reveived. First must locate the part to process the credit."
                                                    'message --> RGA already was reveived. First must locate the part to process the credit.
                                                Else
                                                    flagGoAhead2 = True
                                                End If
                                            Else
                                                flagGoAhead2 = True
                                            End If
                                        Else
                                            flagGoAhead2 = True
                                        End If

                                        'no data results in order to continue the process
                                        If flagGoAhead2 Then
                                            If ddlDiagnoseData.SelectedIndex <> -1 And Not String.IsNullOrEmpty(txtDiagnoseData.Text.Trim()) Then
                                                Dim Diagnose = txtDiagnoseData.Text.Trim()
                                                Dim DiagnoseCode = ddlDiagnoseData.SelectedValue.ToString().Trim()
                                                Dim rsUpd = objBL.UpdateNWHeader(claimno, False, DiagnoseCode, txtContactName.Text.Trim(), txtContactPhone.Text.Trim(), txtContactEmail.Text.Trim())
                                                If rsUpd > 0 Then

                                                    If chkApproved.Checked And chkApproved.Enabled = True Then
                                                        Dim appb = cmdApproveds(strMessage)
                                                        If appb Then
                                                            Dim dec = cmdCloseClaim(strMessage)
                                                            If dec Then
                                                                chkApproved.Enabled = False
                                                                chkDeclined.Enabled = False
                                                            Else
                                                                strMessage = "There is an error in the Close Claim process for the Claim Number:" + claimno + "."
                                                                Return result
                                                            End If
                                                        Else
                                                            strMessage = "There is an error in the Approval Process for the Claim Number:" + claimno + "."
                                                            Return result
                                                        End If
                                                    ElseIf chkDeclined.Checked And chkDeclined.Enabled = True Then
                                                        ' call method (cmdRejects)
                                                        Dim rej = cmdRejects(strMessage)
                                                        If rej Then
                                                            chkApproved.Enabled = False
                                                            chkDeclined.Enabled = False
                                                        Else
                                                            strMessage = "There is an error in the Reject Process for the Claim Number:" + claimno + "."
                                                            Return result
                                                        End If
                                                    End If
                                                    result = True
                                                Else
                                                    'error actualizando
                                                    strMessage = "There is an error updating the NW Header with Diagnose Code."
                                                    Return result
                                                End If
                                            Else
                                                strMessage = "Claim can not be closed without a Diagnose selected."
                                                Return result
                                                'message --> Claim can not be closed without a Diagnose selected
                                            End If
                                        Else
                                            Return result
                                        End If
                                    Else
                                        Return result
                                    End If
                                Else
                                    Return result
                                End If

                            Else
                                strMessage = "This claim must be process through AS/400."
                                Return result
                                'message --> This claim must be process through AS/400.
                            End If
                        Else
                            strMessage = "This claim must be process through AS/400."
                            Return result
                            'message --> This claim must be process through AS/400.
                        End If
                    Else
                        strMessage = "This claim must be process through AS/400."
                        Return result
                        'message --> This claim must be process through AS/400.
                    End If
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function UpdateDiagnoseValue(claimNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim selectedValue As String = Nothing
                If hdSelectedDiagnose.Value = "0" Then
                    If Not String.IsNullOrEmpty(txtDiagnoseData.Text.Trim()) Then
                        selectedValue = txtDiagnoseData.Text
                        ddlDiagnoseData.SelectedIndex = ddlDiagnoseData.Items.IndexOf(ddlDiagnoseData.Items.FindByText(selectedValue))
                    Else
                        Return result
                    End If
                Else
                    selectedValue = hdSelectedDiagnose.Value
                    ddlDiagnoseData.SelectedIndex = ddlDiagnoseData.Items.IndexOf(ddlDiagnoseData.Items.FindByText(selectedValue))
                End If

                If ddlDiagnoseData.SelectedIndex <> -1 And Not String.IsNullOrEmpty(txtDiagnoseData.Text.Trim()) Then
                    Dim Diagnose = txtDiagnoseData.Text.Trim()
                    Dim diagValue = ddlDiagnoseData.SelectedValue
                    Dim rsUpdDiag = objBL.UpdateNWHeader(claimNo, True, diagValue)
                    If rsUpdDiag > 0 Then
                        result = True
                        strMessage = "The Diagnose was updated successfully."
                    Else
                        strMessage = "There is an error updating the Diagnose Value."
                        Return result
                    End If
                Else
                    strMessage = "The Diagnose must a have a selected value."
                    Return result
                End If
            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function UpdateWHeaderValues(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim loc As String = hdLocationSelected.Value.Trim()
                Dim lii As ListItem = New ListItem(loc, "1")
                LoadDropDownLists(ddlLocation)
                ddlLocation.Items.Add(lii)

                Dim locValue = hdLocationSelected.Value.Split("-")(0).Trim()

                Dim rsUpdWHeader = objBL.UpdateWHeader(wrnNo, txtContactName.Text.Trim(), txtContactPhone.Text.Trim(), txtContactEmail.Text.Trim(), txtDateEntered.Text.Trim(),
                                                           txtVendorNo.Text.Trim(), txtProductionCode.Text.Trim(), txtInvoiceNo.Text.Trim(), txtPartNoData.Text.Trim(),
                                                           locValue, txtQty.Text.Trim(), txtUnitCost.Text.Trim(), txtModel.Text.Trim(), txtSerial.Text.Trim(),
                                                           txtArrangement.Text.Trim(), txtInstDate.Text.Trim(), txtHWorked.Text.Trim())
                If rsUpdWHeader > 0 Then
                    result = True
                Else
                    strMessage = "There is an error updating the Warranty Header values for Warning Number: " + wrnNo + "."
                    Return result
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function UpdateNWHeaderStatus(claimNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Dim dsGet = New DataSet()
            'claimNo = txtClaimNoData.Text.Trim()

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rsGet = objBL.getNWrnClaimsHeader(claimNo, dsGet)
                If rsGet > 0 Then
                    If dsGet IsNot Nothing Then
                        If dsGet.Tables(0).Rows.Count > 0 Then
                            Dim stat = dsGet.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()
                            If stat = "1" Then
                                Dim checkComm = saveComm("I : IN PROC")

                                Dim rsUpdNWHeaderStat = objBL.UpdateNWHeaderStat(claimNo, "2")
                                If rsUpdNWHeaderStat > 0 Then
                                    result = True
                                Else
                                    'error actualizando
                                    strMessage = "There is an error updating the NW Header Status for Claim Number : " + claimNo + "."
                                    Return result
                                End If
                            Else
                                result = True
                            End If
                        Else
                            strMessage = "There is no data in Non Warranty Claims for the Claim Number: " + claimNo + "."
                            Return result
                        End If
                    Else
                        strMessage = "There is no data in Non Warranty Claims for the Claim Number: " + claimNo + "."
                        Return result
                    End If
                Else
                    strMessage = "There is no data in Non Warranty Claims for the Claim Number: " + claimNo + "."
                    Return result
                End If
            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Sub GetInternalStsByCode(code As String)
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim dsIntStatus = New DataSet()
                Dim rsIntStatus = objBL.getDataByInternalStsLet(code, dsIntStatus)
                If rsIntStatus > 0 Then
                    If dsIntStatus IsNot Nothing Then
                        If dsIntStatus.Tables(0).Rows.Count > 0 Then
                            Session("IntSts") = dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim()
                        End If
                    End If
                End If
            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function InitialStatusProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkInitialReview.Checked And chkInitialReview.Enabled = True Then
                    chkinitial.Value = "I"
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsInsInitReview = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                    If rsInsInitReview > 0 Then
                        txtInitialReview.Text = Session("userid").ToString().ToUpper()
                        txtInitialReviewDate.Text = datenow
                        chkInitialReview.Enabled = False

                        Dim dsIntStatus = New DataSet()
                        Dim rsIntStatus = objBL.getDataByInternalStsLet(chkinitial.Value, dsIntStatus)
                        If rsIntStatus > 0 Then
                            If dsIntStatus IsNot Nothing Then
                                If dsIntStatus.Tables(0).Rows.Count > 0 Then
                                    txtActualStatus.Text = Left(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                        Mid(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)
                                    txtActualStatus.Text.ToUpper()
                                    txtActualStatus.Enabled = False

                                    result = True
                                    lnkInitialReview.Enabled = False
                                Else
                                    'log error
                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'log error
                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        Else
                            'log error
                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                            Return result
                        End If

                        Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                        If rsLastUpd > 0 Then
                            result = True
                            'strMessage = "The update was done for the Warning Number: " + wrnNo + "."
                        Else
                            'error log
                            strMessage = "There is an error updating the Warranty Header status for Warning Number: " + wrnNo + "."
                            Return result
                        End If
                    Else
                        'insertion error
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."

                        txtInitialReview.Text = Session("userid").ToString().ToUpper()
                        txtInitialReviewDate.Text = datenow
                        chkInitialReview.Enabled = False

                        result = True
                        Return result
                    End If
                Else
                    result = True
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function AcknowledgeEmailProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Dim justExist As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkAcknowledgeEmail.Checked And chkAcknowledgeEmail.Enabled = True And chkInitialReview.Checked Then
                    'And chkInitialReview.Enabled = False

                    chkinitial.Value = "B"
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsInsInitReview = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow, False, justExist)
                    If rsInsInitReview > 0 Then
                        txtAcknowledgeEmail.Text = Session("userid").ToString().ToUpper()
                        txtAcknowledgeEmailDate.Text = datenow
                        chkAcknowledgeEmail.Enabled = False

                        Dim dsIntStatus = New DataSet()
                        Dim rsIntStatus = objBL.getDataByInternalStsLet(chkinitial.Value, dsIntStatus)
                        If rsIntStatus > 0 Then
                            If dsIntStatus IsNot Nothing Then
                                If dsIntStatus.Tables(0).Rows.Count > 0 Then
                                    txtActualStatus.Text = Left(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                        Mid(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)
                                    txtActualStatus.Text.ToUpper()
                                    txtActualStatus.Enabled = False

                                    result = True
                                    lnkAcknowledgeEmail.Enabled = False
                                Else
                                    'log error
                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'log error
                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        Else
                            'log error
                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                            Return result
                        End If

                        If Not justExist Then
                            Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                            If rsLastUpd > 0 Then
                                Dim objEmail = DirectCast(Session("emailObj"), ClaimEmailObj)
                                Dim messageOut As String = Nothing
                                If objEmail IsNot Nothing Then
                                    'email for acknowledge email
                                    Dim emailMsg = hdTextEditorAckMessage.Value.Trim()
                                    objEmail.MESSAGE = emailMsg

                                    Dim bresult = PrepareEmail(objEmail, "2", messageOut)
                                    If Not bresult Then
                                        strMessage += messageOut
                                    End If

                                End If
                                'send message
                                result = True
                            Else
                                'error log
                                strMessage = "There is an error updating the Warranty Header status for Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        End If
                    Else
                        'insertion error
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."
                        result = True

                        txtAcknowledgeEmail.Text = Session("userid").ToString().ToUpper()
                        txtAcknowledgeEmailDate.Text = datenow
                        chkAcknowledgeEmail.Enabled = False

                        Return result
                    End If
                Else
                    result = True
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function InfoRequestedProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Dim justExist As Boolean = False
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkInfoCust.Checked And chkInfoCust.Enabled = True Then
                    chkinitial.Value = "D"
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsInsInitReview = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow, justExist)
                    If rsInsInitReview > 0 Then
                        txtInfoCust.Text = Session("userid").ToString().ToUpper()
                        txtInfoCustDate.Text = datenow
                        chkInfoCust.Enabled = False

                        Dim dsIntStatus = New DataSet()
                        Dim rsIntStatus = objBL.getDataByInternalStsLet(chkinitial.Value, dsIntStatus)
                        If rsIntStatus > 0 Then
                            If dsIntStatus IsNot Nothing Then
                                If dsIntStatus.Tables(0).Rows.Count > 0 Then
                                    txtActualStatus.Text = Left(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                        Mid(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)
                                    txtActualStatus.Text.ToUpper()
                                    txtActualStatus.Enabled = False

                                    result = True
                                    lnkInfoCust.Enabled = False
                                Else
                                    'log error
                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'log error
                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        Else
                            'log error
                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                            Return result
                        End If

                        If Not justExist Then
                            Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                            If rsLastUpd > 0 Then
                                Dim objEmail = DirectCast(Session("emailObj"), ClaimEmailObj)
                                Dim messageOut As String = Nothing
                                If objEmail IsNot Nothing Then
                                    Dim emailMsg = hdTextEditorInfoCustMessage.Value.Trim()
                                    objEmail.MESSAGE = emailMsg

                                    Dim bresult = PrepareEmail(objEmail, "4", messageOut)
                                    If Not bresult Then
                                        strMessage += messageOut
                                    End If
                                    result = True
                                End If
                            Else
                                    'error log
                                    strMessage = "There is an error updating the Warranty Header status for Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        End If
                    Else
                        'insertion error
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."
                        result = True

                        txtInfoCust.Text = Session("userid").ToString().ToUpper()
                        txtInfoCustDate.Text = datenow
                        chkInfoCust.Enabled = False

                        Return result
                    End If
                Else
                    result = True
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function PartRequestedProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkPartRequested.Checked And chkPartRequested.Enabled = True Then
                    chkinitial.Value = "F"
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsInsInitReview = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                    If rsInsInitReview > 0 Then
                        txtPartRequested.Text = Session("userid").ToString().ToUpper()
                        txtPartRequestedDate.Text = datenow
                        chkPartRequested.Enabled = False

                        Dim dsIntStatus = New DataSet()
                        Dim rsIntStatus = objBL.getDataByInternalStsLet(chkinitial.Value, dsIntStatus)
                        If rsIntStatus > 0 Then
                            If dsIntStatus IsNot Nothing Then
                                If dsIntStatus.Tables(0).Rows.Count > 0 Then
                                    txtActualStatus.Text = Left(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                        Mid(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)
                                    txtActualStatus.Text.ToUpper()
                                    txtActualStatus.Enabled = False

                                    lnkPartRequested.Enabled = False
                                Else
                                    'log error
                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'log error
                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        Else
                            'log error
                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                            Return result
                        End If

                        Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                        If rsLastUpd > 0 Then
                            'open outlook to send email to customer
                            result = True
                        Else
                            'error log
                            strMessage = "There is an error updating the Warranty Header status for Warning Number: " + wrnNo + "."
                            Return result
                        End If
                    Else
                        'insertion error
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."
                        result = True

                        txtPartRequested.Text = Session("userid").ToString().ToUpper()
                        txtPartRequested.Text = datenow
                        chkPartRequested.Enabled = False

                        Return result
                    End If
                Else
                    result = True
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function PartReceivedProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkPartReceived.Checked And chkPartReceived.Enabled = True Then
                    chkinitial.Value = "G"
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsInsInitReview = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                    If rsInsInitReview > 0 Then
                        txtPartReceived.Text = Session("userid").ToString().ToUpper()
                        txtPartReceivedDate.Text = datenow
                        chkPartReceived.Enabled = False

                        Dim dsIntStatus = New DataSet()
                        Dim rsIntStatus = objBL.getDataByInternalStsLet(chkinitial.Value, dsIntStatus)
                        If rsIntStatus > 0 Then
                            If dsIntStatus IsNot Nothing Then
                                If dsIntStatus.Tables(0).Rows.Count > 0 Then
                                    txtActualStatus.Text = Left(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                        Mid(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)
                                    txtActualStatus.Text.ToUpper()
                                    txtActualStatus.Enabled = False

                                    result = True
                                    lnkPartReceived.Enabled = False
                                Else
                                    'log error
                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'log error
                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        Else
                            'log error
                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                            Return result
                        End If

                        Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                        If rsLastUpd > 0 Then
                            result = True
                        Else
                            'error log
                            strMessage = "There is an error updating the Warranty Header status for Warning Number: " + wrnNo + "."
                            Return result
                        End If
                    Else
                        'insertion error
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."
                        result = True

                        txtPartReceived.Text = Session("userid").ToString().ToUpper()
                        txtPartReceivedDate.Text = datenow
                        chkPartReceived.Enabled = False

                        Return result
                    End If
                Else
                    result = True
                End If
            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function TechReviewProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkTechReview.Checked And chkTechReview.Enabled = True Then
                    chkinitial.Value = "H"
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsInsInitReview = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                    If rsInsInitReview > 0 Then
                        txtTechReview.Text = Session("userid").ToString().ToUpper()
                        txtTechReviewDate.Text = datenow
                        chkTechReview.Enabled = False

                        Dim dsIntStatus = New DataSet()
                        Dim rsIntStatus = objBL.getDataByInternalStsLet(chkinitial.Value, dsIntStatus)
                        If rsIntStatus > 0 Then
                            If dsIntStatus IsNot Nothing Then
                                If dsIntStatus.Tables(0).Rows.Count > 0 Then
                                    txtActualStatus.Text = Left(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                        Mid(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)
                                    txtActualStatus.Text.ToUpper()
                                    txtActualStatus.Enabled = False

                                    result = True
                                    lnkTechReview.Enabled = False
                                Else
                                    'log error
                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'log error
                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        Else
                            'log error
                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                            Return result
                        End If

                        Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                        If rsLastUpd > 0 Then
                            result = True
                        Else
                            'error log
                            strMessage = "There is an error updating the Warranty Header status for Warning Number: " + wrnNo + "."
                            Return result
                        End If
                    Else
                        'insertion error
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."
                        result = True

                        txtTechReview.Text = Session("userid").ToString().ToUpper()
                        txtTechReviewDate.Text = datenow
                        chkTechReview.Enabled = False

                        Return result
                    End If
                Else
                    result = True
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function WaitingSupplierProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkWaitSupReview.Checked And chkWaitSupReview.Enabled = True Then
                    chkinitial.Value = "J"
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsInsInitReview = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                    If rsInsInitReview > 0 Then
                        txtWaitSupReview.Text = Session("userid").ToString().ToUpper()
                        txtWaitSupReviewDate.Text = datenow
                        chkWaitSupReview.Enabled = False

                        Dim dsIntStatus = New DataSet()
                        Dim rsIntStatus = objBL.getDataByInternalStsLet(chkinitial.Value, dsIntStatus)
                        If rsIntStatus > 0 Then
                            If dsIntStatus IsNot Nothing Then
                                If dsIntStatus.Tables(0).Rows.Count > 0 Then
                                    txtActualStatus.Text = Left(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                        Mid(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)
                                    txtActualStatus.Text.ToUpper()
                                    txtActualStatus.Enabled = False

                                    result = True
                                    lnkWaitSupReview.Enabled = False
                                Else
                                    'log error
                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'log error
                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        Else
                            'log error
                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                            Return result
                        End If

                        Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                        If rsLastUpd > 0 Then
                            result = True
                        Else
                            'error log
                            strMessage = "There is an error updating the Warranty Header status for Warning Number: " + wrnNo + "."
                            Return result
                        End If
                    Else
                        'insertion error
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."
                        result = True

                        txtWaitSupReview.Text = Session("userid").ToString().ToUpper()
                        txtWaitSupReviewDate.Text = datenow
                        chkWaitSupReview.Enabled = False

                        Return result
                    End If
                Else
                    result = True
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function CompletedClaimProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkClaimCompleted.Checked And chkClaimCompleted.Enabled = True Then
                    chkinitial.Value = "K"
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsInsInitReview = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                    If rsInsInitReview > 0 Then
                        txtClaimCompleted.Text = Session("userid").ToString().ToUpper()
                        txtClaimCompletedDate.Text = datenow
                        chkClaimCompleted.Enabled = False

                        Dim dsIntStatus = New DataSet()
                        Dim rsIntStatus = objBL.getDataByInternalStsLet(chkinitial.Value, dsIntStatus)
                        If rsIntStatus > 0 Then
                            If dsIntStatus IsNot Nothing Then
                                If dsIntStatus.Tables(0).Rows.Count > 0 Then
                                    txtActualStatus.Text = Left(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                        Mid(dsIntStatus.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)
                                    txtActualStatus.Text.ToUpper()
                                    txtActualStatus.Enabled = False

                                    result = True
                                    lnkClaimCompleted.Enabled = False
                                Else
                                    'log error
                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'log error
                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                Return result
                            End If
                        Else
                            'log error
                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                            Return result
                        End If

                        Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                        If rsLastUpd > 0 Then
                            result = True
                        Else
                            'error log
                            strMessage = "There is an error updating the Warranty Header status for Warning Number: " + wrnNo + "."
                            Return result
                        End If
                    Else
                        'insertion error
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."
                        result = True

                        txtClaimCompleted.Text = Session("userid").ToString().ToUpper()
                        txtClaimCompletedDate.Text = datenow
                        txtClaimCompleted.Enabled = False
                        txtClaimCompletedDate.Enabled = False
                        chkClaimCompleted.Enabled = False

                        Return result
                    End If
                Else
                    result = True
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function SaveEngineInfo(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If Not String.IsNullOrEmpty(txtModel1.Text.Trim()) And Not String.IsNullOrEmpty(txtSerial1.Text.Trim()) And Not String.IsNullOrEmpty(txtArrangement1.Text.Trim()) Then
                    Dim dsEngineInfo = New DataSet()
                    Dim rsEngineInfo = objBL.getEngineInfo(wrnNo, dsEngineInfo)
                    If rsEngineInfo > 0 Then
                        If dsEngineInfo IsNot Nothing Then
                            If dsEngineInfo.Tables(0).Rows.Count > 0 Then
                                Dim rsUpdateEngineInfo = objBL.UpdateEngineInfo(wrnNo, txtModel1.Text.Trim(), txtSerial1.Text.Trim(), txtArrangement1.Text.Trim())
                                If rsUpdateEngineInfo > 0 Then
                                    result = True
                                Else
                                    'error log
                                    strMessage = "There is an error updating the Engine Information for Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                Dim InsertEngineInfo = objBL.InsertEngineInfo(wrnNo, txtModel1.Text.Trim(), txtSerial1.Text.Trim(), txtArrangement1.Text.Trim())
                                If InsertEngineInfo > 0 Then
                                    result = True
                                Else
                                    'error log
                                    strMessage = "There is an error inserting the Engine Information for the warning no:" + hdSeq.Value.Trim() + "."
                                    Return result
                                End If
                            End If
                        Else
                            strMessage = "There is not data for Engine Information for the Warning Number: " + wrnNo + "."
                            Return result
                        End If
                    Else
                        strMessage = "There is not data for Engine Information for the Warning Number: " + wrnNo + "."
                        Return result
                    End If
                Else
                    'strMessage = "The fields related to engine information must be filled."
                    'Return result
                    result = True
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function SaveNewClaimDescProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        Dim intValidation As Integer = 0
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If Not String.IsNullOrEmpty(txtCustStatement.Text.Trim()) Then
                    Dim dsWHeader = New DataSet()
                    Dim lengDesc = Len(txtCustStatement.Text.Trim())
                    Dim rsWHeader = objBL.GetWrnClaimsHeader(wrnNo, dsWHeader)
                    If rsWHeader > 0 Then
                        If dsWHeader IsNot Nothing Then
                            If dsWHeader.Tables(0).Rows.Count > 0 Then
                                Dim com1 = If(String.IsNullOrEmpty(dsWHeader.Tables(0).Rows(0).Item("CWCOM1").ToString().Trim()), 0, Len(dsWHeader.Tables(0).Rows(0).Item("CWCOM1").ToString().Trim()))
                                Dim com2 = If(String.IsNullOrEmpty(dsWHeader.Tables(0).Rows(0).Item("CWCOM2").ToString().Trim()), 0, Len(dsWHeader.Tables(0).Rows(0).Item("CWCOM2").ToString().Trim()))
                                Dim com3 = If(String.IsNullOrEmpty(dsWHeader.Tables(0).Rows(0).Item("CWCOM3").ToString().Trim()), 0, Len(dsWHeader.Tables(0).Rows(0).Item("CWCOM3").ToString().Trim()))
                                Dim tcomm = com1 + com2 + com3

                                If com1 = 0 And com2 = 0 And com3 = 0 And lengDesc > 0 Then
                                    Dim rsInsWDesc = objBL.InsertWDesc(wrnNo, txtCustStatement.Text.Trim())
                                    If rsInsWDesc > 0 Then
                                        intValidation += 1
                                    Else
                                        'error log
                                        strMessage = "There is an error inserting the Description for the warning no:" + wrnNo + "."
                                        Return result
                                    End If
                                ElseIf lengDesc > 0 And tcomm > 0 And lengDesc <> tcomm Then
                                    Dim dsFull = New DataSet()
                                    Dim rsFull = objBL.getEngineInfo(wrnNo, dsFull) ' just get all values for internal data
                                    If rsFull > 0 Then
                                        If dsFull IsNot Nothing Then
                                            If dsFull.Tables(0).Rows.Count > 0 Then
                                                'update
                                                Dim descc = txtCustStatement.Text.Trim()
                                                Dim OutReg = Regex.Replace(descc, "[^0-9A-Za-z .,]", String.Empty)
                                                Dim rsUpd = objBL.UpdateWIntDesc(wrnNo, OutReg)
                                                If rsUpd > 0 Then
                                                    intValidation += 1
                                                Else
                                                    'error log
                                                    strMessage = "There is an error updating the Warranty Internal Description for Warning Number: " + wrnNo + "."
                                                    Return result
                                                End If
                                            Else
                                                'insert
                                                Dim descc = txtCustStatement.Text.Trim()
                                                Dim OutReg = Regex.Replace(descc, "[^0-9A-Za-z .,]", String.Empty)
                                                Dim rsIns = objBL.InsertWDesc(wrnNo, OutReg)
                                                If rsIns > 0 Then
                                                    intValidation += 1
                                                Else
                                                    'error log
                                                    strMessage = "There is an error inserting the Warranty Internal Description for the warning no:" + wrnNo + "."
                                                    Return result
                                                End If
                                            End If
                                        Else
                                            strMessage = "There is not data in Warranty Internal for Warning Number: " + wrnNo + "."
                                            Return result
                                        End If
                                    Else
                                        strMessage = "There is not data in Warranty Internal for Warning Number: " + wrnNo + "."
                                        Return result
                                    End If
                                End If
                            Else
                                strMessage = "There is not data in Warranty Header for Warning Number: " + wrnNo + "."
                                Return result
                            End If
                            'strMessage = "There is not data in Warranty Header for Warning Number: " + wrnNo + "."
                            'Return result
                        End If
                    Else
                        strMessage = "There is not data in Warranty Header for Warning Number: " + wrnNo + "."
                        Return result
                    End If
                End If

            End Using

            If intValidation >= 1 Or intValidation <= 2 Then
                result = True
            End If

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function QuarantineProcess(wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If chkQuarantine.Checked And chkQuarantine.Enabled = True Then
                    BuildDates()
                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    Dim rsQuarantine = objBL.InsertInternalStatus(wrnNo, "Q", Session("userid").ToString().ToUpper(), datenow, hournow, True)
                    If rsQuarantine > 0 Then
                        txtQuarantine.Text = Session("userid").ToString().ToUpper()
                        txtQuarantineDate.Text = datenow
                        chkQuarantine.Enabled = False
                        txtQuarantine.Enabled = False
                        txtQuarantineDate.Enabled = False
                    Else
                        'error log
                        strMessage = "The Status can not be inserted for the warning no:" + wrnNo + "."
                        result = True

                        txtQuarantine.Text = Session("userid").ToString().ToUpper()
                        txtQuarantineDate.Text = datenow
                        chkQuarantine.Enabled = False
                        txtQuarantine.Enabled = False
                        txtQuarantineDate.Enabled = False

                        Return result
                    End If
                Else
                    strMessage = "No quarantine for this claim."
                    result = True
                    Return result
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function AuthToPutCostsProcess(claimNo As String, wrnNo As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        Dim intValidation As Integer = 0
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim strUsers = ConfigurationManager.AppSettings("AuthUsersForPutCost")
                Dim currentUser = UCase(Session("userid").ToString().Trim().ToUpper())
                Dim lstUsers = If(Not String.IsNullOrEmpty(strUsers), strUsers.Split(","), Nothing)
                Dim myitem = lstUsers.AsEnumerable().Where(Function(value) UCase(value.ToString().Trim()).Contains(currentUser))

                'If Not String.IsNullOrEmpty(txtConsDamageTotal.Text.Trim()) And txtConsDamageTotal.Text <> "0" Then
                '    If myitem.Count = 1 Then
                '        Dim dsClaimData = New DataSet()
                '        Dim condAccess = "B"
                '        'revisar si tiene que ser con status especifico????
                '        Dim rsClaimData = objBL.getClaimData(wrnNo, condAccess, dsClaimData)
                '        If rsClaimData > 0 Then ' Or (rsClaimData = 0 And condAccess = "C") Then
                '            If dsClaimData IsNot Nothing Then ' Or (rsClaimData = 0 And condAccess = "C") Then
                '                If dsClaimData.Tables(0).Rows.Count > 0 Then 'Or (rsClaimData = 0 And condAccess = "C") Then
                '                    Dim rsUpd = objBL.UpdateWConsDamage(wrnNo, condAccess, txtConsDamageTotal.Text.Trim(), txtCDPart.Text.Trim(), txtCDLabor.Text.Trim(), txtCDFreight.Text.Trim(), txtCDMisc.Text.Trim())
                '                    If rsUpd > 0 Then
                '                        intValidation += 1
                '                    Else
                '                        'error log
                '                        strMessage = "There is an error updating the Warranty Claim Consequental Damage value for Warning Number: " + claimNo + "."
                '                        Return result
                '                    End If
                '                Else
                '                    strMessage = "There is not data in Warranty Claims for B reason and Warning Number: " + claimNo + "."
                '                    Return result
                '                End If
                '            Else
                '                strMessage = "There is not data in Warranty Claims for B reason and Warning Number: " + claimNo + "."
                '                Return result
                '            End If
                '        Else
                '            strMessage = "There is not data in Warranty Claims for B reason and Warning Number: " + claimNo + "."
                '            Return result
                '        End If
                '    Else
                '        strMessage = "The current user does not have the Authorization to put costs. "
                '        Return result
                '    End If
                'End If

                If Not String.IsNullOrEmpty(txtFreight.Text) And txtFreight.Text <> "0" Then
                    If myitem.Count = 1 Then
                        Dim valueResult As Double = 0
                        If Double.TryParse(txtFreight.Text, valueResult) Then
                            If valueResult <> 0 Then
                                Dim rsUpd = objBL.UpdateWFreightType(claimNo, "P", txtFreight.Text)
                                If rsUpd > 0 Then
                                    intValidation += 1
                                Else
                                    'error log
                                    strMessage = "There is an error updating the Warranty Claim Freight value for type P and Claim Number: " + claimNo + "."
                                    Return result
                                End If
                            Else
                                intValidation += 1
                            End If
                        Else
                            strMessage = "The freight value is not valid. "
                            Return result
                        End If
                    Else
                        strMessage = "The current user does not have the Authorization to put costs. "
                        Return result
                    End If
                Else
                    intValidation += 1
                End If

            End Using

            If intValidation >= 1 Or intValidation <= 2 Then
                result = True
            End If

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Sub getMngUsers(Optional ByRef lstOut As List(Of ClaimObj500To1500User) = Nothing)
        Dim lstObj = New List(Of ClaimObj500To1500User)()
        Dim returnAuthUser = New ClaimObj500To1500User()
        Dim d1 As String = Nothing
        Dim d2 As String = Nothing
        Dim defConfUsrLimit = ConfigurationManager.AppSettings("usrDefaultlimit")
        Dim dsUserInCharge = New DataSet()
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rsUserInCharge = objBL.getDataForOver500(dsUserInCharge)
                If rsUserInCharge > 0 Then
                    If dsUserInCharge IsNot Nothing Then
                        If dsUserInCharge.Tables(0).Rows.Count > 0 Then

                            For Each dw As DataRow In dsUserInCharge.Tables(0).Rows
                                d1 = dw.Item("CNTDE1").ToString().Trim()
                                d2 = dw.Item("CNTDE2").ToString().Trim()

                                'gte the manager limit
                                Dim objAprovUser = New ClaimObj500To1500User()
                                objAprovUser.CLMemail = d1
                                objAprovUser.CLMuser = Mid(d2, 1, 10)
                                Dim tempLimit = Mid(d2, 38, 7)
                                Dim lmtUser = Regex.Replace(tempLimit, "^0+", "")
                                objAprovUser.CLMLimit = lmtUser

                                lstObj.Add(objAprovUser)
                            Next
                        End If
                    End If
                End If
                lstOut = lstObj
                Session("LstObj500to1500") = lstObj

            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try

    End Sub

    Public Function GetEmailAndUserAuthApp500To1500(ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Dim lstObj = New List(Of ClaimObj500To1500User)()
        Dim returnAuthUser = New ClaimObj500To1500User()
        Dim d1 As String = Nothing
        Dim d2 As String = Nothing
        Dim defConfUsrLimit = ConfigurationManager.AppSettings("usrDefaultlimit")
        Dim fullUser = ConfigurationManager.AppSettings("fullUser")
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim dsUserInCharge = New DataSet()
                Dim rsUserInCharge = objBL.getDataForOver500(dsUserInCharge)
                If rsUserInCharge > 0 Then
                    If dsUserInCharge IsNot Nothing Then
                        If dsUserInCharge.Tables(0).Rows.Count > 0 Then

                            For Each dw As DataRow In dsUserInCharge.Tables(0).Rows
                                d1 = dw.Item("CNTDE1").ToString().Trim()
                                d2 = dw.Item("CNTDE2").ToString().Trim()

                                'gte the manager limit
                                Dim objAprovUser = New ClaimObj500To1500User()
                                objAprovUser.CLMemail = d1
                                objAprovUser.CLMuser = Mid(d2, 1, 10)
                                Dim tempLimit = Mid(d2, 38, 7)
                                Dim lmtUser = Regex.Replace(tempLimit, "^0+", "")
                                objAprovUser.CLMLimit = lmtUser

                                lstObj.Add(objAprovUser)
                            Next

                            'Dim d1 = dsUserInCharge.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim()
                            'Dim d2 = dsUserInCharge.Tables(0).Rows(0).Item("CNTDE2").ToString().Trim()

                            Dim userChek = Session("userid").ToString().Trim()
                            Dim mngLogged As Boolean = False

                            Dim prcCurrentClaimCost = txtTotValue.Text.Trim()
                            Dim rs = If(Double.TryParse(txtTotValue.Text.Trim(), prcCurrentClaimCost), prcCurrentClaimCost, 0)

                            For Each item In lstObj
                                If LCase(item.CLMuser.Trim()).Equals(LCase(userChek)) Then
                                    If prcCurrentClaimCost <= Double.Parse(item.CLMLimit) Then
                                        hdCLMemail.Value = item.CLMemail.ToString().Trim()
                                        hdCLMuser.Value = item.CLMuser.ToString().Trim()
                                        hdCLMLimit.Value = item.CLMLimit.ToString().Trim()
                                        mngLogged = True
                                        IsFullUser.Value = "1"
                                        returnAuthUser = item
                                        Exit For
                                    Else
                                        Session("UpToLimit") = True
                                        mngLogged = False
                                        returnAuthUser = Nothing
                                        Exit For
                                    End If
                                End If
                            Next

                            If Not mngLogged Then
                                Dim objAprovUser = New ClaimObj500To1500User()
                                If lstObj.Count > 0 Then
                                    'objAprovUser = lstObj.AsEnumerable().Where(Function(a) LCase(a.CLMuser).Equals(LCase(defConfUsrLimit.Trim()))).First()
                                    'dt.AsEnumerable().OrderBy(Function(o) CInt(o.Item(field).ToString())).CopyToDataTable()
                                    Dim lstTemp1 = lstObj.AsEnumerable().OrderBy(Function(a) CInt(a.CLMLimit).ToString()).ToList()
                                    Dim chkFlag = lstTemp1.AsEnumerable().Any(Function(o) prcCurrentClaimCost <= Double.Parse(o.CLMLimit))
                                    objAprovUser = If(chkFlag, lstTemp1.AsEnumerable().Where(Function(o) prcCurrentClaimCost <= Double.Parse(o.CLMLimit)).First(), Nothing)
                                    If objAprovUser IsNot Nothing Then
                                        hdCLMemail.Value = objAprovUser.CLMemail.ToString().Trim()
                                        hdCLMuser.Value = objAprovUser.CLMuser.ToString().Trim()
                                        hdCLMLimit.Value = objAprovUser.CLMLimit.ToString().Trim()
                                        returnAuthUser = objAprovUser
                                        IsFullUser.Value = "0"
                                    Else
                                        Session("UpToLimit") = True
                                        Dim objFull = New ClaimObj500To1500User()

                                        Dim pp = fullUser.ToString().Split(",")

                                        objFull.CLMemail = fullUser.ToString().Split(",")(1)
                                        objFull.CLMuser = fullUser.ToString().Split(",")(0)
                                        objFull.CLMLimit = fullUser.ToString().Split(",")(2)
                                        returnAuthUser = objFull

                                        hdCLMemail.Value = objFull.CLMemail.ToString().Trim()
                                        hdCLMuser.Value = objFull.CLMuser.ToString().Trim()
                                        hdCLMLimit.Value = objFull.CLMLimit.ToString().Trim()
                                    End If
                                End If
                            End If

                            Session("LstObj500to1500") = lstObj
                            Session("Obj500to1500") = returnAuthUser

                            result = True
                        Else
                            strMessage = "There is an error getting data for Person In Charge for Approbe Claims between 500 and 1500"
                            Return result
                        End If
                    Else
                        strMessage = "There is an error getting data for Person In Charge for Approbe Claims between 500 and 1500"
                        Return result
                    End If
                Else
                    strMessage = "There is an error getting data for Person In Charge for Approbe Claims between 500 and 1500"
                    Return result
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function GetGeneralValues(wrnNo As String, ByRef strMessage As String, ByRef Optional totalClaimValue As Double = 0, ByRef Optional totalLimit As Double = 0, ByRef Optional totalConsDamage As Double = 0,
                                                   ByRef Optional resultFreight As Double = 0, ByRef Optional resultParts As Double = 0, ByRef Optional resultAmoApproved As Double = 0, Optional flagProc As Boolean = False) As Integer
        Dim result As Boolean = False
        Dim intValidation As Integer = 1
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                resultParts = 0
                resultFreight = 0
                resultAmoApproved = 0
                Dim resultLimit As Double = 0
                Dim resultConsDamage As Double = 0
                'Dim pCred As Double = 0

                totalLimit = If(Double.TryParse(hdSwLimitAmt.Value, resultLimit), resultLimit, 0) 'limited configured for the current logged user
                totalConsDamage = If(Double.TryParse(txtConsDamageTotal.Text.Trim(), resultConsDamage), resultConsDamage, 0)

                'If String.IsNullOrEmpty(txtPartCred.Text.Trim()) Then
                totalClaimValue = If(Double.TryParse(txtParts.Text.Trim(), resultParts), resultParts, 0) +
                                        If(Double.TryParse(txtFreight.Text.Trim(), resultFreight), resultFreight, 0) +
                                         If(Double.TryParse(txtAmountApproved.Text.Trim(), resultAmoApproved), resultAmoApproved, 0) +
                                          If(Double.TryParse(txtConsDamageTotal.Text.Trim(), resultConsDamage), resultConsDamage, 0)
                'Else
                'totalClaimValue = If(Double.TryParse(txtPartCred.Text.Trim(), pCred), pCred, 0)
                ' End If


                Dim claimValues = New ClaimTotalValues()

                claimValues.WrnNo = hdSeq.Value
                claimValues.ReturnNo = txtClaimNoData.Text
                claimValues.UserLimit = hdSwLimitAmt.Value
                claimValues.UnitCostValue = txtParts.Text

                claimValues.TotalConsDamage = If(String.IsNullOrEmpty(txtConsDamageTotal.Text.Trim()), "0", txtConsDamageTotal.Text.Trim())
                claimValues.CDLaborValue = If(String.IsNullOrEmpty(txtCDLabor.Text.Trim()), "0", txtCDLabor.Text.Trim())
                claimValues.CDFreightValue = If(String.IsNullOrEmpty(txtCDFreight.Text.Trim()), "0", txtCDFreight.Text.Trim())
                claimValues.CDMiscValue = If(String.IsNullOrEmpty(txtCDMisc.Text.Trim()), "0", txtCDMisc.Text.Trim())
                claimValues.CDPartValue = If(String.IsNullOrEmpty(txtCDPart.Text.Trim()), "0", txtCDPart.Text.Trim())
                claimValues.AmountApproved = If(String.IsNullOrEmpty(txtAmountApproved.Text.Trim()), "0", txtAmountApproved.Text.Trim())
                claimValues.ClaimGrandTotal = totalClaimValue.ToString()
                'claimValues.ClaimGrandTotal = ""

                Session("ClaimGeneralValues") = claimValues

                If Not flagProc Then

                    If chkApproved.Checked And chkApproved.Enabled = True Then
                        If totalClaimValue <= totalLimit Then
                            'If totalConsDamage = 0 Then
                            BuildDates()
                            'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                            'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                            chkinitial.Value = "L"
                            Dim rsUpdIStat = objBL.UpdateWIntFinalStat(wrnNo, "I", chkinitial.Value)
                            If rsUpdIStat > 0 Then
                                intValidation += 1
                            Else
                                'error log
                                strMessage = "There is an error updating the Warranty Claim Status for Warning Number: " + wrnNo + "."
                                Return result
                            End If

                            txtTotValue.Text = totalClaimValue.ToString()
                            txtTotValue.Enabled = False

                            chkApproved.Enabled = False
                            chkDeclined.Enabled = False
                            'Else
                            '    strMessage = "The Consequental Damage value is different to 0."
                            '    Return result
                            'End If
                            'Else
                            '    strMessage = "The Claim Amount must be less or the same to the configured limit for the current user. Total Amount: " + totalClaimValue.ToString() +
                            '        ". Configured Limit: " + totalLimit.ToString() + "."
                            '    Return result
                        End If
                    End If

                End If

            End Using

            If intValidation = 2 Then
                result = True
            ElseIf intValidation = 1 And flagProc Then
                result = True
            End If

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function GetUserAndLimitForCMGeneration(ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        Dim intValidation As Integer = 1
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                'CNTRLL parm 186 status (if Approved)
                'Get User and Limit to generate credit memo
                Dim dsUserCM = New DataSet()
                Dim user = Session("userid").ToString().ToUpper()
                Dim rsUserCM = objBL.GetUserToGenCM(user, dsUserCM)
                If rsUserCM > 0 Then
                    If dsUserCM IsNot Nothing Then
                        If dsUserCM.Tables(0).Rows.Count > 0 Then
                            hdUsrLimitAmt.Value = dsUserCM.Tables(0).Rows(0).Item("USRLIMIT").ToString().Trim()
                            hdSwLimitAmt.Value = dsUserCM.Tables(0).Rows(0).Item("CMLIMIT").ToString().Trim()

                            'limit for a specific user
                            Dim objLogUserLimits = New ClaimObjUserLoggedLimit()
                            objLogUserLimits.Userid = hdUsrLimitAmt.Value
                            objLogUserLimits.ClaimLimitAmount = hdSwLimitAmt.Value
                            Session("ObjCurUserLmt") = objLogUserLimits

                            intValidation += 1
                        Else
                            strMessage = "There is not data for Limits for current user."
                            Return result
                        End If
                    Else
                        strMessage = "There is not data for Limits for current user."
                        Return result
                    End If
                Else
                    strMessage = "There is not configured Limit Information for current user."
                    Return result
                End If

#Region "Not in used here"

                'resultParts = 0
                'resultFreight = 0
                'resultAmoApproved = 0
                'Dim resultLimit As Double = 0
                'Dim resultConsDamage As Double = 0

                'totalLimit = If(Double.TryParse(hdSwLimitAmt.Value, resultLimit), resultLimit, 0)
                'totalConsDamage = If(Double.TryParse(txtConsDamageTotal.Text.Trim(), resultConsDamage), resultConsDamage, 0)
                'totalClaimValue = If(Double.TryParse(txtParts.Text.Trim(), resultParts), resultParts, 0) +
                '                        If(Double.TryParse(txtFreight.Text.Trim(), resultFreight), resultFreight, 0) +
                '                         If(Double.TryParse(txtAmountApproved.Text.Trim(), resultAmoApproved), resultAmoApproved, 0)

                'If chkApproved.Checked And chkApproved.Enabled = True Then
                '    If totalClaimValue <= totalLimit Then
                '        If totalConsDamage = 0 Then
                '            BuildDates()
                '            'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                '            'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                '            chkinitial.Value = "L"
                '            Dim rsUpdIStat = objBL.UpdateWIntFinalStat(wrnNo, "I", chkinitial.Value)
                '            If rsUpdIStat > 0 Then
                '                intValidation += 1
                '            Else
                '                'error log
                '                strMessage = "There is an error updating the Warranty Claim Status for Warning Number: " + wrnNo + "."
                '                Return result
                '            End If

                '            txtTotalAmount.Text = totalClaimValue.ToString()
                '            txtTotalAmount.Enabled = False

                '            chkApproved.Enabled = False
                '            chkDeclined.Enabled = False
                '        Else
                '            strMessage = "The Consequental Damage value is different to 0."
                '            Return result
                '        End If
                '    Else
                '        strMessage = "The Claim Amount must be less or the same to the configured limit for the current user. Total Amount: " + totalClaimValue.ToString() +
                '            ". Configured Limit: " + totalLimit.ToString() + "."
                '        Return result
                '    End If
                'End If

#End Region


            End Using

            If intValidation = 2 Then
                result = True
            End If

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function ClaimApprovedCompletedUnder500(wrnNo As String, totalClaimValue As Double, totalLimit As Double, totalConsDamage As Double, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Dim strMessageOut As String = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim optControl = DirectCast(Session("currentCtr"), String)
                If Not String.IsNullOrEmpty(optControl) Then
                    If ((LCase(optControl)).Contains("btnsavetab")) Then
                        AfterReopenProc()
                    Else
                        If chkApproved.Checked Then

                            If chkAcknowledgeEmail.Checked Then

                                If totalClaimValue <= totalLimit Then

                                    If totalClaimValue <= 500 Then

                                        chkApproved.Enabled = False
                                        chkDeclined.Enabled = False

                                        chkinitial.Value = "K"
                                        BuildDates()
                                        'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                                        'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss
                                        Dim rsIns = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                                        If rsIns > 0 Then
                                            chkClaimCompleted.Enabled = False
                                            txtClaimCompleted.Enabled = False
                                            txtClaimCompletedDate.Enabled = False
                                            txtDateEntered.Text = datenow
                                            txtClaimCompleted.Text = Session("userid").ToString().ToUpper()

                                            Dim dsUpdStat = New DataSet()
                                            Dim rsUpdStat = objBL.getDataByInternalStsLet(chkinitial.Value, dsUpdStat)
                                            If rsUpdStat > 0 Then
                                                If dsUpdStat IsNot Nothing Then
                                                    If dsUpdStat.Tables(0).Rows.Count > 0 Then
                                                        txtActualStatus.Text = UCase(Left(dsUpdStat.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1)) +
                                                                                LCase(Mid(dsUpdStat.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 2))
                                                        txtActualStatus.Text.ToUpper()
                                                        txtActualStatus.Enabled = False

                                                        Dim rsUpdWHeader1 = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                                                        If rsUpdWHeader1 > 0 Then

                                                            'Generate Credit Memo pending
                                                            Dim appb = cmdApproveds(strMessageOut)
                                                            If appb Then
                                                                Dim dec = cmdCloseClaim(strMessageOut)
                                                                If dec Then
                                                                    chkApproved.Enabled = False
                                                                    chkDeclined.Enabled = False

                                                                    result = True
                                                                Else
                                                                    strMessage = "There is an error in the Close Claim process for the Claim Number:" + wrnNo + "." + strMessageOut
                                                                    Return result
                                                                End If
                                                            Else
                                                                strMessage = "There is an error in the Approval Process for the Claim Number:" + wrnNo + "." + strMessageOut
                                                                Return result
                                                            End If
                                                        Else
                                                            'error log
                                                            strMessage = "There is an error updating the Warranty Claim Status for Warning Number: " + wrnNo + "."
                                                            Return result
                                                        End If
                                                    Else
                                                        strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                                        Return result
                                                    End If
                                                Else
                                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                                    Return result
                                                End If
                                            Else
                                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                                Return result
                                            End If
                                        Else
                                            'error log
                                            If String.IsNullOrEmpty(txtClaimCompleted.Text.Trim()) Then
                                                strMessage = "There is an error inserting the internal status for the warning no:" + wrnNo + "."
                                                Return result
                                            End If
                                        End If
                                        'Else
                                        '    strMessage = "In order to approve this Claim you must ask for authorization."
                                        '    Return result

                                    End If

                                    'Else
                                    '    strMessage = "The Claim Amount must be less or the same to the configured limit for the current user. Total Amount: " + totalClaimValue.ToString() +
                                    '        ". Configured Limit: " + totalLimit.ToString() + "."
                                    '    Return result
                                End If

                            Else
                                strMessage = "The Acknowledgement Email has to be sent before to approve the claim."
                                Return result
                            End If
                        Else
                            strMessage = "In order to close the Claim the Claim Approved checkbox must be checked!"
                            Return result
                        End If
                    End If
                Else
                    strMessage = "Please refresh the page."
                    Return result
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    'Send Email to person in charge to approved if Claim > $500
    Public Function SendEmailToPIChAppClaimOver500(wrnNo As String, totalClaimValue As Double, totalLimit As Double, ByRef dbLimit As Double, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim refLimit As Double = 0
                dbLimit = If(Double.TryParse(hdCLMLimit.Value, refLimit), refLimit, 0) ' limit for manager
                If dbLimit > 0 Or DirectCast(Session("UpToLimit"), Boolean) Then
                    If chkApproved.Checked Then
                        If totalClaimValue > totalLimit Or hdUsrLimitAmt.Value.ToUpper().Equals(hdCLMuser.Value.Trim().ToUpper()) Then   ' el valor del claim es mayor que el limite del usuario logueado
                            'If totalClaimValue <= dbLimit Then
                            BuildDates()
                            'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                            'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss
                            chkinitial.Value = "K"

                            'Dim dsCheck As DataSet = New DataSet()
                            'Dim check = objBL.GetIfIntStatusExist(wrnNo, chkinitial.Value, dsCheck)
                            'If check = 0 Then
                            Dim rsIns = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                            If rsIns > 0 Then
                                chkApproved.Enabled = False
                                chkDeclined.Enabled = False
                                chkClaimCompleted.Enabled = False
                                txtClaimCompletedDate.Text = datenow
                                txtClaimCompleted.Text = Session("userid").ToString().ToUpper()
                                txtClaimCompleted.Enabled = False
                                txtClaimCompletedDate.Enabled = False

                                chkinitial.Value = "L"
                                BuildDates()
                                'datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                                'hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                                Dim rsFinalUpd = objBL.UpdateWIntFinalStat(wrnNo, "I", chkinitial.Value)
                                If rsFinalUpd > 0 Then

                                    Dim dsOverEmail = New DataSet()
                                    Dim rsOverEmail = objBL.getOverEmailMsg(wrnNo, "B", dsOverEmail)
                                    If rsOverEmail > 0 Then
                                        If dsOverEmail IsNot Nothing Then
                                            If dsOverEmail.Tables(0).Rows.Count > 0 Then
                                                Dim flagOverEmail = dsOverEmail.Tables(0).Rows(0).Item("INOVREMLST").ToString().Trim()
                                                If String.IsNullOrEmpty(flagOverEmail) Then

                                                    Dim objEmail = DirectCast(Session("emailObj"), ClaimEmailObj)
                                                    Dim messageOut As String = Nothing
                                                    If objEmail IsNot Nothing Then
                                                        'email for ask for auth over 500
                                                        Dim bresult As Boolean = False
                                                        If totalClaimValue <= dbLimit Then
                                                            bresult = PrepareEmail(objEmail, "0", messageOut)
                                                        Else
                                                            bresult = PrepareEmail(objEmail, "3", messageOut)
                                                        End If

                                                        If Not bresult Then
                                                            strMessage += messageOut
                                                        End If
                                                    End If
                                                    'send email

                                                    chkApproved.Enabled = False
                                                    chkDeclined.Enabled = False

                                                    Dim rsUpdOverEmail = objBL.UpdateWOverEmailStat(wrnNo, "B", "Y")
                                                    If rsUpdOverEmail > 0 Then
                                                        result = True
                                                    Else
                                                        'error log
                                                        strMessage = "There is an error updating the Warranty Claim Flag for email status for Warning Number: " + wrnNo + "."
                                                        Return result
                                                    End If
                                                Else
                                                    result = True
                                                End If
                                            Else
                                                strMessage = "There is an error getting the flag for email message for the Warning Number: " + wrnNo + "."
                                                Return result
                                            End If
                                        Else
                                            strMessage = "There is an error getting the flag for email message for the Warning Number: " + wrnNo + "."
                                            Return result
                                        End If
                                    Else
                                        strMessage = "There is an error getting the flag for email message for the Warning Number: " + wrnNo + "."
                                        Return result
                                    End If
                                Else
                                    'error log
                                    strMessage = "There is an error updating the Warranty Claim Internal Status for Warning Number: " + wrnNo + "."
                                    Return result
                                End If
                            Else
                                'error log
                                If String.IsNullOrEmpty(txtClaimCompleted.Text.Trim()) Then
                                    strMessage = "There is an error inserting the internal status for the warning no:" + wrnNo + "."
                                    Return result
                                End If
                            End If
                            'End If

                            'End If
                        Else
                            strMessage = "The Claim Amount must be more than the configured limit for the current user in order to send an email. Total Amount: " + totalClaimValue.ToString() +
                            ". Configured Limit: " + totalLimit.ToString() + ". The email to request authorization to approve the credit has been sent."
                            result = True
                            Return result
                        End If
                    End If
                Else
                    strMessage = "The limit value for MG is not valid. "
                    Return result
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function SaveAuthForOver500Sales(wrnNo As String, totalClaimValue As Double, resultFreight As Double, resultParts As Double,
                                            resultAmoApproved As Double, dbLimit As Double, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        Dim intValidation As Integer = 0
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim objClaim = DirectCast(Session("finalObject"), FinalClaimObj)

                If chkClaimAuth.Checked Then
                    'And chkClaimAuth.Enabled = True
                    If chkApproved.Checked Then
                        If totalClaimValue > 500 Then
                            If totalClaimValue <= dbLimit Then
                                If hdUsrLimitAmt.Value = hdCLMuser.Value.Trim() Then
                                    BuildDates()
                                    'Dim strdatenow = Now().Date().ToString() 'force  yyyy-mm-dd
                                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss
                                    'Dim datenow = Now().Date()

                                    If Not objClaim.Over500Auth Then

                                        Dim rfFullUpd = objBL.UpdateWOverSales500(wrnNo, "B", "Y", Session("userid").ToString().ToUpper(), resultFreight, resultParts, resultAmoApproved, datenow)
                                        If rfFullUpd > 0 Then
                                            intValidation += 1

                                            txtClaimAuth.Text = Session("userid").ToString().ToUpper()
                                            txtClaimAuthDate.Text = datenow
                                            chkClaimAuth.Enabled = False
                                            txtClaimAuth.Enabled = False
                                            txtClaimAuthDate.Enabled = False

                                            txtTotValue.Text = totalClaimValue.ToString()
                                            txtTotValue.Enabled = False
                                            txtConsDamageTotal.Enabled = False
                                            txtCDPart.Enabled = False
                                            txtCDLabor.Enabled = False
                                            txtCDFreight.Enabled = False
                                            txtCDMisc.Enabled = False

                                            Dim objEmail = DirectCast(Session("emailObj"), ClaimEmailObj)
                                            Dim messageOut As String = Nothing
                                            If objEmail IsNot Nothing Then
                                                'email for acknowledge email
                                                Dim bresult = PrepareEmail(objEmail, "1", messageOut, True)
                                                If Not bresult Then
                                                    strMessage += messageOut
                                                End If
                                            End If

                                            chkApproved.Enabled = False
                                            chkDeclined.Enabled = False
                                            txtAmountApproved.Enabled = False
                                            txtFreight.Enabled = False
                                            txtParts.Enabled = False

                                            Dim rsOverEmail = objBL.UpdateWOverEmailStat(wrnNo, "B", "Y")
                                            If rsOverEmail > 0 Then
                                                intValidation += 1
                                            Else
                                                'error log
                                                strMessage = "There is an error updating the Warranty Claim Over Email Status for Warning Number: " + wrnNo + "."
                                                Return result
                                            End If
                                        Else
                                            'error log
                                            strMessage = "There is an error updating the Warranty Claim Auth Over 500 for Warning Number: " + wrnNo + "."
                                            Return result
                                        End If

                                    End If
                                Else
                                    strMessage = "The user: " + Session("userid").ToString().ToUpper() + " is not allowed to do this procedure."
                                    Return result
                                End If
                                'Else
                                'result = True
                                'strMessage = "The limit assign for the user: " + Session("userid").ToString().ToUpper() + " is less than the Claim amount."
                                'Return result
                            End If
                        Else
                            'result = True
                            strMessage = "If the Claim total cost is less than $500, it is not necessary to do this procedure."
                            Return result
                        End If
                    Else
                        strMessage = "The Claim must be marked as approved in order to proceed with the authorization process for Claims over $500."
                        Return result
                    End If
                Else
                    'strMessage = "The checkbox to approve the authorization for Claims over $500 must be checked in order to proceed."
                    Return result
                End If

                If intValidation = 3 Then
                    Dim claimNo = txtClaimNoData.Text.Trim()
                    chkinitial.Value = "I"
                    Dim rsUpdate = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                    If rsUpdate > 0 Then
                        Dim rsExtUpdate = objBL.UpdateNWHeaderStatForce(claimNo, "2", "7", False)
                        If rsExtUpdate > 0 Then
                            result = True
                        End If
                    End If
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Private Function prepareDataCMValidation(ByRef customer As String, ByRef cm As Double) As Boolean
        Dim result As Boolean = False
        cm = 0
        customer = ""
        Try
            Dim cGeneral As ClaimObj = New ClaimObj()
            Dim cEmailObj = New ClaimEmailObj()
            cGeneral = DirectCast(Session("fullObj"), ClaimObj)
            cEmailObj = DirectCast(Session("emailObj"), ClaimEmailObj)

            customer = cGeneral.CustInfoObj.CustNo.ToString()
            'cm = cEmailObj.TotalApproved
            Dim parts = cGeneral.ClaimExtrasObj.TotalParts

            Dim totCM = If(String.IsNullOrEmpty(cEmailObj.TotalApproved), Double.Parse("0"),
                        If(String.IsNullOrEmpty(cGeneral.ClaimExtrasObj.FullConsDamValue.Trim().ToString()), Double.Parse(cEmailObj.TotalApproved), Double.Parse(parts)))
            Dim totParts = If(String.IsNullOrEmpty(parts), Double.Parse("0"), Double.Parse(parts))

            If totCM.Equals(totParts) Then
                result = True
                cm = totCM + 0.01
            Else
                Return result
            End If

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Private Function ClaimReadyToReopen(Optional ByRef revRej As Boolean = False) As Boolean
        Dim result As Boolean = False
        Dim result1 As Boolean = False
        Dim dsData As DataSet = New DataSet()
        revRej = False
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rsResult = objBL.GetWrnClaimsHeader(hdSeq.Value, dsData)
                If dsData IsNot Nothing Then
                    If dsData.Tables(0).Rows.Count > 0 Then
                        result = If(dsData.Tables(0).Rows(0).Item("CWSTAT").ToString().Trim().ToUpper().Equals("C"), True, False)
                        If Not result Then
                            result1 = If(dsData.Tables(0).Rows(0).Item("CWSTAT").ToString().Trim().ToUpper().Equals("R"), True, False)
                            If result1 Then
                                revRej = True
                            End If
                        Else
                            Return result
                        End If
                    End If
                End If
            End Using

            Return result1

            'version using CSMREH

            'Dim claimNo = txtClaimNoData.Text.Trim()
            'Dim flag1 = CheckIfClaimIsForReopen(claimNo)
            'Dim flag2 As Boolean = False
            'If flag1 Then
            'result = True
            'Dim customer As String = ""
            'Dim cm As Double = 0
            'Dim bResult = prepareDataCMValidation(customer, cm)
            'If bResult Then
            '    flag2 = CheckIfCMGeneretad(claimNo, customer, cm)
            '    If flag2 Then
            '        result = True
            '    Else
            '        Return result
            '    End If
            'Else
            '    Return result
            'End If
            'Else
            'Return result
            'End If
            'Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function ClaimOver500AndCMGenCloseClaim(wrnNo As String, totalClaimValue As Double, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        Dim intValidation As Integer = 0
        Dim methodMessage As String = Nothing
        Dim flag2 As Boolean = False
        Dim flag1 As Boolean = False
        strMessage = Nothing
        Dim intResult As Integer = 0
        Dim strUsers = ConfigurationManager.AppSettings("AuthUsersForPutCost")
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim optControl = DirectCast(Session("currentCtr"), String)
                If Not String.IsNullOrEmpty(optControl) Then
                    If ((LCase(optControl)).Contains("btnsavetab")) Then
                        'Return True
                        ' ask from the message
                        AfterReopenProc()
                    Else

                        'If totalClaimValue <= dbLimit Then

                        Dim bresult = DirectCast(Session("GoClose"), Boolean) ' credit memo generated

                        If bresult Then
                            If totalClaimValue > 500 Then
                                If chkApproved.Checked Then
                                    If True Then
                                        If chkAcknowledgeEmail.Checked Then
                                            If chkClaimAuth.Checked Then

                                                Dim claimNo = txtClaimNoData.Text.Trim()
                                                Dim AuthUsers = strUsers.Split(",").ToList()
                                                If AuthUsers.AsEnumerable().Any(Function(i) i.Trim().ToString().ToLower().Equals(Session("userid").ToString().Trim().ToLower())) Then

                                                    chkinitial.Value = "K"
                                                    BuildDates()
                                                    'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                                                    'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss
                                                    Dim rsIns = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                                                    If (rsIns > 0) Or (Not String.IsNullOrEmpty(txtClaimCompleted.Text.Trim())) Then
                                                        intValidation += 1

                                                        txtClaimCompleted.Text = Session("userid").ToString().ToUpper()
                                                        txtClaimCompletedDate.Text = datenow
                                                        chkClaimCompleted.Enabled = False
                                                        txtClaimCompleted.Enabled = False
                                                        txtClaimCompletedDate.Enabled = False

                                                        Dim dsGet = New DataSet()
                                                        Dim rsGet = objBL.getDataByInternalStsLet("K", dsGet)
                                                        If rsGet > 0 Then
                                                            If dsGet IsNot Nothing Then
                                                                If dsGet.Tables(0).Rows.Count > 0 Then
                                                                    txtActualStatus.Text = UCase(Left(dsGet.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 1) +
                                                                                                  LCase(Mid(dsGet.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim(), 2)))
                                                                    txtActualStatus.Text.ToUpper()
                                                                    txtActualStatus.Enabled = False

                                                                    Dim dec = cmdCloseClaim(strMessage)
                                                                    If dec Then
                                                                        intValidation += 1
                                                                    Else
                                                                        strMessage = "There is an error in the Close Claim Process for the Claim Number:" + claimNo + "."
                                                                        Return result
                                                                    End If
                                                                Else
                                                                    strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                                                    Return result
                                                                End If
                                                            Else
                                                                strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                                                Return result
                                                            End If
                                                        Else
                                                            strMessage = "There is an error getting the Internal Status for the Warning Number: " + wrnNo + "."
                                                            Return result
                                                        End If
                                                    Else
                                                        'error log
                                                        If String.IsNullOrEmpty(txtClaimCompleted.Text.Trim()) Then
                                                            strMessage = "There is an error inserting the internal status for the warning no:" + wrnNo + "."
                                                            Return result
                                                        End If
                                                    End If
                                                Else
                                                    strMessage = "The current user does not have the Authorization to Close the Claim. "
                                                    Return result
                                                End If

#Region "Not in Use now"

                                                'old way
                                                'Dim claimNo = txtClaimNoData.Text.Trim()
                                                'flag1 = CheckIfClaimIsApproved(claimNo)
                                                'If flag1 Then
                                                '    Dim customer As String = ""
                                                '    Dim cm As Double = 0
                                                '    Dim bResult = prepareDataCMValidation(customer, cm)
                                                '    If bResult Then
                                                '        flag2 = CheckIfCMGeneretad(claimNo, customer, cm)
                                                '    End If
                                                'Else
                                                '    intResult += 1
                                                '    strMessage = "The Claim can not be closed because the approval has not been made yet."
                                                'End If

                                                'If flag2 And intResult.Equals(0) Then
                                                '    Dim strUsers = ConfigurationManager.AppSettings("AuthUsersForPutCost")
                                                '    Dim currentUser = UCase(Session("userid").ToString().Trim().ToUpper())
                                                '    Dim lstUsers = If(Not String.IsNullOrEmpty(strUsers), strUsers.Split(","), Nothing)
                                                '    Dim myitem = lstUsers.AsEnumerable().Where(Function(value) UCase(value.ToString().Trim()).Contains(currentUser))
                                                '    If myitem.Count = 1 Then
                                                '        chkinitial.Value = "K"
                                                '        BuildDates()
                                                '        'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                                                '        'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss
                                                '        Dim rsIns = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                                                '    Else
                                                '    End If
                                                'Else
                                                '    Dim curUser = LCase(Session("userid").ToString().Trim())
                                                '    Dim lsMngusers = DirectCast(Session("LstObj500to1500"), List(Of ClaimObj500To1500User))
                                                '    Dim exists = lsMngusers.AsEnumerable().Any(Function(o) LCase(o.CLMuser().Trim()).Equals(curUser))
                                                '    If Not exists Then
                                                '        intResult += 1
                                                '        strMessage = "The Claim can not be closed because the authorization has not been made yet."
                                                '    End If
                                                '    'Return result
                                                'End If

#End Region

                                            Else
                                                If IsFullUser.Value.Trim().Equals("1") Then
                                                    strMessage = "The checkbox to request for the authorization approval for this Claim over $500 as Total Cost must be checked in order to proceed."
                                                    Return result
                                                Else
                                                    intResult = 2
                                                End If
                                            End If
                                        Else
                                            strMessage = "Before to close the Claim you must send an Acknowloedge Email to the client. Please update this status in order to proceed."
                                            Return result
                                        End If
                                    Else
                                        strMessage = "The checkbox to mark the Claim as completed must be checked in order to proceed."
                                        Return result
                                    End If
                                Else
                                    strMessage = "The checkbox for the Claim approval must be checked in order to proceed."
                                    Return result
                                End If
                                'Else
                                '    If chkClaimAuth.Checked Then
                                '        strMessage = "The Total Claim value is less to $500. You do not need to request for authorization approval. Please uncheck the Request Approval Over $500."
                                '    End If
                                '    Return result
                            End If
                        Else
                            strMessage = "The Credit Memo is not approved yet."
                            Return result
                        End If
                        'Else

                        'End If
                    End If

                    Dim dbLimit As Double = 0
                    Dim bLimit = If(Not String.IsNullOrEmpty(hdCLMLimit.Value), Double.TryParse(hdCLMLimit.Value, dbLimit), False)

                    If intResult.Equals(2) Or totalClaimValue >= dbLimit Then
                        Dim sumRs As Integer = 0

                        'chkinitial.Value = "Y"

                        'updating CLMWRN
                        'not in use until select a status for this alternative
                        'Dim rsLastUpd = objBL.UpdateWHeaderStatSingle(wrnNo, chkinitial.Value)
                        'If rsLastUpd <= 0 Then
                        '    sumRs += 1
                        'End If

                        'updating CLMINTSTS
                        'not in use until select a status for this alternative
                        'BuildDates()
                        'Dim dsInt As DataSet = New DataSet()
                        'Dim isPresentStatus = objBL.GetIfIntStatusExist(wrnNo, chkinitial.Value, dsInt)
                        'If isPresentStatus = 0 Then
                        '    Dim rsOkQuality = objBL.InsertInternalStatus(wrnNo, chkinitial.Value, Session("userid").ToString().ToUpper(), datenow, hournow)
                        '    If rsOkQuality <= 0 Then
                        '        sumRs += 1
                        '    End If
                        'End If

                        'save comment
                        'not in use until select a status for this alternative
                        'Dim checkComm = saveComm("I : IN PROCESS")

                        If sumRs >= 1 Then
                            intResult += 1
                        End If

                    End If

                    'If intResult.Equals(3) Then
                    '    strMessage = "The Update Proccess for warranty claim status could not be completed. Otherwise you can continue with the proccess in order to close the claim."
                    'End If

                    If intValidation = 2 Then
                        result = If(String.IsNullOrEmpty(strMessage), True, False)
                        methodMessage = strMessage
                        SendMessage(methodMessage, messageType.warning)
                    End If
                Else
                    strMessage = "Please refresh the page."
                    Return result
                End If

            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function Param186StatusIfDenied(code As String, status As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        Dim intValidation As Integer = 0
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim optControl = DirectCast(Session("currentCtr"), String)
                If Not String.IsNullOrEmpty(optControl) Then
                    If ((LCase(optControl)).Contains("btnsavetab")) Then
                        AfterReopenProc()
                        intValidation = 2
                    Else
                        If chkDeclined.Checked And chkDeclined.Enabled = True Then
                            BuildDates()
                            'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                            'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss
                            chkinitial.Value = "M"

                            Dim rsIns = objBL.UpdateWIntFinalStat(code, status, chkinitial.Value)
                            If rsIns > 0 Then
                                intValidation += 1

                                Dim claimNo = txtClaimNoData.Text.Trim()
                                Dim rev = cmdRejects(strMessage)
                                If rev Then
                                    intValidation += 1

                                    chkDeclined.Enabled = False
                                    chkApproved.Enabled = False
                                Else
                                    strMessage = "There is an error in the Decline Claim Process for the Claim Number:" + claimNo + "."
                                    Return result
                                End If

                            Else
                                strMessage = "There is an error updating the W Header status for the warning number: " + code + "."
                                Return result
                            End If

                        Else
                            'result = True
                        End If
                    End If
                Else
                    strMessage = "Please refresh the page."
                    Return result
                End If

            End Using

            If intValidation = 2 Then
                result = True
            End If

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function PrepareDataTofullProcess(code As String, ByRef strMessage As String) As Boolean
        Dim result As Boolean = False
        strMessage = Nothing
        Try
            Dim dsGet = New DataSet()
            Dim rsGet As Integer = 0

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                rsGet = objBL.getNWrnClaimsHeader(code, dsGet)
                If rsGet > 0 Then
                    If dsGet IsNot Nothing Then
                        If dsGet.Tables(0).Rows.Count > 0 Then
                            result = True
                        Else
                            strMessage = "There is an error getting data for the Claim Number: " + code + "."
                            Return result
                        End If
                    Else
                        strMessage = "There is an error getting data for the Claim Number: " + code + "."
                        Return result
                    End If
                Else
                    strMessage = "There is an error getting data for the Claim Number: " + code + "."
                    Return result
                End If
            End Using

            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function


#End Region

#End Region

#End Region

#Region "Check input validation for claim under $500"

    Public Sub CheckUnder500ValidationInput(totalClaimValue As Double, totalLimit As Double, ByRef strMessageOut As String)
        Dim validationResult As Boolean = False
        Dim strMessage As String = Nothing
        Try

            If ddlDiagnoseData.SelectedIndex <> -1 And Not String.IsNullOrEmpty(txtDiagnoseData.Text) Then

                If chkAcknowledgeEmail.Checked Then

                    If chkApproved.Checked Then

                        If totalClaimValue <= totalLimit Then



                        Else
                            validationResult = True
                            strMessage = "The current user does not have the necessary limits configured to continue the process."
                            Exit Sub
                        End If

                    Else
                        validationResult = True
                        strMessage = "The Claim must be check as Approved in order to procced."
                        Exit Sub
                    End If

                Else
                    validationResult = True
                    strMessage = "The Acknoledgement Email must be sent in order to Procced."
                    Exit Sub
                End If

            Else
                validationResult = True
                strMessage = "The diagnose for this Claim must be selected in order to procced."
                Exit Sub
            End If

            strMessageOut = strMessage

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

#End Region

#Region "Work with Images"

    Public Sub LoadImagesCTP(Optional images As List(Of String) = Nothing)
        Try
            'Dim filesinDir As String() = Directory.GetFiles(Server.MapPath("~/Images/ToProcess/"))
            'Dim images As List(Of String) = New List(Of String)(filesinDir.Count())

            'For Each item As String In filesinDir
            '    images.Add(String.Format("~/Images/ToProcess/{0}", System.IO.Path.GetFileName(item)))
            '    'images.Add("~/Images/back1.png")
            'Next
            'pepe

            If DataListCTP.Items.Count = 0 Then
                If Session("DataListCTP") IsNot Nothing Then
                    Dim lstImg = DirectCast(Session("DataListCTP"), List(Of String))
                    If lstImg.Count > 0 Then

                        Dim lstNew As List(Of String) = New List(Of String)()

                        For Each lst As String In lstImg
                            lstNew.Add(lst.Split(",")(0).ToString().Trim())
                        Next

                        DataListCTP.DataSource = lstNew
                        DataListCTP.DataBind()
                    End If
                End If
            Else
                DataListCTP.DataSource = images
                DataListCTP.DataBind()
            End If

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub LoadImagesOEM(Optional images As List(Of String) = Nothing)
        Try
            'Dim filesinDir As String() = Directory.GetFiles(Server.MapPath("~/Images/ToProcess/"))
            'Dim images As List(Of String) = New List(Of String)(filesinDir.Count())

            'For Each item As String In filesinDir
            '    images.Add(String.Format("~/Images/ToProcess/{0}", System.IO.Path.GetFileName(item)))
            '    'images.Add("~/Images/back1.png")
            'Next
            'pepe

            If DataListOEM.Items.Count = 0 Then
                If Session("DataListOEM") IsNot Nothing Then
                    Dim lstImg = DirectCast(Session("DataListOEM"), List(Of String))
                    If lstImg.Count > 0 Then

                        Dim lstNew As List(Of String) = New List(Of String)()

                        For Each lst As String In lstImg
                            lstNew.Add(lst.Split(",")(0).ToString().Trim())
                        Next

                        DataListOEM.DataSource = lstNew
                        DataListOEM.DataBind()
                    End If
                End If
            Else
                DataListOEM.DataSource = images
                DataListOEM.DataBind()
            End If

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub LoadImages(Optional images As List(Of String) = Nothing)
        Try
            'Dim filesinDir As String() = Directory.GetFiles(Server.MapPath("~/Images/ToProcess/"))
            'Dim images As List(Of String) = New List(Of String)(filesinDir.Count())

            'For Each item As String In filesinDir
            '    images.Add(String.Format("~/Images/ToProcess/{0}", System.IO.Path.GetFileName(item)))
            '    'images.Add("~/Images/back1.png")
            'Next
            'pepe
            Dim lstNew As List(Of String) = New List(Of String)()

            If datViewer.Items.Count = 0 Then
                If Session("DatViewer") IsNot Nothing Then
                    Dim lstImg = DirectCast(Session("DatViewer"), List(Of String))
                    If lstImg.Count > 0 Then

                        For Each lst As String In lstImg
                            lstNew.Add(lst.Split(",")(0).ToString().Trim())
                        Next

                        datViewer.DataSource = lstNew
                        datViewer.DataBind()
                    End If
                End If
            Else
                datViewer.DataSource = images
                datViewer.DataBind()
            End If

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub FixImagesOEM(partNo As String)
        Dim filepath As String = Nothing
        Dim dctFI As Dictionary(Of FileInfo, String) = New Dictionary(Of FileInfo, String)()
        Dim lstImg As List(Of String) = New List(Of String)()
        Dim PathConf As String = ConfigurationManager.AppSettings("vdOEMPartsPath").ToString()
        Try
            Dim result = GetFilesFromEXtPathByClaimNoOEM(partNo, filepath)
            If result Then
                If Not String.IsNullOrEmpty(filepath) Then
                    GetImagesFromPathOEM(filepath, dctFI)
                    If dctFI IsNot Nothing Then
                        prepareListFromVDOEM(dctFI, lstImg)
                        If lstImg IsNot Nothing Then
                            Session("DataListOEM") = lstImg
                            LoadImagesOEM(lstImg)
                        End If
                    End If
                End If
            Else

                'Dim lastPos As Integer = name.LastIndexOf("\")
                'Dim NoFilePath = name.Substring(0, lastPos - 1)
                Dim noImg As String = "pic_not_av.jpg"
                Dim newPath = PathConf + noImg
                Dim di = New IO.DirectoryInfo(PathConf)
                If di.Exists Then

                    For Each fio As FileInfo In di.GetFiles()
                        Dim name = fio.Name
                        If name.ToLower().Contains(noImg.ToLower()) Then
                            dctFI.Add(fio, "Out")
                            Exit For
                        End If
                    Next

                    If dctFI IsNot Nothing Then
                        prepareListFromVDOEM(dctFI, lstImg)
                        If lstImg IsNot Nothing Then
                            Session("DataListOEM") = lstImg
                            LoadImagesOEM(lstImg)
                        End If
                    End If

                End If

            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub FixImagesCTP(partNo As String)
        Dim filepath As String = Nothing
        Dim dctFI As Dictionary(Of FileInfo, String) = New Dictionary(Of FileInfo, String)()
        Dim lstImg As List(Of String) = New List(Of String)()
        Try
            Dim result = GetFilesFromEXtPathByClaimNoCTP(partNo, filepath)
            If result Then
                If Not String.IsNullOrEmpty(filepath) Then
                    GetImagesFromPathCTP(filepath, partNo, dctFI)
                    If dctFI IsNot Nothing Then
                        prepareListFromVDCTP(dctFI, lstImg)
                        If lstImg IsNot Nothing Then
                            Session("DataListCTP") = lstImg
                            LoadImagesCTP(lstImg)
                        End If
                    End If

                End If
            Else

            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub FixImages(claimNo As String)
        Dim filepath As String = Nothing
        Dim dctFI As Dictionary(Of FileInfo, String) = New Dictionary(Of FileInfo, String)()
        Dim lstImg As List(Of String) = New List(Of String)()
        Try
            Dim result = GetFilesFromEXtPathByClaimNo(claimNo, filepath)
            If result Then
                If Not String.IsNullOrEmpty(filepath) Then
                    GetImagesFromPath(filepath, dctFI)
                    If dctFI IsNot Nothing Then
                        prepareListFromVD(dctFI, lstImg)
                        If lstImg IsNot Nothing Then
                            Session("DatViewer") = lstImg
                            LoadImages(lstImg)
                        End If
                    End If

                End If
            Else

            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function GetAllFilesForView(claimNo As String) As List(Of String)
        Dim filepath As String = Nothing
        Dim dctFI As Dictionary(Of FileInfo, String) = New Dictionary(Of FileInfo, String)()
        Dim lstImg As List(Of String) = New List(Of String)()
        Try
            Dim result = GetFilesFromEXtPathByClaimNo(claimNo, filepath)
            If result Then
                If Not String.IsNullOrEmpty(filepath) Then
                    GetFilesFromPath(filepath, dctFI)
                    If dctFI IsNot Nothing Then
                        prepareListFromVD(dctFI, lstImg, True)
                        If lstImg IsNot Nothing Then
                            Session("SeeFilesDct") = lstImg
                            'LoadImages(lstImg)
                        End If
                    End If

                End If
            Else

            End If
            Return lstImg
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GetFilesFromEXtPathByClaimNoCTP(partNo As String, ByRef filePath As String) As Boolean
        Dim flag As Boolean = False
        filePath = Nothing
        Dim PathConf As String = ConfigurationManager.AppSettings("vdCTPPartsPath").ToString()
        Try
            Dim path = PathConf
            Dim di = New IO.DirectoryInfo(path)
            If di.Exists Then
                flag = True
                filePath = path
                Return flag
            Else
                Return flag
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return flag
        End Try
    End Function

    Public Function GetFilesFromEXtPathByClaimNoOEM(partNo As String, ByRef filePath As String) As Boolean
        Dim flag As Boolean = False
        filePath = Nothing
        Dim PathConf As String = ConfigurationManager.AppSettings("vdOEMPartsPath").ToString()
        Try
            Dim path = PathConf + partNo + "\"
            Dim di = New IO.DirectoryInfo(path)
            If di.Exists Then
                flag = True
                filePath = path
                Return flag
            Else
                Return flag
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return flag
        End Try
    End Function

    Public Function GetFilesFromEXtPathByClaimNo(claimNo As String, ByRef filePath As String) As Boolean
        Dim flag As Boolean = False
        filePath = Nothing
        Dim PathConf As String = ConfigurationManager.AppSettings("vdWarningImgPath").ToString()
        Try
            Dim path = PathConf + claimNo + "\"
            Dim di = New IO.DirectoryInfo(path)
            If di.Exists Then
                flag = True
                filePath = path
                Return flag
            Else
                Return flag
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return flag
        End Try
    End Function

    Public Sub GetFilesFromPath(filePath As String, ByRef dctFi As Dictionary(Of FileInfo, String))
        Dim lstFiles As List(Of FileInfo) = New List(Of FileInfo)()
        Dim dctFiles As Dictionary(Of FileInfo, String) = New Dictionary(Of FileInfo, String)()
        Try

            Dim newPath = filePath + "External\"
            Dim diImgOuter = New IO.DirectoryInfo(filePath)
            Dim diImgInner = New IO.DirectoryInfo(newPath)

            If diImgInner.Exists Then
                'Dim images = diImg.GetFiles().Where(Function(e) e.Extension = "jpg" Or e.Extension = "jpeg" Or e.Extension = "png").Select(Function(f) New FileInfo(f.Name))
                For Each fiii As FileInfo In diImgInner.GetFiles()
                    Dim name = fiii.Name
                    Dim extension = fiii.Extension
                    If Not extension.Trim().ToLower().Equals(".db") Then
                        dctFiles.Add(fiii, "Ext")
                    End If
                Next

            End If

            If diImgOuter.Exists Then
                'no external folder. Check for images
                For Each fio As FileInfo In diImgOuter.GetFiles()
                    Dim name = fio.Name
                    'Dim fileDate = fio.LastAccessTime.ToString()
                    Dim extension = fio.Extension
                    If Not extension.Trim().ToLower().Equals(".db") Then
                        dctFiles.Add(fio, "Out")
                    End If
                Next

            End If

            dctFi = dctFiles
            Session("SeeFilesDct") = dctFi

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            dctFi = Nothing
        End Try
    End Sub

    Public Sub GetImagesFromPathCTP(filePath As String, partNo As String, ByRef dctImages As Dictionary(Of FileInfo, String))
        Dim lstFiles As List(Of FileInfo) = New List(Of FileInfo)()
        Dim dctFiles As Dictionary(Of FileInfo, String) = New Dictionary(Of FileInfo, String)()
        Try

            Dim diImgOuter = New IO.DirectoryInfo(filePath)

            If diImgOuter.Exists Then
                'no external folder. Check for images
                For Each fio As FileInfo In diImgOuter.GetFiles()
                    Dim name = fio.Name
                    Dim extension = fio.Extension
                    If name.Split(".")(0).ToUpper().Equals(partNo.ToUpper()) Then
                        If extension.Trim().ToLower().Equals(".jpg") Or extension.Trim().ToLower().Equals(".jpeg") Or extension.Trim().ToLower().Equals(".png") Then
                            dctFiles.Add(fio, "Out")
                        End If
                    End If
                Next

                If dctFiles.Count = 0 Then
                    For Each fio1 As FileInfo In diImgOuter.GetFiles()
                        Dim name = fio1.Name
                        Dim extension = fio1.Extension
                        Dim noImg As String = "pic_not_av.jpg"
                        If name.ToUpper().Equals(noImg.ToUpper()) Then
                            dctFiles.Add(fio1, "Out")
                        End If
                    Next
                End If

            End If

            dctImages = dctFiles

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            dctImages = Nothing
        End Try
    End Sub

    Public Sub GetImagesFromPathOEM(filePath As String, ByRef dctImages As Dictionary(Of FileInfo, String))
        Dim lstFiles As List(Of FileInfo) = New List(Of FileInfo)()
        Dim dctFiles As Dictionary(Of FileInfo, String) = New Dictionary(Of FileInfo, String)()
        Try

            Dim diImgOuter = New IO.DirectoryInfo(filePath)

            If diImgOuter.Exists Then
                'no external folder. Check for images
                For Each fio As FileInfo In diImgOuter.GetFiles()
                    Dim name = fio.Name
                    If name.ToUpper().Contains("OEM_") Then
                        Dim extension = fio.Extension
                        If extension.Trim().ToLower().Equals(".jpg") Or extension.Trim().ToLower().Equals(".jpeg") Or extension.Trim().ToLower().Equals(".png") Then
                            dctFiles.Add(fio, "Out")
                        End If
                    Else
                        Dim lastPos As Integer = name.LastIndexOf("\")
                        Dim NoFilePath = name.Substring(0, lastPos - 1)
                        Dim noImg As String = "pic_not_av.jpg"

                        Dim di = New IO.DirectoryInfo(NoFilePath)
                        If di.Exists Then
                            NoFilePath += noImg
                            dctFiles.Add(fio, "Out")
                        End If

                    End If
                Next
            End If

            dctImages = dctFiles

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            dctImages = Nothing
        End Try
    End Sub

    Public Sub GetImagesFromPath(filePath As String, ByRef dctImages As Dictionary(Of FileInfo, String))
        Dim lstFiles As List(Of FileInfo) = New List(Of FileInfo)()
        Dim dctFiles As Dictionary(Of FileInfo, String) = New Dictionary(Of FileInfo, String)()
        Try

            Dim newPath = filePath + "External\"
            Dim diImgOuter = New IO.DirectoryInfo(filePath)
            Dim diImgInner = New IO.DirectoryInfo(newPath)
            If diImgInner.Exists Then

                'Dim images = diImg.GetFiles().Where(Function(e) e.Extension = "jpg" Or e.Extension = "jpeg" Or e.Extension = "png").Select(Function(f) New FileInfo(f.Name))
                For Each fiii As FileInfo In diImgInner.GetFiles()
                    Dim name = fiii.Name
                    Dim extension = fiii.Extension
                    If extension.Trim().ToLower().Equals(".jpg") Or extension.Trim().ToLower().Equals(".jpeg") Or extension.Trim().ToLower().Equals(".png") Then
                        dctFiles.Add(fiii, "Ext")
                    End If
                Next
            End If

            If diImgOuter.Exists Then
                'no external folder. Check for images
                For Each fio As FileInfo In diImgOuter.GetFiles()
                    Dim name = fio.Name
                    Dim extension = fio.Extension
                    If extension.Trim().ToLower().Equals(".jpg") Or extension.Trim().ToLower().Equals(".jpeg") Or extension.Trim().ToLower().Equals(".png") Then
                        dctFiles.Add(fio, "Out")
                    End If
                Next

            End If

            dctImages = dctFiles

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            dctImages = Nothing
        End Try
    End Sub

    Public Sub prepareListFromVDOEM(dctImg As Dictionary(Of FileInfo, String), ByRef lstStrImg As List(Of String), Optional urlType As Boolean = False)
        Dim lstStr As List(Of String) = New List(Of String)()
        Dim url As String = Nothing
        Dim fullUrl As String = Nothing
        Dim selImg As String = Nothing
        Dim noImg As String = "pic_not_av.jpg"
        Dim UrlOEM As String = ConfigurationManager.AppSettings("VDWebURlOEM").ToString()
        Dim siteUrl = UrlOEM
        Try

            Dim filesindirectory() As String = Directory.GetFiles(Server.MapPath("~/Images"))
            Dim localImages As List(Of String) = New List(Of String)(filesindirectory.Length())
            For Each st As String In filesindirectory
                localImages.Add(st)
            Next

            For Each dc In dctImg

                fullUrl = dc.Key.FullName
                Dim arrValues = fullUrl.Split("\")
                If fullUrl.ToLower().Contains(noImg) Then
                    url = UrlOEM + noImg
                Else
                    Dim partNoFolder = arrValues(5).ToString().Trim()
                    Dim partNo = arrValues(6).ToString().Trim()

                    url = siteUrl + partNoFolder + "/" + partNo
                End If

                Dim extension = Path.GetExtension(fullUrl).ToLower()
                Dim strUrl = PreparaUrlAndImage(extension, siteUrl, url, urlType)
#Region "No"

                'Select Case extension
                '    Case ".doc", ".docx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Word")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Word.PNG"
                '            '"~/Images/Word.PNG"
                '    Case ".ppt", ".pptx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Powerpoint")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Powerpoint.PNG"
                '    Case ".xls", ".xlsx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Excel")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Excel.PNG"
                '    Case ".pdf"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Pdf")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Pdf.PNG"
                '    Case ".msg"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Outlook")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Outlook.PNG"
                '    Case ".jpg", ".png", ".jpeg"
                '        webImg = url
                '        selImg = webImg
                '    Case Else
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("avatar-ctp")).First()
                '        selImg = siteUrl + "SeeFilesImportant/avatar-ctp.PNG"
                'End Select

                'If urlType Then
                '    url += "," + selImg
                'End If

#End Region
                lstStrImg.Add(strUrl)
            Next
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            lstStrImg = Nothing
        End Try
    End Sub

    Public Sub prepareListFromVD(dctImg As Dictionary(Of FileInfo, String), ByRef lstStrImg As List(Of String), Optional urlType As Boolean = False)
        Dim lstStr As List(Of String) = New List(Of String)()
        Dim url As String = Nothing
        Dim fullUrl As String = Nothing
        Dim selImg As String = Nothing
        Dim fileDate As String = Nothing
        Try

            Dim filesindirectory() As String = Directory.GetFiles(Server.MapPath("~/Images"))
            Dim localImages As List(Of String) = New List(Of String)(filesindirectory.Length())
            For Each st As String In filesindirectory
                localImages.Add(st)
            Next

            For Each dc In dctImg

                fullUrl = dc.Key.FullName
                Dim arrValues = fullUrl.Split("\")

                fileDate = dc.Key.LastAccessTime.ToString()

                Dim claimNo = arrValues(5).ToString().Trim()
                Dim partNo = If(arrValues.Length = 7, arrValues(6).ToString().Trim(), arrValues(7).ToString().Trim())
                Dim loc = If(dc.Value.ToString().Trim().ToLower().Equals("ext"), "External", "")

                Dim siteUrl = "http://svrwebapps.costex.com/IMAGEBANK/"

                url = If(Not String.IsNullOrEmpty(loc), siteUrl + claimNo + "/" + loc + "/" + partNo, siteUrl + claimNo + "/" + partNo)
                Dim extension = Path.GetExtension(fullUrl).ToLower()
                Dim strUrl = PreparaUrlAndImage(extension, siteUrl, url, fileDate, urlType)

#Region "No"

                'Select Case extension
                '    Case ".doc", ".docx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Word")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Word.PNG"
                '            '"~/Images/Word.PNG"
                '    Case ".ppt", ".pptx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Powerpoint")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Powerpoint.PNG"
                '    Case ".xls", ".xlsx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Excel")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Excel.PNG"
                '    Case ".pdf"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Pdf")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Pdf.PNG"
                '    Case ".msg"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Outlook")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Outlook.PNG"
                '    Case ".jpg", ".png", ".jpeg"
                '        webImg = url
                '        selImg = webImg
                '    Case Else
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("avatar-ctp")).First()
                '        selImg = siteUrl + "SeeFilesImportant/avatar-ctp.PNG"
                'End Select

                'If urlType Then
                '    url += "," + selImg
                'End If

#End Region

                lstStrImg.Add(strUrl)
            Next
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            lstStrImg = Nothing
        End Try
    End Sub

    Public Sub prepareListFromVDCTP(dctImg As Dictionary(Of FileInfo, String), ByRef lstStrImg As List(Of String), Optional urlType As Boolean = False)
        Dim lstStr As List(Of String) = New List(Of String)()
        Dim url As String = Nothing
        Dim fullUrl As String = Nothing
        Dim selImg As String = Nothing
        Dim noImg As String = "pic_not_av.jpg"
        Dim UrlOEM As String = ConfigurationManager.AppSettings("VDWebURlCTP").ToString()
        Dim siteUrl = UrlOEM
        Try

            Dim filesindirectory() As String = Directory.GetFiles(Server.MapPath("~/Images"))
            Dim localImages As List(Of String) = New List(Of String)(filesindirectory.Length())
            For Each st As String In filesindirectory
                localImages.Add(st)
            Next

            For Each dc In dctImg

                fullUrl = dc.Key.FullName
                Dim arrValues = fullUrl.Split("\")

                Dim partNo = arrValues(5).ToString().Trim()
                'Dim partNo = If(arrValues.Length = 7, arrValues(6).ToString().Trim(), arrValues(7).ToString().Trim())
                'Dim loc = If(dc.Value.ToString().Trim().ToLower().Equals("ext"), "External", "")

                url = siteUrl + partNo
                Dim extension = Path.GetExtension(fullUrl).ToLower()
                Dim strUrl = PreparaUrlAndImage(extension, siteUrl, url, urlType)
#Region "No"

                'Select Case extension
                '    Case ".doc", ".docx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Word")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Word.PNG"
                '            '"~/Images/Word.PNG"
                '    Case ".ppt", ".pptx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Powerpoint")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Powerpoint.PNG"
                '    Case ".xls", ".xlsx"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Excel")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Excel.PNG"
                '    Case ".pdf"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Pdf")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Pdf.PNG"
                '    Case ".msg"
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Outlook")).First()
                '        selImg = siteUrl + "SeeFilesImportant/Outlook.PNG"
                '    Case ".jpg", ".png", ".jpeg"
                '        webImg = url
                '        selImg = webImg
                '    Case Else
                '        'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("avatar-ctp")).First()
                '        selImg = siteUrl + "SeeFilesImportant/avatar-ctp.PNG"
                'End Select

                'If urlType Then
                '    url += "," + selImg
                'End If

#End Region
                lstStrImg.Add(strUrl)
            Next
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            lstStrImg = Nothing
        End Try
    End Sub

    Public Function PreparaUrlAndImage(extension As String, siteUrl As String, url As String, Optional fileDate As String = Nothing, Optional urlType As Boolean = False) As String
        'Dim url As String = Nothing
        Dim fullUrl As String = Nothing
        Dim selImg As String = Nothing
        Dim webImg As String = Nothing
        Try

            'Dim extension = Path.GetExtension(fullpath).ToLower()
            Select Case extension
                Case ".doc", ".docx"
                    'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Word")).First()
                    selImg = siteUrl + "SeeFilesImportant/Word.PNG"
                            '"~/Images/Word.PNG"
                Case ".ppt", ".pptx"
                    'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Powerpoint")).First()
                    selImg = siteUrl + "SeeFilesImportant/Powerpoint.PNG"
                Case ".xls", ".xlsx"
                    'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Excel")).First()
                    selImg = siteUrl + "SeeFilesImportant/Excel.PNG"
                Case ".pdf"
                    'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Pdf")).First()
                    selImg = siteUrl + "SeeFilesImportant/Pdf.PNG"
                Case ".msg"
                    'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("Outlook")).First()
                    selImg = siteUrl + "SeeFilesImportant/Outlook.PNG"
                Case ".jpg", ".png", ".jpeg"
                    webImg = url
                    selImg = webImg
                Case ".mp4", ".avi", ".mpg", ".3gp", ".mov", ".mpeg"
                    selImg = siteUrl + "SeeFilesImportant/video2.PNG"
                Case Else
                    'selImg = localImages.AsEnumerable().Where(Function(e) e.Contains("avatar-ctp")).First()
                    selImg = siteUrl + "SeeFilesImportant/avatar-ctp.PNG"
            End Select

            If urlType Then
                url += "," + selImg
            End If

            url += "," + fileDate

            Return url

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return url
        End Try
    End Function

#End Region

#Region "Utils"

    Public Sub cleanMe(txt As TextBox)
        Try
            txt.Text = String.Empty
        Catch ex As Exception

        End Try
    End Sub

    Private Function GetDatasetDataValidation(ds As DataSet) As Boolean
        Dim bContinue As Boolean = False
        Try
            If ds IsNot Nothing Then
                If ds.Tables(0).Rows.Count > 0 Then
                    bContinue = True
                Else
                    bContinue = False
                End If
            Else
                bContinue = False
            End If
            Return bContinue
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, ex.Message, ex.ToString)
            Return bContinue
        End Try

    End Function

    Public Sub DownloadExcel()
        Dim exMessage As String = Nothing
        Dim fileExtension As String = ""
        Dim fileName As String = ""
        Dim folderPath As String = ""
        Dim resultMethod As Boolean = False
        Dim strFilters As String = Nothing
        Try
            'Dim pathToProcess = ConfigurationManager.AppSettings("urlWlTemplateToProcess")
            Dim pathToProcess = ""
            'Dim updUserPath = userPath + "\WishList-Template\"
            folderPath = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("ExcelTemplate")), ConfigurationManager.AppSettings("ExcelTemplate"), "")
            Dim methodMessage = If(Not String.IsNullOrEmpty(folderPath), "The template document will be downloaded to your documents folder", "There is not a path defined for this document. Call an administrator!!")

            If Not String.IsNullOrEmpty(folderPath) Then

                Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                    'check file folder availability
                    If Not Directory.Exists(folderPath) Then
                        Directory.CreateDirectory(folderPath)
                    Else

                        Dim files = Directory.GetFiles(folderPath)
                        Dim fi = Nothing
                        If files.Length = 1 Then
                            For Each item In files
                                fi = item
                                Dim isOpened = IsFileinUse(New FileInfo(fi))
                                If Not isOpened Then
                                    File.Delete(item)
                                Else
                                    SendMessage("Please close the file " & fi & " in order to proceed!", messageType.info)
                                    Exit Sub
                                End If
                            Next
                        End If
                    End If

                    'check extension and prepare name
                    fileExtension = objBL.Determine_OfficeVersion()
                    If String.IsNullOrEmpty(fileExtension) Then
                        fileExtension = "xlsx"
                    End If

                    Dim title As String
                    title = "Claims_Report_Generated_by "
                    fileName = objBL.adjustDatetimeFormat(title, fileExtension)

                    'prepare the fullpath and save the document to path folder
                    Dim fullPath = folderPath + fileName
                    'Dim ds = DirectCast(Session("DataSource"), DataSet)

                    strFilters = If(Session("buildSql") IsNot Nothing, DirectCast(Session("buildSql"), String), "")

                    Dim dsNew As DataSet = New DataSet()
                    Dim rs1 = objBL.GetClaimDataToExcel("C", dsNew, strFilters)

                    If rs1 > 0 Then

                        Dim bContinue = GetDatasetDataValidation(dsNew)
                        If bContinue Then

#Region "old Way 1"

                            'Dim lstDownExc = FillDownloadExcObj(ds)
                            'Dim ds1 = New DataSet()
                            'Dim dtResult = ListToDataTable(lstDownExc)
                            'If dtResult IsNot Nothing Then
                            '    If dtResult.Rows.Count > 0 Then
                            '        ds1.Tables.Add(dtResult)
                            '    End If
                            'End If

#End Region
#Region "old way 2"

                            'Dim dsNew As DataSet = New DataSet()
                            'Dim dtNew As DataTable = New DataTable()
                            'dtNew = ds.Tables(0).Copy()

                            'dtNew.Columns.Remove("WRN")
                            'dtNew.Columns.Remove("CNT03")
                            'dtNew.Columns.Remove("MHSUPCLM")
                            'dtNew.Columns.Remove("CWWRNO")
                            'dtNew.Columns.Remove("CWPTNO")

                            'dtNew.Columns.Add("InternalStatus", GetType(String))
                            'dtNew.Columns.Add("SalesmanName", GetType(String))
                            'dtNew.Columns.Add("Reason", GetType(String))
                            'dtNew.Columns.Add("Diagnose", GetType(String))
                            'dtNew.Columns.Add("VendorName", GetType(String))

                            'dtNew.Columns("MHMRNR").ColumnName = "ClaimNumber"
                            'dtNew.Columns("MHDATE").ColumnName = "ClaimDate"
                            'dtNew.Columns("MHTDES").ColumnName = "ClaimType"
                            'dtNew.Columns("MHCUNR").ColumnName = "CustomerNumber"
                            'dtNew.Columns("MHCUNA").ColumnName = "CustomerName"
                            'dtNew.Columns("MHTOMR").ColumnName = "TotalCost"
                            'dtNew.Columns("MHPTNR").ColumnName = "PartNumber"
                            'dtNew.Columns("MHSTDE").ColumnName = "ClaimStatus"
                            'dtNew.Columns("ACTDT").ColumnName = "LastUpdateDate"
                            ''dtNew.Columns("MHREASN").ColumnName = "Reason"
                            ''dtNew.Columns("MHDIAG").ColumnName = "Diagnose"
                            'dtNew.Columns("CWVENO").ColumnName = "VendorNumber"
                            'dtNew.Columns("CWLOCN").ColumnName = "Location"
                            'dtNew.Columns("CWUSER").ColumnName = "User"



                            'For Each dw As DataRow In dtNew.Rows

                            '    GetInternalStsByCode(dw.Item("CWSTAT").ToString().Trim())
                            '    GetSalesmanNameByNumber(dw.Item("CUSLM").ToString().Trim())
                            '    GetClaimDiagnose(ds, True, dw.Item("MHDIAG").ToString().Trim())
                            '    GetClaimReason(ds, True, dw.Item("MHREASN").ToString().Trim())
                            '    GetVendorByNumber(dw.Item("VendorNumber").ToString().Trim())

                            '    dw.Item("InternalStatus") = If(Session("IntSts") IsNot Nothing, Session("IntSts").ToString().Trim(), "")
                            '    dw.Item("SalesmanName") = If(Session("SlsName") IsNot Nothing, Session("SlsName").ToString().Trim(), "")
                            '    dw.Item("Reason") = If(Session("ClaimReason") IsNot Nothing, Session("ClaimReason").ToString().Trim(), "")
                            '    dw.Item("Diagnose") = If(Session("ClaimDiagnose") IsNot Nothing, Session("ClaimDiagnose").ToString().Trim(), "")
                            '    dw.Item("VendorName") = If(Session("VndnName") IsNot Nothing, Session("VndnName").ToString().Trim(), "")

                            'Next

                            'dtNew.Columns.Remove("CWSTAT")
                            'dtNew.Columns.Remove("CUSLM")
                            'dtNew.Columns.Remove("MHDIAG")
                            'dtNew.Columns.Remove("MHREASN")

                            'dtNew.AcceptChanges()

                            'dsNew.Tables.Add(dtNew)

#End Region
                            Using wb As New XLWorkbook()
                                wb.Worksheets.Add(dsNew.Tables(0), "Claims-Report")
                                wb.SaveAs(fullPath)
                            End Using

                            'send the document to the handler to process the download through the browser
                            If File.Exists(fullPath) Then
                                Dim newLocalFile As FileInfo = New FileInfo(fullPath)
                                If newLocalFile.Exists Then
                                    Try
                                        Session("filePathExcelOutput") = fullPath
                                        Response.Redirect("DownloadDoc.ashx", False)

                                    Catch Win32Exception As Win32Exception
                                        Shell("explorer " & fullPath, AppWinStyle.NormalFocus)
                                    Catch ex As Exception
                                        writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "Error Ocurred:  " + ex.Message + " for user " + Session("userid").ToString(), "Occurs at time: " + DateTime.Now.ToString())
                                    End Try
                                End If
                            End If
                            'ScriptManager.RegisterStartupScript(Me, Page.GetType, "Message1", "JSFunction();", True)
                        Else
                            Dim userSelected As String = Nothing
                            userSelected = If(String.IsNullOrEmpty(Session("selectedUser")), Session("userid").ToString(), Session("selectedUser").ToString())
                            SendMessage("There is no data to show for the user " & userSelected & ". ", messageType.info)
                        End If
                    End If

                End Using
            Else

            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub DownloadRequestedFile(Optional ByRef hasPass As Boolean = False)
        Dim fullPath As String = Nothing
        Dim exMessage As String = Nothing
        Try
            fullPath = If(Session("filePathExcelOutput") IsNot Nothing, DirectCast(Session("filePathExcelOutput"), String), "")
            If Not String.IsNullOrEmpty(fullPath) Then
                If File.Exists(fullPath) Then

                    Dim newLocalFile As FileInfo = New FileInfo(fullPath)
                    If newLocalFile.Exists Then
                        Try
                            Dim ctx1 = HttpContext.Current
                            Response.Redirect("DownloadDoc.ashx", False)
                            hasPass = True
                        Catch Win32Exception As Win32Exception
                            Shell("explorer " & fullPath, AppWinStyle.NormalFocus)
                        Catch ex As Exception
                            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "Error Ocurred:  " + ex.Message + " for user " + Session("userid").ToString(), "Occurs at time: " + DateTime.Now.ToString())
                        End Try
                    End If
                End If
            Else

            End If
        Catch ex As Exception
            exMessage = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub foo()
        Try
            Task.Delay(15000).ContinueWith(Function() callRec()).Wait()
        Catch ex As Exception

        End Try
    End Sub

    Public Function callRec() As Boolean
        Dim count As Integer = 1000000
        Dim ct As Integer = 0
        Dim exMessage As String = Nothing
        Dim blResult As Boolean = False
        Dim blRes As Boolean = False
        Session("DownloadEnd") = False
        Try
            'Dim ctNew = If(Session("countValue") IsNot Nothing, DirectCast(Session("countValue"), Integer), 0)
            'If ctNew >= 1000000 Then
            '    Return True
            'Else
            '    ctNew += 1
            '    Session("countValue") = ctNew
            '    Thread.Sleep(2000)
            Dim ctx1 = HttpContext.Current
            DownloadRequestedFile(blRes)
            '    If blRes Then
            '        Thread.Sleep(2000)
            '        Session("countValue") = count
            '    End If
            '    Return callRec()
            'End If
            Return blResult
        Catch ex As Exception
            exMessage = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return blResult
        End Try
    End Function

    Protected Function FillDownloadExcObj(ds As DataSet) As List(Of DownloadExcelObj)

        Dim lstDE = New List(Of DownloadExcelObj)()
        Try
            For Each dw As DataRow In ds.Tables(0).Rows
                Dim objDE = New DownloadExcelObj()
                objDE.ClaimNumber = dw.Item("MHMRNR").ToString().Trim()
                'objDE.WarningNo = dw.Item("WRN").ToString().Trim()
                GetInternalStsByCode(dw.Item("CWSTAT").ToString().Trim())
                objDE.InternalStatus = If(Session("IntSts") Is Nothing, "", Session("IntSts").ToString().Trim())
                objDE.ClaimDate = dw.Item("MHDATE").ToString().Trim()
                objDE.ClaimType = dw.Item("MHTDES").ToString().Trim()
                objDE.CustomerNumber = dw.Item("MHCUNR").ToString().Trim()
                objDE.CustomerName = dw.Item("MHCUNA").ToString().Trim()
                objDE.TotalCost = dw.Item("MHTOMR").ToString().Trim()
                objDE.PartNumber = dw.Item("MHPTNR").ToString().Trim()
                objDE.ClaimStatus = dw.Item("MHSTDE").ToString().Trim()
                objDE.LastUpdateDate = dw.Item("ACTDT").ToString().Trim()
                'objDE.SalesmanNo = dw.Item("CUSLM").ToString().Trim()
                GetSalesmanNameByNumber(dw.Item("CUSLM").ToString().Trim())
                objDE.SalesmanName = If(Session("SlsName") Is Nothing, "", Session("SlsName").ToString().Trim())
                GetClaimDiagnose(ds, True, dw.Item("MHDIAG").ToString().Trim())
                GetClaimReason(ds, True, dw.Item("MHREASN").ToString().Trim())
                objDE.Reason = If(Session("ClaimReason") Is Nothing, "", Session("ClaimReason").ToString().Trim())
                objDE.Diagnose = If(Session("ClaimDiagnose") Is Nothing, "", Session("ClaimDiagnose").ToString().Trim())
                objDE.User = dw.Item("CWUSER").ToString().Trim()
                objDE.Vendor = dw.Item("CWVENO").ToString().Trim()
                GetVendorByNumber(dw.Item("CWVENO").ToString().Trim())
                objDE.VendorName = If(Session("VndnName") Is Nothing, "", Session("VndnName").ToString().Trim())
                objDE.Location = dw.Item("CWLOCN").ToString().Trim()
                lstDE.Add(objDE)
            Next
            Return lstDE
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return Nothing
        End Try
    End Function

    Protected Function SetSortDirection(sortDirection As String) As String
        Dim _sortDirection As String = Nothing
        If sortDirection = "0" Then
            _sortDirection = "DESC"
        Else
            _sortDirection = "ASC"
        End If
        Session("sortDirection") = If(_sortDirection = "DESC", "1", "0")
        Return _sortDirection
    End Function

    '    static class ListExtensions
    '{
    '    public static DataTable ToDataTable(this List<List<string>> list)
    '    {
    '        DataTable tmp = new DataTable();
    '        foreach (List<string> row in list)
    '        {
    '            tmp.Rows.Add(row.ToArray());
    '        }
    '        return tmp;
    '    }
    '}

    Public Shared Function GetDatatableFromStringList(lst As List(Of String), column As String) As String
        Dim dt As DataTable = New DataTable()
        Dim htmlTable As String = Nothing
        Try
            dt.Columns.Add(column)
            For Each it1 As String In lst
                dt.Rows.Add(it1)
            Next

            'htmlTable = "<table>"
            'htmlTable += "<tr>"

            'For Each dc As DataColumn In dt.Columns
            '    htmlTable += "<td>" + dc.ColumnName.Trim() + "</td>"
            'Next
            'htmlTable += "</tr>"
            'For Each dw As DataRow In dt.Rows
            '    htmlTable += "<tr>"
            '    htmlTable += "<td>" + dw.Item("Description").ToString().Trim() + "</td>"
            '    htmlTable += "</tr>"
            'Next
            'htmlTable += "</table>"

            htmlTable = "<ul>"
            'htmlTable += "<tr>"

            For Each dc As DataColumn In dt.Columns
                htmlTable += "<b>" + dc.ColumnName.Trim().ToUpper() + "</b>"
            Next
            'htmlTable += "</tr>"
            For Each dw As DataRow In dt.Rows
                'htmlTable += "<tr>"
                htmlTable += "<li>" + dw.Item("Description").ToString().Trim() + "</li>"
                'htmlTable += "</tr>"
            Next
            htmlTable += "</ul>"

            Return htmlTable
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function CheckIfOutlookPresent() As Boolean
        Dim application As Outlook.Application
        Try
            If Process.GetProcessesByName("OUTLOOK").Count() > 0 Then

                ' If so, use the GetActiveObject method to obtain the process and cast it to an Application object.
                application = DirectCast(Marshal.GetActiveObject("Outlook.Application"), Outlook.Application)
                Return True
            Else

                ' If not, create a new instance of Outlook and sign in to the default profile.
                application = New Outlook.Application()
                Dim ns As Outlook.NameSpace = application.GetNamespace("MAPI")
                ns.Logon("", "", Missing.Value, Missing.Value)
                ns = Nothing
                Return False
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return False
        End Try
    End Function

    Public Function PrepareEmail(obj As ClaimEmailObj, flag As String, Optional ByRef strMessage As String = Nothing, Optional applyCM As Boolean = False) As Boolean
        Dim exMessage As String = Nothing
        Dim bResult As Boolean = False
        Dim mustChangeTemplate As Boolean = False
        Try
            Dim emailSender As String = ConfigurationManager.AppSettings("username").ToString()
            Dim emailSenderPassword As String = ConfigurationManager.AppSettings("password").ToString()
            Dim emailSenderHost As String = ConfigurationManager.AppSettings("smtp").ToString()
            Dim emailSenderPort As String = ConfigurationManager.AppSettings("portnumber").ToString()
            'Dim emailIsSSL As Boolean = CBool(ConfigurationManager.AppSettings("IsSSL").ToString())

            Dim flagEmail As String = ConfigurationManager.AppSettings("flagEmail").ToString()
            Dim ProdNotUsers1000 = ConfigurationManager.AppSettings("claimNotificatedUsersOver1000").ToString()
            Dim ProdNotUsers500 = ConfigurationManager.AppSettings("claimNotificatedUsersOver500").ToString()
            Dim TestNotUsers = ConfigurationManager.AppSettings("claimNotificatedUsersTest").ToString()
            Dim FullPrivilegeUser = ConfigurationManager.AppSettings("claimFullPrivilegesApprove").ToString()
            Dim EmailPrsCMGen = ConfigurationManager.AppSettings("EmailPersonApplyCM").ToString()
            Dim CostexPhoneNumber = ConfigurationManager.AppSettings("CostexPhone").ToString()

            If flag.Equals("4") Then
                mustChangeTemplate = True
                flag = "2"
            End If

            Dim FileTemplate = Directory.GetFiles(Server.MapPath("~/EmailTemplates/"))
            Dim i As Integer = 0
            i = CInt(flag)
            i = If(CInt(flag).Equals(3), 0, CInt(flag))
            Dim str = New StreamReader(FileTemplate(i))
            Dim Mailtext = str.ReadToEnd()
            str.Close()

            Dim username As String = Nothing
            Dim userEmail As String = Nothing
            If Not flag.Equals("3") Then

                If applyCM Then
                    userEmail = If(flagEmail.Equals("1"), EmailPrsCMGen.Trim(), TestNotUsers.Trim())
                    GetUserEmailByUserId(EmailPrsCMGen.Split("@")(0).ToString().Trim(), username)
                Else
                    userEmail = If(flagEmail.Equals("1"), hdCLMemail.Value.Trim(), TestNotUsers.Trim())
                    GetUserEmailByUserId(hdCLMuser.Value.Trim(), username)
                End If
            Else
                userEmail = If(flagEmail.Equals("1"), FullPrivilegeUser, TestNotUsers.Trim())
                GetUserEmailByUserId(FullPrivilegeUser.Split("@")(0), username)
            End If

            Mailtext = Mailtext.Replace("[CUSTOMER]", userEmail) 'obj.EmailTo
            Mailtext = Mailtext.Replace("[USERNAME]", username)
            Mailtext = Mailtext.Replace("[CLAIMNO]", obj.ClaimNo)
            Mailtext = Mailtext.Replace("[PARTNO]", obj.PartNo)
            Mailtext = Mailtext.Replace("[INVOICE]", obj.Invoice)
            Mailtext = Mailtext.Replace("[MESSAGE]", obj.MESSAGE)

            If Not flag.Equals("2") Then

                Mailtext = Mailtext.Replace("[DESC]", obj.Description)
                Mailtext = Mailtext.Replace("[CTX]", obj.Customer)
                Mailtext = Mailtext.Replace("[CD]", obj.ConsequentalDamage)
                Mailtext = Mailtext.Replace("[TOTALCLAIM]", obj.TotalApproved)

                If flag.Equals("1") Then
                    Mailtext = Mailtext.Replace("[PARTS]", obj.TotalParts)
                    Mailtext = Mailtext.Replace("[FREIGHT]", obj.TotalFreight)
                    Mailtext = Mailtext.Replace("[EXTRA]", obj.AdditionalCost)
                    Mailtext = Mailtext.Replace("[APPROVEDBY]", obj.ApprovedBy)
                End If

                Dim userEmail1 As String = Nothing
                Dim username1 As String = Nothing
                Dim ext As String = Nothing
                GetUserEmailByUserId(Session("userid").ToString().Trim(), username1, userEmail1, ext)
                emailSender = If(flagEmail.Equals("1"), userEmail1.Trim(), TestNotUsers.Trim())

                Mailtext = Mailtext.Replace("[SENDER]", username1)

            Else
                Dim userEmail1 As String = Nothing
                Dim username1 As String = Nothing
                Dim ext As String = Nothing
                GetUserEmailByUserId(Session("userid").ToString().Trim(), username1, userEmail1, ext)
                emailSender = If(flagEmail.Equals("1"), userEmail1.Trim(), TestNotUsers.Trim())

                Mailtext = Mailtext.Replace("[CUSTOMER]", If(flagEmail.Equals("1"), txtContactEmail.Text.Trim(), TestNotUsers.Trim())) 'obj.EmailTo
                Mailtext = Mailtext.Replace("[USERNAME]", If(flagEmail.Equals("1"), txtContactName.Text.Trim(), TestNotUsers.Trim().Split("@")(0)))
                Mailtext = Mailtext.Replace("[COORDINATOR]", username1)
                Mailtext = Mailtext.Replace("[OWNNUMBER]", CostexPhoneNumber)
                Mailtext = Mailtext.Replace("[OWNEXT]", ext)
                userEmail = If(flagEmail.Equals("1"), txtContactEmail.Text.Trim(), TestNotUsers.Trim())
            End If

            Dim strSts2Text As String = "Acknowledgement Email for User., Information Requested to the user."
            Dim niceText = If(mustChangeTemplate, strSts2Text.Trim().Split(",")(1).Trim(), strSts2Text.Trim().Split(",")(0).Trim())

            Dim msg As MailMessage = New MailMessage()
            msg.IsBodyHtml = True
            'emailSender = "jdmira@costex.com" 'test purpose
            msg.From = New MailAddress(emailSender)
            msg.To.Add(userEmail)
            msg.To.Add(TestNotUsers)
            msg.To.Add("ansberto.avila85@gmail.com")
            Dim msgSubject = If(flag.Equals("2"), niceText, If(flag.Equals("0"), "Request Authorization for Claim Over 500.", "Authorization Approved for Claim over 500."))
            msg.Subject = msgSubject
            Dim txt = Mailtext
            msg.Body = Mailtext
            'msg.BodyEncoding = System.Text.Encoding.ASCII
            'msg.Body = msg.Body.Replace(Environment.NewLine, "<br/>")

            Dim _smtp As SmtpClient = New SmtpClient()
            _smtp.Host = emailSenderHost
            _smtp.Port = emailSenderPort

            Dim _newtwork As NetworkCredential = New NetworkCredential(emailSender, emailSenderPassword)
            _smtp.Credentials = _newtwork

            _smtp.Send(msg)

            bResult = True

            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Information, "User: " + Session("userid").ToString(), " Email sent to:" + userEmail + ". The claim number is: " + obj.ClaimNo + ". The total cost is:" + obj.TotalApproved + ". At Time: " + DateTime.Now.ToString())

            Return bResult

        Catch ex As Exception
            exMessage = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Dim pp = exMessage
            strMessage = exMessage
            bResult = False
            Return bResult
        End Try

    End Function

    Protected Sub lnkLogout_Click() Handles lnkLogout.Click
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

    Public Function GetAccessByUsers(ByRef sel As Integer) As Boolean
        Dim optionSelection As String = Nothing
        Dim user As String = Nothing
        Dim flag As Boolean = False
        Dim fullData As Boolean = False
        Dim ds As DataSet = New DataSet()
        Dim lstUsers As List(Of String) = New List(Of String)()
        Try
            Dim validUsers = ConfigurationManager.AppSettings("validUsersForWeb")

            user = If(Session("userid") IsNot Nothing, Session("userid").ToString(), "NA")
            If Not user.Equals("NA") Then

                fullData = If(LCase(validUsers.Trim()).Contains(LCase(user.Trim())), True, False)
                If fullData Then
                    flag = True
                    Return flag
                Else

                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        Dim rsResult = objBL.GetClaimPersonal(ds)
                        If rsResult > 0 Then
                            If ds IsNot Nothing Then
                                If ds.Tables(0).Rows.Count > 0 Then
                                    For Each dw As DataRow In ds.Tables(0).Rows
                                        lstUsers.Add(dw.Item("USUSER").ToString().Trim().ToUpper())
                                    Next
                                End If
                            End If
                        End If
                    End Using

                    'If LCase(validUsers.Trim()).Contains(LCase(user.Trim())) Then
                    If lstUsers.Count > 0 Then
                        If lstUsers.Contains(user) Then
                            flag = True
                            Return flag
                        Else
                            sel = 0
                            Return flag
                        End If
                    End If

                    'End If
                End If

            Else
                sel = 1
                Return False
                'Response.Redirect("http://svrwebapps.costex.com/PurchasingApp/", True)
            End If

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return flag
        End Try
    End Function

    'Public Sub PrepareQueryLikes(ByRef strBuild As String)
    '    strBuild = Nothing
    '    Try

    '        If Not String.IsNullOrEmpty(txtClaimNo.Text.Trim()) Then
    '            strBuild += " AND TRIM(MHMRNR) = '" + txtClaimNo.Text.Trim() + "'"
    '        End If
    '        If Not String.IsNullOrEmpty(txtPartNo.Text.Trim()) Then
    '            strBuild += " AND TRIM(CWPTNO) = '" + txtPartNo.Text.Trim() + "'"
    '        End If
    '        If Not String.IsNullOrEmpty(txtCustomer.Text.Trim()) Then
    '            strBuild += " AND TRIM(MHCUNR) = '" + txtCustomer.Text.Trim() + "'"
    '        End If

    '    Catch ex As Exception

    '    End Try
    'End Sub

    ''' <summary>
    ''' Prepare the filters criteria to add to main query
    ''' </summary>
    ''' <param name="strBuild"></param>
    Public Sub PrepareQuery(ByRef strBuild As String)
        strBuild = Nothing
        Try
            If Not String.IsNullOrEmpty(txtClaimNo.Text.Trim()) Then
                strBuild += " AND TRIM(MHMRNR) = '" + txtClaimNo.Text.Trim() + "'"
            End If
            If Not String.IsNullOrEmpty(txtPartNo.Text.Trim()) Then
                strBuild += " AND TRIM(CWPTNO) = '" + txtPartNo.Text.Trim() + "'"
            End If
            If Not String.IsNullOrEmpty(txtDateInit.Text.Trim()) And Not String.IsNullOrEmpty(txtDateTo.Text.Trim()) Then
                Dim minDate = txtDateInit.Text.Trim().Split(" ")(0)
                Dim maxDate = txtDateTo.Text.Trim().Split(" ")(0)
                strBuild += " AND (MHDATE >= DATE('" + minDate + "') AND MHDATE <= DATE('" + maxDate + "')) "
                '7/19/2021
                '6/10/2017
            End If

            If ddlClaimTypeOk.SelectedIndex > 0 Then
                'here add validation for type of claim
                Dim strValues As String = Nothing
                Dim dctValues As Dictionary(Of String, String) = Nothing
                prepareClaimClasificaction(dctValues)
                If ddlClaimTypeOk.SelectedIndex.ToString() = "2" Then
                    For Each item In dctValues
                        If item.Key = "WARR" Then
                            strValues = item.Value
                            Exit For
                        End If
                    Next
                ElseIf ddlClaimTypeOk.SelectedIndex.ToString() = "3" Then
                    For Each item In dctValues
                        If item.Key = "NWARR" Then
                            strValues = item.Value
                            Exit For
                        End If
                    Next
                ElseIf ddlClaimTypeOk.SelectedIndex.ToString() = "4" Then
                    For Each item In dctValues
                        If item.Key = "INT" Then
                            strValues = item.Value
                            Exit For
                        End If
                    Next
                Else
                    For Each item In dctValues
                        strValues += item.Value
                    Next
                End If
                strBuild += "AND TRIM(MHRTTY) IN (" + strValues + ")"
            End If

            If ddlSearchIntStatus.SelectedIndex > 0 Then
                strBuild += " AND TRIM(g.instat) = '" + ddlSearchIntStatus.SelectedItem.Value.Trim() + "'"  'ok
            End If
            If ddlSearchExtStatus.SelectedIndex > 0 Then
                Dim strValues As String = Nothing
                Dim selection As String = ddlSearchExtStatus.SelectedItem.Text.Trim().ToLower()
                prepareExternStatus(selection, strValues)
                'strBuild += " AND TRIM(d.CNT03) IN (" + strValues + ")"
                strBuild += " AND TRIM(MHSTAT) IN (" + strValues + ")"
                'and trim(mhstat) in ('9')
                'list returned in prepareExternal method
            End If
            If Not String.IsNullOrEmpty(txtCustomer.Text.Trim()) Then
                strBuild += " AND TRIM(MHCUNR) = '" + txtCustomer.Text.Trim() + "'"
            End If
            If ddlSearchUser.SelectedIndex > 0 Then
                strBuild += " AND TRIM(CWUSER) = '" + ddlSearchUser.SelectedItem.Text.Trim() + "'"  'ok
            End If
            If ddlSearchReason.SelectedIndex > 0 Then
                strBuild += " AND TRIM(MHREASN) = '" + Trim(ddlSearchReason.SelectedItem.Text.Trim().Split("-")(0)) + "'"
            End If
            If ddlSearchDiagnose.SelectedIndex > 0 Then
                strBuild += " AND TRIM(MHDIAG) = '" + Trim(ddlSearchDiagnose.SelectedItem.Text.Trim().Split("-")(0)) + "'"
            End If
            If ddlVndNo.SelectedIndex > 0 Then
                strBuild += " AND TRIM(CWVENO) = '" + Trim(ddlVndNo.SelectedItem.Value.Trim()) + "'"
            End If
            If ddlLocat.SelectedIndex > 0 Then
                strBuild += " AND TRIM(CWLOCN) = '" + Trim(ddlLocat.SelectedItem.Value.Trim()) + "'"
            End If
            If ddlInitRev.SelectedIndex > 0 Then
                strBuild += "and g.inuser = (select inuser from qs36f.clmintsts where inclno = a.cwwrno and trim(inuser) = '" + Trim(ddlInitRev.SelectedItem.Value.Trim()) + "' and trim(instat) = 'I')"
            End If
            If ddlTechRev.SelectedIndex > 0 Then
                strBuild += "and g.inuser = (select inuser from qs36f.clmintsts where inclno = a.cwwrno and trim(inuser) = '" + Trim(ddlTechRev.SelectedItem.Value.Trim()) + "' and trim(instat) = 'H')"
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try

    End Sub

    Public Sub ClearInputCustom(parent As Control)
        Dim exMessage As String = Nothing
        Try
            For Each ctl As Control In parent.Controls

                If (ctl.Controls.Count > 0) Then
                    ClearInputCustom(ctl)
                Else
                    If TypeOf ctl Is TextBox Then
                        DirectCast(ctl, TextBox).Text = String.Empty
                    End If
                    If TypeOf ctl Is Label Then
                        'DirectCast(ctl, Label).Text = String.Empty
                    End If
                    If TypeOf ctl Is DropDownList Then
                        If (DirectCast(ctl, DropDownList).Enabled Or Not (DirectCast(ctl, DropDownList)).Enabled) Then
                            DirectCast(ctl, DropDownList).ClearSelection()
                        End If
                    End If
                    If TypeOf ctl Is ListBox Then
                        If (DirectCast(ctl, ListBox).Enabled Or Not (DirectCast(ctl, ListBox)).Enabled) Then
                            DirectCast(ctl, ListBox).ClearSelection()
                            DirectCast(ctl, ListBox).Items.Clear()
                        End If
                    End If
                    If TypeOf ctl Is CheckBox Then
                        DirectCast(ctl, CheckBox).Checked = False
                    End If
                End If

            Next
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub updatePagerSettings(grv As GridView)
        Dim exMessage As String = Nothing
        Try

#Region "Need works"

            'Dim amount = DirectCast(Session("PageAmountsDdl"), Integer)
            'Dim strTotal = (DirectCast(Session("ItemCounts"), Integer)).ToString()
            'Dim pIndex = If(Session("PageIndex") IsNot Nothing, DirectCast(Session("PageIndex"), Integer), 1)
            ''Dim strNumberOfPages = DirectCast(Session("PageAmounts"), Integer).ToString()
            'Dim strNumberOfPages = If((DirectCast(Session("PageAmountsDdl"), Integer) * pIndex) > DirectCast(Session("ItemCounts"), Integer), DirectCast(Session("ItemCounts"), Integer).ToString(), (DirectCast(Session("PageAmountsDdl"), Integer) * pIndex).ToString())

            'Session("PageIndex") = If(DirectCast(Session("PageIndex"), Integer) * amount > CInt(strTotal), (CInt(strTotal) / amount), DirectCast(Session("PageIndex"), Integer))
            'Session("currentPage") = (DirectCast(Session("PageIndex"), Integer) * amount) - (amount - 1)

            'Dim strCurrentPage = ((DirectCast(Session("currentPage"), Integer))).ToString()

#End Region

            Dim strTotal = DirectCast(Session("ItemCounts"), String)
            Dim strNumberOfPages = DirectCast(Session("PageAmounts"), String).ToString()
            Dim strCurrentPage = ((DirectCast(Session("currentPage"), Integer))).ToString()

            Dim strGrouping = String.Format("Showing {0} to {1} of {2} entries ", strCurrentPage, strNumberOfPages, strTotal)
            lblGrvGroup.Text = strGrouping

            Dim sortCell As New HtmlTableCell()
            sortCell.Controls.Add(lblGrvGroup)

            Dim row1 As HtmlTableRow = New HtmlTableRow
            row1.Cells.Add(sortCell)
            ndtt.Rows.Add(row1)

            Dim pepe = grv.FooterRow
            Dim ppe = grv.PagerTemplate

            Dim BottomPagerRow = grv.BottomPagerRow
            BottomPagerRow.Cells(0).Controls.AddAt(0, ndtt)

            'For Each item As GridViewRow In grv.Rows
            '    If item.RowType = DataControlRowType.Pager Then
            '        item.Cells(0).Controls.AddAt(0, ndtt)
            '    End If
            'Next

            'e.Row.Cells(0).Controls.AddAt(0, ndtt)
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            'writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, exMessage, "Occurs at time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub clearVndClaimsFields()
        Try
            txtAddVndCommDateInit.Text = Nothing
            txtAddVndCommDateTo.Text = Nothing
            txtAddVndSubject.Text = Nothing
        Catch ex As Exception
            Dim pp = ex.Message
        End Try
    End Sub

    Public Sub clearClaimsFields()
        Try
            txtAddCommDateInit.Text = Nothing
            txtAddCommDateTo.Text = Nothing
            txtAddSubject.Text = Nothing
        Catch ex As Exception
            Dim pp = ex.Message
        End Try
    End Sub

    Public Sub CleanCommentsValues()
        Try
            txtSeeVndComm.Text = String.Empty
            txtWrnNo.Text = String.Empty
            txtRetNo.Text = String.Empty
            hdSeeComments.Value = "0"
            hdSeeVndComments.Value = "0"

            grvSeeComm.DataSource = Nothing
            grvSeeComm.DataBind()
            Session("GridComm") = Nothing

            grvSeeVndComm.DataSource = Nothing
            grvSeeVndComm.DataBind()
            Session("GridVndComm") = Nothing

        Catch ex As Exception
            Dim msg = ex.Message
            Dim pp = msg
        End Try
    End Sub

    Public Sub DoExcel(dtResult As DataTable)
        Dim fileExtension As String = ""
        Dim fileName As String = ""
        Dim exMessage As String = Nothing
        Try
            If dtResult IsNot Nothing Then
                If dtResult.Rows.Count > 0 Then

                    Dim userPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)
                    Dim folderPath As String = userPath & "\claims-doc\"

                    If Not Directory.Exists(folderPath) Then
                        Directory.CreateDirectory(folderPath)
                    End If

                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        fileExtension = objBL.Determine_OfficeVersion()
                        If String.IsNullOrEmpty(fileExtension) Then
                            Exit Sub
                        End If

                        Dim title As String
                        title = "claims_data_Generated_by "
                        fileName = objBL.adjustDatetimeFormat(title, fileExtension)

                    End Using

                    Dim fullPath = folderPath + fileName

                    Using wb As New XLWorkbook()
                        wb.Worksheets.Add(dtResult, "Claims")
                        wb.SaveAs(fullPath)

                        'Response.Clear()
                        'Response.Buffer = True
                        'Response.Charset = ""
                        'Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        'Response.AddHeader("content-disposition", "attachment;filename=SqlExport.xlsx")
                        'Using MyMemoryStream As New MemoryStream()
                        '    wb.SaveAs(MyMemoryStream)
                        '    MyMemoryStream.WriteTo(Response.OutputStream)
                        '    Response.Flush()
                        '    Response.End()
                        'End Using
                    End Using

                    If File.Exists(fullPath) Then
                        'Dim rsConfirm As DialogResult = MessageBox.Show("The file was created successfully in this path " & folderPath & " .Do you want to open the created document location?", "CTP System", MessageBoxButtons.YesNo)
                        'If rsConfirm = DialogResult.Yes Then
                        '    Try
                        '        Process.Start("explorer.exe", folderPath)
                        '    Catch Win32Exception As Win32Exception
                        '        Shell("explorer " & folderPath, AppWinStyle.NormalFocus)
                        '    End Try
                        'End If
                    End If
                End If
            End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, exMessage, "Occurs at time: " + DateTime.Now.ToString())
        End Try
    End Sub

#Region "Imported Method"

    Public Function GetCommDetail1(code As String, ByRef dsResult As DataSet) As Boolean
        Dim result As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim dsGet = New DataSet()
                Dim rsGet = objBL.getClaimsDetByCode(code, dsGet)
                If rsGet > 0 Then
                    If dsGet IsNot Nothing Then
                        If dsGet.Tables(0).Rows.Count > 0 Then
                            dsResult = dsGet
                            result = True
                        Else
                            Return result
                        End If
                    Else
                        Return result
                    End If
                Else
                    Return result
                End If
            End Using
            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function GetCommDetail(code As String, ByRef dsResult As DataSet) As Boolean
        Dim result As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim dsGet = New DataSet()
                Dim rsGet = objBL.getSupplierClaimsDetByCode(code, dsGet)
                If rsGet > 0 Then
                    If dsGet IsNot Nothing Then
                        If dsGet.Tables(0).Rows.Count > 0 Then
                            dsResult = dsGet
                            result = True
                        Else
                            Return result
                        End If
                    Else
                        Return result
                    End If
                Else
                    Return result
                End If
            End Using
            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Function saveComm(strMessage As String, Optional ByRef strMessageOut As String = Nothing) As Boolean
        Dim result As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                BuildDates()
                'Dim datenow = Now().Date().ToString() 'force  yyyy-mm-dd
                'Dim hournow = Now().TimeOfDay().ToString() ' force to hh:nn:ss
                Dim userid = Session("userid").ToString().ToUpper()

                Dim cod_comment = objBL.getmax("QS36F.CLMWCH", "CWCHCO") + 1
                If cod_comment > 0 Then
                    Dim rsIns = objBL.InsertComment(hdSeq.Value.Trim(), cod_comment, datenow, hournow, strMessage, userid, "I")
                    If rsIns > 0 Then
                        Dim cod_detcomment = 1
                        Dim rsInsD = objBL.InsertCommentDetail(hdSeq.Value.Trim(), cod_comment, cod_detcomment, strMessage)
                        If rsInsD > 0 Then
                            result = True
                        Else
                            'error log
                            strMessageOut = "There is an error inserting the comment detail for the warning no: " + hdSeq.Value.Trim() + "."
                            Return result
                        End If
                    Else
                        strMessageOut = "There is an error inserting the comment for the warning no: " + hdSeq.Value.Trim() + "."
                        Return result
                    End If
                Else
                    strMessageOut = "There is an error getting the max value for the warning no: " + hdSeq.Value.Trim() + "."
                    Return result
                End If
            End Using
            Return result
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return result
        End Try
    End Function

    Public Sub cleanCDValues()
        'txtCDPart.Text = ""
        'txtCDMisc.Text = ""
        'txtCDLabor.Text = ""
        'txtCDFreight.Text = ""
    End Sub

    Public Function getuserbranch(Optional ByRef dsResult As DataSet = Nothing) As String
        Dim exMessage As String = Nothing
        dsResult = New DataSet()
        Dim ds1 = New DataSet()
        Dim ds2 = New DataSet()
        Dim result As Integer = -1
        Try
            Dim userid = DirectCast(Session("userid"), String)
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                result = objBL.getuserbranchFirst(userid, ds1)
                If ds1 IsNot Nothing Then
                    If ds1.Tables(0).Rows.Count > 0 Then
                        Dim PEBRCH As String = If(ds1.Tables(0).Rows(0).Item("PEBRCH") IsNot Nothing, ds1.Tables(0).Rows(0).Item("PEBRCH").ToString(), "")
                        If String.IsNullOrEmpty(PEBRCH) Then
                            result = objBL.getuserbranchSecond(userid, ds2)
                            If ds2 IsNot Nothing Then
                                If ds2.Tables(0).Rows.Count > 0 Then
                                    Dim DECODE As String = If(ds2.Tables(0).Rows(0).Item("DECODE") IsNot Nothing, ds2.Tables(0).Rows(0).Item("DECODE").ToString(), "")
                                    If Not String.IsNullOrEmpty(DECODE) Then
                                        Return DECODE
                                    Else
                                        Return "01"
                                    End If
                                End If
                            End If
                        Else
                            Return PEBRCH
                        End If
                    End If
                Else
                    Return "01"
                End If

            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return Nothing
        End Try

    End Function

    Public Function getLimit(Optional ByRef dsResult As DataSet = Nothing) As String
        Dim exMessage As String = Nothing
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim strResult As String = String.Empty
        Try
            Dim userid = DirectCast(Session("userid"), String)
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                result = objBL.getLimit(userid, dsResult)
                If dsResult IsNot Nothing Then
                    If dsResult.Tables(0).Rows.Count > 0 Then
                        Dim CMLimit As String = If(dsResult.Tables(0).Rows(0).Item("CMLIMIT") IsNot Nothing, dsResult.Tables(0).Rows(0).Item("CMLIMIT").ToString(), "")
                        If Not String.IsNullOrEmpty(CMLimit) Then
                            Session("SwLimitAmt") = CInt(CMLimit)
                        Else
                            Session("SwLimitAmt") = 0
                        End If
                    Else
                        Session("SwLimitAmt") = 0
                    End If
                Else
                    Session("SwLimitAmt") = 0
                End If
            End Using
            strResult = DirectCast(Session("SwLimitAmt"), Integer).ToString()
            Return strResult

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return Nothing
        End Try
    End Function

    Public Sub getAutoRestockFlag(Optional ByRef dsResult As DataSet = Nothing)
        Dim exMessage As String = Nothing
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim strResult As String = String.Empty
        Try
            Dim userid = DirectCast(Session("userid"), String)
            Session("AuthReStock") = "NO"
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                result = objBL.getAutoRestockFlag(userid, dsResult)
                If dsResult IsNot Nothing Then
                    If dsResult.Tables(0).Rows.Count > 0 Then

                        Dim AuthRSTOCK As String = If(dsResult.Tables(0).Rows(0).Item("COUNTREC") > 0, Session("AuthReStock") = "YES")
                        If Session("AuthReStock").ToString() = "YES" Then
                            btnUndoRestock.Enabled = True
                            btnRestock.Enabled = True
                        Else
                            btnUndoRestock.Enabled = False
                            btnRestock.Enabled = False
                        End If
                    Else
                        Session("AuthReStock") = "NO"
                    End If
                Else
                    Session("AuthReStock") = "NO"
                End If
            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub setFieldsState(wState As String, nwState As String)
        Try

            If wState = "C" Then
                deactCmd()
                deactTxt()
                deactCmb()

                btnCloseClaim.Enabled = False
                btnCloseClaim.Visible = False
                'btn reopen visible y enable false
            Else
                actCmb()
                actCmd()
                actTxt()

                'btn reopen visible y enable false
            End If
            If nwState = "9" Then
                deactCmd()
                deactTxt()
                deactCmb()

                btnCloseClaim.Enabled = False
                btnCloseClaim.Visible = False
                'btn reopen visible y enable false
            End If

            Dim restockFlag = DirectCast(Session("AuthReStock"), String)
            If restockFlag = "YES" Then
                btnUndoRestock.Enabled = True
                btnRestock.Enabled = True
            Else
                btnUndoRestock.Enabled = False
                btnRestock.Enabled = False
            End If

            'comentado en programa original
            'If nwState = "3" Or nwState = "4" Then
            'Else
            'End If
            'comentado en programa original

            If nwState = "8" Or wState = "R" Then
                deactCmd()
                deactTxt()
                deactCmb()

                'btn reverse visible y enable true
            Else
                'btn reverse visible y enable false
            End If
            If nwState = "F" Then
                'btn ask customer visible y enable false
            End If

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub setInternalStatus(value As String)
        Dim dsResult = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getDataByInternalStsLet(value, dsResult)
                If rs > 0 Then
                    If dsResult IsNot Nothing Then
                        If dsResult.Tables(0).Rows.Count > 0 Then
                            Dim val = dsResult.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim()
                            txtActualStatus.Text = UCase(Left(val, 1)) & LCase(Mid(val, 2))
                            txtActualStatus.Text.ToUpper()
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    'main fill data method
    Public Sub fillClaimData(claimType As String, claimNo As String)
        Dim ds As DataSet = DirectCast(Session("ClaimsBckData"), DataSet)
        Dim dsData As DataSet = New DataSet()
        Dim cwstat As String = Nothing
        Dim mhstat As String = Nothing

        Try
            Dim myitem = ds.Tables(0).AsEnumerable().Where(Function(item) item.Item("MHMRNR").ToString().Equals(claimNo, StringComparison.InvariantCultureIgnoreCase))
            If myitem.Count = 1 Then

                Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                    If myitem(0).Item("MHTDES").ToString().Trim().ToLower().Equals("quality") Then ' warranty claims

                        hdSeq.Value = Trim(myitem(0).Item("CWWRNO").ToString())

                        'GetCurrentIntStatus(hdSeq.Value)

                        Dim dbValue As Double = 0
                        Dim totValue As String = Trim(myitem(0).Item("MHTOMR").ToString())
                        Dim bbValue = Double.TryParse(totValue, dbValue)
                        Dim flag = If(dbValue >= 500, True, False)

                        GetProjectGenData(hdSeq.Value.Trim(), flag)

                        Dim rsResult = objBL.GetWrnClaimsHeader(hdSeq.Value, dsData)
                        If rsResult > 0 Then
                            If dsData IsNot Nothing Then
                                If dsData.Tables(0).Rows.Count > 0 Then
                                    Dim DtEntered = dsData.Tables(0).Rows(0).Item("CWDATE").ToString().Trim()
                                    txtDateEntered.Text = If(Not String.IsNullOrEmpty(DtEntered), DtEntered.Split(" ")(0).ToString(), "")
                                    txtVendorNo.Text = dsData.Tables(0).Rows(0).Item("CWVENO").ToString().Trim()

                                    'vendor name
                                    Dim dsVnd = New DataSet()
                                    GetVendorName(txtVendorNo.Text, dsVnd)

                                    Dim prodCod = dsData.Tables(0).Rows(0).Item("CWPRDC").ToString().Trim()
                                    txtProductionCode.Text = If(String.IsNullOrEmpty(prodCod), "N/R", prodCod.Trim())
                                    hdFlagUploadTxt.Value = ""
                                    txtInvoiceNo.Text = dsData.Tables(0).Rows(0).Item("CWINVC").ToString().Trim()
                                    txtPartNoData.Text = dsData.Tables(0).Rows(0).Item("CWPTNO").ToString().Trim()
                                    txtQty.Text = dsData.Tables(0).Rows(0).Item("CWCQTY").ToString().Trim()
                                    txtUnitCost.Text = dsData.Tables(0).Rows(0).Item("CWUNCS").ToString().Trim()

                                    'get invoice date
                                    getInvoiceDateByNumber(txtInvoiceNo.Text, claimNo)

                                    'GET DATA FOR BAR SEQ, RECEIVING
                                    GetBarSeqNumber(txtPartNoData.Text.Trim(), txtInvoiceNo.Text.Trim(), txtInvoiceDate1.Text.Trim())

                                    'part description
                                    Dim dsPartDesc As DataSet = New DataSet()
                                    GetPartDesc(txtPartNoData.Text, dsPartDesc, "IMDSC")

                                    Dim warrantyState As String = Nothing
                                    Dim nonwarrantyState As String = Nothing
                                    Dim dsNW As DataSet = New DataSet()
                                    Dim docData = dsData.Tables(0).Rows(0).Item("CWDOCN").ToString().Trim()

                                    'non warranty data
                                    GetNWClaimData(docData, nonwarrantyState, dsNW)
                                    If dsNW IsNot Nothing Then
                                        If dsNW.Tables(0).Rows.Count > 0 Then
                                            mhstat = dsNW.Tables(0).Rows(0).Item("MHSTAT").ToString().Trim()
                                            Session("mhstatdata") = mhstat
                                        End If
                                    End If


                                    warrantyState = dsData.Tables(0).Rows(0).Item("CWSTAT").ToString().Trim()
                                    cwstat = warrantyState
                                    setFieldsState(warrantyState, nonwarrantyState) 'set fields 

                                    txtEnteredBy.Text = dsData.Tables(0).Rows(0).Item("CWUSER").ToString().Trim()
                                    Dim strVal = dsData.Tables(0).Rows(0).Item("CWRPTA").ToString().Trim()
                                    Dim strArea = If(strVal = "S", "SALES DEPT.", If(strVal = "R", "REC. DEPT.", If(strVal = "W", "WARE. DEPT.", "N/A")))
                                    txtEnteredFrom.Text = strArea
                                    txtModel.Text = dsData.Tables(0).Rows(0).Item("CWMACH").ToString().Trim()
                                    txtSerial.Text = dsData.Tables(0).Rows(0).Item("CWSER#").ToString().Trim()
                                    txtArrangement.Text = dsData.Tables(0).Rows(0).Item("CWARRG").ToString().Trim()
                                    txtHWorked.Text = dsData.Tables(0).Rows(0).Item("CWHOUR").ToString().Trim()

                                    Dim InstDate = dsData.Tables(0).Rows(0).Item("CWINSD").ToString().Trim()
                                    txtInstDate.Text = If(Not String.IsNullOrEmpty(InstDate), InstDate.Split(" ")(0).ToString(), "")

                                    Dim comment1 = dsData.Tables(0).Rows(0).Item("CWCOM1").ToString().Trim()
                                    Dim comment2 = dsData.Tables(0).Rows(0).Item("CWCOM2").ToString().Trim()
                                    Dim comment3 = dsData.Tables(0).Rows(0).Item("CWCOM3").ToString().Trim()
                                    hdComments.Value = comment1 + "." + comment2 + "." + comment3

                                    If Not String.IsNullOrEmpty(comment1) Then
                                        txtCustStatement.Text = comment1 + " " + comment2 + " " + comment3
                                    End If

                                    Dim docNo = dsData.Tables(0).Rows(0).Item("CWDOCN").ToString().Trim()
                                    'has document validation to fill data
                                    If docNo <> "0" Then
                                        txtClaimNoData.Text = dsNW.Tables(0).Rows(0).Item("MHMRNR").ToString().Trim()
                                        txtCustomerData.Text = dsNW.Tables(0).Rows(0).Item("MHCUNR").ToString().Trim()
                                        txtClaimStatus.Text = ""
                                        hdmhstde.Value = ""
                                        hdFlagUpload.Value = ""

                                        'FixImages(docNo)
                                        'test purpose
                                        'FixImages("26456")
                                        FixImages(hdSeq.Value.Trim())
                                        FixImagesOEM(txtPartNoData.Text.Trim())
                                        FixImagesCTP(txtPartNoData.Text.Trim())

                                        'external status - claim status
                                        Dim dsStatus = New DataSet()
                                        GetClaimExternalStatus(nonwarrantyState, dsStatus)
                                        hdFlagUploadTxt.Value = hdFlagUpload.Value
                                        'claim type
                                        GetClaimType(dsNW, dsStatus)
                                        'reason
                                        GetClaimReason(dsNW)
                                        'internal status - actual status
                                        GetActualStatus(dsData)
                                        'diagnose
                                        GetClaimDiagnose(dsNW)
                                        'diagnose dropdownlist
                                        LoadDDLDiagnose(dsNW)
                                        'customer name
                                        GetCustomerName(dsNW)
                                        'diagnose dropdownlist
                                        LoadDDLLocation(dsData)

                                        Dim strExcMessage As String = Nothing
                                        GetSupplierInvoiceAndDate(txtVendorNo.Text, docData, strExcMessage)

                                        If String.IsNullOrEmpty(hdFlagUpload.Value.Trim()) Then
                                            deactCmd()
                                            deactTxt()
                                            deactCmb()
                                        End If
                                    Else
                                        txtClaimNoData.Text = "0"
                                        txtCustomerData.Text = "0"
                                        txtCustomerName.Text = ""
                                        txtClaimStatus.Text = ""
                                        txtClaimType.Text = ""
                                        txtClaimReason.Text = ""
                                        txtActualStatus.Text = ""
                                    End If

                                    If Not String.IsNullOrEmpty(dsData.Tables(0).Rows(0).Item("CWCNTC").ToString().Trim()) Then
                                        txtContactName.Text = dsData.Tables(0).Rows(0).Item("CWCNTC").ToString().Trim()
                                    Else
                                        txtContactName.Text = ""
                                    End If

                                    If Not String.IsNullOrEmpty(dsData.Tables(0).Rows(0).Item("CWCNPH").ToString().Trim()) Then
                                        txtContactPhone.Text = dsData.Tables(0).Rows(0).Item("CWCNPH").ToString().Trim()
                                    Else
                                        txtContactPhone.Text = ""
                                    End If

                                    If Not String.IsNullOrEmpty(dsData.Tables(0).Rows(0).Item("CWCNEM").ToString().Trim()) Then
                                        txtContactEmail.Text = dsData.Tables(0).Rows(0).Item("CWCNEM").ToString().Trim()
                                    Else
                                        txtContactEmail.Text = ""
                                    End If

                                    'folder path review what is?????

                                    Dim intValue = hdSeq.Value ' the warranty claim id

                                    GetInternalStatus(intValue)

                                    chkQuarantine.Checked = False
                                    chkQuarantine.Enabled = True
                                    txtQuarantine.Text = ""
                                    'txtQuarantineDate.Text = Now.AddYears(-1000).ToShortDateString().Split(" ")(0).ToString()
                                    txtQuarantineDate.Text = ""

                                    'GetDataOver500()

                                    GetQuarantineReq(intValue)
                                    'GetCostSuggested(intValue)
                                    GetEngineInformation(intValue)
                                    'GetAuthForSalesOver500(intValue)
                                    GetClaimApproved(intValue)
                                    GetLoadNewComments(intValue)
                                    'Dim strText As String = Nothing
                                    'GetPartialCreditValue(intValue, strText)

                                    'If Not String.IsNullOrEmpty(strText) Then
                                    '    txtParts.Text = "0"
                                    '    txtCDFreight.Text = "0"
                                    '    txtCDLabor.Text = "0"
                                    '    txtCDMisc.Text = "0"
                                    '    txtCDPart.Text = "0"
                                    '    txtConsDamageTotal.Text = "0"
                                    'End If

                                    'GetPartImage(txtPartNoData.Text)
                                    Dim dsDesc = New DataSet()
                                    GetPartDesc(txtPartNoData.Text, dsDesc)
                                    If dsDesc IsNot Nothing Then
                                        If dsDesc.Tables(0).Rows.Count > 0 Then
                                            Dim description = dsDesc.Tables(0).Rows(0).Item("IMDSC").ToString().Trim()
                                            'Dim description2 = dsDesc.Tables(0).Rows(0).Item("IMDS2").ToString().Trim()
                                            'Dim description3 = dsDesc.Tables(0).Rows(0).Item("IMDS3").ToString().Trim()
                                            'Dim allDescriptions = description + ". " + description2 + ". " + description3 + "."
                                            txtPartDesc.Text = description
                                            txtPartDesc1.Text = txtPartNoData.Text.ToUpper() + " - " + description.ToUpper()
                                        End If
                                        'txtPartDesc.Height = imgPart.Height
                                    End If

#Region "Get Generic Values for Claim"

                                    Dim strMess1 As String = Nothing
                                    Dim strMess2 As String = Nothing
                                    Dim strMess3 As String = Nothing
                                    GetUserAndLimitForCMGeneration(strMess1)
                                    GetGeneralValues(intValue, strMess2, 0, 0, 0, 0, 0, 0, True)
                                    GetEmailAndUserAuthApp500To1500(strMess3)

#End Region

#Region "Set the authorization data entry fields"

                                    Dim lstAuth = DirectCast(Session("LstObj500to1500"), List(Of ClaimObj500To1500User))
                                    Dim aa = lstAuth.AsEnumerable().Any(Function(a) Trim(a.CLMuser.ToLower()).Equals(Session("userid").ToString().ToLower()))

                                    If lstAuth.AsEnumerable().Any(Function(a) Trim(a.CLMuser.ToLower()).Equals(Session("userid").ToString().ToLower())) Or Session("userid").ToString().ToUpper() = UCase(hdCLMuser.Value) Then

                                        GetAuthForSalesOver500(hdSeq.Value.Trim())

                                        'txtClaimAuthDate.Text = Now.AddDays(-1021).ToShortDateString()  ??
                                    Else
                                        txtAmountApproved.Text = ""
                                        txtAmountApproved.Enabled = False
                                        chkClaimAuth.Enabled = False
                                        chkClaimAuth.Checked = False
                                        txtClaimAuth.Text = ""
                                        txtClaimAuth.Enabled = False
                                        txtClaimAuthDate.Text = ""
                                        txtClaimAuthDate.Enabled = False
                                    End If

#End Region

                                    'clean the grid for details
                                    Session("GridVndComm") = Nothing
                                    grvSeeVndComm.DataSource = Nothing
                                    grvSeeVndComm.DataBind()

#Region "CM Already did"

                                    Dim dbParts = If(String.IsNullOrEmpty(txtParts.Text.Trim()), 0, Double.Parse(txtParts.Text.Trim()))
                                    Dim blResult = CheckIfCMGeneretad(claimNo, txtCustomerData.Text.Trim(), dbParts)
                                    'If mhstat.Trim().Equals("7") And blResult Then
                                    hdCanClose.Value = If(blResult.Equals(True), "1", "0")
                                    'End If
                                    Session("GoClose") = blResult ' if true should can close if not, auth no yet can not close
                                    chkCanClose.Checked = blResult

#End Region

#Region "Fill Objects"

                                    'fillExtObj()

                                    fillObjsFull()

#End Region

#Region "Get Claim Approval Status"

                                    Dim revRej As Boolean = False
                                    Dim bresult = ClaimReadyToReopen(revRej)
                                    Session("RdyToReOpen") = bresult
                                    Dim blCheck = If(String.IsNullOrEmpty(Session("mhstatdata").ToString().Trim()), False, If(Session("mhstatdata").ToString().Trim().Equals("8"), True, False))
                                    hdForceCloseBtn.Value = If(bresult And Not blCheck, 0, If(Not bresult And blCheck, 0, If(Not bresult And Not blCheck, 1, 0)))
                                    If bresult And Not revRej Then
                                        hdIsReopen.Value = "1"
                                    Else
                                        hdIsReopen.Value = "0"
                                        'If(String.IsNullOrEmpty(Session("mhstatdata").ToString().Trim()), "", If(Session("mhstatdata").ToString().Trim().Equals("8"), "0", ""))
                                    End If

#End Region

                                Else
                                    'error looking for warranty claims
                                End If
                            Else
                                'error looking for vendor
                            End If
                        Else
                            'error loading data for warranty claims
                        End If
                    Else ' non-warranty claims

                        'txtClaimNoData.Text = Trim(myitem(0).Item("MHMRNR").ToString())
                        'Dim nonwarrantyState As String = Nothing
                        'Dim dsNW As DataSet = New DataSet()
                        'GetNWClaimData(txtClaimNoData.Text, nonwarrantyState, dsNW)

                        'Dim DtEntered = dsNW.Tables(0).Rows(0).Item("MHMRDT").ToString().Trim()
                        'txtDateEntered.Text = If(Not String.IsNullOrEmpty(DtEntered), DtEntered.Split(" ")(0).ToString(), "")
                        'txtCustomerData.Text = dsNW.Tables(0).Rows(0).Item("MHCUNR").ToString().Trim()

                        'GetNWClaimDetail(txtClaimNoData.Text, dsNW)

                        'setFieldsState(warrantyState, nonwarrantyState)

                    End If

                End Using
            Else
                'no data for current claimNo
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function fillExtObj(ds As DataSet) As List(Of ExtClaimObj)
        Dim dt As DataTable = New DataTable()
        Try

            Dim xExtClaimObj = New ExtClaimObj()
            If ds IsNot Nothing Then
                If ds.Tables(0).Rows.Count > 0 Then
                    dt = ds.Tables(0)
                End If
            End If

            Dim items As IList(Of ExtClaimObj) = dt.AsEnumerable() _
                .Select(Function(row) New ExtClaimObj() With {
                .ClaimNo = row.Item("MHMRNR").ToString(),
                .Customer = row.Item("MHCUNR").ToString(),
                .CustomerName = row.Item("MHCUNA").ToString(),
                .PartNo = row.Item("MHPTNR").ToString()
            }).ToList()

            Return items

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return Nothing
        End Try

    End Function

    'fill objects data
    Public Sub fillObjsFull()
        Try

#Region "Object Declaration"

            Dim cData As ClaimsData = New ClaimsData()
            Dim cCustInfo As ClaimsCustomerInfo = New ClaimsCustomerInfo()

            Dim cInfo As ClaimInformation = New ClaimInformation()
            Dim cEngine As InfoEngine = New InfoEngine()
            Dim cEquipment As InfoEquipment = New InfoEquipment()
            cInfo.EngineInfoObj = cEngine
            cInfo.EquipmentInfoObj = cEquipment

            Dim cDepartment = New ClaimDepartment()
            Dim cSalesDpto = New ClaimSales()

            Dim cStatus = New ClaimStatus()
            Dim cInternalSt = New InternalStatus()
            Dim cExternalSt = New ExternalStatus()
            cStatus.InternalStatusObj = cInternalSt
            cStatus.ExternalStatusObj = cExternalSt

            Dim cExtras = New ClaimExtras()

            Dim cEmailObj = New ClaimEmailObj()

            Dim cGeneral As ClaimObj = New ClaimObj()
            cGeneral.ClaimDataObj = cData
            cGeneral.CustInfoObj = cCustInfo
            cGeneral.ClaimInfoObj = cInfo
            cGeneral.ClaimDptoObj = cDepartment
            cGeneral.ClaimSalesObj = cSalesDpto
            cGeneral.ClaimStatusObj = cStatus
            cGeneral.ClaimExtrasObj = cExtras

#End Region

            cGeneral.ClaimDataObj.ClaimNo = txtClaimNoData.Text.Trim()
            cGeneral.ClaimDataObj.WarningNo = hdSeq.Value.Trim()
            cGeneral.ClaimDataObj.ClaimType = txtClaimType.Text.Trim()
            cGeneral.ClaimDataObj.ClaimPartNo = txtPartNoData.Text.Trim()
            cGeneral.ClaimDataObj.ClaimPartDesc = txtPartDescription.Text.Trim()
            cGeneral.ClaimDataObj.ClaimEnteredBy = txtEnteredBy.Text.Trim()
            cGeneral.ClaimDataObj.ClaimDateEntered = txtDateEntered.Text.Trim()
            cGeneral.ClaimDataObj.ClaimQty = txtQty.Text.Trim()
            cGeneral.ClaimDataObj.ClaimUnitCost = txtUnitCost.Text.Trim()
            cGeneral.ClaimDataObj.ClaimInvoiceNo = txtInvoiceNo.Text.Trim()
            cGeneral.ClaimDataObj.ClaimInvoiceDate = txtInvoiceDate.Text.Trim()
            cGeneral.ClaimDataObj.ClaimEnteredFrom = txtEnteredFrom.Text.Trim()
            cGeneral.ClaimDataObj.ClaimLocation = ddlLocation.SelectedItem.Text.Trim()
            cGeneral.ClaimDataObj.ClaimInstallationDate = txtInstDate.Text.Trim()
            cGeneral.ClaimDataObj.ClaimHoursWorked = txtHWorked.Text.Trim()
            cGeneral.ClaimDataObj.ClaimCustStatement = txtCustStatement.Text.Trim()

            cGeneral.CustInfoObj.CustNo = txtCustomerData.Text.Trim()
            cGeneral.CustInfoObj.CustName = txtCustomerName.Text.Trim()
            cGeneral.CustInfoObj.ContName = txtContactName.Text.Trim()
            cGeneral.CustInfoObj.ContPhone = txtContactPhone.Text.Trim()
            cGeneral.CustInfoObj.ContEmail = txtContactEmail.Text.Trim()

            cGeneral.ClaimInfoObj.EquipmentInfoObj.EquipmentModel = txtModel.Text.Trim()
            cGeneral.ClaimInfoObj.EquipmentInfoObj.EquipmentSerial = txtSerial.Text.Trim()
            cGeneral.ClaimInfoObj.EquipmentInfoObj.EquipmentArrangement = txtArrangement.Text.Trim()

            cGeneral.ClaimInfoObj.EngineInfoObj.EngineModel = txtModel1.Text.Trim()
            cGeneral.ClaimInfoObj.EngineInfoObj.EngineSerial = txtSerial1.Text.Trim()
            cGeneral.ClaimInfoObj.EngineInfoObj.EngineArrangement = txtArrangement1.Text.Trim()

            cGeneral.ClaimDptoObj.ClaimQuarantineReq = chkQuarantine.Checked
            cGeneral.ClaimDptoObj.ClaimDiagnose = txtDiagnoseData.Text.Trim()
            cGeneral.ClaimDptoObj.ClaimReason = txtClaimReason.Text.Trim()
            cGeneral.ClaimDptoObj.ClaimProdCode = txtProductionCode.Text.Trim()
            cGeneral.ClaimDptoObj.ClaimVendorNo = txtVendorNo.Text.Trim()
            cGeneral.ClaimDptoObj.ClaimVendorName = txtVendorName.Text.Trim()
            cGeneral.ClaimDptoObj.BarSequence = txtBarSeq.Text.Trim()
            cGeneral.ClaimDptoObj.Receiving = txtReceiving.Text.Trim()

            cGeneral.ClaimSalesObj.ClaimAuthFlag = chkClaimAuth.Checked
            cGeneral.ClaimSalesObj.ClaimAuthDate = txtClaimAuthDate.Text.Trim()
            cGeneral.ClaimSalesObj.ClaimAuthAmount = txtClaimAuth.Text.Trim()
            cGeneral.ClaimSalesObj.ClaimAmountApproved = txtAmountApproved.Text.Trim()

            cGeneral.ClaimStatusObj.ExternalStatusObj.ClaimStatus = txtClaimStatus.Text.Trim()
            cGeneral.ClaimStatusObj.ExternalStatusObj.ClaimTotalAmountApp = txtTotalAmount.Text.Trim()

            cGeneral.ClaimStatusObj.InternalStatusObj.ClaimInitialReview = chkInitialReview.Checked
            cGeneral.ClaimStatusObj.InternalStatusObj.InitialReviewUser = txtInitialReview.Text.Trim()
            cGeneral.ClaimStatusObj.InternalStatusObj.InitialReviewDate = txtInitialReviewDate.Text.Trim()

            cGeneral.ClaimStatusObj.InternalStatusObj.ClaimAcknowledgeEmail = chkAcknowledgeEmail.Checked
            cGeneral.ClaimStatusObj.InternalStatusObj.AcknowledgeEmailUser = txtAcknowledgeEmail.Text.Trim()
            cGeneral.ClaimStatusObj.InternalStatusObj.AcknowledgeEmailDate = txtAcknowledgeEmailDate.Text.Trim()

            cGeneral.ClaimStatusObj.InternalStatusObj.ClaimInfoRequestedFlag = chkInfoCust.Checked
            cGeneral.ClaimStatusObj.InternalStatusObj.InfoRequestedUser = txtInfoCust.Text.Trim()
            cGeneral.ClaimStatusObj.InternalStatusObj.InfoRequestedDate = txtInfoCustDate.Text.Trim()

            cGeneral.ClaimStatusObj.InternalStatusObj.ClaimPartRequestedFlag = chkPartRequested.Checked
            cGeneral.ClaimStatusObj.InternalStatusObj.PartRequestedUser = txtPartRequested.Text.Trim()
            cGeneral.ClaimStatusObj.InternalStatusObj.PartRequestedDateDate = txtPartRequestedDate.Text.Trim()

            cGeneral.ClaimStatusObj.InternalStatusObj.ClaimPartReceivedFlag = chkPartReceived.Checked
            cGeneral.ClaimStatusObj.InternalStatusObj.PartReceivedUserUser = txtPartReceived.Text.Trim()
            cGeneral.ClaimStatusObj.InternalStatusObj.PartReceivedDate = txtPartReceivedDate.Text.Trim()

            cGeneral.ClaimStatusObj.InternalStatusObj.ClaimTechnicalReviewFlag = chkTechReview.Checked
            cGeneral.ClaimStatusObj.InternalStatusObj.TechnicalReviewUser = txtTechReview.Text.Trim()
            cGeneral.ClaimStatusObj.InternalStatusObj.TechnicalReviewDate = txtTechReviewDate.Text.Trim()

            cGeneral.ClaimStatusObj.InternalStatusObj.ClaimWaitingSupplierFlag = chkWaitSupReview.Checked
            cGeneral.ClaimStatusObj.InternalStatusObj.WaitingSupplierUser = txtWaitSupReview.Text.Trim()
            cGeneral.ClaimStatusObj.InternalStatusObj.WaitingSupplierDate = txtWaitSupReviewDate.Text.Trim()

            cGeneral.ClaimStatusObj.InternalStatusObj.ClaimCompletedFlag = chkClaimCompleted.Checked
            cGeneral.ClaimStatusObj.InternalStatusObj.CompletedUser = txtClaimCompleted.Text.Trim()
            cGeneral.ClaimStatusObj.InternalStatusObj.CompletedDate = txtClaimCompletedDate.Text.Trim()

            cGeneral.ClaimExtrasObj.TotalFreight = txtFreight.Text.Trim()
            cGeneral.ClaimExtrasObj.TotalParts = txtParts.Text.Trim()
            cGeneral.ClaimExtrasObj.ConsDamfreight = txtCDFreight.Text.Trim()
            cGeneral.ClaimExtrasObj.ConsDamLabor = txtCDLabor.Text.Trim()
            cGeneral.ClaimExtrasObj.ConsDamMisc = txtCDMisc.Text.Trim()
            cGeneral.ClaimExtrasObj.ConsDamParts = txtCDPart.Text.Trim()
            cGeneral.ClaimExtrasObj.FullConsDamValue = txtConsDamageTotal.Text.Trim()
            cGeneral.ClaimExtrasObj.CanClose = If(String.IsNullOrEmpty(Session("GoClose").ToString().Trim()), False, If(Session("GoClose").ToString().Trim().ToLower().Equals("false"), False, True))

#Region "Fill Email Obj"

            cEmailObj.ClaimNo = txtClaimNoData.Text.Trim()
            cEmailObj.Customer = txtCustomerData.Text.Trim()
            cEmailObj.PartNo = txtPartNoData.Text.Trim()
            cEmailObj.Invoice = txtInvoiceNo.Text.Trim()
            cEmailObj.TotalApproved = txtTotValue.Text.Trim()
            cEmailObj.TotalParts = txtParts.Text.Trim()
            cEmailObj.TotalFreight = txtFreight.Text.Trim()
            cEmailObj.AdditionalCost = txtAmountApproved.Text.Trim()
            cEmailObj.ApprovedBy = Session("userid").ToString().Trim()
            cEmailObj.ConsequentalDamage = txtConsDamageTotal.Text.Trim()
            cEmailObj.Description = txtCustStatement.Text.Trim()
            cEmailObj.EmailTo = ""

#End Region

            Session("emailObj") = cEmailObj
            Session("fullObj") = cGeneral
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

#Region "Comments functions"

    Public Function getFlagStatus() As String
        Try
            Dim FlagIE = If(rdAddIntComm.Checked, "I", "E")
            Return FlagIE
        Catch ex As Exception

        End Try
    End Function

    Public Sub fnAddComments()  ' aqui estoy revisando el funcionamiento
        Dim codComment As Integer = 0
        Dim codDetComment As Integer = 1
        'Dim lstComments As List(Of String) = New List(Of String)()
        Try

            Dim FlagIE = getFlagStatus()
            'lstComments = DirectCast(Session("LstMessages"), List(Of String))

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                If Not String.IsNullOrEmpty(txtAddWrnNo.Text) Then
                    If Not String.IsNullOrEmpty(txtAddSubject.Text) Then
                        codComment = objBL.getmax("QS36F.CLMWCH", "CWCHCO") + 1
                        Dim rsIns = objBL.InsertComment(txtAddWrnNo.Text, codComment.ToString(), Now().ToString().Split(" ")(0), Now().ToString().Split(" ")(1), txtAddSubject.Text, Session("userid").ToString().ToUpper(), FlagIE)
                        If rsIns > 0 Then

                            'For Each li As String In lstComments
                            Dim rsIns1 = objBL.InsertCommentDetailwPart(txtAddWrnNo.Text, codComment.ToString(), codDetComment.ToString(), txtMessage.Text.ToString(), txtPartNoData.Text.Trim())
                            If rsIns1 > 0 Then
                                codDetComment = codDetComment + 1
                                txtMessage.Text = Nothing
                            End If
                            'Next

                        End If
                    End If
                End If
            End Using
            clearClaimsFields()
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub fnAddVndComments()
        Dim codComment As Integer = 0
        Dim codDetComment As Integer = 1
        Dim lstComments As List(Of String) = New List(Of String)()
        Try
            Dim FlagIE = getFlagStatus()
            lstComments = DirectCast(Session("LstMessages"), List(Of String))

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                If Not String.IsNullOrEmpty(txtAddClaimNo.Text) Then
                    If Not String.IsNullOrEmpty(txtAddVndSubject.Text) Then
                        codComment = objBL.getmax("QS36F.CLMCMT", "CCCODE") + 1
                        Dim rsIns = objBL.InsertSuppClaimCommHeader(txtAddClaimNo.Text, codComment.ToString(), Now().ToString().Split(" ")(0), txtAddVndSubject.Text, Now().ToString().Split(" ")(1), Session("userid").ToString().ToUpper())
                        If rsIns > 0 Then

                            For Each li As String In lstComments
                                Dim rsIns1 = objBL.InsertSuppClaimCommDetail1(txtAddClaimNo.Text, codComment.ToString(), codDetComment.ToString(), li.ToString())
                                If rsIns1 > 0 Then
                                    codDetComment = codDetComment + 1
                                End If
                            Next

                        End If
                    End If
                End If
            End Using
            clearClaimsFields()

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function WillReopen(ds As DataSet) As Integer
        Dim rs As Integer = -1
        Dim strResult As String = String.Empty
        Try
            Dim dsCount = ds.Tables(0).Rows.Count
            If dsCount > 1 Then

                strResult = If(ds.Tables(0).Rows(0).Item("CWCHSU").ToString().Trim().ToLower().Contains("reopen") Or
                                ds.Tables(0).Rows(1).Item("CWCHSU").ToString().Trim().ToLower().Contains("reopen"),
                                ds.Tables(0).Rows(0).Item("CWCHSU").ToString().Trim() + "," + ds.Tables(0).Rows(1).Item("CWCHSU").ToString().Trim(), "")
                Session("lastComm") = strResult
            End If

            rs = If(String.IsNullOrEmpty(strResult.Trim()), 1, 0)
            Return rs
        Catch ex As Exception
            Return rs
        End Try
    End Function

    Public Sub fnSeeComments()
        Try
            txtRetNo.Text = txtClaimNoData.Text.Trim()
            txtWrnNo.Text = hdSeq.Value.Trim()

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim dsGet As DataSet = New DataSet()
                Dim rsGet = objBL.getClaimsByCode(txtWrnNo.Text, dsGet)
                If rsGet > 0 Then
                    If dsGet IsNot Nothing Then
                        If dsGet.Tables(0).Rows.Count > 0 Then
                            hdLastCommentValue.Value = WillReopen(dsGet)
                            Session("GridComm") = dsGet
                            grvSeeComm.DataSource = dsGet
                            grvSeeComm.DataBind()
                        End If
                    End If
                End If
            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub fnSeeVndComments()

        Try
            txtSeeVndComm.Text = hdVendorClaimNo.Value
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim dsGet As DataSet = New DataSet()
                Dim rsGet = objBL.getSupplierClaimsByCode(txtSeeVndComm.Text, dsGet)
                If rsGet > 0 Then
                    If dsGet IsNot Nothing Then
                        If dsGet.Tables(0).Rows.Count > 0 Then
                            Session("GridVndComm") = dsGet
                            grvSeeVndComm.DataSource = dsGet
                            grvSeeVndComm.DataBind()
                        End If
                    End If
                End If
            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

#End Region

#Region "Auxiliar Methods"


    Public Sub MassiveInternalUpdate(wrnNo As String, value As String, ByRef strMessage As String, Optional ByRef doStop As Boolean = False)
        Dim dsResult As DataSet = New DataSet()
        Dim values = ConfigurationManager.AppSettings("internalStatuses")
        Dim dct As Dictionary(Of String, String) = New Dictionary(Of String, String)()
        Dim strStatus As String = Nothing
        Dim strTextStatus As String = Nothing
        Dim dctProc As Dictionary(Of String, String) = New Dictionary(Of String, String)()
        Dim strMessageOut As String = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Select Case value
                    Case "1"
                        If String.IsNullOrEmpty(txtInitialReview.Text) And chkInitialReview.Checked Then
                            UpdateInternalStatusGeneric(txtInitialReview, txtInitialReviewDate, chkInitialReview, lnkInitialReview, False)
                            InitialStatusProcess(wrnNo, strMessageOut)
                        ElseIf Not String.IsNullOrEmpty(txtInitialReview.Text) Then
                        Else
                            strMessage = "In order to update the Acknowledge Email Status, the Initial Review Status must have been selected."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        AcknowledgeEmailProcess(wrnNo, strMessageOut)
                    Case "2"
                        If String.IsNullOrEmpty(txtAcknowledgeEmail.Text) And Not chkAcknowledgeEmail.Checked Then
                            strMessage = "In order to update the Info Cust Status, the Acknowledge Email must have been selected."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        InfoRequestedProcess(wrnNo, strMessageOut)
                    Case "3"
                        If String.IsNullOrEmpty(txtAcknowledgeEmail.Text) And Not chkAcknowledgeEmail.Checked Then
                            strMessage = "In order to update the Part Requested Status, the Acknowledge Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtInfoCust.Text) And Not chkInfoCust.Checked Then
                            strMessage = "In order to update the Part Requested Status, the Info Cust Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        PartRequestedProcess(wrnNo, strMessageOut)
                    Case "4"
                        If String.IsNullOrEmpty(txtAcknowledgeEmail.Text) And Not chkAcknowledgeEmail.Checked Then
                            strMessage = "In order to update the Part Received Status, the Acknowledge Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtInfoCust.Text) And Not chkInfoCust.Checked Then
                            strMessage = "In order to update the Part Received Status, the Info Cust Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtPartRequested.Text) And chkPartRequested.Checked Then
                            UpdateInternalStatusGeneric(txtPartRequested, txtPartRequestedDate, chkPartRequested, lnkPartRequested, False)
                            PartRequestedProcess(wrnNo, strMessageOut)
                        End If
                        PartReceivedProcess(wrnNo, strMessageOut)
                    Case "5"
                        If String.IsNullOrEmpty(txtAcknowledgeEmail.Text) And Not chkAcknowledgeEmail.Checked Then
                            strMessage = "In order to update the Technical Review Status, the Acknowledge Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtInfoCust.Text) And Not chkInfoCust.Checked Then
                            strMessage = "In order to update the Technical Review Status, the Info Cust Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtPartRequested.Text) And chkPartRequested.Checked Then
                            UpdateInternalStatusGeneric(txtPartRequested, txtPartRequestedDate, chkPartRequested, lnkPartRequested, False)
                            PartRequestedProcess(wrnNo, strMessageOut)
                        End If
                        If String.IsNullOrEmpty(txtPartReceived.Text) And chkPartReceived.Checked Then
                            UpdateInternalStatusGeneric(txtPartReceived, txtPartReceivedDate, chkPartReceived, lnkPartReceived, False)
                            PartReceivedProcess(wrnNo, strMessageOut)
                        End If
                        TechReviewProcess(wrnNo, strMessageOut)
                    Case "6"
                        If String.IsNullOrEmpty(txtAcknowledgeEmail.Text) And Not chkAcknowledgeEmail.Checked Then
                            strMessage = "In order to update the Waiting for supplier Status, the Acknowledge Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtInfoCust.Text) And Not chkInfoCust.Checked Then
                            strMessage = "In order to update the Waiting for supplier Status, the Info Cust Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtPartRequested.Text) And chkPartRequested.Checked Then
                            UpdateInternalStatusGeneric(txtPartRequested, txtPartRequestedDate, chkPartRequested, lnkPartRequested, False)
                            PartRequestedProcess(wrnNo, strMessageOut)
                        End If
                        If String.IsNullOrEmpty(txtPartReceived.Text) And chkPartReceived.Checked Then
                            UpdateInternalStatusGeneric(txtPartReceived, txtPartReceivedDate, chkPartReceived, lnkPartReceived, False)
                            PartReceivedProcess(wrnNo, strMessageOut)
                        End If
                        If String.IsNullOrEmpty(txtTechReview.Text) And chkTechReview.Checked Then
                            UpdateInternalStatusGeneric(txtTechReview, txtTechReviewDate, chkTechReview, lnkTechReview, False)
                            TechReviewProcess(wrnNo, strMessageOut)
                        End If
                        WaitingSupplierProcess(wrnNo, strMessageOut)
                    Case Else
                        If String.IsNullOrEmpty(txtAcknowledgeEmail.Text) And Not chkAcknowledgeEmail.Checked Then
                            strMessage = "In order to update the selected Status, the Acknowledge Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtInfoCust.Text) And Not chkInfoCust.Checked Then
                            strMessage = "In order to update the selected Status, the Info Cust Email must have been sent."
                            doStop = True
                            SendMessage(strMessage, messageType.info)
                            Exit Sub
                        End If
                        If String.IsNullOrEmpty(txtPartRequested.Text) And chkPartRequested.Checked Then
                            UpdateInternalStatusGeneric(txtPartRequested, txtPartRequestedDate, chkPartRequested, lnkPartRequested, False)
                            PartRequestedProcess(wrnNo, strMessageOut)
                        End If
                        If String.IsNullOrEmpty(txtPartReceived.Text) And chkPartReceived.Checked Then
                            UpdateInternalStatusGeneric(txtPartReceived, txtPartReceivedDate, chkPartReceived, lnkPartReceived, False)
                            PartReceivedProcess(wrnNo, strMessageOut)
                        End If
                        If String.IsNullOrEmpty(txtTechReview.Text) And chkTechReview.Checked Then
                            UpdateInternalStatusGeneric(txtTechReview, txtTechReviewDate, chkTechReview, lnkTechReview, False)
                            TechReviewProcess(wrnNo, strMessageOut)
                        End If
                        If String.IsNullOrEmpty(txtWaitSupReview.Text) And chkWaitSupReview.Checked Then
                            UpdateInternalStatusGeneric(txtWaitSupReview, txtWaitSupReviewDate, chkWaitSupReview, lnkWaitSupReview, False)
                            WaitingSupplierProcess(wrnNo, strMessageOut)
                        End If
                End Select

                strMessage = strMessageOut

                'Dim rsResult = objBL.getEngineInfo(wrnNo, dsResult)
                'If rsResult > 0 And dsResult IsNot Nothing Then
                '    If dsResult.Tables(0).Rows.Count > 0 Then
                '        createDctFromConfig(values, dct)
                '        For Each dw As DataRow In dsResult.Tables(0).Rows
                '            Dim qq = dct.AsEnumerable().Where(Function(a) a.Key.Equals(dw.Item("INSTAT").ToString().Trim()))
                '            If qq.Count > 0 Then
                '                dctProc.Add(qq(0).Key, qq(0).Value)
                '            End If
                '        Next
                '    End If
                'End If


                'If dctProc IsNot Nothing Then
                '    'grvClaimReport.DataSource = dt.AsEnumerable().OrderByDescending(Function(o) CInt(o.Item(field).ToString())).CopyToDataTable()
                '    Dim qty = dctProc.AsEnumerable().OrderByDescending(Function(e) CInt(e.Value.ToString()))
                '    Dim p1 = "aa"
                '    Dim p2 = "11"
                'End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function GetCurrentIntStatus(wrnNo As String) As String
        Dim dsResult As DataSet = New DataSet()
        Dim bGoAhead As Boolean = False
        Dim values = ConfigurationManager.AppSettings("internalStatuses")
        Dim dct As Dictionary(Of String, String) = New Dictionary(Of String, String)()
        Dim strStatus As String = Nothing
        Dim strTextStatus As String = Nothing
        Dim dctProc As Dictionary(Of String, String) = New Dictionary(Of String, String)()
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rsResult = objBL.getEngineInfo(wrnNo, dsResult)
                If rsResult > 0 And dsResult IsNot Nothing Then
                    If dsResult.Tables(0).Rows.Count > 0 Then

                        createDctFromConfig(values, dct)
                        'Dim i As Integer = 0
                        For Each dw As DataRow In dsResult.Tables(0).Rows

                            Dim qq = dct.AsEnumerable().Where(Function(a) a.Key.Equals(dw.Item("INSTAT").ToString().Trim()))
                            If qq.Count > 0 Then
                                dctProc.Add(qq(0).Key, qq(0).Value)
                            End If

                            'If dw.Item("INSTAT").ToString().Trim().ToLower().Equals(dct.Keys(i).Trim().ToLower()) Then
                            '    dctProc.Add(dct.Keys(0), dct.Values(0))
                            '    i += 1
                            'Else
                            '    i += 1
                            'End If

                        Next

                        Dim pp = dctProc

                        If dctProc IsNot Nothing Then
                            'grvClaimReport.DataSource = dt.AsEnumerable().OrderByDescending(Function(o) CInt(o.Item(field).ToString())).CopyToDataTable()
                            Dim qty = dctProc.AsEnumerable().OrderByDescending(Function(e) CInt(e.Value.ToString())).First()
                            strStatus = qty.Key()
                        End If

                        Dim dd = DirectCast(Session("dsIntStatus"), DataSet)
                        If dd IsNot Nothing Then
                            If dd.Tables(0).Rows.Count > 0 Then

                                Dim qw = dd.Tables(0).AsEnumerable().Where(Function(q) q.Item("CNT03").ToString().Trim().ToLower().Equals(strStatus.Trim().ToLower()))
                                strTextStatus = qw(0).Item("INTDES").ToString().Trim()

                            End If
                        End If

                    End If
                Else
                    Dim dsData As DataSet = New DataSet()
                    Dim sts1 As String = Nothing
                    Dim claimId As String = Nothing
                    Dim rs1 = objBL.GetWrnClaimsHeader(wrnNo, dsData)
                    If rs1 > 0 Then
                        If dsData IsNot Nothing Then
                            If dsData.Tables(0).Rows.Count > 0 Then
                                sts1 = dsData.Tables(0).Rows(0).Item("CWSTAT").ToString().Trim()
                            End If
                        End If
                    End If
                    GetActualStatus(Nothing, sts1, True)
                    strTextStatus = If(Session("cwstde") IsNot Nothing, Session("cwstde").ToString().Trim(), "")

                    If String.IsNullOrEmpty(strTextStatus) Then
                        Dim dsNW As DataSet = New DataSet()
                        Dim sts2 As String = Nothing
                        claimId = dsData.Tables(0).Rows(0).Item("CWDOCN").ToString().Trim()
                        GetNWClaimData(claimId, sts2, dsNW, True)

                        Dim dsStatus = New DataSet()
                        GetClaimExternalStatus(sts2, dsStatus, True)
                        strTextStatus = If(Session("mhstde") IsNot Nothing, Session("mhstde").ToString().Trim(), "")
                    End If

                End If

            End Using
            Return strTextStatus

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return strTextStatus
        End Try
    End Function

    Public Function GetFullStatus(wrnNo As String) As String
        Dim strTextStatus As String = Nothing
        Try
            Dim dd = DirectCast(Session("dsIntStatus"), DataSet)
            If dd IsNot Nothing Then
                If dd.Tables(0).Rows.Count > 0 Then

                    Dim qw = dd.Tables(0).AsEnumerable().Where(Function(q) q.Item("CNT03").ToString().Trim().ToLower().Equals(wrnNo.Trim().ToLower()))
                    strTextStatus = qw(0).Item("INTDES").ToString().Trim()

                End If
            End If
            Return strTextStatus
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return strTextStatus
        End Try
    End Function

    Public Sub createDctFromConfig(str As String, ByRef dct As Dictionary(Of String, String))
        Try
            Dim lst = str.Split(".").ToList()
            For Each item As String In lst
                dct.Add(item.Split(",")(0), item.Split(",")(1))
            Next
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function GetUserEmailByUserId(userid As String, Optional ByRef username As String = Nothing, Optional ByRef userEmail As String = Nothing, Optional ByRef ext As String = Nothing) As String
        Dim strLdap = "costex.com"
        userEmail = Nothing
        Try
            Using pc As PrincipalContext = New PrincipalContext(ContextType.Domain, strLdap)
                Dim yourUser As UserPrincipal = UserPrincipal.FindByIdentity(pc, userid)
                If yourUser IsNot Nothing Then
                    userEmail = yourUser.EmailAddress.Trim().ToLower()
                    username = yourUser.Name.ToString()
                    ext = yourUser.VoiceTelephoneNumber.ToString()
                End If
            End Using
            Return userEmail
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return userEmail
        End Try
    End Function

    Public Function GetDoubleValueByString(str As String) As Double
        Dim dbValue As Double = 0
        Try

            Dim doIt = Double.TryParse(str, dbValue)
            If Not doIt Then
                dbValue = 0
            End If
            Return dbValue

        Catch ex As Exception
            Return dbValue
        End Try
    End Function

    Public Sub prepareClaimClasificaction(ByRef dctValues As Dictionary(Of String, String))
        Dim ds As DataSet = Nothing
        Dim warr As String = Nothing
        Dim nwarr As String = Nothing
        Dim inter As String = Nothing
        dctValues = New Dictionary(Of String, String)()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim result = objBL.GetClaimGeneralClasificaction(ds)
                If result > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            For Each dw As DataRow In ds.Tables(0).Rows
                                If dw.Item("CATTYP").ToString().Trim().ToUpper().Equals("W") Then
                                    warr += "'" + dw.Item("CNT03").ToString().Trim().ToUpper() + "',"
                                ElseIf dw.Item("CATTYP").ToString().Trim().ToUpper().Equals("N") Then
                                    nwarr += "'" + dw.Item("CNT03").ToString().Trim().ToUpper() + "',"
                                Else
                                    inter += "'" + dw.Item("CNT03").ToString().Trim().ToUpper() + "',"
                                End If
                            Next

                            Dim warr1 = If(String.IsNullOrEmpty(warr), warr, warr.Remove(warr.Length - 1, 1))
                            Dim nwarr1 = If(String.IsNullOrEmpty(nwarr), nwarr, nwarr.Remove(nwarr.Length - 1, 1))
                            Dim inter1 = If(String.IsNullOrEmpty(inter), inter, inter.Remove(inter.Length - 1, 1))

                            If Not String.IsNullOrEmpty(warr1) Then
                                dctValues.Add("WARR", warr1)
                            End If
                            If Not String.IsNullOrEmpty(nwarr1) Then
                                dctValues.Add("NWARR", nwarr1)
                            End If
                            If Not String.IsNullOrEmpty(inter1) Then
                                dctValues.Add("INT", inter1)
                            End If


                        End If
                    End If
                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub prepareExternStatus(criteria As String, ByRef strValues As String)
        Dim dsResult As DataSet = New DataSet()
        Dim lstStsOpen As List(Of String) = New List(Of String)()
        Dim lstStsClose As List(Of String) = New List(Of String)()
        Dim lstStsVoid As List(Of String) = New List(Of String)()
        Dim lstStsAll As List(Of String) = New List(Of String)()
        strValues = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rsResult = objBL.addToDdlClaimSts(dsResult)
                If rsResult > 0 Then
                    If dsResult IsNot Nothing Then
                        If dsResult.Tables(0).Rows.Count > 0 Then

                            For Each dw As DataRow In dsResult.Tables(0).Rows
                                If dw.Item("CATSTS").ToString().Trim().ToUpper().Equals("U") Then
                                    lstStsOpen.Add(dw.Item("CNT03").ToString().Trim().ToLower())
                                ElseIf String.IsNullOrWhiteSpace(dw.Item("CATSTS").ToString().Trim()) And (Not dw.Item("CNT03").ToString().Trim().Equals("9")) Then
                                    lstStsClose.Add(dw.Item("CNT03").ToString().Trim().ToLower())
                                ElseIf dw.Item("CNT03").ToString().Trim().Equals("9") Then
                                    lstStsVoid.Add(dw.Item("CNT03").ToString().Trim().ToLower())
                                End If

                                lstStsAll.Add(dw.Item("CNT03").ToString().Trim().ToLower())
                            Next
                        End If
                    End If
                End If



                If criteria.ToLower().Contains("open") Then
                    'lstValues = lstStsOpen
                    For Each item As String In lstStsOpen
                        strValues += "'" + item.Trim().ToLower() + "',"
                    Next
                ElseIf criteria.ToLower().Contains("closed") Then
                    'lstValues = lstStsClose
                    For Each item As String In lstStsClose
                        strValues += "'" + item.Trim().ToLower() + "',"
                    Next
                ElseIf criteria.ToLower().Contains("void") Then
                    'lstValues = lstStsVoid
                    For Each item As String In lstStsVoid
                        If item.Trim().Equals("9") Then
                            strValues += "'" + item.Trim().ToLower() + "',"
                        End If
                    Next
                Else
                    'lstValues = lstStsAll
                    For Each item As String In lstStsAll
                        strValues += "'" + item.Trim().ToLower() + "',"
                    Next
                End If


                If Not String.IsNullOrEmpty(strValues) Then
                    strValues = strValues.Remove(strValues.Length - 1, 1)
                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub SaveFile(fu As FileUpload, path As String)

        Try

            'Specify the path to save the uploaded file to.
            Dim savePath As String = path

            'Get the name of the file to upload.
            Dim fileName As String = fu.FileName

            'Create the path And file name to check for duplicates.
            Dim pathToCheck As String = savePath + fileName

            'Create a temporary file name to use for checking duplicates.
            Dim tempfileName As String = ""

            'Check to see if a file already exists with the same name as the file to upload.        
            If (System.IO.File.Exists(pathToCheck)) Then
                Dim counter As Integer = 2

                While System.IO.File.Exists(pathToCheck)
                    'if a file with this name already exists, prefix the filename with a number.
                    tempfileName = counter.ToString() + fileName
                    pathToCheck = savePath + tempfileName
                    counter += 1
                End While

                fileName = tempfileName

                'Notify the user that the file name was changed.
                'UploadStatusLabel.Text = "A file with the same name already exists." +
                '"<br />Your file was saved as " + fileName;
            Else
                'Notify the user that the file was saved successfully.
                'UploadStatusLabel.Text = "Your file was uploaded successfully.";
            End If

            'Append the name of the file to upload to the path.
            savePath += fileName

            'Call the SaveAs method to save the uploaded file to the specified directory.
            fu.SaveAs(savePath)

        Catch ex As Exception
            Dim msg = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try

    End Sub

    Protected Function isValidExtension(ext As String) As Boolean
        Dim ti As TextInfo = CultureInfo.CurrentCulture.TextInfo
        Dim extensions = ConfigurationManager.AppSettings("validExtensions")
        Try
            Dim validFileTypes As String() = extensions.Split(",")
            'String[] validFileTypes = { "png", "jpg", "jpeg", "rtf", "doc", "pdf", "docx", "zip", "rar", "msg", "xls", "xlsx" };
            Dim IsValid As Boolean = False
            For Each item As String In validFileTypes
                If LCase(ext.Trim()).Equals(LCase(item.Trim())) Then
                    IsValid = True
                    Exit For
                End If
            Next
        Catch ex As Exception

        End Try

        Return IsValid
    End Function

    Public Sub AddNewComment()
        Try
            'If Session("dsComment") IsNot Nothing Then
            '    Dim dsComment = DirectCast(Session("dsComment"), DataSet)
            '    Dim dtCurrentRow As DataRow = Nothing
            '    If dsComment.Tables(0).Rows.Count > 0 Then
            '        Dim rowMax = dsComment.Tables(0).Rows.Count
            '        Dim txt As TextBox = New TextBox()
            '        txt.Enabled = False
            '        txt.Text = Nothing

            '        dtCurrentRow = dsComment.Tables(0).NewRow()
            '        dtCurrentRow("Comment") = txt.Text
            '        dsComment.Tables(0).Rows.Add(dtCurrentRow)
            '        dsComment.Tables(0).AcceptChanges()
            '        Session("dsComment") = dsComment

            '        grvAddComm.DataSource = dsComment
            '        grvAddComm.DataBind()

            '        'grvAddComm.Rows(rowMax).Cells(0).Controls.Add(txt)

            '    End If
            'End If
        Catch ex As Exception
            Dim msg = ex.Message
            Dim pp = msg
        End Try
    End Sub

    Public Sub AddComments()
        Dim wrnNo As String = hdSeq.Value.Trim()
        Dim claimNo As String = Nothing
        Dim vendorClaimNo As String = Nothing
        createEmptyFirstGridRow()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If String.IsNullOrEmpty(wrnNo) And Not String.IsNullOrEmpty(claimNo) Then
#Region "Has ClaimNo but no WarningNo"

                    Dim dsGet = New DataSet()
                    Dim rsGet = objBL.GetSuppClaimHeader(claimNo, dsGet)
                    If rsGet > 0 Then
                        If dsGet IsNot Nothing Then
                            If dsGet.Tables(0).Rows.Count > 0 Then
                                vendorClaimNo = dsGet.Tables(0).Rows(0).Item("CHVENO").ToString().Trim()
                                claimNo = dsGet.Tables(0).Rows(0).Item("CHCLNO").ToString().Trim()

                                hdVendorClaimNo.Value = claimNo
                                hdDisplayAddVndClaim.Value = "1"
                                'message: This Claim Warning No. corresponds to Vendor Claim No: "  + vendorClaimNo
                                'frmclaimsseevendorcomments
                                'comment here
                                hdAddVndComments.Value = "1"
                                hdAddComments.Value = "0"
                                'fnAddVndComments()
                            Else
                                'no data msg
                            End If
                        End If

                        txtAddClaimNo.Text = claimNo
                        txtAddVndCommDateTo.Text = Now().ToString().Split(" ")(1) + " " + Now().ToString().Split(" ")(2)
                        txtAddVndCommDateInit.Text = Now().ToString().Split(" ")(0)
                        'txtAddRetNo.Text = txtClaimNoData.Text
                        'txtAddWrnNo.Text = hdSeq.Value.ToString()
                    Else
                        'sow seecomments form
                        'frmclaimscomments
                        hdDisplayAddVndClaim.Value = "0"
                        hdAddVndComments.Value = "0"
                        hdAddComments.Value = "1"
                        'fnAddComments()
                        txtAddCommDateTo.Text = Now().ToString().Split(" ")(1) + " " + Now().ToString().Split(" ")(2)
                        txtAddCommDateInit.Text = Now().ToString().Split(" ")(0)

                        txtAddRetNo.Text = txtClaimNoData.Text
                        txtAddWrnNo.Text = hdSeq.Value.ToString()
                    End If

#End Region
                ElseIf Not String.IsNullOrEmpty(wrnNo) Then
#Region "Has Warning No"

                    Dim dsGet = New DataSet()
                    Dim dsGet1 = New DataSet()
                    Dim rsGet = objBL.GetClaimWrnRelationByWrnNo(wrnNo, dsGet)
                    If rsGet > 0 Then
                        If dsGet IsNot Nothing Then
                            If dsGet.Tables(0).Rows.Count > 0 Then
                                Dim rsGet1 = objBL.GetSuppClaimHeader(dsGet.Tables(0).Rows(0).Item("CRCLNO").ToString().Trim(), dsGet1)
                                If rsGet1 > 0 Then
                                    If dsGet1 IsNot Nothing Then
                                        If dsGet1.Tables(0).Rows.Count > 0 Then
                                            vendorClaimNo = dsGet1.Tables(0).Rows(0).Item("CHVENO").ToString().Trim()
                                            claimNo = dsGet1.Tables(0).Rows(0).Item("CHCLNO").ToString().Trim()
                                            hdVendorClaimNo.Value = claimNo

                                            hdAddVndComments.Value = "1"
                                            hdAddComments.Value = "0"
                                            'fnAddVndComments()
                                        End If
                                    End If
                                End If
                            End If
                        End If

                        txtAddVndCommDateTo.Text = Now().ToString().Split(" ")(1) + " " + Now().ToString().Split(" ")(2)
                        txtAddVndCommDateInit.Text = Now().ToString().Split(" ")(0)
                        txtAddClaimNo.Text = claimNo
                        'txtAddRetNo.Text = txtClaimNoData.Text
                        'txtAddWrnNo.Text = hdSeq.Value.ToString()
                    Else
                        hdAddVndComments.Value = "0"
                        hdAddComments.Value = "1"
                        'fnAddComments()
                        txtAddCommDateTo.Text = Now().ToString().Split(" ")(1) + " " + Now().ToString().Split(" ")(2)
                        txtAddCommDateInit.Text = Now().ToString().Split(" ")(0)

                        txtAddRetNo.Text = txtClaimNoData.Text
                        txtAddWrnNo.Text = hdSeq.Value.ToString()
                    End If
#End Region
                End If

            End Using

        Catch ex As Exception
            Dim msg = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub SeeCommentsMethod()
        Dim wrnNo As String = hdSeq.Value.Trim()
        Dim claimNo As String = txtClaimNoData.Text.Trim()
        Dim vendorClaimNo As String = Nothing
        Dim pattern As String = ConfigurationManager.AppSettings("datePattern")
        Dim dtParsedDate = New DateTime()
        Dim dtParsedTime = New DateTime()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If String.IsNullOrEmpty(wrnNo) And Not String.IsNullOrEmpty(claimNo) Then
#Region "Has ClaimNo but no WarningNo"

                    Dim dsGet = New DataSet()
                    Dim rsGet = objBL.GetClaimWrnRelationByNo(claimNo, dsGet)
                    If rsGet > 0 Then
                        If dsGet IsNot Nothing Then
                            If dsGet.Tables(0).Rows.Count > 0 Then
                                vendorClaimNo = dsGet.Tables(0).Rows(0).Item("CRCLNO").ToString().Trim()

                                If Not String.IsNullOrEmpty(vendorClaimNo) Then
                                    Dim dsGet1 = New DataSet()
                                    Dim rsGet1 = objBL.GetWClaimCommentsUnifyData(claimNo, dsGet1) 'should not work 
                                    If rsGet1 > 0 Then
                                        If dsGet1 IsNot Nothing Then
                                            If dsGet1.Tables(0).Rows.Count > 0 Then
                                                For Each dw As DataRow In dsGet1.Tables(0).Rows

                                                    Dim objComm = New CComments()
                                                    If DateTime.TryParseExact(dw.Item("CWCHDA").ToString(), "yyyy-MM-dd hh:mm:ss tt", Nothing, DateTimeStyles.None, dtParsedDate) Then
                                                        objComm.CommDate = dtParsedDate.Date().ToString().Split(" ")(0)
                                                    End If

                                                    If DateTime.TryParseExact(dw.Item("CWCHTI").ToString(), "yyyy-MM-dd hh:mm:ss tt", Nothing, DateTimeStyles.None, dtParsedTime) Then
                                                        objComm.CommTime = dtParsedDate.Date().ToString().Split(" ")(1)
                                                    End If

                                                    objComm.CommUser = dw.Item("USUSER").ToString().Trim()
                                                    objComm.CommSubject = dw.Item("CWCHSU").ToString().Trim()
                                                    objComm.CommTxt = dw.Item("CWCDTX").ToString().Trim()
                                                    objComm.PartNo = dw.Item("CWPTNO").ToString().Trim()
                                                    objComm.CodDetComment = dw.Item("CWCDCO").ToString().Trim()

                                                    Dim dsGet2 = New DataSet()
                                                    Dim rsGet2 = objBL.GetSupplierClaimCommentsUnifyData(vendorClaimNo, objComm.CommSubject, objComm.CommTxt, dsGet2)
                                                    If rsGet <= 0 Then
                                                        If CInt(objComm.CodDetComment) = 1 Then
                                                            objComm.CodComment = objBL.getmax("qs36f.CLMCMT", "CCCODE") + 1
                                                            Dim rsIns1 = objBL.InsertSuppClaimCommHeader(vendorClaimNo, objComm.CodComment, objComm.CommDate, objComm.CommSubject, objComm.CommTime, objComm.CommUser)
                                                            If rsIns1 > 0 Then
                                                                Dim rsIns2 = objBL.InsertSuppClaimCommDetail(vendorClaimNo, objComm.CodComment, objComm.CodDetComment, objComm.CommTxt, objComm.PartNo)
                                                            End If
                                                        End If
                                                    End If

                                                Next
                                            Else
                                                'no data msg
                                            End If
                                        Else
                                            'no data msg
                                        End If
                                    End If


                                    Dim dsGet3 = New DataSet()
                                    Dim rsGet3 = objBL.GetSuppClaimHeader(claimNo, dsGet3)
                                    If rsGet3 > 0 Then
                                        If dsGet3 IsNot Nothing Then
                                            If dsGet3.Tables(0).Rows.Count > 0 Then
                                                vendorClaimNo = dsGet3.Tables(0).Rows(0).Item("CHVENO").ToString().Trim()
                                                claimNo = dsGet3.Tables(0).Rows(0).Item("CHCLNO").ToString().Trim()
                                                hdVendorClaimNo.Value = claimNo
                                                hdSeeVndComments.Value = "1"
                                                hdSeeComments.Value = "0"
                                                fnSeeVndComments()
                                                'asign values tu variable
                                                'show see vendor comments form
                                                'MsgBox "This Claim Warning No. corresponds to Vendor Claim No: " & vendorClaimNo, vbOKOnly + vbInformation, "CTP System"
                                            End If
                                        End If
                                    End If
                                Else
                                    'no data msg
                                End If

                            Else
                                'no data msg
                            End If
                        End If
                    Else
                        'sow seecomments form
                        fnSeeComments()
                        hdSeeVndComments.Value = "0"
                        hdSeeComments.Value = "1"
                    End If

#End Region
                ElseIf Not String.IsNullOrEmpty(wrnNo) Then
#Region "Has Warning No"

                    Dim dsGet = New DataSet()
                    Dim rsGet = objBL.GetClaimWrnRelationByWrnNo(wrnNo, dsGet)
                    If rsGet > 0 Then
                        If dsGet IsNot Nothing Then
                            If dsGet.Tables(0).Rows.Count > 0 Then
                                vendorClaimNo = dsGet.Tables(0).Rows(0).Item("CRCLNO").ToString().Trim()

                                If Not String.IsNullOrEmpty(vendorClaimNo) Then
                                    Dim dsGet1 = New DataSet()
                                    Dim rsGet1 = objBL.GetWClaimCommentsUnifyDatabyWrnNo(wrnNo, dsGet1) ' no este metodo
                                    If rsGet1 > 0 Then
                                        If dsGet1 IsNot Nothing Then
                                            If dsGet1.Tables(0).Rows.Count > 0 Then

                                                For Each dw As DataRow In dsGet1.Tables(0).Rows

                                                    Dim objComm = New CComments()
                                                    If DateTime.TryParse(dw.Item("CWCHDA").ToString(), dtParsedDate) Then
                                                        objComm.CommDate = dtParsedDate.Date().ToString().Split(" ")(0)
                                                    End If

                                                    If DateTime.TryParse(dw.Item("CWCHTI").ToString(), dtParsedTime) Then
                                                        objComm.CommTime = dtParsedTime.TimeOfDay().ToString().Split(".")(0).Replace(":", ".")
                                                    End If

                                                    objComm.CommUser = dw.Item("USUSER").ToString()
                                                    objComm.CommSubject = dw.Item("CWCHSU").ToString()
                                                    objComm.CommTxt = dw.Item("CWCDTX").ToString()
                                                    objComm.PartNo = dw.Item("CWPTNO").ToString()
                                                    objComm.CodDetComment = dw.Item("CWCDCO").ToString()

                                                    Dim dsGet2 = New DataSet()
                                                    Dim rsGet2 = objBL.GetSupplierClaimCommentsUnifyData(vendorClaimNo, objComm.CommSubject, objComm.CommTxt, dsGet2)
                                                    If rsGet2 > 0 Then
                                                        If dsGet2 IsNot Nothing Then
                                                            If dsGet2.Tables(0).Rows.Count > 0 Then
                                                                'do not doing nothing
                                                            Else
                                                                Dim codComm As String = Nothing
                                                                If objComm.CodDetComment = 1 Then
                                                                    codComm = objBL.getmax("qs36f.CLMCMT", "CCCODE") + 1
                                                                    If codComm > 0 Then

                                                                        Dim rsIns = objBL.InsertSuppClaimCommHeader(vendorClaimNo, codComm, objComm.CommDate,
                                                                                                                    objComm.CommSubject, objComm.CommTime, objComm.CommUser)
                                                                        If rsIns > 0 Then
                                                                        Else
                                                                            'error inserting
                                                                        End If

                                                                    End If
                                                                End If

                                                                Dim rsIns1 = objBL.InsertSuppClaimCommDetail(vendorClaimNo, codComm, objComm.CodDetComment,
                                                                                                             objComm.CommTxt, objComm.PartNo)
                                                                If rsIns1 > 0 Then
                                                                Else
                                                                    'error inserting
                                                                End If
                                                            End If
                                                        End If
                                                    End If

                                                Next

                                            Else
                                                'no data msg
                                            End If
                                        End If
                                    End If
                                Else
                                    'no data msg
                                End If

                                Dim dsGet3 = New DataSet()
                                Dim rsGet3 = objBL.GetSuppClaimHeader(vendorClaimNo, dsGet3)
                                If rsGet3 > 0 Then
                                    If dsGet3 IsNot Nothing Then
                                        If dsGet3.Tables(0).Rows.Count > 0 Then
                                            vendorClaimNo = dsGet3.Tables(0).Rows(0).Item("CHVENO").ToString().Trim()
                                            claimNo = dsGet3.Tables(0).Rows(0).Item("CHCLNO").ToString().Trim()
                                            hdVendorClaimNo.Value = claimNo
                                            hdDisplaySeeVndClaim.Value = "1"
                                            'message: This Claim Warning No. corresponds to Vendor Claim No: "  + vendorClaimNo
                                            hdSeeVndComments.Value = "1"
                                            hdSeeComments.Value = "0"
                                            fnSeeVndComments() 'frmclaimsseevendorcomments
                                            'comment here
                                        Else
                                            'no data
                                        End If
                                    End If
                                End If
                            Else
                                'no data msg
                            End If
                            'no comment for this number
                        End If
                    Else
                        'call frmseecomments
                        'Comments here
                        hdSeeVndComments.Value = "0"
                        hdSeeComments.Value = "1"
                        hdDisplaySeeVndClaim.Value = "0"
                        fnSeeComments()  'frmseecomments
                    End If

#End Region
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub createEmptyFirstGridRow()
        Try
            'Dim dt As DataTable = New DataTable()

            'Dim column1 As DataColumn = New DataColumn("Comment")
            'column1.DataType = System.Type.GetType("System.String")
            'dt.Columns.Add(column1)

            'Dim dr As DataRow
            'dr = dt.NewRow()

            ''Dim txt As TextBox = New TextBox()
            ''dr.Item("Comment") = txt

            ''dr.Item("Comment") = ""
            ''dt.Rows.Add(dr)
            ''dt.AcceptChanges()

            'Dim ds As DataSet = New DataSet()
            'ds.Tables.Add(dt)

            'Session("dsComment") = ds
            'grvAddComm.DataSource = ds
            'grvAddComm.DataBind()

        Catch ex As Exception
            Dim msg = ex.Message
            Dim pp = msg
        End Try
    End Sub

    Public Sub AddFiles()
        Dim wrnNo As String = hdSeq.Value.Trim()
        Dim claimNo As String = txtClaimNoData.Text.Trim()
        Dim FolderPath = ConfigurationManager.AppSettings("urlPathGeneral") + ConfigurationManager.AppSettings("PathClaimFiles")
        Dim folderpathvendor As String = Nothing
        Dim uploadedFiles As HttpFileCollection = Nothing
        Dim userPostedFile As HttpPostedFile = Nothing
        Try
            If fuAddClaimFile.HasFile() Then

                If String.IsNullOrEmpty(wrnNo) And Not String.IsNullOrEmpty(claimNo) Then

                    uploadedFiles = Request.Files
                    userPostedFile = uploadedFiles(1)

                    If (userPostedFile.ContentLength > 0 And userPostedFile.ContentLength < System.Convert.ToInt32(ConfigurationManager.AppSettings("MaxFileSize"))) Then

                        Dim extension = Path.GetExtension(fuAddClaimFile.FileName)
                        If isValidExtension(Path.GetExtension(extension)) Then

                            Dim filePath As String = fuAddClaimFile.FileName

                            folderpathvendor = FolderPath + claimNo + "\"
                            If Directory.Exists(folderpathvendor) Then
                                SaveFile(fuAddClaimFile, folderpathvendor)
                                'hdChangePageLoad.Value = "1"
                            Else
                                'create a folder
                                Directory.CreateDirectory(folderpathvendor)
                                If Directory.Exists(folderpathvendor) Then
                                    SaveFile(fuAddClaimFile, folderpathvendor)
                                    'hdChangePageLoad.Value = "1"
                                Else
                                    'error creating directory
                                End If
                            End If
                        Else
                            'extension error
                        End If
                    Else
                        'no data message
                    End If
                ElseIf Not String.IsNullOrEmpty(wrnNo) Then

                    uploadedFiles = Request.Files
                    userPostedFile = uploadedFiles(1)

                    If (userPostedFile.ContentLength > 0 And userPostedFile.ContentLength < System.Convert.ToInt32(ConfigurationManager.AppSettings("MaxFileSize"))) Then

                        Dim extension = Path.GetExtension(fuAddClaimFile.FileName)
                        If isValidExtension(Path.GetExtension(extension)) Then

                            Dim filePath As String = fuAddClaimFile.FileName

                            folderpathvendor = FolderPath + wrnNo + "\"
                            If Directory.Exists(folderpathvendor) Then
                                SaveFile(fuAddClaimFile, folderpathvendor)
                                'hdChangePageLoad.Value = "1"
                            Else
                                'create a folder
                                Directory.CreateDirectory(folderpathvendor)
                                If Directory.Exists(folderpathvendor) Then
                                    SaveFile(fuAddClaimFile, folderpathvendor)
                                    'hdChangePageLoad.Value = "1"
                                Else
                                    'error creating directory
                                End If
                            End If
                        Else
                            'extension error
                        End If
                    Else
                        'no data message
                    End If
                Else
                    ' msg no claim selected
                End If
            Else
                'no file uploaded
            End If
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Protected Sub btnSeeFileMsg_Click(sender As Object, e As EventArgs, Optional url As String = Nothing) Handles btnSeeFileMsg.Click
        Try

            If String.IsNullOrEmpty(url.Trim()) Then
                url = "http://svrwebapps.costex.com/IMAGEBANK/27232/RE-2da-Opcion.msg"
            End If

            Dim app As Microsoft.Office.Interop.Outlook.Application = New Microsoft.Office.Interop.Outlook.Application()

            Dim item = DirectCast(app.Session.OpenSharedItem(url), Microsoft.Office.Interop.Outlook.MailItem)
            Dim body = item.HTMLBody
            Dim att As Integer = item.Attachments.Count
            item.Display(True)

        Catch ex As Exception

        End Try
    End Sub

    Public Sub SeeFiles()
        Dim wrnNo As String = hdSeq.Value.Trim()
        Dim claimNo As String = txtClaimNoData.Text.Trim()
        Dim lst As List(Of String) = New List(Of String)()
        Dim url As String = Nothing
        Dim selImg As String = Nothing
        Dim fileDate As String = Nothing
        Dim name As String = Nothing
        Dim listCount As Integer = 0
        Dim itemByRows As Integer = 4
        Dim method As String = "ctl00$MainContent$btnSeeFileMsg"
        Try

            lst = GetAllFilesForView(wrnNo)
            listCount = lst.Count()
            Dim rwAmt = listCount Mod 2
            rwAmt = If(rwAmt.Equals(0), (listCount / itemByRows), (rwAmt / itemByRows) + 1)
            Dim val = 0
            Dim valTd = 0
            Dim html As String = Nothing
            Dim flag As Boolean = False

            Dim body As StringBuilder = New StringBuilder()
            body.AppendFormat("<div style=text-align:center;><table id=table1 border=0 style=background-color:#F7F7FD;><tr><td colspan=4 style=text-align:center;><H1 style=color:white;background-color:black;>Files for the Claim: {0}</H1></td></tr>", wrnNo)

            body.Append("<tr>")
            Dim i = 0
            For Each item As String In lst

                If i.Equals(0) Or Not (i Mod 4).Equals(0) Then
                    flag = If(item.Trim().Contains(","), True, False)
                    If flag Then
                        url = item.Split(",")(0).ToString().Trim()
                        selImg = item.Split(",")(1).ToString().Trim()
                        fileDate = item.Split(",")(2).ToString().Trim()
                        Dim ct = url.Split("/").Count()
                        name = url.Split("/")(ct - 1).ToString().Trim()
                    End If

                    'If url.Substring(url.Length - 4, 4).Trim().ToLower().Equals(".msg") Then
                    'OpenMsgFile(url)
                    'body.AppendFormat("<td style=padding:10px;border-bottom:2px;border-color:#fbba42;border-bottom-style:dotted;><a href=javascript:__doPostBack('{7}','') title='{4}' target=_blank id=table1_alink_{1}> <img id=table1_img_{2} src={3} alt={5} runat=server style=width:100px;height:100px;max-width:100px;min-width:100px;border-radius:10px; /> </a> <br> <span style=font-size:12px;>{6}</span></td>", url, i, i, selImg, name, name, If(name.Length > 30, name.Substring(0, 8) + " .. " + name.Substring(name.Length - 14, 14), name), method)
                    'Else
                    body.AppendFormat("<td style=padding:10px;border-bottom:2px;border-color:#fbba42;border-bottom-style:dotted;><a href='{0}' title='{4}' target=_blank style=cursor:pointer id=table1_alink_{1} runat=server> <img id=table1_img_{2} src='{3}' alt={5} runat=server style=width:60px;height:52px;max-width:100px;min-width:60px;border-radius:10px; /> </a> <br> <span style=font-size:10px;>{6}</span><p style=font-size:10px;word-break: break-all;>{7}</p></td>", url, i, i, selImg, name, name, If(name.Length > 30, name.Substring(0, 8) + " .. " + name.Substring(name.Length - 14, 14), name), fileDate)
                    'End If
                    i += 1
                Else
                    If (i + 1) > listCount Then
                        body.Append("</tr>")
                    Else
                        body.Append("</tr><tr>")

                        If flag Then
                            url = item.Split(",")(0).ToString().Trim()
                            selImg = item.Split(",")(1).ToString().Trim()
                            fileDate = item.Split(",")(2).ToString().Trim()
                            Dim ct = url.Split("/").Count()
                            name = url.Split("/")(ct - 1).ToString().Trim()
                            'Else
                            '    url = item.ToString().Trim()
                            '    selImg = "~/Images/avatar-ctp.PNG"
                        End If

                        'If url.Substring(url.Length - 4, 4).Trim().ToLower().Equals(".msg") Then
                        'body.AppendFormat("<td style=padding:10px;border-bottom:2px;border-color:#fbba42;border-bottom-style:dotted;><a href=javascript:__doPostBack('{7}','') title='{4}' target=_blank id=table1_alink_{1}> <img id=table1_img_{2} src={3} alt={5} runat=server style=width:100px;height:100px;max-width:100px;min-width:100px;border-radius:10px; /> </a> <br> <span style=font-size:12px;>{6}</span></td>", url, i, i, selImg, name, name, If(name.Length > 30, name.Substring(0, 8) + " .. " + name.Substring(name.Length - 14, 14), name), method)
                        'Else
                        body.AppendFormat("<td style=padding:10px;border-bottom:2px;border-color:#fbba42;border-bottom-style:dotted;><a href='{0}' title='{4}' target=_blank style=cursor:pointer id=table1_alink_{1} runat=server> <img id=table1_img_{2} src='{3}' alt={5} runat=server style=width:60px;height:52px;max-width:100px;min-width:60px;border-radius:10px; /> </a> <br> <span style=font-size:10px;>{6}</span><p style=font-size:10px;word-break: break-all;>{7}</p></td>", url, i, i, selImg, name, name, If(name.Length > 30, name.Substring(0, 8) + " .. " + name.Substring(name.Length - 14, 14), name), fileDate)
                        'End If
                        i += 1
                    End If
                End If
            Next
            body.Append("</table></div>")

            Dim pp = body.ToString()
            Dim ppRep = pp.Replace("'", """")
            pnFilesPanel.Controls.Add(New LiteralControl(ppRep))

#Region "No"

            'OpenBrowser(ppRep)

            'If String.IsNullOrEmpty(wrnNo) And Not String.IsNullOrEmpty(claimNo) Then

            '    Dim FolderPath = ConfigurationManager.AppSettings("urlPathGeneral") + ConfigurationManager.AppSettings("PathClaimFiles")
            '    Dim folderpathvendor = FolderPath + claimNo + "\"
            '    If Directory.Exists(folderpathvendor) Then
            '        System.Diagnostics.Process.Start(folderpathvendor)
            '    Else
            '        'message No files for this Claim Warning.
            '    End If

            'ElseIf Not String.IsNullOrEmpty(wrnNo) Then

            '    Dim FolderPath = ConfigurationManager.AppSettings("urlPathGeneral") + ConfigurationManager.AppSettings("PathClaimFiles")
            '    Dim folderpathvendor = FolderPath + wrnNo + "\"
            '    If Directory.Exists(folderpathvendor) Then
            '        hdTestPath.Value = folderpathvendor
            '        System.Diagnostics.Process.Start(folderpathvendor)
            '        Dim pp = HttpContext.Current.Request.LogonUserIdentity.Name
            '    Else
            '        'message No files for this Claim Warning.
            '    End If

            'End If

#End Region

        Catch ex As Exception
            Dim ppp = HttpContext.Current.Request.LogonUserIdentity.Name
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + " . " + ex.ToString + " . " + ex.StackTrace + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    'Public Sub GetPartImage(partNo As String)
    '    Try

    '        Dim rootPath = ConfigurationManager.AppSettings("urlPathGeneral")
    '        Dim localPath = rootPath + "CTPPictures\"
    '        Dim OEMPath = rootPath + "PartsFiles\"
    '        Dim picturePath As String = Nothing

    '        If Not Directory.Exists(localPath) Then
    '            'error path part ctp
    '        Else
    '            picturePath = localPath + partNo + ".jpg"
    '            If File.Exists(picturePath) Then
    '                'imgPart.ImageUrl = picturePath
    '                imgPart.ImageUrl = "Images/avatar-ctp.PNG"
    '                'show the ctp image for the part
    '            Else
    '                'looking in OEM parts image
    '                If Not Directory.Exists(OEMPath) Then
    '                    'error path part oem
    '                    imgPart.ImageUrl = "Images/avatar-ctp.PNG"
    '                Else
    '                    Dim subFolder = partNo.Split(".")(0)
    '                    Dim pictureSubPath As String = OEMPath + subFolder + "\"
    '                    If Not Directory.Exists(pictureSubPath) Then
    '                        'not exist dirctory for this part Oem
    '                        imgPart.ImageUrl = "Images/avatar-ctp.PNG"
    '                    Else
    '                        picturePath = pictureSubPath + partNo + ".jpg"
    '                        If Not File.Exists(picturePath) Then
    '                            'no exists img for this part show default img for no img
    '                            imgPart.ImageUrl = "Images/avatar-ctp.PNG"
    '                        Else
    '                            'show the oem img
    '                            'imgPart.ImageUrl = picturePath
    '                            imgPart.ImageUrl = "Images/avatar-ctp.PNG"
    '                        End If
    '                    End If
    '                End If
    '            End If
    '        End If


    '        'Dim pathPictures = gnr.UrlPathGeneralMethod & "CTPPictures\"
    '        'If Not Directory.Exists(pathPictures) Then
    '        '    'System.IO.Directory.CreateDirectory(pathPictures)
    '        '    Dim note = "the picture path it is not recognized.Check it please."
    '        '    MessageBox.Show(note, "CTP System", MessageBoxButtons.OK)
    '        'End If
    '        'pathpictureparts = pathPictures & "pic_not_av.jpg"
    '        'Dim existsFile As Boolean = File.Exists(pathpictureparts)
    '        'If existsFile Then
    '        '    PictureBox1.Load(pathpictureparts)
    '        'End If

    '        'If Trim(txtPartNo.Text) <> "" Then
    '        '    Dim PartNo = Trim(UCase(txtPartNo.Text))
    '        '    Dim folderpathproject = gnr.UrlPartFilesMethod & Trim(UCase(txtPartNo.Text)) & "\OEM_" & Trim(UCase(PartNo)) & ".jpg"
    '        '    If File.Exists(folderpathproject) Then
    '        '        PictureBox1.Load(folderpathproject)
    '        '    End If
    '        'End If
    '    Catch ex As Exception

    '    End Try
    'End Sub

    Public Sub initializationCode()
        Dim exMessage As String = Nothing
        Try
            Dim yearUse = DateTime.Now().AddYears(-3).Year
            Dim firstDate = New DateTime(yearUse, 1, 1).Date()
            Dim strDateFirst As String = firstDate.ToString("MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture)
            'Dim strDateReduc As String = firstDate.ToString("yyMM", System.Globalization.CultureInfo.InvariantCulture)
            Dim curDate = DateTime.Now.Date().ToString("MM/dd/yyyy")
            Session("RequestDownloadExcel") = False

            'Dim aa = callRec()

            'MassiveInternalUpdate("27240")

            'Try
            '    CheckIfOutlookPresent()
            'Catch ex1 As Exception
            '    writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex1.Message + ". At Time: " + DateTime.Now.ToString())
            'End Try

            BuildDates()

            Dim strTechReviewUsr = ConfigurationManager.AppSettings("AuthTechReview")
            Dim baseMess = ConfigurationManager.AppSettings("BaseMessage")
            Session("BaseMessage") = baseMess
            Session("techReviewUsr") = strTechReviewUsr

            Dim strDate1 = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("strDates")), ConfigurationManager.AppSettings("strDates"), strDateFirst + "," + curDate)
            Dim strDates As String() = Nothing
            strDates = strDate1.Split(",")
            'strDates(0) = strDate1.Split(",")(0).ToString()
            'strDates(1) = strDate1.Split(",")(1).ToString()
            Session("STRDATE") = strDates
            Session("TypeSelected") = Nothing
            Session("StatusSelected") = Nothing
            Session("intStatusSelected") = Nothing
            Session("SelectedRadio") = Nothing
            ''test purpose
            'Session("userid") = "AROBLES"
            ''test purpose
            Session("fullObj") = Nothing
            Session("isDDL") = False
            Session("UpToLimit") = False
            Session("lastComm") = ""

            Session("PageSize") = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("PageSize")), ConfigurationManager.AppSettings("PageSize"), "1000")
            Session("PageAmounts") = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("PageAmounts")), ConfigurationManager.AppSettings("PageAmounts"), "10")
            Session("currentPage") = 1

            Dim dsUsrBranch = New DataSet()
            Session("usrBranch") = getuserbranch(dsUsrBranch)

            Session("SwLimitAmt") = 0
            Dim dsLimit = New DataSet()
            Dim strLimit = getLimit(dsLimit)
            Session("SwLimitAmt") = If(Not String.IsNullOrEmpty(strLimit.Trim()), CInt(strLimit), 0)

            'getMngUsers()

            Dim dsAuthRestock = New DataSet()
            getAutoRestockFlag(dsAuthRestock)

            'GetClaimsReport("", 1, Nothing, strDates)

            LoadDropDownLists(ddlSearchIntStatus)

            GetClaimsReport("", 1, Nothing, Nothing)

            LoadDropDownLists(ddlSearchDiagnose)
            LoadDropDownLists(ddlSearchExtStatus)
            LoadDropDownLists(ddlSearchReason)
            LoadDropDownLists(ddlSearchUser)
            LoadDropDownLists(ddlClaimType)
            LoadDropDownLists(ddlClaimTypeOk)
            LoadDropDownLists(ddlInitRev)
            LoadDropDownLists(ddlTechRev)
            LoadDropDownLists(ddlVndNo)
            LoadDropDownLists(ddlLocat)
            LoadDropDownLists(ddlLocation)

            btnSearchFilter.Focus()


            'GetAllFilesForView("27137")

        Catch ex As Exception
            exMessage = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + exMessage + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub setTabsHeader(value As String)
        Try
            lblFirstTabDesc.Text += value
            lblSecondTabDesc.Text += value
            lblThirdTabDesc.Text += value
            lblFourTabDesc.Text += value
            lblFiveTabDesc.Text += value
            hdClaimNumber.Value = lblFirstTabDesc.Text + " " + value
        Catch ex As Exception

        End Try
    End Sub

    Public Function GetClosedClaims(wrnNo As String, ByRef dsResult As DataSet) As Boolean
        Dim blResult As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.GetClosedClaims(dsResult)
                If rs > 0 Then
                    If dsResult IsNot Nothing Then
                        If dsResult.Tables(0).Rows.Count > 0 Then
                            blResult = dsResult.Tables(0).AsEnumerable().Where(Function(e) e.Item("INCLNO").ToString().Trim().Equals(wrnNo)).Any
                        End If
                    End If
                End If
            End Using
            Return blResult
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return blResult
        End Try
    End Function

    Public Sub GetNWClaimDetail(code As String, ByRef ds As DataSet)
        Dim dsVnd = New DataSet()
        Dim dsPartDesc = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getNWClaimDetail(code, ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            txtVendorNo.Text = ds.Tables(0).Rows(0).Item("MDVENR").ToString().Trim()
                            GetVendorName(txtVendorNo.Text, dsVnd)

                            txtInvoiceNo.Text = ds.Tables(0).Rows(0).Item("MDOINR").ToString().Trim()
                            txtPartNoData.Text = ds.Tables(0).Rows(0).Item("MDPTNR").ToString().Trim()
                            txtQty.Text = ds.Tables(0).Rows(0).Item("MDQTRT").ToString().Trim()
                            txtUnitCost.Text = ds.Tables(0).Rows(0).Item("MDUNPR").ToString().Trim()

                            GetPartDesc(txtPartNoData.Text, dsPartDesc)

                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function getLastCommentByNumber(value As String) As String
        Dim rsComment As Integer = -1
        Dim dsresult As DataSet = New DataSet()
        Dim strComment As String = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                rsComment = objBL.getLastCommentByNumber(value, dsresult)
                If rsComment > 0 Then
                    If dsresult IsNot Nothing Then
                        If dsresult.Tables(0).Rows.Count > 0 Then
                            hdlastComment.Value = dsresult.Tables(0).Rows(0).Item("CWCDTX").ToString().Trim()
                            strComment = hdlastComment.Value
                            Return strComment
                        Else
                            hdlastComment.Value = "N/C"
                            strComment = hdlastComment.Value
                            Return strComment
                        End If
                    Else
                        hdlastComment.Value = "N/C"
                        strComment = hdlastComment.Value
                        Return strComment
                    End If
                Else
                    hdlastComment.Value = "N/C"
                    strComment = hdlastComment.Value
                    Return strComment
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return strComment
        End Try
    End Function

    Public Function prepareDate(value As String) As String
        Dim stepp As Integer = 0
        Dim strResult As String = Nothing
        Try
            '121219
            For Each item As Char In value
                If stepp Mod 2 = 0 And stepp <> 0 Then
                    strResult += "-"
                End If
                strResult += item    '12/1
                stepp += 1  '3
            Next
            Return strResult
        Catch ex As Exception
            Return strResult
        End Try
    End Function

    Public Sub GetBarSeqNumber(partNo As String, invoiceno As String, invoiceDate As String)
        Dim rsChkResult As Integer = -1
        Dim rsBReqResult As Integer = -1
        Dim rsRecResult As Integer = -1
        Dim strCheckingNo As String = Nothing
        Dim strBReqNo As String = Nothing
        Dim strRecNo As String = Nothing
        Dim dtInvDate As DateTime = New DateTime()
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                rsChkResult = objBL.GetCheckingNumber(partNo, invoiceno, invoiceDate, strCheckingNo)
                If rsChkResult = 1 Then
                    rsBReqResult = objBL.GetBarSeqNumber(strCheckingNo, strBReqNo)
                    If rsBReqResult = 1 Then
                        txtBarSeq.Text = strBReqNo.Trim()
                        rsRecResult = objBL.GetReceivingNumber(strBReqNo, strRecNo)
                        If rsRecResult = 1 Then
                            txtReceiving.Text = strRecNo.Trim()
                            'process end ok
                        Else
                            'error getting the receiving data
                        End If
                    Else
                        'no value for barc seq, no receiving data
                    End If

                Else
                    'no value fro checking number, no bar sea detected
                End If

            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub getInvoiceDateByNumber(value As String, claim As String)
        Dim rsInvDate As Integer = -1
        Dim strInvData As String = Nothing
        Dim dtInvDate As DateTime = New DateTime()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                'strInvData = If(Not String.IsNullOrEmpty(objBL.getInvoiceDateByNumber(value, claim)), objBL.getInvoiceDateByNumber(value, claim) + " 00:00:00", "")
                strInvData = objBL.getInvoiceDateByNumber(value, claim)
                If Not String.IsNullOrEmpty(strInvData) Then
                    Dim lengthinv = If(strInvData.Length = 6, strInvData, "0" + strInvData)

                    'aqui corregir para tomar la fecha. Buscar el format correcto
                    Dim newValue = prepareDate(lengthinv) + " 00:00:00"
                    Dim pattern As String = ConfigurationManager.AppSettings("datePattern")
                    Dim dtParsedDate = New DateTime()

                    If DateTime.TryParseExact(newValue, pattern, Nothing, DateTimeStyles.None, dtParsedDate) Then
                        txtInvoiceDate1.Text = dtParsedDate.ToShortDateString()
                    Else
                        txtInvoiceDate1.Text = Nothing
                    End If

                    txtInvoiceNo1.Text = txtInvoiceNo.Text
                    txtInvoiceDate.Text = txtInvoiceDate1.Text

                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetPartDesc(partNo As String, ByRef dsPartDesc As DataSet, Optional parameterPart As String = Nothing)
        Dim rsPart As Integer = -1
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                'Dim parameterPart = "IMDSC"
                If parameterPart IsNot Nothing Then
                    rsPart = objBL.getPartData(partNo, dsPartDesc, parameterPart)
                    If rsPart > 0 Then
                        If dsPartDesc IsNot Nothing Then
                            If dsPartDesc.Tables(0).Rows.Count > 0 Then
                                txtPartDescription.Text = dsPartDesc.Tables(0).Rows(0).Item("IMDSC").ToString().Trim()
                            Else
                                txtPartDescription.Text = ""
                            End If
                        Else
                            'error looking for part description
                        End If
                    End If

                Else
                    rsPart = objBL.getPartData(partNo, dsPartDesc)
                    If rsPart > 0 Then
                        If dsPartDesc IsNot Nothing Then
                            If dsPartDesc.Tables(0).Rows.Count > 0 Then

                            Else
                                txtPartDescription.Text = ""
                            End If
                        Else
                            txtPartDescription.Text = ""
                        End If
                    Else
                        txtPartDescription.Text = ""
                    End If
                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetPartUsableData(partNo As String)
        Dim rsPart As Integer = -1
        Dim dsPartDesc = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                rsPart = objBL.GetPartUsableData(partNo, dsPartDesc)
                If rsPart > 0 Then
                    If dsPartDesc IsNot Nothing Then
                        If dsPartDesc.Tables(0).Rows.Count > 0 Then
                            txtPartNoData.Text = partNo
                            txtPartDescription.Text = dsPartDesc.Tables(0).Rows(0).Item("IMDSC").ToString().Trim()

                            ddlLocation.Items.Clear()
                            Dim loc As String = dsPartDesc.Tables(0).Rows(0).Item("DVLOCN").ToString().Trim()
                            ddlLocation.Items.Add(loc)
                            txtUnitCost.Text = dsPartDesc.Tables(0).Rows(0).Item("DVUNT$").ToString().Trim()
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetVendorCustomValue(vnd As String)
        Dim rsVnd As Integer = -1
        Dim dsVndName = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                If Regex.IsMatch(vnd, "^[0-9]{1,6}$") Then
                    rsVnd = objBL.GetVendorCustomValue(vnd.Trim(), dsVndName)
                    If rsVnd > 0 Then
                        If dsVndName IsNot Nothing Then
                            If dsVndName.Tables(0).Rows.Count > 0 Then
                                txtVendorNo.Text = vnd.Trim()
                                txtVendorName.Text = dsVndName.Tables(0).Rows(0).Item("VMNAME").ToString().Trim()
                            Else
                                'error vendor not found
                            End If
                        Else
                            'error vendor not found
                        End If
                    Else
                        'error vendor not found
                    End If
                Else
                    'error in vendor only numbers accepted
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetVendorName(vndNo As String, ByRef dsVnd As DataSet)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim parameterVnd = "VMNAME"
                Dim rsVnd = objBL.getVendorData(vndNo, dsVnd, parameterVnd)

                If rsVnd > 0 Then
                    If dsVnd IsNot Nothing Then
                        If dsVnd.Tables(0).Rows.Count > 0 Then
                            txtVendorName.Text = dsVnd.Tables(0).Rows(0).Item("VMNAME").ToString().Trim()
                        Else
                            txtVendorName.Text = ""
                        End If
                    Else
                        'error looking for vendor
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Function GetAmouontOver500Amount(wrnNo As String) As String
        Dim ds As DataSet = New DataSet()
        Dim flagOver500 As String = Nothing
        Dim valueOver500 As String = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rsGet = objBL.getEngineInfo(wrnNo, ds)
                If rsGet > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            flagOver500 = ds.Tables(0).Rows(0).Item("INOVER$").ToString().Trim().ToUpper()
                            If flagOver500.Equals("Y") Then
                                valueOver500 = txtAmountApproved.Text.Trim()
                            End If
                            Dim qq = ds.Tables(0).AsEnumerable().Where(Function(e) e.Item("INSTAT").ToString().Trim().ToUpper() = "B" And Not String.IsNullOrEmpty(e.Item("INCOSTSUG$").ToString().Trim()))
                            If qq.Count > 0 Then
                                valueOver500 += "," + If(qq IsNot Nothing, qq(0).Item("INCOSTSUG$").ToString().Trim(), "0")
                            End If
                            'valueOver500 += "," + ds.Tables(0).Rows(0).Item("INCOSTSUG$").ToString().Trim()
                        End If
                    End If
                End If

            End Using

            Return valueOver500
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return valueOver500
        End Try

    End Function

    Public Function GetClaimFreightAmount(claimNo As String) As String
        Dim ds As DataSet = New DataSet()
        Dim valueFreight As String = Nothing
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rsGet = objBL.GetNWDataByClaimNo(claimNo, ds)
                If rsGet > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            valueFreight = ds.Tables(0).Rows(0).Item("MHFRAM").ToString().Trim().ToUpper()
                        End If
                    End If
                End If

            End Using

            Return valueFreight
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Return valueFreight
        End Try

    End Function

    Public Sub CalculateTotalClaimValue(strFreight As String, wrnNo As String)
        Dim ds As DataSet = New DataSet()
        Dim strResul As String = Nothing
        Dim dbOperation As Double = 0
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If Not String.IsNullOrEmpty(txtPartCred.Text.Trim()) Then 'partial credit
                    txtTotValue.Text = txtPartCred.Text.Trim()
                ElseIf (Not String.IsNullOrEmpty(txtParts.Text.Trim())) Then
                    Dim unitCost = txtParts.Text.Trim()
                    Dim valueOver500Multi = GetAmouontOver500Amount(wrnNo)
                    'Dim valueFreight = GetClaimFreightAmount(claimNo)

                    Dim valueOver500 = If(valueOver500Multi Is Nothing, "0", If(valueOver500Multi.Contains(","), valueOver500Multi.Split(",")(0).Trim(), "0"))
                    Dim ConsDmg = If(valueOver500Multi Is Nothing, "0", If(valueOver500Multi.Contains(","), valueOver500Multi.Split(",")(1).Trim(), "0"))

                    txtTotValue.Text = (GetDoubleValueByString(unitCost) + GetDoubleValueByString(valueOver500) + GetDoubleValueByString(strFreight) + GetDoubleValueByString(ConsDmg)).ToString()
                    ' + GetDoubleValueByString(ConsDmg)

                Else
                    'error no value
                End If

            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetNWClaimData(docData As String, ByRef nonwarrantyState As String, ByRef dsNW As DataSet, Optional onlySts As Boolean = False)

        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rsNW = objBL.getNWrnClaimsHeader(docData, dsNW)
                If rsNW > 0 Then
                    If dsNW IsNot Nothing Then
                        If dsNW.Tables(0).Rows.Count > 0 Then

                            If onlySts Then
                                nonwarrantyState = dsNW.Tables(0).Rows(0).Item("MHSTAT").ToString()
                            Else
                                Dim Freight = dsNW.Tables(0).Rows(0).Item("MHFRAM").ToString().Trim()
                                Dim DbFreight As Double = 0
                                If Not String.IsNullOrEmpty(Freight) Then
                                    If Double.TryParse(Freight, DbFreight) Then
                                        txtFreight.Text = Math.Round(DbFreight, 2).ToString()
                                    Else
                                        txtFreight.Text = "0"
                                        'log error de conversion
                                    End If
                                End If
                                txtParts.Text = dsNW.Tables(0).Rows(0).Item("MHTOMR").ToString().Trim()
                                Dim wrnNo As String = hdSeq.Value.Trim()

                                CalculateTotalClaimValue(dsNW.Tables(0).Rows(0).Item("MHFRAM").ToString().Trim(), wrnNo)

                                nonwarrantyState = dsNW.Tables(0).Rows(0).Item("MHSTAT").ToString()
                                If dsNW.Tables(0).Rows(0).Item("MHSTAT").ToString() = "1" Then
                                    'carga en el grid
                                End If
                            End If
                        Else
                            txtFreight.Text = "0"
                            txtParts.Text = "0"
                        End If
                    Else
                        txtFreight.Text = "0"
                        txtParts.Text = "0"
                    End If
                Else
                    txtFreight.Text = "0"
                    txtParts.Text = "0"
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetClaimExternalStatus(nonwarrantyState As String, ByRef dsStatus As DataSet, Optional updTxt As Boolean = False)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                dsStatus = New DataSet()
                Dim rs = objBL.getDataByStatus(nonwarrantyState, dsStatus)
                If rs > 0 Then
                    If dsStatus IsNot Nothing Then
                        If dsStatus.Tables(0).Rows.Count > 0 Then
                            hdFlagUpload.Value = dsStatus.Tables(0).Rows(0).Item("FLGUPD").ToString().Trim()
                            hdmhstde.Value = dsStatus.Tables(0).Rows(0).Item("MHSTDE").ToString().Trim()
                        End If
                    End If
                End If

                If updTxt Then
                    Session("mhstde") = hdmhstde.Value
                Else
                    txtClaimStatus.Text = hdmhstde.Value
                    hdmhwtyp.Value = ""
                    hdflgoth.Value = ""
                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetClaimType(dsNW As DataSet, dsStatus As DataSet)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim dsStatus1 = New DataSet()
                Dim value1 = dsNW.Tables(0).Rows(0).Item("MHRTTY").ToString().Trim()
                Dim rs1 = objBL.getClaimTypByValue(value1, dsStatus1)
                If rs1 > 0 Then
                    If dsStatus1 IsNot Nothing Then
                        If dsStatus.Tables(0).Rows.Count > 0 Then
                            hdmhwtyp.Value = dsStatus1.Tables(0).Rows(0).Item("MHWTYP").ToString().Trim()
                            hdflgoth.Value = dsStatus1.Tables(0).Rows(0).Item("FLGOTH").ToString().Trim()

                            If hdflgoth.Value = "O" Then
                                Dim dsGen = New DataSet()
                                Dim rsTTP = objBL.getDataByGeneric(txtClaimNoData.Text, dsGen)
                                If rsTTP > 0 Then
                                    If dsGen IsNot Nothing Then
                                        If dsGen.Tables(0).Rows.Count > 0 Then
                                            hdmhwtyp.Value += " - " & dsGen.Tables(0).Rows(0).Item("MHOTTP").ToString()
                                        End If
                                    End If
                                End If
                            End If
                        End If
                    End If
                End If

                txtClaimType.Text = hdmhwtyp.Value
                hdmhwrea.Value = ""
                hdmhwtyp.Value = ""
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetVendorByNumber(vendorNo As String)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim dsResult = New DataSet()
                Dim rs = objBL.GetVendorByNumber(vendorNo, dsResult)
                If rs > 0 Then
                    If dsResult IsNot Nothing Then
                        If dsResult.Tables(0).Rows.Count > 0 Then
                            Session("VndnName") = dsResult.Tables(0).Rows(0).Item("VMNAME").ToString().Trim()
                        Else
                            Session("VndnName") = Nothing
                        End If
                    Else
                        Session("VndnName") = Nothing
                    End If
                Else
                    Session("VndnName") = Nothing
                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Session("VndnName") = Nothing
        End Try
    End Sub

    Public Sub GetSalesmanNameByNumber(salesNo As String)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim dsResult = New DataSet()
                Dim rs = objBL.GetSalesmanNameByNumber(salesNo, dsResult)
                If rs > 0 Then
                    If dsResult IsNot Nothing Then
                        If dsResult.Tables(0).Rows.Count > 0 Then
                            Session("SlsName") = dsResult.Tables(0).Rows(0).Item("USNAME").ToString().Trim()
                        Else
                            Session("SlsName") = Nothing
                        End If
                    Else
                        Session("SlsName") = Nothing
                    End If
                Else
                    Session("SlsName") = Nothing
                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
            Session("SlsName") = Nothing
        End Try
    End Sub

    Public Sub GetClaimReason(dsNW As DataSet, Optional flag As Boolean = False, Optional rsValue As String = Nothing)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If flag Then
                    Dim dsReason = New DataSet()
                    Dim value2 = rsValue
                    Dim rs2 = objBL.getDataByReason(value2, dsReason)
                    If rs2 > 0 Then
                        If dsReason IsNot Nothing Then
                            If dsReason.Tables(0).Rows.Count > 0 Then
                                Session("ClaimReason") = dsReason.Tables(0).Rows(0).Item("MHWREA").ToString().Trim()
                            Else
                                Session("ClaimReason") = Nothing
                            End If
                        Else
                            Session("ClaimReason") = Nothing
                        End If
                    Else
                        Session("ClaimReason") = Nothing
                    End If
                Else
                    Dim dsReason = New DataSet()
                    Dim value2 = dsNW.Tables(0).Rows(0).Item("MHREASN").ToString().Trim()
                    Dim rs2 = objBL.getDataByReason(value2, dsReason)
                    If rs2 > 0 Then
                        If dsReason IsNot Nothing Then
                            If dsReason.Tables(0).Rows.Count > 0 Then
                                hdmhwrea.Value = dsReason.Tables(0).Rows(0).Item("MHWREA").ToString().Trim()
                                Session("ClaimReason") = hdmhwrea.Value
                                hdflgoth.Value = dsReason.Tables(0).Rows(0).Item("FLGOTH").ToString().Trim()

                                If hdflgoth.Value = "O" Then
                                    Dim dsGen1 = New DataSet()
                                    Dim rsTRS = objBL.getDataByGeneric1(txtClaimNoData.Text, dsGen1)
                                    If rsTRS > 0 Then
                                        If dsGen1 IsNot Nothing Then
                                            If dsGen1.Tables(0).Rows.Count > 0 Then
                                                hdmhwrea.Value += " - " & dsGen1.Tables(0).Rows(0).Item("MHOTRS").ToString()
                                            End If
                                        End If
                                    End If
                                End If
                            End If
                        End If
                    End If
                End If

                txtClaimReason.Text = hdmhwrea.Value
                hdcwstde.Value = ""
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetActualStatus(dsData As DataSet, Optional wrnNo As String = Nothing, Optional updTxtField As Boolean = False)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim dsStatus2 = New DataSet()
                Dim value3 As String = Nothing

                If Not String.IsNullOrEmpty(wrnNo) Then
                    value3 = wrnNo
                Else
                    If dsData IsNot Nothing Then
                        If dsData.Tables(0).Rows.Count > 0 Then
                            value3 = dsData.Tables(0).Rows(0).Item("CWSTAT").ToString().Trim()
                        End If
                    End If
                End If
                'value3 = dsData.Tables(0).Rows(0).Item("CWSTAT").ToString().Trim()

                Dim rs3 = objBL.getDataByStatus1(value3, dsStatus2)

                If rs3 > 0 Then
                    If dsStatus2 IsNot Nothing Then
                        If dsStatus2.Tables(0).Rows.Count > 0 Then
                            hdcwstde.Value = dsStatus2.Tables(0).Rows(0).Item("mhwtyp").trim()
                        End If
                    End If
                End If

                If updTxtField Then
                    Session("cwstde") = hdcwstde.Value
                Else
                    txtActualStatus.Text = hdcwstde.Value.Trim().ToUpper()
                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub LoadDDLLocation(dsNW As DataSet)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                'hdcmbtxtdiag.Value = ""
                Dim dsData = New DataSet()
                Dim rs5 = objBL.GetExistingLocationsWarr(dsData)
                If rs5 > 0 Then
                    If dsData IsNot Nothing Then
                        If dsData.Tables(0).Rows.Count > 0 Then
                            LoadDropDownLists(ddlLocation)

                            Dim comparerDiag = dsNW.Tables(0).Rows(0).Item("CWLOCN").ToString()

                            ddlLocation.SelectedIndex = ddlLocation.Items.IndexOf(ddlLocation.Items.FindByValue(comparerDiag))
                            If ddlLocation.SelectedIndex > 0 Then
                                hdLocatIndex.Value = ddlLocation.SelectedIndex.ToString()
                                hdLocationSelected.Value = ddlLocation.SelectedItem.Text
                                'hdSelectedDiagnose.Value = hdcwdiagd.Value
                                'txtloc.Text = hdcwdiagd.Value
                            Else
                                ddlLocation.SelectedIndex = 0
                                hdLocationSelected.Value = "0"
                                hdLocatIndex.Value = "-1"
                            End If

                            'Dim comparerDiag = dsNW.Tables(0).Rows(0).Item("MHDIAG").ToString().Trim()
                            'Dim myiitt = dsDLLDiag.Tables(0).AsEnumerable().Where(Function(item) item.Item("CNT03").ToString().Equals(comparerDiag, StringComparison.InvariantCultureIgnoreCase))
                            'If myiitt.Count = 1 Then
                            'hdcwdiagd.Value = myiitt(0).Item("INTDES").ToString().Trim()
                            'End If
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub LoadDDLDiagnose(dsNW As DataSet)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                hdcmbtxtdiag.Value = ""
                Dim dsDLLDiag = New DataSet()
                Dim rs5 = objBL.getDiagnoseDataForDDL(dsDLLDiag)
                If rs5 > 0 Then
                    If dsDLLDiag IsNot Nothing Then
                        If dsDLLDiag.Tables(0).Rows.Count > 0 Then
                            LoadDropDownLists(ddlDiagnoseData)

                            Dim comparerDiag = dsNW.Tables(0).Rows(0).Item("MHDIAG").ToString()

                            ddlDiagnoseData.SelectedIndex = ddlDiagnoseData.Items.IndexOf(ddlDiagnoseData.Items.FindByValue(comparerDiag))
                            If ddlDiagnoseData.SelectedIndex > 0 Then
                                hdSelectedDiagnoseIndex.Value = ddlDiagnoseData.SelectedIndex.ToString()
                                hdcwdiagd.Value = ddlDiagnoseData.SelectedItem.Text
                                hdSelectedDiagnose.Value = hdcwdiagd.Value
                                txtDiagnoseData.Text = hdcwdiagd.Value
                            Else
                                ddlDiagnoseData.SelectedIndex = 0
                                hdSelectedDiagnoseIndex.Value = "0"
                            End If

                            'Dim comparerDiag = dsNW.Tables(0).Rows(0).Item("MHDIAG").ToString().Trim()
                            'Dim myiitt = dsDLLDiag.Tables(0).AsEnumerable().Where(Function(item) item.Item("CNT03").ToString().Equals(comparerDiag, StringComparison.InvariantCultureIgnoreCase))
                            'If myiitt.Count = 1 Then
                            'hdcwdiagd.Value = myiitt(0).Item("INTDES").ToString().Trim()
                            'End If
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetClaimDiagnose(dsNW As DataSet, Optional flag As Boolean = False, Optional rsValue As String = Nothing)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                If flag Then
                    Dim dsDiag = New DataSet()
                    Dim value4 = rsValue
                    Dim rs4 = objBL.getDataByDiagnose(value4, dsDiag)
                    If rs4 > 0 Then
                        If dsDiag IsNot Nothing Then
                            If dsDiag.Tables(0).Rows.Count > 0 Then
                                Session("ClaimDiagnose") = dsDiag.Tables(0).Rows(0).Item("CWDIAGD").ToString().Trim()
                            Else
                                Session("ClaimDiagnose") = Nothing
                            End If
                        Else
                            Session("ClaimDiagnose") = Nothing
                        End If
                    Else
                        Session("ClaimDiagnose") = Nothing
                    End If
                Else
                    Dim dsDiag = New DataSet()
                    Dim value4 = dsNW.Tables(0).Rows(0).Item("MHDIAG").ToString().Trim()
                    Dim rs4 = objBL.getDataByDiagnose(value4, dsDiag)
                    hdSelectedDiagnose.Value = String.Empty
                    If rs4 > 0 Then
                        If dsDiag IsNot Nothing Then
                            If dsDiag.Tables(0).Rows.Count > 0 Then
                                hdcwdiagd.Value = dsDiag.Tables(0).Rows(0).Item("CWDIAGD").ToString().Trim()
                                Session("ClaimDiagnose") = hdcwdiagd.Value
                                hdSelectedDiagnose.Value = hdcwdiagd.Value
                            End If
                        End If
                    End If
                End If

                'txtDiagnoseData.Text = hdcwdiagd.Value
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetCustomerName(dsNW As DataSet)
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim dsCustName = New DataSet()
                Dim custNumb = dsNW.Tables(0).Rows(0).Item("MHCUNR").ToString().Trim()
                Dim rs6 = objBL.getDataByCustNumber(custNumb, dsCustName)
                If rs6 > 0 Then
                    If dsCustName IsNot Nothing Then
                        If dsCustName.Tables(0).Rows.Count > 0 Then
                            txtCustomerName.Text = dsCustName.Tables(0).Rows(0).Item("CUNAM").ToString().Trim()
                        Else
                            txtCustomerName.Text = ""
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetSupplierInvoiceAndDate(vendorNo As String, claimNo As String, Optional ByRef strMessage As String = Nothing)
        Dim dsResult1 As DataSet = New DataSet()
        Dim dsResult2 As DataSet = New DataSet()
        Dim dsResult3 As DataSet = New DataSet()
        Dim blValidation As Boolean = False
        Dim dateResult As String = Nothing
        strMessage = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rs1 = objBL.GetSupplierInvoiceFirst(vendorNo, claimNo, dsResult1)
                If rs1 > 0 Then
                    If dsResult1 IsNot Nothing Then
                        If dsResult1.Tables(0).Rows.Count > 0 Then

                            Dim date1 = dsResult1.Tables(0).Rows(0).Item("AWINDT").ToString().Trim()
                            BuildDates(date1, dateResult, True)

                            txtInvoiceDate1.Text = dateResult
                            txtInvoiceNo1.Text = dsResult1.Tables(0).Rows(0).Item("AWINNO").ToString().Trim().ToUpper()

                            Exit Sub
                        End If
                    End If
                End If
                Dim rs2 = objBL.GetSupplierInvoiceSecond(vendorNo, claimNo, dsResult2)
                If rs2 > 0 Then
                    If dsResult2 IsNot Nothing Then
                        If dsResult2.Tables(0).Rows.Count > 0 Then

                            Dim date1 = dsResult2.Tables(0).Rows(0).Item("AMINDT").ToString().Trim()
                            BuildDates(date1, dateResult, True)

                            txtInvoiceDate1.Text = dateResult
                            txtInvoiceNo1.Text = dsResult2.Tables(0).Rows(0).Item("AMINNO").ToString().Trim().ToUpper()

                            Exit Sub
                        End If
                    End If
                End If
                Dim rs3 = objBL.GetSupplierInvoiceThird(vendorNo, claimNo, dsResult3)
                If rs3 > 0 Then
                    If dsResult3 IsNot Nothing Then
                        If dsResult3.Tables(0).Rows.Count > 0 Then

                            Dim date1 = dsResult3.Tables(0).Rows(0).Item("AHINDT").ToString().Trim()
                            BuildDates(date1, dateResult, True)

                            txtInvoiceDate1.Text = dateResult
                            txtInvoiceNo1.Text = dsResult3.Tables(0).Rows(0).Item("AHINNO").ToString().Trim().ToUpper()

                            Exit Sub
                        End If
                    End If
                End If

                If Not blValidation Then
                    txtInvoiceDate1.Text = String.Empty
                    txtInvoiceNo1.Text = String.Empty
                End If

            End Using
        Catch ex As Exception
            strMessage = ex.Message
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetProjectGenData(wrno As String, Optional flag As Boolean = False)
        'if flag claim  > 500
        Dim ds = New DataSet()
        Dim obj = New FinalClaimObj()
        Try

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                Dim rsResult = objBL.GetProjectGenData(wrno, ds)
                If rsResult > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then

                            obj.Code = wrno

                            For Each dw As DataRow In ds.Tables(0).Rows
                                If dw.Item("instat").trim().Equals("B") Then
                                    obj.Over500Auth = If(String.IsNullOrEmpty(dw.Item("inover$").ToString().Trim()), False, True)
                                    obj.Over500Email = If(String.IsNullOrEmpty(dw.Item("inovremlst").ToString().Trim()), False, True)
                                End If
                                If dw.Item("instat").trim().Equals("I") Then
                                    obj.Approved = If(String.IsNullOrEmpty(dw.Item("intapprv").ToString().Trim()), False, True)
                                End If
                            Next

                            obj.RequiresAuth = flag

                            Session("finalObject") = obj
                        End If
                    End If
                End If
            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetInternalStatus(intValue As String)
        Dim ds = New DataSet()
        Dim strDateOut As String = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                'internal status process
                Dim intStatus As String = Nothing
                Dim dsInternal = New DataSet()
                Dim rsi = objBL.getDataByInternalSts(intValue, dsInternal)

                If rsi > 0 Then
                    If dsInternal IsNot Nothing Then
                        If dsInternal.Tables(0).Rows.Count > 0 Then

                            For Each dw As DataRow In dsInternal.Tables(0).Rows
                                intStatus = dw.Item("INSTAT").ToString().Trim()

                                Select Case intStatus
                                    Case "I"
                                        chkInitialReview.Checked = True
                                        txtInitialReview.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtInitialReviewDate.Text = strDateOut

                                        chkInitialReview.Enabled = False
                                        txtInitialReview.Enabled = False
                                        txtInitialReviewDate.Enabled = False
                                        lnkInitialReview.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "B"
                                        chkAcknowledgeEmail.Checked = True
                                        txtAcknowledgeEmail.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtAcknowledgeEmailDate.Text = strDateOut

                                        chkAcknowledgeEmail.Enabled = False
                                        txtAcknowledgeEmail.Enabled = False
                                        txtAcknowledgeEmailDate.Enabled = False
                                        lnkAcknowledgeEmail.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "D"
                                        chkInfoCust.Checked = True
                                        txtInfoCust.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtInfoCustDate.Text = strDateOut

                                        chkInfoCust.Enabled = False
                                        txtInfoCust.Enabled = False
                                        txtInfoCustDate.Enabled = False
                                        lnkInfoCust.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "F"
                                        chkPartRequested.Checked = True
                                        txtPartRequested.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtPartRequestedDate.Text = strDateOut

                                        chkPartRequested.Enabled = False
                                        txtPartRequested.Enabled = False
                                        txtPartRequestedDate.Enabled = False
                                        lnkPartRequested.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "G"
                                        chkPartReceived.Checked = True
                                        txtPartReceived.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtPartReceivedDate.Text = strDateOut

                                        chkPartReceived.Enabled = False
                                        txtPartReceived.Enabled = False
                                        txtPartReceivedDate.Enabled = False
                                        lnkPartReceived.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "H"
                                        chkTechReview.Checked = True
                                        txtTechReview.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtTechReviewDate.Text = strDateOut

                                        chkTechReview.Enabled = False
                                        txtTechReview.Enabled = False
                                        txtTechReviewDate.Enabled = False
                                        lnkTechReview.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "J"
                                        chkWaitSupReview.Checked = True
                                        txtWaitSupReview.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtWaitSupReviewDate.Text = strDateOut

                                        chkWaitSupReview.Enabled = False
                                        txtWaitSupReview.Enabled = False
                                        txtWaitSupReviewDate.Enabled = False
                                        lnkWaitSupReview.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "R"
                                        chkClaimCompleted.Checked = True
                                        txtClaimCompleted.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtClaimCompletedDate.Text = strDateOut

                                        chkClaimCompleted.Enabled = False
                                        txtClaimCompleted.Enabled = False
                                        txtClaimCompletedDate.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "V"
                                        chkClaimCompleted.Checked = True
                                        txtClaimCompleted.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtClaimCompletedDate.Text = strDateOut

                                        chkClaimCompleted.Enabled = False
                                        txtClaimCompleted.Enabled = False
                                        txtClaimCompletedDate.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case "K"
                                        chkClaimCompleted.Checked = True
                                        txtClaimCompleted.Text = dw.Item("INUSER").ToString().Trim().ToUpper()
                                        BuildDates(dw.Item("INCLDT").ToString().Trim(), strDateOut)
                                        txtClaimCompletedDate.Text = strDateOut

                                        chkClaimCompleted.Enabled = False
                                        txtClaimCompleted.Enabled = False
                                        txtClaimCompletedDate.Enabled = False

                                        setInternalStatus(intStatus)
                                    Case Else

                                End Select
                            Next
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetDataOver500()
        Dim ds = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getDataForOver500(ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            hdCLMemail.Value = ds.Tables(0).Rows(0).Item("CNTDE1").ToString().Trim()
                            hdCLMuser.Value = Mid(ds.Tables(0).Rows(0).Item("CNTDE2").ToString(), 1, 10).Trim()
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetQuarantineReq(value As String)
        Dim ds = New DataSet()
        Dim strDateOut As String = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getIfQuarantineReq(value, ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            chkQuarantine.Checked = True
                            txtQuarantine.Text = ds.Tables(0).Rows(0).Item("INUSER").ToString().Trim().ToUpper()
                            Dim dtQ = ds.Tables(0).Rows(0).Item("INCLDT").ToString().Trim()
                            BuildDates(dtQ, strDateOut)
                            txtQuarantineDate.Text = If(Not String.IsNullOrEmpty(dtQ), strDateOut, "")
                            chkQuarantine.Enabled = False
                            txtQuarantine.Enabled = False
                            txtQuarantineDate.Enabled = False
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetCostSuggested(value As String)
        Dim ds = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getCostSuggested(value, ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            txtConsDamageTotal.Text = If(String.IsNullOrEmpty(ds.Tables(0).Rows(0).Item("INCOSTSUG$").ToString().Trim()), "0", ds.Tables(0).Rows(0).Item("INCOSTSUG$").ToString().Trim())
                            txtCDLabor.Text = If(String.IsNullOrEmpty(ds.Tables(0).Rows(0).Item("COSTDMGLBR").ToString().Trim()), "0", ds.Tables(0).Rows(0).Item("COSTDMGLBR").ToString().Trim())
                            txtCDPart.Text = If(String.IsNullOrEmpty(ds.Tables(0).Rows(0).Item("COSTDMGPTN").ToString().Trim()), "0", ds.Tables(0).Rows(0).Item("COSTDMGPTN").ToString().Trim())
                            txtCDFreight.Text = If(String.IsNullOrEmpty(ds.Tables(0).Rows(0).Item("COSTDMGFRE").ToString().Trim()), "0", ds.Tables(0).Rows(0).Item("COSTDMGFRE").ToString().Trim())
                            txtCDMisc.Text = If(String.IsNullOrEmpty(ds.Tables(0).Rows(0).Item("COSTDMGMIS").ToString().Trim()), "0", ds.Tables(0).Rows(0).Item("COSTDMGMIS").ToString().Trim())
                        End If
                    End If
                Else
                    txtConsDamageTotal.Text = "0"
                    txtCDLabor.Text = "0"
                    txtCDPart.Text = "0"
                    txtCDFreight.Text = "0"
                    txtCDMisc.Text = "0"
                End If
            End Using
        Catch ex As Exception

        End Try
    End Sub

    Public Sub GetEngineInformation(value As String)
        Dim ds = New DataSet()
        Try
            txtModel1.Text = ""
            txtSerial1.Text = ""
            txtArrangement1.Text = ""

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getEngineInfo(value, ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            txtModel1.Text = ds.Tables(0).Rows(0).Item("INEMOD").ToString().Trim()
                            txtSerial1.Text = ds.Tables(0).Rows(0).Item("INESER").ToString().Trim()
                            txtArrangement1.Text = ds.Tables(0).Rows(0).Item("INEARR").ToString().Trim()
                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetAuthForSalesOver500(value As String)
        Dim ds = New DataSet()
        Dim bContinue As Boolean = False
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getAuthForSalesOver500(value, ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            chkClaimAuth.Checked = True
                            chkClaimAuth.Enabled = False
                            txtClaimAuth.Text = ds.Tables(0).Rows(0).Item("INUSER").ToString().Trim()
                            txtClaimAuth.Enabled = False
                            Dim dtAuth = ds.Tables(0).Rows(0).Item("INCLDT").ToString().Trim()
                            txtClaimAuthDate.Text = If(Not String.IsNullOrEmpty(dtAuth), dtAuth.Split(" ")(0).ToString(), "")
                            txtClaimAuthDate.Enabled = False
                            txtAmountApproved.Text = ds.Tables(0).Rows(0).Item("INAPESLS").ToString().Trim()
                            txtAmountApproved.Enabled = False

                            'If Not String.IsNullOrEmpty(txtAmountApproved.Text) Then
                            '    If CInt(txtAmountApproved.Text) > 0 Then
                            '        txtConsDamageTotal.Enabled = False
                            '        txtCDMisc.Enabled = False
                            '        txtCDLabor.Enabled = False
                            '        txtCDPart.Enabled = False
                            '        txtCDFreight.Enabled = False

                            '        txtFreight.Enabled = False
                            '        txtParts.Enabled = False
                            '    End If
                            'End If
                            'txtTotalAmount.Enabled = False
                        Else
                            bContinue = True
                        End If
                    Else
                        bContinue = True
                    End If
                Else
                    bContinue = True
                End If

                If bContinue Then

                    Dim dbTotal As Double = 0
                    Dim dbConf As Double = 0

                    Dim bTotal = Double.TryParse(txtTotValue.Text.Trim(), dbTotal)
                    Dim bConf = Double.TryParse(hdSwLimitAmt.Value.Trim(), dbConf)

                    If bTotal And bConf Then
                        If dbConf >= dbTotal Then
                            txtClaimAuth.Enabled = True
                            txtClaimAuthDate.Enabled = True
                            txtAmountApproved.Enabled = True
                            chkClaimAuth.Checked = False
                            chkClaimAuth.Enabled = True
                        Else
                            txtClaimAuth.Enabled = False
                            txtClaimAuthDate.Enabled = False
                            txtAmountApproved.Enabled = False
                            chkClaimAuth.Checked = False
                            chkClaimAuth.Enabled = False
                        End If
                    End If
                End If

            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetClaimApproved(value As String)
        Dim ds = New DataSet()
        Try
            chkApproved.Checked = False
            chkDeclined.Checked = False
            chkApproved.Enabled = True
            chkDeclined.Enabled = True

            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getClaimData(value, "I", ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            Dim val = ds.Tables(0).Rows(0).Item("INTAPPRV").ToString().Trim()
                            If UCase(val).Equals("L") Then
                                chkApproved.Checked = True
                                chkDeclined.Checked = False
                                chkApproved.Enabled = False
                                chkDeclined.Enabled = False
                            ElseIf UCase(val).Equals("M") Then
                                chkApproved.Checked = False
                                chkDeclined.Checked = True
                                chkApproved.Enabled = False
                                chkDeclined.Enabled = False
                            End If
                        End If
                    End If
                End If
            End Using

        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetLoadNewComments(value As String)
        Dim ds = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.getLoadNewComments(value, ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            Dim temp = ds.Tables(0).Rows(0).Item("INDESC").ToString().Trim()
                            txtCustStatement.Text = temp.Trim()
                        Else
                            'revisar si va el extra
                        End If
                    End If
                End If

                Dim valTotal = If(Not String.IsNullOrEmpty(txtParts.Text.Trim()), CInt(txtParts.Text.Trim()), 0)
                Dim valFreight = If(Not String.IsNullOrEmpty(txtFreight.Text.Trim()), CInt(txtFreight.Text.Trim()), 0)
                Dim valDptoApp = If(Not String.IsNullOrEmpty(txtAmountApproved.Text.Trim()), CInt(txtAmountApproved.Text.Trim()), 0)
                txtTotalAmount.Text = (valTotal + valFreight + valDptoApp).ToString()
                txtTotalAmount.Enabled = False
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub GetPartialCreditValue(value As String, Optional ByRef strText As String = Nothing)
        Dim ds = New DataSet()
        Dim strDateOut As String = Nothing
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim rs = objBL.GetPartialCreditRef(value, ds)
                If rs > 0 Then
                    If ds IsNot Nothing Then
                        If ds.Tables(0).Rows.Count > 0 Then
                            chkPCred.Checked = True

                            Dim strPcred = ds.Tables(0).Rows(0).Item("CWPHO3").ToString().Trim().ToUpper()
                            strText = strPcred
                            txtPartCred.Text = strPcred.Split(":")(1).Trim()
                            chkPCred.Enabled = False
                            txtPartCred.Enabled = False
                            txtQuarantineDate.Enabled = False

                            txtTotValue.Text = txtPartCred.Text
                            txtCustStatement.Text += strPcred

                        End If
                    End If
                End If
            End Using
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

#End Region

#Region "Test Modal Popup"



#End Region

#Region "Activation Methods"

    Private Sub deactCmd()
        btnChangeVendor.Enabled = False
        btnChangePart.Enabled = False
        'btnAddFiles.Enabled = False
        'cmdAskcust.Enabled = False
        btnAddComments.Enabled = False
        'cmdQControl.Enabled = False
        'cmdpurchasing.Enabled = False
        'cmdSave.Enabled = False
    End Sub

    Private Sub deactTxt()
        txtProductionCode.Enabled = False
        txtInvoiceNo.Enabled = False
        txtUnitCost.Enabled = False
        txtQty.Enabled = False
        txtModel.Enabled = False
        txtHWorked.Enabled = False
    End Sub

    Private Sub deactCmb()
        txtDateEntered.Enabled = False
        txtInstDate.Enabled = False
    End Sub

    Private Sub actTxt()
        txtProductionCode.Enabled = True
        txtInvoiceNo.Enabled = True
        txtUnitCost.Enabled = True
        txtQty.Enabled = True
        txtContactName.Enabled = True
        txtContactPhone.Enabled = True
        txtContactEmail.Enabled = True
        txtModel.Enabled = True
        txtHWorked.Enabled = True
    End Sub

    Private Sub actCmb()
        txtDateEntered.Enabled = True
        txtInstDate.Enabled = True
    End Sub

    Private Sub actCmd()
        btnChangeVendor.Enabled = True
        btnChangePart.Enabled = True
        'btnAddFiles.Enabled = True
        'cmdAskcust.Enabled = True
        btnSeeFiles.Enabled = True
        btnAddComments.Enabled = True
        btnSeeComments.Enabled = True
        'cmdQControl.Enabled = True
        btnPurchasing.Enabled = True
        btnSaveTab.Enabled = True
    End Sub

#End Region

#End Region

    Public Sub BuildDates(Optional strDateIn As String = Nothing, Optional ByRef strDateOut As String = Nothing, Optional flag As Boolean = False)
        Try
            Dim culture As IFormatProvider = New CultureInfo("en-US", True)
            Dim cultureInf As CultureInfo = CultureInfo.CreateSpecificCulture("en-US")
            Dim dtfi As DateTimeFormatInfo = cultureInf.DateTimeFormat
            dtfi.DateSeparator = "-"
            Dim dtOut As DateTime = New DateTime()
            ''Dim currdate = Now().Date().ToString().Replace("/", "-") 'force  yyyy-mm-dd

            If Not flag Then

                Dim strDate = If(String.IsNullOrEmpty(strDateIn), DateTime.Now().ToString().Split(" ")(0), strDateIn.Split(" ")(0))

                'Dim strDate = DateTime.Now().ToString().Split(" ")(0)

                Dim fixDate = strDate.Split("/")
                Dim strFixDateRs As String = Nothing
                For Each item As String In fixDate
                    If item.Length < 2 Then
                        strFixDateRs += "0" + item + "-"
                    Else
                        strFixDateRs += item + "-"
                    End If
                Next

                strFixDateRs = strFixDateRs.Remove(strFixDateRs.Length - 1, 1)
                'strDate = "07-23-2021"
                Dim currdate = DateTime.TryParseExact(strFixDateRs, "MM-dd-yyyy", culture, Nothing, dtOut)
                If currdate Then
                    Dim strDt1 = dtOut.ToString("yyyy-MM-dd", dtfi)
                    Dim currhour = Now().TimeOfDay().ToString() ' force to hh:nn:ss

                    datenow = strDt1
                    hournow = currhour.Split(".")(0).Replace(":", ".")
                End If

                If Not String.IsNullOrEmpty(strDateIn) Then
                    strDateOut = datenow
                End If

                'Dim dt1 = DateTime.ParseExact(strDate, "MM-dd-yyyy", CultureInfo.InvariantCulture)
                'datenow = currdate.Split(" ")(0)

            Else
                If Not String.IsNullOrEmpty(strDateIn) Then
                    Dim newDate As String = Nothing
                    If CInt(strDateIn.Length) Mod 2 > 0 Then
                        newDate = strDateIn.Insert(0, "0")
                    Else
                        newDate = strDateIn
                    End If

                    Dim dt As DateTime = New DateTime()
                    newDate = newDate.Insert(2, "-")
                    newDate = newDate.Insert(5, "-")

                    Dim bll = DateTime.TryParseExact(newDate, "MM-dd-yy", DateTimeFormatInfo.InvariantInfo, Nothing, dt)
                    If bll Then
                        Dim curDate = dt.ToString("d", DateTimeFormatInfo.InvariantInfo)
                        strDateOut = curDate
                    End If
                End If
            End If



        Catch ex As Exception
            Dim eee = ex.Message
            Dim pp = eee
        End Try
    End Sub

    Public Sub testDates(ByRef lstFormats As List(Of String), ByRef lstDFormats As List(Of String))


        Try

            lstFormats = New List(Of String)()
            lstFormats.Add("08/14/2018 12:00:00 AM")
            lstFormats.Add("08/14/2018 12:00:00")
            lstFormats.Add("08/14/2018 12:00 AM")
            lstFormats.Add("08/14/18 12:00:00 AM")
            lstFormats.Add("08/14/18 12:00:00")
            lstFormats.Add("08/14/18 12:00 AM")



            lstDFormats = New List(Of String)()
            lstDFormats.Add("MM/dd/yyyy HH:mm:ss")
            lstDFormats.Add("MM/dd/yyyy h:mm tt")
            lstDFormats.Add("MM/dd/yyyy H:mm")
            lstDFormats.Add("MM/dd/yyyy hh:mm tt")
            lstDFormats.Add("MM/dd/yyyy HH:mm")

            lstDFormats.Add("MM/dd/yy HH:mm:ss")
            lstDFormats.Add("MM/dd/yy h:mm tt")
            lstDFormats.Add("MM/dd/yy H:mm")
            lstDFormats.Add("MM/dd/yy hh:mm tt")
            lstDFormats.Add("MM/dd/yy HH:mm")




        Catch ex As Exception

        End Try
    End Sub

    Public Sub executesDropDownList(ddl As DropDownList)
        Dim exMessage As String = " "
        Try
            If ddl.ID = "ddlSearchReason" Then
                ddlSearchReason.SelectedIndex = If(Not String.IsNullOrEmpty(hdReason.Value), CInt(ddlSearchReason.Items.IndexOf(ddlSearchReason.Items.FindByValue(hdReason.Value))), 0)
                ddlSearchReason_SelectedIndexChanged(ddl, Nothing)
            ElseIf ddl.ID = "ddlSearchDiagnose" Then
                ddlSearchDiagnose.SelectedIndex = If(Not String.IsNullOrEmpty(hdDiagnose.Value), CInt(ddlSearchDiagnose.Items.IndexOf(ddlSearchDiagnose.Items.FindByValue(hdDiagnose.Value))), 0)
                ddlSearchDiagnose_SelectedIndexChanged(ddl, Nothing)
            ElseIf ddl.ID = "ddlSearchExtStatus" Then
                ddlSearchExtStatus.SelectedIndex = If(Not String.IsNullOrEmpty(hdStatusOut.Value), CInt(ddlSearchExtStatus.Items.IndexOf(ddlSearchExtStatus.Items.FindByValue(hdStatusOut.Value))), 0)
                'ddlSearchExtStatus_SelectedIndexChanged(ddl, Nothing)
            ElseIf ddl.ID = "ddlSearchIntStatus" Then
                ddlSearchIntStatus.SelectedIndex = If(Not String.IsNullOrEmpty(hdStatusIn.Value), CInt(ddlSearchIntStatus.Items.IndexOf(ddlSearchIntStatus.Items.FindByValue(hdStatusIn.Value))), 0)
                ddlSearchIntStatus_SelectedIndexChanged(ddl, Nothing)
            ElseIf ddl.ID = "ddlSearchUser" Then
                ddlSearchUser.SelectedIndex = If(Not String.IsNullOrEmpty(hdUserSelected.Value), CInt(ddlSearchUser.Items.IndexOf(ddlSearchUser.Items.FindByValue(hdUserSelected.Value))), 0)
                ddlSearchUser_SelectedIndexChanged(ddl, Nothing)
            ElseIf ddl.ID = "ddlDiagnoseData" Then
                'ddlDiagnoseData.SelectedIndex = If(Not String.IsNullOrEmpty(hdSelectedDiagnose.Value), CInt(ddlDiagnoseData.Items.IndexOf(ddlDiagnoseData.Items.FindByValue(hdSelectedDiagnose.Value))), 0)
                ddlDiagnoseData.SelectedIndex = If(Not String.IsNullOrEmpty(hdSelectedDiagnoseIndex.Value), CInt(hdSelectedDiagnoseIndex.Value), 0)
                ddlDiagnoseData_SelectedIndexChanged(ddl, Nothing)
            ElseIf ddl.ID = "ddlLocation" Then
                ddlLocation.SelectedIndex = If(Not String.IsNullOrEmpty(hdLocatIndex.Value), CInt(hdLocatIndex.Value), 0)
                ddlLocation_SelectedIndexChanged(ddl, Nothing)
            ElseIf ddl.ID = "ddlInitRev" Then

            ElseIf ddl.ID = "ddlTechRev" Then

            End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try
    End Sub

    Public Sub LoadDropDownLists(ddl As DropDownList)
        Dim dtOut As DataTable = New DataTable()
        Dim result As Integer = -1
        Dim dsData = DirectCast(Session("DataSource"), DataSet)
        Dim ds As DataSet = New DataSet()
        Dim exMessage As String = " "

        Dim vndOEMDenied = ConfigurationManager.AppSettings("vendorOEMCodeDenied")
        Dim itemDenied = ConfigurationManager.AppSettings("itemCategories")
        Dim vndDenied = ConfigurationManager.AppSettings("vendorCodesDenied")

        Try

            If ddl.ID = "ddlSearchReason" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

                        result = objBL.getReasonValues(ds)
                        'result = objBL.getSearchByReasonData(dsData, dtOut)
                    End Using

                    LoadingDropDownList(ddlSearchReason, ds.Tables(0).Columns("cntde1").ColumnName,
                                                ds.Tables(0).Columns("cnt03").ColumnName, ds.Tables(0), True, " ")
                End If
            ElseIf ddl.ID = "ddlSearchDiagnose" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        'result = objBL.getSearchByDiagnoseData(dsData, dtOut)
                        result = objBL.getDiagnoseValues(ds)
                    End Using

                    LoadingDropDownList(ddlSearchDiagnose, ds.Tables(0).Columns("cntde1").ColumnName,
                                            ds.Tables(0).Columns("cnt03").ColumnName, ds.Tables(0), True, " ")
                End If
            ElseIf ddl.ID = "ddlSearchExtStatus" Then
                If ddl.Items.Count = 0 Then
                    'Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                    '    result = objBL.getSearchByStatusOutData(dsData, dtOut)
                    'End Using

                    'cmbstatus

                    Dim ListItem2 As ListItem = New ListItem()
                    ddl.Items.Add(New WebControls.ListItem(" ", "-1"))
                    ddl.Items.Add(New WebControls.ListItem("ALL", "0"))
                    ddl.Items.Add(New WebControls.ListItem("ALL OPEN", "1"))
                    ddl.Items.Add(New WebControls.ListItem("ALL CLOSED", "2"))
                    ddl.Items.Add(New WebControls.ListItem("VOID", "3"))

                    'LoadingDropDownList(ddlSearchExtStatus, dtOut.Columns("extstatus").ColumnName,
                    '                            dtOut.Columns("ID").ColumnName, dtOut, True, "NA - Select Status")
                End If
            ElseIf ddl.ID = "ddlSearchIntStatus" Then

                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        result = objBL.addToDdlClaimIntSts(dsData)
                    End Using

                    If result > 0 Then
                        If dsData IsNot Nothing Then
                            If dsData.Tables(0).Rows.Count > 0 Then
                                Session("dsIntStatus") = dsData

                                Dim initialLi As ListItem = New ListItem(" ", "-1")
                                ddlSearchIntStatus.Items.Add(initialLi)

                                For Each dw As DataRow In dsData.Tables(0).Rows
                                    Dim Value = dw.Item("CNT03").ToString().Trim() + " - " + dw.Item("INTDES").ToString().Trim()
                                    Dim li As ListItem = New ListItem(Value, dw.Item("CNT03").ToString().Trim())
                                    ddlSearchIntStatus.Items.Add(li)
                                Next
                            End If
                        End If
                    End If
                End If

                'cmbIntSts
                'Dim ListItem1 As ListItem = New ListItem()
                'ddl.Items.Add(New WebControls.ListItem("ALL", "0"))
                'ddl.Items.Add(New WebControls.ListItem("INITIALIZED", "1"))
                'ddl.Items.Add(New WebControls.ListItem("PENDING CUST. SERVICE", "2"))
                'ddl.Items.Add(New WebControls.ListItem("PENDING OTHERS", "3"))
                'ddl.Items.Add(New WebControls.ListItem("FINALIZED", "4"))

            ElseIf ddl.ID = "ddlClaimTypeOk" Then
                'cmbType
                Dim ListItem As ListItem = New ListItem()
                ddl.Items.Add(New WebControls.ListItem(" ", "-1"))
                ddl.Items.Add(New WebControls.ListItem("ALL", "0"))
                ddl.Items.Add(New WebControls.ListItem("WARRANTY TYPES", "1"))
                ddl.Items.Add(New WebControls.ListItem("NON-WARRANTY TYPES", "2"))
                ddl.Items.Add(New WebControls.ListItem("INTERNAL TYPES", "3"))

            ElseIf ddl.ID = "ddlSearchUser" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        result = objBL.getSearchByUserData(dsData, dtOut)
                    End Using

                    LoadingDropDownList(ddlSearchUser, dtOut.Columns("User").ColumnName,
                                                dtOut.Columns("ID").ColumnName, dtOut, True, " ")
                End If
            ElseIf ddl.ID = "ddlLocation" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        result = objBL.GetExistingLocationsWarr(dsData)
                        If dsData IsNot Nothing Then
                            If dsData.Tables(0).Rows.Count > 0 Then
                                LoadingDropDownList(ddlLocation, dsData.Tables(0).Columns("CNTDE1").ColumnName,
                                                    dsData.Tables(0).Columns("cwlocn").ColumnName, dsData.Tables(0), True, " ")
                            End If
                        End If
                    End Using
                End If
            ElseIf ddl.ID = "ddlDiagnoseData" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        result = objBL.getDiagnoseDataForDDL(dsData)

                        LoadingDropDownList(ddlDiagnoseData, dsData.Tables(0).Columns("INTDES").ColumnName,
                                                    dsData.Tables(0).Columns("CNT03").ColumnName, dsData.Tables(0), True, " ")
                    End Using
                End If
            ElseIf ddl.ID = "ddlInitRev" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        result = objBL.GetUsersInInitialReview(dsData)

                        LoadingDropDownList(ddlInitRev, dsData.Tables(0).Columns("usname").ColumnName,
                                                    dsData.Tables(0).Columns("ususer").ColumnName, dsData.Tables(0), True, " ")
                    End Using
                End If
            ElseIf ddl.ID = "ddlTechRev" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        Dim strNames = DirectCast(Session("techReviewUsr"), String)
                        'result = objBL.GetUsersInTechnicalReview(dsData)
                        result = objBL.GetClaimPrivUsr(strNames, dsData)
                        LoadingDropDownList(ddlTechRev, dsData.Tables(0).Columns("usname").ColumnName,
                                                    dsData.Tables(0).Columns("ususer").ColumnName, dsData.Tables(0), True, " ")
                    End Using
                End If
            ElseIf ddl.ID = "ddlVndNo" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        result = objBL.GetVendorForFilter(vndDenied, vndOEMDenied, itemDenied, dsData)
                        If dsData IsNot Nothing Then
                            If dsData.Tables(0).Rows.Count > 0 Then
                                LoadingDropDownList(ddlVndNo, dsData.Tables(0).Columns("VMNAME").ColumnName,
                                                    dsData.Tables(0).Columns("VMVNUM").ColumnName, dsData.Tables(0), True, " ")
                            End If
                        End If
                    End Using
                End If
            ElseIf ddl.ID = "ddlLocat" Then
                If ddl.Items.Count = 0 Then
                    Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                        result = objBL.GetExistingLocationsWarr(dsData)
                        If dsData IsNot Nothing Then
                            If dsData.Tables(0).Rows.Count > 0 Then
                                LoadingDropDownList(ddlLocat, dsData.Tables(0).Columns("CNTDE1").ColumnName,
                                                    dsData.Tables(0).Columns("cwlocn").ColumnName, dsData.Tables(0), True, " ")
                            End If
                        End If
                    End Using
                End If
            End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try
    End Sub

    Public Function setDateFlag(itemDate As String) As Integer
        Dim exMessage As String = " "
        Dim days As Integer = 0
        Dim result As Integer = -1
        Try
            Dim datetimeValue = New DateTime()
            Dim curDate = DateTime.Now().Date()
            Dim flag = Date.TryParseExact(itemDate.Trim(), "MM/dd/yyyy", CultureInfo.CurrentCulture,
                      DateTimeStyles.None, datetimeValue)
            If flag Then
                days = (curDate - datetimeValue.Date()).Days
                If days <= 30 Then
                    'green (1)
                    result = 1
                ElseIf days > 30 And days <= 60 Then
                    'yellow (2)
                    result = 2
                Else
                    'red (3)
                    result = 3
                End If
            End If
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function IsFileinUse(file As FileInfo) As Boolean
        Dim exMessage As String = Nothing
        Dim opened As Boolean = False
        Dim myStream As FileStream = Nothing
        Try
            myStream = file.Open(FileMode.Open, FileAccess.ReadWrite, FileShare.None)
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            'Log.Error(exMessage)
            opened = True
        Finally
            If myStream IsNot Nothing Then
                myStream.Close()
            End If
        End Try
        Return opened
    End Function

    Structure messageType
        Const success = "success"
        Const warning = "warning"
        Const info = "info"
        Const [Error] = "Error"
    End Structure

    Public Sub closeAtkPopup()
        ScriptManager.RegisterStartupScript(Me, Page.GetType, "Message1", "AutomaticBack()", True)
    End Sub

    Public Sub OpenBrowser(Optional pp As String = Nothing)
        ScriptManager.RegisterStartupScript(Me, Page.GetType, "Browser", "OpenBrowser('" & pp & "')", True)
    End Sub

    Public Sub SendMessage(methodMessage As String, detailInfo As String, Optional hasResponse As Boolean = False)
        If hasResponse Then
            'ScriptManager.RegisterStartupScript(Me, Page.GetType, "Message", "messageFormSubmitted1('" & methodMessage & " ', '" & detailInfo & "')", True)
            ScriptManager.RegisterStartupScript(Me, Page.GetType, "Message", "messageFormSubmitted1('" & methodMessage & " ', '" & detailInfo & "')", True)
        Else
            ScriptManager.RegisterStartupScript(Me, Page.GetType, "Message", "messageFormSubmitted('" & methodMessage & " ', '" & detailInfo & "')", True)
        End If
    End Sub

    'Public Sub SendMessageResponse(methodMessage As String, detailInfo As String)
    '    ScriptManager.RegisterStartupScript(Me, Page.GetType, "Message", "messageFormSubmitted1('" & methodMessage & " ', '" & detailInfo & "')", True)
    'End Sub

    Public Function MyNewRow(claimId As Object) As String
        Return String.Format("</td></tr><tr id = 'tr{0}' class = 'collapsed-row'><td></td><td colspan = '100' style = 'padding:0px;margin: 0px;'>", claimId)
    End Function

    Private Function fillObj1(dt As DataTable) As List(Of ClaimsGeneral)
        Dim exMessage As String = Nothing
        Dim objLosSales = Nothing
        Dim lstGeneral = New List(Of ClaimsGeneral)()
        Try

            'Dim blah = exampleItems.Select (Function(x) New With { .Key = x.Key, .Value = x.Value }).ToList

            For Each dw As DataRow In dt.Rows

            Next

            'Dim items As IList(Of ClaimsGeneral) = dt.AsEnumerable() _
            '    .Select(Function(row) New WishList() With {
            '    .WHLCODE = row.Item("WHLCODE").ToString(),
            '    .IMPTN = row.Item("IMPTN").ToString(),
            '    .WHLDATE = row.Item("WHLDATE").ToString(),
            '    .WHLUSER = row.Item("WHLUSER").ToString(),
            '    .IMDSC = row.Item("IMDSC").ToString(),
            '    .WHLSTATUS = row.Item("WHLSTATUS").ToString(),
            '    .WHLSTATUSU = row.Item("WHLSTATUSU").ToString(),
            '    .VENDOR = If(row.Item("VENDOR").ToString() = "000000" Or row.Item("VENDOR").ToString() = " ", "", row.Item("VENDOR").ToString()),
            '    .PA = row.Item("PA").ToString(),
            '    .PS = row.Item("PS").ToString(),
            '    .qtysold = row.Item("qtysold").ToString(),
            '    .QTYQTE = row.Item("QTYQTE").ToString(),
            '    .TIMESQ = row.Item("TIMESQ").ToString(),
            '    .IMPRC = row.Item("IMPRC").ToString(),
            '    .LOC20 = row.Item("LOC20").ToString(),
            '    .IMMOD = row.Item("IMMOD").ToString(),
            '    .IMCATA1 = row.Item("IMCATA1").ToString(),
            '    .SUBCAT = row.Item("SUBCAT").ToString(),
            '    .IMPC1 = row.Item("IMPC1").ToString(),
            '    .IMPC2 = row.Item("IMPC2").ToString(),
            '    .WHLFROM = row.Item("WHLFROM").ToString(),
            '    .WHLCOMMENT = row.Item("WHLCOMMENT").ToString(),
            '    .VENDORNAME = row.Item("vendorname").ToString()
            '    }).ToList()

            Return Items
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return objLosSales
        End Try
    End Function

    Protected Sub hdClaimNoSelected_ValueChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)
            'Dim dsFilter As DataSet = New DataSet()
            'Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            'Dim valueToCompare As String = hdClaimNoSelected.Value
            'txtClaimNo.Text = valueToCompare

            ''Dim controlName As String = Page.Request.Params("__EVENTTARGET")

            ''If Not LCase(controlName).Contains("ddl") Then
            'For Each dr As DataRow In dsData.Tables(0).Rows
            '    If dr.ItemArray(0).ToString() = valueToCompare Then
            '        Dim dtr As DataRow = dtFilter.NewRow()
            '        dtr.ItemArray = dr.ItemArray
            '        dtFilter.Rows.Add(dtr)
            '        'sentence = " and reason = " + valueToCompare + " "
            '        'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '    End If
            'Next
            'If dtFilter IsNot Nothing Then
            '    If dtFilter.Rows.Count > 0 Then
            '        dsFilter.Tables.Add(dtFilter)
            '        Session("DataFilter") = dsFilter
            '        lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '        GetClaimsReport("", 1, dsFilter)
            '    Else
            '        lblTotalClaims.Text = 0
            '        grvClaimReport.DataSource = Nothing
            '        grvClaimReport.DataBind()
            '    End If
            'End If
            'End If

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try

    End Sub

    Protected Sub hdPartNoSelected_ValueChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)
            'Dim dsFilter As DataSet = New DataSet()
            'Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            'Dim valueToCompare As String = hdPartNoSelected.Value
            'txtPartNo.Text = valueToCompare


            'For Each dr As DataRow In dsData.Tables(0).Rows
            '    If dr.ItemArray(7).ToString() = valueToCompare Then
            '        Dim dtr As DataRow = dtFilter.NewRow()
            '        dtr.ItemArray = dr.ItemArray
            '        dtFilter.Rows.Add(dtr)
            '        'sentence = " and reason = " + valueToCompare + " "
            '        'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '    End If
            'Next
            'If dtFilter IsNot Nothing Then
            '    If dtFilter.Rows.Count > 0 Then
            '        dsFilter.Tables.Add(dtFilter)
            '        Session("DataFilter") = dsFilter
            '        lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '        GetClaimsReport("", 1, dsFilter)
            '    Else
            '        lblTotalClaims.Text = 0
            '        grvClaimReport.DataSource = Nothing
            '        grvClaimReport.DataBind()
            '    End If
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try

    End Sub

    Protected Sub hdCustomerNoSelected_ValueChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)
            'Dim dsFilter As DataSet = New DataSet()
            'Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            'Dim valueToCompare As String = hdCustomerNoSelected.Value
            'txtCustomer.Text = valueToCompare


            'For Each dr As DataRow In dsData.Tables(0).Rows
            '    If dr.ItemArray(4).ToString() = valueToCompare Then
            '        Dim dtr As DataRow = dtFilter.NewRow()
            '        dtr.ItemArray = dr.ItemArray
            '        dtFilter.Rows.Add(dtr)
            '        'sentence = " and reason = " + valueToCompare + " "
            '        'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '    End If
            'Next
            'If dtFilter IsNot Nothing Then
            '    If dtFilter.Rows.Count > 0 Then
            '        dsFilter.Tables.Add(dtFilter)
            '        Session("DataFilter") = dsFilter
            '        lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '        GetClaimsReport("", 1, dsFilter)
            '    Else
            '        lblTotalClaims.Text = 0
            '        grvClaimReport.DataSource = Nothing
            '        grvClaimReport.DataBind()
            '    End If
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try

    End Sub

    Protected Sub hdDateInitSelected_ValueChanged(sender As Object, e As EventArgs)
        Dim exMessage As String = " "
        Try
            'Dim dsData = DirectCast(Session("DataSource"), DataSet)
            'Dim dsFilter As DataSet = New DataSet()
            'Dim dtFilter As DataTable = dsData.Tables(0).Clone()
            'Dim valueToCompare As String = hdDateInitSelected.Value
            'txtDateInit.Text = valueToCompare


            'For Each dr As DataRow In dsData.Tables(0).Rows
            '    If dr.ItemArray(5).ToString() = valueToCompare Then
            '        Dim dtr As DataRow = dtFilter.NewRow()
            '        dtr.ItemArray = dr.ItemArray
            '        dtFilter.Rows.Add(dtr)
            '        'sentence = " and reason = " + valueToCompare + " "
            '        'datatable2.Rows(i).ItemArray = datatable1(i).ItemArray
            '    End If
            'Next
            'If dtFilter IsNot Nothing Then
            '    If dtFilter.Rows.Count > 0 Then
            '        dsFilter.Tables.Add(dtFilter)
            '        Session("DataFilter") = dsFilter
            '        lblTotalClaims.Text = dsFilter.Tables(0).Rows.Count
            '        GetClaimsReport("", 1, dsFilter)
            '    Else
            '        lblTotalClaims.Text = 0
            '        grvClaimReport.DataSource = Nothing
            '        grvClaimReport.DataBind()
            '    End If
            'End If
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
        End Try

    End Sub

    Protected Sub getClaimNumbers(claimSelected As String, dateValue As DateTime)
        Dim exMessage As String = " "
        Dim dsResult = New DataSet()
        Try
            Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()
                Dim result As Integer = objBL.getClaimNumbers(claimSelected, dateValue, dsResult)
                If (result > 0 And dsResult IsNot Nothing And dsResult.Tables(0).Rows.Count > 0) Then

                End If
            End Using
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try

    End Sub

    Protected Sub LoadingDropDownList(dwlControl As DropDownList, displayMember As String, valueMember As String, data As DataTable, genrateSelect As Boolean, strTextSelect As String)

        Try
            Dim dtTemp As DataTable = data.Copy()
            dwlControl.Items.Clear()
            If (genrateSelect) Then
                Dim row As DataRow = dtTemp.NewRow()
                row(displayMember) = strTextSelect
                row(valueMember) = -1
                dtTemp.Rows.InsertAt(row, 0)
            End If

            dwlControl.DataSource = dtTemp
            dwlControl.DataTextField = displayMember.Trim()
            dwlControl.DataValueField = valueMember.Trim()
            dwlControl.DataBind()
        Catch ex As Exception
            writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, "User: " + Session("userid").ToString(), " Exception: " + ex.Message + ". At Time: " + DateTime.Now.ToString())
        End Try

    End Sub

    Private Sub cleanSearchTextboxes(txtCurrent As TextBox, flag As Boolean)
        txtCurrent.Text = Not flag
        txtClaimNo.Text = If(txtCurrent.ID = txtClaimNo.ID, Not flag, flag)

    End Sub

    Public Sub DefaultInputConf(Optional parent As ControlCollection = Nothing, Optional ctl As Control = Nothing)
        Try
            If parent IsNot Nothing Then
                For Each ctl1 As Control In parent
                    If (ctl1.Controls.Count > 0) Then
                        ClearInputCustom(parent, Nothing)
                    Else
                        If TypeOf ctl1 Is TextBox Then
                            'DirectCast(ctl1, TextBox).Text = String.Empty
                            DirectCast(ctl1, TextBox).Enabled = False
                        End If
                        If TypeOf ctl1 Is DropDownList Then
                            'If (DirectCast(ctl1, DropDownList).Enabled Or Not (DirectCast(ctl1, DropDownList)).Enabled) Then
                            'DirectCast(ctl1, DropDownList).ClearSelection()
                            DirectCast(ctl1, DropDownList).Enabled = False
                            'End If
                        End If
                        If TypeOf ctl1 Is CheckBox Then
                            'DirectCast(ctl1, CheckBox).Checked = False
                            DirectCast(ctl1, CheckBox).Enabled = False
                        End If
                        If TypeOf ctl1 Is Button Then
                            DirectCast(ctl1, Button).Enabled = False
                        End If
                    End If
                Next
            Else
                If TypeOf ctl Is TextBox Then
                    'DirectCast(ctl1, TextBox).Text = String.Empty
                    DirectCast(ctl, TextBox).Enabled = False
                End If
                If TypeOf ctl Is DropDownList Then
                    'If (DirectCast(ctl1, DropDownList).Enabled Or Not (DirectCast(ctl1, DropDownList)).Enabled) Then
                    'DirectCast(ctl1, DropDownList).ClearSelection()
                    DirectCast(ctl, DropDownList).Enabled = False
                    'End If
                End If
                If TypeOf ctl Is CheckBox Then
                    'DirectCast(ctl1, CheckBox).Checked = False
                    DirectCast(ctl, CheckBox).Enabled = False
                End If
                If TypeOf ctl Is Button Then
                    DirectCast(ctl, Button).Enabled = False
                End If
            End If
        Catch ex As Exception

        End Try
    End Sub

    Public Sub ClearInputCustom(Optional parent As ControlCollection = Nothing, Optional ctl As Control = Nothing)

        Try
            If parent IsNot Nothing Then
                For Each ctl1 As Control In parent

                    If (ctl1.Controls.Count > 0) Then
                        ClearInputCustom(parent, Nothing)
                    Else
                        If TypeOf ctl1 Is TextBox Then
                            DirectCast(ctl1, TextBox).Text = String.Empty
                        End If
                        If TypeOf ctl1 Is DropDownList Then
                            If (DirectCast(ctl1, DropDownList).Enabled Or Not (DirectCast(ctl1, DropDownList)).Enabled) Then
                                DirectCast(ctl1, DropDownList).ClearSelection()
                            End If
                        End If
                        If TypeOf ctl1 Is CheckBox Then
                            DirectCast(ctl1, CheckBox).Checked = False
                        End If
                    End If

                Next
            Else

                If TypeOf ctl Is TextBox Then
                    DirectCast(ctl, TextBox).Text = String.Empty
                End If
                If TypeOf ctl Is DropDownList Then
                    If (DirectCast(ctl, DropDownList).Enabled Or Not (DirectCast(ctl, DropDownList)).Enabled) Then
                        DirectCast(ctl, DropDownList).ClearSelection()
                    End If
                End If
                If TypeOf ctl Is CheckBox Then
                    DirectCast(ctl, CheckBox).Checked = False
                End If

            End If

        Catch ex As Exception

        End Try
    End Sub

#End Region

#Region "Thread methods"

    Public Sub launchSecondaryThread()
        Dim exMessage As String = ""
        Try
            Dim ctx As HttpContext = HttpContext.Current
            Session("curContext") = ctx
            Dim tt As Thread = New Thread(Sub() Me.worker_Thread(ctx))
            tt.Name = "ExtClaim2"
            'tt.IsBackground = True
            tt.Start()
            SendMessage("When the requested excel document has been generated you will be notified. Please wait a few seconds.", messageType.info)
            'While Not tt.Join(0)
            '    Dim pp = "1"
            'End While

            'Dim blResult = callRec()
            'If blResult Then
            '    SendMessage("The requested document has been placed in the downloads folder.", messageType.success)
            'End If

        Catch ex As Exception
            exMessage = ex.Message
        End Try
    End Sub

    Private Function worker_Thread(Optional ByVal ctx As HttpContext = Nothing)
        Dim result As Integer = -1
        Dim dsResult As DataSet = New DataSet()
        Try
            Threading.Thread.Sleep(1000)
            'Dim vendorsOk = DirectCast(Session("VendorsAccepted"), String)
            'Using objBL As ClaimsProject.BL.ClaimsProject = New ClaimsProject.BL.ClaimsProject()

            DownloadExcel()
            'btnGetTemplate_Click(Nothing, Nothing)
            'getLSData(dsResult, CInt(timesQ), vndSel) 'prepare the session variables with default values

            'End Using

        Catch ex As Exception
            Dim eee = ex.Message
        End Try
    End Function

#End Region

#Region "AutoComplete"

    <WebMethod()>
    Public Shared Function GetAutoCompleteDataClaimNo(prefixText As String) As List(Of String)
        Dim exMessage As String = " "
        'Dim resultInt As Integer
        Try
            Dim result = New List(Of String)
            'ConString = "DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;"
            'Using con As Odbc.OdbcConnection = New Odbc.OdbcConnection("DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;")

            Dim con As OdbcConnection = New OdbcConnection("DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;")
            con.Open()

            Dim DbCommand As OdbcCommand = con.CreateCommand()
            Dim Sql = " SELECT DISTINCT (QS36F.CSMREH.MHMRNR) ClAIM# FROM QS36F.CSMREH, QS36F.CLMWRN, QS36F.CLMINTSTS WHERE QS36F.CSMREH.MHRTTY <> 'B' 
                    and QS36F.CSMREH.MHMRNR = QS36F.CLMWRN.CWDOCN and QS36F.CLMWRN.CWWRNO = QS36F.CLMINTSTS.INCLNO 
                    and CTPINV.CVTDCDTF(QS36F.CSMREH.MHMRDT, 'MDY') >= '{0}' AND CTPINV.CVTDCDTF(QS36F.CSMREH.MHMRDT,'MDY') <= '{1}' 
                    and VARCHAR_FORMAT(QS36F.CSMREH.MHMRNR) LIKE '%{2}%' ORDER BY QS36F.CSMREH.MHMRNR DESC 
                    FETCH FIRST 10 ROWS ONLY"

            Dim TermDays As String = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("DateTerm")), ConfigurationManager.AppSettings("DateTerm"), "730")
            Dim todayDate = DateTime.Now
            Dim fromDate = todayDate.AddDays(-(CInt(TermDays)))

            Dim sqlResult = String.Format(Sql, fromDate.ToString("MM/dd/yyyy"), Today().ToString("MM/dd/yyyy"), prefixText)
            DbCommand.CommandText = sqlResult
            Dim DbReader As OdbcDataReader = DbCommand.ExecuteReader()

            Using sdr As OdbcDataReader = DbReader
                While sdr.Read()
                    result.Add(sdr("Claim#").ToString())
                End While
            End Using

            DbReader.Close()
            DbCommand.Dispose()
            con.Close()

            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return Nothing
        End Try

    End Function

    <WebMethod()>
    Public Shared Function GetAutoCompleteDataPartNo(prefixText As String) As List(Of String)
        Dim exMessage As String = " "
        'Dim resultInt As Integer
        Try
            Dim result = New List(Of String)
            'ConString = "DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;"
            'Using con As Odbc.OdbcConnection = New Odbc.OdbcConnection("DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;")

            Dim con As OdbcConnection = New OdbcConnection("DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;")
            con.Open()

            Dim DbCommand As OdbcCommand = con.CreateCommand()
            Dim Sql = " SELECT DISTINCT (QS36F.CLMWRN.CWPTNO) PART# FROM QS36F.CSMREH, QS36F.CLMWRN, QS36F.CLMINTSTS WHERE QS36F.CSMREH.MHRTTY <> 'B' 
                    and QS36F.CSMREH.MHMRNR = QS36F.CLMWRN.CWDOCN and QS36F.CLMWRN.CWWRNO = QS36F.CLMINTSTS.INCLNO 
                    and CTPINV.CVTDCDTF(QS36F.CSMREH.MHMRDT, 'MDY') >= '{0}' AND CTPINV.CVTDCDTF(QS36F.CSMREH.MHMRDT,'MDY') <= '{1}' 
                    and VARCHAR_FORMAT(QS36F.CLMWRN.CWPTNO) LIKE '%{2}%' ORDER BY QS36F.CLMWRN.CWPTNO DESC 
                    FETCH FIRST 10 ROWS ONLY"

            Dim TermDays As String = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("DateTerm")), ConfigurationManager.AppSettings("DateTerm"), "730")
            Dim todayDate = DateTime.Now
            Dim fromDate = todayDate.AddDays(-(CInt(TermDays)))

            Dim sqlResult = String.Format(Sql, fromDate.ToString("MM/dd/yyyy"), Today().ToString("MM/dd/yyyy"), prefixText)
            DbCommand.CommandText = sqlResult
            Dim DbReader As OdbcDataReader = DbCommand.ExecuteReader()

            Using sdr As OdbcDataReader = DbReader
                While sdr.Read()
                    result.Add(sdr("Part#").ToString())
                End While
            End Using

            DbReader.Close()
            DbCommand.Dispose()
            con.Close()

            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return Nothing
        End Try

    End Function

    <WebMethod()>
    Public Shared Function GetAutoCompleteDataCustomerNo(prefixText As String) As List(Of String)
        Dim exMessage As String = " "
        'Dim resultInt As Integer
        Try
            Dim result = New List(Of String)
            'ConString = "DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;"
            'Using con As Odbc.OdbcConnection = New Odbc.OdbcConnection("DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;")

            Dim con As OdbcConnection = New OdbcConnection("DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;")
            con.Open()

            Dim DbCommand As OdbcCommand = con.CreateCommand()
            Dim Sql = " SELECT DISTINCT (QS36F.CSMREH.MHCUNR) CUSTOMER FROM QS36F.CSMREH, QS36F.CLMWRN, QS36F.CLMINTSTS WHERE QS36F.CSMREH.MHRTTY <> 'B' 
                    and QS36F.CSMREH.MHMRNR = QS36F.CLMWRN.CWDOCN and QS36F.CLMWRN.CWWRNO = QS36F.CLMINTSTS.INCLNO 
                    and CTPINV.CVTDCDTF(QS36F.CSMREH.MHMRDT, 'MDY') >= '{0}' AND CTPINV.CVTDCDTF(QS36F.CSMREH.MHMRDT,'MDY') <= '{1}' 
                    and VARCHAR_FORMAT(QS36F.CSMREH.MHCUNR) LIKE '%{2}%' ORDER BY QS36F.CSMREH.MHCUNR DESC 
                    FETCH FIRST 10 ROWS ONLY"

            Dim TermDays As String = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("DateTerm")), ConfigurationManager.AppSettings("DateTerm"), "730")
            Dim todayDate = DateTime.Now
            Dim fromDate = todayDate.AddDays(-(CInt(TermDays)))

            Dim sqlResult = String.Format(Sql, fromDate.ToString("MM/dd/yyyy"), Today().ToString("MM/dd/yyyy"), prefixText)
            DbCommand.CommandText = sqlResult
            Dim DbReader As OdbcDataReader = DbCommand.ExecuteReader()

            Using sdr As OdbcDataReader = DbReader
                While sdr.Read()
                    result.Add(sdr("Customer").ToString())
                End While
            End Using

            DbReader.Close()
            DbCommand.Dispose()
            con.Close()

            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return Nothing
        End Try

    End Function

    <WebMethod()>
    Public Shared Function GetAutoCompleteDataInitDate(prefixText As String) As List(Of String)
        Dim exMessage As String = " "
        'Dim resultInt As Integer
        Try
            Dim result = New List(Of String)
            'ConString = "DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;"
            'Using con As Odbc.OdbcConnection = New Odbc.OdbcConnection("DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;")

            Dim con As OdbcConnection = New OdbcConnection("DSN=COSTEX400;UID=INTRANET;PWD=CTP6100;")
            con.Open()

            Dim DbCommand As OdbcCommand = con.CreateCommand()
            Dim Sql = " SELECT DISTINCT (CSMREH.MHCUNR) CUSTOMER FROM CSMREH, CLMWRN, CLMINTSTS WHERE CSMREH.MHRTTY <> 'B' 
                    and CSMREH.MHMRNR = CLMWRN.CWDOCN and CLMWRN.CWWRNO = CLMINTSTS.INCLNO 
                    and CTPINV.CVTDCDTF(CSMREH.MHMRDT, 'MDY') >= '{0}' AND CTPINV.CVTDCDTF(CSMREH.MHMRDT,'MDY') <= '{1}' 
                    and VARCHAR_FORMAT(CSMREH.MHMRNR) LIKE '%{2}%' ORDER BY CSMREH.MHMRNR DESC 
                    FETCH FIRST 5 ROWS ONLY"

            Dim TermDays As String = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("DateTerm")), ConfigurationManager.AppSettings("DateTerm"), "730")
            Dim todayDate = DateTime.Now
            Dim fromDate = todayDate.AddDays(-(CInt(TermDays)))

            Dim sqlResult = String.Format(Sql, fromDate.ToString("MM/dd/yyyy"), Today().ToString("MM/dd/yyyy"), prefixText)
            DbCommand.CommandText = sqlResult
            Dim DbReader As OdbcDataReader = DbCommand.ExecuteReader()

            Using sdr As OdbcDataReader = DbReader
                While sdr.Read()
                    result.Add(sdr("Customer").ToString())
                End While
            End Using

            DbReader.Close()
            DbCommand.Dispose()
            con.Close()

            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return Nothing
        End Try

    End Function

#End Region

#Region "Logs"

    Public Sub writeLog(strLogCadenaCabecera As String, strLevel As Logs.ErrorTypeEnum, strMessage As String, strDetails As String)
        strLogCadena = strLogCadenaCabecera + " " + System.Reflection.MethodBase.GetCurrentMethod().ToString()
        Dim userid = If(DirectCast(Session("userid"), String) IsNot Nothing, DirectCast(Session("userid"), String), "N/A")
        objLog.WriteLog(strLevel, "ClaimsApp" & strLevel, strLogCadena, userid, strMessage, strDetails)
    End Sub

    Private Sub btnCloseTab_Command(sender As Object, e As CommandEventArgs) Handles btnCloseTab.Command

    End Sub

    Private Sub btnCloseClaim_Command(sender As Object, e As CommandEventArgs) Handles btnCloseClaim.Command

    End Sub

#End Region

#Region "Work with Objects"


#End Region

End Class