Public Class ClaimObj

    Sub MySub()
        _selfClaimObj = New ClaimObj
        _objClaimData = New ClaimsData
    End Sub

    Private _objClaimData As ClaimsData
    Public Property ClaimDataObj() As ClaimsData
        Get
            Return _objClaimData
        End Get
        Set(ByVal value As ClaimsData)
            _objClaimData = value
        End Set
    End Property

    Private _objClaimCustInfo As ClaimsCustomerInfo
    Public Property CustInfoObj() As ClaimsCustomerInfo
        Get
            Return _objClaimCustInfo
        End Get
        Set(ByVal value As ClaimsCustomerInfo)
            _objClaimCustInfo = value
        End Set
    End Property

    Private _objClaimInfo As ClaimInformation
    Public Property ClaimInfoObj() As ClaimInformation
        Get
            Return _objClaimInfo
        End Get
        Set(ByVal value As ClaimInformation)
            _objClaimInfo = value
        End Set
    End Property

    Private _objClaimStatus As ClaimStatus
    Public Property ClaimStatusObj() As ClaimStatus
        Get
            Return _objClaimStatus
        End Get
        Set(ByVal value As ClaimStatus)
            _objClaimStatus = value
        End Set
    End Property

    Private _objClaimDpto As ClaimDepartment
    Public Property ClaimDptoObj() As ClaimDepartment
        Get
            Return _objClaimDpto
        End Get
        Set(ByVal value As ClaimDepartment)
            _objClaimDpto = value
        End Set
    End Property

    Private _objClaimSales As ClaimSales
    Public Property ClaimSalesObj() As ClaimSales
        Get
            Return _objClaimSales
        End Get
        Set(ByVal value As ClaimSales)
            _objClaimSales = value
        End Set
    End Property

    Private _objClaimExtras As ClaimExtras
    Public Property ClaimExtrasObj() As ClaimExtras
        Get
            Return _objClaimExtras
        End Get
        Set(ByVal value As ClaimExtras)
            _objClaimExtras = value
        End Set
    End Property

    Private _selfClaimObj As ClaimObj
    Public Property ClaimObj() As ClaimObj
        Get
            Return _selfClaimObj
        End Get
        Set(ByVal value As ClaimObj)
            _selfClaimObj = value
        End Set
    End Property

End Class
