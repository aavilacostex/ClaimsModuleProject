Public Class DownloadExcelObj

    Sub MySub()
        _selfDownExc = New DownloadExcelObj()
    End Sub

    Private _claimNo As String
    Public Property ClaimNumber() As String
        Get
            Return _claimNo
        End Get
        Set(ByVal value As String)
            _claimNo = value
        End Set
    End Property

    'Private _warningNo As String
    'Public Property WarningNo() As String
    '    Get
    '        Return _warningNo
    '    End Get
    '    Set(ByVal value As String)
    '        _warningNo = value
    '    End Set
    'End Property

    Private _warningSts As String
    Public Property InternalStatus() As String
        Get
            Return _warningSts
        End Get
        Set(ByVal value As String)
            _warningSts = value
        End Set
    End Property

    Private _date As String
    Public Property ClaimDate() As String
        Get
            Return _date
        End Get
        Set(ByVal value As String)
            _date = value
        End Set
    End Property

    Private _claimType As String
    Public Property ClaimType() As String
        Get
            Return _claimType
        End Get
        Set(ByVal value As String)
            _claimType = value
        End Set
    End Property

    Private _customerNo As String
    Public Property CustomerNumber() As String
        Get
            Return _customerNo
        End Get
        Set(ByVal value As String)
            _customerNo = value
        End Set
    End Property

    Private _customerName As String
    Public Property CustomerName() As String
        Get
            Return _customerName
        End Get
        Set(ByVal value As String)
            _customerName = value
        End Set
    End Property

    Private _totalCost As String
    Public Property TotalCost() As String
        Get
            Return _totalCost
        End Get
        Set(ByVal value As String)
            _totalCost = value
        End Set
    End Property

    Private _partNo As String
    Public Property PartNumber() As String
        Get
            Return _partNo
        End Get
        Set(ByVal value As String)
            _partNo = value
        End Set
    End Property

    Private _claimStatus As String
    Public Property ClaimStatus() As String
        Get
            Return _claimStatus
        End Get
        Set(ByVal value As String)
            _claimStatus = value
        End Set
    End Property

    Private _lastUpdateDate As String
    Public Property LastUpdateDate() As String
        Get
            Return _lastUpdateDate
        End Get
        Set(ByVal value As String)
            _lastUpdateDate = value
        End Set
    End Property

    Private _reason As String
    Public Property Reason() As String
        Get
            Return _reason
        End Get
        Set(ByVal value As String)
            _reason = value
        End Set
    End Property

    Private _diagnose As String
    Public Property Diagnose() As String
        Get
            Return _diagnose
        End Get
        Set(ByVal value As String)
            _diagnose = value
        End Set
    End Property

    Private _vendor As String
    Public Property Vendor() As String
        Get
            Return _vendor
        End Get
        Set(ByVal value As String)
            _vendor = value
        End Set
    End Property

    Private _vendorName As String
    Public Property VendorName() As String
        Get
            Return _vendorName
        End Get
        Set(ByVal value As String)
            _vendorName = value
        End Set
    End Property

    Private _location As String
    Public Property Location() As String
        Get
            Return _location
        End Get
        Set(ByVal value As String)
            _location = value
        End Set
    End Property

    'Private _salesmanNo As String
    'Public Property SalesmanNo() As String
    '    Get
    '        Return _salesmanNo
    '    End Get
    '    Set(ByVal value As String)
    '        _salesmanNo = value
    '    End Set
    'End Property

    Private _salesmanName As String
    Public Property SalesmanName() As String
        Get
            Return _salesmanName
        End Get
        Set(ByVal value As String)
            _salesmanName = value
        End Set
    End Property

    Private _user As String
    Public Property User() As String
        Get
            Return _user
        End Get
        Set(ByVal value As String)
            _user = value
        End Set
    End Property

    Private _selfDownExc As DownloadExcelObj
    Private Property SelfDownExc() As DownloadExcelObj
        Get
            Return _selfDownExc
        End Get
        Set(ByVal value As DownloadExcelObj)
            _selfDownExc = value
        End Set
    End Property

End Class
