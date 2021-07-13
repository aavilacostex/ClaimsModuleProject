Public Class ClaimInformation

    Sub MySub()
        _objEngineInfo = New InfoEngine
        _objEquipmentInfo = New InfoEquipment

        _objClaimInfo = New ClaimInformation
        _objClaimInfo.EngineInfoObj = _objEngineInfo
        _objClaimInfo.EquipmentInfoObj = _objEquipmentInfo
    End Sub

    Private _objEquipmentInfo As InfoEquipment
    Public Property EquipmentInfoObj() As InfoEquipment
        Get
            Return _objEquipmentInfo
        End Get
        Set(ByVal value As InfoEquipment)
            _objEquipmentInfo = value
        End Set
    End Property

    Private _objEngineInfo As InfoEngine
    Public Property EngineInfoObj() As InfoEngine
        Get
            Return _objEngineInfo
        End Get
        Set(ByVal value As InfoEngine)
            _objEngineInfo = value
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

End Class
