Imports System.Configuration
Imports System.Globalization
Imports System.Text.RegularExpressions
Imports ClaimsProject.DTO
Imports ClaimsProject.UTIL

Public Class ClaimsProject : Implements IDisposable
    Private disposedValue As Boolean

    Private Shared strLogCadenaCabecera As String = System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.ToString()
    Dim strLogCadena As String = Nothing

    Shared ReadOnly objLog = New Logs()

#Region "Claims"

#Region "Generic Query"

    Public Function getDataFromDatabaseFull(tableName As String, strWhere As String, ByRef dsResult As DataSet) As Integer
        Dim result As Integer = -1
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim sql = "Select * FROM " & tableName & "" & strWhere & ""

        Catch ex As Exception

        End Try
    End Function

#End Region

    Public Function GetExistingLocationsWarr(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select distinct A1.cwlocn, A2.cntde1 from qs36f.clmwrn A1 join qs36f.cntrll A2 on (trim(A1.cwlocn) = trim(A2.cnt03) and trim(A2.cnt01) = '300') order by 1  "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception

        End Try
    End Function

    Public Function GetIfOperationInProcess(userid As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM QS36F.RETINPF WHERE RTUSER ='" & userid & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception

        End Try
    End Function

    Public Function getLastCommentByNumber(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select distinct A2.CWCDTX, A1.CWCHCO, A2.CWCHCO, A2.cwcdco, A1.CWCHDA,A1.CWCHTI from qs36f.CLMWCH A1 inner join qs36f.CLMWCD A2 on A1.CWWRNO = A2.CWWRNO 
                    where  A1.CWWRNO = " + value + " order by A1.CWCHCO desc, A2.CWCHCO desc, A1.CWCHTI desc, A1.CWCHDA desc, A2.cwcdco desc fetch first 1 row only"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception

        End Try
    End Function

    Public Function getLoadNewComments(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CLMINTSTS WHERE INDESC <> ' ' AND INCLNO = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getClaimData(value As String, status As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CLMINTSTS WHERE INSTAT = '" + status + "' AND INCLNO = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getAuthForSalesOver500(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CLMINTSTS WHERE INOVER$ = 'Y' AND INCLNO = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getEngineInfo(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CLMINTSTS WHERE INCLNO = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getCostSuggested(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CLMINTSTS WHERE INCOSTSUG$ > 0 AND INCLNO = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getIfQuarantineReq(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CLMINTSTS WHERE INTQUA = 'Y' AND INCLNO = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataForOver500(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            'Sql = "SELECT cntde1, cntde2 FROM qs36f.cntrll WHERE CNT01= 'CLM'and CNT02= 'MG' and cnt03= '001'"
            Sql = "SELECT cntde1, cntde2 FROM qs36f.cntrll WHERE CNT01= 'CLM'and CNT02= 'MG'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetUserToGenCM(user As String, ByRef dsResult As DataSet) As Integer
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT TRIM(SUBSTR(CNTDE1,1,10)) USRLIMIT, DEC(TRANSLATE(SUBSTR(CNTDE2,1,7),'0',' '),7,0) CMLIMIT FROM qs36f.CNTRLL WHERE CNT01 = '952' AND  trim(SUBSTR(CNTDE1,1,10)) = '" & user & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByInternalStsLet(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT CNTDE1 FROM qs36f.CNTRLL WHERE CNT01 = '193' AND TRIM(CNT02) = ' ' AND TRIM(CNT03) = '" & Trim(value) & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByInternalSts(code As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CLMINTSTS   WHERE INCLNO = " & Trim(code) & " ORDER BY INCLDT, INTIME "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByCustNumber(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CUMSTA WHERE CUNUM = " & value
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByGeneric2(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT CNT03, CNTDE1 INTDES FROM CNTRLL WHERE CNT01 = '189' AND TRIM(CNT02) = '' AND SUBSTR(CNT03,1,1) = 'C' ORDER BY int(right(CNT03,2)) asc"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByGeneric1(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select MOOTRS mhotrs from qs36f.mrehoth where momrnr = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByGeneric(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select MOOTTP mhottp from qs36f.mrehoth where momrnr = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByReason(reason As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select cntde1 mhwrea, substr(cntde2,42,1) flgoth from qs36f.cntrll where cnt01 = '188' and trim(cnt03)= '" & Trim(reason) & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDiagnoseDataForDDL(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT CNT03, CNT03 || '- ' || CNTDE1 INTDES FROM qs36f.CNTRLL WHERE CNT01 = '189' AND TRIM(CNT02) = '' AND SUBSTR(CNT03,1,1) = 'C' ORDER BY int(right(CNT03,2)) asc"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByDiagnose(diagnose As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT SUBSTR(CNTDE1,1,50) CWDIAGD FROM qs36f.CNTRLL WHERE CNT01 = '189' AND CNT02 = '  ' AND TRIM(CNT03) = '" & Trim(diagnose) & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function


    Public Function getReasonDescByCode(code As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select cntde1 from qs36f.cntrll where cnt01 = '188' and trim(cnt03)= '" & Trim(code) & "' and cnt02 = ''"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDiagnoseDescByCode(code As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT CNTDE1 FROM qs36f.CNTRLL WHERE CNT01 = '189' AND TRIM(CNT02) = '' AND SUBSTR(CNT03,1,1) = 'C' and CNT03 Like '" & Trim(code) & "%'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByStatus2(status As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT SUBSTR(CNTDE1,1,15) CWSTDE FROM qs36f.CNTRLL WHERE CNT01 = '193' AND CNT02 = '  ' AND TRIM(CNT03) = '" & Trim(status) & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimGeneralClasificaction(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT CNT03, CNTDE1 TYPDES, SUBSTR(CNTDE2,44,1) CATTYP FROM qs36f.CNTRLL WHERE CNT01 = '185' AND TRIM(CNT02) = ''"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByStatus1(status As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select cntde1 mhwtyp, substr(cntde2,42,1) flgoth from qs36f.cntrll where cnt01 = '185' and trim(cnt03)= '" & Trim(status) & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDataByStatus(status As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select SubStr(cntde2,1,12) mhstde, SubStr(cntde2,44,1) FlgUpd from qs36f.cntrll where cnt01 = '186' and trim(cnt03)= '" & Trim(status) & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getInvoiceDateByNumber(value As String, claim As String, ByRef strDate As String) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        strDate = Nothing
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "SELECT DISTINCT MDOIDT FROM qs36f.CSMRED WHERE MDOINR = '" + value + "' and MDMRNR = '" + claim + "' ORDER BY 1 DESC FETCH FIRST 1 ROW ONLY"
            strDate = objDatos.GetSingleDataScalar(Sql)
            If Not String.IsNullOrEmpty(strDate) Then
                result = 1
            Else
                result = 0
            End If
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetCheckingNumber(partNo As String, invoiceNo As String, invoiceDate As String, ByRef chkValue As String) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        chkValue = Nothing
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "SELECT A2.OHCTR FROM QS36F.HORDDT A1 INNER JOIN QS36F.HORDHD A2 ON A1.ODOR# = A2.OHOR# AND A1.ODLCN = A2.OHLCN AND A1.ODINNO = A2.OHINNO AND A1.ODDATE = A2.OHDATE 
                    WHERE A1.ODPTN = '" + partNo + "' AND A1.ODINNO = '" + invoiceNo + "' "
            'adjust date to the sql
            chkValue = objDatos.GetSingleDataScalar(Sql)
            If Not String.IsNullOrEmpty(chkValue) Then
                result = 1
            Else
                result = 0
            End If
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetBarSeqNumber(checkingNo As String, ByRef barSeqValue As String) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        barSeqValue = Nothing
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "SELECT CSBARS FROM QS36F.CHKORDS WHERE CSCKNO = '" + checkingNo + "' "
            'adjust date to the sql
            barSeqValue = objDatos.GetSingleDataScalar(Sql)
            If Not String.IsNullOrEmpty(barSeqValue) Then
                result = 1
            Else
                result = 0
            End If
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetReceivingNumber(barSeqNo As String, ByRef receivingValue As String) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        receivingValue = Nothing
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "SELECT RLPRCNO FROM QS36F.RECLOGPKG WHERE RLPBARS = '" + barSeqNo + "' "
            'adjust date to the sql
            receivingValue = objDatos.GetSingleDataScalar(Sql)
            If Not String.IsNullOrEmpty(receivingValue) Then
                result = 1
            Else
                result = 0
            End If
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getWrnClaimsHeader(code As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CLMWRN WHERE CWWRNO = " & Trim(code)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getVendorData(vmvnum As String, ByRef dsResult As DataSet, Optional parameter As String = Nothing) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            If parameter IsNot Nothing Then
                Sql = "SELECT " + parameter + " FROM qs36f.VNMAS WHERE VMVNUM = " & Trim(vmvnum)
            Else
                Sql = "SELECT * FROM qs36f.VNMAS WHERE VMVNUM = " & Trim(vmvnum)
            End If

            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getPartData(partNo As String, ByRef dsResult As DataSet, Optional parameter As String = Nothing) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            If parameter IsNot Nothing Then
                Sql = "SELECT " + parameter + " FROM qs36f.INMSTA WHERE IMPTN = '" & Trim(partNo) & "'"
            Else
                Sql = "SELECT * FROM qs36f.INMSTA WHERE IMPTN = '" & Trim(partNo) & "'"
            End If

            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetPartUsableData(partNo As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Sql = "SELECT A1.IMDSC, A2.DVLOCN, A2.DVUNT$ FROM qs36f.INMSTA A1 INNER JOIN qs36f.DVINVA A2 ON A1.IMPTN = A2.DVPART WHERE UCASE(IMPTN) = '" & Trim(partNo.ToUpper()) & "'"

            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try

    End Function

    Public Function GetVendorCustomValue(vnd As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Sql = "SELECT * FROM qs36f.VNMAS WHERE VMVNUM = " & vnd & " AND VMVTYP NOT IN ('C', 'P', 'S', 'T', 'Y', 'Z')"

            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try

    End Function

    Public Function getNWrnClaimsHeader(code As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT * FROM qs36f.CSMREH WHERE MHMRNR = " & Trim(code)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimsDetDataUpdated(claimType As String, claimNo As String, ByRef dsResult As DataSet) As Integer
        Dim result As Integer = -1
        dsResult = New DataSet()
        Dim exMessage As String = " "
        Dim strwhere As String = Nothing
        Dim strjoin As String = Nothing
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            If claimType <> "B" Then ' warranty types

                Dim TermDays As String = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("DateTerm")), ConfigurationManager.AppSettings("DateTerm"), "730")
                Dim todayDate = DateTime.Now
                Dim fromDate = todayDate.AddDays(-(CInt(TermDays)))
                'strwhere = " where MHMRDT between '" + fromDate.ToString("MMddyy") + "' and '" + todayDate.ToString("MMddyy") + "'"
                'strwhere = "WHERE CTPINV.CVTDCDTF(MHMRDT, 'MDY') >= DATE('" & fromDate.ToShortDateString() & "') AND CTPINV.CVTDCDTF(MHMRDT, 'MDY') <= DATE('" & todayDate.ToShortDateString() & "')"
                strwhere = " where MHMRNR = '" & claimNo & "'"
                strjoin = " join qs36f.cntrll b on trim(b.cnt03)=trim(mhrtty) join qs36f.cscumst c on cunum = mhcunr join qs36f.cntrll d on trim(d.cnt03)=trim(mhstat) left join qs36f.clwrrel e on a.wrn=e.crwrno join qs36f.cntrll f on trim(f.cnt03)=trim(cwstat) left join qs36f.CLMINTSTS A3 on CWWRNO = A3.INCLNO where b.cnt01='185' and b.cnt02='  ' and d.cnt01='186' and d.cnt02='  ' and f.cnt01='193' and f.cnt02='  ' "

                Dim Sql = "SELECT distinct MHMRNR,CWCOM1 COMMENT1,CWCOM2 COMMENT2,CWCOM3 COMMENT3,MHSUBBY SUBMITTEDBY,CWINVC INVOICENO, SUBSTR(f.CNTDE1,1,18) cwstde, coalesce(A3.INDESC, 'N/A') DESCRIPTION                            
                           from (SELECT MHMRNR, coalesce(CWWRNO,0) WRN, CWSTAT, CTPINV.CVTDCDTF(MHMRDT, 'MDY') MHDATE, MHRTTY, MHCUNR, MHTOMR,
                           (SELECT COUNT(DISTINCT MDPTNR) FROM qs36f.CSMRED WHERE MDMRNR = MHMRNR) MHPCNT, MHSTAT,CWCOM1,CWCOM2,CWCOM3,MHSUBBY,CWINVC,CWWRNO FROM qs36f.CSMREH 
                           LEFT OUTER JOIN qs36f.CLMWRN ON MHMRNR = CWDOCN " & strwhere & ") a " & strjoin & ""

                result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
                Return result
            Else
                'non warranty types
            End If
        Catch ex As Exception
            exMessage = ex.Message
            Dim pepe = "a"
        End Try
    End Function

    Public Function GetClaimsDataUpdated(claimType As String, ByRef dsResult As DataSet, Optional strFilters As String = Nothing) As Integer
        Dim result As Integer = -1
        dsResult = New DataSet()
        Dim exMessage As String = " "
        Dim strwhere As String = Nothing
        Dim strjoin As String = Nothing
        Dim newQuery As String = Nothing
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            If claimType <> "B" Then ' warranty types

                Dim TermDays As String = If(Not String.IsNullOrEmpty(ConfigurationManager.AppSettings("DateTerm")), ConfigurationManager.AppSettings("DateTerm"), "730")
                Dim todayDate = DateTime.Now
                Dim fromDate = todayDate.AddDays(-(CInt(TermDays)))
                'strwhere = " where MHMRDT between '" + fromDate.ToString("MMddyy") + "' and '" + todayDate.ToString("MMddyy") + "'"
                strwhere = "WHERE CTPINV.CVTDCDTF(MHMRDT, 'MDY') >= DATE('" & fromDate.ToShortDateString() & "') AND CTPINV.CVTDCDTF(MHMRDT, 'MDY') <= DATE('" & todayDate.ToShortDateString() & "')"
                strjoin = " join qs36f.cntrll b on trim(b.cnt03)=trim(mhrtty) join qs36f.cscumst c on cunum = mhcunr join qs36f.cntrll d on trim(d.cnt03)=trim(mhstat) left join qs36f.clwrrel e on a.wrn=e.crwrno join qs36f.cntrll f on trim(f.cnt03)=trim(cwstat) where b.cnt01='185' and b.cnt02='  ' and d.cnt01='186' and d.cnt02='  ' and f.cnt01='193' and f.cnt02='  ' "

                Dim Sql = "SELECT MHMRNR,WRN,CWSTAT,MHDATE,SUBSTR(b.CNTDE2,1,8) MHTDES,mhcunr,mhtomr, 
                            case mhpcnt when 1 then (select min(CWPTNO) from qs36f.clmwrn where CWDOCN = MHMRNR) when 0 then 'N/A' else 'See Details' end mhptnr,  
                            d.CNT03,d.CNTDE1 mhstde,case coalesce(crclno,0) when 0 then 'NO' else 'YES' end mhsupclm, trim(f.CNT03) CWSTS, SUBSTR(f.CNTDE1,1,18) cwstde,
                            case coalesce(crclno,0) when 0 then coalesce((select char(max(cwchda)) from qs36f.clmwch where cwwrno=a.wrn and trim(cwchsu)<>''),'') 
                            else coalesce((select char(max(ccdate)) from qs36f.clmcmt where ccclno=crclno and trim(ccsubj)<>''),'') end actdt,
                            cunam mhcuna, cuslm, CWWRNO,  MHREASN, MHDIAG, CWUSER, CWPTNO, CWVENO, CWLOCN                          
                            from (SELECT MHMRNR, coalesce(CWWRNO,0) WRN, CWSTAT, CTPINV.CVTDCDTF(MHMRDT, 'MDY') MHDATE, MHRTTY, MHCUNR, MHTOMR,
                            (SELECT COUNT(DISTINCT CWPTNO) FROM qs36f.clmwrn WHERE CWDOCN = MHMRNR) MHPCNT, MHSTAT, CWWRNO,  MHREASN, MHDIAG, CWUSER, CWPTNO, CWVENO, CWLOCN FROM qs36f.CSMREH 
                            LEFT OUTER JOIN qs36f.CLMWRN ON MHMRNR = CWDOCN " & strwhere & ") a " & strjoin & " {0} order by 1 desc"


                newQuery = String.Format(Sql, strFilters)
                Sql = newQuery

                result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
                Return result
            Else
                'non warranty types
            End If
        Catch ex As Exception
            exMessage = ex.Message
            Dim pepe = "a"
        End Try
    End Function

    Public Function GetClaimsDataSingle(ByRef dsResult As DataSet, Optional ByVal strDates As String() = Nothing) As Integer
        Dim result As Integer = -1
        dsResult = New DataSet()
        Dim exMessage As String = " "
        Dim query = "SELECT distinct VARCHAR_FORMAT(A1.MHMRNR)ClAIMNO, (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '185' and cnt02 = '' and cnt03 = A1.MHRTTY) TYPE,
                    (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '188' and cnt02 = '' and cnt03 = A1.MHREASN) REASON,
                    (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '189' and cnt02 = '' and cnt03 = A1.MHDIAG) DIAGNOSE, 
                    A1.MHCUNR CUSTOMER, CTPINV.CVTDCDTF(A1.MHMRDT,'MDY') INITDATE,
                    (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '186' and cnt02 = '' and trim(cnt03) = trim(A1.MHSTAT)) EXTSTATUS, 
                    A2.CWPTNO PARTNO, A2.CWCQTY QTY, A2.CWUNCS UNITPR, A3.INCLNO, A1.MHUSER usr 
                    FROM qs36f.CSMREH A1, qs36f.CLMWRN A2, qs36f.CLMINTSTS A3 WHERE A1.MHRTTY <> 'B' and A1.MHMRNR = A2.CWDOCN and A2.CWWRNO = A3.INCLNO and 
                    CTPINV.CVTDCDTF(A1.MHMRDT, 'MDY') >= {0} AND CTPINV.CVTDCDTF(A1.MHMRDT,'MDY') <= {1} ORDER BY 1 DESC "
        Try
            'Dim yearUse = DateTime.Now().AddYears(-3).Year
            'Dim firstDate = New DateTime(yearUse, 1, 1).Date()
            'Dim strDateFirst As String = firstDate.ToString("MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture)
            ''Dim strDateReduc As String = firstDate.ToString("yyMM", System.Globalization.CultureInfo.InvariantCulture)
            'Dim curDate = DateTime.Now.Date().ToString("MM/dd/yyyy")

            Dim newQuery = String.Format(query, strDates(0), strDates(1))

            Dim dsOut = New DataSet()
            Dim objDatos = New ClsRPGClientHelper()
            result = objDatos.GetOdBcDataFromDatabase(newQuery, dsOut)
            dsResult = dsOut
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            objLog.writeLog(strLogCadenaCabecera, Logs.ErrorTypeEnum.Exception, ex.Message, ex.ToString())
            Return result
        End Try
    End Function

    Public Function GetClaimsDataFull(ByRef dsResult As DataSet, Optional ByVal strDates As String() = Nothing) As Integer
        Dim result As Integer = -1
        dsResult = New DataSet()
        Dim exMessage As String = " "
        Dim query As String = "SELECT VARCHAR_FORMAT(A1.MHMRNR)ClAIMNO, (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '185' and cnt02 = '' and cnt03 = A1.MHRTTY) TYPE,
                                (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '188' and cnt02 = '' and cnt03 = A1.MHREASN) REASON,
                                (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '189' and cnt02 = '' and cnt03 = A1.MHDIAG) DIAGNOSE, 
                                A1.MHCUNR CUSTOMER, CTPINV.CVTDCDTF(A1.MHMRDT,'MDY') INITDATE,
                                (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '186' and cnt02 = '' and trim(cnt03) = trim(A1.MHSTAT)) EXTSTATUS, 
                                (select substr(cntde1,1,25) from qs36f.cntrll where cnt01 = '193' and cnt02 = '' and cnt03=A3.INSTAT) INTSTATUS,
                                A2.CWPTNO PARTNO, A2.CWCQTY QTY, A2.CWUNCS UNITPR, A3.INCLNO,                                  
                                (CASE WHEN A3.INTAPPRV = 'L' THEN 'APPROVED' WHEN A3.INTAPPRV = 'M' THEN 'DENIED' ELSE ' ' END) AS APP, 
                                A3.INUSER USER, A3.INCLDT DATECM, A3.INDESC DESCRIPTION, A1.MHSCO1 COMMENT1,A1.MHSCO2 COMMENT2,A1.MHSCO3 COMMENT3,A1.MHSUBBY SUBMITTEDBY,A2.CWINVC INVOICENO
                                FROM qs36f.CSMREH A1, qs36f.CLMWRN A2, qs36f.CLMINTSTS A3 WHERE A1.MHRTTY <> 'B' and A1.MHMRNR = A2.CWDOCN and A2.CWWRNO = A3.INCLNO and 
                                CTPINV.CVTDCDTF(A1.MHMRDT, 'MDY') >= {0} AND CTPINV.CVTDCDTF(A1.MHMRDT,'MDY') <= {1} ORDER BY A1.MHMRNR DESC"
        Try
            'Dim yearUse = DateTime.Now().AddYears(-3).Year
            'Dim firstDate = New DateTime(yearUse, 1, 1).Date()
            'Dim strDateFirst As String = firstDate.ToString("MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture)
            ''Dim strDateReduc As String = firstDate.ToString("yyMM", System.Globalization.CultureInfo.InvariantCulture)
            'Dim curDate = DateTime.Now.Date().ToString("MM/dd/yyyy")

            Dim newQuery = String.Format(query, strDates(0), strDates(1))

            Dim dsOut = New DataSet()
            Dim objDatos = New ClsRPGClientHelper()
            result = objDatos.GetOdBcDataFromDatabase(newQuery, dsOut)
            'result = objDatos.GetDataFromDatabase(query, dsOut)
            dsResult = dsOut
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            objLog.writeLog(strLogCadenaCabecera, objLog.ErrorTypeEnum.Exception, ex.Message, ex.ToString())
            Return result
        End Try
    End Function

    Public Function GetAutoCompleteDataPartNo(prefixText As String, ByRef dsResult As DataSet) As Integer
        Dim lstResult = New List(Of String)
        Dim exMessage As String = Nothing
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1

        Try
            Dim objDatos = New ClsRPGClientHelper()
            'Dim Sql = " SELECT DISTINCT (CLMWRN.CWPTNO) PART# FROM CSMREH, CLMWRN, CLMINTSTS WHERE CSMREH.MHRTTY <> 'B' 
            '        and CSMREH.MHMRNR = CLMWRN.CWDOCN and CLMWRN.CWWRNO = CLMINTSTS.INCLNO 
            '        and CVTDCDTF(CSMREH.MHMRDT, 'MDY') >= '{0}' AND CVTDCDTF(CSMREH.MHMRDT,'MDY') <= '{1}' 
            '        and VARCHAR_FORMAT(CLMWRN.CWPTNO) LIKE '%{2}%' ORDER BY CLMWRN.CWPTNO DESC 
            '        FETCH FIRST 10 ROWS ONLY"
            Dim Sql = "select CATPTN, CATDSC from qs36f.cater A1 where A1.catptn = '{0}' union select KOPTNO,KODESC from qs36f.komat where KOPTNO = '{1}'"
            Dim sqlResult = String.Format(Sql, prefixText, prefixText)

            result = objDatos.GetOdBcDataFromDatabase(sqlResult, dsResult)

            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            objLog.writeLog(strLogCadenaCabecera, objLog.ErrorTypeEnum.Exception, ex.Message, ex.ToString())
            Return Nothing
        End Try

    End Function

    Public Function GetVendorForFilter(VendorCodesDenied As String, VendorOEMCodeDenied As String, ItemCategories As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = Nothing
        Dim Sql As String
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Sql = "SELECT VMVNUM, VMNAME FROM QS36F.VNMAS WHERE VMVTYP NOT IN (" & VendorCodesDenied & ") 
                   AND VMVNUM NOT IN (SELECT CNTDE1 FROM Qs36F.CNTRLL WHERE CNT01 IN (" & VendorOEMCodeDenied & "))
                   AND VMVNUM NOT IN (" & ItemCategories & ") 
                   ORDER BY 2 "

            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            objLog.writeLog(strLogCadenaCabecera, objLog.ErrorTypeEnum.Exception, ex.Message, ex.ToString())
            Return result
        End Try
    End Function

    Public Function GetAutocompleteSelectedVendorName(prefixVendorName As String, VendorCodesDenied As String, VendorOEMCodeDenied As String, ItemCategories As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = Nothing
        Dim Sql As String
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "SELECT VMVNUM, VMNAME, VMVTYP FROM VNMAS WHERE VMVTYP NOT IN (" & VendorCodesDenied & ") 
                   AND VMVNUM NOT IN (SELECT CNTDE1 FROM CNTRLL WHERE CNT01 IN (" & VendorOEMCodeDenied & "))
                   AND VMVNUM NOT IN (" & ItemCategories & ")
                   AND VMNAME LIKE '%" & Replace(Trim(UCase(prefixVendorName)), "'", "") & "%'
                   ORDER BY VMNAME FETCH FIRST 10 ROWS ONLY"

            result = objDatos.GetOdBcDataFromDatabase(Sql, dsResult)
            Return result

        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            objLog.writeLog(strLogCadenaCabecera, objLog.ErrorTypeEnum.Exception, ex.Message, ex.ToString())
            Return result
        End Try
    End Function

    Public Function getClaimNumbers(claimSelected As String, dateValue As DateTime, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = " SELECT (CSMREH.MHMRNR) CLAIMNO FROM CSMREH, CLMWRN, CLMINTSTS WHERE CSMREH.MHRTTY <> 'B' 
                    and CSMREH.MHMRNR = CLMWRN.CWDOCN and CLMWRN.CWWRNO = CLMINTSTS.INCLNO 
                    and CVTDCDTF(CSMREH.MHMRDT, 'MDY') >= '{0}' AND CVTDCDTF(CSMREH.MHMRDT,'MDY') <= '{1}' 
                    and VARCHAR_FORMAT(CSMREH.MHMRNR) LIKE '%{2}%' ORDER BY CSMREH.MHMRNR DESC"

            Dim sqlResult = String.Format(Sql, dateValue.ToString("MM/dd/yyyy"), Today().ToString("MM/dd/yyyy"), claimSelected)
            result = objDatos.GetOdBcDataFromDatabase(sqlResult, dsResult)
            Return result
        Catch ex As Exception
            exMessage = ex.ToString + ". " + ex.Message + ". " + ex.ToString
            objLog.writeLog(strLogCadenaCabecera, objLog.ErrorTypeEnum.Exception, ex.Message, ex.ToString())
        End Try
    End Function

    Public Function GetClaimByTypeAndReason(value As String, status As String, reason As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT * FROM qs36f.CSMREH WHERE MHRTTY = '" + status + "' and MHREASN = '" + reason + "' and MHMRNR = '" & value & "' "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimWithCM(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT * FROM qs36f.MRECMI WHERE MIMRNR ='" & value & "' "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimInProcessST(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT * FROM qs36f.CSMREH WHERE MHSTAT Not in('2','A') And MHMRNR ='" & value & "' "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimRGAReceived(value As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT * FROM qs36f.CSMREH WHERE MHSTAT in('B','C','D','E') And MHMRNR = '" & value & "' "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetUsersInInitialReview(ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select ususer, usname from qs36f.csuser where trim(ususer) in (select trim(inuser) from qs36f.clmintsts where trim(instat)='I') and decode = 12 and trim(uspty9) <> 'R' and usslmn <> 0"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetUsersInTechnicalReview(ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select ususer, usname from qs36f.csuser where trim(ususer) in (select trim(inuser) from qs36f.clmintsts where trim(instat)='H') and decode = 12 and trim(uspty9) <> 'R' and usslmn = 0"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimPrivUsr(strNames As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select  ususer, usname from qs36f.csuser where decode = 12 and trim(uspty9) <> 'R' and ususer in (" + strNames + ")"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimPersonal(ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select ususer, usname from qs36f.csuser where trim(ususer) in (select trim(inuser) from qs36f.clmintsts where trim(instat)='H') and decode = 12 and trim(uspty9) <> 'R' "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#Region "Comments "

#Region "No Warning No"

    Public Function GetSuppClaimHeader(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select * from qs36f.CLMHDR where CHCLNO = " & code
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClaimWrnRelationByNo(claimno As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select * from qs36f.CLWRREL where CRCLNO = " & claimno
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try

    End Function

    Public Function GetWClaimCommentsUnifyData(claimno As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select clmwch.cwwrno, cwchda, cwchti, ususer, clmwch.cwchco, " &
              "clmwcd.cwcdco , ucase(cwchsu) CWCHSU, ucase(cwcdtx) CWCDTX, cwptno from qs36f.clmwch left outer join qs36f.clmwcd on " &
              "clmwch.cwwrno = clmwcd.cwwrno and clmwch.cwchco = clmwcd.cwchco where clmwch.crclno = " & claimno
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

#Region "have Warning no"

    Public Function GetClaimWrnRelationByWrnNo(wrnNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select * from qs36f.CLWRREL where CRWRNO = " & wrnNo
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try

    End Function

    Public Function GetWClaimCommentsUnifyDatabyWrnNo(wrnNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select A1.cwwrno, cwchda, cwchti, ususer, A1.cwchco, " &
              "A2.cwcdco , ucase(cwchsu) CWCHSU, ucase(cwcdtx) CWCDTX, cwptno from qs36f.clmwch A1 left outer join qs36f.clmwcd A2 on " &
              "A1.cwwrno = A2.cwwrno and A1.cwchco = A2.cwchco where A1.cwwrno = " & wrnNo
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

#Region "Get number and date for supplier invoice if exists"

    Public Function GetSupplierInvoiceFirst(vndClaimNo As String, claimNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT AWINNO,AWINDT FROM qs36f.apWrk WHERE AWVENO = " + vndClaimNo + " and AwPONO like '%" + claimNo + "%' "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetSupplierInvoiceSecond(vndClaimNo As String, claimNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT AMINNO, AMINDT FROM qs36f.apmst WHERE AmVENO = " + vndClaimNo + " and AmPONO like '%" + claimNo + "%' "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetSupplierInvoiceThird(vndClaimNo As String, claimNo As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT AHINNO,AHINDT  FROM qs36f.aphst WHERE AhVENO = " + vndClaimNo + " and AhPONO like '%" + claimNo + "%' "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

#Region "Comments inner divs data"

    Public Function getClaimsByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT * FROM qs36f.CLMWCH WHERE CWWRNO = " & code & " ORDER BY  CWCHDA DESC,CWCHTI DESC"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getClaimsDetByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT CWCHCO,CWCDTX FROM qs36f.CLMWCD WHERE CWCHCO = '" + code + "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function
    '---------------------------------------------------------------

    Public Function getSupplierClaimsByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT * FROM qs36f.CLMCMT WHERE CCCLNO = " & code & " ORDER BY  CCDATE DESC,CCTIME DESC"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getSupplierClaimsDetByCode(code As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "SELECT CCCODE,CCTEXT FROM qs36f.CLMCMD WHERE CCCODE ='" + code + "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

#End Region

    Public Function GetIfAtuhStatusExist(wrno As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Dim sql = "select inover$, inovremlst from qs36f.clmintsts where inclno = " & wrno & "  and trim(instat) = 'B'"
            result = objDatos.GetDataFromDatabase(sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetIfIntStatusExist(wrno As String, status As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Dim sql = "select * from qs36f.clmintsts where inclno = " & wrno & "  and trim(instat) = '" & status & "'"
            result = objDatos.GetDataFromDatabase(sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetProjectGenData(wrno As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Dim sql = "select instat,inover$, inovremlst, intapprv from qs36f.CLMINTSTS where trim(inclno) = '" + wrno + "' and trim(instat) in ('I','B')"
            result = objDatos.GetDataFromDatabase(sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetSupplierClaimCommentsUnifyData(vndClaimNo As String, commentSubject As String, commentTxt As String, ByRef dsResult As DataSet) As Integer
        dsResult = New DataSet()
        dsResult.Locale = CultureInfo.InvariantCulture
        Dim result As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()

            Dim Sql = "select * from qs36f.clmcmt A1 left outer join qs36f.clmcmd A2 on A1.ccclno = A2.ccclno and " &
                      "A1.cccode = A2.cccode where A1.ccclno = " & vndClaimNo & " and " &
                      "trim(ucase(A1.ccsubj)) = '" & commentSubject & "' and trim(ucase(A2.cctext)) = '" & commentTxt & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function InsertSuppClaimCommHeader(vndClaimNo As String, cod_comment As String, commDate As String, commSubject As String, commTime As String, commUser As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "insert into qs36f.clmcmt(CCCLNO, CCCODE, CCDATE, CCSUBJ, CCTIME, USUSER) values(" &
                                    vndClaimNo & ", " & cod_comment & ", '" & commDate & "', '" & commSubject & "', '" &
                                    commTime & "', '" & commUser & "')"
            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function InsertSuppClaimCommDetail(vndClaimNo As String, cod_comment As String, cod_detcomment As String, commentTxt As String, partno As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "insert into qs36f.clmcmd(CCCLNO, CCCODE, CCDCOD, CCTEXT, CCPTNO) values(" & vndClaimNo &
                                ", " & cod_comment & ", " & cod_detcomment & ", '" & commentTxt & "', '" & partno & "')"

            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function InsertSuppClaimCommDetail1(vndClaimNo As String, cod_comment As String, cod_detcomment As String, commentTxt As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "insert into qs36f.clmcmd(CCCLNO, CCCODE, CCDCOD, CCTEXT) values(" & vndClaimNo &
                                ", " & cod_comment & ", " & cod_detcomment & ", '" & commentTxt & "')"

            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function


#End Region

#Region "Inserts"

    Public Function InsertWDesc(code As String, desc As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "INSERT INTO qs36f.CLMINTSTS(INCLNO,INDESC) VALUES (" & code & ",'" & desc & "')"
            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function InsertInternalStatus(code As String, chkinitial As String, userid As String, datenow As String, hournow As String, Optional flag As Boolean = False) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()

            ' Dim useridNew = If(String.IsNullOrEmpty(strStsQuote), strStsQuote, If(strStsQuote.Length < maxLength, strStsQuote, strStsQuote.Substring(0, Math.Min(strStsQuote.Length, maxLength))))

            If Not flag Then
                Sql = "INSERT INTO qs36f.CLMINTSTS(INCLNO,INSTAT,INUSER,INCLDT,INTIME) 
                    VALUES (" & code & ",'" & chkinitial & "','" & userid & "','" & datenow & "','" & hournow & "')"
            Else
                Sql = "INSERT INTO qs36f.CLMINTSTS(INCLNO,INSTAT,INTQUA,INUSER,INCLDT,INTIME) 
                    VALUES (" & code & ",'" & chkinitial & "','Y','" & userid & "','" & datenow & "','" & hournow & "')"
            End If

            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function InsertEngineInfo(value As String, engineModel As String, engineSerial As String, engineArrang As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "INSERT INTO qs36f.CLMINTSTS(INCLNO,INEMOD,INESER,INEARR) VALUES (" & value & ",'" & engineModel & "','" & engineSerial & "','" & engineArrang & "')"
            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function InsertComment(code As String, codComm As String, datenow As String, hoursnow As String, message As String, userid As String, typeUser As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            'type user = 'I'
            Sql = "INSERT INTO qs36f.CLMWCH(CWWRNO,CWCHCO,CWCHDA,CWCHTI,CWCHSU,USUSER,CWCFLA) VALUES(" & code & "," & codComm & ",'" & datenow & "','" & hoursnow & "','" & message & "','" & userid & "','" & typeUser & "')"
            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function InsertCommentDetail(code As String, codComm As String, detComm As String, message As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Dim maxLength As Integer = 250
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim messageFix = If(String.IsNullOrEmpty(message), message, If(message.Length < maxLength, message, message.Substring(0, Math.Min(message.Length, maxLength))))
            Dim OutReg = Regex.Replace(messageFix, "[^0-9A-Za-z .,]", String.Empty)
            'type user = 'I'
            Sql = "INSERT INTO qs36f.CLMWCD(CWWRNO,CWCHCO,CWCDCO,CWCDTX) VALUES(" & code & "," & codComm & ",'" & detComm & "','" & OutReg & "')"
            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function InsertCommentDetailwPart(code As String, codComm As String, detComm As String, message As String, partNo As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Dim maxLength As Integer = 250
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim messageFix = If(String.IsNullOrEmpty(message), message, If(message.Length < maxLength, message, message.Substring(0, Math.Min(message.Length, maxLength))))
            Dim OutReg = Regex.Replace(messageFix, "[^0-9A-Za-z .,]", String.Empty)

            'type user = 'I'
            Sql = "INSERT INTO qs36f.CLMWCD(CWWRNO,CWCHCO,CWCDCO,CWCDTX,CWPTNO) VALUES(" & code & "," & codComm & ",'" & detComm & "','" & OutReg & "','" & partNo & "')"
            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

#End Region

#Region "Updates"

    Public Function UpdateWOverSales500(code As String, status As String, check As String, userid As String, freightAm As Double, partsAm As Double, BySalesAm As Double, datenow As Date) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CLMINTSTS SET INOVER$ = '" & check & "', INUSER = '" & userid & "', INCOSTFRE$ = " & freightAm & ",INCOSTPAR$ = " & partsAm & ",INAPESLS = " & BySalesAm & ",
                    INCLDT = '" & datenow & "' WHERE INSTAT = '" & status & "' And INCLNO = " & code
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateWOverEmailStat(code As String, status As String, check As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CLMINTSTS SET INOVREMLST = '" + check + "' WHERE INSTAT = '" + status + "' And INCLNO = " & code
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateWIntFinalStat(code As String, status As String, chkinitial As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CLMINTSTS SET INTAPPRV = '" & chkinitial & "' WHERE INSTAT = '" + status + "' And INCLNO = " & code
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateWFreightType(code As String, status As String, amount As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CSMREH SET MHFRTY = '" + status + "', MHFRAM = '" & Val(amount) & "' WHERE MHMRNR = " & code
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateWConsDamage(code As String, status As String, amount As String, partAm As String, laborAm As String, freightAm As String, miscAm As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CLMINTSTS SET INCOSTSUG$ = " & amount & ", COSTDMGPTN = " & partAm & ", COSTDMGLBR = " & laborAm & ", COSTDMGFRE = " & freightAm & ", COSTDMGMIS = " & miscAm & " WHERE INSTAT = '" + status + "' And INCLNO = " & code
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateWIntDesc(value As String, desc As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CLMINTSTS SET INDESC = '" & desc & "' WHERE INCLNO = " & value
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function GetPartialCreditRef(claimNo As String, ByRef dsResult As DataSet) As Integer
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT cwpho3 FROM qs36f.clmwrn WHERE cwwrno = " + claimNo
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function SavePartialCreditRef(partCredValue As String, claimNo As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "update qs36f.clmwrn set cwpho3 = '" + partCredValue + "' where cwwrno = " + claimNo
            objDatos.InsertDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateComplexPartCredInComments(partCredValue As String, claimNo As String) As Integer
        Dim Sql As String = Nothing
        Dim Sql1 As String = Nothing
        Dim affectedRows As Integer = -1
        Dim dsResult As DataSet = New DataSet()
        Dim dt As DataTable = New DataTable()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "Select A2.cwcom1, A2.cwcom2, A2.cwcom3, A1.mhtomr From qs36f.csmreh A1 Join qs36f.clmwrn A2 on A1.mhmrnr = A2.cwdocn
                        Where cwdocn = '" + claimNo + "' "
            'Sql = "select cwcom1, cwcom2,cwcom3 from qs36f.clmwrn where cwdocn = '" + claimNo + "' "

            Dim result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            If result > 0 Then
                If dsResult IsNot Nothing Then
                    If dsResult.Tables(0).Rows.Count > 0 Then

                        Dim comm1 = dsResult.Tables(0).Rows(0).Item("cwcom1").ToString().Trim()
                        Dim comm2 = dsResult.Tables(0).Rows(0).Item("cwcom2").ToString().Trim()
                        Dim comm3 = dsResult.Tables(0).Rows(0).Item("cwcom3").ToString().Trim()
                        'Dim Ucost = dsResult.Tables(0).Rows(0).Item("mhtomr").ToString().Trim()

                        Dim msg = "Partial Credit apply. Amount: ${0} "
                        Dim tempMsg As String = Nothing
                        If Not String.IsNullOrEmpty(comm1) Then
                            If Not String.IsNullOrEmpty(comm2) Then
                                If Not String.IsNullOrEmpty(comm3) Then
                                    tempMsg = comm3 + ". " + msg + "."
                                    tempMsg = String.Format(tempMsg, partCredValue)
                                    Dim rsUpd3 = UpdatePartCredComm("comm3", msg, claimNo)
                                Else

                                    Dim rsUpd3 = UpdatePartCredComm("comm3", msg, claimNo)
                                End If
                            Else
                                Dim rsUpd3 = UpdatePartCredComm("comm2", msg, claimNo)
                            End If
                        Else
                            Dim rsUpd1 = UpdatePartCredComm("comm1", msg, claimNo)
                        End If

                    End If
                End If
            End If

            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdatePartCredComm(field As String, comment As String, claimNo As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()

            If field.Trim().ToLower.Equals("comm1") Then
                Sql = "UPDATE qs36f.CLMWRN SET CWCOM1 = '" + comment + "' where CWDOCN = '" + claimNo + "' "
            ElseIf field.Trim().ToLower.Equals("comm2") Then
                Sql = "UPDATE qs36f.CLMWRN SET CWCOM2 = '" + comment + "' where CWDOCN = '" + claimNo + "' "
            Else
                Sql = "UPDATE qs36f.CLMWRN SET CWCOM3 = '" + comment + "' where CWDOCN = '" + claimNo + "' "
            End If

            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateEngineInfo(value As String, engineModel As String, engineSerial As String, engineArrang As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CLMINTSTS SET INEMOD = '" & engineModel & "', INESER = '" & engineSerial & "', INEARR = '" & engineArrang & "' WHERE INCLNO = " & value
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateWHeaderStatSingle(value As String, chkinitial As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CLMWRN SET CWSTAT = '" & chkinitial & "' Where CWWRNO = " & value
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateNWHeaderStat(value As String, status As String) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CSMREH SET MHSTAT = '" + status + "' WHERE MHMRNR = " & value
            objDatos.UpdateDataInDatabase(Sql, affectedRows)

            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateNWHeader(value As String, allow As Boolean, Optional diagnose As String = Nothing, Optional cname As String = Nothing, Optional cphone As String = Nothing, Optional cemail As String = Nothing) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()

            If allow Then
                Sql = "UPDATE qs36f.CSMREH SET MHDIAG = '" & diagnose & "' WHERE MHMRNR = " & value
            Else
                Sql = "UPDATE qs36f.CSMREH SET MHDIAG = '" & diagnose & "', MHSUBBY = '" & cname & "', MHPHONE = '" & cphone & "', MHEMAIL = '" & cemail & "' WHERE MHMRNR = " & value
            End If
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateCommentsByClaimNo(value As String, comm1 As String, Optional comm2 As String = Nothing, Optional comm3 As String = Nothing) As Integer
        Dim Sql As String
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CSMREH SET MHSCO1 = '" & comm1 & "', MHSCO2 = '" & comm2 & "', MHSCO3 = '" & comm3 & "' WHERE MHMRNR = " & value
            objDatos.UpdateDataInDatabase(Sql, affectedRows)

            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateWHeader(code As String, cname As String, cphone As String, cemail As String, dEntered As String, vendorNo As String, prodCod As String,
                                  invNo As String, partNo As String, loc As String, qty As String, unitCost As String, machModel As String, machSerial As String,
                                  arrangment As String, dInstallation As String, hoursW As String) As Integer

        Dim Sql As String = Nothing
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Sql = "UPDATE qs36f.CLMWRN SET CWCNTC = '" & cname & "', CWCNPH = '" & cphone & "', CWCNEM = '" & cemail & "',CWDATE = '" & dEntered & "',CWVENO = " & vendorNo & ",
                    CWPRDC = '" & prodCod & "',CWINVC = '" & invNo & "',CWPTNO = '" & partNo & "',CWLOCN = '" & loc & "',CWCQTY = " & qty & ",CWUNCS = " & unitCost & ",
                    CWMACH = '" & machModel & "',CWSER# = '" & machSerial & "',CWARRG = '" & arrangment & "',CWINSD = '" & dInstallation & "',CWHOUR = " & hoursW & " 
                    Where CWWRNO = " & code
            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

    Public Function UpdateContactInfoByClaimNo(value As String, allow As Boolean, Optional cname As String = Nothing, Optional cphone As String = Nothing, Optional cemail As String = Nothing) As Integer
        Dim Sql As String = Nothing
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()

            If Not allow Then
                Sql = "UPDATE qs36f.CSMREH SET MHSUBBY = '" & cname & "', MHPHONE = '" & cphone & "', MHEMAIL = '" & cemail & "' WHERE MHMRNR = " & value
            Else
                'allow to update only one
            End If

            objDatos.UpdateDataInDatabase(Sql, affectedRows)
            Return affectedRows
        Catch ex As Exception
            Return affectedRows
        End Try
    End Function

#End Region

#Region "Imported Method"

    Public Function MoveRGAToHistoric2(param2 As String, custName As String, custNo As String, code As String) As Data.DataSet
        Dim Sql As String
        Dim ds As New DataSet()
        ds.Locale = CultureInfo.InvariantCulture
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Dim dsOut = New DataSet()
            Sql = "CALL CTPINV.RGACLSMC ('" & param2 & "','" & Right(custName, 30) & "','" & Right("0000" & custNo, 5) & "','" & Right("0000" & code, 6) & "','DORIS@COSTEX.COM                       ')"
            affectedRows = objDatos.GetDataFromDatabase(Sql, dsOut, dt)
            'result = objDatos.GetOdBcDataFromDatabase(Sql, ds)
            Return dsOut
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function MoveRGAToHistoric1(param1 As String) As Data.DataSet
        Dim Sql As String
        Dim ds As New DataSet()
        ds.Locale = CultureInfo.InvariantCulture
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Dim dsOut = New DataSet()
            Sql = "CALL CTPINV.RGACLSRTNR ('" & param1 & "')"
            affectedRows = objDatos.GetDataFromDatabase(Sql, dsOut, dt)
            'result = objDatos.GetOdBcDataFromDatabase(Sql, ds)
            Return dsOut
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function CreateCreditMemo(param1 As String, param2 As String, param3 As String, param4 As String) As Data.DataSet
        Dim Sql As String
        Dim ds As New DataSet()
        ds.Locale = CultureInfo.InvariantCulture
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Dim dsOut = New DataSet()
            Sql = "CALL CTPINV.MRECCMC (" & param1 & ",'" & param2 & "','" & param3 & "','" & param4 & "')"
            affectedRows = objDatos.GetDataFromDatabase(Sql, dsOut, dt)
            'result = objDatos.GetOdBcDataFromDatabase(Sql, ds)
            Return dsOut
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function GetNWDataByClaimNo(claimNo As String, ByRef dsResult As DataSet) As Integer
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT MHSTAT,MHMRNR,MHTOMR,MHFRAM FROM qs36f.CSMREH WHERE MHMRNR = " & claimNo
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetRGANumberByClaim(code As String, ByRef dsResult As DataSet) As Integer
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT GHRGA# FROM qs36f.RGAHDR WHERE GHRETN = " & code
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetRGAAmountByClaim(code As String, ByRef dsResult As DataSet) As Integer
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select count(*) TRGAH from qs36f.RGAHDR where GHRETN = " & code
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getOverEmailMsg(value As String, status As String, ByRef dsResult As DataSet) As Integer
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT INOVREMLST FROM qs36f.CLMINTSTS WHERE INSTAT = '" + status + "' AND INCLNO = " & value
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getNWClaimDetail(value As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "Select * FROM qs36f.CSMRED WHERE MDMRNR = " & Trim(value)
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function GetClosedClaims(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select a3.inclno,a1.mhstat, a2.cwstat, a3.instat
                    ,(select intapprv from qs36f.clmintsts where inclno = a3.inclno and trim(instat) = 'I') appStatus 
                    from qs36f.csmreh a1 join qs36f.clmwrn a2 on a1.MHMRNR = a2.CWDOCN join qs36f.clmintsts a3 on a2.CWWRNO = a3.inclno
                    where (trim(a1.mhstat) in('7','8')  and trim(a2.cwstat) in ('C','R')  and trim(a3.instat) in ('K','C','R')  ) "
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getuserbranchFirst(userid As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "Select PEBRCH from qs36f.hrperd where ususer = '" & userid & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getuserbranchSecond(userid As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "Select Decode from CSUSER where ususer = '" & userid & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getLimit(userid As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT DEC(TRANSLATE(SUBSTR(CNTDE2,1,7),'0',' '),7,0) CMLimit FROM QS36F.CNTRLL WHERE CNT01 = '952' AND SUBSTR(CNTDE1,1,10) = '" & userid & "'"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getAutoRestockFlag(userid As String, ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT COUNT(*) COUNTREC FROM QS36F.CNTRLL WHERE CNT01 = '922' AND LEFT(CNTDE1,10) = '" & userid & " '"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function addToDdlClaimIntSts(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT CNT03, CNTDE1 INTDES, SUBSTR(CNTDE2,44,1) CATINT FROM QS36F.CNTRLL WHERE CNT01 = '193' AND TRIM(CNT02) = '' order by 2"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function addToDdlClaimSts(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "SELECT CNT03, CNTDE1 STSDES, SUBSTR(CNTDE2,44,1) CATSTS FROM qs36f.CNTRLL WHERE CNT01 = '186' AND TRIM(CNT02) = ''"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getDiagnoseValues(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select distinct RIGHT(cnt03,2) cnt03, trim(cnt03) || '-' || trim(cntde1) as cntde1 from qs36f.cntrll where cnt01 = '189'  and cnt03 like 'C%' order by 1"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getReasonValues(ByRef dsResult As DataSet) As Integer
        Dim exMessage As String = " "
        Dim result As Integer = -1
        Dim Sql As String = String.Empty
        dsResult = New DataSet()
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Sql = "select distinct RIGHT(cnt03,2) cnt03, trim(cnt03) || '-' || trim(cntde1) as cntde1 from qs36f.cntrll where cnt01 = '188' and cnt03 like 'C%' and cnt02 = '' order by 1"
            result = objDatos.GetDataFromDatabase(Sql, dsResult, dt)
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function

    Public Function getmax(table As String, field As String, Optional strWhereAdd As String = Nothing) As Integer
        Dim result As Integer = -1
        Dim Sql As String = " "
        Dim ds = New DataSet()
        Dim affectedRows As Integer = -1
        Try
            Dim objDatos = New ClsRPGClientHelper()
            Dim dt As DataTable = New DataTable()
            Dim dsOut = New DataSet()
            Dim strResult = Nothing

            Dim str1 = "Select " & field & " FROM " & table & " ORDER BY " & field & " DESC FETCH FIRST 1 ROW ONLY"
            Dim str2 = "Select " & field & " FROM " & table & " " & strWhereAdd & " ORDER BY " & field & " DESC FETCH FIRST 1 ROW ONLY"
            Sql = If((strWhereAdd IsNot Nothing Or Not String.IsNullOrEmpty(strWhereAdd)), str2, str1)
            'Sql = "Select " & field & " FROM " & table & " ORDER BY " & field & " DESC FETCH FIRST 1 ROW ONLY"
            affectedRows = objDatos.GetDataFromDatabase(Sql, dsOut, dt)
            'result = objDatos.GetOdBcDataFromDatabase(Sql, ds)

            result = If(affectedRows <= 0, 0, CInt(dsOut.Tables(0).Rows(0).ItemArray(0).ToString()))
            Return result
        Catch ex As Exception
            Return result
        End Try
    End Function


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
