Public Class CComments

    Sub MySub()
        _selfCComments = New CComments()
    End Sub

    Private _commDate As String
    Public Property CommDate() As String
        Get
            Return _commDate
        End Get
        Set(ByVal value As String)
            _commDate = value
        End Set
    End Property

    Private _commTime As String
    Public Property CommTime() As String
        Get
            Return _commTime
        End Get
        Set(ByVal value As String)
            _commTime = value
        End Set
    End Property

    Private _commUser As String
    Public Property CommUser() As String
        Get
            Return _commUser
        End Get
        Set(ByVal value As String)
            _commUser = value
        End Set
    End Property

    Private _commSubject As String
    Public Property CommSubject() As String
        Get
            Return _commSubject
        End Get
        Set(ByVal value As String)
            _commSubject = value
        End Set
    End Property

    Private _commTxt As String
    Public Property CommTxt() As String
        Get
            Return _commTxt
        End Get
        Set(ByVal value As String)
            _commTxt = value
        End Set
    End Property

    Private _partNo As String
    Public Property PartNo() As String
        Get
            Return _partNo
        End Get
        Set(ByVal value As String)
            _partNo = value
        End Set
    End Property

    Private _codComment As String
    Public Property CodComment() As String
        Get
            Return _codComment
        End Get
        Set(ByVal value As String)
            _codComment = value
        End Set
    End Property

    Private _codDetComment As String
    Public Property CodDetComment() As String
        Get
            Return _codDetComment
        End Get
        Set(ByVal value As String)
            _codDetComment = value
        End Set
    End Property

    Private _selfCComments As CComments
    Public Property SelfCComments() As CComments
        Get
            Return _selfCComments
        End Get
        Set(ByVal value As CComments)
            _selfCComments = value
        End Set
    End Property

End Class
