Public Class ClaimsData

    Sub MySub()
        _selfClaimsDataobj = New ClaimsData()
    End Sub

    Private _claimNo As String
    Public Property ClaimNo() As String
        Get
            Return _claimNo
        End Get
        Set(ByVal value As String)
            _claimNo = value
        End Set
    End Property

    Private _warningNo As String
    Public Property WarningNo() As String
        Get
            Return _warningNo
        End Get
        Set(ByVal value As String)
            _warningNo = value
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

    Private _claimPartNo As String
    Public Property ClaimPartNo() As String
        Get
            Return _claimPartNo
        End Get
        Set(ByVal value As String)
            _claimPartNo = value
        End Set
    End Property

    Private _claimPartDesc As String
    Public Property ClaimPartDesc() As String
        Get
            Return _claimPartDesc
        End Get
        Set(ByVal value As String)
            _claimPartDesc = value
        End Set
    End Property

    Private _claimEnteredBy As String
    Public Property ClaimEnteredBy() As String
        Get
            Return _claimEnteredBy
        End Get
        Set(ByVal value As String)
            _claimEnteredBy = value
        End Set
    End Property

    Private _claimEnteredFrom As String
    Public Property ClaimEnteredFrom() As String
        Get
            Return _claimEnteredFrom
        End Get
        Set(ByVal value As String)
            _claimEnteredFrom = value
        End Set
    End Property

    Private _claimQty As String
    Public Property ClaimQty() As String
        Get
            Return _claimQty
        End Get
        Set(ByVal value As String)
            _claimQty = value
        End Set
    End Property

    Private _claimUnitCost As String
    Public Property ClaimUnitCost() As String
        Get
            Return _claimUnitCost
        End Get
        Set(ByVal value As String)
            _claimUnitCost = value
        End Set
    End Property

    Private _claimInvoiceNo As String
    Public Property ClaimInvoiceNo() As String
        Get
            Return _claimInvoiceNo
        End Get
        Set(ByVal value As String)
            _claimInvoiceNo = value
        End Set
    End Property

    Private _claimInvoiceDate As String
    Public Property ClaimInvoiceDate() As String
        Get
            Return _claimInvoiceDate
        End Get
        Set(ByVal value As String)
            _claimInvoiceDate = value
        End Set
    End Property

    Private _claimLocation As String
    Public Property ClaimLocation() As String
        Get
            Return _claimLocation
        End Get
        Set(ByVal value As String)
            _claimLocation = value
        End Set
    End Property

    Private _claimInstallationDate As String
    Public Property ClaimInstallationDate() As String
        Get
            Return _claimInstallationDate
        End Get
        Set(ByVal value As String)
            _claimInstallationDate = value
        End Set
    End Property

    Private _claimHoursWorked As String
    Public Property ClaimHoursWorked() As String
        Get
            Return _claimHoursWorked
        End Get
        Set(ByVal value As String)
            _claimHoursWorked = value
        End Set
    End Property

    Private _claimDateEntered As String
    Public Property ClaimDateEntered() As String
        Get
            Return _claimDateEntered
        End Get
        Set(ByVal value As String)
            _claimDateEntered = value
        End Set
    End Property

    Private _claimCustStatement As String
    Public Property ClaimCustStatement() As String
        Get
            Return _claimCustStatement
        End Get
        Set(ByVal value As String)
            _claimCustStatement = value
        End Set
    End Property

    Private _selfClaimsDataobj As ClaimsData
    Public Property SelfObject() As ClaimsData
        Get
            Return _selfClaimsDataobj
        End Get
        Set(ByVal value As ClaimsData)
            _selfClaimsDataobj = value
        End Set
    End Property

End Class
