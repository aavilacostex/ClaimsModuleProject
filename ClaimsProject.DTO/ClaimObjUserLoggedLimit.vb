Public Class ClaimObjUserLoggedLimit

    Sub MySub()

    End Sub

    Private _user As String
    Public Property Userid() As String
        Get
            Return _user
        End Get
        Set(ByVal value As String)
            _user = value
        End Set
    End Property

    Private _limit As String
    Public Property ClaimLimitAmount() As String
        Get
            Return _limit
        End Get
        Set(ByVal value As String)
            _limit = value
        End Set
    End Property

End Class
