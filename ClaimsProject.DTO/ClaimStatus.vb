Public Class ClaimStatus
    Sub MySub()
        _objInternalStatus = New InternalStatus()
        _objExternalStatus = New ExternalStatus()

        _objClaimStatus = New ClaimStatus()
        _objClaimStatus.ExternalStatusObj = _objExternalStatus
        _objClaimStatus.InternalStatusObj = _objInternalStatus

    End Sub

    Private _objInternalStatus As InternalStatus
    Public Property InternalStatusObj() As InternalStatus
        Get
            Return _objInternalStatus
        End Get
        Set(ByVal value As InternalStatus)
            _objInternalStatus = value
        End Set
    End Property

    Private _objExternalStatus As ExternalStatus
    Public Property ExternalStatusObj() As ExternalStatus
        Get
            Return _objExternalStatus
        End Get
        Set(ByVal value As ExternalStatus)
            _objExternalStatus = value
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

End Class
