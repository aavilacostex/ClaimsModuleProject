Imports System.Configuration
Imports System.Globalization
Imports Microsoft.Win32

Public Class ClaimsProject : Implements IDisposable
    Private disposedValue As Boolean

#Region "Claims"

    Public Function GetClaimsReportSingle(ByRef dsResult As DataSet, Optional ByVal strDates As String() = Nothing) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimsDataSingle(dsResult, strDates)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetClaimsReportFull(ByRef dsResult As DataSet, Optional ByVal strDates As String() = Nothing) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimsDataFull(dsResult, strDates)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getClaimNumbers(claimSelected As String, dateValue As DateTime, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getClaimNumbers(claimSelected, dateValue, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getSearchByReasonData(dsData As DataSet, ByRef dt As DataTable) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim strReason As String = Nothing

        dt = New DataTable()
        dt.Columns.Add("ID")
        dt.Columns.Add("Reason")
        dt.Columns(0).AutoIncrement = True

        Dim strDataArray As String()
        Try
            strReason = dsData.Tables(0).Rows(0).ItemArray(2).ToString().ToUpper()
            For Each dr As DataRow In dsData.Tables(0).Rows
                If Not strReason.Contains(dr.ItemArray(2).ToString().ToUpper()) Then
                    strReason += "," + dr.ItemArray(2).ToString()
                End If
            Next

            If strReason IsNot Nothing Then
                strDataArray = strReason.Split(",")
                For Each item As String In strDataArray
                    If Not String.IsNullOrEmpty(item) Then
                        Dim R As DataRow = dt.NewRow
                        R("Reason") = item
                        dt.Rows.Add(R)
                    End If
                Next
            End If

            If dt.Rows.Count > 0 Then
                result = 0
            Else
                result = -1
            End If
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try

    End Function

    Public Function getSearchByDiagnoseData(dsData As DataSet, ByRef dt As DataTable) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim strDiagnose As String = Nothing

        dt = New DataTable()
        dt.Columns.Add("ID")
        dt.Columns.Add("Diagnose")
        dt.Columns(0).AutoIncrement = True

        Dim strDataArray As String()
        Try
            strDiagnose = dsData.Tables(0).Rows(0).ItemArray(3).ToString().ToUpper()
            For Each dr As DataRow In dsData.Tables(0).Rows
                If Not strDiagnose.Contains(dr.ItemArray(3).ToString().ToUpper()) Then
                    strDiagnose += "," + dr.ItemArray(3).ToString()
                End If
            Next

            If strDiagnose IsNot Nothing Then
                strDataArray = strDiagnose.Split(",")
                For Each item As String In strDataArray
                    If Not String.IsNullOrEmpty(item) Then
                        Dim R As DataRow = dt.NewRow
                        R("Diagnose") = item
                        dt.Rows.Add(R)
                    End If
                Next
            End If

            If dt.Rows.Count > 0 Then
                result = 0
            Else
                result = -1
            End If
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try

    End Function

    Public Function getSearchByStatusOutData(dsData As DataSet, ByRef dt As DataTable) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim strStatusOut As String = Nothing

        dt = New DataTable()
        dt.Columns.Add("ID")
        dt.Columns.Add("ExtStatus")
        dt.Columns(0).AutoIncrement = True

        Dim strDataArray As String()
        Try
            strStatusOut = dsData.Tables(0).Rows(0).ItemArray(6).ToString().ToUpper()
            For Each dr As DataRow In dsData.Tables(0).Rows
                If (Not strStatusOut.Contains(dr.ItemArray(6).ToString().ToUpper())) And (Not String.IsNullOrEmpty(dr.ItemArray(6).ToString().Trim())) Then
                    strStatusOut += "," + dr.ItemArray(6).ToString()
                End If
            Next

            If strStatusOut IsNot Nothing Then
                strDataArray = strStatusOut.Split(",")
                For Each item As String In strDataArray
                    If Not String.IsNullOrEmpty(item.Trim()) Then
                        Dim R As DataRow = dt.NewRow
                        R("ExtStatus") = item
                        dt.Rows.Add(R)
                    End If
                Next
            End If

            If dt.Rows.Count > 0 Then
                result = 0
            Else
                result = -1
            End If
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try

    End Function

    Public Function getSearchByUserData(dsData As DataSet, ByRef dt As DataTable) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim strUser As String = Nothing

        dt = New DataTable()
        dt.Columns.Add("ID")
        dt.Columns.Add("User")
        dt.Columns(0).AutoIncrement = True

        Dim strDataArray As String()
        Try
            strUser = dsData.Tables(0).Rows(0).Item("CWUSER").ToString().ToUpper()
            For Each dr As DataRow In dsData.Tables(0).Rows
                If Not strUser.Contains(dr.Item("CWUSER").ToString().ToUpper()) Then
                    strUser += "," + dr.Item("CWUSER").ToString().ToUpper()
                End If
            Next

            If strUser IsNot Nothing Then
                strDataArray = strUser.Split(",")
                For Each item As String In strDataArray
                    If Not String.IsNullOrEmpty(item) Then
                        Dim R As DataRow = dt.NewRow
                        R("User") = item
                        dt.Rows.Add(R)
                    End If
                Next
            End If

            If dt.Rows.Count > 0 Then
                result = 0
            Else
                result = -1
            End If
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try

    End Function

    Public Function getSearchByStatusInData(dsData As DataSet, ByRef dt As DataTable) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim strUser As String = Nothing

        dt = New DataTable()
        dt.Columns.Add("ID")
        dt.Columns.Add("intstatus")
        dt.Columns(0).AutoIncrement = True

        Dim strDataArray As String()
        Try
            strUser = dsData.Tables(0).Rows(0).ItemArray(11).ToString().ToUpper()
            For Each dr As DataRow In dsData.Tables(0).Rows
                If Not strUser.Contains(dr.ItemArray(11).ToString().ToUpper()) Then
                    strUser += "," + dr.ItemArray(11).ToString()
                End If
            Next

            If strUser IsNot Nothing Then
                strDataArray = strUser.Split(",")
                For Each item As String In strDataArray
                    If Not String.IsNullOrEmpty(item) Then
                        Dim R As DataRow = dt.NewRow
                        R("intstatus") = item
                        dt.Rows.Add(R)
                    End If
                Next
            End If

            If dt.Rows.Count > 0 Then
                result = 0
            Else
                result = -1
            End If
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try

    End Function

    Public Function adjustDatetimeFormat(documentName As String, documentExt As String) As String

        Dim exMessage As String = Nothing
        Try
            Dim name As String = Nothing
            Dim culture As CultureInfo = CultureInfo.CreateSpecificCulture("en-US")
            Dim dtfi As DateTimeFormatInfo = culture.DateTimeFormat
            dtfi.DateSeparator = "."

            Dim now As DateTime = DateTime.Now
            Dim halfName = now.ToString("G", dtfi)
            halfName = halfName.Replace(" ", ".")
            halfName = halfName.Replace(":", "")
            Dim fileName = documentName & "." & halfName & "." & documentExt
            Return fileName
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return Nothing
        End Try

    End Function

    Public Function Determine_OfficeVersion() As String
        Dim exMessage As String = " "
        Dim strExt As String = Nothing
        Try
            Dim strEVersionSubKey As String = "\Excel.Application\CurVer" '/HKEY_CLASSES_ROOT/Excel.Application/Curver

            Dim strValue As String 'Value Present In Above Key
            Dim strVersion As String 'Determines Excel Version
            Dim strExtension() As String = {"xls", "xlsx"}

            Dim rkVersion As RegistryKey = Nothing 'Registry Key To Determine Excel Version
            rkVersion = Registry.ClassesRoot.OpenSubKey(name:=strEVersionSubKey, writable:=False) 'Open Registry Key

            If Not rkVersion Is Nothing Then 'If Key Exists
                strValue = rkVersion.GetValue(String.Empty) 'get Value
                strValue = strValue.Substring(strValue.LastIndexOf(".") + 1) 'Store Value

                Select Case strValue 'Determine Version
                    Case "7"
                        strVersion = "95"
                        strExt = strExtension(0)
                    Case "8"
                        strVersion = "97"
                        strExt = strExtension(0)
                    Case "9"
                        strVersion = "2000"
                        strExt = strExtension(0)
                    Case "10"
                        strVersion = "2002"
                        strExt = strExtension(0)
                    Case "11"
                        strVersion = "2003"
                        strExt = strExtension(0)
                    Case "12"
                        strVersion = "2007"
                        strExt = strExtension(1)
                    Case "14"
                        strVersion = "2010"
                        strExt = strExtension(1)
                    Case "15"
                        strVersion = "2013"
                        strExt = strExtension(1)
                    Case "16"
                        strVersion = "2016"
                        strExt = strExtension(1)
                    Case Else
                        strExt = strExtension(1)
                End Select

                Return strExt
            Else
                Return strExt
            End If
        Catch ex As Exception
            exMessage = ex.Message + ". " + ex.ToString
            Return strExt
        End Try
    End Function

    Public Function FixSingleCommentsLenght(comm As String) As String
        Dim maxLength As Integer = 60
        Dim strResult As String = Nothing
        Try
            If comm.Length > 60 Then
                strResult = comm.Substring(0, Math.Min(comm.Length, maxLength))
            Else
                strResult = comm
            End If

            Return strResult
        Catch ex As Exception
            Return strResult
        End Try
    End Function

    Public Function FixCommentsLenght(lst As List(Of String)) As List(Of String)
        Dim lstOut As List(Of String) = New List(Of String)()
        Dim maxLength As Integer = 60
        Try
            For Each item As String In lst
                If Not String.IsNullOrEmpty(item.Trim()) Then
                    If item.Length > 60 Then
                        Dim newItem = item.Substring(0, Math.Min(item.Length, maxLength))
                        lstOut.Add(newItem.Trim())
                    Else
                        lstOut.Add(item.Trim())
                    End If
                End If
            Next
            'Dim statusquoteNew = If(String.IsNullOrEmpty(strStsQuote), strStsQuote, If(strStsQuote.Length < maxLength, strStsQuote, strStsQuote.Substring(0, Math.Min(strStsQuote.Length, maxLength))))
        Catch ex As Exception

        End Try

    End Function

#Region "Comments"

#Region "No Warning No"

    Public Function GetSuppClaimHeader(claimNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetSuppClaimHeader(claimNo, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimWrnRelationByNo(claimNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimWrnRelationByNo(claimNo, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetWClaimCommentsUnifyData(claimNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetWClaimCommentsUnifyData(claimNo, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

#Region "have Warning no"

    Public Function GetClaimWrnRelationByWrnNo(wrnNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimWrnRelationByWrnNo(wrnNo, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetWClaimCommentsUnifyDatabyWrnNo(wrnNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetWClaimCommentsUnifyDatabyWrnNo(wrnNo, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

#Region "Comments inner divs data"

    Public Function getClaimsByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getClaimsByCode(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getClaimsDetByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getClaimsDetByCode(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    '-----------------------------------------------------------------

    Public Function getSupplierClaimsByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getSupplierClaimsByCode(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getSupplierClaimsDetByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getSupplierClaimsDetByCode(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

    Public Function GetSupplierClaimCommentsUnifyData(vndClaimNo As String, commentSubject As String, commentTxt As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetSupplierClaimCommentsUnifyData(vndClaimNo, commentSubject, commentTxt, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function InsertSuppClaimCommHeader(vndClaimNo As String, cod_comment As String, commDate As String, commSubject As String, commTime As String, commUser As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.InsertSuppClaimCommHeader(vndClaimNo, cod_comment, commDate, commSubject, commTime, commUser)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function InsertSuppClaimCommDetail(vndClaimNo As String, cod_comment As String, cod_detcomment As String, commentTxt As String, partno As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.InsertSuppClaimCommDetail(vndClaimNo, cod_comment, cod_detcomment, commentTxt, partno)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function InsertSuppClaimCommDetail1(vndClaimNo As String, cod_comment As String, cod_detcomment As String, commentTxt As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.InsertSuppClaimCommDetail1(vndClaimNo, cod_comment, cod_detcomment, commentTxt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

#Region "Inserts"

    Public Function InsertWDesc(code As String, desc As String) As Integer
        Dim exMessage As String = Nothing
        Dim result As Integer = -1
        Dim sql As String = " "
        'Dim maxItem As Integer
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.InsertWDesc(code, desc)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function InsertInternalStatus(code As String, chkinitial As String, userid As String, datenow As String, hournow As String, Optional flag As Boolean = False) As Integer
        Dim exMessage As String = Nothing
        Dim result As Integer = -1
        Dim sql As String = " "
        'Dim maxItem As Integer
        Try
            Dim objDal = New DAL.ClaimsProject()

            Dim adjustedDatenow = datenow.Split(" ")(0)
            'Dim adjustedHournow = hournow.Split(".")(0).Replace(":", ".")
            Dim adjustedHournow = hournow

            result = objDal.InsertInternalStatus(code, chkinitial, userid, adjustedDatenow, adjustedHournow, flag)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function InsertEngineInfo(value As String, engineModel As String, engineSerial As String, engineArrang As String) As Integer
        Dim exMessage As String = Nothing
        Dim result As Integer = -1
        Dim sql As String = " "
        'Dim maxItem As Integer
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.InsertEngineInfo(value, engineModel, engineSerial, engineArrang)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function InsertComment(code As String, codComm As String, datenow As String, hoursnow As String, message As String, userid As String, typeUser As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.InsertComment(code, codComm, datenow, hoursnow, message, userid, typeUser)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function InsertCommentDetail(code As String, codComm As String, detComm As String, message As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.InsertCommentDetail(code, codComm, detComm, message)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function InsertCommentDetailwPart(code As String, codComm As String, detComm As String, message As String, partNo As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.InsertCommentDetailwPart(code, codComm, detComm, message, partNo)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

#Region "UPDATES"

    Public Function UpdateWOverSales500(code As String, status As String, check As String, userid As String, freightAm As Double, partsAm As Double, BySalesAm As Double, datenow As Date) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateWOverSales500(code, status, check, userid, freightAm, partsAm, BySalesAm, datenow)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateWOverEmailStat(code As String, status As String, check As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateWOverEmailStat(code, status, check)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateWIntFinalStat(code As String, status As String, chkinitial As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateWIntFinalStat(code, status, chkinitial)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateWFreightType(code As String, status As String, amount As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateWFreightType(code, status, amount)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateWConsDamage(code As String, status As String, amount As String, partAm As String, laborAm As String, freightAm As String, miscAm As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateWConsDamage(code, status, amount, partAm, laborAm, freightAm, miscAm)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateWIntDesc(value As String, desc As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateWIntDesc(value, desc)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateEngineInfo(value As String, engineModel As String, engineSerial As String, engineArrang As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateEngineInfo(value, engineModel, engineSerial, engineArrang)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateWHeaderStatSingle(value As String, chkinitial As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateWHeaderStatSingle(value, chkinitial)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateWHeader(code As String, cname As String, cphone As String, cemail As String, dEntered As String, vendorNo As String, prodCod As String,
                                  invNo As String, partNo As String, loc As String, qty As String, unitCost As String, machModel As String, machSerial As String,
                                  arrangment As String, dInstallation As String, hoursW As String) As Integer

        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateWHeader(code, cname, cphone, cemail, dEntered, vendorNo, prodCod, invNo, partNo, loc, qty, unitCost, machModel, machSerial, arrangment, dInstallation, hoursW)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateNWHeader(value As String, allow As Boolean, Optional diagnose As String = Nothing, Optional cname As String = Nothing, Optional cphone As String = Nothing, Optional cemail As String = Nothing) As Integer
        Dim exMessage As String = Nothing
        Dim result As Integer = -1
        Dim sql As String = " "
        'Dim maxItem As Integer
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateNWHeader(value, allow, diagnose, cname, cphone, cemail)
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function UpdateNWHeaderStat(value As String, status As String) As Integer
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateNWHeaderStat(value, status)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function UpdateCommentsByClaimNo(value As String, comm1 As String, Optional comm2 As String = Nothing, Optional comm3 As String = Nothing) As Integer
        Dim exMessage As String = Nothing
        Dim result As Integer = -1
        Dim sql As String = " "
        'Dim maxItem As Integer
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateCommentsByClaimNo(value, comm1, comm2, comm3)
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function UpdateContactInfoByClaimNo(value As String, allow As Boolean, Optional cname As String = Nothing, Optional cphone As String = Nothing, Optional cemail As String = Nothing) As Integer
        Dim exMessage As String = Nothing
        Dim result As Integer = -1
        Dim sql As String = " "
        'Dim maxItem As Integer
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.UpdateContactInfoByClaimNo(value, allow, cname, cphone, cemail)
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

#End Region

#Region "Import Method"

    Public Function GetRGANumberByClaim(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetRGANumberByClaim(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function MoveRGAToHistoric2(param2 As String, custName As String, custNo As String, code As String) As DataSet
        Dim dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            dsResult = objDal.MoveRGAToHistoric2(param2, custName, custNo, code)
            Return dsResult
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function MoveRGAToHistoric1(param1 As String) As DataSet
        Dim dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            dsResult = objDal.MoveRGAToHistoric1(param1)
            Return dsResult
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function CreateCreditMemo(param1 As String, param2 As String, param3 As String, param4 As String) As DataSet
        Dim dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            dsResult = objDal.CreateCreditMemo(param1, param2, param3, param4)
            Return dsResult
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GetNWDataByClaimNo(claimNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetNWDataByClaimNo(claimNo, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetRGAAmountByClaim(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetRGAAmountByClaim(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getOverEmailMsg(value As String, status As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getOverEmailMsg(value, status, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimByTypeAndReason(value As String, status As String, reason As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimByTypeAndReason(value, status, reason, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetClaimWithCM(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimWithCM(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetClaimInProcessST(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimInProcessST(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetClaimRGAReceived(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimRGAReceived(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByGeneric2(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByGeneric2(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetClaimGeneralClasificaction(ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimGeneralClasificaction(dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByStatus1(status As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByStatus1(status, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByStatus(status As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByStatus(status, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByStatus2(status As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByStatus2(status, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDiagnoseDataForDDL(ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDiagnoseDataForDDL(dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getReasonDescByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getReasonDescByCode(code, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDiagnoseDescByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDiagnoseDescByCode(code, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByDiagnose(diagnose As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByDiagnose(diagnose, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByReason(reason As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByReason(reason, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByGeneric(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByGeneric(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByGeneric1(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByGeneric1(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByCustNumber(custNumber As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByCustNumber(custNumber, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataForOver500(ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataForOver500(dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetUserToGenCM(user As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetUserToGenCM(user, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getIfQuarantineReq(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getIfQuarantineReq(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getCostSuggested(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getCostSuggested(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getEngineInfo(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getEngineInfo(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getClaimData(value As String, status As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getClaimData(value, status, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getAuthForSalesOver500(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getAuthForSalesOver500(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getLoadNewComments(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getLoadNewComments(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByInternalSts(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByInternalSts(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getDataByInternalStsLet(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDataByInternalStsLet(value, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetClaimsDetDataUpdated(claimType As String, claimNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimsDetDataUpdated(claimType, claimNo, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetClaimsDataUpdated(claimType As String, ByRef dsResult As DataSet, Optional strFilters As String = Nothing) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetClaimsDataUpdated(claimType, dsResult, strFilters)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function getmax(table As String, field As String, Optional strWhereAdd As String = Nothing) As Integer
        Dim dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Dim sql As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = If((strWhereAdd IsNot Nothing Or Not String.IsNullOrEmpty(strWhereAdd)), objDal.getmax(table, field, strWhereAdd), objDal.getmax(table, field))

            'result = objDal.getmax(table, field)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetUsersInInitialReview(ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetUsersInInitialReview(dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function

    Public Function GetUsersInTechnicalReview(ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetUsersInTechnicalReview(dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            Return result
        End Try
    End Function


#Region "Method for generics selects"

    Public Function getDataFromDatabaseFull(tableName As String, parameters As Dictionary(Of String, String), ByRef dsResult As DataSet) As Integer
        Dim strWhere As String = ""
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()

            If parameters IsNot Nothing Then
                If parameters.Count > 0 Then
                    strWhere = buildStrWhereFromParameters(parameters)
                End If
            End If

            result = objDal.getDataFromDatabaseFull(tableName, strWhere, dsResult)
            Return result

        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function buildStrWhereFromParameters(parameters As Dictionary(Of String, String)) As String
        Dim strWhereFull = " where {0}"
        Dim strWhere As String = ""
        Dim dictLeng = parameters.Count
        Dim iterator As Integer = 0
        Try

            For Each item In parameters
                If iterator <= dictLeng Then
                    strWhere = item.Key + " = " + item.Value + " and "
                Else
                    strWhere = item.Key + " = " + item.Value
                End If
                iterator += 1
            Next

            strWhereFull = String.Format(strWhereFull, strWhere)
            Return strWhere

        Catch ex As Exception

        End Try
    End Function

#End Region

    Public Function getNWClaimDetail(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getNWClaimDetail(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getNWrnClaimsHeader(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getNWrnClaimsHeader(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getInvoiceDateByNumber(code As String, claim As String) As String
        Dim strResult As String = Nothing
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getInvoiceDateByNumber(code, claim, strResult)
            If result > 0 Then
                Return strResult
            Else
                Return Nothing
            End If
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetCheckingNumber(partNo As String, invoiceNo As String, invoiceDate As String, ByRef chkValue As String) As Integer
        Dim strResult As String = Nothing
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetCheckingNumber(partNo, invoiceNo, invoiceDate, chkValue)
            'If result > 0 Then
            '    Return strResult
            'Else
            '    Return Nothing
            'End If
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetBarSeqNumber(checkingNo As String, ByRef barSeqValue As String) As Integer
        Dim strResult As String = Nothing
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetBarSeqNumber(checkingNo, barSeqValue)
            'If result > 0 Then
            '    Return strResult
            'Else
            '    Return Nothing
            'End If
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetReceivingNumber(barSeqNo As String, ByRef receivingValue As String) As Integer
        Dim strResult As String = Nothing
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetReceivingNumber(barSeqNo, receivingValue)
            'If result > 0 Then
            '    Return strResult
            'Else
            '    Return Nothing
            'End If
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetWrnClaimsHeader(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getWrnClaimsHeader(code, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetIfOperationInProcess(userid As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetIfOperationInProcess(userid, dsResult)
            Return result
        Catch ex As Exception

        End Try
    End Function

    Public Function getLastCommentByNumber(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getLastCommentByNumber(value, dsResult)
            Return result
        Catch ex As Exception

        End Try
    End Function

    Public Function getPartData(code As String, ByRef dsResult As DataSet, Optional parameter As String = Nothing) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getPartData(code, dsResult, parameter)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetPartUsableData(partNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetPartUsableData(partNo, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try

    End Function

    Public Function GetVendorCustomValue(vnd As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.GetVendorCustomValue(vnd, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try

    End Function

    Public Function getVendorData(code As String, ByRef dsResult As DataSet, Optional parameter As String = Nothing) As Integer
        dsResult = New DataSet()
        Dim result As Integer = -1
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getVendorData(code, dsResult, parameter)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getuserbranchFirst(userid As String, ByRef dsResult As DataSet) As Integer
        Dim dsResult1 = New DataSet()
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getuserbranchFirst(userid, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getuserbranchSecond(userid As String, ByRef dsResult As DataSet) As Integer
        Dim dsResult1 = New DataSet()
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getuserbranchSecond(userid, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getLimit(userid As String, ByRef dsResult As DataSet) As Integer
        Dim dsResult1 = New DataSet()
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getLimit(userid, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function addToDdlClaimIntSts(ByRef dsResult As DataSet) As Integer
        Dim dsResult1 = New DataSet()
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.addToDdlClaimIntSts(dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function addToDdlClaimSts(ByRef dsResult As DataSet) As Integer
        Dim dsResult1 = New DataSet()
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.addToDdlClaimSts(dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getAutoRestockFlag(userid As String, ByRef dsResult As DataSet) As Integer
        Dim dsResult1 = New DataSet()
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getAutoRestockFlag(userid, dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDiagnoseValues(ByRef dsResult As DataSet) As Integer
        Dim dsResult1 = New DataSet()
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getDiagnoseValues(dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getReasonValues(ByRef dsResult As DataSet) As Integer
        Dim dsResult1 = New DataSet()
        dsResult = New DataSet()
        Dim result As Integer = -1
        Dim exMessage As String = " "
        Try
            Dim objDal = New DAL.ClaimsProject()
            result = objDal.getReasonValues(dsResult)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function fixDateValue(strValues As String()) As List(Of String)
        Dim dtParsedDate = New DateTime()
        Dim pattern As String = ConfigurationManager.AppSettings("datePattern")
        Dim lstTest As List(Of String) = New List(Of String)()
        Dim dateValues() As String = strValues
        'Dim dateValues() As String = {"12-30-2021", "30-12-2021", "12/25/2021", "25/12/2021", "12/25/2021 00:00:00", "12/25/2021 00:00:00 AM", "12-25-2021 00:00:00", "12-25-2021 00:00:00 AM"}
        Try
            '12-25-2021 00:00:00
            For Each item As String In dateValues
                If DateTime.TryParseExact(item, pattern, Nothing, DateTimeStyles.None, dtParsedDate) Then
                    lstTest.Add(dtParsedDate.ToString())
                Else
                    lstTest.Add(item + " - error")
                End If
            Next
            Return lstTest
        Catch ex As Exception
            Return lstTest
        End Try
    End Function

#End Region

#Region "Generic not now"

    'Public Sub checkQueryResult(method As String, ByRef success As Boolean, parameters As List(Of String), Optional ds As DataSet = Nothing)
    '    Try
    '        Dim lparameter = parameters.Count()
    '        Dim selection(lparameter) As Object
    '        Dim i As Integer = 0
    '        For Each item As String In parameters
    '            selection(i) = item
    '            i += 1
    '        Next
    '        CallByName(Me, method, CallType.Method, selection)
    '    Catch ex As Exception

    '    End Try
    'End Sub

#End Region

#End Region

#Region "IDisposable"

    Protected Overridable Sub Dispose(disposing As Boolean)
        If Not disposedValue Then
            If disposing Then
                ' TODO: dispose managed state (managed objects)
            End If

            ' TODO: free unmanaged resources (unmanaged objects) and override finalizer
            ' TODO: set large fields to null
            disposedValue = True
        End If
    End Sub

    ' ' TODO: override finalizer only if 'Dispose(disposing As Boolean)' has code to free unmanaged resources
    ' Protected Overrides Sub Finalize()
    '     ' Do not change this code. Put cleanup code in 'Dispose(disposing As Boolean)' method
    '     Dispose(disposing:=False)
    '     MyBase.Finalize()
    ' End Sub

    Public Sub Dispose() Implements IDisposable.Dispose
        ' Do not change this code. Put cleanup code in 'Dispose(disposing As Boolean)' method
        Dispose(disposing:=True)
        GC.SuppressFinalize(Me)
    End Sub

#End Region

End Class
