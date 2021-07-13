Public Class ClaimSales

    Sub MySub()
        _selfClaimSalesObj = New ClaimSales()
    End Sub

    Private _claimAmountApproved As String
    Public Property ClaimAmountApproved() As String
        Get
            Return _claimAmountApproved
        End Get
        Set(ByVal value As String)
            _claimAmountApproved = value
        End Set
    End Property

    Private _claimAuthFlag As Boolean
    Public Property ClaimAuthFlag() As Boolean
        Get
            Return _claimAuthFlag
        End Get
        Set(ByVal value As Boolean)
            _claimAuthFlag = value
        End Set
    End Property

    Private _claimAuthAmount As String
    Public Property ClaimAuthAmount() As String
        Get
            Return _claimAuthAmount
        End Get
        Set(ByVal value As String)
            _claimAuthAmount = value
        End Set
    End Property

    Private _claimAuthDate As String
    Public Property ClaimAuthDate() As String
        Get
            Return _claimAuthDate
        End Get
        Set(ByVal value As String)
            _claimAuthDate = value
        End Set
    End Property

    Private _selfClaimSalesObj As ClaimSales
    Public Property SelfClaimSalesObj() As ClaimSales
        Get
            Return _selfClaimSalesObj
        End Get
        Set(ByVal value As ClaimSales)
            _selfClaimSalesObj = value
        End Set
    End Property

End Class
