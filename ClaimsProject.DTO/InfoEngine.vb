Public Class InfoEngine

    Sub MySub()
        _selfInfoEngine = New InfoEngine()
    End Sub

    Private _model As String
    Public Property EngineModel() As String
        Get
            Return _model
        End Get
        Set(ByVal value As String)
            _model = value
        End Set
    End Property

    Private _serial As String
    Public Property EngineSerial() As String
        Get
            Return _serial
        End Get
        Set(ByVal value As String)
            _serial = value
        End Set
    End Property

    Private _arrangement As String
    Public Property EngineArrangement() As String
        Get
            Return _arrangement
        End Get
        Set(ByVal value As String)
            _arrangement = value
        End Set
    End Property

    Private _selfInfoEngine As InfoEngine
    Public Property SelfObject() As InfoEngine
        Get
            Return _selfInfoEngine
        End Get
        Set(ByVal value As InfoEngine)
            _selfInfoEngine = value
        End Set
    End Property

End Class
