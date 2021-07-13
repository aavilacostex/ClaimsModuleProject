Public Class InfoEquipment

    Sub MySub()
        _selfInfoEquipment = New InfoEquipment()
    End Sub

    Private _model As String
    Public Property EquipmentModel() As String
        Get
            Return _model
        End Get
        Set(ByVal value As String)
            _model = value
        End Set
    End Property

    Private _serial As String
    Public Property EquipmentSerial() As String
        Get
            Return _serial
        End Get
        Set(ByVal value As String)
            _serial = value
        End Set
    End Property

    Private _arrangement As String
    Public Property EquipmentArrangement() As String
        Get
            Return _arrangement
        End Get
        Set(ByVal value As String)
            _arrangement = value
        End Set
    End Property

    Private _selfInfoEquipment As InfoEquipment
    Public Property SelfObject() As InfoEquipment
        Get
            Return _selfInfoEquipment
        End Get
        Set(ByVal value As InfoEquipment)
            _selfInfoEquipment = value
        End Set
    End Property

End Class
