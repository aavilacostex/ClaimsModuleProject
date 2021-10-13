Imports System
Imports System.Runtime.InteropServices
Imports System.Threading



Namespace ExtremeMirror

    Public Class PinvokeWindowsNetworking

#Region "region Consts"

        Const RESOURCE_CONNECTED As Integer = &H1
        Const RESOURCE_GLOBALNET As Integer = &H2
        Const RESOURCE_REMEMBERED As Integer = &H3

        Const RESOURCETYPE_ANY As Integer = &H0
        Const RESOURCETYPE_DISK As Integer = &H1
        Const RESOURCETYPE_PRINT As Integer = &H2

        Const RESOURCEDISPLAYTYPE_GENERIC As Integer = &H0
        Const RESOURCEDISPLAYTYPE_DOMAIN As Integer = &H1
        Const RESOURCEDISPLAYTYPE_SERVER As Integer = &H2
        Const RESOURCEDISPLAYTYPE_SHARE As Integer = &H3
        Const RESOURCEDISPLAYTYPE_FILE As Integer = &H4
        Const RESOURCEDISPLAYTYPE_GROUP As Integer = &H5

        Const RESOURCEUSAGE_CONNECTABLE As Integer = &H1
        Const RESOURCEUSAGE_CONTAINER As Integer = &H2


        Const CONNECT_INTERACTIVE As Integer = &H8
        Const CONNECT_PROMPT As Integer = &H10
        Const CONNECT_REDIRECT As Integer = &H80
        Const CONNECT_UPDATE_PROFILE As Integer = &H1
        Const CONNECT_COMMANDLINE As Integer = &H800
        Const CONNECT_CMD_SAVECRED As Integer = &H1000

        Const CONNECT_LOCALDRIVE As Integer = &H100

#End Region

#Region "region Errors"

        Const NO_ERROR As Integer = 0
        Const ERROR_ACCESS_DENIED As Integer = 5
        Const ERROR_ALREADY_ASSIGNED As Integer = 85
        Const ERROR_BAD_DEVICE As Integer = 1200
        Const ERROR_BAD_NET_NAME As Integer = 67
        Const ERROR_BAD_PROVIDER As Integer = 1204
        Const ERROR_CANCELLED As Integer = 1223
        Const ERROR_EXTENDED_ERROR As Integer = 1208
        Const ERROR_INVALID_ADDRESS As Integer = 487
        Const ERROR_INVALID_PARAMETER As Integer = 87
        Const ERROR_INVALID_PASSWORD As Integer = 1216
        Const ERROR_MORE_DATA As Integer = 234
        Const ERROR_NO_MORE_ITEMS As Integer = 259
        Const ERROR_NO_NET_OR_BAD_PATH As Integer = 1203
        Const ERROR_NO_NETWORK As Integer = 1222

        Const ERROR_BAD_PROFILE As Integer = 1206
        Const ERROR_CANNOT_OPEN_PROFILE As Integer = 1205
        Const ERROR_DEVICE_IN_USE As Integer = 2404
        Const ERROR_NOT_CONNECTED As Integer = 2250
        Const ERROR_OPEN_FILES As Integer = 2401


        'Private Shared ERROR_LIST As ErrorClass() = New ErrorClass() {
        '    New ErrorClass(ERROR_ACCESS_DENIED, "Error: Access Denied"),
        '    New ErrorClass(ERROR_ALREADY_ASSIGNED, "Error: Already Assigned"),
        '    New ErrorClass(ERROR_BAD_DEVICE, "Error: Bad Device"),
        '    New ErrorClass(ERROR_BAD_NET_NAME, "Error: Bad Net Name"),
        '    New ErrorClass(ERROR_BAD_PROVIDER, "Error: Bad Provider"),
        '    New ErrorClass(ERROR_CANCELLED, "Error: Cancelled"),
        '    New ErrorClass(ERROR_EXTENDED_ERROR, "Error: Extended Error"),
        '    New ErrorClass(ERROR_INVALID_ADDRESS, "Error: Invalid Address"),
        '    New ErrorClass(ERROR_INVALID_PARAMETER, "Error: Invalid Parameter"),
        '    New ErrorClass(ERROR_INVALID_PASSWORD, "Error: Invalid Password"),
        '    New ErrorClass(ERROR_MORE_DATA, "Error: More Data"),
        '    New ErrorClass(ERROR_NO_MORE_ITEMS, "Error: No More Items"),
        '    New ErrorClass(ERROR_NO_NET_OR_BAD_PATH, "Error: No Net Or Bad Path"),
        '    New ErrorClass(ERROR_NO_NETWORK, "Error: No Network"),
        '    New ErrorClass(ERROR_BAD_PROFILE, "Error: Bad Profile"),
        '    New ErrorClass(ERROR_CANNOT_OPEN_PROFILE, "Error: Cannot Open Profile"),
        '    New ErrorClass(ERROR_DEVICE_IN_USE, "Error: Device In Use"),
        '    New ErrorClass(ERROR_EXTENDED_ERROR, "Error: Extended Error"),
        '    New ErrorClass(ERROR_NOT_CONNECTED, "Error: Not Connected"),
        '    New ErrorClass(ERROR_OPEN_FILES, "Error: Open Files"),
        '}

        Public Shared Function CreateListOfObjects()
            Dim listEC As List(Of ErrorClass) = New List(Of ErrorClass)()
            'Dim errC As ErrorClass = New err

            listEC.Add(New ErrorClass(ERROR_ACCESS_DENIED, "Error: Access Denied"))
            listEC.Add(New ErrorClass(ERROR_ALREADY_ASSIGNED, "Error: Already Assigned"))
            listEC.Add(New ErrorClass(ERROR_BAD_DEVICE, "Error: Bad Device"))
            listEC.Add(New ErrorClass(ERROR_BAD_NET_NAME, "Error: Bad Net Name"))
            listEC.Add(New ErrorClass(ERROR_BAD_PROVIDER, "Error: Bad Provider"))
            listEC.Add(New ErrorClass(ERROR_CANCELLED, "Error: Cancelled"))
            listEC.Add(New ErrorClass(ERROR_EXTENDED_ERROR, "Error: Extended Error"))
            listEC.Add(New ErrorClass(ERROR_INVALID_ADDRESS, "Error: Invalid Address"))
            listEC.Add(New ErrorClass(ERROR_INVALID_PARAMETER, "Error: Invalid Parameter"))
            listEC.Add(New ErrorClass(ERROR_INVALID_PASSWORD, "Error: Invalid Password"))
            listEC.Add(New ErrorClass(ERROR_MORE_DATA, "Error: More Data"))
            listEC.Add(New ErrorClass(ERROR_NO_MORE_ITEMS, "Error: No More Items"))
            listEC.Add(New ErrorClass(ERROR_NO_NET_OR_BAD_PATH, "Error: No Net Or Bad Path"))
            listEC.Add(New ErrorClass(ERROR_NO_NETWORK, "Error: No Network"))
            listEC.Add(New ErrorClass(ERROR_BAD_PROFILE, "Error: Bad Profile"))
            listEC.Add(New ErrorClass(ERROR_CANNOT_OPEN_PROFILE, "Error: Cannot Open Profile"))
            listEC.Add(New ErrorClass(ERROR_DEVICE_IN_USE, "Error: Device In Use"))
            listEC.Add(New ErrorClass(ERROR_EXTENDED_ERROR, "Error: Extended Error"))
            listEC.Add(New ErrorClass(ERROR_NOT_CONNECTED, "Error: Not Connected"))
            listEC.Add(New ErrorClass(ERROR_OPEN_FILES, "Error: Open Files"))

            Return listEC
        End Function


        Private Shared Function getErrorForNumber(errNum As Integer) As String

            Dim lst = CreateListOfObjects()

            For Each er As ErrorClass In lst
                If (er.num = errNum) Then Return er.message
            Next
            Return "Error: Unknown, " + errNum

        End Function


#End Region

        <Runtime.InteropServices.DllImport("Mpr.dll")>
        Private Shared Function WNetUseConnection(hwndOwner As IntPtr, lpNetResource As NETRESOURCE, ByVal lpPassword As String, ByVal lpUserID As String, ByVal dwFlags As Integer, lpAccessName As String, lpBufferSize As String, lpResult As String) As Integer

        End Function

        <Runtime.InteropServices.DllImport("Mpr.dll")>
        Private Shared Function WNetCancelConnection2(ByVal lpName As String, ByVal dwFlags As Integer, fForce As Boolean) As Integer
        End Function

        <StructLayout(LayoutKind.Sequential)>
        Public Class NETRESOURCE
            Public dwScope As Integer = 0
            Public dwType As Integer = 0
            Public dwDisplayType As Integer = 0
            Public dwUsage As Integer = 0
            Public lpLocalName As String = ""
            Public lpRemoteName As String = ""
            Public lpComment As String = ""
            Public lpProvider As String = ""
        End Class

        Public Shared Function connectToRemote(remoteUNC As String, username As String, password As String) As String
            Return connectToRemote(remoteUNC, username, password, False)
        End Function

        Public Shared Function connectToRemote(remoteUNC As String, username As String, password As String, promptUser As Boolean) As String
            Dim nr As NETRESOURCE = New NETRESOURCE()
            nr.dwType = RESOURCETYPE_DISK
            nr.lpRemoteName = remoteUNC
            'nr.lpLocalName = "F:"

            Dim ret As Integer = 0
            If promptUser Then
                ret = WNetUseConnection(IntPtr.Zero, nr, "", "", CONNECT_INTERACTIVE Or CONNECT_PROMPT, Nothing, Nothing, Nothing)
            Else
                ret = WNetUseConnection(IntPtr.Zero, nr, password, username, 0, Nothing, Nothing, Nothing)
            End If

            If (ret = NO_ERROR) Then Return Nothing

            Return getErrorForNumber(ret)
        End Function

        Public Shared Function disconnectRemote(remoteUNC As String) As String
            Dim ret As Integer = WNetCancelConnection2(remoteUNC, CONNECT_UPDATE_PROFILE, False)
            If (ret = NO_ERROR) Then Return Nothing
            Return getErrorForNumber(ret)
        End Function

        Public Function setData(str As String) As Integer


            Dim list As List(Of Integer) = New List(Of Integer)({1, 2})

            Dim temp1 As String = str
            Dim RESOURCE_CONNECTED_1 As String = temp1.Replace("0x", "&H")
            Dim RESOURCE_CONNECTED_2 As Integer = Convert.ToInt32(RESOURCE_CONNECTED_1, 16)
            Return RESOURCE_CONNECTED_2
        End Function

        Public Sub MySub()

            ' Dim psinstance = 
            'psinstance.AddScript("ping 127.0.0.1")

            'var output = New System.Collections.ObjectModel.ObservableCollection < String > ()
            'output.CollectionChanged += (Object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e) =>
            '{
            '    foreach(var item In e.NewItems)
            'Console.WriteLine(item);
            '};
            'psinstance.Invoke(null, output);

        End Sub

    End Class

    Public Class ErrorClass

        Public Sub New(numm As Integer, messagee As String)
            num = numm
            message = messagee
        End Sub

        Private _num As Integer
        Public Property num() As Integer
            Get
                Return _num
            End Get
            Set(ByVal value As Integer)
                _num = value
            End Set
        End Property

        Private _message As String
        Public Property message() As String
            Get
                Return _message
            End Get
            Set(ByVal value As String)
                _message = value
            End Set
        End Property

        'Public Shared num As Integer = 0
        'Public Shared message As String = ""

        'Public Sub ErrorClass(num As Integer, message As String)
        '    Me.num = num
        '    Me.message = message
        'End Sub


    End Class

End Namespace


