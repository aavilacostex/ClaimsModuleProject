Public Class ClaimEmailObj


    Private _emailTo As String
    Public Property EmailTo() As String
        Get
            Return _emailTo
        End Get
        Set(ByVal value As String)
            _emailTo = value
        End Set
    End Property

    Private _customer As String
    Public Property Customer() As String
        Get
            Return _customer
        End Get
        Set(ByVal value As String)
            _customer = value
        End Set
    End Property

    Private _claimNo As String
    Public Property ClaimNo() As String
        Get
            Return _claimNo
        End Get
        Set(ByVal value As String)
            _claimNo = value
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

    Private _invoice As String
    Public Property Invoice() As String
        Get
            Return _invoice
        End Get
        Set(ByVal value As String)
            _invoice = value
        End Set
    End Property

    Private _description As String
    Public Property Description() As String
        Get
            Return _description
        End Get
        Set(ByVal value As String)
            _description = value
        End Set
    End Property

    Private _totalParts As String
    Public Property TotalParts() As String
        Get
            Return _totalParts
        End Get
        Set(ByVal value As String)
            _totalParts = value
        End Set
    End Property

    Private _totalFreight As String
    Public Property TotalFreight() As String
        Get
            Return _totalFreight
        End Get
        Set(ByVal value As String)
            _totalFreight = value
        End Set
    End Property

    Private _consDamage As String
    Public Property ConsequentalDamage() As String
        Get
            Return _consDamage
        End Get
        Set(ByVal value As String)
            _consDamage = value
        End Set
    End Property

    Private _additinalCost As String
    Public Property AdditionalCost() As String
        Get
            Return _additinalCost
        End Get
        Set(ByVal value As String)
            _additinalCost = value
        End Set
    End Property

    Private _totalApproved As String
    Public Property TotalApproved() As String
        Get
            Return _totalApproved
        End Get
        Set(ByVal value As String)
            _totalApproved = value
        End Set
    End Property

    Private _approvedBy As String
    Public Property ApprovedBy() As String
        Get
            Return _approvedBy
        End Get
        Set(ByVal value As String)
            _approvedBy = value
        End Set
    End Property

    Private _message As String
    Public Property MESSAGE() As String
        Get
            Return _message
        End Get
        Set(ByVal value As String)
            _message = value
        End Set
    End Property

End Class
