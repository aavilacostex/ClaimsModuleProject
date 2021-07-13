Public Class ExternalStatus

    Sub MySub()
        _selfExternalStatusObj = New ExternalStatus()
    End Sub

    Private _claimStatus As String
    Public Property ClaimStatus() As String
        Get
            Return _claimStatus
        End Get
        Set(ByVal value As String)
            _claimStatus = value
        End Set
    End Property

    Private _claimTotalAmountApp As String
    Public Property ClaimTotalAmountApp() As String
        Get
            Return _claimTotalAmountApp
        End Get
        Set(ByVal value As String)
            _claimTotalAmountApp = value
        End Set
    End Property

    Private _selfExternalStatusObj As ExternalStatus
    Public Property SelfExternalStatusObj() As ExternalStatus
        Get
            Return _selfExternalStatusObj
        End Get
        Set(ByVal value As ExternalStatus)
            _selfExternalStatusObj = value
        End Set
    End Property

End Class
