Public Class ClaimsCustomerInfo

    Sub MySub()
        _selfCustomerInfo = New ClaimsCustomerInfo()
    End Sub

    Private CustomerNo As String
    Public Property CustNo() As String
        Get
            Return CustomerNo
        End Get
        Set(ByVal value As String)
            CustomerNo = value
        End Set
    End Property

    Private CustomerName As String
    Public Property CustName() As String
        Get
            Return CustomerName
        End Get
        Set(ByVal value As String)
            CustomerName = value
        End Set
    End Property

    Private ContactName As String
    Public Property ContName() As String
        Get
            Return ContactName
        End Get
        Set(ByVal value As String)
            ContactName = value
        End Set
    End Property

    Private ContactPhone As String
    Public Property ContPhone() As String
        Get
            Return ContactPhone
        End Get
        Set(ByVal value As String)
            ContactPhone = value
        End Set
    End Property

    Private ContactEmail As String
    Public Property ContEmail() As String
        Get
            Return ContactEmail
        End Get
        Set(ByVal value As String)
            ContactEmail = value
        End Set
    End Property

    Private _selfCustomerInfo As ClaimsCustomerInfo
    Public Property SelfObj() As ClaimsCustomerInfo
        Get
            Return _selfCustomerInfo
        End Get
        Set(ByVal value As ClaimsCustomerInfo)
            _selfCustomerInfo = value
        End Set
    End Property

End Class


