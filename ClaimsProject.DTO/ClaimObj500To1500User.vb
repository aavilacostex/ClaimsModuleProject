Public Class ClaimObj500To1500User

    Sub MySub()

    End Sub

    Private _claimemail As String
    Public Property CLMemail() As String
        Get
            Return _claimemail
        End Get
        Set(ByVal value As String)
            _claimemail = value
        End Set
    End Property

    Private _claimuser As String
    Public Property CLMuser() As String
        Get
            Return _claimuser
        End Get
        Set(ByVal value As String)
            _claimuser = value
        End Set
    End Property

    Private _clmlimit As String
    Public Property CLMLimit() As String
        Get
            Return _clmlimit
        End Get
        Set(ByVal value As String)
            _clmlimit = value
        End Set
    End Property


End Class
