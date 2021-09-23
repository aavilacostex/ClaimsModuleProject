Public Class FinalClaimObj

    Sub MySub()

    End Sub

    Private _code As String
    Public Property Code() As String
        Get
            Return _code
        End Get
        Set(ByVal value As String)
            _code = value
        End Set
    End Property

    Private _approved As Boolean
    Public Property Approved() As Boolean
        Get
            Return _approved
        End Get
        Set(ByVal value As Boolean)
            _approved = value
        End Set
    End Property

    Private _over500Auth As Boolean
    Public Property Over500Auth() As Boolean
        Get
            Return _over500Auth
        End Get
        Set(ByVal value As Boolean)
            _over500Auth = value
        End Set
    End Property

    Private _over500Email As Boolean
    Public Property Over500Email() As Boolean
        Get
            Return _over500Email
        End Get
        Set(ByVal value As Boolean)
            _over500Email = value
        End Set
    End Property

End Class
