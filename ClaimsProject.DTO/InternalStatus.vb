Public Class InternalStatus

    Sub MySub()
        _selfInternalStatusObj = New InternalStatus()
    End Sub

    Private _claimActualStatus As String
    Public Property ClaimActualStatus() As String
        Get
            Return _claimActualStatus
        End Get
        Set(ByVal value As String)
            _claimActualStatus = value
        End Set
    End Property

    Private _claimInitialReviewFlag As Boolean
    Public Property ClaimInitialReview() As Boolean
        Get
            Return _claimInitialReviewFlag
        End Get
        Set(ByVal value As Boolean)
            _claimInitialReviewFlag = value
        End Set
    End Property

    Private _initialReviewUser As String
    Public Property InitialReviewUser() As String
        Get
            Return _initialReviewUser
        End Get
        Set(ByVal value As String)
            _initialReviewUser = value
        End Set
    End Property

    Private _initialReviewDate As String
    Public Property InitialReviewDate() As String
        Get
            Return _initialReviewDate
        End Get
        Set(ByVal value As String)
            _initialReviewDate = value
        End Set
    End Property

    Private _claimAcknowledgeEmailFlag As Boolean
    Public Property ClaimAcknowledgeEmail() As Boolean
        Get
            Return _claimAcknowledgeEmailFlag
        End Get
        Set(ByVal value As Boolean)
            _claimAcknowledgeEmailFlag = value
        End Set
    End Property

    Private _acknowledgeEmailUser As String
    Public Property AcknowledgeEmailUser() As String
        Get
            Return _acknowledgeEmailUser
        End Get
        Set(ByVal value As String)
            _acknowledgeEmailUser = value
        End Set
    End Property

    Private _acknowledgeEmailDate As String
    Public Property AcknowledgeEmailDate() As String
        Get
            Return _acknowledgeEmailDate
        End Get
        Set(ByVal value As String)
            _acknowledgeEmailDate = value
        End Set
    End Property

    Private _claimInfoRequestedFlag As Boolean
    Public Property ClaimInfoRequestedFlag() As Boolean
        Get
            Return _claimInfoRequestedFlag
        End Get
        Set(ByVal value As Boolean)
            _claimInfoRequestedFlag = value
        End Set
    End Property

    Private _infoRequestedUser As String
    Public Property InfoRequestedUser() As String
        Get
            Return _infoRequestedUser
        End Get
        Set(ByVal value As String)
            _infoRequestedUser = value
        End Set
    End Property

    Private _infoRequestedDate As String
    Public Property InfoRequestedDate() As String
        Get
            Return _infoRequestedDate
        End Get
        Set(ByVal value As String)
            _infoRequestedDate = value
        End Set
    End Property

    Private _claimPartRequestedFlag As Boolean
    Public Property ClaimPartRequestedFlag() As Boolean
        Get
            Return _claimPartRequestedFlag
        End Get
        Set(ByVal value As Boolean)
            _claimPartRequestedFlag = value
        End Set
    End Property

    Private _partRequestedUser As String
    Public Property PartRequestedUser() As String
        Get
            Return _partRequestedUser
        End Get
        Set(ByVal value As String)
            _partRequestedUser = value
        End Set
    End Property

    Private _partRequestedDate As String
    Public Property PartRequestedDateDate() As String
        Get
            Return _partRequestedDate
        End Get
        Set(ByVal value As String)
            _partRequestedDate = value
        End Set
    End Property

    Private _claimPartReceivedFlag As Boolean
    Public Property ClaimPartReceivedFlag() As Boolean
        Get
            Return _claimPartReceivedFlag
        End Get
        Set(ByVal value As Boolean)
            _claimPartReceivedFlag = value
        End Set
    End Property

    Private _partReceivedUser As String
    Public Property PartReceivedUserUser() As String
        Get
            Return _partReceivedUser
        End Get
        Set(ByVal value As String)
            _partReceivedUser = value
        End Set
    End Property

    Private _partReceivedDate As String
    Public Property PartReceivedDate() As String
        Get
            Return _partReceivedDate
        End Get
        Set(ByVal value As String)
            _partReceivedDate = value
        End Set
    End Property

    Private _claimTechnicalReviewFlag As Boolean
    Public Property ClaimTechnicalReviewFlag() As Boolean
        Get
            Return _claimTechnicalReviewFlag
        End Get
        Set(ByVal value As Boolean)
            _claimTechnicalReviewFlag = value
        End Set
    End Property

    Private _technicalReviewUser As String
    Public Property TechnicalReviewUser() As String
        Get
            Return _technicalReviewUser
        End Get
        Set(ByVal value As String)
            _technicalReviewUser = value
        End Set
    End Property

    Private _technicalReviewDate As String
    Public Property TechnicalReviewDate() As String
        Get
            Return _technicalReviewDate
        End Get
        Set(ByVal value As String)
            _technicalReviewDate = value
        End Set
    End Property

    Private _claimWaitingSupplierFlag As Boolean
    Public Property ClaimWaitingSupplierFlag() As Boolean
        Get
            Return _claimWaitingSupplierFlag
        End Get
        Set(ByVal value As Boolean)
            _claimWaitingSupplierFlag = value
        End Set
    End Property

    Private _waitingSupplierUser As String
    Public Property WaitingSupplierUser() As String
        Get
            Return _waitingSupplierUser
        End Get
        Set(ByVal value As String)
            _waitingSupplierUser = value
        End Set
    End Property

    Private _waitingSupplierDate As String
    Public Property WaitingSupplierDate() As String
        Get
            Return _waitingSupplierDate
        End Get
        Set(ByVal value As String)
            _waitingSupplierDate = value
        End Set
    End Property

    Private _claimCompletedFlag As Boolean
    Public Property ClaimCompletedFlag() As Boolean
        Get
            Return _claimCompletedFlag
        End Get
        Set(ByVal value As Boolean)
            _claimCompletedFlag = value
        End Set
    End Property

    Private _completedUser As String
    Public Property CompletedUser() As String
        Get
            Return _completedUser
        End Get
        Set(ByVal value As String)
            _completedUser = value
        End Set
    End Property

    Private _completedDate As String
    Public Property CompletedDate() As String
        Get
            Return _completedDate
        End Get
        Set(ByVal value As String)
            _completedDate = value
        End Set
    End Property

    Private _selfInternalStatusObj As InternalStatus
    Public Property SelfInternalStatusObj() As InternalStatus
        Get
            Return _selfInternalStatusObj
        End Get
        Set(ByVal value As InternalStatus)
            _selfInternalStatusObj = value
        End Set
    End Property

End Class
