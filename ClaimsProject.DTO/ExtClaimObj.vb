Public Class ExtClaimObj

    Sub MySub()
        _selfExtClaimObj = New ExtClaimObj
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

    Private _customer As String
    Public Property Customer() As String
        Get
            Return _customer
        End Get
        Set(ByVal value As String)
            _customer = value
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

    Private _partNo As String
    Public Property PartNo() As String
        Get
            Return _partNo
        End Get
        Set(ByVal value As String)
            _partNo = value
        End Set
    End Property

    Private _status As String
    Public Property Status() As String
        Get
            Return _status
        End Get
        Set(ByVal value As String)
            _status = value
        End Set
    End Property

    Private _comments As String
    Public Property Comments() As String
        Get
            Return _comments
        End Get
        Set(ByVal value As String)
            _comments = value
        End Set
    End Property

    Private _selfExtClaimObj As ExtClaimObj
    Public Property ExtClaimObj() As ExtClaimObj
        Get
            Return _selfExtClaimObj
        End Get
        Set(ByVal value As ExtClaimObj)
            _selfExtClaimObj = value
        End Set
    End Property

End Class
