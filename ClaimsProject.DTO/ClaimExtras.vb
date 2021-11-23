Public Class ClaimExtras

    Sub MySub()

    End Sub

    Private _claimTotalParts As String
    Public Property TotalParts() As String
        Get
            Return _claimTotalParts
        End Get
        Set(ByVal value As String)
            _claimTotalParts = value
        End Set
    End Property

    Private _claimTotalFreight As String
    Public Property TotalFreight() As String
        Get
            Return _claimTotalFreight
        End Get
        Set(ByVal value As String)
            _claimTotalFreight = value
        End Set
    End Property

    Private _claimConsDamageLabor As String
    Public Property ConsDamLabor() As String
        Get
            Return _claimConsDamageLabor
        End Get
        Set(ByVal value As String)
            _claimConsDamageLabor = value
        End Set
    End Property

    Private _claimConsDamageFreight As String
    Public Property ConsDamfreight() As String
        Get
            Return _claimConsDamageFreight
        End Get
        Set(ByVal value As String)
            _claimConsDamageFreight = value
        End Set
    End Property

    Private _claimConsDamageparts As String
    Public Property ConsDamParts() As String
        Get
            Return _claimConsDamageparts
        End Get
        Set(ByVal value As String)
            _claimConsDamageparts = value
        End Set
    End Property

    Private _claimConsDamageMisc As String
    Public Property ConsDamMisc() As String
        Get
            Return _claimConsDamageMisc
        End Get
        Set(ByVal value As String)
            _claimConsDamageMisc = value
        End Set
    End Property

    Private _claimFullConsDamageValue As String
    Public Property FullConsDamValue() As String
        Get
            Return _claimFullConsDamageValue
        End Get
        Set(ByVal value As String)
            _claimFullConsDamageValue = value
        End Set
    End Property

    Private _claimCanCLose As Boolean
    Public Property CanClose() As Boolean
        Get
            Return _claimCanCLose
        End Get
        Set(ByVal value As Boolean)
            _claimCanCLose = value
        End Set
    End Property



End Class
